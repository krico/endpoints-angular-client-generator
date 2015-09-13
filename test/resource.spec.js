var path = require('path');
var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var DISCOVERY_FILE = path.dirname(__filename) + '/discovery.json';

var Resource = require('../lib/resource');

describe('Resource', function () {

    it('should be an object', function () {
        assert.equal(typeof(new Resource()), 'object');
        assert.equal((new Resource()).constructor, Resource);
    });

    it('should always define a discovery document', function () {
        assert.equal(typeof(new Resource().getDiscoveryDocument()), 'object');
    });

    it('should not accept a number as parameter', function () {
        expect(function () {
            new Resource(1);
        }).to.throw(Error);
    });

    it('should have an id', function () {
        var discovery = {id: 'myId'};
        assert.equal(new Resource(discovery).id(), discovery.id);
    });

    it('should use accept a discovery document as constructor argument', function () {
        assert.equal(new Resource(DISCOVERY_FILE).id(), 'brain:v1');
    });

    it('should use accept a filename to a discovery document json as constructor argument', function () {
        var discovery = {foo: 'bar'};
        assert.equal(new Resource(discovery).getDiscoveryDocument(), discovery);
    });

    it('should list parameters', function () {
        var discovery = {id: 'myId', parameters: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new Resource(discovery).parameterNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a parameter by name', function () {
        var discovery = {id: 'myId', parameters: {foo: 'bar'}};
        assert.equal(new Resource(discovery).parameter('foo'), discovery.parameters.foo);
    });

    it('should list schemas', function () {
        var discovery = {id: 'myId', schemas: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new Resource(discovery).schemaNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a schema by name', function () {
        var discovery = {id: 'myId', schemas: {foo: 'bar'}};
        assert.equal(new Resource(discovery).schema('foo'), discovery.schemas.foo);
    });

    it('should list methods', function () {
        var discovery = {id: 'myId', methods: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new Resource(discovery).methodNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a method by name', function () {
        var discovery = {id: 'myId', methods: {foo: 'bar'}};
        assert.equal(new Resource(discovery).method('foo'), discovery.methods.foo);
    });

    it('should list resources', function () {
        var discovery = {id: 'myId', resources: {foo1: 'bar1', foo2: 'bar2'}};
        expect(new Resource(discovery).resourceNames()).to.eql(['foo1', 'foo2']);
    });

    it('should return a resource by name', function () {
        var discovery = {id: 'myId', resources: {foo: 'bar'}};
        assert.equal(new Resource(discovery).resource('foo'), discovery.resources.foo);
    });

    it('should pass validate', function () {
        var r = new Resource(DISCOVERY_FILE);
        expect(r.validate()).to.equal(true);

    });

    it('should throw when verify an protocol is not rest', function () {
        expect(function () {
            var r = new Resource({protocol: 'not rest'});
            r.validate();
        }).to.throw(Error);
    });
});