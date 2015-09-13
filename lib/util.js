/**
 * Utility methods used globally
 */

module.exports = {
    arrayParam: arrayParam
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