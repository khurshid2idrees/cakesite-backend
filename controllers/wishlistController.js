const productModel = require("../models/productModel");
const User = require("../models/userModel");
const wishListModel = require("../models/WishlistModel");

exports.createWishList = async (req, res) => {
    try {
        const userId = req.user.userId;
        const productId = req.params.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found",
            });
        }
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                status: "failed",
                message: "Product not found",
            });
        }

        let wishlist = await wishListModel.findOne({ userId });
        let index;

        if (!wishlist) {
            wishlist = new wishListModel({
                userId,
                products: [productId],
            });
        } else {
            index = wishlist.products.indexOf(productId);

            if (index > -1) {
                wishlist.products.splice(index, 1);
            } else {
                wishlist.products.push(productId);
            }
        }
        await wishlist.save();

        res.status(200).json({
            status: "success",
            message: index > -1 ? "Product removed from wishlist" : "Product added to wishlist",
            data: wishlist,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};

exports.getWishList = async (req, res) => {
    try {
        const userId = req.user.userId;
        const wishlist = await wishListModel.findOne({ userId }).populate("products");
        if (!wishlist) {
            return res.status(404).json({
                status: "failed",
                message: "Wishlist not found",
            });
        }
        res.status(200).json({
            status: "success",
            message: "Wishlist fetched successfully",
            data: wishlist,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
};