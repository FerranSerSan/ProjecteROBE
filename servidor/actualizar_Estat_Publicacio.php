<?php
include "config.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fgc = file_get_contents("php://input");
    $params = json_decode($fgc, true);

    $id = $params['id'];

    if (!$connexioBD) {
        header('Content-Type: application/json');
        echo json_encode(['status' => false, 'message' => "Ha fallat la conexio: " . mysqli_connect_error()]);
    } else {
        $sql = "UPDATE publicacions SET estat_publicacio = 'NoDisponible' WHERE id_publicacio = $id";

        if ($result = mysqli_query($connexioBD, $sql)) {
            echo json_encode(['status' => 'success', 'message' => "Publicacio ocultada correctament."]);
        } else {
            echo json_encode(['status' => 'error', 'message' => "Ha fallat el update: " . mysqli_error($connexioBD)]);
        }
    }
}
?>