var Phink = {}
Phink.DOM = Phink.DOM || {}
Phink.DOM.ready = function (f) { /in/.test(document.readyState) ? setTimeout('Phink.DOM.ready(' + f + ')', 9) : f() }

Phink.include = function (file, callback) {
    var tag = document.createElement("script");
    tag.src = file;
    tag.type = "text/javascript";

    tag.addEventListener('load', function (e) {
        if (typeof callback === 'function') {
            callback.call(null, e);
        }
    })
    document.body.appendChild(tag);
}

var mainNode = document.querySelectorAll("script[src='/phink.js']");
var depends = (mainNode.length > 0 && mainNode[0].dataset.depends !== undefined) ? mainNode[0].dataset.depends.split(";") : [];
var sources = (mainNode.length > 0 && mainNode[0].dataset.sources !== undefined) ? mainNode[0].dataset.sources.split(";") : [];
var main = (mainNode.length > 0 && mainNode[0].dataset.init !== undefined) ? mainNode[0].dataset.init : 'phink_main';

Phink.DOM.ready(function () {

    var loadDeps = function (scripts, callback) {

        var F = function (src) {
            var next;
            var tag = document.createElement("script");
            tag.src = src;
            tag.type = "text/javascript";

            tag.addEventListener('load', function (e) {
                next = scripts.shift();
                if (next) {
                    F(next);
                } else if (typeof callback == 'function') {
                    callback();
                }
            })
            document.body.appendChild(tag);

        };
        if (scripts.length > 0) {
            F(scripts.shift());
        } else if (typeof callback == 'function') {
            callback();
        }
    }

    loadDeps(depends, function () {
        for (var i = 0; i < sources.length; i++) {
            Phink.include(sources[i], function (e) {
                if (typeof window[main] === 'function') {
                    var initnow = 'phink_app_init_' + Date.now();
                    window[initnow] = window[main];
                    window[main] = null;
                    window[initnow]();
                }
            });
        }
    });


});

