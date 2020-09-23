-- CREATING DATABASE--
DROP DATABASE IF EXISTS trackerDB;

CREATE DATABASE trackerDB;

use trackerDB;

-- CREATING TABLES (DEPARTMENT, ROLE AND EMPLOYEE);
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) DEFAULT NULL,
  `salary` decimal(10) DEFAULT NULL,
  `department_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `role_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`)
);

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `manager_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`),
  KEY `manager_id` (`manager_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`manager_id`) REFERENCES `employee` (`id`)
);



-- INSERTING DEPARTMENTS NAME --

INSERT INTO department (name)
VALUE ("Sales"); -- ID = 1 --
INSERT INTO department (name)
VALUE ("Engineering"); -- ID = 2 --
INSERT INTO department (name)
VALUE ("Finance"); -- ID = 3 --
INSERT INTO department (name)
VALUE ("Legal"); -- ID = 4 --




-- INSERTING ROLE DB--
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1); -- Winston --
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);

INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);

INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);

INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 182000, 4);


-- INSERTING EMPLOYEE DB --
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Myres", "Tighman", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Karina", "Pertence", 1, 2);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Diogo", "Candido", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Matheus", "Bolson", 3, 4);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Carol", "Saab", null, 5);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Laura", "Hoffman", null, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Armando", "Vieira", 6, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Brian", "Lambe", 6, 8);


-- SELECTING TABLES ---
SELECT 
	*	 FROM department;

SELECT 
	*	 FROM role;
    
SELECT 
	*	 FROM employee;