/**
 * peptideViewPage_RootLaunch_ImportHandlebars.ts
 *
 * For peptideView.jsp page
 *
 * Root Launch Javascript Import Handlebars
 *
 * !!!  This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 *
 *
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */

import Handlebars = require('handlebars/runtime');

import _dummy_template_template_bundle = require( "../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

export { Handlebars, _dummy_template_template_bundle }
