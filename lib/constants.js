var Constants = {
    PROVIDER: 'provider',
    SERVICE: 'svc',
    REST_DESCRIPTION_KIND: 'discovery#restDescription'
};
module.exports = {};

for (var c in Constants) {
    Object.defineProperty(module.exports, c, {
        value: Constants[c],
        enumerable: true,
        writable: false,
        configurable: false
    });
}
