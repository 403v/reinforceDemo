'use strict';

const LANGUAGE_STORAGE_KEY = 'app-language';
const DEFAULT_LANGUAGE = 'en';

const TRANSLATIONS = {
  en: {
    meta: {
      title: 'Instructor Details - AOU'
    },
    theme: {
      toggleToLight: 'Switch to light mode',
      toggleToDark: 'Switch to dark mode',
      lightLabel: 'Light',
      darkLabel: 'Dark'
    },
    header: {
      nav: ['Courses', 'Micro Credentials', 'Instructors', 'Plans'],
      searchPlaceholder: 'Search knowledge...',
      searchAria: 'Search knowledge',
      toolsAria: 'Search and utility actions',
      languageToggleAria: 'Switch language to Arabic',
      accountAria: 'Account',
      joinNow: 'Join Now'
    },
    hero: {
      eyebrow: 'Mentor Profile',
      name: 'Dr. Mohammed Hamoury',
      title: 'Learning Experience Strategist, Cybersecurity Mentor, and Executive Trainer',
      summary: 'Dr. Hamoury blends academic rigor with practical industry insight to deliver courses that are precise, modern, and deeply applicable. His teaching style is measured, clear, and designed to help learners build confidence fast.',
      statValues: ['4.9/5', '38K+', '21', '15+ yrs'],
      statLabels: ['Instructor rating', 'Learners reached', 'Published courses', 'Field experience'],
      primaryCta: 'Explore Courses',
      secondaryCta: 'Book a Session',
      focusLabel: 'Signature Focus',
      focusValue: 'Security, leadership, and practical digital transformation',
      heroImageAlt: 'Portrait of Dr. Mohammed Hamoury'
    },
    about: {
      eyebrow: 'About Mentor',
      title: 'Teaching with structure, clarity, and applied expertise',
      // paragraph1: 'Dr. Hamoury focuses on high-signal learning experiences that respect the learner\'s time. His courses emphasize foundations first, then move into real-world application, case studies, and practical decision-making.',
      // paragraph2: 'He is especially known for translating complex technical and strategic topics into guidance that feels direct, actionable, and immediately useful for students and working professionals.',
      pointLabels: ['Approach', 'Audience', 'Style'],
      pointValues: ['Structured, high-clarity instruction', 'Students, graduates, and professionals', 'Direct, practical, and mentor-led'],
      videoFallback: 'Your browser does not support the video tag.',
      videoCaption: 'Intro video: a short mentor overview and teaching philosophy from Dr. Hamoury.'
    },
    skills: {
      eyebrow: 'Skills and Expertise',
      title: 'Core areas covered in his instruction',
      tags: ['Cybersecurity Strategy', 'Digital Transformation', 'Leadership', 'Risk Management', 'Compliance', 'Executive Coaching', 'Security Operations', 'Learning Design']
    },
    courses: {
      eyebrow: 'Courses by Instructor',
      title: 'Popular learning paths led by Dr. Hamoury',
      cards: [
        { badge: 'Best Seller', title: 'Cybercrime Investigation', description: 'Learn modern investigation techniques, evidence handling, and digital response workflows.', meta1: '18,420 students', meta2: 'Beginner friendly', price: 'Free', link: 'View details', imageAlt: 'Cybercrime Investigation course cover' },
        { badge: 'Top Rated', title: 'Blockchain Fundamentals', description: 'Build a clear understanding of blockchain, trust models, and applied enterprise use cases.', meta1: '12,510 students', meta2: 'Intermediate', price: '25 KWD', link: 'View details', imageAlt: 'Blockchain Fundamentals course cover' },
        { badge: '', title: 'Ethical Hacking Essentials', description: 'A practical introduction to adversarial thinking, defense, and security testing basics.', meta1: '9,680 students', meta2: 'Advanced', price: '40 KWD', link: 'View details', imageAlt: 'Ethical Hacking Essentials course cover' }
      ]
    },
    testimonials: {
      eyebrow: 'Testimonials',
      title: 'What learners say about the instructor',
      roles: ['Graduate learner', 'Working professional', 'Executive learner'],
      quotes: [
        '"The instruction is sharp and structured. I always leave with a better framework for applying what I learned."',
        '"He explains difficult topics in a way that feels practical, calm, and immediately useful in my role."',
        '"The mix of strategy and application is excellent. It feels like mentorship, not just a lecture."'
      ]
    },
    credentials: {
      eyebrow: 'Credentials & Experience',
      title: 'A profile built on applied expertise',
      intro: 'Dr. Hamoury brings a mix of teaching experience, industry exposure, and learner-focused design. His background supports a teaching style that is confident, precise, and grounded in practical outcomes.',
      timelineTitles: ['Executive learning track lead', 'Cybersecurity curriculum advisor', 'Industry and higher-ed mentor'],
      timelineDescriptions: ['Developed mentor-led modules for senior professionals and academic cohorts.', 'Guided course design for practical security operations and risk programs.', 'Supported learners across technical, strategic, and leadership-focused programs.']
    },
    faq: {
      eyebrow: 'FAQ',
      title: "Common questions about Dr. Hamoury's teaching",
      questions: ['What kind of learner benefits most from these courses?', 'Are the courses suitable for beginners?', 'Does he offer mentorship beyond recorded lessons?', 'Which topics are covered most often?'],
      answers: ['Students who want structure, clear guidance, and practical application will benefit most from his approach.', 'Yes. Several learning paths start with fundamentals and gradually move toward more advanced material.', 'Selected programs include live office hours, feedback checkpoints, and guided support options.', 'Cybersecurity, leadership, digital transformation, and practical strategy are recurring themes in his material.']
    },
    cta: {
      eyebrow: 'Take the Next Step',
      title: 'Learn with a mentor who values clarity and outcomes',
      description: 'Explore the available courses or request a guided session with Dr. Hamoury to find the best learning path.',
      browse: 'Browse courses',
      plans: 'See plans'
    },
    footer: {
      brand: 'Arab Open University',
      description: 'Elevating the standard of digital education through scholarly rigor and premium production.',
      socialAria: ['Globe', 'Video Library', 'Campaign'],
      columns: ['Academic', 'Institution', 'Newsletter'],
      linksAcademic: ['Courses', 'Micro Credentials', 'Plans', 'Research Credits'],
      linksInstitution: ['Academic Integrity', 'Privacy Policy', 'Institutional Terms', 'Contact Dean'],
      newsletterDescription: 'Weekly scholarly insights and program updates.',
      newsletterPlaceholder: 'scholar@university.edu',
      newsletterSubmitAria: 'Submit newsletter email',
      copyright: '© 2026 Arab Open University. All Rights Reserved.',
      languageLabel: 'English'
    }
  },
  ar: {
    meta: {
      title: 'تفاصيل المدرس - الأثينيوم'
    },
    theme: {
      toggleToLight: 'التبديل إلى الوضع الفاتح',
      toggleToDark: 'التبديل إلى الوضع الداكن',
      lightLabel: 'فاتح',
      darkLabel: 'داكن'
    },
    header: {
      nav: ['الدورات', 'الشهادات المصغرة', 'المدرسون', 'الخطط'],
      searchPlaceholder: 'ابحث في المعرفة...',
      searchAria: 'ابحث في المعرفة',
      toolsAria: 'إجراءات البحث والأدوات',
      languageToggleAria: 'التبديل إلى الإنجليزية',
      accountAria: 'الحساب',
      joinNow: 'انضم الآن'
    },
    hero: {
      eyebrow: 'ملف المرشد',
      name: 'د. محمد حموري',
      title: 'استراتيجي تجربة تعلم، مرشد أمن سيبراني، ومدرب تنفيذي',
      summary: 'يجمع د. حموري بين العمق الأكاديمي والرؤية العملية لتقديم دورات دقيقة وعصرية وقابلة للتطبيق المباشر. أسلوبه واضح ومتزن ويمنح المتعلم ثقة أسرع في التنفيذ.',
      statValues: ['4.9/5', '38K+', '21', '15+ سنة'],
      statLabels: ['تقييم المدرس', 'عدد المتعلمين', 'الدورات المنشورة', 'سنوات خبرة ميدانية'],
      primaryCta: 'استكشف الدورات',
      secondaryCta: 'احجز جلسة',
      focusLabel: 'التركيز الرئيسي',
      focusValue: 'الأمن والقيادة والتحول الرقمي العملي',
      heroImageAlt: 'صورة د. محمد حموري'
    },
    about: {
      eyebrow: 'عن المرشد',
      title: 'تدريس قائم على البنية والوضوح والخبرة التطبيقية',
      paragraph1: 'يركز د. حموري على تجارب تعلم عالية القيمة تحترم وقت المتعلم. تبدأ دوراته بالأساسيات ثم تنتقل إلى التطبيق الواقعي ودراسات الحالة واتخاذ القرار العملي.',
      paragraph2: 'يشتهر بترجمة الموضوعات التقنية والاستراتيجية المعقدة إلى إرشاد مباشر وعملي ومفيد فورًا للطلبة والمهنيين.',
      pointLabels: ['المنهج', 'الفئة', 'الأسلوب'],
      pointValues: ['تعليم منظم وعالي الوضوح', 'طلبة وخريجون ومهنيون', 'مباشر وعملي وبإرشاد مرشد'],
      videoFallback: 'متصفحك لا يدعم تشغيل الفيديو.',
      videoCaption: 'فيديو تعريفي: نظرة سريعة على منهج التدريس والفلسفة التعليمية لدى د. حموري.'
    },
    skills: {
      eyebrow: 'المهارات والخبرات',
      title: 'المجالات الأساسية التي يغطيها في تدريسه',
      tags: ['استراتيجية الأمن السيبراني', 'التحول الرقمي', 'القيادة', 'إدارة المخاطر', 'الامتثال', 'التوجيه التنفيذي', 'عمليات الأمن', 'تصميم التعلم']
    },
    courses: {
      eyebrow: 'الدورات التي يقدمها المدرس',
      title: 'مسارات تعلم شائعة يقودها د. حموري',
      cards: [
        { badge: 'الأكثر مبيعًا', title: 'تحقيق الجرائم الإلكترونية', description: 'تعلّم تقنيات التحقيق الحديثة، والتعامل مع الأدلة، ومسارات الاستجابة الرقمية.', meta1: '18,420 متعلمًا', meta2: 'مناسب للمبتدئين', price: 'مجاني', link: 'عرض التفاصيل', imageAlt: 'غلاف دورة تحقيق الجرائم الإلكترونية' },
        { badge: 'الأعلى تقييمًا', title: 'أساسيات البلوك تشين', description: 'ابنِ فهمًا واضحًا للبلوك تشين ونماذج الثقة وحالات الاستخدام المؤسسية.', meta1: '12,510 متعلمًا', meta2: 'متوسط', price: '25 دينار كويتي', link: 'عرض التفاصيل', imageAlt: 'غلاف دورة أساسيات البلوك تشين' },
        { badge: '', title: 'أساسيات الاختراق الأخلاقي', description: 'مدخل عملي إلى التفكير الهجومي والدفاعي وأساسيات اختبار الأمان.', meta1: '9,680 متعلمًا', meta2: 'متقدم', price: '40 دينار كويتي', link: 'عرض التفاصيل', imageAlt: 'غلاف دورة أساسيات الاختراق الأخلاقي' }
      ]
    },
    testimonials: {
      eyebrow: 'آراء المتعلمين',
      title: 'ماذا يقول المتعلمون عن المدرس',
      roles: ['متعلم خريج', 'محترف عامل', 'متعلم تنفيذي'],
      quotes: [
        '"التدريس واضح ومنظم. أخرج دائمًا بإطار أفضل لتطبيق ما تعلمته."',
        '"يشرح المواضيع الصعبة بطريقة عملية وهادئة ومفيدة مباشرة في عملي."',
        '"المزج بين الاستراتيجية والتطبيق ممتاز. أشعر أنه توجيه حقيقي وليس مجرد محاضرة."'
      ]
    },
    credentials: {
      eyebrow: 'المؤهلات والخبرة',
      title: 'ملف شخصي مبني على خبرة تطبيقية',
      intro: 'يمتلك د. حموري مزيجًا من الخبرة التعليمية والتعرض العملي للصناعة والتصميم المرتكز على المتعلم. هذه الخلفية تدعم أسلوبًا تعليميًا واثقًا ودقيقًا ومبنيًا على نتائج عملية.',
      timelineTitles: ['قائد مسار التعلم التنفيذي', 'مستشار مناهج الأمن السيبراني', 'مرشد للصناعة والتعليم العالي'],
      timelineDescriptions: ['طوّر وحدات إرشادية للمهنيين الكبار والدفعات الأكاديمية.', 'وجّه تصميم الدورات لعمليات الأمن العملية وبرامج المخاطر.', 'دعم المتعلمين عبر مسارات تقنية واستراتيجية وقيادية.',]
    },
    faq: {
      eyebrow: 'الأسئلة الشائعة',
      title: 'أسئلة شائعة حول أسلوب تدريس د. حموري',
      questions: ['ما نوع المتعلم الذي يستفيد أكثر من هذه الدورات؟', 'هل الدورات مناسبة للمبتدئين؟', 'هل يقدم إرشادًا يتجاوز الدروس المسجلة؟', 'ما الموضوعات التي يغطّيها غالبًا؟'],
      answers: ['الطلاب الذين يحتاجون إلى تنظيم وإرشاد واضح وتطبيق عملي سيستفيدون أكثر من هذا الأسلوب.', 'نعم. تبدأ عدة مسارات بالأساسيات ثم تنتقل تدريجيًا إلى مستوى أكثر تقدمًا.', 'تشمل بعض البرامج ساعات مكتبية مباشرة ونقاط مراجعة ودعمًا موجّهًا.', 'الأمن السيبراني والقيادة والتحول الرقمي والاستراتيجية العملية هي موضوعات متكررة في محتواه.']
    },
    cta: {
      eyebrow: 'الخطوة التالية',
      title: 'تعلّم مع مرشد يقدّر الوضوح والنتائج',
      description: 'استكشف الدورات المتاحة أو اطلب جلسة موجهة مع د. حموري للعثور على أفضل مسار تعليمي.',
      browse: 'تصفح الدورات',
      plans: 'عرض الخطط'
    },
    footer: {
      brand: 'الجامعة العربية المفتوحة',
      description: 'نرفع معيار التعليم الرقمي من خلال الصرامة الأكاديمية والإنتاج عالي الجودة.',
      socialAria: ['الموقع', 'مكتبة الفيديو', 'الحملات'],
      columns: ['أكاديمي', 'المؤسسة', 'النشرة البريدية'],
      linksAcademic: ['الدورات', 'الشهادات المصغرة', 'الخطط', 'اعتمادات البحث'],
      linksInstitution: ['النزاهة الأكاديمية', 'سياسة الخصوصية', 'شروط المؤسسة', 'التواصل مع العميد'],
      newsletterDescription: 'رؤى أكاديمية وتحديثات أسبوعية للبرامج.',
      newsletterPlaceholder: 'scholar@university.edu',
      newsletterSubmitAria: 'إرسال بريد النشرة',
      copyright: '© 2026 الجامعة العربية المفتوحة. جميع الحقوق محفوظة.',
      languageLabel: 'العربية'
    }
  }
};

