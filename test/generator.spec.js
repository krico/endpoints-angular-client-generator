var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';

var Generator = require(path.dirname(__filename) + '/../lib/generator');

describe('Generator', function () {

    it('should generate', function (done) {
        Generator.generate(DISCOVERY_FILE, process.stderr, done);
    });
});