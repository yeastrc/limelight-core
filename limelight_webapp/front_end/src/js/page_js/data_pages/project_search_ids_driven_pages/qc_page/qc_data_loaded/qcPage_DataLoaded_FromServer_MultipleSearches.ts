/**
 * qcPage_DataLoaded_FromServer_MultipleSearches.ts
 *
 * QC Page - Data Loaded - From Server - and Derived Data - Multiple Searches
 *
 */


import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches {

    private _holderMap_Key_ProjectSearchId : Map<number, QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> = new Map();

    constructor({ projectSearchIds} : {projectSearchIds: Array<number>}) {
        for ( const projectSearchId of projectSearchIds) {
            const entry = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch();
            this._holderMap_Key_ProjectSearchId.set(projectSearchId,entry);
        }
    }

    get_Holder_For_projectSearchId(
        {
            projectSearchId
        } : {
            projectSearchId: number
        }
    ) : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch {
        return this._holderMap_Key_ProjectSearchId.get( projectSearchId );
    }
}
