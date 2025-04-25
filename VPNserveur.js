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
  window.location.href = "index.html";
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
    const isDropdownOpen = dropdown && dropdown.classList.contains("open");

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

const BACKEND_URL = "https://8e5rg059k4.execute-api.eu-north-1.amazonaws.com";

let currentServerId = null;
let currentVpnFile = null;
let currentPassType = null;
let timerInterval = null;

// Fonction pour mettre à jour le nom du fichier et la description
function updateSiteInfo(vpnFile, description) {
  const siteNameSpan = document.querySelector(".site-name");
  const descriptionParagraph = document.querySelector("#introduction p");

  if (siteNameSpan && vpnFile) {
    siteNameSpan.textContent = vpnFile.toUpperCase();
  } else if (siteNameSpan) {
    siteNameSpan.textContent = "𝙎𝙐𝙎𝙆𝙄𝙋 𝙏𝙐𝙉𝙉𝙀𝙇";
  }

  if (descriptionParagraph && description) {
    descriptionParagraph.textContent = decodeURIComponent(description);
  } else if (descriptionParagraph) {
    descriptionParagraph.textContent =
      "Avec nos fichiers 𝙎𝙐𝙎𝙆𝙄𝙋-𝙏𝙐𝙉𝙉𝙀𝙇, bénéficiez d'une navigation fluide et sans restriction, tout en maintenant une sécurité optimale.";
  }
}

