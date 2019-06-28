/**
 * projectPage_SearchesAdmin_OrganizeSearchesAndFolders.js
 * 
 * Javascript for projectView.jsp page  
 * 
 * Admin for organizing searches - Set order and put in folders
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

//  module import 

//  Import Handlebars templates

const _project_page__searches_section_organize_searches_template = 
require("../../../../../../handlebars_templates_precompiled/project_page__searches_section_organize_searches/project_page__searches_section_organize_searches_template-bundle.js");

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { addToolTips, addSingleGenericAppSpecificToolTip } from 'page_js/data_pages/common_all_pages/genericToolTip.js';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost.js';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay.js';


//  Local imports


const _CONSTANTS = {
    MESSAGE_HIDE_DELAY : 2000,  // in Milliseconds
    MESSAGE_FADEOUT_OPTIONS : { duration : 800 },  // duration in Milliseconds 
    MESSAGE_SET_TIMEOUT_DATA_KEY : "MESSAGE_SET_TIMEOUT_DATA_KEY"
};


/**
 * 
 */
export class ProjectPage_SearchesAdmin_OrganizeSearchesAndFolders {

	/**
	 * 
	 */
	constructor( { projectIdentifierFromURL, projectPage_ProjectSection_LoggedInUsersInteraction } ) {

		this._initializeCalled = false;
		
		this._projectIdentifierFromURL = projectIdentifierFromURL;
		this._projectPage_ProjectSection_LoggedInUsersInteraction = projectPage_ProjectSection_LoggedInUsersInteraction;

        if ( ! _project_page__searches_section_organize_searches_template.project__organize_searches_button_template ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.project__organize_searches_button_template")
        }
        if ( ! _project_page__searches_section_organize_searches_template.project__organize_searches_root ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.project__organize_searches_root")
        }
        if ( ! _project_page__searches_section_organize_searches_template.organize_searches_single_folder_template ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.organize_searches_single_folder_template")
        }
        if ( ! _project_page__searches_section_organize_searches_template.organize_searches_single_folder_tooltip_template ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.organize_searches_single_folder_tooltip_template")
        }
        if ( ! _project_page__searches_section_organize_searches_template.organize_searches_single_search_template ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.organize_searches_single_search_template")
        }
        if ( ! _project_page__searches_section_organize_searches_template.organize_searches_single_search_tooltip_template ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.organize_searches_single_search_tooltip_template")
        }
        if ( ! _project_page__searches_section_organize_searches_template.project__rename_folder_modal_dialog ) {
            throw Error("Not Found: _project_page__searches_section_organize_searches_template.project__rename_folder_modal_dialog")
        }


        this._selectedFolderId = null;
        this._selectedFolderSearchesNotInAnyFolder = false;

	}

