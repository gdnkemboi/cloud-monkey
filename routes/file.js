const express = require("express");
const router = express.Router();
const fileControllers = require("../controllers/file");

router.post("/file/upload", fileControllers.uploadFile);

router.get("/file/download", fileControllers.downloadFile);

router.get("/file/:fileID", fileControllers.fileDetail);

router.get("/file/:fileID/delete", fileControllers.deleteFile);

module.exports = router;
