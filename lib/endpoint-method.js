/**
 * A method on a google endpoints service
 */
var util = require('util');
var path = require('path');
var Statement = require(path.dirname(__filename) + '/statement');
var FunctionWriter = require(path.dirname(__filename) + '/function-writer');
var Context = require(path.dirname(__filename) + '/context');
var Constants = require(path.dirname(__filename) + '/constants');

module.exports = EndpointMethod;

function EndpointMethod(methodName) {
    FunctionWriter.call(this);
    this.method = Context.restDescription().method(methodName);
    this.id = this.method.id;
    this.name = methodName;
    this.append('return $http.get();')
}

util.inherits(EndpointMethod, FunctionWriter);

//TODO: Remove
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

EndpointMethod.byId = {};
EndpointMethod.get = get;

function get(id) {
    if (!EndpointMethod.byId[id]) {
        EndpointMethod.byId[id] = new EndpointMethod(id);
    }
    return EndpointMethod.byId[id];
}