

// // Créer la scène
const scene = new THREE.Scene();

// Ajouter une caméra
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 3;

// Ajouter un rendu avec fond transparent
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0); // 0x000000 = noir, 0 = transparence
document.getElementById('globet').appendChild(renderer.domElement);

// Créer une sphère pour le globe
const geometry = new THREE.SphereGeometry(.8, 32, 32);
const texture = new THREE.TextureLoader().load('https://res.cloudinary.com/ddqfmqin7/image/upload/v1734443681/worldwide-connection-blue-background-illustration_53876-63933.jpg_uymm6x.jpg');
const material = new THREE.MeshStandardMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Ajouter une lumière directionnelle (simulant le soleil)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Ajouter une lumière ambiante pour éclairer uniformément
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Lumière ambiante
scene.add(ambientLight);

// Ajouter une lumière hémisphérique (pour une lumière plus uniforme)
const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
scene.add(hemisphereLight);

// Mettre à jour l'aspect de la caméra et la taille du renderer lorsque la fenêtre est redimensionnée
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Fonction d'animation
function animate() {
  requestAnimationFrame(animate);
  globe.rotation.y += 0.002; // Rotation de gauche à droite
  renderer.render(scene, camera);
}

animate();





// Barre de recherche


const searchBar = document.getElementById('searchbar');
const files = document.querySelectorAll('.file');
const navContainer = document.getElementById('nav-container');
const openNavbar = document.getElementById('navbar-icon');
const searchBarIcon = document.getElementById('searchBarIcon');
const homeBtn = document.getElementById('acceuil-btn');
const searchbarBtn = document.querySelectorAll('.searchbarBtn');
const searchbarContainer = document.getElementById('searchbar-container');

// Vérifie si toutes les lettres de `input` sont présentes dans `target`, indépendamment de l'ordre
function fuzzyMatch(input, target) {
  const inputLetters = input.split('');
  return inputLetters.every(letter => target.includes(letter));
}

// Fonction de recherche
searchBar?.addEventListener('input', function () {
  const searchTerm = searchBar.value.trim().toLowerCase();

  files.forEach(file => {
    const fileName = file.getAttribute('data-name')?.toLowerCase() || '';

    if (fuzzyMatch(searchTerm, fileName)) {
      file.classList.remove('hidden');
    } else {
      file.classList.add('hidden');
    }
  });
});

// Fonction pour effectuer une recherche et scroller vers le fichier correspondant
function searchAndScroll() {
  const searchTerm = searchBar.value.trim().toLowerCase();
  if (!searchTerm) return;

  const matchedFile = Array.from(files).find(file => {
    const fileName = file.getAttribute('data-name')?.toLowerCase() || '';
    return fuzzyMatch(searchTerm, fileName);
  });

  if (matchedFile) {
    matchedFile.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    alert('Aucun fichier correspondant trouvé.');
  }
}

// Ajout des événements "click" et "Enter"
searchBarIcon?.addEventListener('click', searchAndScroll);
searchBar?.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    searchAndScroll();
  }
});

// Gestion de la navbar
openNavbar?.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  navContainer?.classList.add('active');
  openNavbar.style.display ='none';
});

document.addEventListener('click', (e) => {
  if (navContainer && !navContainer.contains(e.target) && e.target !== openNavbar) {
    navContainer.classList.remove('active');
    openNavbar.style.display ='block';
    searchBar.value = '';
  }
});

// Redirection vers la page d'accueil
homeBtn?.addEventListener('click', () => {
  window.location.href = 'Sff-acceuil.html';
});

// Fonction pour afficher la barre de recherche
searchbarBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    searchbarContainer?.classList.add('active');
  });

  document.addEventListener('click', (e) => {
    if (searchbarContainer && !searchbarContainer.contains(e.target) && !Array.from(searchbarBtn).includes(e.target)) {
      searchbarContainer.classList.remove('active');
    }
  });
});

// Empêcher la propagation du clic sur la barre de recherche
searchbarContainer?.addEventListener('click', (e) => {
  e.stopPropagation(); // Empêche la propagation pour éviter de déclencher l'écouteur du document
});

// function pour changer le background color du header
window.addEventListener('scroll', () => {
  const header = document.getElementById('header-section');

  if (window.scrollY > 0) {
    header.style.backgroundColor = '#041e2c7f';
  } else {
    header.style.backgroundColor = 'transparent';
  }
});

// Sélctionner tous éléments FAQ
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.fat-question');

  question.addEventListener('click', () => {
    // Fermer les autres FAQ ouvertes
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    //Activer ou désactiver la FAQ actuelle
    item.classList.toggle('active');
  });
});





const texteArea = document.getElementById('vpnId-textarea');
const updateButton = document.getElementById('updateButton');
const confirmIcon = document.querySelector('.confirme-action');
const modal = document.getElementById('free-modal');
const closeModal = document.getElementById('close-free-modal');
const whatsappBtn = document.getElementById('whatsapp-btn');
const telegramBtn = document.getElementById('telegram-btn');
const freeBtn = document.getElementById('freeBtn');
const span1 = document.getElementById('span1');
const span2 = document.getElementById('span2');
let dataId;
let isVpnIdConfirmed = false; // Pour le formulaire gratuit

// Variables dynamiques pour stocker les données des boutons payants
let currentFile, currentOption, currentPrice;

// Gestion des tickets
let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 1;
let lastResetDate = localStorage.getItem('lastResetDate') || getFormattedDate(new Date());

if (lastResetDate !== getFormattedDate(new Date())) {
  ticketCount = 1;
  localStorage.setItem('ticketCount', ticketCount);
  localStorage.setItem('lastResetDate', getFormattedDate(new Date()));
}

