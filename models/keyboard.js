const mongoose = require("mongoose");

// Schema cho bàn phím
const keyboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    style: {
      type: String,
      default: "",
      required: false,
    },
    switches: {
      type: String,
      default: "",
      required: false,
    },
    backlit: {
      type: String,
      default: "",
      required: false,
    },
    tenkeyless: {
      type: String,
      default: "",
      required: false,
    },
    connection_type: {
      type: String,
      default: "",
      required: false,
    },
    color: {
      type: String,
      default: "",
      required: false,
    },
    purpose: {
      type: String,
      default: "",
      required: false,
    },
    performance_score: {
      type: Number,
      default: 0,
      required: false,
    },
    image: {
      type: String,
      default: "",
      required: false,
    },
  },
  { collection: "keyboard" }
);

const Keyboard = mongoose.model("Keyboard", keyboardSchema);

module.exports = Keyboard;
