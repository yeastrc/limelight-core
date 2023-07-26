/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange.ts
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { variable_is_type_number_Check } from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result {

    scanNumber_List: Array<number>
}

/**
 *
 * @param projectSearchId
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange = function (
    {
        projectSearchId, searchScanFileId, retentionTimeRange_Min, retentionTimeRange_Max
    } : {
        projectSearchId: number
        searchScanFileId: number;
        retentionTimeRange_Min: number;
        retentionTimeRange_Max: number;
    }
) : Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result> {

    return new Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result>((resolve, reject) => { try {

        let requestObject = {
            projectSearchId, searchScanFileId, retentionTimeRange_Min, retentionTimeRange_Max
        };

        const url = "d/rws/for-page/psb/scan-numbers-for-ms-1-scans-project-search-id-search-scan-file-id-retention-time-range";

        console.log("AJAX Call START: URL: " + url + new Date() );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
        // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = webserviceCallStandardPostResponse.api;

        promise_webserviceCallStandardPost.catch( () => {

            console.log("AJAX Call END Rejected: URL: " + url + new Date() );

            // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
            // window.alert( "Webservice call rejected. URL: " + url )

            reject()
        });

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

                console.log("AJAX Call END: URL: " + url + new Date() );

                const response: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_MS_1_ScanNumbers_For_RetentionTimeRange_Result = {
                    scanNumber_List: responseData.scanNumber_List
                }

                if ( response.scanNumber_List === undefined || response.scanNumber_List === null ) {
                    throw Error("( response.scanNumber_List === undefined || response.scanNumber_List === null )")
                }
                if ( ! ( response.scanNumber_List instanceof Array ) ) {
                    throw Error("( ! ( response.scanNumber_List instanceof Array ) )")
                }
                for ( const scanNumber of response.scanNumber_List ) {
                    if ( !variable_is_type_number_Check( scanNumber ) ) {
                        throw Error( "( ! variable_is_type_number_Check( scanNumber ) )" )
                    }
                }

                resolve( response );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

                window.alert( "JS Error processing Webservice call response. URL: " + url )

                reject()

                throw e;
            }
        });

    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
}

