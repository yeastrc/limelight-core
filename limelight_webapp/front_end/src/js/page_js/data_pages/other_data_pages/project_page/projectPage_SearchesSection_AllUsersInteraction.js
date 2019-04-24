/**
 * projectPage_SearchesSection_AllUsersInteraction.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Searches Section - Provide interaction for All Users (including public users when project is public) 
 * 
 * 
 */

//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

let _project_page_searches_section_all_users_interaction_template = require("../../../../../../handlebars_templates_precompiled/project_page_searches_section_all_users_interaction/project_page_searches_section_all_users_interaction_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

//  Local imports

import { ProjectPage_SearchDetails_AllUsers } from 'page_js/data_pages/other_data_pages/project_page/projectPage_SearchDetails_AllUsers.js';

//  prefix for DOM element 'id' attribute, followed by project search id
const _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_CHECKBOX_ID_PREFIX = "search_item_checkbox_root_id_";
const _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX = "search_item_expand_collapse_root_id_";
const _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX = "search_item_main_root_id_";

//  jQuery .data() keys

//    Stored on Root DOM element in single_search_main_template.handlebars with CSS class 
const _JQ_DATA_KEY__SEARCH_DETAILS_SHOWN = "SEARCH_DETAILS_SHOWN";

/**
 * 
 */
export class ProjectPage_SearchesSection_AllUsersInteraction {

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor({ 
		projectIdentifierFromURL, 
		projectPage_SearchesSection_LoggedInUsersInteraction, // object of class ProjectPage_SearchesSection_LoggedInUsersInteraction
		projectPage_SearchDetails_LoggedInUsers, // object of class ProjectPage_SearchDetails_LoggedInUsers
		projectPage_SearchesAdmin // object of class ProjectPage_SearchesAdmin
	}) {

		this._initializeCalled = false;

		this._projectIdentifierFromURL = projectIdentifierFromURL;

		this._projectPage_SearchesSection_LoggedInUsersInteraction = projectPage_SearchesSection_LoggedInUsersInteraction;
		this._projectPage_SearchesAdmin = projectPage_SearchesAdmin;

		this._projectPage_SearchDetails_AllUsers = new ProjectPage_SearchDetails_AllUsers({ 
			projectIdentifierFromURL, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX,
			projectPage_SearchDetails_LoggedInUsers
		});

		if ( projectPage_SearchDetails_LoggedInUsers ) {
			projectPage_SearchDetails_LoggedInUsers.initialize({ projectPage_SearchDetails_AllUsers : this._projectPage_SearchDetails_AllUsers });
		}

		if (!_project_page_searches_section_all_users_interaction_template.searches_container_template) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searches_container_template");
		}
		this._searches_container_template = _project_page_searches_section_all_users_interaction_template.searches_container_template;
		
		if (!_project_page_searches_section_all_users_interaction_template.single_search_main_template) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.single_search_main_template");
		}
		this._single_search_main_template = _project_page_searches_section_all_users_interaction_template.single_search_main_template;

		if (!_project_page_searches_section_all_users_interaction_template.single_search_expansion_icon_template) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.single_search_expansion_icon_template");
		}
		this._single_search_expansion_icon_template = _project_page_searches_section_all_users_interaction_template.single_search_expansion_icon_template;

		if (!_project_page_searches_section_all_users_interaction_template.single_search_checkbox_template) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.single_search_checkbox_template");
		}
		this._single_search_checkbox_template = _project_page_searches_section_all_users_interaction_template.single_search_checkbox_template;

		this._searchDataLoaded_ProjectSearchIds = new Set();
	}

	/**
	 * 
	 */
	initialize() {
		let objectThis = this;

		this._getPathsToDataPagesFromDOM();

		const $merge_peptide_view_button = $("#merge_peptide_view_button");
		$merge_peptide_view_button.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._mergePeptideViewButtonClicked({ clickedThis : this, eventObject });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
		const $merge_protein_view_button = $("#merge_protein_view_button");
		$merge_protein_view_button.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._mergeProteinViewButtonClicked({ clickedThis : this, eventObject });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
		const $merge_mod_view_button = $("#merge_mod_view_button");
		$merge_mod_view_button.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._mergeModViewButtonClicked({ clickedThis : this, eventObject });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		this._initializeCalled = true;
	};

	/**
	 * DOM <script> tags hold the paths to the data pages
	 */
	_getPathsToDataPagesFromDOM() {

		let url_path__peptideElement = document.getElementById("url_path__peptide");
		if (!url_path__peptideElement) {
			throw Error("No DOM element for id 'url_path__peptide'");
		}
		this._url_path__peptide = url_path__peptideElement.innerHTML;

		let url_path__proteinElement = document.getElementById("url_path__protein");
		if (!url_path__proteinElement) {
			throw Error("No DOM element for id 'url_path__protein'");
		}
		this._url_path__protein = url_path__proteinElement.innerHTML;

		let url_path__mod_viewElement = document.getElementById("url_path__mod_view");
		if (!url_path__mod_viewElement) {
			throw Error("No DOM element for id 'url_path__mod_view'");
		}
		this._url_path__mod_view = url_path__mod_viewElement.innerHTML;

		let url_path__test_mike_webservicesElement = document.getElementById("url_path__test_mike_webservices");
		if (!url_path__test_mike_webservicesElement) {
			throw Error("No DOM element for id 'url_path__test_mike_webservices'");
		}
		this._url_path__test_mike_webservices = url_path__test_mike_webservicesElement.innerHTML;

	};

	/**
	 * Merge Peptide View button clicked
	 */
	_mergePeptideViewButtonClicked({ clickedThis, eventObject }) {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let ctrlKeyOrMetaKey = false;
		if ( eventObject.ctrlKey || eventObject.metaKey ) {
			ctrlKeyOrMetaKey = true;
		}

		this._mergePeptideView({ ctrlKeyOrMetaKey })
	};

	/**
	 * Merge Peptide View 
	 */
	_mergePeptideView({ ctrlKeyOrMetaKey }) {

		let objectThis = this;

		let projectSearchIdsSelected = this._getSelectedSearchesForMerge();
		if (!projectSearchIdsSelected) {
			return;
		}

		const promise_getSearchDataLookupParamsCode_ForMerge = this._getSearchDataLookupParamsCode_ForMerge({ projectSearchIds : projectSearchIdsSelected });

		let newWindow = null;

		if ( ctrlKeyOrMetaKey ) {

			//  Ctrl or meta (command on mac) key pressed while button clicked
			// Open URL in new window
			newWindow = window.open( "", "_blank", "" );
		}

		promise_getSearchDataLookupParamsCode_ForMerge.catch((reason) => { });

		promise_getSearchDataLookupParamsCode_ForMerge.then((result) => { 
			try {
				const url = this._url_path__peptide + result.searchDataLookupParamsCode;
				objectThis._goToURL_MergeDataPage({ url, newWindow });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * Merge Protein View button clicked
	 */
	_mergeProteinViewButtonClicked({ clickedThis, eventObject }) {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let ctrlKeyOrMetaKey = false;
		if ( eventObject.ctrlKey || eventObject.metaKey ) {
			ctrlKeyOrMetaKey = true;
		}

		this._mergeProteinView({ ctrlKeyOrMetaKey })
	};

	/**
	 * Merge Protein View 
	 */
	_mergeProteinView({ ctrlKeyOrMetaKey }) {

		let objectThis = this;

		let projectSearchIdsSelected = this._getSelectedSearchesForMerge();
		if (!projectSearchIdsSelected) {
			return;
		}

		const promise_getSearchDataLookupParamsCode_ForMerge = this._getSearchDataLookupParamsCode_ForMerge({ projectSearchIds : projectSearchIdsSelected });

		let newWindow = null;

		if ( ctrlKeyOrMetaKey ) {

			//  Ctrl or meta (command on mac) key pressed while button clicked
			// Open URL in new window
			newWindow = window.open( "", "_blank", "" );
		}

		promise_getSearchDataLookupParamsCode_ForMerge.catch((reason) => { });

		promise_getSearchDataLookupParamsCode_ForMerge.then((result) => { 
			try {
				const url = this._url_path__protein + result.searchDataLookupParamsCode;
				objectThis._goToURL_MergeDataPage({ url, newWindow });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * Merge Mod View button clicked
	 */
	_mergeModViewButtonClicked({ clickedThis, eventObject }) {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let ctrlKeyOrMetaKey = false;
		if ( eventObject.ctrlKey || eventObject.metaKey ) {
			ctrlKeyOrMetaKey = true;
		}

		this._mergeModView({ ctrlKeyOrMetaKey })
	};

	/**
	 * Merge Mod View 
	 */
	_mergeModView({ ctrlKeyOrMetaKey }) {

		let objectThis = this;

		let projectSearchIdsSelected = this._getSelectedSearchesForMerge();
		if (!projectSearchIdsSelected) {
			return;
		}

		const promise_getSearchDataLookupParamsCode_ForMerge = this._getSearchDataLookupParamsCode_ForMerge({ projectSearchIds : projectSearchIdsSelected });

		let newWindow = null;

		if ( ctrlKeyOrMetaKey ) {

			//  Ctrl or meta (command on mac) key pressed while button clicked
			// Open URL in new window
			newWindow = window.open( "", "_blank", "" );
		}

		promise_getSearchDataLookupParamsCode_ForMerge.catch((reason) => { });

		promise_getSearchDataLookupParamsCode_ForMerge.then((result) => { 
			try {
				const url = this._url_path__mod_view + result.searchDataLookupParamsCode;
				objectThis._goToURL_MergeDataPage({ url, newWindow });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	};

	/**
	 * Go to Merge URL
	 */
	_goToURL_MergeDataPage({ url, newWindow }) {

		//  CANNOT OPEN WINDOW HERE - MUST Open the window before make the AJAX call

		// if ( ctrlKeyOrMetaKey ) {

		// 	//  Ctrl or meta (command on mac) key pressed while button clicked
		// 	// Open URL in new window
		// 	const openResult = window.open( url, "_blank", "" );
		// 	return;
		// }

		if ( newWindow != null ) {

			newWindow.location.href = url;
			return;
		}
		
		window.location.href = url;
	}

	/**
	 * Get searchDataLookupParamsCode for merged Project Search Ids
	 */
	_getSearchDataLookupParamsCode_ForMerge({projectSearchIds}) {

        const objectThis = this;

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}
		if (!projectSearchIds) {
			throw Error("No value for projectSearchIds")
		}

        return new Promise((resolve,reject) => {
						try {
								let requestObj = {
									projectSearchIds_CreateDefault : projectSearchIds,
									sjklwuiowerzUIryhnIOWzq : true
								};

								const url = "d/rws/for-page/psb/get-search-data-lookup-params-code";

								const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

								promise_webserviceCallStandardPost.catch( () => { reject() }  );

								promise_webserviceCallStandardPost.then( ({ responseData }) => {
										try {
												const searchDataLookupParamsCode = responseData.searchDataLookupParamsCode;
												if (!searchDataLookupParamsCode) {
													throw Error("No value for responseData.searchDataLookupParamsCode");
												}
												resolve({ searchDataLookupParamsCode })

										} catch (e) {
												reportWebErrorToServer.reportErrorObjectToServer({errorException : e});
												reject(e);
												throw e;
										}
								});
						} catch( e ) {
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
						}
			});
	};

	/**
	 *
	 * 
	 * !!!!  WARNING:  This will not properly handle duplicate selected entries for the same project search id
	 */
	getSelectedSearches() {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let projectSearchIdsSearchIdsSelected = [];

		let $single_search_checkbox_jqAll = $(".single_search_checkbox_jq");
		$single_search_checkbox_jqAll.each(function(index, element) {
			let $single_search_checkbox_jq = $(this);

			if (!$single_search_checkbox_jq.prop('checked')) {
				return; // EARLY EXIT loop iteration
			}

			let $selector_grid_item_root = $single_search_checkbox_jq.closest(".selector_grid_item_root");
			if ( $selector_grid_item_root.length === 0 ) {
				throw Error("No DOM element with class 'selector_grid_item_root' found");
			}

			let project_search_idString = $selector_grid_item_root.attr("data-project_search_id");
			let search_idString = $selector_grid_item_root.attr("data-search_id");

			let projectSearchId = Number(project_search_idString);
			let searchId = Number(search_idString);

			if ( Number.isNaN(projectSearchId) ) {
				throw Error("project_search_idString is not a number: " + project_search_idString )
			}
			if ( Number.isNaN(searchId) ) {
				throw Error("search_idString is not a number: " + search_idString )
			}

			let projectSearchIdsSearchIdsSelectedItem = {
				projectSearchId : projectSearchId,
				searchId : searchId
			};
			projectSearchIdsSearchIdsSelected.push(projectSearchIdsSearchIdsSelectedItem);
		});

		return projectSearchIdsSearchIdsSelected;
	}

	/**
	 * return null or projectSearchIdsSelected
	 * 
	 * !!!!  WARNING:  This will not properly handle duplicate selected entries for the same project search id
	 */
	_getSelectedSearchesForMerge() {

		let projectSearchIdsSearchIdsSelected = this.getSelectedSearches();

		if (projectSearchIdsSearchIdsSelected.length < 2) {
			$("#need_2_or_more_searches_selected_to_merge_msg").show();
			return null; // EARLY EXIT
		}

		//  Sort on search id
		projectSearchIdsSearchIdsSelected.sort(function(a, b) {
			if (a.searchId < b.searchId) {
				return -1;
			}
			if (a.searchId > b.searchId) {
				return 1;
			}
			return 0;
		})

		//  Copy to array of just project each ids
		let projectSearchIdsSelected = [];
		projectSearchIdsSearchIdsSelected.forEach(function(element, index, array) {
			projectSearchIdsSelected.push(element.projectSearchId);
		}, this);

		return projectSearchIdsSelected;
	}

	/**
	 * 
	 */
	getSearchList() {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let objectThis = this;

		let projectIdentifier = this._projectIdentifierFromURL;

		let requestObj = {
			projectIdentifier : projectIdentifier
		};

		const url = "d/rws/for-page/project-view-page-search-list";

		const promise_webserviceCallStandardPost = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

		promise_webserviceCallStandardPost.catch( () => {  }  );

		promise_webserviceCallStandardPost.then( ({ responseData }) => {
			try {
				objectThis._getSearchListResponse(responseData);
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});
	};

	/**
	 * 
	 */
	_getSearchListResponse(responseData) {

		if (!this._initializeCalled) {
			throw Error("initialize method not called");
		}

		let searchList = responseData.searchList;

		let $search_list = $("#search_list");

		$search_list.empty();

		this._searchDataLoaded_ProjectSearchIds = new Set();

		this._projectPage_SearchDetails_AllUsers.searchListCleared();

		//		let $selector_single_search_main_root_container_List = $search_list.find(".selector_single_search_main_root_container");
		//
		//		let $search_separator_row_jq_List = $search_list.find(".search_separator_row_jq");

		if ( (!searchList) || searchList.length === 0 ) {
			//  No searchList for identifier

			//  Hide buttons above and below search list since no search list

			const $search_list_above_block = $("#search_list_above_block");
			$search_list_above_block.hide();
			const $search_list_below_block = $("#search_list_below_block");
			$search_list_below_block.hide();

			if ( this._projectPage_SearchesSection_LoggedInUsersInteraction ) {
				//  have _projectPage_SearchesSection_LoggedInUsersInteraction object so call method on it
				this._projectPage_SearchesSection_LoggedInUsersInteraction.searchListPopulated();
			}

			if ( this._projectPage_SearchesAdmin ) {
				//  have _projectPage_SearchesAdmin object so call method on it
				this._projectPage_SearchesAdmin.searchListPopulated();
			}

			return; // EARY EXIT
		}

		//		$selector_single_search_main_root_container_List.remove();
		//
		//		$search_separator_row_jq_List.remove();


		if (searchList && searchList.length > 0) {

			//  Show buttons above and below search list since yes search list

			const $search_list_above_block = $("#search_list_above_block");
			$search_list_above_block.show();
			const $search_list_below_block = $("#search_list_below_block");
			$search_list_below_block.show();

			//  Add inner search list container

			const canSelectSearches = true;

			// let canSelectSearches = false;

			// //  For now, only select searches when Searches Admin Object provided
			// if ( this._projectPage_SearchesAdmin ) {
			// 	canSelectSearches = true;
			// }

			const searchesContainerContext = { canSelectSearches };

			const searches_containerHTML = this._searches_container_template(searchesContainerContext);
			const $searches_container = $( searches_containerHTML );
			$searches_container.appendTo( $search_list );

			//  Sort on search id in reverse order
			searchList.sort(function(a, b) {
				if (a.searchId < b.searchId) {
					return 1;
				}
				if (a.searchId > b.searchId) {
					return -1;
				}
				return 0;
			})

			for ( const searchItem of searchList ) {

				this._searchDataLoaded_ProjectSearchIds.add( searchItem.projectSearchId );

				{
					const rootDOM_Element_Id = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_CHECKBOX_ID_PREFIX + searchItem.projectSearchId
					
					const checkbox_HTML = this._single_search_checkbox_template({ searchItem : searchItem, rootElementId : rootDOM_Element_Id });

					const $checkbox_entry = $(checkbox_HTML);
					$checkbox_entry.appendTo( $searches_container );

					if ( canSelectSearches && this._projectPage_SearchesAdmin ) {

						this._projectPage_SearchesAdmin.addChangeHandlersSelectSearch({
						projectSearchId : searchItem.projectSearchId,
						searchId : searchItem.searchId,
						$search_entry : $checkbox_entry });
					}
				}

				{
					const rootDOM_Element_Id = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX + searchItem.projectSearchId
					
					const expansion_HTML = this._single_search_expansion_icon_template({ searchItem : searchItem, rootElementId : rootDOM_Element_Id });

					const $expansion_entry = $(expansion_HTML);
					$expansion_entry.appendTo( $searches_container );

					this._addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, searchItem });
				}

				const rootDOM_Element_Id = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX + searchItem.projectSearchId

				let context = {
					searchItem : searchItem,
					url_path__peptide : this._url_path__peptide,
					url_path__protein : this._url_path__protein,
					url_path__mod_view : this._url_path__mod_view,
					url_path__test_mike_webservices : this._url_path__test_mike_webservices,

					rootElementId : rootDOM_Element_Id
				};

				const searchEntry_HTML = this._single_search_main_template(context);

				const $search_entry = $(searchEntry_HTML);

				$search_entry.appendTo( $searches_container );

				this._addSearch_MainBlock_ClickHandlers({ $search_entry, searchItem });

			}

			//			addToolTips();

		} else {

			//			let noDataMsg = $("#project_entry_no_data_template_div").html();

			//			$search_list.html(noDataMsg);
		}
		
		if ( this._projectPage_SearchesSection_LoggedInUsersInteraction ) {
			//  have _projectPage_SearchesSection_LoggedInUsersInteraction object so call method on it
			this._projectPage_SearchesSection_LoggedInUsersInteraction.searchListPopulated();
		}

		if ( this._projectPage_SearchesAdmin ) {
			// only when Searches Admin Object provided
			this._projectPage_SearchesAdmin.searchListPopulated();
		}

	};

	/**
	 * for HTML in single_search_expansion_icon_template.handlebars
	 */
	_addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, searchItem }) {

		this._projectPage_SearchDetails_AllUsers.addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, searchItem });
	}

	/**
	 * 
	 */
	_addSearch_MainBlock_ClickHandlers({ $search_entry, searchItem }) {

		const objectThis = this;

		const projectSearchId = searchItem.projectSearchId;
		const searchId = searchItem.searchId;

		this._projectPage_SearchDetails_AllUsers.addSearch_MainBlock_ClickHandlers({ $search_entry, searchItem });

		//  Other click handlers in object this._projectPage_SearchesAdmin, if user allowed

		if (searchItem.canChangeSearchName && this._projectPage_SearchesAdmin) {
			this._projectPage_SearchesAdmin.addClickHandlersChangeSearchName({
				projectSearchId : searchItem.projectSearchId,
				$search_entry
			});
		}
		if (searchItem.canDelete && this._projectPage_SearchesAdmin) {
			this._projectPage_SearchesAdmin.addClickHandlersDeleteSearch({
				projectSearchId : searchItem.projectSearchId,
				searchId : searchItem.searchId,
				$search_entry
			});
		}


	}

	displaySearchDetails_All() {

		this._projectPage_SearchDetails_AllUsers.displaySearchDetails_All({ searchDataLoaded_ProjectSearchIds : this._searchDataLoaded_ProjectSearchIds });
	}

	hideSearchDetails_All() {

		this._projectPage_SearchDetails_AllUsers.hideSearchDetails_All({ searchDataLoaded_ProjectSearchIds : this._searchDataLoaded_ProjectSearchIds });
	}
}
