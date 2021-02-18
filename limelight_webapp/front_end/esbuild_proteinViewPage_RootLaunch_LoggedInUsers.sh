
# esbuild_proteinViewPage_RootLaunch_LoggedInUsers.sh

#   install esbuild first (use npm)

#  !!!!  The result does NOT load in the browser. 
#		Error in compiled Handlebars Precompiled Templates:   
#			'define' not found.  'define' at the start of the precompiled template

./node_modules/.bin/esbuild \
./src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_LoggedInUsers.ts  \
--bundle  --sourcemap --target=chrome88  \
 --define:process.env.NODE_ENV=\"production\"  \
--outfile=./webpack_build_output/js_generated_bundles/data_pages/proteinViewPage_RootLaunch_LoggedInUsers-bundle.js

