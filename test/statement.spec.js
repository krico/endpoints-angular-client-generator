var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Statement = require(path.dirname(__filename) + '/../lib/statement');

describe('Statement', function () {

    it('should write itself to stream', function (done) {
        var statement = '1;';
        var out = new streams.WritableStream();
        new Statement(statement).write(out, function (){});
        expect(out.toString()).to.equal(statement);
        done();
    });
});