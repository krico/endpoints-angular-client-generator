var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var Util = require(path.dirname(__filename) + '/../lib/util');

describe('Util', function () {

    it('should guarantee an arrayParam is always an array', function () {
        expect(Util.arrayParam()).to.eql([]);
        expect(Util.arrayParam(undefined)).to.eql([]);
        expect(Util.arrayParam('a')).to.eql(['a']);
        expect(Util.arrayParam(['a'])).to.eql(['a']);
        expect(Util.arrayParam(['a', 'b'])).to.eql(['a', 'b']);
    });

    it('should make first letter capital with ucFirst', function () {
        expect(Util.ucFirst('')).to.equal('');
        expect(Util.ucFirst('a')).to.equal('A');
        expect(Util.ucFirst('A')).to.equal('A');
        expect(Util.ucFirst('abc')).to.equal('Abc');
        expect(Util.ucFirst('Abc')).to.equal('Abc');
        expect(Util.ucFirst('ABC')).to.equal('ABC');
    });

    it('should make first letter lowercase with lcFirst', function () {
        expect(Util.lcFirst('')).to.equal('');
        expect(Util.lcFirst('a')).to.equal('a');
        expect(Util.lcFirst('A')).to.equal('a');
        expect(Util.lcFirst('abc')).to.equal('abc');
        expect(Util.lcFirst('Abc')).to.equal('abc');
        expect(Util.lcFirst('ABC')).to.equal('aBC');
    });
    it('should know reserved words', function () {
        expect(Util.isReserved('foo')).to.equal(false);
        expect(Util.isReserved('delete')).to.equal(true);
    });
});