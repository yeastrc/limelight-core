/**
 * searchDetailsAndFilterBlock_MainPage.js
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

const Handlebars = require('handlebars/runtime');

const _search_detail_section_bundle = 
	require("../../../../../handlebars_templates_precompiled/search_detail_section_main_page/search_detail_section_main_page_template-bundle.js" );

import { dataPageStateManager_Keys }  from 'page_js/data_pages/data_pages_common/dataPageStateManager_Keys.js';
import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer.js';

import { SearchDetailsAndFilterBlock_UserInputInOverlay, USER_CLICKED_IN_TYPE_PSM, USER_CLICKED_IN_TYPE_PEPTIDE, USER_CLICKED_IN_TYPE_PROTEIN }
from 'page_js/data_pages/data_pages_common/searchDetailsAndFilterBlock_UserInputInOverlay.js';

import { SearchDetails_GetCoreDataFromServer } from 'page_js/data_pages/data_pages_common/searchDetails_GetDataFromServer_Core.js';

/**
 * 
 */
export class SearchDetailsAndFilterBlock_MainPage {

	/**
	 * 
	 */
	constructor( 
			{ 
				displayOnly,
				dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay, 
				dataPageStateManager_DataFrom_Server, 
				searchDetailsBlockDataMgmtProcessing,
				rerenderPageForUpdatedFilterCutoffs_Callback,
				searchColorManager
			} ) {
		
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


		this._searchDetails_GetCoreDataFromServer = new SearchDetails_GetCoreDataFromServer();

		this._searchDetailsExpanded_ProjectSearchIds = new Set(); // ProjectSearchIds where Search Details Currently expanded

		this._searchDetailsDataLoaded_ProjectSearchIds = new Set();
		this._searchDetailsDataLoadedOrInProgress_ProjectSearchIds = new Set();
	}

