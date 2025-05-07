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
      required: true,
    },
    memory: {
      type: Number,
      required: true,
    },
    core_clock: {
      type: Number,
      required: true,
    },
    boost_clock: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
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
  { collection: "video-card" }
);

const GPU = mongoose.model("GPU", gpuSchema);

module.exports = GPU;
