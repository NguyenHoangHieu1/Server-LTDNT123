const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Memory = require("../models/memory"); // hoặc đường dẫn đến file model của bạn
const { protect } = require("../middleware/authMiddleware");
const { transformItems, transformItem } = require("../utils/transformItems");
const TYPE = "RAM";
// @desc    Create a new Memory module
// @route   POST /api/memory
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      speed,
      modules,
      price_per_gb,
      color,
      first_word_latency,
      cas_latency,
    } = req.body;

    const memory = await Memory.create({
      name,
      price,
      speed,
      modules,
      price_per_gb,
      color,
      first_word_latency,
      cas_latency,
    });

    if (memory) {
      res.status(201).json(memory);
    } else {
      res.status(400);
      throw new Error("Invalid memory data");
    }
  })
);

// @desc    Get all Memory modules
// @route   GET /api/memory
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const memories = await Memory.find().sort({ createdAt: -1 });
    res.json(transformItems(TYPE, memories));
  })
);

// @desc    Get Memory modules with pagination
// @route   GET /api/memory/paginated?page=1&limit=10
// @access  Private
router.get(
  "/paginated",
  protect,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const keyword = req.query.name
      ? {
          name: { $regex: req.query.name, $options: "i" }, // không phân biệt hoa thường
        }
      : {};
    const total = await Memory.countDocuments();
    const items = await Memory.find(keyword)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: transformItems(TYPE, items),
    });
  })
);

// @desc    Get Memory by ID
// @route   GET /api/memory/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const memory = await Memory.findById(req.params.id);
    if (memory) {
      res.json(transformItem(TYPE, memory));
    } else {
      res.status(404);
      throw new Error("Memory not found");
    }
  })
);

// @desc    Update a Memory module
// @route   PUT /api/memory/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      speed,
      modules,
      price_per_gb,
      color,
      first_word_latency,
      cas_latency,
    } = req.body;

    const memory = await Memory.findById(req.params.id);

    if (memory) {
      memory.name = name ?? memory.name;
      memory.price = price ?? memory.price;
      memory.speed = speed ?? memory.speed;
      memory.modules = modules ?? memory.modules;
      memory.price_per_gb = price_per_gb ?? memory.price_per_gb;
      memory.color = color ?? memory.color;
      memory.first_word_latency =
        first_word_latency ?? memory.first_word_latency;
      memory.cas_latency = cas_latency ?? memory.cas_latency;

      const updatedMemory = await memory.save();
      res.json(updatedMemory);
    } else {
      res.status(404);
      throw new Error("Memory not found");
    }
  })
);

// @desc    Delete a Memory module
// @route   DELETE /api/memory/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const memory = await Memory.findById(req.params.id);

    if (memory) {
      await memory.deleteOne();
      res.json({ message: "Memory removed" });
    } else {
      res.status(404);
      throw new Error("Memory not found");
    }
  })
);

module.exports = router;
