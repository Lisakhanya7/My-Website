const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');



document.addEventListener('keydown', function(event) {
  if (event.key === 'a' || event.key === 'A') {
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
  }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

navbarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        navbarLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        sections.forEach(section => section.style.display = 'none');

        const targetId = this.getAttribute('href').replace('#', '');
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});

window.addEventListener('scroll', () => {
  const section2 = document.getElementById('section2');
  const navbar = document.getElementById('navbar');
  const section2Top = section2.offsetTop;
  const scrollPosition = window.scrollY + navbar.offsetHeight;

  if (scrollPosition > section2Top) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});