#/bin/bash

CFG_FILE=/workdir/scripts/db_backup.cfg
source $CFG_FILE

# mysqldump -u root -p docker > $BACKUP_DIR"/backup_"$DATE".sql"
if [ ! -e /root/.mylogin.cnf ]
then
    mysql_config_editor set --login-path=scms --host=localhost --user=root --password
fi

for cName in ${componentName[*]}
do
    echo "----- database backup ----- [$cName] ["$BACKUP_DIR"/backup_"$cName"_"$DATE".sql]"
    #mysqldump -u root -p docker --databases $cName > "$BACKUP_DIR/backup_$cName_$DATE.sql"
    mysqldump --login-path=scms --databases $cName > "$BACKUP_DIR"/backup_"$cName"_"$DATE".sql &
done

find $BACKUP_DIR -ctime $DELETE_DAY -exec rm -f {} \;