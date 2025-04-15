const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/", upload.array("image", 5), createCategory);
router.get("/", getCategories);
router.put("/:id", upload.array("image", 5), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
