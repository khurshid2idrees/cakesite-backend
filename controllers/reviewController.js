const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const User = require("../models/userModel");

exports.addReview = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { comment, rating, productId } = req.body;
        if (!comment || !rating || !productId) {
            return res.status(400).json({
                status: "failed",
                message: "All fields are required",
            });
        }
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
        review = new reviewModel({
            userId,
            review: {
                productId,
                rating,
                comment
            },
        });

        await review.save();
        res.status(200).json({
            status: "success",
            message: "Review added successfully",
            data: review,
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            message: error.message,
        });
    }
}
