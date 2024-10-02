const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'shopping_cart_db'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

// Add item to the cart
app.post('/add-to-cart', (req, res) => {
  const { user_id, product_name, product_price } = req.body;
  let sql = 'INSERT INTO cart_items (user_id, product_name, product_price, quantity) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, product_name, product_price, 1], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Item added to cart', result });
  });
});

// Get cart items for a user
app.get('/cart/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  let sql = 'SELECT * FROM cart_items WHERE user_id = ?';
  db.query(sql, [user_id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Remove item from cart
app.delete('/cart/:cart_id', (req, res) => {
  const cart_id = req.params.cart_id;
  let sql = 'DELETE FROM cart_items WHERE cart_id = ?';
  db.query(sql, [cart_id], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Item removed from cart', result });
  });
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
