<?php

// Connexió a la base de dades
$connexioBD = mysqli_connect("localhost", "root", "root", "base_datos_robe");

if (!$connexioBD) {
    die("Connexió fallida: " . mysqli_connect_error());
}