let languageSwitchTimer = null;

function readStoredLanguage() {
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return value === 'ar' || value === 'en' ? value : null;
  } catch (error) {
    return null;
  }
}

function writeStoredLanguage(language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Ignore storage failures.
  }
}

function resolveLanguage() {
  return readStoredLanguage() || DEFAULT_LANGUAGE;
}

function getTranslation(language) {
  return TRANSLATIONS[language] || TRANSLATIONS.en;
}

function getTextNode(element) {
  return Array.from(element.childNodes).find((node) => node.nodeType === Node.TEXT_NODE) || null;
}

function setText(element, value) {
  if (!element) {
    return;
  }

  element.textContent = value;
}

function setButtonText(button, value) {
  if (!button) {
    return;
  }

  const textNode = getTextNode(button);
  if (textNode) {
    textNode.nodeValue = value;
    return;
  }

  button.insertBefore(document.createTextNode(value), button.firstChild);
}

function updateHeaderTranslations(translation) {
  const navLinks = document.querySelectorAll('.site-nav .nav-link');
  navLinks.forEach((link, index) => {
    if (translation.header.nav[index]) {
      setText(link, translation.header.nav[index]);
    }
  });

  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.placeholder = translation.header.searchPlaceholder;
    searchInput.setAttribute('aria-label', translation.header.searchAria);
  }

  const toolsGroup = document.querySelector('.tools-group');
  if (toolsGroup) {
    toolsGroup.setAttribute('aria-label', translation.header.toolsAria);
  }

  const languageButton = document.querySelector('[data-language-toggle]');
  if (languageButton) {
    languageButton.setAttribute('aria-label', translation.header.languageToggleAria);
  }

  const utilityButtons = document.querySelectorAll('.tools-group .icon-btn');
  const accountButton = utilityButtons[2] || null;
  if (accountButton) {
    accountButton.setAttribute('aria-label', translation.header.accountAria);
  }

  const joinNowButton = document.querySelector('.join-btn');
  if (joinNowButton) {
    setText(joinNowButton, translation.header.joinNow);
  }
}

