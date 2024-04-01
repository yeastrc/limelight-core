
//  webpack.config.js

const path = require('path');

//  Parallel Webpack from  https://github.com/trivago/parallel-webpack


	//  https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


//  !!!!!!!  'extensions:' Needs to be updated for any new file extensions used


const devtool = 'source-map'
const optimization = {
	minimize: false
}

const output = {
	path: path.resolve(__dirname, 'webpack_build_output/'),
	filename: 'js_generated_bundles/[name]-bundle.js'
}


const module_MAIN = {
	rules:[
		{
			test: /\.(ts|tsx)$/,
			exclude: /(node_modules|bower_components|typescript_compile_output|webpack_build_output)/,
			use: [
				{
					loader: 'ts-loader',
					options: {
						// transpileOnly: true,
						// "baseUrl": "./src/js",
					}
				}
			]
		},
		{
			test: /\.(js|jsx)$/,
			exclude: /(node_modules|bower_components|typescript_compile_output|webpack_build_output)/,
			loader: "babel-loader",
			options: {  } // Do not put this inside options: { } :  { presets: ["@babel/env"] }
		},
		{
			test:/\.scss$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						name: '[name].css',
						outputPath: 'css_generated/'
					}
				},
				{
					loader: 'extract-loader'
				},
				{
					loader: 'css-loader',
					options: {} //  WAS { minimize: true }  Output is minimized anyway
				},
				{
					loader: 'sass-loader'
				}
			]
		}
	]
}

////////

const resolve = {
	alias: {
	},
	modules: [
		path.resolve('./src/js'),
	path.resolve('./node_modules'),
	],
	extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']  //  !!!!!!!  Needs to be updated for any new file extensions used
}

const plugins = [
	new CaseSensitivePathsPlugin()
]


////////

