/**
 * projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Admin Section For User Access - Add User or Invite Non-User to Project
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

let Handlebars = require('handlebars/runtime');

//  Import Handlebars templates

let _project_user_list_current_user_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/project_page_searches_section_researcher_user_interaction/project_page_searches_section_researcher_user_interaction_template-bundle.js");

//Required on Page Level JS
Handlebars.templates = _project_user_list_current_user_template_bundle;

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';

/**
 * 
 */
export class ProjectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser {

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectPage_ProjectUserAccessAdminSection } ) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectPage_ProjectUserAccessAdminSection = projectPage_ProjectUserAccessAdminSection;
		
		this._existingUserIdForAddProjectAccess = "";
	}

	/**
	 * 
	 */
	initialize() {
		
		let objectThis = this;

		let $invite_user_collapsed = $("#invite_user_collapsed");
		
		//  Click handler for Showing the "Invite User" block
		let $invite_user_expand_link_jq_All = $invite_user_collapsed.find(".invite_user_expand_link_jq");
		$invite_user_expand_link_jq_All.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				hideAllErrorMessages();
				let clickedThis = this;
				objectThis._showExpandInviteBlock();
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
		
		let $invite_user_expanded = $("#invite_user_expanded");

		//  Click handler for Hiding the "Invite User" block
		let $invite_user_cancel_button_jq_All = $invite_user_expanded.find(".invite_user_cancel_button_jq");
		$invite_user_cancel_button_jq_All.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				hideAllErrorMessages();
//				let clickedThis = this;
				objectThis._inviteUserCancelButtonClicked();
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
		
		let $invite_user_button = $("#invite_user_button"); 
		$invite_user_button.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				hideAllErrorMessages();
				var clickThis = this;
				objectThis._inviteUserToProject( clickThis );
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $close_invite_user_auto_complete_display = $("#close_invite_user_auto_complete_display");
		$close_invite_user_auto_complete_display.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				hideAllErrorMessages();
				// var clickThis = this;
				objectThis._clearInviteUserFieldsAndAutocompleteDisplay();
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		this._initInviteUserLastNameAutoComplete();
		
	};

	/**
	 * 
	 */
	_showExpandInviteBlock() {
		
		let $invite_user_collapsed = $("#invite_user_collapsed");
		let $invite_user_expanded = $("#invite_user_expanded");
		$invite_user_collapsed.hide();
		$invite_user_expanded.show();
	}

	/**
	 * 
	 */
	_inviteUserCancelButtonClicked() {
		
		this._clearInviteUserFieldsAndAutocompleteDisplay();
		
		let $invite_user_collapsed = $("#invite_user_collapsed")
		let $invite_user_expanded = $("#invite_user_expanded")
		$invite_user_collapsed.show();
		$invite_user_expanded.hide();
	}
	
	/**
	 * 
	 */
	_clearInviteUserFieldsAndAutocompleteDisplay() {
		
		let $invite_user_auto_complete_display = $("#invite_user_auto_complete_display");
		$invite_user_auto_complete_display.hide();
		
		this._existingUserIdForAddProjectAccess = "";
		
		let $invite_user_input_fields = $("#invite_user_input_fields");
		$invite_user_input_fields.show();
		
		let $invite_user_last_name = $("#invite_user_last_name");
		let $invite_user_email = $("#invite_user_email");
		$invite_user_last_name.val("");
		$invite_user_email.val("");
	}

	/**
	 * 
	 */
	_clearInviteUserFieldsAndAutocompleteDisplay() {
		
		let $invite_user_auto_complete_display = $("#invite_user_auto_complete_display"); 
		$invite_user_auto_complete_display.hide();
		
		this._existingUserIdForAddProjectAccess = "";
		
		let $invite_user_input_fields = $("#invite_user_input_fields");
		$("#invite_user_input_fields").show();
		
		let $invite_user_last_name = $("#invite_user_last_name");
		let $invite_user_email = $("#invite_user_email");
		$invite_user_last_name.val("");
		$invite_user_email.val("");
	}
	
	/**
	 * Set up autocomplete for add user by Last Name to project
	 */
	_initInviteUserLastNameAutoComplete() {
		
		let objectThis = this;
		
		// Autocomplete support for searching for a key to assign
		var $invite_user_last_name = $("#invite_user_last_name");
		if ($invite_user_last_name.length === 0) {
			console.log( "Unable to find input field for id 'invite_user_last_name' to attach autocomplete, probably since project is locked " );
			return;  // Exit since input field is not on the page, probably since project is locked. 
//			throw Error( "Unable to find input field for id 'invite_user_last_name' " );
		}
		$invite_user_last_name.autocomplete({
			source : function(request, response) {
				if ( objectThis._projectIdentifierFromURL === null) {
					throw Error( "No value for 'projectIdentifierFromURL' " );
				}

				let _URL = "d/rws/for-page/project-users-not-in-project-list/" + getWebserviceSyncTrackingCode();

				let requestObj = {
					lastNamePrefix : request.term,
					projectIdentifier : objectThis._projectIdentifierFromURL
				};

				let requestData = JSON.stringify(requestObj);

				$.ajax({
					type : "POST",
					url : _URL,
					data : requestData,
					contentType : _AJAX_POST_JSON_CONTENT_TYPE,
					dataType : "json",
					success : function(data) {
						try {
							// Call "response" passed into the function defined at "source".
							//         Use jQuery .map(...)
							response( $.map( data.userList, function( item ) {
								return {
									label : item.lastName + ", " + item.firstName,
									value : item.lastName,
									id : item.userId
								};
							}));
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					},
					failure: function(errMsg) {
						handleAJAXFailure( errMsg );
					},
					error : function(jqXHR, textStatus, errorThrown) {
						handleAJAXError(jqXHR, textStatus, errorThrown);
					}
				});
			},
			select : function(event, ui) {
				// var $this = $(this);
				var thisValue = this.value;
				objectThis._processChosenUserForAddProjectAccess( { ui, thisValue } );
			},
			// open: function() {
			// $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			// },
			// close: function() {
			// $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			// },
			minLength : 0
			// minLength: 1
		}).focus(function() {
			// This searches on focus to search the autocomplete with no data
			$(this).autocomplete("search", "");
		});
	};

	/**
	 * Process autocomplete Value
	 */
	_processChosenUserForAddProjectAccess( { ui, thisValue } ) {
		
		var item = ui.item;
		var userId = item.id;
		
		this._existingUserIdForAddProjectAccess = userId;
		
		$("#invite_user_auto_complete_value").text(item.label);
		$("#invite_user_auto_complete_display").show();
		$("#invite_user_input_fields").hide();
	};

	/**
	 * Update DB with Invite
	 */
	_inviteUserToProject( clickThis ) {

		let objectThis = this;

//		set above: this._existingUserIdForAddProjectAccess
		
		let projectIdentifier = objectThis._projectIdentifierFromURL;
		
		var $invite_person_to_project_access_level_entry_field = $("#invite_person_to_project_access_level_entry_field");
		if ($invite_person_to_project_access_level_entry_field.length === 0) {
			throw Error( "Unable to find input field for id 'invite_person_to_project_access_level_entry_field' " );
		}
		var invite_person_to_project_access_level_entry_field = $invite_person_to_project_access_level_entry_field.val();
		var requestData = { 
				invite_person_to_project_access_level_entry_field : invite_person_to_project_access_level_entry_field 
		};
		var ajaxParams = {
				invitedPersonAccessLevel : invite_person_to_project_access_level_entry_field,
				projectIdentifier : projectIdentifier
		};
		if ( this._existingUserIdForAddProjectAccess !== "" ) {
			ajaxParams.invitedPersonUserId = this._existingUserIdForAddProjectAccess;
			requestData.existingUserIdForAddProjectAccess = this._existingUserIdForAddProjectAccess;
		} else {
			var $invite_user_last_name = $("#invite_user_last_name");
			if ($invite_user_last_name.length === 0) {
				throw Error( "Unable to find input field for id 'invite_user_last_name' " );
			}
			var $invite_user_email = $("#invite_user_email");
			if ($invite_user_email.length === 0) {
				throw Error( "Unable to find input field for id 'invite_user_email' " );
			}
			var invite_user_last_name = $invite_user_last_name.val();
			var invite_user_email = $invite_user_email.val();
			if ( invite_user_last_name === "" && invite_user_email === "" ) {
//				alert("last name or email must be specified");
				var $element = $("#error_message_invite_name_or_email_required");
				showErrorMsg( $element );
				return false;  //  !!!  EARLY EXIT			
			}
			if ( invite_user_last_name !== "" && invite_user_email !== "" ) {
//				alert("last name and email cannot both be specified");
				var $element = $("#error_message_invite_name_and_email_have_values");
				showErrorMsg( $element );
				return false;  //  !!!  EARLY EXIT	
			}
			ajaxParams.invitedPersonLastName = invite_user_last_name;
			ajaxParams.invitedPersonEmail = invite_user_email;
			requestData.invite_user_last_name = invite_user_last_name;
			requestData.invite_user_email = invite_user_email;
		}
		requestData.ajaxParams = ajaxParams;
		
		var _URL = "d/rws/for-page/project-invite-user-to-project-new-or-existing-user/" + getWebserviceSyncTrackingCode();;

		let ajaxParamsJSON = JSON.stringify( ajaxParams );

		$.ajax({
			type : "POST",
			url : _URL,
			data : ajaxParamsJSON,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(data) {
				try {
					objectThis._inviteUserToProjectResponse({
						responseData : data,
						requestData : requestData,
						clickThis : clickThis
					});
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error : function(jqXHR, textStatus, errorThrown) {
				handleAJAXError(jqXHR, textStatus, errorThrown);
				// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
				// textStatus: " + textStatus );
			}
		});
	};

	/**
	 * 
	 */
	_inviteUserToProjectResponse( { requestData, responseData } ) {

		if (responseData.status) {
			this._clearInviteUserFieldsAndAutocompleteDisplay();
			
			var addedExistingUser = responseData.addedExistingUser;
			var existingUserThatWasAdded = responseData.existingUserThatWasAdded;
			var invite_user_email = requestData.invite_user_email;
			if ( addedExistingUser ) {
				if ( existingUserThatWasAdded ) {
//					var firstName = existingUserThatWasAdded.firstName;
//					var lastName = existingUserThatWasAdded.lastName;
//					alert( "Access to project added for " + firstName + " " + lastName );
				} else {
//					alert( "Access to project added for provided user" );
				}
			} else {
//				alert( "email sent to " + invite_user_email  + " inviting them to this project" );
				$("#invite_user_email_that_was_sent").text( invite_user_email );
				var $element = $("#success_message_invite_email_sent");
				showErrorMsg( $element );  //  Used for success messages as well
			}	
			
			this._projectPage_ProjectUserAccessAdminSection.updateInvitedPeopleCurrentUsersLists();
			
		} else {
//			status: false
//			addedExistingUser: false
//			duplicateInsertError: false
//			emailAddressDuplicateError: false
//			emailAddressInvalidSendError: false
//			emailSent: false
//			existingUserThatWasAdded: null
//			lastNameDuplicateError: false
//			lastNameNotFoundError: true
//			unableToSendEmailError: false
			if (responseData.duplicateInsertError) {
//				alert("User already has access to this project");
				var $element = $("#error_message_invite_already_has_access");
				showErrorMsg( $element );
			} else if (responseData.lastNameNotFoundError ) {
//				alert("Unable to send email, email address is invalid.");
				var $element = $("#error_message_invite_name_not_found");
				showErrorMsg( $element );			
			} else if (responseData.lastNameDuplicateError ) {
				//  More than one user has this last name
//				alert("Unable to send email, email address is invalid.");
				var $element = $("#error_message_invite_name_duplicate");
				showErrorMsg( $element );	
			} else if (responseData.emailAddressInvalidSendError ) {
//				alert("Unable to send email, email address is invalid.");
				var $element = $("#error_message_invite_email_address_invalid");
				showErrorMsg( $element );
			} else if (responseData.unableToSendEmailError ) {
//				alert("Unable to send email, system error.");
				var $element = $("#error_message_invite_email_send_sytem_error");
				showErrorMsg( $element );
			} else {
//				alert("Error adding user to project");
				var $element = $("#error_message_invite_error_adding_user_to_project");
				showErrorMsg( $element );
			}
		}
	};

}
