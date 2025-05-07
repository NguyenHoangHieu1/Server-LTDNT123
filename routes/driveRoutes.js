const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Drive = require("../models/drive"); // hoặc đường dẫn đến file model của bạn
const { protect } = require("../middleware/authMiddleware");
const { transformItems, transformItem } = require("../utils/transformItems");

// @desc    Create a new Drive
// @route   POST /api/drives
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      capacity,
      price_per_gb,
      type,
      cache,
      form_factor,
      interface: iface,
    } = req.body;

    const drive = await Drive.create({
      name,
      price,
      capacity,
      price_per_gb,
      type,
      cache,
      form_factor,
      interface: iface,
    });

    if (drive) {
      res.status(201).json(drive);
    } else {
      res.status(400);
      throw new Error("Invalid drive data");
    }
  })
);

// @desc    Get all Drives
// @route   GET /api/drives
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const drives = await Drive.find().sort({ createdAt: -1 });

    res.json(transformItems("Storage", drives));
  })
);

// @desc    Get Drives with pagination
// @route   GET /api/drives/paginated?page=1&limit=10
// @access  Private
router.get(
  "/paginated",
  protect,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Drive.countDocuments();
    const items = await Drive.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: transformItems("Storage", items),
    });
  })
);

// @desc    Search Drives by name
// @route   GET /api/drives/search?name=keyword
// @access  Private
router.get(
  "/search",
  protect,
  asyncHandler(async (req, res) => {
    const nameQuery = req.query.name;

    const drives = await Drive.find({
      name: { $regex: nameQuery, $options: "i" }, // không phân biệt hoa thường
    }).sort({ createdAt: -1 });

    res.json(transformItems("drive", drives));
  })
);

// @desc    Get Drive by ID
// @route   GET /api/drives/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const drive = await Drive.findById(req.params.id);
    if (drive) {
      res.json(transformItem("Storage", drive));
    } else {
      res.status(404);
      throw new Error("Drive not found");
    }
  })
);

// @desc    Update a Drive
// @route   PUT /api/drives/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      capacity,
      price_per_gb,
      type,
      cache,
      form_factor,
      interface: iface,
    } = req.body;

    const drive = await Drive.findById(req.params.id);

    if (drive) {
      drive.name = name ?? drive.name;
      drive.price = price ?? drive.price;
      drive.capacity = capacity ?? drive.capacity;
      drive.price_per_gb = price_per_gb ?? drive.price_per_gb;
      drive.type = type ?? drive.type;
      drive.cache = cache ?? drive.cache;
      drive.form_factor = form_factor ?? drive.form_factor;
      drive.interface = iface ?? drive.interface;

      const updatedDrive = await drive.save();
      res.json(updatedDrive);
    } else {
      res.status(404);
      throw new Error("Drive not found");
    }
  })
);

// @desc    Delete a Drive
// @route   DELETE /api/drives/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const drive = await Drive.findById(req.params.id);

    if (drive) {
      await drive.deleteOne();
      res.json({ message: "Drive removed" });
    } else {
      res.status(404);
      throw new Error("Drive not found");
    }
  })
);

module.exports = router;
