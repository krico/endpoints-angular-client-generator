/**
 * Generates the code
 */
var path = require('path');
var fs = require('fs');

var Iife = require(path.dirname(__filename) + '/iife');
var NgModule = require(path.dirname(__filename) + '/ng-module');
var NgProvider = require(path.dirname(__filename) + '/ng-provider');
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

    out.on('error', callback);

    var module = new Iife(new NgModule(resource.name(), 'ng'), 'angular');
    module.write(out);

    var provider = new Iife(new NgProvider('T', resource.name()), 'angular');
    provider.write(out);
    if (callback) callback();
}