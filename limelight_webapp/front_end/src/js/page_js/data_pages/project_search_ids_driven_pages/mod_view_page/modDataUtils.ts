import {ModViewDataManager} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewDataManager";

export class ModDataUtils {

    static getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}) {

        const projectSearchIdInt = Number.parseInt( projectSearchId ); // projectSearchId is string

        if ( Number.isNaN( projectSearchIdInt ) ) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): projectSearchId does not parse to int. projectSearchId: " + projectSearchId;
            console.warn( msg );
            throw Error( msg );
        }

        const searchNameObject = searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap().get( projectSearchIdInt );
        if ( ! searchNameObject ) {
            const msg = "getSearchNameForProjectSearchId({ projectSearchId, searchDetailsBlockDataMgmtProcessing}): No entry in searchDetailsBlockDataMgmtProcessing._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap() for projectSearchIdInt: " + projectSearchIdInt;
            console.warn( msg );
            throw Error( msg );
        }

        const searchName = searchNameObject.name;

        return searchName;
    }


}