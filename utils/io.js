var NestJS = NestJS || {}
NestJS.Utils = NestJS.Utils || {}
NestJS.Utils.IO = NestJS.Utils.IO || {}

var path = require('path');
var file = require('fs');

NestJS.Utils.IO.walkTree = function (dir, callback) {

    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return callback.call(err);
        var pending = list.length;
        if (pending === 0) return callback.call(null, results);

        list.forEach(function (file) {
            file = path.resolve(dir, file);
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

module.exports = NestJS.Utils.IO;