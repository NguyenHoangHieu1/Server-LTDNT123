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
      default: "",
      type: String,
      required: false,
    },
    connection_type: {
      default: "",
      type: String,
      required: false,
    },
    max_dpi: {
      type: Number,
      required: false,
      default: 0,
    },
    hand_orientation: {
      default: "",
      type: String,
      required: false,
    },
    color: {
      default: "",
      type: String,
      required: false,
    },
    purpose: {
      default: "",
      type: String,
      required: false,
    },
    performance_score: {
      default: 0,
      type: Number,
      required: false,
    },
    image: {
      default: "",
      type: String,
      required: false,
    },
  },
  { collection: "mouse" }
);

const Mouse = mongoose.model("Mouse", mouseSchema);

module.exports = Mouse;
