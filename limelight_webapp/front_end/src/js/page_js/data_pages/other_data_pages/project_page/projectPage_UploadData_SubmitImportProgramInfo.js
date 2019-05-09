/**
 * projectPage_UploadData_SubmitImportProgramInfo.js
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

let Handlebars = require('handlebars/runtime');

const _project_page_upload_data_section_project_owner_user_interaction_template = 
	require("../../../../../../handlebars_templates_precompiled/project_page_upload_data_section_project_owner_user_interaction/project_page_upload_data_section_project_owner_user_interaction_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';
	
/**
 * 
 */
export class ProjectPage_UploadData_SubmitImportProgramInfo {

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL } ) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._submit_import_program_informationTemplate = _project_page_upload_data_section_project_owner_user_interaction_template.submit_import_program_information;
		this._submit_import_program_information_backgroundTemplate = _project_page_upload_data_section_project_owner_user_interaction_template.submit_import_program_information_background;

		if ( ! this._submit_import_program_informationTemplate ) {
			throw Error("No value for '_project_page_upload_data_section_project_owner_user_interaction_template.submit_import_program_information'");
		}
		if ( ! this._submit_import_program_information_backgroundTemplate ) {
			throw Error("No value for '_project_page_upload_data_section_project_owner_user_interaction_template.submit_import_program_information_background'");
		}

	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;

		const $upload_data_submit_import_program_info = $("#upload_data_submit_import_program_info");
		$upload_data_submit_import_program_info.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis._openOverlay( clickThis, eventObject );
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
	_openOverlay( clickThis, eventObject ) {

		const objectThis = this;

		const $controller_path = $("#controller_path");
		const controller_path = $controller_path.text();
		const urlFullPath = window.location.href;

		const controller_pathStart = urlFullPath.indexOf( controller_path );
		if ( controller_pathStart === -1 ) {
			throw Error("Controller Path not found in Page URL. Page URL: " + urlFullPath );
		}
		const baseURL = urlFullPath.substring( 0, controller_pathStart - 1 ); // subtract one to remove '/' after webapp context

		const promise_getUserSubmitImportProgramKey = this._getUserSubmitImportProgramKey();

		promise_getUserSubmitImportProgramKey.catch(() => {  });

		promise_getUserSubmitImportProgramKey.then( ({ responseData }) => {

			const userSubmitImportKey = responseData.existingKey;

			objectThis._createModalOverlay({ userSubmitImportKey, baseURL });

		});
	}
	

    /**
     * Create and return the overlay
     * 
     * @param {*} param0 
     */
    _createModalOverlay({ userSubmitImportKey, baseURL }) {
    	
		const objectThis = this;
		const containerWidth = 700;
		const containerHeight = 400;

		const $window = $( window );
		const windowWidth = $window.width();
		const windowHeight = $window.height();

		let containerLeft = ( windowWidth - containerWidth ) / 2;
		let containerTop = ( windowHeight - containerHeight ) / 2;

		if ( containerLeft < 10 ) {
			containerLeft = 10;
		}
		if ( containerTop < 10 ) {
			containerTop = 10;
		}

		const templateContext = {
			containerWidth : containerWidth,
			containerHeight : containerHeight,
			containerLeft : containerLeft,
			containerTop : containerTop,

			baseURL : baseURL,
			projectIdentifier : this._projectIdentifierFromURL,
			userSubmitImportKey : userSubmitImportKey 
		}

		let backgroundHTML = this._submit_import_program_information_backgroundTemplate();
    	
		let overlayHTML = this._submit_import_program_informationTemplate( templateContext );
		
		const $body = $("body");
		$body.append( backgroundHTML );
		$body.append( overlayHTML );

		const $submit_import_program_information_x_icon = $("#submit_import_program_information_x_icon");
		$submit_import_program_information_x_icon.click(function(eventObject) {
			try {
				let clickThis = this;
				const $submit_import_program_information_container = $("#submit_import_program_information_container");
				$submit_import_program_information_container.remove();
				const $submit_import_program_information_background = $("#submit_import_program_information_background");
				$submit_import_program_information_background.remove();
				eventObject.preventDefault();
				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});	 	
    }
    
    
	/**
	 * 
	 */
	_getUserSubmitImportProgramKey() {

		const objectThis = this;
		
		var requestData = {};

		const url = "user/rws/for-page/user-submit-import-key-get";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		return promise_webserviceCallStandardPost;
				
	}

	
}