	/**
	 * 
	 */
	initialize( { projectPage_SearchesSection_AllUsersInteraction }) {

        this._projectPage_SearchesSection_AllUsersInteraction = projectPage_SearchesSection_AllUsersInteraction;

        this._initializeCalled = true;
    }

    
	/**
	 * Called each time the search list is populated, which means that also the buttons above and below were removed
	 */
	searchListPopulated() {

        const objectThis = this;

        //  Add Organize Searches Button

        const $search_list_above_block = $("#search_list_above_block");

        let adminButtons_HTML = _project_page__searches_section_organize_searches_template.project__organize_searches_button_template({});

        $search_list_above_block.append( adminButtons_HTML );

        $("#organize_searches_button").click( (eventObject) => {
            try {
                eventObject.preventDefault();
                // const eventTarget = eventObject.target;
                this._openOrganizeSearches( eventObject );
                return false;
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        //  Add click handlers for delete and rename folder in main search section

        const $search_list = $("#search_list");

        //  Add click handler to delete icon each folder
		const $folder_delete_button_jq_InBlock = $search_list.find(".folder_delete_button_jq");
		$folder_delete_button_jq_InBlock.click(function(eventObject) {
			try {
				eventObject.stopPropagation();
				const clickThis = this;
				objectThis._deleteFolderClickHandler({ clickThis, eventObject, inOrganizeOverlay : false });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		//  Add click handler to rename icon each folder
		const $folder_rename_button_jq_InBlock = $search_list.find(".folder_rename_button_jq");
		$folder_rename_button_jq_InBlock.click(function(eventObject) {
			try {
				eventObject.stopPropagation();
				const clickThis = this;
				objectThis._renameFolderClickHandler({ clickThis, eventObject, inOrganizeOverlay : false });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});

    }

	/**
	 * 
	 */
    _openOrganizeSearches( eventObject ) {

        // const eventTarget = eventObject.target;

        this._startSearchesOrganize();
    }

	/**
	 * 
	 */
    _startSearchesOrganize() {
        
        const $explore_data_section__contents_block = $("#explore_data_section__contents_block");
        if ( $explore_data_section__contents_block.length === 0 ) {
            throw Error("No DOM element found with id 'explore_data_section__contents_block'");
        }

        $explore_data_section__contents_block.empty();

        const project__organize_searches_root_HTML = _project_page__searches_section_organize_searches_template.project__organize_searches_root();
        const $project__organize_searches_root = $( project__organize_searches_root_HTML );
        $project__organize_searches_root.appendTo( $explore_data_section__contents_block );

		$("#organize_searches_done_organizing_button").click( (eventObject) => {
			try {
				this._doneSearchOrganizing();
				eventObject.stopPropagation();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		//  "New Folder" Button
		$("#organize_searches_new_folder_button").click( (eventObject) => {
			try {
				const $organize_searches_folder_new_folder_block = $("#organize_searches_folder_new_folder_block");
				$organize_searches_folder_new_folder_block.hide();
				const $organize_searches_folder_add_new_folder_block = $("#organize_searches_folder_add_new_folder_block");
				$organize_searches_folder_add_new_folder_block.show();
				const $organize_searches_folder_new_folder_name = $("#organize_searches_folder_new_folder_name")
				$organize_searches_folder_new_folder_name.focus();
				eventObject.stopPropagation();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		$("#organize_searches_add_new_folder_button").click( (eventObject) => {
			try {
				this._addNewFolder();
				eventObject.stopPropagation();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		{
			//  Make whole "Folder List" draggable vertically, handle is on "Folder List" div
			const $folderDragHandle = $("#organize_searches_folder_total_block_drag_handle");
			const folderDragHandleElement = $folderDragHandle[ 0 ]; 
			const $organize_searches_folder_total_block = $("#organize_searches_folder_total_block");
			$organize_searches_folder_total_block.draggable({
				axis: "y",
				handle: folderDragHandleElement,
				containment: "parent"
				
			});
			const handle = $organize_searches_folder_total_block.draggable( "option", "handle" );
		}
        
        const promise_loadDataFromServer = this._loadDataFromServer();

        promise_loadDataFromServer.catch( () => {});

        promise_loadDataFromServer.then( ({ responseData }) => {

            this._putFoldersAndSearchesOnPage({ responseData });
        });
    }

    ////////////////

	/**
	 * 
	 */
    _doneSearchOrganizing() {
    
        this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
    }

    ////////////////

	/**
	 * 
	 */
	_putFoldersAndSearchesOnPage({ responseData }) {
		const objectThis = this;

		if ( responseData.noSearchesFound ) {
            //  No searches so re-generate the search list which will then not show the "Organize Searches" button
			this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
			return;
		}
		const folderDataList = responseData.folderDataList;
		const searchesNotInFoldersList = responseData.searchesNotInFoldersList;
		
		$("#organize_searches_loading_message").hide();
		$("#organize_searches_main_data_block").show();
		
		const firstSearchesToDisplay = searchesNotInFoldersList;
		const folderIndex = null;

		if ( ( ! firstSearchesToDisplay ) || firstSearchesToDisplay.length === 0 ) {
			//  Find a folder containing searches
			firstSearchesToDisplay = null;
			for ( let folderDataListIndex = 0; folderDataListIndex < folderDataList.length; folderDataListIndex++ ) {
				const folderDataEntry = folderDataList[ folderDataListIndex ];
				const searchesForFolder = folderDataEntry.searchesForFolder;
				if ( searchesForFolder && searchesForFolder.length > 0 ) {
					firstSearchesToDisplay = searchesForFolder;
					folderIndex = folderDataListIndex;
					this._selectedFolderId = folderDataEntry.id;
					this._selectedFolderSearchesNotInAnyFolder = false;
					break;
				}
			}
			if ( firstSearchesToDisplay === null ) {
				//  No searches found for any folder so highlight searches not in any folders
				firstSearchesToDisplay = searchesNotInFoldersList;
				folderIndex = null;
				this._selectedFolderId = null;
				this._selectedFolderSearchesNotInAnyFolder = true;
			}
		}
		

		//  Process the Folder data and add it to the page
		const $organize_searches_folder_entries_block = $("#organize_searches_folder_entries_block");
		$organize_searches_folder_entries_block.empty();
		for ( let folderDataListIndex = 0; folderDataListIndex < folderDataList.length; folderDataListIndex++ ) {
			const folderDataEntry = folderDataList[ folderDataListIndex ];
			const html = _project_page__searches_section_organize_searches_template.organize_searches_single_folder_template(folderDataEntry);
			const $addedItem = $( html ).appendTo( $organize_searches_folder_entries_block );
			if ( folderIndex !== null && folderIndex === folderDataListIndex ) {
				//  Highlight this folder since the searches for it will be displayed initially 
				const $folder_display_order_inner_item_jq = $addedItem.find(".folder_display_order_inner_item_jq");
				$folder_display_order_inner_item_jq.addClass("selected-item");
			}
			
			const $folder_display_name_jq = $addedItem.find(".folder_display_name_jq");
			
			const tooltipHTML = _project_page__searches_section_organize_searches_template.organize_searches_single_folder_tooltip_template( folderDataEntry );
			$folder_display_name_jq.qtip( {
		        content: {
		            text: tooltipHTML
		        },
				position: {
					target: 'mouse',
					adjust: { x: 5, y: 5 }, // Offset it slightly from under the mouse
		            viewport: $(window)
		         }
		    });				
		}
		
		//   Add Folder events and handling 

	    $( "#organize_searches_folder_entries_block" ).sortable( {
	    		update : function() {
	    			objectThis._changeFoldersOrderInDB();
	    		}
	    } );
	    $( "#organize_searches_folder_entries_block" ).disableSelection();		
		
	    
	    //  Add Click handlers to the folders on the folder name
		const $folder_display_order_inner_item_jq = $organize_searches_folder_entries_block.find(".folder_display_order_inner_item_jq");
		$folder_display_order_inner_item_jq.click(function(eventObject) {
			try {
				eventObject.stopPropagation();
				//  User has selected this folder by clicking on it
				objectThis._processClick_OnFolder_Or_SearchesNotInAnyFolder( { clickedThis : this, eventObject : eventObject } );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		//  Add click handler to delete icon each folder
		const $folder_delete_button_jq_InBlock = $organize_searches_folder_entries_block.find(".folder_delete_button_jq");
		$folder_delete_button_jq_InBlock.click(function(eventObject) {
			try {
				eventObject.stopPropagation();
				const clickThis = this;
				objectThis._deleteFolderClickHandler({ clickThis, eventObject, inOrganizeOverlay : true });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		//  Add click handler to rename icon each folder
		const $folder_rename_button_jq_InBlock = $organize_searches_folder_entries_block.find(".folder_rename_button_jq");
		$folder_rename_button_jq_InBlock.click(function(eventObject) {
			try {
				eventObject.stopPropagation();
				const clickThis = this;
				objectThis._renameFolderClickHandler({ clickThis, eventObject, inOrganizeOverlay : true });
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});


		//  "Searches not in any folder"
		
		const $organize_searches_folder_searches_not_in_any_folder_inner_item = $("#organize_searches_folder_searches_not_in_any_folder_inner_item");
		if ( folderIndex === null ) {
			//  Highlight "Searches not in any folder" since the searches for it are displayed 
			$organize_searches_folder_searches_not_in_any_folder_inner_item.addClass("selected-item");
		}

	    //  Add Click handler to the "Searches not in any folder"
		$organize_searches_folder_searches_not_in_any_folder_inner_item.click(function(eventObject) {
			try {
				//  User has selected this by clicking on it
				objectThis._processClick_OnFolder_Or_SearchesNotInAnyFolder( { clickedThis : this, eventObject : eventObject } );
				eventObject.stopPropagation();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		//  Add tooltips
        const $organize_searches_folder_total_block = $("#organize_searches_folder_total_block");
        
		addToolTips( $organize_searches_folder_total_block );  // External Function
		
		this._addSearchesToPage( { searchesToDisplay : firstSearchesToDisplay } );
    };
    

	/**
	 * 
	 */
	_addSearchesToPage({ searchesToDisplay }) {

		const objectThis = this;
		
		// Reposition the Folder list at the top of the draggable space
		const $organize_searches_folder_total_block = $("#organize_searches_folder_total_block");
		$organize_searches_folder_total_block.css("top", "0px;")
		
		//  Process the Search data and add it to the page
		const $organize_searches_search_entries_block = $("#organize_searches_search_entries_block");
		$organize_searches_search_entries_block.empty();
		
		for ( let searchDataListIndex = 0; searchDataListIndex < searchesToDisplay.length; searchDataListIndex++ ) {
			const searchDataEntry = searchesToDisplay[ searchDataListIndex ];
			const html = _project_page__searches_section_organize_searches_template.organize_searches_single_search_template(searchDataEntry);
			const $addedItem = 
				$( html ).appendTo( $organize_searches_search_entries_block );
			 
			const tooltipHTML = _project_page__searches_section_organize_searches_template.organize_searches_single_search_tooltip_template( searchDataEntry )
			
			const $search_display_name_jq = $addedItem.find(".search_display_name_jq");
			
			$search_display_name_jq.qtip( {
		        content: {
		            text: tooltipHTML
		        },
				position: {
					//  Position tooltip above display item (search name) locked to left edge of display item.
					my : 'bottom left',
					at : 'top left',
					// target: 'mouse',
					// adjust: { x: 5, y: 5 }, // Offset it slightly from under the mouse
		            viewport: $(window)
		         }
		    });	
		}

		//   Add Search events and handling	    

		$organize_searches_search_entries_block.sortable( {
	    	
	    	//  properties of "ui", except dragging doesn't work properly when referenced in "start"
//			", ui.offset.top: " + ui.offset.top +
//			", ui.offset.left: " + ui.offset.left +
//			", ui.position.top: " + ui.position.top +
//			", ui.position.left: " + ui.position.left +
//			", ui.originalPosition.top: " + ui.originalPosition.top +
//			", ui.originalPosition.left: " + ui.originalPosition.left;
	    	
	    		update :  function( event, ui ) {// update fires when dragging stops and the order has changed
	    			const $item = ui.item;
	    			objectThis._changeSearchesOrderInDB();
	    		},
	    		start : function( event, ui ) {// start fires when dragging stops
	    			const $item = ui.item;
	    		},
	    		sort : function( event, ui ) {// sort fires while dragging 
	    			//  Adding a hack to the "sort" to detect if the item was dragged over a folder
	    			
	    			const $item = ui.item;
	    			
	    			objectThis._removeHighlightFromAllFolders();
	    			
	    			const callbackOnInFolder = function( params ) {
	    				const $folder_display_order_item_jq_MouseIsOver = params.$folder_display_order_item_jq_MouseIsOver;
	    				//  Add highlight to folder mouse is over
	    				const $folder_display_order_inner_item_jq = 
	    					$folder_display_order_item_jq_MouseIsOver.find(".folder_display_order_inner_item_jq");
	    				$folder_display_order_inner_item_jq.addClass("highlighted-item");
	    			}

	    			objectThis._callCallbackForItemInFolder( { 
	    				ui : ui, 
	    				$item : $item, 
	    				callbackOnInFolder : callbackOnInFolder } );

	    		},


	    		stop : function( event, ui ) {// beforeStop fires when dragging stops, after update if update is called
	    			
	    			//  Adding a hack to the "stop" to detect if the item was dragged over a folder
	    			
	    			const $searchItem = ui.item;
	    			
	    			objectThis._removeHighlightFromAllFolders();
	    			
    				// Grab the first element in the $searchItem array and access its qTip API
    				const qtipApi = $searchItem.qtip('api');
    				if ( qtipApi ) {
    					qtipApi.hide(true);
    				}

	    			const $tool_tip_attached_jq_All = $searchItem.find(".tool_tip_attached_jq");

	    			$tool_tip_attached_jq_All.each( function( index ) {
	    				const $tool_tip_attached_jq_One = $( this );
	    				// Grab the first element in the $tool_tip_attached_jq_One array and access its qTip API
	    				const qtipApi = $tool_tip_attached_jq_One.qtip('api');
	    				if ( qtipApi ) {
	    					qtipApi.hide(true);
	    				}
	    			});
	    			
	    			
	    			//  Build callback function that is called 
	    			//  if the dragged search is over a folder
	    			const callbackOnInFolder = ( params ) => {
	    				const $folder_display_order_item_jq_MouseIsOver = params.$folder_display_order_item_jq_MouseIsOver;

	    				const searches_not_in_any_folder = 
	    					objectThis._isFolder_searches_not_in_any_folder( { $folder_display_order_item_jq : $folder_display_order_item_jq_MouseIsOver } );
	    				
	    				let folder_id = undefined;
	    				let folderIdInt = undefined;
	    				
	    				if ( ! searches_not_in_any_folder ) {
	    					folder_id = $folder_display_order_item_jq_MouseIsOver.attr("data-folder_id");
	    					if ( folder_id === undefined ) {
	    						throw Error( '$folder_display_order_item_jq_MouseIsOver.attr("data-folder_id"); returned undefined ' );
	    					}
	    					folderIdInt = parseInt( folder_id, 10 );
	    					if ( isNaN( folderIdInt ) ) {
	    						throw Error( '$folder_display_order_item_jq_MouseIsOver.attr("data-folder_id"); returned string that is not an int:  ' + folder_id );
	    					}
	    				}
	    				
	    				if ( objectThis._selectedFolderSearchesNotInAnyFolder ) {
	    					if ( searches_not_in_any_folder ) {
	    						//  "Searches not in any folder" selected 
	    						//  and is where search is dropped so do nothing
	    						return;  // EARLY EXIT
	    					}
	    				} else {
	    					if ( objectThis._selectedFolderId === folderIdInt ) {
	    						// the folder selected 
	    						//  and is where search is dropped so do nothing
	    						return;  // EARLY EXIT
	    					}
	    				}
    					const draggedSearch__project_search_id = $searchItem.attr("data-project_search_id");
    					if ( draggedSearch__project_search_id === undefined ) {
    						throw Error( '$searchItem.attr("data-project_search_id"); returned undefined ' );
                        }

                        let putInNotInAnyFolder = searches_not_in_any_folder;

    					objectThis._moveSearchToFolder( {
    						folder_id : folder_id,
    						putInNotInAnyFolder : putInNotInAnyFolder,
    						project_search_id : draggedSearch__project_search_id,
    						$searchItem : $searchItem,
    						$folder_display_order_item_jq_MouseIsOver : $folder_display_order_item_jq_MouseIsOver
    					} );

	    			};
	    			objectThis._callCallbackForItemInFolder( { 
	    				ui : ui, 
	    				$item : $searchItem, 
	    				callbackOnInFolder : callbackOnInFolder } );
	    		},
	    		beforeStop : function( event, ui ) {// beforeStop fires when dragging stops
	    			const $item = ui.item;
	    			
	    		},
	    		change : function( event, ui ) { // change fires whenever sort order changes while dragging
	    			const $item = ui.item;
	    			
	    		}
	    		
//	    		items: "> li"
//	    		Type: Selector
//	    		Default: "> *"
//	    		Specifies which items inside the element should be sortable.
	    } );
	    $( "#organize_searches_search_entries_block" ).disableSelection();		
	    

		//  Add tooltips
		addToolTips( $organize_searches_search_entries_block );    // External Function

	};
    
    //////////////////////////////////

	/**
	 * 
	 */
	//  User has selected a folder or "Searches not in any folder" by clicking on it
	_processClick_OnFolder_Or_SearchesNotInAnyFolder({ clickedThis, eventObject }) {
        
		const $clickedThis = $(clickedThis);
		
		// Change search list (and highlighting) to clicked folder
		
		//  Remove highlighting from all folders and "Searches not in any folder"
		const $organize_searches_folder_entries_block_Local = $("#organize_searches_folder_entries_block");
		const $folder_display_order_inner_item_jq_Local = $organize_searches_folder_entries_block_Local.find(".folder_display_order_inner_item_jq");
		// Can be empty if no folders
//		if ( $folder_display_order_inner_item_jq_Local.length === 0 ) {
//			throw Error( 'no elements with class "folder_display_order_inner_item_jq" found under "#organize_searches_folder_entries_block"' );
//		}
		$folder_display_order_inner_item_jq_Local.removeClass("selected-item");
		$("#organize_searches_folder_searches_not_in_any_folder_inner_item").removeClass("selected-item");
		
		//  Add highlighting to chosen folder
//		const $folder_display_order_inner_item_jq_This = $clickedThis.closest(".folder_display_order_inner_item_jq");
		const $folder_display_order_inner_item_jq_This = $clickedThis;
		if ( $folder_display_order_inner_item_jq_This.length === 0 ) {
			throw Error( 'no elements with class "folder_display_order_inner_item_jq" above clicked element' );
		}
		$folder_display_order_inner_item_jq_This.addClass("selected-item");
		
		const $folder_display_order_item_jq_This = $clickedThis.closest(".folder_display_order_item_jq");
		if ( $folder_display_order_item_jq_This.length === 0 ) {
			throw Error( 'no elements with class "folder_display_order_item_jq" above clicked element' );
		}
		
		let folder_id = null;

		const folderIs__searches_not_in_any_folder = 
			this._isFolder_searches_not_in_any_folder( { $folder_display_order_item_jq : $folder_display_order_item_jq_This } );

		if ( ! folderIs__searches_not_in_any_folder ) {
			//  Get folder id
			const folder_id_String = $folder_display_order_item_jq_This.attr("data-folder_id");
			if ( folder_id_String === undefined ) {
				throw Error( ' $folder_display_order_item_jq_This.attr("data-folder_id") returned undefined' );
			}
			if ( folder_id_String && folder_id_String !== "" ) {
				folder_id = parseInt( folder_id_String, 10 );
				if ( isNaN( folder_id) ) {
					throw Error( ' $folder_display_order_item_jq_This.attr("data-folder_id") returned string that cannot be parsed: ' + folder_id_String );
				}
			}
			this._selectedFolderId = folder_id;
			this._selectedFolderSearchesNotInAnyFolder = false;
		} else {
			this._selectedFolderId = null;
			this._selectedFolderSearchesNotInAnyFolder = true;
		}
		
        const promise_loadDataFromServer = this._loadDataFromServer();

        promise_loadDataFromServer.catch( () => {});

        promise_loadDataFromServer.then( ({ responseData }) => {

            this._processLoadDataResultsForSpecificFolder({ responseData, selectedFolderData : { folderId: folder_id } });
        });
	};
	
	/**
	 * 
	 */
	_processLoadDataResultsForSpecificFolder({ responseData, selectedFolderData }) {
		
		const folderId = selectedFolderData.folderId;

		const loadData_responseData = responseData;
	
		const folderDataList = loadData_responseData.folderDataList;
		const searchesNotInFoldersList = loadData_responseData.searchesNotInFoldersList;
		
		let searchesToDisplay = null;
		
		if ( folderId === null ) {
			searchesToDisplay = searchesNotInFoldersList
		} else {
			//  Get searches for folder id
			for ( let folderDataListIndex = 0; folderDataListIndex < folderDataList.length; folderDataListIndex++ ) {
				const folderDataEntry = folderDataList[ folderDataListIndex ];
				if ( folderDataEntry.id === folderId ) {
					searchesToDisplay = folderDataEntry.searchesForFolder;
//					const folderIndex = folderDataListIndex;
					break;
				}
			}
			if ( searchesToDisplay === null ) {
				//  No searches found for folder id
				throw Error( 'No folder found for id: ' + folderId );
			}
		}
		
		//  Pass searches to put on page

		this._addSearchesToPage( { searchesToDisplay : searchesToDisplay } );

	};
	
	
    //////////////////////////////////

	
	/**
	 * 
	 */
	_moveSearchToFolder({ folder_id, putInNotInAnyFolder, project_search_id, $searchItem, $folder_display_order_item_jq_MouseIsOver } ) {
		try {
			const objectThis = this;

            let requestObj = {
                projectSearchId : project_search_id,
                folderId : folder_id,
                putInNotInAnyFolder : putInNotInAnyFolder
            };

            const url = "d/rws/for-page/project-organize-searches-set-search-folder";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => {  }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    objectThis._moveSearchToFolderProcessResponse( {  
                        $searchItem : $searchItem,
                        $folder_display_order_item_jq_MouseIsOver : $folder_display_order_item_jq_MouseIsOver
                    } );
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}

	};
	
	/**
	 * 
	 */
	_moveSearchToFolderProcessResponse({ $searchItem, $folder_display_order_item_jq_MouseIsOver } ) {

		const qtipApi_OnSearchItem = $searchItem.qtip('api');
		if ( qtipApi_OnSearchItem ) {
			qtipApi_OnSearchItem.destroy(true);
		}
		
		const $tool_tip_attached_jq_All = $searchItem.find(".tool_tip_attached_jq");

		$tool_tip_attached_jq_All.each( function( index ) {
			const $tool_tip_attached_jq_One = $( this );
			// Grab the first element in the $folder_root_jq_One array and access its qTip API
			const qtipApi = $tool_tip_attached_jq_One.qtip('api');
			if ( qtipApi ) {
				qtipApi.destroy(true);
			}
		});
		
		this._showMovedSearchToFolderMessage( { $searchItem : $searchItem, $folder_display_order_item_jq_MouseIsOver : $folder_display_order_item_jq_MouseIsOver } );
		
		$searchItem.remove();
	};
	
	/**
	 * 
	 */
	_showMovedSearchToFolderMessage({ $folder_display_order_item_jq_MouseIsOver }) {
		const objectThis = this;

		const $folder_root_jq = $folder_display_order_item_jq_MouseIsOver;

		const $search_moved_to_folder_msg_jq = $folder_root_jq.find(".search_moved_to_folder_msg_jq");
		const $element = $search_moved_to_folder_msg_jq;
        const clearMsg = true;
		this._clearMovedSearchToFolderMessage({ $element, fadeErrorMsg : false });
		$element.show();
		$element.css("top","-10px");
		$element.animate( { top: -50 }, { duration: 750 } );
		if ( clearMsg ) {
			const timerId = setTimeout( function() {
				objectThis._clearMovedSearchToFolderMessage({ $element, fadeErrorMsg : true });
			}, _CONSTANTS.MESSAGE_HIDE_DELAY );
			$element.data( _CONSTANTS.MESSAGE_SET_TIMEOUT_DATA_KEY, timerId );
		}
	};
		
	/**
	 * 
	 */
	_clearMovedSearchToFolderMessage({ $element, fadeErrorMsg }) {
		$element.stop( true /* [clearQueue ] */ /*  [, jumpToEnd ] */ );
		const setTimeoutId = $element.data( _CONSTANTS.MESSAGE_SET_TIMEOUT_DATA_KEY );
		if ( setTimeoutId ) {
			clearTimeout( setTimeoutId );
		}
		$element.data( _CONSTANTS.MESSAGE_SET_TIMEOUT_DATA_KEY, null );
		if ( fadeErrorMsg ) {
			$element.fadeOut( 400 /* [duration ] */  /* [, complete ] */ );  //  OR ( options_object )  duration (default: 400)
		} else {
			$element.hide();
		}
	};

	
	/**
	 * 
	 */
	_isFolder_searches_not_in_any_folder({ $folder_display_order_item_jq }) {
		const searches_not_in_any_folder_String = $folder_display_order_item_jq.attr("data-searches_not_in_any_folder");
		if ( searches_not_in_any_folder_String === "true" ) {
			return true;
		}
		return false;
	};

	/**
	 * 
	 */
	_removeHighlightFromAllFolders() {
		//  Remove highlight from all
		const $folder_display_order_inner_item_jq_All = 
			$( "#organize_searches_folder_entries_block .folder_display_order_inner_item_jq");
		$folder_display_order_inner_item_jq_All.removeClass("highlighted-item");
		const $organize_searches_folder_searches_not_in_any_folder_inner_item =
			$("#organize_searches_folder_searches_not_in_any_folder_inner_item");
		$organize_searches_folder_searches_not_in_any_folder_inner_item.removeClass("highlighted-item");
    };
    
	/**
	 * 
	 */
	_callCallbackForItemInFolder({ ui, $item, callbackOnInFolder }) {
		const objectThis = this;
		
		const searchDragItemInfo = objectThis._isSearchBeingDraggedInsideFolderGetSearchDragItemInfo( 
				{ ui : ui, $searchDragItem : $item } );

		// Determine if the element being dragged top and left are inside "Searches not in any folder"
		const $organize_searches_folder_searches_not_in_any_folder_outer_item =
			$("#organize_searches_folder_searches_not_in_any_folder_outer_item");
		if ( objectThis._isSearchBeingDraggedInsideFolder( { searchDragItemInfo : searchDragItemInfo, $folderItem : $organize_searches_folder_searches_not_in_any_folder_outer_item } ) ) {
			//  Search is in folder so process
			callbackOnInFolder( { $folder_display_order_item_jq_MouseIsOver : $organize_searches_folder_searches_not_in_any_folder_outer_item } );
			return; // Early Exit
		}
		
		// Determine if the element being dragged top and left are inside any of the folder elements
		const $folder_display_order_item_jq_All = 
			$( "#organize_searches_folder_entries_block" ).find(".folder_display_order_item_jq");
		$folder_display_order_item_jq_All.each(  function( index ) { 
			const $folder_display_order_item_jq_Single = $( this );
			
			if ( objectThis._isSearchBeingDraggedInsideFolder( { searchDragItemInfo : searchDragItemInfo, $folderItem : $folder_display_order_item_jq_Single } ) ) {
				//  Search is in folder so process
				callbackOnInFolder( { $folder_display_order_item_jq_MouseIsOver : $folder_display_order_item_jq_Single } );
				return false; // Exit processing in .each()
			}
			
		});
	};
	
	/**
	 * 
	 */
	_isSearchBeingDraggedInsideFolderGetSearchDragItemInfo({ ui, $searchDragItem }) {

        const searchDragItemInfo = { 
				searchDragHeight : $searchDragItem.height(),
				searchDragLeft : ui.offset.left,
				searchDragTop : ui.offset.top };
		
		searchDragItemInfo.searchDragVerticalMiddle = 
			searchDragItemInfo.searchDragTop + ( searchDragItemInfo.searchDragHeight / 2 );

		return searchDragItemInfo;
	};
	
	/**
	 * 
	 */
	_isSearchBeingDraggedInsideFolder({ searchDragItemInfo, $folderItem }) {

		const folderOffset = $folderItem.offset();
		const folderTop = folderOffset.top;
		const folderLeft = folderOffset.left;
		const folderWidth = $folderItem.width()
		// const folderOuterWidth = $folderItem.outerWidth( false /* [includeMargin ] */ );
		const folderHeight = $folderItem.height();
		// const folderOuterHeight = $folderItem.outerHeight( false /* [includeMargin ] */ );
		const folderRight = folderLeft + folderWidth;
		const folderBottom = folderTop + folderHeight;
		if ( searchDragItemInfo.searchDragLeft > folderLeft && searchDragItemInfo.searchDragLeft < folderRight
				&& searchDragItemInfo.searchDragVerticalMiddle > folderTop && searchDragItemInfo.searchDragVerticalMiddle < folderBottom ) {
			return true; //  Search being dragged is in folder
		}
		return false; //  Search being dragged is NOT in folder		
	};

	

    //////////////////////////////////

	/**
	 * 
	 */
	_loadDataFromServer() {

        return new Promise( (resolve, reject) => {
            try {
                let requestObj = {
                    projectIdentifier: this._projectIdentifierFromURL,  // current project
                };

                const url = "d/rws/for-page/project-organize-searches-get-data";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        resolve({ responseData });
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                        throw e;
                    }
                });
            } catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
        });		
    };
    
    /////////////////////
    


	/**
	 * 
	 */
	_addNewFolder() {

		// $("#organize_searches_add_new_folder_button").click(function(eventObject) {
		try {
   
			const $organize_searches_folder_new_folder_name = $("#organize_searches_folder_new_folder_name");
			let folderName = $organize_searches_folder_new_folder_name.val();
			if ( folderName === undefined ) {
				throw Error( ' $("#organize_searches_folder_new_folder_name").val() returned undefined' );
			}
			folderName = folderName.trim();
			if ( folderName === "" ) {
				return;  // EARLY EXIT
			}
		
            let requestObj = {
                projectIdentifier: this._projectIdentifierFromURL,  // current project
                folderName
            };

            const url = "d/rws/for-page/project-organize-searches-add-folder";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        window.location.reload(true);
                        return;
                    }
                    const $organize_searches_folder_new_folder_name = $("#organize_searches_folder_new_folder_name");
                    $organize_searches_folder_new_folder_name.val("");
                    $organize_searches_folder_new_folder_name.focus();
                    //  Reload all data
                    this._startSearchesOrganize();
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	};
	
    /////////////////////
    

	
	/**
	 * 
	 */
	_changeSearchesOrderInDB() {
		try {
			const projectSearchesIdsInOrder = [];
			const $search_display_order_item_jq = $( "#organize_searches_search_entries_block" ).find(".search_display_order_item_jq");
			$search_display_order_item_jq.each( function() {
				const $this = $( this );
				const project_search_id = $this.attr("data-project_search_id");
				if ( project_search_id === undefined ) {
					throw Error( ' $this.attr("data-project_search_id") returned undefined' );
				}
				projectSearchesIdsInOrder.push( project_search_id );
			});
		
            let requestObj = {
                projectSearchesIdsInOrder
            };

            const url = "d/rws/for-page/project-organize-searches-set-searches-order";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        window.location.reload(true);
                        return;
                    }
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    };
    
	/**
	 *  Save new order of folders
	 */
	_changeFoldersOrderInDB() {
		try {
			const projectFolderIdsInOrder = [];
			const folder_display_order_item_jq_All = $( "#organize_searches_folder_entries_block" ).find(".folder_display_order_item_jq");
			folder_display_order_item_jq_All.each( function() {
				const $folder_display_order_item_jq_Each = $( this );
				const folder_id = $folder_display_order_item_jq_Each.attr("data-folder_id");
				if ( folder_id === undefined ) {
					throw Error( ' $folder_display_order_item_jq_Each.attr("data-folder_id") returned undefined' );
				}
				projectFolderIdsInOrder.push( folder_id );
			});
            
            let requestObj = {
                projectFolderIdsInOrder
            };

            const url = "d/rws/for-page/project-organize-searches-set-folders-order";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        window.location.reload(true);
                        return;
                    }
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
		} catch( e ) {
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    };

    /////////////////

    //  Start Delete Folder


	//  Delete Folder processing
	/////////////////
	_deleteFolderClickHandler({ clickThis, eventObject, inOrganizeOverlay }) {

        this._openConfirmDeleteFolderOverlay({ clickThis, eventObject, inOrganizeOverlay });
		return;
	};

	///////////
	_openConfirmDeleteFolderOverlay({ clickThis, eventObject, inOrganizeOverlay }) {
		const $clickThis = $(clickThis);
//		get root div for this folder
		const $folder_root_jq = $clickThis.closest(".folder_root_jq");
		const folderId = $folder_root_jq.attr("data-folder_id");	
		if ( folderId === undefined ) {
			throw Error( "Error: attribute 'data-folder_id' not found on element with class 'folder_root_jq'" );
		}
		const in_organize_overlay = $folder_root_jq.attr("data-in_organize_overlay");
//		copy the folder name to the overlay
		const $folder_name_jq = $folder_root_jq.find(".folder_name_jq");
		const folder_name_jq = $folder_name_jq.text();
		const $delete_folder_overlay_folder_name = $("#delete_folder_overlay_folder_name");
		$delete_folder_overlay_folder_name.text( folder_name_jq );
		const $delete_folder_confirm_button = $("#delete_folder_confirm_button");
		$delete_folder_confirm_button.data("folderId", folderId);
        $delete_folder_confirm_button.data("in_organize_overlay", in_organize_overlay);
        
        if ( ! window.confirm("Delete folder?" ) ) {
            //  User clicked cancel
            return; // EARLY RETURN
        }
                
		if ( folderId === undefined || folderId === null ) {
			throw Error( " folderId === undefined || folderId === null " );
		}
		if ( folderId === "" ) {
			throw Error( ' folderId === "" ' );
		}

        const requestObj = {
            folderId
        };

        const url = "d/rws/for-page/project-organize-searches-folder-delete";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                // Grab the first element in the $searchItem array and access its qTip API
                const qtipApi = $clickThis.qtip('api');
                if ( qtipApi ) {
                    qtipApi.hide(true);
                }
                
                if ( inOrganizeOverlay ) {
                    this._startSearchesOrganize();
                } else {
                    this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
                }
            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
	};

	//  END   Delete Folder processing



	//  Rename Folder processing
	/////////////////
	_renameFolderClickHandler({ clickThis, eventObject, inOrganizeOverlay }) {
		this._openConfirmRenameFolderOverlay({ clickThis, eventObject, inOrganizeOverlay });
		return;
	};

	///////////
	_openConfirmRenameFolderOverlay({ clickThis, eventObject, inOrganizeOverlay }) {
		const $clickThis = $(clickThis);
//		get root div for this folder
		const $folder_root_jq = $clickThis.closest(".folder_root_jq");
		const folderId = $folder_root_jq.attr("data-folder_id");	
		if ( folderId === undefined ) {
			throw Error( "Error: attribute 'data-folder_id' not found on element with class 'folder_root_jq'" );
		}
        const in_organize_overlay = $folder_root_jq.attr("data-in_organize_overlay");
//		copy the folder name to the overlay
		const $folder_name_jq = $folder_root_jq.find(".folder_name_jq");
        const folderName = $folder_name_jq.text();

        const project__rename_folder_modal_dialogContext = { folderName };
        const modalHTLM = _project_page__searches_section_organize_searches_template.project__rename_folder_modal_dialog( project__rename_folder_modal_dialogContext );

        const $contentDiv = $( modalHTLM );

		let props = { };
		props.width = '400';
		props.height = '200'
		props.title = 'Rename Folder';
		props.$containerDiv = $('body');
		props.hideOnBackgroundClick = true;

		props.$contentDiv = $contentDiv;

		props.callbackOnClickedHide = () => {
			//  Overlay Hide callback
			
		}

		const overlay = new ModalOverlay(props);

        overlay.show();
        
        const $selector_rename_folder_cancel_button = $contentDiv.find(".selector_rename_folder_cancel_button");
        $selector_rename_folder_cancel_button.click( ( ) => {
            try {
                overlay.hide();
                overlay.remove();
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });

        const $selector_rename_folder_save_button = $contentDiv.find(".selector_rename_folder_save_button");
        $selector_rename_folder_save_button.click( ( ) => {
            try {
                const $selector_rename_folder_overlay_folder_name = $contentDiv.find(".selector_rename_folder_overlay_folder_name");
                const newFolderName = $selector_rename_folder_overlay_folder_name.val();
                this._renameFolderSaveNewName({ newFolderName, folderId, inOrganizeOverlay, overlay });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
	};

	_renameFolderSaveNewName({ newFolderName, folderId, inOrganizeOverlay, overlay }) {

		if ( newFolderName === "" ) {
			return;  // EARLY EXIT
        }
        
        const requestObj = {
            folderId,
            newFolderName
        };

        const url = "d/rws/for-page/project-organize-searches-folder-rename";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => {  }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                if ( inOrganizeOverlay ) {
                    overlay.hide();
                    overlay.remove();
                    this._startSearchesOrganize();
                } else {
                    overlay.hide();
                    overlay.remove();
                    this._projectPage_SearchesSection_AllUsersInteraction.getSearchList();
                }
            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        });
	};


	//  END   Rename Folder processing

    
}

