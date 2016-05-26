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
var Util = require(path.dirname(__filename) + '/util');

module.exports = EndpointMethod;

function EndpointMethod(methodNameOrObject, methodRealName) {
    FunctionWriter.call(this);
    if (typeof(methodNameOrObject) == 'string') {
        this.name = methodNameOrObject;
        this.method = Context.restDescription().method(this.name);
    } else if (typeof(methodNameOrObject) == 'object') {
        this.name = methodRealName || methodNameOrObject.id;
        if (methodRealName != methodNameOrObject.id) {
            this.propertyName = this.name;
            this.name = methodNameOrObject.id.replace(/\./g, '_');
        }
        this.method = methodNameOrObject;
    } else {
        throw new Error('Unsupported: ' + methodNameOrObject);
    }
    if (Util.isReserved(this.name)) {
        this.propertyName = this.propertyName || this.name;
        this.name = '_' + this.name;
    }
    this.id = this.method.id;
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
    var responseTransformer = null;
    if (this.method.response && this.method.response.$ref && this.method.response.$ref != '_any') {
        responseTransformer = sprintf('function(data){return new %s(data);}', this.method.response.$ref);
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
    if (responseTransformer) {
        config += sprintf(',transformResponse:%s.responseTransformer($http.defaults.transformResponse, %s)', Constants.PROVIDER, responseTransformer);
    }

    this.append(sprintf('return $http({%s});', config));
    return this;
}

EndpointMethod.byId = {};
EndpointMethod.get = get;
EndpointMethod.getResourceMethod = getResourceMethod;

function getResourceMethod(resourceName, methodName, ignore) {
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