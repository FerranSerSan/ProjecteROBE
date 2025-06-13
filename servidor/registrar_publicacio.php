<?php
include "config.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fgc = file_get_contents("php://input");
    $params = json_decode($fgc, true);

    $contingut_publicacio = $params['contingut_publicacio'];
    $id_usuari = $params['id_usuari'];


    if (!$connexioBD) {
        header('Content-Type: application/json');
        echo json_encode(['status' => false, 'message' => "Ha fallat la conexio: " . mysqli_connect_error()]);
    } else {
        $sql = "INSERT INTO publicacions(contingut_publicacio, id_usuari, estat_publicacio ) VALUES('$contingut_publicacio', '$id_usuari', 'Disponible')";

        if ($result = mysqli_query($connexioBD, $sql)) {
            echo json_encode(['status' => 'success', 'message' => "Publicacio registrada correctament."]);
        } else {
            echo json_encode(['status' => 'error', 'message' => "Ha fallat la insercio: " . mysqli_error($connexioBD)]);
        }
    }
}
?>