/**
 * userResetPassword_Subpart.ts
 * 
 * Javascript for user forgot password  
 * 
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import _user_account_login_forgot_password_template_bundle =
	require("../../../../../handlebars_templates_precompiled/user_account_login_forgot_password/user_account_login_forgot_password_template-bundle.js" );

///////////////////////////////////////////

//module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

/**
 * 
 */
export class UserResetPassword_Subpart {

	private _initialized = false;

	private _user_reset_password_form_main_display_template = _user_account_login_forgot_password_template_bundle.user_reset_password_form_main_display_template;

	/**
	 * 
	 */
	constructor() {
		this._initialized = true;
	}

	/**
	 * show the forgot password part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage( { containerHTMLElement } ) {

		var objectThis = this;

		let $containerHTMLElement = $( containerHTMLElement );

		$containerHTMLElement.empty();

		let formTemplateContext = { };

		let user_reset_password_form_main_display_html = this._user_reset_password_form_main_display_template( formTemplateContext );

		let $user_reset_password_form_main_display_html = $( user_reset_password_form_main_display_html );

		$user_reset_password_form_main_display_html.appendTo( $containerHTMLElement );


		$("#reset_password_username").focus();

		var $reset_password_form = $("#reset_password_form");

		$reset_password_form.submit(function(event) {
			try {
				event.preventDefault(); // to stop the form from submitting

				objectThis._personForgotPasswordFormSubmit();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	};

	/**
	 * 
	 */
	_personForgotPasswordFormSubmit() {

		this._resetPassword();
	};

	/**
	 * 
	 */
	_resetPassword() {

		const objectThis = this;

		hideAllErrorMessages();

		var $username = $("#reset_password_username");
		if ($username.length === 0) {
			throw Error( "Unable to find input field for id 'reset_password_username' " );
		}

		var $email = $("#reset_password_email");
		if ($email.length === 0) {
			throw Error( "Unable to find input field for id 'reset_password_email' " );
		}

		var username = $username.val();
		var email = $email.val();

		if ( username === "" && email === "" ) {
			var $element = $("#error_message_username_or_email_required");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		}

		if ( username !== "" && email !== "" ) {
			var $element = $("#error_message_username_and_email_both_populated");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		}

		var requestObj = {
				username : username,
				email : email
		};

		const url = "user/rws/for-page/reset-password-gen-email";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, doNotHandleErrorResponse : true }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { 

			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
		}  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._resetPasswordComplete( requestObj, responseData );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	_resetPasswordComplete(requestObj, responseData) {

		if ( ! responseData.status ) {

//			private boolean invalidUserOrPassword = false;
//			private boolean disabledUser = false;

			if ( responseData.invalidUsernameOrEmail ) {

				var id = null;
				if ( requestObj.username !== ""  ) {

					id = "error_message_username_invalid";
				} else {
					id = "error_message_email_invalid";
				}
				var $element = $( "#" + id );

				showErrorMsg( $element );

			} else if ( responseData.disabledUser ) {

				var $element = $("#error_message_user_disabled");
				showErrorMsg( $element );
			} else {
				var $element = $("#error_message_system_error");
				showErrorMsg( $element );
			}
			return;

		} 

		var $element = $("#success_message_system_success");

		showErrorMsg( $element );
	};


}
