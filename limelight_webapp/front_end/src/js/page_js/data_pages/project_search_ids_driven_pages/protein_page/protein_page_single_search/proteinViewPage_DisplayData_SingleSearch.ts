/**
 * proteinViewPage_DisplayData_SingleSearch.ts
 * 
 * Javascript for proteinView.jsp page - Displaying Data for Single Search  
 * 
 * 
 * 
 * 
 * 
 */

import { variable_is_type_number_Check } from 'page_js/variable_is_type_number_Check';

import { Handlebars, _protein_table_template_bundle } from './proteinViewPage_DisplayData_SingleSearch_ImportHandlebarsTemplates';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { CentralPageStateManager } from 'page_js/data_pages/central_page_state_manager/centralPageStateManager';

import { DataPageStateManager } from 'page_js/data_pages/data_pages_common/dataPageStateManager';

import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile';

import { AnnotationTypeData_ReturnSpecifiedTypes } from 'page_js/data_pages/data_pages_common/annotationTypeData_ReturnSpecifiedTypes';


import { DataTable_RootTableObject, DataTable_ColumnId, DataTable_TableOptions, DataTable_SortColumnsInfoEntry, DataTable_RootTableDataObject, DataTable_DataRowEntry, DataTable_DataGroupRowEntry, DataTable_TableOptions_dataRowClickHandler_RequestParm } from 'page_js/data_pages/data_table_react/dataTable_React_DataObjects';

import { create_dataTable_Root_React, remove_dataTable_Root_React } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React_Create_Remove_Table_DOM'

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { ProteinViewPage_StatsSectionCreator_SingleSearch } from './proteinPageStatsSectionCreator_SingleSearch';

import { ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer } from './proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer';

import { ProteinViewPage_Display_SingleProtein_SingleSearch } from './proteinViewPage_DisplayData_SingleProtein_SingleSearch';

