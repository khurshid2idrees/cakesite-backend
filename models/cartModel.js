const mongoose = require("mongoose");

const cartModalSchema = new mongoose.Schema({
    userId: {},
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            cakeMessage: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true })

const cartModal = mongoose.model("Cart", cartModalSchema);
module.exports = cartModal;