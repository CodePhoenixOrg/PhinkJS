var Phink = Phink || {}

Phink.Backend = class B {
    constructor() {
        this.isHacking = false;
        this.command = '';
    }
    static loadScriptsArray (scripts, callback) {

        var F = function (src) {
            var next;
            var tag = document.createElement("script");
            tag.src = src;
            tag.type = "text/javascript";

            tag.addEventListener('load', function (e) {
                next = scripts.shift();
                if (next) {
                    F(next);
                } else if (typeof callback == 'function') {
                    callback();
                }
            })
            document.body.appendChild(tag);

        };
        if (scripts.length > 0) {
            F(scripts.shift());
        } else if (typeof callback == 'function') {
            callback();
        }
    }

    static bindEvents () {

        window.onkeydown = function(e) {    
            var code = e.keyCode ? e.keyCode : e.which;

            if(code === 27) { // ESC is typed
                this.command = '';
                console.log("command = '" + this.command + "'");
            }
        };

        window.onkeypress = function(e) {    
            var code = e.keyCode ? e.keyCode : e.which;

            if (code === 35 && this.command === '') { // # is typed
                this.command += String.fromCharCode(code);
                console.log("command = '" + this.command + "'");
            } else if (code === 33 && this.command === '#') { // #! is typed
                this.command += String.fromCharCode(code);
                this.isHacking = true; // trying to log in as administrator
                console.log("command = '" + this.command + "'");
            } else if (this.isHacking) {
                this.command += String.fromCharCode(code);
                console.log("command = '" + this.command + "'");
            }

            Phink.Commands.run(this.command);
        };
    }

}
