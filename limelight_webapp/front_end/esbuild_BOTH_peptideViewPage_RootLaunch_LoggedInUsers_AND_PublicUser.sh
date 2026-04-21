#!/bin/bash

set -e  #  exit on first error




# esbuild_BOTH_peptideViewPage_RootLaunch_LoggedInUsers_AND_PublicUser.sh

#   install esbuild first (use npm)

#         npm install --save-exact --save-dev esbuild
#           per https://esbuild.github.io/getting-started/

echo run ./tsgo_Preview_NoEmit.sh BEFORE

  ###  Run Typescript Go with '--noEmit' to Validate all Typescript
 time ./tsgo_Preview_NoEmit.sh

echo run ./tsgo_Preview_NoEmit.sh AFTER

#  Build Peptide Page - Logged In user

./node_modules/.bin/esbuild \
./src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_LoggedInUsers.ts  \
 --bundle --sourcemap --target=es2023  \
  '--define:process.env.NODE_ENV="production"' \
 --outfile=./webpack_build_output/js_generated_bundles/data_pages/peptideViewPage_RootLaunch_LoggedInUsers-bundle.js

#  Build Peptide Page - Public user

./node_modules/.bin/esbuild \
./src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_PublicUser.ts  \
 --bundle --sourcemap --target=es2023  \
  '--define:process.env.NODE_ENV="production"' \
 --outfile=./webpack_build_output/js_generated_bundles/data_pages/peptideViewPage_RootLaunch_PublicUser-bundle.js

 
 
 #  Copy to Tomcat

echo run ant -f ant_buildFrontEnd_ONLY_JS_From_WebpackDir_CopyToTomcat.xml BEFORE
echo

 time ant -f ant_buildFrontEnd_ONLY_JS_From_WebpackDir_CopyToTomcat.xml

echo run ant -f ant_buildFrontEnd_ONLY_JS_From_WebpackDir_CopyToTomcat.xml AFTER

 #####

 ##   esbuild extra


#   without  --minify  the NODE_ENV="development"

#  --minify   also sets NODE_ENV=production

#  attempt to build with NODE_ENV=production but NOT minify:

#   IF MINIFY see:   ZZ__Tool_JS_StackTrace_And_SourceMap_Get_Source_LineNumbers.txt   https://github.com/mifi/stacktracify

###################

#     without --minify then get error below 'installHook.js:1 Uncaught Error: React is running in production mode...'

#       try:
##  '--define:process.env.NODE_ENV="production"'

#     This builds and results in production mode but throws an Exception in the browser with
#       "installHook.js:1 Uncaught Error: React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production"
#     The app appears to run fine.
#     The window.onerror code in the JSP that catches this error has been modified to ignore this error message.

#       Google search of error leads to https://github.com/evanw/esbuild/issues/2353

###################


date
