const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection (MongoDB Example)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error("DB Connection Error:", err));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API!");
});

module.exports = app; // Export the app instance
