'use strict';
let PhinkJS = {};

let sep = require('path').sep;
let fs = require('fs');

let folders = __dirname.split(sep);

global.PHINK_ROOT = folders.join(sep) + sep;

if(global.PHINK_ROOT.indexOf('bower_components') > -1 || global.PHINK_ROOT.indexOf('vendor') > -1) {
    folders.pop();
    folders.pop();
}
folders.pop();


global.SITE_ROOT = folders.join(sep) + sep;
global.SRC_ROOT = global.SITE_ROOT + 'src' + sep;
global.APP_ROOT = global.SRC_ROOT + 'app' + sep;
global.APP_CERT = global.APP_ROOT + 'certs' + sep;
global.APP_DATA = global.APP_ROOT + 'data' + sep;
global.APP_MODELS = global.APP_ROOT + 'models' + sep;
global.APP_CONTROLLERS = global.APP_ROOT + 'controllers' + sep;
global.APP_VIEWS = global.APP_ROOT + 'views' + sep;
global.DOCUMENT_ROOT = global.SRC_ROOT + 'web' + sep;
global.DIRECTORY_SEPARATOR = sep;

class BootStrap {
    constructor() { }
    static init() {
        let _concat = function (srcdir, srctree, destfile) {
            let content = "";
            for (let i = 0; i < srctree.length; i++) {
                content += fs.readFileSync(srcdir + srctree[i]) + "\n";
            }
            fs.writeFileSync(destfile, content, { encoding: 'utf-8', mode: 0o666, flag: 'w' });
        };
        let outfile = global.PHINK_ROOT + "phink.js";
        let dir = global.PHINK_ROOT + "client" + sep;
        let tree = [
            "core" + sep + "main.js"
            , "core" + sep + "registry.js"
            , "core" + sep + "object.js"
            , "core" + sep + "url.js"
            , "rest" + sep + "rest.js"
            , "web" + sep + "web_object.js"
            , "web" + sep + "web_application.js"
            , "mvc" + sep + "view.js"
            , "mvc" + sep + "controller.js"
            , "utils" + sep + "utils.js"
            , "utils" + sep + "backend.js"
            , "utils" + sep + "commands.js"
            , "web" + sep + "ui" + sep + "plugin.js"
            , "web" + sep + "ui" + sep + "plugin" + sep + "accordion.js"
            , "web" + sep + "ui" + sep + "plugin" + sep + "list.js"
            , "web" + sep + "ui" + sep + "plugin" + sep + "table.js"
            , "bootstrap.js"

        ];
        _concat(dir, tree, outfile);
    }
}

BootStrap.init();

module.exports = BootStrap;
