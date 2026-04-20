'use strict';

function renderBootstrapMessage(title, details) {
  const appRoot = document.getElementById('app-home');
  if (!appRoot) {
    return;
  }

  appRoot.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;padding:2rem;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
      <section style="max-width:44rem;width:100%;padding:1.5rem;border:1px solid rgba(128,128,128,.35);border-radius:12px;background:rgba(255,255,255,.06);">
        <h1 style="margin:0 0 .75rem;font-size:1.5rem;">${title}</h1>
        <p style="margin:.25rem 0 0;line-height:1.6;">${details}</p>
      </section>
    </main>
  `;
}

function normalizeHomePartialPaths(html) {
  return html
    .replaceAll('../../assets/', './assets/')
    .replaceAll('href="/pages/home/"', 'href="/reinforceDemo/"')
    .replaceAll('href="/pages/pricing/"', 'href="/reinforceDemo/pages/pricing/"')
    .replaceAll('href="/pages/instructor-details/"', 'href="/reinforceDemo/pages/instructor-details/"')
    .replaceAll('href="../course-details/"', 'href="/reinforceDemo/pages/course-details/"')
    .replaceAll('href="/micro-credentials"', 'href="/reinforceDemo/"')
    .replaceAll('href="/instructors"', 'href="/reinforceDemo/"')
    .replaceAll('href="/enrollment/sign-up"', 'href="/reinforceDemo/"')
    .replaceAll('href="/"', 'href="/reinforceDemo/"');
}

async function mountComponent(mountId, partialPath) {
  const mountNode = document.getElementById(mountId);

  if (!mountNode) {
    return null;
  }

  const response = await fetch(partialPath, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load component from ${partialPath}`);
  }

  const partialHtml = await response.text();
  mountNode.innerHTML = normalizeHomePartialPaths(partialHtml);
  return mountNode.firstElementChild;
}

/**
 * Dynamically load and initialize the mobile menu system
 */
function initMobileMenu() {
  return new Promise((resolve, reject) => {
    if (window.MobileMenu) {
      window.MobileMenu.init();
      resolve();
      return;
    }

    if (document.querySelector('script[data-mobile-menu-script]')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = './components/header/header-mobile-menu.js';
    script.defer = true;
    script.dataset.mobileMenuScript = 'true';
    script.onload = () => {
      if (window.MobileMenu) {
        window.MobileMenu.init();
      }
      resolve();
    };
    script.onerror = () => reject(new Error('Failed to load mobile menu script'));
    document.head.appendChild(script);
  });
}

async function composeHomePage() {
  if (window.location.protocol === 'file:') {
    renderBootstrapMessage(
      'Local file mode is blocked by the browser',
      'This page loads components with fetch(), which does not work reliably over file://. Run a local web server from the project root, then open http://localhost:8000/ (example: python -m http.server 8000).'
    );
    return;
  }

  try {
    await mountComponent('header-mount', './components/header/header.html');
    if (window.AppTheme) {
      window.AppTheme.initTheme();
      window.AppTheme.setupToggle(document);
    }
    // Initialize mobile menu after header is mounted
    await initMobileMenu();
    await mountComponent('hero-mount', './components/hero/hero.html');
    await mountComponent('trusted-by-mount', './components/trusted-by/trusted-by.html');
    await mountComponent('featured-courses-mount', './components/featured-courses/featured-courses.html');
    await mountComponent('top-courses-week-mount', './components/top-courses-week/top-courses-week.html');
    await mountComponent('micro-credential-courses-mount', './components/micro-credential-courses/micro-credential-courses.html');
    await mountComponent('instructors-preview-mount', './components/instructors-preview/instructors-preview.html');
    await mountComponent('testimonials-mount', './components/testimonials/testimonials.html');
    await mountComponent('enrollment-cta-mount', './components/enrollment-cta/enrollment-cta.html');
    await mountComponent('footer-mount', './components/footer/footer.html');
  } catch (error) {
    console.error(error);
    renderBootstrapMessage(
      'Failed to load page components',
      'One or more component files could not be fetched. Verify that you are serving the site over http(s) and that paths under ./components/ are accessible.'
    );
    return;
  }

  initScrollEffects();
}

function initScrollEffects() {
  // --- Header Scroll State ---
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Reveal Animations ---
  const elementsToAnimate = document.querySelectorAll(`
    .section-eyebrow, .section-title, .course-card,
    .hero-eyebrow, .hero-title, .hero-description, .hero-cta-wrap,
    .view-all-link, .nav-button
  `);

  elementsToAnimate.forEach((el, index) => {
    el.classList.add('reveal-up');
    if (el.classList.contains('course-card')) {
      el.classList.add(`stagger-${(index % 3) + 1}`);
    } else if (el.parentElement.classList.contains('hero-copy')) {
      el.classList.add(`stagger-${Array.from(el.parentElement.children).indexOf(el) + 1}`);
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));
}

void composeHomePage();
