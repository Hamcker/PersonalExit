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
	// 	passport.authenticate('local', function (err, user, info) {
	// 		var i = arguments;
	// 		if (err) next(err);
	// 		if (!user) res.send("no user");
	// 		else
	// 			passport.login(user, function (errx) {
	// 				if (errx) res.send("no pass");
	// 				else
	// 					res.send({ status: "ok", userFullname: user.FullName });
	// 			});
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

	router.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	router.get('/getPapers', function (req, res) {
		var UserId = req.user.UserId.toString();
		req.db.bind('Papers');
		req.db.Papers.find({ UserId: UserId }).toArray(function (err, items) {
			res.send(items);
		});
	});

	router.post('/register', function (req, res) {
		req.body.status = 0;
		req.body.statusText = "در حال بررسی"
		req.db.bind('Papers');
		req.db.Papers.insert(req.body, function (err, result) {
			if (err) res.send('f');
			else res.send('s');
		});
	});

	router.post('/edit', function (req, res) {
		req.db.bind('Papers');
		var paperId = req.body._id.toString();
		delete req.body._id
		req.db.Papers.updateById(paperId, { "$set": req.body }, function (err, result) {
			if (err) res.send('f');
			else res.send('s');
		});
	});

	router.post('/delete', function (req, res) {
		var paperId = req.body.paperid.toString();
		console.log('deleting ' + paperId);
		req.db.bind('Papers');
		req.db.Papers.removeById(mongoskin.helper.toObjectID(paperId));
		res.send(200, 'ok');
	});

	router.post('/up', function (req, res) {
		var paperId = req.body.paperid.toString();
		req.db.bind('Papers');
		req.db.Papers.find({ "_id": mongoskin.helper.toObjectID(paperId) }).toArray(function (err, items) {
			switch (items[0].status) {
				case 0:
					items[0].statusText = 'مورد تأیید مسئول واحد'
					break;
				case 1:
					items[0].statusText = 'مورد تأیید کارگزینی'
					break;
				case 2:
					items[0].statusText = 'مورد تأیید نگهبانی'
					break;
				case 3:
					items[0].statusText = 'خارج شده'
					break;
				case 4:
					items[0].statusText = 'بازگشته'
					break;
				case 5:
					items[0].statusText = 'رد شده'
					break;
				case 6:
					items[0].statusText = 'در حال بررسی'
					break;
			}
			items[0].status = (items[0].status + 1) % 7;
			delete items[0]._id

			req.db.Papers.updateById(paperId, { "$set": items[0] }, function (err, result) {
				if (err) res.send('f');
				else res.send('s');
			});
		});
	})

	router.post('/down', function (req, res) {
		var paperId = req.body.paperid.toString();
		req.db.bind('Papers');
		req.db.Papers.find({ "_id": mongoskin.helper.toObjectID(paperId) }).toArray(function (err, items) {
			switch (items[0].status) {
				case 2:
					items[0].statusText = 'مورد تأیید مسئول واحد'
					break;
				case 3:
					items[0].statusText = 'مورد تأیید کارگزینی'
					break;
				case 4:
					items[0].statusText = 'مورد تأیید نگهبانی'
					break;
				case 5:
					items[0].statusText = 'خارج شده'
					break;
				case 6:
					items[0].statusText = 'بازگشته'
					break;
				case 0:
					items[0].statusText = 'رد شده'
					break;
				case 1:
					items[0].statusText = 'در حال بررسی'
					break;
			}
			if (items[0].status == 0)
				items[0].status = 6
			else
				items[0].status--;
			delete items[0]._id

			req.db.Papers.updateById(paperId, { "$set": items[0] }, function (err, result) {
				if (err) res.send('f');
				else res.send('s');
			});
		});
	})

	return router;
}