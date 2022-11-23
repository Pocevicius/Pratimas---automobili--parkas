CREATE TABLE cars (
    ID SERIAL PRIMARY KEY ,
    Title varchar (255) NOT NULL,
    Image varchar (255),NOT NULL,
    Price decimal(12,2),NOT NULL,
    numberplate varchar(255),NOT NULL
);