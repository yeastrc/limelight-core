

#  v_webpack__Run__ScanFileBrowserPage_Only_Build.sh


set -e

CONFIG_FILE="./v_webpack__Run__XXX_Only_Build_CONFIG.sh"

echo Sourcing file for configuration.  File: $CONFIG_FILE

if [ ! -f $CONFIG_FILE ]; then
   echo "Config File $CONFIG_FILE does not exist."
   exit 1
fi
. $CONFIG_FILE

echo
echo Copy of Results will go to: DESTINATION_DIR:  $DESTINATION_DIR

date

echo


echo START: Build in Webpack Entry: --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_PublicUser --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_LoggedInUsers: 

node_modules/.bin/webpack --mode=development  --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_PublicUser --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_LoggedInUsers

echo
echo
echo START: copy to tomcat dir: $DESTINATION_DIR

cp -r \
 webpack_build_output/js_generated_bundles/* \
 $DESTINATION_DIR

echo DONE: copy to tomcat dir: $DESTINATION_DIR

date
