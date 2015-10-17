var express = require('express');
var router = express.Router();

module.exports = function (passport) {
  router.get('/', function (req, res, next) {
    res.render('login', { loginMessage: req.flash('loginMessage') });
  });

  router.post('/', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
  }))

  router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}
