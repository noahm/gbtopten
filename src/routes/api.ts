import * as express from 'express';
import * as bodyParser from 'body-parser';

import { getListData } from '../utils/gblist';
import { PostList } from '../../models/responses';
import * as storage from '../storage';
const router = express.Router();

router.get('/users', (req, res, next) => {
  const db = storage.get();
  res.json(db.getUsers());
});

/* GB list proxy */
const gbRegex = /^https?:\/\/www.giantbomb.com\/profile\//i;
router.post('/list', bodyParser.text(), (req, res, next) => {
  if (!req.body || !gbRegex.test(req.body)) {
    const errResp: PostList = {
      status: "error",
      reason: "not-a-list",
    };
    res.status(400);
    return res.json(errResp);
  }

  getListData(req.body).then(resp => {
    const db = storage.get();
    if (resp.status === 'ok') {
      db.addUserList(resp.list);
      db.save();
    } else if (resp.reason === "parse-failed") {
      res.status(500);
    }
    res.json(resp);
  });
});

router.get('/list/:username', (req, res, next) => {
  const resp = storage.get().getList(req.params['username']);
  if (resp.status === "error") {
    res.status(404);
  }
  res.json(resp);
});

export default router;
