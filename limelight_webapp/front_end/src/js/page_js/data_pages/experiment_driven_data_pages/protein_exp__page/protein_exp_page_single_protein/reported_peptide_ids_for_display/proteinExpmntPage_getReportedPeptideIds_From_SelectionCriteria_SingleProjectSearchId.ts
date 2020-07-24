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

import {ProteinView_LoadedDataCommonHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

//   Modification Mass Rounding to provide some level of commonality between searches
import { modificationMass_CommonRounding_ReturnNumber } from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

//   Reporter Ion Mass Rounding to provide some level of commonality between searches
import { reporterIonMass_CommonRounding_ReturnNumber } from 'page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding';

import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import {
    UserSearchString_LocationsOn_ProteinSequence_Root
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";

/**
 *
 */
export class ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    private _entriesMap_KeyReportedPeptideId: Map<number, ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>

    constructor(entriesMap_KeyReportedPeptideId: Map<number, ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>) {
        if (entriesMap_KeyReportedPeptideId) {
            this._entriesMap_KeyReportedPeptideId = entriesMap_KeyReportedPeptideId
        } else {
            this._entriesMap_KeyReportedPeptideId = new Map()
        }
    }

    /**
     * Remove all entries
     */
    clearAllEntries() : void {
        this._entriesMap_KeyReportedPeptideId.clear()
    }

    /**
     *
     */
    insert_Entry(entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId) : void {
        this._entriesMap_KeyReportedPeptideId.set(entry.reportedPeptideId, entry)
    }

    /**
     *
     */
    get_reportedPeptideIds(): ReadonlySet<number> {
        return  new Set(this._entriesMap_KeyReportedPeptideId.keys())
    }

    /**
     *
     */
    get_EntryFor_reportedPeptideId(reportedPeptideId: number): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {
        return this._entriesMap_KeyReportedPeptideId.get(reportedPeptideId);
    }

    /**
     *
     */
    delete_EntryFor_reportedPeptideId(reportedPeptideId: number): void {
        this._entriesMap_KeyReportedPeptideId.delete(reportedPeptideId);
    }

    /**
     *
     */
    get_Entries_IterableIterator(): IterableIterator<ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> {

        return this._entriesMap_KeyReportedPeptideId.values()
    }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

/**
 *
 */
export class ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    readonly reportedPeptideId: number

    //  psmIds_Include and psmIds_Exclude may both be NOT SET, which is always true when not filtering on something at PSM level
    //  Planning that only Include or Exclude will be set but code assuming both may be set
    readonly psmIds_Include: ReadonlySet<number>
    readonly psmIds_Exclude: ReadonlySet<number>
    readonly psmIds_UnionSelection_ExplicitSelectAll: boolean //  The UNION/ANY selection of PSM Ids has resulted in All PSM Ids for the Reported Peptide being selected.

    readonly psmCount_after_Include_Exclude: number  //  Computed PSM Count after take into account Include and Exclude PSM Ids

    /**
     * @param psmIds_UnionSelection_ExplicitSelectAll - The UNION/ANY selection of PSM Ids has resulted in All PSM Ids for the Reported Peptide being selected.
     */
    constructor(
        {
            reportedPeptideId, psmIds_Include, psmIds_Exclude, psmIds_UnionSelection_ExplicitSelectAll, psmCount_after_Include_Exclude
        }: {
            reportedPeptideId: number
            psmIds_Include: Set<number>
            psmIds_Exclude: Set<number>
            psmIds_UnionSelection_ExplicitSelectAll: boolean
            psmCount_after_Include_Exclude: number
        }) {
        this.reportedPeptideId = reportedPeptideId
        this.psmIds_Include = psmIds_Include
        this.psmIds_Exclude = psmIds_Exclude
        this.psmIds_UnionSelection_ExplicitSelectAll = psmIds_UnionSelection_ExplicitSelectAll
        this.psmCount_after_Include_Exclude = psmCount_after_Include_Exclude
    }


}


/**
 *
 */
export class ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId {

    private _forSingleSearch = false;
    private _forMultipleSearch = false;

    private _proteinSequenceVersionId: number;
    private _loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder;
    private _proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject;
    private _modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject;
    private _reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject;
    private _userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root;

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
                }: {
        forSingleSearch: boolean
        forMultipleSearch: boolean
        proteinSequenceVersionId: number,
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder,
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject,
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }) {
        if (forSingleSearch && forMultipleSearch) {
            const msg = "ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId::constructor:  forSingleSearch & forMultipleSearch cannot both be true"
            console.warn(msg);
            throw Error(msg)
        }
        if ((!forSingleSearch) && (!forMultipleSearch)) {
            const msg = "ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId::constructor:  forSingleSearch & forMultipleSearch cannot both be false (or not set)"
            console.warn(msg);
            throw Error(msg)
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
     * 			reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
     * }
     *
     *
     */
    getReportedPeptideIdsForDisplay_SingleProjectSearchId({
                                                              not_filtered_position_modification_selections,
                                                              loadedDataPerProjectSearchIdHolder,
                                                              projectSearchId
                                                          }: {
        not_filtered_position_modification_selections: boolean,
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
        projectSearchId: number
    }): {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    } {

        if ((!this._userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString)
            && this._userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0) {
            //  Have User Protein Sequence Search String but it is not found in the protein sequence
            //  Return empty array
            return {    // EARLY RETURN
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)
            };
        }

        const numPsmsForReportedPeptideIdMap: Map<number, number> = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
        if (!numPsmsForReportedPeptideIdMap) {
            throw Error("loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap(); not return a value")
        }

        const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

        //  reportedPeptideIds for this proteinSequenceVersionId
        const reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
        if (!reportedPeptideIds_All) {
            //  No reported Peptides for this proteinSequenceVersionId for this project search id
            //  Return empty array
            return {    // EARLY RETURN
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(new Map())
            };
        }

        if (not_filtered_position_modification_selections) {

            // Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

            for (const reportedPeptideId of reportedPeptideIds_All) {
                const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsms === undefined || numPsms === null) {
                    throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                }
                const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId, psmCount_after_Include_Exclude: numPsms, psmIds_Include: undefined, psmIds_Exclude: undefined, psmIds_UnionSelection_ExplicitSelectAll: false
                })
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry)
            }

            return {reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId};   // EARLY RETURN
        }

        // Initially create reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId from All Reported Peptide Ids for Protein

        let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined

        //  First build reportedPeptideIds_AndTheir_PSM_IDs... for all selection type "ANY" selections which are UNION together.
        //      If no ANY selections then start with All Reported Peptide Ids for Protein
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = this._get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together({
                reportedPeptideIds_All,
                numPsmsForReportedPeptideIdMap,
                loadedDataPerProjectSearchIdHolder,
                projectSearchId
            })
        }

        //  Second, for all "ALL" selections (explicit and implicit) take the Intersection of those with the result from the ANY or from reportedPeptideIds_All created above
        this._update_reportedPeptideIds_AndTheir_PSM_IDs__For_ALL_Selections__INTERSECTION_Together({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            reportedPeptideIds_All,
            numPsmsForReportedPeptideIdMap,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        })

        return {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        };
    }

    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////

    //     Filter using "ANY" Selections building up a UNION of the selected entries

    /**
     *
     *
     */
    _get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together(
        {
            reportedPeptideIds_All,
            numPsmsForReportedPeptideIdMap,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        }: {
            reportedPeptideIds_All: Array<number>
            numPsmsForReportedPeptideIdMap: Map<number, number>
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            projectSearchId: number
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {


        const is_Any_StaticModification_Selected__SelectionType__ANY = this._modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__SelectionType__ANY();
        const is_Any_VariableModification__ANY__Modification_Selected_Excludes_UnmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_SelectionType__ANY__Modification_Selected_Excludes_UnmodifiedSelection()
        const is_Any_OpenModification__ANY__Modification_Selected_Excludes_UnmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_SelectionType__ANY__Modification_Selected_Excludes_UnmodifiedSelection()
        const is_Any_ReporterIons_Selected__SelectionType__ANY = this._reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected__SelectionType__ANY()

        let is_VariableModification_Unmodified___SelectionType__ANY__Selected = false
        let is_OpenModification_Unmodified___SelectionType__ANY__Selected = false
        {
            {
                const unmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
                if ( unmodifiedSelection && unmodifiedSelection.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                    is_VariableModification_Unmodified___SelectionType__ANY__Selected = true
                }
            }
            {
                const unmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
                if ( unmodifiedSelection && unmodifiedSelection.selectionType === SingleProtein_Filter_SelectionType.ANY ) {
                    is_OpenModification_Unmodified___SelectionType__ANY__Selected = true
                }
            }
        }

        if ((!is_Any_StaticModification_Selected__SelectionType__ANY)
            && (!is_Any_VariableModification__ANY__Modification_Selected_Excludes_UnmodifiedSelection)
            && (!is_Any_OpenModification__ANY__Modification_Selected_Excludes_UnmodifiedSelection)
            && (!is_Any_ReporterIons_Selected__SelectionType__ANY)
            && (!is_VariableModification_Unmodified___SelectionType__ANY__Selected)
            && (!is_OpenModification_Unmodified___SelectionType__ANY__Selected)
        ) {
            //  NO "ANY" selections so return all Reported Peptide Ids for this search

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

            for (const reportedPeptideId of reportedPeptideIds_All) {
                const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsms === undefined || numPsms === null) {
                    throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                }
                const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId, psmCount_after_Include_Exclude: numPsms, psmIds_Include: undefined, psmIds_Exclude: undefined, psmIds_UnionSelection_ExplicitSelectAll: false
                })
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry)
            }

            return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId; // EARLY RETURN
        }

        //  Have at least one "ANY" type selection so create UNION of the selections

        let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined

        if (is_Any_StaticModification_Selected__SelectionType__ANY) {  //  Static Mod ANY selections

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = this._getFor__SelectionType_ANY__StaticModifications({loadedDataPerProjectSearchIdHolder});

            if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)
            }
        } else {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)
        }

        //  Variable Mods
        if (is_VariableModification_Unmodified___SelectionType__ANY__Selected) {  //  Variable Mod ANY selection (includes unmodified)
            this._updateFor__SelectionType_ANY___For__Unmodified_Selected_In_VariableModificationMassSection({ //  Variable Mod Unmodified type ANY selection
                reportedPeptideIds_All,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        }
        if (is_Any_VariableModification__ANY__Modification_Selected_Excludes_UnmodifiedSelection) {  //  Variable Mod type ANY selection (excludes unmodified)
            this._updateFor__SelectionType_ANY___For__VariableModificationMassesSelected_OtherThanUnmodified({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        }

        //  Open Mods
        if (is_OpenModification_Unmodified___SelectionType__ANY__Selected) {  //  Open Mod ANY selection (includes unmodified)
            this._updateFor__SelectionType_ANY___For__Unmodified_Selected_In_OpenModificationMassSection({ //  Open Mod Unmodified type ANY selection
                reportedPeptideIds_All,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        }
        if (is_Any_OpenModification__ANY__Modification_Selected_Excludes_UnmodifiedSelection) {  //  Open Mod type ANY selection (excludes unmodified)
            this._updateFor__SelectionType_ANY___For__OpenModificationMassesSelected_OtherThanUnmodified({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        }

        if (is_Any_ReporterIons_Selected__SelectionType__ANY) {  //   Reporter Ion type ANY selection
            this._updateFor__SelectionType_ANY___For__ReporterIonMassesSelected({
                reportedPeptideIds_All,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                loadedDataPerProjectSearchIdHolder
            })
        }


        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    }


    /**
     * Get for Static Modification mass Selection Type ANY.
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY__StaticModifications(
        {
            loadedDataPerProjectSearchIdHolder
        }: {
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        //  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

        const proteinsPositionsToGetReportedPeptideIdsFor = new Set<number>();

        const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
        if (!staticModificationsOnProtein_KeyProteinSequenceVersionId) {
            //  No Static mods so return;
            return null;  //  EARLY EXIT
        }
        const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
        if (!staticModificationsOnProtein) {
            //  No Static mods so return;
            return null;  //  EARLY EXIT
        }

        //  Search through Static Masses per position to get positions
        for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

            const position = staticModificationsOnProteinEntry[0];
            const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

            for (const massForPosition of staticModificationsAtPosition.massesSet) {
                let massForPositionForComparison = massForPosition;

                if (this._forMultipleSearch) {
                    //  For Multiple Searches, all Mod masses are rounded
                    massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForPosition});
                }

                const selectionEntry = this._modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                    residueLetter: staticModificationsAtPosition.residue,
                    modMass: massForPositionForComparison
                });
                if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY) {

                    proteinsPositionsToGetReportedPeptideIdsFor.add(position);
                }
            }
        }


        if (proteinsPositionsToGetReportedPeptideIdsFor.size === 0) {
            //  No Static mods for selection so return;
            return null;  //  EARLY EXIT
        }

        //  Utilize this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected
        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions = this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
            selectedProteinSequencePositions: proteinsPositionsToGetReportedPeptideIdsFor,
            loadedDataPerProjectSearchIdHolder
        });

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions;
    }

    /**
     * User has selected 'unmodified' ANY  in the Variable Modification mass filter section
     *
     */
    private _updateFor__SelectionType_ANY___For__Unmodified_Selected_In_VariableModificationMassSection(
        {
            reportedPeptideIds_All,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_All: Array<number>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

        for (const reportedPeptideId of reportedPeptideIds_All) {
            const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(reportedPeptideId);
            if (!modificationsForReportedPeptide) {

                if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)) {

                    //  Not already in Result so add to Result

                    const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                }
            }
        }
    }

    /**
     * User has selected Variable Modification Masses 'ANY' to filter on (Other than 'unmodified')
     *
     */
    private _updateFor__SelectionType_ANY___For__VariableModificationMassesSelected_OtherThanUnmodified(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        //  Dynamic Modifications ARE same as Variable Modifications
        const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
        const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
        if (dynamicModificationsOnProtein) {
            //  Have modifications for this protein so process them,  Modifications are at the current PSM/Peptide Filters
            for (const modificationOnProtein of dynamicModificationsOnProtein) {
                //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                // const position = modificationOnProtein.position;
                const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)) {

                    //  Not already in Result so process it

                    let massForComparison = modificationOnProtein.mass;
                    if (this._forMultipleSearch) {
                        //  For Multiple Searches, all Mod masses are rounded
                        massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForComparison});
                    }

                    const selectEntry = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                    if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ANY) {

                        const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                    }
                }
            }
        }
    }

    /**
     * User has selected 'unmodified' 'ANY' in the Open Modification mass filter section
     *
     *
     */
    private _updateFor__SelectionType_ANY___For__Unmodified_Selected_In_OpenModificationMassSection(
        {
            reportedPeptideIds_All,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,  // Add to this object
            loadedDataPerProjectSearchIdHolder
        } : {
            reportedPeptideIds_All : Array<number>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }) {

        const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        for ( const reportedPeptideId of reportedPeptideIds_All ) {

            const modificationsForReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
            if ( ! modificationsForReportedPeptide ) {
                //  No Open Modification for reportedPeptideId so add whole reportedPeptideId to result

                if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) ) {

                    //  Not already in Result so add to Result

                    const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                }
            } else {
                //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                if ( numPsmsForReportedPeptideId && psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId ) {
                    if (numPsmsForReportedPeptideId > psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size) {

                        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
                        if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry ) {

                            //  Merge existing entry for reportedPeptideId with new PSM Ids to Exclude
                            const newEntry = _merge_new_psmIds_Exclude_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                                entry : reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                                psmIds_Exclude : psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass,
                                numPsmsForReportedPeptideId
                            })
                            if (newEntry) {
                                //  Have new updated entry so delete existing and insert new entry
                                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                            }

                        } else {
                            //  Not already in Result so add to Result

                            const psmCount_after_Include_Exclude = numPsmsForReportedPeptideId - psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size

                            const resultEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                                reportedPeptideId,
                                psmIds_Include : undefined,
                                psmIds_Exclude : psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass,
                                psmIds_UnionSelection_ExplicitSelectAll : false,
                                psmCount_after_Include_Exclude
                            })
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
                        }
                    }
                }
            }
        }
    }

    /**
     * User has selected Open Modification Masses to filter on (Other than 'unmodified')
     *
     *
     */
    private _updateFor__SelectionType_ANY___For__OpenModificationMassesSelected_OtherThanUnmodified(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, ///  Add to this
            loadedDataPerProjectSearchIdHolder
        } : {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }) : void {

        const openModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();
        const openModificationsOnProtein = openModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        const psmIdsSet_Map_Key_ReportedPeptideId : Map<number, Set<number>> = new Map();

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
        if ( openModificationsOnProtein_KeyProteinSequenceVersionId && psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs ) {
            //  Have modifications for this protein so process them
            for ( const modificationOnProtein of openModificationsOnProtein) {
                //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                // const position = modificationOnProtein.position;
                let massRounded_At_ProteinLevel = modificationOnProtein.mass;  //  No Need to round for Multiple Search since already rounded to whole number

                const selectionEntry = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry( massRounded_At_ProteinLevel )
                if (  selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {

                    //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

                    const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                    const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
                    if ( psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object ) {

                        const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

                        const openModificationEntries = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.get( massRounded_At_ProteinLevel )
                        if ( openModificationEntries ) {
                            //  Found openModificationEntries for massRounded_At_ProteinLevel so have PSMs

                            let psmIdsSet = psmIdsSet_Map_Key_ReportedPeptideId.get( reportedPeptideId )
                            if ( ! psmIdsSet ) {
                                psmIdsSet = new Set()
                                psmIdsSet_Map_Key_ReportedPeptideId.set( reportedPeptideId, psmIdsSet )
                            }
                            for ( const psmId of openModificationEntries.psmIds_Set ) {
                                psmIdsSet.add(psmId)
                            }
                        }
                    }
                }
            }
        }

        for ( const mapEntry of psmIdsSet_Map_Key_ReportedPeptideId.entries() ) {

            const reportedPeptideId = mapEntry[0];
            const psmIds_Include = mapEntry[1]

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
            if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry ) {

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );

                //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
                const newEntry = _merge_new_psmIds_Include_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    entry : reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                    psmIds_Include,
                    numPsmsForReportedPeptideId
                })
                if (newEntry) {
                    //  Have new updated entry so delete existing and insert new entry
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                }

            } else {

                const resultEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId,
                    psmIds_Include,
                    psmIds_Exclude: undefined,
                    psmIds_UnionSelection_ExplicitSelectAll: false,
                    psmCount_after_Include_Exclude: psmIds_Include.size
                })

                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
            }
        }
    }

    /**
     * User has selected Reporter Ion Masses to filter on
     *
     *
     */
    private _updateFor__SelectionType_ANY___For__ReporterIonMassesSelected(
        {
            reportedPeptideIds_All,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, ///  Add to this
            loadedDataPerProjectSearchIdHolder
        } : {
            reportedPeptideIds_All: Array<number>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }) : void {

        const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :  Map<number, {reportedPeptideId: number, psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, {psmId: number, reporterIonMasses: Set<number>}>}> =
            loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        //  Filter reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId_StartingValue

        if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
            //  No values for this search, skip
            return; // EARLY RETURN
        }

        for ( const reportedPeptideId of reportedPeptideIds_All ) {

            //  loadedDataPerProjectSearchIdHolder does contain psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs for this Project Search Id

            const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);

            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id

                continue // EARLY CONTINUE
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> =
                psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap ) {
                const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: psmReporterIonMassesPerPSM_ForPsmIdMap not set";
                console.warn( msg );
                throw Error( msg );
            }

            const psmIds_For_SelectedReporterIonMasses = new Set<number>();

            for ( const entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries() ) {
                const reporterIonMasses_Object = entry[ 1 ]; // Map entry value
                const psmId = reporterIonMasses_Object.psmId;
                const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;
                for ( const reporterIonMass of reporterIonMasses_Set ) {

                    let reporterIonMass_Local = reporterIonMass;
                    if ( this._forMultipleSearch ) {
                        reporterIonMass_Local = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass_Local );  // Call external function
                    }
                    const selectionEntry = this._reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry( reporterIonMass_Local )
                    if ( selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {

                        psmIds_For_SelectedReporterIonMasses.add( psmId );
                        break;
                    }
                }
            }

            if ( psmIds_For_SelectedReporterIonMasses.size === 0 ) {
                //  NO PSMs for Reported Peptide Id contains the Selected Reporter Ion Masses

                continue // EARLY CONTINUE
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
            if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry ) {

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );

                //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
                const newEntry = _merge_new_psmIds_Include_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    entry : reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                    psmIds_Include : psmIds_For_SelectedReporterIonMasses,
                    numPsmsForReportedPeptideId
                })
                if (newEntry) {
                    //  Have new updated entry so delete existing and insert new entry
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                }

            } else {

                const resultEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId,
                    psmIds_Include : psmIds_For_SelectedReporterIonMasses,
                    psmIds_Exclude: undefined,
                    psmIds_UnionSelection_ExplicitSelectAll: false,
                    psmCount_after_Include_Exclude: psmIds_For_SelectedReporterIonMasses.size
                })

                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(resultEntry);
            }

        }

    }

    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////


    /////    Process "ALL" Selections (Including Protein Position and Peptide String)

    //      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

    /**
     *
     *
     */
    _update_reportedPeptideIds_AndTheir_PSM_IDs__For_ALL_Selections__INTERSECTION_Together(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            reportedPeptideIds_All,
            numPsmsForReportedPeptideIdMap,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            reportedPeptideIds_All: Array<number>
            numPsmsForReportedPeptideIdMap: Map<number, number>
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            projectSearchId: number
        }): void {


        const is_Any_StaticModification_Selected__SelectionType__ALL = this._modificationMass_UserSelections_StateObject.is_Any_StaticModification_Selected__SelectionType__ALL();
        const is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().is_Any_SelectionType__ALL__Modification_Selected_Excludes_UnmodifiedSelection()
        const is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_SelectionType__ALL__Modification_Selected_Excludes_UnmodifiedSelection()
        const is_Any_ReporterIons_Selected__SelectionType__ALL = this._reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected__SelectionType__ALL()

        let is_VariableModification_Unmodified___SelectionType__ALL__Selected = false
        let is_OpenModification_Unmodified___SelectionType__ALL__Selected = false
        {
            {
                const unmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
                if (unmodifiedSelection && unmodifiedSelection.selectionType === SingleProtein_Filter_SelectionType.ALL) {
                    is_VariableModification_Unmodified___SelectionType__ALL__Selected = true
                }
            }
            {
                const unmodifiedSelection = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_NO_Modification_AKA_Unmodified_Selected()
                if (unmodifiedSelection && unmodifiedSelection.selectionType === SingleProtein_Filter_SelectionType.ALL) {
                    is_OpenModification_Unmodified___SelectionType__ALL__Selected = true
                }
            }
        }

        //  Implicit ALL
        const is_UserSearchString = ! this._userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString //  true if have User Search String
        const is_Any_selectedProteinSequencePosition = this._proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()

        if ((!is_Any_StaticModification_Selected__SelectionType__ALL)
            && (!is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection)
            && (!is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection)
            && (!is_Any_ReporterIons_Selected__SelectionType__ALL)
            && (!is_VariableModification_Unmodified___SelectionType__ALL__Selected)
            && (!is_OpenModification_Unmodified___SelectionType__ALL__Selected)
            && (!is_UserSearchString)
            && (!is_Any_selectedProteinSequencePosition)
        ) {
            //  NO "ALL" selections so exit without any changes

            return;  //  EARLY RETURN
        }

        //  Have at least one "ALL" type selection so create INTERSECTION of the 'ALL" selections which is all Intersection with results of "ANY" selection

        if (is_Any_StaticModification_Selected__SelectionType__ALL) {  //  Static Mod ALL selections

            this._getFor__SelectionType_ALL__StaticModifications({ reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder });
        }

        if ( is_VariableModification_Unmodified___SelectionType__ALL__Selected) { // 'unmodified' ANY  in the Variable Modification mass filter section

            this._updateFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }
        if ( is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection ) {
            this._updateFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }

        if ( is_OpenModification_Unmodified___SelectionType__ALL__Selected) { // 'unmodified' ANY  in the Open Modification mass filter section

            this._updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }
        if ( is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection ) {
            this._updateFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }

        if ( is_Any_ReporterIons_Selected__SelectionType__ALL ) {
            this._updateFor__SelectionType_ALL___For__ReporterIonMassesSelected({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }

        if ( is_UserSearchString ) {
            this._updateFor__UserSearchString({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }

        if ( is_Any_selectedProteinSequencePosition ) {
            this._updateFor__selectedProteinSequencePositions({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }
    }

    /**
     * Get for Static Modification mass Selection Type ALL.
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ALL__StaticModifications(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        }): void {

        const staticModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_staticModificationsOnProtein_KeyProteinSequenceVersionId();
        if (!staticModificationsOnProtein_KeyProteinSequenceVersionId) {
            //  No Static mods so remove all entries and return
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()
            return;  //  EARLY EXIT
        }
        const staticModificationsOnProtein = staticModificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
        if (!staticModificationsOnProtein) {
            //  No Static mods so remove all entries and return
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()
            return;  //  EARLY EXIT
        }

        const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter = new Map<string, Map<number, Set<number>>>()

        { // set up proteinPositions_Key_ModMass_Key_ResidueLetter
            //  call ...ONLY__ALL_SelectionType()
            const staticModifications_Selected : Map<string, Set<number>> = this._modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set__ONLY__ALL_SelectionType()
            for ( const staticModifications_Selected_Entry of staticModifications_Selected.entries() ) {
                const entry_Key_ResidueLetter = staticModifications_Selected_Entry[ 0 ]
                const entry_Value_MassesSet : Set<number> = staticModifications_Selected_Entry[ 1 ]

                const accumulate_proteinPositions_Key_ModMass = new Map<number,Set<number>>()
                accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.set( entry_Key_ResidueLetter, accumulate_proteinPositions_Key_ModMass )

                for ( let massSelected of  entry_Value_MassesSet ) {
                    if (this._forMultipleSearch) {
                        //  For Multiple Searches, all Mod masses are rounded
                        massSelected = _roundModificationMass_ReturnNumber_LocalFunction({mass: massSelected});
                    }
                    accumulate_proteinPositions_Key_ModMass.set(massSelected, new Set())
                }
            }
        }

        //  Search through Static Masses per position to get positions
        for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

            const position = staticModificationsOnProteinEntry[0];
            const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

            const residueLetter = staticModificationsAtPosition.residue

            for (const massForPosition of staticModificationsAtPosition.massesSet) {
                let massForPositionForComparison = massForPosition;

                if (this._forMultipleSearch) {
                    //  For Multiple Searches, all Mod masses are rounded
                    massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForPosition});
                }

                const selectionEntry = this._modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                    residueLetter,
                    modMass: massForPositionForComparison
                });
                if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                    const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter)
                    if (!accumulate_proteinPositions_Key_ModMass) {
                        const msg = "accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter) not return a value for residueLetter: " + residueLetter
                        console.warn( msg )
                        throw Error( msg )
                    }
                    const accumulate_proteinPositions = accumulate_proteinPositions_Key_ModMass.get( massForPositionForComparison )
                    if (!accumulate_proteinPositions_Key_ModMass) {
                        const msg = "accumulate_proteinPositions_Key_ModMass.get( massForPositionForComparison ) not return a value for massForPositionForComparison: " +
                            massForPositionForComparison + ",  residueLetter: " + residueLetter
                        console.warn( msg )
                        throw Error( msg )
                    }
                    accumulate_proteinPositions.add(position);
                }
            }
        }

        //  Process accumulated protein positions

        for ( const accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry of accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.entries() ) {

            const residueLetter = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[ 0 ];
            const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter_Entry[ 1 ];

            for ( const accumulate_proteinPositions_Key_ModMass_Entry of accumulate_proteinPositions_Key_ModMass.entries() ) {
                const modMass = accumulate_proteinPositions_Key_ModMass_Entry[ 0 ]
                const proteinPositions = accumulate_proteinPositions_Key_ModMass_Entry[ 1 ]

                //  Processing One residueLetter/modMass selection and it's proteinPositions

                //  Utilize this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected
                const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions = this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                    selectedProteinSequencePositions: proteinPositions,
                    loadedDataPerProjectSearchIdHolder
                });

                if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions.get_reportedPeptideIds().size === 0) {
                    //  No reportedPeptideIds for selection so clear all entries and return
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

                    return;  //  EARLY EXIT
                }

                //  remove entries in INPUT reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
                //  that are not in result for current  residueLetter/modMass selection (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions)
                const existing_reportedPeptideIds = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()
                for ( const existing_reportedPeptideId of existing_reportedPeptideIds ) {

                    if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForProteinPositions.get_EntryFor_reportedPeptideId( existing_reportedPeptideId ) ) {
                        //  Existing entry NOT in entries for this residueLetter/modMass selection so remove
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( existing_reportedPeptideId )
                    }
                }
            }
        }
    }

    /**
     * User has selected 'unmodified' ALL  in the Variable Modification mass filter section
     *
     */
    private _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_VariableModificationMassSection(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

        const existing_reportedPeptideIds_All = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() )

        for (const existing_reportedPeptideId of existing_reportedPeptideIds_All) {
            const modificationsForReportedPeptide = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get(existing_reportedPeptideId);
            if (modificationsForReportedPeptide) {

                //  No Mods selected and mods found so remove existing_reportedPeptideId
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(existing_reportedPeptideId)
            }
        }
    }

    /**
     * User has selected Variable Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _updateFor__SelectionType_ALL___For__VariableModificationMassesSelected_OtherThanUnmodified(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        //  Dynamic Modifications ARE same as Variable Modifications
        const dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
        const dynamicModificationsOnProtein = dynamicModificationsOnProtein_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);

        const reportedPeptideIdsMap_Key_VariableModMass = new Map<number,Set<number>>()

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected
        if (dynamicModificationsOnProtein) {
            //  Have modifications for this protein so process them,  Modifications are at the current PSM/Peptide Filters
            for (const modificationOnProtein of dynamicModificationsOnProtein) {
                //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
                // const position = modificationOnProtein.position;
                const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                let massForComparison = modificationOnProtein.mass;
                if (this._forMultipleSearch) {
                    //  For Multiple Searches, all Mod masses are rounded
                    massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForComparison});
                }

                const selectEntry = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                    let reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get( massForComparison )
                    if ( ! reportedPeptideIdsMapEntry ) {
                        reportedPeptideIdsMapEntry = new Set<number>()
                        reportedPeptideIdsMap_Key_VariableModMass.set( massForComparison, reportedPeptideIdsMapEntry )
                    }
                    reportedPeptideIdsMapEntry.add( reportedPeptideId )
                }
            }
        }

        //  Remove all reportedPeptideId not found for all selectedModMass

        for ( const selectedModMass of this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet() ) {

            const reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get( selectedModMass )
            if ( ! reportedPeptideIdsMapEntry ) {
                //  No reportedPeptideIds found for required modification mass so remove all entries and return
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

                return;  //  EARLY RETURN
            }

            const existing_ReportedPeptideIds = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds()
            for ( const existing_ReportedPeptideId of existing_ReportedPeptideIds ) {
                if ( ! reportedPeptideIdsMapEntry.has( existing_ReportedPeptideId ) ) {
                    //  Existing ReportedPeptideId not in entries for this selected mod mass so remove since this is an intersection
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( existing_ReportedPeptideId )
                }
            }
        }
    }

    /**
     * User has selected 'unmodified' ALL  in the Open Modification mass filter section
     *
     */
    private _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        // const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        const existing_reportedPeptideIds_All = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())

        for ( const reportedPeptideId of existing_reportedPeptideIds_All ) {

            //  Processing to find entries in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId to Delete or Update

            const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );

            // if ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId ) {
            //     //  No Open Modification for reportedPeptideId so No changes required
            // }

            if ( psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId ) {
                //  Have at least one Open Modification for reportedPeptideId so Update reportedPeptideId and exclude PSM Ids that have Open Modifications

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId);
                if (numPsmsForReportedPeptideId === undefined) {
                    const msg = "numPsmsForReportedPeptideIdMap.get( reportedPeptideId ) === undefined: _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection: reportedPeptideId: " + reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)
                if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry) {
                    const msg = "reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) === undefined: _updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection: reportedPeptideId: " + reportedPeptideId
                    console.warn(msg)
                    throw Error(msg)
                }

                //  Merge existing entry for reportedPeptideId with new PSM Ids to Exclude
                const { newEntry, deleteEntry } = _merge_new_psmIds_Exclude_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                    psmIds_Exclude: psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass,
                    numPsmsForReportedPeptideId
                })
                if ( deleteEntry ) {
                    //   delete existing entry
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                }
                if (newEntry) {
                    //  Have new updated entry so insert new entry
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                }
            }
        }
    }

    /**
     * User has selected Open Modification Masses 'ALL' to filter on (Other than 'unmodified')
     *
     */
    private _updateFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const openModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();
        const openModificationsOnProtein = openModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );
        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        if ( ( ! openModificationsOnProtein_KeyProteinSequenceVersionId ) || ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs ) ) {
            //  NO modifications for this protein so cannot find any matches to selected Open Modification masses
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

            return  //  EARLY RETURN
        }

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected

        { //  Confirm all selected modification masses are in the modification masses on this protein
            const selectedModificationMasses = new Set(this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet())

            for (const modificationOnProtein of openModificationsOnProtein) {
                const massRounded_At_ProteinLevel = modificationOnProtein.mass;  //  No Need to round for Multiple Search since already rounded to whole number
                selectedModificationMasses.delete(massRounded_At_ProteinLevel)
            }
            if (selectedModificationMasses.size > 0) {
                //  Not all selected modification masses are in the modification masses on this protein
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

                return;  //  EARLY RETURN
            }
        }

        const psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded_At_ProteinLevel : Map<number, Map<number, Set<number>>> = new Map();

        for ( const modificationOnProtein of openModificationsOnProtein) {
            //  Currently a single array of all  mods for the protein.  Maybe make it a Map of mods at positions
            // const position = modificationOnProtein.position;
            let massRounded_At_ProteinLevel = modificationOnProtein.mass;  //  No Need to round for Multiple Search since already rounded to whole number

            const selectionEntry = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry( massRounded_At_ProteinLevel )
            if ( selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {

                //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

                const reportedPeptideId = modificationOnProtein.reportedPeptideId;

                const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
                if ( psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object ) {

                    const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

                    const openModificationEntries = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.get(massRounded_At_ProteinLevel)
                    if (openModificationEntries) {
                        //  Found openModificationEntries for massRounded_At_ProteinLevel so have PSMs

                        let psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded_At_ProteinLevel.get( massRounded_At_ProteinLevel )
                        if ( ! psmIdsSet_Map_Key_ReportedPeptideId ) {
                            psmIdsSet_Map_Key_ReportedPeptideId = new Map()
                            psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded_At_ProteinLevel.set( massRounded_At_ProteinLevel, psmIdsSet_Map_Key_ReportedPeptideId )
                        }
                        let psmIdsSet = psmIdsSet_Map_Key_ReportedPeptideId.get(reportedPeptideId)
                        if (!psmIdsSet) {
                            psmIdsSet = new Set()
                            psmIdsSet_Map_Key_ReportedPeptideId.set(reportedPeptideId, psmIdsSet)
                        }
                        for (const psmId of openModificationEntries.psmIds_Set) {
                            psmIdsSet.add(psmId)
                        }
                    }
                }
            }
        }

        const selectedModificationMasses = new Set( this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet() )

        for ( const selectedModificationMass of selectedModificationMasses ) {

            //  Intersection applied for each entry of selectedModificationMasses

            const psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded_At_ProteinLevel.get( selectedModificationMass )

            if ( ! psmIdsSet_Map_Key_ReportedPeptideId ) {
                //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this protein
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

                return;  //  EARLY RETURN
            }

            const reportedPeptideIds = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() )
            for ( const reportedPeptideId of reportedPeptideIds ) {

                const reportedPeptideIds_AndTheir_PSM_IDs_Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
                if ( ! reportedPeptideIds_AndTheir_PSM_IDs_Entry ) {
                    throw Error("reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) not return value: _updateFor__SelectionType_ALL___For__OpenModificationMassesSelected_OtherThanUnmodified: reportedPeptideId: " + reportedPeptideId )
                }

                const mapEntry_perReportedPeptideId_psmIds_Include = psmIdsSet_Map_Key_ReportedPeptideId.get( reportedPeptideId )
                if ( ! mapEntry_perReportedPeptideId_psmIds_Include ) {
                    //  No Reported Peptides with PSMs with Selected Modification mass are in the modification masses on this reported peptide id
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )

                    continue  //  EARLY CONTINUE
                }
                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null) {
                    throw Error("numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null: reportedPeptideId: " + reportedPeptideId)
                }

                const { newEntry, deleteEntry } = _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    entry : reportedPeptideIds_AndTheir_PSM_IDs_Entry,
                    psmIds_Include : mapEntry_perReportedPeptideId_psmIds_Include,
                    numPsmsForReportedPeptideId
                })
                if ( deleteEntry ) {
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )
                }
                if ( newEntry ) {
                    //  Have new entry so insert it
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                }
            }
        }
    }

    /**
     * User has selected Reporter Ion Masses 'ALL' to filter on
     *
     */
    private _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs :  Map<number, {reportedPeptideId: number, psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, {psmId: number, reporterIonMasses: Set<number>}>}> =
            loadedDataPerProjectSearchIdHolder.get_psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs();

        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs ) {
            //  No Reporter Ion values for this search
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

            return; // EARLY RETURN
        }

        const existing_ReportedPeptideIds = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() );


        reportedPeptideId_LOOP:  //  Javascript Label for 'continue' to skip to next entry of this loop from any inner loop
        for ( const reportedPeptideId of existing_ReportedPeptideIds ) {

            const reportedPeptideIds_AndTheir_PSM_IDs_Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
            if ( ! reportedPeptideIds_AndTheir_PSM_IDs_Entry ) {
                throw Error("reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) not return value: _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected: reportedPeptideId: " + reportedPeptideId )
            }
            const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
            if (numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null) {
                throw Error("numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsmsForReportedPeptideId === undefined || numPsmsForReportedPeptideId === null: reportedPeptideId: " + reportedPeptideId)
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap_Object = psmReporterIonMassesPerPSM_ForPsmIdMap_ForReportedPeptideIdMap_CurrentCutoffs.get(reportedPeptideId);

            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap_Object ) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )

                //  Skip to next reportedPeptideId using label 'reportedPeptideId_LOOP'
                continue reportedPeptideId_LOOP // EARLY CONTINUE
            }

            const psmReporterIonMassesPerPSM_ForPsmIdMap: Map<number, { psmId: number, reporterIonMasses: Set<number> }> =
                psmReporterIonMassesPerPSM_ForPsmIdMap_Object.psmReporterIonMassesPerPSM_ForPsmIdMap;

            if ( ! psmReporterIonMassesPerPSM_ForPsmIdMap ) {
                const msg = "psm_ReporterIonMasses_FilterOnSelectedValues: psmReporterIonMassesPerPSM_ForPsmIdMap not set";
                console.warn( msg );
                throw Error( msg );
            }

            const psmIdsSet_Key_SelectedReporterIonMasses = new Map<number,Set<number>>();

            for ( const entry of psmReporterIonMassesPerPSM_ForPsmIdMap.entries() ) {
                const reporterIonMasses_Object = entry[ 1 ]; // Map entry value
                const psmId = reporterIonMasses_Object.psmId;
                const reporterIonMasses_Set = reporterIonMasses_Object.reporterIonMasses;
                for ( const reporterIonMass of reporterIonMasses_Set ) {

                    let reporterIonMass_Local = reporterIonMass;
                    if ( this._forMultipleSearch ) {
                        reporterIonMass_Local = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass_Local );  // Call external function
                    }
                    const selectionEntry = this._reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry( reporterIonMass_Local )
                    if ( selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {

                        let psmIdsSet = psmIdsSet_Key_SelectedReporterIonMasses.get( reporterIonMass_Local )
                        if ( ! psmIdsSet ) {
                            psmIdsSet = new Set<number>()
                            psmIdsSet_Key_SelectedReporterIonMasses.set( reporterIonMass_Local, psmIdsSet )
                        }
                        psmIdsSet.add( psmId );
                    }
                }
            }

            if ( psmIdsSet_Key_SelectedReporterIonMasses.size === 0 ) {
                //  NO PSM Reporter Ion Masses for Reported Peptide Id
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )

                //  Skip to next reportedPeptideId using label 'reportedPeptideId_LOOP'
                continue reportedPeptideId_LOOP // EARLY CONTINUE
            }

            for ( const selectedMass of this._reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly__SelectionType__ALL__AsSet() ) {
                if ( ! psmIdsSet_Key_SelectedReporterIonMasses.has( selectedMass ) ) {
                    //  Selected mass not in found masses so remove since intersect
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )

                    //  Skip to next reportedPeptideId using label 'reportedPeptideId_LOOP'
                    continue reportedPeptideId_LOOP // EARLY CONTINUE
                }
            }

            for ( const psmIdsSet_Key_SelectedReporterIonMasses_Entry of psmIdsSet_Key_SelectedReporterIonMasses.entries() ) {

                const psmIds_Include = psmIdsSet_Key_SelectedReporterIonMasses_Entry[ 1 ]

                const reportedPeptideIds_AndTheir_PSM_IDs_Entry_Local_To_ProcessEachMass_Loop = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )

                if ( ! reportedPeptideIds_AndTheir_PSM_IDs_Entry_Local_To_ProcessEachMass_Loop ) {
                    const msg = "reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId ) NOT return a value in loop processing psmIdsSet_Key_SelectedReporterIonMasses: _updateFor__SelectionType_ALL___For__ReporterIonMassesSelected"
                    console.warn(msg)
                    throw Error( msg )
                }

                const { newEntry, deleteEntry } = _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    entry : reportedPeptideIds_AndTheir_PSM_IDs_Entry_Local_To_ProcessEachMass_Loop,
                    psmIds_Include,
                    numPsmsForReportedPeptideId
                })
                if ( deleteEntry ) {
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )

                    //  Exit Loop since deleted entry for reportedPeptideId

                    break //  EARLY BREAK LOOP
                }
                if ( newEntry ) {
                    //  Have new entry so insert it
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                }
            }
        }
    }


    /**
     * User has entered Protein Sequence "Filter On Peptide:" to filter on
     *
     */
    private _updateFor__UserSearchString(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const proteinPositions_CoveredBy_SearchStrings = this._userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings
        const proteinPositions_CoveredBy_SearchStrings_length = proteinPositions_CoveredBy_SearchStrings.length

        const selectedProteinSequencePositions = new Set<number>()

        for ( let position = 1; position < proteinPositions_CoveredBy_SearchStrings_length; position++ ) {
            if ( proteinPositions_CoveredBy_SearchStrings[ position ] ) {
                selectedProteinSequencePositions.add( position )
            }
        }

        const dataForPositions_ForEnteredSequence : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = (
            this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder })
        )

        const existing_reportedPeptideIds = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() )
        for ( const existing_reportedPeptideId of existing_reportedPeptideIds ) {
            if ( ! dataForPositions_ForEnteredSequence.get_EntryFor_reportedPeptideId( existing_reportedPeptideId ) ) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( existing_reportedPeptideId )
            }
        }

    }

    /**
     * User has selected Protein Positions to filter on
     *
     */
    private _updateFor__selectedProteinSequencePositions(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const selectedProteinSequencePositions = this._proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions()

        const dataForPositions_ForEnteredSequence : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = (
            this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected({ selectedProteinSequencePositions, loadedDataPerProjectSearchIdHolder })
        )

        const existing_reportedPeptideIds = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() )
        for ( const existing_reportedPeptideId of existing_reportedPeptideIds ) {
            if ( ! dataForPositions_ForEnteredSequence.get_EntryFor_reportedPeptideId( existing_reportedPeptideId ) ) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( existing_reportedPeptideId )
            }
        }

    }

    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////


    /**
     * Get Reported Peptide Ids to display (or download).
     *
     * User has selected Protein Positions - No Static or Variable Modifications Selections
     */
    private _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(
        {
            selectedProteinSequencePositions,
            loadedDataPerProjectSearchIdHolder
        }: {
            selectedProteinSequencePositions: Set<number>
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined); // Build set of filtered reportedPeptideIds

        // 1)  Add to reportedPeptideIdsSelection from Sequence Coverage data based on User selected Protein Positions

        //  Sequence Coverage Data
        const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();

        //  proteinCoverageObject is class ProteinSequenceCoverageData_For_ProteinSequenceVersionId
        const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
        if (!proteinCoverageObject) {
            //  No proteinCoverageObject for this proteinSequenceVersionId for this project search id
            //  There will then be no reportedPeptideIdAtPosition
            //  Return empty array
            return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId; // EARLY EXIT

            // throw Error("_getReportedPeptideIdsForDisplay(...): No proteinCoverageObject for proteinSequenceVersionId: " + this._proteinSequenceVersionId );
        }

        //  Add to reportedPeptideIdsSelection the reportedPeptideIds At the User Selected Positions
        for (const selectedProteinSequencePosition of selectedProteinSequencePositions) {

            const reportedPeptideIdsAtPosition = proteinCoverageObject.getReportedPeptidesForProteinCoverageAtPosition({position: selectedProteinSequencePosition});

            for (const reportedPeptideId of reportedPeptideIdsAtPosition) {

                const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
            }
        }

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
    }


}

