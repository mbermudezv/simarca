-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 17-05-2021 a las 21:08:19
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Comedor`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `estudianteExcel` ()  BEGIN	
    DECLARE nombre VARCHAR(100);
	DECLARE apellido1 VARCHAR(100);
	DECLARE apellido2 VARCHAR(100);
	DECLARE cedula VARCHAR(50);
	DECLARE seccion VARCHAR(50);
	DECLARE finished INTEGER DEFAULT 0;
    
    DEClARE curEstudiante_Excel 
        CURSOR FOR 
            SELECT Estudiante_Cedula,Estudiante_Nombre,Estudiante_Apellido1,
            Estudiante_Apellido2, Estudiante_Seccion FROM Estudiante_Excel;
	-- declare NOT FOUND handler
    DECLARE CONTINUE HANDLER 
        FOR NOT FOUND SET finished = 1; 
        
        OPEN curEstudiante_Excel;
        
        getEstudiante: LOOP
			FETCH curEstudiante_Excel INTO cedula ,nombre,
										   apellido1, apellido2, 
                                           seccion;
			IF finished = 1 THEN 
				LEAVE getEstudiante;
			END IF;
             
            IF NOT EXISTS (SELECT * FROM Estudiante WHERE Estudiante_Cedula = cedula) THEN				                  
                 INSERT INTO Estudiante (Estudiante_Cedula,Estudiante_Nombre,
										Estudiante_Apellido1, Estudiante_Apellido2, Estudiante_Seccion)
				  VALUES (cedula,nombre,apellido1,apellido2,seccion);                   
				ELSE               				                 
				  UPDATE Estudiante
				  SET Estudiante_Nombre = nombre,
					  Estudiante_Apellido1 = apellido1,
					  Estudiante_Apellido2 = apellido2,
				      Estudiante_Seccion = seccion
				  WHERE Estudiante_Cedula = cedula;				  
            END IF;       
        END LOOP getEstudiante;
			
		CLOSE curEstudiante_Excel;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Bitacora`
--

