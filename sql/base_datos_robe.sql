-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-06-2025 a las 14:00:04
-- Versión del servidor: 9.0.1
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `base_datos_robe`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacions`
--

DROP TABLE IF EXISTS `publicacions`;
CREATE TABLE IF NOT EXISTS `publicacions` (
  `id_publicacio` int NOT NULL AUTO_INCREMENT,
  `contingut_publicacio` text,
  `id_usuari` int DEFAULT NULL,
  `estat_publicacio` enum('Disponible','NoDisponible') DEFAULT NULL,
  PRIMARY KEY (`id_publicacio`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `publicacions`
--

INSERT INTO `publicacions` (`id_publicacio`, `contingut_publicacio`, `id_usuari`, `estat_publicacio`) VALUES
(1, '\"Pedrá\" es una única canción de más de 30 minutos, grabada con músicos de otras bandas como Platero y Tú. A pesar de las expectativas y controversias iniciales, con el tiempo se ha consolidado como una obra de culto del rock español.', 3, 'NoDisponible'),
(2, 'Robe Iniesta, el líder de Extremoduro, tenía la peculiar costumbre de escribir las letras de sus canciones en servilletas y trozos de papel que encontraba por ahí? Una de las historias más curiosas cuenta que la letra de \"Jesucristo García\", fue escrita en una noche de borrachera en un bar de Plasencia. Según dicen, Robe improvisó la letra mientras discutía con unos amigos sobre religión y la situación del mundo, plasmando en ese momento el espíritu irreverente y crítico que caracteriza a la canción.', 1, 'Disponible'),
(3, 'En 1990, Extremoduro apareció en el programa Plastic de TVE tocando \"Jesucristo García\", con Robe Iniesta luciendo una túnica y corona de espinas, mostrando su espíritu irreverente. La canción, un himno del grupo, nació en su primera maqueta, financiada vendiendo papeletas, reflejando su independencia y rebeldía desde el principio.', 1, 'Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuaris`
--

DROP TABLE IF EXISTS `usuaris`;
CREATE TABLE IF NOT EXISTS `usuaris` (
  `id_usuari` int NOT NULL AUTO_INCREMENT,
  `nom_usuari` varchar(50) DEFAULT NULL,
  `correu_usuari` varchar(50) DEFAULT NULL,
  `contrasenya_usuari` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `rol_usuari` enum('usuari','admin') DEFAULT NULL,
  PRIMARY KEY (`id_usuari`),
  UNIQUE KEY `correu_usuari` (`correu_usuari`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuaris`
--

INSERT INTO `usuaris` (`id_usuari`, `nom_usuari`, `correu_usuari`, `contrasenya_usuari`, `rol_usuari`) VALUES
(1, 'root', 'root@root.com', 'rootroot', 'admin'),
(3, 'ferran', 'ferran@gmail.com', '123123', 'usuari'),
(25, 'root2', 'root@root2.com', '123123', 'usuari');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
