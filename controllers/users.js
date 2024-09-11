const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const prisma = new PrismaClient();

exports.signupGET = (req, res, next) => {
  res.render("signup", { title: "Sign Up" });
};

// Custom email validator function
const emailValidator = (value) => {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(value)) {
    throw new Error("Invalid email format");
  }

  return true;
};

const confirmPassword = (value, { req }) => {
  return value === req.body.password;
};

exports.signupPOST = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .escape(),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .custom(emailValidator)
    .withMessage("Please enter a valid email")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .escape(),
  body("passwordConfirmation")
    .trim()
    .notEmpty()
    .withMessage("Password confirmation cannot be empty")
    .custom(confirmPassword)
    .withMessage("Please enter the same password twice")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const user = {
        username: req.body.username,
        email: req.body.email,
      };

      res.render("signup", {
        title: "Sign Up",
        user,
        errors: errors.array(),
      });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        },
      });

      res.redirect("/signin");
    }
  }),
];

exports.signinGET = (req, res, next) => {
  res.render("signin", {
    title: "Sign In",
    messages: req.flash("error"),
    formData: req.session.formData || {},
  });
  req.session.formData = null; // Clear the form data after it's been used
};

exports.signinPOST = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("1");
      return next(err);
    }
    if (!user) {
      console.log("2");
      req.flash("error", info.message);
      req.session.formData = {
        identifier: req.body.identifier,
        password: req.body.password,
      };

      return res.redirect("/signin");
    }
    req.login(user, (err) => {
      if (err) {
        console.log("3");
        return next(err);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

exports.logoutGET = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
