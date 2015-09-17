var path = require('path');
var util = require('util');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');

module.exports = ObjectWriter;

function ObjectWriter() {
    CodeWriter.call(this, beforeWrite);
    this.var = true;
    this.name = null;
    this.properties = [];
    this.setName = setName;
    this.setWriteVar = setWriteVar;
    this.addProperty = addProperty;
}

util.inherits(ObjectWriter, CodeWriter);

function addProperty(p, v) {
    this.properties.push([p, v]);
    return this;
}

function setName(n) {
    this.name = n;
    return this;
}

function setWriteVar(n) {
    this.var = !!n;
    return this;
}

function beforeWrite() {
    if (!this.name)
        throw new Error('ObjectWriter needs to have a name');
    var str = '';

    if (this.var) {
        str += 'var ';
    }
    str += this.name + '={';
    var first = '';
    this.properties.forEach(function (v) {
        str += first + v[0] + ':' + v[1];
        first = ',';
    });

    str += '};';

    this.append(str);
}