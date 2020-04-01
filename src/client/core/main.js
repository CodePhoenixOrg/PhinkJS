var Phink = {}

Phink.DOM = (function () {
    
    class _DOM {
        constructor() {
            const FILE_NAME = 'phink.js';
            var phinkNode = document.querySelectorAll("script[src*='" + FILE_NAME + "']");
            this._depends = (phinkNode.length > 0 && phinkNode[0].dataset.depends !== undefined) ? phinkNode[0].dataset.depends.split(";") : [];
            this._sources = (phinkNode.length > 0 && phinkNode[0].dataset.sources !== undefined) ? phinkNode[0].dataset.sources.split(";") : [];
            this._main = (phinkNode.length > 0 && phinkNode[0].dataset.init !== undefined) ? phinkNode[0].dataset.init : 'phink_main';
            
            this._rewriteBase = phinkNode[0].src.substring(window.location.protocol.length + 2 + window.location.hostname.length);
            this._rewriteBase = this._rewriteBase.substring(0, this._rewriteBase.length - FILE_NAME.length);
        
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
        ready (f) { 
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
        if (typeof callback === 'function') {
            callback.call(null, e);
        }
    })
    document.body.appendChild(tag);
}

Phink.ajax = function (url, data, callback) {
    var params = [];

    var urls = new Phink.Url(url, window.location.host + Phink.DOM.rewriteBase);
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

            if(typeof callback == 'function') {
                callback.call(this, data, xhr.statusText, xhr);
            }
        }

    }
    xhr.onerror = function() {
        xhr.abort();
    }
    xhr.onabort = function() {
        if(xhr.statusText === 'error') {
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
