/**
 * projectPage_UploadData_UpdateExistingUploads.js
 * 
 * Javascript for projectView.jsp page 
 * 
 * Upload Data - Update Existing Uploads, Pending and History
 * 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//module imports

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';


/**
 * 
 */
export class ProjectPage_UploadData_UpdateExistingUploads {

	/**
	 * 
	 */
	constructor( { projectPage_UploadData_ListExistingUploads } ) {

		this._initializeCalled = false;

		this._projectPage_UploadData_ListExistingUploads = projectPage_UploadData_ListExistingUploads;
	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;

		this.addClickHandlersToStaticPageElements();
	}
	
	/**
	 * 
	 */
	addClickHandlersToStaticPageElements() {

		let objectThis = this;
		
		let $cancel_queued_item_yes_button_jq_All = $(".cancel_queued_item_yes_button_jq");
		$cancel_queued_item_yes_button_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.cancelQueuedItemConfirmedClicked(  { cancelQueued : true, clickThis : clickThis, eventObject : eventObject } );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $cancel_re_queued_item_yes_button_jq_All = $(".cancel_re_queued_item_yes_button_jq");
		$cancel_re_queued_item_yes_button_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.cancelQueuedItemConfirmedClicked(  { cancelQueued : true, clickThis : clickThis, eventObject : eventObject } );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $remove_failed_item_yes_button_jq_All = $(".remove_failed_item_yes_button_jq");
		$remove_failed_item_yes_button_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.removeFailedItemConfirmedClicked( clickThis, eventObject );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $remove_completed_item_yes_button_jq_All = $(".remove_completed_item_yes_button_jq");
		$remove_completed_item_yes_button_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.removeCompletedItemConfirmedClicked( clickThis, eventObject );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $import_file_confirm_remove_upload_overlay_cancel_parts_jq_All = $(".import_file_confirm_remove_upload_overlay_cancel_parts_jq");
		$import_file_confirm_remove_upload_overlay_cancel_parts_jq_All.click(function(eventObject) {
			try {
//				let clickThis = this;
				$(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq").hide();
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

	}

	/**
	 * 
	 */
	addClickHandlers(  ) {

		let objectThis = this;
		
		let $import_item_cancel_queued_jq_All = $(".import_item_cancel_queued_jq");
		$import_item_cancel_queued_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.cancelQueuedItemClicked( { cancelQueued : true, clickThis : clickThis, eventObject : eventObject } );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $import_item_cancel_re_queued_jq_All = $(".import_item_cancel_re_queued_jq");
		$import_item_cancel_re_queued_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.cancelQueuedItemClicked( { cancelRequeued : true, clickThis : clickThis, eventObject : eventObject } );

				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $import_item_remove_failed_jq_All = $(".import_item_remove_failed_jq");
		$import_item_remove_failed_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.removeFailedItemClicked( clickThis, eventObject );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

		let $import_item_remove_completed_jq_All = $(".import_item_remove_completed_jq");
		$import_item_remove_completed_jq_All.click(function(eventObject) {
			try {
				let clickThis = this;
				objectThis.removeCompletedItemClicked( clickThis, eventObject );
				eventObject.preventDefault();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

//	User clicked the "Cancel Queued" link 
	/**
	 * 
	 */
	cancelQueuedItemClicked( params ) {

		let cancelQueued = params.cancelQueued;
//		let cancelRequeued = params.cancelRequeued;

		let clickThis = params.clickThis;
//		let eventObject = params.eventObject;

		let $clickThis = $( clickThis );

		let $import_item_row_jq = $clickThis.closest(".import_item_row_jq");

		let tracking_id =  $import_item_row_jq.attr("data-tracking_id");
		let status_id =  $import_item_row_jq.attr("data-status_id");
		let filename = $import_item_row_jq.attr("data-filename");

		let $import_file_confirm_remove_upload_overlay_container = $("#import_file_confirm_remove_upload_overlay_container");
		let $filename_jq = $import_file_confirm_remove_upload_overlay_container.find(".filename_jq");

		$filename_jq.text( filename );

		let $any_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".any_item_jq");
		$any_item_jq.hide();

		if ( cancelQueued ) {
			let $cancel_queued_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".cancel_queued_item_jq");
			$cancel_queued_item_jq.show();
			let $cancel_queued_item_yes_button_jq = $import_file_confirm_remove_upload_overlay_container.find(".cancel_queued_item_yes_button_jq");
			$cancel_queued_item_yes_button_jq.show();
			$cancel_queued_item_yes_button_jq.data( { tracking_id : tracking_id, status_id : status_id } );
		} else {
			let $cancel_re_queued_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".cancel_re_queued_item_jq");
			$cancel_re_queued_item_jq.show();
			let $cancel_re_queued_item_yes_button_jq = $import_file_confirm_remove_upload_overlay_container.find(".cancel_re_queued_item_yes_button_jq");
			$cancel_re_queued_item_yes_button_jq.show();
			$cancel_re_queued_item_yes_button_jq.data( { tracking_id : tracking_id, status_id : status_id } );
		}

		let $import_file_confirm_remove_upload_overlay_show_hide_parts_jq = $(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq");
		$import_file_confirm_remove_upload_overlay_show_hide_parts_jq.show();
	};

//	User clicked the "Cancel Queued" link 
	/**
	 * 
	 */
	cancelQueuedItemConfirmedClicked( params ) {
		let objectThis = this;
		let clickThis = params.clickThis;
		let $clickThis = $( clickThis );

		let tracking_id = $clickThis.data("tracking_id");
		let status_id = $clickThis.data("status_id");

		let requestData = { trackingId : tracking_id, statusId : status_id };

		let requestDataJSON = JSON.stringify(requestData);

		let _URL = "d/rws/for-page/project-upload-data-remove-queued-import/" + getWebserviceSyncTrackingCode();

		$.ajax({
			type: "POST",
			url: _URL,
			data : requestDataJSON,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType: "json",
			success: function( responseData )	{
				try {
					let responseParams = {
							responseData : responseData,
							clickThis : clickThis,
							tracking_id : tracking_id
					};
					objectThis.cancelQueuedItemClickedProcessAjaxResponse( responseParams );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error: function(jqXHR, textStatus, errorThrown) {	

				handleAJAXError( jqXHR, textStatus, errorThrown );
			}
		});
	};
	
	/**
	 * 
	 */
	cancelQueuedItemClickedProcessAjaxResponse( responseParams ) {

//		let responseData = responseParams.responseData;
//		let clickThis = responseParams.clickThis;
//		let tracking_id = responseParams.tracking_id;

//		if ( responseData.success ) {

//		alert("Successful cancel" );
//		}

//		if ( responseData.statusNotQueued ) {

//		alert("Unable to cancel since status is no longer queued" );
//		}

//		if ( responseData.statusNotRequeued ) {

//		alert("Unable to cancel since status is no longer requeued" );
//		}	

		$(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq").hide();

		this._projectPage_UploadData_ListExistingUploads.populateDataBlockAndPendingCount();
	};

///////////////////////////////
///////////////////////////////

//	User clicked the "Remove Failed" link 
	/**
	 * 
	 */
	removeFailedItemClicked( clickThis, eventObject ) {
		
//		let objectThis = this;
		let $clickThis = $( clickThis );

		let $import_item_row_jq = $clickThis.closest(".import_item_row_jq");

		let tracking_id =  $import_item_row_jq.attr("data-tracking_id");
		let filename = $import_item_row_jq.attr("data-filename");

		let $import_file_confirm_remove_upload_overlay_container = $("#import_file_confirm_remove_upload_overlay_container");
		let $filename_jq = $import_file_confirm_remove_upload_overlay_container.find(".filename_jq");
		$filename_jq.text( filename );
		let $any_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".any_item_jq");
		$any_item_jq.hide();
		let $remove_failed_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".remove_failed_item_jq");
		$remove_failed_item_jq.show();
		let $remove_failed_item_yes_button_jq = $import_file_confirm_remove_upload_overlay_container.find(".remove_failed_item_yes_button_jq");
		$remove_failed_item_yes_button_jq.show();

		$remove_failed_item_yes_button_jq.data( { tracking_id : tracking_id } );

		$(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq").show();
	};

//	User clicked the "Remove Failed" link 
	/**
	 * 
	 */
	removeFailedItemConfirmedClicked( clickThis, eventObject ) {

		let objectThis = this;

		let $clickThis = $( clickThis );

		let tracking_id =  $clickThis.data("tracking_id");

		let requestData = { trackingId : tracking_id };

		let requestDataJSON = JSON.stringify(requestData);

		let _URL = "d/rws/for-page/project-upload-data-remove-failed-import/" + getWebserviceSyncTrackingCode();

		$.ajax({
			type: "POST",
			url: _URL,
			data : requestDataJSON,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType: "json",
			success: function( responseData )	{
				try {
					let responseParams = {
							responseData : responseData,
							clickThis : clickThis,
							tracking_id : tracking_id
					};
					objectThis.removeFailedItemClickedProcessAjaxResponse( responseParams );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error: function(jqXHR, textStatus, errorThrown) {	

				handleAJAXError( jqXHR, textStatus, errorThrown );
			}
		});
	};

	/**
	 * 
	 */
	removeFailedItemClickedProcessAjaxResponse( responseParams ) {

//		let responseData = responseParams.responseData;
//		let clickThis = responseParams.clickThis;
//		let tracking_id = responseParams.tracking_id;

//		if ( responseData.success ) {

//		alert("Successful removal" );
//		}

//		if ( responseData.statusNotFailed ) {

//		alert("Unable to remove since status is no longer failed" );
//		}

		$(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq").hide();

		this._projectPage_UploadData_ListExistingUploads.populateDataBlockAndPendingCount();
	};



///////////////////////////////
///////////////////////////////


//	User clicked the "Remove Completed" link 
	/**
	 * 
	 */
	removeCompletedItemClicked( clickThis, eventObject ) {

//		let objectThis = this;

		let $clickThis = $( clickThis );

		let $import_item_row_jq = $clickThis.closest(".import_item_row_jq");

		let tracking_id =  $import_item_row_jq.attr("data-tracking_id");

		let filename = $import_item_row_jq.attr("data-filename");

		let $import_file_confirm_remove_upload_overlay_container = $("#import_file_confirm_remove_upload_overlay_container");

		let $filename_jq = $import_file_confirm_remove_upload_overlay_container.find(".filename_jq");

		$filename_jq.text( filename );

		let $any_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".any_item_jq");

		$any_item_jq.hide();

		let $remove_completed_item_jq = $import_file_confirm_remove_upload_overlay_container.find(".remove_completed_item_jq");

		$remove_completed_item_jq.show();

		let $remove_completed_item_yes_button_jq = $import_file_confirm_remove_upload_overlay_container.find(".remove_completed_item_yes_button_jq");

		$remove_completed_item_yes_button_jq.show();

		$remove_completed_item_yes_button_jq.data( { tracking_id : tracking_id } );

		$(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq").show();
	};


//	User clicked the "Remove Completed" link 
	/**
	 * 
	 */
	removeCompletedItemConfirmedClicked( clickThis, eventObject ) {

		let objectThis = this;

		let $clickThis = $( clickThis );

		let tracking_id =  $clickThis.data("tracking_id");

		let requestData = { trackingId : tracking_id };

		let requestDataJSON = JSON.stringify(requestData);

		let _URL = "d/rws/for-page/project-upload-data-remove-success-import/" + getWebserviceSyncTrackingCode();

		$.ajax({
			type: "POST",
			url: _URL,
			data : requestDataJSON,
			contentType : _AJAX_POST_JSON_CONTENT_TYPE,
			dataType: "json",
			success: function( responseData )	{
				try {
					let responseParams = {
							responseData : responseData,
							clickThis : clickThis,
							tracking_id : tracking_id
					};
					objectThis.removeCompletedItemClickedProcessAjaxResponse( responseParams );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			},
			failure: function(errMsg) {
				handleAJAXFailure( errMsg );
			},
			error: function(jqXHR, textStatus, errorThrown) {	

				handleAJAXError( jqXHR, textStatus, errorThrown );
			}
		});
	};

	/**
	 * 
	 */
	removeCompletedItemClickedProcessAjaxResponse( responseParams ) {

//		let responseData = responseParams.responseData;
//		let clickThis = responseParams.clickThis;
//		let tracking_id = responseParams.tracking_id;

//		if ( responseData.success ) {

//		alert("Successful removal" );
//		}

//		if ( responseData.statusNotFailed ) {

//		alert("Unable to remove since status is no longer failed" );
//		}

		$(".import_file_confirm_remove_upload_overlay_show_hide_parts_jq").hide();

		this._projectPage_UploadData_ListExistingUploads.populateDataBlockAndPendingCount();
	};
}