// Fonction pour récupérer les serveurs depuis le backend
async function fetchServers(vpnFile, passType) {
  const container = document.querySelector(".testimonials-wrapper");
  if (container) {
    container.innerHTML = `<span class="spinner"></span>`;
  }

  try {
    const response = await fetch(
      `${BACKEND_URL}/servers/${vpnFile}/${passType}`
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }

    const servers = await response.json();
    console.log("Serveurs récupérés :", servers);

    if (container) {
      container.innerHTML = "";
    }

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
              <img src="${server.imageUrl}" alt="Serveur ${
          server.location
        }" class="serveur-image">
            </div>
            <ul>
              <li>Time Left: <span id="time-${index}" class="serveur-time">${timeLeft}</span></li>
              <li>Port: ${server.ports}</li>
              <li>Duration account: ${server.duration}</li>
              <li><strong>Protocol: ${server.protocol}</strong></li>
            </ul>
          </div>
          <div class="dowload-container">
                      <a href="${
                        server.downloadUrl
                      }" class="serveur-button" id="download-button-${index}"
             data-vpn-file="${vpnFile}" data-pass-type="${passType}" data-server-id="${
          server.id
        }" 
             ${isExpired ? "disabled" : ""} style="position: relative;">
             <span style="position: absolute; display: none;" class="spinner2"></span>
             <span class="dowload-span">Télécharger</span>
          </a>
          ${
            isExpired
              ? `<a class="serveur-button" onclick="openModal(${server.id}, '${vpnFile}', '${passType}')">Mettre à jour l'URL</a>`
              : ""
          }
          </div>
        `;

        container.appendChild(serverDiv);

        const downloadButton = document.getElementById(
          `download-button-${index}`
        );
        if (downloadButton) {
          downloadButton.addEventListener("click", async (event) => {
            if (isExpired) {
              event.preventDefault();
              showErrorModal(
                "Le fichier est expiré. Veuillez attendre que l'administrateur le mette à jour."
              );
            } else {
              event.preventDefault(); // Empêcher l'ouverture immédiate du lien
              const spinnerTwo = downloadButton.querySelector(".spinner2");
              const dowloadSpan = downloadButton.querySelector(".dowload-span");

              if (spinnerTwo) spinnerTwo.style.display = "inline-block"; // Activer le spinner
              if (dowloadSpan) dowloadSpan.style.opacity = "0.5";
              downloadButton.classList.add("active");

              try {
                await requestDownloadFromServiceWorker(
                  vpnFile,
                  passType,
                  server.id
                );

                // Attendre que le téléchargement commence avant de masquer le spinner
                setTimeout(() => {
                  if (spinnerTwo) spinnerTwo.style.display = "none";
                  if (dowloadSpan) dowloadSpan.style.opacity = "1";
                  downloadButton.classList.remove("active");

                  // Rediriger vers l'URL de téléchargement après un court délai
                  window.location.href = server.downloadUrl;
                }, 2000);
              } catch (error) {
                console.error("Erreur de téléchargement :", error);
                if (spinnerTwo) spinnerTwo.style.display = "none";
                if (dowloadSpan) dowloadSpan.style.opacity = "1";
                downloadButton.classList.remove("active");
              }
            }
          });
        }
      });

      updateAllTimers(servers);
    } else {
      container.innerHTML = "<p>Aucun serveur disponible pour ce fichier.</p>";
    }
  } catch (error) {
    console.error("Erreur :", error);
    if (container) {
      container.innerHTML = `<p>Erreur : ${error.message}</p>`;
    }
    showToast("Une erreur est survenue lors de la récupération des serveurs.");
  }
}

// Fonction pour calculer le temps restant avant expiration
function getTimeLeft(expirationTime) {
  const now = Date.now();
  const timeLeft = expirationTime - now;

  if (timeLeft <= 0) {
    return "<span style='color:red;'>EXPIRED</span>";
  } else {
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}

// Fonction pour mettre à jour tous les timers
function updateAllTimers(servers) {
  if (timerInterval) {
    clearInterval(timerInterval); // Nettoyer l'intervalle précédent
  }

  timerInterval = setInterval(() => {
    servers.forEach((server, index) => {
      const timeSpan = document.getElementById(`time-${index}`);
      if (timeSpan) {
        timeSpan.innerHTML = getTimeLeft(server.expirationTime);
      }
    });
  }, 1000);
}

function openModal(serverId, vpnFile, passType) {
  currentServerId = serverId;
  currentVpnFile = vpnFile;
  currentPassType = passType;

  const dateInputContainer = document.getElementById('dateInputContainer');
  const expirationInput = document.getElementById('expirationTimeInput');
  const formattedDateDisplay = document.getElementById('formattedDate');

  // Clé unique pour ce serveur spécifique
  const serverKey = `lastExpirationTime_${vpnFile}_${passType}_${serverId}`;
  const lastExpirationTime = localStorage.getItem(serverKey);

  if (lastExpirationTime) {
    // Cache le champ mais pré-remplit la date pour information
    dateInputContainer.style.display = "none";
    
    // Affiche la prochaine date calculée (+2j +1min) à titre informatif
    const nextDate = new Date(lastExpirationTime);
    nextDate.setDate(nextDate.getDate() + 2);
    nextDate.setMinutes(nextDate.getMinutes() + 1);
    
    formattedDateDisplay.textContent = `Prochaine expiration auto: ${formatDateForDisplay(nextDate)}`;
  } else {
    // Affiche le champ pour saisie initiale
    dateInputContainer.style.display = "block";
    expirationInput.value = '';
    formattedDateDisplay.textContent = '';
  }

  document.getElementById("modal").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}


// Fonction helper pour le formatage d'affichage
function formatDateForDisplay(date) {
  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).replace(',', ' à');
}

// Fonction pour fermer la modale
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  document.getElementById("newUrlInput").value = "";
  document.getElementById("adminNameInput").value = "";
  document.getElementById("adminPasswordInput").value = "";
  document.getElementById("expirationTimeInput").value = "";
  document.getElementById("formattedDate").textContent = "";
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
}

// Fonction pour afficher la date formatée en temps réel
document
  .getElementById("expirationTimeInput")
  .addEventListener("change", function () {
    const date = new Date(this.value);
    const formattedDate = date
      .toLocaleString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(",", " à");

    document.getElementById("formattedDate").textContent = formattedDate;
  });

// Fonction pour convertir l'URL Google Drive en URL de téléchargement
function convertToDownloadUrl(url) {
  const regex = /https:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/view/;
  const match = url.match(regex);

  if (match) {
    const fileId = match[1];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url; // Si ce n'est pas une URL de Google Drive, on la retourne telle quelle
}

// Fonction pour soumettre le formulaire
// async function submitNewUrl() {
//   const submitButton = document.getElementById("submitButton");
//   const spinnerTwo = submitButton.querySelector(".spinner2");
//   const submitText = submitButton.querySelector(".submit-text");

//   // Activer le spinner et désactiver le bouton
//   spinnerTwo.style.display = "inline-block";
//   submitText.style.opacity = "0.5";
//   submitButton.disabled = true;

//   let newUrl = document.getElementById("newUrlInput").value;
//   const expirationTime = document.getElementById("expirationTimeInput").value;
//   const adminName = document.getElementById("adminNameInput").value;
//   const adminPassword = document.getElementById("adminPasswordInput").value;

//   // Vérifier si tous les champs sont vides
//   if (!newUrl && !expirationTime && !adminName && !adminPassword) {
//     showErrorModal("Veuillez remplir tous les champs.");
//     resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//     return;
//   }

//   // Vérifier chaque champ un par un et afficher un message d'erreur spécifique
//   if (!newUrl) {
//     showErrorModal("Veuillez entrer une URL de téléchargement.");
//     resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//     return;
//   }

//   if (!isValidUrl(newUrl)) {
//     showErrorModal("L'URL de téléchargement n'est pas valide.");
//     resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//     return;
//   }

//   if (!expirationTime) {
//     showErrorModal("Veuillez sélectionner une date d'expiration.");
//     resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//     return;
//   }

//   if (!adminName) {
//     showErrorModal("Veuillez entrer un nom d'admin.");
//     resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//     return;
//   }

//   if (!adminPassword) {
//     showErrorModal("Veuillez entrer un mot de passe.");
//     resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//     return;
//   }

//   // *** Conversion de l'URL avant l'envoi ***
//   newUrl = convertToDownloadUrl(newUrl);

//   // Envoyer les données au backend
//   try {
//     const verificationResponse = await fetch(`${BACKEND_URL}/verify-admin`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ adminName, adminPassword }),
//     });

//     const verificationData = await verificationResponse.json();
//     if (!verificationData.success) {
//       showErrorModal("Nom d'admin ou mot de passe incorrect.");
//       resetSubmitButton(spinnerTwo, submitText, submitButton); // Réinitialiser le bouton
//       return;
//     }

//     const updateResponse = await fetch(
//       `${BACKEND_URL}/update-download-url/${currentVpnFile}/${currentPassType}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           serverId: currentServerId,
//           newDownloadUrl: newUrl, // *** L'URL convertie est envoyée ici ***
//           expirationTime: expirationTime,
//         }),
//       }
//     );

