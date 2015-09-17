var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var ObjectWriter = require(path.dirname(__filename) + '/../lib/object-writer');

describe('ObjectWriter', function () {
    var out;

    beforeEach(function () {
        out = new streams.WritableStream();
    });

    it('should throw if name is not specified', function () {
        expect(function () {
            new ObjectWriter().write(out);
        }).to.throw(Error);
    });

    it('should write canonical object', function () {
        new ObjectWriter().setName('x').write(out);
        expect(out.toString()).to.equal('var x={};');
    });

    it('should write object without var', function () {
        new ObjectWriter().setName('x').setWriteVar(false).write(out);
        expect(out.toString()).to.equal('x={};');
    });

    it('should write object with single property', function () {
        new ObjectWriter().setName('x').addProperty('p', 'v').write(out);
        expect(out.toString()).to.equal('var x={p:v};');
    });

    it('should write object with multiple properties', function () {
        new ObjectWriter().setName('x').addProperty('p', 'v').addProperty('p2', 'v2').write(out);
        expect(out.toString()).to.equal('var x={p:v,p2:v2};');
    });
});