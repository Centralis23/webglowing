</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-links">
      <?php
      $wg_legal_slugs = [
        'mentions-legales' => 'Mentions légales',
        'politique-confidentialite' => 'Politique de confidentialité',
        'conditions-generales-de-vente' => 'Conditions générales de vente',
      ];
      $wg_legal_links = [];
      foreach ($wg_legal_slugs as $wg_slug => $wg_label) {
        $wg_page = get_page_by_path($wg_slug);
        $wg_legal_links[] = $wg_page
          ? '<a href="' . esc_url(get_permalink($wg_page)) . '">' . esc_html($wg_label) . '</a>'
          : '<span>' . esc_html($wg_label) . '</span>';
      }
      echo implode('<span>|</span>', $wg_legal_links);
      ?>
    </div>
    <p class="footer-copy">© <?php echo esc_html(date('Y')); ?> WEBGLOWING – Tous droits réservés</p>
  </div>
  <div class="footer-wordmark" aria-hidden="true">WEBGLOWING</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
