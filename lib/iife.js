/**
 * Immediately Invoked Function Expression
 */
var path = require('path');
var util = require('util');
var Util = require(path.dirname(__filename) + '/util');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');

module.exports = Iife;

function Iife(writers, globalVars, strict) {
    CodeWriter.call(this, beforeWrite);
    this.append(Util.arrayParam(writers));
    this.globalVars = Util.arrayParam(globalVars);
    this.noStrict = !strict;
}
util.inherits(Iife, CodeWriter);

function beforeWrite() {
    var globalStr = this.globalVars.join(',');
    var pre = '(function (' + globalStr + ') {';
    if (!this.noStrict) {
        pre += '\'use strict\';';
    }
    this.prepend(pre).append('})(' + globalStr + ');');
}