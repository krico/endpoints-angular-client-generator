/**
 * Models a resource as defined in https://developers.google.com/discovery/v1/reference/apis#resource
 */
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var util = require('util');
var log = require(path.dirname(__filename) + '/log');
var Constants = require(path.dirname(__filename) + '/constants');

module.exports = RestDescription;

function RestDescription(discoveryDocument) {
    var res = this;
    res.getDiscoveryDocument = getDiscoveryDocument;
    res.id = id;
    res.parameter = parameter;
    res.parameterNames = parameterNames;
    res.schema = schema;
    res.schemaNames = schemaNames;
    res.method = method;
    res.methodNames = methodNames;
    res.resource = resource;
    res.resourceNames = resourceNames;
    res.validate = validate;
    res.name = name;
    res.baseUrl = baseUrl;
    this.version = version;


    if (typeof (discoveryDocument) == 'undefined') {
        res.discovery = {kind: Constants.REST_DESCRIPTION_KIND};
    } else if (typeof(discoveryDocument) == 'object') {
        res.discovery = discoveryDocument;
    } else if (typeof(discoveryDocument) == 'string') {
        var jsonData = fs.readFileSync(discoveryDocument);
        res.discovery = JSON.parse(jsonData);
    } else {
        throw new Error('constructor arg must be object (discovery do) or string (filename of discovery.json)');
    }

    if (res.discovery.kind != Constants.REST_DESCRIPTION_KIND) {
        throw new Error('discoveryDocument.kind != ' + Constants.REST_DESCRIPTION_KIND + ' ("' + res.discovery.kind + '")');
    }
}
function baseUrl() {
    return this.discovery.baseUrl;
}

function name() {
    return this.discovery.name;
}

function validate() {
    if (!this.discovery) throw new Error('No discovery document');
    if (!this.discovery.protocol) throw new Error('No protocol');
    if (this.discovery.protocol != 'rest') {
        throw new Error('Unsupported protocol "' + this.discovery.protocol + '" supported protocols: (rest)');
    }
    if (!this.discovery.parameters) this.discovery.parameters = {};
    if (!this.discovery.schemas) this.discovery.schemas = {};
    if (!this.discovery.methods) this.discovery.methods = {};
    if (!this.discovery.resources) this.discovery.resources = {};
    return true;
}

function parameterNames() {
    return Object.keys(this.discovery.parameters);
}

function parameter(name) {
    return this.discovery.parameters[name];
}

function schemaNames() {
    return Object.keys(this.discovery.schemas);
}

function schema(name) {
    return this.discovery.schemas[name];
}

function methodNames() {
    return Object.keys(this.discovery.methods);
}

function method(name) {
    return this.discovery.methods[name];
}

function resourceNames() {
    return Object.keys(this.discovery.resources);
}

function resource(name) {
    return this.discovery.resources[name];
}

function getDiscoveryDocument() {
    return this.discovery;
}

function id() {
    return this.discovery.id;
}

function version() {
    return this.discovery.version;
}