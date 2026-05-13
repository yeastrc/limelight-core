
//  webpack.config.js

const path = require('path');

//  Parallel Webpack from  https://github.com/trivago/parallel-webpack


	//  https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");


//  !!!!!!!  'extensions:' Needs to be updated for any new file extensions used

const output = {
	path: path.resolve(__dirname, 'build/')
}


const module_MAIN = {
	rules:[
		{
			test: /\.scss$/,
			use: [
				MiniCssExtractPlugin.loader, // Extracts CSS into files
				'css-loader',                // Turns CSS into JS modules
				'sass-loader'                // Compiles Sass to CSS
			]
		}
	]
}

////////

const resolve = {
	modules: [
		// path.resolve('./src/js'),
	path.resolve('./node_modules'),
	],
	extensions: [
		// '.ts', '.tsx', '.js', '.jsx',
		'.scss'
	],  //  !!!!!!!  Needs to be updated for any new file extensions used
	fallback: {
		"path": false, // or require.resolve("path-browserify")
		"fs": false,
		"crypto": false,
		// "buffer": require.resolve("buffer/")
	}
}

const plugins = [
	new CaseSensitivePathsPlugin(),
	new MiniCssExtractPlugin({
		filename: 'css_generated/global.css' // Output file name
	})
]


////////

const mainConfig = (env, argv) => {

	let entry = {

		// SASS files
		'styles' : './src/styles/global.scss',
	}

	return {
		name: "mainConfig",
		resolve,
		plugins,

		entry,
		output,
		mode: 'production', // Minification is enabled by default in production mode

		module: module_MAIN,
		optimization: {
			minimizer: [
				// For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
				`...`,
				new CssMinimizerPlugin(),
			],
		},
	}

}

module.exports = mainConfig;

//     Following doesn't work.

 // export default [ mainConfig ];

