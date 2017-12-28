const passport = require("passport");
const Account = require("../models/account");

//this file handles all of the routes for the login page

exports.loginPageGET = (req, res) => {
  res.render("login", { user: req.user });
};

exports.loginAuthenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
});

