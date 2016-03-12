#!/bin/sh
# kFreeBSD do not accept scripts as interpreters, using #!/bin/sh and sourcing.
if [ true != "$INIT_D_SCRIPT_SOURCED" ] ; then
    set "$0" "$@"; INIT_D_SCRIPT_SOURCED=true . /lib/init/init-d-script
fi
### BEGIN INIT INFO
# Provides:          tts_server
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: TTS Server
# Description:       This is a TTS Server
#
### END INIT INFO

# Author: Tushar
#

HOME=/home/pi
SERVER_HOME=/home/pi/webserver
USER=pi
export HOME USER SERVER_HOME

case "$1" in 
    start)
        echo "Starting TTS Server"
        su - ${USER} ${SERVER_HOME}/bin/server start
        ;;
    stop)
        echo "Stopping TTS Server"
        su - ${USER} ${SERVER_HOME}/bin/server stop
        ;;
    restart)
        echo "Restarting TTS Server"
        su - ${USER} ${SERVER_HOME}/bin/server stop
        su - ${USER} ${SERVER_HOME}/bin/server start
        ;;
    status)
        echo "Status of TTS Server..."
        su - ${USER} ${SERVER_HOME}/bin/server status
        ;;
    *)
        su - ${USER} ${SERVER_HOME}/bin/server
        ;;
esac

exit 0
