const Post = require("../models/post");

const async = require("async");

// Display home page on GET
exports.homeGet = async function (req, res, next) {
  let results;
  try {
    results = await async.parallel({
      posts: function (cb) {
        Post.find({}, cb).sort({ date: 1 }).populate("author");
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
exports.newPostPost = (req, res, next) => {
  res.send("NOT IMPLEMENTED: New post POST");
};
