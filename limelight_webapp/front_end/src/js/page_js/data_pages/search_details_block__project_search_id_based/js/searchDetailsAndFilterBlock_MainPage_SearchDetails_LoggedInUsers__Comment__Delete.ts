/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete.ts
 *
 * Javascript for Search Details (Expand a search to show the details) on all pages (except Project Page).
 *
 * Search Details - Provide interaction for Logged In Users.  Some only to a subset of logged in users
 */

import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";

/**
 *
 * @param commentId
 */
export const searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers__Comment__Delete = function(
    {
        commentId
    } : {
        commentId: number
    }) {

    return new Promise<void>((resolve,reject) => {
        try {
            const requestObj = { commentId };

            const url = "d/rws/for-page/delete-comment";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => {
                try {
                    reject();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        const msg = "( ! responseData.status )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    resolve( responseData );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}
