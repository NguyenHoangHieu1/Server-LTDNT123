const mongoose = require("mongoose");

const buildSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    cpuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cpu",
      required: true,
    },
    gpuId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gpu",
      required: true,
    },
    driveId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "drive",
      required: true,
    },
    keyboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "keyboard",
      required: true,
    },
    memoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "memory",
      required: true,
    },
    motherboardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "motherboard",
      required: true,
    },
    mouseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mouse",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "builds" }
);

const Build = mongoose.model("Build", buildSchema);

module.exports = Build;
