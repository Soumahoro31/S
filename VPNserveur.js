// Sélectionner les éléments nécessaires
const header = document.querySelector(".header-section");
const dropdown = document.querySelector(".dropdown-container");
const dropdownTrigger = document.querySelector(".dropdown-trigger");
const dropdownMenu = document.querySelector(".dropdown-menu");
const navbarIcon = document.getElementById("navbar-icon");
const navList = document.getElementById("nav-list");
const icon = document.getElementById("icon");
const countryColor = document.querySelectorAll(".country-color");
const country = document.querySelectorAll(".country");

// Fonction pour afficher le menu navbar lorsqu'on clique sur le logo
if (icon && navList && navbarIcon) {
  const toggleNavMenu = (event) => {
    event.preventDefault();
    navList.classList.toggle("active");
    navbarIcon.style.display = navList.classList.contains("active")
      ? "none"
      : "block";
  };

  icon.addEventListener("click", toggleNavMenu);

  // Fermer le menu navbar si clic en dehors
  document.addEventListener("click", (event) => {
    const isClickInsideNav = navList.contains(event.target);
    const isClickOnIcon = icon.contains(event.target);

    if (
      !isClickInsideNav &&
      !isClickOnIcon &&
      navList.classList.contains("active")
    ) {
      toggleNavMenu(event);
    }
  });
}

// Fonction pour rafraîchir la page lorsqu'on clique sur le logo
function logoContainer() {
  window.location.href = "index4.html";
}

// Gestion du dropdown
if (dropdown) {
  const toggleDropdown = (e) => {
    e.preventDefault();
    dropdown.classList.toggle("open");
  };

  dropdown.addEventListener("click", toggleDropdown);

  document.addEventListener("click", (e) => {
    const isClickInsideDropdown = dropdown.contains(e.target);

    if (!isClickInsideDropdown && dropdown.classList.contains("open")) {
      toggleDropdown(e);
    }
  });
}

// Animation lors du survol des pays
if (country && countryColor) {
  const toggleCountryColor = (isActive) => {
    countryColor.forEach((colorElement) => {
      colorElement.classList.toggle("active-color", isActive);
    });
  };

  country.forEach((countryElement) => {
    countryElement.addEventListener("mouseover", () =>
      toggleCountryColor(true)
    );
    countryElement.addEventListener("mouseout", () =>
      toggleCountryColor(false)
    );
  });
}

// Changer le style du header lors du scroll
if (header) {
  const updateHeaderStyle = () => {
    const isScrolled = window.scrollY > 0;
    const isDropdownOpen =
      dropdown && dropdown.classList.contains("open");

    if (isScrolled && !isDropdownOpen) {
      header.style.position = "fixed";
      header.style.top = "0";
      header.style.width = "100%";
      header.style.backgroundColor = "#041e2c7f";
      header.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.position = "relative";
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none";
    }
  };

  window.addEventListener("scroll", () => {
    requestAnimationFrame(updateHeaderStyle);
  });
}

// rédirection des pays
function coteIvoire() {
  window.location.href = "index3.html";
}

function cameroun() {
  window.location.href = "Sff-cameroun.html";
}

function senegal() {
  window.location.href = "Sff-sénégal.html";
}

function burkina() {
  window.location.href = "Sff-burkina-faso.html";
}

function mali() {
  window.location.href = "Sff-mali.html";
}

function niger() {
  window.location.href = "Sff-niger.html";
}

function guinee() {
  window.location.href = "Sff-guinée.html";
}

function togo() {
  window.location.href = "Sff-togo.html";
}

function bénin() {
  window.location.href = "Sff-bénin.html";
}

function congoRd() {
  window.location.href = "Sff-rd-congo.html";
}

function congoRépublique() {
  window.location.href = "Sff-république-congo.html";
}

function algerie() {
  window.location.href = "Sff-algerie.html";
}

function tunisie() {
  window.location.href = "Sff-tunisie.html";
}

function madagascar() {
  window.location.href = "Sff-madagascar.html";
}

function nigeria() {
  window.location.href = "Sff-nigeria.html";
}

function sudAfric() {
  window.location.href = "Sff-afrique-sud.html";
}




