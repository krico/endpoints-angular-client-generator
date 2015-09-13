var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var Context = require(path.dirname(__filename) + '/../lib/context');

describe('Context', function () {

    it('should be a global map', function () {
        expect(Context.get('a')).to.be.an('undefined');
        Context.set('a', 'b');
        expect(Context.get('a')).to.equal('b');
        expect(require(path.dirname(__filename) + '/../lib/context').get('a')).to.equal('b');
    });

});