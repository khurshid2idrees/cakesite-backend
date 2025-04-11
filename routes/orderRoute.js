const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.use(verifyToken);

router.get('/', orderController.getOrdersAccordingToRole);
router.post('/', orderController.createOrder);
router.put('/:orderId', orderController.updateStatus);

module.exports = router;
