var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var NgProvider = require(path.dirname(__filename) + '/../lib/ng-provider');

describe('NgProvider', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new NgProvider('MyService', 'myMod').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){}');
        done();
    });

    it('should support writers  as single', function (done) {
        var out = new streams.WritableStream();
        var w1 = {
            write: function (out) {
                out.write('1;')
            }
        };
        new NgProvider('MyService', 'myMod', w1).write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){1;}');
        done();
    });

    it('should support writers  as array', function (done) {
        var out = new streams.WritableStream();
        var w1 = {
            write: function (out) {
                out.write('1;')
            }
        };
        var w2 = {
            write: function (out) {
                out.write('2;')
            }
        };
        new NgProvider('MyService', 'myMod', [w1, w2]).write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){1;2;}');
        done();
    });
});