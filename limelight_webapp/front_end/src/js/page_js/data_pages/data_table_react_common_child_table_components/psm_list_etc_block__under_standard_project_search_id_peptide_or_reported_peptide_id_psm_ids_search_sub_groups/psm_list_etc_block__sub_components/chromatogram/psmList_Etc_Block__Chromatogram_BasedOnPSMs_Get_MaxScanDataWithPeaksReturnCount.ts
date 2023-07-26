/**
 * psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MaxScanDataWithPeaksReturnCount.ts
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/reportWebErrorToServer";
import { variable_is_type_number_Check } from "page_js/variable_is_type_number_Check";

/**
 *
 */
export class PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MaxScanDataWithPeaksReturnCount_Result {

    maxScanDataWithPeaksReturnCount: number
}

/**
 *
 * @param projectSearchId
 */
export const psmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MaxScanDataWithPeaksReturnCount = function (
    {
        projectSearchId
    } : {
        projectSearchId: number
    }
) : Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MaxScanDataWithPeaksReturnCount_Result> {

    return new Promise<PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MaxScanDataWithPeaksReturnCount_Result>((resolve, reject) => { try {

        let requestObject = {
            projectSearchId: projectSearchId
        };

        const url = "d/rws/for-page/psb/scan-with-peaks-max-return-count-ac-project-search-id";

        console.log("AJAX Call START: URL: " + url + new Date() );

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
        // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = webserviceCallStandardPostResponse.api;

        promise_webserviceCallStandardPost.catch( () => {

            console.log("AJAX Call END Rejected: URL: " + url + new Date() );

            // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;
            window.alert( "Webservice call rejected. URL: " + url )

            reject()
        });

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                // webserviceCallStandardPost_ApiObject_Holder_Class.webserviceCallStandardPost_ApiObject_Class = null;

                console.log("AJAX Call END: URL: " + url + new Date() );

                const response: PsmList_Etc_Block__Chromatogram_BasedOnPSMs_Get_MaxScanDataWithPeaksReturnCount_Result = {
                    maxScanDataWithPeaksReturnCount: responseData.maxScanDataWithPeaksReturnCount
                }

                if ( response.maxScanDataWithPeaksReturnCount === undefined || response.maxScanDataWithPeaksReturnCount === null ) {
                    throw Error("( response.maxScanDataWithPeaksReturnCount === undefined || response.maxScanDataWithPeaksReturnCount === null )")
                }
                if ( ! variable_is_type_number_Check( response.maxScanDataWithPeaksReturnCount ) ) {
                    throw Error("( ! variable_is_type_number_Check( response.maxScanDataWithPeaksReturnCount ) ): response.maxScanDataWithPeaksReturnCount: " + response.maxScanDataWithPeaksReturnCount )
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

