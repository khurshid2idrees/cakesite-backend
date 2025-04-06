const express = require('express');
const { createAddress, getUserAddresses, updateAddress, deleteAddress } = require('../controllers/addressController');
const { verifyToken } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, createAddress);
router.get('/', verifyToken, getUserAddresses);
router.put('/:id', verifyToken, updateAddress);
router.delete('/:id', verifyToken, deleteAddress);

module.exports = router;
