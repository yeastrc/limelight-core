/**
 * projectPage_SearchDetails_AllUsers.ts
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

// @ts-ignore
import { _project_page_searches_section_all_users_interaction_template } from './projectPage__Common__ImportHandlebarsTemplates'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { addToolTips, addSingleGenericAppSpecificToolTip } from 'page_js/common_all_pages/genericToolTip';

import { SearchDetails_GetCoreDataFromServer } from 'page_js/data_pages/data_pages_common/searchDetails_GetDataFromServer_Core';
import {ProjectPage_SearchDetails_LoggedInUsers} from "page_js/data_pages/other_data_pages/project_page/projectPage_SearchDetails_LoggedInUsers";

//  Local imports

/**
 * 
 */
export class ProjectPage_SearchDetails_AllUsers {


	private _initializeCalled = false;

	private _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX: string;
	private _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX: string;

	private _projectPage_SearchDetails_LoggedInUsers: ProjectPage_SearchDetails_LoggedInUsers;

	private _searchDetails_GetCoreDataFromServer = new SearchDetails_GetCoreDataFromServer();

	private _searchDetails_ExpandSearchContents_ProjectPageAdditions = _project_page_searches_section_all_users_interaction_template.searchDetails_ExpandSearchContents_ProjectPageAdditions;

	private _searchDetails_WeblinksEntry = _project_page_searches_section_all_users_interaction_template.searchDetails_WeblinksEntry;

	private _searchDetails_CommentEntry = _project_page_searches_section_all_users_interaction_template.searchDetails_CommentEntry;

	private _searchDetailsExpanded_ProjectSearchIds = new Set(); // ProjectSearchIds where Search Details Currently expanded

	private _searchDetailsDataLoaded_ProjectSearchIds = new Set();
	private _searchDetailsDataLoadedOrInProgress_ProjectSearchIds = new Set();

