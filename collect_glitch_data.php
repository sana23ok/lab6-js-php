<?php
$data = json_decode(file_get_contents('php://input'), true);

if (!empty($data) && isset($data['objects'])) {
    $jsonFilePath = 'collected_glitch_data.json'; // Change the file name if needed
    file_put_contents($jsonFilePath, json_encode($data['objects'], JSON_PRETTY_PRINT));
    echo "Glitch data received and saved in JSON file.";
} else {
    echo "No glitch data received.";
}
?>

<?php
//// Отримання JSON з POST-запиту
//$json = file_get_contents('php://input');
//
//// Збереження JSON в файл
//file_put_contents('glitchObject.json', $json);
//?>
