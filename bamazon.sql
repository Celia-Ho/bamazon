DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES 
('panama hat', 'mens accessories', 35.99, 50),
('wide brim sun hat', 'womens accessories', 40.99, 20),
('guitar','instruments', 399.99, 13),
('tripod', 'camera accessories', 100.54, 5),
('camera backpack', 'bags', 122.45, 71),
('knife set', 'kitchenware', 99.23, 12),
('folding bike', 'sports', 799.99, 34),
('leather jacket', 'mens clothing', 355.99, 36),
('velvet blazer', 'womens clothing', 123.87, 23),
('punching bag', 'fitness equipment', 132.99, 19);

SELECT * FROM products;

