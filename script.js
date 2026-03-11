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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

navbarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    navbarLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');

    sections.forEach(section => section.style.display = 'none');
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = 'block';
    }
  });
});

window.addEventListener('scroll', () => {
  const section2 = document.getElementById('section2');
  if (!section2 || !navbar) return;

  const section2Top = section2.offsetTop;
  const scrollPosition = window.scrollY + navbar.offsetHeight;

  if (scrollPosition > section2Top) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
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

// PDF Document Viewer Functionality
const docButtons = document.querySelectorAll('.doc-btn');
const pdfDisplay = document.getElementById('pdf-display');

if (docButtons.length > 0 && pdfDisplay) {
  docButtons.forEach(button => {
    button.addEventListener('click', function () {
      const pdfFile = this.getAttribute('data-pdf');
      
      // Update active button
      docButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Update PDF display
      // encode URI to handle spaces or special characters in filenames
      pdfDisplay.src = encodeURI(pdfFile);
    });
  });
}

// Make certificate icons open in the same PDF viewer
const certBadges = document.querySelectorAll('.cert-badge');
if (certBadges.length > 0 && pdfDisplay) {
  certBadges.forEach(badge => {
    badge.addEventListener('click', function(e) {
      e.preventDefault();
      const pdfFile = this.getAttribute('data-pdf') || this.getAttribute('href');
      if (pdfFile) {
        pdfDisplay.src = encodeURI(pdfFile);
      }
      // optionally scroll to documents section
      const documentsSection = document.getElementById('documents');
      if (documentsSection) {
        documentsSection.scrollIntoView({ behavior: 'smooth' });
      }
      // clear active state on doc buttons
      docButtons.forEach(btn => btn.classList.remove('active'));
    });
  });
}