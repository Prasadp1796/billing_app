var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mongodb Connection Code
mongoose.connect("mongodb://127.0.0.1:27017/billingApp", {useNewUrlParser: true}, function (err) {
    if (err)
        throw err;
    else
        console.log("Connected Successfully");

});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', require('./routes/userRegistrationAndLogIn'));
app.use('/', require('./routes/adminDashboard'));
app.use('/', require('./routes/manageCustomer'));
app.use('/', require('./routes/manageInventory'));
app.use('/', require('./routes/manageUnits'));
app.use('/', require('./routes/managePersonalDetails'));
app.use('/', require('./routes/getCountryCityStateJson'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
