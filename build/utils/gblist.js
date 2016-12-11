"use strict";
const jsdom = require("jsdom");
function getListData(url) {
    if (!url) {
        return Promise.reject({});
    }
    return new Promise((resolve, reject) => {
        jsdom.env(url, (err, window) => {
            const document = window.document;
            const list = document.querySelector('.user-list');
            if (!list) {
                resolve({ status: "error", reason: "not-a-list" });
                return;
            }
            let gameList;
            try {
                gameList = {
                    title: document.querySelector('article.js-user-list h1').innerHTML,
                    author: document.querySelector('section.profile-title h1').innerHTML,
                };
                gameList.games = Array.from(list.children).map(node => {
                    return {
                        title: node.querySelector('h3').innerHTML,
                        url: node.querySelector('a').href,
                        thumbnailUrl: node.querySelector('img').src,
                    };
                });
            }
            catch (e) {
                resolve({ status: "error", reason: "parse-failed" });
                return;
            }
            resolve({ status: "ok", list: gameList });
        });
    });
}
exports.getListData = getListData;
