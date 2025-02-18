// Sélectionner les éléments nécessaires
const header = document.querySelector('.header-section');
const dropdown = document.querySelector('.dropdown-container');
const dropdownTrigger = document.querySelector('.dropdown-trigger');
const dropdownMenu = document.querySelector('.dropdown-menu');
const navbarIcon = document.getElementById('navbar-icon');
const navList = document.getElementById('nav-list');
const icon = document.getElementById('icon');
const countryColor = document.querySelectorAll('.country-color');
const country = document.querySelectorAll('.country');

// Fonction pour afficher le menu navbar lorsqu'on clique sur le logo
if (icon && navList && navbarIcon) {
  const toggleNavMenu = (event) => {
    event.preventDefault();
    navList.classList.toggle('active');
    navbarIcon.style.display = navList.classList.contains('active') ? 'none' : 'block';
  };

  icon.addEventListener('click', toggleNavMenu);

  // Fermer le menu navbar si clic en dehors
  document.addEventListener('click', (event) => {
    const isClickInsideNav = navList.contains(event.target);
    const isClickOnIcon = icon.contains(event.target);

    if (!isClickInsideNav && !isClickOnIcon && navList.classList.contains('active')) {
      toggleNavMenu(event);
    }
  });
}

// Fonction pour rafraîchir la page lorsqu'on clique sur le logo
function logoContainer() {
  window.location.href = 'index4.html';
}

// Gestion du dropdown
if (dropdown) {
  const toggleDropdown = (e) => {
    e.preventDefault();
    dropdown.classList.toggle('open');
  };

  dropdown.addEventListener('click', toggleDropdown);

  document.addEventListener('click', (e) => {
    const isClickInsideDropdown = dropdown.contains(e.target);

    if (!isClickInsideDropdown && dropdown.classList.contains('open')) {
      toggleDropdown(e);
    }
  });
}

// Animation lors du survol des pays
if (country && countryColor) {
  const toggleCountryColor = (isActive) => {
    countryColor.forEach((colorElement) => {
      colorElement.classList.toggle('active-color', isActive);
    });
  };

  country.forEach((countryElement) => {
    countryElement.addEventListener('mouseover', () => toggleCountryColor(true));
    countryElement.addEventListener('mouseout', () => toggleCountryColor(false));
  });
}

// Changer le style du header lors du scroll
if (header) {
  const updateHeaderStyle = () => {
    const isScrolled = window.scrollY > 0;
    const isDropdownOpen = dropdown && dropdown.classList.contains('open');

    if (isScrolled && !isDropdownOpen) {
      header.style.position = 'fixed';
      header.style.top = '0';
      header.style.width = '100%';
      header.style.backgroundColor = '#041e2c7f';
      header.style.boxShadow = '0px 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.position = 'relative';
      header.style.backgroundColor = 'transparent';
      header.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateHeaderStyle);
  });
}


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



// fontion pour envoyé les message de formulaire vers telegrame
document.getElementById('telegramForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // récupérer les données du formulaire
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;

  // Construire le texte du message
  const text =
   `
   - Nom : ${name}

   - Email : ${email}

   - Message : ${message}`;

  // générer le lien Telegram
  const telegramLink = `https://t.me/Surf_For_Free_services?text=${text}`;

  // Rediriger l'utilisateur vers Telegram avec le message prérempli
  window.open(telegramLink, '_blank');
});
