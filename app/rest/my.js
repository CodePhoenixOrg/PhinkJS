'use strict';
var my = require(APP_MODELS + 'my');

var the = null;

var My = function() {
    the = this;
};

//put your code here
My.prototype.get = function(callback) {
    my.getAll(function(data) {
        callback(data);
    });    
};

module.exports = My;