const ProductModel = require("../models/productModel");
const { uploadImagesToCloudinary } = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
    try {
        const { price, weight, cakeMessage, discountPercent } = req.body;

        // Upload images to Cloudinary
        const imageUrls = await uploadImagesToCloudinary(req.files);

        const product = new ProductModel({
            images: imageUrls,
            price,
            weight,
            cakeMessage,
            discountPercent,
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
