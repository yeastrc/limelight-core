/**
 * projectPage_Root_Handlebars_Include.js
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
var Handlebars = require('handlebars/runtime');
var _dummy_template_template_bundle =
    require("../../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

//  Ignore Error Reported in IntelliJ IDEA and maybe other IDEs
//  Assignment required to support use of Handlebars.templates.templateName in various code like Handlebars based 'class ModalOverlay'
Handlebars.templates = _dummy_template_template_bundle;

export { Handlebars, _dummy_template_template_bundle }


// import { Handlebars, _dummy_template_template_bundle } from './projectPage_Root_Handlebars_Include'
