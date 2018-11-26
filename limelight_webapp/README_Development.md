# README #

Development for Limelight Web app:

Install program npm

Update npm to latest:

* npm install npm@latest -g

run 'npm install' in folder 'front_end' to download needed items.

	See 'front_end/ZZZ_Front_End_Build_Using_Webpack.txt' and 'front_end/ZZZ_Front_End_First_Install_Things_Globally.txt'

Adding a web page:

	Create a new "root" .js file under 'front_end' and add it to 'front_end/webpack.config.js'

	After running shell script 'front_end/z_runWebpack.sh' or in Eclipse: Gradle Tasks 'limelight_webapp/build/build',
	the resulting JS bundle will be under 'front_end/webpack_build_output/js_generated_bundles' 
	which is copied to 'limelight__webapp/src/main/webapp/static/js_generated_bundles'.



****************

This was done in creating.  The results are stored in 'package.json' so now only need to run 'npm install'

You can use npm to install dependencies with the following commands:


npm install -save-dev babel babel-core babel-preset-es2015 babel-preset-react webpack
npm install -D webpack-cli
npm install -save react

npm install -save-dev babel-loader css-loader file-loader less less-loader style-loader url-loader



Outputs from npm commands:


**  npm install -save-dev babel babel-core babel-preset-es2015 babel-preset-react webpack

npm WARN deprecated babel-preset-es2015@6.24.1: 🙌  Thanks for using Babel: we recommend using babel-preset-env now: please read babeljs.io/env to update! 
npm WARN deprecated babel@6.23.0: In 6.x, the babel package has been deprecated in favor of babel-cli. Check https://opencollective.com/babel to support the Babel maintainers
npm WARN saveError ENOENT: no such file or directory, open '.../GIT_CLONE_SEcond/<git repo>/limelight_webapp/package.json'

****************************



### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact
