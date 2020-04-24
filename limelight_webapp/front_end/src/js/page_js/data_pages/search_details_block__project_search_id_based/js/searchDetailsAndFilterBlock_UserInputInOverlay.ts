/**
 * searchDetailsAndFilterBlock_UserInputInOverlay.ts
 * 
 * Javascript for User input of Searches Filters in overlay
 * on project search id driven pages
 * 
 */


//////////////////////////////////
// JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////


//  module import 

import { Handlebars, _search_detail_section_user_input_section_bundle } from './searchDetailsAndFilterBlock_UserInputInOverlay_ImportHandleBarsTemplates';

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { copyObject_DeepCopy_Limelight }  from 'page_js/data_pages/data_pages_common/copyObject_DeepCopy';
import { UpdatePageState_URL_With_NewFilterCutoffs_FromUser }  from 'page_js/data_pages/data_pages_common/updatePageState_URL_With_NewFilterCutoffs_FromUser';

import { ModalOverlay } from 'page_js/data_pages/display_utilities/modalOverlay';

//  For type 
import { DataPageStateManager, AnnotationTypeData_Root, AnnotationTypeItems_PerProjectSearchId, AnnotationTypeItem, SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItems_PerProjectSearchId }  from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';

//////////////

const _TYPE_KEY_PSM = "PSM";
const _TYPE_KEY_PEPTIDE = "Peptide";
const _TYPE_KEY_PROTEIN = "Protein";

//  Which type the user clicked in to open the overlay
const USER_CLICKED_IN_TYPE_PSM = "PSM";
const USER_CLICKED_IN_TYPE_PEPTIDE = "Peptide";
const USER_CLICKED_IN_TYPE_PROTEIN = "Protein";

/////

/**
 *
 */
class SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param {
	projectSearchIdsForCutoffsChanged : Set<number>
}

/**
 * 
 */
class SearchDetailsAndFilterBlock_UserInputInOverlay {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _filterValuesChanged_Callback? : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void

	private _updatePageState_URL_With_NewFilterCutoffs_FromUser : UpdatePageState_URL_With_NewFilterCutoffs_FromUser;

	private _type_display_label_psm : string;
	private _type_display_label_peptide : string;
	private _type_display_label_protein : string;

	private _userDataResult : any; // generic object, properties added in this method
	private _modalOverlay : ModalOverlay;


	//  Handlebars Templates
	private _search_details_OverallRoot_HandlebarsTemplate : any;
	private _search_details_root_except_filtersHandlebarsTemplate : any;
	private _search_details_root_per_type_row_HandlebarsTemplate : any;
	private _search_details_root_per_type_entry_HandlebarsTemplate : any;
	private _searchDetailsUserInputSection_SearchSeparatorEntry_HandlebarsTemplate : any;
			
	/**
	 * 
	 */
	constructor({
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
		dataPageStateManager_DataFrom_Server,
		searchDetailsBlockDataMgmtProcessing,
		filterValuesChanged_Callback
	} : {
		dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager,
		dataPageStateManager_DataFrom_Server : DataPageStateManager,
		searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing,
		filterValuesChanged_Callback : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void
	} ) {
		
		this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay;
		this._dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server;
		this._searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing;
		this._filterValuesChanged_Callback = filterValuesChanged_Callback;
		
		this._updatePageState_URL_With_NewFilterCutoffs_FromUser = 
			new UpdatePageState_URL_With_NewFilterCutoffs_FromUser( { searchDetailsBlockDataMgmtProcessing } );

		if ( ! _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_Root ) {
			throw Error("Nothing in _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_Root");
		}
		if ( ! _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_Single_RootExceptFilters ) {
			throw Error("Nothing in _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_Single_RootExceptFilters");
		}
		if ( ! _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_DisplayPerTypeRow ) {
			throw Error("Nothing in _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_DisplayPerTypeRow");
		}
		if ( ! _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_DisplayPerTypeEntry ) {
			throw Error("Nothing in _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_DisplayPerTypeEntry");
		}
		if ( ! _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_SearchSeparatorEntry ) {
			throw Error("Nothing in _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_SearchSeparatorEntry");
		}

		this._search_details_OverallRoot_HandlebarsTemplate = _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_Root;
		this._search_details_root_except_filtersHandlebarsTemplate = _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_Single_RootExceptFilters;
		this._search_details_root_per_type_row_HandlebarsTemplate = _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_DisplayPerTypeRow;
		this._search_details_root_per_type_entry_HandlebarsTemplate = _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_DisplayPerTypeEntry;
		this._searchDetailsUserInputSection_SearchSeparatorEntry_HandlebarsTemplate = _search_detail_section_user_input_section_bundle.searchDetailsUserInputSection_SearchSeparatorEntry;
			
		//  Get labels from page for "Per Type" entries
		
		let $search_details_section_single_search_details_root_type_label_psm = $("#search_details_section_single_search_details_root_type_label_psm");
		this._type_display_label_psm = $search_details_section_single_search_details_root_type_label_psm.html();
		if ( this._type_display_label_psm === undefined ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_psm").html() === undefined' );
		}
		if ( this._type_display_label_psm === null ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_psm").html() === null' );
		}
		
		let $search_details_section_single_search_details_root_type_label_peptide = $("#search_details_section_single_search_details_root_type_label_peptide");
		this._type_display_label_peptide = $search_details_section_single_search_details_root_type_label_peptide.html();
		if ( this._type_display_label_peptide === undefined ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_peptide").html() === undefined' );
		}
		if ( this._type_display_label_peptide === null ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_peptide").html() === null' );
		}
		
		let $search_details_section_single_search_details_root_type_label_protein = $("#search_details_section_single_search_details_root_type_label_protein");
		this._type_display_label_protein = $search_details_section_single_search_details_root_type_label_protein.html();
		if ( this._type_display_label_protein === undefined ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_protein").html() === undefined' );
		}
		if ( this._type_display_label_protein === null ) {
			throw Error( ' $("#search_details_section_single_search_details_root_type_label_protein").html() === null' );
		}
		
		this._userDataResult = {}; // reset to empty
	}

