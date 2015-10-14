var express = require('express');
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

module.exports = router;
