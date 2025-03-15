const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const { addReview } = require("../controllers/reviewController");
const router = express.Router();

router.post("/", verifyToken, addReview);

module.exports = router;