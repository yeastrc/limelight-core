/**
 * projectsListPage.ts
 * 
 * Javascript for projectsList.jsp page  
 * 
 * page variable: listProjectsPage
 * 
 * 
 * 
 */

//////////////////////////////////

// JavaScript directive:   all variables have to be declared with "var", maybe other things

"use strict";

//  module import 

import Handlebars = require('handlebars/runtime');

import _project_list_template_bundle =
	require("../../../../../handlebars_templates_precompiled/project_list/project_list_template-bundle.js" );


/**
 * Import on every page the 'root' file and call catchAndReportGlobalOnError.init()
 */
import { catchAndReportGlobalOnError } from 'page_js/catchAndReportGlobalOnError';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { showErrorMsg } from 'page_js/showHideErrorMessage';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { MainPagesPopulateHeader } from 'page_js/main_pages/mainPagesPopulateHeader';

/**
 * 
 */
var ListProjectsPage = function() {
	
	var initializeCalled = false;

	if ( ! _project_list_template_bundle.single_project_template ) {
		throw Error("Nothing in _project_list_template_bundle.single_project_template");
	}
	var _single_project_template = _project_list_template_bundle.single_project_template;

	if ( ! _project_list_template_bundle.single_project_bottom_separator_template ) {
		throw Error("Nothing in _project_list_template_bundle.single_project_bottom_separator_template");
	}
	var _single_project_bottom_separator_template = _project_list_template_bundle.single_project_bottom_separator_template;

	

	/**
	 * 
	 */
	this.getProjectList = function() {

		var objectThis = this;
		
		var requestObj = {};

		const url = "d/rws/for-page/project-list";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => {  }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.getProjectListResponse(responseData);
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	this.getProjectListResponse = function(responseData) {

		const objectThis = this;

		var projectList = responseData.projectList;

		var $project_list = $("#project_list");

		var $project_root_container_jq_List = $project_list.find(".project_root_container_jq");

		$project_root_container_jq_List.remove();

		var $project_separator_row_jq_List = $project_list.find(".project_separator_row_jq");

		$project_separator_row_jq_List.remove();


		if (projectList && projectList.length > 0) {

			for ( const projectItem of projectList ) {

				projectItem.titleLowerCase = projectItem.title.toLocaleLowerCase();
			}

			//  Sort On Title Lower Case ascending then Id ascending
			projectList.sort(function(a, b) {
				if (a.titleLowerCase < b.titleLowerCase) {
					return -1;
				}
				if (a.titleLowerCase > b.titleLowerCase) {
					return 1;
				}
				if (a.id < b.id) {
					return -1;
				}
				if (a.id > b.id) {
					return 1;
				}
				return 0;
			});

			for ( const projectItem of projectList ) {

				var context = projectItem;

				var html = _single_project_template( context );

				var $project_entry = $(html).appendTo($project_list);

				var separatorHTML = _single_project_bottom_separator_template();
				$(separatorHTML).appendTo($project_list);

				if ( ( ! projectItem.projectLocked ) && projectItem.canDelete ) {

					var $delete_project_link_jq = $project_entry.find(".delete_project_link_jq");
					if ($delete_project_link_jq.length === 0) {
						throw Error( "Unable to find '.delete_project_link_jq'" );
					}

					$delete_project_link_jq.click(function(eventObject) {
						try {
							var clickThis = this;
							eventObject.preventDefault();

							objectThis.markProjectForDeletion({ projectItem, clickThis, eventObject });

							return false;
						} catch( e ) {
							reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
							throw e;
						}
					});
				}

			}

//			addToolTips();

		} else {

//			var noDataMsg = $("#project_entry_no_data_template_div").html();

//			$project_list.html(noDataMsg);
		}
	};

	//////////////////////

	//    Mark Project For Deletion

	/**
	 * 
	 */	
	this.markProjectForDeletion = function({ projectItem, clickThis, eventObject }) {

		const objectThis = this;

		if ( ! confirm("Delete Project '" + projectItem.title + "'?" ) ) {
			return; // EARLY EXIT
		}
		
		var requestObj = {
			projectId : projectItem.id
		};

		const url = "d/rws/for-page/project-mark-for-deletion";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.markProjectForDeletionComplete(responseData);

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}
	
	/**
	 * 
	 */
	this.markProjectForDeletionComplete = function( responseData ) {


		this.getProjectList();
	}

	//////////////////////

	//    Add Project

	/**
	 * 
	 */
	this.addProject = function(clickThis, eventObject) {

		var objectThis = this;

		var $new_project_title = $("#new_project_title");

		if ($new_project_title.length === 0) {

			throw Error( "Unable to find input field for id 'new_project_title' " );
		}

		var $new_project_abstract = $("#new_project_abstract");

		if ($new_project_abstract.length === 0) {

			throw Error( "Unable to find input field for id 'new_project_abstract' " );
		}



		var new_project_title = $new_project_title.val();

		var new_project_abstract = $new_project_abstract.val();


		if ( new_project_title === "" ) {

			var $element = $("#error_message_project_title_required");
			
			$new_project_title.focus();

			showErrorMsg( $element );

			return;  //  !!!  EARLY EXIT

//			} else if ( new_project_abstract === "" ) {

////			alert("Abstract required");

//			var $element = $("#error_message_project_abstract_required");

//			showErrorMsg( $element );

//			return;  //  !!!  EARLY EXIT
		}

		var requestObj = {
				projectTitle : new_project_title,
				projectAbstract : new_project_abstract
		};

		const url = "d/rws/for-page/project-create";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.addProjectComplete(responseData);

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	this.addProjectComplete = function(responseData) {

		if ( ! responseData.status ) {

			alert("System Error");

			var $element = $("#error_message_system_error");

			showErrorMsg( $element );

			return;
		} 

		this.closeAndClearAddProject();

		this.getProjectList();
	};

///////////

	this.closeAndClearAddProject = function() {



		$("#new_project_expanded").hide();
		$("#new_project_collapsed").show(); 

		$("#new_project_expand_link" ).show();
		$("#new_project_cancel_link" ).hide();


		$("#new_project_title").val("");
		$("#new_project_abstract").val("");


	};

	this.initialize = function() {

		var objectThis = this;
		
		catchAndReportGlobalOnError.init();
		
		////Instance of class
		var mainPagesPopulateHeader = new MainPagesPopulateHeader();
		mainPagesPopulateHeader.initialize();

		this.getProjectList();


		var $new_project_expand_jq  = $(".new_project_expand_jq");

		$new_project_expand_jq.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				$("#new_project_expanded").show();
				$("#new_project_collapsed").hide(); 
				$("#new_project_expand_link" ).hide();
				$("#new_project_cancel_link" ).show();

				$("#new_project_title").focus();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		var $new_project_cancel_jq  = $(".new_project_cancel_jq");

		$new_project_cancel_jq.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis.closeAndClearAddProject();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		var $add_project_button = $("#add_project_button");

		$add_project_button.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				var clickThis = this;

				objectThis.addProject( clickThis, eventObject );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});


		$("#mark_project_for_deletion_confirm_button").click(function(eventObject) {
			try {
				eventObject.preventDefault();
				var clickThis = this;

				objectThis.markProjectForDeletionConfirmed( clickThis, eventObject );

				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});


		$(".mark_project_for_deletion_overlay_cancel_parts_jq").click(function(eventObject) {
			try {
				eventObject.preventDefault();
				var clickThis = this;

				objectThis.closeConfirmMarkProjectForDeletionOverlay( clickThis, eventObject );

				return false;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

};

//Instance of class
var listProjectsPage = new ListProjectsPage();

///////////////

$(document).ready(function() {

	try {
		listProjectsPage.initialize();

	} catch( e ) {
		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
		throw e;
	}

});
