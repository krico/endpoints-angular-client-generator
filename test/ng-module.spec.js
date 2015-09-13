var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var NgModule = require(path.dirname(__filename) + '/../lib/ng-module');

describe('NgModule', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new NgModule('myMod').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\',[]);');
        done();
    });

    it('should write dependencies passed as string', function (done) {
        var out = new streams.WritableStream();
        new NgModule('myMod', 'dep1').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\',[\'dep1\']);');
        done();
    });

    it('should write dependencies passed as array', function (done) {
        var out = new streams.WritableStream();
        new NgModule('myMod', ['dep1', 'dep2']).write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\',[\'dep1\',\'dep2\']);');
        done();
    });

});