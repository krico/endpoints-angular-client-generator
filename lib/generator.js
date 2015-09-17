/**
 * Generates the code
 */
var path = require('path');
var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var streams = require('memory-streams');

var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var NgModule = require(path.dirname(__filename) + '/ng-module');
var NgProvider = require(path.dirname(__filename) + '/ng-provider');
var ObjectMethod = require(path.dirname(__filename) + '/object-method');
var EndpointMethod = require(path.dirname(__filename) + '/endpoint-method');
var Statement = require(path.dirname(__filename) + '/statement');
var RestDescription = require(path.dirname(__filename) + '/rest-description');
var Constants = require(path.dirname(__filename) + '/constants');
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
    realOut.write(codeStr + '\n', 'utf8');
    if (callback) callback();
}

/** TODO: delete, its here for migration
 function generateOld(what, realOut, callback) {
    var restDescription;
    if (what instanceof RestDescription) {
        restDescription = what;
    } else {
        restDescription = new RestDescription(what);
    }
    restDescription.validate();
    var out = new streams.WritableStream();
    out.on('error', callback);

    var moduleName = Util.lcFirst(restDescription.name());
    var serviceName = Util.ucFirst(restDescription.name());

    var module = new Iife(new NgModule(moduleName, 'ng'), 'angular', true);
    module.write(out);

    var serviceWriters = [new Statement('var ' + Constants.SERVICE + '={};')];
    restDescription.methodNames().forEach(function (value) {
        this.push(EndpointMethod.get(value));
    }, serviceWriters);
    serviceWriters.push(new Statement('return ' + Constants.SERVICE + ';'));

    var providerWriters = [];
    providerWriters.push(new Statement('var ' + Constants.PROVIDER + '=this;'));
    providerWriters.push(new Statement('' + Constants.PROVIDER + '.config={apiRoot:\'' + restDescription.baseUrl() + '\'};'));
    providerWriters.push(new Statement(
        'angular.forEach(provider.config, function(value,key){' +
        'provider[key]=function(newValue){' +
        'if(angular.isDefined(newValue)){' +
        'provider.config[key]=newValue;' +
        '}' +
        'return provider.config[key];' +
        '}});'));
    providerWriters.push(new ObjectMethod('apiPath', ['path'], [new Statement('return provider.config.apiRoot+path;')], Constants.PROVIDER));
    providerWriters.push(new ObjectMethod('$get', ['$log', '$http'], serviceWriters, Constants.PROVIDER));

    var provider = new Iife(new NgProvider(serviceName, moduleName, providerWriters), 'angular', true);
    provider.write(out);
    out.end();

    var codeStr = out.toString();

    if (this.beautify) {
        codeStr = beautify(codeStr, {indent_size: 2});
    }
    realOut.write(codeStr + '\n', 'utf8');
    if (callback) callback();
}
 */