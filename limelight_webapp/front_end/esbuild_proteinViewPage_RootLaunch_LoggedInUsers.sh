
# esbuild_proteinViewPage_RootLaunch_LoggedInUsers.sh

#   install esbuild first (use npm)

#         npm install --save-exact --save-dev esbuild
#           per https://esbuild.github.io/getting-started/


./node_modules/.bin/esbuild \
./src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_LoggedInUsers.ts  \
 --bundle --sourcemap --target=es2023  \
  '--define:process.env.NODE_ENV="production"' \
 --outfile=./webpack_build_output/js_generated_bundles/data_pages/proteinViewPage_RootLaunch_LoggedInUsers-bundle.js

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
