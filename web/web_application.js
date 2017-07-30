'use strict';
let PhinkJSWebObject = require('./web_object.js');
let PhinkJSWebRouter = require('./web_router.js');
let PhinkJSRestRouter = require('../rest/rest_router.js');
let PhinkJSBaseRouter = require('../core/base_router.js');

let bootstrap = require('../bootstrap');

class PhinkJSWebApplication extends PhinkJSWebObject {
    constructor() {
        super(this);

        this._headers = null;
    }

    get headers() {
        return this._headers;
    }

    static create(url, options, callback) {

        const baseurl = require('url').parse(url);
        let port = baseurl.port;

        //baseurl.protocol == 'https' && 
        if(options !== null && options.key !== undefined && options.cert !== undefined) {
            const fs = require("fs");

            if(fs.existsSync(global.APP_CERT + options.key) 
            && fs.existsSync(global.APP_CERT + options.cert)) {
                options.key = fs.readFileSync(global.APP_CERT + options.key);
                options.cert = fs.readFileSync(global.APP_CERT + options.cert);
            }
            console.log(options);
            require('https').createServer(options, function(req, res) {
                console.log(req);
                PhinkJSWebApplication.engine(req, res, callback);
            }).listen(port);

        } else {
            require('http').createServer(function(req, res) {
                PhinkJSWebApplication.engine(req, res, callback);
            }).listen(port);

        }

    }

    static engine (req, res, callback) {
        
        let body = [];
        let self = this;

        req.on('error', function (err) {
            console.error(err);
        }).on('data', function (chunk) {
            body.push(chunk);
        }).on('end', function () {

            body = Buffer.concat(body).toString();
            req.on('error', function (err) {
                console.error(err);
            })

            let router = new PhinkJSBaseRouter(this, req, res);
            router.match();

            if (router.requestType === 'rest') {
                router = new PhinkJSRestRouter(router);
            } else {
                router = new PhinkJSWebRouter(router);
            }

            if(body !== '') {
                Object.assign(router._parameters, JSON.parse(body));
            }
            
            router.translate(function (exists) {
                if (exists) {
                    router.dispatch(function (rreq, rres, stream) {
                        self._headers = rreq.headers;
                        if (typeof callback === 'function') {
                            callback(rreq, rres, stream);
                        }

                        rres.write(stream);
                        rreq.emit('finish');
                    });
                } else {
                    res.writeHead(404, {
                        'Content-Type': router.mimeType
                    });
                    res.write("Error 404 - It looks like you are lost in middle of no ware ...");
                    req.emit('finish');
                }
            });

        }).on('finish', function () {
            res.end();
            req.emit('close');
        }).on('close', function () {
            req = null;
            res = null;
        });

    }
}

module.exports = PhinkJSWebApplication;