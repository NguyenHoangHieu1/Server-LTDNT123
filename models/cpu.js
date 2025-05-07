const mongoose = require("mongoose");
// "name":string"amd ryzen 5 5600x"
// "price":float168.99
// "core_count":int6
// "core_clock":float3.7
// "boost_clock":float4.6
// "tdp":int65
// "graphics":NULL
// "smt":booltrue

const cpuSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    core_count: {
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
    tdp: {
      type: Number,
      required: true,
    },
    graphics: {
      type: mongoose.Schema.Types.Mixed, // Vì có thể là NULL
      default: null,
    },
    smt: {
      type: Boolean,
      required: true,
    },
    socket: {
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
  { collection: "cpu" }
);

const cpu = mongoose.model("cpu", cpuSchema);

module.exports = cpu;
