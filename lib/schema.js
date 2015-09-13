/**
 * A schema from a resource
 */
var path = require('path');
var Context = require(path.dirname(__filename) + '/context');

module.exports = Schema;

function Schema(schemaName) {
    this.resource = Context.get('resource');
    this.schema = this.resource.schema(schemaName);
    if (!this.schema) {
        throw new Error('No schema named: ' + schemaName);
    }
    this.id = this.schema.id;
    if (this.id != schemaName) {
        throw new Error('We assume that schema.key and schema.key.id must be the same [' + this.id + '] != [' + schemaName + ']');
    }
}

Schema.get = function (id) {
    if (!Schema.byId[id]) {
        Schema.byId[id] = new Schema(id);
    }
    return Schema.byId[id];
};

Schema.byId = {};