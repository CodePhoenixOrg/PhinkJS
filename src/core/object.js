'use strict';

class PhinkJSObject {
    constructor(parent) {
        this._id = '';
        this._name = '';
        this._parent = (parent !== undefined) ? parent : null;
    }

    set id(value) {
        this._id = value;

        return this;
    }
    get id() {
        return this._id;
    }

    set name(value) {
        this._name = value;

        return this;
    }
    get name() {
        return this._name;
    }

    set parent(value = null) {
        this._parent = value;
    }
    get parent() {
        return this._parent;
    }
}

export default PhinkJSObject;