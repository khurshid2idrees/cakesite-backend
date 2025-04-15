const mongoose = require("mongoose");

const flavourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Flavour name is required"],
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const flavourModel = mongoose.model("Flavour", flavourSchema);
module.exports = flavourModel;
