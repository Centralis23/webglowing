<?php
/**
 * Template Name: Page légale
 */
get_header();
?>

<main style="background:#ffffff !important;min-height:100vh;">
  <section class="legal-hero" style="background:#ffffff !important;">
    <div class="container">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">WEB<span>GLOWING</span></a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="legal-back">← Retour à l'accueil</a>
      <h1 style="color:#2e2b28 !important;"><?php the_title(); ?></h1>
    </div>
  </section>

  <div class="container legal-content" style="background:#ffffff !important;">
    <?php
    while (have_posts()) :
      the_post();
      the_content();
    endwhile;
    ?>
  </div>

<?php get_footer(); ?>
