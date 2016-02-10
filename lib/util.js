/**
 * Utility methods used globally
 */

module.exports = {
    arrayParam: arrayParam,
    ucFirst: ucFirst,
    lcFirst: lcFirst,
    isReserved: isReserved
};

function arrayParam(p) {
    if (p) {
        if (p instanceof Array) {
            return p;
        } else {
            return [p];
        }
    }
    return [];
}

function ucFirst(str) {
    str += '';
    return str.charAt(0).toUpperCase() + str.substr(1);
}

function lcFirst(str) {
    str += '';
    return str.charAt(0).toLowerCase() + str.substr(1);
}

function isReserved(name) {
    var reserved = ['abstract', 'arguments', 'boolean', 'break', 'byte',
        'case', 'catch', 'char', 'class', 'const',
        'continue', 'debugger', 'default', 'delete', 'do',
        'double', 'else', 'enum', 'eval', 'export',
        'extends', 'false', 'final', 'finally', 'float',
        'for', 'function', 'goto', 'if', 'implements',
        'import', 'in', 'instanceof', 'int', 'interface',
        'let', 'long', 'native', 'new', 'null',
        'package', 'private', 'protected', 'public', 'return',
        'short', 'static', 'super', 'switch', 'synchronized',
        'this', 'throw', 'throws', 'transient', 'true',
        'try', 'typeof', 'var', 'void', 'volatile',
        'while', 'with', 'yield'];
    return reserved.indexOf(name) !== -1;
}