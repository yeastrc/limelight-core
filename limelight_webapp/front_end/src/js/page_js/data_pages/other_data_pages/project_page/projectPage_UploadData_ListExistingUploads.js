/**
 * projectPage_UploadData_ListExistingUploads.js
 * 
 * Javascript for projectView.jsp page 
 * 
 * Upload Data - List Existing Uploads, Pending and History
 * 
 * 
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module imports

//  Import Handlebars templates

const _project_page_upload_data_section_project_owner_user_interaction_template = require("../../../../../../handlebars_templates_precompiled/project_page_upload_data_section_project_owner_user_interaction/project_page_upload_data_section_project_owner_user_interaction_template-bundle.js");


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { ProjectPage_UploadData_UpdateExistingUploads } from './projectPage_UploadData_UpdateExistingUploads.js';

const CONSTANTS = {

	//		CHECK_FOR_CHANGE_STATUS_DELAY : 60 * 1000  //  Check every 60 seconds

	//		CHECK_FOR_CHANGE_STATUS_DELAY : 1 * 1000  // TODO  TEMP Check every 1 seconds
	//		,

	//		UPDATE_PENDING_COUNT_DELAY : 60 * 1000  //  Check every 60 seconds
	//		,

	//  Remove Auto Refresh

	//  Auto Refresh for certain status values

	//		AUTO_REFRESH_DELAY : 60 * 1000  //  In Milliseconds  Check every 60 seconds
	//		,

	//		AUTO_REFRESH_DELAY : 3 * 1000  //  In Milliseconds  Check every 3 seconds
	//		,


	DATA_ATTR_FOR_UPLOAD_DATA_LOADED : "UPLOAD_DATA_LOADED",

	DATA_ATTR_FOR_UPLOAD_DATA_SHOWING : "UPLOAD_DATA_SHOWING"
};


/**
 * 
 */
export class ProjectPage_UploadData_ListExistingUploads {

	/**
	 * 
	 */
	constructor({projectIdentifierFromURL}) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;
	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;

		this.statusIdQueued = undefined;
		this.statusIdRequeued = undefined;
		this.statusIdStarted = undefined;
		this.statusIdComplete = undefined;
		this.statusIdFailed = undefined;

		this.prevCompleteSuccessTrackingIdList = undefined;
		this.autoRefreshTimerId = undefined;


		if (!_project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_row_details_template) {
			throw Error("Nothing in _project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_row_details_template");
		}
		this._file_import_item_row_details_template = _project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_row_details_template;

		if (!_project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_separator_template) {
			throw Error("Nothing in _project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_separator_template");
		}
		this._file_import_item_separator_template = _project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_separator_template;

		if (!_project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_template) {
			throw Error("Nothing in _project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_template");
		}
		this._file_import_item_template = _project_page_upload_data_section_project_owner_user_interaction_template.file_import_item_template;

		
		//  Create object of class to Update/Remove Existing Uploads
		
		this._projectPage_UploadData_UpdateExistingUploads = 
			new ProjectPage_UploadData_UpdateExistingUploads( { projectPage_UploadData_ListExistingUploads : this } );
		this._projectPage_UploadData_UpdateExistingUploads.initialize();

		
		
