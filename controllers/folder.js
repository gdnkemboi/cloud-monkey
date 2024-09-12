const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.createFolderPOST = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Create Folder POST")
})

exports.getAllFolders = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Get All Folders")
})

exports.getFolderDetail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Get Folder Detail")
})

exports.editFolder = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Edit Folder")
})

exports.deletFolder = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Delete Folder")
})