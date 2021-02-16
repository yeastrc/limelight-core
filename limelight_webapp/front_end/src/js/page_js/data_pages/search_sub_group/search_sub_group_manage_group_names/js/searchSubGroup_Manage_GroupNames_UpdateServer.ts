/**
 * searchSubGroup_Manage_GroupNames_UpdateServer.ts
 *
 * Change Group Names, Update Server
 *
 */




import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";

/**
 *
 */
export class SearchSubGroup_Manage_GroupNames_UpdateServer_Entry {

    subGroupId : number
    displayOrder : number
    displayName : string
}

/**
 *
 */
export const searchSubGroup_Manage_GroupNames_UpdateServer = function (
    {
        projectSearchId,
        subGroupEntries
    } : {
        projectSearchId : number
        subGroupEntries : Array<SearchSubGroup_Manage_GroupNames_UpdateServer_Entry>
    } ) : Promise<any> {


    let requestObject = {
        projectSearchId,
        subGroupEntries,
    };

    return new Promise<void>( (resolve, reject) => {

        console.log("AJAX Call to Update Sub Group Data START, Now: " + new Date() );

        const url = "d/rws/for-page/psb/sub-groups-update-user-updatable-data-single-project-search-id";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason: any) => {
            reject(reason);
        }  );

        promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
            try {
                console.log("AJAX Call to Update Sub Group Data END, Now: " + new Date() );

                resolve();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

    });
}

