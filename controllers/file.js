const asyncHandler = require("express-async-handler");

exports.uploadFile = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED Upload File");
});

exports.downloadFile = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED Download File");
});

exports.fileDetail = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED File Detail");
});

exports.deleteFile = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED Delete File");
});