function updateHeroTranslations(translation) {
  setText(document.querySelector('.instructor-eyebrow'), translation.hero.eyebrow);
  setText(document.querySelector('.instructor-name'), translation.hero.name);
  setText(document.querySelector('.instructor-title'), translation.hero.title);
  setText(document.querySelector('.instructor-summary'), translation.hero.summary);

  const heroStats = document.querySelectorAll('.instructor-stats-grid .stat-card');
  heroStats.forEach((card, index) => {
    const value = card.querySelector('.stat-value');
    const label = card.querySelector('.stat-label');
    setText(value, translation.hero.statValues[index]);
    setText(label, translation.hero.statLabels[index]);
  });

  setText(document.querySelector('.instructor-cta-row .primary-cta'), translation.hero.primaryCta);
  setText(document.querySelector('.instructor-cta-row .secondary-cta'), translation.hero.secondaryCta);

  const heroFocus = document.querySelector('.hero-highlight-card');
  if (heroFocus) {
    const label = heroFocus.querySelector('p');
    const value = heroFocus.querySelector('strong');
    setText(label, translation.hero.focusLabel);
    setText(value, translation.hero.focusValue);
  }

  const heroImage = document.querySelector('.hero-image-frame img');
  if (heroImage) {
    heroImage.alt = translation.hero.heroImageAlt;
  }
}

