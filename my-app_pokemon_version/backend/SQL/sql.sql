
CREATE DATABASE Pokestore;

USE Pokestore;


CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email LIKE '%@%.%'),
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE
);


CREATE TABLE Generations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_generations VARCHAR(100) NOT NULL,
    creation_date DATE,
    description TEXT
);


CREATE TABLE Sets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_sets VARCHAR(100) NOT NULL,
    name_generation VARCHAR(100) NOT NULL,
    id_generation INT NOT NULL,
    creation_date DATE,
    description TEXT,
    FOREIGN KEY (id_generation) REFERENCES Generations(id)
    
);



CREATE TABLE Card (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    id_pokemon INT NOT NULL,
    type_pokemon VARCHAR(255) NOT NULL,
    id_sets INT NOT NULL,
    release_date DATE,
    resum TEXT,
    stock INT DEFAULT 0,
    price DECIMAL(18, 2) NOT NULL,
    Illustration_Rare BOOLEAN DEFAULT FALSE,
    Illustration_Speciale_Rare BOOLEAN DEFAULT FALSE,
    Illustration_Hyper_Rare BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (id_sets) REFERENCES Sets(id)
);

CREATE TABLE Purchase_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    card_id INT NOT NULL,
    quantity INT NOT NULL,
    price_total DECIMAL(10, 2) NOT NULL,
    purchase_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES User(id),
    FOREIGN KEY (card_id) REFERENCES Card(id)
);


CREATE TABLE Image (
    id INT AUTO_INCREMENT PRIMARY KEY,
    image_name VARCHAR(255) NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    uploaded_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    card_id INT, 
    generations_id INT,
    sets_id INT,
    FOREIGN KEY (card_id) REFERENCES Card(id) ON DELETE CASCADE , 
    FOREIGN KEY (generations_id) REFERENCES Generations(id) ON DELETE CASCADE,
    FOREIGN KEY (sets_id) REFERENCES Sets(id) ON DELETE CASCADE  
);


INSERT INTO Card (
    title, 
    id_pokemon, 
    type_pokemon, 
    id_sets, 
    release_date, 
    resum, 
    stock, 
    price, 
    Illustration_Rare, 
    Illustration_Speciale_Rare, 
    Illustration_Hyper_Rare
) VALUES (
    'Ferdeter',
    25, 
    'Metal', 
    1, 
    '2023-11-01', 
    'On volera le ferdetern de juan ',
    10, 
    19.99, 
    TRUE, 
    FALSE, 
    FALSE
);



SHOW TABLES;

describe User;
describe Sets;
describe Card;
describe Purchase_history;