    /**
     * Create and return the overlay, but don't show it
     * 
     * @param {*} param0 
     */
    _createModalOverlay() {
    	
    	const objectThis = this;

        let $contentDiv = this._createModalOverlayContentDiv();
        $contentDiv = $contentDiv;
        
        const callbackOnClickedHide = function() {
        	
        	objectThis._search_filters_change_cancel_button_Click();
        }

        let props = { 
			width : '800',
			height : '500',
			title : 'Change Search Filters',
			$containerDiv : $('body' ),
			$contentDiv,
			callbackOnClickedHide,
			hideOnBackgroundClick : undefined
		};

		// $containerDiv, $contentDiv, width, height, title, hideOnBackgroundClick, callbackOnClickedHide

        let overlay = new ModalOverlay( props );
        
        let $search_filters_change_update_button = $contentDiv.find("#search_filters_change_update_button");
        let $search_filters_change_cancel_button = $contentDiv.find("#search_filters_change_cancel_button");
//        let $search_filters_change_reset_to_defaults_button = $contentDiv.find("#search_filters_change_reset_to_defaults_button");

        if ( $search_filters_change_update_button.length === 0 ) {
        	throw Error("No element with id 'search_filters_change_update_button'");
        }
        if ( $search_filters_change_cancel_button.length === 0 ) {
        	throw Error("No element with id 'search_filters_change_cancel_button'");
        }
//        if ( $search_filters_change_reset_to_defaults_button.length === 0 ) {
//        	throw Error("No element with id 'search_filters_change_reset_to_defaults_button'");
//        }
        
        $search_filters_change_update_button.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._search_filters_change_update_button_Click();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
        $search_filters_change_cancel_button.click( function(eventObject) {
			try {
				eventObject.preventDefault();
				objectThis._search_filters_change_cancel_button_Click();
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
//        $search_filters_change_reset_to_defaults_button.click( function(eventObject) {
//			try {
//				eventObject.preventDefault();
//				objectThis._search_filters_change_reset_to_defaults_button_Click();
//			} catch( e ) {
//				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//				throw e;
//			}
//		});

        return overlay;
    }
    
	/**
	 * 
	 */
    _createModalOverlayContentDiv() {
    	
    	let contentDivHTML = this._search_details_OverallRoot_HandlebarsTemplate( { } );
    	let $contentDiv = $( contentDivHTML );
    	return $contentDiv;
    }
    
	/**
	 * 
	 */
	openOverlay( { projectSearchId_UserClickedIn, userClickedInTypeIdentifier, userClickedOnAnnTypeId } ) {
		
		this._userDataResult = {}; // reset to empty
		this._userDataResult.perProjectSearchId = {};
		
		//  Process project search ids to get data

		let projectSearchIds = // array
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		let searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = 
			this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined });
		
		let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

		//  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
		//  An array in the same order as projectSearchIds
		let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

		let searchNamesMap_KeyProjectSearchId = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		let searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root = this._dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

		let annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		if ( ! annotationTypeData_Root ) {
			throw Error("No annotation type data loaded" );
		}
		

		if ( ! this._modalOverlay ) {
			
			this._modalOverlay = this._createModalOverlay();
		}
		this._modalOverlay.show();
		
		//  TODO  TEMP
//		let $modal_overlay_container = $(".modal-overlay-container");
//		$modal_overlay_container.css("height", "100vh"); //  Makes size 100% of viewport height
		
		let $filter_section = $("#search_filters_change_per_searches");
		if ( $filter_section.length === 0 ) {
			throw Error("No html element with id 'search_filters_change_per_searches'");
		}
		$filter_section.empty();
				
		let projectSearchIdsIndex = -1;
		for ( let projectSearchId of projectSearchIds ) {
			
			projectSearchIdsIndex++;

			if ( projectSearchIdsIndex != 0 ) {
				//  Add separator before all but first search
				const html = this._searchDetailsUserInputSection_SearchSeparatorEntry_HandlebarsTemplate();
				$filter_section.append( html );
			}
			
			let userDataResult_PerSingleProjectSearchId = {}; // Create empty object for projectSearchId
			
			this._userDataResult.perProjectSearchId[ projectSearchId ] = userDataResult_PerSingleProjectSearchId;
			
			let filtersAnnTypeDisplay_For_Single_ProjectSearchId = filtersAnnTypeDisplayPerProjectSearchIds[ projectSearchIdsIndex ];
			
			let searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
			if ( ! searchNameObject ) {
				throw Error("No Search Name for projectSearchId: " + projectSearchId );
			}
			
			let annotationTypeDataForProjectSearchId_Entry : AnnotationTypeItems_PerProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ); 
			if ( ! annotationTypeDataForProjectSearchId_Entry ) {
				throw Error("No annotationTypeData for projectSearchId: " + projectSearchId );
			}
			
			let searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId = searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
			if ( ! searchProgramsPerSearchDataForProjectSearchId ) {
				throw Error("No searchProgramsPerSearchDataForProjectSearchId for projectSearchId: " + projectSearchId );
			}
			
			//  Insert Search Info Row for Single Search position/format

//			if ( projectSearchIds.length > 1 ) {
//				alert("Not Supporting > 1 project search id for now");
//				throw Error("Not Supporting > 1 project search id for now");
//			}
			
			let searchDetailsRootExceptFiltersContext = {
					searchName: searchNameObject.name,
					searchId : searchNameObject.searchId,
					projectSearchId : searchNameObject.projectSearchId
			};
			
			let search_details_root_except_filtersHtml = this._search_details_root_except_filtersHandlebarsTemplate( searchDetailsRootExceptFiltersContext );

			let $search_details_root_except_filtersHtml_entry = $( search_details_root_except_filtersHtml ).appendTo( $filter_section );
			
			///////////
			{
				//  PSM cutoffs
				let cutoffsPSM = undefined;
				if ( filtersAnnTypeDisplay_For_Single_ProjectSearchId ) {
					cutoffsPSM = filtersAnnTypeDisplay_For_Single_ProjectSearchId.psmFilters;
				}
				let highlightThisSection = false;
				if ( projectSearchId_UserClickedIn === projectSearchId && userClickedInTypeIdentifier === USER_CLICKED_IN_TYPE_PSM ) {
					highlightThisSection = true;
				}
				this._addCutoffsForEntryForType( {
					highlightThisSection,
					userClickedOnAnnTypeId,
					userDataResult_PerSingleProjectSearchId,
					typeResultKey : _TYPE_KEY_PSM,
					typeDispayLabel : this._type_display_label_psm, 
					searchNameObject : searchNameObject,
					cutoffs_ForType : cutoffsPSM, 
					searchProgramsPerSearchDataForProjectSearchId,
					filterableAnnotationTypes_ForType : annotationTypeDataForProjectSearchId_Entry.psmFilterableAnnotationTypes,
					$filter_section } );
			}
			{
				//  Peptide cutoffs
				let cutoffsPeptide = undefined;
				if ( filtersAnnTypeDisplay_For_Single_ProjectSearchId ) {
					cutoffsPeptide = filtersAnnTypeDisplay_For_Single_ProjectSearchId.reportedPeptideFilters;
				}
				let highlightThisSection = false;
				if ( projectSearchId_UserClickedIn === projectSearchId && userClickedInTypeIdentifier === USER_CLICKED_IN_TYPE_PEPTIDE ) {
					highlightThisSection = true;
				}
				this._addCutoffsForEntryForType( {
					highlightThisSection,
					userClickedOnAnnTypeId,
					userDataResult_PerSingleProjectSearchId,
					typeResultKey : _TYPE_KEY_PEPTIDE,
					typeDispayLabel : this._type_display_label_peptide, 
					searchNameObject : searchNameObject,
					cutoffs_ForType : cutoffsPeptide, 
					searchProgramsPerSearchDataForProjectSearchId,
					filterableAnnotationTypes_ForType : annotationTypeDataForProjectSearchId_Entry.reportedPeptideFilterableAnnotationTypes,
					$filter_section } );
			}
			{
				//  Protein cutoffs
				let cutoffsProtein = undefined;
				if ( filtersAnnTypeDisplay_For_Single_ProjectSearchId ) {
					cutoffsProtein = filtersAnnTypeDisplay_For_Single_ProjectSearchId.matchedProteinFilters;
				}
				let highlightThisSection = false;
				if ( projectSearchId_UserClickedIn === projectSearchId && userClickedInTypeIdentifier === USER_CLICKED_IN_TYPE_PROTEIN ) {
					highlightThisSection = true;
				}
				this._addCutoffsForEntryForType( {
					highlightThisSection,
					userClickedOnAnnTypeId,
					userDataResult_PerSingleProjectSearchId,
					typeResultKey : _TYPE_KEY_PROTEIN,
					typeDispayLabel : this._type_display_label_protein, 
					searchNameObject : searchNameObject,
					cutoffs_ForType : cutoffsProtein, 
					searchProgramsPerSearchDataForProjectSearchId,
					filterableAnnotationTypes_ForType : annotationTypeDataForProjectSearchId_Entry.matchedProteinFilterableAnnotationTypes,
					$filter_section } );
			}
		}
		
		//  Scroll to the section the user clicked on
		
		const $search_filters_change_per_searches_container_scrollable_div = $("#search_filters_change_per_searches_container_scrollable_div");
		
		const $selector_highlight_section = $search_filters_change_per_searches_container_scrollable_div.find(".selector_highlight_section");
		if ( $search_filters_change_per_searches_container_scrollable_div.length > 0 && $selector_highlight_section.length > 0 ) {
			
			const containerDivScrollTop = 
				$search_filters_change_per_searches_container_scrollable_div.scrollTop() - 
				$search_filters_change_per_searches_container_scrollable_div.offset().top + 
				$selector_highlight_section.offset().top - 20; // - 20 to leave small gap
			
			$search_filters_change_per_searches_container_scrollable_div.scrollTop( containerDivScrollTop );
		}
	}

