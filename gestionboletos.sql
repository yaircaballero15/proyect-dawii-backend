-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: gestionboletosbd
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `tb_boleto`
--

DROP TABLE IF EXISTS `tb_boleto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_boleto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `asiento` varchar(5) NOT NULL,
  `fecha_compra` datetime(6) NOT NULL,
  `precio` decimal(38,2) NOT NULL,
  `cod_usua` bigint NOT NULL,
  `vuelo_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_boleto_usuario` (`cod_usua`),
  KEY `fk_boleto_vuelo` (`vuelo_id`),
  CONSTRAINT `fk_boleto_usuario` FOREIGN KEY (`cod_usua`) REFERENCES `tb_usuarios` (`cod_usua`),
  CONSTRAINT `fk_boleto_vuelo` FOREIGN KEY (`vuelo_id`) REFERENCES `tb_vuelos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_boleto`
--

LOCK TABLES `tb_boleto` WRITE;
/*!40000 ALTER TABLE `tb_boleto` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_boleto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_usuarios`
--

DROP TABLE IF EXISTS `tb_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_usuarios` (
  `cod_usua` bigint NOT NULL AUTO_INCREMENT,
  `ape_usua` varchar(25) NOT NULL,
  `cla_usua` varchar(100) NOT NULL,
  `usr_usua` varchar(45) NOT NULL,
  `est_usua` varchar(255) DEFAULT NULL,
  `fna_usua` date DEFAULT NULL,
  `nom_usua` varchar(15) NOT NULL,
  `rol_usua` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cod_usua`),
  UNIQUE KEY `UK7rinqx4b64hu05nom6wm38ybs` (`usr_usua`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_usuarios`
--

LOCK TABLES `tb_usuarios` WRITE;
/*!40000 ALTER TABLE `tb_usuarios` DISABLE KEYS */;
INSERT INTO `tb_usuarios` VALUES (1,'Principal','$2a$10$Ajb8H5eFmU1pIVm3NeJCZOhF0QItI3n3VwonmFcAJACCusAdJm64K','admin@dawii.com','ACTIVO','1990-01-01','Admin','ADMIN'),(2,'Machacuay Rojas','$2a$10$ubPWE1p1/ENCZ25SdZi.Ve7eN2W8KkiGHnuC2XvOQfnHLGlDdX4jq','jhonalessandromr30@hotmail.com','ACTIVO','2025-07-15','Jhon Alessandro','CLIENTE');
/*!40000 ALTER TABLE `tb_usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tb_vuelos`
--

DROP TABLE IF EXISTS `tb_vuelos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tb_vuelos` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aerolinea` varchar(255) DEFAULT NULL,
  `destino` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `hora_llegada` datetime(6) DEFAULT NULL,
  `hora_salida` datetime(6) DEFAULT NULL,
  `numero_vuelo` varchar(255) DEFAULT NULL,
  `origen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tb_vuelos`
--

LOCK TABLES `tb_vuelos` WRITE;
/*!40000 ALTER TABLE `tb_vuelos` DISABLE KEYS */;
/*!40000 ALTER TABLE `tb_vuelos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-02 15:24:28
