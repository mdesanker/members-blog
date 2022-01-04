const User = require("../models/user");
const bcrypt = require("bcryptjs");

const async = require("async");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

// Display sign up form on GET
exports.signupGet = function (req, res, next) {
  res.render("signup", { title: "Sign Up" });
};

// Display sign up on POST
exports.signupPost = [
  // Validate and sanitize form inputs
  body("username", "Username required").trim().isLength({ min: 1 }).escape(),
  body("password", "Password required")
    .trim()
    .isLength({ min: 7 })
    .withMessage("Password must be at least 7 characters")
    .escape(),
  body(
    "confirmPassword",
    "Confirm password field must have same value as password field"
  ).custom((value, { req }) => value === req.body.password),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);

    // Create a new user object with processed inputs
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      membership: false,
    });

    if (!errors.isEmpty()) {
      // Render form again if errors
      res.render("signup", {
        title: "Sign Up",
        user: req.body,
        errors: errors.array(),
      });
      return;
    } else {
      // Inputs are valid
      // Check if user already exists
      User.findOne({ username: req.body.username }).exec(function (
        err,
        foundUser
      ) {
        if (err) next(err);
        if (foundUser) {
          res.redirect("/");
          return;
        }

        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) next(err);

          // Update user profile with hashed password
          user.password = hashedPassword;

          // Save new user
          user.save(function (err) {
            if (err) next(err);
            res.redirect("/auth/login");
          });
        });
      });
    }
  },
];

// Display log in form on GET
exports.loginGet = function (req, res, next) {
  res.render("login", { title: "Log In" });
};

// Display log in on POST
exports.loginPost = passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
});

// Display log out on GET
exports.logoutGet = (req, res, next) => {
  req.logout();
  res.redirect("/");
};
