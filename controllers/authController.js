const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user?.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
    });

    res.status(200).json({
      status: "success",
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

exports.getLoggedInUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    res.status(200).json({
      status: "success",
      message: "Verified User",
      data: user,
    })
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Server error", error: error.message });
  }
}

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, email, phoneNumber } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, phoneNumber },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      message: "Updated Profile Successfully",
      data: updatedUser,
    })
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Server error", error: error.message });
  }
}

exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: "success", message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ status: "failed", message: "Server error", error: error.message });
  }
};