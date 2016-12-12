import * as express from 'express';
import * as bodyParser from 'body-parser';

import * as storage from '../storage';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const db = storage.get();
  res.render('index', { title: 'GB top 10' });
});

export default router;
