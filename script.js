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
