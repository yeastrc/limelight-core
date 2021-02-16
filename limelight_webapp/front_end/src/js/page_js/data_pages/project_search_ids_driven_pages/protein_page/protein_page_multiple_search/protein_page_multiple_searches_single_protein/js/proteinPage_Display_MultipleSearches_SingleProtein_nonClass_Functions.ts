/**
 * proteinPage_Display_MultipleSearches__SingleProtein_nonClass_Functions.ts
 * 
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { getDynamicModificationsForProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing'

import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';
import {getOpenModificationsForProteinSequenceVersionId} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinViewPage_DisplayData_SingleProtein_Open_Modifications_Processing";
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder";
import {loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_search/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder";
import {loadData_PeptideSequences_LoadTo_loadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/loadPeptideSequencesForReportedPeptideIds_SingleSearch_LoadTo_loadedDataCommonHolder";
import {loadProteinSequences_LoadTo_loadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/loadProteinSequences_LoadTo_loadedDataCommonHolder";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {ProteinView_LoadedDataCommonHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {SingleProtein_Filter_PerUniqueIdentifier_Entry} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_CommonObjects";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {
	modificationMass_CommonRounding_Needed,
	modificationMass_CommonRounding_ReturnNumber
} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {
	reporterIonMass_CommonRounding_Needed,
	reporterIonMass_CommonRounding_ReturnNumber
} from "page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding";


//  Constants

// Min width for outer container. Increase to 1120 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120; 

const _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH = 1270; // Min width for upper section of protein sequence and boxes to right

/**
 *
 * @param modificationMass_UserSelections_StateObject
 */
const round_Selected_ModMasses_IfNeed_modificationMass_UserSelections_StateObject = function (
	{
		modificationMass_UserSelections_StateObject
	} : {
		modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
	}) : void
	{
		{  // Variable Mods
			const modSelection: ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject = modificationMass_UserSelections_StateObject.get_VariableModificationSelections();
			_round_Selected_Variable_or_Open_ModMasses_IfNeed({ modSelection })
		}
		{ // Open Mods
			const modSelection: ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject = modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
			_round_Selected_Variable_or_Open_ModMasses_IfNeed({ modSelection })
		}
		//  Static Mods
		_round_Selected_Static_ModMasses_IfNeed({ modificationMass_UserSelections_StateObject });
}

/**
 * Process Variable or Open Mod values
 * @param modSelection
 */
const _round_Selected_Variable_or_Open_ModMasses_IfNeed = function (
	{
		modSelection
	} : {
		modSelection : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
	}) : void
{
	if ( ! modSelection ) {
		//  No entry
		return; // EARLY RETURN
	}
	if ( ! modSelection.is_Any_Modification_Selected() ) {
		//  No selections
		return; // EARLY RETURN
	}
	const modifications_SelectedModMasses = new Set( modSelection.get_ModificationsSelected__OnlyModMasses_AsSet() );
	// const no_Modification_AKA_Unmodified_Selected = modSelection.get_NO_Modification_AKA_Unmodified_Selected();

	if ( ( ! modifications_SelectedModMasses )
		|| modifications_SelectedModMasses.size === 0 ) {
		//  No selections other than Unmodified
		return; // EARLY RETURN
	}

	const new_rounded_Entries = new Map<number,SingleProtein_Filter_PerUniqueIdentifier_Entry>();

	for ( const modifications_SelectedModMass of modifications_SelectedModMasses) {

		const modification_Selected_Entry = modSelection.get_Modification_Selected_Entry( modifications_SelectedModMass );
		if ( ! modification_Selected_Entry ) {
			const msg = "_round_Selected_Variable_or_Open_ModMasses_IfNeed(...): modSelection.get_Modification_Selected_Entry( modifications_SelectedModMass ); returned nothing for modifications_SelectedModMass: ";
			console.warn( msg, modifications_SelectedModMass )
			throw Error(msg + modifications_SelectedModMass)
		}

		let possiblyRounded_modifications_SelectedModMass = modifications_SelectedModMass;

		if ( modificationMass_CommonRounding_Needed( modifications_SelectedModMass)) {

			possiblyRounded_modifications_SelectedModMass = modificationMass_CommonRounding_ReturnNumber(modifications_SelectedModMass);
		}

		//  Special code to handle selected masses that round to the same value, choosing the 'ALL' if any of the values are type 'ALL'
		//     This is required since previously didn't round for single search

		const existing_RoundedEntry = new_rounded_Entries.get( possiblyRounded_modifications_SelectedModMass );
		if ( existing_RoundedEntry ) {
			if ( existing_RoundedEntry.selectionType === SingleProtein_Filter_SelectionType.ANY
				&& modification_Selected_Entry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
				//  Replace "ANY" with "ALL"
				new_rounded_Entries.set(possiblyRounded_modifications_SelectedModMass, modification_Selected_Entry);
			}
		} else {
			//  Store
			new_rounded_Entries.set( possiblyRounded_modifications_SelectedModMass, modification_Selected_Entry );
		}
	}

	modSelection.clear_selectedModifications_ExceptUnmodified();

	//  Copy rounded entries into modSelection
	for ( const mapEntry of new_rounded_Entries.entries() ) {

		const rounded_modMass = mapEntry[0];
		const modification_Selected_Entry = mapEntry[1];
		modSelection.set_Modification_Selected( rounded_modMass,modification_Selected_Entry)
	}
}

