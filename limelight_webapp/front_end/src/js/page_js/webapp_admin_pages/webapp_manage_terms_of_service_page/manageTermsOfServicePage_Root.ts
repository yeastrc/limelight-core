/**
 * manageTermsOfServicePage_Root.ts
 *
 * Javascript for webappAdminManageTermsOfService.jsp page
 *
 */

import {manageTermsOfService_Maint__initPage} from "page_js/webapp_admin_pages/webapp_manage_terms_of_service_page/manageTermsOfService_Maint";


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

///////////////

$(document).ready(function() {

    catchAndReportGlobalOnError.init();

    manageTermsOfService_Maint__initPage();

});
