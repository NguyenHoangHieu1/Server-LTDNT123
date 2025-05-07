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
      required: true,
    },
    form_factor: {
      type: String,
      required: true,
    },
    max_memory: {
      type: Number,
      required: true,
    },
    memory_slots: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    memory_type: {
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
  },
  { collection: "motherboard" }
);

const Motherboard = mongoose.model("Motherboard", motherboardSchema);

module.exports = Motherboard;
