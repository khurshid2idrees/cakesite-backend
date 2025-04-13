const Order = require("../models/orderModel");
const User = require("../models/userModel");


exports.getCardsData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "user" });

    const totalOrders = await Order.countDocuments();

    const totalDeliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    // Calculate total sales (sum of totalAmount in all orders)
    const totalSalesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
        },
      },
    ]);
    const totalSales = totalSalesData[0]?.totalSales || 0;

    res.status(200).json({
      status: "success",
      data: {
        totalUsers,
        totalOrders,
        totalDeliveredOrders,
        totalSales,
      },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
};
