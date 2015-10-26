var express = require('express');
var sql = require('mssql')
var router = express.Router();
var expressSession = require('express-session');
var mongoskin = require('mongoskin');


module.exports = function (passport) {
  
  router.get('/', function (req, res, next) {
    res.render('index', { loginMessage: req.flash('loginMessage'), root: __dirname });
  });
// 
//   router.post('/', passport.authenticate('login', {
//     successRedirect: '/home',
//     failureRedirect: '/',
//     failureFlash: true
//   }))
// 
//   router.get('/logout', function (req, res) {
//     req.logout();
//     res.redirect('/');
//   });
// 
// 
// 
// 
// 
// 
//   var isAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated())
//       return next();
//     res.redirect('/');
//   }
// 
//   router.get('/home', isAuthenticated, function (req, res, next) {
//     var sqlconnection = new sql.Connection(req.sqlconfig, function (err) {
//       var request = new sql.Request(sqlconnection);
//       request.input('ID', sql.NVarChar(50), req.user.UserId)
//       request.execute('dbo.spTest', function (err, records) {
//         req.session.user = req.user;
//         req.session.employee = records[0][0]
//         res.render('home', { user: req.user, employee: records[0][0] });
//       })
//     });
//   });
// 
// 
//   router.post('/home/getUserInfo', function (req, res, next) {
//     var sqlconnection = new sql.Connection(req.sqlconfig, function (err) {
//       var request = new sql.Request(sqlconnection);
//       request.input('ID', sql.NVarChar(50), req.body.personalCode)
//       request.execute('dbo.spTest', function (err, records) {
//         res.send(records[0]);
//       })
//     });
//   });


  return router;
}

















