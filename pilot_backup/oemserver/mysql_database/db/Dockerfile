# mysql ---------------------------------------
FROM mysql:8
COPY ./config/my_mysql.cnf /etc/mysql/my.cnf
COPY ./scripts/entrypoint_mysql.sh /usr/local/bin/docker-entrypoint.sh
COPY ./scripts/mysql/.mylogin.cnf /root/.mylogin.cnf

# mariadb -------------------------------------
# FROM mariadb:10.4
# COPY ./config/my_mariadb.cnf /etc/mysql/my.cnf
# COPY ./scripts/entrypoint_mariadb.sh /docker-entrypoint.sh
# COPY ./scripts/mariadb/.maria-login.cnf /root/.maria-login.cnf

# common --------------------------------------

RUN apt-get update && apt-get -y install cron sudo vim procps

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone


RUN mkdir -p /workdir/scripts \
    && mkdir -p /workdir/db_backup \
    && mkdir -p /workdir/logs

WORKDIR /workdir

VOLUME /workdir/db_backup

COPY ./config/cron ./scripts/set_crontab.sh ./config/db_backup.cfg ./scripts/
COPY ./scripts/sudoers /etc/sudoers
# mysql ---------------------------------------
COPY ./scripts/mysql/db_backup.sh ./scripts/
# ---------------------------------------------
# mariadb -------------------------------------
# COPY ./scripts/mariadb/db_backup.sh ./scripts/
# ---------------------------------------------

RUN chmod +x ./scripts/db_backup.sh ./scripts/set_crontab.sh \
    && chmod 440 /etc/sudoers \
    && chmod 755 /usr/local/bin/docker-entrypoint.sh

RUN /bin/bash -c "/workdir/scripts/set_crontab.sh" \
    && touch /etc/sudoers /etc/crontab /etc/cron.*/*

