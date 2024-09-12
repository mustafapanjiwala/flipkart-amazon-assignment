const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    listingId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false },
    quantity: { type: Number, required: true },
    sellerId: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;