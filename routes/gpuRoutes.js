const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const GPU = require("../models/gpu"); // Model GPU
const { protect } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// @desc    Create a new GPU
// @route   POST /api/gpus
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      chipset,
      memory,
      core_clock,
      boost_clock,
      color,
      length,
    } = req.body;

    const gpu = await GPU.create({
      name,
      price,
      chipset,
      memory,
      core_clock,
      boost_clock,
      color,
      length,
    });

    if (gpu) {
      res.status(201).json(gpu);
    } else {
      res.status(400);
      throw new Error("Invalid GPU data");
    }
  })
);

// @desc    Get all GPUs
// @route   GET /api/gpus
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const gpus = await GPU.find().sort({ createdAt: -1 });
    res.json(gpus);
  })
);

// @desc    Get GPUs with pagination
// @route   GET /api/gpus/paginated?page=1&limit=10
// @access  Private
router.get(
  "/paginated",
  protect,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await GPU.countDocuments();
    const items = await GPU.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items,
    });
  })
);

// @desc    Get GPU by ID
// @route   GET /api/gpus/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const gpu = await GPU.findOne({ id: req.params.id });
    if (gpu) {
      res.json(gpu);
    } else {
      res.status(404);
      throw new Error("GPU not found");
    }
  })
);

// @desc    Update a GPU
// @route   PUT /api/gpus/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      chipset,
      memory,
      core_clock,
      boost_clock,
      color,
      length,
    } = req.body;

    const gpu = await GPU.findOne({ id: req.params.id });

    if (gpu) {
      gpu.name = name || gpu.name;
      gpu.price = price || gpu.price;
      gpu.chipset = chipset || gpu.chipset;
      gpu.memory = memory || gpu.memory;
      gpu.core_clock = core_clock || gpu.core_clock;
      gpu.boost_clock = boost_clock || gpu.boost_clock;
      gpu.color = color || gpu.color;
      gpu.length = length || gpu.length;

      const updatedGPU = await gpu.save();
      res.json(updatedGPU);
    } else {
      res.status(404);
      throw new Error("GPU not found");
    }
  })
);

// @desc    Delete a GPU
// @route   DELETE /api/gpus/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const gpu = await GPU.findOne({ id: req.params.id });

    if (gpu) {
      await gpu.deleteOne();
      res.json({ message: "GPU removed" });
    } else {
      res.status(404);
      throw new Error("GPU not found");
    }
  })
);

module.exports = router;
