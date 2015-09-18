var path = require('path');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var Constants = require(path.dirname(__filename) + '/constants');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var ObjectWriter = require(path.dirname(__filename) + '/object-writer');

module.exports = FunctionWriter;

function FunctionWriter() {
    CodeWriter.call(this, beforeWrite);
    this.arguments = [];
    this.addArgument = addArgument;
    this.setName = setName;
    this.setParent = setParent;
}

util.inherits(FunctionWriter, CodeWriter);

function setParent(p) {
    CodeWriter.prototype.setParent.call(this, arguments);
    if (p.objectWriter) {
        if (!this.name)throw new Error('FunctionWriter needs to have a name before being appended');
        p.objectWriter.addProperty(this.name, this.name);
    }
    return this;
}

function setName(d) {
    this.name = d;
    return this;
}

function addArgument(d) {
    this.arguments.push(d);
    return this;
}

function beforeWrite() {
    if (this.written) return;
    this.written = true;
    if (!this.name) throw new Error('FunctionWriter must have a name');
    this.prepend(sprintf('function %s(%s){', this.name, this.arguments.join(',')))
        .append(sprintf('}', Constants.SERVICE));
}