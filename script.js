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

window.addEventListener('DOMContentLoaded', () => {
  sections.forEach((section, idx) => {
    section.style.display = idx === 0 ? 'block' : 'none';
  });
  if (navbarLinks.length) {
    navbarLinks[0].classList.add('active');
  }
});