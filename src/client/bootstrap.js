
Phink.DOM.ready(function () {

    Phink.Backend.loadScriptsArray(Phink.DOM.depends, function () {
        Phink.Backend.loadScriptsArray(Phink.DOM.sources, function() {
            if (typeof window[Phink.DOM.main] === 'function') {
                var initnow = 'phink_app_init_' + Date.now();
                window[initnow] = window[Phink.DOM.main];
                window[Phink.DOM.main] = null;
                window[initnow]();
            }
        });
    });
    Phink.Backend.bindEvents();
});