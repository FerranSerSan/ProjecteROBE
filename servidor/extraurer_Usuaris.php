<?php
include "config.php";

header("Content-type: application/json");

if (!$connexioBD) {
    echo json_encode([
        "status" => "error"
    ]);
    die("Conexio fallida: " . mysqli_connect_error());
} else {
    $sql = "SELECT id_usuari, nom_usuari, correu_usuari, rol_usuari  FROM usuaris";
    $result = mysqli_query($connexioBD, $sql);
    $usuaris = [];
    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            // guardar els usuaris
            $usuaris[] = $row;
        }
    }
    echo json_encode([
        "status" => "success",
        "rows" => count($usuaris),
        "usuaris" => $usuaris
    ]);
}
?>