/**
 * Immediately Invoked Function Expression
 */

module.exports = Iife;

function Iife(writers, globalVars) {
    this.write = write;
    if (writers) {
        if (writers instanceof Array) {
            this.writers = writers;
        } else {
            this.writers = [writers];
        }
    } else {
        this.writers = [];
    }
    if (globalVars) {
        if (globalVars instanceof Array) {
            this.globalVars = globalVars;
        } else {
            this.globalVars = [globalVars];
        }
    } else {
        this.globalVars = [];
    }
}

function write(out) {
    var globalStr = this.globalVars.join(',');
    out.write('(function (' + globalStr + ') {');
    this.writers.forEach(function (writer) {
        writer.write(out);
    });
    out.write('})(' + globalStr + ');');
}