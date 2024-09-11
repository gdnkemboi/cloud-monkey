const asyncHandler = require("express-async-handler");

exports.signupGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Signup GET");
});

exports.signupPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Signup POST");
});

exports.signinGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Signin GET");
});

exports.signinPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Signin POST");
});

exports.logoutGET = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Logout GET");
});

exports.logoutPOST = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Logout POST");
});
