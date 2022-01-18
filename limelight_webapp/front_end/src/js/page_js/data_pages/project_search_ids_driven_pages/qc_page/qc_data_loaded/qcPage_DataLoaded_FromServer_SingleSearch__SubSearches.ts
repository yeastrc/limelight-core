/**
 * qcPage_DataLoaded_FromServer_SingleSearch__SubSearches.ts
 *
 * QC Page - Data Loaded - From Server - and Derived Data - Single Search   Sub Searches
 *
 */


import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches {

    private _data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch

    constructor() {
        this._data_Holder_SingleSearch = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch();
    }

    get_data_Holder_SingleSearch() {
        return this._data_Holder_SingleSearch;
    }
}