/**
 * @jest-environment jsdom
 */

/* ------------------------------------------------------------------
 *  Helpers – build a minimal DOM that mirrors index.html so the
 *  module-level querySelector calls in script.js succeed on require().
 * ------------------------------------------------------------------ */

function buildDOM() {
  document.body.innerHTML = `
    <header class="header">
      <a href="#home" class="logo nav-logo">LG</a>
      <nav class="navbar" id="navbar">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Portfolio</a>
        <a href="#certs">Certificates</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>

    <section id="home" class="section hero">Home content</section>
    <section id="about" class="section">About content</section>
    <section id="skills" class="section">Skills content</section>
    <section id="projects" class="section">
      <div class="portfolio-filter active" data-filter="all">All</div>
      <div class="portfolio-filter" data-filter="web">Web</div>
      <div class="portfolio-filter" data-filter="design">Design</div>
      <div class="project-card" data-category="web">Web Project</div>
      <div class="project-card" data-category="design">Design Project</div>
      <div class="project-card" data-category="web">Another Web</div>
    </section>
    <section id="certs" class="section">Certs content</section>
    <section id="contact" class="section">Contact content</section>

    <div id="pdfViewer" aria-hidden="true">
      <iframe id="pdfEmbed" src=""></iframe>
      <span id="pdfTitle"></span>
      <button id="closePdf">Close</button>
    </div>

    <a class="doc-btn" href="test.pdf"><span>Test PDF</span></a>
    <a class="doc-btn" href="other.pdf"><span>Other PDF</span></a>

    <footer class="footer"><p>Footer</p></footer>
  `;
}

/* ------------------------------------------------------------------
 *  jsdom stubs – scrollIntoView & history.replaceState are not
 *  implemented in jsdom so we provide no-op stubs.
 * ------------------------------------------------------------------ */

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
  window.history.replaceState = jest.fn();
});

/* ------------------------------------------------------------------
 *  Fresh DOM + fresh module for every test to avoid leaking state.
 * ------------------------------------------------------------------ */

let mod; // will hold the exported functions

beforeEach(() => {
  buildDOM();
  jest.resetModules();
  mod = require('../script');
});

/* ==================================================================
 *  navigateToSection
 * ================================================================== */

describe('navigateToSection', () => {
  test('shows target section and hides all others', () => {
    mod.navigateToSection('about');

    const sections = document.querySelectorAll('section');
    sections.forEach(s => {
      if (s.id === 'about') {
        expect(s.style.display).toBe('block');
      } else {
        expect(s.style.display).toBe('none');
      }
    });
  });

  test('marks the correct navbar link as active', () => {
    mod.navigateToSection('skills');

    const links = document.querySelectorAll('.navbar a');
    links.forEach(link => {
      if (link.getAttribute('href') === '#skills') {
        expect(link.classList.contains('active')).toBe(true);
      } else {
        expect(link.classList.contains('active')).toBe(false);
      }
    });
  });

  test('calls scrollIntoView on the target section', () => {
    mod.navigateToSection('contact');

    const contactSection = document.getElementById('contact');
    expect(contactSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });

  test('updates the URL hash via history.replaceState', () => {
    mod.navigateToSection('projects');

    expect(window.history.replaceState).toHaveBeenCalledWith(
      null,
      '',
      '#projects',
    );
  });

  test('does nothing when target section does not exist', () => {
    const sections = document.querySelectorAll('section');
    const displaysBefore = Array.from(sections).map(s => s.style.display);

    mod.navigateToSection('nonexistent');

    const displaysAfter = Array.from(sections).map(s => s.style.display);
    expect(displaysAfter).toEqual(displaysBefore);
  });

  test('navigating to different sections consecutively works correctly', () => {
    mod.navigateToSection('about');
    expect(document.getElementById('about').style.display).toBe('block');

    mod.navigateToSection('certs');
    expect(document.getElementById('about').style.display).toBe('none');
    expect(document.getElementById('certs').style.display).toBe('block');
  });
});

/* ==================================================================
 *  handleKeyboardShortcut
 * ================================================================== */

describe('handleKeyboardShortcut', () => {
  test('pressing "a" scrolls to home section', () => {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView.mockClear();

    mod.handleKeyboardShortcut({ key: 'a' });

    expect(homeSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  test('pressing "A" (uppercase) also scrolls to home', () => {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView.mockClear();

    mod.handleKeyboardShortcut({ key: 'A' });

    expect(homeSection.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
    });
  });

  test('pressing other keys does not scroll to home', () => {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView.mockClear();

    mod.handleKeyboardShortcut({ key: 'b' });
    mod.handleKeyboardShortcut({ key: 'Enter' });
    mod.handleKeyboardShortcut({ key: '1' });

    expect(homeSection.scrollIntoView).not.toHaveBeenCalled();
  });

  test('does nothing when home section is missing', () => {
    document.getElementById('home').remove();

    expect(() => {
      mod.handleKeyboardShortcut({ key: 'a' });
    }).not.toThrow();
  });
});

/* ==================================================================
 *  handleScrollHeader
 * ================================================================== */

describe('handleScrollHeader', () => {
  test('adds "scrolled" class when scrollY > 50', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });

    mod.handleScrollHeader();

    const header = document.querySelector('.header');
    expect(header.classList.contains('scrolled')).toBe(true);
  });

  test('removes "scrolled" class when scrollY <= 50', () => {
    const header = document.querySelector('.header');
    header.classList.add('scrolled');

    Object.defineProperty(window, 'scrollY', { value: 30, writable: true });
    mod.handleScrollHeader();

    expect(header.classList.contains('scrolled')).toBe(false);
  });

  test('adds "scrolled" at exactly scrollY = 51', () => {
    Object.defineProperty(window, 'scrollY', { value: 51, writable: true });
    mod.handleScrollHeader();

    expect(document.querySelector('.header').classList.contains('scrolled')).toBe(true);
  });

  test('removes "scrolled" at exactly scrollY = 50', () => {
    const header = document.querySelector('.header');
    header.classList.add('scrolled');

    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    mod.handleScrollHeader();

    expect(header.classList.contains('scrolled')).toBe(false);
  });

  test('does nothing when .header element is missing', () => {
    document.querySelector('.header').remove();

    expect(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
      mod.handleScrollHeader();
    }).not.toThrow();
  });
});

