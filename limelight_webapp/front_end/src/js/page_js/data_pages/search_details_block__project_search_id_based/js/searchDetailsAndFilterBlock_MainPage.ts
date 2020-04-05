/**
 * searchDetailsAndFilterBlock_MainPage.ts
 * 
 * Javascript for displaying the Searches Details and Searches Filter block 
 * at the top of project search id driven pages
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//  module import 

import { Handlebars, _search_detail_section_bundle } from './searchDetailsAndFilterBlock_MainPage_ImportHandleBarsTemplates';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { SearchDetailsAndFilterBlock_UserInputInOverlay, USER_CLICKED_IN_TYPE_PSM, USER_CLICKED_IN_TYPE_PEPTIDE, USER_CLICKED_IN_TYPE_PROTEIN }
from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay';

// import { SearchDetails_GetCoreDataFromServer } from 'page_js/data_pages/data_pages_common/searchDetails_GetDataFromServer_Core.js';
import { SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers';

//  For type 
import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItem, SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItems_PerProjectSearchId }  from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

/**
 * 
 */
export class SearchDetailsAndFilterBlock_MainPage__PopulatePage_Params {

	filter_section_HTMLElement? : HTMLElement
}

/**
 * 
 */
export class SearchDetailsAndFilterBlock_MainPage {

	private _displayOnly : boolean;
	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _rerenderPageForUpdatedFilterCutoffs_Callback : any;

	private _type_label_psm : string;
	private _type_label_peptide : string;
	private _type_label_protein : string;

	private _searchDetailsAndFilterBlock_UserInputInOverlay : SearchDetailsAndFilterBlock_UserInputInOverlay;
	// private _searchDetails_GetCoreDataFromServer : SearchDetails_GetCoreDataFromServer;
	private _searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers : SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers;

	//  Set in initialize method
	private _rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : string;


	//  Handlebars Templates

	private _searchDetailsMainPage_Single_RootExceptFilters_Template;
	private _searchDetailsMainPage_MultipleSearches_Root_Template;
	private _searchDetailsMainPage_MultipleSearches_SingleSearchContainer_Template;
	private _searchDetailsMainPage_DisplayPerTypeRow_Template;
	private _searchDetailsMainPage_DisplayPerTypeEntry_Template;
	private _searchDetailsMainPage_SingleSearch_Name_Details_Template


