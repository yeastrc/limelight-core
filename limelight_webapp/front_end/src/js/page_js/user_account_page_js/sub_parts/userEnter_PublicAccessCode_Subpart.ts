/**
 * userEnter_PublicAccessCode_Subpart.ts
 * 
 * Javascript for a user enter a Public Access Code
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 

import _user_account_login_forgot_password_template_bundle =
	require("../../../../../handlebars_templates_precompiled/user_account_login_forgot_password/user_account_login_forgot_password_template-bundle.js" );

///////////////////////////////////////////


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

import { createSpinner, destroySpinner } from 'page_js/common_all_pages/spinner';
import {UserLoginPage_Root} from "page_js/user_account_page_js/root_parts/userLoginPage_Root";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";

		
/**
 * 
 */
export class UserEnter_PublicAccessCode_Subpart {

	private _initialized = false;
	private _user_login_form_public_access_code_template = _user_account_login_forgot_password_template_bundle.user_login_form_public_access_code_template;

	private _userLoginPage_Root : UserLoginPage_Root

	/**
	 * 
	 */
	constructor( userLoginPage_Root : UserLoginPage_Root ) {
		this._initialized = false;

		this._userLoginPage_Root = userLoginPage_Root;
		
		if ( ! _user_account_login_forgot_password_template_bundle.user_login_form_public_access_code_template ) {
			throw Error("Nothing in _user_account_login_forgot_password_template_bundle.user_login_form_public_access_code_template");
		}
		
		this._user_login_form_public_access_code_template = _user_account_login_forgot_password_template_bundle.user_login_form_public_access_code_template;

		this._initialized = true;
	}

	/**
	 * show the login part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage( { containerHTMLElement, inviteTrackingCode } ) {

		var objectThis = this;
		
		let $containerHTMLElement = $( containerHTMLElement );
		
		$containerHTMLElement.empty();
		
		let formTemplateContext = { };
		
		let user_login_form_main_display_html = this._user_login_form_public_access_code_template( formTemplateContext );

		let $user_login_form_main_display_html = $( user_login_form_main_display_html );
		
		$user_login_form_main_display_html.appendTo( $containerHTMLElement );

		$("#login_username").focus();
		
		var $public_access_code_form = $("#public_access_code_form");
		
		$public_access_code_form.submit(function(event) {
			try {
				event.preventDefault(); // to stop the form from submitting

				objectThis.public_access_code_formSubmit();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		const $public_access_code__open_signin_link = $("#public_access_code__open_signin_link");
		$public_access_code__open_signin_link.click( (eventObject) => {
			try {
				eventObject.preventDefault();

				this._userLoginPage_Root._showLoginForm()

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};
	
	/**
	 * 
	 */
	public_access_code_formSubmit() {
		
		this.process_PublicAccessCode_Entered();
	};

	/**
	 * 
	 */
	process_PublicAccessCode_Entered() {
		
		var objectThis = this;

		const sign_in_page_project_idDOM = document.getElementById("sign_in_page_project_id")
		if ( ! sign_in_page_project_idDOM ) {
			throw Error("No DOm element with id 'sign_in_page_project_id'")
		}

		const projectIdString = sign_in_page_project_idDOM.innerText;

		const projectId : number = Number.parseInt( projectIdString );
		if ( Number.isNaN( projectId )) {
			throw Error("Failed to parse number in DOM element with id 'sign_in_page_project_id'. contents: " + projectIdString );
		}

		var $public_access_code_value = $("#public_access_code_value");
		if ($public_access_code_value.length === 0) {
			throw Error("Unable to find input field for id 'public_access_code_value' ");
		}

		var public_access_code_value = $public_access_code_value.val().toString();
		if ( public_access_code_value.trim() === "" ) {
			return;  //  !!!  EARLY EXIT
		}

		createSpinner(); // external function
		
		var requestObj = { public_access_code_value, projectId };

		const url = "user/rws/for-page/process_public_access_code_value";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { 

			destroySpinner(); // external function
		 }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.process_PublicAccessCode_EnteredResponse(responseData);

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	};

	/**
	 * 
	 */
	process_PublicAccessCode_EnteredResponse(responseData) {

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
		
		if ( responseData.invalidCode ) {
			var $element = $("#error_message_code_invalid");
			showErrorMsg($element);
		} else if ( responseData.invalidCodeForProjectId ) {
			var $element = $("#error_message_code_invalid_for_project_id");
			showErrorMsg($element);

		} else {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
		}
	};

};

