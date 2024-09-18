const express = require("express");
const router = express.Router();
const folderControllers = require("../controllers/folder");

router.post("/new", folderControllers.createFolder);

router.get("/all", folderControllers.getAllFolders);

router.get("/:folderID", folderControllers.getFolderDetail);

router.post("/:folderID/edit", folderControllers.editFolder);

router.post("/:folderID/delete", folderControllers.deleteFolder);

module.exports = router;
