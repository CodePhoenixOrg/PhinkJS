var Phink = Phink || {};

Phink.Object = class F {
    constructor(parent = null) {
        this._id = '';
        this._name = '';
        this._parent = parent;
    }
    set id(value) {
        this._id = value;
    }
    get id() {
        return this._id;
    }
    set name(value) {
        this._name = value;
    }
    get name() {
        return this._name;
    }
    set parent(value) {
        this._parent = value;
    }
    get parent() {
        return this._parent;
    }
}
