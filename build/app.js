"use strict";
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
exports.app = express();
// view engine setup
exports.app.set('views', path.join(__dirname, '..', 'views'));
exports.app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
exports.app.use(logger('dev'));
exports.app.use(bodyParser.json());
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(cookieParser());
exports.app.use(express.static(path.join(__dirname, 'public')));
exports.app.use('/', routes_1.default);
// catch 404 and forward to error handler
exports.app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers
// development error handler
// will print stacktrace
if (exports.app.get('env') === 'development') {
    exports.app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
// production error handler
// no stacktraces leaked to user
exports.app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
