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
});