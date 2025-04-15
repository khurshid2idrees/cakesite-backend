const express = require("express");
const { createFlavour, getFlavours, updateFlavour, deleteFlavour } = require("../controllers/flavourController");
const { verifyToken } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, createFlavour);
router.get("/", getFlavours);
router.put("/:id", verifyToken, updateFlavour);
router.delete("/:id", verifyToken, deleteFlavour);

module.exports = router;
