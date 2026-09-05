<?php
/**
 * Web Glowing theme functions.
 */

if (!defined('ABSPATH')) {
    exit;
}

/* ---------- Theme setup ---------- */
function webglowing_setup() {
    add_theme_support('title-tag');
    add_theme_support('html5', ['comment-list', 'comment-form', 'search-form', 'gallery', 'caption']);
}
add_action('after_setup_theme', 'webglowing_setup');

/* ---------- Styles & scripts ---------- */
function webglowing_assets() {
    wp_enqueue_style(
        'webglowing-fonts',
        'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&family=Inter:wght@400;500;600&display=swap',
        [],
        null
    );
    wp_enqueue_style('webglowing-style', get_stylesheet_uri(), [], '1.0');
    wp_enqueue_script('webglowing-script', get_template_directory_uri() . '/assets/script.js', [], '1.0', true);
}
add_action('wp_enqueue_scripts', 'webglowing_assets');

/* ---------- Add "legal-page" body class on the legal page template ---------- */
function webglowing_body_classes($classes) {
    if (is_page_template('page-legal.php')) {
        $classes[] = 'legal-page';
    }
    return $classes;
}
add_filter('body_class', 'webglowing_body_classes');

/* ---------- Auto-create the legal pages on theme activation ---------- */
function webglowing_create_legal_pages() {
    $pages = [
        [
            'slug' => 'mentions-legales',
            'title' => 'Mentions légales',
            'content' => webglowing_mentions_legales_content(),
        ],
        [
            'slug' => 'politique-confidentialite',
            'title' => 'Politique de confidentialité',
            'content' => webglowing_politique_confidentialite_content(),
        ],
        [
            'slug' => 'conditions-generales-de-vente',
            'title' => 'Conditions générales de vente',
            'content' => webglowing_cgv_content(),
        ],
    ];

    foreach ($pages as $page) {
        if (get_page_by_path($page['slug'])) {
            continue;
        }
        wp_insert_post([
            'post_title' => $page['title'],
            'post_name' => $page['slug'],
            'post_content' => $page['content'],
            'post_status' => 'publish',
            'post_type' => 'page',
            'page_template' => 'page-legal.php',
        ]);
    }
}
add_action('after_switch_theme', 'webglowing_create_legal_pages');

function webglowing_mentions_legales_content() {
    return <<<'HTML'
<p>En application des dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, les présentes mentions légales ont pour objet d'informer les utilisateurs du site www.webglowing.com sur l'identité des différents intervenants dans le cadre de sa réalisation et de son exploitation.</p>

<h2>Web Glowing</h2>
<p>
  Micro-entreprise<br>
  Directeur de la publication : Farima Diarra<br>
  SIRET : [Votre numéro SIRET]<br>
  Création de sites internet<br>
  contact@webglowing.com<br>
  Pantin, 93500
</p>

<h2>Prestataire d'hébergement</h2>
<p>
  Le site est hébergé par : o2switch<br>
  Chemin des Pardiaux, 63000 Clermont-Ferrand<br>
  Numéro de téléphone : 04 44 44 60 40<br>
  Adresse e-mail : support@o2switch.fr<br>
  <a href="https://www.o2switch.fr" target="_blank" rel="noopener">www.o2switch.fr</a>
</p>

<h2>Propriété intellectuelle</h2>
<p>Tous les contenus présents sur ce site (textes, images, graphismes, logo, icônes, etc.) sont protégés par le droit de la propriété intellectuelle. Toute représentation, reproduction, modification ou exploitation totale ou partielle du site www.webglowing.com ou de son contenu, par quelque procédé que ce soit et sur quelque support que ce soit, sans l'autorisation préalable de l'éditeur est strictement interdite et constitue une contrefaçon pouvant engager la responsabilité civile et pénale de son auteur.</p>

<h2>Données personnelles</h2>
<p>Les informations collectées via les formulaires ou le chat présents sur ce site sont utilisées uniquement dans le cadre de la relation avec les utilisateurs (réponse aux demandes, contact, formulaire, etc.). Ces données ne sont ni vendues ni transmises à des tiers.</p>
HTML;
}

