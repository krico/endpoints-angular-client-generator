var path = require('path');
var util = require('util');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');

module.exports = ModuleWriter;

function ModuleWriter() {
    CodeWriter.call(this, beforeWrite);
    this.dependencies = [];
    this.setName = setName;
    this.addDependency = addDependency;
}

util.inherits(ModuleWriter, CodeWriter);

function setName(n) {
    this.name = n;
    return this;
}

function addDependency(d) {
    this.dependencies.push(d);
    return this;
}

function beforeWrite() {
    if (!this.name)
        throw new Error('ModuleWriter needs to have a name');

    var q = '\'';
    var quotedDeps = [];
    this.dependencies.forEach(function (value) {
        this.push(q + value + q);
    }, quotedDeps);
    this.append('angular.module(\'' + this.name + '\',[' + quotedDeps.join(',') + ']);');
}