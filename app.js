const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const request = require("request");
const session = require("express-session");
const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const localMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const client_id = "bc1c7d46f73e4c71a04672ce8757e620";
const client_secret = "f59e4056eb2942a2895120e13541bc2b";
const redirect_uri = "http://localhost:3000/callback";
const scopes = "user-read-private user-read-email";

//models
require("./models/video.js");

const index = require("./routes/index", passport);

//reformat this out to new file
const generateRandomString = function(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = "spotify_auth_state";
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "largeelephantinasmallroom",
    cookie: { maxAge: null },
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);

// passport
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/* passport.use(
  new SpotifyStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:3000/"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);
// mongoose
//mongoose.connect("mongodb://localhost/deadranker", { useMongoClient: true });
//mongoose.Promise = global.Promise;

/*app.use(function(req, res, next) {
  res.locals.account = req.session.user;
  next();
}); */

// catch and forward
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

function isLoggedIn(req, res, next) {
  // if user is authenticated
  if (req.isAuthenticated()) return next();
  // if not
  res.redirect("/");
}

module.exports = app;
