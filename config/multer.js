const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload destination folder
  },
  filename: (req, file, cb) => {
    // Extract the original file extension
    const ext = path.extname(file.originalname);
    const originalName = path.basename(file.originalname, ext);

    // Unique filename with the original name + UUID
    cb(null, `${originalName}-${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // Limit file size to 5mb
  },
});

module.exports = upload;
