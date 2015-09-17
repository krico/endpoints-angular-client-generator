var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var ProviderWriter = require(path.dirname(__filename) + '/../lib/provider-writer');

describe('ProviderWriter', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new ProviderWriter().setName('MyService').setModule('myMod').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){}');
        done();
    });

    it('should support writers', function (done) {
        var out = new streams.WritableStream();
        new ProviderWriter().setName('MyService').setModule('myMod').append('this.$get=function(){};').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){this.$get=function(){};}');
        done();
    });
});