//////////////////////////
//////////////////////////

//  NOT in the CLASS

//  Standalone Functions


/**
 * Create for reportedPeptideId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
 *
 * numPSMs is count of all For ReportedPeptideId at PSM filters
 */
const _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId = function(
    {
        reportedPeptideId,
        loadedDataPerProjectSearchIdHolder
    }: {
    reportedPeptideId: number
    loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
}): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    const numPsmsForReportedPeptideIdMap: Map<number, number> = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();
    if (!numPsmsForReportedPeptideIdMap) {
        throw Error("_create__ForSingleReportedPeptideId__For_ReportedPeptideId(...): loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap(); not return a value")
    }

    const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
    if (numPsms === undefined || numPsms === null) {
        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
    }

    const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId: reportedPeptideId,
        psmCount_after_Include_Exclude: numPsms,
        psmIds_Include: undefined,
        psmIds_Exclude: undefined,
        psmIds_UnionSelection_ExplicitSelectAll: false
    })

    return entry;
}

////////////

///   UNION to support "ANY"

//    Merge Rules for merging UNION/ANY:

//   When add Exclude, remove Include and update the Exclude to remove any entries that were in the Include

/**
 * Merge in contents of psmIds_Exclude As UNION to support "ANY" to existing entry.  Used for "Unmodified" selection of Open Modification
 *
 * @return null or new value
 */
