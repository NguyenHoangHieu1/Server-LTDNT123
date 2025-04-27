const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Motherboard = require("../models/motherboard"); // adjust path as needed
const { protect } = require("../middleware/authMiddleware");

// @desc    Create a new Motherboard
// @route   POST /api/motherboards
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      socket,
      form_factor,
      max_memory,
      memory_slots,
      color,
    } = req.body;

    const motherboard = await Motherboard.create({
      name,
      price,
      socket,
      form_factor,
      max_memory,
      memory_slots,
      color,
    });

    if (motherboard) {
      res.status(201).json(motherboard);
    } else {
      res.status(400);
      throw new Error("Invalid motherboard data");
    }
  })
);

// @desc    Get all Motherboards
// @route   GET /api/motherboards
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const motherboards = await Motherboard.find().sort({ createdAt: -1 });
    res.json(motherboards);
  })
);

// @desc    Get Motherboard by ID
// @route   GET /api/motherboards/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const motherboard = await Motherboard.findById(req.params.id);
    if (motherboard) {
      res.json(motherboard);
    } else {
      res.status(404);
      throw new Error("Motherboard not found");
    }
  })
);

// @desc    Update a Motherboard
// @route   PUT /api/motherboards/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      socket,
      form_factor,
      max_memory,
      memory_slots,
      color,
    } = req.body;

    const motherboard = await Motherboard.findById(req.params.id);

    if (motherboard) {
      motherboard.name = name ?? motherboard.name;
      motherboard.price = price ?? motherboard.price;
      motherboard.socket = socket ?? motherboard.socket;
      motherboard.form_factor = form_factor ?? motherboard.form_factor;
      motherboard.max_memory = max_memory ?? motherboard.max_memory;
      motherboard.memory_slots = memory_slots ?? motherboard.memory_slots;
      motherboard.color = color ?? motherboard.color;

      const updatedMotherboard = await motherboard.save();
      res.json(updatedMotherboard);
    } else {
      res.status(404);
      throw new Error("Motherboard not found");
    }
  })
);

// @desc    Delete a Motherboard
// @route   DELETE /api/motherboards/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const motherboard = await Motherboard.findById(req.params.id);

    if (motherboard) {
      await motherboard.deleteOne();
      res.json({ message: "Motherboard removed" });
    } else {
      res.status(404);
      throw new Error("Motherboard not found");
    }
  })
);

module.exports = router;
