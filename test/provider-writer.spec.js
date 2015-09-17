var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Constants = require(path.dirname(__filename) + '/../lib/constants');
var ProviderWriter = require(path.dirname(__filename) + '/../lib/provider-writer');

describe('ProviderWriter', function () {

    it('should write its canonical form to stream', function (done) {
        var out = new streams.WritableStream();
        new ProviderWriter().setName('MyService').setModule('myMod').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){var ' + Constants.PROVIDER + '=this;' + Constants.PROVIDER  +
        '.$get=function($http){var svc={};return svc;};}');
        done();
    });

    it('should support writers', function (done) {
        var out = new streams.WritableStream();
        new ProviderWriter().setName('MyService').setModule('myMod').append('this.test=function(){};').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){var ' + Constants.PROVIDER + '=this;' + Constants.PROVIDER  +
        '.$get=function($http){var svc={};return svc;};this.test=function(){};}');
        done();
    });
});