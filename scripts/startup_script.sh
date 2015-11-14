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

SERVER_HOME=/home/pi/webserver
EXEC=${SERVER_HOME}/bin/server

case "$1" in 
    start)
        echo "Starting TTS Server"
        ${EXEC} start
        ;;
    stop)
        echo "Stopping TTS Server"
        ${EXEC} start
        ;;
    restart)
        echo "Restarting TTS Server"
        ${EXEC} stop
        ${EXEC} start
        ;;
    status)
        echo "Status of TTS Server..."
        ${EXEC} status
        ;;
    *)
        ${EXEC}
        ;;
esac

exit 0
