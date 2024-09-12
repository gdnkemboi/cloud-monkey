const express = require("express");
const router = express.Router();
const folderControllers = require("../controllers/folder");

router.post("/new", folderControllers.createFolderPOST);

router.get("/all", folderControllers.getAllFolders);

router.get("/:folderID", folderControllers.getFolderDetail);

router.put("/:folderID/edit", folderControllers.editFolder);

router.delete("/:folderID/delete", folderControllers.deletFolder);

module.exports = router;
