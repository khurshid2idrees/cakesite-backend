const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const ConnectDatabase = require("./config/ConnectDatabase");
const cookieParser = require("cookie-parser");

const app = express();

// Middleware
app.use(cors());   
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// connnect database`
ConnectDatabase();

// Import Routes
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoute");
const subcategoryRoutes = require("./routes/subCategoryRoute");
const productRoutes = require("./routes/productRoute");
const wishlistRoutes = require("./routes/wishlistRoute");

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);

module.exports = app;
