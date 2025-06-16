/**
 * userResetPassword_Subpart.ts
 * 
 * Javascript for user forgot password  
 * 
 */


//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

import ReactDOM from "react-dom";
import React from "react";

import {
	User_reset_password_form_main_display_Component
} from "page_js/user_account_page_js/sub_parts/user_reset_password_form_main_display_Component";

/**
 * 
 */
export class UserResetPassword_Subpart {

	private _initialized = false;

	/**
	 * 
	 */
	constructor() {
		this._initialized = true;
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

		//  React Unmount

		ReactDOM.unmountComponentAtNode( containerHTMLElement )

		let $containerHTMLElement = $( containerHTMLElement );

		$containerHTMLElement.empty();


		const root_Component = (
			React.createElement(
				User_reset_password_form_main_display_Component,
				null,
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

	}


}
