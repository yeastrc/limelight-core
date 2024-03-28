/**
 * setDefaultView_dataPages_Common.ts
 *
 * Javascript for Data Pages: Set the current view/URL as Default.
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';

/**
 *
 * @param projectSearchId
 * @param experimentId
 */
export const setDefaultView_dataPages_ProcessRequest_Common = function (
    {
        projectSearchId, experimentId
    } : {
        projectSearchId : number;
        experimentId? : number;

    }) : void {

    var pageCurrentURL = window.location.href;

    const pageControllerPath = ControllerPath_forCurrentPage_FromDOM.controllerPath_forCurrentPage_FromDOM();

    const controllerStart = pageCurrentURL.indexOf( pageControllerPath );
    if ( controllerStart === -1 ) {
        throw Error("Controller Path not found in current Page/Window URL.  pageControllerPath: " + pageControllerPath + ", pageCurrentURL: " + pageCurrentURL );
    }

    const pageCurrentURL_StartAtPageController = pageCurrentURL.substring( controllerStart );

    const parseURL_Into_PageStateParts = new ParseURL_Into_PageStateParts();
    const pageStatePartsFromURL = parseURL_Into_PageStateParts.parseURL_Into_PageStateParts();

    const searchDataLookupParametersCode = pageStatePartsFromURL.searchDataLookupParametersCode;
    const pageStateIdentifier = pageStatePartsFromURL.pageStateIdentifier;
    const pageStateString = pageStatePartsFromURL.pageStateString;
    const referrer = pageStatePartsFromURL.referrer;

    const promise__setDefaultViewToServer = _setDefaultViewToServer({ projectSearchId, experimentId, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode })

    promise__setDefaultViewToServer.catch( () => {  });

    promise__setDefaultViewToServer.then( (  ) => {
        try {
            window.alert("Default View Saved")
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}

/**
 * Set the Default the view to the server
 */
const _setDefaultViewToServer = function (
    {
        projectSearchId, experimentId,
        pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode
    }: {
        projectSearchId: number
        experimentId: number
        pageControllerPath: string
        pageCurrentURL_StartAtPageController: string
        searchDataLookupParametersCode: string
    } ) : Promise<void> {

    let promise = new Promise<void>( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                pageControllerPath,
                pageCurrentURL_StartAtPageController,
                searchDataLookupParametersCode
            };

            const url = "d/rws/for-page/psb/save-default-view-project-search-based-page";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    resolve();

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

    return promise;
}

