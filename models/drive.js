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
      required: true,
    },
    price_per_gb: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    cache: {
      type: Number,
      required: true,
    },
    form_factor: {
      type: String,
      required: true,
    },
    interface: {
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
    image: {
      type: String,
      required: false,
    },
  },
  {
    collection: "internal-hard-drive",
  }
);

const Drive = mongoose.model("Drive", driveSchema);

module.exports = Drive;
