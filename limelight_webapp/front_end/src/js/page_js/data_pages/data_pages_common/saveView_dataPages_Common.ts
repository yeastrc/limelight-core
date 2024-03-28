/**
 * saveView_dataPages_Common.ts
 *
 * Javascript for Data Pages: Save the current view/URL.
 *
 */

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { ParseURL_Into_PageStateParts }  from 'page_js/data_pages/data_pages_common/parseURL_Into_PageStateParts';
import { ControllerPath_forCurrentPage_FromDOM }  from 'page_js/data_pages/data_pages_common/controllerPath_forCurrentPage_FromDOM';
import {
    getSaveView_Overlay_Component, SaveView_Overlay_Component_Save_Callback_Params,
    SaveView_Overlay_Component_Save_Callback_Type
} from "page_js/data_pages/saveView_React/saveView_Component_Overlay_React";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";

/**
 * User Clicked on "Save View" button
 *
 * @param projectSearchIds
 * @param experimentId
 */
export const saveView_dataPages_MainPage_ProcessRequest_Common = function (
    {
        projectSearchIds, experimentId
    } : {
        projectSearchIds : Array<number>,
        experimentId? : number

    }) : void {

    let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const saveView_Overlay_Component_Save_Callback : SaveView_Overlay_Component_Save_Callback_Type =

        ( params : SaveView_Overlay_Component_Save_Callback_Params ) : void => {
            _saveView_ToServer_Main({ viewLabel: params.label , projectSearchIds, experimentId, overlay_AddedTo_DocumentBody_Holder });
        }

    const callbackOn_Close_Clicked = () : void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = getSaveView_Overlay_Component({ saveView_Overlay_Component_Save_Callback, callbackOn_Close_Clicked })

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })


}

/**
 *
 * @param viewLabel
 * @param projectSearchIds
 * @param experimentId
 * @param hide_remove_ModalOverlay
 */
const _saveView_ToServer_Main = function (
    {
        viewLabel, projectSearchIds, experimentId,
        overlay_AddedTo_DocumentBody_Holder
    } : {
        viewLabel: string
        projectSearchIds : Array<number>,
        experimentId? : number
        overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

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

    const promise__saveViewToServer = _saveViewToServer({ viewLabel, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds, experimentId })

    promise__saveViewToServer.catch( () => {  });

    promise__saveViewToServer.then( (  ) => {
        try {
            overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}

/**
 * Save the view to the server
 */
const _saveViewToServer = function (
    {
        viewLabel, pageControllerPath, pageCurrentURL_StartAtPageController, searchDataLookupParametersCode, projectSearchIds, experimentId
    }: {
    viewLabel: any, pageControllerPath: any, pageCurrentURL_StartAtPageController: any, searchDataLookupParametersCode: any, projectSearchIds: any, experimentId: any
} ) : any {

    let promise = new Promise<void>( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchIds,
                experimentId,
                label : viewLabel,
                pageControllerPath,
                pageCurrentURL_StartAtPageController,
                searchDataLookupParametersCode
            };

            const url = "d/rws/for-page/psb/insert-saved-view";

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