	/**
	 * 
	 * @param displayOnly - Do not attach click handlers for changing filters
	 * @param dataPages_LoggedInUser_CommonObjectsFactory - Optional - passed in when logged in user
	 */
	constructor( { 
		displayOnly,
		dataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
		dataPageStateManager_DataFrom_Server, 
		searchDetailsBlockDataMgmtProcessing,
		rerenderPageForUpdatedFilterCutoffs_Callback
	} :
	{ 
		displayOnly : boolean,
		dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory,
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager, 
		dataPageStateManager_DataFrom_Server : DataPageStateManager, 
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		rerenderPageForUpdatedFilterCutoffs_Callback : any
	} 
	) {
		
		this._displayOnly = displayOnly;

		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._rerenderPageForUpdatedFilterCutoffs_Callback = rerenderPageForUpdatedFilterCutoffs_Callback;
		
		if ( ! _search_detail_section_bundle.searchDetailsMainPage_Single_RootExceptFilters ) {
			throw Error("Nothing in _search_detail_section_bundle.searchDetailsMainPage_Single_RootExceptFilters");
		}
		if ( ! _search_detail_section_bundle.searchDetailsMainPage_MultipleSearches_Root ) {
			throw Error("Nothing in _search_detail_section_bundle.searchDetailsMainPage_MultipleSearches_Root");
		}
		if ( ! _search_detail_section_bundle.searchDetailsMainPage_DisplayPerTypeRow ) {
			throw Error("Nothing in _search_detail_section_bundle.searchDetailsMainPage_DisplayPerTypeRow");
		}
		if ( ! _search_detail_section_bundle.searchDetailsMainPage_DisplayPerTypeEntry ) {
			throw Error("Nothing in _search_detail_section_bundle.searchDetailsMainPage_DisplayPerTypeEntry");
		}
		if ( ! _search_detail_section_bundle.searchDetailsMainPage_SingleSearch_Name_Details ) {
			throw Error("Nothing in _search_detail_section_bundle.searchDetailsMainPage_SingleSearch_Name_Details");
		}

		this._searchDetailsMainPage_Single_RootExceptFilters_Template = _search_detail_section_bundle.searchDetailsMainPage_Single_RootExceptFilters;
		this._searchDetailsMainPage_MultipleSearches_Root_Template = _search_detail_section_bundle.searchDetailsMainPage_MultipleSearches_Root;
		this._searchDetailsMainPage_MultipleSearches_SingleSearchContainer_Template = _search_detail_section_bundle.searchDetailsMainPage_MultipleSearches_SingleSearchContainer;
		this._searchDetailsMainPage_DisplayPerTypeRow_Template = _search_detail_section_bundle.searchDetailsMainPage_DisplayPerTypeRow;
		this._searchDetailsMainPage_DisplayPerTypeEntry_Template = _search_detail_section_bundle.searchDetailsMainPage_DisplayPerTypeEntry;
		this._searchDetailsMainPage_SingleSearch_Name_Details_Template = _search_detail_section_bundle.searchDetailsMainPage_SingleSearch_Name_Details

		//  Get labels from page for "Per Type" entries
		
		const $search_details_section_single_search_details_root_type_label_psm = $("#search_details_section_single_search_details_root_type_label_psm");
		this._type_label_psm = $search_details_section_single_search_details_root_type_label_psm.html();
		if ( this._type_label_psm === undefined ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_psm").html() === undefined' );
		}
		if ( this._type_label_psm === null ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_psm").html() === null' );
		}
		
		const $search_details_section_single_search_details_root_type_label_peptide = $("#search_details_section_single_search_details_root_type_label_peptide");
		this._type_label_peptide = $search_details_section_single_search_details_root_type_label_peptide.html();
		if ( this._type_label_peptide === undefined ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_peptide").html() === undefined' );
		}
		if ( this._type_label_peptide === null ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_peptide").html() === null' );
		}
		
		const $search_details_section_single_search_details_root_type_label_protein = $("#search_details_section_single_search_details_root_type_label_protein");
		this._type_label_protein = $search_details_section_single_search_details_root_type_label_protein.html();
		if ( this._type_label_protein === undefined ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_protein").html() === undefined' );
		}
		if ( this._type_label_protein === null ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_protein").html() === null' );
		}
		
		//////////////
		
		//  The Search Details User Input for allowing the user to change the cutoffs
		
		this._searchDetailsAndFilterBlock_UserInputInOverlay = 
			new SearchDetailsAndFilterBlock_UserInputInOverlay( {
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
				dataPageStateManager_DataFrom_Server : this._dataPageStateManager_DataFrom_Server,
				searchDetailsBlockDataMgmtProcessing : this._searchDetailsBlockDataMgmtProcessing,
				searchDetailsAndFilterBlock_MainPage : this
			} );


		// this._searchDetails_GetCoreDataFromServer = new SearchDetails_GetCoreDataFromServer();

		this._searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers = (
			new SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers({ dataPages_LoggedInUser_CommonObjectsFactory })
		);

		// Not used
		// this._searchDetailsDataLoaded_ProjectSearchIds = new Set();
		// this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds = new Set();
	}

	/**
	 * @param rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto - Root DOM element to search for DOM element to insert the Search Details and Filters in
	 */
	initialize( 
		{ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto } :
		{ rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto : string } 
	) {
		
		this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto = rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto;

		this._searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.initialize();
	}
	
	/**
	 * 
	 */
	reRenderForUserChangeFilterCutoffs( { projectSearchIdsForCutoffsChanged } ) {
		
		this.populatePage();
		
		if ( this._rerenderPageForUpdatedFilterCutoffs_Callback ) {
			this._rerenderPageForUpdatedFilterCutoffs_Callback( { projectSearchIdsForCutoffsChanged } );
		}
	}

