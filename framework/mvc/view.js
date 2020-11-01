'use strict';
let PhinkJS = global.PhinkJS || {};
PhinkJS.Web = PhinkJS.Web || {};
PhinkJS.MVC = PhinkJS.MVC || {};

PhinkJS.Web.Object = require('../web/web_object.js');
PhinkJS.MVC.View = class F extends PhinkJS.Web.Object {

    constructor(parent, viewName) {
        super(parent);
        
        this._viewName = viewName;
        this._viewFileName = global.APP_VIEWS + viewName + '.html';

    }

    getTemplate(callback) {
        require('fs').readFile(this._viewFileName, 'utf-8', function (err, data) {
            callback(err, data);
        });
    }
}

module.exports = PhinkJS.MVC.View;