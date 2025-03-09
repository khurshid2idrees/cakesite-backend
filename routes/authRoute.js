const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getLoggedInUser, logoutUser } = require("../controllers/authController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Register Route
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-user", verifyToken, getLoggedInUser)
router.get("/logout", logoutUser);

module.exports = router;
