const flavourModel = require("../models/flavourModel");

// Create Category
exports.createFlavour = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "failed",
        message: "flavour name is required",
        error: null,
      });
    }

    const flavour = new flavourModel({ name });
    await flavour.save();

    res.status(201).json({
      status: "success",
      message: "Flavour created successfully",
      data: flavour,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Categories
exports.getFlavours = async (req, res) => {
  try {
    const flavours = await flavourModel.find();
    res.status(200).json({
      status: "success",
      message: "Flavours fetched successfully",
      data: flavours,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Category
exports.updateFlavour = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const flavour = await flavourModel.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!flavour) {
      return res
        .status(404)
        .json({ status: "failed", message: "flavour not found", error: null });
    }

    res.status(200).json({
      status: "success",
      message: "Flavour updated successfully",
      data: flavour,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Category
exports.deleteFlavour = async (req, res) => {
  try {
    const { id } = req.params;

    const flavour = await flavourModel.findByIdAndDelete(id);

    if (!flavour) {
      return res
        .status(404)
        .json({ status: "failed", message: "flavour not found", error: null });
    }

    res.status(200).json({
      status: "success",
      message: "Flavour deleted successfully",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};
