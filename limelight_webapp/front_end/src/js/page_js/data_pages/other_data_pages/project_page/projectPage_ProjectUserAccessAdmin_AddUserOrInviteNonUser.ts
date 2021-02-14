/**
 * projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Admin Section For User Access - Add User or Invite Non-User to Project
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {ProjectPage_ProjectUserAccessAdminSection} from "page_js/data_pages/other_data_pages/project_page/projectPage_ProjectUserAccessAdminSection";

/**
 * 
 */
export class ProjectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser {

	private _initializeCalled = false;

	private _projectIdentifierFromURL: string;
	private _projectPage_ProjectUserAccessAdminSection: ProjectPage_ProjectUserAccessAdminSection;

	private _existingUserIdForAddProjectAccess = "";

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectPage_ProjectUserAccessAdminSection } : { projectIdentifierFromURL: string, projectPage_ProjectUserAccessAdminSection: ProjectPage_ProjectUserAccessAdminSection } ) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectPage_ProjectUserAccessAdminSection = projectPage_ProjectUserAccessAdminSection;
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


		//  Listen for changes to invite_user_last_name and invite_user_email
		
		const invite_user_last_name_DOM = document.getElementById("invite_user_last_name");
		if ( ! invite_user_last_name_DOM ) {
			throw Error("No DOM element with id 'invite_user_last_name'");
		}
		const invite_user_email_DOM = document.getElementById("invite_user_email");
		if ( ! invite_user_email_DOM ) {
			throw Error("No DOM element with id 'invite_user_email'");
		}
		
		invite_user_last_name_DOM.addEventListener('input', ( eventObject ) => {
			try {
				eventObject.preventDefault();
				// console.log("'input' fired");
				const eventTarget : any = eventObject.target;
				const eventTargetValue = eventTarget.value;
				if ( eventTargetValue !== "" ) {
					
					//  disable invite button
					this._disableInviteButton();

					// has value so clear value in invite_user_email
					const invite_user_email_DOM : any = document.getElementById("invite_user_email");
					if ( ! invite_user_email_DOM ) {
						throw Error("No DOM element with id 'invite_user_email'");
					}
					invite_user_email_DOM.value = "";
				}
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		invite_user_email_DOM.addEventListener('input', ( eventObject ) => {
			try {
				eventObject.preventDefault();
				// console.log("'input' fired");
				const eventTarget : any = eventObject.target;
				const eventTargetValue = eventTarget.value;
				if ( eventTargetValue !== "" ) {

					// has value so enable invite button
					this._enableInviteButton();

					// has value so clear value in invite_user_last_name_DOM
					const invite_user_last_name_DOM : any = document.getElementById("invite_user_last_name");
					if ( ! invite_user_last_name_DOM ) {
						throw Error("No DOM element with id 'invite_user_last_name'");
					}
					invite_user_last_name_DOM.value = "";
				} else {
					//  Not have value so disable invite button
					this._disableInviteButton();
				}
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
	_enableInviteButton() {

		//  Enable Invite button
		const $invite_user_button = $("#invite_user_button");
		$invite_user_button.prop("disabled",false);
		//  Hide cover over Invite Button
		const $invite_user_button_disabled_cover = $("#invite_user_button_disabled_cover");
		$invite_user_button_disabled_cover.hide();
	}

	/**
	 * 
	 */
	_disableInviteButton() {

		//  Disable Invite button
		const $invite_user_button = $("#invite_user_button");
		$invite_user_button.prop("disabled",true);
		//  Show cover over Invite Button
		const $invite_user_button_disabled_cover = $("#invite_user_button_disabled_cover");
		$invite_user_button_disabled_cover.show();
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

		this._disableInviteButton();
	}

	//  Next Method Commented Out since duplicate name of previous method.  Once difference is previous method has 'this._disableInviteButton();'

	// /**
	//  *
	//  */
	// _clearInviteUserFieldsAndAutocompleteDisplay() {
	//
	// 	let $invite_user_auto_complete_display = $("#invite_user_auto_complete_display");
	// 	$invite_user_auto_complete_display.hide();
	//
	// 	this._existingUserIdForAddProjectAccess = "";
	//
	// 	let $invite_user_input_fields = $("#invite_user_input_fields");
	// 	$("#invite_user_input_fields").show();
	//
	// 	let $invite_user_last_name = $("#invite_user_last_name");
	// 	let $invite_user_email = $("#invite_user_email");
	// 	$invite_user_last_name.val("");
	// 	$invite_user_email.val("");
	// }
	
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
		//  add ts ignore since using jQuery plugin
		// @ts-ignore
		$invite_user_last_name.autocomplete({
			source : function(request: any, response: any) {
				if ( objectThis._projectIdentifierFromURL === null) {
					throw Error( "No value for 'projectIdentifierFromURL' " );
				}

				let requestObj = {
					lastNamePrefix : request.term,
					projectIdentifier : objectThis._projectIdentifierFromURL
				};

				const url = "d/rws/for-page/project-users-not-in-project-list";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => {}  );
	
				promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
					try {
						// Call "response" passed into the function defined at "source".
						//         Use jQuery .map(...)
						response( $.map( responseData.userList, function( item ) {
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
				})
			},
			select : function(event: any, ui: any) {
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
			//  add ts ignore since using jQuery plugin
			// @ts-ignore
			$(this).autocomplete("search", "");
		});
	};

	/**
	 * Process autocomplete Value
	 */
	_processChosenUserForAddProjectAccess( { ui, thisValue } : { ui: any, thisValue: any } ) {
		
		var item = ui.item;
		var userId = item.id;
		
		this._existingUserIdForAddProjectAccess = userId;
		
		$("#invite_user_auto_complete_value").text(item.label);
		$("#invite_user_auto_complete_display").show();
		$("#invite_user_input_fields").hide();

		this._enableInviteButton();
	};

	/**
	 * Update DB with Invite
	 */
	_inviteUserToProject( clickThis: any ) {

		let objectThis = this;

//		set above: this._existingUserIdForAddProjectAccess
		
		let projectIdentifier = objectThis._projectIdentifierFromURL;
		
		var $invite_person_to_project_access_level_entry_field = $("#invite_person_to_project_access_level_entry_field");
		if ($invite_person_to_project_access_level_entry_field.length === 0) {
			throw Error( "Unable to find input field for id 'invite_person_to_project_access_level_entry_field' " );
		}
		var invite_person_to_project_access_level_entry_field = $invite_person_to_project_access_level_entry_field.val();
		var requestData : any = {
				invite_person_to_project_access_level_entry_field : invite_person_to_project_access_level_entry_field 
		};
		var ajaxParams : any = {
				invitedPersonAccessLevel : invite_person_to_project_access_level_entry_field,
				projectIdentifier : projectIdentifier
		};
		if ( this._existingUserIdForAddProjectAccess !== "" ) {
			ajaxParams.invitedPersonUserId = this._existingUserIdForAddProjectAccess;
			requestData.existingUserIdForAddProjectAccess = this._existingUserIdForAddProjectAccess;
		} else {
			//  Remove invite_user_last_name input since user must choose an existing last name which this._existingUserIdForAddProjectAccess is then populated
			var $invite_user_email = $("#invite_user_email");
			if ($invite_user_email.length === 0) {
				throw Error( "Unable to find input field for id 'invite_user_email' " );
			}
			var invite_user_email = $invite_user_email.val();
		 	//  Should never occur since button disabled when field is empty
			// if ( invite_user_email === "" ) {
			// }
			ajaxParams.invitedPersonEmail = invite_user_email;
			requestData.invite_user_email = invite_user_email;
		}
		requestData.ajaxParams = ajaxParams;
		
		const url = "d/rws/for-page/project-invite-user-to-project-new-or-existing-user";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : ajaxParams, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._inviteUserToProjectResponse({
					responseData : responseData,
					requestData : requestData
				});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	_inviteUserToProjectResponse( { requestData, responseData } : { requestData: any, responseData: any }  ) {

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

