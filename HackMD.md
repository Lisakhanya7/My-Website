Lisakhanya Gumengi – Personal Portfolio Website
Project Overview

Project: Web Development – Build your first personal website
Story Points: 3
Tags: HTML, CSS, Responsive Web Design

I created a personal portfolio website to showcase my skills, projects, and contact info. The website is responsive, built with HTML, CSS (Grid & Flexbox), and a bit of JavaScript for navigation interactivity.

Live website link:https://lisakhanya7.github.io/My-Website/


Features

Fully responsive (mobile-first design)

Smooth scroll navigation

Interactive navbar highlighting

Skills section with icons linking to FreeCodeCamp

Portfolio section with project links

CV view link

Contact section with social media links


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lisakhanya's Personal Website</title>
  <link rel="stylesheet" href="style.css">
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
</head>
<body>
  <header class="header">
    <a href="#" class="logo">
      <img src="Personal%20logo.jpg" alt="Personal Website logo" style="height: 70px; vertical-align: middle;">
    </a>

    <nav class="navbar" id="navbar">
      <a href="#home" class="active" style="--i:1">Home</a>
      <a href="#about" style="--i:2">About</a>
      <a href="#skills" style="--i:3">Skills</a>
      <a href="#portfolio" style="--i:4">Portfolio</a>
      <a href="#contact" style="--i:5">Contact</a>
    </nav>
  </header>

  <section id="home" class="home">
    <div class="home-content">
      <div class="intro">
        <img src="XOLISA.jpg" alt="Lisakhanya's profile picture" class="profile-pic">
        <div class="home-content">
          <h1>Hello, I'm Lisakhanya Gumengi</h1>
          <h3>Web Developer student</h3>
          <p>I'm a student passionate about web development and technology. This site showcases my projects, skills, and experiences.</p>
          <p>Feel free to explore my work and get in touch if you have any questions or opportunities!</p>
        </div>
      </div>
    </div>
  </section>

  <section id="about" class="about">
    <div class="about-content">
      <h1>About Me</h1>
      <p>I am a dedicated web development student with a passion for creating dynamic and responsive websites. I enjoy learning new technologies and improving my skills in HTML, CSS, and JavaScript.</p>
    </div>
  </section>

  <section id="skills" class="skills">
    <div class="skills-content">
      <h1>My Skills</h1>
    </div>
    <div class="skill-sci">
      <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-html-and-html5" target="_blank">
        <i class='bx bxs-file-html'></i>
      </a>
      <a href="https://www.freecodecamp.org/learn/responsive-web-design/#basic-css" target="_blank">
        <i class='bx bxs-file-css'></i>
      </a>
      <a href="https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures" target="_blank">
        <i class='bx bxl-javascript'></i>
      </a>
    </div>
  </section>

  <section id="portfolio" class="portfolio">
    <h1>My Projects</h1>
    <div class="portfolio-content">
      <div class="project">
        <p>A personal portfolio website showcasing my skills and projects.</p>
      </div>
      <div class="project">
        <h2>Simple Website</h2>
        <p>A responsive website built with HTML and CSS.</p>
        <p>Website: <a href="https://lisakhanya7.github.io/My-Website/">My-Personal-Website</a></p>
      </div>
      <div class="project">
        <h2>VimBa App Prototype</h2>
        <p>Layout, Visual design and Interaction design using Figma.</p>
        <p>Figma: <a href="https://www.figma.com/proto/alYJ1phZiYMYwa5zpmM7Rk/Team-7-MUB-work-file?node-id=19241-3433&p=f&t=5BSIt5zJR9zrWhjO-1&scaling=scale-down&content-scaling=fixed&page-id=3140%3A3007&starting-point-node-id=19241%3A3433&show-proto-sidebar=1">VimBa App</a></p>
      </div>
      <div class="cv-content">
        <h2>Lisakhanya Gumengi</h2>
        <h3>Education</h3>
        <ul>
          <li>Web Development Student, Umuzi</li>
        </ul>
        <h3>View CV</h3>
        <a href="cv.pdf" onclick="window.open(this.href, '_blank'); return false;" class="btn">View CV</a>
      </div>
    </div>
  </section>

  <section id="contact" class="contact">
    <div class="contact-content">
      <h1>Get in Touch</h1>
    </div>
    <div class="home-sci">
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=lisakhanyaxolisagumenge@gmail.com" target="_blank">
        <i class='bx bxl-gmail'></i>
      </a>
      <a href="https://www.facebook.com/xolisa.gumengeii" target="_blank">
        <i class='bx bxl-facebook'></i>
      </a>
      <a href="https://www.instagram.com/xolisagumengei/" target="_blank">
        <i class='bx bxl-instagram'></i>
      </a>
      <a href="https://www.linkedin.com/in/lisakhanya-gumengi-b98b6836a" target="_blank">
        <i class='bx bxl-linkedin'></i>
      </a>
      <a href="http://wa.me/+27768782426" target="_blank">
        <i class='bx bxl-whatsapp'></i>
      </a>
    </div>
  </section>

  <script src="./script.js"></script>
</body>
</html>


@import url('https://example.com/style.css');

html { 
    scroll-behavior: smooth; 
}

body { 
    font-size: calc(1rem + 0.5vw); 
    font-family: Arial, sans-serif; 
    margin: 0; 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column; 
}

.active { 
    color: #fff; 
}

