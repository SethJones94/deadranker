const express = require("express");
const passport = require("passport");
const Account = require("../models/account");
const router = express.Router();

// Home page
router.get("/", function(req, res, next) {
  res.render("index", { user: req.user });
});

// Register page
router.get("/register", function(req, res) {
  res.render("register", {});
});

// User register
router.post("/register", function(req, res) {
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err, account) {
      if (err) {
        return res.render("register", { account: account });
      }
      // Passport local auth
      passport.authenticate("local")(req, res, function() {
        req.session.save(function(err) {
          if (err) {
            return next(err);
          }
          res.redirect("/");
        });
      });
    }
  );
});

// Login page
router.get("/login", function(req, res) {
  res.render("login", { user: req.user });
});
// User login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
);

// Logout
router.get("/logout", function(req, res) {
  res.logout();
  res.redirect("/");
});

router.get("/gotit", function(req, res) {
  res.status(200).send("gotcha");
});

module.exports = router;
