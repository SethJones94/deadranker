const express = require('express');
const passport = require('passport');
const Account = require('../models/account');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user});
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', {account: account});
    }
    passport.authenticate('local')(req, res, function () {
      req.session.save(function (err){
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
})

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/gotit', function(req, res){
  res.status(200).send("gotcha");
});

module.exports = router;
