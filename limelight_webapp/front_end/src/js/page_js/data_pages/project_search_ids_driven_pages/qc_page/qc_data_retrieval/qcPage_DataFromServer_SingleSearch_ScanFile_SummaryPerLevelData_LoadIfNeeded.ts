/**
 * qcPage_DataFromServer_SingleSearch_ScanFile_SummaryPerLevelData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Scan File - Summary Per Scan Level Data - Load if Needed
 *
 */

import {
    QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
} from "./qcPage_DataFromServer_AndDerivedData_SingleSearch";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataLoaded_FromServer_SingleSearch";
import {
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Data";

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
            searchScanFileId, retrievalParams, data_Holder_SingleSearch
        } : {
            searchScanFileId: number
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root
            && data_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId( searchScanFileId ) ) {
            //  Data already loaded so return null
            return null
        }

        {
            const promise = this._promiseInProgress_Map_Key_searchScanFileId.get( searchScanFileId );
            if (promise) {
                return promise;
            }
        }

        const projectSearchId = retrievalParams.projectSearchId;

        const promise = new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/scan-file-summary-data-from-spectral-storage-data--search-scan-file-id-single-project-search-id";

                const requestData = { projectSearchId, searchScanFileId };

                console.log( "START: getting data from URL: " + url );

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try {
                        this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                    try {
                        this._promiseInProgress_Map_Key_searchScanFileId.delete( searchScanFileId );

                        console.log( "END: Successful: getting data from URL: " + url );

                        _populateHolder({ searchScanFileId, responseData, data_Holder_SingleSearch });

                        resolve();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                } );
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
        searchScanFileId, responseData, data_Holder_SingleSearch
    } : {
        searchScanFileId: number
        responseData: any
        data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
    }) : void {

    if ( responseData.scanLevelEntries ) {
        if ( ! ( responseData.scanLevelEntries instanceof Array ) ) {
            const msg = "( ! ( responseData.scanLevelEntries instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }

        let scanFile_SummaryPerLevelData_Root = data_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root;
        if ( ! scanFile_SummaryPerLevelData_Root ) {
            scanFile_SummaryPerLevelData_Root = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_Root()
            data_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root =  scanFile_SummaryPerLevelData_Root;
        }

        let scanFileData_For_SearchScanFileId = data_Holder_SingleSearch.scanFile_SummaryPerLevelData_Root.get_ScanFileData_For_SearchScanFileId( searchScanFileId );
        if ( ! scanFileData_For_SearchScanFileId ) {
            scanFileData_For_SearchScanFileId = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelDataForSingleSearchScanFileId({ searchScanFileId });
            scanFile_SummaryPerLevelData_Root.add_ScanFileDataFor_SingleSearchScanFileId( scanFileData_For_SearchScanFileId );
        }

        for ( const scanLevelEntry_FromArray of responseData.scanLevelEntries ) {

            const scanLevelEntry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_ScanFile_SummaryPerLevelData_ForSingleScanLevel = scanLevelEntry_FromArray;

            if ( scanLevelEntry.scanLevel === undefined || scanLevelEntry.scanLevel === null ) {
                const msg = "( scanLevelEntry.scanLevel === undefined || scanLevelEntry.scanLevel === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanLevelEntry.scanLevel ) ) {
                const msg = "( ! variable_is_type_number_Check( scanLevelEntry.scanLevel ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanLevelEntry.numberOfScans === undefined || scanLevelEntry.numberOfScans === null ) {
                const msg = "( scanLevelEntry.numberOfScans === undefined || scanLevelEntry.numberOfScans === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanLevelEntry.numberOfScans ) ) {
                const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.numberOfScans ) )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( scanLevelEntry.totalIonCurrent === undefined || scanLevelEntry.totalIonCurrent === null ) {
                const msg = "( scanLevelEntry.totalIonCurrent === undefined || scanLevelEntry.totalIonCurrent === null )";
                console.warn(msg);
                throw Error(msg);
            }
            if ( ! variable_is_type_number_Check( scanLevelEntry.totalIonCurrent ) ) {
                const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.totalIonCurrent ) )";
                console.warn(msg);
                throw Error(msg);
            }

            scanFileData_For_SearchScanFileId.add_ScanLevelData_ForScanLevel(scanLevelEntry);
        }
    }


}