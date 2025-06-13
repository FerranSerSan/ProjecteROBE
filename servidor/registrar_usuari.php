<?php
include "config.php";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fgc = file_get_contents("php://input");
    $params = json_decode($fgc, true);

    $nom = $params['nom'];
    $correu = $params['email'];
    $contrasenya = $params['password'];

    if (!$connexioBD) {
        header('Content-Type: application/json');
        echo json_encode(['status' => false, 'message' => "Ha fallat la conexio: " . mysqli_connect_error()]);
    } else {
        $sql = "INSERT INTO usuaris(nom_usuari, correu_usuari, contrasenya_usuari, rol_usuari ) VALUES('$nom', '$correu', '$contrasenya', 'usuari')";

        if ($result = mysqli_query($connexioBD, $sql)) {
            echo json_encode(['status' => 'success', 'message' => "Usuari registrat correctament."]);
        } else {
            
            if (mysqli_errno($connexioBD) == 1062) {
                echo json_encode(['status' => 'error', 'message' => "El correo ya está registrado."]);
            } else {
                echo json_encode(['status' => 'error', 'message' => "Ha fallat la insercio: " . mysqli_error($connexioBD)]);
            }
        }
    }
}
?>