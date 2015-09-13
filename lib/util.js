/**
 * Utility methods used globally
 */

module.exports = {
    arrayParam: arrayParam,
    ucFirst: ucFirst,
    lcFirst: lcFirst
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