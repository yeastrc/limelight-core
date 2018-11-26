/**
 * projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Admin Section For User Access - List users in project
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


/**
 * 
 */
export class ProjectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers {

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

		if ( ! _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_current_user ) {
			throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_current_user");
		}
		this._project_user_list_current_user_template = _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_current_user;

		if ( ! _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_current_user_bottom_separator ) {
			throw Error("Nothing in _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_current_user_bottom_separator");
		}
		this._project_user_list_current_user_bottom_separator_template =  _project_page_searches_section_researcher_user_interaction_template_bundle.project_user_list_current_user_bottom_separator;
	};

	/**
	 * 
	 */
	displayExistingUsersForProject() {

		let objectThis = this;

		let _URL = "d/rws/for-page/project-view-page-user-list/" + getWebserviceSyncTrackingCode();

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
					objectThis._displayExistingUsersForProject_ProcessAJAXResponse({
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
	_displayExistingUsersForProject_ProcessAJAXResponse( { requestData, responseData } ) {

		let objectThis = this;
		
		let userList = responseData.userList;

		if (!userList) {
			//  No userList for identifier

			return; // EARY EXIT
		}
		
		let $project_users = $("#project_users");

		let $existing_user_entry_jq_List = $project_users.find(".existing_user_entry_jq");

		$existing_user_entry_jq_List.remove();

		if (userList && userList.length > 0) {
			
			let canRemoveAnyOfEntries = false;
			let canPromoteDemoteAnyOfEntries = false;
			
			userList.forEach( function( userItem, index, array ) {

				if ( userItem.canRemoveEntry ) {
					canRemoveAnyOfEntries = true;
				}
				if ( userItem.canDemoteEntry || userItem.canPromoteEntry ) {
					canPromoteDemoteAnyOfEntries = true;
				}
			}, this);

			userList.forEach( function( userItem, index, array ) {

				let context = {
					userItem : userItem,
					canRemoveAnyOfEntries : canRemoveAnyOfEntries,
					canPromoteDemoteAnyOfEntries : canPromoteDemoteAnyOfEntries
				};

				let search_entry_HTML = this._project_user_list_current_user_template( context );

				let $search_entry = $( search_entry_HTML );
				
				$search_entry.appendTo( $project_users );
				
				let item_bottom_separator = this._project_user_list_current_user_bottom_separator_template( {} );
				
				$project_users.append( item_bottom_separator );
				
				//  Click handler for removing a user from the project
				let $remove_from_project_control_jq = $search_entry.find(".remove_from_project_control_jq");
				$remove_from_project_control_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let userId = userItem.userId;
						objectThis._removeUserFromProject( { clickedThis, userId } );
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({
							errorException : e
						});
						throw e;
					}
				});
				
				//  Click handler for changing a user to researcher (assistant project owner)
				let $change_to_assistant_owner_control_jq = $search_entry.find(".change_to_assistant_owner_control_jq");
				$change_to_assistant_owner_control_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let userId = userItem.userId;
						objectThis._changeUserToAssistantProjectOwner( { clickedThis, userId } );
					} catch (e) {
						reportWebErrorToServer.reportErrorObjectToServer({
							errorException : e
						});
						throw e;
					}
				});
				

				//  Click handler for changing a user to project owner
				let $change_to_owner_control_jq = $search_entry.find(".change_to_owner_control_jq");
				$change_to_owner_control_jq.click(function(eventObject) {
					try {
						eventObject.preventDefault();
						let clickedThis = this;
						let userId = userItem.userId;
						objectThis._changeUserToProjectOwner( { clickedThis, userId } );
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
	_removeUserFromProject( { clickedThis, userId } ) {

		let objectThis = this;

		if ( ! window.confirm("Remove user from project?") ) {
			return;
		}

		let _URL = "d/rws/for-page/project-remove-user-access-to-project/" + getWebserviceSyncTrackingCode();

		let requestObj = {
			projectIdentifier : this._projectIdentifierFromURL,
			userId : userId
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
					objectThis._removeUserFromProject_ProcessAJAXResponse({
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
	_removeUserFromProject_ProcessAJAXResponse({requestData, responseData}) {

		//  refresh display
		this.displayExistingUsersForProject();
	}

	/**
	 * 
	 */
	_changeUserToProjectOwner( { clickedThis, userId } ) {

		let objectThis = this;
		
		let _URL = "d/rws/for-page/project-change-user-access-to-project-owner/" + getWebserviceSyncTrackingCode();

		let requestObj = {
			projectIdentifier : this._projectIdentifierFromURL,
			userId : userId
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
					objectThis._changeUserToProjectOwner_ProcessAJAXResponse({
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
	_changeUserToProjectOwner_ProcessAJAXResponse({requestData, responseData}) {

		//  refresh display
		this.displayExistingUsersForProject();
	}

	/**
	 * 
	 */
	_changeUserToAssistantProjectOwner( { clickedThis, userId } ) {

		let objectThis = this;
		
		let _URL = "d/rws/for-page/project-change-user-access-to-assist-project-owner/" + getWebserviceSyncTrackingCode();

		let requestObj = {
			projectIdentifier : this._projectIdentifierFromURL,
			userId : userId
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
					objectThis._changeUserToAssistantProjectOwner_ProcessAJAXResponse({
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
	_changeUserToAssistantProjectOwner_ProcessAJAXResponse({requestData, responseData}) {

		//  refresh display
		this.displayExistingUsersForProject();
	}

}

