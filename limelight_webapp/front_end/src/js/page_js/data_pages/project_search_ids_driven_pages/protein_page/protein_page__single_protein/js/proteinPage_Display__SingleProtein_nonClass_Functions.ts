/**
 * proteinPage_Display__SingleProtein_nonClass_Functions.ts
 * 
 * Display Javascript for protein.jsp page  - Displaying Data for Single Protein
 * 
 */


import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';
import {ModificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
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
// const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120;

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


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

export {
	round_Selected_ModMasses_IfNeed_modificationMass_UserSelections_StateObject,
	round_Selected_ReporterIonMasses_IfNeed_reporterIonMass_UserSelections_StateObject,
	resize_OverlayHeight_BasedOnViewportHeight_MultipleSearch_SingleProtein,
	update_Overlay_OnWindowResize_MultipleSearch_SingleProtein
}
