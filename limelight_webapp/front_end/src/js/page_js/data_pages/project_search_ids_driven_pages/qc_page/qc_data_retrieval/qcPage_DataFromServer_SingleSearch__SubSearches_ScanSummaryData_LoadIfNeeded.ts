/**
 * qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - SingleSearch__SubSearches - Scan Summary File Data - Load if Needed
 *
 */

import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch__SubSearches";
import {QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import { DataPage_common_Flags_SingleSearch } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";

/**
 *
 */
export class QcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>
    
    private _singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId : Map<number,QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded> = new Map();

    /**
     * Will NOT populate for searches where qcPage_Flags_SingleSearch.hasScanData is false
     *
     * @returns null if no promise needed
     */
    singleSearch__SubSearches_ScanSummaryData_LoadIfNeeded(
        {
            projectSearchId,
            data_Holder_SingleSearch__SubSearches,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            qcPage_Flags_SingleSearch_ForProjectSearchId,
            scanFile_SummaryPerLevelData_Root  //  UPDATED
        } : {
            projectSearchId: number
            data_Holder_SingleSearch__SubSearches: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            qcPage_Flags_SingleSearch_ForProjectSearchId: DataPage_common_Flags_SingleSearch
            scanFile_SummaryPerLevelData_Root : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root //  UPDATED
        }
    ) : Promise<void> {

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const promises: Array<Promise<void>> = [];

        if ( ! qcPage_Flags_SingleSearch_ForProjectSearchId.hasScanData ) {
            //  NO Scan Data for Search
            throw Error("( ! qcPage_Flags_SingleSearch.hasScanData )")
        }

        let singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.get(projectSearchId);
        if ( ! singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId ) {
            singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = new QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded();
            this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.set(projectSearchId, singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId);
        }

        for ( const searchScanFileData of data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch().searchScanFileData.get_SearchScanFileData_IterableIterator() ) {

            const promise = singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.singleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded({
                searchScanFileId: searchScanFileData.searchScanFileId, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId, scanFile_SummaryPerLevelData_Root
            });

            if (promise) {
                promises.push(promise);
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return Promise.resolve();
        }

        const promise = Promise.all(promises);

        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            promise.catch( reason => {
                this._promiseInProgress = null;
                reject( reason );
            });
            promise.then( value => {
                this._promiseInProgress = null;
                resolve();
            });
        });

        return this._promiseInProgress;
    }
}
