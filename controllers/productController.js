const ProductModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
const { uploadImagesToCloudinary } = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
    try {
        const { price, weight, discountPercent, name, description, categoryId, subCategoryId } = req.body;

        // Check if all required fields are present
        if (!price || !weight || !name || !description || !categoryId || !subCategoryId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Parse price if it's sent as a JSON string
        let parsedPrice;
        try {
            parsedPrice = typeof price === "string" ? JSON.parse(price) : price;
        } catch (err) {
            return res.status(400).json({ success: false, message: "Invalid price format" });
        }

        // Parse weight to ensure it's an array
        let parsedWeight;
        if (typeof weight === "string") {
            try {
                parsedWeight = JSON.parse(weight); // Convert string to array if JSON format
            } catch (err) {
                parsedWeight = weight.split(",").map((w) => w.trim()); // Split comma-separated values
            }
        } else {
            parsedWeight = weight;
        }

        // Validate weight values
        const allowedWeights = ["250g", "500g", "1kg", "2kg", "3kg", "4kg"];
        const invalidWeights = parsedWeight.filter((w) => !allowedWeights.includes(w));
        if (invalidWeights.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Invalid weight values: ${invalidWeights.join(", ")}`,
            });
        }

        // Upload images to Cloudinary
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            imageUrls = await uploadImagesToCloudinary(req.files);
        } else {
            return res.status(400).json({ success: false, message: "At least one image is required" });
        }

        // Create and save product
        const product = new ProductModel({
            images: imageUrls,
            price: new Map(Object.entries(parsedPrice)), // Convert price object to Map
            weight: parsedWeight,
            discountPercent: discountPercent || 0, // Default to 0 if not provided
            name,
            description,
            categoryId,
            subCategoryId
        });

        await product.save();
        res.status(201).json({ success: true, product });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getProducts = async (req, res) => {
    try {
        const { page, limit, minPrice, maxPrice, categoryId, subCategoryId } = req.query;

        // If no query params, return all products
        if (!page && !limit && !minPrice && !maxPrice && !categoryId && !subCategoryId) {
            const products = await ProductModel.find()
                .populate({ path: "categoryId", select: "name" })
                .populate({ path: "subCategoryId", select: "name" });

            return res.status(200).json({
                success: true,
                message: "All products fetched successfully",
                data: products
            });
        }

        // Handle filtering & pagination if query params exist
        let filter = {};
        if (minPrice || maxPrice) {
            filter["price"] = {};
            if (minPrice) filter["price"]["$gte"] = parseFloat(minPrice);
            if (maxPrice) filter["price"]["$lte"] = parseFloat(maxPrice);
        }
        if (categoryId) filter["categoryId"] = categoryId;
        if (subCategoryId) filter["subCategoryId"] = subCategoryId;

        const currentPage = parseInt(page) || 1;
        const perPage = parseInt(limit) || 10;
        const skip = (currentPage - 1) * perPage;

        const filteredProducts = await ProductModel.find(filter)
            .populate({ path: "categoryId", select: "name" })
            .populate({ path: "subCategoryId", select: "name" })
            .skip(skip)
            .limit(perPage);

        const totalProducts = await ProductModel.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / perPage);

        res.status(200).json({
            success: true,
            message: "Filtered products fetched successfully",
            data: filteredProducts,
            pagination: {
                currentPage,
                totalPages,
                totalProducts
            }
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id).populate({ path: "categoryId", select: "name" }).populate({ path: "subCategoryId", select: "name" });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        const reviews = await reviewModel.find({ "review.productId": product._id }).populate({ path: "userId", select: "firstName lastName" });
        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: {
                ...product?._doc,
                reviews
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
