/**
 * Represents "the client library" with a module and a provider
 */
var path = require('path');
var Context = require(path.dirname(__filename) + '/context');
var Util = require(path.dirname(__filename) + '/util');
var Iife = require(path.dirname(__filename) + '/iife');
var NgModule = require(path.dirname(__filename) + '/ng-module');
var NgProvider = require(path.dirname(__filename) + '/ng-provider');

module.exports = Client;

function Client(restDescription) {
    Context.restDescription(restDescription);
    this.module = new NgModule(Util.lcFirst(restDescription.name()), 'ng');
    this.provider = new NgProvider();
    this.write = write;
    this.writeModule = writeModule;
    this.writeProvider = writeProvider;
}

function write(out) {
    new Iife([this.module, this.provider], 'angular', true).write(out);
}

function writeModule(out) {
    new Iife(this.module, 'angular', true).write(out);
}

function writeProvider(out) {
    new Iife(this.provider, 'angular', true).write(out);
}