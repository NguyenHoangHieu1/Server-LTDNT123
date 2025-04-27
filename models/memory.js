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
    speed: {
      type: [Number], // Mảng số, ví dụ [4, 3200]
      required: true,
    },
    modules: {
      type: [Number], // Mảng số, ví dụ [2, 8]
      required: true,
    },
    price_per_gb: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    first_word_latency: {
      type: Number,
      required: true,
    },
    cas_latency: {
      type: Number,
      required: true,
    },
  },
  {collection:"memory"}

);

const memory = mongoose.model("memory", memorySchema);

module.exports = memory;
