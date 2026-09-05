<?php
/**
 * Template Name: Page légale
 */
get_header();
?>

<main>
  <section class="legal-hero">
    <div class="container">
      <a href="<?php echo esc_url(home_url('/')); ?>" class="logo">WEB<span>GLOWING</span></a>
      <a href="<?php echo esc_url(home_url('/')); ?>" class="legal-back">← Retour à l'accueil</a>
      <h1><?php the_title(); ?></h1>
    </div>
  </section>

  <div class="container legal-content">
    <?php
    while (have_posts()) :
      the_post();
      the_content();
    endwhile;
    ?>
  </div>

<?php get_footer(); ?>