const mainConfig = (env, argv) => {


	//  NEW format for '--env'  Webpack 5.90.0

	//  Listing same property more than once appears to NOT create an array
	//  Coded below to split the param value on single space.

	//  so:
	//     param 1:  '--env'
	//     param 2:  'build_entry=<entry key> <second entry key>"


	//  OLD format for '--env'

	// Choose which 'entry' properties to build using on command line:
	//
	//		Single
	// node_modules/.bin/webpack --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_PublicUser
	//
	//		Multiple  - repeat  '--env.build_entry='
	// node_modules/.bin/webpack --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_PublicUser --env.build_entry=data_pages/scanFileBrowserViewPage_RootLaunch_LoggedInUsers

	let entry = {

		//  Main Pages Header: for header_main_pages.jsp

		'header_main_pages/limelight__header_main_pages__all_users_Setup' : './src/js/page_js/header_main_pages/header_main_pages__all_users/limelight__header_main_pages__all_users_Setup.ts',
		'header_main_pages/limelight__header_main_pages__logged_in_user_Setup' : './src/js/page_js/header_main_pages/header_main_pages__logged_in_user/limelight__header_main_pages__logged_in_user_Setup.ts',

		//  Data Pages
		//  

		'data_pages/projectsListPage' : './src/js/page_js/data_pages/other_data_pages/project_list_page/projectsListPage.ts',
		
		//  Project Page:
		//   Project page for each type of user and whether or not the project is locked
		//   Applies to both
		'data_pages/projectViewPage_PublicUser' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_PublicUser.ts',
		//   Project is NOT Locked
		'data_pages/projectViewPage_Researcher_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ResearcherUser.ts',
		'data_pages/projectViewPage_ProjectOwner_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectOwnerUser.ts',
		//   Project is Locked
		'data_pages/projectViewPage_ProjectLocked_Researcher_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectLocked_ResearcherUser.ts',
		'data_pages/projectViewPage_ProjectLocked_ProjectOwner_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectLocked_ProjectOwnerUser.ts',

		//  Project: Organize Searches Page:
		'data_pages/project_OrganizeSearches_Page' : './src/js/page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches_ROOT.ts',

		//  Lorikeet Own Page
		'data_pages/lorikeetSpectrumViewPage_Root' : './src/js/page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_OwnPage_Root.ts',

		//  ProjectSearchId Driven pages

		'data_pages/peptideViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/peptideViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_PublicUser.ts',
		'data_pages/proteinViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/proteinViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_PublicUser.ts',
		
		'data_pages/modViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/modViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_PublicUser.ts',

		'data_pages/qcViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_root/qcViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/qcViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_root/qcViewPage_RootLaunch_PublicUser.ts',

		//  Experiment Data pages

		'data_pages/peptideExperimentPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/peptideExperimentPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_RootLaunch_PublicUser.ts',

		'data_pages/proteinExperimentPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/proteinExperimentPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootLaunch_PublicUser.ts',

		'data_pages/modExperimentPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/js/modExperimentPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/modExperimentPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/js/modExperimentPage_RootLaunch_PublicUser.ts',


		//  Feature Detection View Data pages

		'data_pages/featureDetection_ViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/featureDetection_ViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/featureDetection_ViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/feature_detection_driven_pages/feature_detection_view_page/feature_detection_view_page_root/featureDetection_ViewPage_RootLaunch_PublicUser.ts',

		//  Scan File Data pages

		'data_pages/scanFileBrowserViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/scanFileBrowserViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/scan_file_driven_pages/scan_file_browser_page/scan_file_browser_page_root/scanFileBrowserViewPage_RootLaunch_PublicUser.ts',

		///////////////
		
		//  User Pages
		
		'user_pages/userLoginPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userLoginPage_Root.ts',
		'user_pages/userCreateAccount_Root' : './src/js/page_js/user_account_page_js/root_parts/userCreateAccountPage_Root.ts',
		'user_pages/userInvitePage_Root' : './src/js/page_js/user_account_page_js/root_parts/userInvitePage_Root.ts',
		'user_pages/userResetPasswordPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userResetPasswordPage_Root.ts',
		'user_pages/userAccountManagementPage_Root' : './src/js/page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_Root.ts',

		///////////////

		/////  Admin Pages

		//  Webapp Configure Page
		'webapp_admin/configurePage_Root' : './src/js/page_js/webapp_admin_pages/webapp_config_page/configureLimelightForAdminPage_Root.ts',

		//  Webapp Manage Users Page
		'webapp_admin/manageUsersPage_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Root.ts',

		//  Webapp Manage Importer / Pipeline Execution Page
		'webapp_admin/manage_ImporterPipelineExecution_Page_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Root.ts',

		//  Webapp Manage Cached Data Page
		'webapp_admin/manageCachedDataPage_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_cached_data_page/js/manageCachedDataForAdminPage_Root.ts',

		//  Webapp Manage Terms of Service Page
		'webapp_admin/manageTermsOfServicePage_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_terms_of_service_page/manageTermsOfServicePage_Root.ts',

		///////////////
		
		// SASS files
		'styles' : './src/styles/global.scss',
	}

	// console.log("env: " + env)

	if (env) {

		// console.log("Object.keys(env).join(\", \"): " + Object.keys(env).join(", "))
		// console.log("env.build_entry: " + env.build_entry)
		// console.log("env.build_entry.length: " + env.build_entry.length)

		if ( env.build_entry ) {

			console.log()

			console.log("Entering processing in 'webpack.config.js'")
			console.log()

			console.log("'--env build_entry=' has a value.  Processing it.")

			const entry_New = {}

			if ( env.build_entry instanceof Array ) {

				console.log("Specific 'entry' entries will be copied for build from command line params '--env build_entry=': " + env.build_entry.join(", ") )

				console.log("env.build_entry.length: " + env.build_entry.length );
				
				
				for ( const buildEntry of env.build_entry ) {

					const existingEntry = entry[ buildEntry ];

					if ( ! existingEntry ) {
						const msg = "ERROR IN --env build_entry= value.  No 'entry' object key with string '" + buildEntry + "'."
						console.warn(msg)
						throw Error(msg)
					}

					console.log("buildEntry copied to final build: " + buildEntry );
					
					entry_New[ buildEntry ] = existingEntry
				}

				entry = entry_New;

			} else {

				console.log("Specific 'entry' entry will be copied for build from command line param '--env build_entry=': " + env.build_entry )

				// console.log("env.build_entry not Array.  env.build_entry: " + env.build_entry)
				//
				// console.log("entry[ env.build_entry ]: " +  entry[ env.build_entry ] );
				
				const buildEntries_SplitOnSpaceChar = env.build_entry.split(" ")
				
				console.log("buildEntries_SplitOnSpaceChar.length: " + buildEntries_SplitOnSpaceChar.length );
				
				
				for ( const buildEntry of buildEntries_SplitOnSpaceChar ) {

					const existingEntry = entry[ buildEntry ];

					if ( ! existingEntry ) {
						const msg = "ERROR IN --env build_entry= value.  No 'entry' object key with string '" + buildEntry + "'."
						console.warn(msg)
						throw Error(msg)
					}
					
					console.log("buildEntry copied to final build: " + buildEntry );
					
					entry_New[ buildEntry ] = existingEntry
				}

				

//				const existingEntry = entry[ env.build_entry ];
//
//				if ( ! existingEntry ) {
//					const msg = "No 'entry' object key with string '" + env.build_entry + "' from env.build_entry."
//					console.warn(msg)
//					throw Error(msg)
//				}
//
//				entry_New[ env.build_entry ] = existingEntry
			}

			entry = entry_New;


			console.log()
			console.log("After changes to 'entry' based on command line param(s) '--env.build_entry='")
			console.log()
			console.log("'entry' properties: " + Object.keys(entry).join(", "))
			console.log()
			{
				const entry_firstPropertyName = Object.keys(entry)[0];
				console.log("'entry' 1 random property : key: '" + entry_firstPropertyName);
				console.log("'entry' 1 random property : key: '" + entry_firstPropertyName + "', value: " + entry[entry_firstPropertyName])
			}
			console.log()
		}
	}

	// {  //  Code change if build bundles using different program to also run webpack to run Typescript to validate files
	//
	// 	const entry_New = {
	// 		'styles': './src/styles/global.scss',
	// 		'A_Fake_JS_Trigger_TypescriptValidation.ts': './A_Fake_JS_Trigger_TypescriptValidation.ts'
	// 	}
	//
	// 	entry = entry_New;

	// 	console.warn( "NOT building JS Bundles using Webpack. ONLY Doing Typscript Validation" )
	// }


	return {
		name: "mainConfig",
		devtool,
		optimization,
		resolve,
		plugins,

		entry,
		output,

		module: module_MAIN
	}

}

module.exports = mainConfig;

//     Following doesn't work.

 // export default [ mainConfig ];

