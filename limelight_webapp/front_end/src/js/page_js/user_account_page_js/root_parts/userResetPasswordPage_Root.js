/**
 * userResetPasswordPage_Root.js
 * 
 * Javascript for resetPasswordLandingPage.jsp page  
 * 
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';


import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

/**
 * 
 */
class UserResetPasswordPage {

	/**
	 * 
	 */
	constructor() {
		this._initializeCalled = false;

	}

	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {

		const objectThis = this;

		initShowHideErrorMessage();
		catchAndReportGlobalOnError.init();

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

		var _URL = "user/rws/for-page/reset-password-change-password/" + getWebserviceSyncTrackingCode();

		var requestData = JSON.stringify( requestObj );
		
//		var request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType: _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(data) {
				try {
					objectThis._resetPasswordComplete(requestData, data);
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure : function(errMsg) {
				var $element = $("#error_message_system_error");

				showErrorMsg( $element );

//				alert(errMsg);

			},
			error : function(jqXHR, textStatus, errorThrown) {

				var $element = $("#error_message_system_error");

				showErrorMsg( $element );

//				handleAJAXError(jqXHR, textStatus, errorThrown);

//				alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
//				textStatus: " + textStatus );
			}
		});
	};


	/**
	 * 
	 */
	_resetPasswordComplete(requestData, responseData) {

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
