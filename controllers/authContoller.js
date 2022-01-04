const async = require("async");
const { body, validationResult } = require("express-validator");

// Display sign up form on GET
exports.signupGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Sign up GET");
};

// Display sign up on POST
exports.signupPost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Sign up POST");
};

// Display log in form on GET
exports.loginGet = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Log in GET");
};

// Display log in on POST
exports.loginPost = function (req, res, next) {
  res.send("NOT IMPLEMENTED: Log in POST");
};
