(() => {
  'use strict';

  /* ---------- Portfolio showcase ---------- */
  const showcaseEl = document.querySelector('.showcase');
  const showcaseItems = document.querySelectorAll('.showcase-item');
  const showcaseFrames = document.querySelectorAll('.showcase-frame');
  const AUTOPLAY_MS = 6000;
  let currentIndex = 0;
  let autoplayInterval = null;

  const runProgress = (activeIndex) => {
    showcaseItems.forEach((el) => {
      const bar = el.querySelector('.showcase-progress-bar');
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });
    const activeBar = showcaseItems[activeIndex]?.querySelector('.showcase-progress-bar');
    if (activeBar) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activeBar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
          activeBar.style.width = '100%';
        });
      });
    }
  };

  const setActive = (index, { resetTimer = true } = {}) => {
    currentIndex = index;
    showcaseItems.forEach((el, i) => {
      el.classList.toggle('is-active', i === index);
      el.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    showcaseFrames.forEach((frame, i) => {
      frame.classList.toggle('is-active', i === index);
    });
    runProgress(index);
    if (resetTimer) restartAutoplay();
  };

  function restartAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      setActive((currentIndex + 1) % showcaseItems.length, { resetTimer: false });
    }, AUTOPLAY_MS);
  }

  function pauseAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    const bar = showcaseItems[currentIndex]?.querySelector('.showcase-progress-bar');
    if (bar) {
      bar.style.width = getComputedStyle(bar).width;
      bar.style.transition = 'none';
    }
  }

  function resumeAutoplay() {
    if (autoplayInterval) return;
    runProgress(currentIndex);
    restartAutoplay();
  }

  showcaseItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.showcase-tag')) return;
      setActive(index);
    });
    item.addEventListener('keydown', (e) => {
      if (e.target !== item) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setActive(index);
      }
    });
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (showcaseItems.length && !prefersReducedMotion) {
    runProgress(0);
    restartAutoplay();
    showcaseEl?.addEventListener('mouseenter', pauseAutoplay);
    showcaseEl?.addEventListener('mouseleave', resumeAutoplay);
  }

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
