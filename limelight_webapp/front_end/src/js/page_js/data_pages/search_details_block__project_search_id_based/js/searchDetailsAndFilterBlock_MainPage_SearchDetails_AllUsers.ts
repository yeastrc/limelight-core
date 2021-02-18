/**
 * searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.ts
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

import Handlebars = require('handlebars/runtime');

import _search_detail_section_main_page_template = require("../../../../../../handlebars_templates_precompiled/search_detail_section_main_page/search_detail_section_main_page_template-bundle.js");


import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { addToolTips, addSingleGenericAppSpecificToolTip } from 'page_js/common_all_pages/genericToolTip';

import { SearchDetails_GetCoreDataFromServer } from 'page_js/data_pages/data_pages_common/searchDetails_GetDataFromServer_Core';

//  For type 
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';


//  Local imports


import { SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers } from './searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers';


/**
 * 
 */
export class SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers {

	//  Handlebars Templates
	private _searchDetails_ExpandSearchContents_Additions;
	private _searchDetails_WeblinksEntry;
	private _searchDetails_CommentEntry;
	
	private _initializeCalled : boolean;

	private _searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers : SearchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers;
	private _searchDetails_GetCoreDataFromServer : SearchDetails_GetCoreDataFromServer;

	private _searchDetailsExpanded_ProjectSearchIds : Set<number>; // ProjectSearchIds
	private _searchDetailsDataLoaded_ProjectSearchIds : Set<number>;  // ProjectSearchIds
	private _searchDetailsDataLoadedOrInProgress_ProjectSearchIds : Set<number>;   // ProjectSearchIds

