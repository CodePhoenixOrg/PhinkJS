'use strict';

let Controller = require(global.PHINK_ROOT + 'mvc/controller');

class Index extends Controller {
    constructor(parent, viewName) {
        super(parent, viewName);
    }

    load(callback) {
            callback(true);
    }
}

module.exports = Index;
