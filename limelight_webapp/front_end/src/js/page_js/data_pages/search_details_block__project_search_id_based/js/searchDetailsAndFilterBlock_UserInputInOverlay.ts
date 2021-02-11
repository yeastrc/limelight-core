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
import { UpdatePageState_URL_With_NewFilterCutoffs_FromUser }  from 'page_js/data_pages/data_pages_common/updatePageState_URL_With_NewFilterCutoffs_FromUser';

//  For type 
import {
	DataPageStateManager,
	AnnotationTypeData_Root,
	SearchProgramsPerSearchData_Root,
	SearchNames_AsMap
} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import { SearchDetailsBlockDataMgmtProcessing } from 'page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing';
import { SearchDataLookupParameters_Root } from 'page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters';
import {SearchDetailsAndFilterBlock_UserInputInOverlay_OpenUserChangeFiltersOverlay_Params} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {
	limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
	Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {get_SearchDetailsAndFilterBlock_UserInputInOverlay_Container} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_UserInput_OverlayContents";

//////////////

/**
 *
 */
export class SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param {
	projectSearchIdsForCutoffsChanged : Set<number>
}

/**
 * 
 */
export class SearchDetailsAndFilterBlock_UserInputInOverlay {

	private _dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
	private _dataPageStateManager_DataFrom_Server : DataPageStateManager;
	private _searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;
	private _filterValuesChanged_Callback? : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void

	private _updatePageState_URL_With_NewFilterCutoffs_FromUser : UpdatePageState_URL_With_NewFilterCutoffs_FromUser;

	private _type_display_label_psm : string;
	private _type_display_label_peptide : string;
	private _type_display_label_protein : string;

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
	}

	/**
	 * 
	 */
	openOverlay( params : SearchDetailsAndFilterBlock_UserInputInOverlay_OpenUserChangeFiltersOverlay_Params ) {


		const projectSearchId_UserClickedIn = params.projectSearchId_UserClickedIn
		const userClickedInTypeIdentifier = params.userClickedInTypeIdentifier
		const userClickedOnAnnTypeId = params.userClickedOnAnnotationTypeId

		//  Process project search ids to get data

		let projectSearchIds = // array
			this._dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_projectSearchIds();

		let searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = 
			this._searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();
		
		let paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

		//  The user entered Filter values per Annotation Types and Annotation Types to display, or the defaults for the Search Id
		//  An array in the same order as projectSearchIds
		// let filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

		let searchNamesMap_KeyProjectSearchId :  SearchNames_AsMap = this._dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

		let searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root = this._dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

		let annotationTypeData_Root : AnnotationTypeData_Root = this._dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

		if ( ! annotationTypeData_Root ) {
			throw Error("No annotation type data loaded" );
		}

		let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

		const overlayComponent = get_SearchDetailsAndFilterBlock_UserInputInOverlay_Container({
			projectSearchIds,
			searchDetails_Filters_AnnTypeDisplayRootObject,
			searchNamesMap_KeyProjectSearchId,
			searchProgramsPerSearchData_Root,
			annotationTypeData_Root,
			userClickedOn_ToOpenOverlay : {
				projectSearchId_UserClickedIn,
				userClickedInTypeIdentifier,
				userClickedOnAnnotationTypeId : userClickedOnAnnTypeId
			},
			updatePageState_URL_With_NewFilterCutoffs_FromUser : this._updatePageState_URL_With_NewFilterCutoffs_FromUser,
			callbackOn_Cancel_Close_Clicked : () => {

				limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
			},
			callback_SearchesFilters_Changed : ( param : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => {

				if ( this._filterValuesChanged_Callback ) {
					this._filterValuesChanged_Callback(param );
				}
			}
		});

		limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
			limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
	}

}



