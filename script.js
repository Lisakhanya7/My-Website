const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');
const navbar = document.getElementById('navbar');

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'a') {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

const navigateToSection = (targetId) => {
  const targetSection = document.getElementById(targetId);
  if (!targetSection) return;

  sections.forEach(section => section.style.display = 'none');
  targetSection.style.display = 'block';
  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  navbarLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
  });

  history.replaceState(null, '', `#${targetId}`);
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    navigateToSection(targetId);
  });
});

navbarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    navigateToSection(targetId);
  });
});

// toggle a class on the header when the page is scrolled, for a stronger background
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Portfolio filter functionality
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const projectCards = document.querySelectorAll('.project-card');

portfolioFilters.forEach(filter => {
  filter.addEventListener('click', function () {
    const filterValue = this.getAttribute('data-filter');
    
    // Update active filter button
    portfolioFilters.forEach(f => f.classList.remove('active'));
    this.classList.add('active');
    
    // Filter project cards
    projectCards.forEach(card => {
      if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

window.addEventListener('DOMContentLoaded', () => {
  sections.forEach((section, idx) => {
    section.style.display = idx === 0 ? 'block' : 'none';
  });
  if (navbarLinks.length) {
    navbarLinks[0].classList.add('active');
  }
});

// PDF links now open in a separate browser tab, so no embedded viewer is required.
