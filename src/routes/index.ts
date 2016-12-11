import {Request, Response} from "express";
import * as express from 'express';
import { getListData } from '../utils/gblist';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

/* GB list proxy */
// router.get('/list', (req, res, next) => {
//   // const listUrl = 'http://www.giantbomb.com/profile/cathadan/lists/played-in-2016/354562/';
//   const listUrl = 'http://www.giantbomb.com/profile/cathadan/lists/game-of-the-year-2014-users-choice/270398/';
//   res.contentType('json');
//   getListData(listUrl).then(resp => res.send(JSON.stringify(resp)));
// });

export default router;
