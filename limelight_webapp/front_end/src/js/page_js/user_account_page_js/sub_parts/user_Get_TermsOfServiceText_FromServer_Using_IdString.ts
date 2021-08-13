/**
 * user_Get_TermsOfService_From_IdString.ts
 *
 *    Get Terms Of Service Text (Can be HTML) from Server using IdString
 *
 */

import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {showErrorMsg} from "page_js/showHideErrorMessage";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";

/**
 * Result of Promise returned from function user_Get_TermsOfService_FromServer_Using_IdString
 */
export class User_Get_TermsOfService_FromServer_Using_IdString_Result {

    termsOfService_Text_or_HTML: string
}

/**
 *
 */
export const user_Get_TermsOfService_FromServer_Using_IdString = function (
    {
        idString
    } : {
        idString: string
    }) : Promise<User_Get_TermsOfService_FromServer_Using_IdString_Result> {

    return new Promise<User_Get_TermsOfService_FromServer_Using_IdString_Result>( (resolve, reject) => {

        const requestObj = {
            idString
        }

        const url = "user/rws/for-page/get-terms-of-service-text-from-id-string";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => {
            var $element = $("#error_message_system_error");
            showErrorMsg( $element );
        }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                const result = new User_Get_TermsOfService_FromServer_Using_IdString_Result();
                result.termsOfService_Text_or_HTML = responseData.termsOfService_Text_or_HTML;

                if ( ! limelight__IsVariableAString( result.termsOfService_Text_or_HTML ) ) {
                    const msg = "( ! limelight__IsVariableAString( result.termsOfService_Text_or_HTML ) )";
                    console.warn(msg);
                    throw Error(msg);
                }

                resolve( result );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    })
}