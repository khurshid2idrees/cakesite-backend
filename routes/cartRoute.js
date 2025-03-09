const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { addToCart, getCart, deleteFromCart } = require("../controllers/cartController");
const router = express.Router();

router.post("/", verifyToken, addToCart)
router.get("/", verifyToken, getCart)
router.delete("/:id", verifyToken, deleteFromCart)

module.exports = router;