function updateAboutTranslations(translation) {
  const aboutSection = document.querySelector('.instructor-about-section');
  if (aboutSection) {
    setText(aboutSection.querySelector('.section-eyebrow'), translation.about.eyebrow);
    setText(aboutSection.querySelector('.section-title'), translation.about.title);
    const paragraphs = aboutSection.querySelectorAll('.content-panel > p');
    setText(paragraphs[0], translation.about.paragraph1);
    setText(paragraphs[1], translation.about.paragraph2);

    const pointLabels = aboutSection.querySelectorAll('.mentor-point-label');
    const pointValues = aboutSection.querySelectorAll('.mentor-point-value');
    pointLabels.forEach((label, index) => setText(label, translation.about.pointLabels[index]));
    pointValues.forEach((value, index) => setText(value, translation.about.pointValues[index]));

    setText(aboutSection.querySelector('.video-caption'), translation.about.videoCaption);
    const video = aboutSection.querySelector('.mentor-video');
    if (video) {
      const fallbackText = video.parentElement ? video.parentElement.parentElement.querySelector('.video-caption') : null;
      if (fallbackText) {
        // no-op, caption already translated
      }
      video.setAttribute('aria-label', translation.about.videoCaption);
    }
  }
}

function updateSkillsTranslations(translation) {
  const skillsSection = document.querySelector('.expertise-section');
  if (!skillsSection) {
    return;
  }

  setText(skillsSection.querySelector('.section-eyebrow'), translation.skills.eyebrow);
  setText(skillsSection.querySelector('.section-title'), translation.skills.title);
  skillsSection.querySelectorAll('.skill-tag').forEach((tag, index) => {
    setText(tag, translation.skills.tags[index]);
  });
}

