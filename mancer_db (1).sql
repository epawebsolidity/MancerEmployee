-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 10:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mancer_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employe`
--

CREATE TABLE `employe` (
  `id_employe` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date_of_birth` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `id_users` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employe`
--

INSERT INTO `employe` (`id_employe`, `name`, `date_of_birth`, `position`, `id_users`) VALUES
(1, 'Eko Purnama Azi', '25 April 1998', 'Manager Community', 2),
(2, 'Daffa Maulana', '19 Agustus 1999', 'Marketing Mancer', 3),
(3, 'Gerrald Zainudin', '22 September 1996', 'AI Developer / AI Manager', 4),
(4, 'Denniya Alyaina', '07 Januari 1993', 'SmartContract Developer', 5),
(5, 'Median Prasetya', '17 Oktober 1996', 'Full Stack Developer', 6);

-- --------------------------------------------------------

--
-- Table structure for table `emp_salary`
--

CREATE TABLE `emp_salary` (
  `id_emp_salary` int(11) NOT NULL,
  `id_employe` int(11) NOT NULL,
  `salary` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `month` varchar(255) NOT NULL,
  `hash` varchar(100) NOT NULL,
  `streamId` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `emp_salary`
--

INSERT INTO `emp_salary` (`id_emp_salary`, `id_employe`, `salary`, `type`, `month`, `hash`, `streamId`) VALUES
(4, 1, '1', 'createAndDeposite', 'November', '0x90925d7470e12137d8049339e75717eef392cb39038edaa620846da24fed76ec', '38');

-- --------------------------------------------------------

--
-- Table structure for table `token`
--

CREATE TABLE `token` (
  `id_token` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `access_token` varchar(500) NOT NULL,
  `refresh_token` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `token`
--

INSERT INTO `token` (`id_token`, `id_users`, `access_token`, `refresh_token`) VALUES
(6, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlcGF3ZWIzanNAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzY0MDYxNDEwLCJleHAiOjE3NjQwNjE0NDB9.qbCAuzn28CKx2QcUwcYPPnEQzrhGouzYpFDVf_HVDD8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJlcGF3ZWIzanNAZ21haWwuY29tIiwicm9sZSI6IkFkbWluIiwiaWF0IjoxNzY0MDYxNDEwLCJleHAiOjE3NjQ2NjYyMTB9.IDJICC_XeeVULY5MfZSx4345KR0czrxF7HZYazbCzuk'),
(7, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJla29wYXNzMjVAZ21haWwuY29tIiwicm9sZSI6IlVzZXJzIiwiaWF0IjoxNzY0MDM4OTkwLCJleHAiOjE3NjQwMzkwMjB9.vnSZX0YZlEe5oc-eXqlG718mMWwsK9R4dX-kWuJUw48', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJla29wYXNzMjVAZ21haWwuY29tIiwicm9sZSI6IlVzZXJzIiwiaWF0IjoxNzY0MDM4OTkwLCJleHAiOjE3NjQ2NDM3OTB9.a2aynBFRJOeyFnpKsV8F2NUNsreh2Q6h-dWn2ucIbpA'),
(8, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkYWZmYUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlcnMiLCJpYXQiOjE3NjM0NTE3MjgsImV4cCI6MTc2MzQ1MTc1OH0.QRLelSl_BjRaYUR_EcEGvsSGWDL_D2t3M1ExbSi26LU', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJkYWZmYUBnbWFpbC5jb20iLCJyb2xlIjoiVXNlcnMiLCJpYXQiOjE3NjM0NTE3MjgsImV4cCI6MTc2NDA1NjUyOH0.Pru6aINTKIFSgUeiujxvcxol6qiPIN2JMzD2Tzynq_8');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `email`, `password`, `role`) VALUES
(1, 'epaweb3js@gmail.com', 'Beberapa123', 'Admin'),
(2, 'ekopass25@gmail.com', 'Beberapa123', 'Users'),
(3, 'daffa@gmail.com', 'Beberapa123', 'Users'),
(4, 'gerrarld@gmail.com', 'Beberapa123', 'Users'),
(5, 'denny@gmail.com', 'Beberapa123', 'Users'),
(6, 'median@gmail.com', 'Beberapa123', 'Users');

-- --------------------------------------------------------

--
-- Table structure for table `wallet_users`
--

CREATE TABLE `wallet_users` (
  `id_wallet` int(11) NOT NULL,
  `id_users` int(11) NOT NULL,
  `address_wallet` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `wallet_users`
--

INSERT INTO `wallet_users` (`id_wallet`, `id_users`, `address_wallet`) VALUES
(70, 3, '0xD6A25Ab63a3cc58468Dc27258FdCa6b723430Fb7'),
(78, 2, '0x8Df44cbEae7E9227DE84947d9C350b18A1b5a04b'),
(79, 1, '0x62B969EB63bE8E9c9622ca1E096675360F14859A'),
(80, 1, '0x62B969EB63bE8E9c9622ca1E096675360F14859A'),
(81, 1, '0x62B969EB63bE8E9c9622ca1E096675360F14859A'),
(82, 1, '0x62B969EB63bE8E9c9622ca1E096675360F14859A'),
(83, 1, '0x62B969EB63bE8E9c9622ca1E096675360F14859A'),
(84, 1, '0x62B969EB63bE8E9c9622ca1E096675360F14859A');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employe`
--
ALTER TABLE `employe`
  ADD PRIMARY KEY (`id_employe`);

--
-- Indexes for table `emp_salary`
--
ALTER TABLE `emp_salary`
  ADD PRIMARY KEY (`id_emp_salary`);

--
-- Indexes for table `token`
--
ALTER TABLE `token`
  ADD PRIMARY KEY (`id_token`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`);

--
-- Indexes for table `wallet_users`
--
ALTER TABLE `wallet_users`
  ADD PRIMARY KEY (`id_wallet`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employe`
--
ALTER TABLE `employe`
  MODIFY `id_employe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `emp_salary`
--
ALTER TABLE `emp_salary`
  MODIFY `id_emp_salary` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `token`
--
ALTER TABLE `token`
  MODIFY `id_token` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `wallet_users`
--
ALTER TABLE `wallet_users`
  MODIFY `id_wallet` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
