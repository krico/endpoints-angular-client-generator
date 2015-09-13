/**
 * Immediately Invoked Function Expression
 */
var path = require('path');
var Util = require(path.dirname(__filename) + '/util');

module.exports = Iife;

function Iife(writers, globalVars) {
    this.write = write;
    this.writers = Util.arrayParam(writers);
    this.globalVars = Util.arrayParam(globalVars);
}

function write(out) {
    var globalStr = this.globalVars.join(',');
    out.write('(function (' + globalStr + ') {');
    this.writers.forEach(function (writer) {
        writer.write(out);
    });
    out.write('})(' + globalStr + ');');
}