function updateCoursesTranslations(translation) {
  const coursesSection = document.querySelector('.courses-section');
  if (!coursesSection) {
    return;
  }

  setText(coursesSection.querySelector('.section-eyebrow'), translation.courses.eyebrow);
  setText(coursesSection.querySelector('.section-title'), translation.courses.title);

  const courseCards = coursesSection.querySelectorAll('.course-card');
  courseCards.forEach((card, index) => {
    const course = translation.courses.cards[index];
    if (!course) {
      return;
    }

    const badge = card.querySelector('.course-badge');
    if (badge) {
      if (course.badge) {
        badge.hidden = false;
        setText(badge, course.badge);
      } else {
        badge.hidden = true;
      }
    }

    setText(card.querySelector('.course-title'), course.title);
    setText(card.querySelector('.course-description'), course.description);

    const metaItems = card.querySelectorAll('.course-meta-row span');
    setText(metaItems[0], course.meta1);
    setText(metaItems[1], course.meta2);
    setText(card.querySelector('.course-price'), course.price);
    setText(card.querySelector('.course-link'), course.link);

    const image = card.querySelector('.course-card-image img');
    if (image) {
      image.alt = course.imageAlt;
    }
  });
}

function updateTestimonialsTranslations(translation) {
  const testimonialsSection = document.querySelector('.testimonials-section');
  if (!testimonialsSection) {
    return;
  }

  setText(testimonialsSection.querySelector('.section-eyebrow'), translation.testimonials.eyebrow);
  setText(testimonialsSection.querySelector('.section-title'), translation.testimonials.title);

  testimonialsSection.querySelectorAll('.review-card').forEach((card, index) => {
    const info = card.querySelector('.review-info');
    const heading = info ? info.querySelector('h3') : null;
    const role = info ? info.querySelector('p') : null;
    const quote = card.querySelector('.review-copy');

    setText(heading, ['Noura A.', 'Khaled M.', 'Layla S.'][index]);
    setText(role, translation.testimonials.roles[index]);
    setText(quote, translation.testimonials.quotes[index]);
  });
}

