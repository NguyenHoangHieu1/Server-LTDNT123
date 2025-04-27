const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Mouse = require("../models/mouse");
const { protect } = require("../middleware/authMiddleware");

// @desc    Create a new Mouse
// @route   POST /api/mice
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      tracking_method,
      connection_type,
      max_dpi,
      hand_orientation,
      color,
    } = req.body;

    const mouse = await Mouse.create({
      name,
      price,
      tracking_method,
      connection_type,
      max_dpi,
      hand_orientation,
      color,
    });

    if (mouse) {
      res.status(201).json(mouse);
    } else {
      res.status(400);
      throw new Error("Invalid mouse data");
    }
  })
);

// @desc    Get all Mice
// @route   GET /api/mice
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const mice = await Mouse.find().sort({ createdAt: -1 });
    res.json(mice);
  })
);

// @desc    Get Mouse by ID
// @route   GET /api/mice/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const mouse = await Mouse.findById(req.params.id);
    if (mouse) {
      res.json(mouse);
    } else {
      res.status(404);
      throw new Error("Mouse not found");
    }
  })
);

// @desc    Update a Mouse
// @route   PUT /api/mice/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      tracking_method,
      connection_type,
      max_dpi,
      hand_orientation,
      color,
    } = req.body;

    const mouse = await Mouse.findById(req.params.id);

    if (mouse) {
      mouse.name = name ?? mouse.name;
      mouse.price = price ?? mouse.price;
      mouse.tracking_method = tracking_method ?? mouse.tracking_method;
      mouse.connection_type = connection_type ?? mouse.connection_type;
      mouse.max_dpi = max_dpi ?? mouse.max_dpi;
      mouse.hand_orientation = hand_orientation ?? mouse.hand_orientation;
      mouse.color = color ?? mouse.color;

      const updatedMouse = await mouse.save();
      res.json(updatedMouse);
    } else {
      res.status(404);
      throw new Error("Mouse not found");
    }
  })
);

// @desc    Delete a Mouse
// @route   DELETE /api/mice/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const mouse = await Mouse.findById(req.params.id);

    if (mouse) {
      await mouse.deleteOne();
      res.json({ message: "Mouse removed" });
    } else {
      res.status(404);
      throw new Error("Mouse not found");
    }
  })
);

module.exports = router;
