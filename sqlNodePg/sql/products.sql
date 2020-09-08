CREATE TABLE products
(
  productId SERIAL PRIMARY KEY,
  productName VARCHAR(255) NOT NULL,
  quantity INTEGER not NULL,
  price NUMERIC(5,2)
);