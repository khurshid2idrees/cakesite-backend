const CategoryModel = require("../models/categoryModel");

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Category name is required",
          error: null,
        });
    }

    const category = new CategoryModel({ name });
    await category.save();

    res
      .status(201)
      .json({
        status: "success",
        message: "Category created successfully",
        data: category,
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

// Get All Categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate("subcategories");
    res
      .status(200)
      .json({
        status: "success",
        message: "Categories fetched successfully",
        data: categories,
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

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", message: "Category not found", error: null });
    }

    res
      .status(200)
      .json({
        status: "success",
        message: "Category updated successfully",
        data: category,
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

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
      return res
        .status(404)
        .json({ status: "failed", message: "Category not found", error: null });
    }

    res
      .status(200)
      .json({
        status: "success",
        message: "Category deleted successfully",
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
