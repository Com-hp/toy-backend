var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login.routes');
var usersRouter = require('./routes/users');
var communityRouter = require('./routes/community.routes');
var dealRouter = require('./routes/deal.routes');
var commentRouter = require('./routes/comment.routers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if(process.env.ENODE_ENV==='production'){
  app.use(logger('combined'))
}else{
  app.use(logger('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/images')));

app.use('/', loginRouter);
app.use('/users', usersRouter);
app.use('/community', communityRouter);
app.use('/deal', dealRouter);
app.use('/comment', commentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  const logger = require('./config/logger')

  // render the error page
  res.status(err.status || 500);
  logger.error(
    'Server error' +
    '\n \t' + res.locals.error
  )
  res.send({"Message" : "실패", "Status" : 500, "Error" : res.locals.error});
});

module.exports = app;