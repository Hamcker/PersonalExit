var express = require('express');
var sql = require('mssql')
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

// router.get('/home', isAuthenticated, function (req, res, next) {
//   res.render('home', { user: req.user.FullName });
// });

router.get('/home', function (req, res, next) {
  res.render('home');
});

router.get('/myPapers', function (req, res, next) {
  res.render('myPapers');
});

router.get('/papersToSign', function (req, res, next) {
  res.render('myPapers');
});

router.post('/getUserInfo', function (req, res, next) {
  var sqlconnection = new sql.Connection(req.sqlconfig, function (err) {
    var request = new sql.Request(sqlconnection);
    request.input('ID', sql.NVarChar(50), req.body.personalCode)
    request.execute('dbo.spTest',function(err,records){
      res.send(records[0]);
    })
  });
});
module.exports = router;
