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

async function composePricingPage() {
  try {
    await mountComponent('header-mount', '/reinforceDemo/components/header/header.html');
    if (window.AppTheme) {
      window.AppTheme.initTheme();
      window.AppTheme.setupToggle(document);
    }
    // Initialize mobile menu after header is mounted
    await initMobileMenu();
    await mountComponent('footer-mount', '/reinforceDemo/components/footer/footer.html');
    markPricingNavActive();
  } catch (error) {
    console.error(error);
  }

  initScrollEffects();
  initFaqAccordion();
}

function markPricingNavActive() {
  const navLinks = document.querySelectorAll('.site-nav .nav-link');

  navLinks.forEach(link => {
    link.classList.remove('nav-link-active');
    if (link.textContent && link.textContent.trim().toLowerCase() === 'plans') {
      link.classList.add('nav-link-active');
    }
  });
}

function initScrollEffects() {
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

  const elementsToAnimate = document.querySelectorAll('.reveal-up');

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
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

  elementsToAnimate.forEach(el => observer.observe(el));
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.pricing-faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.pricing-faq-question');
    const content = item.querySelector('.pricing-faq-answer');

    if (!trigger || !content) {
      return;
    }

    if (item.classList.contains('is-active')) {
      content.style.maxHeight = `${content.scrollHeight}px`;
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('is-active');
        const otherTrigger = otherItem.querySelector('.pricing-faq-question');
        const otherContent = otherItem.querySelector('.pricing-faq-answer');

        if (otherTrigger) {
          otherTrigger.setAttribute('aria-expanded', 'false');
        }

        if (otherContent) {
          otherContent.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('is-active');
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = `${content.scrollHeight}px`;
      }
    });
  });
}

void composePricingPage();
