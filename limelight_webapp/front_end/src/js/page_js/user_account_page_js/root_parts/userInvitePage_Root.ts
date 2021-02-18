/**
 * userInvitePage_Root.js
 * 
 * Javascript for inviteLandingPage.jsp page  
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 

import Handlebars = require('handlebars/runtime');

import _user_invite_processing_template_bundle =
	require("../../../../../handlebars_templates_precompiled/user_invite_processing/user_invite_processing_template-bundle.js" );

///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg, hideAllErrorMessages, initShowHideErrorMessage } from 'page_js/showHideErrorMessage';

//From local dir
import { UserLogin_Subpart } from 'page_js/user_account_page_js/sub_parts/userLogin_Subpart';
import { UserCreateAccount_With_Invite_Subpart } from 'page_js/user_account_page_js/sub_parts/createUserAccount_With_Invite';

/**
 * 
 */
class UserInvitePage {

	private _initializeCalled = false;

	private _user_invite_landing_template = _user_invite_processing_template_bundle.user_invite_landing_template;

	private _userLogin_Subpart = new UserLogin_Subpart();
	private _userCreateAccount_With_Invite_Subpart = new UserCreateAccount_With_Invite_Subpart();

	private invite_landing_invite_code;
	private invite_landing_invite_project_id;
	private invite_landing_invite_project_title;

	/**
	 * 
	 */
	constructor() {
		if ( ! _user_invite_processing_template_bundle.user_invite_landing_template ) {
			throw Error("Nothing in _user_invite_processing_template_bundle.user_invite_landing_template");
		}
	}

	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {
		let objectThis = this;

		initShowHideErrorMessage();
		catchAndReportGlobalOnError.init();

		let $invite_landing_invite_code = $("#invite_landing_invite_code");
		if ( $invite_landing_invite_code.length === 0 ) {
			throw Error( "No element with id 'invite_landing_invite_code'" );
		}
		let invite_landing_invite_code = $invite_landing_invite_code.text();

		let $invite_landing_invite_project_id = $("#invite_landing_invite_project_id");
		if ( $invite_landing_invite_project_id.length === 0 ) {
			throw Error( "No element with id 'invite_landing_invite_project_id'" );
		}
		let invite_landing_invite_project_id_String = $invite_landing_invite_project_id.text();
		
		let invite_landing_invite_project_id = undefined;
		
		if ( invite_landing_invite_project_id_String === undefined ||
				invite_landing_invite_project_id_String === null ||
				invite_landing_invite_project_id_String === "" ) {
			
		} else {
			invite_landing_invite_project_id = Number( invite_landing_invite_project_id_String );
			if ( isNaN( invite_landing_invite_project_id ) ) {
				throw Error( "Element with id 'invite_landing_invite_project_id' contains string that is not number.  Contains: " + invite_landing_invite_project_id_String );
			}
		}

		let $invite_landing_invite_project_title = $("#invite_landing_invite_project_title");
		if ( $invite_landing_invite_project_title.length === 0 ) {
			throw Error( "No element with id 'invite_landing_invite_project_title'" );
		}
		let invite_landing_invite_project_title = $invite_landing_invite_project_title.text();

		this.invite_landing_invite_code = invite_landing_invite_code;
		this.invite_landing_invite_project_id = invite_landing_invite_project_id;
		this.invite_landing_invite_project_title = invite_landing_invite_project_title;
		
		let main_container_below_logo = document.getElementById( "main_container_below_logo" );
		if ( main_container_below_logo === undefined || main_container_below_logo === null ) {
			throw Error( "No element with id 'main_container_below_logo'" );
		}
		
		let containerHTMLElement = document.getElementById( "main_container_below_logo" );

		let $containerHTMLElement = $( containerHTMLElement );
		
		$containerHTMLElement.empty();
		
		let templateContext = { 
				inviteProjectId : this.invite_landing_invite_project_id,
				inviteProjectTitle : this.invite_landing_invite_project_title };
		
		let user_invite_landing_html = this._user_invite_landing_template( templateContext );

		let $user_invite_landing_html = $( user_invite_landing_html );
		
		$user_invite_landing_html.appendTo( $containerHTMLElement );

		let $invite_landing_sign_in_choice = $("#invite_landing_sign_in_choice");
		$invite_landing_sign_in_choice.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._showSignIn();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		let $invite_landing_create_acct_choice = $("#invite_landing_create_acct_choice");
		$invite_landing_create_acct_choice.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._showCreateAccount();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		this._initializeCalled = true;
	};

	/**
	 * Show Sign In choice
	 */
	_showSignIn() {

		let containerHTMLElement = document.getElementById( "main_container_below_logo" );

		let $containerHTMLElement = $( containerHTMLElement );
		
		$containerHTMLElement.empty();
		
		this._userLogin_Subpart.showOnPage( { 
			containerHTMLElement, 
			inviteTrackingCode : this.invite_landing_invite_code } );
	}
	
	/**
	 * Show Creacte Account choice
	 */
	_showCreateAccount() {

		let containerHTMLElement = document.getElementById( "main_container_below_logo" );

		let $containerHTMLElement = $( containerHTMLElement );
		
		$containerHTMLElement.empty();
		
		this._userCreateAccount_With_Invite_Subpart.showOnPage( { 
			containerHTMLElement, 
			inviteTrackingCode : this.invite_landing_invite_code } );
	}
	
}


///////////////

$(document).ready(function() {

	//Instance of class
	var userInvitePage = new UserInvitePage();

	try {
		userInvitePage.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
