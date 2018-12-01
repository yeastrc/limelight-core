/**
 * projectPage_UploadData_NewUploadMain.js
 * 
 * Javascript for projectView.jsp page 
 * 
 * Upload Data - New Upload Main
 * 
 * 
 * Look for window. for things that reference things that may or may not be on the window object
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

//  Import Handlebars templates
let _project_page_upload_data_section_project_owner_user_interaction_template = require("../../../../../../handlebars_templates_precompiled/project_page_upload_data_section_project_owner_user_interaction/project_page_upload_data_section_project_owner_user_interaction_template-bundle.js");

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

//  Local Imports:

import { ProjectPage_UploadData_NewSingleFileEntry } from './projectPage_UploadData_NewSingleFileEntry.js';


const LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM = "limelight_upload_file_params_json"  //  Keep in sync with server side


/**
 * 
 */
export class ProjectPage_UploadData_NewUploadMain {
	
	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectPage_UploadData_ListExistingUploads } ) {
		
		this._initializeCalled = false;
		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._projectPage_UploadData_ListExistingUploads = projectPage_UploadData_ListExistingUploads;
		
		this.uploadingScanFiles = undefined;
		this.maxLimelightXMLFileUploadSize = undefined;
		this.maxLimelightXMLFileUploadSizeFormatted = undefined;
		this.maxScanFileUploadSize = undefined;
		this.maxScanFileUploadSizeFormatted = undefined;
		this.prevFileIndex = undefined;
		this.fileStorage = undefined;
		this.xmlHttpRequest = undefined;
		this.uploadKey = undefined;
	}
	
	/**
	 * 
	 */
	initialize() {
		
		try {
			let objectThis = this;
			

			if (!_project_page_upload_data_section_project_owner_user_interaction_template.per_upload_file_template) {
				throw Error("Nothing in _project_page_upload_data_section_project_owner_user_interaction_template.per_upload_file_template");
			}
			this._per_upload_file_template = _project_page_upload_data_section_project_owner_user_interaction_template.per_upload_file_template;

			
			//  Get uploading scan files
			this.uploadingScanFiles = false;
			let $limelight_xml_file_upload_overlay_upload_scan_files = $("#limelight_xml_file_upload_overlay_upload_scan_files");
			if ( $limelight_xml_file_upload_overlay_upload_scan_files.length > 0 ) {
				let limelight_xml_file_upload_overlay_upload_scan_files_text = $limelight_xml_file_upload_overlay_upload_scan_files.val();
				if ( limelight_xml_file_upload_overlay_upload_scan_files_text !== "" ) {
					//  Only populated when true
					this.uploadingScanFiles = true;
				}
			}
			//  Get max Limelight XML upload size
			let $limelight_xml_file_max_file_upload_size = $("#limelight_xml_file_max_file_upload_size");
			if ( $limelight_xml_file_max_file_upload_size.length === 0 ) {
				throw Error( "#limelight_xml_file_max_file_upload_size input field missing" );
			}
			let limelight_xml_file_max_file_upload_size_val = $limelight_xml_file_max_file_upload_size.val();
			this.maxLimelightXMLFileUploadSize = parseInt( limelight_xml_file_max_file_upload_size_val, 10 );
			if ( isNaN( this.maxLimelightXMLFileUploadSize ) ) {
				throw Error( "Unable to parse #limelight_xml_file_max_file_upload_size: " + limelight_xml_file_max_file_upload_size_val );
			}
			let $limelight_xml_file_max_file_upload_size_formatted = $("#limelight_xml_file_max_file_upload_size_formatted");
			if ( $limelight_xml_file_max_file_upload_size_formatted.length === 0 ) {
				throw Error( "#limelight_xml_file_max_file_upload_size_formatted input field missing" );
			}
			this.maxLimelightXMLFileUploadSizeFormatted = $limelight_xml_file_max_file_upload_size_formatted.val();
			if ( this.maxLimelightXMLFileUploadSizeFormatted === undefined || this.maxLimelightXMLFileUploadSizeFormatted === "" ) {
				throw Error( "#limelight_xml_file_max_file_upload_size_formatted input field empty" );
			}
			if ( this.uploadingScanFiles ) {  
				//  Get max Scan upload size
				let $limelight_import_scan_file_max_file_upload_size = $("#limelight_import_scan_file_max_file_upload_size");
				if ( $limelight_import_scan_file_max_file_upload_size.length === 0 ) {
					throw Error( "#limelight_import_scan_file_max_file_upload_size input field missing" );
				}
				let limelight_import_scan_file_max_file_upload_size_val = $limelight_import_scan_file_max_file_upload_size.val();
				this.maxScanFileUploadSize = parseInt( limelight_import_scan_file_max_file_upload_size_val, 10 );
				if ( isNaN( this.maxScanFileUploadSize ) ) {
					throw Error( "Unable to parse #limelight_import_scan_file_max_file_upload_size: " + limelight_import_scan_file_max_file_upload_size_val );
				}
				let $limelight_import_scan_file_max_file_upload_size_formatted = $("#limelight_import_scan_file_max_file_upload_size_formatted");
				if ( $limelight_import_scan_file_max_file_upload_size_formatted.length === 0 ) {
					throw Error( "#limelight_import_scan_file_max_file_upload_size_formatted input field missing" );
				}
				this.maxScanFileUploadSizeFormatted = $limelight_import_scan_file_max_file_upload_size_formatted.val();
				if ( this.maxLimelightXMLFileUploadSizeFormatted === undefined || this.maxLimelightXMLFileUploadSizeFormatted === "" ) {
					throw Error( "#limelight_import_scan_file_max_file_upload_size_formatted input field empty" );
				}
			}	
			////////////////////
			$(".open_limelight_file_upload_overlay_jq").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.openOverlay( clickThis, eventObject );
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});	 			
			$(".limelight_xml_file_upload_overlay_close_parts_jq").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.closeClicked( clickThis, eventObject );
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_choose_limelight_xml_file_button").click(function(eventObject) {
				try {
//					let clickThis = this;
					$("#import_limelight_xml_limelight_xml_file_field").click(); // "click" the file input field
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_limelight_xml_file_field").change(  function(eventObject) {
				try {
					let changeThis = this;
					objectThis.limelightXMLFileDialogChanged( changeThis, eventObject );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			//  Remove The Limelight XML file, aborting the upload if in progress
			$("#import_limelight_xml_remove_limelight_xml_file_button").click(function( eventObject ) {
				try {
					let clickThis = this;
					objectThis.removeLimelightXMLFile( { clickThis : clickThis, doAbortIfNeeded : true, eventObject : eventObject } );
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_choose_scan_file_button").click(function(eventObject) {
				try {
//					let clickThis = this;
					$("#import_limelight_xml_scan_file_field").click(); // "click" the file input field
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_scan_file_field").change(  function(eventObject) {
				try {
					let changeThis = this;
					objectThis.scanFileDialogChanged( changeThis, eventObject );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_file_close_button").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.closeClicked( clickThis, eventObject );
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_file_submit_button").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.submitClicked( clickThis, eventObject );
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_file_submit_import_success_submit_another_import_button").click(function(eventObject) {
				try {
//					let clickThis = this;
					objectThis.openOverlay(); // Will call resetOverlay
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			////////////////////
			//   Upload error message overlay
			$(".import_limelight_xml_file_upload_error_overlay_cancel_parts_jq").click(function(eventObject) {
				try {
					$(".import_limelight_xml_file_upload_error_overlay_show_hide_parts_jq").hide();
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			////////////////////
			//   File Choose error message overlay
			$(".import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq").click(function(eventObject) {
				try {
					$(".import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq").hide();
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			////////////////////
			//   Confirm Abandon Upload overlay
			$(".import_limelight_xml_file_confirm_abandon_upload_overlay_cancel_parts_jq").click(function(eventObject) {
				try {
					$(".import_limelight_xml_file_confirm_abandon_upload_overlay_show_hide_parts_jq").hide();
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$("#import_limelight_xml_file_confirm_abandon_upload_confirm_button").click(function(eventObject) {
				try {
					let clickThis = this;
					$(".import_limelight_xml_file_confirm_abandon_upload_overlay_show_hide_parts_jq").hide();
					objectThis.closeOverlay( clickThis, eventObject );
					eventObject.preventDefault();
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	};
	
	/**
	 * 
	 */
//	Called on Page unload
	pageUnload( eventObject ) {
		//  Seemed to work but now doesn't work to clean up the temp dir
		//  Call to remove partial upload if one is set up or in progress
		this.closeOverlay( { eventObject : eventObject } );
	};
	
	/**
	 * 
	 */
	getNextFileIndex(  ) {
		if ( ! this.prevFileIndex ) {
			this.prevFileIndex = 0;
		}
		this.prevFileIndex++;
		return this.prevFileIndex;
	};
	
	////////////  File Data
	/**
	 * 
	 */
	isFileDataEmpty( ) {
		if ( ! this.fileStorage ) {
			return true;
		}
		if ( this.fileStorage.length === 0 ) {
			return true;
		}
		return false;
	};
	/**
	 * 
	 */
	getAllFileData( ) {
		if ( ! this.fileStorage ) {
			return [];
		}
		return this.fileStorage;
	};
	/**
	 * 
	 */
	getFileData( params ) {
		let fileIndex = params.fileIndex;
		if ( ! this.fileStorage ) {
			throw Error( "no files in fileStorage" );
		}
		let fileData = this.fileStorage[ fileIndex ];
		return fileData;
	};
	/**
	 * 
	 */
	addFileData( params ) {
		let fileData = params.fileData;
		let fileIndex = params.fileIndex;
		if ( ! this.fileStorage ) {
			this.fileStorage = [];
		}
		this.fileStorage[ fileIndex ] = fileData;
	};
	/**
	 * 
	 */
	removeFileData( params ) {
		let fileIndex = params.fileIndex;
		if ( ! this.fileStorage ) {
			return;
		}
		if ( ! this.fileStorage ) {
			throw Error( "no files in fileStorage" );
		}
		if ( ! this.fileStorage[ fileIndex ] ) {
			throw Error( "no file in fileStorage for index: " + fileIndex );
		}
		delete this.fileStorage[ fileIndex ];
	};
	/**
	 * 
	 */
	clearFileData( ) {
		this.prevFileIndex = undefined;
		if ( ! this.fileStorage ) {
			return;
		}
		delete this.fileStorage;
	};
	
	/**
	 * 
	 */
	getFileIndexAsIntFromDOM( params ) {
		let $domElement = params.$domElement;
		let fileIndexString = $domElement.attr("data-file_index");
		if ( fileIndexString === undefined ) {
			throw Error( 'undefined:  $domElement.attr("data-file_index");' );
		}
		if ( fileIndexString === "" ) {
			throw Error( 'empty string:  $domElement.attr("data-file_index");' );
		}
		let fileIndex = parseInt( fileIndexString, 10 );
		if ( isNaN( fileIndex ) ) {
			throw Error( 'Fail parse to int:  $domElement.attr("data-file_index") : fileIndexString: ' + fileIndexString );
		}
		return fileIndex;
	};
	
//	User clicked the "Cancel" button or the close "X"
	/**
	 * 
	 */
	closeClicked( clickThis, eventObject ) {
		if ( this.uploadKey && ! this.isFileDataEmpty() ) {
			//  Submit has not been called yet and files have been uploaded.
			//  Prompt to confirm
			$(".import_limelight_xml_file_confirm_abandon_upload_overlay_show_hide_parts_jq").show();
			return;
		}
		this.closeOverlay( { clickThis : clickThis, eventObject : eventObject } );
	};
	
	/**
	 * 
	 */
	closeOverlay( params ) {
//		Not always provided:  clickThis, eventObject
//		let clickThis = params.clickThis;
//		let eventObject = params.eventObject;
		let allFileData = this.getAllFileData();
		let fileDataKeys = Object.keys( allFileData );
		for( let index = 0; index < fileDataKeys.length; index++ ) {
			let fileDataKey = fileDataKeys[ index ];
			let projectPage_UploadData_NewSingleFileEntry = allFileData[ fileDataKey ];
			this.abortXMLHttpRequestSend( { projectPage_UploadData_NewSingleFileEntry : projectPage_UploadData_NewSingleFileEntry } );
		}
		$(".limelight_xml_file_upload_overlay_show_hide_parts_jq").hide();
		this.resetOverlay();
		if ( this.uploadKey ) {
			//  Submit has not been called yet
			this.updateServerAbandonedUploadKey();
		}
		this.clearFileData();
	};
	
	/**
	 * 
	 */
	resetOverlayLimelightXMLSection(  ) {
		let fileIndex = this.getNextFileIndex();
		$("#import_limelight_xml_chosen_limelight_xml_file_block").attr( "data-file_index", fileIndex );
		$("#import_limelight_xml_limelight_xml_file_field").val("");
		$("#import_limelight_xml_choose_limelight_xml_file_block").show();
		$("#import_limelight_xml_chosen_limelight_xml_file_block").hide();
		$("#import_limelight_xml_chosen_limelight_xml_file_name").text( "" );
		$("#import_limelight_xml_choose_scan_file_block").hide();
	};
	
	/**
	 * 
	 */
	resetOverlay(  ) {
		this.clearFileData();
		this.resetOverlayLimelightXMLSection();
		$("#import_limelight_xml_file_search_name").val("");
		$("#import_limelight_xml_scan_file_field").val("");
		$("#import_limelight_xml_scan_files_block").empty();
		this.disableSubmitUploadButton();
		$("#import_limelight_xml_file_file_sent_confirmation_block").hide();
		$("#import_limelight_xml_file_error_message_block").hide();
		$("#import_limelight_xml_file_cancel_failed_message_block").hide();
		$("#import_limelight_xml_file_cancel_message_block").hide();
		this.hideSubmitInProgress();
	};
	
	/**
	 * 
	 */
//	User chose a file in the Limelight XML file dialog, or it is empty
	limelightXMLFileDialogChanged( changeThis, eventObject ) {
//		let objectThis = this;
		this.disableSubmitUploadButton();
		let $fileElement = $( changeThis );  //  $("#import_limelight_xml_limelight_xml_file_field");
		let fileElement = $fileElement[0];
		let file = undefined;
		let filename = undefined;
		let fileSize = undefined;
		try {
			//  length is zero if no file selected
			if ( fileElement.files.length === 0){
//				alert("File is required");
				$fileElement.val("");
				return;
			}
			file = fileElement.files[ 0 ];  // get file, will only be one file since not multi-select <file> element
			$fileElement.val(""); // clear the input field after get the selected file
			filename = file.name;
			fileSize = file.size;
		} catch(e) { 
			alert( "Javascript File API not supported.  Use a newer browser" );
			return;
		}
		let maxLimelightXMLFileUploadSize = this.maxLimelightXMLFileUploadSize;
//		if ( fileSize > maxLimelightXMLFileUploadSize ) {
//			let $import_limelight_xml_file_choose_file_error_message = $("#import_limelight_xml_file_choose_file_error_message");
//			$import_limelight_xml_file_choose_file_error_message.empty();
//			let errorMessage = $("#import_limelight_xml_file_choose_file_error_message_file_too_large").html();
//			let $errorMessage = $( errorMessage );
//			let $chosen_file_jq = $errorMessage.find(".chosen_file_jq");
//			$chosen_file_jq.text( filename );
//			let $file_limit_jq = $errorMessage.find(".file_limit_jq");
//			$file_limit_jq.text( this.maxLimelightXMLFileUploadSizeFormatted );
//			$import_limelight_xml_file_choose_file_error_message.append( $errorMessage );
//			$(".import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq").show();
//			return;  //  EARY EXIT
//		}
		let fileTypeString = $fileElement.attr("data-file_type");
		if ( fileTypeString === undefined || fileTypeString === null || fileTypeString === "" ) {
			throw Error( "fileType is not a value" );
		}
		let $import_limelight_xml_chosen_limelight_xml_file_block = $("#import_limelight_xml_chosen_limelight_xml_file_block");
		let fileIndex = this.getFileIndexAsIntFromDOM( { $domElement : $import_limelight_xml_chosen_limelight_xml_file_block } );
		let projectPage_UploadData_NewSingleFileEntry = ProjectPage_UploadData_NewSingleFileEntry.factory(
				{ isLimelightXMLFile : true, file : file, fileTypeString : fileTypeString,  fileIndex : fileIndex });
		this.addFileData( { fileData : projectPage_UploadData_NewSingleFileEntry,  fileIndex : fileIndex } );
		$("#import_limelight_xml_limelight_xml_file_field").val("");
		$("#import_limelight_xml_choose_limelight_xml_file_block").hide();
		$("#import_limelight_xml_chosen_limelight_xml_file_block").show();
		$("#import_limelight_xml_chosen_limelight_xml_file_name").text( filename );
//		Start the upload of the selected file
		this.uploadFile( { isLimelightXMLFile : true, $containingBlock : $import_limelight_xml_chosen_limelight_xml_file_block } );
	};
	
	//	User is removing their choice of Limelight XML file
	//	TODO  If uploaded, remove from server
	/**
	 * 
	 */
	removeLimelightXMLFile( params ) {
		let clickThis = params.clickThis; 
		let $import_limelight_xml_file_scan_file_entry_block_jq = params.$import_limelight_xml_file_scan_file_entry_block_jq;
//		let eventObject = params.eventObject;
		let doAbortIfNeeded = params.doAbortIfNeeded;
		this.disableSubmitUploadButton();
		$("#import_limelight_xml_choose_scan_file_block").hide(); // Hide since need to upload limelight xml file first
		if ( ! $import_limelight_xml_file_scan_file_entry_block_jq ) {
			if ( ! clickThis ) {
				throw Error( "Either $import_limelight_xml_file_scan_file_entry_block_jq or clickThis must be populated" );
			}
			let $clickThis = $( clickThis );
			$import_limelight_xml_file_scan_file_entry_block_jq = $clickThis.closest(".import_limelight_xml_file_scan_file_entry_block_jq");
		}
		let fileIndex = this.getFileIndexAsIntFromDOM( { $domElement : $import_limelight_xml_file_scan_file_entry_block_jq } );
		if ( doAbortIfNeeded ) {
			//	Does abort of send if in progress
			this.abortXMLHttpRequestSend( { fileIndex : fileIndex } );
		}
		this.removeFileData( { fileIndex : fileIndex } );
		this.resetOverlayLimelightXMLSection();
	};
	
	//	Remove The Scan file, aborting the upload if in progress
	/**
	 * 
	 */
	removeScanFile( params ) {
		let clickThis = params.clickThis; 
		let $import_limelight_xml_file_scan_file_entry_block_jq = params.$import_limelight_xml_file_scan_file_entry_block_jq;
//		let eventObject = params.eventObject;
		let doAbortIfNeeded = params.doAbortIfNeeded;
		if ( ! $import_limelight_xml_file_scan_file_entry_block_jq ) {
			if ( ! clickThis ) {
				throw Error( "Either $import_limelight_xml_file_scan_file_entry_block_jq or clickThis must be populated" );
			}
			let $clickThis = $( clickThis );
			$import_limelight_xml_file_scan_file_entry_block_jq = $clickThis.closest(".import_limelight_xml_file_scan_file_entry_block_jq");
		}
		let fileIndex = this.getFileIndexAsIntFromDOM( { $domElement : $import_limelight_xml_file_scan_file_entry_block_jq } );
		if ( doAbortIfNeeded ) {
			//	Does abort of send if in progress
			this.abortXMLHttpRequestSend( { fileIndex : fileIndex } );
		}
		this.removeFileData( { fileIndex : fileIndex } );
		$import_limelight_xml_file_scan_file_entry_block_jq.remove();
		this.enableDisableSubmitUploadButtonAndAddScanFileLinkConditional();
	};
	
	///////////////////////////////////////////////
	//	Abort the send of the XMLHttpRequest
	//	Must do before remove file data
	/**
	 * 
	 */
	abortXMLHttpRequestSend( params ) {
		let fileIndex = params.fileIndex;
		let projectPage_UploadData_NewSingleFileEntry = params.projectPage_UploadData_NewSingleFileEntry; 
		if ( ! fileIndex && ! projectPage_UploadData_NewSingleFileEntry ) {
			throw Error( "fileIndex or projectPage_UploadData_NewSingleFileEntry is required" ); 
		}
		if ( ! projectPage_UploadData_NewSingleFileEntry ) {
			projectPage_UploadData_NewSingleFileEntry = this.getFileData( { fileIndex : fileIndex } );
		}
		if ( projectPage_UploadData_NewSingleFileEntry ) {
			let xmlHttpRequest = projectPage_UploadData_NewSingleFileEntry.getXMLHttpRequest();
			if ( xmlHttpRequest ) {
				//  cancel the XMLHttpRequest
				try {
					xmlHttpRequest.abort();
				} catch(e) { 
				}
			}
		}
	};
	
//	User chose a file in the Scan file dialog, or it is empty
	/**
	 * 
	 */
	scanFileDialogChanged( changeThis, eventObject ) {
		if ( ! this.uploadingScanFiles ) {
			throw Error( "scanFileDialogChanged(...): Scan files not allowed, should not enter this" );
		}
		let objectThis = this;
		let $fileElement = $( changeThis );  //  $("#import_limelight_xml_limelight_xml_file_field");
		let fileElement = $fileElement[0];
		let file = undefined;
		let filename = undefined;
		let fileSize = undefined;
		try {
			//  length is zero if no file selected
			if ( fileElement.files.length === 0){
//				alert("File is required");
				$fileElement.val("");
				return;
			}
			file = fileElement.files[ 0 ];  // get file, will only be one file since not multi-select <file> element
			$fileElement.val(""); // clear the input field after get the selected file
			filename = file.name;
			fileSize = file.size;
		} catch(e) { 
			alert( "Javascript File API not supported.  Use a newer browser" );
			return;
		}
//		Did the user already select this filename
		let allFileData = this.getAllFileData();
		let fileDataKeys = Object.keys( allFileData );
		for( let index = 0; index < fileDataKeys.length; index++ ) {
			let fileDataKey = fileDataKeys[ index ];
			let fileData = allFileData[ fileDataKey ];
			if ( fileData.isUploadedToServer() ) {
				//  Only add the files that have been uploaded to the server
				let fileObj = fileData.getFile();
				let filenameInFileData = fileObj.name;
				if ( filenameInFileData === filename ) {
					//  Same filename already uploaded
					let $import_limelight_xml_file_choose_file_error_message = $("#import_limelight_xml_file_choose_file_error_message");
					$import_limelight_xml_file_choose_file_error_message.empty();
					let errorMessage = $("#import_limelight_xml_file_choose_file_error_message_filename_already_chosen").html();
					let $errorMessage = $( errorMessage );
					let $chosen_file_jq = $errorMessage.find(".chosen_file_jq");
					$chosen_file_jq.text( filename );
					$import_limelight_xml_file_choose_file_error_message.append( $errorMessage );
					$(".import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq").show();
					return;  //  EARY EXIT
				}
			}
		}
		let fileType = $fileElement.attr("data-file_type");
		if ( fileType === undefined || fileType === null || fileType === "" ) {
			throw Error( "fileType is not a value" );
		}
		let maxScanFileUploadSize = this.maxScanFileUploadSize;
		if ( fileSize > maxScanFileUploadSize ) {
			let $import_limelight_xml_file_choose_file_error_message = $("#import_limelight_xml_file_choose_file_error_message");
			$import_limelight_xml_file_choose_file_error_message.empty();
			let errorMessage = $("#import_limelight_xml_file_choose_file_error_message_file_too_large").html();
			let $errorMessage = $( errorMessage );
			let $chosen_file_jq = $errorMessage.find(".chosen_file_jq");
			$chosen_file_jq.text( filename );
			let $file_limit_jq = $errorMessage.find(".file_limit_jq");
			$file_limit_jq.text( this.maxScanFileUploadSizeFormatted );
			$import_limelight_xml_file_choose_file_error_message.append( $errorMessage );
			$(".import_limelight_xml_choose_file_error_overlay_show_hide_parts_jq").show();
			return;  //  EARY EXIT
		}
		this.disableSubmitUploadButton();
		$("#import_limelight_xml_choose_scan_file_block").hide();
		$fileElement.val(""); // clear the input field after get the selected file(s)
		let fileIndex = this.getNextFileIndex();

		let context = { fileIndex : fileIndex, fileType : fileType, fileName : filename };
		let html = this._per_upload_file_template(context);
		let $import_limelight_xml_scan_files_block = $("#import_limelight_xml_scan_files_block");
		let $scanFileEntry = $(html).appendTo( $import_limelight_xml_scan_files_block );
		let $scan_file_remove_button_jq = $scanFileEntry.find(".scan_file_remove_button_jq");
//		Remove The Scan file, aborting the upload if in progress
		$scan_file_remove_button_jq.click(function( eventObject ) {
			let clickThis = this;
			objectThis.removeScanFile( { clickThis : clickThis, doAbortIfNeeded : true, eventObject : eventObject } );
			return false;
		});
		let projectPage_UploadData_NewSingleFileEntry = ProjectPage_UploadData_NewSingleFileEntry.factory(
				{ isLimelightXMLFile : false, file : file, fileTypeString : fileType,  fileIndex : fileIndex });
		this.addFileData( { fileData : projectPage_UploadData_NewSingleFileEntry,  fileIndex : fileIndex } );
//		Start the upload of the selected file
		this.uploadFile( { isLimelightXMLFile : false, $containingBlock : $scanFileEntry } );
	};
	
	/**
	 * 
	 */
	openOverlay( clickThis, eventObject ) {
		let objectThis = this;
//		let $clickThis = $(clickThis);

		let _URL = "d/rws/for-page/project-upload-data-upload-initialize/" + getWebserviceSyncTrackingCode();

		let requestData = {
				projectIdentifier : this._projectIdentifierFromURL
		};

		let requestDataJSON = JSON.stringify(requestData);

		// let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestDataJSON,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",
			success : function(data) {
				try {
					objectThis.openOverlayProcessServerResponse( { requestData : requestData, responseData : data } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error : function(jqXHR, textStatus, errorThrown) {
				handleAJAXError(jqXHR, textStatus, errorThrown);
				// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
				// textStatus: " + textStatus );
			}
		});
	};
	
	/**
	 * 
	 */
	openOverlayProcessServerResponse( params ) {
//		let requestData = params.requestData; 
		let responseData = params.responseData;
		let statusSuccess = responseData.statusSuccess;
		let projectLocked = responseData.projectLocked;
		let uploadKey = responseData.uploadKey;
		if ( ! statusSuccess ) {
			if ( projectLocked ) {
				//  Project is now locked so reload page so not display option to upload files for import
				//  reload current URL
				window.location.reload(true);
			}
			//  Probably shouldn't get here
			throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
		}
//		Save upload key
		this.uploadKey = uploadKey;
		this.resetOverlay();
		let $overlay_background = $("#limelight_xml_file_upload_modal_dialog_overlay_background"); 
		let $overlay_container = $("#limelight_xml_file_upload_overlay_container_div");
//		Position Overlay Vertically
		let $window = $( window );
		let windowScrollTop = $window.scrollTop();
		let overlayNewTop = windowScrollTop + 30;
//		Apply position to overlay
		$overlay_container.css( { top : overlayNewTop + "px" } );
		$overlay_background.show();
		$overlay_container.show();
	};
	
	/**
	 * 
	 */
	uploadFile( params ) {
		
		let objectThis = this;
		
		let isLimelightXMLFile = params.isLimelightXMLFile;
		let $containingBlock = params.$containingBlock;
		let fileToUpload; 
		let filename;
		let projectPage_UploadData_NewSingleFileEntry;
		let fileIndex = this.getFileIndexAsIntFromDOM( { $domElement : $containingBlock } );
		let fileTypeString = $containingBlock.attr("data-file_type");
		if ( fileTypeString === undefined ) {
			throw Error( 'undefined:  $containingBlock.attr("data-file_type");' );
		}
		if ( fileTypeString === "" ) {
			throw Error( 'empty string:  $containingBlock.attr("data-file_type"); ' );
		}
		let fileType = parseInt( fileTypeString, 10 );
		if ( isNaN( fileType ) ) {
			throw Error( 'Fail parse to int:  $containingBlock.attr("data-file_type"); ' );
		}
		let uploadKey = this.uploadKey;
		if ( ! uploadKey ) {
			//  TODO  show error to user?
			throw Error( "upload key cannot be not set" );
		}
		
		try {
			//  fileIndex is an int
			projectPage_UploadData_NewSingleFileEntry = this.getFileData( { fileIndex : fileIndex } );
			if ( fileType !== projectPage_UploadData_NewSingleFileEntry.getFileType() ) {
				throw Error( "file type for saved fileData does not match file type in DOM element" );
			}
			fileToUpload = projectPage_UploadData_NewSingleFileEntry.getFile();
			filename = fileToUpload.name;
			
		} catch(e) { 
			alert( "Javascript File API not supported.  Please use a newer browser" );
			return;
		}
		this.progressBarClear( { $containingBlock : $containingBlock } );
		
		//  Create the XMLHttpRequest to send the file
		let xmlHttpRequest = new XMLHttpRequest();
		
		projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( xmlHttpRequest );
		
		//  Add the callback functions to xmlHttpRequest
		
		xmlHttpRequest.onload = function() {
			try {
				let currentXHRinOnLoad = xmlHttpRequest;
				projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( undefined ); ///  clear reference to XMLHttpRequest
				$("#import_limelight_xml_file_close_button").show();
				$("#import_limelight_xml_file_cancel_button").hide();
				let xhrStatus = currentXHRinOnLoad.status;
				let xhrResponse = currentXHRinOnLoad.response;
				let xhrResponseText = currentXHRinOnLoad.responseText;
				if (xhrStatus === 200) {
					let resp = null;
					try {
						resp = JSON.parse(xhrResponse);
					} catch(e) {
//						resp = {
//						statusSuccess: false,
//						data: 'Unknown error occurred: [' + xhrResponseText + ']'
//						};
						let errorMessage = "File Uploaded but failed to get information from server response.";
						objectThis.failedFileUpload( 
								{ isLimelightXMLFile : isLimelightXMLFile,
									errorMessage :  errorMessage,
									filename : filename,
									$containingBlock : $containingBlock } );
					}
					if ( resp !== null ) {
						if ( resp.statusSuccess ) {
							objectThis.successfulFileUpload( 
									{
										isLimelightXMLFile : isLimelightXMLFile,
										fileUploadResponse : resp,
										projectPage_UploadData_NewSingleFileEntry : projectPage_UploadData_NewSingleFileEntry,
										$containingBlock : $containingBlock } );
						} else {
							let errorMessage = "File NOT Uploaded, service returned failed status";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						}
					}
				} else if (xhrStatus === 400) {
					let resp = null;
					try {
						resp = JSON.parse(xhrResponse);
					} catch(e) {
						let errorMessage = 'Unknown error occurred: [' + xhrResponseText + ']';
						objectThis.failedFileUpload( 
								{ isLimelightXMLFile : isLimelightXMLFile,
									errorMessage :  errorMessage,
									filename : filename,
									$containingBlock : $containingBlock } );
					}
					if ( resp !== null ) {
						if ( resp.fileSizeLimitExceeded ) {
							let errorMessage = "File NOT Uploaded, file too large.  Max file size in bytes: " + resp.maxSizeFormatted;
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else if ( resp.ProjectLocked ) {
							let errorMessage = "The project is locked so no imports are allowed.  Please reload the web page.";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else if ( resp.filenameInFormNotMatchFilenameInQueryString ) {
							let errorMessage = "System Error";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else if ( resp.noUploadedFile ) {
							let errorMessage = "System Error";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else if ( resp.limelightXMLFileFailsInitialParse ) {
							let errorMessage = "The server failed to parse the Limelight XML file.  Please confirm that it is a valid Limelight XML file.";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else if ( resp.limelightXMLFilerootXMLNodeIncorrect ) {
							let errorMessage = "The server failed to parse the Limelight XML file.  Please confirm that it is a valid Limelight XML file.";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else if ( resp.submittedScanFileNotAllowed ) {
							let errorMessage = "Scan files are no longer allowed.  Please refresh the page.";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						} else {
							let errorMessage = "File NOT Uploaded, input data error, status 400";
							objectThis.failedFileUpload( 
									{ isLimelightXMLFile : isLimelightXMLFile,
										errorMessage :  errorMessage,
										filename : filename,
										$containingBlock : $containingBlock } );
						}
					}
					objectThis.progressBarClear( { $containingBlock : $containingBlock } );
				} else if (xhrStatus === 401 || xhrStatus === 403) {
					//  No Session or not Authorized
					let handledResponse = handleRawAJAXError( currentXHRinOnLoad );
					if ( handledResponse ) {
						return;
					}
					objectThis.progressBarClear( { $containingBlock : $containingBlock } );
					if (xhrStatus === 401 ) {
						let errorMessage = "File NOT Uploaded, server error, status 401";
						objectThis.failedFileUpload( 
								{ isLimelightXMLFile : isLimelightXMLFile,
									errorMessage :  errorMessage,
									filename : filename,
									$containingBlock : $containingBlock } );
					} else {
						let errorMessage = "File NOT Uploaded, server error, status 403";
						objectThis.failedFileUpload( 
								{ isLimelightXMLFile : isLimelightXMLFile,
									errorMessage :  errorMessage,
									filename : filename,
									$containingBlock : $containingBlock } );
					}
				} else if (xhrStatus === 500) {
//					let resp = null;
//					try {
//					resp = JSON.parse(xhrResponse);
//					} catch(e){
//					resp = {
//					statusSuccess: false,
//					data: 'Unknown error occurred: [' + xhrResponseText + ']'
//					};
//					}
					let errorMessage = "File NOT Uploaded, server error, status 500";
					objectThis.failedFileUpload( 
							{ isLimelightXMLFile : isLimelightXMLFile,
								errorMessage :  errorMessage,
								filename : filename,
								$containingBlock : $containingBlock } );
				} else if (xhrStatus === 404) {
//					let resp = null;
//					try {
//					resp = JSON.parse(xhrResponse);
//					} catch(e){
//					resp = {
//					statusSuccess: false,
//					data: 'Unknown error occurred: [' + xhrResponseText + ']'
//					};
//					}
					let errorMessage = "File NOT Uploaded, Service not found on server. status 404";
					objectThis.failedFileUpload( 
							{ isLimelightXMLFile : isLimelightXMLFile,
								errorMessage :  errorMessage,
								filename : filename,
								$containingBlock : $containingBlock } );
				} else {
					let errorMessage = "File upload failed. xhrStatus: " + xhrStatus;
					objectThis.failedFileUpload( 
							{ isLimelightXMLFile : isLimelightXMLFile,
								errorMessage :  errorMessage,
								filename : filename,
								$containingBlock : $containingBlock } );
				}
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		};
		
		xmlHttpRequest.upload.addEventListener('error', function(event){
			try {
				projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( undefined ); ///  clear reference to XMLHttpRequest
//				let currentXHRinOnLoad = xmlHttpRequest;
				let errorMessage = "File NOT Uploaded.  Error connecting to server";
				objectThis.failedFileUpload( 
						{ isLimelightXMLFile : isLimelightXMLFile,
							errorMessage :  errorMessage,
							filename : filename,
							$containingBlock : $containingBlock } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, false);
		
		xmlHttpRequest.upload.addEventListener('abort', function(event){
//			let currentXHRinOnLoad = xmlHttpRequest;
			//  This is called when the "Abort" is called on the xmlHttpRequest object
			projectPage_UploadData_NewSingleFileEntry.setXMLHttpRequest( undefined ); ///  clear reference to XMLHttpRequest
//			alert("Upload aborted");
		}, false);
		
		xmlHttpRequest.upload.addEventListener('progress', function(event){
			try {
				let progressPercent = Math.ceil(( event.loaded / event.total) * 100 );
				objectThis.progressBarUpdate( { progressPercent : progressPercent, $containingBlock : params.$containingBlock }  );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, false);
		
		let postURL = "d/rws/for-page/project-upload-data-upload-file/" + getWebserviceSyncTrackingCode();
		
		xmlHttpRequest.open('POST', postURL);
		
		xmlHttpRequest.setRequestHeader( "Content-Type", "application/octet-stream" );
		
		//  Send values in Request Header
		
		//	   parameters added to the Request Header are available when the request is first received at the server.
		
		let uploadFileHeaderParams = {
				projectIdentifier : this._projectIdentifierFromURL, // string
				uploadKey : uploadKey,
				fileIndex : fileIndex,
				fileType : fileType,
				filename : filename
		};
		let uploadFileHeaderParamsJSON = JSON.stringify( uploadFileHeaderParams );
		
		xmlHttpRequest.setRequestHeader( LIMELIGHT_UPLOAD_FILE_PARAMS_JSON__HEADER_PARAM, uploadFileHeaderParamsJSON );
		
		try {
			//  Send File object from page <input type="file"> element instead of creating a Form and appending a File to it
			
			xmlHttpRequest.send( fileToUpload );
			
		} catch( e ) {
			throw e;
		}

	};
	
	/**
	 * 
	 */
	successfulFileUpload( params ) {
//		let fileUploadResponse = params.fileUploadResponse;
		let isLimelightXMLFile = params.isLimelightXMLFile;
		let projectPage_UploadData_NewSingleFileEntry = params.projectPage_UploadData_NewSingleFileEntry;
		let $containingBlock = params.$containingBlock;
//		let eventObject = params.eventObject;
		let $progress_bar_container_jq = $containingBlock.find(".progress_bar_container_jq");
		$progress_bar_container_jq.hide();
		let $upload_complete_msg_jq = $containingBlock.find(".upload_complete_msg_jq");
		$upload_complete_msg_jq.show();
		projectPage_UploadData_NewSingleFileEntry.setUploadedToServer( true );
		if ( isLimelightXMLFile ) {
		}
		$("#import_limelight_xml_choose_scan_file_block").show();
//		this.enableSubmitUploadButton();
		this.enableDisableSubmitUploadButtonAndAddScanFileLinkConditional();
	};
////	/
	/**
	 * 
	 */
	failedFileUpload( params ) {
		let isLimelightXMLFile = params.isLimelightXMLFile;
		let errorMessage = params.errorMessage;
		let $containingBlock = params.$containingBlock;
		if ( isLimelightXMLFile ) {
			this.removeLimelightXMLFile( { $import_limelight_xml_file_scan_file_entry_block_jq : $containingBlock } );
		} else {
			this.removeScanFile( { $import_limelight_xml_file_scan_file_entry_block_jq : $containingBlock } );
		}
		let filename = params.filename;
		$("#import_limelight_xml_file_error_message_filename").text( filename );
		$("#import_limelight_xml_file_file_error_message").text( errorMessage );
		$(".import_limelight_xml_file_upload_error_overlay_show_hide_parts_jq").show();
	};
	
	/**
	 * 
	 */
	progressBarClear( params ) {
		let $containingBlock = params.$containingBlock;
		let $upload_complete_msg_jq = $containingBlock.find(".upload_complete_msg_jq");
		$upload_complete_msg_jq.hide();
		let $progress_bar_container_jq = $containingBlock.find(".progress_bar_container_jq");
		$progress_bar_container_jq.show();
		this.progressBarUpdate( { progressPercent : 0, $containingBlock : $containingBlock } );
	};
	
	/**
	 * 
	 */
	progressBarUpdate( params ) { // progressPercent as integer 0 to 100
		let $containingBlock = params.$containingBlock;
		let progressPercent = params.progressPercent;
		let $progress_bar_jq = $containingBlock.find(".progress_bar_jq");
		let progressBar = $progress_bar_jq[0];
		let progressPercentText = progressPercent + '%';
		progressBar.style.width = progressPercentText;
		let $progress_bar_text_jq = $containingBlock.find(".progress_bar_text_jq");
		$progress_bar_text_jq.text( progressPercentText );
	};
	
	/**
	 * 
	 */
//	User clicked "submit"
	submitClicked( clickThis, eventObject ) {
		let objectThis = this;
//		let $clickThis = $(clickThis);
		let $project_id = $("#project_id");
		let projectId = $project_id.val();
		let $import_limelight_xml_file_search_name = $("#import_limelight_xml_file_search_name");
		let searchName = $import_limelight_xml_file_search_name.val();
		let uploadKey = this.uploadKey;
		if ( ! uploadKey ) {
			throw Error( "uploadKey must be set" );
		}
		let foundLimelightXMLFile = false;
		let allFileData = this.getAllFileData();
		let fileItems = [];
		let fileDataKeys = Object.keys( allFileData );
		for( let index = 0; index < fileDataKeys.length; index++ ) {
			let fileDataKey = fileDataKeys[ index ];
			let fileData = allFileData[ fileDataKey ];
			if ( fileData.isUploadedToServer() ) {
				//  Only add the files that have been uploaded to the server
				let fileObj = fileData.getFile();
				let filename = fileObj.name;
				let fileType = fileData.getFileType(); 
				let isLimelightXMLFile = fileData.isIsLimelightXMLFile();
				if ( isLimelightXMLFile ) {
					if ( foundLimelightXMLFile ) {
						throw Error( "Found more than one Limelight XML file in submit: second filename: " + filename );
					}
					foundLimelightXMLFile = true;
				}
				//  All properties put in fileItem must be accepted by the web service
				let fileItem = {
						isLimelightXMLFile : isLimelightXMLFile,
						uploadedFilename : filename,
						fileType : fileType,
						fileIndex : fileData.getFileIndex()
				};
				fileItems.push( fileItem );
			}
		}
		if ( ! foundLimelightXMLFile ) {
			throw Error( "No Limelight XML file in submit" );
		}
		this.showSubmitInProgress();
		
		let _URL = "d/rws/for-page/project-upload-data-upload-submit/" + getWebserviceSyncTrackingCode();

//		All properties put in requestObj must be accepted by the web service
		let requestObj = { 
				projectIdentifier : this._projectIdentifierFromURL,
				uploadKey : uploadKey,
				searchName : searchName,
				fileItems : fileItems };
		let requestData = JSON.stringify( requestObj );
		
		this.uploadKey = undefined; // Clear since about to make AJAX call
		
//		let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType: _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",  //  data type returned
			success : function(data) {
				try {
					objectThis.submitClickedProcessServerResponse( { requestObj : requestObj, responseData : data } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error : function(jqXHR, textStatus, errorThrown) {
				handleAJAXError(jqXHR, textStatus, errorThrown);
				// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
				// textStatus: " + textStatus );
			}
		});
	};
	
	/**
	 * 
	 */
	submitClickedProcessServerResponse( params ) {
		let requestObj = params.requestObj; 
		let responseData = params.responseData;
		let statusSuccess = responseData.statusSuccess;
		let projectLocked = responseData.projectLocked;
		let scanFileNotAllowed = responseData.scanFileNotAllowed;
		if ( ! statusSuccess ) {
			if ( projectLocked ) {
				//  Project is now locked so reload page so not display option to upload files for import
				//  reload current URL
				window.location.reload(true);
				return;
			}
			if ( scanFileNotAllowed ) {
				//  Scan files are no longer allowed.  reload the page to reflect that.
				//  reload current URL
				window.location.reload(true);
				return;
			}
			//  Probably shouldn't get here
			window.location.reload(true);
			return;
//			throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
		}
//		Moved to this.submitClicked();
//		this.uploadKey = undefined;
//		Moved to this.closeOverlay();
//		this.clearFileData();

		this._projectPage_UploadData_ListExistingUploads.populateDataBlockAndPendingCount();
		
		this.closeOverlay();
	};
	
	/**
	 * 
	 */
	enableDisableSubmitUploadButtonAndAddScanFileLinkConditional() {
//		Enable Submit Upload button and show Add Scan Files Link
//		if Limelight XML file is uploaded and all scan files are uploaded.
		let limelightXMLfileUploaded = false;
		let allScanFilesUploadedOrNoScanFiles = true;
		let allFileData = this.getAllFileData();
		let fileDataKeys = Object.keys( allFileData );
		for( let index = 0; index < fileDataKeys.length; index++ ) {
			let fileDataKey = fileDataKeys[ index ];
			let projectPage_UploadData_NewSingleFileEntry = allFileData[ fileDataKey ];
			if ( projectPage_UploadData_NewSingleFileEntry.isIsLimelightXMLFile() ) {
				if ( projectPage_UploadData_NewSingleFileEntry.isUploadedToServer() ) {
					limelightXMLfileUploaded = true;
				}
			} else {
				if ( projectPage_UploadData_NewSingleFileEntry.isUploadedToServer() ) {
				} else {
					allScanFilesUploadedOrNoScanFiles = false;
				}
			}
		}
		if ( limelightXMLfileUploaded && allScanFilesUploadedOrNoScanFiles ) {
			this.enableSubmitUploadButton();
			$("#import_limelight_xml_choose_scan_file_block").show();
		} else {
			this.disableSubmitUploadButton();
			$("#import_limelight_xml_choose_scan_file_block").hide();
		}
	};
	
	/**
	 * 
	 */
	enableSubmitUploadButton() {
		$("#import_limelight_xml_file_submit_button").prop( "disabled", false );
		$("#import_limelight_xml_file_submit_button_disabled_overlay").hide();
	};
	
	/**
	 * 
	 */
	disableSubmitUploadButton() {
		$("#import_limelight_xml_file_submit_button_disabled_overlay").show();
		$("#import_limelight_xml_file_submit_button").prop( "disabled", true );
	};
	
	/**
	 * 
	 */
	showSubmitInProgress() {
//		Show "Submit In Progress" 
		let $limelight_xml_file_upload_submit_in_progress = $("#limelight_xml_file_upload_submit_in_progress");
		$limelight_xml_file_upload_submit_in_progress.show();
		if ( window.createSpinner ) {
			window.createSpinner();				// create spinner
		}
	};
	
	/**
	 * 
	 */
	hideSubmitInProgress() {
//		Hide "Submit In Progress" 
		let $limelight_xml_file_upload_submit_in_progress = $("#limelight_xml_file_upload_submit_in_progress");
		$limelight_xml_file_upload_submit_in_progress.hide();
		
		if ( window.destroySpinner ) {
			window.destroySpinner();				// destroy spinner
		}
	};
	
	/**
	 * 
	 */
//	User abandoned upload so inform server so it can be removed
	updateServerAbandonedUploadKey() {
//		let objectThis = this;
		if ( ! this.uploadKey ) {
			return;
		}
		let uploadKey = this.uploadKey;

		let _URL = "d/rws/for-page/project-upload-data-upload-remove-abandoned/" + getWebserviceSyncTrackingCode();

//		All properties put in requestObj must be accepted by the web service
		let requestObj = { projectIdentifier : this._projectIdentifierFromURL, uploadKey : uploadKey };
		let requestData = JSON.stringify( requestObj );
		
//		let request =
		$.ajax({
			type : "POST",
			url : _URL,
			data : requestData,
			contentType: _AJAX_POST_JSON_CONTENT_TYPE,
			dataType : "json",  //  data type returned
			success : function(data) {
			},
			failure: function(errMsg) {
//				handleAJAXFailure( errMsg );
			},
			error : function(jqXHR, textStatus, errorThrown) {
//				handleAJAXError(jqXHR, textStatus, errorThrown);
				// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
				// textStatus: " + textStatus );
			}
		});
	};
}