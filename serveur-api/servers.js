const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const winston = require("winston");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware pour autoriser les requêtes CORS et parser le JSON
app.use(cors());
app.use(express.json());

// Limiteur de requêtes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite chaque IP à 100 requêtes par fenêtre
});
app.use(limiter);

// Configuration du logger
const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
    ],
});

// Chemin vers le fichier JSON des serveurs
const SERVERS_FILE = path.join(__dirname, "servers.json");

// Dossier de cache pour les fichiers téléchargés
const CACHE_DIR = path.join(__dirname, "cache");

// Créer le dossier de cache s'il n'existe pas
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Identifiants admin
const ADMIN_NAME = "G005";
const ADMIN_PASSWORD = "00225";

// Fonction pour charger les serveurs depuis le fichier JSON
function getServers() {
    try {
        const data = fs.readFileSync(SERVERS_FILE, "utf8");
        return JSON.parse(data);
    } catch (error) {
        logger.error("Erreur lors de la lecture du fichier servers.json :", error);
        return {};
    }
}

// Fonction pour sauvegarder les serveurs dans le fichier JSON
function saveServers(servers) {
    try {
        fs.writeFileSync(SERVERS_FILE, JSON.stringify(servers, null, 2));
    } catch (error) {
        logger.error("Erreur lors de l'écriture dans le fichier servers.json :", error);
        throw new Error("Impossible de sauvegarder les serveurs.");
    }
}

// Endpoint pour récupérer la liste complète des serveurs
app.get("/all-servers", (req, res) => {
    const servers = getServers();
    res.json(servers);
});

// Endpoint pour récupérer les serveurs selon vpnFile et passType
app.get("/servers/:vpnFile/:passType", (req, res) => {
    const vpnFile = req.params.vpnFile;
    const passType = req.params.passType;
    const servers = getServers();

    if (!servers[vpnFile] || !servers[vpnFile][passType]) {
        return res.status(404).json({ error: "Fichier VPN ou pass non trouvé." });
    }

    res.json(servers[vpnFile][passType]);
});

// Endpoint pour vérifier les identifiants admin
app.post("/verify-admin", (req, res) => {
    const { adminName, adminPassword } = req.body;

    if (adminName === ADMIN_NAME && adminPassword === ADMIN_PASSWORD) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, error: "Identifiants incorrects." });
    }
});

// Endpoint pour mettre à jour l'URL de téléchargement d'un serveur spécifique
app.post(
    "/update-download-url/:vpnFile/:passType",
    [
        body("newDownloadUrl").isURL().withMessage("L'URL de téléchargement doit être une URL valide."),
        body("serverId").isNumeric().withMessage("L'ID du serveur doit être un nombre."),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const vpnFile = req.params.vpnFile;
            const passType = req.params.passType;
            const { serverId, newDownloadUrl } = req.body;

            let servers = getServers();

            if (!servers[vpnFile] || !servers[vpnFile][passType]) {
                return res.status(404).json({ error: "Fichier VPN ou pass non trouvé." });
            }

            const server = servers[vpnFile][passType].find(s => s.id === parseInt(serverId));
            if (!server) {
                return res.status(404).json({ error: "Serveur non trouvé." });
            }

            if (server.downloadUrl !== newDownloadUrl) {
                server.downloadUrl = newDownloadUrl;
                server.expirationTime = Date.now() + 48 * 60 * 60 * 1000; // Expire après 48 heures
            }

            saveServers(servers);

            res.json({ message: "Lien de téléchargement mis à jour avec succès", server });
        } catch (error) {
            logger.error("Erreur lors de la mise à jour du lien de téléchargement :", error);
            res.status(500).json({ error: "Erreur lors de la mise à jour du lien de téléchargement." });
        }
    }
);

// Endpoint pour récupérer un lien de téléchargement spécifique
app.get("/download/:vpnFile/:passType/:serverId", (req, res) => {
    const { vpnFile, passType, serverId } = req.params;
    const servers = getServers();

    // Vérifier si le fichier VPN et le passType existent
    if (!servers[vpnFile] || !servers[vpnFile][passType]) {
        return res.status(404).json({ error: "Fichier VPN ou pass non trouvé." });
    }

    // Chercher le serveur spécifique
    const server = servers[vpnFile][passType].find(s => s.id === parseInt(serverId));
    if (!server) {
        return res.status(404).json({ error: "Serveur non trouvé." });
    }

    // Retourner l'URL de téléchargement
    res.json({ downloadUrl: server.downloadUrl });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});

