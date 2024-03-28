/**
 * commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId.ts
 *
 */


import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import { limelight__variable_is_type_number_Check } from "page_js/common_all_pages/limelight__variable_is_type_number_Check";

/**
 *
 */
export class CommonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId_Result {

    maxScanDataWithPeaksReturnCount: number
}

/**
 *
 * @param projectSearchId
 */
export const commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId = function (
    {
        projectSearchId
    } : {
        projectSearchId: number
    }
) : Promise<CommonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId_Result> {

    return new Promise<CommonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId_Result>(( resolve, reject) => { try {

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

                const response: CommonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId_Result = {
                    maxScanDataWithPeaksReturnCount: responseData.maxScanDataWithPeaksReturnCount
                }

                if ( response.maxScanDataWithPeaksReturnCount === undefined || response.maxScanDataWithPeaksReturnCount === null ) {
                    throw Error("( response.maxScanDataWithPeaksReturnCount === undefined || response.maxScanDataWithPeaksReturnCount === null )")
                }
                if ( ! limelight__variable_is_type_number_Check( response.maxScanDataWithPeaksReturnCount ) ) {
                    throw Error("( ! limelight__variable_is_type_number_Check( response.maxScanDataWithPeaksReturnCount ) ): response.maxScanDataWithPeaksReturnCount: " + response.maxScanDataWithPeaksReturnCount )
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

