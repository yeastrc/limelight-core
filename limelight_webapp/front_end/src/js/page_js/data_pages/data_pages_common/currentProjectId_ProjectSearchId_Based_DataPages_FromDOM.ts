/**
 * currentProjectId_ProjectSearchId_Based_DataPages_FromDOM.ts
 * 
 * Javascript:   Current Project Id, placed on DOM by server code, currently ONLY for Project Search Id Based 
 * 
 */

///////////////////////////////////////////

let currentProjectId_Cached : string = undefined;

/**
 * Current Project Id, placed on DOM by server code
 */
export const currentProjectId_ProjectSearchId_Based_DataPages_FromDOM = function() : string {

	if ( currentProjectId_Cached ) {
		return currentProjectId_Cached;
	}

	const domElement = document.getElementById( "main_page_current_project_id" )
	if ( ! domElement ) {
		throw Error( "No page element with id 'main_page_current_project_id'.  main_page_current_project_id. main_page_current_project_id is set on the JSP. " );
	}
	const main_page_current_project_id = domElement.innerText

	currentProjectId_Cached = main_page_current_project_id;

	return main_page_current_project_id;
}
