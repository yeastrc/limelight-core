/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.js
 * 
 * Javascript for Search Details (Expand a search to show the details) on all pages (except Project Page), all users
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//  module import 


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

const Handlebars = require('handlebars/runtime');

let _search_detail_section_main_page_template = require("../../../../../handlebars_templates_precompiled/search_detail_section_main_page/search_detail_section_main_page_template-bundle.js");

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { addToolTips, addSingleGenericAppSpecificToolTip } from 'page_js/data_pages/common_all_pages/genericToolTip.js';

import { SearchDetails_GetCoreDataFromServer } from 'page_js/data_pages/data_pages_common/searchDetails_GetDataFromServer_Core.js';


//  Local imports

/**
 * 
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers {

	/**
	 * @param dataPages_LoggedInUser_CommonObjectsFactory - Optional - passed in when logged in user
	 */
    constructor({ 
        dataPages_LoggedInUser_CommonObjectsFactory
    }) {

        this._initializeCalled = false;
		
		if ( dataPages_LoggedInUser_CommonObjectsFactory ) {
	        this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers = dataPages_LoggedInUser_CommonObjectsFactory.instantiate_SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers();
		}
		
		this._searchDetails_GetCoreDataFromServer = new SearchDetails_GetCoreDataFromServer();

		if (!_search_detail_section_main_page_template.searchDetails_ExpandSearchContents_Additions) {
			throw Error("Nothing in _search_detail_section_main_page_template.searchDetails_ExpandSearchContents_Additions");
		}
		this._searchDetails_ExpandSearchContents_Additions = _search_detail_section_main_page_template.searchDetails_ExpandSearchContents_Additions;

		if (!_search_detail_section_main_page_template.searchDetails_WeblinksEntry) {
			throw Error("Nothing in _search_detail_section_main_page_template.searchDetails_WeblinksEntry");
		}
		this._searchDetails_WeblinksEntry = _search_detail_section_main_page_template.searchDetails_WeblinksEntry;

		if (!_search_detail_section_main_page_template.searchDetails_CommentEntry) {
			throw Error("Nothing in _search_detail_section_main_page_template.searchDetails_CommentEntry");
		}
		this._searchDetails_CommentEntry = _search_detail_section_main_page_template.searchDetails_CommentEntry;


		if ( this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {
			this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.initialize({ searchDetails_AllUsers : this });
		}

		this._searchDetailsExpanded_ProjectSearchIds = new Set(); // ProjectSearchIds where Search Details Currently expanded

		this._searchDetailsDataLoaded_ProjectSearchIds = new Set();
		this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds = new Set();
    }

	/**
	 * 
	 */
	initialize({ }) {

		//  NOT CALLED

        this._initializeCalled = true;
    }

	/**
	 * 
	 */
	hideSearchDetailsClicked({ clickedThis, projectSearchId }) {

		const $clickedThis = $( clickedThis );

		const $selector_search_item_root_container = $clickedThis.closest(".selector_search_item_root_container" );
		if ( $selector_search_item_root_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_root_container'");
		}

		this._searchDetailsExpanded_ProjectSearchIds.delete( projectSearchId );

		const $selector_search_details_container = $selector_search_item_root_container.find(".selector_search_details_container");
		if ( $selector_search_details_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_details_container'");
		}

		$selector_search_details_container.hide();

		//  Show Pointer Right 

		const $selector_search_item_expand = $selector_search_item_root_container.find(".selector_search_item_expand");
		if ( $selector_search_item_expand.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_expand'");
		}
		$selector_search_item_expand.show();

		//  Hide Pointer Down 

		const $selector_search_item_collapse = $selector_search_item_root_container.find(".selector_search_item_collapse");
		if ( $selector_search_item_collapse.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_collapse'");
		}
		$selector_search_item_collapse.hide();

	}

	/**
	 * 
	 */
	showSearchDetailsClicked({ clickedThis, projectSearchId }) {

		const objectThis = this;

		if ( this._searchDetailsDataLoaded_ProjectSearchIds.has( projectSearchId ) ) {

			this._displaySearchDetails_SingleProjectSearchId({ clickedThis, projectSearchId });
			return;
		}

		const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : [ projectSearchId ] });

		promise_getSearchDetails.then((searchDetailsResultsCombined) => {
			try {
				objectThis._displaySearchDetails_SingleProjectSearchId({ clickedThis, projectSearchId, searchDetailsResultsCombined });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})
	}

	/**
	 * 
	 */
	_getSearchDetails({ projectSearchIds }) {

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
	_get_SearchDetailsProjectPageDataHTML({ projectSearchIds }) {

        const objectThis = this;

        return new Promise((resolve,reject) => {
			try {
				const requestObj = { projectSearchIds : projectSearchIds };

				const url = "d/rws/for-page/psb/get-search-details-project-page";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

				promise_webserviceCallStandardPost.catch( () => { reject() }  );

				promise_webserviceCallStandardPost.then( ({ responseData }) => {
					try {
						const promiseResponse = objectThis._getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData, projectSearchIds } );
						
						resolve( { projectPageSearchDetails : promiseResponse } );
						
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

            const html = this._searchDetails_ExpandSearchContents_Additions( { rootWsResult, wsResultPerProjectSearchId, weblinksShowBlock, commentsShowBlock } );

            dataPerProjectSearchId.set( wsResultPerProjectSearchId.projectSearchId, { data : wsResultPerProjectSearchId, html : html } );
        }

        const returnValue = { dataPerProjectSearchId, rootWsResult };

        return returnValue;
	}
	
	/**
	 * Called both when load data and when not need to load data
	 * 
	 * @param clickedThis
	 * @param projectSearchId
	 * @param coreSearchDetailsForProjectSearchId - loaded data. undefined if not loaded data since already have data
	 */
	_displaySearchDetails_SingleProjectSearchId({ clickedThis, projectSearchId, searchDetailsResultsCombined }) {

		const $clickedThis = $( clickedThis );

		const $selector_search_item_root_container = $clickedThis.closest(".selector_search_item_root_container" );
		if ( $selector_search_item_root_container.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_root_container'");
		}

		const $selector_search_details_container = $selector_search_item_root_container.find(".selector_search_details_container");
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

		addToolTips( $selector_search_details_container );  // External Function

		$selector_search_details_container.show();

		//  Hide Pointer Right Show Pointer Down 
		const $selector_search_item_expand = $selector_search_item_root_container.find(".selector_search_item_expand");
		if ( $selector_search_item_expand.length === 0 ) {
			throw Error("Failed to find DOM element with class 'selector_search_item_expand'");
		}
		$selector_search_item_expand.hide();

		//  Show Pointer Down 

		const $selector_search_item_collapse = $selector_search_item_root_container.find(".selector_search_item_collapse");
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
		
		if ( ! this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {
			webLink.canDelete = false;
		}

		const html = this._searchDetails_WeblinksEntry( webLink );
		const $weblinkEntry = $( html );

		addToolTips( $weblinkEntry );  // External Function

		$selector_weblinks_list_container.append( $weblinkEntry );

		if ( webLink.canDelete && this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {

			this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.searchDetails_DeleteWeblink_AddClickHandler({ projectSearchId, webLink, $weblinkEntry });
		}
	}

	/**
	 * Also called to add entries to the container
	 */    
	searchDetails_Comments_AddSingleEntry({ comment, projectSearchId, $selector_comments_list_container }) {

		if ( ! this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {
			comment.canEdit = false;
			comment.canDelete = false;
		}

		const html = this._searchDetails_CommentEntry( comment );
		const $commentEntry = $( html );

		$selector_comments_list_container.append( $commentEntry );

		if ( ( comment.canEdit || comment.canDelete ) && this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {

			this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.searchDetails_Edit_Delete_Comment_AddClickHandlers({ projectSearchId, comment, $commentEntry });
		}


	}


    ///////////////////////////////////////////

    //   Additions to Search Details Items for logged in users

	/**
	 * 
	 */    
    _searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container }) {

        if ( this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {
            this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container });
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
			try {
				for ( const projectSearchId of projectSearchIdsGetFromServer ) {

					objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined });
				}

				//  Then expand all

				for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
					objectThis._displaySearchDetails_SingleProjectSearchId({ projectSearchId });
				}
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
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

        if ( this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {

            this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container });
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

