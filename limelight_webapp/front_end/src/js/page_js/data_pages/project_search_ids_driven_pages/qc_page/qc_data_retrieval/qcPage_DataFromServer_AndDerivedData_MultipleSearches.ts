/**
 * qcPage_DataFromServer_AndDerivedData_MultipleSearches.ts
 *
 * QC Page - Data From Server - and Derived Data - Multiple Searches
 *
 */

import { DataPageStateManager } from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { SearchDataLookupParameters_Root } from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import { QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_MultipleSearches";
import { QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import { QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded";
import { DataPage_common_Searches_Flags } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import { DataPage_common_Searches_Info } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_MultipleSearches {

    private _retrievalParams: QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params

    private _retrievalParamsSingleSearch_Map_Key_ProjectSearchId = new Map<number,QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params>();

    private _data_Holder_MultipleSearches : QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches

    private _qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded : QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded

    constructor(
        {
            retrievalParams
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params
        }) {
        this._retrievalParams = retrievalParams;

        for ( const projectSearchId of retrievalParams.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId = retrievalParams.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "retrievalParams.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const qcPage_Flags_SingleSearch_ForProjectSearchId = retrievalParams.qcPage_Flags_MultipleSearches.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId ) {
                const msg = "retrievalParams.qcPage_Flags_MultipleSearches.get_QcPage_FlagsMultipleSearches_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const qcPage_Searches_Info_SingleSearch_ForProjectSearchId = retrievalParams.qcPage_Searches_Info_MultipleSearches.get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Searches_Info_SingleSearch_ForProjectSearchId ) {
                const msg = "retrievalParams.qcPage_Searches_Info_MultipleSearches.get_QcPage_Searches_InfoMultipleSearches_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }
            const retrievalParams_SingleSearch = new QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params({
                projectSearchId,
                searchDataLookupParamsRoot: retrievalParams.searchDataLookupParamsRoot,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                dataPageStateManager: retrievalParams.dataPageStateManager,
                qcPage_Flags_SingleSearch_ForProjectSearchId,
                qcPage_Searches_Info_SingleSearch_ForProjectSearchId
            });
            this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId.set(projectSearchId,retrievalParams_SingleSearch);
        }

        this._data_Holder_MultipleSearches = new QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches({ projectSearchIds: retrievalParams.projectSearchIds });

        this._qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded = new QcPage_DataFromServer_MultipleSearches_SearchScanFileData_LoadIfNeeded();
    }

    /**
     *
     */
    get_SearchScanFileData() : Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches> {

        const promise = this._qcPage_DataFromServerMultipleSearches_SearchScanFileData_LoadIfNeeded.multipleSearches_SearchScanFileData_LoadIfNeeded({
            projectSearchIds_Override: undefined,
            retrievalParams: this._retrievalParams,
            retrievalParamsSingleSearch_Map_Key_ProjectSearchId: this._retrievalParamsSingleSearch_Map_Key_ProjectSearchId,
            data_Holder_MultipleSearches: this._data_Holder_MultipleSearches
        })

        if ( ! promise ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve( this._data_Holder_MultipleSearches );
        }

        return new Promise<QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches>( (resolve, reject) => {
            promise.catch( reason => {
                reject( reason );
            });
            promise.then( value => {
                resolve( this._data_Holder_MultipleSearches );
            });
        });
    }
}

/**
 *
 */
export class QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params {

    projectSearchIds: Array<number>
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    dataPageStateManager: DataPageStateManager

    qcPage_Flags_MultipleSearches: DataPage_common_Searches_Flags
    qcPage_Searches_Info_MultipleSearches:  DataPage_common_Searches_Info

    /**
     *
     */
    constructor(
        {
            projectSearchIds, searchDataLookupParamsRoot, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root, dataPageStateManager,
            qcPage_Flags_MultipleSearches, qcPage_Searches_Info_MultipleSearches
        } : {
            projectSearchIds: Array<number>
            searchDataLookupParamsRoot: SearchDataLookupParameters_Root
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            dataPageStateManager: DataPageStateManager
            qcPage_Flags_MultipleSearches: DataPage_common_Searches_Flags
            qcPage_Searches_Info_MultipleSearches:  DataPage_common_Searches_Info
        }) {
        this.projectSearchIds = projectSearchIds;
        this.searchDataLookupParamsRoot = searchDataLookupParamsRoot;
        this.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root;
        this.dataPageStateManager = dataPageStateManager;
        this.qcPage_Flags_MultipleSearches = qcPage_Flags_MultipleSearches;
        this.qcPage_Searches_Info_MultipleSearches = qcPage_Searches_Info_MultipleSearches;
    }
}
