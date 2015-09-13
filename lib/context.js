var Context = {get: get, set: set, data: {}};
module.exports = Context;

function get(key) {
    return Context.data[key];
}

function set(key, value) {
    var old = Context.data[key];
    Context.data[key] = value;
    return old;
}
