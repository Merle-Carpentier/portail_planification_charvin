-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : ven. 12 nov. 2021 à 12:16
-- Version du serveur : 10.4.21-MariaDB
-- Version de PHP : 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `planification_charvin`
--

-- --------------------------------------------------------

--
-- Structure de la table `Bookings`
--

CREATE TABLE `Bookings` (
  `id` int(11) NOT NULL,
  `startDateTime` datetime NOT NULL,
  `endDateTime` datetime NOT NULL,
  `name` varchar(255) NOT NULL,
  `classes` varchar(255) NOT NULL,
  `_id` varchar(255) NOT NULL,
  `wharehouseId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Bookings`
--

INSERT INTO `Bookings` (`id`, `startDateTime`, `endDateTime`, `name`, `classes`, `_id`, `wharehouseId`, `customerId`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, '2021-11-09 13:00:00', '2021-11-09 14:00:00', 'rdv entrepôt 1, 5 pal', 'color-o', '8d808af0-a113-6c71-3ebd-6b29ac130c48', 1, 2, 2, '2021-11-09 09:34:06', '2021-11-09 09:34:06'),
(2, '2021-11-10 07:00:00', '2021-11-10 07:30:00', 'commande 23, 10 pal', 'color-v', '4c469a35-f14e-c520-3353-65d27a83a95b', 1, 2, 2, '2021-11-09 09:34:59', '2021-11-09 09:34:59'),
(3, '2021-11-10 08:00:00', '2021-11-10 08:30:00', 'liv 89, 20 pal', 'color-o', '130df479-8d27-7e9b-ed53-d6aba98573a0', 1, 2, 2, '2021-11-09 09:35:15', '2021-11-09 09:35:15'),
(4, '2021-11-10 09:30:00', '2021-11-10 11:00:00', 'réservé charvin', 'color-b', '340117eb-37bb-01fa-f6f9-172508a82a2a', 1, 2, 2, '2021-11-09 09:35:34', '2021-11-09 09:35:34'),
(5, '2021-11-10 12:00:00', '2021-11-10 14:30:00', 'commandes 23+24+25+26, 56 pal', 'color-v', 'cb577344-cf24-2cef-0337-0c177968064f', 1, 2, 2, '2021-11-09 09:36:07', '2021-11-09 09:36:07'),
(6, '2021-11-13 07:00:00', '2021-11-13 16:00:00', 'week-end', 'color-b', 'fc6a0ade-e50b-abca-57a1-6d0d204f0707', 1, 2, 2, '2021-11-09 09:36:41', '2021-11-09 09:36:41'),
(7, '2021-11-14 07:00:00', '2021-11-14 16:00:00', 'week-end', 'color-b', 'cb593bf7-de05-36be-7d06-cb9e6e6655ce', 1, 2, 2, '2021-11-09 09:36:55', '2021-11-09 09:36:55'),
(8, '2021-11-12 08:30:00', '2021-11-12 09:00:00', 'commande 12, 2 pal', 'color-v', 'c6199540-d1d2-9268-712b-d3fd17561a27', 1, 2, 2, '2021-11-09 09:37:15', '2021-11-09 09:37:19'),
(9, '2021-11-12 11:00:00', '2021-11-12 11:30:00', 'liv 56, 8 pal', 'color-o', '6428c1ee-835a-96c7-312a-7d5b9139e6ef', 1, 2, 2, '2021-11-09 09:37:33', '2021-11-09 09:37:33'),
(11, '2021-11-15 08:00:00', '2021-11-15 08:30:00', 'liv 41, 13 pal', 'color-o', '5a94dc92-a5b0-b058-b607-cc69dcb0641e', 1, 2, 2, '2021-11-09 14:38:34', '2021-11-09 14:38:34'),
(12, '2021-11-15 10:30:00', '2021-11-15 11:00:00', 'commande 31, 28 pal', 'color-v', 'abcd6b4f-4c5e-70e9-f340-f19c42b9a5cd', 1, 2, 2, '2021-11-09 14:38:56', '2021-11-09 14:39:01'),
(13, '2021-11-16 09:00:00', '2021-11-16 09:30:00', 'commande 29, 33 pal', 'color-v', '3c18c3cb-b13a-eca7-f52a-ed222153fdd3', 1, 2, 2, '2021-11-09 14:40:22', '2021-11-09 14:40:22'),
(14, '2021-11-16 12:00:00', '2021-11-16 13:30:00', 'réservé charvin', 'color-b', 'b067ba76-ef5c-3ff9-6667-8ab854aff7e6', 1, 2, 2, '2021-11-09 14:40:40', '2021-11-09 14:40:40'),
(15, '2021-11-17 07:00:00', '2021-11-17 07:30:00', 'livraison 43, 15 pal', 'color-o', '19eabe69-77fe-4893-104d-6cc07c731f4a', 1, 2, 2, '2021-11-09 14:41:40', '2021-11-09 14:41:40'),
(16, '2021-11-23 07:30:00', '2021-11-23 11:30:00', 'réunion personnel', 'color-b', 'd531fc05-841f-8ad7-8a8a-86ad4f08db74', 1, 2, 2, '2021-11-09 14:42:02', '2021-11-09 14:42:02'),
(17, '2021-11-20 07:00:00', '2021-11-20 15:30:00', 'week-end', 'color-b', '4e021564-f801-8ba0-f06a-54d159887f6b', 1, 2, 2, '2021-11-09 14:42:25', '2021-11-09 14:42:25'),
(18, '2021-11-21 07:00:00', '2021-11-21 15:30:00', 'week-end', 'color-b', '2e214e4e-5c8a-27c5-5da9-e93b375fe81e', 1, 2, 2, '2021-11-09 14:42:45', '2021-11-09 14:42:45'),
(19, '2021-11-24 09:00:00', '2021-11-24 09:30:00', 'commande 27, 23 pal', 'color-v', 'e4defe6d-9d19-cc2b-7003-660aa10438a5', 1, 2, 2, '2021-11-09 14:43:08', '2021-11-09 14:43:08'),
(20, '2021-11-25 10:00:00', '2021-11-25 10:30:00', 'livraison 35, 9 pal', 'color-o', 'dfd7cfac-2e0d-39bf-1ff5-077829a5d72d', 1, 2, 2, '2021-11-09 14:44:07', '2021-11-09 14:44:07'),
(21, '2021-11-27 07:00:00', '2021-11-27 16:00:00', 'week-end', 'color-b', 'b0f5893f-26cf-a127-b1e1-6d5984ffe94c', 1, 2, 2, '2021-11-09 14:44:58', '2021-11-09 14:44:58'),
(22, '2021-11-28 07:00:00', '2021-11-28 15:30:00', 'week-end', 'color-b', '2d03e553-e9c1-4df7-85a6-ef9221165c5d', 1, 2, 2, '2021-11-09 14:45:12', '2021-11-09 14:45:12'),
(23, '2021-12-04 07:00:00', '2021-12-04 16:00:00', 'week-end', 'color-b', '126bde35-d9fa-c0bf-3751-141a097cfc5d', 1, 2, 2, '2021-11-09 14:45:43', '2021-11-09 14:45:43'),
(24, '2021-12-05 07:00:00', '2021-12-05 15:30:00', 'week-end', 'color-b', 'f2c96571-0390-fc47-f2a1-17e9bd528182', 1, 2, 2, '2021-11-09 14:45:56', '2021-11-09 14:45:56'),
(25, '2021-11-27 07:00:00', '2021-11-27 16:00:00', 'week-end', 'color-b', '413e9503-b90b-6fe1-0e27-b3ec46b60e8e', 2, 4, 3, '2021-11-10 11:05:10', '2021-11-10 11:05:10'),
(26, '2021-11-28 07:00:00', '2021-11-28 16:00:00', 'week-end', 'color-b', '5f8447e5-1680-8a98-9062-5f65425b90d2', 2, 4, 3, '2021-11-10 11:05:31', '2021-11-10 11:05:31'),
(27, '2021-11-26 07:30:00', '2021-11-26 08:00:00', 'liv 25, 6 pal', 'color-o', '573d73f7-8e8a-037a-83f3-9436f2cfbb0e', 2, 4, 3, '2021-11-10 11:05:59', '2021-11-10 11:05:59'),
(30, '2021-11-18 08:00:00', '2021-11-18 08:30:00', 'blabla', 'color-v', '2ccb8bf8-6a0f-6699-543b-82fabb521788', 1, 2, 2, '2021-11-12 10:07:59', '2021-11-12 10:07:59');

-- --------------------------------------------------------

--
-- Structure de la table `Customers`
--

CREATE TABLE `Customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `rowsPerHour` int(11) NOT NULL,
  `wharehouseId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Customers`
--

INSERT INTO `Customers` (`id`, `name`, `address`, `zip`, `city`, `rowsPerHour`, `wharehouseId`, `createdAt`, `updatedAt`) VALUES
(2, 'client a', 'rue du a', '97752', 'citya', 2, 1, '2021-11-09 10:17:00', '2021-11-09 10:17:00'),
(3, 'client b', 'rue du b', '36751', 'cityb', 4, 1, '2021-11-09 10:17:00', '2021-11-09 10:17:00'),
(4, 'client c', 'rue du c', '68423', 'cityc', 1, 2, '2021-11-09 10:17:00', '2021-11-09 10:17:00');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `wharehouseId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`id`, `firstName`, `lastName`, `email`, `password`, `role`, `wharehouseId`, `customerId`, `createdAt`, `updatedAt`) VALUES
(2, 'admin', 'admin', 'admin@gmail.com', '$2b$10$UdyHbS7iVAJRFu4O18LiaujrcDZK51oBafOlRRMXly0kGPMlJxYk2', 'admin', 1, 2, '2021-11-09 09:25:19', '2021-11-09 09:25:19'),
(3, 'user', 'user', 'user@gmail.com', '$2b$10$EJiMRfQdcb67GHO7g/Wnk.V9/3D/jli2KHsHlvsbie/jbUpdy6N6.', 'user', 2, 4, '2021-11-09 09:26:11', '2021-11-09 09:26:11'),
(4, 'charvin', 'charvin', 'charvin@gmail.com', '$2b$10$yckhdaXb4uXATGef9iZVsum1ohiMjV7rqAwJjTwXwhRJdp5Q/8wTy', 'charvin', 1, 3, '2021-11-09 09:26:56', '2021-11-09 09:26:56');

