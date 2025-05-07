const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Mouse = require("../models/mouse");
const { protect } = require("../middleware/authMiddleware");
const { transformItems, transformItem } = require("../utils/transformItems");
const TYPE = "Mouse";

// @desc    Create a new Mouse
// @route   POST /api/mouse
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
// @route   GET /api/mouse
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const mice = await Mouse.find().sort({ createdAt: -1 });
    res.json(transformItems(TYPE, mice));
  })
);

// @desc    Get Mice with pagination
// @route   GET /api/mouse/paginated?page=1&limit=10
// @access  Private
router.get(
  "/paginated",
  protect,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Mouse.countDocuments();
    const items = await Mouse.find()
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

// @desc    Search mouse by name
// @route   GET /api/mouse/search?name=search_term
// @access  Private
router.get(
  "/search",
  protect,
  asyncHandler(async (req, res) => {
    const name = req.query.name || "";

    const mouse = await Mouse.find({
      name: { $regex: name, $options: "i" }, // Tìm kiếm không phân biệt hoa thường
    }).sort({ createdAt: -1 });

    res.json(transformItems(TYPE, mouse));
  })
);

// @desc    Get Mouse by ID
// @route   GET /api/mouse/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const mouse = await Mouse.findById(req.params.id);
    if (mouse) {
      res.json(transformItem(TYPE, mouse));
    } else {
      res.status(404);
      throw new Error("Mouse not found");
    }
  })
);

// @desc    Update a Mouse
// @route   PUT /api/mouse/:id
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
// @route   DELETE /api/mouse/:id
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