const _merge_new_psmIds_Exclude_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Exclude, numPsmsForReportedPeptideId
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Exclude: Set<number>
        numPsmsForReportedPeptideId: number

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    let new_psmIds_Include : Set<number> = undefined  //  new psmIds_Include is always undefined after add Exclude

    if ( entry.psmIds_Include ) {
        const msg = "Not supported or tested that entry.psmIds_Include is set when this function is called. _merge_new_psmIds_Exclude_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId "
        console.warn( msg )
        throw Error( msg )
        //  Not used since not tested.
        // //  Since union, remove any PSM ID from Exclude that is already in Include and remove include from result
        // for ( const psmId_Include of entry.psmIds_Include ) {
        //     psmIds_Exclude.delete( psmId_Include )
        // }
    }
    if ( psmIds_Exclude.size === 0 ) {
        // NO Changes
        return null; // EARLY RETURN
    }

    if ( ( ! entry.psmIds_Include ) && ( ! entry.psmIds_Exclude ) ) {
        //  Already added for ReportedPeptideId with NO Include and NO Exclude so for All PSMs for UNION/ANY so no changes needed
        // NO Changes
        return null; // EARLY RETURN
    }

    if ( entry.psmIds_UnionSelection_ExplicitSelectAll ) {
        //  Already explicitly added all PSM Ids for ReportedPeptideId for UNION/ANY so no changes needed
        // NO Changes
        return null; // EARLY RETURN
    }

    //  Still have exclude entries to process
    const new_psmIds_Exclude = new Set( psmIds_Exclude )

    //  New Excludes are the excludes in both the existing and the new excludes
    if ( entry.psmIds_Exclude ) {
        const msg = "Not supported or tested that entry.psmIds_Exclude is set when this function is called. _merge_new_psmIds_Exclude_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId "
        console.warn( msg )
        throw Error( msg )
        //  Not used since not tested.
        //  Possible Solution is this but not confirmed: New Excludes are the excludes in both the existing and the new excludes (intersection of the excludes)
    }

    //  Not used since not tested.  replaced with code after it
    // let psmCount_after_Include_Exclude = 0;
    // if ( entry.psmIds_Include ) {
    //     psmCount_after_Include_Exclude = entry.psmIds_Include.size
    // } else {
    //     psmCount_after_Include_Exclude = numPsmsForReportedPeptideId - new_psmIds_Exclude.size
    // }

    const psmCount_after_Include_Exclude = numPsmsForReportedPeptideId - new_psmIds_Exclude.size

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_Exclude : new_psmIds_Exclude,
        psmIds_UnionSelection_ExplicitSelectAll: false,
        psmCount_after_Include_Exclude
    })

    return newEntry
}

