(() => {
  'use strict';

  /* ---------- Intro animation ---------- */
  const intro = document.getElementById('introOverlay');
  const body = document.body;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function endIntro() {
    body.classList.remove('intro-active');
    if (intro) intro.classList.add('intro--hidden');
  }

  if (!intro || reduceMotion) {
    endIntro();
  } else {
    const EXIT_AT = 2950;
    const REMOVE_AFTER_EXIT = 1250;
    window.setTimeout(() => {
      intro.classList.add('intro--exit');
      window.setTimeout(endIntro, REMOVE_AFTER_EXIT);
    }, EXIT_AT);
  }

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const closeNav = () => {
    mainNav.classList.remove('open');
    navToggle.classList.remove('open');
    navBackdrop.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navBackdrop.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
  navBackdrop.addEventListener('click', closeNav);
  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  /* ---------- Glow cursor follow ---------- */
  const glowCursor = document.getElementById('glowCursor');
  if (glowCursor && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      glowCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .project-card, .testimonial, .process-step, .section-title, .section-eyebrow, .about-text, .about-visual'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );
  revealTargets.forEach((el) => observer.observe(el));

  /* ---------- Contact form (static demo) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formNote.textContent = 'Merci ! Votre message a bien été noté, nous revenons vers vous rapidement.';
      contactForm.reset();
    });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
