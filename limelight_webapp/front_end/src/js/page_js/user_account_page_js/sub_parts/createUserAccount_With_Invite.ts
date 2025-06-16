/**
 * createUserAccount_With_Invite.ts
 * 
 * Javascript for creating a user account from an Invite  
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//  module import 

import React from "react";
import ReactDOM from "react-dom";

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages } from 'page_js/common_all_pages/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {
	CreateUserAccount_Main_Common_Component,
	CreateUserAccount_Main_Common_Component_Props
} from "page_js/user_account_page_js/sub_parts/createUserAccount_Main_Common_Component";
import {
	User_invite__invite_validation_error_Component,
	User_invite__invite_validation_error_Component_Props
} from "page_js/user_account_page_js/sub_parts/user_invite__invite_validation_error_Component";


/**
 * 
 */
export class UserCreateAccount_With_Invite_Subpart {

	private _initialized = false;

	private inviteTrackingCode: any
	private containerHTMLElement: any

	private _termsOfServiceKey: string;

	/**
	 * 
	 */
	constructor() {

		this._initialized = true;
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

		try {

			this._termsOfServiceKey = this._get_TermsOfServiceKey();

			//  NOT currently needed since place Terms of Service text in overlay in JSP
			// if ( this._termsOfServiceKey !== undefined && this._termsOfServiceKey !== null && this._termsOfServiceKey !== "" ) {
			// 	const promise = user_Get_TermsOfService_FromServer_Using_IdString({ idString: this._termsOfServiceKey });
			// 	promiseArray.push(promise);
			// }

			try {

				//  React Unmount

				ReactDOM.unmountComponentAtNode( containerHTMLElement )

			} catch ( e ) {
				//  Ignore Exception
			}

			let $containerHTMLElement = $( containerHTMLElement );

			$containerHTMLElement.empty();

			const props: CreateUserAccount_Main_Common_Component_Props = { createFor_YES_Invite: true, showInvitedMessage: true, google_RecaptchaSiteKey: undefined };

			const root_Component = (
				React.createElement(
					CreateUserAccount_Main_Common_Component,
					props,
					null
				)
			);

			//  Called on render complete
			const renderCompleteCallbackFcn = () => {

				this.showOnPage_Internal_After_ReactRender({ containerHTMLElement, inviteTrackingCode })
			};

			const renderedReactComponent = ReactDOM.render(
				root_Component,
				containerHTMLElement,
				renderCompleteCallbackFcn
			);

		} catch ( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
			throw e;
		}

	}