/**
 * Merge in contents of psmIds_Include As UNION to support "ANY" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * @return null or new value
 */
const _merge_new_psmIds_Include_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Include, numPsmsForReportedPeptideId
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Include: Set<number>
        numPsmsForReportedPeptideId: number

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    if ( entry.psmIds_Include && entry.psmIds_Exclude ) {
        const msg = "Not valid to have value for both entry.psmIds_Include && entry.psmIds_Exclude: _merge_new_psmIds_Include_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId"
        console.warn( msg )
        throw Error( msg )
    }
    if (psmIds_Include.size === 0) {
        // NO Changes
        return null; // EARLY RETURN
    }

    if (( ! entry.psmIds_Include ) && ( ! entry.psmIds_Exclude ) ) {
        //  Already added for ReportedPeptideId with NO Include or Exclude so for All PSMs for UNION/ANY so no changes needed
        // NO Changes
        return null; // EARLY RETURN
    }

    if ( entry.psmIds_UnionSelection_ExplicitSelectAll ) {
        //  Already explicitly added all PSM Ids for ReportedPeptideId for UNION/ANY so no changes needed
        // NO Changes
        return null; // EARLY RETURN
    }

    let new_psmIds_Include : Set<number> = undefined
    let new_psmIds_Exclude : Set<number> = undefined
    let psmIds_UnionSelection_ExplicitSelectAll = false

    if ( entry.psmIds_Exclude ) {
        //  Have Existing Exclude:

        new_psmIds_Exclude = new Set( entry.psmIds_Exclude )

        for (const psmId_Include of psmIds_Include) {
            new_psmIds_Exclude.delete(psmId_Include)  //  Shrink the Exclude to grow the selected by the contents of psmIds_Include since this is UNION/ANY
        }
        if (new_psmIds_Exclude.size === entry.psmIds_Exclude.size) {  // since only delete can just compare size
            // NO Changes
            return null; // EARLY RETURN
        }
        if ( new_psmIds_Exclude.size === 0 ) {
            //  Nothing to exclude so remove
            new_psmIds_Exclude = undefined
            psmIds_UnionSelection_ExplicitSelectAll = true
        }

    } else {
        if (entry.psmIds_Include) {
            //  Have Existing Include:
            new_psmIds_Include = new Set(entry.psmIds_Include)
        } else {
            new_psmIds_Include = new Set()
        }

        for (const psmId_Include of psmIds_Include) {
            new_psmIds_Include.add(psmId_Include)  //  Add to the Include to grow the selected by the contents of psmIds_Include since this is UNION/ANY
        }
        if ( entry.psmIds_Include && entry.psmIds_Include.size === new_psmIds_Include.size) {  // Have Existing and since only add can just compare size
            // NO Changes
            return null; // EARLY RETURN
        }
    }

    let psmCount_after_Include_Exclude = 0;
    if ( new_psmIds_Include ) {
        psmCount_after_Include_Exclude = new_psmIds_Include.size
    } else if ( new_psmIds_Exclude ) {
        psmCount_after_Include_Exclude = numPsmsForReportedPeptideId - new_psmIds_Exclude.size
    } else {
        psmCount_after_Include_Exclude = numPsmsForReportedPeptideId
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_Exclude : new_psmIds_Exclude,
        psmIds_UnionSelection_ExplicitSelectAll,
        psmCount_after_Include_Exclude
    })

    return newEntry
}