	/**
	 * @param filterableAnnotationTypes_ForType: for psm, peptide, or protein 
	 */
	_addCutoffsForEntryForType( {
		highlightThisSection,
		userClickedOnAnnTypeId,
		userDataResult_PerSingleProjectSearchId,
		typeResultKey,
		typeDispayLabel, 
		searchNameObject, 
		cutoffs_ForType, //  User entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
		searchProgramsPerSearchDataForProjectSearchId, 
		filterableAnnotationTypes_ForType,  //  All Filterable Annotation Type Records for this 'Type' (PSM,Peptide,Protein)
		$filter_section 
	} :  {
		highlightThisSection,
		userClickedOnAnnTypeId,
		userDataResult_PerSingleProjectSearchId,
		typeResultKey,
		typeDispayLabel, 
		searchNameObject, 
		cutoffs_ForType, //  User entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
		searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId
		filterableAnnotationTypes_ForType : Map<number, AnnotationTypeItem>,  //  All Filterable Annotation Type Records for this 'Type' (PSM,Peptide,Protein)
		$filter_section 
	} ) {

		const objectThis = this;
		
		if ( ! filterableAnnotationTypes_ForType ) {
			// No filterableAnnotationTypes for type
			return;  //  EARLY EXIT
		}

		if ( filterableAnnotationTypes_ForType.size === 0 ) {
			// No filterableAnnotationTypes for type
			return;  //  EARLY EXIT
		}
		
		let userResultData_PerType = {};
		userDataResult_PerSingleProjectSearchId[ typeResultKey ] = userResultData_PerType;
		

		let searchCutoffForTypeRowcontext = {
				perTypeLabel: typeDispayLabel,
				searchId : searchNameObject.searchId,
				projectSearchId : searchNameObject.projectSearchId,
				highlightThisSectionClass : ""
		};
		
		if ( highlightThisSection ) {
			searchCutoffForTypeRowcontext.highlightThisSectionClass = " selector_highlight_section ";
		}

		let searchCutoffForTypeRowHtml = this._search_details_root_per_type_row_HandlebarsTemplate( searchCutoffForTypeRowcontext );

		let $searchCutoffForTypeRow_entry = $( searchCutoffForTypeRowHtml ).appendTo( $filter_section );

		let $per_type_cutoffs_entries_jq = $searchCutoffForTypeRow_entry.find(".per_type_cutoffs_entries_jq");
		
		let highlighedAnInputField = false;
		let $selector_annotation_cutoff_input_field_FirstField = undefined;

		//  WAS:    filterableAnnotationTypes_AnnotationTypeIds was an Array of string

		// let filterableAnnotationTypes_AnnotationTypeIds = Object.keys( filterableAnnotationTypes_ForType );

		// for ( const filterableAnnotationTypes_AnnotationTypeIds_Item of filterableAnnotationTypes_AnnotationTypeIds ) {


		for ( const filterableAnnotationTypes_ForType_MapEntry of filterableAnnotationTypes_ForType.entries() ) {

			const filterableAnnotation_Item = filterableAnnotationTypes_ForType_MapEntry[ 1 ];

			const filterableAnnotation_Item_AnnotationTypeId = filterableAnnotation_Item.annotationTypeId;
			const filterableAnnotation_Item_AnnotationTypeId_String = filterableAnnotation_Item_AnnotationTypeId.toString();
			
			let userResultData_PerAnnTypeId = {
				value : undefined
			};

			userResultData_PerType[ filterableAnnotation_Item_AnnotationTypeId_String ] = userResultData_PerAnnTypeId;

			let cutoffItem_ForAnnotationTypeId = undefined;
			
			for ( let cutoffItem of cutoffs_ForType ) {
				if ( cutoffItem.annTypeId === filterableAnnotation_Item_AnnotationTypeId ) {
					cutoffItem_ForAnnotationTypeId = cutoffItem;
					break;
				}
			}

			let searchProgramsPerSearchForId = searchProgramsPerSearchDataForProjectSearchId.searchProgramsPerSearchItem_Map.get( filterableAnnotation_Item.searchProgramsPerSearchId );
			if ( ! searchProgramsPerSearchForId ) {
				throw Error("No searchProgramsPerSearchForId for filterableAnnotation_Item.searchProgramsPerSearchId: " +
						filterableAnnotation_Item.searchProgramsPerSearchId + 
						", filterableAnnotation_Item.annotationTypeId: " + filterableAnnotation_Item.annotationTypeId );
			}
			
			let highlightThisInputField = false;
			
			let annTypeEntryForDisplay_Value = undefined;
			if ( cutoffItem_ForAnnotationTypeId ) {
				annTypeEntryForDisplay_Value = cutoffItem_ForAnnotationTypeId.value;
				
				if ( ( ! highlighedAnInputField ) && highlightThisSection && 
						( ( userClickedOnAnnTypeId === undefined || userClickedOnAnnTypeId === filterableAnnotation_Item_AnnotationTypeId ) ) ) {
					
					highlightThisInputField = true;
					highlighedAnInputField = true;
				}
			}
			
			userResultData_PerAnnTypeId.value = annTypeEntryForDisplay_Value;
			
			let annTypeEntryForDisplay = {
					annotationTypeId : filterableAnnotation_Item_AnnotationTypeId,
					value : annTypeEntryForDisplay_Value,
					name : filterableAnnotation_Item.name,
					description : filterableAnnotation_Item.description,
					searchProgramName : searchProgramsPerSearchForId.name
			};

			let cutoffEntryHtml = this._search_details_root_per_type_entry_HandlebarsTemplate( annTypeEntryForDisplay );

			let $cutoffEntry_entry = $( cutoffEntryHtml ).appendTo( $filter_section /* $per_type_cutoffs_entries_jq */ );
			
			let $selector_annotation_cutoff_input_field = $cutoffEntry_entry.find(".selector_annotation_cutoff_input_field");
			if ( $selector_annotation_cutoff_input_field.length === 0 ) {
				throw Error("No DOM element with class 'selector_annotation_cutoff_input_field'")
			}
			if ( ! $selector_annotation_cutoff_input_field_FirstField ) {
				$selector_annotation_cutoff_input_field_FirstField = $selector_annotation_cutoff_input_field; // save the first field
			}
			$selector_annotation_cutoff_input_field.change(function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._cutoffFieldChanged( { fieldThis : this, userResultData_PerAnnTypeId } );
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			$selector_annotation_cutoff_input_field.keyup(function(eventObject) {
				try {
					eventObject.preventDefault();
					objectThis._cutoffFieldChanged( { fieldThis : this, userResultData_PerAnnTypeId } );
					return false;
				} catch( e ) {
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}
			});
			
			if ( highlightThisInputField ) {
				$selector_annotation_cutoff_input_field.select();
			}
		}
		
		if ( highlightThisSection && ! highlighedAnInputField ) {
			//  No field had data to select so set focus to first field
			$selector_annotation_cutoff_input_field_FirstField.focus();
		}
	}
	
	/**
	 * User changed a cutoff field 
	 */
	_cutoffFieldChanged( { fieldThis, userResultData_PerAnnTypeId } ) {
		this._validateSingleField( { fieldThis, userResultData_PerAnnTypeId } );
		this._updateSaveButtonEnableDisable();
	}

	/**
	 * User changed a cutoff field 
	 */
	_validateSingleField( { fieldThis, userResultData_PerAnnTypeId } ) {

		let $fieldThis = $( fieldThis );
		let $annotation_entry_root_tr_jq = $fieldThis.closest(".annotation_entry_root_tr_jq");
		if ( $annotation_entry_root_tr_jq.length === 0 ) {
			throw Error("No element with class 'annotation_entry_root_tr_jq'");
		}
		let $annotation_cutoff_not_number_message_jq = $annotation_entry_root_tr_jq.find(".annotation_cutoff_not_number_message_jq");
		if ( $annotation_cutoff_not_number_message_jq.length === 0 ) {
			throw Error("No element with class 'annotation_cutoff_not_number_message_jq'");
		}
		
		let fieldValueNumber = undefined;
		let invalidNumber = false;
		
		let fieldValue = <string> $fieldThis.val();
		
		if ( fieldValue === "" ) {
			$annotation_cutoff_not_number_message_jq.hide();
			userResultData_PerAnnTypeId.value = undefined;
			userResultData_PerAnnTypeId.invalidNumberError = false;
			return;
		}

		if ( ! this._isFieldValueValidNumber( { fieldValue } ) ) {
			invalidNumber = true;
		} else {
			fieldValueNumber = Number.parseFloat( fieldValue );
			if ( Number.isNaN( fieldValueNumber ) ) {
				invalidNumber = true;
			}
		}
		
		if ( invalidNumber ) {
			
			$annotation_cutoff_not_number_message_jq.show();
			userResultData_PerAnnTypeId.invalidNumberError = true;
			userResultData_PerAnnTypeId.value = undefined;
		} else {
			$annotation_cutoff_not_number_message_jq.hide();
			userResultData_PerAnnTypeId.invalidNumberError = false;
			userResultData_PerAnnTypeId.value = fieldValueNumber;
		}
	}
	
	_isFieldValueValidNumber( { fieldValue } ) {

		//  Comment out since tested for before call this function
//		if ( fieldValue === "" ) {
//			return true;
//		}
		// only test for valid cutoff value if not empty string
		if ( !  /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/.test( fieldValue ) ) {
			//  cutoff value is not a valid decimal number
			return false; 
		}
		return true;
	}

	/**
	 *  
	 */
	_updateSaveButtonEnableDisable() {
		
		const $search_filters_change_update_button = $("#search_filters_change_update_button" );
		
		if ( this._getAnyFieldsHaveError() ) {
			
			$search_filters_change_update_button.prop("disabled",true);
		} else {
			$search_filters_change_update_button.prop("disabled",false);
		}
	}
	
	/**
	 *  
	 */
	_getAnyFieldsHaveError() {
		
		let foundAnyFieldError = false;

		let projectSearchId_Keys = Object.keys( this._userDataResult.perProjectSearchId );
		for ( let projectSearchId_Key of projectSearchId_Keys ) {

			let userDataResult_PerSingleProjectSearchId = this._userDataResult.perProjectSearchId[ projectSearchId_Key ];

			let userDataResult_PerSingleProjectSearchId_Keys = Object.keys( userDataResult_PerSingleProjectSearchId );
			for ( let userDataResult_PerSingleProjectSearchId_Key of userDataResult_PerSingleProjectSearchId_Keys ) {

				let userResultData_PerType = userDataResult_PerSingleProjectSearchId[ userDataResult_PerSingleProjectSearchId_Key ];

				let userResultData_PerType_Keys = Object.keys( userResultData_PerType );
				for ( let userResultData_PerType_Key of userResultData_PerType_Keys ) {

					let userResultData_PerAnnTypeId = userResultData_PerType[ userResultData_PerType_Key ];
					if ( userResultData_PerAnnTypeId.invalidNumberError ) {
						foundAnyFieldError = true;
						break;
					}
				}
				if ( foundAnyFieldError ) {
					break;
				}
			}
			if ( foundAnyFieldError ) {
				break;
			}
		}
		
		return foundAnyFieldError;
	}
	
	//////////////////////////////////
	
	/**
	 * 
	 */
	_search_filters_change_update_button_Click() {

//		window.alert("Not implemented yet");
//		throw Error("_search_filters_change_update_button_Click() Not implemented yet");
		
		//  Update URL and get new ... key from server for new cutoffs
		
		//  Update searchDetails_Filters_AnnTypeDisplayRootObject in page state with user entered data
		
		//  Process project search ids to get data

		let searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = 
			this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds({ dataPageStateManager : undefined });

		let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

		//  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
		//  An array in the same order as projectSearchIds
		let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;
		
		
		//  Build new searchDetails_Filters_AnnTypeDisplayRootObject, by first cloning the existing value
		let searchDetails_Filters_AnnTypeDisplayRootObject_NEW = copyObject_DeepCopy_Limelight( searchDetails_Filters_AnnTypeDisplayRootObject );
		let paramsForProjectSearchIds_NEW = searchDetails_Filters_AnnTypeDisplayRootObject_NEW.paramsForProjectSearchIds;
		let filtersAnnTypeDisplayPerProjectSearchIds_NEW = paramsForProjectSearchIds_NEW.paramsForProjectSearchIdsList;
		
		let anyCutoffsChanged = false; // Track if any cutoffs changed from stored values
		
		let projectSearchIdsForCutoffsChanged : Set<number> = new Set();

		for ( let filtersAnnTypeDisplayPerProjectSearchIds_Index = 0; filtersAnnTypeDisplayPerProjectSearchIds_Index < filtersAnnTypeDisplayPerProjectSearchIds.length; filtersAnnTypeDisplayPerProjectSearchIds_Index++ ) {
			
			let filtersAnnTypeDisplay_For_Single_ProjectSearchId = filtersAnnTypeDisplayPerProjectSearchIds[ filtersAnnTypeDisplayPerProjectSearchIds_Index ];
			let filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW = filtersAnnTypeDisplayPerProjectSearchIds_NEW[ filtersAnnTypeDisplayPerProjectSearchIds_Index ];
			
			let projectSearchId = filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId;
			
			let userDataResultPerProjectSearchId = this._userDataResult.perProjectSearchId[ projectSearchId ];
			if ( ! userDataResultPerProjectSearchId ) {
				throw Error( "No value in this._userDataResult.perProjectSearchId for projectSearchId: " + projectSearchId );
			}

			//  Replace the cutoffs for each type with the User entered cutoffs
			{
				//  PSM cutoffs
				let replaceResults =
					this._replaceCutoffsWithUserEnteredForType( {
						filtersExisting_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.psmFilters, 
						userEnteredCutoffs_ForType : userDataResultPerProjectSearchId[ _TYPE_KEY_PSM ] } );
				if ( replaceResults.anyCutoffsChanged ) {
					anyCutoffsChanged = true;
					projectSearchIdsForCutoffsChanged.add( projectSearchId );
				}
				let newFilters = replaceResults.newFilters;
				filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW.psmFilters = newFilters;
			}
			{
				//  Peptide cutoffs
				let replaceResults =
					this._replaceCutoffsWithUserEnteredForType( {
						filtersExisting_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.reportedPeptideFilters, 
						userEnteredCutoffs_ForType : userDataResultPerProjectSearchId[ _TYPE_KEY_PEPTIDE ] } );
				if ( replaceResults.anyCutoffsChanged ) {
					anyCutoffsChanged = true;
					projectSearchIdsForCutoffsChanged.add( projectSearchId );
				}
				let newFilters = replaceResults.newFilters;
				filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW.reportedPeptideFilters = newFilters;
			}
			{
				//  Protein cutoffs
				let replaceResults =
					this._replaceCutoffsWithUserEnteredForType( {
						filtersExisting_ForType : filtersAnnTypeDisplay_For_Single_ProjectSearchId.matchedProteinFilters, 
						userEnteredCutoffs_ForType : userDataResultPerProjectSearchId[ _TYPE_KEY_PROTEIN ] } );
				if ( replaceResults.anyCutoffsChanged ) {
					anyCutoffsChanged = true;
					projectSearchIdsForCutoffsChanged.add( projectSearchId );
				}
				let newFilters = replaceResults.newFilters;
				filtersAnnTypeDisplay_For_Single_ProjectSearchId_NEW.matchedProteinFilters = newFilters;
			}
		}
		
		if ( anyCutoffsChanged ) {
			//  Cutoffs changed so apply new cutoffs to the page
			this._applyNewCutoffsToPage( { 
				searchDetails_Filters_AnnTypeDisplay_Root : searchDetails_Filters_AnnTypeDisplayRootObject_NEW,
				projectSearchIdsForCutoffsChanged } );
		} else {
			this._hide_remove_ModalOverlay();
		}
	}

	/**
	 * 
	 */
	_replaceCutoffsWithUserEnteredForType( { filtersExisting_ForType /* array */, userEnteredCutoffs_ForType /* object */ } ) {

		let anyCutoffsChanged = false; // true if set of user entered cutoffs are different from existing filters 
		let newFilters = [];
		
		let userResultData_PerAnnTypeIdKeys = undefined;
		
		if ( userEnteredCutoffs_ForType ) {

			userResultData_PerAnnTypeIdKeys = Object.keys( userEnteredCutoffs_ForType );
			for ( let userResultData_PerAnnTypeIdKey of userResultData_PerAnnTypeIdKeys ) {

				let userResultData_PerAnnTypeId = userEnteredCutoffs_ForType[ userResultData_PerAnnTypeIdKey ];

				let userResultData_PerAnnTypeIdKeyNumber = Number( userResultData_PerAnnTypeIdKey );

				if ( userResultData_PerAnnTypeId.value !== undefined ) {
					//  User entered a value for Ann Type Id
					let newFilter = { annTypeId: userResultData_PerAnnTypeIdKeyNumber, value: userResultData_PerAnnTypeId.value };
					newFilters.push( newFilter );

					let filtersExisting_PerAnnTypeId = undefined;
					if ( filtersExisting_ForType ) {
						for ( let filtersExisting_ForType_Entry of filtersExisting_ForType ) {
							if ( filtersExisting_ForType_Entry.annTypeId === userResultData_PerAnnTypeIdKeyNumber ) {
								filtersExisting_PerAnnTypeId = filtersExisting_ForType_Entry;
								break;
							}
						}
					}
					if ( filtersExisting_PerAnnTypeId === undefined ||
							userResultData_PerAnnTypeId.value !== filtersExisting_PerAnnTypeId.value ) {
						//  No existing cutoff for Ann Type Id or value is changed
						anyCutoffsChanged = true;
					}
				}
			}
		}
		
		//  Check for entries in filtersExisting_ForType that are not in userEnteredCutoffs_ForType for setting anyCutoffsChanged
		
		if ( ! anyCutoffsChanged ) {
			if ( filtersExisting_ForType && filtersExisting_ForType.length !== 0 ) {
				if ( ! userEnteredCutoffs_ForType ) {
			
					anyCutoffsChanged = true;
				} else {
					for ( let filtersExisting_ForType_Entry of filtersExisting_ForType ) {
						let userEnteredCutoffs_ForAnnTypeId = userEnteredCutoffs_ForType[ filtersExisting_ForType_Entry.annTypeId ];
						if ( ! userEnteredCutoffs_ForAnnTypeId ) {
							// no entry
							anyCutoffsChanged = true;
						} else if ( userEnteredCutoffs_ForAnnTypeId.value === undefined ) {
							// entry had no value
							anyCutoffsChanged = true;
						}
					}
				}
			}
		}
		
		return { anyCutoffsChanged, newFilters };
	}

	/**
	 * Cutoffs changed so apply new cutoffs to the page
	 */
	_applyNewCutoffsToPage( { searchDetails_Filters_AnnTypeDisplay_Root, projectSearchIdsForCutoffsChanged } : { 
		
		searchDetails_Filters_AnnTypeDisplay_Root, 
		projectSearchIdsForCutoffsChanged : Set<number>
	} ) {

		let updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise =
			this._updatePageState_URL_With_NewFilterCutoffs_FromUser.
			updatePageState_URL_With_NewFilterCutoffs_FromUser( { searchDetails_Filters_AnnTypeDisplay_Root } );
		
		updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise.then( ( value ) => { // onFullfilled: resolve called
			try {
				if ( this._filterValuesChanged_Callback ) {
					this._filterValuesChanged_Callback({ projectSearchIdsForCutoffsChanged });
				}

				this._modalOverlay.hide();
				this._modalOverlay.remove();
				this._modalOverlay = undefined;
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		}, function( reason ) { // // onRejected: reject called
			try {
				throw Error("updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise Fail: Reason: " + reason );
			} catch( e ) {
				reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
				throw e;
			}
		});
		
		updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise.catch( function( reason ) { // onRejected
			throw Error("updatePageState_URL_With_NewFilterCutoffs_FromUser_Promise Fail: Reason: " + reason );
		});

	}

	/**
	 * 
	 */
	_hide_remove_ModalOverlay() {
	
		this._modalOverlay.hide();
		
		this._modalOverlay.remove();
		
		this._modalOverlay = undefined;
	}
	
	////////////////////////
	
	/**
	 * 
	 */
	_search_filters_change_cancel_button_Click() {
		
		this._hide_remove_ModalOverlay();
	}
	

	/**
	 * 
	 */
//	_search_filters_change_reset_to_defaults_button_Click() {
//		
//		window.alert("Not implemented yet")
//		throw Error("_search_filters_change_reset_to_defaults_button_Click() Not implemented yet")
//	}
}


export {
	SearchDetailsAndFilterBlock_UserInputInOverlay,
	SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param,
	USER_CLICKED_IN_TYPE_PSM, USER_CLICKED_IN_TYPE_PEPTIDE, USER_CLICKED_IN_TYPE_PROTEIN }

