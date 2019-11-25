/**
 * projectPage_SearchesAdmin.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Searches Admin
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

//  Local imports

import { ProjectPage_SearchesAdmin_CopyMove_Searches } from "./projectPage_SearchesAdmin_CopyMove_Searches.js";

import { ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders } from "./projectPage_SearchesAdmin_OrganizeSearchesAndFolders.js";

/**
 * 
 */
export class ProjectPage_SearchesAdmin {

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ projectIdentifierFromURL }) {

		this._initializeCalled = false;

        this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._projectPage_SearchesAdmin_CopyMove_Searches = new ProjectPage_SearchesAdmin_CopyMove_Searches({ projectIdentifierFromURL });
		
		this._projectPage_SearchesAdmin_OrganizeSearchesAndFolders = new ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders({ projectIdentifierFromURL });
    }

	/**
	 * 
	 */
	initialize( { projectPage_SearchesSection_AllUsersInteraction }) {

        this._projectPage_SearchesSection_AllUsersInteraction = projectPage_SearchesSection_AllUsersInteraction;

		this._projectPage_SearchesAdmin_CopyMove_Searches.initialize( { projectPage_SearchesSection_AllUsersInteraction });
		
		this._projectPage_SearchesAdmin_OrganizeSearchesAndFolders.initialize( { projectPage_SearchesSection_AllUsersInteraction });

        this._initializeCalled = true;
    }

	/**
	 * Called each time the search list is populated, which means that also the buttons above and below were removed
	 */
	searchListPopulated() {

		this._projectPage_SearchesAdmin_CopyMove_Searches.searchListPopulated();
		
		this._projectPage_SearchesAdmin_OrganizeSearchesAndFolders.searchListPopulated();
    }

	/**
	 * 
	 */
	addChangeHandlersSelectSearch({ projectSearchId, searchId, $search_entry }) {

        this._projectPage_SearchesAdmin_CopyMove_Searches.addChangeHandlersSelectSearch({projectSearchId, searchId, $search_entry});
	}

	/**
	 * 
	 */
	addClickHandlersDeleteSearch({ projectSearchId, searchId, $search_entry }) {

		let objectThis = this;

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let $delete_search_jq = $search_entry.find(".delete_search_jq");
		if ($delete_search_jq.length === 0) {
			throw Error("Unable to find '.delete_search_jq'");
		}
		$delete_search_jq.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._deleteSearch({
					clickThis ,
					projectSearchId ,
					searchId
				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	addClickHandlersChangeSearchName({projectSearchId, $search_entry}) {

		let objectThis = this;

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let $edit_search_name_jq = $search_entry.find(".edit_search_name_jq");
		if ($edit_search_name_jq.length === 0) {
			throw Error("Unable to find '.edit_search_name_jq'");
		}
		$edit_search_name_jq.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._openChangeSearchName({
					clickThis ,
					projectSearchId
				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		let $change_search_name_save_jq = $search_entry.find(".change_search_name_save_jq");
		if ($change_search_name_save_jq.length === 0) {
			throw Error("Unable to find '.change_search_name_save_jq'");
		}
		$change_search_name_save_jq.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._saveSearchName({
					clickThis ,
					projectSearchId
				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		let $change_search_name_cancel_jq = $search_entry.find(".change_search_name_cancel_jq");
		if ($change_search_name_cancel_jq.length === 0) {
			throw Error("Unable to find '.change_search_name_cancel_jq'");
		}
		$change_search_name_cancel_jq.click(function(eventObject) {
			try {
				event.preventDefault(); // to stop the 
				let clickThis = this;
				objectThis._cancelChangeSearchName({
					clickThis ,
					projectSearchId
				});
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_openChangeSearchName({clickThis, projectSearchId}) {
		let $clickThis = $(clickThis);
		let $selector_single_search_main_root_container = $clickThis.closest(".selector_single_search_main_root_container");

		let $search_name_jq = $selector_single_search_main_root_container.find(".search_name_jq");
		let search_name = $search_name_jq.text();
		let $change_search_name_input_jq = $selector_single_search_main_root_container.find(".change_search_name_input_jq");
		$change_search_name_input_jq.val(search_name);

		let $change_search_name_container_jq = $selector_single_search_main_root_container.find(".change_search_name_container_jq");
		$change_search_name_container_jq.show();

		$change_search_name_input_jq.focus();

		const $search_name_edit_name_container_jq = $selector_single_search_main_root_container.find(".search_name_edit_name_container_jq");
		$search_name_edit_name_container_jq.hide();
	}

	/**
	 * 
	 */
	_saveSearchName({clickThis, projectSearchId}) {

		let objectThis = this;

		let $clickThis = $(clickThis);
		let $selector_single_search_main_root_container = $clickThis.closest(".selector_single_search_main_root_container");

		let $change_search_name_input_jq = $selector_single_search_main_root_container.find(".change_search_name_input_jq");
		let newSearchName = $change_search_name_input_jq.val();

		let requestObj = {
			projectSearchId : projectSearchId,
			searchName : newSearchName
		};

		const url = "d/rws/for-page/update-search-name";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._saveSearchNameResponse({
					requestObj ,
					responseData ,
					clickThis
				});

			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_saveSearchNameResponse({requestObj, responseData, clickThis}) {
		if (!responseData.status) {
			throw Error("responseData.status not true");
		}

		let $clickThis = $(clickThis);
		let $selector_single_search_main_root_container = $clickThis.closest(".selector_single_search_main_root_container");

		let $search_name_jq = $selector_single_search_main_root_container.find(".search_name_jq");
		$search_name_jq.text(requestObj.searchName);

		this._closeChangeSearchName({
			clickThis
		});
	}

	/**
	 * 
	 */
	_cancelChangeSearchName({clickThis, projectSearchId}) {
		this._closeChangeSearchName({
			clickThis
		});
	}

	/**
	 * 
	 */
	_closeChangeSearchName({clickThis}) {
		let $clickThis = $(clickThis);
		let $selector_single_search_main_root_container = $clickThis.closest(".selector_single_search_main_root_container");

		let $change_search_name_container_jq = $selector_single_search_main_root_container.find(".change_search_name_container_jq");
		$change_search_name_container_jq.hide();

		const $search_name_edit_name_container_jq = $selector_single_search_main_root_container.find(".search_name_edit_name_container_jq");
		$search_name_edit_name_container_jq.show();
	}

	/**
	 * Delete this Project Search Id
	 */
	_deleteSearch({clickThis, projectSearchId, searchId}) {

		const objectThis = this;

		if ( ! window.confirm("Delete Search Id: " + searchId ) ) {
			return;
		}

		let requestObj = {
			projectSearchId : projectSearchId
		};

		const url = "d/rws/for-page/delete-project-search";

		const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

		promise_webserviceCallStandardPost.catch( () => { }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._deleteSearchResponse({ responseData });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	}

	/**
	 * Delete this Project Search Id
	 */
	_deleteSearchResponse({responseData}) {

		this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
    }

}
