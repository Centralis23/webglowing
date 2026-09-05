<?php
/**
 * Contact form handler for Web Glowing.
 * Receives the contact form submission and emails it to contact@webglowing.com.
 */

header('Content-Type: application/json; charset=utf-8');

$destination = 'contact@webglowing.com';
// Copie interne uniquement — jamais affichée sur le site.
$bcc = 'diarrafarima40@gmail.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

// Honeypot: real visitors never fill this hidden field in.
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$budget = trim($_POST['budget'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Merci de remplir tous les champs obligatoires.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit;
}

// Strip any newlines from header-bound values to prevent header injection.
$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);

$subject = 'Nouvelle demande de contact - Web Glowing';

$body = "Nouvelle demande via le formulaire de contact du site :\n\n";
$body .= "Nom : {$safeName}\n";
$body .= "Email : {$safeEmail}\n";
if ($phone !== '') {
    $body .= 'Téléphone : ' . str_replace(["\r", "\n"], ' ', $phone) . "\n";
}
if ($budget !== '') {
    $body .= 'Type de projet : ' . str_replace(["\r", "\n"], ' ', $budget) . "\n";
}
$body .= "\nMessage :\n{$message}\n";

$headers = "From: Web Glowing <no-reply@webglowing.com>\r\n";
$headers .= "Reply-To: {$safeName} <{$safeEmail}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "Bcc: {$bcc}\r\n";

$sent = mail($destination, $subject, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => "Une erreur est survenue, merci de réessayer ou de nous écrire directement à {$destination}.",
    ]);
}
