const express = require("express");
const router = express.Router();
const userController = require("../controllers/users");

router.get("/signup", userController.signupGET);

router.post("/signup", userController.signupPOST);

router.get("/signin", userController.signinGET);

router.post("/signin", userController.signinPOST);

router.get("/logout", userController.logoutGET);

router.post("/logout", userController.logoutPOST);

module.exports = router;
