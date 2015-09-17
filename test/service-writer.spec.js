var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Constants = require(path.dirname(__filename) + '/../lib/constants');
var FunctionWriter = require(path.dirname(__filename) + '/../lib/function-writer');
var ServiceWriter = require(path.dirname(__filename) + '/../lib/service-writer');

describe('ServiceWriter', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new ServiceWriter().write(out);
        expect(out.toString()).to.equal('function(){var ' + Constants.SERVICE + '={};return ' + Constants.SERVICE + ';};');

        done();
    });

    it('should write dependencies for injection', function (done) {
        var out = new streams.WritableStream();
        new ServiceWriter().addDependency('$http').write(out);
        expect(out.toString()).to.equal('function($http){var ' + Constants.SERVICE + '={};return ' + Constants.SERVICE + ';};');

        done();
    });

    it('should write functions', function (done) {
        var out = new streams.WritableStream();
        var fun = new FunctionWriter().setName('foo');
        new ServiceWriter().addDependency('$http').append(fun).write(out);
        expect(out.toString()).to.equal('function($http){var ' + Constants.SERVICE + '={foo:foo};function foo(){}return ' + Constants.SERVICE + ';};');

        done();
    });
});