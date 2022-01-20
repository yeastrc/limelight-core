/**
 * dataPage_common_Data_Holder_SingleSearch_SearchScanFileData_Data_LoadData.ts
 *
 * Common Data - Data Loaded - From Server - Single Search - Search File Data - Load Data
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root,
    DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId
} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SingleSearch_SearchScanFileData_Data";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 * Common Data - Data Loaded - From Server - Single Search - Search File Data - Load Data
 *
 * @param projectSearchId
 */
export const dataPage_common_Data_Holder_SingleSearch_SearchScanFileData_Data_LoadData = function(
    {
        projectSearchId
    } : {
        projectSearchId: number
    }
) : Promise<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root> {

    const promise = new Promise<DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root>( (resolve, reject) => {
        try {
            const url = "d/rws/for-page/psb/get-search-scan-file-data-for-project-search-id";

            const requestData = { projectSearchId };

            console.log( "START: getting data from URL: " + url );

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {
                try {
                    console.log( "END: REJECTED: getting data from URL: " + url );

                    reject()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }  );

            promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
                try {
                    console.log( "END: Successful: getting data from URL: " + url );

                    const result = _populate_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root({ responseData });

                    resolve( result );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            } );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    return promise;
}

/**
 *
 */
const _populate_DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root = function (
    {
        responseData
    } : {
        responseData: any
    }) : DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root {


    const searchScanFileData = new DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileData_Root();

    if ( responseData.scanFilenameEntries ) {
        if ( ! ( responseData.scanFilenameEntries instanceof Array ) ) {
            const msg = "( ! ( responseData.scanFilenameEntries instanceof Array ) )";
            console.warn(msg);
            throw Error(msg);
        }
        for ( const scanFilenameEntry_FromArray of responseData.scanFilenameEntries ) {

            const scanFilenameEntry : DataPage_common_Data_Holder_Holder_SingleSearch_SearchScanFileDataForSingleSearchScanFileId = scanFilenameEntry_FromArray;

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

    return  searchScanFileData;
}