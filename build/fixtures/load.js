"use strict";
let fixtures = require('pow-mongodb-fixtures').connect('test');
const data_1 = require("./data");
function loadData(cb) {
    fixtures.clearAndLoad({
        test: data_1.data
    }, cb);
}
exports.loadData = loadData;
