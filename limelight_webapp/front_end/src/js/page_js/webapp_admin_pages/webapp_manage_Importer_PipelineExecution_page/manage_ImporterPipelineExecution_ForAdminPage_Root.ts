/**
 * manage_ImporterPipelineExecution_ForAdminPage_Root.ts
 *
 * Javascript for webappAdminManage_Importer_PipelineExecution.jsp page
 *
 */

import {initShowHideErrorMessage} from "page_js/common_all_pages/showHideErrorMessage";
import {limelight__catchAndReportGlobalOnError} from "page_js/common_all_pages/limelight__catchAndReportGlobalOnError";
import { manage_ImporterPipelineExecution_ForAdminPage_Main_Init } from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Main";

/**
 * Always do in Root Javascript for page:
 */

initShowHideErrorMessage();
limelight__catchAndReportGlobalOnError.init();

manage_ImporterPipelineExecution_ForAdminPage_Main_Init();
