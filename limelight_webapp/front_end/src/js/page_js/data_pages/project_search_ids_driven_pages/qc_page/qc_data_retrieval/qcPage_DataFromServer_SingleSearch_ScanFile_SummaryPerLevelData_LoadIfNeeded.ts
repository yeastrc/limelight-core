/**
 * qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Scan File - Summary Per Scan Level Data - Load if Needed
 *
 * Uses 'commonData_LoadedFromServer_From_ProjectScanFileId___ROOT' so NO direct Webservice calls here
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";
import { CommonData_LoadedFromServer__ScanData_Summary_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Scan_Summary_Data";
import { CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";

/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded {

    private _promiseInProgress_Map_Key_searchScanFileId : Map<number, Promise<void>> = new Map()

    /**
     * @returns null if no promise needed
     */
    singleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded(
        {
            searchScanFileId, commonData_LoadedFromServer_PerSearch_For_ProjectSearchId,
            scanFile_SummaryPerLevelData_Root //  UPDATED
        } : {
            searchScanFileId: number
            commonData_LoadedFromServer_PerSearch_For_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            scanFile_SummaryPerLevelData_Root : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root //  UPDATED
        }
    ) : Promise<void> {

        if ( scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId( searchScanFileId ) ) {
            //  Data already loaded so return null
            return null
        }

        {
            const promise = this._promiseInProgress_Map_Key_searchScanFileId.get( searchScanFileId );
            if (promise) {
                return promise;
            }
        }

        const promise = new Promise<void>( (resolve, reject) => {
            try {
                const promise_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch  =
                    commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch().
                    get_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_DataHolder_AllForSearch_ReturnPromise()

                promise_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch.catch(reason => {

                    this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                    reject(reason)
                })
                promise_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch.then(value_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Result => { try {

                    const scanFile_ProjectScanFileId_SearchScanFileId__For_SearchScanFileId =
                        value_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId( searchScanFileId )
                    if ( ! scanFile_ProjectScanFileId_SearchScanFileId__For_SearchScanFileId ) {
                        const msg = "value_ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Result.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId( searchScanFileId ) returned NOTHING for searchScanFileId: " + searchScanFileId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const projectScanFileId = scanFile_ProjectScanFileId_SearchScanFileId__For_SearchScanFileId.projectScanFileId

                    const promise_get_ScanData_Summary_DataHolder_For_ProjectScanFileId_ReturnPromise =
                        commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                        get_ParentObject().
                        get__commonData_LoadedFromServer_From_ProjectScanFileId___ROOT().
                        get_commonData_LoadedFromServer__ScanData_Summary_Data_For_Single_ProjectScanFileId_MainClass().
                        get_ScanData_Summary_DataHolder_For_ProjectScanFileId_ReturnPromise( projectScanFileId )

                    promise_get_ScanData_Summary_DataHolder_For_ProjectScanFileId_ReturnPromise.catch(reason => {

                        this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                        reject(reason)
                    })
                    promise_get_ScanData_Summary_DataHolder_For_ProjectScanFileId_ReturnPromise.then(value_get_ScanData_Summary_DataHolder_For_ProjectScanFileId => { try {

                        this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                        _populateHolder({
                            searchScanFileId, projectScanFileId,
                            commonData_LoadedFromServer__ScanData_Summary_Data_Holder: value_get_ScanData_Summary_DataHolder_For_ProjectScanFileId.commonData_LoadedFromServer__ScanData_Summary_Data_Holder,
                            scanFile_SummaryPerLevelData_Root
                        });

                        resolve()

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })

        this._promiseInProgress_Map_Key_searchScanFileId.set( searchScanFileId, promise );

        return promise;
    }
}

/**
 *
 */
const _populateHolder = function (
    {
        searchScanFileId, projectScanFileId, commonData_LoadedFromServer__ScanData_Summary_Data_Holder, scanFile_SummaryPerLevelData_Root
    } : {
        searchScanFileId: number
        projectScanFileId: number
        commonData_LoadedFromServer__ScanData_Summary_Data_Holder: CommonData_LoadedFromServer__ScanData_Summary_Data_Holder
        scanFile_SummaryPerLevelData_Root : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root
    }) : void {

    let scanFileData_For_SearchScanFileId = scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId( searchScanFileId );
    if ( ! scanFileData_For_SearchScanFileId ) {
        scanFileData_For_SearchScanFileId = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId({ searchScanFileId });
        scanFile_SummaryPerLevelData_Root.add_ScanFileDataFor_SingleSearchScanFileId( scanFileData_For_SearchScanFileId );
    }

    const scanData_Summary_Data_For_ProjectScanFileId__From_CommonData_LoadedFromServer = commonData_LoadedFromServer__ScanData_Summary_Data_Holder.get_ScanData_Summary_Data_For_ProjectScanFileId(projectScanFileId)

    for ( const scanLevelEntry_FromArray of scanData_Summary_Data_For_ProjectScanFileId__From_CommonData_LoadedFromServer.scanLevelEntries ) {

        const scanLevelEntry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel = scanLevelEntry_FromArray;

        scanFileData_For_SearchScanFileId.add_ScanLevelData_ForScanLevel(scanLevelEntry);
    }


}