-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2024 at 08:44 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `groceries`
--

-- --------------------------------------------------------

--
-- Table structure for table `address_detail`
--

CREATE TABLE `address_detail` (
  `address_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `name` varchar(50) NOT NULL DEFAULT '',
  `phone` varchar(20) NOT NULL DEFAULT '',
  `address` varchar(200) NOT NULL DEFAULT '',
  `city` varchar(75) NOT NULL DEFAULT '',
  `state` varchar(75) NOT NULL DEFAULT '',
  `type_name` varchar(50) NOT NULL DEFAULT '',
  `postal_code` varchar(20) NOT NULL DEFAULT '',
  `is_default` int(1) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `address_detail`
--

INSERT INTO `address_detail` (`address_id`, `user_id`, `name`, `phone`, `address`, `city`, `state`, `type_name`, `postal_code`, `is_default`, `status`, `created_date`, `modify_date`) VALUES
(1, 0, 'abc', '789456123', '#sdagsdghas', 'saundatti', 'Karnataka', 'residence', '591126', 1, 1, '2024-02-01 20:50:44', '2024-02-01 20:50:44'),
(2, 1, 'abc', '789456123', '#sdagsdghas', 'saundatti', 'Karnataka', 'residence', '591126', 1, 1, '2024-02-01 20:51:48', '2024-02-01 20:51:48'),
(3, 1, 'abc', '789456123', '#sdagsdghas', 'saundatti', 'Karnataka', 'residence', '591126', 1, 1, '2024-02-01 20:52:18', '2024-02-01 20:52:18');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `device_token` varchar(150) NOT NULL DEFAULT '',
  `products` varchar(200) NOT NULL DEFAULT '',
  `total_price` double NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `device_token`, `products`, `total_price`, `status`, `created_date`, `modified_date`) VALUES
(8, 1, '', '15,16', 130, 1, '2024-02-01 14:08:56', '2024-02-01 14:20:07'),
(9, 2, '', '16,15', 200, 1, '2024-02-01 14:23:43', '2024-02-01 16:04:48');

-- --------------------------------------------------------

--
-- Table structure for table `cart_detail`
--

CREATE TABLE `cart_detail` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `qty` int(11) NOT NULL DEFAULT 1,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_detail`
--

INSERT INTO `cart_detail` (`id`, `cart_id`, `product_id`, `qty`, `status`, `created_date`, `modify_date`) VALUES
(1, 8, 15, 2, 1, '2024-02-01 14:20:07', '2024-02-01 14:20:07'),
(2, 8, 16, 1, 1, '2024-02-01 14:23:43', '2024-02-01 14:23:43'),
(3, 9, 16, 2, 1, '2024-02-01 14:23:49', '2024-02-01 14:23:49'),
(4, 9, 15, 1, 1, '2024-02-01 16:04:48', '2024-02-01 16:04:48');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `cart_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `address_id` int(11) NOT NULL DEFAULT 0,
  `total_price` double NOT NULL DEFAULT 0,
  `payment_status` int(1) NOT NULL DEFAULT 1 COMMENT '1: waiting,2: done',
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `cart_id`, `user_id`, `address_id`, `total_price`, `payment_status`, `status`, `created_date`, `modified_date`) VALUES
(12, 8, 8, 2, 200, 2, 1, '2024-02-02 09:13:01', '2024-02-02 09:13:01');

-- --------------------------------------------------------

--
-- Table structure for table `order_deatils`
--

CREATE TABLE `order_deatils` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL DEFAULT 0,
  `qty` int(11) NOT NULL DEFAULT 1,
  `status` int(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_deatils`
--

INSERT INTO `order_deatils` (`id`, `order_id`, `product_id`, `qty`, `status`, `created_date`, `modify_date`) VALUES
(5, 12, 15, 2, 1, '2024-02-02 09:13:01', '2024-02-02 09:13:01'),
(6, 12, 16, 1, 1, '2024-02-02 09:13:01', '2024-02-02 09:13:01');

-- --------------------------------------------------------

--
-- Table structure for table `product_details`
--

CREATE TABLE `product_details` (
  `product_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL DEFAULT '',
  `details` varchar(5000) NOT NULL,
  `unit` varchar(20) DEFAULT NULL,
  `price` double NOT NULL DEFAULT 0,
  `inventory` int(10) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1: active, 2: inactive',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modified_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_details`
--

INSERT INTO `product_details` (`product_id`, `name`, `details`, `unit`, `price`, `inventory`, `status`, `created_date`, `modified_date`) VALUES
(15, 'Rice Jeera', 'Jeera rice', '1 kg', 70, 5, 1, '2024-01-31 12:59:46', '2024-01-31 16:05:19'),
(16, 'Daal', 'Fresh Dal', '1 kg', 60, 4, 1, '2024-01-31 16:43:40', '2024-01-31 16:43:40');

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `user_id` int(11) NOT NULL,
  `username` varchar(75) NOT NULL DEFAULT '',
  `user_type` int(1) NOT NULL DEFAULT 1 COMMENT '1= user , 2 = admin',
  `name` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `mobile` varchar(15) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '',
  `auth_token` varchar(100) NOT NULL DEFAULT '',
  `dervice_token` varchar(150) NOT NULL DEFAULT '',
  `reset_code` varchar(6) NOT NULL DEFAULT '0000',
  `status` int(1) NOT NULL DEFAULT 1 COMMENT '1: active, 2 = Inactive',
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `modify_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`user_id`, `username`, `user_type`, `name`, `email`, `mobile`, `password`, `auth_token`, `dervice_token`, `reset_code`, `status`, `created_date`, `modify_date`) VALUES
(1, '', 1, 'Manoj', 'm@gmail.com', '', '$2b$08$puiya53cWgTNGJ8VgYaeEeDYoLumt9QVY0RNq6.1OskQ.7hCkjK8S', '', '', '0000', 1, '2024-01-30 15:14:04', '2024-01-30 15:14:04'),
(2, '', 2, 'Maddy', 'maddy@gmail.com', '', '$2b$08$OZN5eihZvSBRFBOWNvB.JOG0Mp7Y4JQCXWe0pmJ6/Y8lytnKc2WMe', '', '', '0000', 1, '2024-01-30 20:31:18', '2024-01-30 20:31:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address_detail`
--
ALTER TABLE `address_detail`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_detail`
--
ALTER TABLE `cart_detail`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `order_deatils`
--
ALTER TABLE `order_deatils`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_details`
--
ALTER TABLE `product_details`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address_detail`
--
ALTER TABLE `address_detail`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `cart_detail`
--
ALTER TABLE `cart_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `order_deatils`
--
ALTER TABLE `order_deatils`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_details`
--
ALTER TABLE `product_details`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
