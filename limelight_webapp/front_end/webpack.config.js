
//  webpack.config.js

const path = require('path');

//  Parallel Webpack from  https://github.com/trivago/parallel-webpack


	//  https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');


//  No longer used
// const HandlebarsPrecompiler = require('webpack-handlebars-precompiler');
		
     //  Also removed from package.json      "webpack-handlebars-precompiler": "^1.1.0"


const mainConfig = {		
	
	devtool: 'source-map',
	resolve: {
	    alias: {
	       'handlebars.runtime': 'handlebars/dist/handlebars.runtime.min.js'
	    },
	    modules: [
	        path.resolve('./src/js'),
	        path.resolve('./node_modules'),
		]
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
		'data_pages/projectsListPage' : './src/js/page_js/data_pages/other_data_pages/projectsListPage.js',
		
		//  Project Page:
		//   Project page for each type of user and whether or not the project is locked
		//   Applies to both
		'data_pages/projectViewPage_PublicUser' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_PublicUser.js',
		//   Project is NOT Locked
		'data_pages/projectViewPage_Researcher_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ResearcherUser.js',
		'data_pages/projectViewPage_ProjectOwner_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectOwnerUser.js',
		//   Project is Locked
		'data_pages/projectViewPage_ProjectLocked_Researcher_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectLocked_ResearcherUser.js',
		'data_pages/projectViewPage_ProjectLocked_ProjectOwner_W_User' : './src/js/page_js/data_pages/other_data_pages/project_page/projectPage_Root_ProjectLocked_ProjectOwnerUser.js',
		
		//  Lorikeet Own Page
		'data_pages/lorikeetSpectrumViewPage_Root' : './src/js/page_js/data_pages/other_data_pages/lorikeetSpectrumViewer_OwnPage_Root.js',

		//  ProjectSearchId Driven pages

		'data_pages/peptideViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_LoggedInUsers.js',
		'data_pages/peptideViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptideViewPage_RootLaunch_PublicUser.js',
		
		'data_pages/proteinViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_LoggedInUsers.js',
		'data_pages/proteinViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_root/proteinViewPage_RootLaunch_PublicUser.js',
		
		'data_pages/modViewPage_RootLaunch_LoggedInUsers' : './src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_LoggedInUsers.js',
		'data_pages/modViewPage_RootLaunch_PublicUser' : './src/js/page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_RootLaunch_PublicUser.js',
					
		//  User Pages
		'user_pages/userLoginPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userLoginPage_Root.js',
		'user_pages/userInvitePage_Root' : './src/js/page_js/user_account_page_js/root_parts/userInvitePage_Root.js',
		'user_pages/userResetPasswordPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userResetPasswordPage_Root.js',
		'user_pages/userAccountManagementPage_Root' : './src/js/page_js/user_account_page_js/root_parts/userAccountManagementPage_Root.js',

		//  Webapp Configure Page
		'webapp_admin/configurePage_Root' : './src/js/page_js/webapp_admin_pages/webapp_config_page/configureLimelightForAdminPage_Root.js',

		//  Webapp Manage Users Page
		'webapp_admin/manageUsersPage_Root' : './src/js/page_js/webapp_admin_pages/webapp_manage_users_page/manageUsersForAdminPage_Root.js',


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

