import * as jsdom from 'jsdom';

type ListResp = ListErrorResp | ListSuccesResp;

interface ListErrorResp {
    status: "error";
    reason: "not-a-list" | "parse-failed";
}

interface ListSuccesResp {
    status: "ok";
    list: GameList;
}

export interface GameList {
    title: string;
    author: string;
    deck: string;
    games?: Array<{
        title: string;
        url: string;
        thumbnailUrl: string;
    }>;
}

export function getListData(url: string): Promise<ListResp> {
    if (!url) {
        return Promise.reject({});
    }
    return new Promise<ListResp>((resolve, reject) => {
        jsdom.env(url, (err, window) => {
            const document = window.document;
            const list = document.querySelector('.user-list');
            if (!list) {
                resolve({ status: "error", reason: "not-a-list" });
                return;
            }

            let gameList: GameList;
            try {
                gameList = {
                    title: document.querySelector('article.js-user-list h1').innerHTML,
                    author: document.querySelector('section.profile-title h1').innerHTML,
                    deck: (document.querySelector('article.js-user-list') as HTMLElement).innerText,
                    games: Array.from(list.children).map(node => ({
                        title: node.querySelector('h3').innerHTML,
                        url: (node.querySelector('a') as HTMLAnchorElement).href,
                        thumbnailUrl: (node.querySelector('img') as HTMLImageElement).src,
                    }))
                };
            } catch (e) {
                resolve({ status: "error", reason: "parse-failed" });
                return;
            }

            resolve({ status: "ok", list: gameList });
        });
    });
}
