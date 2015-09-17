var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var ModuleWriter = require(path.dirname(__filename) + '/../lib/module-writer');

describe('ModuleWriter', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new ModuleWriter().setName('myMod').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\',[]);');
        done();
    });

    it('should write dependencies passed as string', function (done) {
        var out = new streams.WritableStream();
        new ModuleWriter().setName('myMod').addDependency('dep1').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\',[\'dep1\']);');
        done();
    });
});