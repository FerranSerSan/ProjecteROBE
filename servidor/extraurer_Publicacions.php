<?php
include "config.php";

header("Content-type: application/json");

if (!$connexioBD) {
    echo json_encode([
        "status" => "error"
    ]);
    die("Conexio fallida: " . mysqli_connect_error());
} else {
    $sql = "SELECT id_publicacio, contingut_publicacio, id_usuari, estat_publicacio  FROM publicacions";
    $result = mysqli_query($connexioBD, $sql);
    $publicacions = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            // guardar les publicacions
            $publicacions[] = $row;
        }
    }
    echo json_encode([
        "status" => "success",
        "rows" => count($publicacions),
        "publicacions" => $publicacions
    ]);
}
?>