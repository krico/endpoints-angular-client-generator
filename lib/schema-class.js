var path = require('path');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var Constants = require(path.dirname(__filename) + '/constants');
var Context = require(path.dirname(__filename) + '/context');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var ObjectWriter = require(path.dirname(__filename) + '/object-writer');

module.exports = SchemaClass;


function SchemaClass(id) {
    CodeWriter.call(this);
    var schema = Context.restDescription().schema(id);
    this.append('function ').append(id).append('(data){');
    if (false) this.append('/* ').append(JSON.stringify(schema)).append(' */');
    var properties = schema.properties;
    if (properties) {
        var functions = '';
        for (var k in properties) {
            if (properties.hasOwnProperty(k)) {
                property = properties[k];

                this.append('this.').append(k).append('=');
                if (property.$ref && property.$ref != '_any') {
                    this.append(sprintf('data.%s?new %s(data.%s):null;', k, property.$ref, k));
                } else if (property.format && property.format == 'date-time') {
                    this.append(sprintf('data.%s?new Date(data.%s):null;', k, k));
                } else if (property.type && property.type == 'array' && property.items && property.items.$ref) {
                    var type = property.items.$ref;
                    functions += sprintf("function map%s(v){return new %s(v);}", type, type);
                    this.append(sprintf('data.%s?data.%s.map(map%s):[];', k, k, type));
                } else {
                    this.append('data.').append(k).append(';');
                }
                if (false) this.append('/* ').append(k).append(':').append(JSON.stringify(property)).append('*/');
            }
        }
        this.append(functions);
    }
    this.append('}');
}

util.inherits(SchemaClass, CodeWriter);

SchemaClass.byId = {};
SchemaClass.get = get;

function get(id) {
    if (!SchemaClass.byId[id]) {
        SchemaClass.byId[id] = new SchemaClass(id);
    }
    return SchemaClass.byId[id];

}