var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var streams = require('memory-streams');

var Context = require(path.dirname(__filename) + '/../lib/context');
var SchemaClass = require(path.dirname(__filename) + '/../lib/schema-class');
var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';


describe('SchemaClass', function () {

    beforeEach(function () {
        Context.restDescription(new RestDescription(DISCOVERY_FILE));
    });

    it('should pass creation', function () {
        new SchemaClass('test');
    });

    it('should cache a single instance per id', function () {
        expect(SchemaClass.get('test')).to.equal(SchemaClass.get('test'));
    });

});