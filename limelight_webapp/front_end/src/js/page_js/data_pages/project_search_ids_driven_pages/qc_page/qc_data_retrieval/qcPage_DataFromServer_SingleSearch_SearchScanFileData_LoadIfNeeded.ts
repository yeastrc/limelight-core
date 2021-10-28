/**
 * qcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded.ts
 *
 * QC Page - Data From Server - Single Search - Search Scan File Data - Load if Needed
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
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileData_Root,
    QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId
} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_data_loaded/qcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileData_Data";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 *
 */
export class QcPage_DataFromServer_SingleSearch_SearchScanFileData_LoadIfNeeded {

    private _promiseInProgress : Promise<void>

    /**
     * @returns null if no promise needed
     */
    singleSearch_SearchScanFileData_LoadIfNeeded(
        {
            retrievalParams, data_Holder_SingleSearch
        } : {
            retrievalParams: QcPage_DataFromServer_AndDerivedData_SingleSearch_Constructor_Params
            data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
        }
    ) : Promise<void> {

        if ( data_Holder_SingleSearch.searchScanFileData ) {
            //  Data already loaded so return null
            return null
        }

        if ( this._promiseInProgress ) {
            return this._promiseInProgress;
        }

        const projectSearchId = retrievalParams.projectSearchId;

        this._promiseInProgress = new Promise<void>( (resolve, reject) => {
            try {
                const url = "d/rws/for-page/psb/get-search-scan-file-data-for-project-search-id";

                const requestData = { projectSearchId };

                console.log( "START: getting data from URL: " + url );

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( () => {
                    try {
                        this._promiseInProgress = null;

                        console.log( "END: REJECTED: getting data from URL: " + url );

                        reject()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }  );

                promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                    try {
                        this._promiseInProgress = null;

                        console.log( "END: Successful: getting data from URL: " + url );

                        _populateHolder({ responseData, data_Holder_SingleSearch });

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

        return this._promiseInProgress;
    }
}

/**
 *
 */
const _populateHolder = function (
    {
        responseData, data_Holder_SingleSearch
    } : {
        responseData: any
        data_Holder_SingleSearch : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch
    }) : void {

    const searchScanFileData = new QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileData_Root();

    if ( responseData.scanFilenameEntries ) {
        if ( ! ( responseData.scanFilenameEntries instanceof Array ) ) {
            const msg = "( ! ( responseData.scanFilenameEntries instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const scanFilenameEntry_FromArray of responseData.scanFilenameEntries ) {

                const scanFilenameEntry : QcPage_DataFromServer_AndDerivedData_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId = scanFilenameEntry_FromArray;

                if ( scanFilenameEntry.searchScanFileId === undefined || scanFilenameEntry.searchScanFileId === null ) {
                    const msg = "( scanFilenameEntry.searchScanFileId === undefined || scanFilenameEntry.searchScanFileId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( scanFilenameEntry.searchScanFileId ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.searchScanFileId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( scanFilenameEntry.searchId === undefined || scanFilenameEntry.searchId === null ) {
                    const msg = "( scanFilenameEntry.searchId === undefined || scanFilenameEntry.searchId === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! variable_is_type_number_Check( scanFilenameEntry.searchId ) ) {
                    const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.searchId ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( scanFilenameEntry.filename === undefined || scanFilenameEntry.filename === null ) {
                    const msg = "( scanFilenameEntry.filename === undefined || scanFilenameEntry.filename === null )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! limelight__IsVariableAString( scanFilenameEntry.filename ) ) {
                    const msg = "( ! limelight__IsVariableAString( scanFilenameEntry.filename ) )";
                    console.warn(msg);
                    throw Error(msg);
                }
                //  Optional values
                if ( scanFilenameEntry.scanFileId !== undefined && scanFilenameEntry.scanFileId !== null ) {
                    if ( ! variable_is_type_number_Check( scanFilenameEntry.scanFileId ) ) {
                        const msg = "( ! variable_is_type_number_Check( scanFilenameEntry.scanFileId ) )";
                        console.warn(msg);
                        throw Error(msg);
                    }
                }

            searchScanFileData.add_SpectralStorage_NO_Peaks_DataFor_SearchScanFileId( scanFilenameEntry );
        }
    }

    data_Holder_SingleSearch.searchScanFileData = searchScanFileData;
}