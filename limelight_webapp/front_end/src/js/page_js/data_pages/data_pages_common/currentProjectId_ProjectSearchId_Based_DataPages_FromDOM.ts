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

	let $main_page_current_project_id = $("#main_page_current_project_id");
	if ( $main_page_current_project_id.length === 0 ) {
		throw Error( "No page element with id 'main_page_current_project_id'.  main_page_current_project_id. main_page_current_project_id is set on the JSP. " );
	}
	let main_page_current_project_id = $main_page_current_project_id.html();
	if ( main_page_current_project_id === undefined || main_page_current_project_id === null || main_page_current_project_id === "" ) {
		throw Error( "Page element with id 'main_page_current_project_id' not populated.  main_page_current_project_id. main_page_current_project_id is set on the JSP." );
	}

	currentProjectId_Cached = main_page_current_project_id;

	return main_page_current_project_id;
}
