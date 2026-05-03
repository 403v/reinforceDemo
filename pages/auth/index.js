'use strict';

// ==================== Component Mounting ====================

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

// ==================== User Type Selection ====================

function initUserTypeSelection() {
  const userTypeCards = document.querySelectorAll('.user-type-card');
  const aouForm = document.getElementById('aouForm');
  const publicForm = document.getElementById('publicForm');
  const userTypeSection = document.querySelector('.auth-user-type-section');

  userTypeCards.forEach(card => {
    card.addEventListener('click', () => {
      const userType = card.dataset.userType;

      // Show corresponding form
      if (userType === 'aou') {
        publicForm.style.display = 'none';
        aouForm.style.display = 'block';
      } else if (userType === 'public') {
        aouForm.style.display = 'none';
        publicForm.style.display = 'block';
      }

      // Hide user type selection
      userTypeSection.style.display = 'none';
    });
  });
}

// ==================== Back Button Functionality ====================

function initBackButtons() {
  const backBtnAou = document.getElementById('backBtnAou');
  const backBtnPublic = document.getElementById('backBtnPublic');
  const backBtnSignin = document.getElementById('backBtnSignin');
  const userTypeSection = document.querySelector('.auth-user-type-section');
  const aouForm = document.getElementById('aouForm');
  const publicForm = document.getElementById('publicForm');
  const signinForm = document.getElementById('signinForm');
  const userTypeCards = document.querySelectorAll('.user-type-card');

  const handleBackClick = () => {
    // Reset forms
    aouForm.style.display = 'none';
    publicForm.style.display = 'none';
    signinForm.style.display = 'none';
    userTypeSection.style.display = 'block';

    // Clear forms
    aouForm.reset();
    publicForm.reset();
    signinForm.reset();
    clearAllErrors();
  };

  backBtnAou.addEventListener('click', handleBackClick);
  backBtnPublic.addEventListener('click', handleBackClick);
  backBtnSignin.addEventListener('click', handleBackClick);
}

// ==================== Sign In Navigation ====================

function initSignInLinks() {
  const signinLinks = document.querySelectorAll('.auth-link-btn, .signin-link');
  const signinForm = document.getElementById('signinForm');
  const userTypeSection = document.querySelector('.auth-user-type-section');
  const aouForm = document.getElementById('aouForm');
  const publicForm = document.getElementById('publicForm');
  const backBtnSignin = document.getElementById('backBtnSignin');

  signinLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      
      // If this is the "Create Account" button, trigger back button behavior
      if (link.id === 'signupFromSigninBtn') {
        backBtnSignin.click();
        return;
      }
      
      // Hide user type selection and signup forms
      userTypeSection.style.display = 'none';
      aouForm.style.display = 'none';
      publicForm.style.display = 'none';
      
      // Show sign-in form
      signinForm.style.display = 'block';
      
      // Clear all errors
      clearAllErrors();
      signinForm.reset();
    });
  });
}

// ==================== Password Visibility Toggle ====================

function initPasswordToggle() {
  const passwordToggles = document.querySelectorAll('.password-toggle');

  passwordToggles.forEach(toggle => {
    toggle.addEventListener('click', e => {
      e.preventDefault();
      const targetId = toggle.dataset.target;
      const input = document.getElementById(targetId);
      const eyeIcon = toggle.querySelector('.eye-icon');
      const eyeOffIcon = toggle.querySelector('.eye-off-icon');

      if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.style.display = 'none';
        eyeOffIcon.style.display = 'block';
      } else {
        input.type = 'password';
        eyeIcon.style.display = 'block';
        eyeOffIcon.style.display = 'none';
      }
    });
  });
}

// ==================== Password Validation ====================

const passwordRequirements = {
  aou: {
    length: document.getElementById('reqLength'),
    uppercase: document.getElementById('reqUppercase'),
    number: document.getElementById('reqNumber')
  },
  public: {
    length: document.getElementById('reqLengthPublic'),
    uppercase: document.getElementById('reqUppercasePublic'),
    number: document.getElementById('reqNumberPublic')
  }
};

function validatePassword(password, type = 'aou') {
  const hasLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  const requirements = passwordRequirements[type];

  updateRequirement(requirements.length, hasLength);
  updateRequirement(requirements.uppercase, hasUppercase);
  updateRequirement(requirements.number, hasNumber);

  return hasLength && hasUppercase && hasNumber;
}

function updateRequirement(element, isMet) {
  if (isMet) {
    element.classList.add('met');
  } else {
    element.classList.remove('met');
  }
}

// ==================== Form Validation ====================

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  return name.trim().length >= 2;
}

