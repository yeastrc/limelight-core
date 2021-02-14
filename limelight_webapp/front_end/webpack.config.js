
//  webpack.config.js

const path = require('path');

//  Parallel Webpack from  https://github.com/trivago/parallel-webpack


	//  https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


//  !!!!!!!  'extensions:' Needs to be updated for any new file extensions used


//  No longer used
// const HandlebarsPrecompiler = require('webpack-handlebars-precompiler');
		
     //  Also removed from package.json      "webpack-handlebars-precompiler": "^1.1.0"


const mainConfig = {		
	
	devtool: 'source-map',
    optimization: {
	    minimize: false
	},
	resolve: {
	    alias: {
	       'handlebars.runtime': 'handlebars/dist/handlebars.runtime.min.js'
	    },
	    modules: [
	        path.resolve('./src/js'),
	        path.resolve('./node_modules'),
		],
		extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss']  //  !!!!!!!  Needs to be updated for any new file extensions used
	},
	plugins: [
		new CaseSensitivePathsPlugin()
		//  Removed (both) since doesn't precompile the Handlebars in an output format that can be imported  
//        new HandlebarsPrecompiler({
//            precompileOpts: {preventIndent: true},  //  Passed to Handlebars.precompile(..., precompileOpts ); https://handlebarsjs.com/reference.html
//            templatesPath: path.join(__dirname, 'handlebars_templates'),
//            templatesExt: '.hbs',
////            helpersPath: path.join(__dirname, 'helpers'), // optional
//            outputFile: path.join(__dirname, 'handlebars_templates_precompiled/bundle.js'),
//        }),
//        new HandlebarsPrecompiler( {
//        	precompileOpts: { preventIndent: true }, //  Passed to Handlebars.precompile(..., precompileOpts ); https://handlebarsjs.com/reference.html
//        	templatesPath: path.join( __dirname, 'handlebars_templates','peptide_table' ), 
//        	templatesExt: '.handlebars',
////      	helpersPath: path.join(__dirname, 'helpers'), // optional
//        	outputFile: path.join( __dirname, 'handlebars_templates_precompiled', 'peptide_page', 'peptide_table_template-bundle.js' )
//        } )
    ],

	entry: {

		//  Data Pages
		//  
		
		'data_pages/projectsListPage' : './src/js/page_js/data_pages/other_data_pages/projectsListPage.ts',
		
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
		
		//  Lorikeet Own Page
		'data_pages/lorikeetSpectrumViewPage_Root' : './src/js/page_js/data_pages/other_data_pages/lorikeet_spectrum_viewer_page/lorikeetSpectrumViewer_OwnPage_Root.ts',

		//  ProjectSearchId Driven pages

		'data_pages/peptideViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/peptideViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_PublicUser.ts',
		'data_pages/proteinViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/proteinViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_PublicUser.ts',
		
		'data_pages/modViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_LoggedInUsers.js',
		'data_pages/modViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_PublicUser.js',

		//  Experiment Data pages

		'data_pages/peptideExperimentPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/peptideExperimentPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_RootLaunch_PublicUser.ts',

		'data_pages/proteinExperimentPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/proteinExperimentPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_RootLaunch_PublicUser.ts',

		'data_pages/modExperimentPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/js/modExperimentPage_RootLaunch_LoggedInUsers.ts',
		'data_pages/modExperimentPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/experiment_driven_data_pages/mod_exp__page/mod_exp_page_root/js/modExperimentPage_RootLaunch_PublicUser.ts',
		
		///////////////
		
		//  User Pages
		
		'user_pages/userLoginPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userLoginPage_Root.ts',
		'user_pages/userInvitePage_Root' : './src/js/page_js/user_account_page_js/root_parts/userInvitePage_Root.ts',
		'user_pages/userResetPasswordPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userResetPasswordPage_Root.ts',
		'user_pages/userAccountManagementPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userAccountManagementPage_Root.ts',

		///////////////

		/////  Admin Pages

		//  Webapp Configure Page
		'webapp_admin/configurePage_Root' : './src/js/page_js/webapp_admin_pages/webapp_config_page/configureLimelightForAdminPage_Root.ts',

		//  Webapp Manage Users Page
		'webapp_admin/manageUsersPage_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Root.ts',

		//  Webapp Manage Cached Data Page
		'webapp_admin/manageCachedDataPage_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_cached_data_page/js/manageCachedDataForAdminPage_Root.ts',

		///////////////
		
		// SASS files
		'styles' : './src/styles/global.scss',
	},
	output: {
		path: path.resolve(__dirname, 'webpack_build_output/'),
		filename: 'js_generated_bundles/[name]-bundle.js'
	},

	module:{
		rules:[
				{
					test: /\.(ts|tsx)$/,
					exclude: /(node_modules|bower_components)/,
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
		          exclude: /(node_modules|bower_components)/,
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
							options: { minimize: true }
						},
						{
							loader: 'sass-loader'
						}
					]
				}
		 	]
	  },
};

module.exports = mainConfig;

//     Following doesn't work.

//  export default [ mainConfig ];