//     const updateData = await updateResponse.json();
//     console.log("Serveur mis à jour :", updateData);

//     closeModal();
//     fetchServers(currentVpnFile, currentPassType);
//     showToast("L'URL a été mise à jour avec succès !");
//   } catch (error) {
//     console.error(
//       "Erreur lors de la mise à jour du lien de téléchargement :",
//       error
//     );
//     showErrorModal("Une erreur est survenue lors de la mise à jour du lien.");
//   } finally {
//     // Réinitialiser le bouton dans tous les cas (succès ou erreur)
//     resetSubmitButton(spinnerTwo, submitText, submitButton);
//   }
// }


async function submitNewUrl() {
  const submitButton = document.getElementById("submitButton");
  const spinnerTwo = submitButton.querySelector(".spinner2");
  const submitText = submitButton.querySelector(".submit-text");

  // Activation du spinner
  spinnerTwo.style.display = "inline-block";
  submitText.style.opacity = "0.5";
  submitButton.disabled = true;

  // Récupération des valeurs
  let newUrl = document.getElementById("newUrlInput").value;
  let expirationTime = document.getElementById("expirationTimeInput").value;
  const adminName = document.getElementById("adminNameInput").value;
  const adminPassword = document.getElementById("adminPasswordInput").value;

  // Validation des champs
  if (!newUrl || !adminName || !adminPassword) {
    showErrorModal("Veuillez remplir tous les champs obligatoires.");
    resetSubmitButton(spinnerTwo, submitText, submitButton);
    return;
  }

  // Conversion URL
  newUrl = convertToDownloadUrl(newUrl);

  // Gestion des dates par serveur
  const serverKey = `lastExpirationTime_${currentVpnFile}_${currentPassType}_${currentServerId}`;

  if (!expirationTime) {
    // Récupération de la dernière date pour CE SERVEUR
    const lastExpirationTime = localStorage.getItem(serverKey);
    
    if (lastExpirationTime) {
      // Calcul nouvelle date (+2j +1min)
      const newExpirationDate = new Date(lastExpirationTime);
      newExpirationDate.setDate(newExpirationDate.getDate() + 2);
      newExpirationDate.setMinutes(newExpirationDate.getMinutes() + 1);
      expirationTime = newExpirationDate.toISOString().slice(0, 16);
    } else {
      showErrorModal(`Veuillez saisir une date d'expiration initiale pour le serveur ${currentServerId}`);
      resetSubmitButton(spinnerTwo, submitText, submitButton);
      return;
    }
  } else {
    // Sauvegarde de la date pour CE SERVEUR
    localStorage.setItem(serverKey, expirationTime);
  }

  // Envoi au backend
  try {
    const verificationResponse = await fetch(`${BACKEND_URL}/verify-admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminName, adminPassword }),
    });

    if (!(await verificationResponse.json()).success) {
      showErrorModal("Authentification admin échouée");
      resetSubmitButton(spinnerTwo, submitText, submitButton);
      return;
    }

    await fetch(
      `${BACKEND_URL}/update-download-url/${currentVpnFile}/${currentPassType}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serverId: currentServerId,
          newDownloadUrl: newUrl,
          expirationTime: expirationTime
        }),
      }
    );

    closeModal();
    fetchServers(currentVpnFile, currentPassType);
    showToast("Mise à jour réussie !");

  } catch (error) {
    console.error("Erreur:", error);
    showErrorModal("Échec de la mise à jour");
  } finally {
    resetSubmitButton(spinnerTwo, submitText, submitButton);
  }
}

