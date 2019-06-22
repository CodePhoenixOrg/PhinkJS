'use strict';
import { sep } from 'path';
import { readFileSync, writeFileSync } from 'fs';

let folders = __dirname.split(sep);

global.PHINK_ROOT = folders.join(sep) + sep;

if(global.PHINK_ROOT.indexOf('bower_components') > -1 || global.PHINK_ROOT.indexOf('vendor') > -1) {
    folders.pop();
    folders.pop();
}
folders.pop();

global.SITE_ROOT = folders.join(sep) + sep;
global.APP_ROOT = global.SITE_ROOT + 'app' + sep;
global.APP_CERT = global.APP_ROOT + 'certs' + sep;
global.APP_DATA = global.APP_ROOT + 'data' + sep;
global.APP_MODELS = global.APP_ROOT + 'models' + sep;
global.APP_CONTROLLERS = global.APP_ROOT + 'controllers' + sep;
global.APP_VIEWS = global.APP_ROOT + 'views' + sep;
global.DOCUMENT_ROOT = global.SITE_ROOT + 'web' + sep;
global.DIRECTORY_SEPARATOR = sep;

let BootStrap = function () { };

BootStrap.init = function () {

    let _concat = function (srcdir, srctree, destfile) {
        let content = "";

        for (let i = 0; i < srctree.length; i++) {
            content += readFileSync(srcdir + srctree[i]) + "\n";
        }
        writeFileSync(destfile, content, { encoding: 'utf-8', mode: 0o666, flag: 'w' });

    }

    let outfile = global.PHINK_ROOT + "phink.js";

    let dir = global.PHINK_ROOT + "client" + sep;
    let tree = [
        "main.js",
        "core" + sep + "url.js",
        "core" + sep + "registry.js",
        "utils" + sep + "text.js",
        "core" + sep + "object.js",
        "web" + sep + "web_object.js",
        "web" + sep + "web_application.js",
        "web" + sep + "rest.js",
        "mvc" + sep + "view.js",
        "mvc" + sep + "controller.js",
        "web" + sep + "ui" + sep + "plugin.js",
        "web" + sep + "ui" + sep + "plugin" + sep + "accordion.js",
        "web" + sep + "ui" + sep + "plugin" + sep + "list.js",
        "web" + sep + "ui" + sep + "plugin" + sep + "table.js"
    ];

    _concat(dir, tree, outfile);

}

BootStrap.init();

export default BootStrap;
