const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cart item schema
const cartItemSchema = new mongoose.Schema({
  id: String,
  name: String,
  price: Number,
  quantity: { type: Number, default: 1 },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);

// POST route to add item to cart
app.post("/cart", async (req, res) => {
  const { id, name, price } = req.body;
  try {
    let cartItem = await CartItem.findOne({ id });

    // If item exists, increase quantity
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      // Else create new item
      cartItem = new CartItem({ id, name, price });
    }
    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error adding item", error });
  }
});

// PUT route to update item quantity
app.put("/cart/:id", async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const cartItem = await CartItem.findOneAndUpdate(
      { id },
      { quantity },
      { new: true }
    );
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(cartItem);
  } catch (error) {
    res.status(500).json({ message: "Error updating quantity", error });
  }
});

// DELETE route to remove item from cart
app.delete("/cart/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const cartItem = await CartItem.findOneAndDelete({ id });
    if (!cartItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item removed", cartItem });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
});

// GET route to fetch all cart items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await CartItem.find();
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart items", error });
  }
});

// MongoDB connection string
const mongoURI =
  "mongodb://johkro24:wcAu33ZoS9bSyHhR@users.mongodb.net/FitnessCenter?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Default route to serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "Index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
