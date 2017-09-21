DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DOUBLE(10,2),
  stock_quantity INTEGER(100)
  
);

-- Creates new rows
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Eggs", "grocery", 1.99, 100),
  ("Milk", "grocery", 2.99, 40),
  ("PS4", "electronics", 249.99, 50),
  ("Xbox One", "electronics", 199.99, 35),
  ("iphone x", "electronics", 999.99, 100),
  ("Bicycle", "sporting goods", 599.99, 25),
  ("Basketball", "sporting goods", 9.99, 50),
  ("50 Shades of Grey", "books", 9.99, 69),
  ("Game of Thrones", "books", 19.99, 45),
  ("Fight Club", "dvds", 11.99, 10),
  ("Avatar", "dvds", 14.99, 25),  
  ("The Office", "dvds", 9.99, 100),
  ("Fall Back Fools", "music", 2.99, 100);

SELECT * FROM products;