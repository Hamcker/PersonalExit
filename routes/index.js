var express = require('express');
var sql = require('mssql')
var router = express.Router();
var expressSession = require('express-session');
var mongoskin = require('mongoskin');


module.exports = function (passport) {

  router.get('/*', function (req, res, next) {
    if (!req.user && req.originalUrl != "/" ) {
      res.redirect('/');
    }
    else
      res.render('index', { loginMessage: req.flash('loginMessage'), root: __dirname });
  });


  return router;
}

















