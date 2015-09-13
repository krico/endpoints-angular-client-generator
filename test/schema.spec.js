var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var Resource = require(path.dirname(__filename) + '/../lib/resource');
var Schema = require(path.dirname(__filename) + '/../lib/schema');
var Context = require(path.dirname(__filename) + '/../lib/context');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';

describe('EndpointResource', function () {
    beforeEach(function () {
        Context.set('resource', new Resource(DISCOVERY_FILE));
    });

    it('should pass creation', function () {
        new Schema('test');
    });

    it('should cache a single instance per id', function () {
        expect(Schema.get('test')).to.equal(Schema.get('test'));
    });

});