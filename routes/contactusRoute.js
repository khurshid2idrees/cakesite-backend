const express = require("express");
const { addMessage, getMessages } = require("../controllers/conatctusController");
const router = express.Router();

router.post("/", addMessage);
router.get("/", getMessages);

module.exports = router;