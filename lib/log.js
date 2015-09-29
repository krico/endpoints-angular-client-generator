/**
 * Logging used by the framework
 */

var winston = require('winston');
winston.cli();

var transports = [
    new (winston.transports.Console)({
        json: false,
        level: 'info',
        timestamp: false,
        handleExceptions: false
    }),
    new (winston.transports.File)({
        json: false,
        level: 'warn',
        filename: 'endpoints-angular-client-generator.log'
    })];
var logger = new (winston.Logger)({
    transports: transports,
    exitOnError: true
});

module.exports = logger;