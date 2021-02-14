/**
 * create_Navigation_dataPages_Maint_Root_Component_Props.ts
 *
 * Create Navigation_dataPages_Maint_Root_Component_Props Object
 *
 * For Component of Data Page Navigation links at top of data pages
 *
 *   NOT USED
 */

import {ControllerPath_forCurrentPage_FromDOM} from "page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM";
import {_REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR} from "page_js/data_pages/data_pages_common/a_dataPagesCommonConstants";

/**
 * Create Navigation_dataPages_Maint_Root_Component_Props Object
 *
 */
// export const create_Navigation_dataPages_Maint_Root_Component_Props = function () {
//
//     const controllerPath_forCurrentPage = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();
//
//     //  Create URL Path to append to base page controller paths for links
//
//     const windowPath = window.location.pathname;
//
//     const windowPath_controllerPathIndex = windowPath.indexOf( controllerPath_forCurrentPage );
//     const windowPath_after_controllerPathIndex = windowPath_controllerPathIndex + controllerPath_forCurrentPage.length;
//
//     const windowPathAfterControllerPath = windowPath.substring( windowPath_after_controllerPathIndex );
//
//     let pathAddition = windowPathAfterControllerPath;
//
//     if ( ! windowPath.endsWith( _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR ) ) {
//
//         pathAddition += _REFERRER_PATH_WITH_LEADING_PATH_SEPARATOR;
//     }
//
//
// }
