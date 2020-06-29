/**
 * projectPage_UploadData.ts
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

import { ProjectPage_UploadData_ListExistingUploads } from './projectPage_UploadData_ListExistingUploads';

import { ProjectPage_UploadData_NewUploadMain } from './projectPage_UploadData_NewUploadMain';

import { ProjectPage_UploadData_SubmitImportProgramInfo } from './projectPage_UploadData_SubmitImportProgramInfo';

/**
 * 
 */
export class ProjectPage_UploadData {

	private _initializeCalled = false;

	private _projectIdentifierFromURL;

	private _userIsProjectOwner;

	private _projectPage_UploadData_ListExistingUploads : ProjectPage_UploadData_ListExistingUploads
	private _projectPage_UploadData_NewUploadMain : ProjectPage_UploadData_NewUploadMain
	private _projectPage_UploadData_SubmitImportProgramInfo : ProjectPage_UploadData_SubmitImportProgramInfo

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, userIsProjectOwner, projectLocked } ) {

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._userIsProjectOwner = userIsProjectOwner;
	}

	/**
	 * 
	 */
	initialize() {

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