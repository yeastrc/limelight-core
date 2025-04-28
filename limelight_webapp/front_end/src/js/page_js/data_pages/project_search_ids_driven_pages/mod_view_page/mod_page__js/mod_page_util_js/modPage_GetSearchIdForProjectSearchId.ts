/**
 * modPage_GetSearchIdForProjectSearchId.ts
 */
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 * @param projectSearchId
 * @param dataPageStateManager_DataFrom_Server
 *
 * FROM:  ModViewDataVizRenderer_MultiSearch.getSearchIdForProjectSearchId
 */
export const modPage_GetSearchIdForProjectSearchId = function (
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

    let searchId = searchNameObject.searchId;

    return searchId;
}