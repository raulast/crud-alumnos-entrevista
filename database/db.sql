CREATE DATABASE ransato;

USE ransato;

CREATE TABLE sede
(
    id     INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE alumno
(
    id               INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre           VARCHAR(50) NOT NULL,
    apellido         VARCHAR(50) NOT NULL,
    sexo             VARCHAR(10) NOT NULL,
    fecha_nacimiento TIMESTAMP,
    foto             VARCHAR(1000),
    sede_id          INT(6) UNSIGNED,
    FOREIGN KEY (sede_id) REFERENCES sede (id)
);

SHOW TABLES;

DESCRIBE alumno;
DESCRIBE sede;


-- EN CASO DE TENER PROBLEMAS DE CONEXION
-- USE mysql;

-- ALTER USER 'forge'@'%' IDENTIFIED BY '123456789';
-- ALTER USER 'forge'@'%' IDENTIFIED WITH mysql_native_password BY '123456789';