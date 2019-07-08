var Phink = Phink || {}

Phink.MVC = Phink.MVC || {}
Phink.MVC.Controller = class C extends Phink.Web.Object {
    constructor(view, name) {
        super(view);
        this.domain = (view !== undefined) ? view.getDomain() : '';
        this.hasView = true;
        if (view instanceof Phink.MVC.View) {
            this.parent = view;
        }
        else if (typeof view === 'Object') {
            throw new Error('Not a valid view');
        }
        else {
            this.hasView = false;
        }
        this.name = name;
    }
    oninit(callback) {
        if (typeof callback === 'function') {
            callback.call(this);
        }
        return this;
    }
    onload(callback) {
        var the = this;
        Phink.DOM.ready(function () {
            if (typeof callback === 'function') {
                callback.call(the);
            }
        });
        return this;
    }
    render() {
        if (typeof this.oninit === 'function') {
            this.oninit();
        }
        if (typeof this.onload === 'function') {
            this.onload();
        }
    }
    actions(actions) {
        for (var key in actions) {
            this[key] = actions[key];
        }
        this.render();
        return this;
    }
    route(route, callback) {
        var routeMatcher = new RegExp(route.replace(/:[^\s/]+/g, '([\\w-]+)'));
        this.parent.requestView(view, action, args, callback);
    }
    getSimpleView(view, callback) {
        this.parent.requestSimpleView(view, callback);
    }
    getView(view, action, args, callback) {
        this.parent.requestView(view, action, args, callback);
    }
    getPartialView(pageName, action, attach, postData, callback) {
        this.parent.requestPart(pageName, action, attach, postData, callback);
    }
    parseViewResponse(pageName, callback) {
        this.parent.parseResponse(pageName, callback);
    }
    attachWindow(pageName, anchor) {
        this.parent.attachWindow(pageName, anchor);
    }
    attachView(pageName, anchor) {
        this.parent.attachView(pageName, anchor);
    }
    attachIframe(id, src, anchor) {
        this.parent.attachIframe(id, src, anchor);
    }
    static create(parent, name) {
        if (name === undefined) {
            name = 'ctrl' + Date.now();
        }
        return new Phink.MVC.Controller(parent, name);
    }
}













    

