const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

/* GET register page */
router.get('/register', function(req, res) {
  res.render('register', { });
});

/* POST register */
router.post('/register', function(req, res) {
  Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', {account: account});
    }
/* passport local auth */
    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login', { user: req.user });
});
/* POST login */
router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
})

router.get('/logout', function(req, res) {
  res.logout();
  res.redirect('/');
});

router.get('/gotit', function(req, res){
  res.status(200).send("gotcha");
});

module.exports = router;
