const mongoose = require("mongoose");

// Schema cho card đồ họa
const gpuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    chipset: {
      type: String,
      required: false,
      default: "",
    },
    memory: {
      type: Number,
      default: 0,
      required: false,
    },
    core_clock: {
      type: Number,
      default: 0,
      required: false,
    },
    boost_clock: {
      type: Number,
      default: 0,
      required: false,
    },
    color: {
      type: String,
      required: false,
    },
    length: {
      default: 0,
      type: Number,
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
      default: "",
      type: String,
      required: false,
    },
  },
  { collection: "video-card" }
);

const GPU = mongoose.model("GPU", gpuSchema);

module.exports = GPU;
