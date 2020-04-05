/**
 * proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.ts
 * 
 * Javascript for protein_Experiment.jsp page - Get Reported Peptide Ids From Selection Criteria for a Single Project Search Id
 * 
 * Selection Criteria:
 *  1) Variable and Static Modifications (and NO Variable Modifications as a part of this)
 *  2) Reporter Ions
 *  2) Search String(s) to search Peptide Sequences
 *  3) Protein Positions
 * 
 * Companion file to proteinExperimentPage_Display_SingleProtein.tsx
 * 
*/

import { ProteinSequenceData_For_ProteinSequenceVersionId } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinSequenceData_For_ProteinSequenceVersionId';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

//   Modification Mass Rounding to provide some level of commonality between searches
import { 
    modificationMass_CommonRounding_ReturnNumber_Function,
    modificationMass_CommonRounding_ReturnString_Function,
    modificationMass_CommonRounding_ReturnNumber, 
    modificationMass_CommonRounding_ReturnString 
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { 
    reporterIonMass_CommonRounding_ReturnNumber_Function,
    reporterIonMass_CommonRounding_ReturnString_Function,
    reporterIonMass_CommonRounding_ReturnNumber, 
    reporterIonMass_CommonRounding_ReturnString, 
    _REPORTER_ION_MASS_DECIMAL_PLACE_ROUNDING_NORMAL_DEFAULT 
} from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';


import { ProteinSequenceWidget_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import { UserSearchString_LocationsOn_ProteinSequence_Root, UserSearchString_LocationsOn_ProteinSequence_Entry } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';

/**
 * 
 */
export class ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId {

    private _forSingleSearch = false; 
	private _forMultipleSearch = false;

	private _proteinSequenceVersionId : number;
	private _loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
	private _proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
	private _modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
	private _reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
	private _userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root;

	/**
	 * 
	 */
	constructor({ 

		//  First 2 params (for...) are mutually exclusive.  Exactly 1 must be true.
		forSingleSearch,
		forMultipleSearch,
		proteinSequenceVersionId,
		loadedDataCommonHolder,
		proteinSequenceWidget_StateObject, 
		modificationMass_UserSelections_StateObject,
		reporterIonMass_UserSelections_StateObject,
		userSearchString_LocationsOn_ProteinSequence_Root
	} : { 
		forSingleSearch : boolean
		forMultipleSearch : boolean
		proteinSequenceVersionId : number,
		loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder,
		proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject, 
		modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject,
		reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject,
		userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
	}) {
		if ( forSingleSearch && forMultipleSearch ) {
			const msg = "ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId::constructor:  forSingleSearch & forMultipleSearch cannot both be true"
			console.warn( msg );
			throw Error( msg )
		}
		if ( ( ! forSingleSearch ) && ( ! forMultipleSearch ) ) {
			const msg = "ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId::constructor:  forSingleSearch & forMultipleSearch cannot both be false (or not set)"
			console.warn( msg );
			throw Error( msg )
		}

		this._forSingleSearch = forSingleSearch;
		this._forMultipleSearch = forMultipleSearch;
		this._proteinSequenceVersionId = proteinSequenceVersionId;
		this._loadedDataCommonHolder = loadedDataCommonHolder;
		this._proteinSequenceWidget_StateObject = proteinSequenceWidget_StateObject;
		this._modificationMass_UserSelections_StateObject = modificationMass_UserSelections_StateObject;
		this._reporterIonMass_UserSelections_StateObject = reporterIonMass_UserSelections_StateObject;
		this._userSearchString_LocationsOn_ProteinSequence_Root = userSearchString_LocationsOn_ProteinSequence_Root;

    }

	/**
	 * 
	 */
	initialize() {


    }

	
	/**
	 * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
	 * 
	 * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
	 * 
	 * @returns {
	 * 			reportedPeptides_Filtered_Array, // empty array if no reportedPeptideIds for proteinSequenceVersionId for projectSearchId
	 * 			reporterIonMasses_AnySelected,
				peptideSearchStrings_AnyEntered,
				peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence,
				proteinPositions_CoveredBy_PeptideSearchStrings
	 * }
	 * 
	 * 
	 */
	getReportedPeptideIdsForDisplay_SingleProjectSearchId( { 
		not_filtered_position_modification_selections, 
		loadedDataPerProjectSearchIdHolder,
		projectSearchId
	} : { 
		not_filtered_position_modification_selections : boolean, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
		projectSearchId : number
	} ) {

		if ( ( ! this._userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString )
			&& this._userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0 ) {
			//  Have User Protein Sequence Search String but it is not found in the protein sequence
			//  Return empty array
			return {    // EARLY RETURN
				reportedPeptides_Filtered_Array : []
			};
		}

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();
		
		//  reportedPeptideIds for this proteinSequenceVersionId
		const reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! reportedPeptideIds_All ) {
			//  No reported Peptides for this proteinSequenceVersionId for this project search id
			//  Return empty array
			return {    // EARLY RETURN
				reportedPeptides_Filtered_Array : []
			};
		}

		if ( not_filtered_position_modification_selections ) {

			// Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs
			return {    // EARLY RETURN
				reportedPeptides_Filtered_Array : reportedPeptideIds_All
			};
		}

		let selectedProteinSequencePositions = this._proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();
		
		if ( selectedProteinSequencePositions && selectedProteinSequencePositions.size === 0 ) {
			selectedProteinSequencePositions = undefined;
		}

		let reportedPeptideIds_Filtered : Set<number> = null;

		if ( selectedProteinSequencePositions ) {
			//  User has selected Protein Positions, change reportedPeptideIds_Filtered to be reportedPeptideIds for Selected Positions
			reportedPeptideIds_Filtered = this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder });
		} else {
			//  Start with All Reported Peptide Ids - No Protein Positions Selected
			reportedPeptideIds_Filtered = new Set( reportedPeptideIds_All );
		}

		if ( this._modificationMass_UserSelections_StateObject.is_Any_VariableModification_Selected() || 
				this._modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected() ) {
			//  Have Variable or Static Modification selections so filter Reported Peptides on Modification Selection(s)
			reportedPeptideIds_Filtered = this._filter_reportedPeptides_OnModificationsSelections({ reportedPeptideIds_StartingSet : reportedPeptideIds_Filtered, loadedDataPerProjectSearchIdHolder });
		}

		if ( this._reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
			//  Have Reporter Ion Mass selections so filter on Reported Peptides on Reporter Ion Mass selection(s)
			reportedPeptideIds_Filtered = this._filter_reportedPeptides_OnReportedIonMassesSelections({ reportedPeptideIds_StartingSet : reportedPeptideIds_Filtered, loadedDataPerProjectSearchIdHolder });
		}

		if ( ( ! this._userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString ) ) {
			// Have Peptide Sequence Found Positions on Protein to filter on
			const peptidesContainingSearchStringSelectionsResult = this._filter_reportedPeptides_OnPeptidesContainingSearchStringSelections({ reportedPeptideIds_StartingSet : reportedPeptideIds_Filtered, loadedDataPerProjectSearchIdHolder, projectSearchId });

			reportedPeptideIds_Filtered = peptidesContainingSearchStringSelectionsResult.reportedPeptideIds_Result_Set;
		}

		const reportedPeptides_Filtered_Array = Array.from( reportedPeptideIds_Filtered );

		return { 
			reportedPeptides_Filtered_Array
		};
	}

	/**
	 * Filter reportedPeptideIds_StartingSet based on Peptides that contain Search Strings entered
	 * 
	 * @param reportedPeptideIds_StartingSet - Reported Peptide Ids filtered to this point, or all if no filters applied yet
	 * 
	 * @returns { 
	 * 		reportedPeptideIds_Result_Set - Set - Subset reportedPeptideIds_StartingSet meet the Peptide Sequence Search Strings Filters 
	 * 		proteinPositions_CoveredBy_PeptideSearchStrings - Array - of booleans, 1 based positions
	 * 		peptideSearchStrings_FoundAtAnyPositionsOnProteinSequence - boolean
	 * }
	 */	
	private _filter_reportedPeptides_OnPeptidesContainingSearchStringSelections({ 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder, 
		projectSearchId 
	} : { 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder, 
		projectSearchId 
	}) {

		const reportedPeptideIds_Result_Set : Set<number> = new Set();

		//  Get proteinCoverage_KeyProteinSequenceVersionId 

		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( proteinCoverageObject === undefined ) {
			throw Error("_combine_DynamicModificationsForRepPeptIds_AndStoreForProtSeqVId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}
		const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

		if ( ( ! proteinCoverageEntries_PerReportedPeptideId_Array ) || proteinCoverageEntries_PerReportedPeptideId_Array.length === 0 ) {
			//  No Protein Coverage entries for this this._proteinSequenceVersionId
			if ( this._forSingleSearch ) {
				throw Error("No Protein Coverage Entries for: proteinSequenceVersionId: " + this._proteinSequenceVersionId + ", projectSearchId: " + projectSearchId);
			}
		}

		/////


		//  Search Strings positions in the Protein Sequence

		const searchStringProteinPositions : Array<UserSearchString_LocationsOn_ProteinSequence_Entry> = ( // []; // array of objects of { startPosition: , endPosition: }
			this._userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries
		)

		//  Get Reported Peptide Ids from matching Protein Coverage entries

		const reportedPeptideIds_For_SearchStrings = new Set();

		if ( proteinCoverageEntries_PerReportedPeptideId_Array && proteinCoverageEntries_PerReportedPeptideId_Array.length !== 0 ) {
			for ( const proteinCoverageEntry of proteinCoverageEntries_PerReportedPeptideId_Array ) {
				for ( const searchStringProteinPosition of searchStringProteinPositions ) {
					if ( proteinCoverageEntry.proteinStartPosition <= searchStringProteinPosition.startPosition &&
						proteinCoverageEntry.proteinEndPosition >= searchStringProteinPosition.endPosition ) {
							reportedPeptideIds_For_SearchStrings.add( proteinCoverageEntry.reportedPeptideId );
							break;
					}
				}
			}
		}

		for ( const reportedPeptideIds_StartingSet_Entry of reportedPeptideIds_StartingSet ) {
			if ( reportedPeptideIds_For_SearchStrings.has( reportedPeptideIds_StartingSet_Entry ) ) {
				reportedPeptideIds_Result_Set.add( reportedPeptideIds_StartingSet_Entry );
			}
		}
		
		return { 
			reportedPeptideIds_Result_Set,
		};
	}


	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Protein Positions - No Static or Variable Modifications Selections
	 */
	private _getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ 
		selectedProteinSequencePositions, 
		loadedDataPerProjectSearchIdHolder 
	} : { 
		selectedProteinSequencePositions, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	}) : Set<number> {

		const reportedPeptideIdsSelection : Set<number> = new Set();  // Build set of filtered reportedPeptideIds

		// 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

		//  Sequence Coverage Data
		const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

		//  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
		const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! proteinCoverageObject ) {
			//  No proteinCoverageObject for this proteinSequenceVersionId for this project search id
			//  There will then be no reportedPeptideIdAtPosition
			//  Return empty array
			return reportedPeptideIdsSelection; // EARLY EXIT

			// throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
		}

		//  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
		for ( const selectedProteinSequencePosition of selectedProteinSequencePositions ) {
			const reportedPeptideIdsAtPosition =  proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition( { position : selectedProteinSequencePosition } );
				
			for ( const reportedPeptideIdAtPosition of reportedPeptideIdsAtPosition ) {
				reportedPeptideIdsSelection.add( reportedPeptideIdAtPosition );
			}
		}

		return reportedPeptideIdsSelection;
	}

	/**
	 * Filter reportedPeptideIds_StartingSet based on Variable or Static Modification mass filter Selected
	 * 
	 * User has selected entry(s) in the Variable or Static Modification mass filter section
	 * 
	 * @param reportedPeptideIds_StartingSet - Reported Peptide Ids filtered to this point, or all if no filters applied yet
	 * 
	 * @returns Subset reportedPeptideIds_StartingSet meet the Variable or Static Modifications Filters
	 */	
	private _filter_reportedPeptides_OnModificationsSelections({ 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder 
	} : { 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	}) : Set<number> {

		let reportedPeptideIds_ForModifications_Set = undefined;

		if ( this._modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected() ) {
			//  Static Modification selected
			reportedPeptideIds_ForModifications_Set = this._get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ loadedDataPerProjectSearchIdHolder });
		} else {
			reportedPeptideIds_ForModifications_Set = new Set();
		}

		if ( this._modificationMass_UserSelections_StateObject.is_NO_VariableModification_AKA_Unmodified_Selected() ) {
			// 'unmodified' Variable Modification selected
			this._update_ReportedPeptideIds_Set_For_UnmodifiedSelected_InModificationMassSection({ 
				reportedPeptideIds_ToAddTo_Set: reportedPeptideIds_ForModifications_Set, reportedPeptideIds_StartingSet, loadedDataPerProjectSearchIdHolder });
		}

		const variableModificationsSelected_ExcludingNoModificationOption = this._modificationMass_UserSelections_StateObject.get_VariableModificationsSelected_ExcludingNoModificationOption();
		if ( variableModificationsSelected_ExcludingNoModificationOption && variableModificationsSelected_ExcludingNoModificationOption.size !== 0 ) {
			if ( variableModificationsSelected_ExcludingNoModificationOption.size === undefined ) {
				const msg = "_filter_reportedPeptides_OnModificationsSelections: variableModificationsSelected_ExcludingNoModificationOption.size === undefined";
				console.warn( msg );
				throw Error( msg );
			}
			// Variable Modification other than 'unmodified' selected
			this._update_ReportedPeptideIds_Set_For_VariableModificationMassesSelected_OtherThanUnmodified({ 
				reportedPeptideIds_ToAddTo_Set: reportedPeptideIds_ForModifications_Set, variableModificationsSelected_ExcludingNoModificationOption, loadedDataPerProjectSearchIdHolder 
			});
		}

		//  Filter reportedPeptideIds_StartingSet on reportedPeptideIds_ForModifications_Set

		const reportedPeptideIds_Result_Set : Set<number> = new Set();

		for ( const reportedPeptideIds_StartingSet_Entry of reportedPeptideIds_StartingSet ) {
			if ( reportedPeptideIds_ForModifications_Set.has( reportedPeptideIds_StartingSet_Entry ) ) {
				reportedPeptideIds_Result_Set.add( reportedPeptideIds_StartingSet_Entry );
			}
		}

		return reportedPeptideIds_Result_Set;
	}



	/**
	 * Filter reportedPeptideIds_StartingSet based on Reporter Ion Mass filter Selected
	 * 
	 * User has selected entry(s) in the Reporter Ion Mass filter section
	 * 
	 * @param reportedPeptideIds_StartingSet - Reported Peptide Ids filtered to this point, or all if no filters applied yet
	 * 
	 * @returns Subset reportedPeptideIds_StartingSet meet the Reporter Ion Mass Filters
	 */	
	private _filter_reportedPeptides_OnReportedIonMassesSelections({ 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder 
	} : { 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	}) : Set<number> {

		//  	Reporter Ion Mass Unique Values for all PSMs for current cutoffs per Reported Peptide Id
		// _psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs - Map<integer, { integer, Map<integer, { integer, Set<bigdecimal> } > } > : Map<Reported Peptide Id, reporterIonMasses (Set) >
		const psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs();

		//  Filter reportedPeptideIds_StartingSet

		const reportedPeptideIds_Result_Set : Set<number> = new Set();

		if ( ! psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs ) {
			//  No values for this search, return empty Set
			return reportedPeptideIds_Result_Set; // EARLY RETURN
		}

		for ( const reportedPeptideIds_StartingSet_Entry of reportedPeptideIds_StartingSet ) {

			const psmReporterIonMassesUnique_Object = psmReporterIonMassesUnique_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideIds_StartingSet_Entry );
			if ( psmReporterIonMassesUnique_Object ) {
				const psmReporterIonMassesUnique_Set = psmReporterIonMassesUnique_Object.reporterIonMasses;
				//  Have psmReporterIonMassesUnique_Set for this reportedPeptideId
				for ( const reporterIonMass of psmReporterIonMassesUnique_Set ) {

					let reporterIonMassForComparison = reporterIonMass;
					if ( this._forMultipleSearch ) {
						//  For Multiple Searches, all Mod masses are rounded
						reporterIonMassForComparison = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMassForComparison );
					}

					if ( this._reporterIonMass_UserSelections_StateObject.is_ReporterIon_Selected( reporterIonMassForComparison ) ) {
						// reporterIonMass for one of PSMs for reportedPeptideId is found in selected values so add reportedPeptideId
						reportedPeptideIds_Result_Set.add( reportedPeptideIds_StartingSet_Entry );
						break;
					}
				}
			}
		}

		return reportedPeptideIds_Result_Set;
	}

	/**
	 * Get Reported Peptide Ids to display (or download).  
	 * 
	 * User has selected Variable Modification Masses to filter on (Other than 'unmodified')
	 * 
	 * @param reportedPeptideIds_ToAddTo_Set - Set to add Reported Peptide Ids to that meet this criteria
	 * 
	 */
	private _update_ReportedPeptideIds_Set_For_VariableModificationMassesSelected_OtherThanUnmodified({
		reportedPeptideIds_ToAddTo_Set, 
		variableModificationsSelected_ExcludingNoModificationOption, 
		loadedDataPerProjectSearchIdHolder
	} : {
		reportedPeptideIds_ToAddTo_Set, 
		variableModificationsSelected_ExcludingNoModificationOption, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	}) : void {

		//  Dynamic Modifications ARE same as Variable Modifications
		const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
		const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

		//  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
		if ( dynamicModificationsOnProtein ) {
			//  Have modifications for this protein so process them
			for ( const modificationOnProtein of dynamicModificationsOnProtein) {
				//  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
				// const position = modificationOnProtein.position;
				let massForPositionForComparison = modificationOnProtein.mass;
				if ( this._forMultipleSearch ) {
					//  For Multiple Searches, all Mod masses are rounded
					massForPositionForComparison = this._roundModificationMass_ReturnNumber_LocalFunction({ mass : massForPositionForComparison});
				}
				const reportedPeptideId = modificationOnProtein.reportedPeptideId;

				if ( variableModificationsSelected_ExcludingNoModificationOption.has( massForPositionForComparison ) ) {

					reportedPeptideIds_ToAddTo_Set.add( reportedPeptideId );
				}
			}
		}
	}

	/**
	 * User has selected 'unmodified' in the Variable Modification mass filter section
	 * 
	 * @param reportedPeptideIds_ToAddTo_Set - Set to add Reported Peptide Ids to that meet this criteria
	 * @param reportedPeptideIds_StartingSet - 'Starting Set' - Pre-filtered on other criteria (currently Protein Position Selections)
	 * 
	 */
	private _update_ReportedPeptideIds_Set_For_UnmodifiedSelected_InModificationMassSection({ 
		reportedPeptideIds_ToAddTo_Set, 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder 
	} : { 
		reportedPeptideIds_ToAddTo_Set, 
		reportedPeptideIds_StartingSet, 
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
	}) {

		const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

		for ( const reportedPeptideId of reportedPeptideIds_StartingSet ) {
			const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
			if ( ! modificationsForReportedPeptide ) {
				reportedPeptideIds_ToAddTo_Set.add(reportedPeptideId);
			}
		}
	}

	/**
	 * Static Modification mass filter Selected.
	 * 
	 * User has selected entry(s) in the Variable or Static Modification mass filter section
	 * 
	 * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
	 * 
	 * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
	 */	
	private _get_reportedPeptideIds_FilteredOnStaticModificationsSelected({ 
		loadedDataPerProjectSearchIdHolder 
	} : {
		loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder 
	}) {

		//  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

		const proteinsPositionsToGetReportedPeptideIdsFor = new Set();

		//  Map of Selected Static Modification Residue Letter And Mass <String, Set<Number>> <Residue Letter, <Mass>>
		const staticModificationMassesSelected = this._modificationMass_UserSelections_StateObject.get_StaticModifications_Selected();

		const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
		if ( ! staticModificationsOnProtein_KeyProteinSequenceVersionId ) {
			//  No Static mods so return;
			return proteinsPositionsToGetReportedPeptideIdsFor;  //  EARLY EXIT
		}
		const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
		if ( ! staticModificationsOnProtein ) {
			//  No Static mods so return;
			return proteinsPositionsToGetReportedPeptideIdsFor;  //  EARLY EXIT
		}

		for ( const staticModificationMassesSelected_Entry of staticModificationMassesSelected.entries() ) {

			const selectedResidue = staticModificationMassesSelected_Entry[ 0 ];
			const selectedModificationMasses = staticModificationMassesSelected_Entry[ 1 ];

			//  Search through Static Masses per position to get positions
			for ( const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries() ) {

				const position = staticModificationsOnProteinEntry[ 0 ];
				const staticModificationsAtPosition = staticModificationsOnProteinEntry[ 1 ];

				if ( staticModificationsAtPosition.residue === selectedResidue ) {
					for ( const selectedModificationMass of selectedModificationMasses ) {
						let foundMatchingMassForPosition = false;
						for ( const massForPosition of staticModificationsAtPosition.massesSet ) { 
							let massForPositionForComparison = massForPosition;
							if ( this._forMultipleSearch ) {
								//  For Multiple Searches, all Mod masses are rounded
								massForPositionForComparison = this._roundModificationMass_ReturnNumber_LocalFunction({ mass : massForPosition});
							}
							if ( massForPositionForComparison === selectedModificationMass ) {
								proteinsPositionsToGetReportedPeptideIdsFor.add( position );
								foundMatchingMassForPosition = true;
								break;
							}
						}
						if ( foundMatchingMassForPosition ) {
							break;
						}
					}
				}
			}
		}

		if ( proteinsPositionsToGetReportedPeptideIdsFor.size === 0 ) {
			//  No Static mods for selection so return;
			return new Set();  //  EARLY EXIT
		}

		return this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions : proteinsPositionsToGetReportedPeptideIdsFor, loadedDataPerProjectSearchIdHolder });
	}


	////////////////////////////////////////////
		
	//   Modification Mass Rounding to provide some level of commonality between searches

	/**
	 * 
	 */
	private _roundModificationMass_ReturnNumber_LocalFunction({ mass }) {
		return modificationMass_CommonRounding_ReturnNumber( mass );  // Call external function
	}

}
