const express = require('express');
const { getCardsData } = require('../controllers/dashboardController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', verifyToken, getCardsData);

module.exports = router;
