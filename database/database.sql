CREATE DATABASE fundacion_puntos_v;

USE fundacion_puntos_v;

CREATE TABLE users(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(180),
    last_name VARCHAR(180),
    email VARCHAR(200),
    password VARCHAR(200),
    rol VARCHAR(150),
    image VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE users;