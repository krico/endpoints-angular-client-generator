var path = require('path');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var Constants = require(path.dirname(__filename) + '/constants');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var ObjectWriter = require(path.dirname(__filename) + '/object-writer');

module.exports = ServiceWriter;

function ServiceWriter() {
    CodeWriter.call(this, beforeWrite);
    this.dependencies = [];
    this.addDependency = addDependency;
    this.objectWriter = new ObjectWriter().setName(Constants.SERVICE);
    this.append(this.objectWriter);
}

util.inherits(ServiceWriter, CodeWriter);

function addDependency(d) {
    this.dependencies.push(d);
    return this;
}

function beforeWrite() {
    var first = '';
    var pre = '[';
    for (var i = 0; i < this.dependencies.length; ++i) {
        pre += first + '\'' + this.dependencies[i] + '\'';
        first = ',';
    }
    pre += sprintf(first + 'function(%s){', this.dependencies.join(','));
    this.prepend(pre)
        .append(sprintf('return %s;}];', Constants.SERVICE));
}