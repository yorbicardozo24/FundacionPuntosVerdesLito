-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2017 at 01:01 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `departamentos`
--

CREATE TABLE `departamentos` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `codigo` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `departamentos`
--

INSERT INTO `departamentos` (`id`, `nombre`, `codigo`) VALUES
(1, 'Antioquia', 5),
(2, 'Atlantico', 8),
(3, 'D. C. Santa Fe de Bogotá', 11),
(4, 'Bolivar', 13),
(5, 'Boyaca', 15),
(6, 'Caldas', 17),
(7, 'Caqueta', 18),
(8, 'Cauca', 19),
(9, 'Cesar', 20),
(10, 'Cordova', 23),
(11, 'Cundinamarca', 25),
(12, 'Choco', 27),
(13, 'Huila', 41),
(14, 'La Guajira', 44),
(15, 'Magdalena', 47),
(16, 'Meta', 50),
(17, 'Nariño', 52),
(18, 'Norte de Santander', 54),
(19, 'Quindio', 63),
(20, 'Risaralda', 66),
(21, 'Santander', 68),
(22, 'Sucre', 70),
(23, 'Tolima', 73),
(24, 'Valle', 76),
(25, 'Arauca', 81),
(26, 'Casanare', 85),
(27, 'Putumayo', 86),
(28, 'San Andres', 88),
(29, 'Amazonas', 91),
(30, 'Guainia', 94),
(31, 'Guaviare', 95),
(32, 'Vaupes', 97),
(33, 'Vichada', 99);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `departamentos`
--
ALTER TABLE `departamentos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `departamentos`
--
ALTER TABLE `departamentos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;