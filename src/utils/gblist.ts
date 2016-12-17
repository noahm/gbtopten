import * as jsdom from 'jsdom';
import { GameList } from '../../models/GameList';
import { ListScore } from '../../models/ListScore';
import { PostList as ListResp, PutRescore as RescoreResp } from '../../models/responses';

const gbRegex = /^https?:\/\/www.giantbomb.com\/profile\//i;

export function getListData(url: string): Promise<ListResp> {
    if (!gbRegex.test(url)) {
        return Promise.resolve<ListResp>({
            status: "error",
            reason: "not-a-list",
            extra: "failed-regex",
        });
    }

    return new Promise<ListResp>((resolve, reject) => {
        jsdom.env(url, (err, window) => {
            const document = window.document;
            const list = document.querySelector('.user-list');
            if (!list) {
                resolve({
                    status: "error",
                    reason: "not-a-list",
                    extra: "no-list-in-dom",
                });
                return;
            }

            let gameList: GameList;
            try {
                gameList = {
                    title: document.querySelector('article.js-user-list h1').innerHTML,
                    author: document.querySelector('section.profile-title h1').innerHTML,
                    deck: (document.querySelector('article.js-user-list') as HTMLElement).innerText,
                    games: Array.from(list.children).map(node => ({ // strips leading numbers from titles of ordered list
                        title: node.querySelector('h3').innerHTML.replace(/^\d+\. /, ''),
                        url: (node.querySelector('a') as HTMLAnchorElement).href,
                        thumbnailUrl: (node.querySelector('img') as HTMLImageElement).src,
                    })).slice(0, 10),
                };
            } catch (e) {
                resolve({ status: "error", reason: "parse-failed" });
                return;
            }

            resolve({ status: "ok", list: gameList });
        });
    });
}

const targetListUrl = "http://www.giantbomb.com/profile/cathadan/lists/the-gb-2016-goty-top-10/357986/";
let lastTargetFetch = 0;
export async function refreshTarget(): Promise<RescoreResp> {
    const now = Date.now();
    if (now - lastTargetFetch < 600000) {
        // only allow fetch of target list once every 10 minutes
        return { status: "error", reason: "too-soon" };
    }

    lastTargetFetch = now;
    const data = await getListData(targetListUrl);
    if (data.status !== "ok") {
        return { status: "error", reason: "parse-failed" };
    }

    return { status: "ok", targetList: data.list };
}

export class ListGrader {
    private targetList: GameList;
    private gameIndex: { [gameUrl: string]: { index: number } };

    constructor(targetList: GameList) {
        this.targetList = targetList;
        this.gameIndex = {};
        targetList.games.forEach((game, index) => {
            this.gameIndex[game.url] = { index };
        });
    }

    getScore(list: GameList) {
        let rubric: ListScore = { games: {}, totalScore: 0 };

        list.games.forEach((game, index) => {
            // game only scores if it is in the target list and hasn't yet been scored
            // (prevents scoring a single game multiple times in one list)
            if (this.gameIndex[game.url] && !rubric.games[game.url]) {
                let score = 10 - Math.abs(index - this.gameIndex[game.url].index);
                rubric.totalScore += score;
                rubric.games[game.url] = { score };
            }
        });

        return rubric;
    }
}
