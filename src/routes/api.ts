import * as express from 'express';
import * as bodyParser from 'body-parser';

import { getListData, refreshTarget } from '../utils/gblist';
import { PostList, GetList } from '../../models/responses';
import * as storage from '../storage';
export const router = express.Router();

router.get('/users', (req, res, next) => {
  const db = storage.get();
  res.json(db.getUsers());
});

router.put('/rescore', async (req, res, next) => {
  const rescoreResult = await refreshTarget();
  if (rescoreResult.status === "error") {
    switch (rescoreResult.reason) {
      case "too-soon":
        res.status(429);
        break;

      case "parse-failed":
      default:
        res.status(500);
        break;
    }
  } else {
    const db = storage.get();
    db.setTargetList(rescoreResult.targetList);
    db.save();
  }

  res.json(rescoreResult);
});

router.post('/list', bodyParser.text(), (req, res, next) => {
  const db = storage.get();
  if (db.getTargetList()) {
    const errResp: PostList = {
      status: "error",
      reason: "submissions-closed",
    };
    res.status(400).json(errResp);
    return;
  }

  getListData(req.body).then(resp => {
    if (resp.status === 'ok') {
      db.addUserList(resp.list);
      db.save();
    } else if (resp.reason === "parse-failed") {
      res.status(500);
    } else if (resp.reason === "not-a-list") {
      res.status(400);
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

router.get('/targetlist', (req, res, next) => {
  const list = storage.get().getTargetList();
  let resp: GetList = {
    status: "ok",
    list,
  };
  res.json(resp);
});
