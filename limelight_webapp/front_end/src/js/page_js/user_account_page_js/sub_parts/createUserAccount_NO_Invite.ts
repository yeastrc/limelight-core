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

///////////////////////////////////////////

import React from "react";
import ReactDOM from "react-dom";

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages } from 'page_js/common_all_pages/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {loadGoogleRecaptcha} from "page_js/data_pages/data_pages_common/googleRecaptchaLoaderForThisWebapp";
import {
	CreateUserAccount_Main_Common_Component,
	CreateUserAccount_Main_Common_Component_Props
} from "page_js/user_account_page_js/sub_parts/createUserAccount_Main_Common_Component";

/**
 * 
 */
export class UserCreateAccount_NO_Invite_Subpart {

	private _initialized = false;

	private _google_RecaptchaSiteKey;

	private containerHTMLElement;

	private _google_Recaptcha;  //  Google Recaptcha object

	private _termsOfServiceKey: string;

	/**
	 * 
	 */
	constructor() {

		this._initialized = true;
	}

	/**
	 * show the create account part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage( { containerHTMLElement } ) {

		const promiseArray : Array<Promise<any>> = [];

		//  Updates _termsOfServiceKey
		this._get_TermsOfServiceKey__CALL_ONLY_ONCE();

		//  NOT currently needed since place Terms of Service text in overlay in JSP
		// if ( this._termsOfServiceKey !== undefined && this._termsOfServiceKey !== null && this._termsOfServiceKey !== "" ) {
		// 	const promise = user_Get_TermsOfService_FromServer_Using_IdString({ idString: this._termsOfServiceKey });
		// 	promiseArray.push(promise);
		// }

		// Updates this._google_RecaptchaSiteKey
		this._get_Google_RecaptchaSiteKey_StoreInObject__CALL_ONLY_ONCE();

		// {
		//
		// 	if ( this._google_RecaptchaSiteKey ) {
		// 		const response_loadGoogleRecaptcha = loadGoogleRecaptcha();
		// 		if (response_loadGoogleRecaptcha.isLoaded) {
		// 			this._google_Recaptcha = response_loadGoogleRecaptcha.grecaptcha
		// 		} else {
		// 			promiseArray.push(response_loadGoogleRecaptcha.loadingPromise);
		// 		}
		// 	}
		// }

		if ( promiseArray.length > 0 ) {

			const promisesAll = Promise.all( promiseArray );

			promisesAll.catch( reason => {

				console.warn("Error loading data and/or recaptcha. reason: ", reason );
				throw Error("Error loading data and/or recaptcha. reason: " + reason );
			});

			promisesAll.then( values => {
				try {
					for ( const value of values ) {
						if ( value.grecaptcha ) {
							this._google_Recaptcha = value.grecaptcha
						}
					}
					this.showOnPage_Internal( { containerHTMLElement } );

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		} else {
			this.showOnPage_Internal( { containerHTMLElement } );
		}
	}

	/**
	 *
	 */
	private _get_Google_RecaptchaSiteKey_StoreInObject__CALL_ONLY_ONCE() : void {

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

		this._google_RecaptchaSiteKey = create_account_page_google_recaptcha_site_key_Inside_HTML_BODY_Tags;
	}

	/**
	 *
	 */
	private _get_TermsOfServiceKey__CALL_ONLY_ONCE() : void {

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

		this._termsOfServiceKey = terms_of_service_id_string_Inside_HTML_BODY_Tags;
	}

	/**
	 * @param containerHTMLElement
	 */
	private showOnPage_Internal( { containerHTMLElement } ) {

		try {
			const google_RecaptchaSiteKey = this._google_RecaptchaSiteKey;

			ReactDOM.unmountComponentAtNode( containerHTMLElement )

			let $containerHTMLElement = $( containerHTMLElement );

			$containerHTMLElement.empty();

			const props: CreateUserAccount_Main_Common_Component_Props = { createFor_YES_Invite: false, showInvitedMessage: false, google_RecaptchaSiteKey };

			const root_Component = (
				React.createElement(
					CreateUserAccount_Main_Common_Component,
					props,
					null
				)
			);

			//  Called on render complete
			const renderCompleteCallbackFcn = () => {

				this.showOnPage_Internal_After_ReactRender({ containerHTMLElement })
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

	private showOnPage_Internal_After_ReactRender({ containerHTMLElement }) {

		let objectThis = this;
		try {
			var $create_account_form = $("#create_account_form");
			
			$create_account_form.submit(function(event) {
			    event.preventDefault(); // to stop the form from submitting
			    		    
			    objectThis.createAccountFormSubmit();
			});
			
			
			$(document).click( function(eventObject) {
				try {
					hideAllErrorMessages();
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			
			$("#terms_of_service_acceptance_yes_button").click( function(eventObject) {
//				var clickThis = this;
				try {
					eventObject.stopPropagation();  // stop click bubble up.
					objectThis.createAccount();
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
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
			

			// this.inviteTrackingCode = inviteTrackingCode;
			this.containerHTMLElement = containerHTMLElement;


			const promiseArray: Array<Promise<any>> = []

			{

				if ( this._google_RecaptchaSiteKey ) {
					const response_loadGoogleRecaptcha = loadGoogleRecaptcha();
					if (response_loadGoogleRecaptcha.isLoaded) {
						this._google_Recaptcha = response_loadGoogleRecaptcha.grecaptcha
					} else {
						promiseArray.push(response_loadGoogleRecaptcha.loadingPromise);
					}
				}
			}

			if ( promiseArray.length > 0 ) {

				const promisesAll = Promise.all( promiseArray );

				promisesAll.catch( reason => {
					try {

						console.warn("Error loading data and/or recaptcha. reason: ", reason );
						throw Error("Error loading data and/or recaptcha. reason: " + reason );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});

				promisesAll.then( values => {
					try {
						for ( const value of values ) {
							if ( value.grecaptcha ) {
								this._google_Recaptcha = value.grecaptcha
							}
						}

						this._after_PageInitiallyReady__HideLoadingMessage__Display_MainData()

					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			} else {

				this._after_PageInitiallyReady__HideLoadingMessage__Display_MainData()
			}

		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

	private _after_PageInitiallyReady__HideLoadingMessage__Display_MainData() {

		//  Display all of contents since now have Recaptcha loaded or Recaptcha NOT loaded
		{
			const divDOM = document.getElementById( "create_account_outermost_container_div" )
			if ( ! divDOM ) {
				const msg = "NO DOM element with id 'create_account_outermost_container_div'"
				console.warn( msg )
				throw Error( msg )
			}

			divDOM.style.display = ""
		}

		//  Hide Loading message since now have Recaptcha loaded or Recaptcha NOT loaded
		{
			const divDOM = document.getElementById( "create_account_loading_message_div" )
			if ( ! divDOM ) {
				const msg = "NO DOM element with id 'create_account_loading_message_div'"
				console.warn( msg )
				throw Error( msg )
			}

			divDOM.style.display = "none"
		}
	}

	/**
	 * 
	 */
	createAccountFormSubmit() {
		try {

			const requestData = this.createAccountGetFormDataAndValidate();
			
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
			tosAcceptedKey: this._termsOfServiceKey,
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

		// $("#terms_of_service_modal_dialog_overlay_background").hide();
		// $("#terms_of_service_overlay_div").hide();

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


