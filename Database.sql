CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE cart_items (
    cart_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_name VARCHAR(255),
    product_price DECIMAL(10, 2),
    quantity INT DEFAULT 1,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
