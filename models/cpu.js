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
    tdp: {
      type: Number,
      default: 0,
      required: false,
    },
    graphics: {
      type: mongoose.Schema.Types.Mixed, // Vì có thể là NULL
      default: null,
    },
    smt: {
      type: String,
      required: false,
      default: "",
    },
    socket: {
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
  { collection: "cpu" }
);

const cpu = mongoose.model("cpu", cpuSchema);

module.exports = cpu;
