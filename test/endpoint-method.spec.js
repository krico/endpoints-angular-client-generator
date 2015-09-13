var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Context = require(path.dirname(__filename) + '/../lib/context');
var EndpointMethod = require(path.dirname(__filename) + '/../lib/endpoint-method');
var Resource = require(path.dirname(__filename) + '/../lib/resource');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';

describe('EndpointMethod', function () {

    beforeEach(function () {
        Context.set('resource', new Resource(DISCOVERY_FILE));
    });

    it('should pass creation', function () {
        new EndpointMethod('test');
    });

    it('should cache a single instance per id', function () {
        expect(EndpointMethod.get('test')).to.equal(EndpointMethod.get('test'));
    });

});