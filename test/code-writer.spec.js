var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var CodeWriter = require(path.dirname(__filename) + '/../lib/code-writer');

describe('ObjectWriter', function () {
    var out;

    beforeEach(function () {
        out = new streams.WritableStream();
    });

    it('should write nothing to the stream', function () {
        new CodeWriter().write(out);
        expect(out.toString()).to.equal('');
    });

    it('should write a string to the stream', function () {
        new CodeWriter().append('test').write(out);
        expect(out.toString()).to.equal('test');
    });

    it('should write a writer to the stream', function () {
        new CodeWriter().append({
            write: function (o) {
                o.write('test');
            }
        }).write(out);
        expect(out.toString()).to.equal('test');
    });

    it('should write a function to the stream', function () {
        new CodeWriter().append(function (o) {
            o.write('test')
        }).write(out);
        expect(out.toString()).to.equal('test');
    });

    it('should write an array of strings to the stream', function () {
        new CodeWriter().append(['test1;', 'test2;']).write(out);
        expect(out.toString()).to.equal('test1;test2;');
    });

    it('should write an all different kinds of things even prepend to the stream', function () {
        new CodeWriter()
            .append(['test1;', 'test2;'])
            .append('test3;')
            .append(function (o) {
                o.write('test4;')
            })
            .append({
                write: function (o) {
                    o.write('test5;')
                }
            })
            .prepend('test0;')
            .write(out);
        expect(out.toString()).to.equal('test0;test1;test2;test3;test4;test5;');
    });

    it('should setParent on appended writers', function () {
        var w1 = {
            setParent: function (p) {
                w1.p = p;
            }
        };
        var w2 = {
            setParent: function (p) {
                w2.p = p;
            }
        };
        var codeWriter = new CodeWriter();
        codeWriter.append(w1).prepend(w2);
        expect(w1.p).to.equal(codeWriter);
        expect(w2.p).to.equal(codeWriter);
    });


});