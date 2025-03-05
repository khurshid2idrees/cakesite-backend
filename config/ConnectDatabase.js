const mongoose = require("mongoose");
require("dotenv").config();

async function DatabaseConnect() {
  try {
    mongoose.connect(process.env.DATABASE_URI);

    const db = mongoose.connection;

    db.on("error", (error) => {
      console.error("MongoDB Connection Error:", error);
    });

    db.once("open", () => {
      console.log("✅ MongoDB Connected Successfully");
    });
  } catch (error) {
    console.error("❌ Database Connection Failed:", error);
    process.exit(1);
  }
}

module.exports = DatabaseConnect;
