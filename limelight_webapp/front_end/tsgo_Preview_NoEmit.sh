#!/bin/bash

set -e  #  exit on first error

###   Needs property file with name 'tsgo_Preview_NoEmit.sh__file_location.properties'

###       This property file will contain 1 line with the next line (NOT commented out).  the '=' is followed by the path with filename to the 'tsgo' executable:
# TS_GO__EXECUTABLE_PATH=

# node_modules/./@typescript/native-preview-linux-x64/lib/tsgo  --noEmit

#  Execute tsgo from outside this project.    Old version of Webstorm appears to have issues when it is installed (or maybe the issues were unrelated)

PROPERTY_FILE=tsgo_Preview_NoEmit.sh__file_location.properties

if [ ! -f "$PROPERTY_FILE" ]; then
    echo "Property File for path to tsgo not found: $PROPERTY_FILE"
fi

source $PROPERTY_FILE

$TS_GO__EXECUTABLE_PATH  --noEmit

