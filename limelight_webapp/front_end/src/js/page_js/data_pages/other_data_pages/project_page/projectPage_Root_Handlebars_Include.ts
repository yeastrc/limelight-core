/**
 * projectPage_Root_Handlebars_Include.ts
 *
 * Javascript for projectView.jsp page
 *
 * Include of Handlebars
 *
 *
 */

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */
import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
    require("../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

export { Handlebars, _dummy_template_template_bundle }


// import { Handlebars, _dummy_template_template_bundle } from './projectPage_Root_Handlebars_Include'
