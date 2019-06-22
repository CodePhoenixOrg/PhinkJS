var NPhinkJS= NPhinkJS|| {}
PhinkJS.Utils = PhinkJS.Utils || {}
PhinkJS.Utils.IO = PhinkJS.Utils.IO || {}

import { resolve } from 'path';

PhinkJS.Utils.IO.walkTree = function (dir, callback) {

    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return callback.call(err);
        var pending = list.length;
        if (pending === 0) return callback.call(null, results);

        list.forEach(function (file) {
            file = resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    pending--;
                    walkTree(file, callback);
                } else {
                    results.push(file);
                    pending--;
                    if (pending === 0) callback.call(null, results);
                }
            });
        });
    });
};

export default PhinkJS.Utils.IO;