var Phink = Phink || {}

Phink.Web = Phink.Web || {}

Phink.Web.Application = class Z extends Phink.Web.Object {
    constructor(domain, name, isSSL) {
        super();
        this.id = 'app' + Date.now();
        if (name === undefined) {
            name = this.id;
        }
        this.name = name;
        this.domain = domain;
        this.viewCollection = [];
        this.controllerCollection = [];
    }
    includeView(name) {
        include('app/controllers/' + name + '/' + name + '.js');
        var newView = Phink.MVC.View.create(this, name);
        this.addView(newView);
        return newView;
    }
    createView(name) {
        var newView = Phink.MVC.View.create(this, name);
        this.addView(newView);
        return newView;
    }
    createController(viewName, name) {
        var view = this.getViewByName(viewName);
        var newCtrl = Phink.MVC.Controller.create(view, name);
        this.addController(newCtrl);
        return newCtrl;
    }
    getViewByName(viewName) {
        var result = null;
        for (var name in this.viewCollection) {
            if (name === viewName && this.viewCollection[name] !== undefined) {
                result = this.viewCollection[name];
                break;
            }
        }
        return result;
    }
    addView(view) {
        if (view === undefined)
            return null;
        if (!(view instanceof Phink.MVC.View)) {
            throw new Error('This is not a view');
        }
        else {
            this.viewCollection[view.name] = view;
        }
    }
    addController(controller) {
        if (controller === undefined)
            return null;
        if (!(controller instanceof Phink.MVC.Controller)) {
            throw new Error('This is not a controller');
        }
        else {
            this.controllerCollection.push(controller);
        }
    }
    static create(domain, name, isSSL) {
        return new Phink.Web.Application(domain, name, isSSL);
    }
}









