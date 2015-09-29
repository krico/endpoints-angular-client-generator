var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Iife = require(path.dirname(__filename) + '/../lib/iife');

describe('Iife', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new Iife().setStrict(false).write(out);
        expect(out.toString()).to.equal('(function(){}());');
        done();
    });

    it('should support global variables as array when writing to stream', function (done) {
        var out = new streams.WritableStream();
        new Iife().setStrict(false).addGlobal(['a', 'b']).write(out);
        expect(out.toString()).to.equal('/*global a,b*/\n(function(a,b){}(a,b));');
        done();
    });

    it('should support writers as array when writing to stream', function (done) {
        var out = new streams.WritableStream();
        var s1 = '1;';
        var s2 = '2;';
        var w1 = {
            write: function (out) {
                out.write(s1);
            }
        };
        var w2 = {
            write: function (out) {
                out.write(s2);
            }
        };
        new Iife().setStrict(false).append([w1, w2]).write(out);
        expect(out.toString()).to.equal('(function(){' + s1 + s2 + '}());');
        done();
    });

    it('should use strict', function () {
        var out = new streams.WritableStream();
        new Iife().setStrict(true).write(out);
        expect(out.toString()).to.equal('(function(){\'use strict\';}());');
    });

    it('should use strict with writers and globals', function () {
        var out = new streams.WritableStream();
        new Iife().setStrict(true).append('a;').addGlobal('g').write(out);
        expect(out.toString()).to.equal('/*global g*/\n(function(g){\'use strict\';a;}(g));');
    });

    it('should support different combinations on constructor', function (done) {
        var s1 = '1;';
        var s2 = '2;';
        var w1 = {
            write: function (out) {
                out.write(s1);
            }
        };
        var w2 = {
            write: function (out) {
                out.write(s2);
            }
        };
        var out = new streams.WritableStream();
        new Iife().setStrict(false).append([w1, w2]).setGlobals(['a', 'b']).write(out);
        expect(out.toString()).to.equal('/*global a,b*/\n(function(a,b){' + s1 + s2 + '}(a,b));');

        done();
    });

});