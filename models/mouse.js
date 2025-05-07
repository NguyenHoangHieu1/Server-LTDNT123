const mongoose = require("mongoose");

// Schema cho mouse
const mouseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tracking_method: {
      type: String,
      required: true,
    },
    connection_type: {
      type: String,
      required: true,
    },
    max_dpi: {
      type: Number,
      required: true,
    },
    hand_orientation: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    purpose: {
      type: String,
      required: true,
    },
    performance_score: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { collection: "mouse" }
);

const Mouse = mongoose.model("Mouse", mouseSchema);

module.exports = Mouse;
