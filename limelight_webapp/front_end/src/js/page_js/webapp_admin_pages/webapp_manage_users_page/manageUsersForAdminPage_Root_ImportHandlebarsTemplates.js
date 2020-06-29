/**
 * manageUsersForAdminPage_Root_ImportHandlebarsTemplates.js
 *
 * import Handlebars templates for manageUsersForAdminPage_Root.ts
 *
 */

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */
const Handlebars = require('handlebars/runtime');
const _dummy_template_template_bundle =
    require("../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

//  Removed since not needed and flagged as error by Webstorm
// Handlebars.templates = _dummy_template_template_bundle;

export { Handlebars, _dummy_template_template_bundle }
