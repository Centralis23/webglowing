<?php get_header(); ?>

<main id="top">

  <section class="hero">
    <div class="hero-inner">
      <h1>Studio création<br class="hero-linebreak"> site internet</h1>
      <p class="hero-lead">Votre marque mérite un site d'exception</p>
    </div>
  </section>

  <section id="portfolio" class="section portfolio">
    <div class="container">
      <p class="section-eyebrow">Nos derniers projets</p>
      <h2 class="section-title"><span class="title-write">Portfolio</span></h2>

      <div class="carousel-stage">
        <div class="carousel-3d" id="portfolioCarousel">
          <a class="carousel-card" data-i="0" href="https://centralisbusinessgroup.com" target="_blank" rel="noopener">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/centralis-card.jpg'); ?>" alt="Centralis Business Group" loading="lazy">
          </a>
          <a class="carousel-card" data-i="1" href="https://www.emma-d.webdesignies.fr" target="_blank" rel="noopener">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/sehene-card.jpg'); ?>" alt="Sehene" loading="lazy">
          </a>
          <a class="carousel-card" data-i="2" href="https://www.universdessoeurs.fr/" target="_blank" rel="noopener">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/soeurs-card.jpg'); ?>" alt="Univers des sœurs" loading="lazy">
          </a>
          <div class="carousel-card" data-i="3">
            <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/oummy-card.jpg'); ?>" alt="Une Oummy qui bricole" loading="lazy">
          </div>
        </div>
      </div>
      <div class="carousel-caption">
        <span class="carousel-caption-name" id="carouselName">Centralis Business Group</span>
        <span class="carousel-caption-link" id="carouselLink">Voir le site <span>→</span></span>
      </div>
    </div>
  </section>

  <section id="contact" class="section contact">
    <div class="container">
      <div class="contact-grid">
        <div class="contact-info">
          <p class="section-eyebrow">Contact</p>
          <h2 class="section-title">Parlons de votre projet</h2>
          <p class="contact-lead">Nous concevons des sites vitrine et des sites e-commerce sur mesure. Décrivez-nous votre besoin, nous revenons vers vous sous 24h ouvrées.</p>

          <ul class="contact-details">
            <li>
              <span class="contact-details-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M3 6.5 12 13l9-6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="3" y="5" width="18" height="14" rx="2.4" stroke="currentColor" stroke-width="1.4"/></svg>
              </span>
              <div>
                <span class="contact-details-label">Email</span>
                <a href="mailto:contact@webglowing.com">contact@webglowing.com</a>
              </div>
            </li>
          </ul>

          <div class="contact-badge">
            <span class="contact-badge-dot" aria-hidden="true"></span>
            Réponse sous 24h ouvrées
          </div>
        </div>

        <div class="contact-card">
          <form class="contact-form" id="contactForm" action="<?php echo esc_url(get_template_directory_uri() . '/contact-handler.php'); ?>" method="POST">
            <input type="text" name="website" class="form-honeypot" tabindex="-1" autocomplete="off" aria-hidden="true">
            <div class="form-row">
              <div class="form-field">
                <label for="name">Nom</label>
                <input type="text" id="name" name="name" required autocomplete="name" placeholder="Votre nom">
              </div>
              <div class="form-field">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required autocomplete="email" placeholder="vous@exemple.com">
              </div>
            </div>
            <div class="form-field">
              <label for="phone">Téléphone</label>
              <input type="tel" id="phone" name="phone" autocomplete="tel" placeholder="+33 6 00 00 00 00">
            </div>
            <div class="form-field">
              <label>Type de projet</label>
              <div class="pill-group" role="radiogroup" aria-label="Type de projet">
                <input type="radio" id="budget-vitrine" name="budget" value="Site vitrine" checked>
                <label for="budget-vitrine" class="pill-option">Site vitrine</label>
                <input type="radio" id="budget-ecommerce" name="budget" value="E-commerce">
                <label for="budget-ecommerce" class="pill-option">E-commerce</label>
                <input type="radio" id="budget-autre" name="budget" value="Autre">
                <label for="budget-autre" class="pill-option">Autre</label>
              </div>
            </div>
            <div class="form-field">
              <label for="message">Message</label>
              <textarea id="message" name="message" rows="4" required placeholder="Parlez-nous de votre projet..."></textarea>
            </div>
            <button type="submit" class="btn-hero btn-hero-block">
              <span>Envoyer ma demande</span>
              <span class="btn-hero-arrow">→</span>
            </button>
            <p class="form-note" id="formNote"></p>
          </form>
        </div>
      </div>
    </div>
  </section>

<?php get_footer(); ?>
