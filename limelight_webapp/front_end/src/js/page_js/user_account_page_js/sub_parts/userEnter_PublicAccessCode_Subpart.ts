/**
 * userEnter_PublicAccessCode_Subpart.ts
 * 
 * Javascript for a user enter a Public Access Code
 *
 * Currently SKIPPED for upgrade 'ReactDOM.render' call
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

//  module import

import React from "react";
import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";



import {
	User_login_form_public_access_code_Component, User_login_form_public_access_code_Component_Props
} from "page_js/user_account_page_js/sub_parts/user_login_form_public_access_code_Component";

		
/**
 * 
 */
export class UserEnter_PublicAccessCode_Subpart {

	private _initialized = false;

	private _reactRoot_InDOMElement: Root_ReactDOM_Client

	/**
	 * 
	 */
	constructor() {
		this._initialized = false;

		this._initialized = true;
	}

	/**
	 *
	 */
	removeFromPage() {

		if ( this._reactRoot_InDOMElement ) {

			this._reactRoot_InDOMElement.unmount()
		}
	}

	/**
	 * show the login part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage(
		{
			containerHTMLElement,
			showLoginForm_Callback
		} : {
			containerHTMLElement: HTMLElement
			showLoginForm_Callback: () => void
		} ) {

		const props: User_login_form_public_access_code_Component_Props = {

			openSignin_Link_Clicked_Callback: showLoginForm_Callback
		}

		const root_Component = (
			React.createElement(
				User_login_form_public_access_code_Component,
				props,
				null
			)
		);

		const reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerHTMLElement )

		reactRoot_InDOMElement.render( root_Component )
	};

};

