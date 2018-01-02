const passport = require("passport");

(exports.spotifyAuthenticate = passport.authenticate("spotify", {
  scope: ["user-read-email", "user-read-private"],
  showDialog: true
})),
  function(req, res) {
    // The request will be redirected to spotify for authentication, so this
    // function will not be called.
  };

(exports.spotifyCallback = passport.authenticate("spotify", {
  failureRedirect: "/login"
})),
  function(req, res) {
    res.redirect("/");
  };

exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
