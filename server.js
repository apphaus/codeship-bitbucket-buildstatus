/*jslint node: true */
'use strict';

var app = require('./app');

// get port using environment variable or use 3000 as a default
var port = process.env.PORT || 3000;

var server = app().listen(port, function () {
    var host = server.address().address;
    console.log('Listening at http://%s:%s', host, port);
});