/**
 * Process Static Mod values
 * @param modSelection
 */
const _round_Selected_Static_ModMasses_IfNeed = function (
	{
		modificationMass_UserSelections_StateObject
	} : {
		modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
	}) : void
{
	if ( ! modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected() ) {
		//  No selections
		return; // EARLY RETURN
	}
	//   : Map<string, Set<number>>  Copy of what is in StateObject
	const residue_Mass_Map_Set : Map<string, Set<number>> = modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set();

	for ( const residue_Mass_Map_Set_Entry of residue_Mass_Map_Set.entries()) {

		const residueLetter = residue_Mass_Map_Set_Entry[ 0 ];
		const modMassSet = residue_Mass_Map_Set_Entry[ 1 ];

		for ( const modMass of modMassSet ) {

			const modification_Selected_Entry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({ residueLetter, modMass });
			if ( ! modification_Selected_Entry ) {
				const msg = "_round_Selected_Static_ModMasses_IfNeed(...): modificationMass_UserSelections_StateObject.get_StaticModification_Selected({ residueLetter, modMass }); returned nothing for residueLetter: " +
					residueLetter + ", modMass: ";
				console.warn( msg, modMass )
				throw Error(msg + modMass)
			}

			let possiblyRounded_modifications_SelectedModMass = modMass;

			if ( modificationMass_CommonRounding_Needed( modMass)) {

				possiblyRounded_modifications_SelectedModMass = modificationMass_CommonRounding_ReturnNumber(modMass);

				modificationMass_UserSelections_StateObject.delete_StaticModification_Selected({ residueLetter, modMass })

				//  Special code to handle selected masses that round to the same value, choosing the 'ALL' if any of the values are type 'ALL'
				//     This is required since previously didn't round for single search

				const existing_RoundedEntry = modificationMass_UserSelections_StateObject.get_StaticModification_Selected({ residueLetter, modMass : possiblyRounded_modifications_SelectedModMass });
				if ( existing_RoundedEntry ) {
					if ( existing_RoundedEntry.selectionType === SingleProtein_Filter_SelectionType.ANY
						&& modification_Selected_Entry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
						//  Replace "ANY" with "ALL"
						modificationMass_UserSelections_StateObject.set_StaticModification_Selected({ residueLetter, modMass: possiblyRounded_modifications_SelectedModMass, entry: modification_Selected_Entry });
					}
				} else {
					//  Store
					modificationMass_UserSelections_StateObject.set_StaticModification_Selected({ residueLetter, modMass: possiblyRounded_modifications_SelectedModMass, entry: modification_Selected_Entry });
				}
			}
		}
	}
}

/**
 *
 * @param modificationMass_UserSelections_StateObject
 */
