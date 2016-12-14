#!/bin/bash
DIRNAME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CRON_LOGFILE=$DIRNAME/cron.log

NODE=$(readlink -f $DIRNAME/index.js)
COMMANDS=(
  "* * * * * node $NODE"
)
CRONFILE=$DIRNAME/generated.cron

if [ -f $CRONFILE ]; then
  rm $CRONFILE
fi

echo "PATH=$PATH" >> $CRONFILE
for COMMAND in "${COMMANDS[@]}"; do
  echo "$COMMAND" >> $CRONFILE
done

echo Generated $CRONFILE

crontab $CRONFILE
crontab -l
