// sélectionner le parent "pays"
const header = document.querySelector('.header-section');

const dropdown = document.querySelector('.dropdown-container');

const dropdownTrigger =  document.querySelector('.dropdown-trigger');

const dropdownMenu = document.querySelector('.dropdown-menu');

const installationSection = document.querySelector('.installation-guide');

const navbarIcon = document.getElementById('navbar-icon');

const navList = document.getElementById('nav-list');

const icon = document.getElementById('icon');

// funtion pour afficher le navbar lorsqu'on click sur le logo
icon.addEventListener('click', (event) => {
  event.preventDefault();
  navList.style.right = '0';
  navList.style.display = 'flex';
  navbarIcon.style.display ='none';
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






// Ajouter un écouter dévénement pour le click
dropdown.addEventListener('click', (e) => {
  e.preventDefault();
  dropdown.classList.toggle('open');
  dropdownTrigger.style.textDecoration = 'none';
  dropdownMenu.style.right = '0'
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
    header.style.backgroundColor = '#f8f9fa';
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


function telegramGroup() {
  window.open('https://t.me/TechnologieGaig', '_blank');
}