import { SingleProtein_CentralStateManagerObjectClass } from '../protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass';
import { ProteinList_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass';
import { ProteinGrouping_CentralStateManagerObjectClass } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass';

import { DataTable_TableRoot } from 'page_js/data_pages/data_table_react/dataTable_TableRoot_React';

import { createProteinDisplayData, ProteinDisplayData_From_createProteinDisplayData, ProteinNameDescriptionCacheEntry, CountsFor_proteinSequenceVersionIdEntry, ProteinDataDisplay_ProteinListItem_SingleSearch } from './proteinViewPage_DisplayData_SingleSearch_CreateProteinDisplayData';
import { renderToPageProteinList_SingleSearch_Create_DataTable_RootTableDataObject, ProteinRow_tableRowClickHandlerParameter_SingleSearch, getProteinDataTableColumns_SingleSearch, createProteinList_ForDataTable_SingleSearch } from './proteinViewPage_DisplayData_SingleSearch_Create_ProteinList_DataTable_RootTableDataObject';
import { _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH } from './proteinViewPage_DisplayData_SingleSearch_Constants';

	
/**
 * 
 */
export class ProteinViewPage_Display_SingleSearch {

	private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

	//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
	
	// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
	
	//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch
	
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;

	
	// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
	
	//   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

	private _loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
	
	private _dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory;
	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _centralPageStateManager : CentralPageStateManager;
	private _singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass;
	private _proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass;
	private _proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass;

	private _annotationTypeData_ReturnSpecifiedTypes : AnnotationTypeData_ReturnSpecifiedTypes;
	
	private _proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer;
	
	private _proteinViewPage_StatsSectionCreator_SingleSearch : ProteinViewPage_StatsSectionCreator_SingleSearch;

	//  From Protein Template:
	
	private _protein_page_protein_tooltip_Template = _protein_table_template_bundle.protein_page_protein_tooltip;

	private _protein_filters_show_protein_groups_filter_Template = _protein_table_template_bundle.protein_filters_show_protein_groups_filter;
		
	
	//   projectSearchId being processed.  Reset All data if receive different projectSearchId
	private _projectSearchId : number = undefined;
	
	//   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
	private _proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = undefined;
	
	//   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
	private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = undefined;
	
	//   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
	private _peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry> = undefined;

	private _proteinViewPage_Display_SingleProtein_SingleSearch : ProteinViewPage_Display_SingleProtein_SingleSearch;

	private _downloadProteinsClickHandlerAttached : boolean;
	private _proteinList_renderedReactComponent : DataTable_TableRoot;
	private _addTooltipForProteinName_Called : boolean;

	private _mainData_LoadedFor_displayProteinListOnPage = false; // Set to true once "Main Data" Loaded for current project search id.
	
	/**
	 * 
	 */
	constructor( {
		dataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		centralPageStateManager,
		singleProtein_CentralStateManagerObject,
		proteinList_CentralStateManagerObjectClass,
		proteinGrouping_CentralStateManagerObjectClass
	} : {
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager,
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		centralPageStateManager : CentralPageStateManager,
		singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass,
		proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass
		proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
	}) {

		//  TODO  Maybe this._loadedDataCommonHolder should be owned at a more root level since it contains data across Project Search Ids
		
		// !!!!!!!!!  TODO  Parts of this._loadedDataCommonHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataCommonHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch
		
		this._loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

		
		// !!!!!!!!!  TODO  Parts of this._loadedDataPerProjectSearchIdHolder need to be cleared if the cutoffs or other filters change
		
		//   this._loadedDataPerProjectSearchIdHolder is shared with this._proteinViewPage_Display_SingleProtein_SingleSearch

		this._loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
		
		this._dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory;
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._centralPageStateManager = centralPageStateManager;
		this._singleProtein_CentralStateManagerObject = singleProtein_CentralStateManagerObject;
		this._proteinList_CentralStateManagerObjectClass = proteinList_CentralStateManagerObjectClass;
		this._proteinGrouping_CentralStateManagerObjectClass = proteinGrouping_CentralStateManagerObjectClass;
		
		this._annotationTypeData_ReturnSpecifiedTypes = new AnnotationTypeData_ReturnSpecifiedTypes( {
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server 
		} );
		
		this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer =
			new ProteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer({
				loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder
			})
		
		this._proteinViewPage_StatsSectionCreator_SingleSearch = new ProteinViewPage_StatsSectionCreator_SingleSearch({ loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder });

		
		//  From Protein Template:
		
		if ( ! _protein_table_template_bundle.protein_page_protein_tooltip ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_page_protein_tooltip");
		}
		if ( ! _protein_table_template_bundle.protein_filters_show_protein_groups_filter ) {
			throw Error("Nothing in _protein_table_template_bundle.protein_filters_show_protein_groups_filter");
		}
	}
	
	/**
	 * Initialize
	 */
	initialize({ projectSearchId } : { projectSearchId : number }) {

		if ( ! variable_is_type_number_Check( projectSearchId ) ) {
			throw Error("initialize({ projectSearchId }): projectSearchId is not a number: projectSearchId: " + projectSearchId );
		}

		this._projectSearchId = projectSearchId;
	}

	/**
	 * 
	 */
	populateOtherFiltersInFilterBlock() : void {

		this._add_GroupProteins_UserSelections();
	}

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	
	/**
	 * 
	 */
	_add_GroupProteins_UserSelections() {

		{  //  Add to "Filters:"  "Group Proteins:" with radio buttons
			const $protein_main_page_filter_section = $("#protein_main_page_filter_section");
			if ( $protein_main_page_filter_section.length === 0 ) {
				throw Error("NO DOM element with id 'protein_main_page_filter_section'");
			}

			//  Convert groupProteins value into booleans for handlebars template

			let proteinGroupNone = false;
			let proteinGroup_GroupProteins = false;
			let proteinGroup_GroupProteins_NonSubset = false;
			let proteinGroup_GroupProteins_Parsimonious = false;

			if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

				proteinGroupNone = true;

			} else if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups() ) {

				proteinGroup_GroupProteins = true;

			} else if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups() ) {

				proteinGroup_GroupProteins_NonSubset = true;

			} else if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {

				proteinGroup_GroupProteins_Parsimonious = true;

			} else {

				const msg = "ProteinViewPage_Display_SingleSearch:_displayProteinListOnPage: NO this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_... function returned true ";
				console.warn( msg );
				throw Error( msg );
			}

			const show_protein_groups_filterHTML = this._protein_filters_show_protein_groups_filter_Template({ proteinGroupNone, proteinGroup_GroupProteins, proteinGroup_GroupProteins_NonSubset, proteinGroup_GroupProteins_Parsimonious });
			const $show_protein_groups_filter = $( show_protein_groups_filterHTML );
			$show_protein_groups_filter.appendTo( $protein_main_page_filter_section );
			
			{  //  selector_filter_show_protein_groups_no
				const $selector_filter_show_protein_groups_no = $show_protein_groups_filter.find(".selector_filter_show_protein_groups_no");
				if ( $selector_filter_show_protein_groups_no.length === 0 ) {
					throw Error("NO DOM element with class 'selector_filter_show_protein_groups_no'");
				}
				$selector_filter_show_protein_groups_no.click( ( eventObject ) => {
					try {
						if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
							//  Already this value
							return;  // EARLY RETURN
						}
						window.setTimeout( ( ) => { // Run in setTimeout so radio button updates immediately
							try {
								this._proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_No_Grouping();  // Update state in URL

								if ( ! this._mainData_LoadedFor_displayProteinListOnPage ) { // = false; // Set to true once "Main Data" Loaded for current project search id.
									//  Loading Main Data data in progress.
									//  Group Protein Selection will be evaluated when Loading of Main data is complete
									//  Will display data when data is loaded.
									return; // EARY RETURN
								}

								this._displayProteinListOnPage();

							} catch( e ) {
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}	
						}, 10 );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}	
				});
			}
			{   //  selector_filter_show_protein_groups_do_protein_groups
				const $selector_filter_show_protein_groups_do_protein_groups = $show_protein_groups_filter.find(".selector_filter_show_protein_groups_do_protein_groups");
				if ( $selector_filter_show_protein_groups_do_protein_groups.length === 0 ) {
					throw Error("NO DOM element with class 'selector_filter_show_protein_groups_do_protein_groups'");
				}
				$selector_filter_show_protein_groups_do_protein_groups.click( ( eventObject ) => {
					try {
						if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_All_Groups() ) {
							//  Already this value
							return;  //  EARLY RETURN
						}
						window.setTimeout( ( ) => { // Run in setTimeout so radio button updates immediately
							try {
								this._proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_All_Groups();  // Update state in URL

								if ( ! this._mainData_LoadedFor_displayProteinListOnPage ) { // = false; // Set to true once "Main Data" Loaded for current project search id.
									//  Loading Main Data data in progress.
									//  Group Protein Selection will be evaluated when Loading of Main data is complete
									//  Will display data when data is loaded.
									return; // EARY RETURN
								}

								this._displayProteinListOnPage();

							} catch( e ) {
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}	
						}, 10 );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}	
				});
			}
			{  //  selector_filter_show_protein_groups_do_protein_groups_non_subset
				const $selector_filter_show_protein_groups_do_protein_groups_non_subset = $show_protein_groups_filter.find(".selector_filter_show_protein_groups_do_protein_groups_non_subset");
				if ( $selector_filter_show_protein_groups_do_protein_groups_non_subset.length === 0 ) {
					throw Error("NO DOM element with class 'selector_filter_show_protein_groups_do_protein_groups_non_subset'");
				}
				$selector_filter_show_protein_groups_do_protein_groups_non_subset.click( ( eventObject ) => {
					try {
						if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_NonSubset_Groups()  ) {
							//  Already this value
							return;  //  EARLY RETURN
						}
						window.setTimeout( ( ) => { // Run in setTimeout so radio button updates immediately
							try {
								this._proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_NonSubset_Groups();  // Update state in URL

								if ( ! this._mainData_LoadedFor_displayProteinListOnPage ) { // = false; // Set to true once "Main Data" Loaded for current project search id.
									//  Loading Main Data data in progress.
									//  Group Protein Selection will be evaluated when Loading of Main data is complete
									//  Will display data when data is loaded.
									return; // EARY RETURN
								}

								this._displayProteinListOnPage();

							} catch( e ) {
								reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
								throw e;
							}	
						}, 10 );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}	
				});
			}
			// Comment out since not currently supported
			// {
			// 	const $selector_filter_show_protein_groups_do_protein_groups_parsimonious = $show_protein_groups_filter.find(".selector_filter_show_protein_groups_do_protein_groups_parsimonious");
			// 	if ( $selector_filter_show_protein_groups_do_protein_groups_parsimonious.length === 0 ) {
			// 		throw Error("NO DOM element with class 'selector_filter_show_protein_groups_do_protein_groups_parsimonious'");
			// 	}
			// 	$selector_filter_show_protein_groups_do_protein_groups_parsimonious.click( ( eventObject ) => {
			// 		try {
			// 			if ( this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_Parsimonious_Groups() ) {
			// 				//  Already this value
			// 				return;  //  EARLY RETURN
			// 			}
			// 			window.setTimeout( ( ) => { // Run in setTimeout so radio button updates immediately
			// 				try {
			// 					this._proteinGrouping_CentralStateManagerObjectClass.setGroupProteins_Parsimonious_Groups();  // Update state in URL

			// 					if ( ! this._mainData_LoadedFor_displayProteinListOnPage ) { // = false; // Set to true once "Main Data" Loaded for current project search id.
			// 						//  Loading Main Data data in progress.
			// 						//  Group Protein Selection will be evaluated when Loading of Main data is complete
			// 						//  Will display data when data is loaded.
			// 						return; // EARY RETURN
			// 					}

			// 					this._displayProteinListOnPage();

			// 				} catch( e ) {
			// 					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			// 					throw e;
			// 				}	
			// 			}, 10 );
			// 		} catch( e ) {
			// 			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			// 			throw e;
			// 		}	
			// 	});
			// }
		}

	}

	
	/**
	 * Populate Protein List On Page For Single Project Search Id
	 * 
	 * @param projectSearchId - may be different than value passed to initialize if now showing a different projectSearchId
	 * 
	 */
	populateProteinList({ projectSearchId } : { projectSearchId : number }) {

		if ( ! variable_is_type_number_Check( projectSearchId ) ) {
			throw Error("populateProteinList({ projectSearchId }): projectSearchId is not a number: projectSearchId: " + projectSearchId );
		}
		
		this._mainData_LoadedFor_displayProteinListOnPage = false; // Set to true once "Main Data" Loaded for current project search id.

		{
			//  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

			const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

			if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {
				//  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

				//  Hide Main Div inside of header/footer
				const data_page_overall_enclosing_block_divDOM = document.getElementById( "data_page_overall_enclosing_block_div" );
				if ( ! data_page_overall_enclosing_block_divDOM ) {
					const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
					console.warn( msg );
					throw Error( msg );
				}
				data_page_overall_enclosing_block_divDOM.style.display = "none";
				
				if ( ! this._proteinViewPage_Display_SingleProtein_SingleSearch ) {
					this._instantiateObject_Class__ProteinViewPage_Display_SingleProtein_SingleSearch({ currentWindowScrollY : undefined });
				}
				this._proteinViewPage_Display_SingleProtein_SingleSearch.openOverlay_OnlyLoadingMessage();
			}
		}
		{
			//  Show <div id="protein_page_outermost_block"> (the outermost <div> on the protein page) ,which is just inside <div id="data_page_overall_enclosing_block_div" > from header
			const protein_page_outermost_blockDOM = document.getElementById( "protein_page_outermost_block" );
			if ( ! protein_page_outermost_blockDOM ) {
				const msg = "No element on DOM with id 'protein_page_outermost_block'";
				console.warn( msg );
				throw Error( msg );
			}
			protein_page_outermost_blockDOM.style.display = "";
		}

		//   Clear: Protein Name and Description in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescription_Key_ProteinSequenceVersionId = new Map();

		//   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
		this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = new Map();

		//   Clear: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
		this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = new Map();

		if ( this._projectSearchId !== projectSearchId ) {

			//  Clear all retained Data
			this._loadedDataPerProjectSearchIdHolder.clearAllData();
		}

		this._projectSearchId = projectSearchId;  // Save projectSearchId
		
		//  for just changes to cutoff filters
		this._loadedDataPerProjectSearchIdHolder.clearForNewCutoffsOrDisplayedData()
		
		//   TODO  Maybe don't need to call this, only clearForNewCutoffsOrDisplayedData()
		
		//  Clear all retained Data
		this._loadedDataPerProjectSearchIdHolder.clearAllData();
		
		
		let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
		if ( $protein_table_loading_text_display.length === 0 ) {
			throw Error("No element found with id 'protein_table_loading_text_display'");
		}
		$protein_table_loading_text_display.show();
		
		let $protein_list_container = $("#protein_list_container");
		if ( $protein_list_container.length === 0 ) {
			throw Error("No element found for id 'protein_list_container'");
		}	
		$protein_list_container.hide();
		
		$("#protein_list_size").empty();

		$("#protein_group_list_size_section_display").hide();
		$("#protein_group_list_size").empty();
		

		let searchDataLookupParams_For_Single_ProjectSearchId = this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_SingleProjectSearchId( { projectSearchId, dataPageStateManager : undefined } );
			
		if ( ! searchDataLookupParams_For_Single_ProjectSearchId ) {
			const msg = "No entry found in searchDetailsBlockDataMgmtProcessing for projectSearchId: " + projectSearchId;
			console.log( msg );
			throw Error( msg );
		}
		
		const promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer = (
			this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.getDataFromServer( { projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } )
		);

		promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.catch( (reason) => {} );
		promise_proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer.then( (value) => {
			try {

				this._mainData_LoadedFor_displayProteinListOnPage = true; // Set to true once "Main Data" Loaded for current project search id.

				this._displayProteinListOnPage();

			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}		
		});
	}

	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	
	/**
	 * Display Protein List on Page
	 */
	_displayProteinListOnPage() {

		// const projectSearchId = this._projectSearchId;

		const proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData = createProteinDisplayData({ 
								
			projectSearchId : this._projectSearchId,
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder, 
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server, 
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			annotationTypeData_ReturnSpecifiedTypes : this._annotationTypeData_ReturnSpecifiedTypes,
		
			proteinNameDescription_Key_ProteinSequenceVersionId : this._proteinNameDescription_Key_ProteinSequenceVersionId, 
			proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
			peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId
		});
		
		this._renderToPageProteinList( { projectSearchId : this._projectSearchId, proteinDisplayData } );

		const proteinSequenceVersionId_FromURL = this._singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

		if ( proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null ) {

			//  When do this processing here, an optimization would be to not create the protein list.  That would require other changes.

			//  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
			this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId : proteinSequenceVersionId_FromURL, $target : undefined } ) ;
		}


		if ( ! this._downloadProteinsClickHandlerAttached ) {
	
			//  Download Proteins container and link.  The version for 1 project search id

			//  Show and attach click handler here since now have the data loaded for downloading
		
			const $protein_download_proteins = $("#protein_download_proteins");

			//  First remove any previous click handler
			$protein_download_proteins.off("click");
			
			$protein_download_proteins.show();

			$protein_download_proteins.click( (eventObject) => {
				try {
					eventObject.preventDefault();

					this._downloadProteinList();

				} catch (e) {
					reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
					throw e;
				}
			});

			this._downloadProteinsClickHandlerAttached = true;
		}

	}

	
	

	///////////////////////////////////////
	
	/**
	 * 
	 */
	_renderToPageProteinList({ projectSearchId, proteinDisplayData } : { 
		projectSearchId : number
		proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData
	}) : void {

		console.log("Rendering Protein List START, Now: " + new Date() );
		
		const proteinList = proteinDisplayData.proteinList;
		const annotationTypeRecords_DisplayOrder = proteinDisplayData.annotationTypeRecords_DisplayOrder;

		let $protein_table_loading_text_display = $("#protein_table_loading_text_display");
		if ( $protein_table_loading_text_display.length === 0 ) {
			throw Error("No element found with id 'protein_table_loading_text_display'");
		}
		$protein_table_loading_text_display.hide();
		
		let $protein_list_container = $("#protein_list_container");
		if ( $protein_list_container.length === 0 ) {
			throw Error("No element found for id 'protein_list_container'");
		}
		
		let proteinListLength = 0;
		if (proteinList && proteinList.length > 0) {
			proteinListLength = proteinList.length;
		}

		const proteinCount = proteinListLength.toLocaleString();
		const reportedPeptideCount_TotalForSearch_Display = proteinDisplayData.reportedPeptideCount_TotalForSearch.toLocaleString();
		const psmCount_TotalForSearch_Display = proteinDisplayData.psmCount_TotalForSearch.toLocaleString();

		$("#protein_list_size").text( proteinCount );
		$("#reported_peptide_count_label").show();
		$("#reported_peptide_count_display").text( reportedPeptideCount_TotalForSearch_Display );
		$("#psm_count_label").show();
		$("#psm_count_display").text( psmCount_TotalForSearch_Display );


		this._proteinViewPage_StatsSectionCreator_SingleSearch.setProteinListData({ 
			projectSearchId : this._projectSearchId,
			proteinListData : { 
				psmCount: proteinDisplayData.psmCount_TotalForSearch,
				reportedPeptideCount: proteinDisplayData.reportedPeptideCount_TotalForSearch,
				proteinCount: proteinListLength
			}
		});

		this._proteinViewPage_StatsSectionCreator_SingleSearch.addDisplayClickHandler();
		

		if (proteinList && proteinList.length > 0) {

			//  Have Data to show

			this._renderToPageProteinList_ActualRender({ 
				proteinList, annotationTypeRecords_DisplayOrder, $protein_list_container, projectSearchId 
			});
			
		} else {

			if ( ! this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
				$("#protein_group_list_size").text( "0" );
				$("#protein_group_list_size_section_display").show();
			} else {
				$("#protein_group_list_size_section_display").hide();
			}

			//  No Data to show

			//  Remove existing React in $protein_list_container

			if ( $protein_list_container.length !== 1 ) {
				throw Error("Not found exactly one DOM element for $protein_list_container");
			}
			const protein_list_containerDOMElement = $protein_list_container[ 0 ];
			remove_dataTable_Root_React({ containerDOMElement : protein_list_containerDOMElement }); // External function

			this._proteinList_renderedReactComponent = undefined;

			console.log("Rendering Protein List END (No Data), Now: " + new Date() );
		}
	}

	/**
	 * Have data so actual render
	 */
	_renderToPageProteinList_ActualRender({ proteinList, annotationTypeRecords_DisplayOrder, $protein_list_container, projectSearchId } : { 
		
		proteinList : Array<ProteinDataDisplay_ProteinListItem_SingleSearch>, 
		annotationTypeRecords_DisplayOrder, 
		$protein_list_container, 
		projectSearchId : number
	} ) {
		
		
		const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
		if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
			throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
		}
		$protein_counts_download_assoc_psms_block.hide();

		if ( this._proteinList_renderedReactComponent && proteinList.length > 80 ) {

			//  Have existing list that will be updating and new list is long enough so display "Updating" message
			const $protein_list_updating_message = $("#protein_list_updating_message");
			if ( $protein_list_updating_message.length === 0 ) {
				throw Error("Failed to find DOM element with id 'protein_list_updating_message'");
			}
			$protein_list_updating_message.show();
		}
		
		const tableOptions = new DataTable_TableOptions({
			dataRowClickHandler : this._singleProteinRowClickHandler_BindThis,
		})
		
		//   Create Data Table
		const tableDataObject : DataTable_RootTableDataObject = renderToPageProteinList_SingleSearch_Create_DataTable_RootTableDataObject({ // External Function
			proteinList, annotationTypeRecords_DisplayOrder, proteinGrouping_CentralStateManagerObjectClass : this._proteinGrouping_CentralStateManagerObjectClass, projectSearchId 
		});

		const tableObject = new DataTable_RootTableObject({ tableDataObject, tableOptions, dataTableId: "Single Search Protein List" });
		
		if ( ! this._proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
			//  Update Protein Group Count
			if ( tableObject.tableDataObject.dataTable_DataGroupRowEntries === undefined ) {
				throw Error("groupProteinsInDataTable is true and tableObject.dataGroupObjects === undefined");
			}
			const groupCount = tableObject.tableDataObject.dataTable_DataGroupRowEntries.length.toLocaleString();
			$("#protein_group_list_size").text( groupCount );
			$("#protein_group_list_size_section_display").show();
		} else {
			$("#protein_group_list_size_section_display").hide();
		}	


			
		// if ( this._proteinList_renderedReactComponent ) {

		// 	//  Already have React Component of Protein List on Page so update it

		//  	Not calling this._proteinList_renderedReactComponent.update_tableObject since that was having problems and was removed

		// 		this._proteinList_renderedReactComponent.update_tableObject({ tableObject });

		// 		return;  // EARLY RETURN
		// }

		window.setTimeout( () => {

			// Run in setTimeout so all previous page updates get painted first

			const $protein_counts_download_assoc_psms_block = $("#protein_counts_download_assoc_psms_block");
			if ( $protein_counts_download_assoc_psms_block.length === 0 ) {
				throw Error("Failed to find DOM element with id 'protein_counts_download_assoc_psms_block'");
			}
			$protein_counts_download_assoc_psms_block.show();

			$protein_list_container.show();

			const $protein_list_updating_message = $("#protein_list_updating_message");
			if ( $protein_list_updating_message.length === 0 ) {
				throw Error("Failed to find DOM element with id 'protein_list_updating_message'");
			}
			$protein_list_updating_message.hide();

			const renderCompleteCallbackFcn = () => {

				//   This code runs the component is created.

				console.log("Rendering Protein List END, Now: " + new Date() );
			}

			// add the table to the page

			if ( $protein_list_container.length !== 1 ) {
				throw Error("Not found exactly one DOM element for $protein_list_container");
			}
			const protein_list_containerDOMElement = $protein_list_container[ 0 ];

			this._proteinList_renderedReactComponent = create_dataTable_Root_React({  // External Function;

				tableObject, containerDOMElement : protein_list_containerDOMElement, renderCompleteCallbackFcn 
			});

			//  Add tooltips to  $protein_list_container instead since that is what is already in the DOM
			this._addTooltipForProteinName( { $selector_table_rows_container : $protein_list_container } )

		}, 10 );

		// this._populated_DOM_id_protein_list_container__With_React = true;
	}

	//////////////////////////////////////
	//////////////////////////////////////
	//////////////////////////////////////
    
    //     Click Handlers and Tooltips
	
	/**
	 * 
	 */
    _singleProteinRowClickHandler( param : DataTable_TableOptions_dataRowClickHandler_RequestParm ) {

		const eventObject = param.event;
		
		const proteinRow_tableRowClickHandlerParameter = param.tableRowClickHandlerParameter as ProteinRow_tableRowClickHandlerParameter_SingleSearch
		if ( ! ( proteinRow_tableRowClickHandlerParameter instanceof ProteinRow_tableRowClickHandlerParameter_SingleSearch ) ) {
			const msg = "ProteinViewPage_Display_SingleSearch: _singleProteinRowClickHandler:  if ( ! ( proteinRow_tableRowClickHandlerParameter instanceof ProteinRow_tableRowClickHandlerParameter ) ). proteinRow_tableRowClickHandlerParameter:  ";
			console.warn( msg, proteinRow_tableRowClickHandlerParameter );
			throw Error( msg );
		}

		const proteinSequenceVersionId = proteinRow_tableRowClickHandlerParameter.proteinSequenceVersionId

		eventObject.stopPropagation();

		{
			//  Exit if user selected content on the page
			const selectedContent = window.getSelection().toString();
			if( selectedContent ){
				//  user selected content on the page
				return false; //  EARLY RETURN
			}
		}
		
		const $target = $( eventObject.target );

		if ( eventObject.ctrlKey || eventObject.metaKey ) {

			//  Show Single Protein in New Window

			this._singleProteinRowShowSingleProteinNewWindow( { $target, proteinSequenceVersionId } );
			return; //  EARLY RETURN
		}

		this._singleProtein_CentralStateManagerObject.setProteinSequenceVersionId( { proteinSequenceVersionId } );
		
		this._singleProteinRowShowSingleProteinOverlay( { $target, proteinSequenceVersionId } );
	}

	/**
	 * 
	 */
    _singleProteinRowShowSingleProteinNewWindow( { $target, proteinSequenceVersionId } ) {

		//  Create URL for new Window about to open

		//  Create to override the value of proteinSequenceVersionId from the URL
		const singleProtein_CentralStateManagerObjectClass_ForNewWindow =
			new SingleProtein_CentralStateManagerObjectClass({ initialProteinSequenceVersionId: proteinSequenceVersionId, centralPageStateManager : undefined });

		const newWindowURL = this._centralPageStateManager.getURL_ForCurrentState({ componentOverridesAdditions: [ singleProtein_CentralStateManagerObjectClass_ForNewWindow ] })

		// MUST open window before make AJAX Call.  This is a Browser Security requirement
		//  window.open(...): Must run in code directly triggered by click event

		const newWindow = window.open(newWindowURL, "_blank");
	}

	/**
	 * 
	 */
    _singleProteinRowShowSingleProteinOverlay( { $target, proteinSequenceVersionId } ) {
		
		const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinNameDescription === undefined ) {
			return "Description Not Found";
		}
		
		const proteinNameDescriptionParam = { name : proteinNameDescription.name, description : proteinNameDescription.description };
		

		const proteinCoverage_KeyProteinSequenceVersionId = this._loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( proteinCoverageObject === undefined ) {
			throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
		}
		const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio();
		const sequenceCoverageAsPercent = ( proteinCoverageRatio * 100 ).toFixed( 1 );

		const countsFor_proteinSequenceVersionId = 
			this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( countsFor_proteinSequenceVersionId === undefined ) {
			throw Error("No countsFor_proteinSequenceVersionId found.  proteinSequenceVersionId: " + proteinSequenceVersionId );
		}


		const proteinSummaryStatisticsParam = {
				sequenceCoverageAsPercent : sequenceCoverageAsPercent,
				peptideCount : countsFor_proteinSequenceVersionId.numReportedPeptides,
				uniquePeptideCount : countsFor_proteinSequenceVersionId.numReportedPeptidesUnique,
				psmCount : countsFor_proteinSequenceVersionId.numPsms,
		};

		if ( $target ) {

			const $protein_list_container = $("#protein_list_container");

			if ( $protein_list_container.length === 0 ) {
				throw Error("_singleProteinRowShowSingleProteinOverlay:No DOM element found with id 'protein_list_container'")
			}

			if ( $protein_list_container.length !== 0 ) {
				// Grab the first element in the tooltips array and access its qTip API
				const qtipAPI = ( $protein_list_container as any ).qtip('api'); // cast $protein_list_container as any since qtip is a plugin
				if ( qtipAPI ) {
					qtipAPI.toggle(false);  // ensure qtip not shown
				} else {
					console.warn("$protein_list_container: no value for qtipAPI")
				}
			}
		}

		//  Current Window Scroll position
		const currentWindowScrollY = window.scrollY;

		//  Hide Main Div inside of header/footer
		const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
		$data_page_overall_enclosing_block_div.hide();

		if ( ! this._proteinViewPage_Display_SingleProtein_SingleSearch ) {

			this._instantiateObject_Class__ProteinViewPage_Display_SingleProtein_SingleSearch({ currentWindowScrollY });
		}

		this._proteinViewPage_Display_SingleProtein_SingleSearch.openOverlay({ 
			proteinSequenceVersionId, 
			projectSearchId : this._projectSearchId, 
			proteinNameDescription : proteinNameDescriptionParam,
			proteinSummaryStatistics : proteinSummaryStatisticsParam 
		});
	}

	/**
	 * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
	 */
	_instantiateObject_Class__ProteinViewPage_Display_SingleProtein_SingleSearch({ currentWindowScrollY }) {
		
		//  Create callback function to call on single protein close
		
		const singleProteinCloseCallback = () => {

			this._proteinViewPage_Display_SingleProtein_SingleSearch = undefined;

			//  Show Main Div inside of header/footer
			const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
			// console.log("running $data_page_overall_enclosing_block_div.show();")
			$data_page_overall_enclosing_block_div.show();

			if ( currentWindowScrollY ) {

				//  Scroll window down to original position when protein was clicked to open Single Protein view
				
				//  Web standard, should be supported in Edge but doesn't seem to work in Edge
				// window.scrollTo({ top : currentWindowScrollY });

				$( window ).scrollTop( currentWindowScrollY );
			}
		}

		this._proteinViewPage_Display_SingleProtein_SingleSearch = new ProteinViewPage_Display_SingleProtein_SingleSearch( {
			dataPages_LoggedInUser_CommonObjectsFactory : this._dataPages_LoggedInUser_CommonObjectsFactory,
			proteinViewPage_Display_SingleSearch : this,
			proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer : this._proteinViewPage_DisplayData_SingleSearch_LoadProcessDataFromServer,
			dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			loadedDataCommonHolder : this._loadedDataCommonHolder,
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder,
			singleProtein_CentralStateManagerObject : this._singleProtein_CentralStateManagerObject,
			singleProteinCloseCallback : singleProteinCloseCallback
		} );
	}


	/**
	 * 
	 */
	_addTooltipForProteinName( { $selector_table_rows_container } ) {
		
		if ( this._addTooltipForProteinName_Called === true ) {
			//  Already called so just exit.  Assume that DOM element has not been removed and added
			return;
		}

		this._addTooltipForProteinName_Called = true;

		// const objectThis = this;
		
		//  qtip tooltip on whole block

		// const selector_table_rows_container_Element = $selector_table_rows_container[ 0 ];

		$selector_table_rows_container.qtip({

			content: {
				text: "&nbsp;" // Replaced as mouse over each sequence letter
			},
			position: {
				effect:false,
				target: 'mouse'
					,
					adjust: { x: 5, y: 5 } // Offset it slightly from under the mouse
			},
			show: {
				delay: 1,
			},
			hide: {
				delay:0,
				effect:false,
			}
		});

		// Grab the first element in the tooltips array and access its qTip API
		const qtipAPI = $selector_table_rows_container.qtip('api');
		

		const proteinSequenceVersionIdNotAvailable = undefined;
	
		const lastProteinSequenceVersionIdObjInContainingFunction = { lastProteinSequenceVersionId : -2 };
		
		const updateTooltipOnMouseMove_BindThis = this._updateTooltipOnMouseMove.bind( this ); 

		//  Add a mouse move event handler to the protein bar overlay rectangle to update the contents of the qtip tool tip 
		$selector_table_rows_container.mousemove( function( eventObject ) {
			updateTooltipOnMouseMove_BindThis( eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable );
		} );

		const updateTooltipOnScroll_BindThis = this._updateTooltipOnScroll.bind( this );
		
		//  Add a scroll event handler to hide the tooltip on scroll
		window.addEventListener( "scroll", function( eventObject ) {
			updateTooltipOnScroll_BindThis( eventObject, qtipAPI, lastProteinSequenceVersionIdObjInContainingFunction, proteinSequenceVersionIdNotAvailable );
		}, { passive: true } );
		
	}

	/**
	 * 
	 */
	_updateTooltipOnScroll( eventObject, qtipAPI, lastProteinSequenceVersionIdObj, proteinSequenceVersionIdNotAvailable ) {

		// User has scrolled.  Hide tooltip and clear tooltip contents.
		
		//  with option { passive: true }, do not call eventObject.preventDefault()

		if ( lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable ) {
			//  Already not showing tooltip so exit
			return;
		}

		//  Not showing tooltip so update lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId to represent that
		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

		//  Update tool tip contents
		qtipAPI.set('content.text', '&nbsp;' ); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed 

		qtipAPI.toggle( false );  // ensure qtip not shown
		qtipAPI.disable( true );  // disable - must pass true to disable it
	}
	
	/**
	 * 
	 */
	_updateTooltipOnMouseMove( eventObject, qtipAPI, lastProteinSequenceVersionIdObj, proteinSequenceVersionIdNotAvailable ) {

		const $target = $( eventObject.target );

		const $targetParent = $target.parent();

		const target_HasProteinNameCSS_Selector = $target.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH )
		const targetParent_HasProteinNameCSS_Selector = $targetParent.hasClass( _CSS_CLASS_SELECTOR_PROTEIN_NAME_PROTEIN_PAGE_SINGLE_SEARCH )
		
		if ( ( ! target_HasProteinNameCSS_Selector ) && ( ! targetParent_HasProteinNameCSS_Selector ) ) {
			
			if ( lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId === proteinSequenceVersionIdNotAvailable ) {
				//  Already not showing tooltip so exit
				return;
			}
			lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdNotAvailable;

			// Mouse is Not over a Protein Name.  Hide tooltip and clear tooltip contents.
			
			//  Update tool tip contents
			qtipAPI.set('content.text', '&nbsp;' ); // Clear contents.  This should never be displayed but tooltip will be an empty box if displayed 

			qtipAPI.toggle( false );  // ensure qtip not shown
			qtipAPI.disable( true );  // disable - must pass true to disable it
			
			return;
		}

		let $tableCell = $target;
		if ( ! target_HasProteinNameCSS_Selector ) {
			$tableCell = $targetParent;
		}
		
		const proteinSequenceVersionIdString = $tableCell.attr( "data-protein-id" );
		if ( proteinSequenceVersionIdString === undefined ) {
			throw Error( "value in attr 'data-protein-id' is undefined or not set" );
		}
		const proteinSequenceVersionIdInt = Number.parseInt( proteinSequenceVersionIdString, 10 );
		if ( Number.isNaN( proteinSequenceVersionIdInt ) ) {
			throw Error( "value in attr 'data-protein-id' is not integer.  value: " + proteinSequenceVersionIdString );
		}

		if( proteinSequenceVersionIdInt === lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId ) {
			
			// proteinSequenceVersionIdInt (or undefined for non protein name elements) 
			// is same as prev call to mouse move so no changes required so just exit.
			return;
		}

		lastProteinSequenceVersionIdObj.lastProteinSequenceVersionId = proteinSequenceVersionIdInt;

		// Mouse is over a protein sequence name.

		const tooltipContentsHTML = this._getTooltipText( { proteinSequenceVersionIdInt } );

		//  Update tool tip contents
		qtipAPI.set('content.text', tooltipContentsHTML );

		qtipAPI.disable( false );	// enable qtip - pass false to enable
		qtipAPI.toggle( true );	    // ensure qtip visible
	}

	/**
	 * 
	 */
	_getTooltipText( { proteinSequenceVersionIdInt } ) {

		//  Only displaying the name and description uploaded with the search

		const proteinNamesAndDescriptionsArray = this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId.get( proteinSequenceVersionIdInt );

		if ( proteinNamesAndDescriptionsArray === undefined ) {
			return "Name and Description Not Found";
		}

		const tooltipContext = { proteinNamesAndDescriptions : proteinNamesAndDescriptionsArray };
		
		const tooltipHTML = this._protein_page_protein_tooltip_Template( tooltipContext );
		
		return tooltipHTML;
	}


	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	/////////////////////////////////////////////////
	
	/**
	 * Download Protein List
	 */
	_downloadProteinList() {

		const projectSearchId = this._projectSearchId;
		
		const proteinDisplayData : ProteinDisplayData_From_createProteinDisplayData = createProteinDisplayData({ 
								
			projectSearchId : this._projectSearchId,
			loadedDataPerProjectSearchIdHolder : this._loadedDataPerProjectSearchIdHolder, 
			dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server, 
			searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
			annotationTypeData_ReturnSpecifiedTypes : this._annotationTypeData_ReturnSpecifiedTypes,
		
			proteinNameDescription_Key_ProteinSequenceVersionId : this._proteinNameDescription_Key_ProteinSequenceVersionId, 
			proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
			peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId
		});

		const proteinDisplayDataAsString = this._createProteinDisplayDownloadDataAsString( { proteinDisplayData } );


		//  For getting search info for projectSearchIds
		const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
		if ( ! searchNameObject ) {
			throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
		}
		
		const filename = 'proteins-search-' + searchNameObject.searchId + '.txt';
		
        StringDownloadUtils.downloadStringAsFile( { stringToDownload : proteinDisplayDataAsString, filename: filename } );
	}

	/**
	 * 
	 */
	_createProteinDisplayDownloadDataAsString( { proteinDisplayData } ) {

		const proteinList = proteinDisplayData.proteinList;
		const annotationTypeRecords_DisplayOrder = proteinDisplayData.annotationTypeRecords_DisplayOrder;

		// const psmAnnotationTypes = annotationTypeRecords_DisplayOrder.psmAnnotationTypesForPeptideListEntries;
		// const reportedPeptideAnnotationTypes = annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForPeptideListEntries;

		// the columns for the data being shown on the page
		const columns = getProteinDataTableColumns_SingleSearch( { 
			psmAnnotationTypes : annotationTypeRecords_DisplayOrder.psmAnnotationTypesForProteinListEntries,
			reportedPeptideAnnotationTypes : annotationTypeRecords_DisplayOrder.reportedPeptideAnnotationTypesForProteinListEntries 
		} );

		const greyOutRow = undefined;  // Not Set for download

		//   Protein List of objects with properties for Data Table
		const proteinList_ForDataTable = createProteinList_ForDataTable_SingleSearch( { greyOutRow, proteinList, annotationTypeRecords_DisplayOrder } );

		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [];

			for ( const column of columns ) {
			
				reportLineParts.push( column.displayName );
			}

			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines
		for ( const proteinItem of proteinList_ForDataTable ) {
		
			const reportLineParts = [];

			for ( const columnEntry of proteinItem.columnEntries ) {
			
				let dataForColumn = columnEntry.valueDisplay;
				if ( columnEntry.valueSort ) {
					dataForColumn = columnEntry.valueSort;
				}
				reportLineParts.push( dataForColumn )
			}

			reportLineParts_AllLines.push( reportLineParts );
		}
		
		//  Join all line parts into strings, delimit on '\t'
		
		const reportLine_AllLines = [];
		
		let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
		const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

		for ( const reportLineParts of reportLineParts_AllLines ) {
			
			reportLineParts_AllLinesIndex++;
			
			let reportLine = reportLineParts.join( "\t" );
			if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
				reportLine += '\n'; // Add '\n' to last line
			}
			reportLine_AllLines.push( reportLine );
		}
		
		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
		
		const reportLinesSingleString = reportLine_AllLines.join( '\n' );
		
		return reportLinesSingleString;
	}

}