	private showOnPage_Internal_After_ReactRender(
		{
			containerHTMLElement,
			inviteTrackingCode
		} : {
			containerHTMLElement: any
			inviteTrackingCode: any
		} ) {

		let objectThis = this;
		try {

			var $create_account_form = $("#create_account_form");
			
			$create_account_form.submit(function(event) {
			    event.preventDefault(); // to stop the form from submitting
			    		    
			    objectThis.createAccountFormSubmit();
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
					eventObject.preventDefault();  // stop click bubble up.
					objectThis.createAccount();
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

			$("#terms_of_service_acceptance_no_button").off("click")
			$("#terms_of_service_acceptance_no_button").click( function(eventObject) {
//				var clickThis = this;
				try {
					eventObject.preventDefault();  // stop click bubble up.
					$("#terms_of_service_modal_dialog_overlay_background").hide();
					$("#terms_of_service_overlay_div").hide();
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			

			this.inviteTrackingCode = inviteTrackingCode;
			this.containerHTMLElement = containerHTMLElement;


		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	/**
	 *
	 */
	private _get_TermsOfServiceKey() : string {

		const terms_of_service_id_stringDOM = document.getElementById("terms_of_service_id_string");
		if ( ! terms_of_service_id_stringDOM ) {
			// Not found so exit
			return null; // EARLY EXIT
		}

		let terms_of_service_id_string_Inside_HTML_BODY_Tags : string = null;

		{
			const innerText = terms_of_service_id_stringDOM.innerText

			const domparser = new DOMParser()

			try {
				const doc = domparser.parseFromString(innerText, "text/html")

				const body = doc.body;

				terms_of_service_id_string_Inside_HTML_BODY_Tags = body.innerText;

			} catch (e) {
				// Not parsable Value so exit
				return null; // EARLY EXIT
			}
		}
		try {
			terms_of_service_id_stringDOM.remove();
		} catch (e) {
			// swallow any exception
		}

		return terms_of_service_id_string_Inside_HTML_BODY_Tags;
	}


	/**
	 * 
	 */
	createAccountFormSubmit() {
		try {
			
			var requestData = this.createAccountGetFormDataAndValidate();
			
			if ( requestData === null ) {  //  Error in form data so exit
				return;  //  EARLY EXIT
			}

			if ( this._termsOfServiceKey !== undefined && this._termsOfServiceKey !== null && this._termsOfServiceKey !== "" ) {  //  Have Terms of service key so user has to accept terms of service
				$("#terms_of_service_modal_dialog_overlay_background").show();
				$("#terms_of_service_overlay_div").show();
				return;  //  EARLY EXIT
			}

//			Form data valid and no terms of service so create account
			this.createAccount();
			
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	};

	/**
	 * 
	 */
	createAccountGetFormDataAndValidate() {

		hideAllErrorMessages();

		var $firstName = $("#firstName");
		if ($firstName.length === 0) {
			throw Error( "Unable to find input field for id 'firstName' " );
		}
		var firstName = $firstName.val();
		var $lastName = $("#lastName");
		if ($lastName.length === 0) {
			throw Error( "Unable to find input field for id 'lastName' " );
		}
		var lastName = $lastName.val();
		var $organization = $("#organization");
		if ($organization.length === 0) {
			throw Error( "Unable to find input field for id 'organization' " );
		}
		var organization = $organization.val();

		var $email = $("#email");
		if ($email.length === 0) {
			throw Error( "Unable to find input field for id 'email' " );
		}
		var email = $email.val();
		var $username = $("#username");
		if ($username.length === 0) {
			throw Error( "Unable to find input field for id 'username' " );
		}
		var username = $username.val();
		var $password = $("#password");
		if ($password.length === 0) {
			throw Error( "Unable to find input field for id 'password' " );
		}
		var password = $password.val();
		var $passwordConfirm = $("#passwordConfirm");
		if ($passwordConfirm.length === 0) {
			throw Error( "Unable to find input field for id 'passwordConfirm' " );
		}
		var passwordConfirm = $passwordConfirm.val();
		if ( firstName === "" ||
				lastName === "" ||
				organization === "" ||
				email === "" ||
				username === "" ||
				password === "" ||
				passwordConfirm === "" 	) {
			var $element = $("#error_message_all_fields_required");
			showErrorMsg( $element );
			return null;  //  !!!  EARLY EXIT
		} 
		if ( password !== passwordConfirm ) {
			var $element = $("#error_message_password_confirm_password_not_match");
			showErrorMsg( $element );
			return null;  //  !!!  EARLY EXIT
		}

		const inviteTrackingCode: any = undefined //  Set to undefined as added later

		var formPageData = {
			tosAcceptedKey: this._termsOfServiceKey,
			firstName : firstName,
			lastName :  lastName,
			organization :  organization,
			email :  email,
			username :  username,
			password :  password,
			inviteTrackingCode //  Set to undefined as added later
		};

		return formPageData;
	};

	/**
	 * 
	 */
	createAccount() {	
		
		let objectThis = this;

		var requestObj = this.createAccountGetFormDataAndValidate();

		if ( requestObj === null ) {  //  Error in form data so exit
			return;  //  EARLY EXIT
		}

		if ( this.inviteTrackingCode ) {
			requestObj.inviteTrackingCode = this.inviteTrackingCode;
		}
		
		const url = "user/rws/for-page/create-account-from-invite";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, doNotHandleErrorResponse : true }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { 
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
		 }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.createAccountComplete( { responseData: responseData } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	createAccountComplete(
		{
			responseData
		} : {
			responseData: any
		} ) {

//		$("#terms_of_service_modal_dialog_overlay_background").hide();
//		$("#terms_of_service_overlay_div").hide();

		if ( ! responseData.status ) {

			$("#terms_of_service_modal_dialog_overlay_background").hide();
			$("#terms_of_service_overlay_div").hide();

			if ( responseData.duplicateUsername && responseData.duplicateEmail ) {
				var $element = $("#error_message_username_email_taken");
				showErrorMsg( $element );
				var $emailInput = $("#email");
				$emailInput.focus();
			} else if ( responseData.duplicateUsername ) {
				var $element = $("#error_message_username_taken");
				showErrorMsg( $element );
				var $usernameInput = $("#username");
				$usernameInput.focus();
			} else if ( responseData.duplicateEmail ) {
				var $element = $("#error_message_email_taken");
				showErrorMsg( $element );
				var $emailInput = $("#email");
				$emailInput.focus();
			} else if ( responseData.errorMessage ) {
				$("#error_message_from_server_text").text( responseData.errorMessage );
				var $element = $("#error_message_from_server");
				showErrorMsg( $element );
			} else if ( responseData.inviteTrackingCodeNotValidReason !== undefined &&
					responseData.inviteTrackingCodeNotValidReason !== null ) {
				this._displayInviteTrackingNotValidMsg( { inviteTrackingCodeNotValidReason : responseData.inviteTrackingCodeNotValidReason} );
			} else {
				var $element = $("#error_message_system_error");
				showErrorMsg( $element );
			}
			return;
		} 

		window.location.href = "d/pg/project-list";
		return;
		
//		$("#list_projects_form").submit();
	};
	
	/**
	 * 
	 */
	_displayInviteTrackingNotValidMsg(
		{
			inviteTrackingCodeNotValidReason
		} : {
			inviteTrackingCodeNotValidReason: any
		} ) {


		try {

			//  React Unmount

			ReactDOM.unmountComponentAtNode( this.containerHTMLElement )

		} catch ( e ) {
			//  Ignore Exception
		}

		let $containerHTMLElement = $( this.containerHTMLElement );

		$containerHTMLElement.empty();

		const props: User_invite__invite_validation_error_Component_Props = { inviteTrackingCodeNotValidReason };

		const root_Component = (
			React.createElement(
				User_invite__invite_validation_error_Component,
				props,
				null
			)
		);

		//  Called on render complete
		const renderCompleteCallbackFcn = () => {

		};

		const renderedReactComponent = ReactDOM.render(
			root_Component,
			this.containerHTMLElement,
			renderCompleteCallbackFcn
		);
	}

};