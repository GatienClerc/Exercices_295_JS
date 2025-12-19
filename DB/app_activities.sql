-- MySQL Workbench Forward Engineering (corrigé)
-- Schéma: app_activities

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema app_activities
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `app_activities`;
CREATE SCHEMA IF NOT EXISTS `app_activities` DEFAULT CHARACTER SET utf8;
USE `app_activities`;

-- -----------------------------------------------------
-- Table app_activities.activities
-- -----------------------------------------------------
DROP TABLE IF EXISTS `activities`;
CREATE TABLE IF NOT EXISTS `activities` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL UNIQUE,
  `start_date` DATE NULL,
  `duration` TIME NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Inserts (dates normalisées et durées en HH:MM:SS)
-- JSON: "21.11.25" => ISO: 2025-11-21
-- JSON: "2h"       => TIME: 02:00:00
-- -----------------------------------------------------
INSERT INTO `activities` (`id`, `name`, `start_date`, `duration`) VALUES
(1, 'db',         '2025-11-21', '02:00:00'),
(2, 'js backend', '2025-11-22', '05:00:00'),
(3, 'grenn it',   '2025-11-21', '03:00:00');

SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET SQL_MODE=@OLD_SQL_MODE;
