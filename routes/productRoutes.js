const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { protect } = require("../middleware/authMiddleware");
const mongoose = require("mongoose");
// @desc    Create a new product
// @route   POST /api/products
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { tensanpham, gia, loaisp, hinhanh } = req.body;

    const product = await Product.create({
      idsanpham: new mongoose.Types.ObjectId(),
      tensanpham,
      gia,
      loaisp,
      hinhanh,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400);
      throw new Error("Invalid product data");
    }
  })
);

// @desc    Get all products
// @route   GET /api/products
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const products = await Product.find().sort({
      createdAt: -1,
    });
    res.json(products);
  })
);

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ idsanpham: req.params.id });
    console.log(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { tensanpham, gia, loaisp, hinhanh } = req.body;

    const product = await Product.findOne({ idsanpham: req.params.id });

    if (product) {
      product.tensanpham = tensanpham || product.tensanpham;
      product.gia = gia || product.gia;
      product.loaisp = loaisp || product.loaisp;
      product.hinhanh = hinhanh || product.hinhanh;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.findOne({ idsanpham: req.params.id });

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

module.exports = router;
