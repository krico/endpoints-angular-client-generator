var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';

var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');
var Client = require(path.dirname(__filename) + '/../lib/client');

describe('Client', function () {

    it('should construct', function () {
        new Client(new RestDescription(DISCOVERY_FILE));
    });

    it('should write the client javascript', function () {
        var out = new streams.WritableStream();
        new Client(new RestDescription(DISCOVERY_FILE)).write(out);
    });

    it('should write the module javascript', function () {
        var out = new streams.WritableStream();
        new Client(new RestDescription(DISCOVERY_FILE)).writeModule(out);
    });

    it('should write the provider javascript', function () {
        var out = new streams.WritableStream();
        new Client(new RestDescription(DISCOVERY_FILE)).writeProvider(out);
    });
});