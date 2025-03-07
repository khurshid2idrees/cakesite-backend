const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    images: {
      type: [String], // Array of image URLs
      required: [true, "Product images are required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    weight: {
      type: String,
      enum: ["250g", "500g", "1kg", "2kg", "3kg", "4kg"], // Specific weight options
      required: [true, "Weight is required"],
    },
    cakeMessage: {
      type: String,
      trim: true,
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
