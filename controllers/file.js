const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const upload = require("../config/multer");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

exports.uploadFile = [
  upload.single("file"), // Handle single file upload
  asyncHandler(async (req, res, next) => {
    const folderId = req.params.folderID;
    const userId = req.user.id;
    const file = req.file;

    await prisma.file.create({
      data: {
        filename: file.filename,
        url: `/uploads/${file.filename}`,
        mimetype: file.mimetype,
        size: file.size,
        userId,
        folderId,
      },
    });

    res.redirect(`/folder/${folderId}`);
  }),
];

exports.downloadFile = asyncHandler(async (req, res, next) => {
  const { fileID } = req.params;

  const file = await prisma.file.findUnique({
    where: {
      id: fileID,
    },
  });
  if (!file) {
    return res.status(404).render("404", { title: "File Not Found" });
  }

  const filePath = path.join(__dirname, "../uploads", file.filename);

  res.download(filePath, file.filename, (err) => {
    if (err) {
      next(err);
    }
  });
});

exports.fileDetail = asyncHandler(async (req, res, next) => {
  const { fileID } = req.params;

  // Find the file by ID
  const file = await prisma.file.findUnique({
    where: { id: fileID },
  });

  if (!file) {
    return res.status(404).send("File not found");
  }

  // Render file detail view with file data
  res.render("fileDetail", { title: "File Detail", file, user: req.user });
});

// Edit file name
exports.editFileName = asyncHandler(async (req, res, next) => {
  const { fileID } = req.params;
  const { fileName } = req.body;

  // Update the file name
  await prisma.file.update({
    where: { id: fileID },
    data: { filename: fileName },
  });

  res.redirect(`/file/${fileID}`);
});

exports.deleteFile = asyncHandler(async (req, res, next) => {
  const { fileID } = req.params;

  const file = await prisma.file.findUnique({ where: { id: fileID } });

  if (!file) {
    return res.status(404).send("File not found");
  }

  // Delete the file from the file system
  const filePath = path.join(__dirname, "../uploads", file.filename);
  fs.unlink(filePath, (err) => {
    if (err) {
      return next(err);
    }
  });

  // Delete the file record from the database
  await prisma.file.delete({
    where: { id: fileID },
  });

  res.redirect(`/folder/${file.folderId}`);
});
