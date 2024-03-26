/**
 * manageUsersForAdminPage_Main.ts
 * 
 * Javascript for webappAdminManageUsers.jsp page  
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

const adminGlobals = {
	logged_in_user_id : null
};


let _refresh_UserList_Callback_LOCAL: ()  => void


export const manageUsersForAdminPage_Main__Init = function(
	{
		refresh_UserList_Callback
	} : {
		refresh_UserList_Callback: ()  => void
	}
) {

	_refresh_UserList_Callback_LOCAL = refresh_UserList_Callback

	var $logged_in_user_id = $("#logged_in_user_id");
	if ( $logged_in_user_id.length === 0 ) {
		throw Error( "Unable to find hidden field '#logged_in_user_id'" );
	}
	var logged_in_user_id = $("#logged_in_user_id").val();
	if (logged_in_user_id === undefined || logged_in_user_id === null
		|| logged_in_user_id === "") {
		throw Error( "No value in hidden field '#logged_in_user_id' " );
	}
	try {
		const logged_in_user_id_ANY : any = logged_in_user_id
		adminGlobals.logged_in_user_id = parseInt(logged_in_user_id_ANY, 10);
	} catch (ex) {
		throw Error( "failed to parse logged_in_user_id: " + logged_in_user_id );
	}
	if ( isNaN( adminGlobals.logged_in_user_id ) ) {
		throw Error( "failed to parse logged_in_user_id (parse to NaN): " + logged_in_user_id );
	}

	{ // Submit of Create Account Form

		const $create_account_form = $("#create_account_form");

		$create_account_form.submit(function(event) {
			try {
				event.preventDefault(); // to stop the form from submitting

				createAccountFormSubmit();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	$(".create_user_expand_link_jq").click(function(eventObject) {
		try {
			$("#create_user_collapsed").hide();
			$("#create_user_expanded").show();
			return false;
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	});
	$(".create_user_cancel_button_jq").click(function(eventObject) {
		try {
			$("#create_user_collapsed").show();
			$("#create_user_expanded").hide();
			return false;
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	});
};



/////////////

//  Create User


///////////////////
const createAccountGetFormDataAndValidate = function() {

	try {
		hideAllErrorMessages();
		var $create_person_access_level_entry_field = $("#create_person_access_level_entry_field");
		if ($create_person_access_level_entry_field.length === 0) {
			throw Error( "Unable to find input field for id 'create_person_access_level_entry_field' " );
		}
		var accessLevel = $create_person_access_level_entry_field.val();
		
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
				passwordConfirm === "" ) {
			var $element = $("#error_message_all_fields_required");
			showErrorMsg( $element );
			return null;  //  !!!  EARLY EXIT
		} 
		if ( password !== passwordConfirm ) {
			var $element = $("#error_message_password_confirm_password_not_match");
			showErrorMsg( $element );
			return null;  //  !!!  EARLY EXIT
		} 

		var formPageData = {
				accessLevel : accessLevel,
				firstName : firstName,
				lastName :  lastName,
				organization :  organization,
				email :  email,
				username :  username,
				password :  password
		};

		return formPageData;

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}
};



const createAccountFormSubmit = function() {

	const requestData = createAccountGetFormDataAndValidate();
	if ( requestData === null ) {  //  Error in form data so exit
		return;  //  EARLY EXIT
	}
  
	const url = "user/rws/for-page/create-account-performed-by-admin-user";

	const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

	const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

	promise_webserviceCallStandardPost.catch( () => {  }  );

	promise_webserviceCallStandardPost.then( ({ responseData }) => {
		try {
            createAccountComplete({
				responseData : responseData
			});
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    } );
};

const createAccountComplete = function( params ) {
	var responseData = params.responseData;
	
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

	_refresh_UserList_Callback_LOCAL();
};

