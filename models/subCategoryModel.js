const mongoose = require("mongoose");

const subcategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Subcategory name is required"],
            trim: true,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        }
    },
    { timestamps: true }
);

const SubcategoryModel = mongoose.model("Subcategory", subcategorySchema);
module.exports = SubcategoryModel;
