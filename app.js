var express = require('express');
var app = express();
var child_process = require('child_process');
var basicAuth = require('./lib/auth').basicAuth;
var config = require('./conf/config');

var logger = require('./lib/winston');

app.use(basicAuth(config.basicAuth.username, config.basicAuth.password));

app.use(function(req, res, next) {
    next();
    logRequest(req, res);
    res.type('text/plain; charset=utf-8');
    res.set("Connection", "close");
    res.status(200).send("OK");
});

app.get('/speak/:message/:lang?', function (req, res) {
    var message = req.params.message;
    var language = req.params.lang || 'en';

    playSound('soft_chime.mp3');
    speak(language, message);
});

app.get('/speakOnly/:message/:lang?', function (req, res) {
    var message = req.params.message;
    var language = req.params.lang || 'en';

    speak(language, message);
});

app.get('/play/:file', function (req, res) {
    var file = req.params.file;
    if (file) {
        playSound(file);
    }
});

app.use(function(err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

function playSound(file) {
    execProcess(config.playCommand + ' sounds/' + file);
}

function speak(language, message) {

    // message needs to be passed in quotes, so that quotes is messages are handled correctly
    switch (language) {
        case 'hi':
            execProcess(config.speakHindiCommand + " \"" + message + "\"");
            break;
        case 'en':
        default:
            execProcess(config.speakCommand + " \"" + message + "\"");
            break;
    }
}

function logRequest(req) {
    logger.info("Request IP: " + req.ip + ", user: " + req.user + ", method: " + req.method + " " + req.url + ", params: ", req.params);
}

function execProcess(command) {
    child_process.execSync(command, {encoding: 'UTF8', input: ''});
}


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    logger.info('Example app listening at http://%s:%s', host, port);

});
