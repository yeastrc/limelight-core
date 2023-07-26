/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers.ts
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result {

    scanList: Array<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result_SingleScan_SubResponse>
}

export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result_SingleScan_SubResponse {

    level: number;
    scanNumber: number;
    retentionTime: number;
    totalIonCurrent_ForScan: number;

    /**
     * Not Populated when Data file is version < 5 since not stored in those data files
     */
    ionInjectionTime: number;  // In Milliseconds

    /**
     * Not populated if request other than peaks and scan file contains more than one unique value
     */
    isCentroid: number; //  1 true, 0 false

    //  Only applicable where level > 1

    parentScanNumber: number;
    precursorCharge: number;
    precursor_M_Over_Z: number;

    // Peaks
    peaks: Array<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result_SingleScan_SubResponse_SinglePeak>;

}

export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result_SingleScan_SubResponse_SinglePeak {

    mz: number;
    intensity: number;
}

/**
 *
 * @param projectSearchId
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers = function (
    {
        projectSearchId, searchScanFileId, scanNumberList
    } : {
        projectSearchId: number
        searchScanFileId: number;
        scanNumberList: Array<number>
    }
) : Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result> {

    return new Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result>((resolve, reject) => { try {

        let requestObject = {
            projectSearchId, searchScanFileId, scanNumberList
        };

        const url = "d/rws/for-page/psb/scan-data-no-peaks-for-scan-numbers-project-search-id-search-scan-file-id";

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

                const response: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_SingleScanFile_ScanData_NO_Peaks_AndParentScanData_For_ScanNumbers_Result = {
                    scanList: responseData.scanList
                }

                if ( response.scanList === undefined || response.scanList === null ) {
                    throw Error("( response.scanList === undefined || response.scanList === null )")
                }
                if ( ! ( response.scanList instanceof Array ) ) {
                    throw Error("( ! ( response.scanList instanceof Array ) )")
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