	/**
	 * @param dataPages_LoggedInUser_CommonObjectsFactory - Optional - passed in when logged in user
	 */
    constructor(
		{ dataPages_LoggedInUser_CommonObjectsFactory } : 
		{ dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory }
	) {

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
	public initialize() {

        this._initializeCalled = true;
    }

	/**
	 * 
	 */
	public hideSearchDetailsClicked({ clickedThis, projectSearchId }) {

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
	 * clickedThis or domElementToInsertInto Exactly ONE must be populated
	 * @param clickedThis
	 * @param domElementToInsertInto
	 */
	public showSearchDetailsClicked({ clickedThis, domElementToInsertInto, projectSearchId } : {

		clickedThis?, domElementToInsertInto? : HTMLElement, projectSearchId : number
	}) {

		if ( clickedThis && domElementToInsertInto ) {
			const msg = "showSearchDetailsClicked(...): Cannot populate both clickedThis && domElementToInsertInto. Exactly ONE must be populated."
			console.warn( msg )
			throw Error( msg )
		}
		if ( ( ! clickedThis ) && ( ! domElementToInsertInto ) ) {
			const msg = "showSearchDetailsClicked(...): Neither of clickedThis or domElementToInsertInto is populated. Exactly ONE must be populated"
			console.warn( msg )
			throw Error( msg )
		}

		const objectThis = this;

		if ( this._searchDetailsDataLoaded_ProjectSearchIds.has( projectSearchId ) ) {

			this._displaySearchDetails_SingleProjectSearchId({ clickedThis, domElementToInsertInto, projectSearchId, searchDetailsResultsCombined : undefined });
			return;
		}

		const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : [ projectSearchId ] });

		promise_getSearchDetails.then((searchDetailsResultsCombined) => {
			try {
				objectThis._displaySearchDetails_SingleProjectSearchId({ clickedThis, domElementToInsertInto, projectSearchId, searchDetailsResultsCombined });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		})
	}

	/**
	 * 
	 */
	private _getSearchDetails({ projectSearchIds }) {

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

						const searchDetailsResultsCombined = {
							coreSearchDetails : undefined,
							projectPageSearchDetails : undefined
						};

						const promiseResults_CastArrayAny : Array<any> = promiseResults

						for ( const promiseResult of promiseResults_CastArrayAny ) {
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
	private _get_SearchDetailsProjectPageDataHTML({ projectSearchIds }) {

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
						const promiseResponse = objectThis._getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData } );
						
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
    private _getSearchDetailsProjectPageDataHTMLFromAJAXResponse( { responseData } ) {

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

		const genericForNoDataForProjectSearchId_HTML = this._searchDetails_ExpandSearchContents_Additions( {
			rootWsResult, wsResultPerProjectSearchId : undefined, weblinksShowBlock : rootWsResult.weblinksShowBlockAlways, commentsShowBlock :  rootWsResult.commentsShowBlockAlways
		} );

		const returnValue = { dataPerProjectSearchId, rootWsResult, genericForNoDataForProjectSearchId_HTML };

        return returnValue;
	}
	
	/**
	 * Called both when load data and when not need to load data
	 *
	 * clickedThis or domElementToInsertInto populated, exactly one
	 * 
	 * @param clickedThis
	 * @param domElementToInsertInto
	 * @param projectSearchId
	 * @param coreSearchDetailsForProjectSearchId - loaded data. undefined if not loaded data since already have data
	 */
	private _displaySearchDetails_SingleProjectSearchId(
		{ clickedThis, domElementToInsertInto, projectSearchId, searchDetailsResultsCombined } :
		{ clickedThis : any, domElementToInsertInto : HTMLElement, projectSearchId : number, searchDetailsResultsCombined : any }
	) {

		let $selector_search_item_root_container : JQuery<any> = undefined
		let $selector_search_details_container : JQuery<any> = undefined

		if ( clickedThis ) {

			const $clickedThis = $(clickedThis);

			$selector_search_item_root_container = $clickedThis.closest(".selector_search_item_root_container");
			if ($selector_search_item_root_container.length === 0) {
				throw Error("Failed to find DOM element with class 'selector_search_item_root_container'");
			}

			$selector_search_details_container = $selector_search_item_root_container.find(".selector_search_details_container");
			if ($selector_search_details_container.length === 0) {
				throw Error("Failed to find DOM element with class 'selector_search_details_container'");
			}
		} else if ( domElementToInsertInto ) {

			const $domElementToInsertInto = $( domElementToInsertInto );
			$selector_search_details_container = $("<div></div>")
			$domElementToInsertInto.append( $selector_search_details_container );

		} else {
			const msg = "Neither of clickedThis or domElementToInsertInto is populated";
			console.warn( msg )
			throw Error( msg )
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

		if ( $selector_search_item_root_container ) {

			$selector_search_details_container.show();

			//  Hide Pointer Right Show Pointer Down
			const $selector_search_item_expand = $selector_search_item_root_container.find(".selector_search_item_expand");
			if ($selector_search_item_expand.length === 0) {
				throw Error("Failed to find DOM element with class 'selector_search_item_expand'");
			}
			$selector_search_item_expand.hide();

			//  Show Pointer Down

			const $selector_search_item_collapse = $selector_search_item_root_container.find(".selector_search_item_collapse");
			if ($selector_search_item_collapse.length === 0) {
				throw Error("Failed to find DOM element with class 'selector_search_item_collapse'");
			}
			$selector_search_item_collapse.show();
		}

		this._searchDetailsExpanded_ProjectSearchIds.add( projectSearchId );
	}


	
    ///////////////////////////////////////////

    //   Additions to Search Details Items Sub Lists, like Web Links

	/**
	 * 
	 */    
    private _searchDetails_AdditionsForSubLists({ data, projectSearchId, $selector_search_details_container }) {

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
    public searchDetails_Weblinks_AddSingleEntry({ webLink, projectSearchId, $selector_weblinks_list_container }) {
		
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
	public searchDetails_Comments_AddSingleEntry({ comment, projectSearchId, $selector_comments_list_container }) {

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
    private _searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container }) {

        if ( this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers ) {
            this._searchDetailsAndFilterBlock_MainPage_SearchDetails_LoggedInUsers.searchDetails_AdditionsForLoggedInUsers({ projectSearchId, weblinksShowAddWeblinkLink, $selector_search_details_container });
        }
	}
	
	//  Not sure if this works but doesn't make sense 
	//    since call to this._displaySearchDetails_SingleProjectSearchId(...) does not pass clickedThis

	// /**
	//  * 
	//  */
	// public displaySearchDetails_All({ searchDataLoaded_ProjectSearchIds }) {

	// 	const projectSearchIdsGetFromServer = [];

	// 	for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {

	// 		if ( ! this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds.has( projectSearchId ) ) {
	// 			projectSearchIdsGetFromServer.push( projectSearchId );
	// 		}
	// 	}

	// 	if ( projectSearchIdsGetFromServer.length === 0 ) {

	// 		//  No Data to Load. Expand All

	// 		for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
	// 			this._displaySearchDetails_SingleProjectSearchId({ projectSearchId });
	// 		}
	// 		return; // EARLY RETURN
	// 	}

	// 	const promise_getSearchDetails = this._getSearchDetails({ projectSearchIds : projectSearchIdsGetFromServer });

	// 	promise_getSearchDetails.then((searchDetailsResultsCombined) => {
	// 		try {
	// 			for ( const projectSearchId of projectSearchIdsGetFromServer ) {

	// 				this._displaySearchDetails_SingleProjectSearchId({ projectSearchId, searchDetailsResultsCombined });
	// 			}

	// 			//  Then expand all

	// 			for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
	// 				this._displaySearchDetails_SingleProjectSearchId({ projectSearchId });
	// 			}
	// 		} catch( e ) {
	// 			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
	// 			throw e;
	// 		}
		
	// 	})
	// }

	////////

	//  Not sure if this works but doesn't make sense 
	//    since called method this._hideSearchDetailsClicked(...) does not exist

	// /**
	//  * 
	//  */
	// public hideSearchDetails_All({ searchDataLoaded_ProjectSearchIds }) {

	// 	for ( const projectSearchId of searchDataLoaded_ProjectSearchIds ) {
	// 		this._hideSearchDetailsClicked({ projectSearchId });
	// 	}
    // }
    
    ///////////////////////////////////////////

    //   Handlers for Search Details Items

	/**
	 * 
	 */    
    private _attachSearchDetails_ClickHandlers({ projectSearchId, $selector_search_details_container }) {

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
    private _downloadSearchFileClicked({ projectSearchId, clickedThis }) {

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