////////////

///   INTERSECTION to support "ALL"

//    Merge Rules for merging INTERSECTION/ALL:


/**
 * Merge in contents of psmIds_Exclude As INTERSECTION to support "ALL" to existing entry.  Used for "Unmodified" selection of Open Modification
 *
 * Subtract from existing Include or Add to existing Exclude
 *
 * @param psmIds_Exclude - PSM Ids to Exclude (Use for Unmodified)
 * @return null or new value
 */
const _merge_new_psmIds_Exclude_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Exclude, numPsmsForReportedPeptideId
    }: {
        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Exclude: Set<number>
        numPsmsForReportedPeptideId: number

    }): {
    newEntry : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
    deleteEntry : boolean
} {
    if (entry.psmIds_Include && entry.psmIds_Exclude) {
        const msg = "Not valid to have value for both entry.psmIds_Include && entry.psmIds_Exclude: _merge_new_psmIds_Exclude_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId"
        console.warn(msg)
        throw Error(msg)
    }

    if (psmIds_Exclude.size === 0) {
        // NO Changes
        return {newEntry: null, deleteEntry: false}; // EARLY RETURN
    }

    if (psmIds_Exclude.size === numPsmsForReportedPeptideId) {
        //  All PSM IDs are now excluded so remove entry
        return {newEntry: null, deleteEntry: true}; // EARLY RETURN
    }

    let new_psmIds_Include : Set<number> = undefined
    let new_psmIds_Exclude : Set<number> = undefined

    if ( entry.psmIds_Include ) {
        //  Have Existing Include:

        new_psmIds_Include = new Set( entry.psmIds_Include )

        for (const psmId_Exclude of psmIds_Exclude) {
            new_psmIds_Include.delete(psmId_Exclude)  //  Shrink the Include to shrink the selected by the contents of psmIds_Exclude since this is INTERSECTION/ALL
        }
        if (new_psmIds_Include.size === entry.psmIds_Include.size) {  // since only delete can just compare size
            // NO Changes
            return {newEntry: null, deleteEntry: false}; // EARLY RETURN
        }

    } else {
        if (entry.psmIds_Exclude) {
            //  Have Existing Exclude:
            new_psmIds_Exclude = new Set(entry.psmIds_Exclude)
        } else {
            new_psmIds_Exclude = new Set()
        }

        for (const psmId_Exclude of psmIds_Exclude) {
            new_psmIds_Exclude.add(psmId_Exclude)  //  Grow the Exclude to shrink the selected by the contents of psmIds_Exclude since this is INTERSECTION/ALL
        }
        if ( entry.psmIds_Exclude && entry.psmIds_Exclude.size === new_psmIds_Exclude.size) {  // Have Existing and since only add can just compare size
            // NO Changes
            return {newEntry: null, deleteEntry: false}; // EARLY RETURN
        }
    }

    let psmCount_after_Include_Exclude = 0
    if ( new_psmIds_Include ) {
        psmCount_after_Include_Exclude = new_psmIds_Include.size
    } else {
        psmCount_after_Include_Exclude = numPsmsForReportedPeptideId - new_psmIds_Exclude.size
    }

    if (psmCount_after_Include_Exclude === 0) {
        //  No PSM IDs are now included OR All PSM IDs are now excluded so remove entry
        return {newEntry: null, deleteEntry: true}; // EARLY RETURN
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_Exclude : new_psmIds_Exclude,
        psmIds_UnionSelection_ExplicitSelectAll : false,
        psmCount_after_Include_Exclude
    })

    return { newEntry, deleteEntry : false }
}