let currentServerId = null; // Variable pour stocker l'ID du serveur en cours de mise à jour
let currentVpnFile = null; // Variable pour stocker le fichier VPN sélectionné
let currentPassType = null; // Variable pour stocker le type de pass sélectionné

// Fonction pour mettre à jour le nom du fichier et la description
function updateSiteInfo(vpnFile, description) {
    const siteNameSpan = document.querySelector(".site-name");
    const descriptionParagraph = document.querySelector("#introduction p");

    // Mettre à jour le nom du fichier dans le span
    if (siteNameSpan && vpnFile) {
        siteNameSpan.textContent = vpnFile.toUpperCase(); // Afficher le nom du fichier en majuscules
    } else if (siteNameSpan) {
        siteNameSpan.textContent = "𝙎𝙊𝙎𝙆𝙄𝙋 𝙏𝙐𝙉𝙉𝙀𝙇"; // Texte par défaut si aucun fichier n'est spécifié
    }

    // Mettre à jour la description dans le paragraphe
    if (descriptionParagraph && description) {
        descriptionParagraph.textContent = decodeURIComponent(description); // Décoder la description pour gérer les caractères spéciaux
    } else if (descriptionParagraph) {
        descriptionParagraph.textContent = "Avec nos fichiers 𝙎𝙊𝘾𝙆𝙎𝙄𝙋-𝙏𝙐𝙉𝙉𝙀𝙇, bénéficiez d'une navigation fluide et sans restriction, tout en maintenant une sécurité optimale.";
    }
}

