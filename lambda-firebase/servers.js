require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { body, validationResult } = require("express-validator");
const winston = require("winston");
const rateLimit = require("express-rate-limit");
const serverless = require("serverless-http"); // Ajoutez cette ligne

// 🔹 Initialiser Firebase
const admin = require("firebase-admin");
const serviceAccount = require("./sshafric-firebase-adminsdk-fbsvc-2f57392dea.json"); // Remplacez par le chemin correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore(); // Accéder à Firestore

const app = express();
const PORT = 2000;

// Middleware
app.use(cors());
app.use(express.json());

// Limiteur de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max par IP
});
app.use(limiter);

// Logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

// Dossier cache
const CACHE_DIR = path.join(__dirname, "cache");
if (!fs.existsSync(CACHE_DIR)) {
  fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Identifiants admin
const ADMIN_NAME = "G005";
const ADMIN_PASSWORD = "00225";

// 🔹 Récupérer les serveurs depuis Firestore
async function getServers(vpnFile, passType) {
  try {
    const servers = [];
    const snapshot = await db
      .collection(vpnFile) // Exemple : "socksip-tunnel"
      .doc(passType) // Exemple : "direct"
      .collection("items") // Sous-collection "items"
      .get();

    snapshot.forEach((doc) => {
      servers.push(doc.data());
    });

    return servers;
  } catch (error) {
    logger.error("Erreur lors de la récupération des serveurs depuis Firestore :", error);
    return [];
  }
}

// 🔹 Sauvegarder les serveurs dans Firestore
async function saveServers(vpnFile, passType, servers) {
  try {
    for (const server of servers) {
      await db
        .collection(vpnFile) // Exemple : "socksip-tunnel"
        .doc(passType) // Exemple : "direct"
        .collection("items") // Sous-collection "items"
        .doc(server.id.toString()) // ID du document
        .set(server); // Données à insérer
    }
  } catch (error) {
    logger.error("Erreur lors de la sauvegarde des serveurs dans Firestore :", error);
    throw new Error("Impossible de sauvegarder les serveurs.");
  }
}

// 🔹 Récupérer la liste des serveurs
app.get("/servers/:vpnFile/:passType", async (req, res) => {
  const { vpnFile, passType } = req.params;

  try {
    const servers = await getServers(vpnFile, passType);
    if (servers.length === 0) {
      return res.status(404).json({ error: "Aucun serveur trouvé pour ce fichier et ce pass." });
    }
    res.json(servers);
  } catch (error) {
    logger.error("Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des serveurs." });
  }
});

// 🔹 Vérifier les identifiants admin
app.post("/verify-admin", (req, res) => {
  const { adminName, adminPassword } = req.body;

  if (adminName === ADMIN_NAME && adminPassword === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Identifiants incorrects." });
  }
});

// 🔹 Mettre à jour le lien de téléchargement
app.post(
  "/update-download-url/:vpnFile/:passType",
  [
    body("newDownloadUrl").isURL().withMessage("L'URL de téléchargement doit être valide."),
    body("serverId").isNumeric().withMessage("L'ID du serveur doit être un nombre."),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { vpnFile, passType } = req.params;
      const { serverId, newDownloadUrl } = req.body;

      // Récupérer les serveurs
      const servers = await getServers(vpnFile, passType);

      // Trouver le serveur à mettre à jour
      const server = servers.find((s) => s.id === parseInt(serverId));
      if (!server) {
        return res.status(404).json({ error: "Serveur non trouvé." });
      }

      // Mettre à jour l'URL de téléchargement
      server.downloadUrl = newDownloadUrl;
      server.expirationTime = Date.now() + 48 * 60 * 60 * 1000; // Expire après 48h

      // Sauvegarder les serveurs mis à jour
      await saveServers(vpnFile, passType, servers);

      res.json({ message: "Lien mis à jour avec succès", server });
    } catch (error) {
      logger.error("Erreur mise à jour du lien :", error);
      res.status(500).json({ error: "Erreur mise à jour du lien." });
    }
  }
);

// 🔹 Récupérer l'URL de téléchargement
app.get("/get-download-link/:vpnFile/:passType/:serverId", async (req, res) => {
  const { vpnFile, passType, serverId } = req.params;

  try {
    const servers = await getServers(vpnFile, passType);
    const server = servers.find((s) => s.id === parseInt(serverId));

    if (!server) {
      return res.status(404).json({ error: "Serveur non trouvé." });
    }

    res.json({ downloadUrl: server.downloadUrl });
  } catch (error) {
    logger.error("Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la récupération du lien de téléchargement." });
  }
});

// 🔹 Télécharger et stocker le fichier en cache
app.get("/download/:vpnFile/:passType/:serverId", async (req, res) => {
  const { vpnFile, passType, serverId } = req.params;

  try {
    const servers = await getServers(vpnFile, passType);
    const server = servers.find((s) => s.id === parseInt(serverId));

    if (!server) {
      return res.status(404).json({ error: "Serveur non trouvé." });
    }

    const downloadUrl = server.downloadUrl;
    const cacheFilePath = path.join(CACHE_DIR, `${vpnFile}_${passType}_${serverId}.ovpn`);

    // Vérifier si le fichier est déjà en cache
    if (fs.existsSync(cacheFilePath)) {
      return res.download(cacheFilePath);
    }

    // Télécharger depuis Google Drive
    const response = await axios.get(downloadUrl, { responseType: "stream" });
    const fileStream = fs.createWriteStream(cacheFilePath);
    response.data.pipe(fileStream);

    fileStream.on("finish", () => {
      res.download(cacheFilePath);
    });
  } catch (error) {
    logger.error("Erreur téléchargement fichier :", error);
    res.status(500).json({ error: "Erreur téléchargement fichier." });
  }
});

// 🔹 Stocker un fichier téléchargé depuis le frontend
app.post("/upload-file", (req, res) => {
  const filePath = path.join(CACHE_DIR, "vpn-file.ovpn");

  const fileStream = fs.createWriteStream(filePath);
  req.pipe(fileStream);

  fileStream.on("finish", () => {
    res.json({ message: "Fichier stocké en cache avec succès." });
  });

  fileStream.on("error", (error) => {
    logger.error("Erreur stockage fichier :", error);
    res.status(500).json({ error: "Erreur stockage fichier." });
  }
 )
});

// Démarrer le serveur (uniquement en local)
if (process.env.ENVIRONMENT === "local") {
  app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
  });
}

// Exporter la fonction Lambda
module.exports.handler = serverless(app); // Ajoutez cette ligne