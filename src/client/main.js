var Phink = function () { }
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

    var loadDepends = function (scripts, callback) {

        if (scripts.length > 0) {
            for (var i = 0; i < scripts.length; i++) {
                Phink.include(scripts[i], function (e) {
                    if (i === scripts.length) {
                        if (typeof callback === 'function') {
                            callback.call(null);
                        }

                    }
                });
            }

        } else {
            if (typeof callback === 'function') {
                callback.call(this);
            }
        }

    }

    var dependsOn = function (scripts, callback) {

        var dependsOn = function (src) {
            var xmlhttp, next;
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                    return;
                }
            }
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    eval(xmlhttp.responseText);
                    next = scripts.shift();
                    if (next) {
                        dependsOn(next);
                    } else if (typeof callback == 'function') {
                        callback();
                    }
                }
            }
            xmlhttp.open("GET", src, true);
            xmlhttp.send();
        };
        if (scripts.length > 0) {
            dependsOn(scripts.shift());
        } else if (typeof callback == 'function') {
            callback();
        }
    }
    
    var loadDeps = function (scripts, callback) {

        var loadDeps = function (src) {
            var next;
            var tag = document.createElement("script");
            tag.src = src;
            tag.type = "text/javascript";

            tag.addEventListener('load', function (e) {
                next = scripts.shift();
                if (next) {
                    loadDeps(next);
                } else if (typeof callback == 'function') {
                    callback();
                }
            })
            document.body.appendChild(tag);

        };
        if (scripts.length > 0) {
            loadDeps(scripts.shift());
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

