/**
 * userResetPassword_Subpart.ts
 * 
 * Javascript for user forgot password  
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

import React from "react";
import { createRoot as createRoot_ReactDOM_Client, Root as Root_ReactDOM_Client } from "react-dom/client";

import {
	User_reset_password_form_main_display_Component
} from "page_js/user_account_page_js/sub_parts/user_reset_password_form_main_display_Component";


let constructorCalled_UserResetPassword_Subpart = false

/**
 * 
 */
export class UserResetPassword_Subpart {

	private _initialized = false;

	private _reactRoot_InDOMElement: Root_ReactDOM_Client

	/**
	 * 
	 */
	constructor() {
		if ( constructorCalled_UserResetPassword_Subpart ) {

			const msg = "ERROR: constructor Called for class UserResetPassword_Subpart more than once"
			console.warn(msg)
			throw Error(msg)
		}

		this._initialized = true;
	}

	/**
	 *
	 */
	removeFromPage() {

		if ( this._reactRoot_InDOMElement ) {

			this._reactRoot_InDOMElement.unmount()
		}

		this._reactRoot_InDOMElement = undefined
	}

	/**
	 * show the forgot password part on the page (Add the Handlebars template and then add element listeners like onClick, ...)
	 */
	showOnPage(
		{
			containerHTMLElement
		} : {
			containerHTMLElement: HTMLElement
		} ) {

		//  Assume Already Empty

		//  React Unmount

		// ReactDOM.unmountComponentAtNode( containerHTMLElement )
		//
		// let $containerHTMLElement = $( containerHTMLElement );
		//
		// $containerHTMLElement.empty();


		const root_Component = (
			React.createElement(
				User_reset_password_form_main_display_Component,
				null,
				null
			)
		);

		this._reactRoot_InDOMElement = createRoot_ReactDOM_Client( containerHTMLElement )

		this._reactRoot_InDOMElement.render( root_Component )
	}


}
