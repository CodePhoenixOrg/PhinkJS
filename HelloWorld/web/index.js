'use strict';

var app = require('../src/phinkjs/web/web_application');

app.create('http://sample.loc:1234', null, function (req, res, data) {
    // console.log(req.headers);
    
    //if (data.mimetype !== 'image/vnd.microsoft.icon') {
    //    console.log('received data: ' + data.stream);
    //}

});
