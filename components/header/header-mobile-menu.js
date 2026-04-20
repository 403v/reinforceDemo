'use strict';

/**
 * Mobile Menu System
 * Manages the hamburger menu interaction for mobile viewports (< 768px).
 * Handles open/close state, accessibility, keyboard navigation, and cleanup.
 */
const MobileMenu = (() => {
  const DESKTOP_BREAKPOINT = 768;
  const FOCUSABLE_SELECTORS = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(', ');

  // Private state
  let isMenuOpen = false;
  let menuToggle = null;
  let menuOverlay = null;
  let menuDrawer = null;
  let menuLinks = [];
  let resizeTimeout = null;
  let lastFocusedElement = null;
  let backgroundNodes = [];

  let onToggleClick = null;
  let onOverlayClick = null;
  let onDocumentKeydown = null;
  let onDocumentPointerdown = null;
  let onWindowResize = null;
  let onDrawerWheel = null;
  let onDrawerClick = null;

  /**
   * Initialize the mobile menu system
   * Should be called after the header component is mounted
   */
  function init() {
    destroy();

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
    menuToggle.setAttribute('aria-expanded', 'false');
    menuDrawer.setAttribute('aria-hidden', 'true');
    cacheBackgroundNodes();
  }

  /**
   * Bind all event listeners for menu interaction
   */
  function bindEventListeners() {
    onToggleClick = () => {
      toggle();
    };

    onOverlayClick = () => {
      close();
    };

    onDocumentKeydown = (event) => {
      if (!isMenuOpen) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === 'Tab') {
        trapFocus(event);
      }
    };

    onDocumentPointerdown = (event) => {
      if (!isMenuOpen) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      if (menuDrawer.contains(target) || menuToggle.contains(target)) {
        return;
      }

      close({ restoreFocus: false });
    };

    onWindowResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (window.innerWidth >= DESKTOP_BREAKPOINT && isMenuOpen) {
          close({ restoreFocus: false });
        }
      }, 100);
    };

    onDrawerWheel = (event) => {
      const isAtTop = menuDrawer.scrollTop === 0;
      const isAtBottom = menuDrawer.scrollTop + menuDrawer.clientHeight >= menuDrawer.scrollHeight;

      if ((isAtTop && event.deltaY < 0) || (isAtBottom && event.deltaY > 0)) {
        event.preventDefault();
      }
    };

    // Hamburger button click
    menuToggle.addEventListener('click', onToggleClick);

    // Overlay click
    menuOverlay.addEventListener('click', onOverlayClick);

    onDrawerClick = (event) => {
      const clickedLink = event.target instanceof Element ? event.target.closest('.mobile-nav-link') : null;
      if (clickedLink) {
        close();
      }
    };

    menuDrawer.addEventListener('click', onDrawerClick);

    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('pointerdown', onDocumentPointerdown);
    window.addEventListener('resize', onWindowResize);

    // Prevent scroll propagation on drawer
    menuDrawer.addEventListener('wheel', onDrawerWheel, { passive: false });
  }

  /**
   * Open the mobile menu
   */
  function open() {
    if (isMenuOpen || !menuDrawer || !menuOverlay || !menuToggle) {
      return;
    }

    // Update state
    isMenuOpen = true;
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    // Update button state
    menuToggle.setAttribute('aria-expanded', 'true');
    menuDrawer.setAttribute('aria-hidden', 'false');

    // Show overlay and drawer
    requestAnimationFrame(() => {
      menuOverlay.classList.add('is-visible');
      menuDrawer.classList.add('is-visible');
      setBackgroundInert(true);

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Focus first menu link for accessibility
      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        menuDrawer.focus();
      }
    });
  }

  /**
   * Close the mobile menu
   */
  function close(options) {
    if (!isMenuOpen || !menuDrawer || !menuOverlay || !menuToggle) {
      return;
    }

    const shouldRestoreFocus = !options || options.restoreFocus !== false;

    // Update state
    isMenuOpen = false;

    // Update button state
    menuToggle.setAttribute('aria-expanded', 'false');
    menuDrawer.setAttribute('aria-hidden', 'true');

    // Hide overlay and drawer
    requestAnimationFrame(() => {
      menuOverlay.classList.remove('is-visible');
      menuDrawer.classList.remove('is-visible');
      setBackgroundInert(false);

      // Restore body scroll
      document.body.style.overflow = '';

      // Return focus to toggle button
      if (shouldRestoreFocus && menuToggle instanceof HTMLElement) {
        menuToggle.focus();
      } else if (shouldRestoreFocus && lastFocusedElement && lastFocusedElement.isConnected) {
        lastFocusedElement.focus();
      }

      lastFocusedElement = null;
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

  function getFocusableElements() {
    if (!menuDrawer) {
      return [];
    }

    return Array.from(menuDrawer.querySelectorAll(FOCUSABLE_SELECTORS)).filter((el) => {
      return el instanceof HTMLElement && !el.hasAttribute('hidden');
    });
  }

  function trapFocus(event) {
    const focusables = getFocusableElements();
    if (focusables.length === 0) {
      event.preventDefault();
      return;
    }

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const activeElement = document.activeElement;

    if (event.shiftKey) {
      if (activeElement === first || !menuDrawer.contains(activeElement)) {
        event.preventDefault();
        last.focus();
      }
      return;
    }

    if (activeElement === last || !menuDrawer.contains(activeElement)) {
      event.preventDefault();
      first.focus();
    }
  }

  function cacheBackgroundNodes() {
    const appRoot = document.getElementById('app-home');
    if (!appRoot) {
      backgroundNodes = [];
      return;
    }

    backgroundNodes = Array.from(appRoot.children).filter((node) => node.id !== 'header-mount');
  }

  function setBackgroundInert(shouldInert) {
    backgroundNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) {
        return;
      }

      if (shouldInert) {
        node.setAttribute('aria-hidden', 'true');
        node.inert = true;
      } else {
        node.removeAttribute('aria-hidden');
        node.inert = false;
      }
    });
  }

  /**
   * Cleanup function (if needed for single-page app navigation)
   */
  function destroy() {
    if (isMenuOpen) {
      close({ restoreFocus: false });
    }

    if (menuToggle) {
      menuToggle.removeEventListener('click', onToggleClick);
    }
    if (menuOverlay) {
      menuOverlay.removeEventListener('click', onOverlayClick);
    }
    if (menuDrawer && onDrawerWheel) {
      menuDrawer.removeEventListener('wheel', onDrawerWheel);
    }
    if (menuDrawer && onDrawerClick) {
      menuDrawer.removeEventListener('click', onDrawerClick);
    }

    if (onDocumentKeydown) {
      document.removeEventListener('keydown', onDocumentKeydown);
    }
    if (onDocumentPointerdown) {
      document.removeEventListener('pointerdown', onDocumentPointerdown);
    }
    if (onWindowResize) {
      window.removeEventListener('resize', onWindowResize);
    }

    clearTimeout(resizeTimeout);
    setBackgroundInert(false);
    document.body.style.overflow = '';

    menuToggle = null;
    menuOverlay = null;
    menuDrawer = null;
    menuLinks = [];
    backgroundNodes = [];

    onToggleClick = null;
    onOverlayClick = null;
    onDocumentKeydown = null;
    onDocumentPointerdown = null;
    onWindowResize = null;
    onDrawerWheel = null;
    onDrawerClick = null;

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

window.MobileMenu = MobileMenu;
