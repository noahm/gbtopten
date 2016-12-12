import {Request, Response} from "express";
import * as express from 'express';
import { getListData } from '../utils/gblist';
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
  res.send(JSON.stringify(db.getDB()));
});

/* GB list proxy */
router.get('/list', (req, res, next) => {
  // const listUrl = 'http://www.giantbomb.com/profile/cathadan/lists/played-in-2016/354562/';
  const listUrl = 'http://www.giantbomb.com/profile/cathadan/lists/game-of-the-year-2014-users-choice/270398/';
  res.contentType('json');
  getListData(listUrl).then(resp => {
    const db = storage.get();
    if (resp.status === 'ok') {
      db.addUserList(resp.list);
      db.save();
    }
    res.send(JSON.stringify(resp));
  });
});

export default router;
