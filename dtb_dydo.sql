-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: dydo
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL,
  `item_name` varchar(60) DEFAULT NULL,
  `price` int DEFAULT NULL,
  `src` varchar(500) DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Đồ uống','Coca, Orange, Lavie, Sprite',15000,'https://lzd-img-global.slatic.net/g/p/ad9fb2bccbab52336987db16bf4e85be.jpg_320x320.jpg_550x550.jpg',1),(2,'Đồ uống','Bia Sài Gòn, 333',20000,'https://storage.googleapis.com/teko-gae.appspot.com/media/image/2023/10/16/4896d36e-280a-4008-9564-1b88e7e824a5/Thung-24-lon-Bia-333-330ml-Karavan.png',1),(3,'Đồ uống','Tiger bạc',25000,'https://product.hstatic.net/200000459373/product/8934777201204__1__62d46369d1824bc7aedcba0b9e4053dc_master.png',1),(4,'Đồ uống','Rượu nếp đục',60000,'https://nepcam.vn/wp-content/uploads/2021/10/ruou-nep-duc-va-nhung-cong-dung-dac-biet-voi-suc-khoe1.png',1),(5,'Đồ uống','Soju đào, soju nho',75000,'https://cdn.tgdd.vn/Products/Images/9498/237756/bhx/ruou-soju-korice-vi-dao-12-360ml-202104261738067420.jpg',1),(6,'Đồ uống','Rượu táo mèo, rượu mơ',70000,'https://bizweb.dktcdn.net/100/064/218/files/cac-loai-ruou-ngam-trai-cay-tphcm-1-ac746ad9-7eef-47de-93ac-ef3bb8e3bcc2.jpg?v=1702290633420',1),(7,'Đồ uống','Trà sâm dứa ',20000,'https://kombo.vn/medias/2022/10/tra-sam-dua-nha-dam.jpg',1),(8,'Đồ nướng than hoa','Bò DYDO đặc biệt',89000,'https://hotel84.com/hotel84-images/news/photo/bo-nuong-than-hoa-a-choen.jpg',1),(9,'Đồ nướng than hoa','Nầm tươi',70000,'https://cdn.tgdd.vn/Files/2021/08/06/1373478/nam-bo-nuong-la-gi-huong-dan-lam-mon-nam-nuong-ngon-tai-nha-202108061751429039.jpg',1),(10,'Đồ nướng than hoa','Lòng bò',65000,'https://mms.img.susercontent.com/vn-11134513-7r98o-lsvdp5aim2mc93@resize_ss1242x600!@crop_w1242_h600_cT',1),(11,'Đồ nướng than hoa','Má đào heo',60000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3GSDOhyZ9ERzZ9mtUIiOH3ySpPhcmoLkILA&s',1),(12,'Đồ nướng than hoa','U vai hoa bò ta',65000,'https://gofood.vn//upload/r/tong-hop-tin-tuc/tin-tuc-tong-hop/nuong-thit-tai-gia-cuc-ngon.jpg',1),(13,'Đồ nướng than hoa','Nọng heo giòn',60000,'https://cdn.tgdd.vn/Files/2023/12/03/1556562/cach-lam-nong-heo-nuong-bang-noi-chien-khong-dau-gion-thom-cuc-thich-202312032347511273.jpg',1),(14,'Đồ nướng than hoa','Ba chỉ heo',60000,'https://sanakyvietnam.net/wp-content/uploads/cach-lam-thit-ba-chi-nuong-sieu-ngon-ngay-tai-nha.jpg',1),(15,'Đồ nướng than hoa','Mực kim',75000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZrwo9y7sdZuWUqtI1bmdAHu1LX7P6yiWVaA&s',1),(16,'Đồ nướng than hoa','Tôm',75000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3wmofMA6FhctgFztj5DrH9EyU-qtyIOfjFw&s',1),(17,'Đồ nướng than hoa','Sườn sụn',60000,'https://s1.media.ngoisao.vn/news/2021/11/12/suon-sun-nuong-dfb-ngoisaovn-w1080-h648.jpg',1),(18,'Đồ nướng than hoa','Thịt dải',65000,'https://dogifood.vn/images/product/2207080342-thit-dai-nuong-2.png',1),(19,'Đồ nướng than hoa','Chân gà ',55000,'https://cdn.tgdd.vn/Files/2021/07/12/1367477/4-mon-chan-ga-nuong-ngon-chuan-vi-sieu-hap-dan-ca-nha-deu-me-202107121018206937.jpg',1),(20,'Đồ nướng than hoa','Bánh mỳ bơ',20000,'https://cdn.tgdd.vn/Files/2021/10/28/1394089/cach-lam-banh-mi-nuong-bo-duong-bang-chao-ngon-tuyet-de-lam-202110281143121205.jpg',1),(21,'Đồ nướng than hoa','Củ quả nướng',25000,'https://cdn.tgdd.vn/Files/2016/03/11/800448/cach-nuong-rau-cu-trong-lo-nuong-6-760x367.jpg',1),(22,'Đồ nướng than hoa','Đậu bắp nướng',30000,'https://monan.foodhub.vn/wp-content/uploads/2020/12/mon-chay-5.jpg',1),(23,'Đồ nướng than hoa','Kim Chi',25000,'https://cdn.tgdd.vn/Files/2019/12/22/1227977/8-cach-lam-kim-chi-han-quoc-thom-ngon-gion-cay-chuan-vi-202202211103238108.jpg',1),(24,'Lẩu Thái Tomyum','Nồi lẩu',160000,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnibcDpAh_4rOYUP63hdMA0ic_IVd2ljMhIw&s',1),(25,'Lẩu Thái Tomyum','Bắp bò ta',70000,'https://abby.vn/wp-content/uploads/2023/12/B7856-1643050752111.jpeg',1),(26,'Lẩu Thái Tomyum','Ba chỉ bò Mỹ',60000,'https://dochienxienque.com/wp-content/uploads/2021/02/ba-chi-bo-my.jpg',1),(27,'Lẩu Thái Tomyum','Tôm',75000,'https://i.ytimg.com/vi/YKXBZ6eHkwQ/maxresdefault.jpg',1),(28,'Lẩu Thái Tomyum','Mực kim',75000,'https://daubepgiadinh.vn/wp-content/uploads/2019/01/chon-muc-la.jpg',1),(29,'Lẩu Thái Tomyum','Đậu hũ phô mai',50000,'https://laungontainha.com/wp-content/uploads/2020/03/%C4%91%E1%BA%ADu-h%C5%A9-pm.png',1),(30,'Lẩu Thái Tomyum','Sườn sụn',55000,'https://www.cet.edu.vn/wp-content/uploads/2018/12/lau-suon-sun.jpg',1),(31,'Lẩu Thái Tomyum','Thanh cua',50000,'https://haisanhoanglong.com/wp-content/uploads/2019/11/Thanh-Cua-Nh%E1%BA%ADt1.jpg',1),(32,'Lẩu Thái Tomyum','Viên trứng cua, phô mai',60000,'https://cdn.shopify.com/s/files/1/0617/2497/files/ca-vien-nhan-trung-ca-pho-mai_480x480.jpg?v=1682149581',1),(33,'Lẩu Thái Tomyum','Ngao',20000,'https://chefdzung.com.vn/uploads/images/ngoc-linh/ngao-hap-thai.jpg',1),(34,'Lẩu Thái Tomyum','Váng đậu, đậu phụ, ngô',15000,'https://giadinh.mediacdn.vn/296230595582509056/2023/12/28/vang-dau-17037610821741643191032.jpg',1),(35,'Lẩu Thái Tomyum','Rau lẩu, nấm kim châm',20000,'https://tiki.vn/blog/wp-content/uploads/2023/10/ckcBNBsBxQKy9A2gCtIBFxf59PkC80uVoxE55ymb38ZaaecLzQu5-KPQ2f6vWJ5B6J51w5nMBrIlgOlZZuK7kEuljfUJKC2At21nd1mZkWVGKwvLNbZn9XTlG7Vjqi6Z5jQfpGaTTx6H4bPmTDrg6pk.png',1),(36,'Lẩu Thái Tomyum','Mì tôm',5000,'https://botoquanmoc.com/images/products/2023/09/22/original/382642923_926817262354976_1156467267760706581_n_1695365807.jpg',1);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_item`
