/**
 * configureLimelightForAdminPage_Root.ts
 * 
 * Javascript for webappAdminConfiguration.jsp page  
 * 
 */

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';


import { initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { initPage } from './configureLimelightForAdminPage_Main';


///////////////

$(document).ready(function() {

    initShowHideErrorMessage();
    catchAndReportGlobalOnError.init();

    initPage();

});
