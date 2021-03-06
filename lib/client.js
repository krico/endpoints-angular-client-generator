/**
 * Represents "the client library" with a module and a provider
 */
var path = require('path');
var sprintf = require('sprintf-js').sprintf;
var Context = require(path.dirname(__filename) + '/context');
var Constants = require(path.dirname(__filename) + '/constants');
var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var ModuleWriter = require(path.dirname(__filename) + '/module-writer');
var ProviderWriter = require(path.dirname(__filename) + '/provider-writer');
var EndpointMethod = require(path.dirname(__filename) + '/endpoint-method');
var SchemaClass = require(path.dirname(__filename) + '/schema-class');
var EndpointResource = require(path.dirname(__filename) + '/endpoint-resource');
var Log = require(path.dirname(__filename) + '/log');

module.exports = Client;

function Client(restDescription) {
    Context.restDescription(restDescription);
    Log.debug('new Client[' + restDescription.name() + ']');
    var config = Context.config();
    if (config.moduleName) {
        this.moduleName = config.moduleName;
    } else {
        this.moduleName = Util.lcFirst(restDescription.name()) + '.endpoint';
    }
    if (config.providerName) {
        this.providerName = config.providerName;
    } else {
        this.providerName = Util.ucFirst(restDescription.name());
    }
    this.write = write;
    this.writeModule = writeModule;
    this.writeProvider = writeProvider;

    this.module = new ModuleWriter()
        .setName(this.moduleName)
        .addDependency('ng');

    this.provider = new ProviderWriter()
        .setModule(this.module.name)
        .setName(this.providerName)
        .addConfig('apiRoot', '\'' + restDescription.baseUrl() + '\'')
        .addConfig('defaultParameters', '{}')
        .append(sprintf(
            '%s.apiPath=function(path){' +
            'return %s.config.apiRoot+path;' +
            '};',
            Constants.PROVIDER, Constants.PROVIDER))
        .append(sprintf(
            '%s.setApiKey=function(key){' +
            '%s.config.defaultParameters.key=key;' +
            '};',
            Constants.PROVIDER, Constants.PROVIDER))
        .append(sprintf(
            '%s.parameters=function(params){' +
            'return angular.extend(params,%s.config.defaultParameters);' +
            '};', Constants.PROVIDER, Constants.PROVIDER))
        .append(sprintf(
            '%s.responseTransformer=function(defaults, transform){' +
            'defaults = angular.isArray(defaults) ? defaults : [defaults];' +
            'if(angular.isFunction(transform)) return defaults.concat(transform);' +
            'else return defaults;' +
            '};', Constants.PROVIDER))
    ;

    var that = this;

    restDescription.schemaNames().forEach(function (value) {
        if (value != '_any') {
            that.provider.append(SchemaClass.get(value));
        }
    });

    restDescription.methodNames().forEach(function (value) {
        that.provider.serviceWriter.append(EndpointMethod.get(value));
    });
    restDescription.resourceNames().forEach(function (value) {
        that.provider.serviceWriter.append(EndpointResource.get(value));
    });
}

function write(out) {
    new Iife()
        .addGlobal('angular')
        .setStrict(true)
        .append(this.module)
        .append(this.provider)
        .write(out);
}

function writeModule(out) {
    new Iife()
        .addGlobal('angular')
        .setStrict(true)
        .append(this.module)
        .write(out);
}

function writeProvider(out) {
    new Iife()
        .addGlobal('angular')
        .setStrict(true)
        .append(this.provider)
        .write(out);
}
