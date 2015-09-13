/**
 * angular.module('myMod').provider('MyService', MyServiceProvider);
 */
var path = require('path');
var Util = require(path.dirname(__filename) + '/util');

module.exports = NgProvider;

function NgProvider(serviceName, moduleName, writers) {
    this.name = serviceName;
    this.moduleName = moduleName;
    this.writers = Util.arrayParam(writers);
    this.write = write;
}

function write(out) {
    out.write('angular.module(\'' + this.moduleName + '\').provider(\'' + this.name + '\',' + this.name + 'Provider);');
    out.write('function ' + this.name + 'Provider(){');
    this.writers.forEach(function (value) {
        value.write(out);
    });
    out.write('}');
}