function webglowing_politique_confidentialite_content() {
    return <<<'HTML'
<p>La présente politique de confidentialité a pour objectif d'informer les utilisateurs du site sur la manière dont leurs données personnelles sont collectées, utilisées et protégées. Le respect de votre vie privée est une priorité. Nous nous engageons à traiter vos données personnelles dans le respect de la réglementation en vigueur, notamment le Règlement Général sur la Protection des Données (RGPD).</p>

<h2>1. Données collectées</h2>
<p>Nous pouvons collecter les données suivantes lorsque vous utilisez notre site :</p>
<ul>
  <li>Nom et prénom</li>
  <li>Adresse e-mail</li>
  <li>Numéro de téléphone (si renseigné)</li>
  <li>Toute information transmise via le formulaire de contact</li>
  <li>Données échangées via le chat en ligne</li>
  <li>Informations fournies lors de la prise de rendez-vous (via Calendly ou outil similaire)</li>
</ul>

<h2>2. Finalité de la collecte</h2>
<p>Les données collectées sont utilisées pour :</p>
<ul>
  <li>Répondre à vos demandes via le formulaire de contact</li>
  <li>Assurer le support client via le chat en ligne</li>
  <li>Gérer la prise de rendez-vous</li>
  <li>Améliorer nos services</li>
  <li>Assurer la sécurité du site</li>
</ul>

<h2>Base légale du traitement</h2>
<p>Les traitements de données personnelles effectués sur le site reposent sur les bases légales suivantes : le consentement, lorsque vous remplissez un formulaire, acceptez les cookies ou utilisez certains services du site ; et l'intérêt légitime, pour répondre à vos demandes, assurer le bon fonctionnement du site et améliorer nos services.</p>

<h2>3. Outils utilisés</h2>
<p>Nous utilisons des outils tiers susceptibles de collecter des données :</p>
<ul>
  <li>Formulaire de contact (Typeform ou équivalent)</li>
  <li>Chat en ligne (Tidio)</li>
  <li>Outil de prise de rendez-vous (Calendly)</li>
</ul>
<p>Ces services disposent de leurs propres politiques de confidentialité.</p>

<h2>4. Durée de conservation</h2>
<p>Les données sont conservées pendant une durée maximale de 3 ans à compter du dernier contact, sauf obligation légale contraire.</p>

<h2>5. Partage des données</h2>
<p>Vos données personnelles ne sont jamais vendues. Elles peuvent être partagées uniquement avec des prestataires techniques nécessaires au fonctionnement du site.</p>

<h2>6. Sécurité</h2>
<p>Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre toute perte, accès non autorisé ou divulgation.</p>

<h2>7. Vos droits</h2>
<p>Conformément au RGPD, vous disposez des droits suivants :</p>
<ul>
  <li>Droit d'accès</li>
  <li>Droit de rectification</li>
  <li>Droit de suppression</li>
  <li>Droit d'opposition</li>
  <li>Droit à la limitation du traitement</li>
</ul>
<p>Vous pouvez exercer ces droits en nous contactant à l'adresse suivante : contact@webglowing.com</p>

<h2>8. Cookies</h2>
<p>Le site peut utiliser des cookies pour améliorer l'expérience utilisateur et mesurer l'audience. Un bandeau de consentement est affiché lors de votre première visite.</p>

<h2>9. Modification de la politique</h2>
<p>Nous nous réservons le droit de modifier la présente politique à tout moment afin de garantir sa conformité avec le droit en vigueur.</p>

<h2>10. Contact</h2>
<p>Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter à : contact@webglowing.com</p>
HTML;
}

function webglowing_cgv_content() {
    return <<<'HTML'
<p>Les présentes Conditions Générales de Vente ont pour objet de définir les modalités et conditions dans lesquelles WEB GLOWING – Farima Diarra, ci-après dénommé « nous », propose ses services de création de sites internet. Toute commande implique l'acceptation pleine et entière des présentes CGV.</p>

<h2>1. Prestations proposées</h2>
<p>Nous proposons les services suivants :</p>
<ul>
  <li>Création de site internet vitrine</li>
  <li>Création de site internet e-commerce</li>
</ul>
<p>Les caractéristiques précises de chaque prestation sont définies au cas par cas via un devis.</p>

<h2>2. Commande</h2>
<p>La commande est considérée comme validée dès :</p>
<ul>
  <li>acceptation du devis par le client</li>
  <li>réception de l'acompte</li>
</ul>

<h2>3. Prix</h2>
<p>Les prix sont indiqués en euros et précisés dans le devis. Nous nous réservons le droit de modifier nos tarifs à tout moment. Toutefois, le prix appliqué est celui en vigueur au moment de la commande.</p>

<h2>4. Modalités de paiement</h2>
<p>Le paiement s'effectue comme suit :</p>
<ul>
  <li>50 % d'acompte à la commande</li>
  <li>50 % restants à la livraison</li>
</ul>
<p>La livraison du site est conditionnée au paiement intégral.</p>

<h2>5. Délais de réalisation</h2>
<p>Les délais de réalisation sont donnés à titre indicatif. Ils peuvent varier selon :</p>
<ul>
  <li>la complexité du projet</li>
  <li>la réactivité du client</li>
  <li>la transmission des contenus nécessaires</li>
</ul>
<p>Tout retard imputable au client ne saurait engager notre responsabilité.</p>

<h2>6. Modifications</h2>
<p>La prestation inclut 2 séries de modifications après présentation du projet. Toute modification supplémentaire fera l'objet d'une facturation complémentaire.</p>

<h2>7. Obligations du client</h2>
<p>Le client s'engage à :</p>
<ul>
  <li>fournir des informations exactes</li>
  <li>transmettre les contenus nécessaires dans les délais</li>
  <li>valider les étapes du projet</li>
</ul>
<p>Tout retard dans la transmission des éléments pourra entraîner un report du délai de livraison.</p>

<h2>8. Responsabilité</h2>
<p>Nous nous engageons à fournir nos services avec professionnalisme. Toutefois, notre responsabilité ne pourra être engagée en cas :</p>
<ul>
  <li>de mauvaise utilisation du site par le client</li>
  <li>de défaillance d'un service tiers (hébergeur, plugins, etc.)</li>
  <li>de perte de données indépendante de notre volonté</li>
</ul>

<h2>9. Propriété intellectuelle</h2>
<p>Le site reste notre propriété jusqu'au paiement intégral. Une fois le paiement effectué, les droits sont cédés au client, à l'exception des éléments tiers (thèmes, plugins, images sous licence, etc.).</p>

<h2>10. Droit de rétractation</h2>
<p>Conformément à la législation en vigueur, le client dispose d'un délai de 14 jours pour exercer son droit de rétractation. Toutefois, ce droit ne pourra être exercé si la prestation a commencé avec l'accord préalable du client avant la fin de ce délai.</p>

<h2>11. Résiliation</h2>
<p>En cas d'annulation du projet après son commencement :</p>
<ul>
  <li>l'acompte versé ne sera pas remboursé</li>
</ul>

<h2>12. Litiges</h2>
<p>Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera privilégiée avant toute action judiciaire.</p>

<h2>13. Contact</h2>
<p>Pour toute question, vous pouvez nous contacter à : contact@webglowing.com</p>
HTML;
}
