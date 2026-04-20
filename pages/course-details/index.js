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

/**
 * Dynamically load and initialize the mobile menu system
 */
async function initMobileMenu() {
  try {
    const response = await fetch('/reinforceDemo/components/header/header-mobile-menu.js', { cache: 'no-store' });
    if (response.ok) {
      const scriptText = await response.text();
      const script = document.createElement('script');
      script.textContent = scriptText;
      document.head.appendChild(script);
      
      // Initialize the mobile menu after script is loaded
      if (window.MobileMenu) {
        window.MobileMenu.init();
      }
    }
  } catch (error) {
    console.error('Failed to load mobile menu script:', error);
  }
}

async function composeCourseDetailsPage() {
  try {
    // Mount global components defined in the layout
    await mountComponent('header-mount', '/reinforceDemo/components/header/header.html');
    if (window.AppTheme) {
      window.AppTheme.initTheme();
      window.AppTheme.setupToggle(document);
    }
    // Initialize mobile menu after header is mounted
    await initMobileMenu();
    await mountComponent('footer-mount', '/reinforceDemo/components/footer/footer.html');
    await mountComponent('featured-courses-mount', '/reinforceDemo/components/featured-courses/featured-courses.html');
  } catch (error) {
    console.error(error);
  }

  initScrollEffects();
  initAccordion();
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
    onScroll(); // initial check
  }

  // --- Reveal Animations ---
  // Elements to animate
  const elementsToAnimate = document.querySelectorAll('.reveal-up');

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

  elementsToAnimate.forEach(el => observer.observe(el));
}

function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    // Open the initially active section visually
    const item = header.parentElement;
    const content = header.nextElementSibling;
    
    if (item.classList.contains('is-active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
    }

    header.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('is-active');

      // Close all other accordions (optional, but requested for modern UI feel)
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        otherItem.classList.remove('is-active');
        const otherContent = otherItem.querySelector('.accordion-content');
        if (otherContent) otherContent.style.maxHeight = null;
      });

      // If it wasn't active before, open it
      if (!isCurrentlyActive) {
        item.classList.add('is-active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

void composeCourseDetailsPage();
