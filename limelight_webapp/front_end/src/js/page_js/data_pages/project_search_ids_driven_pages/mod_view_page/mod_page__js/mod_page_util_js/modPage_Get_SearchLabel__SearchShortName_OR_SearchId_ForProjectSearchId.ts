/**
 * modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId.ts
 */
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 * @param projectSearchId
 * @param dataPageStateManager_DataFrom_Server
 *
 * FROM:  ModDataUtils.getSearchShortNameXorSearchIdForProjectSearchId
 */
export const modPage_Get_SearchLabel__SearchShortName_OR_SearchId_ForProjectSearchId = function (
    {
        projectSearchId,
        dataPageStateManager_DataFrom_Server
    } : {
        projectSearchId : number
        dataPageStateManager_DataFrom_Server : DataPageStateManager
    }) {

    // const maxLength = 30;

    const searchNameObject = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchId );
    if ( ! searchNameObject ) {
        const msg = "getSearchIdForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    const searchLabel__SearchShortName_OR_SearchId = searchNameObject.searchLabel__SearchShortName_OR_SearchId;

    return searchLabel__SearchShortName_OR_SearchId;
}