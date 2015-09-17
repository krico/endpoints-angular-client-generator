var path = require('path');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var ServiceWriter = require(path.dirname(__filename) + '/service-writer');

module.exports = ProviderWriter;

function ProviderWriter() {
    CodeWriter.call(this, beforeWrite);
    this.setName = setName;
    this.setModule = setModule;
    this.serviceWriter = new ServiceWriter();
    this.append('this.$get=');
    this.append(this.serviceWriter);
}

util.inherits(ProviderWriter, CodeWriter);

function setModule(n) {
    this.module = n;
    return this;
}

function setName(n) {
    this.name = n;
    return this;
}

function beforeWrite() {
    if (!this.name)
        throw new Error('ModuleWriter needs to have a name');

    if (!this.module)
        throw new Error('ProviderWriter needs to have a module (name)');

    var str = sprintf('angular.module(\'%s\').provider(\'%s\',%sProvider);function %sProvider(){',
        this.module, this.name, this.name, this.name);

    this.prepend(str).append('}');
}