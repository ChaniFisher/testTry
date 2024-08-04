const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    myCustomId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const cartSchema = mongoose.Schema({
    products: [productSchema],
});

module.exports = mongoose.model('Cart', cartSchema);