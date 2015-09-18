var path = require('path');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var Constants = require(path.dirname(__filename) + '/constants');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var ObjectWriter = require(path.dirname(__filename) + '/object-writer');
var ServiceWriter = require(path.dirname(__filename) + '/service-writer');

module.exports = ProviderWriter;

function ProviderWriter() {
    CodeWriter.call(this, beforeWrite);
    this.setName = setName;
    this.setModule = setModule;
    this.addConfig = addConfig;
    this.initialize = initialize;

    this.configFunctions = [];

    this.serviceWriter = new ServiceWriter();
    this.serviceWriter.addDependency('$http');

    this.configWriter = new ObjectWriter().setWriteVar(false).setName(Constants.PROVIDER + '.config');

    this.initialize();
}

util.inherits(ProviderWriter, CodeWriter);

function initialize() {
    this.append('var ' + Constants.PROVIDER + '=this;');
    this.append(this.configWriter);
    this.append(this.configFunctions);
}

function addConfig(key, defaultValue) {
    var str = sprintf("%s.%s=function(v){if(angular.isDefined(v))%s.config.%s=v;return %s.config.%s;};",
        Constants.PROVIDER, key, Constants.PROVIDER, key, Constants.PROVIDER, key);
    this.configFunctions.push(str);

    this.configWriter.addProperty(key, defaultValue);

    return this;
}

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
        throw new Error('ProviderWriter needs to have a name');

    if (!this.module)
        throw new Error('ProviderWriter needs to have a module (name)');

    var str = sprintf('angular.module(\'%s\').provider(\'%s\',%sProvider);function %sProvider(){',
        this.module, this.name, this.name, this.name);

    this.append(Constants.PROVIDER + '.$get=');
    this.append(this.serviceWriter);

    this.prepend(str).append('}');
}