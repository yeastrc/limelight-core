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

import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import {
    UserSearchString_LocationsOn_ProteinSequence_Root
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";
import {proteinExpmntPage_update_reportedPeptideIds_AndTheir_PSM_IDs__For_ALL_Selections__INTERSECTION_Together} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ALL_AND_Selections";
import {proteinExpmntPage_get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections";

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

    readonly psmIds_Include: ReadonlySet<number>
    readonly psmIds_IncludeSet_Map_Key_SearchSubGroupId: ReadonlyMap<number,ReadonlySet<number>>
    readonly psmIds_UnionSelection_ExplicitSelectAll: boolean //  Currently always 'false'.  The UNION/ANY selection of PSM Ids has resulted in All PSM Ids for the Reported Peptide being selected.

    readonly psmCount_after_Include: number  //  Computed PSM Count after take into account Include and Exclude PSM Ids

    readonly psmCount_after_Include_Map_Key_SearchSubGroupId : ReadonlyMap<number,number>

    /**
     * @param psmIds_UnionSelection_ExplicitSelectAll - The UNION/ANY selection of PSM Ids has resulted in All PSM Ids for the Reported Peptide being selected.
     */
    constructor(
        {
            reportedPeptideId, psmCount_after_Include_Map_Key_SearchSubGroupId,
            psmIds_Include, psmIds_IncludeSet_Map_Key_SearchSubGroupId,
            psmIds_UnionSelection_ExplicitSelectAll, psmCount_after_Include
        }: {
            reportedPeptideId: number
            psmCount_after_Include_Map_Key_SearchSubGroupId? : ReadonlyMap<number,number>
            psmIds_Include: Set<number>
            psmIds_IncludeSet_Map_Key_SearchSubGroupId?: ReadonlyMap<number,ReadonlySet<number>>
            psmIds_UnionSelection_ExplicitSelectAll: boolean
            psmCount_after_Include: number
        }) {
        this.reportedPeptideId = reportedPeptideId
        this.psmCount_after_Include_Map_Key_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId
        this.psmIds_Include = psmIds_Include
        this.psmIds_IncludeSet_Map_Key_SearchSubGroupId = psmIds_IncludeSet_Map_Key_SearchSubGroupId
        this.psmIds_UnionSelection_ExplicitSelectAll = psmIds_UnionSelection_ExplicitSelectAll
        this.psmCount_after_Include = psmCount_after_Include
    }
}


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//   !!! Main Function


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
export const proteinExpmntPage_getReportedPeptideIdsForDisplay_SingleProjectSearchId = function (
    {
        not_filtered_position_modification_selections,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        searchSubGroup_Ids_Selected,  //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinSequenceWidget_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Wrapper,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        not_filtered_position_modification_selections: boolean
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        projectSearchId: number
        searchSubGroup_Ids_Selected : Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
        proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): {
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
} {

    if ( userSearchString_LocationsOn_ProteinSequence_Root
        && (!userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString)
        && ( ( ! userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries )
            || userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0 ) ) {
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

    const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
    if ( searchSubGroup_Ids_Selected && ( ! numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map ) ) {
        throw Error("searchSubGroup_Ids_Selected is populated: loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map(); not return a value")
    }

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    //  Use All reportedPeptideIds that meet cutoff unless proteinSequenceVersionId is passed in for Protein Page

    let reportedPeptideIds_All = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

    if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

        //  reportedPeptideIds for this proteinSequenceVersionId
        reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (!reportedPeptideIds_All) {
            //  No reported Peptides for this proteinSequenceVersionId for this project search id
            //  Return empty array
            return {    // EARLY RETURN
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(new Map())
            };
        }
    }

    if (not_filtered_position_modification_selections) {

        if ( searchSubGroup_Ids_Selected ) {
            console.warn("not_filtered_position_modification_selections is true. Ignoring value for searchSubGroup_Ids_Selected");
        }

        // Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

        for (const reportedPeptideId of reportedPeptideIds_All) {

            const numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
            if (numPsms === undefined || numPsms === null) {
                throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
            }

            let psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number,number> = undefined

            if ( searchSubGroup_Ids_Selected ) {

                const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId )
                if ( numPsmsFor_SearchSubGroupId === undefined ) {
                    throw Error("No value in numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map for reportedPeptideId: " + reportedPeptideId)
                }

                psmCount_after_Include_Map_Key_SearchSubGroupId = new Map()

                for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {
                    const numPsmsFor_This_SearchSubGroupId = numPsmsFor_SearchSubGroupId.get( searchSubGroup_Id )
                    if ( numPsmsFor_This_SearchSubGroupId ) {
                        psmCount_after_Include_Map_Key_SearchSubGroupId.set( searchSubGroup_Id, numPsmsFor_This_SearchSubGroupId );
                    }
                }
            }

            const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId,
                psmCount_after_Include: numPsms,
                psmCount_after_Include_Map_Key_SearchSubGroupId: psmCount_after_Include_Map_Key_SearchSubGroupId,
                psmIds_Include: undefined,
                psmIds_IncludeSet_Map_Key_SearchSubGroupId : undefined,
                psmIds_UnionSelection_ExplicitSelectAll: false,
            })
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry)
        }

        return {reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId};   // EARLY RETURN
    }

    let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined

    //  First build reportedPeptideIds_AndTheir_PSM_IDs... for all selection type "ANY" selections which are UNION together. Also based on searchSubGroup_Ids_Selected if populated
    //      If no ANY selections then start with All Reported Peptide Ids for Protein, also based on searchSubGroup_Ids_Selected if populated
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = proteinExpmntPage_get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together({
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ANY, // Select type ANY
            reportedPeptideIds_All,
            proteinSequenceVersionId,
            numPsmsForReportedPeptideIdMap,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            projectSearchId,
            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject
        });
    }

    //  Second, for all "NOT" selections remove those from the result from the ANY or from reportedPeptideIds_All created above
    {
        //  may return null
        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__NOT_Selection = proteinExpmntPage_get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together({
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.NOT, // Select type NOT
            reportedPeptideIds_All,
            proteinSequenceVersionId,
            numPsmsForReportedPeptideIdMap,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            projectSearchId,
            searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject
        });

        if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__NOT_Selection ) {

            //  HAVE NOT selected data to remove from the selected data

            proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__NOT_Selection,
                loadedDataPerProjectSearchIdHolder,
                projectSearchId
            });
        }
    }

    //  Third, for all "ALL" selections (explicit and implicit) take the Intersection of those with the result from the ANY or from reportedPeptideIds_All created above
    proteinExpmntPage_update_reportedPeptideIds_AndTheir_PSM_IDs__For_ALL_Selections__INTERSECTION_Together({
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinSequenceWidget_StateObject,
        proteinPositionFilter_UserSelections_StateObject_Wrapper,
        userSearchString_LocationsOn_ProteinSequence_Root
    });

    if ( searchSubGroup_Ids_Selected ) {

        //  Process for Selected Search Sub Groups

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            reportedPeptideIds_All,
            numPsmsForReportedPeptideIdMap,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId,
            searchSubGroup_Ids_Selected
        })
    }

    return {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    };
}


    ////////////////////////////////////////////
    ////////////////////////////////////////////
    ////////////////////////////////////////////


