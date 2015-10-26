var express = require('express');
var router = express.Router();


router.get('/login', function (req, res) {
  res.render('templates/login');
});

router.get('/home', function (req, res) {
  res.render('templates/home', req.user);
});

router.get('/home/myPapers', function (req, res) {
  res.render('templates/home/myPapers', { user: req.session.user, employee: req.session.employee });
});

router.get('/home/papersToSign', function (req, res) {
  res.render('templates/home/papersToSign');
});

module.exports = router;

