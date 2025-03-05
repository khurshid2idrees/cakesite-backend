const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const ConnectDatabase = require('./config/ConnectDatabase')


const app = express();

// Middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json());


// connnect database 

ConnectDatabase();

 // Import Routes
const authRoutes = require("./routes/authRoute");


app.use("/api/auth", authRoutes);
// app.use("/api/products", productRoutes);

// // Default Route
// app.get("/", (req, res) => {
//     res.send("Welcome to the E-commerce API!");
// });

module.exports = app; // Export the app instance
