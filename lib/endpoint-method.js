/**
 * A method on a google endpoints service
 */
var util = require('util');
var path = require('path');
var sprintf = require('sprintf-js').sprintf;
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
    this.initialize = initialize;
    this.initialize()
}

util.inherits(EndpointMethod, FunctionWriter);

function initialize() {
    if (this.method.httpMethod == 'GET') {
        this.append(sprintf('return $http.get(%s.apiPath(\'%s\'));', Constants.PROVIDER, this.method.path));
    }
    return this;
}

EndpointMethod.byId = {};
EndpointMethod.get = get;

function get(id) {
    if (!EndpointMethod.byId[id]) {
        EndpointMethod.byId[id] = new EndpointMethod(id);
    }
    return EndpointMethod.byId[id];
}