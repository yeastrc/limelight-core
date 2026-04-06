
//  NOT currently used!!

//  esbuild_with_config__NOT_CURRENTLY_USED.js

//  run using:   node  esbuild_with_config__NOT_CURRENTLY_USED.js

//   Common to add to package.json in the 'scripts' object:  'build', 'node  esbuild_with_config__NOT_CURRENTLY_USED.js'


//  This method of building is Used to handle js/ts files that import/require sass/scss files.
//
//  More work is needed in that case to handle those sass/scss files along with Limelight scss files.


const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

esbuild.build({
    entryPoints: ["./src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_PublicUser.ts"],
    bundle: true,
    outfile: "./webpack_build_output/js_generated_bundles/data_pages/proteinViewPage_RootLaunch_PublicUser-bundle.js",
    sourcemap: 'external',
    // Add the plugin here
    plugins: [sassPlugin()],
}).catch(() => process.exit(1));
