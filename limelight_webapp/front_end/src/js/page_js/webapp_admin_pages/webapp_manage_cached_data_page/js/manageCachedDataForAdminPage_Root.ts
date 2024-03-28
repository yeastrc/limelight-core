/**
 * manageCachedDataForAdminPage_Root.ts
 *
 * Javascript for webappAdminManageUsers.jsp page
 *
 */

import {initShowHideErrorMessage} from "page_js/common_all_pages/showHideErrorMessage";
import {limelight__catchAndReportGlobalOnError} from "page_js/common_all_pages/limelight__catchAndReportGlobalOnError";
import {manageCachedDataForAdminPage_Main_Init} from "page_js/webapp_admin_pages/webapp_manage_cached_data_page/js/manageCachedDataForAdminPage_Main";

/**
 * Always do in Root Javascript for page:
 */

initShowHideErrorMessage();
limelight__catchAndReportGlobalOnError.init();

manageCachedDataForAdminPage_Main_Init();
