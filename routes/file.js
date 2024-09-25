const express = require("express");
const router = express.Router();
const fileControllers = require("../controllers/file");

router.post("/:folderID/upload", fileControllers.uploadFile);

router.get("/:fileID/download", fileControllers.downloadFile);

router.get("/:fileID", fileControllers.fileDetail);

router.post("/:fileID/edit", fileControllers.editFileName);

router.post("/:fileID/delete", fileControllers.deleteFile);

module.exports = router;
