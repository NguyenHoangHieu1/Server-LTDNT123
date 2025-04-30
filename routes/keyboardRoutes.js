const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Keyboard = require("../models/keyboard");
const { protect } = require("../middleware/authMiddleware");

// @desc    Create a new Keyboard
// @route   POST /api/keyboards
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      style,
      switches,
      backlit,
      tenkeyless,
      connection_type,
      color,
    } = req.body;

    const keyboard = await Keyboard.create({
      name,
      price,
      style,
      switches,
      backlit,
      tenkeyless,
      connection_type,
      color,
    });

    if (keyboard) {
      res.status(201).json(keyboard);
    } else {
      res.status(400);
      throw new Error("Invalid keyboard data");
    }
  })
);

// @desc    Get all Keyboards
// @route   GET /api/keyboards
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const keyboards = await Keyboard.find().sort({ createdAt: -1 });
    res.json(keyboards);
  })
);

// @desc    Get Keyboards with pagination
// @route   GET /api/keyboards/paginated?page=1&limit=10
// @access  Private
router.get(
  "/paginated",
  protect,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Keyboard.countDocuments();
    const items = await Keyboard.find()
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

// @desc    Get Keyboard by ID
// @route   GET /api/keyboards/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const keyboard = await Keyboard.findById(req.params.id);
    if (keyboard) {
      res.json(keyboard);
    } else {
      res.status(404);
      throw new Error("Keyboard not found");
    }
  })
);

// @desc    Update a Keyboard
// @route   PUT /api/keyboards/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      style,
      switches,
      backlit,
      tenkeyless,
      connection_type,
      color,
    } = req.body;

    const keyboard = await Keyboard.findById(req.params.id);

    if (keyboard) {
      keyboard.name = name ?? keyboard.name;
      keyboard.price = price ?? keyboard.price;
      keyboard.style = style ?? keyboard.style;
      keyboard.switches = switches ?? keyboard.switches;
      keyboard.backlit = backlit ?? keyboard.backlit;
      keyboard.tenkeyless = tenkeyless ?? keyboard.tenkeyless;
      keyboard.connection_type = connection_type ?? keyboard.connection_type;
      keyboard.color = color ?? keyboard.color;

      const updatedKeyboard = await keyboard.save();
      res.json(updatedKeyboard);
    } else {
      res.status(404);
      throw new Error("Keyboard not found");
    }
  })
);

// @desc    Delete a Keyboard
// @route   DELETE /api/keyboards/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const keyboard = await Keyboard.findById(req.params.id);

    if (keyboard) {
      await keyboard.deleteOne();
      res.json({ message: "Keyboard removed" });
    } else {
      res.status(404);
      throw new Error("Keyboard not found");
    }
  })
);

module.exports = router;
