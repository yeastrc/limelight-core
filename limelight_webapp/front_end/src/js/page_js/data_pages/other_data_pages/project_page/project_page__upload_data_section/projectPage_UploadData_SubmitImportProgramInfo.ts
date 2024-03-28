/**
 * projectPage_UploadData_SubmitImportProgramInfo.ts
 * 
 * Javascript for projectView.jsp page  
 * 
 * Upload Data - Submit Import Program Information Display
 * 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import {projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_SubmitImportProgramInfo_Overlay";

/**
 * 
 */
export class ProjectPage_UploadData_SubmitImportProgramInfo {

	private _initializeCalled = false;

	private _projectIdentifierFromURL;

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL } ) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;
	}

	/**
	 * 
	 */
	initialize() {

		const objectThis = this;

		const $upload_data_submit_import_program_info = $("#upload_data_submit_import_program_info");
		$upload_data_submit_import_program_info.click(function(eventObject) {
			try {
				projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay({ projectIdentifierFromURL: objectThis._projectIdentifierFromURL });
				eventObject.preventDefault();
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	 	
	}

    /**
     * Open Overlay
     * 
     * @param {*} param0 
     */
	private _openOverlay( clickThis, eventObject ) {

		projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay({ projectIdentifierFromURL: this._projectIdentifierFromURL });
	}

}