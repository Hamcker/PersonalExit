var express = require('express');
var sql = require('mssql')
var router = express.Router();
var expressSession = require('express-session');
var mongoskin = require('mongoskin');


module.exports = function (passport) {

	var isAuthenticated = function (req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/');
	}

	// router.post('/login', function (req, res, next) {
	// 	passport.authenticate('local', function (err,user,info) {
	// 		var i = arguments;
	// 		if (err) next(err);
	// 		if (!user) res.send("no user");
	// 		passport.login(user, function (errx) {
	// 			if (errx) res.send("no pass");
	// 			res.send("ok");
	// 		});
	// 	});
	// });

	router.post('/login', passport.authenticate('local'), function (req, res) {
		res.send({ status: "ok", userFullname: req.user.FullName });
	});

	// router.post('/login', passport.authenticate('local', {
	// 	successRedirect: '/home',
	// 	failureRedirect: '/',
	// 	failureFlash: true
	// }))
	
	// router.post('/login',  function (req, res) {
	// 	res.send("ok");
	// });


	router.post('/register', function (req, res) {
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

	router.get('/getPapers', function (req, res) {
		var UserId = req.user.UserId.toString();
		req.db.bind('Papers');
		req.db.Papers.find({ UserId: UserId }).toArray(function (err, items) {
			res.send(items);
		});
	});

	router.post('/delete', function (req, res) {
		var paperId = req.body.paperid.toString();
		console.log('deleting ' + paperId);
		req.db.bind('Papers');
		req.db.Papers.removeById(mongoskin.helper.toObjectID(paperId));
		res.send(200, 'ok');
	});

	return router;
}