/**
 * Merge in contents of psmIds_Include As INTERSECTION to support "ALL" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * When have existing Exclude, to add Include, remove Exclude and update the Include to remove any entries that were in the Exclude
 *
 * @return null or new value
 */
const _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Include, numPsmsForReportedPeptideId
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Include: Set<number>
        numPsmsForReportedPeptideId: number

    }): {
    newEntry : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
    deleteEntry : boolean
} {

    if ( entry.psmIds_Include && entry.psmIds_Exclude ) {
        const msg = "Not valid to have value for both entry.psmIds_Include && entry.psmIds_Exclude: _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId"
        console.warn( msg )
        throw Error( msg )
    }
    if (psmIds_Include.size === 0) {
        //  No PSM IDs are now included so remove entry
        return { newEntry : null, deleteEntry : true }; // EARLY RETURN
    }

    let new_psmIds_Include : Set<number> = undefined
    let new_psmIds_Exclude : Set<number> = undefined

    if ( entry.psmIds_Exclude ) {
        //  Have Existing Exclude:

        new_psmIds_Include = new Set( psmIds_Include )

        for (const psmId_Exclude of entry.psmIds_Exclude) {
            new_psmIds_Include.delete(psmId_Exclude)  //  Shrink the Include to shrink the selected by the contents of entry.psmIds_Exclude since this is INTERSECTION/ALL
        }

    } else {
        if (entry.psmIds_Include) {
            //  Have Existing Include:
            new_psmIds_Include = new Set()
            for (const psmId_Include of psmIds_Include) {
                if ( entry.psmIds_Include.has( psmId_Include) ) {
                    //  psmId_Include is in both existing and new psmIds_Include so is added to result new_psmIds_Include since this is INTERSECTION/ALL
                    new_psmIds_Include.add(psmId_Include)
                }
            }
            if ( entry.psmIds_Include.size === new_psmIds_Include.size) {  // Have Existing and since only add can just compare size
                // NO Changes
                return { newEntry: null, deleteEntry: false }; // EARLY RETURN
            }
        } else {
            //  No Existing Includes
            new_psmIds_Include = psmIds_Include
        }
    }

    let psmCount_after_Include_Exclude = new_psmIds_Include.size

    if (psmCount_after_Include_Exclude === 0) {
        //  No PSM IDs are now included so remove entry
        return {newEntry: null, deleteEntry: true}; // EARLY RETURN
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_Exclude : new_psmIds_Exclude,
        psmIds_UnionSelection_ExplicitSelectAll : false,
        psmCount_after_Include_Exclude
    })

    return { newEntry, deleteEntry : false }
}

//////////////
//////////////

//   Modification Mass Rounding to provide some level of commonality between searches

/**
 *
 */
const _roundModificationMass_ReturnNumber_LocalFunction = function({mass} : {mass : number}) : number {
    return modificationMass_CommonRounding_ReturnNumber(mass);  // Call external function
}