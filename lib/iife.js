/**
 * Immediately Invoked Function Expression
 */
var path = require('path');
var util = require('util');
var sprintf = require('sprintf-js').sprintf;
var Util = require(path.dirname(__filename) + '/util');
var CodeWriter = require(path.dirname(__filename) + '/code-writer');
var Context = require(path.dirname(__filename) + '/context');

module.exports = Iife;

function Iife() {
    CodeWriter.call(this, beforeWrite);
    this.globalVars = [];
    this.strict = true;
    this.addGlobal = addGlobal;
    this.setGlobals = setGlobals;
    this.setStrict = setStrict;
}
util.inherits(Iife, CodeWriter);

function setStrict(strict) {
    this.strict = !!strict;
    return this;
}

function setGlobals(g) {
    this.globalVars = Util.arrayParam(g);
    return this;
}

function addGlobal(g) {
    if (this.globalVars) {
        this.globalVars.push(g);
    } else {
        this.globalVars = Util.arrayParam(g);
    }
    return this;
}

function beforeWrite() {
    var vars = this.globalVars.join(',');
    var pre = Context.header();
    if (vars != '') {
        pre += sprintf("/*global %s*/\n", vars);
    }
    pre += sprintf('(function(%s){%s', vars, this.strict ? '\'use strict\';' : '');
    return this
        .prepend(pre)
        .append(sprintf('}(%s));', vars));
}