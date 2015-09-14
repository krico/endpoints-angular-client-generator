var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');
var EndpointResource = require(path.dirname(__filename) + '/../lib/endpoint-resource');
var Context = require(path.dirname(__filename) + '/../lib/context');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';

describe('EndpointResource', function () {
    beforeEach(function () {
        Context.restDescription(new RestDescription(DISCOVERY_FILE));
    });

    it('should pass creation', function () {
        new EndpointResource('test');
    });

    it('should cache a single instance per id', function () {
        expect(EndpointResource.get('test')).to.equal(EndpointResource.get('test'));
    });

});