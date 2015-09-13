/**
 * Generates the code
 */
var path = require('path');
var fs = require('fs');

var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var NgModule = require(path.dirname(__filename) + '/ng-module');
var NgProvider = require(path.dirname(__filename) + '/ng-provider');
var ObjectMethod = require(path.dirname(__filename) + '/object-method');
var Statement = require(path.dirname(__filename) + '/statement');
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

    var moduleName = Util.lcFirst(resource.name());
    var serviceName = Util.ucFirst(resource.name());

    var module = new Iife(new NgModule(moduleName, 'ng'), 'angular');
    module.write(out);

    var serviceWriters = [new Statement('var svc={};')];
    serviceWriters.push(new ObjectMethod('echo', ['str'], [new Statement('return str;')], 'svc'));
    serviceWriters.push(new Statement('return svc;'));

    var providerWriters = [];
    var $get = new ObjectMethod('$get', '$log', serviceWriters);
    providerWriters.push($get);

    var provider = new Iife(new NgProvider(serviceName, moduleName, providerWriters), 'angular');
    provider.write(out);
    if (callback) callback();
}