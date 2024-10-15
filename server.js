const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define CartItem schema and model
const cartItemSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: { type: Number, default: 1 }
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

// API routes
app.post('/cart', async (req, res) => {
    const cartItem = new CartItem(req.body);
    try {
        await cartItem.save();
        res.status(201).send(cartItem);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/cart', async (req, res) => {
    try {
        const items = await CartItem.find();
        res.status(200).send(items);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
