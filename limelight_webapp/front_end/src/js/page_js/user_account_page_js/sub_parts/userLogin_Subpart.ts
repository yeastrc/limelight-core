/**
 * userLogin_Subpart.ts
 * 
 * Javascript for logging in a user
 *
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 

import React from "react";
import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { createSpinner, destroySpinner } from 'page_js/common_all_pages/spinner';
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
	User_login_form_main_display_Component
} from "page_js/user_account_page_js/sub_parts/user_login_form_main_display_Component";


let constructorCalled_UserLogin_Subpart = false
		
/**
 * 
 */
export class UserLogin_Subpart {

	private _initialized = false;

	private inviteTrackingCode: string
	private _termsOfServiceKey: string

	private _reactRoot_InDOMElement: Root_ReactDOM_Client

	/**
	 * 
	 */
	constructor() {
		if ( constructorCalled_UserLogin_Subpart ) {

			const msg = "ERROR: constructor Called for class UserLogin_Subpart more than once"
			console.warn(msg)
			throw Error(msg)
		}

		constructorCalled_UserLogin_Subpart = true

		this._initialized = true;
	}

	/**
	 *
	 */
	removeFromPage() {

		if ( this._reactRoot_InDOMElement ) {

			this._reactRoot_InDOMElement.unmount()
		}

		this._reactRoot_InDOMElement = undefined
	}

	/**
	 * show the login part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage(
		{
			containerHTMLElement,
			inviteTrackingCode
		} : {
			containerHTMLElement: HTMLElement
			inviteTrackingCode: string
		} ) {

		//  Assume Already Empty

		//  React Unmount

		// ReactDOM.unmountComponentAtNode( containerHTMLElement )
		//
		// let $containerHTMLElement = $( containerHTMLElement );
		//
		// $containerHTMLElement.empty();

		const callback_On_Mount : () => void = () => {

			this._showOnPage_AfterRender({ inviteTrackingCode })
		}

		const root_Component = (
			React.createElement(
				User_login_form_main_display_Component,
				{ callback_On_Mount },
				null
			)
		);

		this._reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerHTMLElement )

		this._reactRoot_InDOMElement.render( root_Component )
	}

	private _showOnPage_AfterRender(
		{
			inviteTrackingCode
		} : {
			inviteTrackingCode: string
		}) {

		var objectThis = this;

		$("#login_username").focus();
		
		var $login_form = $("#login_form");
		
		$login_form.submit(function(event) {
			try {
				event.preventDefault(); // to stop the form from submitting

				objectThis.loginPersonFormSubmit();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		$(document).off("click")
		$(document).click( function(eventObject) {
			try {
				hideAllErrorMessages();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		$("#terms_of_service_acceptance_yes_button").off("click")
		$("#terms_of_service_acceptance_yes_button").click( function(eventObject) {
//				var clickThis = this;
			try {
				eventObject.stopPropagation();  // stop click bubble up.
				objectThis.loginPerson();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		$("#terms_of_service_acceptance_no_button").off("click")
		$("#terms_of_service_acceptance_no_button").click( function(eventObject) {
//				var clickThis = this;
			try {
				eventObject.stopPropagation();  // stop click bubble up.
				$("#terms_of_service_modal_dialog_overlay_background").hide();
				$("#terms_of_service_overlay_div").hide();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});


		this.inviteTrackingCode = inviteTrackingCode;

	};

	/**
	 * 
	 */
	loginPersonFormSubmit() {

		hideAllErrorMessages();

		const usernamePassword_FromPageDOM_Response = this._getLogin_UsernamePassword_FromPageDOM();
		if ( ! usernamePassword_FromPageDOM_Response ) {
			//  error message already displayed so exit
			return; // EARLY RETURN
		}

		if ( this._termsOfServiceKey ) {

			$("#terms_of_service_modal_dialog_overlay_background").show();
			$("#terms_of_service_overlay_div").show();
			return; // EARLY RETURN
		}

		this.loginPerson();
	};

	/**
	 * 
	 */
	loginPerson() {
		
		var objectThis = this;
		
		hideAllErrorMessages();

		const usernamePassword_FromPageDOM_Response = this._getLogin_UsernamePassword_FromPageDOM();
		if ( ! usernamePassword_FromPageDOM_Response ) {
			//  error message already displayed so exit
			return; // EARLY RETURN
		}

		const username = usernamePassword_FromPageDOM_Response.username;
		const password = usernamePassword_FromPageDOM_Response.password;

		createSpinner(); // external function

		const inviteTrackingCode: any = undefined
		
		var requestObj = { username, password, tos_key: this._termsOfServiceKey, inviteTrackingCode };

		if ( this.inviteTrackingCode ) {
			requestObj.inviteTrackingCode = this.inviteTrackingCode;
		}

		const url = "user/rws/for-page/login";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { 

			destroySpinner(); // external function
		 }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.loginPersonResponse(responseData);

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	};

	/**
	 * 
	 */
	loginPersonResponse(responseData: any) {

		if ( responseData.success ) {
			let currentPageHref = window.location.href;
			
			if ( currentPageHref.includes( "/user/login" ) ) {
				window.location.href = "d/pg/project-list";
				return;
			} else {
				//  Were forwarded to the login page with some other URL on the browser address bar so just reload the page
				//  reload current URL
				limelight__ReloadPage_Function()
				return;
			}
		}
		
		destroySpinner(); // external function

		//  Not successful

		if ( responseData.termsOfServiceAcceptanceRequired ) {

			$("#terms_of_service_modal_dialog_overlay_background").show();
			$("#terms_of_service_overlay_div").show();
			this._termsOfServiceKey = responseData.termsOfServiceKey;
			$("#terms_of_service_acceptance_required_text").html( responseData.termsOfServiceText );

		} else if ( responseData.invalidUserOrPassword ) {
			var $element = $("#error_message_login_username_or_login_password_invalid");
			showErrorMsg( $element );
		} else if ( responseData.disabledUser ) {
			var $element = $("#error_message_user_disabled");
			showErrorMsg( $element );
		} else if ( responseData.noLocalAccount ) {
			var $element = $("#error_message_no_local_account");
			showErrorMsg( $element );
		} else if ( responseData.invalidInviteTrackingCode ) {
			//  Invalid Invite tracking code so redirect to requestedURL to process tracking code and show error msg
			var $requestedURL = $("#requestedURL");
			if ($requestedURL.length === 0) {
				throw Error("Unable to find input field for id 'requestedURL' ");
			}
			var requestedURL : any = $requestedURL.val();
			if ( requestedURL !== "" ) {
				window.location.href = requestedURL;
				return;
			}
		} else {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
		}
	};

	/**
	 * @returns null if invalid input
	 */
	private _getLogin_UsernamePassword_FromPageDOM() : { username: string, password: string } {

		var $login_username = $("#login_username");
		if ($login_username.length === 0) {
			throw Error("Unable to find input field for id 'login_username' ");
		}
		var $login_password = $("#login_password");
		if ($login_password.length === 0) {
			throw Error("Unable to find input field for id 'login_password' ");
		}

		var username = $login_username.val() as string;
		var password = $login_password.val() as string;
		if ( username === "" ) {
			var $element = $("#error_message_login_username_required");
			showErrorMsg( $element );
			return null;  //  !!!  EARLY EXIT
		} else if ( password === "" ) {
			var $element = $("#error_message_login_password_required");
			showErrorMsg( $element );
			return null;  //  !!!  EARLY EXIT
		}

		return { username, password };
	}

};

