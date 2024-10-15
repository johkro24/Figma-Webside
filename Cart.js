const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    id: String,
    name: String,
    price: Number,
    quantity: {
        type: Number,
        default: 1,
    }
});

module.exports = mongoose.model('Cart', CartSchema);