const round_Selected_ReporterIonMasses_IfNeed_reporterIonMass_UserSelections_StateObject = function (
	{
		reporterIonMass_UserSelections_StateObject
	} : {
		reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
	}) : void
{

	if ( ! reporterIonMass_UserSelections_StateObject ) {
		//  No entry
		return; // EARLY RETURN
	}
	if ( ! reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
		//  No selections
		return; // EARLY RETURN
	}
	const reporterIons_SelectedModMasses = new Set( reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet() );

	if ( ( ! reporterIons_SelectedModMasses )
		|| reporterIons_SelectedModMasses.size === 0 ) {
		//  No selections
		return; // EARLY RETURN
	}

	const new_rounded_Entries = new Map<number,SingleProtein_Filter_PerUniqueIdentifier_Entry>();

	for ( const reporterIons_SelectedModMass of reporterIons_SelectedModMasses) {

		const reporterIon_Selected_Entry = reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry( reporterIons_SelectedModMass );
		if ( ! reporterIon_Selected_Entry ) {
			const msg = "_round_Selected_Variable_or_Open_ModMasses_IfNeed(...): modSelection.get_Modification_Selected_Entry( reporterIons_SelectedModMass ); returned nothing for reporterIons_SelectedModMass: ";
			console.warn( msg, reporterIons_SelectedModMass )
			throw Error(msg + reporterIons_SelectedModMass)
		}

		let possiblyRounded_reporterIons_SelectedModMass = reporterIons_SelectedModMass;

		if ( reporterIonMass_CommonRounding_Needed( reporterIons_SelectedModMass)) {

			possiblyRounded_reporterIons_SelectedModMass = reporterIonMass_CommonRounding_ReturnNumber(reporterIons_SelectedModMass);
		}

		//  Special code to handle selected masses that round to the same value, choosing the 'ALL' if any of the values are type 'ALL'
		//     This is required since previously didn't round for single search

		const existing_RoundedEntry = new_rounded_Entries.get( possiblyRounded_reporterIons_SelectedModMass );
		if ( existing_RoundedEntry ) {
			if ( existing_RoundedEntry.selectionType === SingleProtein_Filter_SelectionType.ANY
				&& reporterIon_Selected_Entry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {
				//  Replace "ANY" with "ALL"
				new_rounded_Entries.set(possiblyRounded_reporterIons_SelectedModMass, reporterIon_Selected_Entry);
			}
		} else {
			//  Store
			new_rounded_Entries.set( possiblyRounded_reporterIons_SelectedModMass, reporterIon_Selected_Entry );
		}
	}

	reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

	//  Copy rounded entries into reporterIonMass_UserSelections_StateObject
	for ( const mapEntry of new_rounded_Entries.entries() ) {

		const rounded_modMass = mapEntry[0];
		const reporterIon_Selected_Entry = mapEntry[1];
		reporterIonMass_UserSelections_StateObject.set_ReporterIons_Selected( rounded_modMass,reporterIon_Selected_Entry)
	}

}

/**
 * 
 */
const resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein = function(
	{
		singleProteinContainer_addedDivElementDOM
	} :{
		singleProteinContainer_addedDivElementDOM: HTMLElement
	}): void {

	if ( ! singleProteinContainer_addedDivElementDOM ) {
		// Exit if no overlay
		return;
	}

	const $window = $(window);

	const windowHeight = $window.height();

	//  Subtract header and footer heights

	const $header_outer_container_div = $("#header_outer_container_div");
	if ( $header_outer_container_div.length === 0 ) {
		throw Error("No DOM element found with id 'header_outer_container_div'");
	}
	const headerOuterHeight = $header_outer_container_div.outerHeight( true /* [includeMargin ] */ );

	// const $footer_outer_container_div = $("#footer_outer_container_div");
	// if ( $footer_outer_container_div.length === 0 ) {
	// 	throw Error("No DOM element found with id 'footer_outer_container_div'");
	// }
	// const footerOuterHeight = $footer_outer_container_div.outerHeight( true /* [includeMargin ] */ );

	const footerOuterHeight = 31;  // Hard code footer height since measuring doesn't work right

	const overlayHeight = windowHeight - headerOuterHeight - footerOuterHeight;
	
	const $singleProteinContainer_addedDivElementDOM = $( singleProteinContainer_addedDivElementDOM );


	const $view_single_protein_inner_overlay_div = $singleProteinContainer_addedDivElementDOM.find("#view_single_protein_inner_overlay_div");

	// console.warn("!!!!!!!!!!!!!!!   Skipping resizing DOM id 'view_single_protein_inner_overlay_div' since cannot find DOM element with that id.  $view_single_protein_inner_overlay_div.length: " + $view_single_protein_inner_overlay_div.length );

	if ( $view_single_protein_inner_overlay_div.length === 0 ) {
		throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
	}

	$view_single_protein_inner_overlay_div.css('min-height', overlayHeight + 'px');
}

/**
 * 
 */
const update_Overlay_OnWindowResize_MultipleSearch_SingleProtein = function(
	{
		singleProteinContainer_addedDivElementDOM
	}: {
		singleProteinContainer_addedDivElementDOM: HTMLElement
	}
) {

	let $view_single_protein_overlay_div = undefined;
	let overlayWidth = undefined;

	if ( ! singleProteinContainer_addedDivElementDOM ) {
		// Exit if no overlay
		return;
	}

	if ( $view_single_protein_overlay_div === undefined ) {
		$view_single_protein_overlay_div = $("#view_single_protein_overlay_div");
		if ( $view_single_protein_overlay_div.length === 0 ) {
			throw Error("No DOM element found with id 'view_single_protein_overlay_div'");
		}
	}
	if ( overlayWidth === undefined ) {
		overlayWidth = $view_single_protein_overlay_div.outerWidth();
	}

	//  Adjust width of block above reported peptide list to keep the boxes to the right within the viewport, if necessary.

	const $window = $(window);
	const windowWidth = $window.width();

	const $selector_section_above_reported_peptides_list_block = $view_single_protein_overlay_div.find(".selector_section_above_reported_peptides_list_block");

	if ( overlayWidth <= windowWidth ) {

		$selector_section_above_reported_peptides_list_block.css('width', ''); // clear setting

	} else {

		let sectionAboveReportedPeptidesList_Width = windowWidth - 50; // - 50 to adjust in from right edge
		if (sectionAboveReportedPeptidesList_Width < _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH) {
			sectionAboveReportedPeptidesList_Width = _SECTION_ABOVE_REPORTED_PEPTIDE_LIST_CONTAINER_MIN_WIDTH; // Min width
		}
		$selector_section_above_reported_peptides_list_block.css('width', sectionAboveReportedPeptidesList_Width + 'px');
	}

}


//////////

/**
 * Adjust overlay width to fit reported peptide 
 * 
 * called internally from this class
 */
// const _resize_OverlayWidth_BasedOnReportedPeptidesTableWidth = function({ singleProteinContainer_addedDivElementDOM }) {
//
// 	if ( ! ( singleProteinContainer_addedDivElementDOM ) ) {
// 		// Exit if no overlay
// 		return;
// 	}
//
// 	//  Adjust overlay width to fit reported peptide list
//
// 	const $contentDivHTMLElement = $( singleProteinContainer_addedDivElementDOM );
//
// 	let $selector_reported_peptides_data_table_container = $contentDivHTMLElement.find(".selector_reported_peptides_data_table_container");
// 	if ( $selector_reported_peptides_data_table_container.length === 0 ) {
// 		throw Error( '$contentDivHTMLElement.find(".selector_reported_peptides_data_table_container") found no elements' );
// 	}
// 	if ( $selector_reported_peptides_data_table_container.length > 1 ) {
// 		throw Error( '$contentDivHTMLElement.find(".selector_reported_peptides_data_table_container") found > 1 elements' );
// 	}
// 	const $selector_data_table_container_TopLevelTable = $selector_reported_peptides_data_table_container.children(".selector_data_table_container");
// 	if ( $selector_reported_peptides_data_table_container.length === 0 ) {
// 		throw Error( '$selector_reported_peptides_data_table_container.children(".selector_data_table_container") found no elements' );
// 	}
// 	if ( $selector_reported_peptides_data_table_container.length > 1 ) {
// 		throw Error( '$selector_reported_peptides_data_table_container.children(".selector_data_table_container") found > 1 elements' );
// 	}
//
// 	const reported_peptides_data_table_container_Width = $selector_data_table_container_TopLevelTable.outerWidth();
//
// 	const $view_single_protein_inner_overlay_div = $("#view_single_protein_inner_overlay_div");
// 	if ( $view_single_protein_inner_overlay_div.length === 0 ) {
// 		throw Error("No DOM element found with id 'view_single_protein_inner_overlay_div'");
// 	}
//
// 	let overlayWidth = reported_peptides_data_table_container_Width + 60;
// 	if ( overlayWidth < _OUTERMOST_CONTAINER_MIN_WIDTH ) {
// 		overlayWidth = _OUTERMOST_CONTAINER_MIN_WIDTH; // Min width
// 	}
//
// 	$view_single_protein_inner_overlay_div.css('width', overlayWidth + 'px');
//
// 	_update_Overlay_OnWindowResize_MultipleSearch_SingleProtein({ singleProteinContainer_addedDivElementDOM });
// }

/////////////

//  loadDataForInitialOverlayShow

/**
 * From proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
 * 
 * 
 * 
 */
const loadDataForInitialOverlayShow_MultipleSearch_SingleProtein = function ({

	getSearchSubGroupIds,
	proteinSequenceVersionId, 
	projectSearchIds, 
	dataPageStateManager_DataFrom_Server, 
	loadedDataCommonHolder, 
	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
	searchDataLookupParamsRoot,
	reporterIonMass_UserSelections_StateObject,
	open_Modifications_Subpart_UserSelections_StateObject,
	generatedPeptideContents_UserSelections_StateObject
} : {
	getSearchSubGroupIds : boolean
	proteinSequenceVersionId: number
	projectSearchIds :  number[]
	dataPageStateManager_DataFrom_Server : DataPageStateManager
	loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds :  Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
	searchDataLookupParamsRoot : SearchDataLookupParameters_Root
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
	open_Modifications_Subpart_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
	generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
}) {

	//  NOT valid test to determine if skip loading. Broken if user changes PSM/Peptide Filters and thus loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is cleared

	// if ( loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) !== undefined ) {
	// 	return null;
	// }

	// console.log("Experiment: Single Protein: _loadDataForInitialOverlayShow(...)")

	const promise_FirstRetrieval = _loadDataForInitialOverlayShow_FirstRetrieval({
		getSearchSubGroupIds,
		proteinSequenceVersionId, 
		projectSearchIds, 
		dataPageStateManager_DataFrom_Server, 
		loadedDataCommonHolder, 
		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
		searchDataLookupParamsRoot,
		reporterIonMass_UserSelections_StateObject,
		open_Modifications_Subpart_UserSelections_StateObject,
		generatedPeptideContents_UserSelections_StateObject
	});

	//  Returned Promise

	return new Promise<void>( (resolve, reject) => {

		promise_FirstRetrieval.catch( (reason) => { 
			reject(reason) 
		});

		promise_FirstRetrieval.then( (value) => {
			try {
				//  Populate Static Mods for the Protein

				const proteinSequenceData = loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId({ proteinSequenceVersionId });

				if ( ! proteinSequenceData ) {
					const msg = "_loadDataForInitialOverlayShow: No proteinSequenceData for proteinSequenceVersionId: " + proteinSequenceVersionId;
					console.warn( msg );
					throw Error( msg );
				}

				const proteinSequenceString = proteinSequenceData.getProteinSequence();

				for ( const projectSearchId of projectSearchIds ) {

					const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
					if ( loadedDataPerProjectSearchIdHolder ) {
						_populateStaticModificationsPositionsOnProteinSequence({ proteinSequenceVersionId, proteinSequenceString, loadedDataPerProjectSearchIdHolder });
					}
				}

				//  Get peptide sequences

				// returns null or Promise
				const promise_getPeptideSequencesForPeptideIds =  _getPeptideSequencesForPeptideIds({ 
					proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder 
				});

				if ( ! promise_getPeptideSequencesForPeptideIds ) {
					//  No peptide sequences to load so just call next function

					resolve();  //  RESOLVE of returned Promise

					return;
				}

				promise_getPeptideSequencesForPeptideIds.catch( (reason) => {
					reject( reason );
				});

				promise_getPeptideSequencesForPeptideIds.then( (value) => {
					try {

						resolve();  //  RESOLVE of returned Promise

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
	});
}

/**
 * From proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
 * 
 * 
 * 
 */
const _loadDataForInitialOverlayShow_FirstRetrieval = function ({

	getSearchSubGroupIds,
	proteinSequenceVersionId, 
	projectSearchIds, 
	dataPageStateManager_DataFrom_Server, 
	loadedDataCommonHolder, 
	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
	searchDataLookupParamsRoot,
	reporterIonMass_UserSelections_StateObject,
	open_Modifications_Subpart_UserSelections_StateObject,
	generatedPeptideContents_UserSelections_StateObject
} : {
	getSearchSubGroupIds : boolean
	proteinSequenceVersionId: number
	projectSearchIds :  number[]
	dataPageStateManager_DataFrom_Server : DataPageStateManager
	loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds :  Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
	searchDataLookupParamsRoot : SearchDataLookupParameters_Root
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
	open_Modifications_Subpart_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
	generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
}) {

	//  NOT valid test to determine if skip loading. Broken if user changes PSM/Peptide FIlters and thus loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds is cleared

	// if ( loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) !== undefined ) {
	// 	return null;
	// }

	// console.log("Experiment: Single Protein: _loadDataForInitialOverlayShow_FirstRetrieval(...)")

	//  Get a projectSearchId that proteinSequenceVersionId is in

	let projectSearchId_Contains_proteinSequenceVersionId = undefined;

	for ( const projectSearchId of projectSearchIds ) {

		const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

		if ( loadedDataPerProjectSearchIdHolder ) {

			const proteinInfoMapKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinInfoMapKeyProteinSequenceVersionId();
			const proteinInfo = proteinInfoMapKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( proteinInfo ) {
				projectSearchId_Contains_proteinSequenceVersionId = projectSearchId;
				break;
			}
		}
	}

	if ( ! projectSearchId_Contains_proteinSequenceVersionId ) {
		const msg = ( "proteinSequenceVersionId not found in proteinInfoMapKeyProteinSequenceVersionId for any projectSearchId. proteinSequenceVersionId: " 
			+ proteinSequenceVersionId
			+ ", projectSearchIds: "
			+ projectSearchIds.join(",")
		);
		console.warn( msg );
		throw Error( msg );
	}

	const promises = [];

	//  Get Protein Sequence String
	
	if ( loadedDataCommonHolder.get_proteinSequenceData_For_proteinSequenceVersionId( { proteinSequenceVersionId } ) === undefined ) {

		const promise_GetProteinSequence = loadProteinSequences_LoadTo_loadedDataCommonHolder({
			proteinSequenceVersionId, projectSearchId_Contains_proteinSequenceVersionId, loadedDataCommonHolder
		})
		promises.push( promise_GetProteinSequence );
	}

	//  Get data per projectSearchId

	for ( const projectSearchId of projectSearchIds ) {

		const promise = _loadDataForInitialOverlayShow_GetPer_projectSearchId({
			getSearchSubGroupIds,
			proteinSequenceVersionId, 
			projectSearchId, 
			loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
			loadedDataCommonHolder, 
			dataPageStateManager_DataFrom_Server,
			searchDataLookupParamsRoot,
			reporterIonMass_UserSelections_StateObject,
			open_Modifications_Subpart_UserSelections_StateObject,
			generatedPeptideContents_UserSelections_StateObject
		});

		if ( promise ) {

			promises.push( promise );
		}
	}

	const promise_All = Promise.all( promises );

	return promise_All;
}

/**
 * GetPer_projectSearchId
 * 
 * From proteinViewPage_DisplayData_MultipleSearches_SingleProtein.js
 * 
 * 
 * Calls proteinViewPage_DisplayData_SingleProtein_SingleSearch_LoadProcessDataFromServer.js
 * 
 * 
 * 
 */
const _loadDataForInitialOverlayShow_GetPer_projectSearchId = function ({

	getSearchSubGroupIds,
	proteinSequenceVersionId, 
	projectSearchId, 
	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, 
	loadedDataCommonHolder, 
	dataPageStateManager_DataFrom_Server,
	searchDataLookupParamsRoot,
	reporterIonMass_UserSelections_StateObject,
	open_Modifications_Subpart_UserSelections_StateObject,
	generatedPeptideContents_UserSelections_StateObject
} : {
	getSearchSubGroupIds : boolean
	proteinSequenceVersionId: number
	projectSearchId :  number
	dataPageStateManager_DataFrom_Server : DataPageStateManager
	loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
	loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds :  Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
	searchDataLookupParamsRoot : SearchDataLookupParameters_Root
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject
	open_Modifications_Subpart_UserSelections_StateObject : ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject
	generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
}) {

	const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

	if ( loadedDataPerProjectSearchIdHolder ) {

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		if ( reportedPeptideIdsKeyProteinSequenceVersionId ) {
					
			//  reportedPeptideIds for this proteinSequenceVersionId
			let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
			if ( reportedPeptideIds_For_proteinSequenceVersionId ) {

				const promises_LoadData_Array = [];

				// Have reported Peptide Ids for this proteinSequenceVersionId for this projectSearchId so load data for it for the display

				const promise_loadDataAfterInitialOverlayShow = (
					loadData_SingleProtein_AfterInitialOverlayShow_ProteinPage_SingleProtein_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder({
						retrieveForMultipleSearches : true,
						proteinSequenceVersionId,
						projectSearchId,
						searchDetailsBlockDataMgmtProcessing : undefined, // Not Provided
						loadedDataPerProjectSearchIdHolder,
						loadedDataCommonHolder,
						dataPageStateManager_DataFrom_Server,
						retrieveForSingleSearch : false
					})
				);

				promises_LoadData_Array.push( promise_loadDataAfterInitialOverlayShow );

				try {
					const promise_getDynamicModificationsForProteinSequenceVersionId = getDynamicModificationsForProteinSequenceVersionId({ //  Imported function
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder, 
						proteinSequenceVersionId, 
						projectSearchId });

					if (promise_getDynamicModificationsForProteinSequenceVersionId) {
						promises_LoadData_Array.push(promise_getDynamicModificationsForProteinSequenceVersionId);
					}
				} catch( e ) {
					console.warn("Exception caught calling getDynamicModificationsForProteinSequenceVersionId:");
					console.warn( e );
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}

				try {
					const promise_ = getOpenModificationsForProteinSequenceVersionId({ //  Imported function
						loadedDataPerProjectSearchIdHolder : loadedDataPerProjectSearchIdHolder,
						proteinSequenceVersionId,
						projectSearchId });

					if (promise_) {
						promises_LoadData_Array.push(promise_);
					}
				} catch( e ) {
					console.warn("Exception caught calling getOpenModificationsForProteinSequenceVersionId:");
					console.warn( e );
					reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
					throw e;
				}


				{  //  Run here if any selected Reporter Ion Mass entries OR selected Open Modifications Mass entries in URL at time of load

					const anyReporterIonMassesSelected = reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected();
					const anyOpenModificationMassesSelected = (
						open_Modifications_Subpart_UserSelections_StateObject.is_Any_Modification_Selected()
						|| generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
						|| generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected()
					)

					if ( anyReporterIonMassesSelected || anyOpenModificationMassesSelected ) {

						// Reporter Ion Masses or Open Modifications selected in filter so load Reporter Ion data and/or Open Modification Ion Data and PSM data

						const searchDataLookupParamsRoot__paramsForProjectSearchIds = searchDataLookupParamsRoot.paramsForProjectSearchIds;
						const searchDataLookupParamsRoot__paramsForProjectSearchIdsList = searchDataLookupParamsRoot__paramsForProjectSearchIds.paramsForProjectSearchIdsList;

						let searchDataLookupParams_For_projectSearchId = undefined;
						for ( const searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry of searchDataLookupParamsRoot__paramsForProjectSearchIdsList ) {

							if ( projectSearchId === searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry.projectSearchId ) {
								searchDataLookupParams_For_projectSearchId = searchDataLookupParamsRoot__paramsForProjectSearchIdsList_Entry;
								break;
							}
						}
						if ( ! searchDataLookupParams_For_projectSearchId ) {
							const msg = "_loadDataForInitialOverlayShow_GetPer_projectSearchId: No value in searchDataLookupParamsRoot for projectSearchId: " + projectSearchId;
							console.warn( msg );
							throw Error( msg );
						}

						const promise = (
							loadData_If_ReporterIonMasses_OpenModMasses_Selected__For_PSM_Data_Per_ReportedPeptideId_For_ProteinSequenceVersionId_ProteinPage_LoadTo_loadedDataPerProjectSearchIdHolder({
								getSearchSubGroupIds,
								anyReporterIonMassesSelected,
								anyOpenModificationMassesSelected,
								proteinSequenceVersionId : proteinSequenceVersionId,
								projectSearchId,
								searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_projectSearchId,
								loadedDataPerProjectSearchIdHolder
							})
						);
						if (promise) {
							promises_LoadData_Array.push(promise);
						}
					}
				}

				const promisesAll = Promise.all( promises_LoadData_Array );

				return promisesAll;
			}
		}
	}

	return undefined;
}

/////////////////////////////


/**
 * Find the Positions on the Protein Sequence String of the Static modifications for the Search 
 * Store on loadedDataPerProjectSearchIdHolder
 * 
 * This can be (but not likely) called multiple times for the same search due to where it is currently called from.
 */
const _populateStaticModificationsPositionsOnProteinSequence = function(
	{
		proteinSequenceVersionId, proteinSequenceString, loadedDataPerProjectSearchIdHolder
	}:{
		proteinSequenceVersionId: number
		proteinSequenceString: string
		loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	}) {

	{
		const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();

		if ( staticModificationsOnProtein_KeyProteinSequenceVersionId && staticModificationsOnProtein_KeyProteinSequenceVersionId.get( proteinSequenceVersionId ) ) {
			//  Already populated for proteinSequenceVersionId
			return;  // EARLY EXIT
		}
	}

	//  Map < position 1 based (integer) : { Object: residue  (string), massesArray: [ mass (number) ], massesSet : Set( mass (number) ) } >
	//      - residue_I_To_L = residue.replace('I', 'L') Replace I with L
	//  (Format for class ProteinSequenceFormattedDisplay_Main_displayWidget)

	const staticModificationMassesByProteinPosition : Map<number, { residue : string, residue_I_To_L : string, massesSet : Set<number>, massesArray : Array<number> }> = new Map();

	const staticModsForSearch = loadedDataPerProjectSearchIdHolder.get_staticMods();

	if ( ( ! staticModsForSearch ) || staticModsForSearch.length === 0 ) {
		//  No Static Modifications so Exit
		return; // EARLY EXIT
	}

	const proteinSequenceString_I_To_L = proteinSequenceString.replace('I', 'L');

	for ( const staticModForSearch of staticModsForSearch ) {

		const staticModResidue = staticModForSearch.residue;
		const staticModMass = staticModForSearch.mass;

		const staticModResidue_I_To_L = staticModResidue.replace('I', 'L');

		//  Search for static mod residue in protein
		let residueFoundIndex = undefined;
		let searchStartIndex = 0;
		while ( ( residueFoundIndex = proteinSequenceString_I_To_L.indexOf( staticModResidue_I_To_L, searchStartIndex ) ) != -1 ) {
		
			const proteinPosition = residueFoundIndex + 1; // '1' based
			let staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPosition.get( proteinPosition );
			if ( ! staticModificationResiduesMassesForProteinPosition ) {
				staticModificationResiduesMassesForProteinPosition = { residue : staticModResidue, residue_I_To_L: staticModResidue, massesSet: new Set(), massesArray : undefined };
				staticModificationMassesByProteinPosition.set( proteinPosition, staticModificationResiduesMassesForProteinPosition );
			}
			staticModificationResiduesMassesForProteinPosition.massesSet.add( staticModMass );

			searchStartIndex = residueFoundIndex + 1; // advance to searching to after last found index
		}
	}

	//  Sort masses at each position
	for ( const staticModificationMassesByProteinPositionEntry of staticModificationMassesByProteinPosition.entries() ) {
		const position = staticModificationMassesByProteinPositionEntry[ 0 ];
		const staticModificationResiduesMassesForProteinPosition = staticModificationMassesByProteinPositionEntry[ 1 ];
		const residue = staticModificationResiduesMassesForProteinPosition.residue;
		const massesAtPositionSet = staticModificationResiduesMassesForProteinPosition.massesSet;
		const massesAtPositionArray = Array.from( massesAtPositionSet );
		massesAtPositionArray.sort( function(a, b) {
			if ( a < b ) {
				return -1;
			}
			if ( a > b ) {
				return 1;
			}
			return 0;
		});
		//  Place the sorted Array in the final output Object in the map

		staticModificationResiduesMassesForProteinPosition.massesArray = massesAtPositionArray;
	}

	{
		let staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();

		if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
			staticModificationsOnProtein_KeyProteinSequenceVersionId = new Map();
			loadedDataPerProjectSearchIdHolder.set_staticModificationsOnProtein_KeyProteinSequenceVersionId( staticModificationsOnProtein_KeyProteinSequenceVersionId );
		}
			
		staticModificationsOnProtein_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, staticModificationMassesByProteinPosition );
	}

}

////////////////////////////

/**
 * 
 * @returns null or Promise
 */
const _getPeptideSequencesForPeptideIds = function(
	{
		proteinSequenceVersionId, projectSearchIds, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder
	}: {
		proteinSequenceVersionId: number
		projectSearchIds :  number[]
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
		loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds :  Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
	}) {

	//   Map<PeptideId,{ reportedPeptideId, projectSearchId, peptideId }>
	const peptideIdsToLoadSequencesForMap_Key_PeptideId = new Map();

	for ( const projectSearchId of projectSearchIds ) {

		const loadedDataPerProjectSearchIdHolder = loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );

		if ( ! loadedDataPerProjectSearchIdHolder ) {
			// No data for this projectSearchId
			continue; // early continue
		}

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		if ( ! reportedPeptideIdsKeyProteinSequenceVersionId ) {
			// No data for this projectSearchId
			continue; // early continue
		}
		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		
		if ( ! reportedPeptideIds ) {
			// No data for this projectSearchId and this _proteinSequenceVersionId
			continue; // early continue
		}

		for ( const reportedPeptideId of reportedPeptideIds ) {

			const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } );
			if ( ! peptideId ) {
				const msg = "_getPeptideSequencesForPeptideIds: No peptideId for reportedPeptideId: " + reportedPeptideId + ", proteinSequenceVersionId: " + proteinSequenceVersionId + ", projectSearchIds: " + projectSearchIds;
				console.warn( msg );
				throw Error( msg );
			}

			if ( ! loadedDataCommonHolder.get_peptideSequenceString_For_peptideId( { peptideId } ) ) {
				if ( ! peptideIdsToLoadSequencesForMap_Key_PeptideId.has( peptideId ) ) {
					peptideIdsToLoadSequencesForMap_Key_PeptideId.set( peptideId, { reportedPeptideId, projectSearchId, peptideId } );
				}
			}
		}
	}
	
	if ( peptideIdsToLoadSequencesForMap_Key_PeptideId.size === 0 ) {
		//  No peptide sequence to load so return null
		return null; // EARLY EXIT
	}

	//  Re-order by projectSearchId

	//   Map<projectSearchId,[{ reportedPeptideId, projectSearchId, peptideId }]>
	const peptideIdsToLoadSequencesForMap_Key_ProjectSearchId = new Map();

	for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_PeptideId.entries() ) {

		const mapEntryValue = mapEntry[ 1 ];
		const projectSearchId = mapEntryValue.projectSearchId;

		let newMapEntryForProjectSearchId = peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.get( projectSearchId );
		if ( ! newMapEntryForProjectSearchId ) {
			newMapEntryForProjectSearchId = new Array();
			peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.set( projectSearchId, newMapEntryForProjectSearchId );
		}
		newMapEntryForProjectSearchId.push( mapEntryValue );
	}

	//  Retrieve peptide strings on a per projectSearchId basis

	const promiseArray_GetPeptideSequences = [];

	for ( const mapEntry of peptideIdsToLoadSequencesForMap_Key_ProjectSearchId.entries() ) {

		const projectSearchId = mapEntry[ 0 ];
		const entriesFor_projectSearchId = mapEntry[ 1 ];

		//  Create array of reportedPeptideIds to get Peptide Sequences for
		const reportedPeptideIds = [];
		for ( const entry of entriesFor_projectSearchId ) {
			reportedPeptideIds.push( entry.reportedPeptideId );
		}

		const promise_per_projectSearchIdProcessing = loadData_PeptideSequences_LoadTo_loadedDataCommonHolder( { projectSearchId, reportedPeptideIds, loadedDataCommonHolder } );
		promiseArray_GetPeptideSequences.push( promise_per_projectSearchIdProcessing );
	}

	return Promise.all( promiseArray_GetPeptideSequences );
}


///////////////////////////
///////////////////////////
///////////////////////////

//    After Inital Data Loaded

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

export {
	round_Selected_ModMasses_IfNeed_modificationMass_UserSelections_StateObject,
	round_Selected_ReporterIonMasses_IfNeed_reporterIonMass_UserSelections_StateObject,
	loadDataForInitialOverlayShow_MultipleSearch_SingleProtein,
	resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein,
	update_Overlay_OnWindowResize_MultipleSearch_SingleProtein
}
