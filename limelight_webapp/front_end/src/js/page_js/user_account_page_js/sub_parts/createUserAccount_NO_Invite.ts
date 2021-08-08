/**
 * createUserAccount_NO_Invite.ts
 * 
 * Javascript for creating a user account WITHOUT an Invite
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//  module import 

//  Import Handlebars Templates

import _user_account_create_account_template_bundle =
	require("../../../../../handlebars_templates_precompiled/user_account_create_account/user_account_create_account_template-bundle.js" );

///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {loadGoogleRecaptcha} from "page_js/data_pages/data_pages_common/googleRecaptchaLoaderForThisWebapp";


/**
 * 
 */
export class UserCreateAccount_NO_Invite_Subpart {

	private _initialized = false;
	private _user_invite_create_account_main_display_template = _user_account_create_account_template_bundle.user_invite_create_account_main_display_template;

	// private google_RecaptchaSiteKey;
	private containerHTMLElement;

	private _google_Recaptcha;  //  Google Recaptcha object

	/**
	 * 
	 */
	constructor() {

		if ( ! _user_account_create_account_template_bundle.user_invite_create_account_main_display_template ) {
			throw Error("Nothing in _user_account_create_account_template_bundle.user_invite_create_account_main_display_template");
		}

		this._initialized = true;
	}

	/**
	 * show the create account part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage( { containerHTMLElement } ) {

		const response = loadGoogleRecaptcha();

		if ( response.isLoaded ) {

			this._google_Recaptcha = response.grecaptcha
			this.showOnPage_Internal( { containerHTMLElement } );

		} else {

			response.loadingPromise.then( value => {

				const  {grecaptcha} = value;
				this._google_Recaptcha = grecaptcha

				this.showOnPage_Internal( { containerHTMLElement } );
			})
		}

	}

	/**
	 *
	 */
	private _get_Google_RecaptchaSiteKey() {

		const create_account_page_google_recaptcha_site_keyDOM = document.getElementById("create_account_page_google_recaptcha_site_key");
		if ( ! create_account_page_google_recaptcha_site_keyDOM ) {
			// Not found so exit
			return null; // EARLY EXIT
		}

		let create_account_page_google_recaptcha_site_key_Inside_HTML_BODY_Tags : string = null;

		{
			const innerText = create_account_page_google_recaptcha_site_keyDOM.innerText

			const domparser = new DOMParser()

			try {
				const doc = domparser.parseFromString(innerText, "text/html")

				const body = doc.body;

				create_account_page_google_recaptcha_site_key_Inside_HTML_BODY_Tags = body.innerText;

			} catch (e) {
				// Not parsable Value so exit
				return null; // EARLY EXIT
			}
		}
		try {
			create_account_page_google_recaptcha_site_keyDOM.remove();
		} catch (e) {
			// swallow any exception
		}

		return create_account_page_google_recaptcha_site_key_Inside_HTML_BODY_Tags;
	}

	/**
	 * @param containerHTMLElement
	 */
	private showOnPage_Internal( { containerHTMLElement } ) {

		let objectThis = this;
		try {
			const google_RecaptchaSiteKey = this._get_Google_RecaptchaSiteKey();


			let $containerHTMLElement = $( containerHTMLElement );

			$containerHTMLElement.empty();

			let formTemplateContext = { showInvitedMessage: false, google_RecaptchaSiteKey };

			let user_invite_create_account_main_display_html = this._user_invite_create_account_main_display_template( formTemplateContext );

			let $user_invite_create_account_main_display_html = $( user_invite_create_account_main_display_html );

			$user_invite_create_account_main_display_html.appendTo( $containerHTMLElement );

			var $create_account_form = $("#create_account_form");
			
			$create_account_form.submit(function(event) {
			    event.preventDefault(); // to stop the form from submitting
			    		    
			    objectThis.createAccountFormSubmit();
			});
			
			
//			$(document).click( function(eventObject) {
//				try {
//					eventObject.preventDefault();
//					hideAllErrorMessages();
//				} catch( e ) {
//					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//					throw e;
//				}
//			});
			
//			$("#terms_of_service_acceptance_yes_button").click( function(eventObject) {
////				var clickThis = this;
//				try {
//					eventObject.preventDefault();  // stop click bubble up.
//					createAccount();
//				} catch( e ) {
//					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//					throw e;
//				}
//			});
//			$("#terms_of_service_acceptance_no_button").click( function(eventObject) {
////				var clickThis = this;
//				try {
//					eventObject.preventDefault();  // stop click bubble up.
//					$("#terms_of_service_modal_dialog_overlay_background").hide();
//					$("#terms_of_service_overlay_div").hide();
//				} catch( e ) {
//					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//					throw e;
//				}
//			});
			

			// this.inviteTrackingCode = inviteTrackingCode;
			this.containerHTMLElement = containerHTMLElement;
			
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
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
//			if ( requestData.tos_key !== "" ) {  //  Have Terms of service key so user has to accept terms of service
//				$("#terms_of_service_modal_dialog_overlay_background").show();
//				$("#terms_of_service_overlay_div").show();
//				return;  //  EARLY EXIT
//			}

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
		
//		Terms of service accepted Key
//		var tosAcceptedKey = "";
//		var $terms_of_service_id_string = $("#terms_of_service_id_string");
//		if ( $terms_of_service_id_string.length > 0 ) {
//			tosAcceptedKey = $terms_of_service_id_string.val();
//		}

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

		let recaptchaValue = "";
		const $limelight_google_recaptcha_container_div = $("#limelight_google_recaptcha_container_div");

		if ( $limelight_google_recaptcha_container_div.length > 0 ) {
			//  Google Recaptcha included so get the user's response
			recaptchaValue = this._google_Recaptcha.getResponse();
			if ( recaptchaValue === "" || recaptchaValue === null || recaptchaValue === undefined ) {
				const $element = $("#error_message_recaptcha_required");
				showErrorMsg( $element );
				return null;  //  !!!  EARLY EXIT
			}
		}

		const formPageData = {
//				tos_key : tosAcceptedKey,
				recaptchaValue : recaptchaValue,
				firstName : firstName,
				lastName :  lastName,
				organization :  organization,
				email :  email,
				username :  username,
				password :  password,
				inviteTrackingCode : undefined //  Set to undefined as added later
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

		// if ( this.inviteTrackingCode ) {
		// 	requestObj.inviteTrackingCode = this.inviteTrackingCode;
		// }
		
		const url = "user/rws/for-page/create-account-no-invite";

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
	createAccountComplete( { responseData } ) {

//		$("#terms_of_service_modal_dialog_overlay_background").hide();
//		$("#terms_of_service_overlay_div").hide();

		if ( ! responseData.status ) {
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

};