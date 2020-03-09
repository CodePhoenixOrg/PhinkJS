var mainNode = document.querySelectorAll("script[src='/phink.js']");
var depends = (mainNode.length > 0 && mainNode[0].dataset.depends !== undefined) ? mainNode[0].dataset.depends.split(";") : [];
var sources = (mainNode.length > 0 && mainNode[0].dataset.sources !== undefined) ? mainNode[0].dataset.sources.split(";") : [];
var main = (mainNode.length > 0 && mainNode[0].dataset.init !== undefined) ? mainNode[0].dataset.init : 'phink_main';

Phink.DOM.ready(function () {

    Phink.Backend.loadScriptsArray(depends, function () {
        // for (var i = 0; i < sources.length; i++) {
        // Phink.include(sources[i], 
        Phink.Backend.loadScriptsArray(sources, function (e) {
            if (typeof window[main] === 'function') {
                var initnow = 'phink_app_init_' + Date.now();
                window[initnow] = window[main];
                window[main] = null;
                window[initnow]();
            }
        });
        // }
    });

    Phink.Backend.bindEvents();
});