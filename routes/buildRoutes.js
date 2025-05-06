const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Build = require("../models/build"); // Đảm bảo model này đúng
const { protect } = require("../middleware/authMiddleware");

// @desc    Create a new Build
// @route   POST /api/builds
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      userId,
      totalPrice,
      cpuId,
      gpuId,
      driveId,
      keyboardId,
      memoryId,
      motherboardId,
      mouseId,
    } = req.body;

    const build = await Build.create({
      name,
      userId,
      cpuId,
      totalPrice,
      gpuId,
      driveId,
      keyboardId,
      memoryId,
      motherboardId,
      mouseId,
    });

    if (build) {
      res.status(201).json(build);
    } else {
      res.status(400);
      throw new Error("Invalid build data");
    }
  })
);

// @desc    Get all builds
// @route   GET /api/builds
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const builds = await Build.find().sort({ createdAt: -1 });
    res.json(builds);
  })
);

// @desc    Get builds with pagination
// @route   GET /api/builds/paginated
// @access  Private
router.get(
  "/paginated",
  protect,
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Build.countDocuments();
    const builds = await Build.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      builds,
    });
  })
);

// @desc    Get build by ID
// @route   GET /api/builds/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const build = await Build.findById(req.params.id);
    if (build) {
      res.json(build);
    } else {
      res.status(404);
      throw new Error("Build not found");
    }
  })
);

// @desc    Update a build
// @route   PUT /api/builds/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      userId,
      totalPrice,
      cpuId,
      gpuId,
      driveId,
      keyboardId,
      memoryId,
      motherboardId,
      mouseId,
    } = req.body;

    const build = await Build.findById(req.params.id);

    if (build) {
      build.name = name || build.name;
      build.userId = userId || build.userId;
      build.cpuId = cpuId || build.cpuId;
      build.totalPrice = totalPrice || build.totalPrice;
      build.gpuId = gpuId || build.gpuId;
      build.driveId = driveId || build.driveId;
      build.keyboardId = keyboardId || build.keyboardId;
      build.memoryId = memoryId || build.memoryId;
      build.motherboardId = motherboardId || build.motherboardId;
      build.mouseId = mouseId || build.mouseId;

      const updatedBuild = await build.save();
      res.json(updatedBuild);
    } else {
      res.status(404);
      throw new Error("Build not found");
    }
  })
);

// @desc    Delete a build
// @route   DELETE /api/builds/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const build = await Build.findById(req.params.id);

    if (build) {
      await build.deleteOne();
      res.json({ message: "Build removed" });
    } else {
      res.status(404);
      throw new Error("Build not found");
    }
  })
);

module.exports = router;
