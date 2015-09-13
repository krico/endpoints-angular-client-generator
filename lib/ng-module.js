/**
 * angular.module('', []);
 */

module.exports = NgModule;

function NgModule(name, dependencies) {
    this.write = write;
    this.name = name;
    if (dependencies) {
        if (dependencies instanceof Array) {
            this.dependencies = dependencies;
        } else {
            this.dependencies = [dependencies];
        }
    } else {
        this.dependencies = [];
    }
}

function write(out) {
    var s = '\'';
    var quotedDeps = [];
    this.dependencies.forEach(function (value) {
        quotedDeps.push('\'' + value + '\'');
    }, quotedDeps);
    out.write('angular.module(\'' + this.name + '\',[' + quotedDeps.join(',') + ']);');
}