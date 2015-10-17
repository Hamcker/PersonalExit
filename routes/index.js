var express = require('express');
var sql = require('mssql')
var router = express.Router();
var expressSession = require('express-session');
var mongoskin = require('mongoskin');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

router.get('/home', isAuthenticated, function (req, res, next) {
  var sqlconnection = new sql.Connection(req.sqlconfig, function (err) {
    var request = new sql.Request(sqlconnection);
    request.input('ID', sql.NVarChar(50), req.user.UserId)
    request.execute('dbo.spTest', function (err, records) {
      req.session.user = req.user;
      req.session.employee = records[0][0]
      res.render('home', { user: req.user, employee: records[0][0] });
    })
  });
});

router.get('/home/myPapers', isAuthenticated, function (req, res, next) {
  res.render('myPapers', { user: req.session.user, employee: req.session.employee });
});

router.get('/home/papersToSign', function (req, res, next) {
  res.render('myPapers');
});

router.post('/home/getUserInfo', function (req, res, next) {
  var sqlconnection = new sql.Connection(req.sqlconfig, function (err) {
    var request = new sql.Request(sqlconnection);
    request.input('ID', sql.NVarChar(50), req.body.personalCode)
    request.execute('dbo.spTest', function (err, records) {
      res.send(records[0]);
    })
  });
});

router.post('/home/register', function (req, res) {
  // do business:
  req.body.status = 0;
  req.body.statusText = "در حال بررسی"
  
  // put in mongo
  req.db.bind('Papers');
  req.db.Papers.insert(req.body, function (err, result) {
    if (err) res.send('f');
    res.send('s');
  });
});

router.get('/home/getPapers', function (req, res) {
  var UserId = req.user.UserId.toString();
  req.db.bind('Papers');
  req.db.Papers.find({UserId: UserId}).toArray(function(err,items) {
    res.send(items);
  });
});

router.post('/home/delete',function(req,res){
  var paperId = req.body.paperid.toString();
  req.db.bind('Papers');
  req.db.Papers.removeById(mongoskin.helper.toObjectID(paperId));
  res.send(200,'ok');
});

module.exports = router;
