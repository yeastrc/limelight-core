/**
 * projectPage_SearchDetails_AllUsers.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Search Details When a Search is expanded.  All Users
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

import { _AJAX_POST_JSON_CONTENT_TYPE, getWebserviceSyncTrackingCode } from 'page_js/EveryPageCommon.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';
import { handleAJAXError, handleAJAXFailure } from 'page_js/handleServicesAJAXErrors.js';

import { SearchDetails_GetCoreDataFromServer } from 'page_js/data_pages/data_pages_common/searchDetails_GetDataFromServer_Core.js';

//  Local imports

/**
 * 
 */
export class ProjectPage_SearchDetails_AllUsers {

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
    constructor({ projectIdentifierFromURL, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX,
        projectPage_SearchDetails_LoggedInUsers
    }) {

        this._initializeCalled = false;
        
        this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX;
        this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX;

        this._projectPage_SearchDetails_LoggedInUsers = projectPage_SearchDetails_LoggedInUsers;

		this._searchDetails_GetCoreDataFromServer = new SearchDetails_GetCoreDataFromServer();

		if (!_project_page_searches_section_all_users_interaction_template.searchDetails_ExpandSearchContents_ProjectPageAdditions) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searchDetails_ExpandSearchContents_ProjectPageAdditions");
		}
		this._searchDetails_ExpandSearchContents_ProjectPageAdditions = _project_page_searches_section_all_users_interaction_template.searchDetails_ExpandSearchContents_ProjectPageAdditions;

