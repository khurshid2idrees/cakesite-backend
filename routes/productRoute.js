const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const { createProduct } = require("../controllers/productController");

// Route to create a new product
router.post("/create", upload.array("images", 5), createProduct);

module.exports = router;
