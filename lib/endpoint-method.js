/**
 * A method on a google endpoints service
 */
var util = require('util');
var path = require('path');
var sprintf = require('sprintf-js').sprintf;
var Statement = require(path.dirname(__filename) + '/statement');
var Schema = require(path.dirname(__filename) + '/schema');
var FunctionWriter = require(path.dirname(__filename) + '/function-writer');
var Context = require(path.dirname(__filename) + '/context');
var Constants = require(path.dirname(__filename) + '/constants');
var changeCase = require('change-case');

module.exports = EndpointMethod;

function EndpointMethod(methodNameOrObject, methodRealName) {
    FunctionWriter.call(this);
    var methodName;
    if (typeof(methodNameOrObject) == 'string') {
        methodName = methodNameOrObject;
        this.method = Context.restDescription().method(methodName);
    } else if (typeof(methodNameOrObject) == 'object') {
        methodName = methodRealName || methodNameOrObject.id;
        this.method = methodNameOrObject;
    } else {
        throw new Error('Unsupported: ' + methodNameOrObject);
    }
    this.id = this.method.id;
    this.name = methodName;
    this.initialize = initialize;
    this.initialize()
}

util.inherits(EndpointMethod, FunctionWriter);

function initialize() {
    var config = '';
    config += 'method:\'' + this.method.httpMethod + '\'';
    var path = '\'' + this.method.path + '\'';
    var queryParams = [];
    if (this.method.request) {
        var arg = 'request';
        if (this.method.request.parameterName) {
            arg = this.method.request.parameterName;
        }
        arg = changeCase.camel(arg);
        this.addArgument(arg);
        config += ',data:' + arg;
        if (this.method.request.$ref) {
            var r = Schema.get(this.method.request.$ref);
            if (false) config += '/* ' + JSON.stringify(r, null, '  ') + ' */';
        }
    }
    if (this.method.parameters) {
        for (var paramName in this.method.parameters) {
            if (this.method.parameters.hasOwnProperty(paramName)) {
                var argName = changeCase.camel(paramName);
                this.addArgument(argName);
                var param = this.method.parameters[paramName];
                if (param.location == 'path') {
                    path = path.replace('{' + paramName + '}', '\'+' + argName + '+\'');
                } else if (param.location == 'query') {
                    queryParams.push(argName + ':' + argName);
                } else {
                    throw new Error('Cannot handle param.location=' + param.location);
                }
            }
        }
    }

    config += sprintf(',url:%s.apiPath(%s)', Constants.PROVIDER, path);
    config += sprintf(',params:%s.parameters({%s})', Constants.PROVIDER, queryParams.join(','));
    this.append(sprintf('return $http({%s});', config));
    return this;
}

EndpointMethod.byId = {};
EndpointMethod.get = get;
EndpointMethod.getResourceMethod = getResourceMethod;

function getResourceMethod(resourceName, methodName /*, methodId */) {
    var id = resourceName + '|' + methodName;
    if (!EndpointMethod.byId[id]) {
        EndpointMethod.byId[id] = new EndpointMethod(Context.restDescription().resource(resourceName).methods[methodName], methodName);
    }
    return EndpointMethod.byId[id];
}

function get(id) {
    if (!EndpointMethod.byId[id]) {
        EndpointMethod.byId[id] = new EndpointMethod(id);
    }
    return EndpointMethod.byId[id];
}