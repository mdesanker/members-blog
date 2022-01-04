// Display home page on GET
exports.homeGet = function (req, res, next) {
  // res.send("NOT IMPLEMENTED: Home page");
  res.render("home", { title: "Post Feed" });
};