-- --------------------------------------------------------

--
-- Structure de la table `Wharehouses`
--

CREATE TABLE `Wharehouses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Wharehouses`
--

INSERT INTO `Wharehouses` (`id`, `name`, `address`, `zip`, `city`, `createdAt`, `updatedAt`) VALUES
(1, 'entrepôt un', 'rue du premier', '11111', 'un', '2021-11-09 10:17:00', '2021-11-09 10:17:00'),
(2, 'entrepôt deux', 'rue du deuxième', '22222', 'deux', '2021-11-09 10:17:00', '2021-11-09 10:17:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Bookings`
--
ALTER TABLE `Bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `wharehouseId` (`wharehouseId`),
  ADD KEY `customerId` (`customerId`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `Customers`
--
ALTER TABLE `Customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Customers_name_unique` (`name`),
  ADD KEY `wharehouseId` (`wharehouseId`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Users_email_unique` (`email`),
  ADD KEY `wharehouseId` (`wharehouseId`),
  ADD KEY `customerId` (`customerId`);

--
-- Index pour la table `Wharehouses`
--
ALTER TABLE `Wharehouses`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Wharehouses_name_unique` (`name`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Bookings`
--
ALTER TABLE `Bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `Customers`
--
ALTER TABLE `Customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Wharehouses`
--
ALTER TABLE `Wharehouses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Bookings`
--
ALTER TABLE `Bookings`
  ADD CONSTRAINT `Bookings_ibfk_1` FOREIGN KEY (`wharehouseId`) REFERENCES `Wharehouses` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Bookings_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Bookings_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `Customers`
--
ALTER TABLE `Customers`
  ADD CONSTRAINT `Customers_ibfk_1` FOREIGN KEY (`wharehouseId`) REFERENCES `Wharehouses` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`wharehouseId`) REFERENCES `Wharehouses` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Users_ibfk_2` FOREIGN KEY (`customerId`) REFERENCES `Customers` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
