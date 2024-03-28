/**
 * projectPage_ProjectSection_LoggedInUsersInteraction_DeleteNote.ts
 */
import { webserviceCallStandardPost } from "page_js/webservice_call_common/webserviceCallStandardPost";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";


export const projectPage_ProjectSection_LoggedInUsersInteraction_DeleteNote = function (
    {
        noteId
    } : {
        noteId: number
    }
) {
    return new Promise<{ status: boolean }>((resolve,reject) => {
        try {
            const requestObj = { id: noteId };

            const url = "d/rws/for-page/project-note-delete";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    resolve({ status: responseData.status });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );

                    reject();

                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

}