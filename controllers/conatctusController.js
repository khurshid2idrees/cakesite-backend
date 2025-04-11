const Contact = require("../models/contactusModel");

exports.addMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(200).json({ message: "Your message has been received!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res
      .status(200)
      .json({
        success: true,
        message: "Messages fetched successfully",
        data: messages,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
