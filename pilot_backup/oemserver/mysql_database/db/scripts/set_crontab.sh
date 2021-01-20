#/bin/sh

cat <(crontab -l) <(cat /workdir/scripts/cron) | crontab -

# cat <(cat /entrypoint.sh) <(echo $'\n''/bin/bash -c "service cron start"'$'\n') >> /entrypoint.sh
