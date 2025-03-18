
// sélectionner le parent "pays"
const header = document.querySelector('.header-section');

const dropdown = document.querySelector('.dropdown-container');

const dropdownTrigger =  document.querySelector('.dropdown-trigger');

const dropdownMenu = document.querySelector('.dropdown-menu');

const installationSection = document.querySelector('.installation-guide');

const navbarIcon = document.getElementById('navbar-icon');

const navList = document.getElementById('nav-list');

const icon = document.getElementById('icon');

const countryColor = document.querySelectorAll('.country-color');

const country = document.querySelectorAll('.country');

// funtion pour afficher le navbar lorsqu'on click sur le logo
icon.addEventListener('click', (event) => {
  event.preventDefault();
  navList.classList.add('active');
  navbarIcon.style.display ='none';
});

// Ajouter un événement au document pour fermer la navList
document.addEventListener('click', (event) => {
  const isClickInsideNav = navList.contains(event.target);
  const isClickOnIcon = icon.contains(event.target);

  // si le clic est à l'exterieur de naList et icon
  if (!isClickInsideNav && !isClickOnIcon) {
    navList.classList.remove('active');
    navbarIcon.style.display = 'block';
  }
});



// Fonction pour empêcher le défilement horizontal
function preventHorizontalScroll() {
  document.documentElement.style.overflowX = 'hidden';
  document.body.style.overflowX = 'hidden';
}

// Fonction pour empêcher le défilement horizontal
function allowHorizontalScroll() {
  document.documentElement.style.overflowX = '';
  document.body.style.overflowX = '';
}


// fonction pour raflechi la page lorsqu'on click sur le logo
function logoContainer() {
  window.location.href ='index.html';
} 





// Ajouter un écouter dévénement pour le click
dropdown.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const isClickInsideDropdown = dropdown.contains(e.target);

  if (!isClickInsideDropdown) {
    dropdown.classList.remove('open');
  }
});

// animation lorsque le souris passe sur la liste des pays
country.forEach(countryElement => {
  countryElement.addEventListener('mouseover', () => {
    countryColor.forEach(countryColor => {
      countryColor.classList.add('active-color');
    });
  });

  countryElement.addEventListener('mouseout', () => {
    countryColor.forEach(countryColor => {
      countryColor.classList.remove('active-color');
    });
  });
});

// donner de la couleur au header en cas de scroll

function allowHorizontalScroll() {
  document.body.style.overflowX = 'auto';
}

function preventHorizontalScroll() {
  document.body.style.overflowX = 'hidden';
}

window.addEventListener('scroll', () => {
  const sectionPosition = installationSection.getBoundingClientRect();
  const isInstallationVisible = sectionPosition.top <= window.innerHeight && sectionPosition.bottom >= 0;

  if (window.scrollY > 0 && !dropdown.classList.contains('open') && !isInstallationVisible) {
    header.style.position = 'sticky';
    header.style.top = '0';
    header.style.backgroundColor = '#041e2c7f';
    header.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    allowHorizontalScroll();
  } else {
    header.style.position = 'relative';
    header.style.backgroundColor = 'transparent';
    header.style.boxShadow = 'none';
    preventHorizontalScroll();
  }
});


// rédirection des pays
function coteIvoire() {
  window.location.href = 'index3.html';
}

function cameroun() {
  window.location.href = 'Sff-cameroun.html';
}

function senegal() {
  window.location.href = 'Sff-sénégal.html';
}

function burkina() {
  window.location.href = 'Sff-burkina-faso.html';
}

function mali() {
  window.location.href = 'Sff-mali.html';
}

function niger() {
  window.location.href = 'Sff-niger.html';
}

function guinee() {
  window.location.href = 'Sff-guinée.html';
}

function togo() {
  window.location.href = 'Sff-togo.html';
}

function bénin() {
  window.location.href = 'Sff-bénin.html';
}

function congoRd() {
  window.location.href = 'Sff-rd-congo.html';
}

function congoRépublique() {
  window.location.href = 'Sff-république-congo.html';
}

function algerie() {
  window.location.href = 'Sff-algerie.html';
}

function tunisie() {
  window.location.href = 'Sff-tunisie.html';
}

function madagascar() {
  window.location.href = 'Sff-madagascar.html';
}

function nigeria() {
  window.location.href = 'Sff-nigeria.html';
}

