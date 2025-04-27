const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const CPU = require("../models/cpu"); // Đảm bảo model này đúng với schema mới
const { protect } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");

// @desc    Create a new CPU
// @route   POST /api/cpus
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { name, price, core_count, core_clock, boost_clock, tdp, graphics, smt } = req.body;

    const cpu = await CPU.create({
      name,
      price,
      core_count,
      core_clock,
      boost_clock,
      tdp,
      graphics,
      smt,
    });

    if (cpu) {
      res.status(201).json(cpu);
    } else {
      res.status(400);
      throw new Error("Invalid CPU data");
    }
  })
);

// @desc    Get all CPUs
// @route   GET /api/cpus
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const cpus = await CPU.find().sort({ createdAt: -1 });
    res.json(cpus);
  })
);

// @desc    Get CPU by ID
// @route   GET /api/cpus/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const cpu = await CPU.findById(req.params.id); // Sử dụng findById thay vì tìm theo id
    if (cpu) {
      res.json(cpu);
    } else {
      res.status(404);
      throw new Error("CPU not found");
    }
  })
);

// @desc    Update a CPU
// @route   PUT /api/cpus/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { name, price, core_count, core_clock, boost_clock, tdp, graphics, smt } = req.body;

    const cpu = await CPU.findById(req.params.id); // Sử dụng findById thay vì tìm theo id

    if (cpu) {
      cpu.name = name || cpu.name;
      cpu.price = price || cpu.price;
      cpu.core_count = core_count || cpu.core_count;
      cpu.core_clock = core_clock || cpu.core_clock;
      cpu.boost_clock = boost_clock || cpu.boost_clock;
      cpu.tdp = tdp || cpu.tdp;
      cpu.graphics = graphics || cpu.graphics;
      cpu.smt = smt || cpu.smt;

      const updatedCPU = await cpu.save();
      res.json(updatedCPU);
    } else {
      res.status(404);
      throw new Error("CPU not found");
    }
  })
);

// @desc    Delete a CPU
// @route   DELETE /api/cpus/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const cpu = await CPU.findById(req.params.id); // Sử dụng findById thay vì tìm theo id

    if (cpu) {
      await cpu.deleteOne();
      res.json({ message: "CPU removed" });
    } else {
      res.status(404);
      throw new Error("CPU not found");
    }
  })
);

module.exports = router;
