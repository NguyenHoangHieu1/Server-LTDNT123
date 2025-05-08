const mongoose = require("mongoose");
const Motherboard = require("../models/motherboard"); // Đường dẫn model của bạn
const cpu = require("../models/cpu");
const drive = require("../models/drive");
const gpu = require("../models/gpu");
const keyboard = require("../models/keyboard");
const motherboard = require("../models/motherboard");
const mouse = require("../models/mouse");
const ram = require("../models/memory");

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/pcpartpicker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const cpuImages = [
  "/uploads/cpu/cpu1.jpg",
  "/uploads/cpu/cpu2.jpg",
  "/uploads/cpu/cpu3.jpg",
];

const driveImages = [
  "/uploads/drive/drive1.jpg",
  "/uploads/drive/drive2.jpg",
  "/uploads/drive/drive3.jpg",
];

const gpuImages = [
  "/uploads/gpu/gpu1.jpg",
  "/uploads/gpu/gpu2.jpg",
  "/uploads/gpu/gpu3.jpg",
];
const keyboardImages = [
  "/uploads/keyboard/keyboard1.jpg",
  "/uploads/keyboard/keyboard2.jpg",
  "/uploads/keyboard/keyboard3.jpg",
];
const motherboardImages = [
  "/uploads/motherboard/motherboard1.jpg",
  "/uploads/motherboard/motherboard2.jpg",
  "/uploads/motherboard/motherboard3.jpg",
];
const mouseImages = [
  "/uploads/mouse/mouse1.jpg",
  "/uploads/mouse/mouse2.jpg",
  "/uploads/mouse/mouse3.jpg",
];
const ramImages = [
  "/uploads/ram/ram1.jpg",
  "/uploads/ram/ram2.jpg",
  "/uploads/ram/ram3.jpg",
];

async function updateImages() {
  try {
    const cpus = await cpu.find();
    const drives = await drive.find();
    const gpus = await gpu.find();
    const keyboards = await keyboard.find();
    const motherboards = await motherboard.find();
    const mouses = await mouse.find();
    const rams = await ram.find();

    for (const doc of cpus) {
      const randomImage =
        cpuImages[Math.floor(Math.random() * cpuImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    for (const doc of drives) {
      const randomImage =
        driveImages[Math.floor(Math.random() * driveImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    for (const doc of gpus) {
      const randomImage =
        gpuImages[Math.floor(Math.random() * gpuImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    for (const doc of keyboards) {
      const randomImage =
        keyboardImages[Math.floor(Math.random() * keyboardImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    for (const doc of motherboards) {
      const randomImage =
        motherboardImages[Math.floor(Math.random() * motherboardImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    for (const doc of mouses) {
      const randomImage =
        mouseImages[Math.floor(Math.random() * mouseImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    for (const doc of rams) {
      const randomImage =
        ramImages[Math.floor(Math.random() * ramImages.length)];
      doc.image = randomImage; // Trường ảnh, bạn thay tên nếu không phải là `image`
      await doc.save();
    }

    console.log("Cập nhật ảnh thành công!");
    mongoose.disconnect();
  } catch (err) {
    console.error("Lỗi khi cập nhật ảnh:", err);
  }
}

updateImages();
