/**
 * Represents "the client library" with a module and a provider
 */
var path = require('path');
var Context = require(path.dirname(__filename) + '/context');
var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var ModuleWriter = require(path.dirname(__filename) + '/module-writer');
var ProviderWriter = require(path.dirname(__filename) + '/provider-writer');
var Log = require(path.dirname(__filename) + '/log');

module.exports = Client;

function Client(restDescription) {
    Context.restDescription(restDescription);
    Log.info('Client[' + restDescription.name() + ']\n');
    this.module = new ModuleWriter()
        .setName(Util.lcFirst(restDescription.name()))
        .addDependency('ng');
    this.provider = new ProviderWriter()
        .setModule(this.module.name)
        .setName(Util.ucFirst(restDescription.name()));
    this.write = write;
    this.writeModule = writeModule;
    this.writeProvider = writeProvider;
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
