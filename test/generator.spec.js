var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';
var DISCOVERY_DISCOVERY_FILE = path.dirname(__filename) + '/../doc/discovery-v1-discovery.json';

var Generator = require(path.dirname(__filename) + '/../lib/generator');
var Context = require(path.dirname(__filename) + '/../lib/context');
var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');

describe('Generator', function () {

    afterEach(function () {
        Context.restDescription(new RestDescription(DISCOVERY_FILE));
    });

    it('should generate', function (done) {
        var out = new streams.WritableStream();

        Generator.generate(DISCOVERY_FILE, out, done);
        //console.log(out.toString());
    });

    it('should generate discovery api', function (done) {
        var out = new streams.WritableStream();

        Generator.generate(DISCOVERY_DISCOVERY_FILE, out, done);
        console.log(out.toString());
    });
});