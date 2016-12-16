import {Request, Response} from "express";
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';

import { router as apiRoutes } from './routes/api';
import * as storage from './storage';

export const app = express();

storage.init(app.get('env'));

// view engine setup
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', apiRoutes);

// catch 404 and forward to error handler
// app.use((req: Request, res: Response, next: Function) => {
//   var err: any = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// instead of 404s we just serve the index for any unknown path
app.use((req, res, next) => {
  res.render('index', { title: 'GB top 10' });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err: any, req: Request, res: Response, next: Function) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err: any, req: Request, res: Response, next: Function) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
