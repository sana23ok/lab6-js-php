<?php
$dataToSave = json_decode(file_get_contents("php://input"), true);

// Add debug statement
error_log(print_r($dataToSave, true));

if (!empty($dataToSave)) {
    // Save the data to a file
    file_put_contents("data.json", json_encode($dataToSave));

    echo json_encode(['status' => 'success']);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'No data received']);
}
?>
