# Express text-to-speech server

This is a simple express based server that converts text messages passed in HTTP requests to speech.

### Installation - Mac OS X

Prerequisites:
- node and npm installed and available on the path
- Speakers turned on

```sh
$ git clone --depth 1 https://github.com/i2shar/express-text-to-speech.git
$ cd express-text-to-speech/
$ npm install
$ bin/server start
```
Then execute
```sh
$ curl --user tushar:s3cr3t localhost:3000/speak/Hello%20World!
```


### Installation - Raspberry Pi 2

Prerequisites:
- node and npm installed and available on the path
- omxplayer installed and working
- some text-to-speech library installed and working (for e.g. [GoogleSpeech](https://github.com/desbma/GoogleSpeech))

```sh
$ git clone --depth 1 https://github.com/i2shar/express-text-to-speech.git
$ cd express-text-to-speech/
$ mv conf/config.json conf/config.mac.json
$ mv conf/config.raspi.json conf/config.json
$ npm install
$ bin/server start
```
Then execute
```sh
$ curl --user tushar:s3cr3t localhost:3000/speak/Hello%20World!
```
