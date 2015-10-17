var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');
var passport = require('passport');
var HttpStrategy = require('passport-http');
var LocalStrategy = require('passport-local');
var expressSession = require('express-session');
var md5 = require('md5');
var sql = require('mssql')
var flash = require('connect-flash');

var routes = require('./routes/index');
var logins = require('./routes/login');

var app = express();
var db = require('mongoskin').db('mongodb://192.168.0.56/TestDB', { native_parser: true })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//--------------------------------------------------------------------------------------------------------------

app.use(expressSession({ secret: 'mySecretKey' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}
app.use(stylus.middleware({ src: __dirname + '/public/', compile: compile }));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));


var sqlconfig = {
  user: 'Nodejs',
  password: 'Nodejs',
  server: 'frosh', 
  database: 'UM',
}

app.use(function (req, res, next) {
  req.db = db
  req.sqlconfig = sqlconfig;
  next();
});


app.use('/', routes);
app.use('/login', logins(passport))


passport.serializeUser(function (user, done) {
  done(null, user.UserId);
});

passport.deserializeUser(function (id, done) {
  var sqlconnection = new sql.Connection(sqlconfig, function (err) {
    var request = new sql.Request(sqlconnection);
    request.query('SELECT TOP 1 * FROM dbo.Users WHERE UserId = ' + id, function (err, recordset) {
      if (recordset)
        return done(err, recordset[0]);
    });
  });
});

passport.use('login', new LocalStrategy({ passReqToCallback: true },
  function (req, username, password, done) {
    var sqlconnection = new sql.Connection(sqlconfig, function (err) {
      var request = new sql.Request(sqlconnection);
      request.query('SELECT TOP 1 * FROM dbo.Users WHERE UserId = ' + username, function (err, recordset) {

        if (recordset.length == 1) {
          var userRec = recordset[0];
          var hashPass = md5(password);
          if (userRec.PasswordText.toLowerCase() == hashPass.toLowerCase())
            return done(null, recordset[0]);
          else
            return done(null, false, req.flash('loginMessage','کلمه عبور صحیح نیست.'));
        }
        else
          return done(err, false, req.flash('loginMessage','کد پرسنلی صحیح نیست یا در مرکز سعیدآباد مشغول نیست.'));
      });
    });

  }));

//--------------------------------------------------------------------------------------------------------------

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