function validateAouForm() {
  const email = document.getElementById('aouEmail');
  const password = document.getElementById('aouPassword');
  const terms = document.getElementById('aouTerms');
  let isValid = true;

  // Clear previous errors
  clearError('aouEmail');
  clearError('aouPassword');

  // Email validation
  if (!email.value.trim()) {
    setError('aouEmail', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    setError('aouEmail', 'Please enter a valid email');
    isValid = false;
  }

  // Password validation
  if (!password.value.trim()) {
    setError('aouPassword', 'Password is required');
    isValid = false;
  } else if (!validatePassword(password.value, 'aou')) {
    setError('aouPassword', 'Password does not meet requirements');
    isValid = false;
  }

  // Terms validation
  if (!terms.checked) {
    setError('aouTerms', 'You must agree to the terms');
    isValid = false;
  }

  return isValid;
}

function validatePublicForm() {
  const name = document.getElementById('publicName');
  const email = document.getElementById('publicEmail');
  const password = document.getElementById('publicPassword');
  const terms = document.getElementById('publicTerms');
  let isValid = true;

  // Clear previous errors
  clearError('publicName');
  clearError('publicEmail');
  clearError('publicPassword');

  // Name validation
  if (!name.value.trim()) {
    setError('publicName', 'Name is required');
    isValid = false;
  } else if (!validateName(name.value)) {
    setError('publicName', 'Please enter a valid name');
    isValid = false;
  }

  // Email validation
  if (!email.value.trim()) {
    setError('publicEmail', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    setError('publicEmail', 'Please enter a valid email');
    isValid = false;
  }

  // Password validation
  if (!password.value.trim()) {
    setError('publicPassword', 'Password is required');
    isValid = false;
  } else if (!validatePassword(password.value, 'public')) {
    setError('publicPassword', 'Password does not meet requirements');
    isValid = false;
  }

  // Terms validation
  if (!terms.checked) {
    setError('publicTerms', 'You must agree to the terms');
    isValid = false;
  }

  return isValid;
}

function validateSignInForm() {
  const email = document.getElementById('signinEmail');
  const password = document.getElementById('signinPassword');
  let isValid = true;

  // Clear previous errors
  clearError('signinEmail');
  clearError('signinPassword');

  // Email validation
  if (!email.value.trim()) {
    setError('signinEmail', 'Email is required');
    isValid = false;
  } else if (!validateEmail(email.value)) {
    setError('signinEmail', 'Please enter a valid email');
    isValid = false;
  }

  // Password validation
  if (!password.value.trim()) {
    setError('signinPassword', 'Password is required');
    isValid = false;
  }

  return isValid;
}

function setError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');

  if (field && field.type === 'checkbox') {
    // Don't show visual error for checkbox
    return;
  }

  if (field) {
    field.classList.add('error');
  }

  if (errorElement) {
    errorElement.textContent = message;
  }
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorElement = document.getElementById(fieldId + 'Error');

  if (field) {
    field.classList.remove('error');
  }

  if (errorElement) {
    errorElement.textContent = '';
  }
}

function clearAllErrors() {
  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
  });
  document.querySelectorAll('.form-input.error').forEach(el => {
    el.classList.remove('error');
  });
}

// ==================== Form Submission ====================

function initFormSubmission() {
  const aouForm = document.getElementById('aouForm');
  const publicForm = document.getElementById('publicForm');
  const signinForm = document.getElementById('signinForm');

  aouForm.addEventListener('submit', e => {
    e.preventDefault();

    if (validateAouForm()) {
      handleFormSubmit('aou', {
        email: document.getElementById('aouEmail').value,
        password: document.getElementById('aouPassword').value
      });
    }
  });

  publicForm.addEventListener('submit', e => {
    e.preventDefault();

    if (validatePublicForm()) {
      handleFormSubmit('public', {
        name: document.getElementById('publicName').value,
        email: document.getElementById('publicEmail').value,
        password: document.getElementById('publicPassword').value
      });
    }
  });

  signinForm.addEventListener('submit', e => {
    e.preventDefault();

    if (validateSignInForm()) {
      handleFormSubmit('signin', {
        email: document.getElementById('signinEmail').value,
        password: document.getElementById('signinPassword').value
      });
    }
  });
}

function handleFormSubmit(userType, formData) {
  // Here you would typically send the data to your backend
  console.log(`Submitting ${userType} form:`, formData);

  // Show success message (in production, you'd handle the response)
  alert(`Account creation initiated for ${userType} user!\n\nNote: This is a demo. In production, this would connect to your backend.`);
}

// ==================== Real-time Password Validation ====================

function initRealtimeValidation() {
  const aouPasswordInput = document.getElementById('aouPassword');
  const publicPasswordInput = document.getElementById('publicPassword');

  aouPasswordInput.addEventListener('input', e => {
    validatePassword(e.target.value, 'aou');
  });

  publicPasswordInput.addEventListener('input', e => {
    validatePassword(e.target.value, 'public');
  });
}

// ==================== Page Initialization ====================

async function composeAuthPage() {
  try {
    await mountComponent('header-mount', '/reinforceDemo/components/header/header.html');
    if (window.AppTheme) {
      window.AppTheme.initTheme();
      window.AppTheme.setupToggle(document);
    }
    // Initialize mobile menu after header is mounted
    await initMobileMenu();
    await mountComponent('footer-mount', '/reinforceDemo/components/footer/footer.html');
    markAuthNavActive();
  } catch (error) {
    console.error('Error mounting components:', error);
  }

  initScrollEffects();
  initUserTypeSelection();
  initBackButtons();
  initPasswordToggle();
  initFormSubmission();
  initSignInLinks();
  initRealtimeValidation();
}

function markAuthNavActive() {
  const navLinks = document.querySelectorAll('.site-nav .nav-link');

  navLinks.forEach(link => {
    link.classList.remove('nav-link-active');
    if (link.textContent && link.textContent.trim().toLowerCase() === 'sign up') {
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
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', composeAuthPage);
} else {
  composeAuthPage();
}
