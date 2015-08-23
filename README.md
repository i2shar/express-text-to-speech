# Express text-to-speech server

This is a simple express based server that converts text messages passed in HTTP requests to speech.

### Installation - Mac OS X

Prerequisites:
- node and npm install and available on the path
- Speakers turned on

```sh
$ git clone https://github.com/i2shar/express-text-to-speech.git
$ cd express-text-to-speech/
$ npm install
$ bin/server start
```
Then execute
```sh
$ curl --user tushar:s3cr3t localhost:3000/speak/Hello%20World!
```


### Installation - Raspberry Pi 2
Coming soon!