		if (!_project_page_searches_section_all_users_interaction_template.searchDetails_WeblinksEntry) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searchDetails_WeblinksEntry");
		}
		this._searchDetails_WeblinksEntry = _project_page_searches_section_all_users_interaction_template.searchDetails_WeblinksEntry;

		if (!_project_page_searches_section_all_users_interaction_template.searchDetails_CommentEntry) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searchDetails_CommentEntry");
		}
		this._searchDetails_CommentEntry = _project_page_searches_section_all_users_interaction_template.searchDetails_CommentEntry;

		this._searchDetailsExpanded_ProjectSearchIds = new Set(); // ProjectSearchIds where Search Details Currently expanded

		this._searchDetailsDataLoaded_ProjectSearchIds = new Set();
		this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds = new Set();
    }

	/**
	 * 
	 */
	initialize( {}) {

        this._initializeCalled = true;
    }

	/**
	 * 
	 */
	searchListCleared() {

		this._searchDetailsExpanded_ProjectSearchIds = new Set();
		this._searchDetailsDataLoaded_ProjectSearchIds = new Set();
		this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds = new Set();
    }


	/**
	 * for HTML in single_search_expansion_icon_template.handlebars
	 */
	addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, searchItem }) {

		const objectThis = this;

		const projectSearchId = searchItem.projectSearchId;
		const searchId = searchItem.searchId;

		const $selector_search_item_expand = $expansion_entry.find(".selector_search_item_expand");
		if ( $selector_search_item_expand.length === 0 ) {
			throw Error("No DOM element found with class 'selector_search_item_expand'");
		}
		$selector_search_item_expand.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._showSearchDetailsClicked({ projectSearchId });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
		});

		const $selector_search_item_collapse = $expansion_entry.find(".selector_search_item_collapse");
		if ( $selector_search_item_collapse.length === 0 ) {
			throw Error("No DOM element found with class 'selector_search_item_collapse'");
		}
		$selector_search_item_collapse.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._hideSearchDetailsClicked({ projectSearchId });
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
	addSearch_MainBlock_ClickHandlers({ $search_entry, searchItem }) {

		const objectThis = this;

		const projectSearchId = searchItem.projectSearchId;
		const searchId = searchItem.searchId;

		const $search_name_and_id_jq = $search_entry.find(".search_name_and_id_jq");
		if ( $search_name_and_id_jq.length === 0 ) {
			throw Error("No DOM element found with class 'search_name_and_id_jq'");
		}
		$search_name_and_id_jq.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._toggle_ShowHide_SearchDetails_Clicked({ projectSearchId });
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
	_toggle_ShowHide_SearchDetails_Clicked({ projectSearchId }) {
			
		// disable code from running when user was highlighting text
		let sel = window.getSelection().toString();
		if(sel){
			return false;
		}

		if ( this._searchDetailsExpanded_ProjectSearchIds.has( projectSearchId ) ) {
			this._hideSearchDetailsClicked({ projectSearchId });
		} else {
			this._showSearchDetailsClicked({ projectSearchId });
		}
	}

	/**
	 * 
	 */
	_hideSearchDetailsClicked({ projectSearchId }) {

		this._searchDetailsExpanded_ProjectSearchIds.delete( projectSearchId );

		const DOM_Id_MainSearchElement = this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX + projectSearchId;
		const $DOM_Id_MainSearchElement = $("#" + DOM_Id_MainSearchElement );
		if ( $DOM_Id_MainSearchElement.length === 0 ) {
			throw Error("Failed to find DOM element with id '" + DOM_Id_MainSearchElement + "'");
		}

		const $selector_search_details_container = $DOM_Id_MainSearchElement.find(".selector_search_details_container");
		if ( $selector_search_details_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_details_container'");
		}

		$selector_search_details_container.hide();

		//  Show Pointer Down 
		const DOM_Id_ExpandCollapseSearchElement = this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX + projectSearchId;
		const $DOM_Id_ExpandCollapseSearchElement = $("#" + DOM_Id_ExpandCollapseSearchElement );
		if ( $DOM_Id_ExpandCollapseSearchElement.length === 0 ) {
			throw Error("Failed to find DOM element with id '" + DOM_Id_ExpandCollapseSearchElement + "'");
		}

		const $selector_search_item_expand = $DOM_Id_ExpandCollapseSearchElement.find(".selector_search_item_expand");
		if ( $selector_search_item_expand.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_expand'");
		}
		$selector_search_item_expand.show();

		const $selector_search_item_collapse = $DOM_Id_ExpandCollapseSearchElement.find(".selector_search_item_collapse");
		if ( $selector_search_item_collapse.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_collapse'");
		}
		$selector_search_item_collapse.hide();

	}

	/**
	 * 
	 */
	_showSearchDetailsClicked({ projectSearchId }) {

		const objectThis = this;

		if ( this._searchDetailsDataLoaded_ProjectSearchIds.has( projectSearchId ) ) {

			this._displaySearchDetails_SingleProjectSearchId({ projectSearchId });
			return;
		}

		const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : [ projectSearchId ] });

		promise_getSearchDetails.then((searchDetailsResultsCombined) => {

			objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined });
		})
	}

	/**
	 * 
	 */
	_getSearchDetails({ projectSearchIds }) {

		const objectThis = this;

		return new Promise((resolve, reject) => {

			for ( const projectSearchId of projectSearchIds ) {
				this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds.add( projectSearchId );
			}

			const promise_searchDetailsCoreDataHTML = objectThis._searchDetails_GetCoreDataFromServer.getSearchDetails_CoreDataFromServer({ projectSearchIds });

			const promise_searchDetailsProjectPageDataHTML = objectThis._get_SearchDetailsProjectPageDataHTML({ projectSearchIds });

			Promise.all( [ promise_searchDetailsCoreDataHTML, promise_searchDetailsProjectPageDataHTML ] ).then((promiseResults) => {

				//  Combine promise results, each promise result has a different property

				const searchDetailsResultsCombined = {};

				for ( const promiseResult of promiseResults ) {
					if (promiseResult.coreSearchDetails) {
						searchDetailsResultsCombined.coreSearchDetails = promiseResult.coreSearchDetails;
					}
					if (promiseResult.projectPageSearchDetails) {
						searchDetailsResultsCombined.projectPageSearchDetails = promiseResult.projectPageSearchDetails;
					}
				}

				resolve( searchDetailsResultsCombined );

			});


		});
	}

	/**
	 * 
	 */	
	_get_SearchDetailsProjectPageDataHTML({ projectSearchIds }) {

        const objectThis = this;

        return new Promise((resolve,reject) => {

			const _URL = "d/rws/for-page/psb/get-search-details-project-page/" + getWebserviceSyncTrackingCode();

			const requestObj = { projectSearchIds : projectSearchIds };

			const requestData = JSON.stringify( requestObj );

			// let request =
			$.ajax({
				type : "POST",
				url : _URL,
				data : requestData,
				contentType: _AJAX_POST_JSON_CONTENT_TYPE,
				dataType : "json",
				success : function( responseData ) {
					try {
						const promiseResponse = objectThis._getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData, projectSearchIds } );
						
						resolve( { projectPageSearchDetails : promiseResponse } );
						
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						
						reject();
						
						throw e;
					}
				},
				failure: function(errMsg) {
					handleAJAXFailure( errMsg );

					reject();
				},
				error : function(jqXHR, textStatus, errorThrown) {

					handleAJAXError(jqXHR, textStatus, errorThrown);

					reject();

					// alert( "exception: " + errorThrown + ", jqXHR: " + jqXHR + ",
					// textStatus: " + textStatus );
				}
			});

        })
	}

	/**
	 * 
	 */
    _getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData } ) {

		const rootWsResult = responseData.result;
		
		const resultPerProjectSearchId = rootWsResult.resultPerProjectSearchId;

        const dataPerProjectSearchId = new Map();

        for ( const wsResultPerProjectSearchId of resultPerProjectSearchId) {

			//  Determine if show weblinks block;
			let weblinksShowBlock = false;
			if ( rootWsResult.weblinksShowBlockAlways || ( wsResultPerProjectSearchId.webLinkList && wsResultPerProjectSearchId.webLinkList.length !== 0 ) ) {
				weblinksShowBlock = true;
			}

			//  Determine if show comments block;
			let commentsShowBlock = false;
			if ( rootWsResult.commentsShowBlockAlways || ( wsResultPerProjectSearchId.commentList && wsResultPerProjectSearchId.commentList.length !== 0 ) ) {
				commentsShowBlock = true;
			}

            const html = this._searchDetails_ExpandSearchContents_ProjectPageAdditions( { rootWsResult, wsResultPerProjectSearchId, weblinksShowBlock, commentsShowBlock } );

            dataPerProjectSearchId.set( wsResultPerProjectSearchId.projectSearchId, { data : wsResultPerProjectSearchId, html : html } );
        }

        const returnValue = { dataPerProjectSearchId, rootWsResult };

        return returnValue;
	}
	
	/**
	 * Called both when load data and when not need to load data
	 * 
	 * @param projectSearchId
	 * @param coreSearchDetailsForProjectSearchId - loaded data. undefined if not loaded data since already have data
	 */
	_displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined }) {

		const DOM_Id_MainSearchElement = this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX + projectSearchId;
		const $DOM_Id_MainSearchElement = $("#" + DOM_Id_MainSearchElement );
		if ( $DOM_Id_MainSearchElement.length === 0 ) {
			throw Error("Failed to find DOM element with id '" + DOM_Id_MainSearchElement + "'");
		}

		const $selector_search_details_container = $DOM_Id_MainSearchElement.find(".selector_search_details_container");
		if ( $selector_search_details_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_details_container'");
		}

		if ( searchDetailsResultsCombined ) {
		
			const coreSearchDetails = searchDetailsResultsCombined.coreSearchDetails;
			
			if ( coreSearchDetails ) {

				const coreSearchDetailsForProjectSearchId = coreSearchDetails.get(projectSearchId);
				if (!coreSearchDetailsForProjectSearchId) {
					throw Error("No Core Search Details for projectSearchId: " + projectSearchId);
				}
	
	
				if ( coreSearchDetailsForProjectSearchId ) {
	
					//  If have html, add add it
					const coreData = coreSearchDetailsForProjectSearchId.data;
					const coreHTML = coreSearchDetailsForProjectSearchId.html;
					
					$selector_search_details_container.empty();
	
					$selector_search_details_container.append( coreHTML );
				}
			}

			const projectPageSearchDetails = searchDetailsResultsCombined.projectPageSearchDetails;
			
			if ( projectPageSearchDetails ) {
	
				const projectPageSearchDetails_RootWsResult = projectPageSearchDetails.rootWsResult;
				const projectPageSearchDetails_ForProjectSearchIds = projectPageSearchDetails.dataPerProjectSearchId;
				
				if ( ! projectPageSearchDetails_ForProjectSearchIds ) {
					throw Error("projectPageSearchDetails.rootWsResult not populated");
				}
				if ( ! projectPageSearchDetails_ForProjectSearchIds ) {
					throw Error("projectPageSearchDetails.dataPerProjectSearchId not populated");
				}
				
				const projectPageSearchDetailsForProjectSearchId = projectPageSearchDetails_ForProjectSearchIds.get(projectSearchId);
				if (!projectPageSearchDetailsForProjectSearchId) {
					throw Error("No Project Page Search Details in projectPageSearchDetails.dataPerProjectSearchId for projectSearchId: " + projectSearchId);
				}
				
				const weblinksShowAddWeblinkLink = projectPageSearchDetails_RootWsResult.weblinksShowAddWeblinkLink;
				
				if ( projectPageSearchDetailsForProjectSearchId ) {
	
					//  If have html, add add it
					const data = projectPageSearchDetailsForProjectSearchId.data;
					const HTML = projectPageSearchDetailsForProjectSearchId.html;
					
					const $selector_search_details_root_table = $selector_search_details_container.find(".selector_search_details_root_table");
					if ( $selector_search_details_root_table.length === 0 ) {
						throw Error("Failed to find DOM element with class 'selector_search_details_root_table'");
					}
					if ( $selector_search_details_root_table.length !== 1 ) {
						throw Error("Found > 1 DOM element with class 'selector_search_details_root_table'");
					}
					const $tbody = $selector_search_details_root_table.children("tbody");
					if ( $tbody.length === 0 ) {
						throw Error("Failed to find DOM element 'tbody' as child under DOM element with class 'selector_search_details_root_table'");
					}
					if ( $tbody.length !== 1 ) {
						throw Error("Found > 1 DOM element 'tbody' as child under DOM element with class 'selector_search_details_root_table'");
					}
					
					$tbody.append( HTML );
	
					this._searchDetails_AdditionsForSubLists({ data, projectSearchId, $selector_search_details_container });
	
					this._searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container });
	
					this._attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container });
				}
			}

			this._searchDetailsDataLoaded_ProjectSearchIds.add( projectSearchId );
		}

		$selector_search_details_container.show();

		//  Show Pointer Down 
		const DOM_Id_ExpandCollapseSearchElement = this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX + projectSearchId;
		const $DOM_Id_ExpandCollapseSearchElement = $("#" + DOM_Id_ExpandCollapseSearchElement );
		if ( $DOM_Id_ExpandCollapseSearchElement.length === 0 ) {
			throw Error("Failed to find DOM element with id '" + DOM_Id_ExpandCollapseSearchElement + "'");
		}

		const $selector_search_item_expand = $DOM_Id_ExpandCollapseSearchElement.find(".selector_search_item_expand");
		if ( $selector_search_item_expand.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_expand'");
		}
		$selector_search_item_expand.hide();

		const $selector_search_item_collapse = $DOM_Id_ExpandCollapseSearchElement.find(".selector_search_item_collapse");
		if ( $selector_search_item_collapse.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_collapse'");
		}
		$selector_search_item_collapse.show();

		this._searchDetailsExpanded_ProjectSearchIds.add( projectSearchId );
	}


	
    ///////////////////////////////////////////

    //   Additions to Search Details Items Sub Lists, like Web Links

	/**
	 * 
	 */    
    _searchDetails_AdditionsForSubLists({ data, projectSearchId, $selector_search_details_container }) {

		const webLinkList = data.webLinkList;
		const commentList = data.commentList;

		if ( webLinkList && webLinkList.length !== 0 ) {

			const $selector_weblinks_list_container = $selector_search_details_container.find(".selector_weblinks_list_container");
			if ( $selector_weblinks_list_container.length === 0 ) {
				// Not added to the DOM so exit
				return; // EARLY EXIT
			}
			$selector_weblinks_list_container.empty();

			for ( const webLink of webLinkList ) {

				this.searchDetails_Weblinks_AddSingleEntry({ webLink, projectSearchId, $selector_weblinks_list_container });
			}
		}

		if ( commentList && commentList.length !== 0 ) {

			const $selector_comments_list_container = $selector_search_details_container.find(".selector_comments_list_container");
			if ( $selector_comments_list_container.length === 0 ) {
				// Not added to the DOM so exit
				return; // EARLY EXIT
			}
			$selector_comments_list_container.empty();

			for ( const comment of commentList ) {

				this.searchDetails_Comments_AddSingleEntry({ comment, projectSearchId, $selector_comments_list_container });
			}
		}

    }

	/**
	 * Also called to add entries to the container
	 */    
    searchDetails_Weblinks_AddSingleEntry({ webLink, projectSearchId, $selector_weblinks_list_container }) {
		
		if ( ! this._projectPage_SearchDetails_LoggedInUsers ) {
			webLink.canDelete = false;
		}

		const html = this._searchDetails_WeblinksEntry( webLink );
		const $weblinkEntry = $( html );

		$selector_weblinks_list_container.append( $weblinkEntry );

		if ( webLink.canDelete && this._projectPage_SearchDetails_LoggedInUsers ) {

			this._projectPage_SearchDetails_LoggedInUsers.searchDetails_DeleteWeblink_AddClickHandler({ projectSearchId, webLink, $weblinkEntry });
		}
	}

	/**
	 * Also called to add entries to the container
	 */    
	searchDetails_Comments_AddSingleEntry({ comment, projectSearchId, $selector_comments_list_container }) {

		if ( ! this._projectPage_SearchDetails_LoggedInUsers ) {
			comment.canEdit = false;
			comment.canDelete = false;
		}

		const html = this._searchDetails_CommentEntry( comment );
		const $commentEntry = $( html );

		$selector_comments_list_container.append( $commentEntry );

		if ( ( comment.canEdit || comment.canDelete ) && this._projectPage_SearchDetails_LoggedInUsers ) {

			this._projectPage_SearchDetails_LoggedInUsers.searchDetails_Edit_Delete_Comment_AddClickHandlers({ projectSearchId, comment, $commentEntry });
		}


	}


    ///////////////////////////////////////////

    //   Additions to Search Details Items for logged in users

	/**
	 * 
	 */    
    _searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container }) {

        if ( this._projectPage_SearchDetails_LoggedInUsers ) {
            this._projectPage_SearchDetails_LoggedInUsers.searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container });
        }
    }

	/**
	 * 
	 */
	displaySearchDetails_All({ searchDataLoaded_ProjectSearchIds }) {

		const objectThis = this;

		const projectSearchIdsGetFromServer = [];

		for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {

			if ( ! this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds.has( projectSearchId ) ) {
				projectSearchIdsGetFromServer.push( projectSearchId );
			}
		}

		if ( projectSearchIdsGetFromServer.length === 0 ) {

			//  No Data to Load. Expand All

			for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
				objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId });
			}
			return; // EARLY RETURN
		}

		const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : projectSearchIdsGetFromServer });

		promise_getSearchDetails.then((searchDetailsResultsCombined) => {

			for ( const projectSearchId of projectSearchIdsGetFromServer ) {

				objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined });
			}

			//  Then expand all

			for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
				objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId });
			}

		})
	}


	/**
	 * 
	 */
	hideSearchDetails_All({ searchDataLoaded_ProjectSearchIds }) {

		const objectThis = this;

		for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
			this._hideSearchDetailsClicked({ projectSearchId });
		}

    }
    
    ///////////////////////////////////////////

    //   Handlers for Search Details Items

	/**
	 * 
	 */    
    _attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container }) {

        const objectThis = this;

        const $selector_search_filename_download_fake_linkAll = $selector_search_details_container.find(".selector_search_filename_download_fake_link");
        $selector_search_filename_download_fake_linkAll.click(function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._downloadSearchFileClicked({ projectSearchId, clickedThis : this });
			} catch (e) {
				reportWebErrorToServer.reportErrorObjectToServer({
					errorException : e
				});
				throw e;
			}
        });

        if ( this._projectPage_SearchDetails_LoggedInUsers ) {

            this._projectPage_SearchDetails_LoggedInUsers.attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container });
        }
        
    }

	/**
	 * 
	 */        
    _downloadSearchFileClicked({ projectSearchId, clickedThis }) {

        const $selector_display_search_filename_outer_container = $( clickedThis ).closest(".selector_display_search_filename_outer_container");
        if ( $selector_display_search_filename_outer_container.length === 0 ) {
            throw Error("Failed to find DOM element with class 'selector_display_search_filename_outer_container'. _downloadSearchFileClicked(...) projectSearchId: " + projectSearchId );
        }
        const search_file_project_search_idString = $selector_display_search_filename_outer_container.attr("search_file_project_search_id");
        if ( search_file_project_search_idString === undefined || search_file_project_search_idString ===  null || search_file_project_search_idString === "" ) {
            throw Error("Attr 'search_file_project_search_id' not exist or is empty. _downloadSearchFileClicked(...) projectSearchId: " + projectSearchId );
        }
        const search_file_project_search_id = Number.parseInt( search_file_project_search_idString );
        if ( Number.isNaN( search_file_project_search_id ) ) {
            throw Error("Attr 'search_file_project_search_id' is not a number. _downloadSearchFileClicked(...). search_file_project_search_id: "
                + search_file_project_search_idString
                + ", projectSearchId: " + projectSearchId );
        }


        const requestJSONObject = {
            projectSearchId: projectSearchId,
            projectSearchFileId : search_file_project_search_id
        }

        const requestJSONString = JSON.stringify(requestJSONObject);

        //  Create and submit form

        const form = document.createElement("form");

        $(form).hide();

        form.setAttribute("method", "post");
        form.setAttribute("action", "d/dnld/psb/search-file");
        form.setAttribute("target", "_blank");

        const requestJSONStringField = document.createElement("textarea");
        requestJSONStringField.setAttribute("name", "requestJSONString");

        $(requestJSONStringField).text(requestJSONString);

        form.appendChild(requestJSONStringField);

        document.body.appendChild(form);    // Not entirely sure if this is necessary			

        try {
            form.submit();
        } finally {

            document.body.removeChild(form);
        }
    }
}
