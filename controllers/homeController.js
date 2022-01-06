const Post = require("../models/post");
const User = require("../models/user");

const async = require("async");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Display home page on GET
exports.homeGet = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      posts: function (cb) {
        Post.find({}, cb).sort({ date: -1 }).populate("author");
      },
      postCount: function (cb) {
        Post.countDocuments({}, cb);
      },
    });
  } catch (err) {
    return next(err);
  }
  if (req.user) {
    res.render("home", { title: "Posts", results: results });
  } else {
    res.redirect("/");
  }
};

// Display new post form on GET
exports.newPostGet = (req, res, next) => {
  res.render("newPost", { title: "New Post" });
};

// Create new post on POST
exports.newPostPost = [
  // Validate and sanitize input
  body("content", "You must type something")
    .trim()
    .isLength({ max: 200 })
    .escape(),

  // Process request after validation and sanitization
  (req, res, next) => {
    const errors = validationResult(req);

    // Create new post object with input
    const post = new Post({
      author: req.user._id,
      date: Date.now(),
      content: req.body.content,
    });

    if (!errors.isEmpty()) {
      // If errors, render form again
      res.render("newPost", { title: "New Post", errors: errors.array() });
      return;
    } else {
      // Save post to db
      post.save(function (err) {
        if (err) next(err);
        res.redirect("/home");
      });
    }
  },
];

// Display membership form on GET
exports.membershipGet = (req, res, next) => {
  // res.send("NOT IMPLEMENTED: Membership form GET");
  res.render("membership", { title: "Apply for Membership" });
};

// Update membership on POST
exports.membershipPost = [
  // Validate and sanitize input
  body("pin", "Pin is required").trim().isLength({ min: 6 }).escape(),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // If errors, render form again
      res.render("membership", {
        title: "Apply for Membership",
        errors: errors.array(),
      });
      return;
    } else {
      // Check that pin is correct
      if (req.body.pin === process.env.PIN) {
        // PIN correct, update membership
        User.findByIdAndUpdate(
          req.user._id,
          { membership: true },
          function (err, result) {
            if (err) next(err);
            else res.redirect("/home");
          }
        );
      } else {
        res.render("membership", {
          title: "Apply for Membership",
          errors: ["Wrong PIN"],
        });
        return;
      }
    }
  },
];

// Delete post on GET
exports.deletePost = (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, function deletePost(err) {
    if (err) next(err);
    res.redirect("/home");
  });
};
