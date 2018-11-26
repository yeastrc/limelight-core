/**
 * projectPage_UploadData_NewSingleFileEntry.js
 * 
 * Javascript for projectView.jsp page 
 * 
 * Upload Data - New Upload - Single File Entry
 * 
 * 
 * Look for window. for things that reference things that may or may not be on the window object
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module imports

/**
 * 
 */
export class ProjectPage_UploadData_NewSingleFileEntry {

	static factory( params ) {

		var constructorParam = {
				file : params.file,
				fileType : params.fileType,
				fileTypeString : params.fileTypeString,
				fileIndex : params.fileIndex,
				isLimelightXMLFile : params.isLimelightXMLFile
		};

		if ( constructorParam.fileType === undefined ) {

			if ( constructorParam.fileTypeString === undefined 
					|| constructorParam.fileTypeString === null
					|| constructorParam.fileTypeString === "" ) {

				throw Error( "fileTypeString is undefined, null or empty" );
			}

			constructorParam.fileType = parseInt( constructorParam.fileTypeString, 10 );

			if ( isNaN( constructorParam.fileType ) ) {

				throw Error( "fileTypeString failed to parse: " + fileTypeString );
			}
		}

		var projectPage_UploadData_NewSingleFileEntry = new ProjectPage_UploadData_NewSingleFileEntry( constructorParam );

		return projectPage_UploadData_NewSingleFileEntry;
	};


	/**
	 * 
	 */
	constructor( params ) {
		this.file = params.file;
		this.fileType = params.fileType;
		this.fileTypeString = params.fileTypeString;
		this.fileIndex = params.fileIndex;
		this.isLimelightXMLFile = params.isLimelightXMLFile;

		this.uploadedToServer = undefined;


		this.xmlHttpRequest = undefined;
	};

	getFile() {
		return this.file;
	};

	getFileTypeString() {
		return this.fileTypeString;
	};
	getFileType() {
		return this.fileType;
	};

	getFileIndex() {
		return this.fileIndex;
	};

	isIsLimelightXMLFile () {
		return this.isLimelightXMLFile;
	};

	isUploadedToServer () {
		return this.uploadedToServer;
	};

	setUploadedToServer ( uploadedToServer ) {
		this.uploadedToServer = uploadedToServer;
	};

	getXMLHttpRequest() {
		return this.xmlHttpRequest;
	};
	setXMLHttpRequest( xmlHttpRequest ) {
		this.xmlHttpRequest = xmlHttpRequest;
	};

}
