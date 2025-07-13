-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: turntable.proxy.rlwy.net    Database: railway
-- ------------------------------------------------------
-- Server version	9.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `ki` varchar(255) NOT NULL,
  `maxKi` varchar(255) NOT NULL,
  `race` enum('Saiyan','Namekian','Human','Majin','Frieza Race','Jiren Race','Android','God','Angel','Evil','Unknown','Nucleico benigno','Nucleico') NOT NULL,
  `gender` enum('Male','Female','Other','Unknown') NOT NULL,
  `affiliation` enum('Z Fighter','Red Ribbon Army','Namekian Warrior','Freelancer','Army of Frieza','Other','Pride Troopers','Assistant of Vermoud','Assistant of Beerus','Villain') NOT NULL,
  `description` text NOT NULL,
  `originPlanetId` int DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_86a2bcc85e3473ecf3693dfe5a` (`name`),
  KEY `FK_f405e481bb6e17e788baf8b093a` (`originPlanetId`),
  CONSTRAINT `FK_f405e481bb6e17e788baf8b093a` FOREIGN KEY (`originPlanetId`) REFERENCES `planets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
sact

--
-- Table structure for table `planets`
--

DROP TABLE IF EXISTS `planets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `planets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `isDestroyed` tinyint NOT NULL,
  `description` text NOT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_70a170f032a2ca04a6ec6eb2d9` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `planets`
--

LOCK TABLES `planets` WRITE;
/*!40000 ALTER TABLE `planets` DISABLE KEYS */;
INSERT INTO `planets` VALUES (1,'Namek','/dragonball-api/planetas/Namek_U7.webp',1,'Planeta natal de los Namekianos. Escenario de importantes batallas y la obtención de las Dragon Balls de Namek.',NULL),(2,'Tierra','/dragonball-api/planetas/Tierra_Dragon_Ball_Z.webp',0,'La Tierra también llamado Mundo del Dragón (Dragon World), es el planeta principal donde se desarrolla la serie de Dragon Ball. Se encuentra en el Sistema Solar de la Vía Láctea de las Galaxias del Norte del Universo 7, lugar que supervisa el Kaio del Norte, y tiene su equivalente en el Universo 6. El hogar de los terrícolas y los Guerreros Z. Ha sido atacado en varias ocasiones por enemigos poderosos.',NULL),(3,'Vegeta','/dragonball-api/planetas/Planeta_Vegeta_en_Dragon_Ball_Super_Broly.webp',1,'El planeta Vegeta, conocido como planeta Plant antes del fin de la Guerra Saiyan-tsufruiana en el año 730, es un planeta rocoso ficticio de la serie de manga y anime Dragon Ball y localizado en la Vía Láctea de las Galaxias del Norte del Universo 7 hasta su destrucción a manos de Freezer en los años 737-739. Planeta natal de los Saiyans, destruido por Freezer. Anteriormente conocido como Planeta Plant.',NULL),(4,'Freezer No. 79','/dragonball-api/planetas/PlanetaFreezer.webp',1,'Planeta artificial utilizado por Freezer como base de operaciones y centro de clonación.',NULL),(5,'Kanassa','/dragonball-api/planetas/800px-PlanetKannasa.webp',1,'Planeta habitado por los Kanassans y conocido por la lucha entre Bardock y los habitantes del planeta.',NULL),(6,'Monmar','/dragonball-api/planetas/monmar.webp',0,'Planeta donde Gohan y Krillin encontraron las Dragon Balls para revivir a sus amigos durante la Saga de Namek.',NULL),(7,'Yardrat','/dragonball-api/planetas/PlanetYardrat.webp',0,'Planeta de la técnica Instant Transmission, aprendida por Goku durante su estancia.',NULL),(11,'Kaiō del Norte','/dragonball-api/planetas/Planeta_del_Kaio_del_Norte.webp',0,'El Planeta Kaio se encuentra al final del largo Camino de la Serpiente. Es donde viven el Kaio del Norte, su mascota Bubbles, al que utiliza como parte de su entrenamiento, y Gregory.',NULL),(13,'Makyo','/dragonball-api/planetas/Makyo_star.webp',0,'Makyo es un planeta y la fuente de alimentación de todos los malévolos, especialmente Garlic Jr., que solo aparece durante el Arco de Garlic Jr. de Dragon Ball Z.',NULL),(14,'Babari','/dragonball-api/planetas/Planeta_Babari.webp',0,'Planeta habitado por los Babari, es un planeta telúrico del Universo 10 donde residen los babarianos, hizo su primera aparición en el episodio 54 de Dragon Ball Super. Es donde Tarble, el hermano de Vegeta, se refugió.',NULL),(15,'Tsufur (Universo 6)','/dragonball-api/planetas/tsufur.webp',0,'Planeta natal de los Tsufur, la raza a la que pertenecía el Dr. Raichi.',NULL),(16,'Desconocido','/dragonball-api/planetas/planetwhatis.webp',0,'Sin informacion',NULL),(18,'Otro Mundo','/dragonball-api/planetas/otro mundo.webp',0,'El Otro Mundo en contraparte al Mundo de los vivos, es, en Dragon Ball, la versión del mundo de los muertos. Es donde los personajes van cuando mueren, y también donde residen las deidades superiores del universo. En el episodio 53 del anime, el Otro Mundo fue descrito como \"la dimensión siguiente\", y el acto de desear traer a la vida a una persona muerta con las Esferas del Dragón se llama \"traer (a ellos) a esta dimensión.',NULL),(19,'Planeta de Bills ','/dragonball-api/planetas/Templo_de_Bills2.webp',0,'Planeta de Bills un cuerpo celeste ubicado dentro del mundo de los vivos del Universo 7, el cual aparece por primera vez en la película Dragon Ball Z: La Batalla de los Dioses.',NULL),(20,'Planeta del Gran Kaio','/dragonball-api/planetas/Planetadaikaiosama.webp',0,'El Planeta del Gran Kaio es donde se organiza el Torneo de Artes Marciales del Otro Mundo en honor a la muerte del Kaio del Norte (Kaito), donde participan guerreros poderosos.',NULL),(21,'Nucleo del Mundo','/dragonball-api/planetas/nucleo_mundo.webp',0,'El Núcleo del Mundo es el planeta nativo de toda la especie nucleica, del cual surgen los benévolos Kaio y Kaio-shin, así como los malévolos Makaio, Makaio-shin y Dioses Demoníacos en contrapartida.',NULL),(22,'Planeta sagrado','/dragonball-api/planetas/Planeta_Sagrado.webp',0,'El Planeta Sagrado es el planeta localizado en el Reino Kaio-shin donde residen los Kaio-shin del Universo 7. No debe ser confundido con el Núcleo del Mundo.El Reino de los Kaio-shin, en el cual se encuentra localizado el planeta, es un reino especial completamente separado en el macrocosmos del Universo 7, es decir, está separado del Otro Mundo, del Mundo de los vivos y del Reino Demoníaco Oscuro.',NULL),(23,'Nuevo Planeta Tsufrui','/dragonball-api/planetas/Nuevo_planeta_plant.webp',0,'El Nuevo Planeta Plant, también conocido como el Nuevo Planeta Tsufru, es el nombre que se le da al nuevo hogar de los Tsufruianos controlados por Vegeta Baby, ocasionado gracias al deseo concedido por medio de las Esferas del Dragón Definitivas de restaurar el Planeta Plant en la órbita de la Tierra.',NULL),(24,'Templo móvil del Rey de Todo','/dragonball-api/planetas/Trono_del_Rey_de_Todo.webp',0,'El templo móvil del Rey de Todo (sala del trono), es como su nombre lo indica, un templo móvil en el cual reside los tronos de los dos Reyes de Todo en el Lugar de Supervivencia en Dragon Ball Super.',NULL),(25,'Universo 11','/dragonball-api/planetas/Universo_11.webp',0,'El Universo 11, es, como su nombre lo indica, el undécimo de los doce universos existentes actualmente en el mundo de Dragon Ball. Este es gemelo del Universo 2 y el lugar de origen de las Tropas del Orgullo.',NULL);
/*!40000 ALTER TABLE `planets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transformations`
--

DROP TABLE IF EXISTS `transformations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transformations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `ki` varchar(255) NOT NULL,
  `characterId` int DEFAULT NULL,
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_068112b73febc41f6659e2386f1` (`characterId`),
  CONSTRAINT `FK_068112b73febc41f6659e2386f1` FOREIGN KEY (`characterId`) REFERENCES `characters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transformations`
--

LOCK TABLES `transformations` WRITE;
/*!40000 ALTER TABLE `transformations` DISABLE KEYS */;
INSERT INTO `transformations` VALUES (1,'Goku SSJ','/dragonball-api/transformaciones/goku_ssj.webp','3 Billion',1,NULL),(2,'Goku SSJ2','/dragonball-api/transformaciones/goku_ssj2.webp','6 Billion',1,NULL),(3,'Goku SSJ3','/dragonball-api/transformaciones/goku_ssj3.webp','24 Billion',1,NULL),(4,'Goku SSJ4','/dragonball-api/transformaciones/goku_ssj4.webp','2 Quadrillion',1,NULL),(5,'Goku SSJB','/dragonball-api/transformaciones/goku_ssjb.webp','9 Quintillion',1,NULL),(7,'Vegeta SSJ','/dragonball-api/transformaciones/vegeta ssj.webp','330.000.000',2,NULL),(8,'Vegeta SSJ2','/dragonball-api/transformaciones/vegeta SSJ (2).webp','24 Billion',2,NULL),(9,'Vegeta SSJ4','/dragonball-api/transformaciones/vegeta ssj4.webp','1.8 Trillion',2,NULL),(10,'Vegeta SSJB','/dragonball-api/transformaciones/vegeta SSJB.webp','100 Quintillion',2,NULL),(11,'Vegeta Mega Instinc Evil','/dragonball-api/transformaciones/vegeta mega instinto.webp','19.84 Septillion',2,NULL),(12,'Piccolo Super Namekian','/dragonball-api/transformaciones/Piccolo super namekiano.webp','2.175 Billion',3,NULL),(13,'Piccolo Orange','/dragonball-api/transformaciones/picolo orange.webp','41.25 Quintillion',3,NULL),(14,'Freezer 2nd Form','/dragonball-api/transformaciones/freezer 2nd forma.webp','1.060.000',5,NULL),(15,'Freezer 3rd Form','/dragonball-api/transformaciones/Freezer_3.webp','2.120.000',5,NULL),(16,'Freezer Perfect Form','/dragonball-api/transformaciones/render_freezer_perfect_form_by_poh2000-d4n0ewd.webp','60.000.000',5,NULL),(17,'Freezer Perfect Form (Golden)','/dragonball-api/transformaciones/freezer_gold.webp','100 Quintillion',5,NULL),(18,'Zarbon Monster','/dragonball-api/transformaciones/zarbon monster.webp','30.000',6,NULL),(19,'Imperfect Form','/dragonball-api/transformaciones/cell imperfect.webp','370.000.000',9,NULL),(20,'Semi Perfect Form','/dragonball-api/transformaciones/Semi-Perfect_Cell.webp','897.000.000',9,NULL),(21,'Super Perfect Form','/dragonball-api/transformaciones/cell perfect.webp','10.970.000.000',9,NULL),(22,'Gohan SSJ','/dragonball-api/transformaciones/Gohan_joven_ssj2.webp','4.700.000.000',10,NULL),(23,'Gohan SSJ2','/dragonball-api/transformaciones/gohan_ssj-removebg-preview.webp','10.200.000.000',10,NULL),(24,'Gohan Ultimate','/dragonball-api/transformaciones/gohan_ultimate.webp','43.000.000.000',10,NULL),(25,'Gohan Beast','/dragonball-api/transformaciones/beast_gohan___dragon_ball_super_super_hero_by_rmrlr2020_dfbqvta-pre.webp',' 25.6 Septillion',10,NULL),(26,'Trunks SSJ','/dragonball-api/transformaciones/trunks_ssj-removebg-preview.webp','905.000.000',16,NULL),(27,'Trunks SSJ2','/dragonball-api/transformaciones/trunks ssj2.webp','18.000.000.000',16,NULL),(28,'Trunks SSJ3','/dragonball-api/transformaciones/trunks ssj3.webp','1.25 Billion',16,NULL),(29,'Trunks Rage','/dragonball-api/transformaciones/trunks ssj iracundo.webp','17.5 Quintillion ',16,NULL),(30,'Gotenks SSJ','/dragonball-api/transformaciones/gotenks ssj.webp','5.7 Billion',15,NULL),(31,'Gotenks SSJ3','/dragonball-api/transformaciones/Gotenks_SSJ3.webp','45.6 Billion',15,NULL),(32,'Super Buu','/dragonball-api/transformaciones/Super_Buu_Artwork.webp','5.670.000.000',32,NULL),(33,'Majin Buu (Gotenks)','/dragonball-api/transformaciones/Gotenks-Buu-removebg-preview.webp','12.300.000.000',32,NULL),(34,'Majin Buu (Gohan)','/dragonball-api/transformaciones/Super_Buu_Gohan_Absorbido.webp','14.800.000.000',32,NULL),(35,'Majin Buu (Pure)','/dragonball-api/transformaciones/majin buu pure.webp','4.000.000.000',32,NULL),(36,'Gogeta SSJ','/dragonball-api/transformaciones/gogeta.webp','6.3 sextillion',65,NULL),(37,'Gogeta SSJ4','/dragonball-api/transformaciones/GOGETA SSJ4.webp','168 quadrillion',65,NULL),(38,'Gogeta SSJB','/dragonball-api/transformaciones/gogeta SSJB.webp','12.6 septillion',65,NULL),(39,'Gogeta SSJB Evolved','/dragonball-api/transformaciones/gogeta__bm__ssb_evolution___1__con_aura__by_ssjrose890_df682g0-fullview.webp','1.26 octillion',65,NULL),(40,'Vegetto SSJ','/dragonball-api/transformaciones/Vegetto.webp','9 Trillion',66,NULL),(41,'Vegetto SSJB','/dragonball-api/transformaciones/VEGITO SSJB.webp','10.8 Septillion',66,NULL),(42,'Super Janemba','/dragonball-api/transformaciones/Super-Janemba_artwork_SDBH.webp','75 Billion',67,NULL),(43,'Broly SSJ Legendary','/dragonball-api/transformaciones/Broly_Super_Saiyajin_Legendario_1.webp','11.2 Septillion',68,NULL),(44,'Goku Ultra Instinc','/dragonball-api/transformaciones/goku_ultra.webp','90 Septillion',1,NULL);
/*!40000 ALTER TABLE `transformations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'railway'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-01 12:42:51