// Fonction pour réinitialiser le bouton Submit
function resetSubmitButton(spinnerTwo, submitText, submitButton) {
  spinnerTwo.style.display = "none"; // Masquer le spinner
  submitText.style.opacity = "1"; // Rétablir l'opacité du texte
  submitButton.disabled = false; // Réactiver le bouton
}

// Fonction pour valider une URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Fonction pour afficher une modale d'erreur
function showErrorModal(message) {
  const errorModal = document.getElementById("error-modal");
  const errorMessage = document.getElementById("error-message");
  const overlay = document.getElementById("overlay-2");

  errorMessage.textContent = message;
  errorModal.style.display = "block";
  overlay.style.display = "block";
}

// Fonction pour fermer la modale d'erreur
function closeErrorModal() {
  const errorModal = document.getElementById("error-modal");
  const overlay = document.getElementById("overlay-2");

  errorModal.style.display = "none";
  overlay.style.display = "none";
}

// Fonction pour afficher un toast
function showToast(message, duration = 3000) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  toastMessage.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, duration);
}

// Lancer la fonction fetchServers au chargement de la page
const urlParams = new URLSearchParams(window.location.search);
const vpnFile = urlParams.get("vpnFile");
const passType = urlParams.get("passType");
const description = urlParams.get("description");

if (vpnFile && passType) {
  updateSiteInfo(vpnFile, description);
  fetchServers(vpnFile, passType);
} else {
  console.error("Aucun fichier VPN ou pass spécifié.");
  const container = document.querySelector(".testimonials-wrapper");
  if (container) {
    container.innerHTML =
      "<p>Aucun fichier VPN ou pass spécifié dans l'URL.</p>";
  }
}

// Enregistrement du Service Worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then(function (registration) {
      console.log("Service Worker enregistré avec succès:", registration);
    })
    .catch(function (error) {
      console.log("Erreur lors de l'enregistrement du Service Worker:", error);
    });
}

// Fonction pour envoyer un message au Service Worker pour le téléchargement
function requestDownloadFromServiceWorker(vpnFile, passType, serverId) {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then(function (registration) {
      fetch(`${BACKEND_URL}/download/${vpnFile}/${passType}/${serverId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.downloadUrl) {
            registration.active.postMessage({
              type: "DOWNLOAD",
              url: data.downloadUrl,
            });
          } else {
            console.error("URL de téléchargement non trouvée.");
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération de l'URL de téléchargement :",
            error
          );
        });
    });
  }
}

// Ajouter un écouteur d'événement pour chaque bouton "Télécharger"
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".serveur-button").forEach((button, index) => {
    const vpnFile = button.dataset.vpnFile;
    const passType = button.dataset.passType;
    const serverId = button.dataset.serverId;

    button.addEventListener("click", function () {
      requestDownloadFromServiceWorker(vpnFile, passType, serverId);
    });
  });
});
