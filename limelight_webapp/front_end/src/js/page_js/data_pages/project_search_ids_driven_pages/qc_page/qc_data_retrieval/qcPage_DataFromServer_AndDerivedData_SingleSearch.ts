/**
 * qcPage_DataFromServer_AndDerivedData_SingleSearch.ts
 *
 * QC Page - Data From Server - and Derived Data - Single Search
 *
 */

import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { SearchDataLookupParameters_Root } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import { QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import { DataPage_common_Flags_SingleSearch } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import { DataPage_common_Searches_Info_SingleSearch } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import { QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_SingleSearch{

    private _retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params

    private _data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch

    private _qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded : QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded

    constructor(
        {
            retrievalParams
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
        }) {
        this._retrievalParams = retrievalParams;

        this._data_Holder_SingleSearch = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch();

        this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded = new QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded();
    }

    /**
     *
     */
    get_SearchScanFileData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch> {

        const promise = this._qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded.singleSearch_SearchScanFileData_LoadIfNeeded({
            retrievalParams: this._retrievalParams, data_Holder_SingleSearch: this._data_Holder_SingleSearch
        });

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_SingleSearch );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_SingleSearch );
            });
        });
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params {

    projectSearchId: number
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    dataPageStateManager: DataPageStateManager

    qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
    qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch

    /**
     *
     */
    constructor(
        {
            projectSearchId, searchDataLookupParamsRoot,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            dataPageStateManager,
            qcPage_Flags_SingleSearch_ForProjectSearchId, qcPage_Searches_Info_SingleSearch_ForProjectSearchId
        } : {
            projectSearchId: number
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            dataPageStateManager: DataPageStateManager
            qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
            qcPage_Searches_Info_SingleSearch_ForProjectSearchId:  DataPage_common_Searches_Info_SingleSearch
        }) {
        this.projectSearchId = projectSearchId;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId;
        this.dataPageStateManager = dataPageStateManager;
        this.qcPage_Flags_SingleSearch_ForProjectSearchId = qcPage_Flags_SingleSearch_ForProjectSearchId;
        this.qcPage_Searches_Info_SingleSearch_ForProjectSearchId = qcPage_Searches_Info_SingleSearch_ForProjectSearchId;
    }
}
