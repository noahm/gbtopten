import * as fs from 'fs';
import * as path from 'path';

import { GameList } from '../../models/GameList';
import { ServerState as AppState } from '../../models/ServerState';
import { ListGrader } from '../utils/gblist';

const STORAGE_LOCATION = path.join(__dirname, '..', '..', 'db.json');

let instance: Storage;

export function init() {
    instance = new Storage();
}

export function get() {
    return instance;
}

class Storage {

    private db: AppState = {
        users: {},
        lists: {},
        targetList: null,
    };
    private grader: ListGrader;

    constructor() {
        try {
            const file = fs.readFileSync(STORAGE_LOCATION, 'utf8');
            const restoredState = JSON.parse(file);
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
    getGrader = () => this.grader;

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
        fs.writeFile(path.join(__dirname, '..', '..', 'db.json'), JSON.stringify(this.db));
    }
}


