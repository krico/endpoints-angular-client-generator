/**
 * Logging used by the framework
 */

var winston = require('winston');
var transports = [
    new (winston.transports.Console)({
        json: false,
        level: 'info',
        timestamp: false,
        handleExceptions: true
    }),
    new (winston.transports.File)({
        json: false,
        level: 'warn',
        filename: 'endpoints-angular-client-generator.log'
    })];
var logger = new (winston.Logger)({
    transports: transports,
    exceptionHandlers: transports,
    exitOnError: true
});

module.exports = logger;