const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

exports.createFolder = [
  body("folderName")
    .trim()
    .notEmpty()
    .withMessage("Folder name is required")
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("index", {
        errors: errors.array(),
      });
    }

    await prisma.folder.create({
      data: {
        name: req.body.folderName,
        userId: req.user.id,
      },
    });

    res.redirect("/");
  }),
];

exports.getAllFolders = asyncHandler(async (req, res, next) => {
  const folders = await prisma.folder.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.render("folders", { title: "All Folders", folders });
});

exports.getFolderDetail = asyncHandler(async (req, res, next) => {
  console.log(req.params);

  const folder = await prisma.folder.findFirst({
    where: {
      id: req.params.folderID,
    },
    include: {
      files: true,
    },
  });

  res.render("folderDetail", { title: `${folder.name}`, folder });
});

exports.editFolder = [
  body("folderName")
    .notEmpty()
    .withMessage("Folder name is required")
    .trim()
    .escape(),
  asyncHandler(async (req, res, next) => {
    const folder = await prisma.folder.update({
      where: { id: req.params.folderID },
      data: { name: req.body.folderName },
    });

    console.log(folder);

    res.redirect(`/folder/${folder.id}`);
  }),
];

exports.deleteFolder = asyncHandler(async (req, res, next) => {
  await prisma.folder.delete({
    where: {
      id: req.params.folderID,
    },
  });

  res.redirect("/folder/all");
});
