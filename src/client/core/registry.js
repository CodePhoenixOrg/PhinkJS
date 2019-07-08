var Phink = Phink || {}

Phink.Registry = (function () {
    
    class R {
        constructor() {
            this.registry = {};
        }
        write(item, key, value) {
            if (this.registry[item] === undefined) {
                this.registry[item] = {};
            }
            this.registry[item][key] = value;
        }
        read(item, key, defaultValue) {
            var result = null;
            if (this.registry[item] !== undefined) {
                result = (this.registry[item][key] !== undefined) ? this.registry[item][key] : ((defaultValue !== undefined) ? defaultValue : null);
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

            if (this.registry[item] !== undefined && this.registry[item] !== null) {
                return this.registry[item];
            }
            else {
                this.registry[item] = {};
                return this.registry[item];
            }
        }
        items() {
            return this.registry;
        }
        clear() {
            this.registry = {};
        }
        setToken(value) {
            this.registry['token'] = value;
            return this;
        }
        getToken() {
            return this.registry['token'];
        }
        setOrigin(value) {
            this.registry['origin'] = value;
            return this;
        }
        getOrigin() {
            return this.registry['origin'];
        }
    }

    return new R();
})();