section { 
    padding: 40px 0; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    text-align: center; 
    min-height: 80vh; 
    width: 100%; 
    box-sizing: border-box; 
}

section:not(.home) { 
    display: none; 
}

section.home {
    display: flex; 
}

.logo {
    font-size: 25px;
    color: lightgray;
    text-decoration: none;
    font-weight: 600;
    pointer-events: none;
    opacity: 0;
    animation: slideTop 1s ease forwards;
}

.navbar {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    background-color: #222;
    padding: 1rem;
    border-radius: 30px;
    margin: 0 auto;
    max-width: 900px;  
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    will-change: transform;
}


.navbar a {
    font-size: 20px;
    color: lightgray;
    text-decoration: none;
    font-weight: 500;
    padding: 8px 18px;
    border-radius: 20px;
    margin: 0;
    transition: background 0.2s, color 0.2s;
    animation: slideTop .5s ease forwards;
    animation-delay: calc(.2s * var(--i));
    display: inline-block;
}

.navbar a.active,
.navbar a:hover {
    background: linear-gradient(45deg, #4169e4,#ffd700);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
}

.content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 100px;
    box-sizing: border-box;
    animation-delay: 1.5s;
}


.home .content h1 {
    font-size: 2.5em;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5em;
    animation: slideRight .5s ease forwards;
}

.home .content h3 {
    font-size: 2.5em;
    font-weight: 700;
    margin-bottom: 0.5em;
    animation: slideRight .7s ease forwards;
    animation-delay: 1s;
}

.home .content p {
    font-size: 1.2em;
    color: #666;
    margin-bottom: 1.5em;
    animation: slideRight .9s ease forwards;
    animation-delay: 1.2s;
}

.home-sci {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
}

.home-sci a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #4169e4, #ffd700);
    color: #fff;
    font-size: 28px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(65,105,228,0.3);
}

.home-sci a:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 20px rgba(65,105,228,0.5);
}

.home-sci a:hover i {
    color: #ffd700;
}

.home-sci a {
    opacity: 0;
    animation: slideTop 1s ease forwards;
}
.home-sci a:nth-child(1) { animation-delay: 0.3s; }
.home-sci a:nth-child(2) { animation-delay: 0.5s; }
.home-sci a:nth-child(3) { animation-delay: 0.7s; }
.home-sci a:nth-child(4) { animation-delay: 0.9s; }
.home-sci a:nth-child(5) { animation-delay: 1.1s; }

.home-sci a::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(30, 52, 78);
    border-radius: 50%;
    transform: scale(.88);
    z-index: -1;
    transition: 1.0s ease;
}

.home-sci a:hover::after {
    transition: color 1.0s ease, all 2.0s ease;
    transform: scale(0);
}

.home-sci a i {
    position: relative;
    z-index: 1;
    transition: 1.0s ease;
}

.skill-sci {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
}

.skill-sci a {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(45deg, #4169e4, #ffd700);
    color: #fff;
    font-size: 28px;
    text-decoration: none;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 5px 15px rgba(65,105,228,0.3);
}

.skill-sci a:hover {
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 10px 20px rgba(65,105,228,0.5);
}

.home-sci a i,
.skill-sci a i {
    transition: color 1.0s ease, all 2.0s ease;
}

.skill-sci a:hover i {
    color: #ffd700;
}

.skill-sci a {
    opacity: 0;
    animation: slideTop 1s ease forwards;
}

.skill-sci a::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(30, 52, 78);
    border-radius: 50%;
    transform: scale(.88);
    z-index: -1;
    transition: 1.0s ease;
}

.skill-sci a:hover::after {
    transform: scale(0);
    transition: color 1.0s ease, all 2.0s ease;
}


.skill-sci a:nth-child(1) { animation-delay: 0.3s; }
.skill-sci a:nth-child(2) { animation-delay: 0.5s; }
.skill-sci a:nth-child(3) { animation-delay: 0.7s; }

.skill-sci a i {
    position: relative;
    z-index: 1;
    transition: 1.0s ease;
}

.btn {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1.5rem;
    border-radius: 40px;
    font-size: 19px;
    color: aliceblue;
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 1px;
    z-index: 1;
    opacity: 0;
    white-space: nowrap;
    animation: slideTop 1s ease forwards;
    animation-delay: 1.8s;
}

.btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(45deg, #4169e4, #ffd700, #0c1022);
    border-radius: 40px;
    z-index: -1;
    transform: scale(.98);
    filter: blur(5px);
    transition: transform 0.3s ease, filter 0.3s ease;
}

.btn:hover::before {
    filter: blur(8px);
    transform: scale(1);
}

.btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgb(30, 52, 78);
    border-radius: 40px;
    z-index: -1;
    transform: scale(.98);
    transition: transform 0.3s ease;
}

.btn:hover::after {
    transform: scale(0.95);
}

.profile-pic {
    width: 200px;
    height: 200px;
    margin-right: 20px;
    border-radius: 50%;
    animation-delay: 1.5s;
}

@media (max-width: 1200px) {
    body { font-size: 1.2rem; }
}
@media (max-width: 768px) {
    body { font-size: 1rem; }
}
@media (max-width: 480px) {
    body { font-size: 0.9rem; }
}

@keyframes slideTop {
    0% {
        opacity: 0;
        transform: translateY(-100px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideRight {
    0% {
        opacity: 0;
        transform: translateX(-100px);
    }
    100% {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideBottom {
    0% {
        opacity: 0;
        transform: translateY(100px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}


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
