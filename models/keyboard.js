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
      required: true,
    },
    switches: {
      type: String,
      required: true,
    },
    backlit: {
      type: String,
      required: true,
    },
    tenkeyless: {
      type: String,
      required: false,
    },
    connection_type: {
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
  { collection: "keyboard" }
);

const Keyboard = mongoose.model("Keyboard", keyboardSchema);

module.exports = Keyboard;
