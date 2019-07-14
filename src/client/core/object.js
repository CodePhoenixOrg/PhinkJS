var Phink = Phink || {};

Phink.Object = class O {
    constructor(parent = null) {
        this._id = '';
        this._name = '';
        this._parent = parent;
    }

    get id() {
        return this._id;
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
