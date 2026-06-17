/* ===== SHARED UTILITIES ===== */

/**
 * Sets the active class on one element within a group, removing it from all others.
 * @param {NodeList|Array} elements - Collection of elements to update
 * @param {Element|null} activeEl - Element to mark as active (null to clear all)
 */
function setActiveInGroup(elements, activeEl) {
  elements.forEach(el => el.classList.remove('active'));
  if (activeEl) activeEl.classList.add('active');
}

/**
 * Smoothly scrolls an element into the viewport.
 * @param {Element} el - Target element
 * @param {string} block - Scroll alignment ('start', 'center', 'end')
 */
function smoothScrollTo(el, block = 'start') {
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block });
}

/* ===== DOM REFERENCES ===== */
const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

/* ===== NAVIGATION ===== */
const navigateToSection = (targetId) => {
  const targetSection = document.getElementById(targetId);
  if (!targetSection) return;

  sections.forEach(section => section.style.display = 'none');
  targetSection.style.display = 'block';
  smoothScrollTo(targetSection);

  setActiveInGroup(navbarLinks,
    [...navbarLinks].find(link => link.getAttribute('href') === `#${targetId}`)
  );

  history.replaceState(null, '', `#${targetId}`);
};

// Single delegated handler for all internal anchor links (covers both navbar and in-page links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    navigateToSection(targetId);
  });
});

// Keyboard shortcut: 'a' scrolls to home
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'a') {
    const homeSection = document.getElementById('home');
    smoothScrollTo(homeSection);
  }
});

// Toggle header background on scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== PORTFOLIO FILTER ===== */
const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const projectCards = document.querySelectorAll('.project-card');

portfolioFilters.forEach(filter => {
  filter.addEventListener('click', function () {
    const filterValue = this.getAttribute('data-filter');

    setActiveInGroup(portfolioFilters, this);

    projectCards.forEach(card => {
      const matches = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
      card.classList.toggle('hidden', !matches);
    });
  });
});

/* ===== INITIALIZATION ===== */
window.addEventListener('DOMContentLoaded', () => {
  sections.forEach((section, idx) => {
    section.style.display = idx === 0 ? 'block' : 'none';
  });
  if (navbarLinks.length) {
    navbarLinks[0].classList.add('active');
  }
});

/* ===== PDF VIEWER ===== */
const docButtons = document.querySelectorAll('.doc-btn');
const pdfViewer = document.getElementById('pdfViewer');
const pdfEmbed = document.getElementById('pdfEmbed');
const pdfTitle = document.getElementById('pdfTitle');
const closePdf = document.getElementById('closePdf');

if (docButtons && pdfViewer && pdfEmbed) {
  docButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href');
      const title = btn.querySelector('span') ? btn.querySelector('span').innerText : href;
      if (!href) return;

      pdfEmbed.setAttribute('src', href);
      if (pdfTitle) pdfTitle.textContent = title;
      pdfViewer.classList.add('active');
      pdfViewer.setAttribute('aria-hidden', 'false');

      setActiveInGroup(docButtons, btn);
      smoothScrollTo(pdfViewer, 'center');
    });
  });

  if (closePdf) {
    closePdf.addEventListener('click', (e) => {
      e.preventDefault();
      pdfEmbed.setAttribute('src', '');
      pdfViewer.classList.remove('active');
      pdfViewer.setAttribute('aria-hidden', 'true');
      setActiveInGroup(docButtons, null);
    });
  }
}
