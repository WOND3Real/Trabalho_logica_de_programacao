-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: sistema_smt
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `credenciais_atendentes`
--

DROP TABLE IF EXISTS `credenciais_atendentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credenciais_atendentes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `senha` varchar(15) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credenciais_atendentes`
--

LOCK TABLES `credenciais_atendentes` WRITE;
/*!40000 ALTER TABLE `credenciais_atendentes` DISABLE KEYS */;
/*!40000 ALTER TABLE `credenciais_atendentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credenciais_clientes`
--

DROP TABLE IF EXISTS `credenciais_clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credenciais_clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `cpf` decimal(11,0) NOT NULL,
  `senha` varchar(15) NOT NULL,
  `nascimento` date DEFAULT NULL,
  `sexo` enum('M','F','O') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unico` (`cpf`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credenciais_clientes`
--

LOCK TABLES `credenciais_clientes` WRITE;
/*!40000 ALTER TABLE `credenciais_clientes` DISABLE KEYS */;
INSERT INTO `credenciais_clientes` VALUES (1,'Joao',12345678910,'123456','1996-04-23','M'),(3,'Dom ruan',12314796385,'arrodoce123','1000-05-15','M');
/*!40000 ALTER TABLE `credenciais_clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credenciais_doutores`
--

DROP TABLE IF EXISTS `credenciais_doutores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credenciais_doutores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(30) NOT NULL,
  `senha` varchar(15) NOT NULL,
  `especialidade` varchar(50) NOT NULL,
  `consultorio` decimal(2,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credenciais_doutores`
--

LOCK TABLES `credenciais_doutores` WRITE;
/*!40000 ALTER TABLE `credenciais_doutores` DISABLE KEYS */;
/*!40000 ALTER TABLE `credenciais_doutores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sistema_smt'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-10 18:12:47