// Gestion de l'entrée dans le champ texte
texteArea.addEventListener('input', () => {
  if (texteArea.value.trim() === '') {
    resetTextAreaStyles(texteArea, updateButton, confirmIcon);
  } else {
    adjustTextAreaHeight(texteArea);
  }
});

// Confirmation de l'ID VPN
updateButton.addEventListener('click', () => {
  const textAreaValue = texteArea.value.trim();
  if (textAreaValue === '') {
    alert('Veuillez entrer votre ID VPN avant de confirmer.');
    return;
  }
  dataId = textAreaValue;
  updateButton.setAttribute('data-vpnId', textAreaValue);
  confirmIcon.style.display = 'inline-block';
  updateButton.style.backgroundColor = '#02e002';
  span1.style.display = 'none';
  span2.style.display = 'inline-block';
  isVpnIdConfirmed = true; // Marque l'ID comme confirmé
});

// Ouverture et fermeture du modal
freeBtn.addEventListener('click', () => {
  setModalData(freeBtn); // Utilise les données du bouton gratuit
  modal.classList.add('active');
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('active');
  texteArea.value = '';
  confirmIcon.style.display = 'none';
  updateButton.style.backgroundColor = '#ffc107';
  span1.style.display = 'inline-block';
  span2.style.display = 'none';
  isVpnIdConfirmed = false; // Réinitialise la confirmation
});

// Boutons 'buy-btn'
const buyBtns = document.querySelectorAll('.buy-btn');

// Ajouter un gestionnaire d'événements pour chaque bouton 'buy-btn'
buyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    setModalData(btn); // Utilise les données du bouton cliqué
    modal.classList.add('active');
  });
});

// Fonction pour copier les attributs d'un bouton dans les variables dynamiques
function setModalData(button) {
  currentFile = button.getAttribute('data-file');
  currentOption = button.getAttribute('data-option');
  currentPrice = button.getAttribute('data-price');
}

// Bouton WhatsApp
whatsappBtn.addEventListener('click', () => {
  if (!isVpnIdConfirmed) {
    alert('Veuillez cliquer sur "Enregistrer" pour valider votre ID VPN avant de continuer.');
    return;
  }
  if (validateVpnId(texteArea)) {
    sendMessage('WhatsAppWeb', currentFile, currentOption, currentPrice, dataId, ticketCount++);
  }
});

// Bouton Telegram
telegramBtn.addEventListener('click', () => {
  if (!isVpnIdConfirmed) {
    alert('Veuillez cliquer sur "Enregistrer" pour valider votre ID VPN avant de continuer.');
    return;
  }
  if (validateVpnId(texteArea)) {
    sendMessage('TelegramWeb', currentFile, currentOption, currentPrice, dataId, ticketCount++);
  }
});

// Fonction utilitaires
function validateVpnId(input) {
  const vpnId = input.value.trim();
  if (vpnId === '') {
    alert('Veuillez entrer votre ID VPN dans le champ prévu.');
    return false;
  }
  return true;
}

function sendMessage(platform, file, option, price, vpnId, ticket) {
  localStorage.setItem('ticketCount', ticket);
  const now = new Date();
  const formattedDate = getFormattedDate(now);
  const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  let salutation;
  const hour = now.getHours();
  if (hour >= 5 && hour < 12) {
    salutation = '𝘽𝙊𝙉𝙅𝙊𝙐𝙍';
  } else if (hour >= 12 && hour < 18) {
    salutation = '𝘽𝙊𝙉𝙉𝙀 𝘼𝙋𝙍𝙀̀𝙎-𝙈𝙄𝘿𝙄';
  } else {
    salutation = '𝘽𝙊𝙉𝙎𝙊𝙄𝙍';
  }

  const userMessage = encodeURIComponent(`
TICKET: ${ticket} du ${formattedDate} ${formattedTime}

${salutation}, 𝙅𝙀 𝙑𝙀𝙐𝙓 𝙐𝙉 𝙁𝙄𝘾𝙃𝙄𝙀𝙍:


- Nom du fichier: ${file}

- Pass: ${option}

- Prix: ${price}

- VPN ID: ${vpnId}
`);

  const redirectURL =
    platform === 'WhatsAppWeb'
      ? `https://wa.me/?text=${userMessage}`
      : `https://t.me/Payment_FreeSurf?text=${userMessage}`;
  const isMobile = /iphone|android/i.test(navigator.userAgent);

  if (!isMobile) {
    alert(`Vous serez redirigé vers ${platform}. Assurez-vous d'être connecté.`);
  }
  window.open(redirectURL, '_blank');
  modal.classList.remove('active');
  texteArea.value = '';
  confirmIcon.style.display = 'none';
  updateButton.style.backgroundColor = '#ffc107';
  span1.style.display = 'inline-block';
  span2.style.display = 'none';
  isVpnIdConfirmed = false; // Réinitialise la confirmation
}

function resetTextAreaStyles(textArea, button, icon) {
  textArea.style.height = '20px';
  textArea.style.padding = '0.5rem';
  button.style.backgroundColor = '#ffc107';
  icon.style.display = 'none';
}

function adjustTextAreaHeight(textArea) {
  textArea.style.height = 'auto';
  textArea.style.height = `${textArea.scrollHeight}px`;
  textArea.style.padding = '5px';
}

function getFormattedDate(date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}



// redirection vers la page telegram 
function iconContact() {
  window.open('https://t.me/Surf_For_Free_services' ,'_blank');
}

function telegramGroup() {
  window.open('https://t.me/TechnologieGaig', '_blank');
}