/* ==================================================================
 *  filterPortfolio
 * ================================================================== */

describe('filterPortfolio', () => {
  let allFilters;
  let allCards;

  beforeEach(() => {
    allFilters = document.querySelectorAll('.portfolio-filter');
    allCards = document.querySelectorAll('.project-card');
  });

  test('shows all cards when filter is "all"', () => {
    mod.filterPortfolio('all', allFilters[0], allFilters, allCards);

    allCards.forEach(card => {
      expect(card.classList.contains('hidden')).toBe(false);
    });
  });

  test('filters cards to show only matching category', () => {
    const webFilter = allFilters[1]; // data-filter="web"
    mod.filterPortfolio('web', webFilter, allFilters, allCards);

    allCards.forEach(card => {
      if (card.getAttribute('data-category') === 'web') {
        expect(card.classList.contains('hidden')).toBe(false);
      } else {
        expect(card.classList.contains('hidden')).toBe(true);
      }
    });
  });

  test('marks clicked filter as active and removes active from others', () => {
    const designFilter = allFilters[2]; // data-filter="design"
    mod.filterPortfolio('design', designFilter, allFilters, allCards);

    expect(designFilter.classList.contains('active')).toBe(true);
    expect(allFilters[0].classList.contains('active')).toBe(false);
    expect(allFilters[1].classList.contains('active')).toBe(false);
  });

  test('hides all cards when filter matches no category', () => {
    mod.filterPortfolio('nonexistent', allFilters[0], allFilters, allCards);

    allCards.forEach(card => {
      expect(card.classList.contains('hidden')).toBe(true);
    });
  });

  test('switching filters updates visibility correctly', () => {
    mod.filterPortfolio('web', allFilters[1], allFilters, allCards);
    mod.filterPortfolio('design', allFilters[2], allFilters, allCards);

    allCards.forEach(card => {
      if (card.getAttribute('data-category') === 'design') {
        expect(card.classList.contains('hidden')).toBe(false);
      } else {
        expect(card.classList.contains('hidden')).toBe(true);
      }
    });
  });
});

/* ==================================================================
 *  initSections
 * ================================================================== */

