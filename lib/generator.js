/**
 * Generates the code
 */
var path = require('path');
var fs = require('fs');
var beautify = require('js-beautify').js_beautify;
var streams = require('memory-streams');
var extend = require('extend');

var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var EndpointMethod = require(path.dirname(__filename) + '/endpoint-method');
var Statement = require(path.dirname(__filename) + '/statement');
var RestDescription = require(path.dirname(__filename) + '/rest-description');
var Client = require(path.dirname(__filename) + '/client');


var DEFAULT_CONFIG = {
    splitModule: false,
    beautify: true,
    beautifyOptions: {jslint_happy: true}
};

module.exports = Generator;

function Generator(configOrRestDescription, configIfNotYet) {
    var config, restDescription;
    if (configOrRestDescription instanceof RestDescription) {
        restDescription = configOrRestDescription;
        config = configIfNotYet;
    } else if (typeof(configOrRestDescription) == 'string') {
        restDescription = new RestDescription(configOrRestDescription);
        config = configIfNotYet;
    } else if (typeof(configOrRestDescription) == 'undefined') {
        config = configIfNotYet;
    } else {
        config = configOrRestDescription;
    }

    if (typeof(config) == 'undefined') {
        config = {};
    }

    if (restDescription instanceof RestDescription) {
        config.document = restDescription;
    }

    if (typeof(config.document) == 'string') {
        config.document = new RestDescription(config.document);
    }

    this.config = extend(true, {}, DEFAULT_CONFIG, config);

}

Generator.prototype.validate = function () {
    if (!(this.config.document instanceof RestDescription)) {
        throw new Error('no document, new Generator([restDesc], [config])');
    }

    if (!(this.config.output)) {
        throw new Error('no output defined');
    }
};

Generator.prototype.generate = function (callback) {
    this.validate();

    var restDescription = this.config.document;
    restDescription.validate();

    var splitModule = !!this.config.splitModule;
    var isBeautify = this.config.beautify;

    if (this.config.output && this.config.output.write) {
        //Can't split module with into a stream
        splitModule = false;
    }

    var client = new Client(restDescription);

    if (splitModule) {
        var modOut = new streams.WritableStream();
        modOut.on('error', callback);
        client.writeModule(modOut);
        modOut.end();
        var modCode = modOut.toString();
        if (isBeautify) {
            modCode = beautify(modCode, this.config.beautifyOptions);
        }

        var providerOut = new streams.WritableStream();
        providerOut.on('error', callback);
        client.writeProvider(providerOut);
        providerOut.end();
        var provCode = providerOut.toString();
        if (isBeautify) {
            provCode = beautify(provCode, this.config.beautifyOptions);
        }

        var outModuleFile = path.join(this.config.output, restDescription.name() + '.module.js');
        var realModOut = fs.createWriteStream(outModuleFile);
        realModOut.on('error', callback);
        realModOut.write(modCode + '\n', 'utf8');
        realModOut.end();

        var outProviderFile = path.join(this.config.output, restDescription.name() + '.provider.js');
        var realProvOut = fs.createWriteStream(outProviderFile);
        realProvOut.write(provCode + '\n', 'utf8', callback);
        realProvOut.end();

    } else {
        var mustEnd = true;
        var out = new streams.WritableStream();
        out.on('error', callback);

        client.write(out);

        out.end();

        var codeStr = out.toString();

        if (isBeautify) {
            codeStr = beautify(codeStr, this.config.beautifyOptions);
        }
        var realOut;
        if (this.config.output.write) {
            realOut = this.config.output;
            mustEnd = false;
        } else {
            var outFile = path.join(this.config.output, restDescription.name() + '.provider.js');
            realOut = fs.createWriteStream(outFile);
        }
        realOut.write(codeStr + '\n', 'utf8', callback);
        if (mustEnd) realOut.end();
    }
};
