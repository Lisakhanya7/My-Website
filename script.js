window.addEventListener('error', (event) => {
  console.error('[App Error]', event.message, 'at', event.filename + ':' + event.lineno);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('[Unhandled Promise]', event.reason);
});

const navbarLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section');

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
  if (!targetSection) {
    console.warn('navigateToSection: section not found for id "' + targetId + '"');
    return;
  }

  sections.forEach(section => section.style.display = 'none');
  targetSection.style.display = 'block';
  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  navbarLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
  });

  try {
    history.replaceState(null, '', `#${targetId}`);
  } catch (err) {
    console.warn('history.replaceState failed:', err.message);
  }
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
    navigateToSection(targetId);
  });
});

navbarLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    if (!href) return;
    const targetId = href.substring(1);
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
    if (!filterValue) return;

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

// Interactive embedded PDF viewer for Documents section
const docButtons = document.querySelectorAll('.doc-btn');
const pdfViewer = document.getElementById('pdfViewer');
const pdfEmbed = document.getElementById('pdfEmbed');
const pdfTitle = document.getElementById('pdfTitle');
const closePdf = document.getElementById('closePdf');

if (docButtons.length && pdfViewer && pdfEmbed && pdfTitle) {
  docButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const href = btn.getAttribute('href');
      if (!href) {
        console.warn('PDF button missing href attribute');
        return;
      }
      const span = btn.querySelector('span');
      const title = span ? span.innerText : href;
      pdfEmbed.setAttribute('src', href);
      pdfTitle.textContent = title;
      pdfViewer.classList.add('active');
      pdfViewer.setAttribute('aria-hidden', 'false');
      docButtons.forEach(d => d.classList.remove('active'));
      btn.classList.add('active');
      // scroll viewer into view
      pdfViewer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  if (closePdf) {
    closePdf.addEventListener('click', (e) => {
      e.preventDefault();
      pdfEmbed.setAttribute('src', '');
      pdfViewer.classList.remove('active');
      pdfViewer.setAttribute('aria-hidden', 'true');
      docButtons.forEach(d => d.classList.remove('active'));
    });
  }
}
