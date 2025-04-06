const Address = require("../models/addressModel");

// Create a new address
exports.createAddress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const address = new Address({ ...req.body, userId });
        await address.save();
        res.status(201).json({
            success: true,
            message: "Address added successfully",
            data: address
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all addresses for the logged-in user
exports.getUserAddresses = async (req, res) => {
    try {
        const userId = req.user.userId;
        const addresses = await Address.find({ userId });
        res.status(201).json({
            success: true,
            message: "Address fetched successfully",
            data: addresses
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an address
exports.updateAddress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const address = await Address.findOneAndUpdate(
            { _id: req.params.id, userId },
            req.body,
            { new: true }
        );
        if (!address) return res.status(404).json({ message: 'Address not found' });
        res.status(201).json({
            success: true,
            message: "Address updated successfully",
            data: address
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
    try {
        const userId = req.user.userId;
        const address = await Address.findOneAndDelete({ _id: req.params.id, userId });
        if (!address) return res.status(404).json({ message: 'Address not found' });
        res.status(200).json({
            success: true,
            message: "Address deleted successfully",
            data: address
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
