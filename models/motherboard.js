const mongoose = require("mongoose");

// Schema cho mainboard
const motherboardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    socket: {
      type: String,
      default: "",
      required: false,
    },
    form_factor: {
      type: String,
      default: "",
      required: false,
    },
    max_memory: {
      default: 0,
      type: Number,
      required: false,
    },
    memory_slots: {
      default: 0,
      type: Number,
      required: false,
    },
    color: {
      type: String,
      default: "",
      required: false,
    },
    memory_type: {
      type: String,
      default: "",
      required: false,
    },
    purpose: {
      default: "",
      type: String,
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
  { collection: "motherboard" }
);

const Motherboard = mongoose.model("Motherboard", motherboardSchema);

module.exports = Motherboard;
