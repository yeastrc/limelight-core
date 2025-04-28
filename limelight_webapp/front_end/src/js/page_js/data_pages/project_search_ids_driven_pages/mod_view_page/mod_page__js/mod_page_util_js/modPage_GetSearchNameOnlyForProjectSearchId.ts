/**
 * modPage_GetSearchNameOnlyForProjectSearchId.ts
 */
import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";

/**
 *
 * @param projectSearchId
 * @param dataPageStateManager_DataFrom_Server
 *
 * FROM:  ModDataUtils.getSearchNameForProjectSearchId
 */
export const modPage_GetSearchNameOnlyForProjectSearchId = function (
    {
        projectSearchId,
        dataPageStateManager_DataFrom_Server
    } : {
        projectSearchId : number
        dataPageStateManager_DataFrom_Server : DataPageStateManager
    }) {

    const searchNameObject = dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchId );
    if ( ! searchNameObject ) {
        const msg = "modPage_GetSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchId: " + projectSearchId;
        console.warn( msg );
        throw Error( msg );
    }

    const searchName = searchNameObject.name;

    return searchName;
}