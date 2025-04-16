const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String], // Array of image URLs
      required: [true, "Product images are required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category ID is required"],
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: false,
    },
    flavourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flavour",
      required: [true, "Flavour ID is required"],
    },
    price: {
      type: Map, // Object storing prices for different weights
      of: Number, // The value (price) should be a number
      required: [true, "Price is required"],
    },
    weight: {
      type: [String], // Array of strings
      required: [true, "At least one weight option is required"],
    },
    discountPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
