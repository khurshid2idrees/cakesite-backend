const cartModal = require("../models/cartModel");
const User = require("../models/userModel");

exports.addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, price, cakeMessage } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ status: "failed", message: "User not found" });
        }
        let cartList = await cartModal.findOne({ userId });
        if (!cartList) {
            cartList = new cartModal({ userId, items: [{ productId, price, cakeMessage }] });
        } else {

            cartList.items.push({ productId, price, cakeMessage });
        }
        await cartList.save();
        res.status(200).json({ status: "success", message: "Product added to cart successfully", data: cartList });

    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
}

exports.getCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cartList = await cartModal.findOne({ userId }).populate("items.productId");
        if (!cartList) {
            return res.status(404).json({ status: "failed", message: "Cart not found" });
        }
        res.status(200).json({ status: "success", message: "Cart fetched successfully", data: cartList });
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
}

exports.deleteFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.params.id;
        const cartList = await cartModal.findOne({ userId });
        if (!cartList) {
            return res.status(404).json({ status: "failed", message: "Cart not found" });
        }
        cartList.items = cartList.items.filter((item) => item?._id?.toString() !== itemId);
        await cartList.save();
        res.status(200).json({ status: "success", message: "Product removed from cart successfully", data: cartList });
    } catch (error) {
        res.status(500).json({ status: "failed", message: error.message });
    }
}