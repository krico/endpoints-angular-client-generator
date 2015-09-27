var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';
var DISCOVERY_DISCOVERY_FILE = path.dirname(__filename) + '/../discovery/discovery-v1.discovery.json';

var Generator = require(path.dirname(__filename) + '/../lib/generator');
var Context = require(path.dirname(__filename) + '/../lib/context');
var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');

describe('Generator', function () {

    afterEach(function () {
        Context.restDescription(new RestDescription(DISCOVERY_FILE));
    });

    it('should start with default config', function () {
        expect(new Generator(new RestDescription()).config.beautify).to.equal(true);
    });

    it('should override defaults with constructor', function () {
        expect(new Generator(new RestDescription(), {beautify: false}).config.beautify).to.equal(false);
    });

    it('should generate', function (done) {
        var out = new streams.WritableStream();
        var generator = new Generator(DISCOVERY_FILE, {output: out});

        generator.generate(done);
        done();
    });

    it('should generate discovery api', function (done) {
        var out = new streams.WritableStream();
        var generator = new Generator({document: DISCOVERY_DISCOVERY_FILE, output: out});

        generator.generate(done);
        console.log(out.toString());
        done();
    });
});