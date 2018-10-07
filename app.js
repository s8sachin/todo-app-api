var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var task_api = require('./routes/api/task');

var app = express();

// connect to db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/todo-tasks-api')
.then(() => console.log('connection succesful'))
.catch((err) => console.error(err));
mongoose.set('debug', true);

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(favicon(path.join(__dirname, 'public/images', 'favicon.png')));

app.use('/api/tasks', task_api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (req.headers['content-type'] && req.headers['content-type'].includes('application/json')) {
    return res.json({message: res.locals.message});
  }
  res.json({error: 'error'});
});

module.exports = app;