		try {
			$("#upload_data_expand_show_data").click(function(eventObject) {
				try {
					let clickThis = this;
					$(this).hide();
					let $upload_data_collapse_hide_data = $("#upload_data_collapse_hide_data");
					$upload_data_collapse_hide_data.show();
					let $upload_data_block = $("#upload_data_block");
					$upload_data_block.show();

					let $upload_data_top_level_container = $("#upload_data_top_level_container");
					$upload_data_top_level_container.data(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_SHOWING, true);

					objectThis.showUploadDataClicked(clickThis, eventObject);

					return false;

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#upload_data_collapse_hide_data").click(function(eventObject) {
				try {
					//					let clickThis = this;
					$(this).hide();
					let $upload_data_expand_show_data = $("#upload_data_expand_show_data");
					$upload_data_expand_show_data.show();
					let $upload_data_block = $("#upload_data_block");
					$upload_data_block.hide();

					let $upload_data_top_level_container = $("#upload_data_top_level_container");
					$upload_data_top_level_container.data(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_SHOWING, false);

					return false;

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});


			$("#upload_data_refresh_data").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.refreshDataClicked(clickThis, eventObject);
					return false;
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});



			$(".limelight_xml_file_upload_complete_successfully_overlay_cancel_parts_jq").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.cancelClicked(clickThis, eventObject);
					return false;
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#limelight_xml_file_upload_complete_successfully_refresh_page_button").click(function(eventObject) {
				try {
					let clickThis = this;
					objectThis.refreshPageClicked(clickThis, eventObject);
					return false;
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			this.statusIdQueued = $("#limelight_xml_file_upload_complete_successfully_status_id_queued").val();
			this.statusIdRequeued = $("#limelight_xml_file_upload_complete_successfully_status_id_re_queued").val();
			this.statusIdStarted = $("#limelight_xml_file_upload_complete_successfully_status_id_started").val();
			this.statusIdComplete = $("#limelight_xml_file_upload_complete_successfully_status_id_complete").val();
			this.statusIdFailed = $("#limelight_xml_file_upload_complete_successfully_status_id_failed").val();


			$("#upload_data_pending_items_show_link").click(function(eventObject) {
				try {
					$(this).hide();
					let $upload_data_pending_items_container = $("#upload_data_pending_items_container");
					$upload_data_pending_items_container.show();
					let $upload_data_pending_items_hide_link = $("#upload_data_pending_items_hide_link");
					$upload_data_pending_items_hide_link.show();

					return false;

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#upload_data_pending_items_hide_link").click(function(eventObject) {
				try {
					$(this).hide();
					let $upload_data_pending_items_container = $("#upload_data_pending_items_container");
					$upload_data_pending_items_container.hide();
					let $upload_data_pending_items_show_link = $("#upload_data_pending_items_show_link");
					$upload_data_pending_items_show_link.show();

					return false;

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#upload_data_history_items_show_link").click(function(eventObject) {
				try {
					$(this).hide();
					$("#upload_data_history_items_container").show();
					$("#upload_data_history_items_hide_link").show();

					$("#upload_data_history_items_block").data(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_SHOWING, true);

					return false;

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#upload_data_history_items_hide_link").click(function(eventObject) {
				try {
					$(this).hide();
					$("#upload_data_history_items_container").hide();
					$("#upload_data_history_items_show_link").show();

					$("#upload_data_history_items_block").data(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_SHOWING, false);

					return false;

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#upload_data_pending_items_show_all_details_link").click(function(eventObject) {
				try {
					objectThis.showAllItemDetails({
						clickedThis : this
					});
					eventObject.preventDefault();
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			$("#upload_data_history_items_show_all_details_link").click(function(eventObject) {
				try {
					objectThis.showAllItemDetails({
						clickedThis : this
					});
					eventObject.preventDefault();
				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({
						errorException : e
					});
					throw e;
				}
			});

			//  Initial population of Pending Count
			this.populatePendingCount(); 

			//			TODO  Turned off
			//  Do initial status change check to get initial status values
			//			this.checkForStatusChange();

		} catch (e) {
			reportWebErrorToServer.reportErrorObjectToServer({
				errorException : e
			});
			throw e;
		}
	};


	showUploadDataClicked(clickThis, eventObject) {

		let $upload_data_pending_and_history_items_block = $("#upload_data_pending_and_history_items_block");


		let dataLoaded = $upload_data_pending_and_history_items_block.attr(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_LOADED);

		if (dataLoaded) {

			return; // data already loaded
		}

		this.populateDataBlockAndPendingCount();
	};



	refreshDataClicked(clickThis, eventObject) {

		this.populateDataBlockAndPendingCount();
	};
	

	//	Populate Pending Count

	populatePendingCount(params) {

		let objectThis = this;

		let requestData = {
				projectIdentifier : this._projectIdentifierFromURL
		};

		const url = "d/rws/for-page/project-upload-data-pending-count";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.populatePendingCountCountProcessAJAXResponse({
					responseData : responseData,
					requestData : requestData
				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	};

	populatePendingCountCountProcessAJAXResponse(params) {

		let objectThis = this;

		//		let requestData = params.requestData;
		let responseData = params.responseData;

		let pendingCount = responseData.pendingCount;
		
		let $upload_data_pending_number = $("#upload_data_pending_number");
		$upload_data_pending_number.text( pendingCount );
		let $upload_data_pending_block = $("#upload_data_pending_block");
		$upload_data_pending_block.show();
	}


	//	Populate the data block

	populateDataBlockAndPendingCount(params) {

		let objectThis = this;

		let fromAutoRefresh = undefined;

		if (params) {
			fromAutoRefresh = params.fromAutoRefresh;
		}

		let requestData = {
				projectIdentifier : this._projectIdentifierFromURL
		};

		const url = "d/rws/for-page/project-upload-data-list-submitted-items";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis.populateDataBlockAndPendingCountProcessResponse({
					responseData : responseData,
					requestData : requestData
				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	};



	populateDataBlockAndPendingCountProcessResponse( { responseData } ) {

		let objectThis = this;
		
		const scanFileImportAllowedViaWebSubmit = responseData.scanFileImportAllowedViaWebSubmit;

		let pendingCount = responseData.pendingCount;

		let pendingItemsList = responseData.pendingItemsList;
		let historyItemsList = responseData.historyItemsList;

		let completeSuccessTrackingIdList = responseData.completeSuccessTrackingIdList;

		if (pendingCount > 0) {
		} else {
		}

		let $upload_data_pending_number = $("#upload_data_pending_number");
		$upload_data_pending_number.text( pendingCount );
		let $upload_data_pending_block = $("#upload_data_pending_block");
		$upload_data_pending_block.show();

		let submit_process_date_time_jqMaxWidth = 0;

		let $submit_process_date_time_jq_Pending = null;
		let $submit_process_date_time_jq_History = null;

		///  Process pendingItemsList

		if (pendingItemsList.length === 0) {

			//  No Pending to display

			//			$("#upload_data_pending_items_block").hide();

			$("#upload_data_pending_items_block").show();

			$("#upload_data_pending_items_outer_container").hide();
			$("#upload_data_pending_items_no_pending_text").show();

		} else {

			//  Have Pending to display

			$("#upload_data_pending_items_block").show();

			$("#upload_data_pending_items_outer_container").show();
			$("#upload_data_pending_items_no_pending_text").hide();

			let $upload_data_pending_items_table = $("#upload_data_pending_items_table");


			let $filename_status_cell_jq_ALL = $upload_data_pending_items_table.find(".filename_status_cell_jq");

			if ( $filename_status_cell_jq_ALL.qtip ) {
				
				$filename_status_cell_jq_ALL.qtip('destroy', true); // Immediately destroy all tooltips belonging to the selected elements
			}

			$upload_data_pending_items_table.empty();

			//  Add data to the page

			for (let dataIndex = 0; dataIndex < pendingItemsList.length; dataIndex++) {

				let dataItem = pendingItemsList[dataIndex];

				this.populateDataBlockPendingOrHistoryItem({
					dataItem : dataItem,
					scanFileImportAllowedViaWebSubmit,
					$containerTable : $upload_data_pending_items_table
				});
			}

			$submit_process_date_time_jq_Pending = $upload_data_pending_items_table.find(".submit_process_date_time_jq");

			let submit_process_date_time_jqWidth = $submit_process_date_time_jq_Pending.width();

			if (submit_process_date_time_jqMaxWidth < submit_process_date_time_jqWidth) {
				submit_process_date_time_jqMaxWidth = submit_process_date_time_jqWidth;
			}
		}

		//  End processing pendingItemsList

		/////////////////

		///  Process historyItemsList

		if (historyItemsList.length === 0) {

			//  No History to display
			$("#upload_data_history_items_block").hide();

		} else {

			//  Have History to display

			$("#upload_data_history_items_block").show();
			$("#upload_data_history_items_container").show();

			$("#upload_data_history_items_hide_link").show();
			$("#upload_data_history_items_show_link").hide();

			let $upload_data_history_items_table = $("#upload_data_history_items_table");

			let $filename_status_cell_jq_ALL = $upload_data_history_items_table.find(".filename_status_cell_jq");

			if ( $filename_status_cell_jq_ALL.qtip ) {
			
				$filename_status_cell_jq_ALL.qtip('destroy', true); // Immediately destroy all tooltips belonging to the selected elements
			}

			$upload_data_history_items_table.empty();

			//  Add data to the page

			for (let dataIndex = 0; dataIndex < historyItemsList.length; dataIndex++) {
				let dataItem = historyItemsList[dataIndex];
				this.populateDataBlockPendingOrHistoryItem({
					dataItem : dataItem,
					scanFileImportAllowedViaWebSubmit,
					$containerTable : $upload_data_history_items_table
				});
			}

			$submit_process_date_time_jq_History = $upload_data_history_items_table.find(".submit_process_date_time_jq");

			let submit_process_date_time_jqWidth = $submit_process_date_time_jq_History.width();

			if (submit_process_date_time_jqMaxWidth < submit_process_date_time_jqWidth) {

				submit_process_date_time_jqMaxWidth = submit_process_date_time_jqWidth;
			}

		}

		//  End processing historyItemsList

		submit_process_date_time_jqMaxWidth += 1;

		//  Submitted/Processed column set column to max width

		if ($submit_process_date_time_jq_Pending) {

			$submit_process_date_time_jq_Pending.css("min-width", submit_process_date_time_jqMaxWidth + "px");
			$submit_process_date_time_jq_Pending.css("max-width", submit_process_date_time_jqMaxWidth + "px");
		}
		;

		if ($submit_process_date_time_jq_History) {

			$submit_process_date_time_jq_History.css("min-width", submit_process_date_time_jqMaxWidth + "px");
			$submit_process_date_time_jq_History.css("max-width", submit_process_date_time_jqMaxWidth + "px");
		}

		if (pendingItemsList.length !== 0) {

			//  Hide History data since have pending data

			let dataShowing = $("#upload_data_history_items_block").data(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_SHOWING);

			if (!dataShowing) {

				$("#upload_data_history_items_container").hide();

				$("#upload_data_history_items_hide_link").hide();
				$("#upload_data_history_items_show_link").show();
			}
		}

		this._projectPage_UploadData_UpdateExistingUploads.addClickHandlers();
		
		this.eval_completeSuccessTrackingIdList_forAdditions(completeSuccessTrackingIdList);

		//  auto refresh for certain statuses
		if (this.autoRefreshTimerId) {
			//  clear existing timer since refreshed data now
			try {
				clearTimeout(this.autoRefreshTimerId);
			} catch (e) {}
		}

		let $upload_data_pending_and_history_items_block = $("#upload_data_pending_and_history_items_block");
		$upload_data_pending_and_history_items_block.attr(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_LOADED, true);

		let uploadDataShowing = $("#upload_data_top_level_container").data(CONSTANTS.DATA_ATTR_FOR_UPLOAD_DATA_SHOWING);

		//  Remove auto-refresh since now that closes any detail items the user had showing
		//		if ( uploadDataShowing &&
		//		pendingItemsList && pendingItemsList.length > 0 ) {

		//		//  Auto Refresh after delay

	//		this.autoRefreshTimerId = setTimeout( function() {
	//		objectThis.autoRefreshTimerId = undefined;
	//		objectThis.populateDataBlockAndPendingCount( { fromAutoRefresh : true } );
	//		}, CONSTANTS.AUTO_REFRESH_DELAY );
	//		}
	};


	populateDataBlockPendingOrHistoryItem( { dataItem, scanFileImportAllowedViaWebSubmit, $containerTable }) {

		let objectThis = this;

		let context = dataItem;
		
		let showScanFileRow = false;
		
		if ( scanFileImportAllowedViaWebSubmit || dataItem.scanfileNamesCommaDelim ) {
			showScanFileRow = true;
		}
		
		context.showScanFileRow = showScanFileRow;

		let html = this._file_import_item_template(context);

		let $upload_data_item = $(html).appendTo($containerTable);

		let numCols = $upload_data_item.children("td").length;

		if ( this.addToolTips ) {
			this.addToolTips($upload_data_item);
		}

		//  Add details row

		context.numCols = numCols;
		context.numColsMinusTwo = numCols - 2;

		let detailsHtml = this._file_import_item_row_details_template(context);

		let $upload_data_details_item = $(detailsHtml).appendTo($containerTable);

		let $import_item_expand_collapse_row_clickable_jq_All = $upload_data_item.find(".import_item_expand_collapse_row_clickable_jq");

		$import_item_expand_collapse_row_clickable_jq_All.click(function(eventObject) {
			try {
				objectThis.processClickStatusRow({
					clickedThis : this
				});

				eventObject.preventDefault();

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		if ( this.addToolTips ) {
			this.addToolTips($upload_data_details_item);
		}

		//  Add divider row

		let htmlDividerRow = this._file_import_item_separator_template(context);

		let $upload_divider_item = $(htmlDividerRow).appendTo($containerTable);

	};




	showAllItemDetails(params) {
		let objectThis = this;
		let clickedThis = params.clickedThis;
		let $clickedThis = $(clickedThis);

		let container_id = $clickedThis.attr("data-container_id");

		let $container = $("#" + container_id);

		let $import_item_row_jq_All = $container.find(".import_item_row_jq");
		$import_item_row_jq_All.each(function() {
			let $row = $(this);
			objectThis.showHideStatusDetailsRow({
				alwaysShowRow : true,
				$import_item_row_jq : $row
			});
		});
	};



	processClickStatusRow(params) {
		let clickedThis = params.clickedThis;

		let $clickedThis = $(clickedThis);
		let $import_item_row_jq = $clickedThis.closest(".import_item_row_jq");

		this.showHideStatusDetailsRow({
			$import_item_row_jq : $import_item_row_jq
		});
	};




	showHideStatusDetailsRow(params) {
		let $import_item_row_jq = params.$import_item_row_jq;
		let alwaysShowRow = params.alwaysShowRow;

		let $import_item_expand_row_icon_jq = $import_item_row_jq.find(".import_item_expand_row_icon_jq");
		let $import_item_collapse_row_icon_jq = $import_item_row_jq.find(".import_item_collapse_row_icon_jq");

		let $import_item_row_jq_NextRow = $import_item_row_jq.next();

		if (alwaysShowRow || $import_item_expand_row_icon_jq.is(":visible")) {

			$import_item_row_jq_NextRow.show();
			$import_item_expand_row_icon_jq.hide();
			$import_item_collapse_row_icon_jq.show();

		} else {

			$import_item_row_jq_NextRow.hide();
			$import_item_collapse_row_icon_jq.hide();
			$import_item_expand_row_icon_jq.show();
		}


	};

	
	eval_completeSuccessTrackingIdList_forAdditions(completeSuccessTrackingIdList) {

		//  Evaluate for auto refresh and alert user to successfully completed imports

		//     Show overlay if new entries have been added to the list

		if (this.prevCompleteSuccessTrackingIdList) {

			// compare the array contents, item by item

			let completeSuccessTrackingIdItemIndex = 0;
			let prevCompleteSuccessTrackingIdItemIndex = 0;

			let foundNewTrackingId = false;

			while (true) {

				let completeSuccessTrackingIdItem = completeSuccessTrackingIdList[completeSuccessTrackingIdItemIndex];
				let prevCompleteSuccessTrackingIdItem = this.prevCompleteSuccessTrackingIdList[prevCompleteSuccessTrackingIdItemIndex];

				if (completeSuccessTrackingIdItem === prevCompleteSuccessTrackingIdItem) {

					//  values equal so advance both indexes
					completeSuccessTrackingIdItemIndex++;
					prevCompleteSuccessTrackingIdItemIndex++;

				} else {

					if (completeSuccessTrackingIdItem < prevCompleteSuccessTrackingIdItem) {

						//  Found new entry in completeSuccessTrackingIdItem

						foundNewTrackingId = true;

						break; //  EARLY EXIT FROM LOOP  
					}

					// completeSuccessTrackingIdItem > prevCompleteSuccessTrackingIdItem
					//   so advance prev 

					prevCompleteSuccessTrackingIdItemIndex++;

				}

				if (prevCompleteSuccessTrackingIdItemIndex >= this.prevCompleteSuccessTrackingIdList.length) {

					//  Came to end of prev list

					if (completeSuccessTrackingIdItemIndex < completeSuccessTrackingIdList.length) {

						//  Not at end of current list so has at least one new entry

						foundNewTrackingId = true;

						break; //  EARLY EXIT FROM LOOP  
					}

					//   At end of both lists so they match

					break; //  EARLY EXIT FROM LOOP  
				}
			}

			if (foundNewTrackingId) {


				//  Found new complete successful tracking id so prompt user to refresh page

				this.openUploadedCompletedSuccessfullyOverlay();
			}
		}

		//  save current as prev
		this.prevCompleteSuccessTrackingIdList = completeSuccessTrackingIdList;

	};


	openUploadedCompletedSuccessfullyOverlay() {
		
		//  TODO TEMP
		if ( window.confirm( "A Search has finished importing.  Reload page to display this search?" ) ) {
			window.location.reload(true);
		}
		
		return;

		let $limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq = 
			$(".limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq");
		if ( $limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq.length === 0 ) {
			throw Error( "No Elements found with class 'limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq'" );
		}
		$limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq.show();
	};

	//	User clicked the "Cancel" button or clicked on the background

	cancelClicked(clickThis, eventObject) {

		let $limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq = 
			$(".limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq");
		if ( $limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq.length === 0 ) {
			throw Error( "No Elements found with class 'limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq'" );
		}
		$limelight_xml_file_upload_complete_successfully_overlay_show_hide_parts_jq.hide();
	};

	//	User clicked the "Refresh" button 

	refreshPageClicked(clickThis, eventObject) {

		//  reload current URL

		window.location.reload(true);
	};



}