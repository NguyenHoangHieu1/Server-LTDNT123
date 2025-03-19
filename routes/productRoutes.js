const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { protect } = require("../middleware/authMiddleware");

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      category,
      sku,
      inventory,
      features,
      images,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      sku,
      inventory,
      features,
      images,
      user: req.user._id,
    });

    if (product) {
      res.status(201).json(product);
    } else {
      res.status(400);
      throw new Error("Invalid product data");
    }
  }),
);

// @desc    Get all products
// @route   GET /api/products
// @access  Private
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const products = await Product.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(products);
  }),
);

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Private
router.get(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product && product.user.toString() === req.user._id.toString()) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }),
);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const {
      name,
      price,
      description,
      category,
      sku,
      inventory,
      features,
      images,
    } = req.body;

    const product = await Product.findById(req.params.id);

    if (product && product.user.toString() === req.user._id.toString()) {
      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.category = category || product.category;
      product.sku = sku || product.sku;
      product.inventory =
        inventory !== undefined ? inventory : product.inventory;
      product.features = features || product.features;
      product.images = images || product.images;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }),
);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product && product.user.toString() === req.user._id.toString()) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }),
);

module.exports = router;
