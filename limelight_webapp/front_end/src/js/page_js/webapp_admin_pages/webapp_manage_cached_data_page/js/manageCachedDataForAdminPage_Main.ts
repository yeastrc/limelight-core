/**
 * manageCachedDataForAdminPage_Main.ts
 *
 * Javascript for webappAdminManageCachedData.jsp page
 *
 */

import React from "react";
import ReactDOM from "react-dom";

import {
    ManageCachedDataForAdminPage_Root_Component,
    ManageCachedDataForAdminPage_Root_Component_Props
} from "page_js/webapp_admin_pages/webapp_manage_cached_data_page/jsx/manageCachedDataForAdminPage_Root_Component";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

/**
 * Init
 *
 */
export const manageCachedDataForAdminPage_Main_Init = function () {


    //  Called on render complete
    const renderCompleteCallbackFcn = () => {

    };


    const containerDOMElement = document.getElementById("ManageCachedDataForAdminPage_Root_Component");

    if ( ! containerDOMElement ) {
        throw Error("No DOM element with id 'ManageCachedDataForAdminPage_Root_Component'");
    }

    const manageCachedDataForAdminPage_Root_Component_Props : ManageCachedDataForAdminPage_Root_Component_Props = {

        clearAllCachedData_ClickHandler_Callback : _clearAllCachedData_ClickHandler_Callback,
        writeCachedDataSizesToLogClickHandler_Callback : _writeCachedDataSizesToLogClickHandler_Callback
    }


    //  Create React component instance using React.createElement(...) so don't have to make this file .tsx
    const root_Component = (
        React.createElement(
            ManageCachedDataForAdminPage_Root_Component,
            manageCachedDataForAdminPage_Root_Component_Props,
            null
        )
    )

    ReactDOM.render(
        root_Component,
        containerDOMElement,
        renderCompleteCallbackFcn
    );
}


/**
 *
 *
 */
const _clearAllCachedData_ClickHandler_Callback = function (  ) {

    const requestData = {};

    const url = 'admin/rws/for-page/manage-cached-data-clear-all-cached-data';

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => {
        window.alert("Clear All Cached Data Failed")
        throw Error("Webservice call fail. url: " + url )
    });

    promise_webserviceCallStandardPost.then( ({ responseData }) => {
        try {
            if ( responseData.status ) {
                window.alert("Clear All Cached Data Successful")

                return; // EARLY RETURN
            }
            window.alert("Clear All Cached Data Failed")

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );
}

/**
 *
 *
 */
const _writeCachedDataSizesToLogClickHandler_Callback = function ( ) {

     const requestData = {};

    const url = 'admin/rws/for-page/manage-cached-data-write-cached-data-size-to-log-file';

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => {
        window.alert("Write Cached Data Sizes to Log File Failed")
        throw Error("Webservice call fail. url: " + url )
    });

    promise_webserviceCallStandardPost.then( ({ responseData }) => {
        try {
            if ( responseData.status ) {
                window.alert("Write Cached Data Sizes to Log File Successful")

                return; // EARLY RETURN
            }
            window.alert("Write Cached Data Sizes to Log File Failed")

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );

}
