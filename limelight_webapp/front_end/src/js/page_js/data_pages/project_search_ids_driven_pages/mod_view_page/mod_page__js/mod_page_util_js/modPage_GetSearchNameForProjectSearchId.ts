/**
 * modPage_GetSearchNameForProjectSearchId.ts
 */
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 * @param projectSearchId
 * @param dataPageStateManager_DataFrom_Server
 *
 * FROM:  ModViewDataVizRenderer_MultiSearch.getSearchNameForProjectSearchId
 */
export const modPage_GetSearchNameForProjectSearchId = function (
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
        const msg = "modPage_GetSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    const searchName = searchNameObject.name;

    const searchId = searchNameObject.searchId

    const retName = "(" + searchId + ") " + searchName;

    return retName;
}