// Fonction pour récupérer les serveurs depuis le backend
async function fetchServers(vpnFile, passType) {
    try {
        const response = await fetch(`http://localhost:2000/servers/${vpnFile}/${passType}`);
        
        // Gérer spécifiquement le cas où le fichier n'est pas trouvé
        if (response.status === 404) {
            const container = document.querySelector(".testimonials-wrapper");
            if (container) {
                container.innerHTML = "<p>Le fichier demandé n'existe pas sur le serveur.</p>";
            }
            return;
        }

        if (!response.ok) throw new Error("Erreur lors de la récupération des serveurs.");

        const servers = await response.json();
        console.log("Serveurs récupérés :", servers);

        const container = document.querySelector(".testimonials-wrapper");
        if (!container) {
            console.error("Element avec la classe '.testimonials-wrapper' introuvable.");
            return;
        }
        container.innerHTML = ""; // Effacer les anciens serveurs

        // Vérifier si des serveurs sont disponibles
        if (Array.isArray(servers) && servers.length > 0) {
            servers.forEach((server, index) => {
                let timeLeft = getTimeLeft(server.expirationTime);
                let isExpired = server.expirationTime - Date.now() <= 0;

                const serverDiv = document.createElement("div");
                serverDiv.classList.add("testimonial", "serveur-container");

                serverDiv.innerHTML = `
                    <h3>Location: ${server.location}</h3>
                    <div class="serveurs">
                        <div>
                            <img src="${server.imageUrl}" alt="Serveur ${server.location}" class="serveur-image">
                        </div>
                        <ul>
                            <li>Time Left: <span id="time-${index}" class="serveur-time">${timeLeft}</span></li>
                            <li>Port: ${server.ports}</li>
                            <li>Duration account: ${server.duration}</li>
                            <li><strong>Protocol: ${server.protocol}</strong></li>
                        </ul>
                    </div>
                    <a href="${server.downloadUrl}" class="serveur-button" id="download-button-${index}"
                       data-vpn-file="${vpnFile}" data-pass-type="${passType}" data-server-id="${server.id}" 
                       ${isExpired ? "disabled" : ""}>
                       Télécharger
                    </a>
                    ${isExpired ? `<button class="serveur-button" onclick="openModal(${server.id}, '${vpnFile}', '${passType}')">Mettre à jour l'URL</button>` : ""}
                `;

                container.appendChild(serverDiv);

                if (!isExpired) {
                    setInterval(() => {
                        const timeSpan = document.getElementById(`time-${index}`);
                        if (timeSpan) {
                            timeSpan.innerHTML = getTimeLeft(server.expirationTime);
                        }
                    }, 1000); // Mise à jour toutes les secondes
                }
            });
        } else {
            // Si aucun serveur n'est disponible, afficher un message d'absence de serveurs
            container.innerHTML = "<p>Aucun serveur disponible pour ce fichier.</p>";
        }
    } catch (error) {
        console.error("Erreur :", error);
        const container = document.querySelector(".testimonials-wrapper");
        if (container) {
            container.innerHTML = "<p>Une erreur s'est produite lors de la récupération des serveurs.</p>";
        }
    }
}

// Fonction pour calculer le temps restant avant expiration
function getTimeLeft(expirationTime) {
    const now = Date.now();
    const timeLeft = expirationTime - now;

    if (timeLeft <= 0) {
        return "<span style='color:red;'>EXPIRED</span>";
    } else {
        const hours = Math.floor(timeLeft / 3600000); // 1 heure = 3 600 000 ms
        const minutes = Math.floor((timeLeft % 3600000) / 60000); // 1 minute = 60 000 ms
        const seconds = Math.floor((timeLeft % 60000) / 1000); // 1 seconde = 1 000 ms
        return `${hours}h ${minutes}m ${seconds}s`;
    }
}

// Fonction pour ouvrir la modale de mise à jour de l'URL
function openModal(serverId, vpnFile, passType) {
    currentServerId = serverId; // Stocker l'ID du serveur
    currentVpnFile = vpnFile; // Stocker le fichier VPN
    currentPassType = passType; // Stocker le type de pass
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// Fonction pour soumettre la nouvelle URL
async function submitNewUrl() {
    const newUrl = document.getElementById("newUrlInput").value;
    const adminName = document.getElementById("adminNameInput").value;
    const adminPassword = document.getElementById("adminPasswordInput").value;

    // Vérifier les identifiants côté serveur
    try {
        const verificationResponse = await fetch("http://localhost:2000/verify-admin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ adminName, adminPassword })
        });

        const verificationData = await verificationResponse.json();
        if (!verificationData.success) {
            alert("Nom d'admin ou mot de passe incorrect.");
            return;
        }

        // Si les identifiants sont corrects, mettre à jour l'URL
        const updateResponse = await fetch(`http://localhost:2000/update-download-url/${currentVpnFile}/${currentPassType}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ serverId: currentServerId, newDownloadUrl: newUrl })
        });

        const updateData = await updateResponse.json();
        console.log("Serveur mis à jour :", updateData);

        // Fermer la modale
        document.getElementById("modal").style.display = "none";
        document.getElementById("overlay").style.display = "none";

        // Recharger les serveurs après la mise à jour
        fetchServers(currentVpnFile, currentPassType);
    } catch (error) {
        console.error("Erreur lors de la mise à jour du lien de téléchargement :", error);
    }
}

// Lancer la fonction fetchServers au chargement de la page
const urlParams = new URLSearchParams(window.location.search);
const vpnFile = urlParams.get("vpnFile");
const passType = urlParams.get("passType");
const description = urlParams.get("description"); // Récupérer la description depuis l'URL

if (vpnFile && passType) {
    updateSiteInfo(vpnFile, description); // Mettre à jour le nom du fichier et la description
    fetchServers(vpnFile, passType);
} else {
    console.error("Aucun fichier VPN ou pass spécifié.");
    const container = document.querySelector(".testimonials-wrapper");
    if (container) {
        container.innerHTML = "<p>Aucun fichier VPN ou pass spécifié dans l'URL.</p>";
    }
}

// Enregistrement du Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
        console.log('Service Worker enregistré avec succès:', registration);
    }).catch(function(error) {
        console.log('Erreur lors de l\'enregistrement du Service Worker:', error);
    });
}

// Fonction pour envoyer un message au Service Worker pour le téléchargement
function requestDownloadFromServiceWorker(vpnFile, passType, serverId) {
    if (navigator.serviceWorker) {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.active.postMessage({ type: 'DOWNLOAD', url: `http://localhost:2000/download/${vpnFile}/${passType}/${serverId}` });
        });
    }
}

// Ajouter un écouteur d'événement pour chaque bouton "Télécharger"
document.querySelectorAll('.serveur-button').forEach((button, index) => {
    const vpnFile = button.dataset.vpnFile;
    const passType = button.dataset.passType;
    const serverId = button.dataset.serverId;

    button.addEventListener('click', function() {
        requestDownloadFromServiceWorker(vpnFile, passType, serverId);
    });
});
