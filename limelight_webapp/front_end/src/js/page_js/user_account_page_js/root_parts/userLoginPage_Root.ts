/**
 * userLoginPage_Root.ts
 * 
 * Javascript for userLogin.jsp page  
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//module import 

///////////////////////////////////////////

/**
 * Import on every page the 'root' file and call limelight__catchAndReportGlobalOnError.init()
 */
import { limelight__catchAndReportGlobalOnError } from 'page_js/common_all_pages/limelight__catchAndReportGlobalOnError';


import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
import { initShowHideErrorMessage } from 'page_js/common_all_pages/showHideErrorMessage';


import { UserLogin_Subpart } from 'page_js/user_account_page_js/sub_parts/userLogin_Subpart';

import { UserResetPassword_Subpart } from 'page_js/user_account_page_js/sub_parts/userResetPassword_Subpart';
import {UserEnter_PublicAccessCode_Subpart} from "page_js/user_account_page_js/sub_parts/userEnter_PublicAccessCode_Subpart";

/**
 * 
 */
export class UserLoginPage_Root {

	private _initializeCalled = false;

	private _userLogin_Subpart = new UserLogin_Subpart();
	private _userResetPassword_Subpart = new UserResetPassword_Subpart();
	private _userEnter_PublicAccessCode_Subpart = new UserEnter_PublicAccessCode_Subpart( this );

	/**
	 * 
	 */
	constructor() {

	}

	/**
	 *
	 */
	switch_To_Login_From_Enter_PublicAccessCode() {

		this._showLoginForm();
	}

	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {
		
		const objectThis = this;

		initShowHideErrorMessage();
		limelight__catchAndReportGlobalOnError.init();
		
		//  Click handlers to switch between Sign In and Reset Password
		
		const $reset_password_fake_link = $("#reset_password_fake_link");
		$reset_password_fake_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				objectThis._showResetPasswordForm();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		const $signin_fake_link = $("#signin_fake_link");
		$signin_fake_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				objectThis._showLoginForm();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		const sign_in_page_project_has_ceDOM = document.getElementById("sign_in_page_project_has_ce");

		if ( sign_in_page_project_has_ceDOM ) {
			this._showEnterPublicAccessCode_Form();
		} else {
			this._showLoginForm();
		}

		const $signup_fake_link = $("#signup_fake_link");  //  May NOT be on the page
		$signup_fake_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				window.location.href="create-account";

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		this._initializeCalled = true;
	};
	
	/**
	 * Get main_container_below_logo element
	 */
	_get_main_container_below_logo() {

		const main_container_below_logo = document.getElementById( "main_container_below_logo" );
		if ( main_container_below_logo === undefined || main_container_below_logo === null ) {
			throw Error( "No element with id 'main_container_below_logo'" );
		}
		return main_container_below_logo;
	}

	/**
	 * Show Login Form
	 */
	_showLoginForm() {

		const main_container_below_logo = this._get_main_container_below_logo();

		const $reset_password_tab = $("#reset_password_tab");
		if ( $reset_password_tab.length === 0 ) {
			throw Error("No element with id 'reset_password_tab'");
		}
		$reset_password_tab.show();

		const $signin_tab = $("#signin_tab");
		if ( $signin_tab.length === 0 ) {
			throw Error("No element with id 'signin_tab'");
		}
		$signin_tab.hide();

		this._userLogin_Subpart.showOnPage( { containerHTMLElement : main_container_below_logo, inviteTrackingCode : undefined } );
	}

	_showEnterPublicAccessCode_Form() {

		const main_container_below_logo = this._get_main_container_below_logo();

		this._userEnter_PublicAccessCode_Subpart.showOnPage( { containerHTMLElement : main_container_below_logo, inviteTrackingCode : undefined } );
	}

	/**
	 * Show Reset Password Form
	 */
	_showResetPasswordForm() {

		const main_container_below_logo = this._get_main_container_below_logo();

		const $signin_tab = $("#signin_tab");
		if ( $signin_tab.length === 0 ) {
			throw Error("No element with id 'signin_tab'");
		}
		$signin_tab.show();

		const $reset_password_tab = $("#reset_password_tab");
		if ( $reset_password_tab.length === 0 ) {
			throw Error("No element with id 'reset_password_tab'");
		}
		$reset_password_tab.hide();

		this._userResetPassword_Subpart.showOnPage( { containerHTMLElement : main_container_below_logo } );
	}
	

};


///////////////

{
	//Instance of class
	var userLoginPage = new UserLoginPage_Root();

	try {
		userLoginPage.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

}
