#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var program = require('commander');
var pkg = require(path.dirname(__filename) + '/../package.json');
var Generator = require(path.dirname(__filename) + '/../lib/generator');


var config = {};

function document(val) {
    config.document = path.resolve(val);
}

function output(val) {
    config.output = val;
}

program
    .version(pkg.version)
    .usage('[options] -d <file> -o <file>')
    .option('-d, --document <file>', 'Read discovery document from <file>', document)
    .option('-o, --output <file>', 'Write generated client to <file>', output)
    .parse(process.argv);


if (typeof config.document === 'undefined') {
    console.error('You must specify a discovery document "--document"!');
    process.exit(1);
}

if (typeof config.output === 'undefined') {
    console.error('You must specify a client output "--output"!');
    process.exit(1);
}


var out = fs.createWriteStream(config.output);

Generator.generate(config.document, out, function () {
    console.log('Client generated to: ' + config.output);
});
