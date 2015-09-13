/**
 * A method on a google endpoints service
 */
var util = require('util');
var path = require('path');
var Statement = require(path.dirname(__filename) + '/statement');
var ObjectMethod = require(path.dirname(__filename) + '/object-method');
var Context = require(path.dirname(__filename) + '/context');
var Constants = require(path.dirname(__filename) + '/constants');

module.exports = EndpointMethod;

function EndpointMethod(methodName) {
    this.resource = Context.get('resource');
    this.method = this.resource.method(methodName);
    this.id = this.method.id;
    this.name = methodName;
    this.mkWriters = mkWriters;
    this.mkParameters = mkParameters;

    /* name, parameters, writers, self */
    ObjectMethod.call(this, this.name, this.mkParameters(), this.mkWriters(), Constants.SERVICE);
}

util.inherits(EndpointMethod, ObjectMethod);

function mkWriters() {
    var method = this.method;
    if (method.httpMethod == 'GET') {
        var stmt = 'return $http.get(';
        stmt += Constants.PROVIDER + '.apiPath(\'' + method.path + '\')';
        stmt += ');';
        return new Statement(stmt);
    }
    return [];
}

function mkParameters() {
    return [];
}

EndpointMethod.byId = {};
EndpointMethod.get = get;

function get(id) {
    if (!EndpointMethod.byId[id]) {
        EndpointMethod.byId[id] = new EndpointMethod(id);
    }
    return EndpointMethod.byId[id];
}