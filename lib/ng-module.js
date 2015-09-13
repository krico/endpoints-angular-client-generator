/**
 * angular.module('', []);
 */
var path = require('path');
var Util = require(path.dirname(__filename) + '/util');

module.exports = NgModule;

function NgModule(name, dependencies) {
    this.write = write;
    this.name = name;
    this.dependencies = Util.arrayParam(dependencies);
}

function write(out) {
    var s = '\'';
    var quotedDeps = [];
    this.dependencies.forEach(function (value) {
        quotedDeps.push('\'' + value + '\'');
    }, quotedDeps);
    out.write('angular.module(\'' + this.name + '\',[' + quotedDeps.join(',') + ']);');
}