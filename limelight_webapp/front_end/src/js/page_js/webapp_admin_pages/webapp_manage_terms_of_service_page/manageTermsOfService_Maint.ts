/**
 * manageTermsOfService_Maint.ts
 *
 * Javascript for webappAdminConfiguration.jsp page
 *
 * Manage Terms of Service
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {
    ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_Callback,
    ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_CallbackParams,
    open_manageTermsOfService_MaintOverlay,
    open_configureLimelightForAdminPage_TermsOfService_SavingDataOverlay
} from "page_js/webapp_admin_pages/webapp_manage_terms_of_service_page/manageTermsOfService_MaintOverlay.tsx";
import {
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";


let termsOfService_Enabled: boolean = undefined;
let termsOfService_Text : string = undefined;


/**
 *
 */
export const manageTermsOfService_Maint__initPage = function() {

    const promise = _getTermsOfService();
    promise.then( result => {
        _initPage_Internal( result );
    })
}

/**
 *
 */
const _initPage_Internal = function( termsOfService_WebServiceResponse : TermsOfService_WebServiceResponse ) {

    $("#tos_add_button").click(function(eventObject) {
        try {
//			var clickThis = this;
            openTermsOfServiceOverlay();
            eventObject.preventDefault();  // stop following value in 'url='.
            eventObject.stopPropagation();  // stop click bubble up.
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
    $("#tos_change_button").click(function(eventObject) {
        try {
//			var clickThis = this;
            openTermsOfServiceOverlay();
            eventObject.preventDefault();  // stop following value in 'url='.
            eventObject.stopPropagation();  // stop click bubble up.
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
    $("#tos_disable_button").click(function(eventObject) {
        try {
//			var clickThis = this;
            disableTermsOfService();
            eventObject.preventDefault();  // stop following value in 'url='.
            eventObject.stopPropagation();  // stop click bubble up.
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
    $("#tos_enable_button").click(function(eventObject) {
        try {
//			var clickThis = this;
            enableTermsOfService();
            eventObject.preventDefault();  // stop following value in 'url='.
            eventObject.stopPropagation();  // stop click bubble up.
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });


    termsOfService_Enabled = termsOfService_WebServiceResponse.termsOfServiceEnabled;
    termsOfService_Text = termsOfService_WebServiceResponse.termsOfServiceText

    const termsOfService_Text_ForHTML = _termsOfService_Text_ConvertForAssignAsHTML( termsOfService_Text );

    $("#tos_current_terms_of_service").html( termsOfService_Text_ForHTML );

    _showHideButtons();

    $("#tos_loading_message").hide();
    $("#tos_main_block").show();

}

/**
 *
 */
const _showHideButtons = function () {

    if ( termsOfService_Text === null ) {

        $("#tos_not_exist").show();

        $("#tos_change_button").hide();
        $("#tos_enabled").hide();
        $("#tos_not_enabled").hide();

    } else {
        $("#tos_change_button").show();

        if (termsOfService_Enabled) {

            $("#tos_enabled").show();

            $("#tos_not_enabled").hide();

        } else {
            $("#tos_not_enabled").show();

            $("#tos_enabled").hide();
        }

        $("#tos_not_exist").hide();

    }
}

/**
 *
 */
const disableTermsOfService = function( ) {

    const requestData = { };

    const url = "admin/rws/for-page/terms-of-service-disable";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

    promise_webserviceCallStandardPost.then( ({ responseData }) => {
        try {
            if ( responseData.status ) {
                $("#tos_enabled").hide();
                $("#tos_not_enabled").show();
            } else {
                window.alert( "failed to disable" );
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );
}

/**
 *
 */
const enableTermsOfService = function( ) {

    const requestData = { };

    const url = "admin/rws/for-page/terms-of-service-enable";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

    promise_webserviceCallStandardPost.then( ({ responseData }) => {
        try {
            if ( responseData.status ) {
                $("#tos_not_enabled").hide();
                $("#tos_enabled").show();
            } else {
                window.alert( "failed to enable" );
            }
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );
}

/**
 *
 */
const openTermsOfServiceOverlay = function () {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Cancel_Close_Clicked = () : void => {
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

    const callbackOn_Save_Clicked : ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_Callback =
        (params: ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_CallbackParams) : void => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

        if ( params.termsOfServiceText_NewValue !== termsOfService_Text ) {
            //  text changed so save

            _saveUpdated_TermsOfService_Text( params );
        }
    };

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        open_manageTermsOfService_MaintOverlay({ params: { termsOfServiceText_ExistingValue: termsOfService_Text, callbackOn_Cancel_Close_Clicked, callbackOn_Save_Clicked } });
}

/**
 *
 */
const _saveUpdated_TermsOfService_Text = function( params: ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_CallbackParams ) {

    const limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = open_configureLimelightForAdminPage_TermsOfService_SavingDataOverlay()
    const requestData = {
        termsOfServiceText: params.termsOfServiceText_NewValue
    };
    const url = "admin/rws/for-page/terms-of-service-add-change";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

    promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

    promise_webserviceCallStandardPost.then( ({ responseData }) => {
        try {
            if ( termsOfService_Text === undefined || termsOfService_Text === null ) {

                termsOfService_Enabled = true;
            }

            termsOfService_Text = params.termsOfServiceText_NewValue;

            const termsOfService_Text_ForHTML = _termsOfService_Text_ConvertForAssignAsHTML( termsOfService_Text );

            $("#tos_current_terms_of_service").html( termsOfService_Text_ForHTML );

            limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();

            _showHideButtons();

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    } );

}

/**
 *
 */
const _getTermsOfService = function () : Promise<TermsOfService_WebServiceResponse> {

    return new Promise<TermsOfService_WebServiceResponse>( (resolve, reject) => {
        const requestData = {};
        const url = "admin/rws/for-page/terms-of-service-get-current";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( () => { throw Error("Webservice call fail. url: " + url ) }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                const termsOfService_WebServiceResponse : TermsOfService_WebServiceResponse = responseData as TermsOfService_WebServiceResponse
                if ( termsOfService_WebServiceResponse.termsOfServiceEnabled === undefined ) {
                    const msg = "( termsOfService_WebServiceResponse.termsOfServiceEnabled === undefined )";
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( termsOfService_WebServiceResponse.termsOfServiceText === undefined ) {
                    const msg = "( termsOfService_WebServiceResponse.termsOfServiceText === undefined )";
                    console.warn(msg);
                    throw Error(msg);
                }

                resolve( termsOfService_WebServiceResponse );

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        } );
    })
}

class TermsOfService_WebServiceResponse {
    termsOfServiceEnabled: boolean;
    termsOfServiceText : string;
}



/**
 *
 */
const _termsOfService_Text_ConvertForAssignAsHTML = function( termsOfServiceText : string ): string {

    const termsOfService_Text_ForHTML = termsOfServiceText.replace(/\n/g, "<br>");
    return termsOfService_Text_ForHTML;
}
