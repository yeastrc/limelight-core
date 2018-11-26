/**
 * projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Admin Section For User Access - List people invited to project
 * 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

let Handlebars = require('handlebars/runtime');

//  Import Handlebars templates

let _project_page_searches_section_researcher_user_interaction_template_bundle = 
	require("../../../../../../handlebars_templates_precompiled/project_page_searches_section_researcher_user_interaction/project_page_searches_section_researcher_user_interaction_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage.js';


/**
 * 
 */
export class ProjectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople {

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL } ) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;
	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;

		if ( ! _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person ) {
			throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person");
		}
		this._project_user_list_invited_person_template = _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person;

		if ( ! _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person_bottom_separator ) {
			throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person_bottom_separator");
		}
		this._project_user_list_invited_person_bottom_separator_template =  _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person_bottom_separator;
	};

	/**
	 * 
	 */
	displayInvitedPeopleForProject() {

		let objectThis = this;

		let _URL = "d/rws/for-page/project-view-page-user-invite-list/" + getWebserviceSyncTrackingCode();

		let requestObj = {
			projectIdentifier : this._projectIdentifierFromURL
		};

		let requestData = JSON.stringify(requestObj);

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(responseData) {
				try {
					objectThis._displayInvitedPeopleForProject_ProcessAJAXResponse({
						requestData ,
						responseData
					});

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			},
			failure : function(errMsg) {
				handleAJAXFailure(errMsg);
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
	_displayInvitedPeopleForProject_ProcessAJAXResponse( { requestData, responseData } ) {

		let objectThis = this;
		
		let userInviteList = responseData.userInviteList;

		if ( ! userInviteList ) {
			//  No userInviteList for identifier

			return; // EARY EXIT
		}
		
		let $project_users = $("#project_users");

		let $invited_person_entry_jq_List = $project_users.find(".invited_person_entry_jq");

		$invited_person_entry_jq_List.remove();
		
		if (userInviteList && userInviteList.length > 0) {

			//  Sort list on invitedUserEmail in reverse order since will prepend them in the loop
			userInviteList.sort(function(a, b) {
				return ( - ( a.invitedUserEmail ).localeCompare( b.invitedUserEmail ) );
			})

			let canRemoveAnyOfEntries = false;
			let canPromoteDemoteAnyOfEntries = false;
			
			userInviteList.forEach( function( userItem, index, array ) {

				if ( userItem.canRemoveEntry ) {
					canRemoveAnyOfEntries = true;
				}
				if ( userItem.canDemoteEntry || userItem.canPromoteEntry ) {
					canPromoteDemoteAnyOfEntries = true;
				}
			}, this);

			userInviteList.forEach( function( userInviteItem, index, array ) {

				//  Add bottom separator first since "prepend"
				
				let item_bottom_separator_HTML = this._project_user_list_invited_person_bottom_separator_template( {} );
				const $item_bottom_separator = $( item_bottom_separator_HTML );
				$item_bottom_separator.prependTo( $project_users );
				
				let context = {
						userInviteItem : userInviteItem,
						canRemoveAnyOfEntries : canRemoveAnyOfEntries,
						canPromoteDemoteAnyOfEntries : canPromoteDemoteAnyOfEntries
				};

				let search_entry_HTML = this._project_user_list_invited_person_template( context );
				
				const $search_entry = $( search_entry_HTML );

				$search_entry.prependTo( $project_users );
				
				
				//  Click handler for revoking a project invite
				let $revoke_project_invite_control_jq = $search_entry.find(".revoke_project_invite_control_jq");
				$revoke_project_invite_control_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let inviteTrackingId = userInviteItem.inviteId;
						objectThis._revokeProjectInvite( { clickedThis, inviteTrackingId } );
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({
							errorException : e
						});
						throw e;
					}
				});
				
				//  Click handler for an invite to Researcher (Assistant Project Owner)
				let $change_to_assistant_owner_control_jq = $search_entry.find(".change_to_assistant_owner_control_jq");
				$change_to_assistant_owner_control_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let inviteTrackingId = userInviteItem.inviteId;
						objectThis._changeUserInviteToAssistantProjectOwner( { clickedThis, inviteTrackingId } );
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({
							errorException : e
						});
						throw e;
					}
				});
				//  Click handler for an invite to Project Owner
				let $change_to_owner_control_jq = $search_entry.find(".change_to_owner_control_jq");
				$change_to_owner_control_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let inviteTrackingId = userInviteItem.inviteId;
						objectThis._changeUserInviteToProjectOwner( { clickedThis, inviteTrackingId } );
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({
							errorException : e
						});
						throw e;
					}
				});
				
				//  Click handler for resending an email for a project invite
				let $resend_invite_email_button_jq = $search_entry.find(".resend_invite_email_button_jq");
				$resend_invite_email_button_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let inviteTrackingId = userInviteItem.inviteId;
						objectThis._resendProjectInviteEmail( { clickedThis, inviteTrackingId } );
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({
							errorException : e
						});
						throw e;
					}
				});

			}, this);
		}
	}

	/**
	 * 
	 */
	_revokeProjectInvite( { clickedThis, inviteTrackingId } ) {
		
		const userConfirm = window.confirm( "Revoke Invitation?" );
		
		if ( ! userConfirm ) {
			return;
		}

		let objectThis = this;

		let _URL = "d/rws/for-page/project-invite-revoke/" + getWebserviceSyncTrackingCode();

		let requestObj = {
				inviteTrackingId : inviteTrackingId
		};

		let requestData = JSON.stringify(requestObj);

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(responseData) {
				try {
					objectThis._revokeProjectInvite_ProcessAJAXResponse({
						requestData ,
						responseData
					});

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			},
			failure : function(errMsg) {
				handleAJAXFailure(errMsg);
			},
			error : function(jqXHR, textStatus, errorThrown) {

				handleAJAXError(jqXHR, textStatus, errorThrown);

			// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
			// textStatus: " + textStatus );
			}
		});
		
	}

	/**
	 * 
	 */
	_revokeProjectInvite_ProcessAJAXResponse({requestData, responseData}) {

		//  refresh display
		this.displayInvitedPeopleForProject();
	}

	/**
	 * 
	 */
	_resendProjectInviteEmail( { clickedThis, inviteTrackingId } ) {
		
		let objectThis = this;

		let _URL = "d/rws/for-page/project-invite-resend-invite-email/" + getWebserviceSyncTrackingCode();

		let requestObj = {
				inviteId : inviteTrackingId
		};

		let requestData = JSON.stringify(requestObj);

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(responseData) {
				try {
					objectThis._resendProjectInviteEmail_ProcessAJAXResponse({
						requestData ,
						responseData
					});

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			},
			failure : function(errMsg) {
				handleAJAXFailure(errMsg);
			},
			error : function(jqXHR, textStatus, errorThrown) {

				handleAJAXError(jqXHR, textStatus, errorThrown);

			// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
			// textStatus: " + textStatus );
			}
		});
		
	}

	/**
	 * 
	 */
	_resendProjectInviteEmail_ProcessAJAXResponse({requestData, responseData}) {

		if (responseData.status) {

			//  Display msg
			var $element = $("#success_message_invite_email_re_sent");
			showErrorMsg( $element );  //  Used for success messages as well
		
		} else {
			//		alert("Unable to send email, system error.");
			var $element = $("#error_message_invite_email_re_send_sytem_error");
			showErrorMsg( $element );
		}

	}

	////////////

	//   Change Invite Access Level

	/**
	 * 
	 */
	_changeUserInviteToProjectOwner( { clickedThis, inviteTrackingId } ) {

		let objectThis = this;
		
		let _URL = "d/rws/for-page/project-invite-change-user-access-to-project-owner/" + getWebserviceSyncTrackingCode();

		let requestObj = {
				inviteTrackingId : inviteTrackingId
		};

		let requestData = JSON.stringify(requestObj);

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(responseData) {
				try {
					objectThis._changeUserInviteToProjectOwner_ProcessAJAXResponse({
						requestData ,
						responseData
					});

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			},
			failure : function(errMsg) {
				handleAJAXFailure(errMsg);
			},
			error : function(jqXHR, textStatus, errorThrown) {

				handleAJAXError(jqXHR, textStatus, errorThrown);

			// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
			// textStatus: " + textStatus );
			}
		});
		
	}

	/**
	 * 
	 */
	_changeUserInviteToProjectOwner_ProcessAJAXResponse({requestData, responseData}) {

		//  refresh display
		this.displayInvitedPeopleForProject();
	}

	/**
	 * 
	 */
	_changeUserInviteToAssistantProjectOwner( { clickedThis, inviteTrackingId } ) {

		let objectThis = this;
		
		let _URL = "d/rws/for-page/project-invite-change-user-access-to-assist-project-owner/" + getWebserviceSyncTrackingCode();

		let requestObj = {
				inviteTrackingId : inviteTrackingId
		};

		let requestData = JSON.stringify(requestObj);

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(responseData) {
				try {
					objectThis._changeUserInviteToAssistantProjectOwner_ProcessAJAXResponse({
						requestData ,
						responseData
					});

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			},
			failure : function(errMsg) {
				handleAJAXFailure(errMsg);
			},
			error : function(jqXHR, textStatus, errorThrown) {

				handleAJAXError(jqXHR, textStatus, errorThrown);

			// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
			// textStatus: " + textStatus );
			}
		});
		
	}

	/**
	 * 
	 */
	_changeUserInviteToAssistantProjectOwner_ProcessAJAXResponse({requestData, responseData}) {

		//  refresh display
		this.displayInvitedPeopleForProject();
	}

}

