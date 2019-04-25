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


import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

import { initPage } from './configureLimelightForAdminPage_Main.js';


///////////////

$(document).ready(function() {

    initShowHideErrorMessage();
    catchAndReportGlobalOnError.init();

    initPage();

});
