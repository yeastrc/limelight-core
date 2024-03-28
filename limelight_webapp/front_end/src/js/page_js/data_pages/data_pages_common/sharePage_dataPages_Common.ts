/**
 * sharePage_dataPages_Common.ts
 *
 * Javascript for Data Pages: "Share Page" the current view/URL.  Provides a Shortened URL to the user.
 *
 * For projects with public access allowed, this button is provided to public (not logged in users) as well.
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {getSharePage_Overlay_Component} from "page_js/data_pages/sharePage_React/sharePage_Overlay_Component_React";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";

/**
 *
 * @param projectSearchIds
 * @param experimentId
 */
export const sharePage_MainPage_ProcessRequest_Common = function (
    {
        projectSearchIds, experimentId
    }: {
        projectSearchIds : Array<number>
        experimentId? : number
    }
) : void {

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

    const promise_sharePageToServer =
        _sharePageToServer({ pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds, experimentId })

    promise_sharePageToServer.catch(() => {
        try {

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    promise_sharePageToServer.then(( ajaxResult ) => {
        try {
            const urlShortcutString = ajaxResult.ajaxResult.shortenedUrl;

            if ( ! urlShortcutString ) {
                throw Error("No urlShortcutString returned");
            }

            if ( ! limelight__IsVariableAString( urlShortcutString ) ) {
                throw Error("urlShortcutString is not a string");
            }

            let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined

            const callbackOn_Close_Clicked = () => {

                overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
            }

            const overlayComponent = getSharePage_Overlay_Component({ urlShortcutString, callbackOn_Close_Clicked })

             overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}

/**
 * Send Share Page to the server
 */
const _sharePageToServer = function (
    {
        pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds, experimentId
    }:{
    pageControllerPath: any, pageCurrentURL_StartAtPageController: any, searchDataLookupParametersCode: any, projectSearchIds: any, experimentId: any
} ) : Promise<any> {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchIds,
                experimentId,
                pageControllerPath,
                pageCurrentURL_StartAtPageController,
                searchDataLookupParametersCode
            };

            const url = "d/rws/for-page/psb/insert-shared-page";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }:{ responseData:any }) => {
                try {
                    resolve({ ajaxResult : responseData });

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
};