CREATE TABLE `Bitacora` (
  `Id` int(11) NOT NULL,
  `Evento` text COLLATE latin1_spanish_ci NOT NULL,
  `Fecha` text COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cliente`
--

CREATE TABLE `Cliente` (
  `Cliente_id` int(11) NOT NULL,
  `Cliente_Nombre` text COLLATE latin1_spanish_ci NOT NULL,
  `Cliente_Apellido1` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `Cliente_Apellido2` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `Cliente_Cedula` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `Cliente_Alias` text COLLATE latin1_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `Cliente`
--

INSERT INTO `Cliente` (`Cliente_id`, `Cliente_Nombre`, `Cliente_Apellido1`, `Cliente_Apellido2`, `Cliente_Cedula`, `Cliente_Alias`) VALUES
(127, 'CLARA ROSA', 'AGUILAR', 'JIMENEZ', '1-0480-0413', 'CLARA'),
(128, 'HEILYN VANESSA', 'ARAYA', 'CASTRO', '1-0767-0625', 'HEILYN'),
(129, 'DAILY SUSANA', 'ARAYA', 'NU???Z', '3-0357-0373', 'DAILY'),
(130, 'RONNY DE JESUS', 'BADILLA', 'LOPEZ', '1-0821-0206', 'RONNY'),
(131, 'JAVIER MAURICIO', 'BERMUDEZ', 'VARGAS', '1-0967-0579', 'MAURICIO'),
(132, 'HERALD ANTHONY', 'CASTRO', 'GAMBOA', '1-1329-0223', 'HERALD'),
(133, 'MERCEDES REBECA', 'CECILIANO', 'MOLINA', '1-1464-0470', 'REBECA'),
(134, 'JOAN JAVIER', 'CORDERO', 'REDONDO', '3-0452-0627', 'JOAN'),
(135, 'ANDREA', 'CRUZ', 'BADILLA', '1-1194-0288', 'ANDREA'),
(136, 'BELISARIO DE JESUS', 'CRUZ', 'NAVARRO', '1-0619-0387', 'BELISARIO'),
(137, 'GINA', 'ESPINOZA', 'CAMPOS', '6-0112-0739', 'GINA'),
(138, 'JEREMY ABRAHAM', 'FONSECA', 'PORRAS', '3-0446-0284', 'ABRAHAM'),
(139, 'ORLANDO DE JESUS', 'GAMBOA', 'ARIAS', '1-0647-0256', 'ORLANDO '),
(140, 'RANDALL MAURICIO', 'GARRO', 'BUSTAMANTE', '1-1092-0053', 'RANDALL'),
(141, 'ALVARO RODOLFO', 'GARRO', 'PADILLA', '1-0809-0143', 'ALVARO'),
(142, 'BRYAN FERNANDO', 'GONZALEZ', 'CHACON', '1-1185-0256', 'FERNANDO'),
(143, 'DANIA YESENIA', 'LEIVA', 'SOLIS', '1-1231-0516', 'DANIA'),
(144, 'HAZEL ELIZABETH', 'LOPEZ', 'NU?EZ', '1-1379-0921', 'HAZEL'),
(145, 'ANA PATRICIA', 'MONGE', 'MONTOYA', '1-1016-0875', 'ANA PATRICIA'),
(146, 'SARAY MARITZA', 'MONGE', 'ZU???GA', '1-1173-0743', 'MARITZA'),
(147, 'VICTOR JULIO', 'MORA', 'BOLA?OS', '2-0541-0004', 'JULIO'),
(148, 'LUIS GUILLERMO', 'MORA', 'GRANADOS', '1-1306-0863', 'GUILLERMO'),
(149, 'ELIZABETH', 'MURILLO', 'CASTRO', '1-1106-0836', 'ELIZABETH'),
(150, 'MARIA MADELEIN', 'MURILLO', 'NARANJO', '1-1320-0983', 'MADELEIN'),
(151, 'GABRIELA MERCEDES', 'NAVAS', 'FLORES', '1-1056-0774', 'GABRIELA'),
(152, 'LEDA PATRICIA', 'PICADO', 'NAVARRO', '1-0758-0128', 'LEDA'),
(153, 'ROXANA', 'PORRAS', 'BADILLA', '1-1687-0800', 'ROXANA'),
(154, 'ELIANGEL MIGUEL', 'PORTUGUEZ', 'VARGAS', '1-1146-0394', 'ELIANGEL'),
(155, 'EVA YADIRA', 'RAMIREZ', 'ARIAS', '1-1150-0748', 'EVA'),
(156, 'LUIS ANGEL', 'SALAZAR', 'VARGAS', '1-0514-0754', 'LUIS'),
(157, 'FULVIO DEL CARMEN', 'SIBAJA', 'GODINEZ', '1-0691-0179', 'FULVIO'),
(158, 'ANA CRISTINA', 'SOLIS', 'VENEGAS', '1-1099-0990', 'CRISTINA'),
(159, 'BAYRON YENERI', 'URE?A', 'VARGAS', '1-1526-0622', 'BAYRON'),
(160, 'BELLANIRA DEL ROSARIO', 'URE?A', 'VARGAS', '6-0165-0770', 'BELLANIRA'),
(161, 'ANGELICA MARIA', 'VALENCIANO', 'HERNANDEZ', '1-1402-0933', 'ANGELICA'),
(162, 'JUAN DIEGO', 'VENEGAS', 'MORA', '1-1153-0615', 'JUAN DIEGO'),
(163, 'YENDRY VANESSA', 'VENEGAS', 'MORA', '1-1108-0272', 'YENDRY'),
(164, 'MARIA LORENA', 'VINDAS', 'QUIROS', '1-1137-0967', 'LORENA'),
(165, 'RAQUEL MARIA', 'VINDAS', 'QUIROS', '1-0986-0464', 'RAQUEL'),
(166, 'ROLANDO JOSE', 'ZU?IGA', 'MENA', '1-1085-0687', 'ROLANDO'),
(167, 'Visitas', '', '', '', 'Visitas'),
(168, 'Estudiantes sin horario', '', '', '', 'Estudiantes sin horario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Cuenta`
--

CREATE TABLE `Cuenta` (
  `Cuenta_id` int(11) NOT NULL,
  `Cliente_id` int(11) NOT NULL,
  `Monto` decimal(10,0) DEFAULT NULL,
  `Observacion` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `Fecha` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `Pendiente` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `Cuenta`
--

INSERT INTO `Cuenta` (`Cuenta_id`, `Cliente_id`, `Monto`, `Observacion`, `Fecha`, `Pendiente`) VALUES
(1, 131, '500', NULL, '2019-06-19', 1),
(2, 168, '2', NULL, '2019-06-19', 1),
(3, 141, '800', NULL, '2020-03-16', 1),
(4, 141, '500', NULL, '2020-03-16', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiante`
--

CREATE TABLE `estudiante` (
  `estudiante_Id` int(11) NOT NULL,
  `estudiante_Nombre` text NOT NULL,
  `estudiante_PrimerApellido` text NOT NULL,
  `estudiante_SegundoApellido` text NOT NULL,
  `seccion_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estudiante`
--

INSERT INTO `estudiante` (`estudiante_Id`, `estudiante_Nombre`, `estudiante_PrimerApellido`, `estudiante_SegundoApellido`, `seccion_Id`) VALUES
(1, 'Mauricio', 'Bermùdez', 'Vargas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estudiante`
--

CREATE TABLE `Estudiante` (
  `Estudiante_Id` int(11) NOT NULL,
  `Estudiante_Nombre` text CHARACTER SET utf8 DEFAULT NULL,
  `Estudiante_Apellido1` text CHARACTER SET utf8 DEFAULT NULL,
  `Estudiante_Apellido2` text CHARACTER SET utf8 DEFAULT NULL,
  `Estudiante_Cedula` text CHARACTER SET utf8 DEFAULT NULL,
  `Estudiante_Seccion` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `seccion_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `Estudiante`
--

INSERT INTO `Estudiante` (`Estudiante_Id`, `Estudiante_Nombre`, `Estudiante_Apellido1`, `Estudiante_Apellido2`, `Estudiante_Cedula`, `Estudiante_Seccion`, `seccion_Id`) VALUES
(1, 'WESLEY JOSEPH', 'AZOFEIFA', 'MEJIA', '9-0121-0093', '10-1', 0),
(3, 'JIMENA MARIA', 'BERMUDEZ', 'BERMUDEZ', '1-1934-0285', '10-1', 0),
(5, 'DAGOBERTO TZVI', 'BERMUDEZ', 'CERDAS', '1-1928-0325', '10-1', 0),
(7, 'JEFFERSON JOSUE', 'CAMPOS', 'DUARTE', '1-1932-0050', '10-1', 0),
(9, 'JIMENA MARIA', 'CASCANTE', 'ARGUEDAS', '1-1950-0147', '10-1', 0),
(11, 'JASSY DOHELIA', 'CHAVARRIA', 'PORRAS', '1-1949-0884', '10-1', 0),
(13, 'DICSON ISAAC', 'ESQUIVEL', 'PADILLA', '1-1929-0688', '10-1', 0),
(15, 'CESAR ANDRES', 'FERNANDEZ', 'ZUÃ‘IGA', '1-1943-0150', '10-1', 0),
(17, 'ENOC ABDIEL', 'GARRO', 'VASQUEZ', '1-1939-0121', '10-1', 0),
(19, 'ERICK JOSAFAT', 'GRANADOS', 'FALLAS', '1-1933-0297', '10-1', 0),
(21, 'KEYLA DANETH', 'LOPEZ', 'NUÃ‘EZ', '1-1928-0713', '10-1', 0),
(23, 'EMILIANO', 'PORRAS', 'SANABRIA', '1-1920-0568', '10-1', 0),
(25, 'KEVIN ANDRES', 'SANABRIA', 'PIEDRA', '1-1924-0984', '10-1', 0),
(27, 'LIZBETH', 'SANTAMARIA', 'CESPEDES', '1-1928-0540', '10-1', 0),
(29, 'BRADLEY ARYELL', 'SEGURA', 'BORBON', '1-1944-0150', '10-1', 0),
(31, 'TAYRON STUAR', 'UREÑA', 'NARANJO', '1-1916-0558', '10-1', 0),
(33, 'JUSTIN GABRIEL', 'VARGAS', 'BADILLA', '1-1932-0229', '10-1', 0),
(333, 'SAMUEL FELIPE', 'ALVARADO', 'CAMBRONERO', '1-1894-0583', '11-1', 0),
(334, 'ALEXANDER', 'ARIAS', 'AZOFEIFA', '1-1893-0006', '11-1', 0),
(335, 'DARLYN YULIANA', 'ARLEY', 'SEGURA', '1-1890-0776', '11-1', 0),
(336, 'KATTIA SAMANTHA', 'BERMUDEZ', 'CALVO', '1-1910-0757', '11-1', 0),
(337, 'BYRON FABRICIO', 'BERMUDEZ', 'PADILLA', '1-1910-0146', '11-1', 0),
(338, 'KENDALL IVAN', 'CASTRO', 'FALLAS', '1-1836-0548', '11-1', 0),
(339, 'NICOLAS GUSTAVO', 'CECILIANO', 'MOLINA', '1-1909-0903', '11-1', 0),
(340, 'ANGELES VERONICA', 'CHACON', 'SANABRIA', '1-1913-0946', '11-1', 0),
(341, 'JADE MASSIEL', 'CHAVARRIA', 'PORRAS', '7-0307-0178', '11-1', 0),
(342, 'ALBERTH STIFF', 'FERNANDEZ', 'PORRAS', '1-1905-0463', '11-1', 0),
(343, 'ANTHONY ANDRES', 'GONZALEZ', 'FERNANDEZ', '1-1898-0454', '11-1', 0),
(344, 'KAROLAY DAHIANA', 'MENA', 'BARBOZA', '1-1896-0447', '11-1', 0),
(345, 'FRANKLIN JOCHUA', 'MENA', 'PEREZ', '9-0120-0500', '11-1', 0),
(346, 'MELANY JESENIA', 'MORA', 'RIVERA', '1-1814-0594', '11-1', 0),
(347, 'TATIANA MARIA', 'MORALES', 'ESTRADA', '1-1900-0734', '11-1', 0),
(348, 'KRISTEL NICOLE', 'NARANJO', 'PRADO', '1-1816-0646', '11-1', 0),
(349, 'STEPHANIE PAMELA', 'NARANJO', 'PRADO', '1-1816-0647', '11-1', 0),
(350, 'KEILYN MARISOL', 'NUÑEZ', 'PRADO', '1-1915-0804', '11-1', 0),
(351, 'PAMELA', 'PADILLA', 'MORA', '1-1907-0505', '11-1', 0),
(352, 'BRYAN', 'QUESADA', 'SOSA', '1-1904-0516', '11-1', 0),
(353, 'CARLOS ANDRES', 'QUESADA', 'SOSA', '1-1844-0928', '11-1', 0),
(354, 'YENDRY VANESSA', 'RIVERA', 'CHAVES', '1-1691-0836', '11-1', 0),
(355, 'DENNIS FABRICIO', 'RIVERA', 'CISNEROS', '1-1920-0516', '11-1', 0),
(356, 'DARIAN DE LOS ANGELES', 'RIVERA', 'RETANA', '1-1920-0659', '11-1', 0),
(357, 'ROMINA SHANTAL', 'TORRES', 'BRIONES', '1-1909-0320', '11-1', 0),
(358, 'CRISTHIAN ANDRES', 'ARIAS', 'AZOFEIFA', '1-1020-0758', '7-1', 1),
(359, 'GERALD DANIEL', 'AZOFEIFA', 'UREÑA ', '1-2039-0136', '7-1', 1),
(360, 'ALEXA FERNANDA', 'BARBOZA', 'MOLINA', '1-2037-0891', '7-1', 1),
(361, 'YEUDY DAMIAN', 'BERMÚDEZ', 'PADILLA', '1-2028-0943', '7-1', 1),
(362, 'SHARON ', 'CASTRO', 'GAMBOA', '1-2015-0218', '7-1', 1),
(363, 'BRANDON', 'CASTRO', 'MARIN', '3-0580-0399', '7-1', 1),
(364, 'GEYLAN KADMIEL', 'ESPINOZA', 'MORA', '7-0939-0465', '7-1', 1),
(365, 'KRISHNA JASEL', 'FENTON', 'MARTINEZ', '1-2031-0772', '7-1', 1),
(366, 'TIFFANI SOFIA', 'FERNANDEZ', 'HERRERA', '1-2015-0941', '7-1', 1),
(367, 'DEIBID YASIN', 'MENA', 'ELIZONDO', '1-2041-0574', '7-1', 1),
(368, 'MARÍA', 'MORA', 'SEGURA', '1-2010-0923', '7-1', 1),
(369, 'DENILSON FABIAN', 'MORALES', 'FERNANDEZ', '1-2017-0978', '7-1', 1),
(370, 'ASHLY  NAZARET', 'PADILLA', 'CHACON', '1-2028-0703', '7-1', 1),
(371, 'BRITHANY DANIELA', 'PORRAS', 'BARAHONA', '1-2030-0275', '7-1', 1),
(372, 'CELESTE', 'RIVERA', 'GAMBOA', '6-0513-0454', '7-1', 1),
(373, 'KRYSTEL', 'SOTO', 'CESPEDES', '12026-0612', '7-1', 1),
(374, 'MARIETH LUCIA', 'VALVERDE', 'MORALES', '1-2032-0546', '7-1', 1),
(375, 'ISAAC DAVID', 'VENEGAS ', 'MEZA', '1-2007-0643', '7-1', 1),
(376, 'ERICKA PAOLA', 'ARROYO', 'CASTRO', '2-0851-0246', '7-2', 0),
(377, 'FRANCINY', 'BARAHONA', 'BORBÓN', '1-2020-0124', '7-2', 0),
(378, 'ANDRY YANSEL', 'BORBÓN ', 'PORRAS', '1-2011-0043', '7-2', 0),
(379, 'BRITANY', 'BORBÓN ', 'ZÚÑIGA', '1-2001-0115', '7-2', 0),
(380, 'SEBASTIAN MAURICIO', 'BERMUDEZ', 'CHAVES', '1-2025-0552', '7-2', 0),
(381, 'ARELIS VALERIA', 'CABRERA', 'PRADO', '1-2017-0975', '7-2', 0),
(382, 'JULIAN MAURICIO', 'CERDAS', 'SEGURA', '1-2026-0606', '7-2', 0),
(383, 'SIANY JOHANNA', 'DUARTE', 'BARBOZA', '1-2020-0424', '7-2', 0),
(384, 'LORIANA', 'FALLAS', 'UREÑA', '1-2038-0416', '7-2', 0),
(385, 'TAMARA PRISCILA', 'FALLAS', 'MORA', '1-2030-0461', '7-2', 0),
(386, 'MAILYTH FRANCELA', 'LOPEZ', 'VARGAS', '1-2027-0729', '7-2', 0),
(387, 'SOLANGEE', 'MEZA', 'BORBÓN', '1-2020-0937', '7-2', 0),
(388, 'ROSA DEL CARMEN', 'QUESADA', 'FALLAS', '1-2036-0897', '7-2', 0),
(389, 'BRODY JAZIELL', 'SEGURA', 'BORBON', '1-2041-0255', '7-2', 0),
(390, 'NATALY SORAYA', 'SANDI', 'AZOFEIFA', '1-2039-0618', '7-2', 0),
(391, 'YERLIN VANESSA', 'GARRO', 'CHACÓN ', '1-2040-0495', '7-2', 0),
(392, 'ELIAN JOHAN', 'SANABRIA', 'PIEDRA', '1-2034-0966', '7-2', 0),
(393, 'EMILY DANIELA', 'UREÑA', 'ARAYA', '1-2019-0857', '7-2', 0),
(394, 'DEILYN IVANNIA', 'VALVERDE', 'FLORES', '1-2015-0203', '7-2', 0),
(395, 'MELANY', 'FLORES', 'MATA', '1-2034-0687', '7-2', 0),
(396, 'HABRAHAM RONEY', 'MORA', 'GODINEZ', '9-0123-0181', '7-2', 0),
(397, 'DERIAN ALONSO', 'AZOFEIFA', 'SANDI', '1-2007-0226', '8-1', 0),
(398, 'JEANS', 'BADILLA', 'GAMBOA', '1-1991-0919', '8-1', 0),
(399, 'JOSE ANDRES', 'BARBOZA', 'RODRIGUEZ', '6-0506-0249', '8-1', 0),
(400, 'DANIEL OMAR', 'BERMUDEZ', 'BERMUDEZ', '1-2006-0350', '8-1', 0),
(401, 'CHARLYN JIMENA', 'CAMPOS', 'HIDALGO', '1-1951-0388', '8-1', 0),
(402, 'ADRIAN', 'CASTRO', 'ESQUIVEL', '1-2004-0205', '8-1', 0),
(403, 'KRISTEL', 'CORDERO', 'BENAVIDES', '1-1992-0331', '8-1', 0),
(404, 'MARIANA LUCIA', 'CORDERO', 'UREÑA', '1-1812-0030', '8-1', 0),
(405, 'MARIA ELENA', 'ESPINOZA', 'RIVAS', '1-1993-0852', '8-1', 0),
(406, 'ADONIS JERMEY', 'ESPINOZA', 'MORA', '7-0330-0164', '8-1', 0),
(407, 'JOHAN ESTEBAN', 'ESQUIVEL', 'FERNANDEZ', '1-2007-0176', '8-1', 0),
(408, 'KERSYN', 'FAERRON', 'MESEN', '2-0892-0450', '8-1', 0),
(409, 'FROILAN EMMANUEL', 'FALLAS', 'QUIROS', '1-2005-0477', '8-1', 0),
(410, 'GLORIA JAZMIN', 'FLORES', 'BARBOZA', '1-2010-0373', '8-1', 0),
(411, 'ANTHONY JESUS', 'GODINEZ', 'AGUILAR', '1-1982-0692', '8-1', 0),
(412, 'NAIZET NAYERI', 'GRANADOS', 'FALLAS', '1-1983-0499', '8-1', 0),
(413, 'JOHANAN ADRIEL', 'JIMENEZ', 'BORBON', '1-2005-0496', '8-1', 0),
(414, 'MARIA LUCIA', 'JIMENEZ', 'QUESADA', '1-1983-0035', '8-1', 0),
(415, 'YEISON DANIEL', 'PEREIRA', 'GARBANZO', '1-2014-0016', '8-1', 0),
(416, 'SARAH ALEJANDRA', 'RIVERA', 'CECILIANO', '1-2003-0885', '8-1', 0),
(417, 'GABRIEL ALEJANDRO', 'ROJAS', 'ARGUEDAS', '3-0571-0032', '8-1', 0),
(418, 'KENDALL ALBERTO', 'SIBAJA', 'BONILLA', '1-2001-0567', '8-1', 0),
(419, 'DAYANA', 'VALVERDE', 'CAMPOS', '1-1998-0597', '8-1', 0),
(420, 'MELANY DE LOS ANGELES', 'VARGAS', 'BADILLA', '1-2003-0993', '8-1', 0),
(421, 'LUIS ADRIAN', 'VARGAS', 'CHAVES', '1-1968-0826', '8-1', 0),
(422, 'SAILYN PRISCILA', 'VARGAS', 'MEZA', '1-1998-0610', '8-1', 0),
(423, 'ITHAN ISAAC', 'VARGAS', 'MORA', '1-1995-0398', '8-1', 0),
(424, 'YULIANA', 'FONSECA', 'MORA', '1-1985-0648', '8-1', 0),
(425, 'ANDRES HUMBERTO', 'CASTRO', 'FERNANDEZ', '1-1991-0760', '8-1', 0),
(426, 'FABIOLA GRACIELA', 'CAMPOS ', 'MORERA', '1-2006-0219', '8-1', 0),
(427, 'ANAHI DILANA', 'NUÑEZ', 'PICADO', '1-1982-0724', '8-1', 0),
(428, 'IARA HERMIONE', 'ARIAS', 'VILLAREVIA', '9-0126-0503', '9-1', 0),
(429, 'FABRICIO', 'BADILLA', 'BUSTOS', '1-1966-0386', '9-1', 0),
(430, 'DIANA VALERIA', 'BADILLA', 'ZUÑIGA', '1-1973-0942', '9-1', 0),
(431, 'MELANY MARIA', 'BERMUDEZ', 'BERMUDEZ', '1-1934-0284', '9-1', 0),
(432, 'DANIEL STEVENS', 'CASTRO', 'MARIN', '1-1961-0925', '9-1', 0),
(433, 'MONSERRAT NOHEMY', 'CECILIANO', 'ALFARO', '1-1887-0163', '9-1', 0),
(434, 'DERECK ADONAY', 'CISNEROS', 'ARGUEDAS', '1-1968-0614', '9-1', 0),
(435, 'JOSE DANIEL', 'CORDERO', 'LEON', '1-1925-0573', '9-1', 0),
(436, 'ANDERSON FERNANDO', 'DELGADO', 'CALDERON', '1-1969-0704', '9-1', 0),
(437, 'HEZLLER', 'FAERRON', 'MESEN', '3-0563-0392', '9-1', 0),
(438, 'BRITANY PAMELA', 'FERNANDEZ', 'PORRAS', '1-1960-0690', '9-1', 0),
(439, 'EDUARDO JOSUE', 'GONZALEZ', 'FERNANDEZ', '1-1950-0802', '9-1', 0),
(440, 'ANTONY FABRICIO', 'MADRIGAL', 'BADILLA', '6-0499-0629', '9-1', 0),
(441, 'TAMARA MARÍA', 'MENA', 'ELIZONDO', '1-1964-0089', '9-1', 0),
(442, 'BRAINER RAFAEL', 'MORA', 'CASTILLO', '1-1969-0258', '9-1', 0),
(443, 'WILLIAM ANDRES', 'PEREIRA', 'GARBANZO', '1-1964-0216', '9-1', 0),
(444, 'JEREMY DARIEL', 'PIEDRA', 'VARGAS', '1-1939-0700', '9-1', 0),
(445, 'BRANDON JARED', 'RIVERA', 'BERMUDEZ', '1-1967-0155', '9-1', 0),
(446, 'MATIAS', 'VINDAS', 'CERDAS', '1-1978-0219', '9-1', 0),
(447, 'TATIANA BERNARDITA', 'JIMENEZ', 'MONGE', '1-1954-0893', '9-1', 0),
(448, 'VALERI MELISSA', 'AGUERO', 'MATA', '1-1957-0131', '9-2', 0),
(449, 'JIMENA CAMILA', 'ALVARADO', 'CAMBRONERO', '1-1957-0804', '9-2', 0),
(450, 'YOSEBET', 'AZOFEIFA', 'SANABRIA', '1-1964-0148', '9-2', 0),
(451, 'LUIS ANGEL', 'BERMUDEZ', 'CHAVES', '1-1977-0502', '9-2', 0),
(452, 'JOHANDY ANDREY', 'CASCO', 'BARBOZA', '1-1979-0501', '9-2', 0),
(453, 'MARIO JESUS', 'CORDERO', 'RIVERA', '1-1950-0164', '9-2', 0),
(454, 'SHIRLEY NATASHA', 'ESQUIVEL', 'FERNANDEZ', '1-1963-0574', '9-2', 0),
(455, 'GEOVANNY FABIAN', 'FONSECA', 'BADILLA', '1-1960-0469', '9-2', 0),
(456, 'JOSELYN FERNANDA', 'GARRO', 'CHACON', '1-1955-0044', '9-2', 0),
(457, 'KRISTEL DE LOS ANGELES', 'GARRO', 'RAMIREZ', '1-1958-0975', '9-2', 0),
(458, 'HIBANA NAHILEA', 'GODINEZ', 'VARGAS', '1-1951-0319', '9-2', 0),
(459, 'KEYLA DARIELA', 'HERRERA', 'PIEDRA', '1-1960-0719', '9-2', 0),
(460, 'ISAAC', 'LOPEZ', 'GODINEZ', '1-1975-0159', '9-2', 0),
(461, 'JUAN JOSE', 'MENA', 'BARBOZA', '1-1947-0609', '9-2', 0),
(462, 'MARCUS', 'PAUL', '.', '6-4597-0372', '9-2', 0),
(463, 'SOFIA VALENTINA', 'PICADO', 'ZUÑIGA', '1-1975-0889', '9-2', 0),
(464, 'SIANNY JUDITH', 'RIVERA', 'VARGAS', '1-1961-0685', '9-2', 0),
(465, 'DEILYN JIMENA', 'SANDI', 'ROMAN', '1-1971-0408', '9-2', 0),
(466, 'CHRISTHOFER ELIAS', 'VARGAS', 'AZOFEIFA', '1-1978-0466', '9-2', 0),
(467, 'EMILY GABRIELA', 'VARGAS', 'BRENES', '1-1974-0779', '9-2', 0),
(468, 'JOEL', 'ZUÑIGA', 'QUESADA', '1-1973-0384', '9-2', 0),
(469, 'YAUDETH SAYENKA', 'CASTRO', 'FERNANDEZ', '1-1945-0531', '9-2', 0),
(470, 'ADRIAN ENRIQUE', 'PRADO', 'CALVO', '1-1868-0888', '9-2', 0),
(471, 'CRISTHIAN JOSUE', 'UREÑA ', 'CORDERO', '1-1842-0385', '11-1', 0),
(472, 'CAROL DANIELA', 'VINDAS', 'CERDAS', '1-1917-0121', '11-1', 0),
(473, 'ARLYN REBECA', 'VINDAS', 'MATA', '1-1865-0255', '11-1', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Estudiante_Excel`
--

CREATE TABLE `Estudiante_Excel` (
  `Estudiante_Id` int(11) NOT NULL,
  `Estudiante_Cedula` text CHARACTER SET utf8 NOT NULL,
  `Estudiante_Nombre` text CHARACTER SET utf8 NOT NULL,
  `Estudiante_Apellido1` text CHARACTER SET utf8 NOT NULL,
  `Estudiante_Apellido2` text CHARACTER SET utf8 NOT NULL,
  `Estudiante_Seccion` text CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Marca`
--

CREATE TABLE `Marca` (
  `Marca_Id` int(11) NOT NULL,
  `Estudiante_Id` int(11) NOT NULL,
  `Marca_Fecha` date NOT NULL,
  `Marca_Tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `Marca`
--

INSERT INTO `Marca` (`Marca_Id`, `Estudiante_Id`, `Marca_Fecha`, `Marca_Tipo`) VALUES
(3, 368, '2021-02-16', 1),
(4, 365, '2021-02-16', 1),
(5, 363, '2021-02-16', 1),
(6, 360, '2021-02-16', 1),
(7, 374, '2021-02-16', 1),
(8, 361, '2021-02-16', 1),
(9, 386, '2021-02-16', 1),
(10, 390, '2021-02-16', 1),
(11, 391, '2021-02-16', 1),
(12, 377, '2021-02-16', 1),
(13, 382, '2021-02-16', 1),
(14, 378, '2021-02-16', 1),
(15, 383, '2021-02-16', 1),
(16, 387, '2021-02-16', 1),
(17, 389, '2021-02-16', 1),
(18, 13, '2021-02-16', 1),
(19, 3, '2021-02-16', 1),
(20, 7, '2021-02-16', 1),
(21, 19, '2021-02-16', 1),
(22, 15, '2021-02-16', 1),
(23, 27, '2021-02-16', 1),
(24, 9, '2021-02-16', 1),
(25, 440, '2021-02-16', 1),
(26, 446, '2021-02-16', 1),
(27, 442, '2021-02-16', 1),
(28, 432, '2021-02-16', 1),
(29, 434, '2021-02-16', 1),
(30, 341, '2021-02-16', 1),
(31, 334, '2021-02-16', 1),
(32, 349, '2021-02-16', 1),
(33, 350, '2021-02-16', 1),
(34, 356, '2021-02-16', 1),
(35, 441, '2021-02-16', 1),
(36, 428, '2021-02-16', 1),
(37, 444, '2021-02-16', 1),
(38, 347, '2021-02-16', 1),
(39, 339, '2021-02-16', 1),
(40, 468, '2021-02-16', 1),
(41, 449, '2021-02-16', 1),
(42, 466, '2021-02-16', 1),
(43, 448, '2021-02-16', 1),
(44, 452, '2021-02-16', 1),
(45, 467, '2021-02-16', 1),
(46, 453, '2021-02-16', 1),
(47, 466, '2021-02-17', 4),
(48, 355, '2021-02-17', 4),
(49, 393, '2021-02-17', 1),
(50, 378, '2021-02-17', 1),
(51, 382, '2021-02-17', 1),
(52, 391, '2021-02-17', 1),
(53, 383, '2021-02-17', 1),
(54, 389, '2021-02-17', 1),
(55, 377, '2021-02-17', 1),
(56, 386, '2021-02-17', 1),
(57, 387, '2021-02-17', 1),
(58, 390, '2021-02-17', 1),
(59, 372, '2021-02-17', 1),
(60, 365, '2021-02-17', 1),
(61, 360, '2021-02-17', 1),
(62, 368, '2021-02-17', 1),
(63, 374, '2021-02-17', 1),
(64, 371, '2021-02-17', 1),
(65, 363, '2021-02-17', 1),
(66, 361, '2021-02-17', 1),
(67, 15, '2021-02-17', 1),
(68, 27, '2021-02-17', 1),
(69, 3, '2021-02-17', 1),
(70, 13, '2021-02-17', 1),
(71, 19, '2021-02-17', 1),
(72, 7, '2021-02-17', 1),
(73, 337, '2021-02-17', 1),
(74, 336, '2021-02-17', 1),
(75, 351, '2021-02-17', 1),
(76, 353, '2021-02-17', 1),
(77, 355, '2021-02-17', 1),
(78, 352, '2021-02-17', 1),
(79, 342, '2021-02-17', 1),
(80, 333, '2021-02-17', 1),
(81, 440, '2021-02-17', 1),
(82, 444, '2021-02-17', 1),
(83, 446, '2021-02-17', 1),
(84, 432, '2021-02-17', 1),
(85, 442, '2021-02-17', 1),
(86, 434, '2021-02-17', 1),
(87, 428, '2021-02-17', 1),
(88, 441, '2021-02-17', 1),
(89, 435, '2021-02-17', 1),
(90, 449, '2021-02-17', 1),
(91, 448, '2021-02-17', 1),
(92, 450, '2021-02-17', 1),
(93, 466, '2021-02-17', 1),
(94, 468, '2021-02-17', 1),
(95, 452, '2021-02-17', 1),
(96, 453, '2021-02-17', 1),
(97, 3, '2021-04-12', 3),
(98, 473, '2021-04-21', 3),
(99, 469, '2021-04-21', 3),
(100, 469, '2021-04-22', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Menu`
--

CREATE TABLE `Menu` (
  `Menu_Descripcion` text COLLATE latin1_spanish_ci DEFAULT NULL,
  `Menu_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `Menu`
--

INSERT INTO `Menu` (`Menu_Descripcion`, `Menu_Id`) VALUES
('Almuerzo', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametros`
--

CREATE TABLE `parametros` (
  `institucion_Nombre` text CHARACTER SET utf8 NOT NULL,
  `director_Institucional` text CHARACTER SET utf8 NOT NULL,
  `coordinador_Comite` text CHARACTER SET utf8 NOT NULL,
  `comite_Nutricion` text CHARACTER SET utf8 NOT NULL,
  `parametros_Id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `parametros`
--

INSERT INTO `parametros` (`institucion_Nombre`, `director_Institucional`, `coordinador_Comite`, `comite_Nutricion`, `parametros_Id`) VALUES
('Liceo Las Esperanzas', 'MSc. Henry Navarro ZuÃ±iga', 'MSc. Raquel Vindas Quiros', 'Ana Patricia Monge Monge', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seccion`
--

CREATE TABLE `seccion` (
  `seccion_Id` int(11) NOT NULL,
  `seccion_Descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Secciones del Liceo';

--
-- Volcado de datos para la tabla `seccion`
--

INSERT INTO `seccion` (`seccion_Id`, `seccion_Descripcion`) VALUES
(1, '7-1 A'),
(2, '7-1 B');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoMarca`
--

CREATE TABLE `tipoMarca` (
  `tipoMarca_Id` int(11) NOT NULL,
  `tipoMarca_Descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tipoMarca`
--

INSERT INTO `tipoMarca` (`tipoMarca_Id`, `tipoMarca_Descripcion`) VALUES
(1, 'Transporte'),
(3, 'Almuerzo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Bitacora`
--
ALTER TABLE `Bitacora`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `Cliente`
--
ALTER TABLE `Cliente`
  ADD PRIMARY KEY (`Cliente_id`);

--
-- Indices de la tabla `Cuenta`
--
ALTER TABLE `Cuenta`
  ADD PRIMARY KEY (`Cuenta_id`);

--
-- Indices de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  ADD PRIMARY KEY (`estudiante_Id`),
  ADD KEY `nombreApellidos` (`estudiante_Nombre`(50),`estudiante_PrimerApellido`(50),`estudiante_SegundoApellido`(50));

--
-- Indices de la tabla `Estudiante`
--
ALTER TABLE `Estudiante`
  ADD PRIMARY KEY (`Estudiante_Id`),
  ADD UNIQUE KEY `cedula` (`Estudiante_Cedula`(50));

--
-- Indices de la tabla `Estudiante_Excel`
--
ALTER TABLE `Estudiante_Excel`
  ADD PRIMARY KEY (`Estudiante_Id`);

--
-- Indices de la tabla `Marca`
--
ALTER TABLE `Marca`
  ADD PRIMARY KEY (`Marca_Id`);

--
-- Indices de la tabla `Menu`
--
ALTER TABLE `Menu`
  ADD PRIMARY KEY (`Menu_Id`);

--
-- Indices de la tabla `parametros`
--
ALTER TABLE `parametros`
  ADD PRIMARY KEY (`parametros_Id`);

--
-- Indices de la tabla `seccion`
--
ALTER TABLE `seccion`
  ADD PRIMARY KEY (`seccion_Id`);

--
-- Indices de la tabla `tipoMarca`
--
ALTER TABLE `tipoMarca`
  ADD PRIMARY KEY (`tipoMarca_Id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Bitacora`
--
ALTER TABLE `Bitacora`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `Cliente`
--
ALTER TABLE `Cliente`
  MODIFY `Cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT de la tabla `Cuenta`
--
ALTER TABLE `Cuenta`
  MODIFY `Cuenta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estudiante`
--
ALTER TABLE `estudiante`
  MODIFY `estudiante_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `Estudiante`
--
ALTER TABLE `Estudiante`
  MODIFY `Estudiante_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=474;

--
-- AUTO_INCREMENT de la tabla `Estudiante_Excel`
--
ALTER TABLE `Estudiante_Excel`
  MODIFY `Estudiante_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=525;

--
-- AUTO_INCREMENT de la tabla `Marca`
--
ALTER TABLE `Marca`
  MODIFY `Marca_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `parametros`
--
ALTER TABLE `parametros`
  MODIFY `parametros_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `seccion`
--
ALTER TABLE `seccion`
  MODIFY `seccion_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipoMarca`
--
ALTER TABLE `tipoMarca`
  MODIFY `tipoMarca_Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
