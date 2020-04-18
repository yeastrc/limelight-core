/**
 * manageUsersForAdminPage_Root.js
 * 
 * Javascript for webappAdminManageUsers.jsp page  
 * 
 */

/**
 * Always do in Root Javascript for page:
 */

/**
 * Require Handlebars and dummy_template_template-bundle.js so that Handlebars is properly initialized for other uses of it
 */
const Handlebars = require('handlebars/runtime');
const _dummy_template_template_bundle = 
	require("../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

//  Removed since not needed and flagged as error by Webstorm
// Handlebars.templates = _dummy_template_template_bundle;

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';


import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

import { initAdmin } from './manageUsersForAdminPage_Main.js';


///////////////

$(document).ready(function() {

    initShowHideErrorMessage();
    catchAndReportGlobalOnError.init();

    initAdmin();

});
