/**
 * qcPage_DataFromServer_MultipleSearches_ScanSummaryData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Multiple Searches - Scan Summary File Data - Load if Needed
 *
 * Uses 'commonData_LoadedFromServer_From_ProjectScanFileId___ROOT' and 'QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded' so NO direct Webservice calls here
 */

import {QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_retrieval/qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded";
import { QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root } from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import { DataPage_common_Searches_Flags } from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import { CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";

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
            scanFile_SummaryPerLevelData_Root
        } : {
            projectSearchIds: Array<number>
            qcPage_Searches_Flags: DataPage_common_Searches_Flags
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
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

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId)
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId) returned NOTHING for projectSearchId: " + projectSearchId
                console.warn(msg)
                throw Error(msg)
            }

            let singleSearch_LoadIfNeeded_For_ProjectSearchId = this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.get(projectSearchId);
            if ( ! singleSearch_LoadIfNeeded_For_ProjectSearchId ) {
                singleSearch_LoadIfNeeded_For_ProjectSearchId = new QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded();
                this._singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId.set(projectSearchId, singleSearch_LoadIfNeeded_For_ProjectSearchId);
            }

            const get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch()
                .get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch()

            if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data ) {

                this._process_SearchScanFileIds_For_SingleSearch({
                    scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.data.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder,
                    singleSearch_LoadIfNeeded_For_ProjectSearchId,
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                    scanFile_SummaryPerLevelData_Root, // UPDATED
                    promises // UPDATED
                })

            } else if ( get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => { try {

                    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result.promise.then( value_ScanFile_SearchScanFileId_Etc => { try {

                        const promises_2ndLevel: Array<Promise<void>> = []

                        this._process_SearchScanFileIds_For_SingleSearch({
                            scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: value_ScanFile_SearchScanFileId_Etc.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder,
                            singleSearch_LoadIfNeeded_For_ProjectSearchId,
                            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
                            scanFile_SummaryPerLevelData_Root, // UPDATED
                            promises: promises_2ndLevel // UPDATED
                        })

                        if ( promises_2ndLevel.length === 0 ) {
                            resolve()
                            return // EARLY RETURN
                        }

                        const promises_2ndLevel_All = Promise.all( promises_2ndLevel )

                        promises_2ndLevel_All.catch(reason => reject(reason))
                        promises_2ndLevel_All.then( novalue => { try {

                            resolve()
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                promises.push(promise);

            } else {
                throw Error("get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_Result NO data or promise")
            }
        }

        if ( promises.length === 0 ) {
            //  No wait so immediately return resolved promise
            return null;
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

    /**
     *
     * @param scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
     * @param singleSearch_LoadIfNeeded_Map_Key_ProjectSearchId
     * @param commonData_LoadedFromServer_PerSearch_For_ProjectSearchId
     * @param scanFile_SummaryPerLevelData_Root
     * @param promises
     * @private
     */
    private _process_SearchScanFileIds_For_SingleSearch(
        {
            scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder,
            singleSearch_LoadIfNeeded_For_ProjectSearchId,
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            scanFile_SummaryPerLevelData_Root, // UPDATED
            promises // UPDATED
        } : {
            scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder: CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
            singleSearch_LoadIfNeeded_For_ProjectSearchId: QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            scanFile_SummaryPerLevelData_Root: QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root  // UPDATED
            promises: Array<Promise<void>> // UPDATED
        }
    ) : void {

        for ( const scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair of scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_All() ) {

            const promise = singleSearch_LoadIfNeeded_For_ProjectSearchId.singleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded({
                searchScanFileId: scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch__Single_SearchScanFileId_ProjectScanFileId_Pair.searchScanFileId,
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: commonData_LoadedFromServer_PerSearch_For_ProjectSearchId, scanFile_SummaryPerLevelData_Root
            });
            if ( promise ) {
                promises.push(promise)
            }
        }
    }
}
