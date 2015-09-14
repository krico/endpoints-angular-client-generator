var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';
var Constants = require(path.dirname(__filename) + '/../lib/constants');
var RestDescription = require(path.dirname(__filename) + '/../lib/rest-description');

describe('RestDescription', function () {

    it('should be an object', function () {
        assert.equal(typeof(new RestDescription()), 'object');
        assert.equal((new RestDescription()).constructor, RestDescription);
    });

    it('should always define a discovery document', function () {
        assert.equal(typeof(new RestDescription().getDiscoveryDocument()), 'object');
    });

    it('should not accept a number as parameter', function () {
        expect(function () {
            new RestDescription(1);
        }).to.throw(Error);
    });

    it('should have an id', function () {
        var discovery = {id:'foo', kind: Constants.REST_DESCRIPTION_KIND};
        assert.equal(new RestDescription(discovery).id(), discovery.id);
    });

    it('should accept a discovery document as constructor argument', function () {
        assert.equal(new RestDescription(DISCOVERY_FILE).id(), 'brain:v1');
    });

    it('should use accept a filename to a discovery document json as constructor argument', function () {
        var discovery = require(DISCOVERY_FILE);
        assert.equal(new RestDescription(discovery).getDiscoveryDocument(), discovery);
    });

    it('should list parameters', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, parameters: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new RestDescription(discovery).parameterNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a parameter by name', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, parameters: {foo: 'bar'}};
        assert.equal(new RestDescription(discovery).parameter('foo'), discovery.parameters.foo);
    });

    it('should list schemas', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, schemas: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new RestDescription(discovery).schemaNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a schema by name', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, schemas: {foo: 'bar'}};
        assert.equal(new RestDescription(discovery).schema('foo'), discovery.schemas.foo);
    });

    it('should list methods', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, methods: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new RestDescription(discovery).methodNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a method by name', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, methods: {foo: 'bar'}};
        assert.equal(new RestDescription(discovery).method('foo'), discovery.methods.foo);
    });

    it('should list resources', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, resources: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new RestDescription(discovery).resourceNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a resource by name', function () {
        var discovery = {id: 'myId', kind: Constants.REST_DESCRIPTION_KIND, resources: {foo: 'bar'}};
        assert.equal(new RestDescription(discovery).resource('foo'), discovery.resources.foo);
    });

    it('should pass validate', function () {
        var r = new RestDescription(DISCOVERY_FILE);
        expect(r.validate()).to.equal(true);

    });

    it('should throw when verify an protocol is not rest', function () {
        expect(function () {
            var r = new RestDescription({protocol: 'not rest'});
            r.validate();
        }).to.throw(Error);
    });
});