const SubcategoryModel = require("../models/subCategoryModel");
const CategoryModel = require("../models/categoryModel");

// Create Subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    if (!name || !categoryId) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Both name and categoryId are required",
          error: null,
        });
    }

    // Check if category exists
    const category = await CategoryModel.findById(categoryId);
    if (!category)
      return res
        .status(404)
        .json({ status: "failed", message: "Category not found", error: null });

    // Create subcategory
    const subcategory = new SubcategoryModel({ name, category: categoryId });
    await subcategory.save();

    // Add subcategory to category
    category.subcategories.push(subcategory._id);
    await category.save();

    res
      .status(201)
      .json({
        status: "success",
        message: "Subcategory created successfully",
        data: subcategory,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "failed",
        message: "Server error",
        error: error.message,
      });
  }
};

// Get All Subcategories
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await SubcategoryModel.find().populate("category");
    res
      .status(200)
      .json({
        status: "success",
        message: "Subcategories fetched successfully",
        data: subcategories,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "failed",
        message: "Server error",
        error: error.message,
      });
  }
};

// Update Subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const subcategory = await SubcategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!subcategory) {
      return res
        .status(404)
        .json({
          status: "failed",
          message: "Subcategory not found",
          error: null,
        });
    }

    res
      .status(200)
      .json({
        status: "success",
        message: "Subcategory updated successfully",
        data: subcategory,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "failed",
        message: "Server error",
        error: error.message,
      });
  }
};

// Delete Subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await SubcategoryModel.findByIdAndDelete(id);
    if (!subcategory) {
      return res
        .status(404)
        .json({
          status: "failed",
          message: "Subcategory not found",
          error: null,
        });
    }

    // Remove subcategory from category
    await Category.findByIdAndUpdate(subcategory.category, {
      $pull: { subcategories: subcategory._id },
    });

    res
      .status(200)
      .json({
        status: "success",
        message: "Subcategory deleted successfully",
        data: null,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "failed",
        message: "Server error",
        error: error.message,
      });
  }
};
