
Phink.DOM.ready(function () {


    Phink.Backend.loadScriptsArray(Phink.DOM.depends, function () {
        Phink.Backend.loadScriptsArray(Phink.DOM.sources, function (e) {
            if (typeof window[Phink.DOM.main] === 'function') {
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