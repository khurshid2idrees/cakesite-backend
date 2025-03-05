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

// connnect database
ConnectDatabase();

// Import Routes
const authRoutes = require("./routes/authRoute");

app.use("/api/auth", authRoutes);

module.exports = app;
