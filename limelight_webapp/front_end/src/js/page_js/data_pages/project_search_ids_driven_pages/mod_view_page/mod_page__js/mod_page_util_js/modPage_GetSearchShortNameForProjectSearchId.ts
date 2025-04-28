/**
 * modPage_GetSearchShortNameForProjectSearchId.ts
 */
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 * @param projectSearchId
 * @param dataPageStateManager_DataFrom_Server
 *
 * FROM:  ModDataUtils.getSearchShortNameForProjectSearchId
 */
export const modPage_GetSearchShortNameForProjectSearchId = function (
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
        const msg = "modPage_GetSearchShortNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    const searchShortName = searchNameObject.searchShortName;

    return searchShortName;
}