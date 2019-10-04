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

Phink.ajax = function (url, data, callback) {
    var params = [];

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
