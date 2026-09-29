CREATE DATABASE IF NOT EXISTS glowcurl;

USE glowcurl;


CREATE TABLE clientes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    apellido VARCHAR(100) NOT NULL,

    correo VARCHAR(150) NOT NULL UNIQUE,

    telefono VARCHAR(20) NOT NULL,

    cabello VARCHAR(50) NOT NULL,

    observaciones TEXT,

    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
