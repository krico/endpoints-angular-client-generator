var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Iife = require(path.dirname(__filename) + '/../lib/iife');

describe('Iife', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new Iife().write(out);
        expect(out.toString()).to.equal('(function () {})();');
        done();
    });

    it('should support global variables as array when writing to stream', function (done) {
        var out = new streams.WritableStream();
        new Iife([], ['a', 'b']).write(out);
        expect(out.toString()).to.equal('(function (a,b) {})(a,b);');
        done();
    });

    it('should support global variables as single when writing to stream', function (done) {
        var out = new streams.WritableStream();
        new Iife([], 'b').write(out);
        expect(out.toString()).to.equal('(function (b) {})(b);');
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
        new Iife([w1, w2]).write(out);
        expect(out.toString()).to.equal('(function () {' + s1 + s2 + '})();');
        done();
    });

    it('should support writers as a single object when writing to stream', function (done) {
        var out = new streams.WritableStream();
        var s1 = '1;';
        var w1 = {
            write: function (out) {
                out.write(s1);
            }
        };
        new Iife(w1).write(out);
        expect(out.toString()).to.equal('(function () {' + s1 + '})();');
        done();
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
        new Iife([w1, w2], ['a', 'b']).write(out);
        expect(out.toString()).to.equal('(function (a,b) {' + s1 + s2 + '})(a,b);');

        out = new streams.WritableStream();
        new Iife([w1, w2], 'b').write(out);
        expect(out.toString()).to.equal('(function (b) {' + s1 + s2 + '})(b);');

        out = new streams.WritableStream();
        new Iife(w2, 'b').write(out);
        expect(out.toString()).to.equal('(function (b) {' + s2 + '})(b);');

        out = new streams.WritableStream();
        new Iife(w2, ['b', 'c']).write(out);
        expect(out.toString()).to.equal('(function (b,c) {' + s2 + '})(b,c);');

        done();
    });

});