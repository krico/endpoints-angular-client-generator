/**
 * this.method = method; function method(){}
 */
var path = require('path');
var Util = require(path.dirname(__filename) + '/util');

module.exports = ObjectMethod;

function ObjectMethod(name, parameters, writers) {
    this.write = write;
    this.name = name;
    this.parameters = Util.arrayParam(parameters);
    this.writers = Util.arrayParam(writers);
}

function write(out) {
    out.write('this.' + this.name + '=' + this.name + ';function ' + this.name + '(' + this.parameters.join(',') + '){');
    this.writers.forEach(function (value) {
        value.write(out);
    });
    out.write('}');
}