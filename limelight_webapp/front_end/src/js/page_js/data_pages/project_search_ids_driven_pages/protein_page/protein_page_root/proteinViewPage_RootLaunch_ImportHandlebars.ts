/**
 * proteinViewPage_RootLaunch_ImportHandlebars.ts
 *
 * For proteinView.jsp page
 *
 * Root Launch Javascript Import Handlebars
 *
 * !!!  This will stay Javascript (".js") and not Typescript since uses "require" for import of Handlebars and Handlebars Precompiled Templates
 *
 * !!!  This is required in ...RootLaunch... files: const Handlebars = require('handlebars/runtime');
 *
 *
 */


//  This is required in this 'RootLaunch' file to add Handlebars before anything else is added to the bundle

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */

// @ts-ignore
import Handlebars = require('handlebars/runtime');

// @ts-ignore
import _dummy_template_template_bundle = require("../../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

export { Handlebars, _dummy_template_template_bundle }