describe('initSections', () => {
  test('shows first section and hides all others', () => {
    mod.initSections();

    const sections = document.querySelectorAll('section');
    sections.forEach((section, idx) => {
      expect(section.style.display).toBe(idx === 0 ? 'block' : 'none');
    });
  });

  test('marks the first navbar link as active', () => {
    mod.initSections();

    const links = document.querySelectorAll('.navbar a');
    expect(links[0].classList.contains('active')).toBe(true);
  });

  test('handles empty DOM gracefully', () => {
    document.body.innerHTML = '';
    jest.resetModules();

    expect(() => {
      const freshMod = require('../script');
      freshMod.initSections();
    }).not.toThrow();
  });
});

/* ==================================================================
 *  openPdfViewer
 * ================================================================== */

describe('openPdfViewer', () => {
  let pdfEmbed;
  let pdfTitle;
  let pdfViewerEl;
  let docButtons;

  beforeEach(() => {
    pdfEmbed = document.getElementById('pdfEmbed');
    pdfTitle = document.getElementById('pdfTitle');
    pdfViewerEl = document.getElementById('pdfViewer');
    docButtons = document.querySelectorAll('.doc-btn');
  });

  test('sets embed src and title', () => {
    mod.openPdfViewer('test.pdf', 'My PDF', pdfEmbed, pdfTitle, pdfViewerEl, docButtons[0], docButtons);

    expect(pdfEmbed.getAttribute('src')).toBe('test.pdf');
    expect(pdfTitle.textContent).toBe('My PDF');
  });

  test('adds active class to viewer and sets aria-hidden to false', () => {
    mod.openPdfViewer('test.pdf', 'My PDF', pdfEmbed, pdfTitle, pdfViewerEl, docButtons[0], docButtons);

    expect(pdfViewerEl.classList.contains('active')).toBe(true);
    expect(pdfViewerEl.getAttribute('aria-hidden')).toBe('false');
  });

  test('marks the clicked button as active and clears others', () => {
    docButtons[0].classList.add('active');

    mod.openPdfViewer('other.pdf', 'Other', pdfEmbed, pdfTitle, pdfViewerEl, docButtons[1], docButtons);

    expect(docButtons[0].classList.contains('active')).toBe(false);
    expect(docButtons[1].classList.contains('active')).toBe(true);
  });

  test('does nothing when href is empty/falsy', () => {
    mod.openPdfViewer('', 'title', pdfEmbed, pdfTitle, pdfViewerEl, docButtons[0], docButtons);

    expect(pdfEmbed.getAttribute('src')).toBe('');
    expect(pdfViewerEl.classList.contains('active')).toBe(false);
  });

  test('does nothing when href is null', () => {
    mod.openPdfViewer(null, 'title', pdfEmbed, pdfTitle, pdfViewerEl, docButtons[0], docButtons);

    expect(pdfViewerEl.classList.contains('active')).toBe(false);
  });

  test('handles missing pdfTitle gracefully', () => {
    expect(() => {
      mod.openPdfViewer('test.pdf', 'My PDF', pdfEmbed, null, pdfViewerEl, docButtons[0], docButtons);
    }).not.toThrow();

    expect(pdfEmbed.getAttribute('src')).toBe('test.pdf');
  });
});

/* ==================================================================
 *  closePdfViewer
 * ================================================================== */

describe('closePdfViewer', () => {
  let pdfEmbed;
  let pdfViewerEl;
  let docButtons;

  beforeEach(() => {
    pdfEmbed = document.getElementById('pdfEmbed');
    pdfViewerEl = document.getElementById('pdfViewer');
    docButtons = document.querySelectorAll('.doc-btn');

    // Simulate an open viewer
    pdfEmbed.setAttribute('src', 'test.pdf');
    pdfViewerEl.classList.add('active');
    pdfViewerEl.setAttribute('aria-hidden', 'false');
    docButtons[0].classList.add('active');
  });

  test('clears embed src', () => {
    mod.closePdfViewer(pdfEmbed, pdfViewerEl, docButtons);

    expect(pdfEmbed.getAttribute('src')).toBe('');
  });

  test('removes active class from viewer and sets aria-hidden to true', () => {
    mod.closePdfViewer(pdfEmbed, pdfViewerEl, docButtons);

    expect(pdfViewerEl.classList.contains('active')).toBe(false);
    expect(pdfViewerEl.getAttribute('aria-hidden')).toBe('true');
  });

  test('removes active class from all doc buttons', () => {
    mod.closePdfViewer(pdfEmbed, pdfViewerEl, docButtons);

    docButtons.forEach(btn => {
      expect(btn.classList.contains('active')).toBe(false);
    });
  });
});
