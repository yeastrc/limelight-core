/**
 * projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople.ts
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

//  Import Handlebars templates

// @ts-ignore
import { _project_page_searches_section_researcher_user_interaction_template_bundle } from './projectPage__Common__ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


/**
 * 
 */
export class ProjectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople {

	private _initializeCalled = false;

	private _projectIdentifierFromURL: string;

	private _project_user_list_invited_person_template = _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person;
	private _project_user_list_invited_person_bottom_separator_template =  _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person_bottom_separator;

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL } : { projectIdentifierFromURL: string } ) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;
	}

	/**
	 * 
	 */
	initialize() {

		if ( ! _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person ) {
			throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person");
		}
		if ( ! _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person_bottom_separator ) {
			throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_invited_person_bottom_separator");
		}
	};

	/**
	 * 
	 */
	displayInvitedPeopleForProject() {

		let objectThis = this;

		let requestObj = {
			projectIdentifier : this._projectIdentifierFromURL
		};

		const url = "d/rws/for-page/project-view-page-user-invite-list";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._displayInvitedPeopleForProject_ProcessAJAXResponse({ responseData });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	_displayInvitedPeopleForProject_ProcessAJAXResponse( { responseData } : { responseData: any } ) {

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
			userInviteList.sort(function(a: any, b: any) {
				return ( - ( a.invitedUserEmail ).localeCompare( b.invitedUserEmail ) );
			})

			let canRemoveAnyOfEntries = false;
			let canPromoteDemoteAnyOfEntries = false;
			
			userInviteList.forEach( function( userItem: any, index: any, array: any ) {

				if ( userItem.canRemoveEntry ) {
					canRemoveAnyOfEntries = true;
				}
				if ( userItem.canDemoteEntry || userItem.canPromoteEntry ) {
					canPromoteDemoteAnyOfEntries = true;
				}
			}, this);

			userInviteList.forEach( function( userInviteItem: any, index: any, array: any ) {

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
	_revokeProjectInvite( { clickedThis, inviteTrackingId } : { clickedThis: any, inviteTrackingId: any } ) {
		
		const userConfirm = window.confirm( "Revoke Invitation?" );
		
		if ( ! userConfirm ) {
			return;
		}

		let objectThis = this;

		let requestObj = {
				inviteTrackingId : inviteTrackingId
		};

		const url = "d/rws/for-page/project-invite-revoke";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._revokeProjectInvite_ProcessAJAXResponse({ responseData });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_revokeProjectInvite_ProcessAJAXResponse({responseData} : { responseData: any }) {

		//  refresh display
		this.displayInvitedPeopleForProject();
	}

	/**
	 * 
	 */
	_resendProjectInviteEmail( { clickedThis, inviteTrackingId } : { clickedThis: any, inviteTrackingId: any } ) {
		
		let objectThis = this;

		let requestObj = {
				inviteId : inviteTrackingId
		};

		const url = "d/rws/for-page/project-invite-resend-invite-email";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._resendProjectInviteEmail_ProcessAJAXResponse({ responseData });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_resendProjectInviteEmail_ProcessAJAXResponse({responseData} : { responseData: any }) {

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
	_changeUserInviteToProjectOwner( { clickedThis, inviteTrackingId } : { clickedThis: any, inviteTrackingId: any } ) {

		let objectThis = this;

		let requestObj = {
				inviteTrackingId : inviteTrackingId
		};

		const url = "d/rws/for-page/project-invite-change-user-access-to-project-owner";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._changeUserInviteToProjectOwner_ProcessAJAXResponse({ responseData });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_changeUserInviteToProjectOwner_ProcessAJAXResponse({responseData} : { responseData: any }) {

		//  refresh display
		this.displayInvitedPeopleForProject();
	}

	/**
	 * 
	 */
	_changeUserInviteToAssistantProjectOwner( { clickedThis, inviteTrackingId } : { clickedThis: any, inviteTrackingId: any } ) {

		let objectThis = this;

		let requestObj = {
				inviteTrackingId : inviteTrackingId
		};

		const url = "d/rws/for-page/project-invite-change-user-access-to-assist-project-owner";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData } : { responseData: any }) => {
			try {
				objectThis._changeUserInviteToAssistantProjectOwner_ProcessAJAXResponse({ responseData });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_changeUserInviteToAssistantProjectOwner_ProcessAJAXResponse({responseData} : { responseData: any }) {

		//  refresh display
		this.displayInvitedPeopleForProject();
	}

}

