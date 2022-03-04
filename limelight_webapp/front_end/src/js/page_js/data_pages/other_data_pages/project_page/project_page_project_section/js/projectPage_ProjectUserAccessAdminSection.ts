/**
 * projectPage_ProjectUserAccessAdminSection.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Project Admin Section For User Access
 * 
 * 
 */


//  Split into what Researcher can do vs what Project Owner can do


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

//  Local Imports

import { ProjectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople } from './projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople';
import { ProjectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers } from './projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers';

import { ProjectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser } from './projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser';

/**
 * 
 */
export class ProjectPage_ProjectUserAccessAdminSection {

	private _initializeCalled = false;

	private _projectIdentifierFromURL: string;

	private _projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople : ProjectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople

	private _projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers : ProjectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers

	private _projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser : ProjectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser

	/**
	 * 
	 */
	constructor({ projectIdentifierFromURL, userIsProjectOwner, projectLocked } : { projectIdentifierFromURL: string, userIsProjectOwner: boolean, projectLocked: boolean }) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople = new ProjectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople({
			projectIdentifierFromURL : this._projectIdentifierFromURL
		});

		this._projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers = new ProjectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers({
			projectIdentifierFromURL : this._projectIdentifierFromURL
		});

		if ( userIsProjectOwner && ( ! projectLocked ) ) {

			this._projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser = new ProjectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser({
				projectIdentifierFromURL : this._projectIdentifierFromURL,
				projectPage_ProjectUserAccessAdminSection : this
			});
		}
	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;

		this.attachClickHandlers();

		this._projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople.initialize();
		this._projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers.initialize();
		
		if ( this._projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser ) {
			this._projectPage_ProjectUserAccessAdmin_AddUserOrInviteNonUser.initialize();
		}
	};

	/**
	 * 
	 */
	attachClickHandlers() {
		let objectThis = this;

		let $researchers_in_project_block_show = $("#researchers_in_project_block_show");
		if ($researchers_in_project_block_show.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block_show'");
		}
		$researchers_in_project_block_show.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._showProjectUsersClicked();
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		let $researchers_in_project_block_hide = $("#researchers_in_project_block_hide");
		if ($researchers_in_project_block_hide.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block_hide'");
		}
		$researchers_in_project_block_hide.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._hideProjectUsersClicked();
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	};

	/**
	 * Show users and invited in this project
	 */
	_showProjectUsersClicked() {
		let $researchers_in_project_block = $("#researchers_in_project_block");
		if ($researchers_in_project_block.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block'");
		}
		$researchers_in_project_block.show();

		let $researchers_in_project_block_show = $("#researchers_in_project_block_show");
		if ($researchers_in_project_block_show.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block_show'");
		}
		$researchers_in_project_block_show.hide();

		let $researchers_in_project_block_hide = $("#researchers_in_project_block_hide");
		if ($researchers_in_project_block_hide.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block_hide'");
		}
		$researchers_in_project_block_hide.show();

		this._projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople.displayInvitedPeopleForProject();
		this._projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers.displayExistingUsersForProject();
	}

	/**
	 * Hide users and invited in this project
	 */
	_hideProjectUsersClicked() {

		let $researchers_in_project_block = $("#researchers_in_project_block");
		if ($researchers_in_project_block.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block'");
		}
		$researchers_in_project_block.hide();

		let $researchers_in_project_block_hide = $("#researchers_in_project_block_hide");
		if ($researchers_in_project_block_hide.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block_hide'");
		}
		$researchers_in_project_block_hide.hide();

		let $researchers_in_project_block_show = $("#researchers_in_project_block_show");
		if ($researchers_in_project_block_show.length === 0) {
			throw Error("No element with id: 'researchers_in_project_block_show'");
		}
		$researchers_in_project_block_show.show();

	}


	updateInvitedPeopleCurrentUsersLists() {

		this._projectPage_ProjectUserAccessAdmin_ListUpdate_InvitedPeople.displayInvitedPeopleForProject();
		this._projectPage_ProjectUserAccessAdmin_ListUpdate_ExistingProjectUsers.displayExistingUsersForProject();
	}
}