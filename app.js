var express = require('express');
var app = express();
var child_process = require('child_process');
var utils = require('./util');
var config = require('./config');

var winston = require('winston');
var logger = new winston.Logger({
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
            filename: 'webserver.log',
            handleExceptions: true,
            json: false
        })
    ],
    exitOnError: false
});

app.use(utils.basicAuth(config.username, config.password));

app.get('/speak/:message/:lang?', function (req, res) {
    var message = req.params.message;
    var language = req.params.lang || 'en';

    logRequest(req);

    playSound('soft_chime');
    speak(language, message);

    logger.info('------------------------------');

    res.set("Connection", "close");
    res.status(200).send("OK");
});

app.get('/speakOnly/:message/:lang?', function (req, res) {
    var message = req.params.message;
    var language = req.params.lang || 'en';

    logRequest(req);

    speak(language, message);
    logger.info('------------------------------');
    res.set("Connection", "close");
    res.status(200).send("OK");
});

app.get('/play/:file', function (req, res) {
    var file = req.params.file;
    logRequest(req);
    if (file) {
        playSound('soft_chime');
        playSound(file);
    }
    res.status(200).send("OK");
});

function playSound(file) {
    execProcess(config.playCommand + ' sounds/' + file + '.mp3');
}

function speak(language, message) {
    switch (language) {
        case 'hi':
            execProcess(config.speakHindiCommand + ' ' + message);
            break;
        case 'en':
        default:
            execProcess(config.speakCommand + ' ' + message);
            break;
    }
}

function logRequest(req) {
    logger.info("Request IP: " + req.ip + ", method: " + req.method + " " + req.url + ", params: ", req.params);
}

function execProcess(command) {
    child_process.execSync(command, {encoding: 'UTF8', input: ''});
}


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    logger.info('Example app listening at http://%s:%s', host, port);

});
