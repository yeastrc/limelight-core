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

import Handlebars = require('handlebars/runtime');
import _dummy_template_template_bundle =
	require("../../../../../handlebars_templates_precompiled/dummy_template/dummy_template_template-bundle.js" );

/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { initShowHideErrorMessage } from 'page_js/showHideErrorMessage';


import { UserLogin_Subpart } from 'page_js/user_account_page_js/sub_parts/userLogin_Subpart';

import { UserResetPassword_Subpart } from 'page_js/user_account_page_js/sub_parts/userResetPassword_Subpart';

/**
 * 
 */
class UserLoginPage {

	private _initializeCalled = false;

	private _userLogin_Subpart = new UserLogin_Subpart();
	private _userResetPassword_Subpart = new UserResetPassword_Subpart();

	/**
	 * 
	 */
	constructor() {

	}

	/**
	 * initialize the page (Add element listeners like onClick, ...)
	 */
	initialize(  ) {
		
		const objectThis = this;

		initShowHideErrorMessage();
		catchAndReportGlobalOnError.init();
		
		//  Click handlers to switch between Sign In and Reset Password
		
		const $reset_password_fake_link = $("#reset_password_fake_link");
		$reset_password_fake_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				const main_container_below_logo = objectThis._get_main_container_below_logo();
				objectThis._showResetPasswordForm( { main_container_below_logo } );
				
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
				
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	

		const $signin_fake_link = $("#signin_fake_link");
		$signin_fake_link.click( function(eventObject) {
			try {
				eventObject.preventDefault();

				const main_container_below_logo = objectThis._get_main_container_below_logo();
				objectThis._showLoginForm( { main_container_below_logo } );

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
				
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	
		
		const main_container_below_logo = this._get_main_container_below_logo();
		this._showLoginForm( { main_container_below_logo } );
		
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
	_showLoginForm( { main_container_below_logo } ) {

		this._userLogin_Subpart.showOnPage( { containerHTMLElement : main_container_below_logo, inviteTrackingCode : undefined } );
	}

	/**
	 * Show Reset Password Form
	 */
	_showResetPasswordForm( { main_container_below_logo } ) {

		this._userResetPassword_Subpart.showOnPage( { containerHTMLElement : main_container_below_logo } );
	}
	

};


///////////////

$(document).ready(function() {

	//Instance of class
	var userLoginPage = new UserLoginPage();

	try {
		userLoginPage.initialize();
		
	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