/**
 *
 *
 */
const _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
        reportedPeptideIds_All,
        numPsmsForReportedPeptideIdMap,
        loadedDataPerProjectSearchIdHolder,
        projectSearchId,
        searchSubGroup_Ids_Selected
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        reportedPeptideIds_All: Array<number>
        numPsmsForReportedPeptideIdMap: Map<number, number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
    if ( ! numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map ) {
        throw Error("searchSubGroup_Ids_Selected is populated: loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map(); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...)")
    }
    let subGroupIdMap_Key_PsmId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId()

    ///

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

    for ( const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ){

        const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId;
        let psmCount_after_Include = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmCount_after_Include;

        let psmIds_Include : Set<number> = undefined
        if ( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {
            psmIds_Include = new Set( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include );
        }

        let psmIds_IncludeSet_Map_Key_SearchSubGroupId : Map<number, Set<number>> = undefined;
        const psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number, number> = new Map();

        if ( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {

            // Split psmIds_Include on searchSubGroup_Ids_Selected

            if ( ! subGroupIdMap_Key_PsmId_KeyReportedPeptideId ) {
                throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId(); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). projectSearchId: " + projectSearchId );
            }

            const subGroupIdMap_Key_PsmId = subGroupIdMap_Key_PsmId_KeyReportedPeptideId.get( reportedPeptideId );
            if ( ! subGroupIdMap_Key_PsmId ) {
                throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: subGroupIdMap_Key_PsmId_KeyReportedPeptideId.get( reportedPeptideId ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId );
            }

            psmIds_IncludeSet_Map_Key_SearchSubGroupId = new Map();

            for ( const psmId_Include of reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {

                const subGroupId = subGroupIdMap_Key_PsmId.get( psmId_Include );
                if ( ! subGroupId === undefined ) {
                    throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: subGroupIdMap_Key_PsmId.get( psmId_Include ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). psmId_Include: " + psmId_Include + ", projectSearchId: " + projectSearchId );
                }

                if ( ! searchSubGroup_Ids_Selected.has( subGroupId ) ) {

                    //  subGroupId is not selected so skip record
                    continue;  // EARLY CONTINUE - Skip to next psmId_Include
                }

                let psmIds_IncludeSet = psmIds_IncludeSet_Map_Key_SearchSubGroupId.get( subGroupId );
                if ( ! psmIds_IncludeSet ) {
                    psmIds_IncludeSet = new Set();
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId.set( subGroupId, psmIds_IncludeSet );
                }
                psmIds_IncludeSet.add( psmId_Include );
            }

            if ( psmIds_IncludeSet_Map_Key_SearchSubGroupId.size === 0 ) {

                //  No psmIds_Include after filter on searchSubGroup_Ids_Selected so Skip Reported Peptide Id Entry

                continue;  // !!!  EARLY CONTINUE - Skip to next reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry
            }

            psmCount_after_Include = 0;

            for ( const mapEntry of psmIds_IncludeSet_Map_Key_SearchSubGroupId.entries() ) {

                const subGroupId = mapEntry[ 0 ];
                const psmIds_IncludeSet = mapEntry[ 1 ];

                psmCount_after_Include_Map_Key_SearchSubGroupId.set( subGroupId, psmIds_IncludeSet.size );

                psmCount_after_Include += psmIds_IncludeSet.size;
            }

        } else {

            const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId )
            if ( numPsmsFor_SearchSubGroupId === undefined ) {
                throw Error("No value in numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map for reportedPeptideId: " + reportedPeptideId)
            }

            psmCount_after_Include = 0;

            for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {
                const numPsmsFor_This_SearchSubGroupId = numPsmsFor_SearchSubGroupId.get( searchSubGroup_Id )
                if ( numPsmsFor_This_SearchSubGroupId ) {
                    psmCount_after_Include_Map_Key_SearchSubGroupId.set( searchSubGroup_Id, numPsmsFor_This_SearchSubGroupId );

                    psmCount_after_Include += numPsmsFor_This_SearchSubGroupId;
                }
            }
        }

        const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry_New = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
            reportedPeptideId,
            psmIds_Include,
            psmIds_IncludeSet_Map_Key_SearchSubGroupId : psmIds_IncludeSet_Map_Key_SearchSubGroupId,
            psmIds_UnionSelection_ExplicitSelectAll : reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_UnionSelection_ExplicitSelectAll,
            psmCount_after_Include,
            psmCount_after_Include_Map_Key_SearchSubGroupId
        })

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result.insert_Entry( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry_New );

    }

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result; //  Return new reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result
}


