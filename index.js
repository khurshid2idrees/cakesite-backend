const express = require("express");
const app = require("./app"); 
require("dotenv").config();

// Define Port
const PORT = process.env.PORT || 5001;

// Start the Express Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
