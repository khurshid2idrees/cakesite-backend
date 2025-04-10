const Order = require("../models/orderModel");
const cartModal = require("../models/cartModel");

exports.createOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { items, shippingAddressId, paymentMethod, totalAmount } = req.body;

        const order = new Order({
            userId,
            items,
            shippingAddressId,
            paymentMethod: paymentMethod || 'Cash on Delivery',
            totalAmount,
        });

        await order.save();

        await cartModal.findOneAndUpdate(
            { userId },
            { $set: { items: [] } },
            { new: true }
        );

        res.status(201).json({ success: true, message: 'Order placed successfully', data: order });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const userId = req.user.userId; // assuming JWT middleware adds req.user
        const { orderId } = req.params;
        const { status } = req.body;

        const allowedStatuses = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Invalid status. Allowed: ${allowedStatuses.join(', ')}`
            });
        }

        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId },
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found or unauthorized access'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getOrdersAccordingToRole = async (req, res) => {
    try {
        const { userId, role } = req.user;

        const orders =
            role === "user"
                ? await Order.find({ userId }).sort({ createdAt: -1 }).populate('items.productId').populate('userId')
                : await Order.find().sort({ createdAt: -1 }).populate('items.productId').populate('userId')

        res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
