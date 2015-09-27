#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var program = require('commander');
var pkg = require(path.dirname(__filename) + '/../package.json');
var log = require(path.dirname(__filename) + '/../lib/log');
var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');
var Context = require(path.dirname(__filename) + '/../lib/context');
var Generator = require(path.dirname(__filename) + '/../lib/generator');

var config = {};

function document(val) {
    config.document = path.resolve(val);
}

function output(val) {
    config.output = path.resolve(val);
}

function moduleName(val) {
    config.moduleName = val;
}

function providerName(val) {
    config.providerName = val;
}

program
    .version(pkg.version)
    .usage('[options] -d <file> -o <file>')
    .option('-d, --document <file>', 'Read discovery document from <file>', document)
    .option('-o, --output-dir <dir>', 'Write generated code files to <dir>', output)
    .option('-s, --split-module', 'Split generated code into two files, one for the module another for provider')
    .option('-m, --module-name <name>', 'Override default module name to be "angular.module(<name>)"', moduleName)
    .option('-p, --provider-name <name>', 'Override default provider/service name to be "angular.module().provider(<name>)"', providerName)
    .parse(process.argv);

function info(msg) {
    console.info(msg);
    log.debug(msg);
}

function checkDocument() {
    if (typeof config.document === 'undefined') {
        console.error('ERROR: You must specify a discovery document "--document"!');
        process.exit(1);
    }
    try {
        var stats = fs.statSync(config.document);
        if (!(stats && stats.isFile())) {
            console.error('ERROR: The path "' + config.document + '" must be a file!');
            process.exit(1);
        }
    } catch (e) {
        console.error('ERROR: The path "' + config.document + '" must be a file!');
        process.exit(1);
    }
}
function checkOutput() {
    if (typeof config.output === 'undefined') {
        console.error('ERROR: You must specify an output directory "--output-dir"!');
        process.exit(1);
    }
    try {
        var stats = fs.statSync(config.output);
        if (!(stats && stats.isDirectory())) {
            console.error('ERROR: The path "' + config.output + '" must be a directory!');
            process.exit(1);
        }
    } catch (e) {
        console.error('ERROR: The path "' + config.output + '" must exist and be a directory!');
        process.exit(1);
    }
}

log.debug('Started generation of [' + config.document + ']');

checkDocument();
checkOutput();

config.splitModule = program.splitModule;

//Set global config
Context.config(config);

log.debug('Reading RestDescription from [' + config.document + ']');
var restDescription = new RestDescription(config.document);

try {
    restDescription.validate();
} catch (e) {
    log.warn('Discovery document [' + config.document + '] is invalid: ' + e);
    process.exit(2);
}
info('Validated discovery document: \'' + config.document + '\'');
info('\tId      : ' + restDescription.id());
info('\tName    : ' + restDescription.name());
info('\tVersion : ' + restDescription.version());

var generator = new Generator(restDescription, config);
generator.generate(function (e) {
    if (e) {
        log.warn('Failed to generate: ' + e);
        process.exit(3);
    }
});
