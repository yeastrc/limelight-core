/**
 * userEnter_PublicAccessCode_Subpart.ts
 * 
 * Javascript for a user enter a Public Access Code
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//  module import

import ReactDOM from "react-dom";
import React from "react";


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import {UserLoginPage_Root} from "page_js/user_account_page_js/root_parts/userLoginPage_Root";
import {
	User_login_form_public_access_code_Component, User_login_form_public_access_code_Component_Props
} from "page_js/user_account_page_js/sub_parts/user_login_form_public_access_code_Component";

		
/**
 * 
 */
export class UserEnter_PublicAccessCode_Subpart {

	private _initialized = false;

	private _userLoginPage_Root : UserLoginPage_Root

	/**
	 * 
	 */
	constructor( userLoginPage_Root : UserLoginPage_Root ) {
		this._initialized = false;

		this._userLoginPage_Root = userLoginPage_Root;

		this._initialized = true;
	}

	/**
	 * show the login part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage( { containerHTMLElement, inviteTrackingCode } ) {


		//  React Unmount

		ReactDOM.unmountComponentAtNode( containerHTMLElement )

		let $containerHTMLElement = $( containerHTMLElement );

		$containerHTMLElement.empty();

		const props: User_login_form_public_access_code_Component_Props = {

			openSignin_Link_Clicked_Callback: () => {
				try {
					this._userLoginPage_Root._showLoginForm()

				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			}
		}

		const root_Component = (
			React.createElement(
				User_login_form_public_access_code_Component,
				props,
				null
			)
		);

		//  Called on render complete
		const renderCompleteCallbackFcn = () => {

		};

		const renderedReactComponent = ReactDOM.render(
			root_Component,
			containerHTMLElement,
			renderCompleteCallbackFcn
		);
	};

};