	/**
	 * searchSelectionChangeCallback - function called when the search selection changes
	 */
	constructor(
		{
			projectIdentifierFromURL, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX,
			projectPage_SearchDetails_LoggedInUsers
		}: {
			projectIdentifierFromURL: string, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX: string, _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX: string,
			projectPage_SearchDetails_LoggedInUsers: ProjectPage_SearchDetails_LoggedInUsers
		}) {



        this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_COLLAPSE_EXPAND_ID_PREFIX;
        this._SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX = _SEARCH_ITEM_GRID_DOM_ELEMENT_FOR_MAIN_ID_PREFIX;

        this._projectPage_SearchDetails_LoggedInUsers = projectPage_SearchDetails_LoggedInUsers;

		if (!_project_page_searches_section_all_users_interaction_template.searchDetails_ExpandSearchContents_ProjectPageAdditions) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searchDetails_ExpandSearchContents_ProjectPageAdditions");
		}
		if (!_project_page_searches_section_all_users_interaction_template.searchDetails_WeblinksEntry) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searchDetails_WeblinksEntry");
		}
		if (!_project_page_searches_section_all_users_interaction_template.searchDetails_CommentEntry) {
			throw Error("Nothing in _project_page_searches_section_all_users_interaction_template.searchDetails_CommentEntry");
		}
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
	addSearch_ShowHideBlock_ClickHandlers({ $expansion_entry, searchItem }: { $expansion_entry: any, searchItem: any }) {

		const objectThis = this;

		const projectSearchId = searchItem.projectSearchId;
		const searchId = searchItem.searchId;

		const $selector_search_item_expand = $expansion_entry.find(".selector_search_item_expand");
		if ( $selector_search_item_expand.length === 0 ) {
			throw Error("No DOM element found with class 'selector_search_item_expand'");
		}
		$selector_search_item_expand.click(function(eventObject: any) {
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
		$selector_search_item_collapse.click(function(eventObject: any) {
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
	addSearch_MainBlock_ClickHandlers({ $search_entry, searchItem }: { $search_entry: any, searchItem: any }) {

		const objectThis = this;

		const projectSearchId = searchItem.projectSearchId;
		const searchId = searchItem.searchId;

		const $search_name_and_id_jq = $search_entry.find(".search_name_and_id_jq");
		if ( $search_name_and_id_jq.length === 0 ) {
			throw Error("No DOM element found with class 'search_name_and_id_jq'");
		}
		$search_name_and_id_jq.click(function(eventObject: any) {
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
	_toggle_ShowHide_SearchDetails_Clicked({ projectSearchId }: { projectSearchId: any }) {
			
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
	_hideSearchDetailsClicked({ projectSearchId }: { projectSearchId: any }) {

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
	_showSearchDetailsClicked({ projectSearchId }: { projectSearchId: any }) {

		const objectThis = this;

		if ( this._searchDetailsDataLoaded_ProjectSearchIds.has( projectSearchId ) ) {

			this._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined : undefined });
			return;
		}

		const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : [ projectSearchId ] });

		promise_getSearchDetails.then((searchDetailsResultsCombined) => {
			try {
				objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}

	/**
	 * 
	 */
	_getSearchDetails({ projectSearchIds }: { projectSearchIds: any }) {

		const objectThis = this;

		return new Promise((resolve, reject) => {
			try {
				for ( const projectSearchId of projectSearchIds ) {
					this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds.add( projectSearchId );
				}

				const promise_searchDetailsCoreDataHTML = objectThis._searchDetails_GetCoreDataFromServer.getSearchDetails_CoreDataFromServer({ projectSearchIds });

				const promise_searchDetailsProjectPageDataHTML = objectThis._get_SearchDetailsProjectPageDataHTML({ projectSearchIds });

				Promise.all( [ promise_searchDetailsCoreDataHTML, promise_searchDetailsProjectPageDataHTML ] ).then((promiseResults) => {
					try {
						//  Combine promise results, each promise result has a different property

						const searchDetailsResultsCombined : any = {};

						for ( const promiseResult of promiseResults ) {
							if (promiseResult.coreSearchDetails) {
								searchDetailsResultsCombined.coreSearchDetails = promiseResult.coreSearchDetails;
							}
							if (promiseResult.projectPageSearchDetails) {
								searchDetailsResultsCombined.projectPageSearchDetails = promiseResult.projectPageSearchDetails;
							}
						}

						resolve( searchDetailsResultsCombined );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}

		});
	}

	/**
	 * 
	 */	
	_get_SearchDetailsProjectPageDataHTML({ projectSearchIds }: { projectSearchIds: any }) : Promise<any> {

        const objectThis = this;

        return new Promise((resolve,reject) => {
		  try {
			const requestObj = { projectSearchIds : projectSearchIds };

			const url = "d/rws/for-page/psb/get-search-details-project-page";

			const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

			const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

			promise_webserviceCallStandardPost.catch( () => { reject() }  );

			promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
				try {
					const promiseResponse = objectThis._getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData } );
					
					resolve( { projectPageSearchDetails : promiseResponse } );
					
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					
					reject();
					
					throw e;
				}
			});
		  } catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		  }
        });
	}

	/**
	 * 
	 */
    _getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData }: { responseData: any } ) {

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

        const genericForNoDataForProjectSearchId_HTML = this._searchDetails_ExpandSearchContents_ProjectPageAdditions( {
			rootWsResult, wsResultPerProjectSearchId : undefined, weblinksShowBlock : rootWsResult.weblinksShowBlockAlways, commentsShowBlock :  rootWsResult.commentsShowBlockAlways
        } );

        const returnValue = { dataPerProjectSearchId, rootWsResult, genericForNoDataForProjectSearchId_HTML };

        return returnValue;
	}
	
	/**
	 * Called both when load data and when not need to load data
	 * 
	 * @param projectSearchId
	 * @param coreSearchDetailsForProjectSearchId - loaded data. undefined if not loaded data since already have data
	 */
	_displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined }: { projectSearchId: any, searchDetailsResultsCombined: any }) {

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
				if ( ! projectPageSearchDetailsForProjectSearchId ) {

					//  NO projectPageSearchDetailsForProjectSearchId for projectSearchId

					const genericForNoDataForProjectSearchId_HTML = projectPageSearchDetails.genericForNoDataForProjectSearchId_HTML

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

					$tbody.append( genericForNoDataForProjectSearchId_HTML );

					const weblinksShowAddWeblinkLink = projectPageSearchDetails_RootWsResult.weblinksShowAddWeblinkLink;

					this._searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container });

					this._attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container });

				} else {

					//  YES projectPageSearchDetailsForProjectSearchId for projectSearchId

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
			}

			this._searchDetailsDataLoaded_ProjectSearchIds.add( projectSearchId );
		}

		addToolTips( $selector_search_details_container );  // External Function

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
    _searchDetails_AdditionsForSubLists({ data, projectSearchId, $selector_search_details_container }: { data: any, projectSearchId: any, $selector_search_details_container: any }) {

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
    searchDetails_Weblinks_AddSingleEntry({ webLink, projectSearchId, $selector_weblinks_list_container }: { webLink: any, projectSearchId: any, $selector_weblinks_list_container: any }) {
		
		if ( ! this._projectPage_SearchDetails_LoggedInUsers ) {
			webLink.canDelete = false;
		}

		const html = this._searchDetails_WeblinksEntry( webLink );
		const $weblinkEntry = $( html );

		addToolTips( $weblinkEntry );  // External Function

		$selector_weblinks_list_container.append( $weblinkEntry );

		if ( webLink.canDelete && this._projectPage_SearchDetails_LoggedInUsers ) {

			this._projectPage_SearchDetails_LoggedInUsers.searchDetails_DeleteWeblink_AddClickHandler({ projectSearchId, webLink, $weblinkEntry });
		}
	}

	/**
	 * Also called to add entries to the container
	 */    
	searchDetails_Comments_AddSingleEntry({ comment, projectSearchId, $selector_comments_list_container }: { comment: any, projectSearchId: any, $selector_comments_list_container: any }) {

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
    _searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container }: { projectSearchId: any, weblinksShowAddWeblinkLink: any, $selector_search_details_container: any }) {

        if ( this._projectPage_SearchDetails_LoggedInUsers ) {
            this._projectPage_SearchDetails_LoggedInUsers.searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container });
        }
    }

	/**
	 * 
	 */
	displaySearchDetails_All({ searchDataLoaded_ProjectSearchIds }: { searchDataLoaded_ProjectSearchIds: any }) {

		{
			//  Expand all folders

			const $search_list = $("#search_list");
			// folder root elements
			const $folder_root_jq = $search_list.children(".folder_root_jq");
			$folder_root_jq.each( ( index,  element ) => {

				const $selector_collapsable_link_container = $(element).children(".selector_collapsable_link_container")
				const $selector_collapsable_expand_link = $selector_collapsable_link_container.children(".selector_collapsable_expand_link")
				$selector_collapsable_expand_link.click();
			})
		}

		const projectSearchIdsGetFromServer: Array<any> = [];

		for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {

			if ( ! this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds.has( projectSearchId ) ) {
				projectSearchIdsGetFromServer.push( projectSearchId );
			}
		}

		if ( projectSearchIdsGetFromServer.length === 0 ) {

			//  No Data to Load. Expand All

			for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
				this._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined : undefined });
			}
			return; // EARLY RETURN
		}

		const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : projectSearchIdsGetFromServer });

		promise_getSearchDetails.then((searchDetailsResultsCombined) => {
			try {
				for ( const projectSearchId of projectSearchIdsGetFromServer ) {

					this._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined });
				}

				//  Then expand all

				for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
					this._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined : undefined });
				}
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
	}


	/**
	 * 
	 */
	hideSearchDetails_All({ searchDataLoaded_ProjectSearchIds }: { searchDataLoaded_ProjectSearchIds: any }) {

		{
			//  Collapse all folders

			const $search_list = $("#search_list");
			// folder root elements
			const $folder_root_jq = $search_list.children(".folder_root_jq");
			$folder_root_jq.each( ( index,  element ) => {

				const $selector_collapsable_link_container = $(element).children(".selector_collapsable_link_container")
				const $selector_collapsable_collapse_link = $selector_collapsable_link_container.children(".selector_collapsable_collapse_link")
				$selector_collapsable_collapse_link.click();
			})
		}

		for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
			this._hideSearchDetailsClicked({ projectSearchId });
		}

    }
    
    ///////////////////////////////////////////

    //   Handlers for Search Details Items

	/**
	 * 
	 */    
    _attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container }: { projectSearchId: any, $selector_search_details_container: any }) {

        const objectThis = this;

        const $selector_search_filename_download_fake_linkAll = $selector_search_details_container.find(".selector_search_filename_download_fake_link");
        $selector_search_filename_download_fake_linkAll.click(function(eventObject: any) {
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
    _downloadSearchFileClicked({ projectSearchId, clickedThis }: { projectSearchId: any, clickedThis: any }) {

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
