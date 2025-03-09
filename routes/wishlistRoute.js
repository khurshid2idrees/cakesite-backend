const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { createWishList, getWishList } = require("../controllers/wishlistController");
const router = express.Router();

router.post("/:id", verifyToken, createWishList)
router.get("/", verifyToken, getWishList)

module.exports = router;