function updateCredentialsTranslations(translation) {
  const credentialsSection = document.querySelector('.credentials-section');
  if (!credentialsSection) {
    return;
  }

  setText(credentialsSection.querySelector('.section-eyebrow'), translation.credentials.eyebrow);
  setText(credentialsSection.querySelector('.section-title'), translation.credentials.title);
  setText(credentialsSection.querySelector('.content-panel > p'), translation.credentials.intro);

  credentialsSection.querySelectorAll('.timeline-item').forEach((item, index) => {
    setText(item.querySelector('.timeline-year'), ['2025', '2021', '2014'][index]);
    setText(item.querySelector('h3'), translation.credentials.timelineTitles[index]);
    setText(item.querySelector('p'), translation.credentials.timelineDescriptions[index]);
  });
}

function updateFaqTranslations(translation) {
  const faqSection = document.querySelector('.faq-section');
  if (!faqSection) {
    return;
  }

  setText(faqSection.querySelector('.section-eyebrow'), translation.faq.eyebrow);
  setText(faqSection.querySelector('.section-title'), translation.faq.title);

  faqSection.querySelectorAll('.faq-item').forEach((item, index) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer p');
    setButtonText(button, translation.faq.questions[index]);
    setText(answer, translation.faq.answers[index]);
  });
}

function updateCtaTranslations(translation) {
  const ctaSection = document.querySelector('.mentor-cta-section');
  if (!ctaSection) {
    return;
  }

  setText(ctaSection.querySelector('.section-eyebrow'), translation.cta.eyebrow);
  setText(ctaSection.querySelector('.home-headline'), translation.cta.title);
  const bodyParagraph = ctaSection.querySelector('.mentor-cta-card > div:first-child > p:not(.section-eyebrow)');
  setText(bodyParagraph, translation.cta.description);
  setText(ctaSection.querySelector('.mentor-cta-actions .primary-cta'), translation.cta.browse);
  setText(ctaSection.querySelector('.mentor-cta-actions .secondary-cta'), translation.cta.plans);
}

function updateFooterTranslations(translation) {
  const footer = document.querySelector('.site-footer');
  if (!footer) {
    return;
  }

  setText(footer.querySelector('.footer-brand'), translation.footer.brand);
  setText(footer.querySelector('.footer-description'), translation.footer.description);

  const socialButtons = footer.querySelectorAll('.footer-social-button');
  socialButtons.forEach((button, index) => {
    button.setAttribute('aria-label', translation.footer.socialAria[index]);
  });

  const titles = footer.querySelectorAll('.footer-column-title');
  titles.forEach((title, index) => {
    setText(title, translation.footer.columns[index]);
  });

  const footerLists = footer.querySelectorAll('.footer-links-list');
  const academicLinks = footerLists[0] ? footerLists[0].querySelectorAll('.footer-link') : [];
  academicLinks.forEach((link, index) => setText(link, translation.footer.linksAcademic[index]));

  const institutionLinks = footerLists[1] ? footerLists[1].querySelectorAll('.footer-link') : [];
  institutionLinks.forEach((link, index) => setText(link, translation.footer.linksInstitution[index]));

  setText(footer.querySelector('.footer-newsletter-description'), translation.footer.newsletterDescription);
  const newsletterInput = footer.querySelector('.footer-newsletter-input');
  if (newsletterInput) {
    newsletterInput.placeholder = translation.footer.newsletterPlaceholder;
  }
  const newsletterSubmit = footer.querySelector('.footer-newsletter-submit');
  if (newsletterSubmit) {
    newsletterSubmit.setAttribute('aria-label', translation.footer.newsletterSubmitAria);
  }

  setText(footer.querySelector('.footer-copyright'), translation.footer.copyright);
  setText(footer.querySelector('.footer-language'), translation.footer.languageLabel);
}