--

DROP TABLE IF EXISTS `order_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_item` (
  `id` int NOT NULL AUTO_INCREMENT,
  `orders_id` int DEFAULT NULL,
  `centre_id` int DEFAULT NULL,
  `table_id` int DEFAULT NULL,
  `item_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `price_item` int DEFAULT '0',
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_item`
--

LOCK TABLES `order_item` WRITE;
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
INSERT INTO `order_item` VALUES (1,1,1,15,2,3,20000,1),(2,1,1,15,3,4,25000,1),(3,2,2,13,3,4,25000,1),(4,3,2,14,4,5,60000,1),(5,4,3,6,13,1,60000,1),(6,5,4,2,6,3,70000,1),(7,6,5,3,6,7,70000,1);
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `orders_id` int NOT NULL AUTO_INCREMENT,
  `centre_id` int DEFAULT NULL,
  `order_code` int DEFAULT '0',
  `table_id` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `date_order` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `total_cost` int DEFAULT '0',
  `status` varchar(45) DEFAULT 'PENDING',
  PRIMARY KEY (`orders_id`)
) ENGINE=InnoDB AUTO_INCREMENT=264 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,0,5,1,'2024-10-05 02:15:00',120000,'PAID'),(2,2,0,12,1,'2024-06-11 03:30:00',85000,'PENDING'),(3,3,0,22,1,'2024-06-12 04:45:00',230000,'PAID'),(4,4,0,18,1,'2024-06-13 05:00:00',175000,'PAID'),(5,5,0,25,1,'2024-06-14 06:20:00',300000,'PAID'),(6,1,0,7,1,'2024-06-15 07:35:00',95000,'PENDING'),(7,2,0,19,1,'2024-06-16 08:50:00',400000,'PAID'),(8,3,0,28,1,'2024-06-17 09:05:00',50000,'PAID'),(9,4,0,9,1,'2024-06-18 10:20:00',210000,'PAID'),(10,5,0,30,1,'2024-06-19 11:35:00',275000,'PENDING'),(11,1,0,10,1,'2024-06-20 12:50:00',130000,'PAID'),(12,2,0,4,1,'2024-06-21 13:05:00',60000,'PAID'),(13,3,0,15,1,'2024-06-22 14:20:00',180000,'PAID'),(14,4,0,20,1,'2024-06-23 15:35:00',220000,'PENDING'),(15,5,0,33,1,'2024-06-24 16:50:00',350000,'PAID'),(16,1,0,3,1,'2024-06-25 01:15:00',75000,'PAID'),(17,2,0,14,1,'2024-06-26 02:30:00',90000,'PENDING'),(18,3,0,27,1,'2024-06-27 03:45:00',160000,'PAID'),(19,4,0,12,1,'2024-06-28 04:00:00',140000,'PAID'),(20,5,0,31,1,'2024-06-29 05:15:00',310000,'PAID'),(21,1,0,8,1,'2024-06-30 06:30:00',100000,'PENDING'),(22,2,0,16,1,'2024-07-01 07:45:00',200000,'PAID'),(23,3,0,5,1,'2024-07-02 08:00:00',175000,'PAID'),(24,4,0,25,1,'2024-07-03 09:15:00',240000,'PAID'),(25,5,0,34,1,'2024-07-04 10:30:00',290000,'PENDING'),(26,1,0,2,1,'2024-07-05 11:45:00',110000,'PAID'),(27,2,0,9,1,'2024-07-06 12:00:00',85000,'PAID'),(28,3,0,18,1,'2024-07-07 13:15:00',190000,'PAID'),(29,4,0,7,1,'2024-07-08 14:30:00',125000,'PENDING'),(30,5,0,29,1,'2024-07-09 15:45:00',320000,'PAID'),(31,1,0,11,1,'2024-07-10 16:00:00',105000,'PAID'),(32,2,0,6,1,'2024-07-11 01:15:00',175000,'PAID'),(33,3,0,24,1,'2024-07-12 02:30:00',220000,'PENDING'),(34,4,0,19,1,'2024-07-13 03:45:00',185000,'PAID'),(35,5,0,32,1,'2024-07-14 05:00:00',340000,'PAID'),(36,1,0,4,1,'2024-07-15 06:15:00',95000,'PAID'),(37,2,0,17,1,'2024-07-16 07:30:00',130000,'PENDING'),(38,3,0,10,1,'2024-07-17 08:45:00',210000,'PAID'),(39,4,0,22,1,'2024-07-18 09:00:00',160000,'PAID'),(40,5,0,27,1,'2024-07-19 10:15:00',280000,'PAID'),(41,1,0,6,1,'2024-07-20 11:30:00',115000,'PENDING'),(42,2,0,20,1,'2024-07-21 12:45:00',195000,'PAID'),(43,3,0,3,1,'2024-07-22 13:00:00',170000,'PAID'),(44,4,0,14,1,'2023-07-23 14:15:00',200000,'PAID'),(45,5,0,35,1,'2024-07-24 15:30:00',310000,'PENDING'),(46,1,0,1,1,'2024-07-25 16:45:00',90000,'PAID'),(47,2,0,13,1,'2024-07-26 01:00:00',140000,'PAID'),(48,3,0,19,1,'2024-07-27 02:15:00',225000,'PAID'),(49,4,0,16,1,'2024-07-28 03:30:00',180000,'PENDING'),(50,5,0,21,1,'2024-07-29 04:45:00',260000,'PAID'),(51,1,0,9,1,'2024-07-30 06:00:00',100000,'PAID'),(52,2,0,5,1,'2024-07-31 07:15:00',175000,'PAID'),(53,3,0,26,1,'2024-08-01 08:30:00',190000,'PENDING'),(54,4,0,11,1,'2024-08-02 09:45:00',210000,'PAID'),(55,5,0,28,1,'2024-08-03 11:00:00',295000,'PAID'),(56,1,0,12,1,'2024-08-04 12:15:00',130000,'PAID'),(57,2,0,7,1,'2024-08-05 13:30:00',160000,'PENDING'),(58,3,0,8,1,'2024-08-06 14:45:00',205000,'PAID'),(59,4,0,17,1,'2024-08-07 16:00:00',185000,'PAID'),(60,5,0,24,1,'2024-08-08 01:15:00',310000,'PAID'),(61,1,0,14,1,'2024-08-09 02:30:00',105000,'PENDING'),(62,2,0,18,1,'2024-08-10 03:45:00',220000,'PAID'),(63,3,0,12,1,'2024-08-11 05:00:00',190000,'PAID'),(64,4,0,21,1,'2024-08-12 06:15:00',240000,'PAID'),(65,5,0,30,1,'2024-08-13 07:30:00',280000,'PENDING'),(66,1,0,16,1,'2024-08-14 08:45:00',115000,'PAID'),(67,2,0,10,1,'2024-08-15 10:00:00',175000,'PAID'),(68,3,0,4,1,'2024-08-16 11:15:00',210000,'PAID'),(69,4,0,23,1,'2024-08-17 12:30:00',200000,'PENDING'),(70,5,0,19,1,'2024-08-18 13:45:00',320000,'PAID'),(71,1,0,13,1,'2024-08-19 15:00:00',100000,'PAID'),(72,2,0,2,1,'2024-08-20 01:15:00',150000,'PAID'),(73,3,0,17,1,'2024-08-21 02:30:00',195000,'PENDING'),(74,4,0,10,1,'2024-08-22 03:45:00',225000,'PAID'),(75,5,0,26,1,'2024-08-23 05:00:00',305000,'PAID'),(76,1,0,19,1,'2024-08-24 06:15:00',130000,'PAID'),(77,2,0,1,1,'2024-08-25 07:30:00',165000,'PENDING'),(78,3,0,23,1,'2024-08-26 08:45:00',220000,'PAID'),(79,4,0,14,1,'2024-08-27 10:00:00',180000,'PAID'),(80,5,0,22,1,'2024-08-28 11:15:00',290000,'PAID'),(81,1,0,15,1,'2024-08-29 12:30:00',105000,'PENDING'),(82,2,0,19,1,'2024-08-30 13:45:00',200000,'PAID'),(83,3,0,6,1,'2024-08-31 15:00:00',185000,'PAID'),(84,4,0,18,1,'2024-09-01 01:15:00',240000,'PAID'),(85,5,0,29,1,'2024-09-02 02:30:00',315000,'PENDING'),(86,1,0,20,1,'2024-09-03 03:45:00',120000,'PAID'),(87,2,0,11,1,'2024-09-04 05:00:00',175000,'PAID'),(88,3,0,25,1,'2024-09-05 06:15:00',210000,'PAID'),(89,4,0,9,1,'2024-09-06 07:30:00',190000,'PENDING'),(90,5,0,33,1,'2024-09-07 08:45:00',305000,'PAID'),(91,1,0,17,1,'2024-09-08 10:00:00',95000,'PAID'),(92,2,0,3,1,'2024-09-09 11:15:00',160000,'PAID'),(93,3,0,14,1,'2024-09-10 12:30:00',225000,'PENDING'),(94,4,0,26,1,'2024-09-11 13:45:00',200000,'PAID'),(95,5,0,28,1,'2024-09-12 15:00:00',330000,'PAID'),(96,1,0,18,1,'2024-09-13 01:15:00',110000,'PAID'),(97,2,0,22,1,'2024-09-14 02:30:00',185000,'PENDING'),(98,3,0,9,1,'2024-09-15 03:45:00',195000,'PAID'),(99,4,0,20,1,'2024-09-16 05:00:00',220000,'PAID'),(100,5,0,31,1,'2024-09-17 06:15:00',275000,'PAID'),(101,1,0,21,1,'2024-09-18 07:30:00',105000,'PENDING'),(102,2,0,8,1,'2024-09-19 08:45:00',175000,'PAID'),(103,3,0,19,1,'2024-09-20 10:00:00',210000,'PAID'),(104,4,0,13,1,'2024-09-21 11:15:00',185000,'PAID'),(105,5,0,34,1,'2024-09-22 12:30:00',295000,'PENDING'),(106,1,0,23,1,'2024-09-23 13:45:00',120000,'PAID'),(107,2,0,4,1,'2024-09-24 15:00:00',200000,'PAID'),(108,3,0,7,1,'2024-09-25 01:15:00',180000,'PAID'),(109,4,0,24,1,'2024-09-26 02:30:00',240000,'PENDING'),(110,5,0,27,1,'2024-09-27 03:45:00',310000,'PAID'),(111,1,0,19,1,'2024-09-28 05:00:00',130000,'PAID'),(112,2,0,15,1,'2024-09-29 06:15:00',165000,'PAID'),(113,3,0,11,1,'2024-09-30 07:30:00',220000,'PENDING'),(114,4,0,5,1,'2024-10-01 08:45:00',200000,'PAID'),(115,5,0,35,1,'2024-10-02 10:00:00',300000,'PAID'),(116,1,0,16,1,'2024-10-03 11:15:00',115000,'PAID'),(117,2,0,10,1,'2024-10-04 12:30:00',175000,'PENDING'),(118,3,0,20,1,'2024-10-05 13:45:00',210000,'PAID'),(119,4,0,17,1,'2024-10-06 15:00:00',180000,'PAID'),(120,5,0,30,1,'2024-10-07 01:15:00',280000,'PAID'),(121,1,0,25,1,'2024-10-08 02:30:00',100000,'PENDING'),(122,2,0,19,1,'2024-10-09 03:45:00',200000,'PAID'),(123,3,0,6,1,'2024-10-10 05:00:00',185000,'PAID'),(124,4,0,18,1,'2024-10-11 06:15:00',240000,'PAID'),(125,5,0,29,1,'2024-10-12 07:30:00',315000,'PENDING'),(126,1,0,22,1,'2024-10-13 08:45:00',120000,'PAID'),(127,2,0,7,1,'2024-10-14 10:00:00',175000,'PAID'),(128,3,0,14,1,'2024-10-15 11:15:00',225000,'PAID'),(129,4,0,26,1,'2024-10-16 12:30:00',200000,'PENDING'),(130,5,0,28,1,'2024-10-17 13:45:00',330000,'PAID'),(131,1,0,18,1,'2024-10-18 15:00:00',110000,'PAID'),(132,2,0,22,1,'2024-10-19 01:15:00',185000,'PAID'),(133,3,0,9,1,'2024-10-20 02:30:00',195000,'PENDING'),(134,4,0,20,1,'2024-10-21 03:45:00',220000,'PAID'),(135,5,0,31,1,'2024-10-22 05:00:00',275000,'PAID'),(136,1,0,21,1,'2024-10-23 06:15:00',105000,'PAID'),(137,2,0,8,1,'2024-10-24 07:30:00',175000,'PENDING'),(138,3,0,19,1,'2024-10-25 08:45:00',210000,'PAID'),(139,4,0,13,1,'2024-10-26 10:00:00',185000,'PAID'),(140,5,0,34,1,'2024-10-27 11:15:00',295000,'PAID'),(141,1,0,23,1,'2024-10-28 12:30:00',120000,'PENDING'),(142,2,0,4,1,'2024-10-29 13:45:00',200000,'PAID'),(143,3,0,7,1,'2024-10-30 15:00:00',180000,'PAID'),(144,4,0,24,1,'2024-10-31 01:15:00',240000,'PAID'),(145,5,0,27,1,'2024-11-01 02:30:00',310000,'PENDING'),(146,1,0,19,1,'2024-11-02 03:45:00',130000,'PAID'),(147,2,0,15,1,'2024-11-03 05:00:00',165000,'PAID'),(148,3,0,11,1,'2024-11-04 06:15:00',220000,'PAID'),(149,4,0,5,1,'2024-11-05 07:30:00',200000,'PENDING'),(150,5,0,35,1,'2024-11-06 08:45:00',300000,'PAID'),(151,1,0,16,1,'2023-11-07 10:00:00',115000,'PAID'),(152,2,0,10,1,'2023-11-08 11:15:00',175000,'PAID'),(153,3,0,20,1,'2024-11-09 12:30:00',210000,'PENDING'),(154,4,0,17,1,'2024-11-10 13:45:00',180000,'PAID'),(155,5,0,30,1,'2024-11-11 15:00:00',280000,'PAID'),(156,1,0,25,1,'2024-11-12 01:15:00',100000,'PAID'),(157,2,0,19,1,'2023-11-13 02:30:00',200000,'PENDING'),(158,3,0,6,1,'2024-11-14 03:45:00',185000,'PAID'),(159,4,0,18,1,'2024-11-15 05:00:00',240000,'PAID'),(160,5,0,29,1,'2024-11-16 06:15:00',315000,'PAID'),(161,1,0,22,1,'2024-11-17 07:30:00',120000,'PENDING'),(162,2,0,7,1,'2024-12-12 08:45:00',175000,'PAID'),(163,3,0,14,1,'2024-11-19 10:00:00',225000,'PAID'),(164,4,0,26,1,'2024-11-20 11:15:00',200000,'PAID'),(165,5,0,28,1,'2024-11-21 12:30:00',330000,'PENDING'),(166,1,0,18,1,'2024-11-22 13:45:00',110000,'PAID'),(167,2,0,22,1,'2024-11-23 15:00:00',185000,'PAID'),(168,3,0,9,1,'2024-11-24 01:15:00',195000,'PAID'),(169,4,0,20,1,'2023-11-25 02:30:00',220000,'PENDING'),(170,5,0,31,1,'2024-11-26 03:45:00',275000,'PAID'),(171,1,0,21,1,'2024-11-27 05:00:00',105000,'PAID'),(172,2,0,8,1,'2024-11-28 06:15:00',175000,'PAID'),(173,3,0,19,1,'2023-11-29 07:30:00',210000,'PENDING'),(174,4,0,13,1,'2024-11-30 08:45:00',185000,'PAID'),(175,5,0,34,1,'2024-12-01 10:00:00',295000,'PAID'),(176,1,0,23,1,'2024-12-02 11:15:00',120000,'PAID'),(177,2,0,4,1,'2024-12-03 12:30:00',200000,'PENDING'),(178,3,0,7,1,'2024-12-04 13:45:00',180000,'PAID'),(179,4,0,24,1,'2024-12-05 15:00:00',240000,'PAID'),(180,5,0,27,1,'2024-12-06 01:15:00',310000,'PAID'),(181,1,0,19,1,'2024-12-07 02:30:00',130000,'PENDING'),(182,2,0,15,1,'2023-12-08 03:45:00',165000,'PAID'),(183,3,0,11,1,'2024-12-09 05:00:00',220000,'PAID'),(184,4,0,5,1,'2024-12-10 06:15:00',200000,'PAID'),(185,5,0,35,1,'2024-12-11 07:30:00',300000,'PENDING'),(186,1,0,16,1,'2024-12-12 08:45:00',115000,'PAID'),(187,2,0,10,1,'2024-12-13 10:00:00',175000,'PAID'),(188,3,0,20,1,'2024-12-14 11:15:00',210000,'PAID'),(189,4,0,17,1,'2024-12-15 12:30:00',180000,'PENDING'),(190,5,0,30,1,'2024-12-16 13:45:00',280000,'PAID'),(191,1,0,25,1,'2024-12-17 15:00:00',100000,'PAID'),(192,2,0,19,1,'2024-12-18 01:15:00',200000,'PAID'),(193,3,0,6,1,'2024-12-19 02:30:00',185000,'PENDING'),(194,4,0,18,1,'2024-12-20 03:45:00',240000,'PAID'),(195,5,0,29,1,'2024-12-21 05:00:00',315000,'PAID'),(196,1,0,22,1,'2024-12-22 06:15:00',120000,'PAID'),(197,2,0,7,1,'2024-12-23 07:30:00',175000,'PENDING'),(198,3,0,14,1,'2024-12-24 08:45:00',225000,'PAID'),(199,4,0,26,1,'2024-12-25 10:00:00',200000,'PAID'),(200,5,0,28,1,'2024-12-26 11:15:00',330000,'PAID'),(201,1,0,18,1,'2024-12-27 12:30:00',110000,'PENDING'),(202,2,0,22,1,'2024-12-28 13:45:00',185000,'PAID'),(203,3,0,9,1,'2024-12-29 15:00:00',195000,'PAID'),(204,4,0,20,1,'2024-12-30 01:15:00',220000,'PAID'),(205,5,0,31,1,'2024-12-31 02:30:00',275000,'PENDING'),(206,1,1,5,1,'2023-01-15 03:00:00',150000,'PAID'),(207,2,1,6,1,'2023-02-18 04:15:00',95000,'PENDING'),(208,3,1,7,1,'2023-03-22 05:30:00',200000,'PAID'),(209,4,1,8,1,'2023-04-05 02:45:00',300000,'PAID'),(210,5,1,9,1,'2023-05-12 06:00:00',120000,'PAID'),(211,1,2,10,1,'2023-06-01 07:15:00',80000,'PENDING'),(212,2,2,11,1,'2023-06-15 03:30:00',250000,'PAID'),(213,3,2,12,1,'2023-07-10 04:45:00',175000,'PAID'),(214,4,2,13,1,'2023-08-14 05:00:00',400000,'PAID'),(215,5,2,14,1,'2023-09-19 06:20:00',65000,'PENDING'),(216,1,3,15,1,'2023-10-05 03:10:00',300000,'PAID'),(217,2,3,16,1,'2023-11-25 02:50:00',180000,'PAID'),(218,3,3,17,1,'2023-12-30 01:30:00',225000,'PAID'),(219,4,4,18,1,'2022-01-02 04:00:00',175000,'PAID'),(220,5,4,19,1,'2022-02-12 05:30:00',290000,'PENDING'),(221,1,4,20,1,'2022-03-15 03:45:00',125000,'PAID'),(222,2,4,21,1,'2022-04-20 07:15:00',60000,'PAID'),(223,3,4,22,1,'2022-05-25 02:30:00',200000,'PENDING'),(224,4,5,23,1,'2022-06-05 03:15:00',350000,'PAID'),(225,5,5,24,1,'2022-07-14 05:00:00',75000,'PAID'),(226,1,5,25,1,'2022-08-18 04:45:00',210000,'PAID'),(227,2,5,26,1,'2022-09-09 06:00:00',190000,'PAID'),(228,3,5,27,1,'2022-10-11 03:30:00',80000,'PENDING'),(229,4,6,28,1,'2022-11-15 05:30:00',300000,'PAID'),(230,5,6,29,1,'2022-12-20 07:00:00',240000,'PAID'),(231,1,7,30,1,'2023-01-01 03:00:00',100000,'PAID'),(232,2,7,31,1,'2023-02-02 04:15:00',300000,'PAID'),(233,3,7,32,1,'2023-03-03 05:30:00',50000,'PENDING'),(234,4,8,33,1,'2023-04-04 02:45:00',275000,'PAID'),(235,5,8,34,1,'2023-05-05 06:00:00',210000,'PAID'),(236,1,8,35,1,'2023-06-06 07:15:00',180000,'PAID'),(237,2,8,36,1,'2023-07-07 03:30:00',100000,'PAID'),(238,3,8,37,1,'2023-08-08 04:45:00',135000,'PAID'),(239,4,9,38,1,'2023-09-09 05:00:00',240000,'PAID'),(240,5,9,39,1,'2023-10-10 06:20:00',80000,'PENDING'),(241,1,9,40,1,'2023-11-11 03:10:00',60000,'PAID'),(242,2,9,41,1,'2023-12-12 02:50:00',150000,'PAID'),(243,3,10,42,1,'2022-01-13 01:30:00',200000,'PAID'),(244,4,10,43,1,'2022-02-14 04:00:00',95000,'PENDING'),(245,5,10,44,1,'2022-03-15 05:30:00',175000,'PAID'),(246,1,11,45,1,'2022-04-16 03:45:00',200000,'PAID'),(247,2,11,46,1,'2022-05-17 07:15:00',110000,'PENDING'),(248,3,11,47,1,'2022-06-18 02:30:00',250000,'PAID'),(249,4,12,48,1,'2022-07-19 03:15:00',135000,'PAID'),(250,5,12,49,1,'2022-08-20 05:00:00',70000,'PAID'),(251,1,12,50,1,'2022-09-21 04:45:00',220000,'PAID'),(252,2,12,51,1,'2022-10-22 06:00:00',115000,'PENDING'),(253,3,12,52,1,'2022-11-23 03:30:00',60000,'PAID'),(254,4,13,53,1,'2022-12-24 05:30:00',250000,'PAID'),(255,5,13,54,1,'2023-01-25 07:00:00',130000,'PAID'),(256,1,13,55,1,'2023-02-26 03:00:00',300000,'PAID'),(257,2,13,56,1,'2023-03-27 04:15:00',200000,'PAID'),(258,3,13,57,1,'2023-04-28 05:30:00',80000,'PENDING'),(259,4,14,58,1,'2023-05-29 02:45:00',240000,'PAID'),(260,5,14,59,1,'2023-06-30 07:15:00',190000,'PAID'),(261,1,14,60,1,'2023-07-31 03:30:00',175000,'PAID'),(262,2,14,61,1,'2023-08-01 04:45:00',210000,'PAID'),(263,3,14,62,1,'2023-09-02 05:00:00',130000,'PAID');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_centre`
--

DROP TABLE IF EXISTS `restaurant_centre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant_centre` (
  `centre_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(47) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `area` varchar(30) DEFAULT NULL,
  `hotline` varchar(15) DEFAULT NULL,
  `opening_month` int DEFAULT NULL,
  `opening_year` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  `quantity_table` int DEFAULT NULL,
  PRIMARY KEY (`centre_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_centre`
--

LOCK TABLES `restaurant_centre` WRITE;
/*!40000 ALTER TABLE `restaurant_centre` DISABLE KEYS */;
INSERT INTO `restaurant_centre` VALUES (1,'DYDO Tây Hồ','86 Quảng Bá, Tây Hồ','Tây Hồ','0985793819',1,2015,0,20),(2,'DYDO Mỹ Đình','63C Nguyễn Hoàng, Mỹ Đình','Mỹ Đình','0356390023',5,2017,1,20),(3,'DYDO Ba Đình','281 Đội Cấn, Ba Đình','Ba Đình','0968189293',7,2019,1,30),(4,'DYDO Hai Bà Trưng','93 Võ Thị Sáu, Hai Bà Trưng','Hai Bà Trưng','0918121000',8,2021,1,30),(5,'DYDO Đống Đa','108 Chùa Láng, Đống Đa','Đống Đa','0979213332',3,2021,1,35);
/*!40000 ALTER TABLE `restaurant_centre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `centre_id` int DEFAULT NULL,
  `role` varchar(10) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `otp` varchar(6) DEFAULT NULL,
  `otp_expires` bigint DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,1,'staff','stafftayho1@gmail.com','$2b$10$N.hoZvOLQzstxms9P3ah5uqeMTJ34sFici4.ZQCaojOdIUZ5JVI2K',NULL,NULL),(2,1,'staff','stafftayho2@gmail.com','$2a$12$XU7uqxUDR9zrANwgAcEwB.p17HlGOv73./5Ctfpz6FuUOBOafTjKe',NULL,NULL),(3,1,'staff','stafftayho3@gmail.com','$2a$12$dG5cjB2SbIPCyI/FQ2pM3e7lD8qDVR6.dwoaMXnaE27AQZYTlLTla',NULL,NULL),(4,1,'staff','stafftayho4@gmail.com','$2a$12$Q.69ZuaBo/w3A9tKEqdhYek6DbXyaubPdTqvaIyHk3n5L8CKlaoYm',NULL,NULL),(5,1,'staff','stafftayho5@gmail.com','$2a$12$J53Q9DK36fPlGCRml/QYv.V0jGq3WjX//zc2L8tuDaZLz8Pf2ge2m',NULL,NULL),(6,1,'admin','admin1@gmail.com','$2a$12$kJqp0JQrnhwrFb6M5vDRMOqiDSklHeNl.SqmynfSM7ogZaz2sukne',NULL,NULL),(7,2,'staff','staffmydinh1@gmail.com','$2a$12$ltXgIQ6bCUFRSrmXstvQqu7bWbM5RSX2A8KPhpGnaeGTAszPRYv3m',NULL,NULL),(8,2,'staff','staffmydinh2@gmail.com','$2a$12$x6CCQ76Jz/KwoXaVRTDqaenJGyLyVdOGluGAr78m6Zi.zVY2hyoW6',NULL,NULL),(9,2,'staff','staffmydinh3@gmail.com','$2a$12$PWXhTCiARYK2oy746CVNnOw1LKV4dnrXB2qOu0Lo7F8Kekr5M2E36',NULL,NULL),(10,2,'staff','staffmydinh4@gmail.com','$2a$12$Irdmqxe8pUivcZPzAuMzXeW2TpzwNjZTuHq.MlwWk0ICZfQbzAYeC',NULL,NULL),(11,2,'staff','staffmydinh5@gmail.com','$2a$12$8XOKYaBlefhiJaRI93QWb.Lk5WtN5Lab2qv.kp7Btpyk7D9KEi7ke',NULL,NULL),(12,2,'admin','admin2@gmail.com','$2a$12$2EIxyqkMgwJ7/cRXMItJ8OVSJo8TLLUGt1WY83rIeno51JMPenjVS',NULL,NULL),(13,3,'staff','staffbadinh1@gmail.com','$2a$12$GZyuvBU0IJ6pBg9LFrMY.uMXY3PeYZoB089PuriLlYRr53LnCnP3.',NULL,NULL),(14,3,'staff','staffbadinh2@gmail.com','$2a$12$qml.yT8s0ujvU7CvQlQwhemSwLMLEgMwGh9CQb3hpSFL4CMm82A8G',NULL,NULL),(15,3,'staff','staffbadinh3@gmail.com','$2a$12$P/JGzIe3ymuG1e9X7nwfq.pVD3rxElVFutzXe.rEVYFUAEQZx19rC',NULL,NULL),(16,3,'staff','staffbadinh4@gmail.com','$2a$12$hDFCm0jFyN8G9NE8vzMm5.Ez.UtrvU0BBp6V1zpkK04LznV6DfjmC',NULL,NULL),(17,3,'staff','staffbadinh5@gmail.com','$2a$12$PvyOLIs2XiMj6/Jplsv1.uvNip9koywfPcS7Gn6qk/IjkdXWYnvVW',NULL,NULL),(18,3,'admin','admin3@gmail.com','$2a$12$zuHIq8xBL0qTYZz5Eaiu4uvwh8XQl950T3tfo.Ey96HB.1EcMUvD2',NULL,NULL),(19,4,'staff','staffhaibatrung1@gmail.com','$2a$12$2DwymaP4MatnppW3xswuxOBoVTOYooJhZk62516lPr0ktUbBhlCGK',NULL,NULL),(20,4,'staff','staffhaibatrung2@gmail.com','$2a$12$1fzl834WlNDsu/Hrrnjp2OzOdw2UqoPuDHYDLoHYgCbsNePderF0W',NULL,NULL),(21,4,'staff','staffhaibatrung3@gmail.com','$2a$12$xQSYy8Kf/59rJzosJqcgrOE3zqKT.2Wg4eYOl0nUF9tuJjCEs.Ho6',NULL,NULL),(22,4,'staff','staffhaibatrung4@gmail.com','$2a$12$R6j7Er.7n8r4j0Ffz6BHvOvHgYI3.cnQiB.mr7xLXWj0KDIT7sKKG',NULL,NULL),(23,4,'staff','staffhaibatrung5@gmail.com','$2a$12$/KmrW.06Mo9P0iQwvZeTXuC3ZonH1zNZiGivNDy2p7DBVuqMfKzym',NULL,NULL),(24,4,'admin','admin4@gmail.com','$2a$12$kNH8MvvwlsP62V1de60e9.ohZTohM3JClOtKO2sZ2ZQUFMr0cY0xi',NULL,NULL),(25,5,'staff','staffdongda1@gmail.com','$2a$12$0NghI4AEgB85HJ5xJAUcbeq2mMyR17xqhPI3dHdopj8/k4TgyVNCy',NULL,NULL),(26,5,'staff','staffdongda2@gmail.com','$2a$12$Cgb53ncp6tPy11ChAaf./OsBNHeB1HAgSCczNxFf8ZhStyXx4ryoy',NULL,NULL),(27,5,'staff','staffdongda3@gmail.com','$2a$12$Nx2Bc2I3yZVaG9u3Pi5aYe4nGUUgJ5Dixq0deSy2hY9SpoWKUF/S6',NULL,NULL),(28,5,'staff','staffdongda4@gmail.com','$2a$12$9aLOX9.l2EQ2GC//iFOQCu5EUQPSFg/NOurqRj.y8jeCfIPWoGFs.',NULL,NULL),(29,5,'staff','staffdongda5@gmail.com','$2a$12$7PhoaaQs6Ua5okd9aF2HKef5eBxQ7V5GCEuPImv7IM.DY2utBYvbS',NULL,NULL),(30,5,'admin','admin5@gmail.com','$2a$12$hCze3hUM2pEogyIitF07nO/LtviPCcLEzYy6Y5ZIs/wg/1ORm9sjW',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-09 12:32:08
