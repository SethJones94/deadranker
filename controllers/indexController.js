//this file handles the index page

exports.indexPageGET = (req, res) => {
  res.render("index", { user: req.user });
};
