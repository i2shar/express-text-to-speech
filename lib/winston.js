var winston = require('winston');

module.exports = new winston.Logger({
    transports: [
        new winston.transports.File({
            timestamp: function () {
                var date = new Date();
                return date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' + date.toLocaleTimeString();
            },
            formatter: function (options) {
                return options.timestamp() + ' ' + options.level.toUpperCase() + ' | ' + (undefined !== options.message ? options.message : '') +
                    (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '' );
            },
            filename: 'log/webserver.log',
            handleExceptions: true,
            json: false
        })
    ],
    exitOnError: false
});