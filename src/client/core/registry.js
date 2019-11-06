var Phink = Phink || {}

Phink.Registry = (function () {
    
    class R {
        constructor() {
            this._registry = {};
        }
        write(item, key, value) {
            if (this._registry[item] === undefined) {
                this._registry[item] = {};
            }
            this._registry[item][key] = value;
        }
        read(item, key, defaultValue) {
            var result = null;
            if (this._registry[item] !== undefined) {
                result = (this._registry[item][key] !== undefined) ? this._registry[item][key] : ((defaultValue !== undefined) ? defaultValue : null);
            }
            return result;
        }
        item(item) {
            if(item == '') {
                item = '#';
            }

            if (item === null || item === undefined) {
                return null;
            }

            if (this._registry[item] !== undefined && this._registry[item] !== null) {
                return this._registry[item];
            }
            else {
                this._registry[item] = {};
                return this._registry[item];
            }
        }
        items() {
            return this._registry;
        }
        clear() {
            this._registry = {};
        }
        set token(value) {
            this._registry['token'] = value;
            return this;
        }
        get token() {
            return this._registry['token'];
        }
        set origin(value) {
            this._registry['origin'] = value;
            return this;
        }
        get origin() {
            return this._registry['origin'];
        }
    }

    return new R();
})();
