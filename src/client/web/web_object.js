var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Object = class F extends Phink.Object {
    constructor(domain, isSSL) {
        super();
        this.parent = this;
        this.isSSL = isSSL;
        this.origin = '';
        this.url = {};
        this.token = '';
        this.domain = domain;
    }
    getDomain() {
        return this.domain;
    }
    setOrigin(value) {
        this.origin = value;
        return this;
    }
    getOrigin() {
        return this.origin;
    }
    setToken(value) {
        this.token = value;
        return this;
    }
    getToken() {
        return this.token;
    }
    getPath(url, domain) {
        this.url = new Phink.Url(url, domain, this.isSSL);
        return this.url.toString();
    }
    getUrl() {
        return this.url;
    }
    getJSON(url, postData, callback) {
        postData.token = Phink.Registry.getToken();
        this.origin = Phink.Registry.getOrigin();
        var urls = this.getPath(url, this.domain);
        var xhr = new XMLHttpRequest();
        var params = '';
        for (var key in postData) {
            if (postData.hasOwnProperty(key)) {
                params += '&' + encodeURI(key + '=' + postData[key]);
            }
        }
        params = params.substring(1);
        xhr.open('POST', urls);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*; q=0.01");
        xhr.onload = function () {
            if (typeof callback === 'function') {
                if (xhr.status === 200 || xhr.status === 202) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : [];
                    try {
                        if (data.error !== undefined) {
                            debugLog('Error : ' + data.error);
                        }
                        else {
                            Phink.Registry.setToken(data.token);
                            Phink.Registry.setOrigin(xhr.getResponseHeader('origin'));
                            callback.call(this, data, xhr.statusText, xhr);
                        }
                    }
                    catch (e) {
                        debugLog(e);
                    }
                }
            }
        };
        xhr.send(params);
    }
    getJSONP(url, postData, callBack) {
        postData.token = Phink.Registry.getToken();
        this.origin = Phink.Registry.getOrigin();
        var urls = this.getPath(url, this.domain);
        $.ajax({
            type: 'POST',
            url: urls + "&callback=?",
            data: postData,
            dataType: 'json',
            async: true
        }).done(function (data, textStatus, xhr) {
            try {
                Phink.Registry.setToken(data.token);
                Phink.Registry.setOrigin(xhr.getResponseHeader('origin'));
                if ($.isFunction(callBack)) {
                    callBack.call(this, data, textStatus, xhr);
                }
            }
            catch (e) {
                debugLog(e);
            }
        }).fail(function (xhr, options, message) {
            debugLog("Satus : " + xhr.status + "\r\n" +
                "Options : " + options + "\r\n" +
                "Message : " + message);
        });
    }
    getScript(url, callback) {
        var urls = this.getPath(url, this.domain);
        $.getScript(urls)
            .done(function (script, textStatus) {
                if (typeof callback === 'function') {
                    callback.call(this, script, textStatus);
                }
            })
            .fail(function (jqxhr, settings, exception) {
                debugLog("Satus : " + jqxhr.status + "\r\n" +
                    "Options : " + settings + "\r\n" +
                    "Message : " + exception);
            });
    }
    static getCSS(attributes) {
        // setting default attributes
        if (typeof attributes === "string") {
            var href = attributes;
            if (this.origin !== undefined) {
                href = this.origin + '/' + href;
            }
            attributes = {
                href: href
            };
        }
        if (!attributes.rel) {
            attributes.rel = "stylesheet";
        }
        // appending the stylesheet
        // no jQuery stuff here, just plain dom manipulations
        var styleSheet = document.createElement("link");
        for (var key in attributes) {
            styleSheet.setAttribute(key, attributes[key]);
        }
        var head = document.getElementsByTagName("head")[0];
        head.appendChild(styleSheet);
    }
}










