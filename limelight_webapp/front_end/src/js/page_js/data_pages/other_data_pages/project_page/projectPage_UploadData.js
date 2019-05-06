/**
 * projectPage_UploadData.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Upload Data - Root
 * 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

import { ProjectPage_UploadData_ListExistingUploads } from './projectPage_UploadData_ListExistingUploads.js';

import { ProjectPage_UploadData_NewUploadMain } from './projectPage_UploadData_NewUploadMain.js';

import { ProjectPage_UploadData_SubmitImportProgramInfo } from './projectPage_UploadData_SubmitImportProgramInfo.js';

/**
 * 
 */
export class ProjectPage_UploadData {

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, userIsProjectOwner, projectLocked } ) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._userIsProjectOwner = userIsProjectOwner;
		
	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;
		
		let $upload_data_block = $("#upload_data_block");
		if ( $upload_data_block.length === 0 ) {
			
			//  Upload Data block is not on page.  Web app not configured to support Uploading data
			
			return;  // EARLY EXIT
		}

		this._projectPage_UploadData_ListExistingUploads = 
			new ProjectPage_UploadData_ListExistingUploads( { projectIdentifierFromURL : this._projectIdentifierFromURL } );
		this._projectPage_UploadData_ListExistingUploads.initialize();
		
		this._projectPage_UploadData_NewUploadMain = 
			new ProjectPage_UploadData_NewUploadMain( { 
				projectIdentifierFromURL : this._projectIdentifierFromURL, 
				projectPage_UploadData_ListExistingUploads : this._projectPage_UploadData_ListExistingUploads } );
		this._projectPage_UploadData_NewUploadMain.initialize();

		if ( this._userIsProjectOwner ) {
			this._projectPage_UploadData_SubmitImportProgramInfo =
					new ProjectPage_UploadData_SubmitImportProgramInfo({ projectIdentifierFromURL : this._projectIdentifierFromURL });
			this._projectPage_UploadData_SubmitImportProgramInfo.initialize();
		}
	}
}