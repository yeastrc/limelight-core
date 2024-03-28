/**
 * userAccountManagementPage_GetUserInfo_FreshLoad.ts
 *
 * userAccountManagement.jsp page - Get User Info from Webservice - Fresh Load from User Mgmt
 *
 */


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { limelight__IsVariableAString } from 'page_js/common_all_pages/limelight__IsVariableAString';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {UserAccountManagementPage_UserInfo} from "page_js/user_account_page_js/user_account_maint_page/userAccountManagementPage_MainPage_Component";

/**
 *
 */
export const userAccountManagementPage_GetUserInfo_FreshLoad = function () : Promise<UserAccountManagementPage_UserInfo> {

    let retrieval = (resolve: any, reject: any) => {
        try {
            let requestObj = {};

            const url = "user/rws/for-page/user-info-fresh-read";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch(() => {
                try {
                    reject();
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            });

            promise_webserviceCallStandardPost.then(({responseData}:{responseData: any}) => {
                try {
                    const result = _processResponse(responseData);

                    resolve(result);

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }

            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }

    return new Promise(retrieval);
}

/**
 *
 * @param responseData
 */
const _processResponse = function ( responseData: any ) : UserAccountManagementPage_UserInfo {

    const result : UserAccountManagementPage_UserInfo = responseData;

    if ( result.username === undefined || result.username === null ) {
        throw Error("result.username === undefined || result.username === null");
    }
    if ( ! limelight__IsVariableAString( result.username ) ) {
        throw Error("result.username is not a string");
    }

    if ( result.email === undefined || result.email === null ) {
        throw Error("result.email === undefined || result.email === null");
    }
    if ( ! limelight__IsVariableAString( result.email ) ) {
        throw Error("result.email is not a string");
    }

    if ( result.username === undefined || result.username === null ) {
        throw Error("result.username === undefined || result.username === null");
    }
    if ( ! limelight__IsVariableAString( result.username ) ) {
        throw Error("result.username is not a string");
    }

    if ( result.firstName === undefined || result.firstName === null ) {
        throw Error("result.firstName === undefined || result.firstName === null");
    }
    if ( ! limelight__IsVariableAString( result.firstName ) ) {
        throw Error("result.firstName is not a string");
    }

    if ( result.lastName === undefined || result.lastName === null ) {
        throw Error("result.lastName === undefined || result.lastName === null");
    }
    if ( ! limelight__IsVariableAString( result.lastName ) ) {
        throw Error("result.lastName is not a string");
    }

    if ( result.organization === undefined || result.organization === null ) {
        throw Error("result.organization === undefined || result.organization === null");
    }
    if ( ! limelight__IsVariableAString( result.organization ) ) {
        throw Error("result.organization is not a string");
    }

    return result;
}