function sudAfric() {
  window.location.href = 'Sff-afrique-sud.html';
}


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


const testimonials = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

// Fonction pour afficher le témoignage actif
function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove('active');
    if (i === index) {
      testimonial.classList.add('active');
    }
  });
}

// Bouton "Suivant"
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

// Bouton "Précédent"
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

// Initialiser le premier témoignage
showTestimonial(currentIndex);



const countryRedirects = {
  CI: "index3.html",
  // CM: "Sff-cameroun.html",
  // SN: "Sff-sénégal.html",
  // BF: "Sff-burkina-faso.html",
  // ML: "Sff-mali.html",
  // NE: "Sff-niger.html", 
  // GN: "Sff-guinée.html", 
  // TG: "Sff-togo.html", 
  // BJ: "Sff-bénin.html",
  // CD: "Sff-rd-congo.html", 
  // CG: "Sff-république-congo.html", 
  // DZ: "Sff-algerie.html",
  // TN: "Sff-tunisie.html",
  // MG: "Sff-madagascar.html", 
  // NG: "Sff-nigeria.html", 
  // ZA: "Sff-afrique-sud.html",
}

// Boutons pour afficher l'offre premium
const preniumBtns = document.querySelectorAll('.btnj');

// Fonction pour activer le spinner lié au bouton cliqué
const openSpinner = (button) => {
  const spinner = button.querySelector('.spinner');
  const premiumSpan1 = button.querySelector('#premium-span1');
  const premiumSpan2 = button.querySelector('#premium-span2');
  const freeSpan = document.querySelector('#free-span');

  if (spinner) spinner.style.display = 'inline-block'; // Afficher le spinner
  if (premiumSpan1) premiumSpan1.style.opacity = '0.5';
  if (premiumSpan2) premiumSpan2.style.opacity = '0.5';
  if (freeSpan) freeSpan.style.opacity = '0.5';
  
  // Ajouter une classe active au bouton cliqué
  button.classList.add('active');
};

// Fonction pour désactiver le spinner
const closeSpinner = (button) => {
  const spinner = button.querySelector('.spinner');
  const premiumSpan1 = button.querySelector('#premium-span1');
  const premiumSpan2 = button.querySelector('#premium-span2');

  if (spinner) spinner.style.display = 'none'; // Cacher le spinner
  if (premiumSpan1) premiumSpan1.style.opacity = '1';
  if (premiumSpan2) premiumSpan2.style.opacity = '1';
  
  // Retirer la classe active du bouton cliqué
  button.classList.remove('active');
};

// Gestionnaire d'événement pour chaque bouton
preniumBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    openSpinner(btn); // Afficher le spinner pour ce bouton
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();

      if (data && data.country_code) {
        const userCountryCode = data.country_code.toUpperCase();

        if (countryRedirects[userCountryCode]) {
          window.location.href = countryRedirects[userCountryCode];
        } else {
          alert("Désolé, les fichiers VPN pour votre pays ne sont pas disponibles pour l'instant. Vous pouvez vérifier la liste des pays dans la section pays.");
        }
      } else {
        alert("Impossible de détecter votre pays. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la détection de l'adresse IP :", error);
      alert("Erreur lors de la détection de votre pays. Veuillez réessayer.");
    } finally {
      closeSpinner(btn); // Cacher le spinner une fois l'action terminée
    }
  });
});

//fonction pour la redirection lors du click sur le freeBtn
const freeBtn = document.querySelector('.btn-primary');
freeBtn.addEventListener('click', () => {
  openSpinner(freeBtn);
  setTimeout(() => {
    window.location.href = '/VPNserveur.html?vpnFile=socksip-tunnel&passType=direct&description=Avec%20nos%20fichiers%20𝙎𝙊𝘾𝙆𝙎𝙄𝙋%20𝙏𝙐𝙉𝙉𝙀𝙇,%20bénéficiez%20d%27une%20navigation%20fluide%20et%20sans%20restriction,%20tout%20en%20maintenant%20une%20sécurité%20optimale.';
    closeSpinner(freeBtn);
  }, 3000);
});



// redirection vers la page de contact
function goToContactPage() {
  window.open('https://t.me/Surf_For_Free_services' ,'_blank');
}

function telegramGroup() {
  window.open('https://t.me/internetgratuitillimiteplus', '_blank');
}


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
