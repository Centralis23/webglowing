(() => {
  'use strict';

  /* ---------- Portfolio 3D carousel ---------- */
  const carouselStage = document.querySelector('.carousel-stage');
  const carousel3d = document.getElementById('portfolioCarousel');
  const carouselNameEl = document.getElementById('carouselName');
  const carouselLinkEl = document.getElementById('carouselLink');

  if (carousel3d && carouselStage) {
    const projects = [
      { name: 'Centralis Business Group', url: 'https://centralisbusinessgroup.com' },
      { name: 'Sehene', url: 'https://www.emma-d.webdesignies.fr' },
      { name: 'Univers des sœurs', url: 'https://www.universdessoeurs.fr/' },
      { name: 'Une Oummy qui bricole', url: null },
    ];
    const ROTATE_DEG_PER_SEC = 9;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let angle = 0;
    let lastTime = null;
    let paused = false;
    let lastIndex = -1;

    const updateCaption = () => {
      const index = (((Math.round(-angle / 90) % 4) + 4) % 4);
      if (index === lastIndex) return;
      lastIndex = index;
      const project = projects[index];
      carouselNameEl.textContent = project.name;
      if (project.url) {
        carouselLinkEl.innerHTML = 'Voir le site <span>→</span>';
        carouselLinkEl.style.cursor = 'pointer';
        carouselLinkEl.onclick = () => window.open(project.url, '_blank', 'noopener');
      } else {
        carouselLinkEl.textContent = 'Bientôt en ligne';
        carouselLinkEl.style.cursor = 'default';
        carouselLinkEl.onclick = null;
      }
    };
    updateCaption();

    if (!prefersReducedMotion) {
      const tick = (now) => {
        if (lastTime === null) lastTime = now;
        const dt = (now - lastTime) / 1000;
        lastTime = now;
        if (!paused) {
          angle -= ROTATE_DEG_PER_SEC * dt;
          carousel3d.style.transform = `rotateY(${angle}deg)`;
          updateCaption();
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      carouselStage.addEventListener('mouseenter', () => { paused = true; });
      carouselStage.addEventListener('mouseleave', () => { paused = false; });
    }
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll(
    '.service-card, .portfolio-card, .testimonial, .process-step, .section-title, .section-eyebrow, .about-text, .about-visual'
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
