var path = require('path');
var Constants = require(path.dirname(__filename) + '/constants');

var Context = {
    data: {},
    restDescription: restDescription,
    config: config,
    header: header,
    get: get,
    set: set
};
module.exports = Context;

function get(key) {
    return Context.data[key];
}

function set(key, value) {
    var old = Context.data[key];
    Context.data[key] = value;
    return old;
}

function restDescription(value) {
    if (typeof(value) != 'undefined') {
        Context.data[Constants.REST_DESCRIPTION_KIND] = value;
    }
    return Context.data[Constants.REST_DESCRIPTION_KIND];
}

function config(value) {
    if (typeof(value) != 'undefined') {
        Context.data[Constants.CONFIG] = value;
    }
    if (!Context.data[Constants.CONFIG]) Context.data[Constants.CONFIG] = {};
    return Context.data[Constants.CONFIG];
}

function header(value) {
    if (typeof(value) != 'undefined') {
        Context.data[Constants.HEADER] = value;
    }
    if (!Context.data[Constants.HEADER]) Context.data[Constants.HEADER] = '';
    return Context.data[Constants.HEADER];
}