	/**
	 * @param rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto - Root DOM element to search for DOM element to insert the Search Details and Filters in
	 * @param displayOnly - Do not attach click handlers for changing filters
	 */
	initialize( { rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto } ) {
		
		this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto = rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto;
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
	populatePage() {

		const objectThis = this;
		
		//  Process project search ids to get data

		const projectSearchIds = // array
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.getPageState( dataPageStateManager_Keys.PROJECT_SEARCH_IDS_DPSM );

		const searchDetails_Filters_AnnTypeDisplayRootObject = 
			this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();
		
		const paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

		//  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
		const filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

		const searchNamesKeyProjectSearchId = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_NAMES_KEY_PROJECT_SEARCH_ID_DPSM );

		const searchProgramsPerSearchData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.SEARCH_PROGRAMS_PER_SEARCH_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		const annotationTypeData = 
			this._dataPageStateManager_DataFrom_Server.getPageState( dataPageStateManager_Keys.ANNOTATION_TYPE_DATA_KEY_PROJECT_SEARCH_ID_DPSM );

		let $filter_section = undefined;

		if ( this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto ) {
			const $rootElementSearch = $( this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto );
			if ( $rootElementSearch.length === 0 ) {
				throw Error("Failed to find DOM element using selector '" + this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto + "'");
			}
			$filter_section = $rootElementSearch.find(".selector_filter_section");
			if ( $filter_section.length === 0 ) {
				throw Error("No html element with class 'selector_filter_section' under DOM element using selector '" + this._rootElementJQuerySelectorToSearchUnderForDOMElementInsertInto + "'");
			}
		} else {
			$filter_section = $(".selector_filter_section");
			if ( $filter_section.length === 0 ) {
				throw Error("No html element with class 'selector_filter_section'");
			}
		}
		$filter_section.empty();

		let singleSearch = true;
		let $selector_search_name_details_holder = undefined;
		let $selector_searches_data_holder = undefined;
		let $selector_search_item_expand = undefined;
		let $selector_search_item_collapse = undefined;

		if ( filtersAnnTypeDisplayPerProjectSearchIds.length > 1 ) {

			// > 1 project search id so set up outer container and set boolean

			singleSearch = false;

			const searchDetailsMainPage_MultipleSearches_Root_Html = this._searchDetailsMainPage_MultipleSearches_Root_Template();
			const $searchDetailsMainPage_MultipleSearches_Root_entry = $( searchDetailsMainPage_MultipleSearches_Root_Html ).appendTo( $filter_section );

			$selector_searches_data_holder =  $searchDetailsMainPage_MultipleSearches_Root_entry.find(".selector_searches_data_holder");
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
			
			const searchNameObject = searchNamesKeyProjectSearchId[ projectSearchId ];
			if ( ! searchNameObject ) {
				throw Error("No Search Name for projectSearchIdSingleString: " + projectSearchId );
			}
			
			const annotationTypeDataForProjectSearchId = annotationTypeData[ projectSearchId ]; 
			if ( ! annotationTypeDataForProjectSearchId ) {
				throw Error("No annotationTypeData for projectSearchIdSingleString: " + projectSearchId );
			}
			
			const searchProgramsPerSearchDataForProjectSearchId = searchProgramsPerSearchData[ projectSearchId ];
			if ( ! searchProgramsPerSearchDataForProjectSearchId ) {
				throw Error("No searchProgramsPerSearchDataForProjectSearchId for projectSearchIdSingleString: " + projectSearchId );
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
					objectThis._showSearchDetailsClicked( { clickedThis, projectSearchId } );
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
					objectThis._hideSearchDetailsClicked( { clickedThis, projectSearchId } );
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
				$cutoffsContainer } );

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
				$cutoffsContainer } );

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
				$cutoffsContainer } );
		};
	};

	/**
	 * @param filterableAnnotationTypes_ForType: for psm, peptide, or protein 
	 */
	_addCutoffsForDisplayForType( {
		singleSearch,
		projectSearchId,
		typeIdentifierForOpenOverlay,
		type_label, 
		searchNameObject, 
		cutoffs_ForType, 
		searchProgramsPerSearchDataForProjectSearchId, 
		filterableAnnotationTypes_ForType,
		$cutoffsContainer } ) {

		const objectThis = this;
		
		if ( ! filterableAnnotationTypes_ForType ) {
			// No filterableAnnotationTypes_ForType for type
			return;  //  EARLY EXIT
		}

		const filterableAnnotationTypes_ForType_AnnotationTypeIds = Object.keys( filterableAnnotationTypes_ForType );
			
		if ( filterableAnnotationTypes_ForType_AnnotationTypeIds.length === 0 ) {
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
			$cutoff_per_type_block_td_jq.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay( 
							{ projectSearchId_UserClickedIn : projectSearchId, 
								userClickedInTypeIdentifier : typeIdentifierForOpenOverlay } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		}
		
		if ( showingAll ) {
			const $selector_showing_all = $searchCutoffForTypeRow_entry.find(".selector_showing_all");
			$selector_showing_all.click( function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay( 
							{ projectSearchId_UserClickedIn : projectSearchId, 
								userClickedInTypeIdentifier : typeIdentifierForOpenOverlay } );
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
		}

		const $per_type_cutoffs_entries_jq = $searchCutoffForTypeRow_entry.find(".per_type_cutoffs_entries_jq");

		for ( const cutoffItem of cutoffs_ForType ) {

			const cutoffItem_AnnotationTypeId = cutoffItem.annTypeId;

			const filterableAnnotation_ForId = filterableAnnotationTypes_ForType[ cutoffItem_AnnotationTypeId ];
			if ( ! filterableAnnotation_ForId ) { 
				throw Error("No entry in filterableAnnotationTypes_ForType for cutoffItem_AnnotationTypeId: " + cutoffItem_AnnotationTypeId );
			}

			const searchProgramsPerSearchForId = searchProgramsPerSearchDataForProjectSearchId[ filterableAnnotation_ForId.searchProgramsPerSearchId ];
			if ( ! searchProgramsPerSearchForId ) {
				throw Error("No searchProgramsPerSearchForId for filterableAnnotation_ForId.searchProgramsPerSearchId: " +
						filterableAnnotation_ForId.searchProgramsPerSearchId + 
						", filterableAnnotation_ForId.id: " + filterableAnnotation_ForId.id );
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
				$cutoffEntry_entry.click( function(eventObject) {
					try {
						eventObject.preventDefault();
						objectThis._searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay( 
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
	};



	/**
	 * 
	 */
	_hideSearchDetailsClicked({ clickedThis, projectSearchId }) {

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
	_showSearchDetailsClicked({ clickedThis, projectSearchId }) {

		const objectThis = this;

		if ( this._searchDetailsDataLoaded_ProjectSearchIds.has( projectSearchId ) ) {

			this._displaySearchDetails_SingleProjectSearchId({ clickedThis, projectSearchId });
			return;
		}

		const promise_getSearchDetails = objectThis._searchDetails_GetCoreDataFromServer.getSearchDetails_CoreDataFromServer({ projectSearchIds : [ projectSearchId ] });

		promise_getSearchDetails.then((promiseResult) => {
			
			// Structure to follow Project Page Search Details display

			const searchDetailsResultsCombined = { coreSearchDetails : promiseResult.coreSearchDetails };
			objectThis._displaySearchDetails_SingleProjectSearchId({ clickedThis, projectSearchId, searchDetailsResultsCombined });
		})
	}

	/**
	 * Called both when load data and when not need to load data
	 * 
	 * @param clickedThis
	 * @param projectSearchId
	 * @param searchDetailsResultsCombined - loaded data. undefined if not loaded data since already have data
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

			//  Not populated so remove this and all dependents
			// const projectPageSearchDetails = searchDetailsResultsCombined.projectPageSearchDetails;

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

			this._searchDetailsDataLoaded_ProjectSearchIds.add( projectSearchId );
		}

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

};
