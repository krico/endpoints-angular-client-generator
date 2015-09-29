/**
 * A schema from a resource
 */
var path = require('path');
var util = require('util');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var FunctionWriter = require(path.dirname(__filename) + '/function-writer');
var Constants = require(path.dirname(__filename) + '/constants');
var Context = require(path.dirname(__filename) + '/context');
var EndpointMethod = require(path.dirname(__filename) + '/endpoint-method');
var ObjectWriter = require(path.dirname(__filename) + '/object-writer');

module.exports = EndpointResource;

function EndpointResource(resourceName) {
    FunctionWriter.call(this, beforeWrite);
    this.name = resourceName;
    this.endpointResource = Context.restDescription().resource(resourceName);
    if (!this.endpointResource) {
        throw new Error('No resource named: ' + resourceName);
    }
    this.setParent = setParent;
    this.objectWriter = new ObjectWriter().setName('_' + resourceName);
    this.append(this.objectWriter);
}

util.inherits(EndpointResource, FunctionWriter);

function setParent(p) {
    CodeWriter.prototype.setParent.call(this, arguments);
    if (p.objectWriter) {
        if (!this.name)
            throw new Error('EndpointResource needs to have a name before being appended');
        p.objectWriter.addProperty(this.name, this.name + '()');
    }
    return this;
}


function beforeWrite() {
    if (this.endpointResource.methods) {
        for (var m in this.endpointResource.methods) {
            if (this.endpointResource.methods.hasOwnProperty(m)) {
                this.append(EndpointMethod.getResourceMethod(this.name, m, this.endpointResource.methods[m].id));
            }
        }
    }
    this.append('return _' + this.name + ';');
    return this;
}

EndpointResource.get = function (id) {
    if (!EndpointResource.byId[id]) {
        EndpointResource.byId[id] = new EndpointResource(id);
    }
    return EndpointResource.byId[id];
};

EndpointResource.byId = {};