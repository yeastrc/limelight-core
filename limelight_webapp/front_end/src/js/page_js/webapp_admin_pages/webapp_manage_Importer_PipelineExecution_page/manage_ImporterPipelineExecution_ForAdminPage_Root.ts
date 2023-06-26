/**
 * manage_ImporterPipelineExecution_ForAdminPage_Root.ts
 *
 * Javascript for webappAdminManage_Importer_PipelineExecution.jsp page
 *
 */

import {initShowHideErrorMessage} from "page_js/showHideErrorMessage";
import {catchAndReportGlobalOnError} from "page_js/catchAndReportGlobalOnError";
import { manage_ImporterPipelineExecution_ForAdminPage_Main_Init } from "page_js/webapp_admin_pages/webapp_manage_Importer_PipelineExecution_page/manage_ImporterPipelineExecution_ForAdminPage_Main";

/**
 * Always do in Root Javascript for page:
 */

initShowHideErrorMessage();
catchAndReportGlobalOnError.init();

manage_ImporterPipelineExecution_ForAdminPage_Main_Init();
