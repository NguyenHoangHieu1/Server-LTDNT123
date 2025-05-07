const mongoose = require("mongoose");

// Schema cho RAM
const memorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    price_per_gb: {
      type: Number,
      default: 0,
      required: false,
    },
    color: {
      default: "",
      type: String,
      required: false,
    },
    first_word_latency: {
      default: 0,
      type: Number,
      required: false,
    },
    cas_latency: {
      default: 0,
      type: Number,
      required: false,
    },
    speed_mhz: {
      default: 0,
      type: Number,
      required: false,
    },
    ddr_type: {
      type: String,
      default: "",
      required: false,
    },
    total_capacity: {
      type: Number,
      default: 0,
      required: false,
    }, // tính bằng GB
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
      default: "",
      type: String,
      required: false,
    },
  },
  { collection: "memory" }
);

const memory = mongoose.model("memory", memorySchema);

module.exports = memory;
