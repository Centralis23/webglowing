(() => {
  'use strict';

  /* ---------- Portfolio showcase ---------- */
  const showcaseItems = document.querySelectorAll('.showcase-item');
  const showcaseFrames = document.querySelectorAll('.showcase-frame');
  const activateShowcase = (item) => {
    const index = item.dataset.index;
    showcaseItems.forEach((el) => {
      el.classList.toggle('is-active', el === item);
      el.setAttribute('aria-selected', el === item ? 'true' : 'false');
    });
    showcaseFrames.forEach((frame) => {
      frame.classList.toggle('is-active', frame.dataset.index === index);
    });
  };
  showcaseItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.showcase-tag')) return;
      activateShowcase(item);
    });
    item.addEventListener('keydown', (e) => {
      if (e.target !== item) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateShowcase(item);
      }
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .testimonial, .process-step, .section-title, .section-eyebrow, .about-text, .about-visual'
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
