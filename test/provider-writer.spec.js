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
        'function MyServiceProvider(){var provider=this;provider.config={};provider.$get=function($http){var svc={};return svc;};}');
        done();
    });

    it('should support writers', function (done) {
        var out = new streams.WritableStream();
        new ProviderWriter().setName('MyService').setModule('myMod').append('this.test=function(){};').write(out);
        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){var provider=this;provider.config={};this.test=function(){};provider.$get=function($http){var svc={};return svc;};}');
        done();
    });

    it('should support provider.config variables', function (done) {
        var out = new streams.WritableStream();
        var providerWriter = new ProviderWriter();
        providerWriter.setName('MyService').setModule('myMod');

        providerWriter
            .addConfig('foo', '\'bar\'')
            .addConfig('bar', 'foo');

        providerWriter.write(out);

        expect(out.toString()).to.equal('angular.module(\'myMod\').provider(\'MyService\',MyServiceProvider);' +
        'function MyServiceProvider(){var provider=this;provider.config={foo:\'bar\',bar:foo};' +
        'provider.foo=function(v){if(angular.isDefined(v)){provider.config.foo=v;}return provider.config.foo;};' +
        'provider.bar=function(v){if(angular.isDefined(v)){provider.config.bar=v;}return provider.config.bar;};' +
        'provider.$get=function($http){var svc={};return svc;};}');
        done();
    });

});