	/**
	 * 
	 */
	populatePage( params? : SearchDetailsAndFilterBlock_MainPage__PopulatePage_Params ) {

		let filter_section_HTMLElement : HTMLElement = undefined;

		if ( params ) {

			filter_section_HTMLElement = params.filter_section_HTMLElement;

			//  Test that element pasased is <tbody>

			try {

				if ( filter_section_HTMLElement ) {

					const filter_section_HTMLElement_nodeName =  filter_section_HTMLElement.nodeName;

					if ( "TBODY" !== filter_section_HTMLElement_nodeName  ) {
						//  Case insensitive compare
						if ( "TBODY".localeCompare( filter_section_HTMLElement_nodeName  ) !== 0 ) {
							const msg = '!!! populatePage:: if ( "TBODY".localeCompare( filter_section_HTMLElement.nodeName ) !== 0 ) {.  filter_section_HTMLElement: ' 
							console.warn( msg, filter_section_HTMLElement )
							// throw Error( msg );
						}
					}
				}
			} catch (e) {

				console.warn("'!!! populatePage:: test filter_section_HTMLElement.nodeName throw Exception: ", e );
				reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });

				//  Eat Exception
			}
		}

		const objectThis = this;
		
		//  Process project search ids to get data

		// const projectSearchIds = // array
		// 	this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		const searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = (
			this._searchDetailsBlockDataMgmtProcessing
			.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined })
		);
		
		const paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

		//  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
		const filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

		const searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		const searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root = this._dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

		const annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		let singleSearch = true;

		if ( filtersAnnTypeDisplayPerProjectSearchIds.length > 1 ) {

			// > 1 project search id so set up outer container and set boolean

			singleSearch = false;
		}

		let $filter_section : JQuery<HTMLElement> = undefined;

		if ( filter_section_HTMLElement ) {

			$filter_section = $( filter_section_HTMLElement );


		} else if ( this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto ) {

			const $rootElementSearch = $( this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto );
			if ( $rootElementSearch.length === 0 ) {
				throw Error("Failed to find DOM element using selector '" + this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto + "'");
			}
			const $selector_filter_section = $rootElementSearch.find(".selector_filter_section");
			if ( $selector_filter_section.length === 0 ) {
				throw Error("No DOM element with class 'selector_filter_section' under DOM element using selector '" + this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto + "'");
			}
			$filter_section = $selector_filter_section.children("tbody");
			if ( $filter_section.length === 0 ) {
				throw Error("No DOM element with name 'tbody' under DOM element with class 'selector_filter_section' under DOM element using selector '" + this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto + "'");
			}
		} else {
			const $main_page_filter_section = $("#main_page_filter_section");
			if ( $main_page_filter_section.length === 0 ) {
				throw Error("No DOM element with id 'main_page_filter_section'");
			}
			$filter_section = $main_page_filter_section.children("tbody");
			if ( $filter_section.length === 0 ) {
				throw Error("No DOM element with name 'tbody' under DOM element with id 'main_page_filter_section'");
			}
		}
		// $filter_section.empty();  Cannot use .empty() since other entries

		//  Remove all entries in  with class 'selector_search_item_root_container' or 'selector_reported_peptide_psm_filter_row'

		// if ( singleSearch ) {
		const $selector_search_item_root_container = $filter_section.children(".selector_search_item_root_container");
		$selector_search_item_root_container.remove();

		const $selector_reported_peptide_psm_filter_row = $filter_section.children(".selector_reported_peptide_psm_filter_row");
		$selector_reported_peptide_psm_filter_row.remove();

		const $selector_searches_item_root_container = $filter_section.children(".selector_searches_item_root_container");
		$selector_searches_item_root_container.remove();
			

		// } else {
		// 	$filter_section.empty();
		// }

		let $selector_search_name_details_holder : JQuery<HTMLElement> = undefined;
		let $selector_searches_data_holder : JQuery<HTMLElement> = undefined;
		let $selector_search_item_expand : JQuery<HTMLElement> = undefined;
		let $selector_search_item_collapse : JQuery<HTMLElement> = undefined;

		if ( ! singleSearch ) {

			// > 1 project search id so set up outer container

			const searchDetailsMainPage_MultipleSearches_Root_Html = this._searchDetailsMainPage_MultipleSearches_Root_Template();
			const $searchDetailsMainPage_MultipleSearches_Root_entry_direct = $( searchDetailsMainPage_MultipleSearches_Root_Html );
			const $searchDetailsMainPage_MultipleSearches_Root_entry = $searchDetailsMainPage_MultipleSearches_Root_entry_direct.appendTo( $filter_section );

			$selector_searches_data_holder =  $searchDetailsMainPage_MultipleSearches_Root_entry_direct.children(".selector_searches_data_holder");
			if ( $selector_searches_data_holder.length === 0 ) {
				throw Error("Multiple Searches: No DOM element found with class 'selector_searches_data_holder'");
			}

		} else {

			//  === 1 project search id

			const search_details_root_except_filtersHtml = this._searchDetailsMainPage_Single_RootExceptFilters_Template();
			const $search_details_root_except_filters_entry = $( search_details_root_except_filtersHtml ).appendTo( $filter_section );
			
			$selector_search_name_details_holder = $search_details_root_except_filters_entry.find(".selector_search_name_details_holder");
			if ( $selector_search_name_details_holder.length === 0 ) {
				throw Error("Single Search: No DOM element found with class 'selector_search_name_details_holder'");
			}
			$selector_search_item_expand = $search_details_root_except_filters_entry.find(".selector_search_item_expand");
			if ( $selector_search_item_expand.length === 0 ) {
				throw Error("Single Search: No DOM element found with class 'selector_search_item_expand'");
			}
			$selector_search_item_collapse = $search_details_root_except_filters_entry.find(".selector_search_item_collapse");
			if ( $selector_search_item_collapse.length === 0 ) {
				throw Error("Single Search: No DOM element found with class 'selector_search_item_collapse'");
			}
		}

		let mergeColorId = 0;
		
		for ( const filtersAnnTypeDisplay_For_Single_ProjectSearchId of filtersAnnTypeDisplayPerProjectSearchIds ) {

			mergeColorId++;

			if ( mergeColorId > 9 ) {
				mergeColorId = 1;
			}
			
			const projectSearchId = filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId;
			
			const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
			if ( ! searchNameObject ) {
				throw Error("No Search Name for projectSearchId: " + projectSearchId );
			}
			
			const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
			if ( ! annotationTypeDataForProjectSearchId ) {
				throw Error("No annotationTypeData for projectSearchId: " + projectSearchId );
			}
			
			const searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId = searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
			if ( ! searchProgramsPerSearchDataForProjectSearchId ) {
				throw Error("No searchProgramsPerSearchDataForProjectSearchId for projectSearchId: " + projectSearchId );
			}

			//  Prep to add cutoffs to DOM

			let $cutoffsContainer = $filter_section;

			//  For Multiple Searches, add Search container to DOM

			if ( ! singleSearch ) {

				const html = this._searchDetailsMainPage_MultipleSearches_SingleSearchContainer_Template({ projectSearchId, mergeColorId });
				const $entry = $( html );

				$selector_searches_data_holder.append( $entry );
				
				$selector_search_name_details_holder = $entry.find(".selector_search_name_details_holder");
				if ( $selector_search_name_details_holder.length === 0 ) {
					throw Error("Multiple Searches: No DOM element found with class 'selector_search_name_details_holder'");
				}
				$selector_search_item_expand = $entry.find(".selector_search_item_expand");
				if ( $selector_search_item_expand.length === 0 ) {
					throw Error("Single Search: No DOM element found with class 'selector_search_item_expand'");
				}
				$selector_search_item_collapse = $entry.find(".selector_search_item_collapse");
				if ( $selector_search_item_collapse.length === 0 ) {
					throw Error("Single Search: No DOM element found with class 'selector_search_item_collapse'");
				}

				const $selector_cutoffs_holder = $entry.find(".selector_cutoffs_holder");
				if ( $selector_cutoffs_holder.length === 0 ) {
					throw Error("Multiple Searches: No DOM element found with class 'selector_cutoffs_holder'");
				}
				$cutoffsContainer = $selector_cutoffs_holder;
			}

			//  Add Click handlers for show/hide Search Details

			$selector_search_item_expand.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					const clickedThis = this;
					objectThis._searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.showSearchDetailsClicked({ clickedThis, projectSearchId });
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$selector_search_item_collapse.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					const clickedThis = this;
					objectThis._searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.hideSearchDetailsClicked({ clickedThis, projectSearchId });
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});

			//  Add Search Name to DOM
			
			const searchDetailsMainPage_SingleSearch_Name_Details_Context = {
				searchName: searchNameObject.name,
				searchId : searchNameObject.searchId,
				projectSearchId : searchNameObject.projectSearchId
			};
		
			const searchDetailsMainPage_SingleSearch_Name_Details_HTML = this._searchDetailsMainPage_SingleSearch_Name_Details_Template( searchDetailsMainPage_SingleSearch_Name_Details_Context )

			const $searchDetailsMainPage_SingleSearch_Name_Details_entry = $( searchDetailsMainPage_SingleSearch_Name_Details_HTML );
			$selector_search_name_details_holder.append( $searchDetailsMainPage_SingleSearch_Name_Details_entry );


			//  Add cutoffs to DOM

			///////////

			//  PSM cutoffs
			this._addCutoffsForDisplayForType( {
				singleSearch,
				projectSearchId,
				typeIdentifierForOpenOverlay : USER_CLICKED_IN_TYPE_PSM,
				type_label : this._type_label_psm, 
				searchNameObject,
				cutoffs_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.psmFilters, 
				searchProgramsPerSearchDataForProjectSearchId,
				filterableAnnotationTypes_ForType : annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes,
				$cutoffsContainer 
			} );

			//  Peptide cutoffs
			this._addCutoffsForDisplayForType( {
				singleSearch,
				projectSearchId,
				typeIdentifierForOpenOverlay : USER_CLICKED_IN_TYPE_PEPTIDE,
				type_label : this._type_label_peptide, 
				searchNameObject,
				cutoffs_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.reportedPeptideFilters, 
				searchProgramsPerSearchDataForProjectSearchId,
				filterableAnnotationTypes_ForType : annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes,
				$cutoffsContainer 
			} );

			//  Protein cutoffs
			this._addCutoffsForDisplayForType( {
				singleSearch,
				projectSearchId,
				typeIdentifierForOpenOverlay : USER_CLICKED_IN_TYPE_PROTEIN,
				type_label : this._type_label_protein, 
				searchNameObject,
				cutoffs_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.matchedProteinFilters, 
				searchProgramsPerSearchDataForProjectSearchId,
				filterableAnnotationTypes_ForType : annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes,
				$cutoffsContainer 
			} );

		}

		if ( singleSearch ) {

			//  Only if Single Search

			//  Take all Search Item entries and Filter entries and move them to the top of filter_section

			//  Move all entries in  with class 'selector_search_item_root_container' or 'selector_reported_peptide_psm_filter_row'

			{
				const $selector_reported_peptide_psm_filter_row = $filter_section.children(".selector_reported_peptide_psm_filter_row");
				const  $detached = $selector_reported_peptide_psm_filter_row.detach();

				$detached.prependTo( $filter_section );
			}
			{
				const $selector_search_item_root_container = $filter_section.children(".selector_search_item_root_container");
				const  $detached = $selector_search_item_root_container.detach();

				$detached.prependTo( $filter_section );
			}
		} else {

			{
				const $selector_searches_item_root_container = $filter_section.children(".selector_searches_item_root_container");
				const  $detached = $selector_searches_item_root_container.detach();

				$detached.prependTo( $filter_section );
			}
		}

	}

	/**
	 * @param filterableAnnotationTypes_ForType: for psm, peptide, or protein 
	 */
	_addCutoffsForDisplayForType({

		singleSearch,
		projectSearchId,
		typeIdentifierForOpenOverlay,
		type_label, 
		searchNameObject, 
		cutoffs_ForType, 
		searchProgramsPerSearchDataForProjectSearchId, 
		filterableAnnotationTypes_ForType,
		$cutoffsContainer 
	} : {
		singleSearch,
		projectSearchId,
		typeIdentifierForOpenOverlay : string
		type_label : string
		searchNameObject, 
		cutoffs_ForType, 
		searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId 
		filterableAnnotationTypes_ForType : Map<number, AnnotationTypeItem>
		$cutoffsContainer 
	} ) {

		if ( ! filterableAnnotationTypes_ForType ) {
			// No filterableAnnotationTypes_ForType for type
			return;  //  EARLY EXIT
		}

		if ( filterableAnnotationTypes_ForType.size === 0 ) {
			// No filterableAnnotationTypes_ForType for type
			return;  //  EARLY EXIT
		}
		
		let cutoffsAnnotationTypeIds = undefined;

		if ( cutoffs_ForType ) {

			cutoffsAnnotationTypeIds = Object.keys( cutoffs_ForType );
		}
		
		let showingAll = false;
		
		if ( cutoffsAnnotationTypeIds === undefined || cutoffsAnnotationTypeIds.length === 0 ) {
			showingAll = true;
		}

		const searchCutoffForTypeRowcontext = {
				showingAll : showingAll,
				singleSearch,
				perTypeLabel: type_label,
				searchId : searchNameObject.searchId,
				projectSearchId : searchNameObject.projectSearchId,
				displayOnly : this._displayOnly
		};

		const searchCutoffForTypeRowHtml = this._searchDetailsMainPage_DisplayPerTypeRow_Template( searchCutoffForTypeRowcontext );

		const $searchCutoffForTypeRow_entry = $( searchCutoffForTypeRowHtml ).appendTo( $cutoffsContainer );
		
		if ( ! this._displayOnly ) {
			//  Not display only so add click handler to type label
			const $cutoff_per_type_block_td_jq = $searchCutoffForTypeRow_entry.find(".cutoff_per_type_block_td_jq");
			if ( $cutoff_per_type_block_td_jq.length === 0 ) {
				throw Error("No HTML element for class 'cutoff_per_type_block_td_jq'");
			}
			$cutoff_per_type_block_td_jq.click( (eventObject) => {
				try {
					eventObject.preventDefault();
					this._searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay({ 
						projectSearchId_UserClickedIn : projectSearchId, 
						userClickedInTypeIdentifier : typeIdentifierForOpenOverlay,
						userClickedOnAnnTypeId : undefined
					});
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		
			if ( showingAll ) {
				const $selector_showing_all = $searchCutoffForTypeRow_entry.find(".selector_showing_all");
				$selector_showing_all.click( (eventObject) => {
					try {
						eventObject.preventDefault();
						this._searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay({ 
							projectSearchId_UserClickedIn : projectSearchId, 
							userClickedInTypeIdentifier : typeIdentifierForOpenOverlay,
							userClickedOnAnnTypeId : undefined
						});
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			}
		}
		
		const $per_type_cutoffs_entries_jq = $searchCutoffForTypeRow_entry.find(".per_type_cutoffs_entries_jq");

		for ( const cutoffItem of cutoffs_ForType ) {

			const cutoffItem_AnnotationTypeId = cutoffItem.annTypeId;

			const filterableAnnotation_ForId = filterableAnnotationTypes_ForType.get( cutoffItem_AnnotationTypeId );
			if ( ! filterableAnnotation_ForId ) { 
				throw Error("No entry in filterableAnnotationTypes_ForType for cutoffItem_AnnotationTypeId: " + cutoffItem_AnnotationTypeId );
			}

			const searchProgramsPerSearchForId = searchProgramsPerSearchDataForProjectSearchId.searchProgramsPerSearchItem_Map.get( filterableAnnotation_ForId.searchProgramsPerSearchId );
			if ( ! searchProgramsPerSearchForId ) {
				throw Error("No searchProgramsPerSearchForId for filterableAnnotation_ForId.searchProgramsPerSearchId: " +
					filterableAnnotation_ForId.searchProgramsPerSearchId + 
					", filterableAnnotation_ForId.id: " + filterableAnnotation_ForId.annotationTypeId 
				);
			}

			const cutoffEntryForDisplay = {
					annotationTypeId : cutoffItem_AnnotationTypeId,
					value : cutoffItem.value,
					name : filterableAnnotation_ForId.name,
					description : filterableAnnotation_ForId.description,
					searchProgramName : searchProgramsPerSearchForId.name,
					displayOnly : this._displayOnly 
			};

			const cutoffEntryHtml = this._searchDetailsMainPage_DisplayPerTypeEntry_Template( cutoffEntryForDisplay );

			const $cutoffEntry_entry = $( cutoffEntryHtml ).appendTo( $per_type_cutoffs_entries_jq );

			if ( ! this._displayOnly ) {
				//  Not display only so add click handler to filter entry
				$cutoffEntry_entry.click( (eventObject) => {
					try {
						eventObject.preventDefault();
						this._searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay( 
								{ projectSearchId_UserClickedIn : projectSearchId, 
									userClickedInTypeIdentifier : typeIdentifierForOpenOverlay,
									userClickedOnAnnTypeId : cutoffItem_AnnotationTypeId } );
					} catch( e ) {
						reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
						throw e;
					}
				});
			}
		}
	}

}
