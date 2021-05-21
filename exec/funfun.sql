-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: funfundatabase.cbdqwslhgkmb.ap-northeast-2.rds.amazonaws.com    Database: funfuntest
-- ------------------------------------------------------
-- Server version	8.0.20

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (166);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `member_no` int NOT NULL AUTO_INCREMENT COMMENT '회원 번호',
  `member_id` varchar(45) DEFAULT NULL COMMENT '아이디',
  `member_pw` varchar(255) DEFAULT NULL COMMENT '비밀번호',
  `member_nick` varchar(45) DEFAULT NULL COMMENT '닉네임',
  `member_email` varchar(255) DEFAULT NULL COMMENT '이메일',
  PRIMARY KEY (`member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='회원';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (7,'dummy2','40 c0 bb 05 4b f0 7d 5c 61 4c 8a a3 c8 27 ce 5d a2 0e af 4c 04 a3 38 f3 44 b9 bf 91 50 5c 6c ce ','더미','doggydeok2@gmail.com'),(10,'ssafy','6a ba 83 4f 04 4e e3 5f 70 a5 fa a0 e2 c2 2b 67 47 7b 5a c6 dc dc d8 3f c2 ce 90 6b a7 2a 8e 1d ','new_ssafy','ssafy@ssafy.com'),(12,'test','93 7e 8d 5f bb 48 bd 49 49 53 6c d6 5b 8d 35 c4 26 b8 0d 2f 83 0c 5c 30 8e 2c de c4 22 ae 22 44 ','test','test@ssafy.com'),(13,'prestto','d9 2f 78 89 09 38 31 96 8f 40 a2 89 c2 01 9e 73 61 38 a0 c6 ef fe b7 82 bf 25 5a 0a cb b7 a1 20 ','학생회장_이홍덕','prestto@kakao.com'),(14,'dummy4','40 c0 bb 05 4b f0 7d 5c 61 4c 8a a3 c8 27 ce 5d a2 0e af 4c 04 a3 38 f3 44 b9 bf 91 50 5c 6c ce ','더미4','dummy4@dummy.or.kr'),(15,'sujin123','bc d0 a4 10 02 01 b0 d5 f1 15 cb 60 37 11 c6 bf 2d 83 96 f9 7d 02 04 1a 4c 91 66 29 b3 6b fe f1 ','TEST','h971114@naver.com'),(16,'admin1234','d0 da ed 83 b6 a8 b3 b1 88 2e 10 e2 9f e8 e8 c6 07 74 03 dc 74 5d f3 f2 3b cb 6b d1 89 99 66 39 ','관리자','admin@ssafy.com'),(107,'ssafy1','a5 1a 7c 8e 6b 22 c6 c8 a5 e7 71 53 64 c8 b7 42 3a e1 37 fb c6 43 24 3e 8a 75 87 ab 31 7e c6 ea ','김싸피','ssafy@naver.com');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_no` int NOT NULL AUTO_INCREMENT COMMENT '문제 번호',
  `quiz_member_no` int DEFAULT NULL COMMENT '회원 번호',
  `quiz_content` varchar(255) DEFAULT NULL COMMENT '문제',
  `quiz_type` int DEFAULT NULL COMMENT '유형',
  `quiz_exam1` varchar(255) DEFAULT NULL COMMENT '보기1',
  `quiz_exam2` varchar(255) DEFAULT NULL COMMENT '보기2',
  `quiz_exam3` varchar(255) DEFAULT NULL COMMENT '보기3',
  `quiz_exam4` varchar(255) DEFAULT NULL COMMENT '보기4',
  `quiz_exam5` varchar(255) DEFAULT NULL COMMENT '보기5',
  `quiz_ox` varchar(45) DEFAULT NULL,
  `quiz_short_word` varchar(45) DEFAULT NULL COMMENT '보기단답',
  `quiz_answer` varchar(45) DEFAULT NULL COMMENT '정답',
  `quiz_order` int DEFAULT NULL COMMENT '문제 순서',
  `quiz_img` longtext,
  `quiz_o` varchar(255) DEFAULT NULL,
  `quiz_x` varchar(255) DEFAULT NULL,
  `room_no` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`quiz_no`),
  KEY `FK_quiz_quiz_member_no_member_member_no` (`quiz_member_no`)
) ENGINE=InnoDB AUTO_INCREMENT=117 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='문제';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (2,NULL,'테스트',1,NULL,NULL,NULL,NULL,NULL,'X',NULL,'X',0,NULL,NULL,NULL,NULL),(3,NULL,'테스트',1,NULL,NULL,NULL,NULL,NULL,'X',NULL,'X',0,NULL,NULL,NULL,NULL),(4,NULL,'테스트',1,NULL,NULL,NULL,NULL,NULL,'X',NULL,'X',0,NULL,NULL,NULL,NULL),(5,NULL,'테스트',1,NULL,NULL,NULL,NULL,NULL,'X',NULL,'X',0,NULL,NULL,NULL,NULL),(6,NULL,'테스트',0,NULL,NULL,NULL,NULL,NULL,'X',NULL,'X',0,NULL,NULL,NULL,'code'),(7,NULL,'테스트1',1,'정답','오답','오답','오답','오답',NULL,NULL,'1',0,NULL,NULL,NULL,'code1'),(8,NULL,'테스트1-1',1,'오답','정답','오답','오답','오답',NULL,NULL,'2',1,NULL,NULL,NULL,'code1'),(9,NULL,'테스트3-1',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'테스트3-1',0,NULL,NULL,NULL,'code3'),(10,NULL,'테스트3-2',3,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'테스트3-2',1,NULL,NULL,NULL,'code3'),(11,NULL,'테스트2-1',2,'오답','정답','오답','오답','오답',NULL,NULL,'2',0,NULL,NULL,NULL,'code2'),(12,NULL,'테스트2-2',2,'오답','정답','오답','오답','오답',NULL,NULL,'2',1,NULL,NULL,NULL,'code2'),(15,NULL,'테스트4-1',4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'테스트4-1',0,NULL,NULL,NULL,'code4'),(16,NULL,'테스트4-2',4,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'테스트4-2',1,NULL,NULL,NULL,'code4'),(62,NULL,'asdf',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',0,NULL,NULL,NULL,'N7N9U6'),(65,NULL,'문제는없어요',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',0,NULL,NULL,NULL,'L16J28'),(66,NULL,'테스트1-1',0,NULL,NULL,NULL,NULL,NULL,NULL,NULL,'O',1,NULL,NULL,NULL,'code'),(67,NULL,'A203의 팀장 정현모님의 나이는 몇살일까요?',1,'1살','27세','30세','25살','28살',NULL,NULL,'5',0,NULL,NULL,NULL,'68OON4'),(68,NULL,'ㅊㅈㅇㅈ',3,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'천재영재',1,NULL,NULL,NULL,'68OON4'),(69,NULL,'fff',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',1,NULL,NULL,NULL,'2VK4J7'),(70,NULL,'ggg',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',2,NULL,NULL,NULL,'2VK4J7'),(71,NULL,'fff',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',0,NULL,NULL,NULL,'2VK4J7'),(72,NULL,'초성게임[ㅎㅁㅇㅊ]',4,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'현모양처',0,NULL,NULL,NULL,'0A3L4O'),(73,NULL,'신입생의 총 수는!',2,'2','3','4','5','6',NULL,NULL,'2',1,NULL,NULL,NULL,'0A3L4O'),(74,NULL,'초성게임[ㅈㅈㅅ]',4,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'주짓수',2,NULL,NULL,NULL,'0A3L4O'),(75,NULL,'재학생의 총 수는',2,'1','2','3','4','5',NULL,NULL,'1',3,NULL,NULL,NULL,'0A3L4O'),(76,NULL,'문제를 입력해주세요.',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'',3,NULL,NULL,NULL,'0D253M'),(86,NULL,'적어주세요',3,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'정답',2,NULL,NULL,NULL,'T8AO4P'),(87,NULL,'골라',1,'1','2','3','4','5',NULL,NULL,'3',1,NULL,NULL,NULL,'T8AO4P'),(88,NULL,'안녕하세요',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',0,NULL,NULL,NULL,'T8AO4P'),(89,NULL,'초성퀴즈\n[ㅇㅎㄷ]\n3팀의 일원.',3,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'이홍덕',0,NULL,NULL,NULL,'03RY44'),(90,NULL,'주짓수진님은 주짓수 메달을 딴 경험이 있습니다.\n그건 무슨 메달일까요.',1,'금메달','은메달','동메달','목메달','참가상',NULL,NULL,'1',3,NULL,NULL,NULL,'03RY44'),(91,NULL,'자율2반의 컨설턴트님 이름은?',1,'컨설턴트님','리따이희','이태희','김태희','신채원',NULL,NULL,'3',1,NULL,NULL,NULL,'03RY44'),(92,NULL,'초성퀴즈\n[ㄹㄷㅂㄹㅅ]\n3팀이 적용에 실패한 것.',3,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'로드밸런싱',4,NULL,NULL,NULL,'03RY44'),(93,NULL,'초성퀴즈\n[ㅅㅊㅇ]\nbgm을 입으로 자주 부름',3,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'신채원',2,NULL,NULL,NULL,'03RY44'),(94,NULL,'오늘 퇴실/설문은 몇시에 있나요?',1,'6시~6시30분','5시~6시30분','4시~4시30분','3시~3시30분','18시~18시30분',NULL,NULL,'5',5,NULL,NULL,NULL,'03RY44'),(95,NULL,'정현모는 천영재랑 동갑이다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',0,NULL,NULL,NULL,'8IS2WY'),(96,NULL,'현수진은 탄수화물을 좋아한다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',1,NULL,NULL,NULL,'8IS2WY'),(101,NULL,'선생님을 칼로 베면?',4,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'스승',2,NULL,NULL,NULL,'F718I6'),(102,NULL,'문제를 입력해주세요.',99,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'',4,NULL,NULL,NULL,'F718I6'),(103,NULL,'야채가 아닌 것은?',1,'참외','수박','파프리카','파인애플','토마토',NULL,NULL,'4',1,NULL,NULL,NULL,'F718I6'),(104,NULL,'나는 빡빡이다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',0,NULL,NULL,NULL,'F718I6'),(105,NULL,'2 + 1 + 2 = ?',2,'1','2','3','5','4',NULL,NULL,'4',3,NULL,NULL,NULL,'F718I6'),(106,NULL,'문제가 저장이 될까?',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',5,NULL,NULL,NULL,'F718I6'),(107,NULL,'문제를 입력해주세요.',99,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'',0,NULL,NULL,NULL,'97HE94'),(108,NULL,'ㅁㄴㅇㄹ',1,'ㄹ','ㄹ','ㄹ','ㄹ','ㄹ',NULL,NULL,'1',1,NULL,NULL,NULL,'97HE94'),(109,NULL,'ㅁㄴㅇㄹ',3,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'ㅁㄴㅇㄹ',2,NULL,NULL,NULL,'97HE94'),(110,NULL,'나는 빡빡이다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',0,NULL,NULL,NULL,'4SBDA4'),(111,NULL,'나는 빡빡이일지도 모른다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',2,NULL,NULL,NULL,'4SBDA4'),(112,NULL,'빡빡이가 아니라면 내가 아니다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',3,NULL,NULL,NULL,'4SBDA4'),(113,NULL,'나는 빡빡이가 아니다',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',1,NULL,NULL,NULL,'4SBDA4'),(114,NULL,'ㄹㄹ',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',0,NULL,NULL,NULL,'5Q53D8'),(115,NULL,'ㄹㄹ',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'X',0,NULL,NULL,NULL,'42954Q'),(116,NULL,'ㄹㄹ',0,'1번 보기입니다.','2번 보기입니다.','3번 보기입니다.','4번 보기입니다.','5번 보기입니다.',NULL,NULL,'O',1,NULL,NULL,NULL,'42954Q');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result` (
  `result_no` int NOT NULL AUTO_INCREMENT COMMENT '결과 번호',
  `result_room_no` int DEFAULT NULL COMMENT '방 번호',
  `result_name` longtext COMMENT '푼 사람',
  `result_score` longtext COMMENT '결과',
  PRIMARY KEY (`result_no`),
  KEY `FK_result_result_room_no_room_room_no` (`result_room_no`),
  CONSTRAINT `FK_result_result_room_no_room_room_no` FOREIGN KEY (`result_room_no`) REFERENCES `room` (`room_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='개인 결과';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_no` int NOT NULL AUTO_INCREMENT COMMENT '방 번호',
  `room_code` varchar(45) DEFAULT NULL COMMENT '방 코드',
  `room_member_no` int DEFAULT NULL COMMENT '회원 번호(방 만든 사람)',
  `room_team_cnt` int DEFAULT NULL COMMENT '팀 수',
  `room_quiz_cnt` int DEFAULT NULL COMMENT '문제 수',
  `quiz_title` varchar(255) DEFAULT NULL,
  `quiz_date` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`room_no`),
  KEY `FK_room_room_member_no_member_member_no` (`room_member_no`),
  CONSTRAINT `FK_room_room_member_no_member_member_no` FOREIGN KEY (`room_member_no`) REFERENCES `member` (`member_no`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='방';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (3,'000000',7,1,6,'dummy2quiz','2021-05-13 06:56:23'),(17,'N7N9U6',13,0,1,'hello','2021-05-19 23:14:30'),(114,'0TF712',13,0,0,'임시 저장','2021-05-20 07:28:40'),(115,'21Z877',13,0,0,'임시 저장','2021-05-20 08:01:18'),(116,'L16J28',7,0,0,'임시 저장','2021-05-20 02:14:13'),(117,'3G70BG',7,0,0,'임시 저장','2021-05-20 02:14:45'),(118,'68OON4',13,0,3,'안녕하세요 컨설턴트님 코치님','2021-05-20 04:26:30'),(119,'S2OKM4',13,0,0,'임시 저장','2021-05-20 14:08:20'),(120,'2VK4J7',13,0,4,'asdf','2021-05-20 14:08:56'),(121,'0A3L4O',13,0,4,'신입생 OT','2021-05-20 08:14:56'),(144,'T8AO4P',15,0,3,'테스트입니ㅏ','2021-05-20 11:55:55'),(145,'03RY44',16,0,6,'나를 맞춰보세요.','2021-05-20 13:09:06'),(146,'5C8G82',16,0,0,'임시 저장','2021-05-20 22:27:55'),(147,'AW68FI',16,0,0,'임시 저장','2021-05-20 13:31:09'),(148,'KJP5V0',16,0,0,'임시 저장','2021-05-20 13:31:48'),(149,'8IS2WY',16,0,2,'3팀OX퀴즈','2021-05-20 13:48:00'),(150,'71JZPO',16,0,0,'임시 저장','2021-05-20 23:33:59'),(151,'POKM9Q',7,0,0,'임시 저장','2021-05-20 23:48:39'),(152,'08823F',16,0,0,'임시 저장','2021-05-20 23:55:04'),(153,'F718I6',7,0,6,'임시 저장','2021-05-20 23:59:17'),(154,'7ZJ2MV',16,0,0,'임시 저장','2021-05-21 00:04:09'),(155,'2J470P',16,0,0,'임시 저장','2021-05-21 00:05:22'),(156,'5O63BU',16,0,0,'임시 저장','2021-05-21 00:07:56'),(157,'U5374L',16,0,0,'임시 저장','2021-05-21 00:08:01'),(158,'5WKLUW',16,0,0,'임시 저장','2021-05-21 00:08:41'),(159,'97HE94',16,0,3,'ㅁㄴㅇㄹ','2021-05-21 00:11:26'),(160,'4SBDA4',7,0,4,'빡빢ㅃ빡','2021-05-21 00:12:51'),(161,'MTY080',16,0,0,'임시 저장','2021-05-21 00:16:52'),(162,'Y7T4T0',7,0,0,'임시 저장','2021-05-21 00:23:04'),(163,'0F9I75',13,0,0,'임시 저장','2021-05-21 01:27:17'),(164,'5Q53D8',13,0,0,'임시 저장','2021-05-21 10:11:42'),(165,'42954Q',13,0,2,'ㄹㄹ','2021-05-21 10:12:11');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-21 10:41:50
