#!/bin/bash

set -e  #  exit on first error



####  NOTE:  NOT all bundles are currently included.


# esbuild_proteinViewPage_RootLaunch_LoggedInUsers.sh

#   install esbuild first (use npm)

#         npm install --save-exact --save-dev esbuild
#           per https://esbuild.github.io/getting-started/

#  Build Many

rm -rf esbuild_TestBuild
 
./node_modules/.bin/esbuild \
  		./src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_root/qcViewPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_root/qcViewPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/scanFileToSearchesViewPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/scanFileToSearchesViewPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootLaunch_PublicUser.ts  \
		./src/js/page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/js/modExperimentPage_RootLaunch_LoggedInUsers.ts  \
		./src/js/page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/js/modExperimentPage_RootLaunch_PublicUser.ts  \
  --bundle --sourcemap --target=es2023  \
  '--define:process.env.NODE_ENV="production"' \
 --outdir=./esbuild_TestBuild/js_generated_bundles
 

 #####
 
 ##   esbuild extra
 

#   without  --minify  the NODE_ENV="development"

#  --minify   also sets NODE_ENV=production

#  attempt to build with NODE_ENV=production but NOT minify:

#   IF MINIFY see:   ZZ__Tool_JS_StackTrace_And_SourceMap_Get_Source_LineNumbers.txt   https://github.com/mifi/stacktracify

###################

#       try:
##  '--define:process.env.NODE_ENV="production"'

#     This builds and results in production mode but throws an Exception in the browser with
#       "installHook.js:1 Uncaught Error: React is running in production mode, but dead code elimination has not been applied. Read how to correctly configure React for production"
#     The app appears to run fine.
#     The window.onerror code in the JSP that catches this error has been modified to ignore this error message.

#       Google search of error leads to https://github.com/evanw/esbuild/issues/2353

###################
