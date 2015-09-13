var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var ObjectMethod = require(path.dirname(__filename) + '/../lib/object-method');

describe('ObjectMethod', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new ObjectMethod('myMethod').write(out);
        expect(out.toString()).to.equal('this.myMethod=myMethod;function myMethod(){}');
        done();
    });

    it('should support parameters as single', function (done) {
        var out = new streams.WritableStream();
        new ObjectMethod('myMethod', 'p1').write(out);
        expect(out.toString()).to.equal('this.myMethod=myMethod;function myMethod(p1){}');
        done();
    });

    it('should support parameters as array', function (done) {
        var out = new streams.WritableStream();
        new ObjectMethod('myMethod', ['p1', 'p2']).write(out);
        expect(out.toString()).to.equal('this.myMethod=myMethod;function myMethod(p1,p2){}');
        done();
    });

    it('should support writers as single', function (done) {
        var out = new streams.WritableStream();
        var w1 = {
            write: function (out) {
                out.write('1;');
            }
        };
        new ObjectMethod('myMethod', ['p1', 'p2'], w1).write(out);
        expect(out.toString()).to.equal('this.myMethod=myMethod;function myMethod(p1,p2){1;}');
        done();
    });

    it('should support writers as array', function (done) {
        var out = new streams.WritableStream();
        var w1 = {
            write: function (out) {
                out.write('1;');
            }
        };
        var w2 = {
            write: function (out) {
                out.write('2;');
            }
        };
        new ObjectMethod('myMethod', ['p1', 'p2'], [w1, w2]).write(out);
        expect(out.toString()).to.equal('this.myMethod=myMethod;function myMethod(p1,p2){1;2;}');
        done();
    });
});