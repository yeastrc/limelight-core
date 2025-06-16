/**
 * userResetPasswordPage_Root.ts
 * 
 * Javascript for resetPasswordLandingPage.jsp page  
 * 
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


/**
 * 
 */
class UserResetPasswordPage {

	private _initializeCalled = false

	/**
	 * 
	 */
	constructor() {

	}

	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {

		const objectThis = this;

		initShowHideErrorMessage();
		limelight__catchAndReportGlobalOnError.init();

		var $reset_password_form = $("#reset_password_form");

		$reset_password_form.submit(function(event) {
			try {
				event.preventDefault(); // to stop the form from submitting

				objectThis._resetPasswordChangePassword();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		this._initializeCalled = true;
	};

	/**
	 * 
	 */
	_resetPasswordChangePassword() {

		const objectThis = this;
		
		hideAllErrorMessages();

		var $resetPasswordTrackingCode = $("#resetPasswordTrackingCode");

		if ($resetPasswordTrackingCode.length === 0) {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			throw Error( "Unable to find input field for id 'resetPasswordTrackingCode' " );
		}

		var $password_change_field = $("#password_change_field");
		if ($password_change_field.length === 0) {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			throw Error( "Unable to find input field for id 'password_change_field' " );
		}

		var $password_confirm_field = $("#password_confirm_field");

		if ($password_confirm_field.length === 0) {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			throw Error( "Unable to find input field for id 'password_confirm_field' " );
		}

		var resetPasswordTrackingCode = $resetPasswordTrackingCode.val();

		var password_change_field = $password_change_field.val();

		var password_confirm_field = $password_confirm_field.val();


		if ( password_change_field === "" && password_confirm_field === "" ) {
			var $element = $("#error_message_all_fields_required");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		}

		if ( password_change_field !== password_confirm_field ) {
			var $element = $("#error_message_password_confirm_password_not_match");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		}

		var requestObj = {
				password : password_change_field,
				resetPasswordTrackingCode : resetPasswordTrackingCode
		};

		const url = "user/rws/for-page/reset-password-change-password";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, doNotHandleErrorResponse : true }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { 
			var $element = $("#error_message_system_error");

			showErrorMsg( $element );
		 }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._resetPasswordComplete(responseData);
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};


	/**
	 * 
	 */
	_resetPasswordComplete(responseData: any) {

		if ( ! responseData.status ) {

//			private boolean invalidUserOrPassword = false;
//			private boolean disabledUser = false;

			if ( responseData.errorMessage ) {

				var $error_message_from_server_text = $("#error_message_from_server_text");
				$error_message_from_server_text.text( responseData.errorMessage );
				var $element = $( "#error_message_from_server" );
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

};


///////////////

$(document).ready(function() {

	//Instance of class
	var userResetPasswordPage = new UserResetPasswordPage();

	try {
		userResetPasswordPage.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
