<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<?php
if (is_front_page()) {
    $wg_description = "Web Glowing conçoit des sites web modernes, rapides et sur mesure pour les entreprises qui veulent briller en ligne.";
} elseif (is_page_template('page-legal.php')) {
    $wg_description = get_the_title() . ' du site Web Glowing.';
} else {
    $wg_description = get_bloginfo('description');
}
?>
<meta name="description" content="<?php echo esc_attr($wg_description); ?>">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%236a1f2b%22/><text x=%2250%22 y=%2266%22 font-size=%2255%22 fill=%22white%22 text-anchor=%22middle%22 font-family=%22serif%22>W</text></svg>">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php if (is_front_page()) : ?>
<div class="page-intro" id="pageIntro" aria-hidden="true">
  <div class="page-intro-panel page-intro-panel-left"></div>
  <div class="page-intro-panel page-intro-panel-right"></div>
  <div class="page-intro-logo">
    <img src="<?php echo esc_url(get_template_directory_uri() . '/assets/logo-intro.png'); ?>" alt="<?php bloginfo('name'); ?>">
  </div>
  <div class="page-intro-progress">
    <span class="page-intro-progress-bar"></span>
  </div>
</div>
<?php endif; ?>
