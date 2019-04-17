#!/bin/bash

java -jar limelightRunImporter.jar \
--config=run_importer_config_file.properties  \
--max_tracking_record_priority_to_retrieve=50	\
 > x_limelightRunImporter_sysout.txt 2> x_limelightRunImporter_syserr.txt

