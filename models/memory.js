const mongoose = require("mongoose");

// Schema cho RAM
const memorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    price_per_gb: { type: Number, required: true },
    color: { type: String, required: true },
    first_word_latency: { type: Number, required: true },
    cas_latency: { type: Number, required: true },
    speed_mhz: { type: Number, required: true },
    ddr_type: { type: String, required: true },
    total_capacity: { type: Number, required: true }, // tính bằng GB
    purpose: { type: String, required: true },
    performance_score: { type: Number, required: true },
  },
  { collection: "memory" }
);

const memory = mongoose.model("memory", memorySchema);

module.exports = memory;
