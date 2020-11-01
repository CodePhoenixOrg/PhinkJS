var Phink = {}

Phink.DOM = (function () {

    class _DOM {
        constructor() {
            const FILE_NAME = 'phink.js';
            var phinkNode = document.querySelectorAll("script[src*='" + FILE_NAME + "']");
            this._depends = (phinkNode.length > 0 && phinkNode[0].dataset.depends !== undefined) ? phinkNode[0].dataset.depends.split(";") : [];
            this._sources = (phinkNode.length > 0 && phinkNode[0].dataset.sources !== undefined) ? phinkNode[0].dataset.sources.split(";") : [];

            if(this._depends.length > 0 && this._depends[this._depends.length - 1] == "" ) {
                this._depends.pop();
            }
            if(this._sources.length > 0 && this._sources[this._sources.length - 1] == "" ) {
                this._sources.pop();
            }

            this._rewriteBase = (phinkNode.length > 0 && phinkNode[0].dataset.rewritebase !== undefined) ? phinkNode[0].dataset.rewritebase : null;
            this._main = (phinkNode.length > 0 && phinkNode[0].dataset.init !== undefined) ? phinkNode[0].dataset.init : 'phink_main';

            this._rewriteBase = (this._rewriteBase === null) ? (new URL(phinkNode[0].src)).pathname.replace(FILE_NAME, '') : this._rewriteBase;

            this._rewriteBase = this._rewriteBase != '' ? this._rewriteBase : '/';

        }
        get rewriteBase() {
            return this._rewriteBase;
        }
        get depends() {
            return this._depends;
        }
        get sources() {
            return this._sources;
        }
        get main() {
            return this._main;
        }
        ready(f) {
            /in/.test(document.readyState) ? setTimeout('Phink.DOM.ready(' + f + ')', 9) : f();
        }
    }
    return new _DOM();
})();

Phink.include = function (file, callback) {
    var tag = document.createElement("script");
    tag.src = file;
    tag.type = "text/javascript";

    tag.addEventListener('load', function (e) {
        while (!e.returnValue) {

        }
        if (typeof callback === 'function') {
            callback.call(null, e);
        }
    })
    document.body.appendChild(tag);

}

Phink.ajax = function (url, data, callback) {
    var params = [];

    var urls = new Phink.Url(url, window.location.hostname);
    url = urls.toString();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            params.push(key + '=' + encodeURI(data[key]));
        }
    }

    var queryString = params.join('&');
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
    xhr.onload = function () {
        if (xhr.status < 300 || xhr.status === 304) {
            var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];

            if (typeof callback == 'function') {
                callback.call(this, data, xhr.statusText, xhr);
            }
        }

    }
    xhr.onerror = function () {
        xhr.abort();
    }
    xhr.onabort = function () {
        if (xhr.statusText === 'error') {
            errorLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + xhr.statusText + "\r\n" +
                "Message : " + xhr.responseText);
        }
    }

    xhr.send(queryString);
}

function debugLog(message) {
    console.log(message);
}

function errorLog(message) {
    console.error(message);
}
