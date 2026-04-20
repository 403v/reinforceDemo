'use strict';

(function initAppThemeModule() {
  const STORAGE_KEY = 'app-theme';
  const THEMES = {
    DARK: 'dark',
    LIGHT: 'light'
  };

  function readStoredTheme() {
    try {
      const value = window.localStorage.getItem(STORAGE_KEY);
      return value === THEMES.LIGHT || value === THEMES.DARK ? value : null;
    } catch (error) {
      return null;
    }
  }

  function writeStoredTheme(theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      // Ignore storage failures and keep runtime theme.
    }
  }

  function resolveTheme() {
    return readStoredTheme() || THEMES.LIGHT;
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    syncThemeAssets(theme);
    return theme;
  }

  function syncThemeAssets(theme, root) {
    const scope = root || document;
    const logoImages = scope.querySelectorAll('.brand-logo[data-logo-light][data-logo-dark]');

    logoImages.forEach((img) => {
      const lightLogo = img.getAttribute('data-logo-light');
      const darkLogo = img.getAttribute('data-logo-dark');

      if (!lightLogo || !darkLogo) {
        return;
      }

      img.setAttribute('src', theme === THEMES.LIGHT ? lightLogo : darkLogo);
    });
  }

  function getActiveTheme() {
    const active = document.documentElement.getAttribute('data-theme');
    return active === THEMES.LIGHT ? THEMES.LIGHT : THEMES.DARK;
  }

  function updateToggleUI(toggleButton, theme) {
    const isLight = theme === THEMES.LIGHT;
    const i18n = window.AppI18n;
    const language = i18n && typeof i18n.getLanguage === 'function' ? i18n.getLanguage() : null;
    const translations = i18n && typeof i18n.getTranslations === 'function' && language ? i18n.getTranslations(language) : null;
    const themeLabels = translations && translations.theme ? translations.theme : null;
    toggleButton.setAttribute('aria-pressed', isLight ? 'true' : 'false');
    toggleButton.setAttribute(
      'aria-label',
      isLight
        ? (themeLabels && themeLabels.toggleToDark) || 'Switch to dark mode'
        : (themeLabels && themeLabels.toggleToLight) || 'Switch to light mode'
    );

    const label = toggleButton.querySelector('[data-theme-toggle-label]');
    if (label) {
      label.textContent = isLight
        ? (themeLabels && themeLabels.darkLabel) || 'Dark'
        : (themeLabels && themeLabels.lightLabel) || 'Light';
    }
  }

  function setupToggle(root) {
    const scope = root || document;
    const toggleButton = scope.querySelector('[data-theme-toggle]');
    syncThemeAssets(getActiveTheme(), scope);

    if (!toggleButton) {
      return;
    }

    if (toggleButton.dataset.themeBound === 'true') {
      updateToggleUI(toggleButton, getActiveTheme());
      return;
    }

    toggleButton.dataset.themeBound = 'true';
    updateToggleUI(toggleButton, getActiveTheme());

    toggleButton.addEventListener('click', () => {
      const currentTheme = getActiveTheme();
      const nextTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
      applyTheme(nextTheme);
      writeStoredTheme(nextTheme);
      updateToggleUI(toggleButton, nextTheme);
    });
  }

  function initTheme() {
    applyTheme(resolveTheme());
  }

  window.AppTheme = {
    initTheme,
    setupToggle,
    applyTheme
  };

  initTheme();
})();
