/**
 * controllerPath_forCurrentPage_FromDOM.ts
 * 
 * Javascript:   Controller Path for current page, placed on DOM by server code
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module import 

let controller_path_Cached: string = undefined;

/**
 * 
 */
export class ControllerPath_forCurrentPage_FromDOM {

	/**
	 * 
	 */
	constructor() {}

	/**
	 * Controller Path for current page, placed on DOM by server code
	 */
	static controllerPath_forCurrentPage_FromDOM(): string {
		
		if ( controller_path_Cached ) {
			return controller_path_Cached;
		}

		let $controller_path = $("#controller_path");
		if ( $controller_path.length === 0 ) {
			throw Error( "No page element with id 'controller_path'.  controller_path is specific to a page. controller_path is set on the JSP. " );
		}
		let controller_path = $controller_path.html();
		if ( controller_path === undefined || controller_path === null || controller_path === "" ) {
			throw Error( "Page element with id 'controller_path' not populated.  controller_path is specific to a page. controller_path is set on the JSP." );
		}
		
		controller_path_Cached = controller_path;
		
		return controller_path;
	}
	
	
}