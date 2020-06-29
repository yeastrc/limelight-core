/**
 * manageUsersForAdminPage_Root.ts
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

import { Handlebars, _dummy_template_template_bundle } from './manageUsersForAdminPage_Root_ImportHandlebarsTemplates'

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';


import { initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { initAdmin } from './manageUsersForAdminPage_Main';


///////////////

$(document).ready(function() {

    initShowHideErrorMessage();
    catchAndReportGlobalOnError.init();

    initAdmin();

});
