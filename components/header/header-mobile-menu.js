'use strict';

/**
 * Mobile Menu System
 * Manages the hamburger menu interaction for mobile viewports (< 768px)
 * Handles open/close logic, event listeners, state management, and accessibility
 */
const MobileMenu = (() => {
  // Private state
  let isMenuOpen = false;
  let menuToggle = null;
  let menuOverlay = null;
  let menuDrawer = null;
  let menuLinks = [];
  let isAnimating = false;

  /**
   * Initialize the mobile menu system
   * Should be called after the header component is mounted
   */
  function init() {
    // Get references to DOM elements
    menuToggle = document.querySelector('[data-mobile-menu-toggle]');
    menuOverlay = document.querySelector('[data-mobile-nav-overlay]');
    menuDrawer = document.querySelector('[data-mobile-nav-drawer]');
    menuLinks = document.querySelectorAll('.mobile-nav-link');

    if (!menuToggle || !menuOverlay || !menuDrawer) {
      console.warn('Mobile menu elements not found in DOM');
      return;
    }

    // Bind event listeners
    bindEventListeners();

    // Set initial state
    isMenuOpen = false;
  }

  /**
   * Bind all event listeners for menu interaction
   */
  function bindEventListeners() {
    // Hamburger button click
    menuToggle.addEventListener('click', toggle);

    // Overlay click
    menuOverlay.addEventListener('click', close);

    // Menu item clicks
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        close();
      });
    });

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        close();
      }
    });

    // Window resize - close menu if resizing to desktop breakpoint (768px+)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= 768 && isMenuOpen) {
          close();
        }
      }, 100);
    });

    // Prevent scroll propagation on drawer
    menuDrawer.addEventListener('wheel', (e) => {
      // Allow scrolling within drawer but don't propagate to body
      const isAtTop = menuDrawer.scrollTop === 0;
      const isAtBottom = menuDrawer.scrollTop + menuDrawer.clientHeight === menuDrawer.scrollHeight;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  /**
   * Open the mobile menu
   */
  function open() {
    if (isMenuOpen || isAnimating) {
      return;
    }

    isAnimating = true;

    // Update state
    isMenuOpen = true;

    // Update button state
    menuToggle.setAttribute('aria-expanded', 'true');

    // Show overlay and drawer
    requestAnimationFrame(() => {
      menuOverlay.classList.add('is-visible');
      menuDrawer.classList.add('is-visible');

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Focus first menu link for accessibility
      setTimeout(() => {
        if (menuLinks.length > 0) {
          menuLinks[0].focus();
        }
        isAnimating = false;
      }, 50);
    });
  }

  /**
   * Close the mobile menu
   */
  function close() {
    if (!isMenuOpen || isAnimating) {
      return;
    }

    isAnimating = true;

    // Update state
    isMenuOpen = false;

    // Update button state
    menuToggle.setAttribute('aria-expanded', 'false');

    // Hide overlay and drawer
    requestAnimationFrame(() => {
      menuOverlay.classList.remove('is-visible');
      menuDrawer.classList.remove('is-visible');

      // Restore body scroll
      document.body.style.overflow = '';

      // Return focus to toggle button
      setTimeout(() => {
        menuToggle.focus();
        isAnimating = false;
      }, 50);
    });
  }

  /**
   * Toggle the mobile menu open/closed
   */
  function toggle() {
    if (isMenuOpen) {
      close();
    } else {
      open();
    }
  }

  /**
   * Get current menu state (for debugging/testing)
   */
  function isOpen() {
    return isMenuOpen;
  }

  /**
   * Cleanup function (if needed for single-page app navigation)
   */
  function destroy() {
    if (menuToggle) {
      menuToggle.removeEventListener('click', toggle);
    }
    if (menuOverlay) {
      menuOverlay.removeEventListener('click', close);
    }
    if (menuLinks) {
      menuLinks.forEach(link => {
        link.removeEventListener('click', close);
      });
    }
    document.removeEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        close();
      }
    });
    isMenuOpen = false;
  }

  // Public API
  return {
    init,
    open,
    close,
    toggle,
    isOpen,
    destroy
  };
})();
