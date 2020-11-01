'use strict';
let PhinkJS = global.PhinkJS || {};
PhinkJS.Web = PhinkJS.Web || {};

PhinkJS.Object = require(__dirname + '/../core/object.js');

PhinkJS.Web.Object = class F extends PhinkJS.Object {
    constructor(parent) {
        super(parent)

        this._port = '';
    }

    set port(value) {
        this._port = value;
    }
    get port() {
        return this._port;
    }

    static include(file, encoding, callback) {
        require('fs').readFile(file, encoding, function (err, stream) {
            if (typeof callback === 'function') {
                callback(err, stream);
            }

        });
    }
}

module.exports = PhinkJS.Web.Object;