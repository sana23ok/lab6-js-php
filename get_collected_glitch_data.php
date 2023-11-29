<?php
// Отримання JSON з POST-запиту
$json = file_get_contents('php://input');

// Збереження JSON в файл
file_put_contents('collected_glitch_data.json', $json);
?>