/**
 * qcPage_DataFromServer_SingleSearch__SubSearches_ScanSummaryData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - SingleSearch__SubSearches - Scan Summary File Data - Load if Needed
 *
 */

import {QcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches";
import {QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch__SubSearches";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded";

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
            retrievalParams,
            retrievalParams_SingleSearch,
            data_Holder_SingleSearch__SubSearches
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch__SubSearches_Constructor_Params
            retrievalParams_SingleSearch : QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch__SubSearches: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch__SubSearches
        }
    ) : Promise<void> {

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const promises: Array<Promise<void>> = [];

        const projectSearchId = retrievalParams.projectSearchId;

        const qcPage_Flags_SingleSearch = retrievalParams.qcPage_Flags_SingleSearch_ForProjectSearchId

        if ( ! qcPage_Flags_SingleSearch.hasScanData ) {
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
                searchScanFileId: searchScanFileData.searchScanFileId, retrievalParams: retrievalParams_SingleSearch, data_Holder_SingleSearch: data_Holder_SingleSearch__SubSearches.get_data_Holder_SingleSearch()
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
