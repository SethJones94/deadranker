const passport = require("passport");
const Account = require("../models/account");
const client_id = "bc1c7d46f73e4c71a04672ce8757e620";
const client_secret = "f59e4056eb2942a2895120e13541bc2b";
const redirect_uri = "http://localhost:3000/callback";
const scopes = "user-read-private user-read-email";
const helpers = require("../helpers.js");
const stateKey = "spotify_auth_state";
const querystring = require("querystring");
//this file handles all of the routes for the login page

exports.loginPageGET = (req, res) => {
  var state = helpers.generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
};

exports.spotifyCallback = exports.loginAuthenticate = passport.authenticate(
  "local",
  {
    successRedirect: "/",
    failureRedirect: "/"
  }
);

//app.get('/auth/spotify'

//exports.spotifyAuthenticate = passport.authenticate('spotify'),
//function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
//});

//app.get('/auth/spotify/callback'

//exports.spotifySuccessRedirect = passport.authenticate('spotify', { failureRedirect: '/login' }),
//function(req, res) {
// Successful authentication, redirect home.
//res.redirect('/');
//});
