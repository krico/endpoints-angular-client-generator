var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Constants = require(path.dirname(__filename) + '/../lib/constants');
var ObjectWriter = require(path.dirname(__filename) + '/../lib/object-writer');
var CodeWriter = require(path.dirname(__filename) + '/../lib/code-writer');
var FunctionWriter = require(path.dirname(__filename) + '/../lib/function-writer');

describe('FunctionWriter', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new FunctionWriter().setName('test').write(out);
        expect(out.toString()).to.equal('function test(){}');

        done();
    });

    it('should write its arguments to stream', function (done) {
        var out = new streams.WritableStream();
        new FunctionWriter().setName('test').addArgument('f').addArgument('g').write(out);
        expect(out.toString()).to.equal('function test(f,g){}');

        done();
    });

    it('should register with parent objectWriter', function (done) {
        var out = new streams.WritableStream();
        var functionWriter = new FunctionWriter().setName('test');
        var codeWriter = new CodeWriter();
        codeWriter.objectWriter = new ObjectWriter().setName('x');
        codeWriter
            .append(codeWriter.objectWriter)
            .append(functionWriter)
            .write(out);
        expect(out.toString()).to.equal('var x={test:test};function test(){}');

        done();
    });

});