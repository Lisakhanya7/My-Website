/**
 * Navigate to a specific section by its ID.
 * Hides all other sections, shows the target, updates active navbar link, and
 * pushes the hash into the URL.
 */
const navigateToSection = (targetId) => {
  const targetSection = document.getElementById(targetId);
  if (!targetSection) return;

  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('.navbar a');

  sections.forEach(section => section.style.display = 'none');
  targetSection.style.display = 'block';
  targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

  navbarLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${targetId}`);
  });

  history.replaceState(null, '', `#${targetId}`);
};

/**
 * Handle keyboard shortcuts. Pressing 'a' scrolls to the home section.
 */
const handleKeyboardShortcut = (event) => {
  if (event.key.toLowerCase() === 'a') {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

/**
 * Toggle the 'scrolled' class on the header based on scroll position.
 */
const handleScrollHeader = () => {
  const header = document.querySelector('.header');
  if (!header) return;
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

/**
 * Filter portfolio project cards by category.
 * Updates active state on filter buttons and shows/hides cards.
 */
const filterPortfolio = (filterValue, clickedFilter, allFilters, allCards) => {
  allFilters.forEach(f => f.classList.remove('active'));
  clickedFilter.classList.add('active');

  allCards.forEach(card => {
    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
};

/**
 * Initialise section visibility on page load: show the first section,
 * hide the rest, and mark the first navbar link as active.
 */
const initSections = () => {
  const sections = document.querySelectorAll('section');
  const navbarLinks = document.querySelectorAll('.navbar a');

  sections.forEach((section, idx) => {
    section.style.display = idx === 0 ? 'block' : 'none';
  });
  if (navbarLinks.length) {
    navbarLinks[0].classList.add('active');
  }
};

/**
 * Open a PDF in the embedded viewer.
 */
const openPdfViewer = (href, title, pdfEmbed, pdfTitle, pdfViewer, activeBtn, allDocButtons) => {
  if (!href) return;
  pdfEmbed.setAttribute('src', href);
  if (pdfTitle) pdfTitle.textContent = title;
  pdfViewer.classList.add('active');
  pdfViewer.setAttribute('aria-hidden', 'false');
  allDocButtons.forEach(d => d.classList.remove('active'));
  if (activeBtn) activeBtn.classList.add('active');
};

/**
 * Close the embedded PDF viewer and reset state.
 */
const closePdfViewer = (pdfEmbed, pdfViewer, allDocButtons) => {
  pdfEmbed.setAttribute('src', '');
  pdfViewer.classList.remove('active');
  pdfViewer.setAttribute('aria-hidden', 'true');
  allDocButtons.forEach(d => d.classList.remove('active'));
};

/* ------------------------------------------------------------------ */
/*  Event binding (runs when loaded in the browser)                   */
/* ------------------------------------------------------------------ */

document.addEventListener('keydown', handleKeyboardShortcut);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    navigateToSection(targetId);
  });
});

document.querySelectorAll('.navbar a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    navigateToSection(targetId);
  });
});

window.addEventListener('scroll', handleScrollHeader);

const portfolioFilters = document.querySelectorAll('.portfolio-filter');
const projectCards = document.querySelectorAll('.project-card');

portfolioFilters.forEach(filter => {
  filter.addEventListener('click', function () {
    const filterValue = this.getAttribute('data-filter');
    filterPortfolio(filterValue, this, portfolioFilters, projectCards);
  });
});

window.addEventListener('DOMContentLoaded', initSections);

// Interactive embedded PDF viewer for Documents section
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
      openPdfViewer(href, title, pdfEmbed, pdfTitle, pdfViewer, btn, docButtons);
      pdfViewer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });

  if (closePdf) {
    closePdf.addEventListener('click', (e) => {
      e.preventDefault();
      closePdfViewer(pdfEmbed, pdfViewer, docButtons);
    });
  }
}

/* ------------------------------------------------------------------ */
/*  Export for testing (no-op in browsers)                            */
/* ------------------------------------------------------------------ */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    navigateToSection,
    handleKeyboardShortcut,
    handleScrollHeader,
    filterPortfolio,
    initSections,
    openPdfViewer,
    closePdfViewer,
  };
}
