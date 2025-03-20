const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    idsanpham: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      index: true,
    },
    tensanpham: {
      type: String,
      required: true,
    },
    gia: {
      type: Number,
      required: true,
    },
    loaisp: {
      type: String,
      required: true,
    },
    hinhanh: {
      type: String,
    },
  }
  // {
  //   _id: false,
  // }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
