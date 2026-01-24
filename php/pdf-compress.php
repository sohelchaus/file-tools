<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdf'])) {
    $fileTmp = $_FILES['pdf']['tmp_name'];

    // Send file to external API
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://api.example.com/compress");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'file' => new CURLFile($fileTmp)
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    // Return compressed file to user
    header("Content-Type: application/pdf");
    header("Content-Disposition: attachment; filename=compressed.pdf");
    echo $response;
}
?>
