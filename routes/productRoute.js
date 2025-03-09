const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { createProduct, getProductById, getProducts } = require("../controllers/productController");

// Route to create a new product
router.post("/create", upload.array("images", 5), createProduct);
router.get("/", getProducts)
router.get("/:id", getProductById)

module.exports = router;
