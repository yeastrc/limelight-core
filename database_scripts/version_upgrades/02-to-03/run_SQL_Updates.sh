#!/bin/bash
# Proper header for a Bash script.

mysql_user=user
mysql_pwd=pwd

mysql -u ${mysql_user} -p${mysql_pwd} limelight < 001_update_to_Limelight_V3__NewTables.sql

mysql -u ${mysql_user} -p${mysql_pwd} limelight < 002_update_to_Limelight_V3__AlterTables.sql

mysql -u ${mysql_user} -p${mysql_pwd} limelight < 003_update_to_Limelight_V3__InsertIntoTables.sql

