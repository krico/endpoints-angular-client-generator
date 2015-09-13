/**
 * Generates the code
 */
var path = require('path');
var fs = require('fs');

var Resource = require(path.dirname(__filename) + '/resource');

module.exports = {
    generate: generate
};

function generate(what, out, callback) {
    var resource;
    if (what.constructor == Resource) {
        resource = what;
    } else {
        resource = new Resource(what);
    }
    resource.validate();

    //TODO;
    if (callback) callback();
    //out.on('error', callback);
    //resource.write(out, callback);
}