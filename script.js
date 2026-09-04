(() => {
  'use strict';

  /* ---------- Portfolio showcase ---------- */
  const showcaseEl = document.querySelector('.showcase');
  const showcaseStage = document.querySelector('.showcase-stage');
  const showcaseNavItems = document.querySelectorAll('.showcase-navitem');
  const showcaseFrames = document.querySelectorAll('.showcase-frame');
  const captionEl = document.querySelector('.showcase-caption');
  const captionNameEl = document.querySelector('.showcase-caption-name');
  const captionDescEl = document.querySelector('.showcase-caption-desc');
  const captionLinkEl = document.querySelector('.showcase-caption-link');
  const prevBtn = document.querySelector('.showcase-arrow-prev');
  const nextBtn = document.querySelector('.showcase-arrow-next');
  const cursorEl = document.querySelector('.showcase-cursor');
  const AUTOPLAY_MS = 6000;
  let currentIndex = 0;
  let autoplayInterval = null;

  const runProgress = (activeIndex) => {
    showcaseNavItems.forEach((el) => {
      const bar = el.querySelector('.showcase-progress-bar');
      if (!bar) return;
      bar.style.transition = 'none';
      bar.style.width = '0%';
    });
    const activeBar = showcaseNavItems[activeIndex]?.querySelector('.showcase-progress-bar');
    if (activeBar) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activeBar.style.transition = `width ${AUTOPLAY_MS}ms linear`;
          activeBar.style.width = '100%';
        });
      });
    }
  };

  const updateCaption = (index) => {
    const item = showcaseNavItems[index];
    if (!item || !captionEl) return;
    captionEl.classList.remove('is-visible');
    void captionEl.offsetWidth;
    captionNameEl.textContent = item.dataset.name || '';
    captionDescEl.textContent = item.dataset.desc || '';
    if (item.dataset.url) {
      captionLinkEl.href = item.dataset.url;
      captionLinkEl.style.display = '';
    } else {
      captionLinkEl.style.display = 'none';
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => captionEl.classList.add('is-visible'));
    });
  };

  const setActive = (index, { resetTimer = true } = {}) => {
    currentIndex = index;
    showcaseNavItems.forEach((el, i) => {
      el.classList.toggle('is-active', i === index);
      el.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
    showcaseFrames.forEach((frame, i) => {
      frame.classList.toggle('is-active', i === index);
    });
    updateCaption(index);
    runProgress(index);
    if (resetTimer) restartAutoplay();
  };

  function restartAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      setActive((currentIndex + 1) % showcaseNavItems.length, { resetTimer: false });
    }, AUTOPLAY_MS);
  }

  function pauseAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
    const bar = showcaseNavItems[currentIndex]?.querySelector('.showcase-progress-bar');
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

  showcaseNavItems.forEach((item, index) => {
    item.addEventListener('click', () => setActive(index));
  });

  prevBtn?.addEventListener('click', () => {
    setActive((currentIndex - 1 + showcaseNavItems.length) % showcaseNavItems.length);
  });
  nextBtn?.addEventListener('click', () => {
    setActive((currentIndex + 1) % showcaseNavItems.length);
  });

  showcaseStage?.addEventListener('click', (e) => {
    if (e.target.closest('.showcase-arrow')) return;
    const url = showcaseNavItems[currentIndex]?.dataset.url;
    if (url) window.open(url, '_blank', 'noopener');
  });

  const supportsHoverCursor = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (supportsHoverCursor && showcaseStage && cursorEl) {
    showcaseStage.addEventListener('mousemove', (e) => {
      const rect = showcaseStage.getBoundingClientRect();
      cursorEl.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px) translate(-50%, -50%)`;
      const hasUrl = !!showcaseNavItems[currentIndex]?.dataset.url;
      cursorEl.classList.toggle('is-visible', hasUrl);
      showcaseStage.classList.toggle('has-link', hasUrl);
    });
    showcaseStage.addEventListener('mouseleave', () => {
      cursorEl.classList.remove('is-visible');
      showcaseStage.classList.remove('has-link');
    });
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (showcaseNavItems.length) {
    updateCaption(0);
    if (!prefersReducedMotion) {
      runProgress(0);
      restartAutoplay();
      showcaseEl?.addEventListener('mouseenter', pauseAutoplay);
      showcaseEl?.addEventListener('mouseleave', resumeAutoplay);
    }
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
