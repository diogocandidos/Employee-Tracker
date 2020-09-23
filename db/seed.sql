-- CREATING DATABASE--

DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

use employee_trackerDB;

-- CREATING TABLE (DEPARTMENT, ROLE AND EMPLOYEE);
CREATE TABLE `employee_trackerDB`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `employee_trackerDB`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30),
  `salary` DECIMAL,S
  `department_id` INT,
  PRIMARY KEY (`id`)
);

CREATE TABLE `employee_trackerDB`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NULL,
  `last_name` VARCHAR(30) NULL,
  `role_id` INT NULL,
  `manager_id` INT NULL,
  PRIMARY KEY (`id`)
);

