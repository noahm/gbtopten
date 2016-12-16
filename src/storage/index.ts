import * as fs from 'fs';
import * as path from 'path';
import * as zlib from 'zlib';

import { GameList } from '../../models/GameList';
import { ServerState as AppState } from '../../models/ServerState';
import { GetList } from '../../models/responses';
import { ListGrader } from '../utils/gblist';

const DEV_STORAGE_LOCATION = path.join(__dirname, '..', '..', 'db.json');
const PROD_STORAGE_LOCATION = path.join(__dirname, '..', '..', 'db.json.gz');

let instance: Storage;

export function init(env: string) {
    instance = new Storage(env);
}

export function get() {
    return instance;
}

class Storage {
    private env: string;
    private db: AppState = {
        users: {},
        lists: {},
        targetList: null,
    };
    private grader: ListGrader;

    constructor(env: string) {
        this.env = env;
        try {
            let json: string;
            switch (env) {
                case 'development':
                    json = fs.readFileSync(DEV_STORAGE_LOCATION, 'utf8');
                    break;
                default:
                    json = zlib.gunzipSync(fs.readFileSync(PROD_STORAGE_LOCATION)).toString('utf8');
            }
            const restoredState = JSON.parse(json);
            if (!restoredState) {
                return;
            }
            this.db = restoredState;
            if (this.db.targetList) {
                this.grader = new ListGrader(this.db.targetList);
            }
        } catch (e) {
            console.warn('Failed to restore app state', e.message);
            console.warn('Using default app state');
        }
    }

    getDB = () => this.db;
    getUsers = () => this.db.users;
    getLists = () => this.db.lists;
    getTargetList = () => this.db.targetList;
    getGrader = () => this.grader;

    getList(username: string): GetList {
        if (this.db.lists[username]) {
            return {
                status: "ok",
                list: this.db.lists[username],
            };
        } else {
            return {
                status: "error",
                reason: "not-found",
            };
        }
    }

    setTargetList(list: GameList) {
        this.db.targetList = list;
        if (list) {
            this.grader = new ListGrader(list);
            this.rescoreEntries();
        } else {
            this.grader = null;
        }
    }

    private rescoreEntries() {
        if (!this.grader) {
            return;
        }
        Object.keys(this.db.lists).forEach(username => {
            const list = this.db.lists[username];
            const user = this.db.users[username];
            list.score = this.grader.getScore(list);
            user.listScore = list.score.totalScore;
        });
    }

    addUserList(list: GameList) {
        if (!list.author) {
            return false;
        }
        if (this.grader) {
            list.score = this.grader.getScore(list);
        }
        this.db.users[list.author] = {
            username: list.author,
            lastEntry: Date.now(),
            listScore: list.score ? list.score.totalScore : 0,
        };
        this.db.lists[list.author] = list;
    }

    save() {
        let db = JSON.stringify(this.db);
        switch (this.env) {
            case 'development':
                fs.writeFile(DEV_STORAGE_LOCATION, db);
                break;
            default:
                zlib.gzip(Buffer.from(db), (err, result) => {
                    if (err) {
                        console.error('Failed to zip db while saving', err);
                        return;
                    }
                    fs.writeFile(PROD_STORAGE_LOCATION, result);
                });
        }
    }
}


