(() => {
  'use strict';

  /* ---------- Page intro (curtain reveal) ---------- */
  const pageIntro = document.getElementById('pageIntro');
  if (pageIntro && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo(0, 0);
    document.documentElement.classList.add('intro-lock');
    setTimeout(() => pageIntro.classList.add('is-ready'), 60);
    setTimeout(() => {
      window.scrollTo(0, 0);
      pageIntro.classList.add('is-leaving');
      document.documentElement.classList.remove('intro-lock');
    }, 1500);
    setTimeout(() => pageIntro.classList.add('is-done'), 2650);
  }

  /* ---------- Portfolio 3D coverflow ---------- */
  const carouselStage = document.querySelector('.carousel-stage');
  const carousel3d = document.getElementById('portfolioCarousel');
  const carouselCards = document.querySelectorAll('.carousel-card');
  const carouselNameEl = document.getElementById('carouselName');
  const carouselLinkEl = document.getElementById('carouselLink');

  if (carousel3d && carouselStage && carouselCards.length) {
    const projects = [
      { name: 'Centralis Business Group', url: 'https://centralisbusinessgroup.com' },
      { name: 'Sehene', url: 'https://www.emma-d.webdesignies.fr' },
      { name: 'Univers des sœurs', url: 'https://www.universdessoeurs.fr/' },
      { name: 'Une Oummy qui bricole', url: null },
    ];
    const total = carouselCards.length;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let activeIndex = 0;

    const shortestOffset = (index) => {
      let diff = index - activeIndex;
      diff = ((diff % total) + total) % total;
      if (diff > total / 2) diff -= total;
      return diff;
    };

    const getSpacing = () => {
      const w = window.innerWidth;
      if (w <= 640) return { x: 210, z: 150, rotate: 28 };
      if (w <= 960) return { x: 230, z: 190, rotate: 26 };
      return { x: 320, z: 260, rotate: 28 };
    };

    const layout = () => {
      const spacing = getSpacing();
      carouselCards.forEach((card) => {
        const i = Number(card.dataset.i);
        const offset = shortestOffset(i);
        const abs = Math.abs(offset);
        const x = offset * spacing.x;
        const z = -abs * spacing.z;
        const rotate = offset * -spacing.rotate;
        const scale = 1 - abs * 0.16;
        const opacity = abs > 1.4 ? 0 : 1 - abs * 0.25;
        card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotate}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(opacity, 0));
        card.style.zIndex = String(100 - abs);
        card.style.pointerEvents = abs > 1.4 ? 'none' : '';
      });
    };

    const updateCaption = () => {
      const project = projects[activeIndex];
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

    const goTo = (index) => {
      activeIndex = ((index % total) + total) % total;
      layout();
      updateCaption();
    };

    layout();
    updateCaption();
    window.addEventListener('resize', layout);

    if (!prefersReducedMotion) {
      setInterval(() => goTo(activeIndex + 1), 3200);
    }
  }

  /* ---------- Scroll reveal ---------- */
  const revealTargets = document.querySelectorAll('.section-title, .section-eyebrow');
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
