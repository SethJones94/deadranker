const Account = require("../models/account");
const passport = require("passport");

//this file handles all of the register page's routing

//gets the page
exports.registerPageGET = (req, res) => {
  res.render("register", {});
};

//post request to register users
exports.userRegisterPOST = (req, res) => {
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
};
