var express = require('express');
var app = express();
var https = require('https');
var http = require('http');
var fs = require('fs');
var child_process = require('child_process');
var basicAuth = require('./lib/auth').basicAuth;
var config = require('./conf/config');

var logger = require('./lib/winston');

if (config.basicAuth.enabled) {
    app.use(basicAuth(config.basicAuth.username, config.basicAuth.password));
}

app.use(function (req, res, next) {
    res.type('text/plain; charset=utf-8');
    res.set("Connection", "close");
    next();
    logRequest(req, res);
});

app.get('/', function (req, res) {
    res.status(200).send("Nothing here. Go away.");
});

app.get('/announce/:key', function (req, res) {
    var file = req.params.key + '.' + config.messages.extension;

    playSound(config.sounds.default);
    playMessage(file);
    res.status(200).send("OK");
});

app.get('/speak/:message/:lang?', function (req, res) {
    var message = req.params.message;
    var language = req.params.lang || 'en';

    playSound(config.sounds.default);
    speak(language, message);
    res.status(200).send("OK");
});

app.get('/speakOnly/:message/:lang?', function (req, res) {
    var message = req.params.message;
    var language = req.params.lang || 'en';

    speak(language, message);
    res.status(200).send("OK");
});

app.get('/play/:file', function (req, res) {
    var file = req.params.file;
    if (file) {
        playSound(file);
    }
    res.status(200).send("OK");
});

app.use(function (err, req, res, next) {
    logger.error(err.stack);
    res.status(500).send('Something broke!');
});

function playSound(file) {
    execProcess(config.commands.play + ' sounds/' + file);
}

function playMessage(file) {
    execProcess(config.commands.play + ' messages/' + file);
}

function speak(language, message) {

    // message needs to be passed in quotes, so that quotes is messages are handled correctly
    switch (language) {
        case 'hi':
            execProcess(config.commands.speakHindi + " \"" + message + "\"");
            break;
        case 'en':
        default:
            execProcess(config.commands.speak + " \"" + message + "\"");
            break;
    }
}

function logRequest(req) {
    logger.info("Request IP: " + req.ip + ", user: " + req.user + ", method: " + req.method + " " + req.url + ", params: ", req.params);
}

function execProcess(command) {
    child_process.execSync(command, {encoding: 'UTF8', input: ''});
}


if (config.ssl.enabled) {
    var options = {
        key: fs.readFileSync(config.ssl.key),
        cert: fs.readFileSync(config.ssl.cert)
    };

    https.createServer(options, app).listen(config.ssl.port);

    http.createServer(function (req, res) {
        var hostname = ( req.headers.host.match(/:/g) ) ? req.headers.host.slice( 0, req.headers.host.indexOf(":") ) : req.headers.host;
        logger.info(hostname);
        var location = "https://" + hostname + ":" + config.ssl.port + req.url;
        logger.info(location);
        res.writeHead(301, {"Location": location});
        res.end();
    }).listen(config.port);

} else {
    var server = app.listen(config.port, function () {

        var host = server.address().address;
        var port = server.address().port;

        logger.info('Example app listening at http://%s:%s', host, port);

    });
}