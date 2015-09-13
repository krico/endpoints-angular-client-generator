/**
 * A schema from a resource
 */
var path = require('path');
var Context = require(path.dirname(__filename) + '/context');

module.exports = EndpointResource;

function EndpointResource(resourceName) {
    this.resource = Context.get('resource');
    this.endpointResource = this.resource.resource(resourceName);
    if (!this.endpointResource) {
        throw new Error('No resource named: ' + resourceName);
    }
    this.id = this.endpointResource.id;
    if (this.id != resourceName) {
        throw new Error('We assume that resource.key and resource.key.id must be the same [' + this.id + '] != [' + resourceName + ']');
    }
}

EndpointResource.get = function (id) {
    if (!EndpointResource.byId[id]) {
        EndpointResource.byId[id] = new EndpointResource(id);
    }
    return EndpointResource.byId[id];
};

EndpointResource.byId = {};