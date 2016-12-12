import {Request, Response} from "express";
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { getListData } from '../utils/gblist';
import { PostList } from '../../models/responses';
import * as storage from '../storage';
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const db = storage.get();
  res.render('index', { title: 'GB top 10' });
});

router.get('/state', (req, res, next) => {
  const db = storage.get();
  res.contentType('json');
  res.send(JSON.stringify(db.getUsers()));
});

/* GB list proxy */
const gbRegex = /^https?:\/\/www.giantbomb.com\/profile\//i;
router.post('/list', bodyParser.text(), (req, res, next) => {
  res.contentType('json');
  if (!req.body || !gbRegex.test(req.body)) {
    const errResp: PostList = {
      status: "error",
      reason: "not-a-list",
    };
    return res.send(JSON.stringify(errResp));
  }
  // const listUrl = 'http://www.giantbomb.com/profile/cathadan/lists/played-in-2016/354562/';
  // const listUrl = 'http://www.giantbomb.com/profile/cathadan/lists/game-of-the-year-2014-users-choice/270398/';

  getListData(req.body).then(resp => {
    const db = storage.get();
    if (resp.status === 'ok') {
      db.addUserList(resp.list);
      db.save();
    }
    res.send(JSON.stringify(resp));
  });
});

export default router;
