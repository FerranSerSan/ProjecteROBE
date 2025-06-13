<?php
include "config.php";

header("Content-type: application/json");

if (!$connexioBD) {
    echo json_encode([
        "status" => "error",
    ]);
    exit();
}

$input = file_get_contents("php://input");
$params = json_decode($input, true);

$email = isset($params['email']) ? mysqli_real_escape_string($connexioBD, $params['email']) : '';
$password = isset($params['password']) ? mysqli_real_escape_string($connexioBD, $params['password']) : '';

$sql = "SELECT id_usuari, nom_usuari, correu_usuari, rol_usuari FROM usuaris WHERE correu_usuari = '$email' AND contrasenya_usuari = '$password'";
$result = mysqli_query($connexioBD, $sql);

if ($result && $row = mysqli_fetch_assoc($result)) {
    echo json_encode([
        "status" => "success",
        "usuari" => $row
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Usuario o contraseña incorrectos."
    ]);
}
?>