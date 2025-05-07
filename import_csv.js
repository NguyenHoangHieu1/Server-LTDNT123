require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connect MongoDB successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

const modelMap = {
  cpu: require("./models/cpu"),
  //   motherboard: require("./models/motherboard"),
  //   memory: require("./models/memory"),
  //   "internal-hard-drive": require("./models/drive"),
  //   "video-card": require("./models/gpu"),
  //   keyboard: require("./models/keyboard"),
  //   mouse: require("./models/mouse"),
};

function convertToBoolean(value) {
  if (value === "True") return true;
  if (value === "False") return false;
  return value;
}

const dataDir = path.join(__dirname, "data");

// Đọc tất cả file trong thư mục data/
fs.readdir(dataDir, (err, files) => {
  if (err) return console.error("Error reading data directory:", err);

  files.forEach((file) => {
    const ext = path.extname(file);
    const name = path.basename(file, ext).toLowerCase(); // "cpu" từ "cpu.csv"

    if (ext === ".csv" && modelMap[name]) {
      const Model = modelMap[name];
      const filePath = path.join(dataDir, file);
      const results = [];

      fs.createReadStream(filePath)
        .pipe(csv())
        .on("data", (data) => {
          if (data.smt) data.smt = convertToBoolean(data.smt);
          if (data.tenkeyless)
            data.tenkeyless = convertToBoolean(data.tenkeyless);

          if (data.graphics && data.graphics.toLowerCase() === "none")
            data.graphics = null;

          results.push(data);
        })
        .on("end", async () => {
          try {
            await Model.deleteMany(); // Xóa dữ liệu cũ (nếu muốn)
            await Model.insertMany(results);
            console.log(`Imported ${results.length} records for '${name}'`);
          } catch (error) {
            console.error(`Error importing ${file}:`, error);
          }
        });
    } else {
      console.warn(`Skipping file: ${file}`);
    }
  });
});