function syncFaqHeights() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const answer = item.querySelector('.faq-answer');
    if (!answer) {
      return;
    }

    if (item.classList.contains('is-active')) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    } else {
      answer.style.maxHeight = null;
    }
  });
}

function updateAllTranslations(language) {
  const translation = getTranslation(language);

  document.title = translation.meta.title;
  updateHeaderTranslations(translation);
  updateHeroTranslations(translation);
  updateAboutTranslations(translation);
  updateSkillsTranslations(translation);
  updateCoursesTranslations(translation);
  updateTestimonialsTranslations(translation);
  updateCredentialsTranslations(translation);
  updateFaqTranslations(translation);
  updateCtaTranslations(translation);
  updateFooterTranslations(translation);

  if (window.AppTheme && typeof window.AppTheme.setupToggle === 'function') {
    window.AppTheme.setupToggle(document);
  }
}

function applyLanguage(language, options = {}) {
  const resolvedLanguage = language === 'ar' ? 'ar' : 'en';
  const persist = options.persist !== false;

  if (persist) {
    writeStoredLanguage(resolvedLanguage);
  }

  document.documentElement.setAttribute('lang', resolvedLanguage);
  document.documentElement.setAttribute('dir', resolvedLanguage === 'ar' ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('data-language', resolvedLanguage);
  if (document.body) {
    document.body.classList.add('is-language-switching');
  }

  clearTimeout(languageSwitchTimer);
  languageSwitchTimer = window.setTimeout(() => {
    if (document.body) {
      document.body.classList.remove('is-language-switching');
    }
  }, 220);

  updateAllTranslations(resolvedLanguage);
  syncFaqHeights();
}

function initLanguageToggle() {
  const toggleButton = document.querySelector('[data-language-toggle]');
  if (!toggleButton || toggleButton.dataset.languageBound === 'true') {
    return;
  }

  toggleButton.dataset.languageBound = 'true';
  toggleButton.addEventListener('click', () => {
    const nextLanguage = resolveLanguage() === 'ar' ? 'en' : 'ar';
    applyLanguage(nextLanguage);
  });
}

function initI18n() {
  window.AppI18n = {
    getLanguage: resolveLanguage,
    getTranslations: getTranslation,
    applyLanguage
  };

  initLanguageToggle();
  applyLanguage(resolveLanguage(), { persist: false });
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

async function composeInstructorDetailsPage() {
  try {
    await mountComponent('header-mount', '/reinforceDemo/components/header/header.html');
    if (window.AppTheme) {
      window.AppTheme.initTheme();
      window.AppTheme.setupToggle(document);
    }
    // Initialize mobile menu after header is mounted
    await initMobileMenu();
    await mountComponent('footer-mount', '/reinforceDemo/components/footer/footer.html');
    initI18n();
  } catch (error) {
    console.error(error);
  }

  initScrollEffects();
  initFaqAccordion();
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

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.12
  });

  document.querySelectorAll('.reveal-up').forEach((element) => observer.observe(element));
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!button || !answer) {
      return;
    }

    if (item.classList.contains('is-active')) {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('is-active');

      faqItems.forEach((otherItem) => {
        otherItem.classList.remove('is-active');
        const otherButton = otherItem.querySelector('.faq-question');
        const otherAnswer = otherItem.querySelector('.faq-answer');

        if (otherButton) {
          otherButton.setAttribute('aria-expanded', 'false');
        }

        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      if (!isActive) {
        item.classList.add('is-active');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

void composeInstructorDetailsPage();