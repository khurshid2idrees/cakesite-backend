const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const ConnectDatabase = require("./config/ConnectDatabase");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
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
const cartRoutes = require("./routes/cartRoute");
const reviewRoutes = require("./routes/reviewRoute");
const addressRoutes = require("./routes/addressRoute");
const orderRoutes = require("./routes/orderRoute")

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/subcategory", subcategoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/order", orderRoutes);

module.exports = app;
