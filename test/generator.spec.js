var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');
var JSHINT = require('jshint').JSHINT;
var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';
var DISCOVERY_DISCOVERY_FILE = path.dirname(__filename) + '/../discovery/discovery-v1.discovery.json';
var JASIFY_DISCOVERY_FILE = path.dirname(__filename) + '/../discovery/jasify-v1.discovery.json';

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
        done();
    });

    it('should generate discovery api lint free', function (done) {
        var out = new streams.WritableStream();
        var generator = new Generator({document: DISCOVERY_DISCOVERY_FILE, output: out});

        generator.generate(function (e) {
            if (e) throw new Error(e);
        });
        JSHINT(out.toString(), {}, {});

        if (JSHINT.errors.length > 0) {
            JSHINT.errors.forEach(function (err) {
                console.error('line: ' + err.line + ', reson: ' + err.reason);
            });
            var lineNo = 0;
            out.toString().split('\n').forEach(function (l) {
                console.error((++lineNo) + ': ' + l);
            });
        }
        expect(JSHINT.errors.length).to.equal(0);
        done();
    });

    it('should generate jasify api lint free', function (done) {
        var out = new streams.WritableStream();
        var generator = new Generator({document: JASIFY_DISCOVERY_FILE, output: out});

        generator.generate(function (e) {
            if (e) throw new Error(e);
        });
        JSHINT(out.toString(), {}, {});

        if (JSHINT.errors.length > 0) {
            JSHINT.errors.forEach(function (err) {
                console.error('line: ' + err.line + ', reason: ' + err.reason);
            });
            var lineNo = 0;
            out.toString().split('\n').forEach(function (l) {
                console.error((++lineNo) + ': ' + l);
            });
        }
        expect(JSHINT.errors.length).to.equal(0);
        done();
    });
});