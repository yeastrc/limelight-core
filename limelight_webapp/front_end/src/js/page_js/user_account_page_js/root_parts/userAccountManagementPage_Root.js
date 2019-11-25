/**
 * userAccountManagementPage_Root.js
 * 
 * Javascript for userAccountManagement.jsp page  
 * 
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 


///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError.js';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


const UPDATE_WEBSERVICE_URL = "user/rws/for-page/user-change-account-info";

const USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL = "user/rws/for-page/user-submit-import-key-manage";
const USER_SUBMIT_IMPORT_KEY_GET_WEBSERVICE_URL = "user/rws/for-page/user-submit-import-key-get";

/**
 * 
 */
class UserAccountManagementPage {

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

		var $edit_value_jq = $(".edit_value_jq");
		$edit_value_jq.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.editValue( clickThis );
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $cancel_button_jq = $(".cancel_button_jq");
		$cancel_button_jq.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.closeEditValue( clickThis );
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $submit_first_name_change_button = $("#submit-first-name-change-button");
		$submit_first_name_change_button.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.updateFirstName(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $submit_last_name_change_button = $("#submit-last-name-change-button");
		$submit_last_name_change_button.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.updateLastName(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $submit_organization_change_button = $("#submit-organization-change-button");
		$submit_organization_change_button.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.updateOrganization(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $submit_email_change_button = $("#submit-email-change-button");
		$submit_email_change_button.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.updateEmail(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $submit_username_change_button = $("#submit-username-change-button");
		$submit_username_change_button.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.updateUsername(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		var $submit_password_change_button = $("#submit-password-change-button");
		$submit_password_change_button.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis.updatePassword(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		$(document).click( function(eventObject) {
			try {
				hideAllErrorMessages();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		this.initialize_submit_import_program_key_mgmt_block();
	}
	
	/**
	 * 
	 */
	initialize_submit_import_program_key_mgmt_block() {
		
		const objectThis = this;
		
		let $submit_import_program_key_mgmt_block = $("#submit_import_program_key_mgmt_block");
		if ( $submit_import_program_key_mgmt_block.length === 0 ) {
			// No block so exit
			return;  // EARLY EXIT
		}
		
		const $submit_import_program_key_add_key__control = $("#submit_import_program_key_add_key__control");
		$submit_import_program_key_add_key__control.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis._addSubmitImportProgramKey(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		const $submit_import_program_key_change_key__control = $("#submit_import_program_key_change_key__control");
		$submit_import_program_key_change_key__control.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis._changeSubmitImportProgramKey(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		const $submit_import_program_key_remove_key__control = $("#submit_import_program_key_remove_key__control");
		$submit_import_program_key_remove_key__control.click( function(eventObject) {
			try {
				var clickThis = this;
				hideAllErrorMessages();
				objectThis._removeSubmitImportProgramKey(clickThis, eventObject);	
				eventObject.preventDefault();  // stop click bubble up.
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		this._getExistingSubmitImportProgramKey();
	}

	/**
	 * 
	 */
	_getExistingSubmitImportProgramKey() {

		const objectThis = this;
		
		var requestData = {};

		const url = "user/rws/for-page/user-submit-import-key-get";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
				
		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._getExistingSubmitImportProgramKey_AJAX_Complete( { requestData: requestData, responseData: responseData } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
	}


	/**
	 * 
	 */
	_getExistingSubmitImportProgramKey_AJAX_Complete( { responseData } ) {
	
		if ( ! responseData.status ) {
			
			throw Error( "if ( ! responseData.status ) " );
		}
		
		const existingSubmitImportProgramKey = responseData.existingKey;
		
		if ( existingSubmitImportProgramKey === undefined ||
				existingSubmitImportProgramKey === null ||
				existingSubmitImportProgramKey === "" ) {
			
			//  No Value so show block for "Add Key"
			const $submit_import_program_key_add_key__block = $("#submit_import_program_key_add_key__block");
			$submit_import_program_key_add_key__block.show();
			
			//  Hide other block
			const $submit_import_program_key_change_remove_key__block = $("#submit_import_program_key_change_remove_key__block");
			$submit_import_program_key_change_remove_key__block.hide();
			
		} else {
			
			//  Have value so display it and buttons for "Change Key" and "Remove Key"
			const $submit_import_program_key_change_remove_key__block = $("#submit_import_program_key_change_remove_key__block");
			$submit_import_program_key_change_remove_key__block.show();

			//  Hide other block
			const $submit_import_program_key_add_key__block = $("#submit_import_program_key_add_key__block");
			$submit_import_program_key_add_key__block.hide();

			//  Show key value
			const $submit_import_program_key_current_key = $("#submit_import_program_key_current_key");
			$submit_import_program_key_current_key.text( existingSubmitImportProgramKey );
			
			
		}

		const $submit_import_program_key_mgmt_block = $("#submit_import_program_key_mgmt_block");
		$submit_import_program_key_mgmt_block.show();
		
	}

	/**
	 * 
	 */
	_addSubmitImportProgramKey(clickThis, eventObject) {

		let objectThis = this;

		var requestData = {
				createKey : true
		};

		const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._getExistingSubmitImportProgramKey( { requestData: requestData, responseData, clickThis: clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_changeSubmitImportProgramKey(clickThis, eventObject) {

		let objectThis = this;
		
		if ( ! window.confirm("Change Key?" ) ) {
			return;
		}
		
		const $submit_import_program_key_current_key = $("#submit_import_program_key_current_key");
		if ($submit_import_program_key_current_key.length === 0) {
			throw Error( "Unable to find input field for id 'submit_import_program_key_current_key' " );
		}
		const submit_import_program_key_current_key = $submit_import_program_key_current_key.text();

		var requestData = {
				replaceKey : true,
				existingKey : submit_import_program_key_current_key
		};

		const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._getExistingSubmitImportProgramKey( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_removeSubmitImportProgramKey(clickThis, eventObject) {

		let objectThis = this;

		if ( ! window.confirm("Remove Key?" ) ) {
			return;
		}
		
		const $submit_import_program_key_current_key = $("#submit_import_program_key_current_key");
		if ($submit_import_program_key_current_key.length === 0) {
			throw Error( "Unable to find input field for id 'submit_import_program_key_current_key' " );
		}
		const submit_import_program_key_current_key = $submit_import_program_key_current_key.text();

		var requestData = {
				deleteKey : true,
				existingKey : submit_import_program_key_current_key
		};

		const url = USER_SUBMIT_IMPORT_KEY_MANAGE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._getExistingSubmitImportProgramKey( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}
	
	/**
	 * 
	 */
	updateFirstName(clickThis, eventObject) {

		let objectThis = this;

		var $firstName = $("#first-name-change-field");
		if ($firstName.length === 0) {
			throw Error( "Unable to find input field for id 'first-name-change-field' " );
		}
		var firstName = $firstName.val();
		if ( firstName === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		var requestData = {
				firstName : firstName
		};

		const url = UPDATE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.updateFirstNameComplete( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	updateFirstNameComplete( params ) {
		
		var requestData = params.requestData;
		var responseData = params.responseData;
		var clickThis = params.clickThis; 
		if ( ! responseData.status ) {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			return;
		} 
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$current_value_span_jq.text( requestData.firstName );
		$("#header-user-first-name").text( requestData.firstName );
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
	};

	/**
	 * 
	 */
	updateLastName(clickThis, eventObject) {

		let objectThis = this;

		var $lastName = $("#last-name-change-field");
		if ($lastName.length === 0) {
			throw Error( "Unable to find input field for id 'last-name-change-field' " );
		}
		var lastName = $lastName.val();
		if ( lastName === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		var requestData = {
				lastName : lastName
		};

		const url = UPDATE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.updateLastNameComplete( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	updateLastNameComplete( params ) {
		
		var requestData = params.requestData;
		var responseData = params.responseData;
		var clickThis = params.clickThis; 
		if ( ! responseData.status ) {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			return;
		} 
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$current_value_span_jq.text( requestData.lastName );
		$("#header-user-last-name").text( requestData.lastName );
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
	};

	/**
	 * 
	 */
	updateOrganization(clickThis, eventObject) {
		
		let objectThis = this;

		var $organization = $("#organization-change-field");
		if ($organization.length === 0) {
			throw Error( "Unable to find input field for id 'organization-change-field' " );
		}
		var organization = $organization.val();
		if ( organization === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		var requestData = {
				organization : organization
		};

		const url = UPDATE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.updateOrganizationComplete( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	updateOrganizationComplete( params ) {
		
		var requestData = params.requestData;
		var responseData = params.responseData;
		var clickThis = params.clickThis; 
		if ( ! responseData.status ) {
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			return;
		} 
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$current_value_span_jq.text( requestData.organization );
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
	};

	/**
	 * 
	 */
	updateEmail(clickThis, eventObject) {
		
		let objectThis = this;

		var $email = $("#email-change-field");
		if ($email.length === 0) {
			throw Error( "Unable to find input field for id 'email-change-field' " );
		}
		var email = $email.val();
		if ( email === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		var requestData = {
				email : email
		};

		const url = UPDATE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.updateEmailComplete( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	updateEmailComplete( params ) {
		
		var requestData = params.requestData;
		var responseData = params.responseData;
		var clickThis = params.clickThis; 
		if ( ! responseData.status ) {
			if ( responseData.emailValueAlreadyExists ) {
				var $element = $("#error_message_email_already_exists");
				showErrorMsg( $element );
//				alert("error_message_email_already_exists");
			} else {
				var $element = $("#error_message_system_error");
				showErrorMsg( $element );
			}
			return;
		} 
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$current_value_span_jq.text( requestData.email );
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
	};

	/**
	 * 
	 */
	updateUsername(clickThis, eventObject) {
		
		let objectThis = this;

		var $username = $("#username-change-field");
		if ($username.length === 0) {
			throw Error( "Unable to find input field for id 'username-change-field' " );
		}
		var username = $username.val();
		if ( username === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		var requestData = {
				username : username
		};

		const url = UPDATE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.updateUsernameComplete( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	updateUsernameComplete( params ) {
		
		var requestData = params.requestData;
		var responseData = params.responseData;
		var clickThis = params.clickThis; 
		if ( ! responseData.status ) {
			if ( responseData.emailValueAlreadyExists ) {
				var $element = $("#error_message_username_already_exists");
				showErrorMsg( $element );
//				alert("error_message_username_already_exists");
			} else {
				var $element = $("#error_message_system_error");
				showErrorMsg( $element );
			}
			return;
		} 
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$current_value_span_jq.text( requestData.username );
		$("#header-user-user-name").text( requestData.username );
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
	};

	/**
	 * 
	 */
	updatePassword(clickThis, eventObject) {
		
		let objectThis = this;

		var $password = $("#password-change-field");
		if ($password.length === 0) {
			throw Error( "Unable to find input field for id 'password-change-field' " );
		}
		var $passwordConfirm = $("#password-confirm-field");
		if ($passwordConfirm.length === 0) {
			throw Error( "Unable to find input field for id 'password-confirm-field' " );
		}
		var $oldPassword = $("#password-change-old-password-field");
		if ($oldPassword.length === 0) {
			throw Error( "Unable to find input field for id 'password-change-old-password-field' " );
		}
		var password = $password.val();
		var passwordConfirm = $passwordConfirm.val();
		var oldPassword = $oldPassword.val();
		if ( oldPassword === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		if ( password === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		if ( passwordConfirm === "" ) {
			var $element = $("#error_message_field_empty");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		if ( password !== passwordConfirm ) {
			var $element = $("#error_message_password_confirm_not_match");
			showErrorMsg( $element );
			return;  //  !!!  EARLY EXIT
		} 
		var requestData = {
				password : password,
				oldPassword : oldPassword
		};

		const url = UPDATE_WEBSERVICE_URL;

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.updatePasswordComplete( { requestData, responseData, clickThis } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	updatePasswordComplete( params ) {
		
		var requestData = params.requestData;
		var responseData = params.responseData;
		var clickThis = params.clickThis; 
		if ( ! responseData.status ) {
			if ( responseData.oldPasswordInvalid ) {
				var $element = $("#error_message_old_password_invalid");
				showErrorMsg( $element );
				//  Set focus on old password
				var $oldPassword = $("#password-change-old-password-field");
				if ($oldPassword.length === 0) {
					throw Error( "Unable to find input field for id 'password-change-old-password-field' " );
				}
				$oldPassword.focus();
				return;
			}
			var $element = $("#error_message_system_error");
			showErrorMsg( $element );
			return;
		} 
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$current_value_span_jq.text( requestData.password );
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
		var $password = $("#password-change-field");
		if ($password.length === 0) {
			throw Error( "Unable to find input field for id 'password-change-field' " );
		}
		var $passwordConfirm = $("#password-confirm-field");
		if ($passwordConfirm.length === 0) {
			throw Error( "Unable to find input field for id 'password-confirm-field' " );
		}
		///  Clear the entry fields
		$password.val("");
		$passwordConfirm.val("");
	};

	/**
	 * 
	 */
	editValue( clickThis ) {
		
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $current_value_span_jq = $value_container_jq.find(".current_value_span_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		var $edit_value_input_field_jq = $value_container_jq.find(".edit_value_input_field_jq");
		if ( $current_value_span_jq.length !== 0 ) {
			var currentValue = $current_value_span_jq.text();
			$edit_value_input_field_jq.val( currentValue );
		}
		$current_value_container_jq.hide();
		$edit_value_container_jq.show();
	};

	/**
	 * 
	 */
	closeEditValue( clickThis ) {
		
		var $clickThis = $(clickThis);
		var $value_container_jq = $clickThis.closest(".value_container_jq");
		var $current_value_container_jq = $value_container_jq.find(".current_value_container_jq");
		var $edit_value_container_jq = $value_container_jq.find(".edit_value_container_jq");
		$edit_value_container_jq.hide();
		$current_value_container_jq.show();
	};
}


///////////////

$(document).ready(function() {

//	Instance of class
	var userAccountManagementPage = new UserAccountManagementPage();

	try {
		userAccountManagementPage.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
