var Phink = Phink || {}

Phink.MVC = Phink.MVC || {}

Phink.MVC.View = class _View extends Phink.Web.Object {
    constructor(application, name) {
        super(application);
        this._id = 'view' + Date.now();
        this._domain = (application !== undefined) ? application.domain : '';
        this._isSecured = (application !== undefined) ? application.isSecured : '';
        this._token = '';
        this._name = name;
        // Phink.Registry.item(this._domain).view = this;
    }
    requestSimpleView(view, callback) {
        this.requestView(view, 'getViewHtml', null, callback);
    }
    requestView(view, action, args, callback) {
        var the = this;
        var token = Phink.Registry.token;
        var urls = this.fullyQualifiedURL(view, this._domain);
        var postData = { "action": action, "token": token };
        if (args != null) {
            for (var key in args) {
                postData[key] = args[key];
            }
        }
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
        xhr.setRequestHeader("Accept", "application/json, text/javascript, request/view, */*; q=0.01");
        xhr.onload = function () {
            if (typeof callback === 'function') {
                if (xhr.status === 200) {
                    var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                    //            var url = Phink.Web.Object.parseUrl(pageName);
                    //            Phink.Registry.item(the.name).origin = xhr.getResponseHeader('origin');
                    Phink.Registry.origin = xhr.getResponseHeader('origin');
                    Phink.Registry.token = data.token;
                    if (data.jso !== undefined) {
                        Phink.Backend.loadScriptsArray(data.jso);
                    }
                    if (data.scripts !== undefined) {
                        Phink.Backend.loadScriptsArray(data.scripts);
                    }

                    data.view = atob(data.view);
                    if (typeof callback === 'function') {
                        callback.call(this, data);
                    }
                    else {
                        document.querySelector(document.body).innerHTML = data.view;
                    }
                }
                else {
                    callback.call(this, xhr.status);
                }
            }
        };
        xhr.send(params);
    }
    requestPart(pageName, action, attach, postData, callback) {
        var the = this;
        var token = Phink.Registry.token;
        var urls = this.fullyQualifiedURL(pageName, this._domain);
        postData = postData || {};
        postData.action = action;
        postData.token = token;
        var the = this;
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
        xhr.setRequestHeader("Accept", "application/json, text/javascript, request/partialview, */*; q=0.01");
        xhr.onload = function () {
            try {
                if (typeof callback === 'function') {
                    var data = [];
                    data.status = xhr.status;
                    if (xhr.status === 200) {
                        var data = (xhr.responseText !== '') ? JSON.parse(xhr.responseText) : {};
                        Phink.Registry.token = data.token;
                        Phink.Registry.origin = xhr.getResponseHeader('origin');
                        if (data.jso !== undefined) {
                            Phink.Backend.loadScriptsArray(data.jso);
                        }
                        if (data.scripts !== undefined) {
                            Phink.Backend.loadScriptsArray(data.scripts);
                        }
                        var html = atob(data.view);
                        document.querySelector(attach).innerHTML = html;
                        if (typeof callback === 'function') {
                            callback.call(this, data);
                        }
                    }
                    else {
                        callback.call(this, xhr.status);
                    }
                }
            }
            catch (e) {
                errorLog(e);
            }
        };
        xhr.send(params);
    }
    parseResponse(response, callback) {
        if (response === '') {
            throw new Error('Response is empty !');
        }
        var the = this;
        response = atob(response);
        var data = JSON.parse(response);
        if (data['view'] === undefined) {
            throw new Error('Not a view !');
        }
        if (data.jso !== undefined) {
            Phink.Backend.loadScriptsArray(data.jso);
        }
        if (data.scripts !== undefined) {
            Phink.Backend.loadScriptsArray(data.scripts);
        }
        if (typeof callback === 'function') {
            callback.call(this, data);
        }
    }
    attachWindow(pageName, anchor) {
        this.requestSimpleView(pageName, function (data) {
            if (anchor !== undefined) {
                document.querySelector(anchor).innerHTML = data.view;
            }
            else {
                document.querySelector(document.body).innerHTML = data.view;
            }
        });
    }
    attachView(pageName, anchor) {
        var the = this;
        var myToken = Phink.Registry.token;
        this.getJSON(pageName, { "action": 'getViewHtml', "token": myToken }, function (data) {
            try {
                Phink.Registry.token = data.token;
                if (data.jso !== undefined) {
                    Phink.Backend.loadScriptsArray(data.jso);
                }
                if (data.scripts !== undefined) {
                    Phink.Backend.loadScriptsArray(data.scripts);
                }
                var html = atob(data.view);
                document.querySelector(anchor).innerHTML = html;
            }
            catch (e) {
                errorLog(e);
            }
        });
    }
    attachIframe(id, src, anchor) {
        var iframe = document.createElement('iframe');
        iframe.frameBorder = 0;
        iframe.width = "100%";
        iframe.height = "100%";
        iframe.id = id;
        iframe.setAttribute("src", src);
        document.getElementById(anchor).appendChild(iframe);
    }
    static create(parent, name) {
        return new Phink.MVC.View(parent, name);
    }
}
