/**
 * configureLimelightForAdminPage_Root.ts
 * 
 * Javascript for webappAdminConfiguration.jsp page  
 * 
 */

/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';


import { initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';

import { initPage } from './configureLimelightForAdminPage_Main';

///////////////

$(document).ready(function() {

    initShowHideErrorMessage();
    limelight__catchAndReportGlobalOnError.init();

    initPage();

});
