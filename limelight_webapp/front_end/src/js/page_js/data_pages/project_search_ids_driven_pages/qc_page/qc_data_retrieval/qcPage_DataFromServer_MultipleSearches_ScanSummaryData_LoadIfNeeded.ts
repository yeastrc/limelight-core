/**
 * qcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Multiple Searches - Scan Summary File Data - Load if Needed
 *
 */

import {QcPage_DataFromServer_AndDerivedData_MultipleSearches_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_MultipleSearches";
import {QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_MultipleSearches";
import {QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded";
import { QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import { DataPage_common_Searches_Flags } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";

/**
 *
 */
export class QcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>
    
    private _singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId : Map<number,QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded> = new Map();

    /**
     * Will NOT populate for searches where qcPage_Flags_SingleSearch.hasScanData is false
     *
     * @returns null if no promise needed
     */
    multipleSearches_ScanSummaryData_LoadIfNeeded(
        {
            projectSearchIds,
            qcPage_Searches_Flags,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            data_Holder_MultipleSearches,
            scanFile_SummaryPerLevelData_Root
        } : {
            projectSearchIds: Array<number>
            qcPage_Searches_Flags: DataPage_common_Searches_Flags
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            data_Holder_MultipleSearches : QcPage_DataFromServer_AndDerivedData_Holder_MultipleSearches
            scanFile_SummaryPerLevelData_Root : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root //  UPDATED
        }
    ) : Promise<void> {

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of projectSearchIds ) {

            const qcPage_Flags_SingleSearch = qcPage_Searches_Flags.get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
            if ( ! qcPage_Flags_SingleSearch ) {
                const msg = "retrievalParams.qcPage_Flags_MultipleSearches.get_QcPage_Flags_SingleSearch_ForProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            if ( ! qcPage_Flags_SingleSearch.hasScanData ) {
                //  NO Scan Data for Search so Skip
                continue; // EARLY CONTINUE
            }

            let singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId ) {
                singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId = new QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded();
                this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.set(projectSearchId, singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId);
            }

            const data_Holder_SingleSearch = data_Holder_MultipleSearches.get_Holder_For_projectSearchId({ projectSearchId });
            if ( ! data_Holder_SingleSearch ) {
                const msg = "data_Holder_MultipleSearches.get_Holder_For_projectSearchId({ projectSearchId }); returned NOTHING. projectSearchId: " + projectSearchId;
                console.warn(msg);
                throw Error(msg);
            }

            for ( const searchScanFileData of data_Holder_SingleSearch.searchScanFileData.get_SearchScanFileData_IterableIterator() ) {

                const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
                if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                    const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                    console.warn(msg)
                    throw Error(msg)
                }

                const promise = singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.singleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded({
                    searchScanFileId: searchScanFileData.searchScanFileId, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: commonData_LoadedFromServer_PerSearch_For_ProjectSearchId, scanFile_SummaryPerLevelData_Root
                });

                if (promise) {
                    promises.push(promise);
                }
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
