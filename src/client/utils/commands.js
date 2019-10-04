var Phink = Phink || {}

Phink.Commands = class C {
    constructor() {
    }
    static clearRuntime(callback) {
        Phink.ajax('/console', { "action": 'clearRuntime' }, function (data, status, xhr) {
            if(typeof callback == 'function') {
                callback.call(this, data, status, xhr);
            } else {
                console.log(data.result);
            }
        });
    }
    static run(command) {
        if (command === '#!r') { // rlog command
            this.clearRuntime();
        }
    }
}
