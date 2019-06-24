/**
 * configureLimelightForAdminPage_Root.js
 * 
 * Javascript for webappAdminConfiguration.jsp page  
 * 
 */

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';


import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

import { initPage } from './configureLimelightForAdminPage_Main.js';


///////////////

$(document).ready(function() {

    initShowHideErrorMessage();
    catchAndReportGlobalOnError.init();

    initPage();

});
