<?php
// Отримання JSON з POST-запиту
$savedData = json_decode(file_get_contents("data.json"), true);
echo json_encode($savedData);
?>

