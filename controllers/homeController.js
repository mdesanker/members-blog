// Display home page on GET
exports.homeGet = function (req, res, next) {
  if (req.user) {
    res.render("home", { title: "You are logged in" });
  } else {
    res.redirect("/");
  }
};
