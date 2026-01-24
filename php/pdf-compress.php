<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['pdf'])) {
    $fileTmp = $_FILES['pdf']['tmp_name'];
    $fileName = $_FILES['pdf']['name'];

    // For now, just return the uploaded file (no compression yet)
    header("Content-Type: application/pdf");
    header("Content-Disposition: attachment; filename=compressed-" . $fileName);
    readfile($fileTmp);
    exit;
} else {
    echo "No PDF uploaded.";
}
?>
