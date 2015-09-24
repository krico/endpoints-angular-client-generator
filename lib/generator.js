/**
 * Generates the code
 */
var path = require('path');
var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var streams = require('memory-streams');

var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var EndpointMethod = require(path.dirname(__filename) + '/endpoint-method');
var Statement = require(path.dirname(__filename) + '/statement');
var RestDescription = require(path.dirname(__filename) + '/rest-description');
var Client = require(path.dirname(__filename) + '/client');

module.exports = {
    beautify: true,
    generate: generate
};

function generate(what, realOut, callback) {
    var restDescription;
    if (what instanceof RestDescription) {
        restDescription = what;
    } else {
        restDescription = new RestDescription(what);
    }
    restDescription.validate();
    var out = new streams.WritableStream();
    out.on('error', callback);

    new Client(restDescription).write(out);

    out.end();

    var codeStr = out.toString();

    if (this.beautify) {
        codeStr = beautify(codeStr, {indent_size: 2});
    }
    realOut.write(codeStr + '\n', 'utf8', callback);
}
