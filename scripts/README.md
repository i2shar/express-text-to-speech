### How to create a startup service for Debian based linux

Useful for Raspberry Pi installations

Also see /etc/init.d/README for additional help.

There should already be a skeleton template in /etc/init.d/. Copy it into another file, set the executable flag and edit 

```sh
sudo cp /etc/init.d/skeleton /etc/init.d/tts_server
sudo chmod +x /etc/init.d/tts_server
sudo nano /etc/init.d/tts_server
``` 

Edit the contents of /etc/init.d/tts_server to match the contents of startup_script.sh

```sh
sudo update-rc.d /etc/init.d/tts_server defaults
```

And finally, restart

```sh
sudo reboot
```
