const mongoose = require("mongoose");

const driveSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      default: 0,
      required: false,
    },
    price_per_gb: {
      type: Number,
      default: 0,
      required: false,
    },
    type: {
      default: "",
      type: String,
      required: false,
    },
    cache: {
      type: Number,
      default: 0,
      required: false,
    },
    form_factor: {
      type: String,
      default: "",
      required: false,
    },
    interface: {
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
  {
    collection: "internal-hard-drive",
  }
);

const Drive = mongoose.model("Drive", driveSchema);

module.exports = Drive;
