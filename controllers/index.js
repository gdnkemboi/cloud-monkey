exports.index = (req, res, next) => {
  res.render("index", { title: "Cloud Monkey", user: req.user });
};
