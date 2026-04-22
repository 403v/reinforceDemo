'use strict';

async function mountComponent(mountId, partialPath) {
  const mountNode = document.getElementById(mountId);

  if (!mountNode) {
    return null;
  }

  const response = await fetch(partialPath, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to load component from ${partialPath}`);
  }

  mountNode.innerHTML = await response.text();
  return mountNode.firstElementChild;
}

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
    script.src = '/reinforceDemo/components/header/header-mobile-menu.js';
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

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

async function composeProfilePage() {
  try {
    await mountComponent('header-mount', '/reinforceDemo/components/header/header.html');

    if (window.AppTheme) {
      window.AppTheme.initTheme();
      window.AppTheme.setupToggle(document);
    }

    await initMobileMenu();
    await mountComponent('footer-mount', '/reinforceDemo/components/footer/footer.html');
  } catch (error) {
    console.error(error);
  }

  initScrollEffects();
  initSidebarDrawer();
  initProgressRing();
}

function initScrollEffects() {
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const elementsToAnimate = document.querySelectorAll('.reveal-up');
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    }
  );

  elementsToAnimate.forEach((element) => observer.observe(element));
}

function initProgressRing() {
  const ring = document.querySelector('[data-progress-ring]');
  const valueNode = document.querySelector('[data-progress-value]');

  if (!ring || !valueNode) {
    return;
  }

  const progress = 74;
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference}`;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  valueNode.textContent = `${progress}%`;

  window.requestAnimationFrame(() => {
    if (prefersReducedMotion) {
      ring.style.strokeDashoffset = `${offset}`;
      return;
    }

    ring.style.transition = 'stroke-dashoffset 1.35s cubic-bezier(0.25, 1, 0.5, 1)';
    ring.style.strokeDashoffset = `${offset}`;
  });
}

function initSidebarDrawer() {
  const sidebar = document.querySelector('[data-profile-sidebar]');
  const toggle = document.querySelector('[data-profile-sidebar-toggle]');
  const overlay = document.querySelector('[data-profile-sidebar-overlay]');

  if (!sidebar || !toggle || !overlay) {
    return;
  }

  let isOpen = false;
  let lastFocusedElement = null;

  const getFocusableElements = () => {
    return Array.from(sidebar.querySelectorAll(FOCUSABLE_SELECTORS)).filter((element) => element instanceof HTMLElement && !element.hasAttribute('hidden'));
  };

  const open = () => {
    if (isOpen) {
      return;
    }

    isOpen = true;
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    toggle.setAttribute('aria-expanded', 'true');
    sidebar.setAttribute('aria-hidden', 'false');
    sidebar.classList.add('is-open');
    overlay.hidden = false;

    window.requestAnimationFrame(() => {
      overlay.classList.add('is-visible');
      document.body.classList.add('profile-sidebar-lock');

      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        focusables[0].focus();
      }
    });
  };

  const close = () => {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    toggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('aria-hidden', 'true');
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    document.body.classList.remove('profile-sidebar-lock');

    window.setTimeout(() => {
      overlay.hidden = true;
    }, 220);

    if (lastFocusedElement && lastFocusedElement.isConnected) {
      lastFocusedElement.focus();
    } else {
      toggle.focus();
    }
  };

  toggle.addEventListener('click', () => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  });

  overlay.addEventListener('click', close);

  document.addEventListener('keydown', (event) => {
    if (!isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      close();
      return;
    }

    if (event.key === 'Tab') {
      const focusables = getFocusableElements();
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }

      const firstFocusable = focusables[0];
      const lastFocusable = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) {
      close();
    }
  });
}

void composeProfilePage();