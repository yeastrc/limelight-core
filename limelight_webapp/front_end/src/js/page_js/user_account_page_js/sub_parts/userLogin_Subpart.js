/**
 * userLogin_Subpart.js
 * 
 * Javascript for logging in a user  
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 

const _user_account_login_forgot_password_template_bundle = 
require("../../../../../handlebars_templates_precompiled/user_account_login_forgot_password/user_account_login_forgot_password_template-bundle.js" );

///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

/**
 * 
 */
export class UserLogin_Subpart {

	/**
	 * 
	 */
	constructor() {
		this._initialized = false;
		
		if ( ! _user_account_login_forgot_password_template_bundle.user_login_form_main_display_template ) {
			throw Error("Nothing in _user_account_login_forgot_password_template_bundle.user_login_form_main_display_template");
		}
		
		this._user_login_form_main_display_template = _user_account_login_forgot_password_template_bundle.user_login_form_main_display_template;

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
		
		let user_login_form_main_display_html = this._user_login_form_main_display_template( formTemplateContext );

		let $user_login_form_main_display_html = $( user_login_form_main_display_html );
		
		$user_login_form_main_display_html.appendTo( $containerHTMLElement );

		
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
		
		this.inviteTrackingCode = inviteTrackingCode;

	};
	
	/**
	 * 
	 */
	loginPersonFormSubmit() {
		
		this.loginPerson();
	};

	/**
	 * 
	 */
	loginPerson() {
		
		var objectThis = this;
		
		hideAllErrorMessages();
		
		var $login_username = $("#login_username");
		if ($login_username.length === 0) {
			throw Error("Unable to find input field for id 'login_username' ");
		}
		var $login_password = $("#login_password");
		if ($login_password.length === 0) {
			throw Error("Unable to find input field for id 'login_password' ");
		}

		var login_username = $login_username.val();
		var login_password = $login_password.val();
		if ( login_username === "" ) {
			var $element = $("#error_message_login_username_required");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} else if ( login_password === "" ) {
			var $element = $("#error_message_login_password_required");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		}

		var requestObj = { username : login_username, password : login_password };

		if ( this.inviteTrackingCode ) {
			requestObj.inviteTrackingCode = this.inviteTrackingCode;
		}

		const url = "user/rws/for-page/login";

		const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		promise_webserviceCallStandardPost.catch( () => {  }  );

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
	loginPersonResponse(responseData) {

		if ( responseData.success ) {
			let currentPageHref = window.location.href;
			
			if ( currentPageHref.includes( "/user/login" ) ) {
				window.location.href = "d/pg/project-list";
				return;
			} else {
				//  Were forwarded to the login page with some other URL on the browser address bar so just reload the page
				//  reload current URL
				window.location.reload(true);
				return;
			}
		}
		
		//  Not successful
		
		if ( responseData.invalidUserOrPassword ) {
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
			var requestedURL = $requestedURL.val();
			if ( requestedURL !== "" ) {
				window.location.href = requestedURL;
				return;
			}
		} else {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
		}
	};

};

