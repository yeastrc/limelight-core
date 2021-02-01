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
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";

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


/**
 *
 */
export class ProteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId {

    private _proteinSequenceVersionId: number;  //  NOT populated for Peptide page
    private _loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder;
    private _proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject;
    private _modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject;
    private _reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject;
    private _peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
    private _peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject 
    private _userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root;
    private _proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper

    /**
     *
     */
    constructor(
        {
            proteinSequenceVersionId,  //  NOT populated for Peptide page
            loadedDataCommonHolder,
            proteinSequenceWidget_StateObject,
            modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject,   //  May Be undefined (currently for experiment protein page)
            peptideSequence_UserSelections_StateObject, 
            userSearchString_LocationsOn_ProteinSequence_Root,
            proteinPositionFilter_UserSelections_StateObject_Wrapper  // ONLY populated on Peptide Page
        }: {
            proteinSequenceVersionId: number,
            loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder,
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject,
            modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject 
            userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
            proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
        }) {

        this._proteinSequenceVersionId = proteinSequenceVersionId;
        this._loadedDataCommonHolder = loadedDataCommonHolder;
        this._proteinSequenceWidget_StateObject = proteinSequenceWidget_StateObject;
        this._modificationMass_UserSelections_StateObject = modificationMass_UserSelections_StateObject;
        this._reporterIonMass_UserSelections_StateObject = reporterIonMass_UserSelections_StateObject;
        this._peptideUnique_UserSelection_StateObject = peptideUnique_UserSelection_StateObject;
        this._peptideSequence_UserSelections_StateObject = peptideSequence_UserSelections_StateObject;
        this._userSearchString_LocationsOn_ProteinSequence_Root = userSearchString_LocationsOn_ProteinSequence_Root;
        this._proteinPositionFilter_UserSelections_StateObject_Wrapper = proteinPositionFilter_UserSelections_StateObject_Wrapper;
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
    getReportedPeptideIdsForDisplay_SingleProjectSearchId(
        {
            not_filtered_position_modification_selections,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId,
            searchSubGroup_Ids_Selected  //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        }: {
            not_filtered_position_modification_selections: boolean,
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
            projectSearchId: number
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        }): {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
    } {

        // console.warn("getReportedPeptideIdsForDisplay_SingleProjectSearchId: searchSubGroup_Ids_Selected: ", searchSubGroup_Ids_Selected )

        if ( this._userSearchString_LocationsOn_ProteinSequence_Root
            && (!this._userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString)
            && ( ( ! this._userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries )
                || this._userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0 ) ) {
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

        if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {

            //  reportedPeptideIds for this proteinSequenceVersionId
            reportedPeptideIds_All = reportedPeptideIdsKeyProteinSequenceVersionId.get(this._proteinSequenceVersionId);
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
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = this._get_reportedPeptideIds_AndTheir_PSM_IDs__For_ANY_Selections__UNION_Together({
                reportedPeptideIds_All,
                numPsmsForReportedPeptideIdMap,
                loadedDataPerProjectSearchIdHolder,
                projectSearchId,
                searchSubGroup_Ids_Selected
            })
        }

        //  Second, for all "ALL" selections (explicit and implicit) take the Intersection of those with the result from the ANY or from reportedPeptideIds_All created above
        this._update_reportedPeptideIds_AndTheir_PSM_IDs__For_ALL_Selections__INTERSECTION_Together({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        });

        if ( searchSubGroup_Ids_Selected ) {

            //  Process for Selected Search Sub Groups

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = this._update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected({
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
    _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected (
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

            // reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId
            // reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include
            // reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_IncludeSet_Map_Key_SearchSubGroupId
            // reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_UnionSelection_ExplicitSelectAll
            // reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmCount_after_Include_Map_Key_SearchSubGroupId
            // reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmCount_after_Include

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
            projectSearchId,
            searchSubGroup_Ids_Selected //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        }: {
            reportedPeptideIds_All: Array<number>
            numPsmsForReportedPeptideIdMap: Map<number, number>
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            projectSearchId: number
            searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
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
            //  NO "ANY" selections so return all Reported Peptide Ids for this search, also based on searchSubGroup_Ids_Selected if populated

            const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
            if ( searchSubGroup_Ids_Selected && ( ! numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map ) ) {
                throw Error("searchSubGroup_Ids_Selected is populated: loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map(); not return a value")
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

            for ( const reportedPeptideId of reportedPeptideIds_All ) {

                let numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsms === undefined || numPsms === null) {
                    throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                }

                let psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId : Map<number,number> = undefined;

                if ( searchSubGroup_Ids_Selected ) {

                    numPsms = 0;  //  Reset since will be total for searchSubGroup_Ids_Selected

                    const numPsmsFor_SearchSubGroupId = numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map.get( reportedPeptideId )
                    if ( numPsmsFor_SearchSubGroupId === undefined ) {
                        throw Error("No value in numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map for reportedPeptideId: " + reportedPeptideId)
                    }

                    psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId = new Map();

                    for ( const searchSubGroup_Id of searchSubGroup_Ids_Selected ) {
                        const numPsmsFor_This_SearchSubGroupId = numPsmsFor_SearchSubGroupId.get( searchSubGroup_Id );
                        if ( numPsmsFor_This_SearchSubGroupId ) {
                            psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId.set( searchSubGroup_Id, numPsmsFor_This_SearchSubGroupId );

                            numPsms += numPsmsFor_This_SearchSubGroupId;
                        }
                    }

                    if ( psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId.size === 0 ) {

                        // Found NO PSMs for Selected Search Sub Group Ids so skip this entry

                        continue;  // EARLY CONTINUE
                    }
                }
                const entry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId,
                    psmCount_after_Include: numPsms,
                    psmCount_after_Include_Map_Key_SearchSubGroupId: psmCount_NO_PsmId_Filtering_Map_Key_SearchSubGroupId,
                    psmIds_Include: undefined,
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId : undefined,
                    psmIds_UnionSelection_ExplicitSelectAll: false,
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
                loadedDataPerProjectSearchIdHolder,
                projectSearchId
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
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY__StaticModifications(
        {
            loadedDataPerProjectSearchIdHolder
        }: {
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        if ( this._proteinSequenceVersionId === undefined || this._proteinSequenceVersionId === null ) {

            //  For processing with NO _proteinSequenceVersionId

            return this._getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId({ loadedDataPerProjectSearchIdHolder });

        } else {

            return this._getFor__SelectionType_ANY__StaticModifications__Have_proteinSequenceVersionId({ loadedDataPerProjectSearchIdHolder });
        }

    }

    /**
     * Get for Static Modification mass Selection Type ANY.  NOT proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId(
        {
            loadedDataPerProjectSearchIdHolder
        }: {
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined); // Build set of filtered reportedPeptideIds

        if ( ! loadedDataPerProjectSearchIdHolder.get_staticMods() ) {
            throw Error(" ( ! loadedDataPerProjectSearchIdHolder.get_staticMods() )  _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId " );
        }

        const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();

        for ( const staticModEntry of  loadedDataPerProjectSearchIdHolder.get_staticMods() ) {

            const residueLetter = staticModEntry.residue
            const mass = staticModEntry.mass;

            const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

            const selectionEntry = this._modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                residueLetter,
                modMass: massForPositionForComparison
            });
            if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY) {

                const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

                //  The Peptide Search Strings will be used to search the protein sequence.
                //  Reported Peptides will be selected where their Protein Coverage records fully contain
                //     the locations of the search strings on the protein sequence.

                //  The amino acid letters I and L will be equivalent.

                const residueLetter_I_To_L = residueLetter.replace(findAll_I_Regex, 'L');
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.add(residueLetter_I_To_L);
            }
        }

        if ( staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size === 0 ) {

            //  No Static mods that meet filters so return null
            return null; // EARLY RETURN
        }

        let reportedPeptideIds_ContainStaticMod : Set<number> = undefined;

        {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

            const getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
            if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data ) {

                const staticModSearch_ANY_CachedResults = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_ANY_CachedResults;
                if ( staticModSearch_ANY_CachedResults ) {

                    const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached = staticModSearch_ANY_CachedResults.staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor;

                    //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                    if ( staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.size === staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size ) {

                        let currentAndCachedContentsSame = true;
                        for ( const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor ) {
                            if ( ! staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.has( staticMod_residueLetter ) ) {
                                currentAndCachedContentsSame = false;
                                break;
                            }
                        }
                        if ( currentAndCachedContentsSame ) {
                            //  Search data same as cached so re-use cached data
                            reportedPeptideIds_ContainStaticMod = staticModSearch_ANY_CachedResults.reportedPeptideIds_ContainStaticMod;
                        }
                    }
                }
            }
        }

        if ( ! reportedPeptideIds_ContainStaticMod ) {

            reportedPeptideIds_ContainStaticMod = new Set();

            for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ) {

                const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error( "peptideId not found for reportedPeptideId. _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId )
                }
                const peptideSequenceString_I_To_L = this._loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
                if ( peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null ) {
                    throw Error( "peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId )
                }

                for ( const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor ) {

                    if ( peptideSequenceString_I_To_L.includes( staticMod_residueLetter ) ) {
                        reportedPeptideIds_ContainStaticMod.add( reportedPeptideId );
                        break;
                    }
                }
            }

            let getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
            if ( ! getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data ) {
                getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = {};
                loadedDataPerProjectSearchIdHolder.set_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data( getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data );
            }

            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_ANY_CachedResults = {
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
                reportedPeptideIds_ContainStaticMod
            }
        }

        if ( reportedPeptideIds_ContainStaticMod.size === 0 ) {

            return null;
        }

        for ( const reportedPeptideId of reportedPeptideIds_ContainStaticMod ) {

            const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
        }

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId;
    }

    /**
     * Get for Static Modification mass Selection Type ANY.  Have proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ANY__StaticModifications__Have_proteinSequenceVersionId(
        {
            loadedDataPerProjectSearchIdHolder
        }: {
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        //  Create Set of protein positions and then call _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) with those positions

        const proteinsPositionsToGetReportedPeptideIdsFor = new Set<number>();

            //  For processing with YES _proteinSequenceVersionId

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

                const mass = massForPosition;

                const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

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

        if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {

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

                        const mass = modificationOnProtein.mass;

                        const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                        const selectEntry = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                        if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ANY) {

                            const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                        }
                    }
                }
            }
        } else {

            //  NO this._proteinSequenceVersionId

            if ( loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() ) {
                for ( const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry of loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId().entries() ) {

                    const dynamicModifications_Entries = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry[ 1 ];
                    for ( const dynamicModifications_Entry of dynamicModifications_Entries ) {

                        const reportedPeptideId = dynamicModifications_Entry.reportedPeptideId

                        if (!reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId(reportedPeptideId)) {

                            //  Not already in Result so process it

                            const mass = dynamicModifications_Entry.mass;

                            const massForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                            const selectEntry = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(massForComparison)
                            if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ANY) {

                                const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);
                            }
                        }
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
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        } : {
            reportedPeptideIds_All : Array<number>
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            projectSearchId: number // for error logging
        }) {

        const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

        //  All PSM IDs for each reported peptide id for current cutoffs
        const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        for ( const reportedPeptideId of reportedPeptideIds_All ) {

            const openModificationsForReportedPeptide = openModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
            if ( ! openModificationsForReportedPeptide ) {
                //  No Open Modification for reportedPeptideId so add whole reportedPeptideId to result

                //  Delete any existing entry that may may have a PSM Includes Set
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                const entry = _create__ForSingleReportedPeptideId__For_ReportedPeptideId_numPSMsAllForReportedPeptideId({reportedPeptideId, loadedDataPerProjectSearchIdHolder})
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry);

            } else {
                //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

                const numPsmsForReportedPeptideId = numPsmsForReportedPeptideIdMap.get( reportedPeptideId );
                const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
                if ( numPsmsForReportedPeptideId && psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId ) {
                    if (numPsmsForReportedPeptideId === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size) {

                        //  All PSM IDs for reportedPeptideId have Open Mods so skip processing

                    } else {

                        //  Create a Set of PSM IDs for reportedPeptideId that are NOT in psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass

                        const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get( reportedPeptideId );
                        if ( ! psmIdsForReportedPeptideId ) {
                            const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                            console.warn( msg )
                            throw Error( msg )
                        }

                        const psmIds_NOT_Containing_AnyOpenModificationMass = new Set<number>( psmIdsForReportedPeptideId );

                        //  Remove psmId that contains open mod mass
                        for ( const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass ) {
                            psmIds_NOT_Containing_AnyOpenModificationMass.delete( psmId_ContainAnyOpenModificationMass );
                        }

                        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
                        if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry ) {

                            //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
                            const newEntry = _merge_new_psmIds_Include_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                                entry : reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                                psmIds_Include : psmIds_NOT_Containing_AnyOpenModificationMass,
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
                                psmIds_Include : psmIds_NOT_Containing_AnyOpenModificationMass,
                                psmIds_UnionSelection_ExplicitSelectAll : false,
                                psmCount_after_Include: psmCount_after_Include_Exclude
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

        let reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

        if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {
            reportedPeptideIds = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId().get(this._proteinSequenceVersionId);
        }

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();
        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        const psmIdsSet_Map_Key_ReportedPeptideId : Map<number, Set<number>> = new Map();

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected

        for ( const reportedPeptideId of reportedPeptideIds ) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
            if ( psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object ) {

                const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

                for ( const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries() ) {

                    const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[ 1 ];
                    const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                    const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

                    const selectionEntry = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry( openModificationMass_Rounded )
                    if (  selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ANY ) {

                        //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

                        let psmIdsSet = psmIdsSet_Map_Key_ReportedPeptideId.get( reportedPeptideId )
                        if ( ! psmIdsSet ) {
                            psmIdsSet = new Set()
                            psmIdsSet_Map_Key_ReportedPeptideId.set( reportedPeptideId, psmIdsSet )
                        }
                        for ( const psmId of psmIds_Set ) {
                            psmIdsSet.add(psmId)
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
                    psmIds_UnionSelection_ExplicitSelectAll: false,
                    psmCount_after_Include: psmIds_Include.size
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

                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass );  // Call external function

                    const selectionEntry = this._reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry( reporterIonMass_Rounded )
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
                    psmIds_UnionSelection_ExplicitSelectAll: false,
                    psmCount_after_Include: psmIds_For_SelectedReporterIonMasses.size
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
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
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
        let is_peptideUniqueSelected = false;
        if ( this._peptideUnique_UserSelection_StateObject && this._peptideUnique_UserSelection_StateObject.getPeptideUnique() ) {
            is_peptideUniqueSelected = true;
        }

        let is_UserSearchString = false;
        if ( this._peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() ) {
            is_UserSearchString = true;
        }

        let is_proteinPositionFilter_PeptidePage = false;
        if (  this._proteinPositionFilter_UserSelections_StateObject_Wrapper
            && this._proteinPositionFilter_UserSelections_StateObject_Wrapper.isAnySelections() ) {
            is_proteinPositionFilter_PeptidePage = true;
        }

        let is_Any_selectedProteinSequencePosition = false;
        if ( this._proteinSequenceWidget_StateObject ) {
            is_Any_selectedProteinSequencePosition = this._proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition()
        }

        if ((!is_Any_StaticModification_Selected__SelectionType__ALL)
            && (!is_Any_VariableModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection)
            && (!is_Any_OpenModification__ALL__Modification_Selected_Excludes_UnmodifiedSelection)
            && (!is_Any_ReporterIons_Selected__SelectionType__ALL)
            && (!is_VariableModification_Unmodified___SelectionType__ALL__Selected)
            && (!is_OpenModification_Unmodified___SelectionType__ALL__Selected)
            && (!is_peptideUniqueSelected)
            && (!is_UserSearchString)
            && (!is_proteinPositionFilter_PeptidePage)
            && (!is_Any_selectedProteinSequencePosition)
        ) {
            //  NO "ALL" selections so exit without any changes

            return;  //  EARLY RETURN
        }

        //  Have at least one "ALL" type selection so create INTERSECTION of the 'ALL" selections which is all Intersection with results of "ANY" selection

        if ( is_Any_StaticModification_Selected__SelectionType__ALL ) {  //  Static Mod ALL selections

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

        if ( is_OpenModification_Unmodified___SelectionType__ALL__Selected ) { // 'unmodified' ANY  in the Open Modification mass filter section

            this._updateFor__SelectionType_ALL___For__Unmodified_Selected_In_OpenModificationMassSection({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder, projectSearchId
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
        if ( is_peptideUniqueSelected ) {
            this._updateFor_peptideUniqueSelected({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            })
        }

        if ( is_UserSearchString ) {
            this._updateFor__UserSearchString({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });
        }

        if ( is_proteinPositionFilter_PeptidePage ) {
            this._updateFor_is_proteinPositionFilter_PeptidePage({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            })
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

        if ( this._proteinSequenceVersionId === undefined || this._proteinSequenceVersionId === null ) {

            //  For processing with NO _proteinSequenceVersionId

            this._getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId({ reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder });

        } else {

            this._getFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId({ reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder });
        }


    }

    /**
     * Get for Static Modification mass Selection Type ALL.  NOT proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        }): void {

        if ( ! loadedDataPerProjectSearchIdHolder.get_staticMods() ) {
            console.warn(" ( ! loadedDataPerProjectSearchIdHolder.get_staticMods() )  _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId " );
            //  No Static mods so remove all entries and return
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()
            return;  //  EARLY EXIT
        }

        const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();

        for ( const staticModEntry of  loadedDataPerProjectSearchIdHolder.get_staticMods() ) {

            const residueLetter = staticModEntry.residue
            const mass = staticModEntry.mass;

            const massForPositionForComparison = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

            const selectionEntry = this._modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                residueLetter,
                modMass: massForPositionForComparison
            });
            if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

                //  The Peptide Search Strings will be used to search the protein sequence.
                //  Reported Peptides will be selected where their Protein Coverage records fully contain
                //     the locations of the search strings on the protein sequence.

                //  The amino acid letters I and L will be equivalent.

                const residueLetter_I_To_L = residueLetter.replace(findAll_I_Regex, 'L');
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.add(residueLetter_I_To_L);
            }
        }

        if ( staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size === 0 ) {

            //  No Static mods that meet filters so remove all entries and return
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.clearAllEntries()

            return; // EARLY RETURN
        }

        let reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod : Set<number> = undefined;

        {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

            const getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
            if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data ) {

                const staticModSearch_ALL_CachedResults = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_ALL_CachedResults;
                if ( staticModSearch_ALL_CachedResults ) {

                    const staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached = staticModSearch_ALL_CachedResults.staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor;
                    //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                    if ( staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.size === staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor.size ) {

                        let currentAndCachedContentsSame = true;
                        for ( const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor ) {
                            if ( ! staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached.has( staticMod_residueLetter ) ) {
                                currentAndCachedContentsSame = false;
                                break;
                            }
                        }
                        if ( currentAndCachedContentsSame ) {
                            //  Search data same as cached so re-use cached data
                            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = staticModSearch_ALL_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod;
                        }
                    }
                }
            }
        }

        if ( ! reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod ) {

            reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod = new Set();

            // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

            for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ) {

                const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error( "peptideId not found for reportedPeptideId. _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId )
                }
                const peptideSequenceString_I_To_L = this._loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
                if ( peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null ) {
                    throw Error( "peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId )
                }

                for ( const staticMod_residueLetter of staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor ) {

                    if ( peptideSequenceString_I_To_L.includes( staticMod_residueLetter ) ) {
                        reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.add( reportedPeptideId );
                        break;
                    }
                }
            }

            let getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
            if ( ! getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data ) {
                getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = {};
                loadedDataPerProjectSearchIdHolder.set_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data( getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data );
            }

            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.staticModSearch_ANY_CachedResults = {
                staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor,
                reportedPeptideIds_ContainStaticMod: reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod
            }
        }

        //////

        const reportedPeptideIds_Copy = Array.from( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() );

        for ( const reportedPeptideId of reportedPeptideIds_Copy ) {

            if ( ! reportedPeptideIds_SearchedAllAtCutoffs_ContainStaticMod.has( reportedPeptideId ) ) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId );
            }
        }
    }

    /**
     * Get for Static Modification mass Selection Type ALL.  HAVE proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__SelectionType_ALL__StaticModifications__Have_proteinSequenceVersionId(
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

                for ( const massSelected of  entry_Value_MassesSet ) {

                    const massSelected_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: massSelected});

                    accumulate_proteinPositions_Key_ModMass.set(massSelected_Rounded, new Set())
                }
            }
        }

        //  Search through Static Masses per position to get positions
        for (const staticModificationsOnProteinEntry of staticModificationsOnProtein.entries()) {

            const position = staticModificationsOnProteinEntry[0];
            const staticModificationsAtPosition = staticModificationsOnProteinEntry[1];

            const residueLetter = staticModificationsAtPosition.residue

            for (const massForPosition of staticModificationsAtPosition.massesSet) {

                const massForPosition_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: massForPosition});

                const selectionEntry = this._modificationMass_UserSelections_StateObject.get_StaticModification_Selected({
                    residueLetter,
                    modMass: massForPosition_Rounded
                });
                if (selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                    const accumulate_proteinPositions_Key_ModMass = accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter)
                    if (!accumulate_proteinPositions_Key_ModMass) {
                        const msg = "accumulate_proteinPositions_Key_ModMass_Key_ResidueLetter.get(residueLetter) not return a value for residueLetter: " + residueLetter
                        console.warn( msg )
                        throw Error( msg )
                    }
                    const accumulate_proteinPositions = accumulate_proteinPositions_Key_ModMass.get( massForPosition_Rounded )
                    if (!accumulate_proteinPositions_Key_ModMass) {
                        const msg = "accumulate_proteinPositions_Key_ModMass.get( massForPositionForComparison ) not return a value for massForPosition_Rounded: " +
                            massForPosition_Rounded + ",  residueLetter: " + residueLetter
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

        const reportedPeptideIdsMap_Key_VariableModMass = new Map<number,Set<number>>()

        if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {

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

                    let mass = modificationOnProtein.mass;

                    const mass_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                    const selectEntry = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(mass_Rounded);
                    if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                        let reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get( mass_Rounded );
                        if ( ! reportedPeptideIdsMapEntry ) {
                            reportedPeptideIdsMapEntry = new Set<number>();
                            reportedPeptideIdsMap_Key_VariableModMass.set( mass_Rounded, reportedPeptideIdsMapEntry );
                        }
                        reportedPeptideIdsMapEntry.add( reportedPeptideId );
                    }
                }
            }
        } else {

            //  NO this._proteinSequenceVersionId

            if ( loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId() ) {
                for ( const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry of loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId().entries() ) {

                    const dynamicModifications_Entries = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId_Entry[ 1 ];
                    for ( const dynamicModifications_Entry of dynamicModifications_Entries ) {

                        const reportedPeptideId = dynamicModifications_Entry.reportedPeptideId

                        let mass = dynamicModifications_Entry.mass;

                        const mass_Rounded = _roundModificationMass_ReturnNumber_LocalFunction({mass: mass});

                        const selectEntry = this._modificationMass_UserSelections_StateObject.get_VariableModificationSelections().get_Modification_Selected_Entry(mass_Rounded);
                        if (selectEntry && selectEntry.selectionType === SingleProtein_Filter_SelectionType.ALL) {

                            let reportedPeptideIdsMapEntry = reportedPeptideIdsMap_Key_VariableModMass.get( mass_Rounded );
                            if ( ! reportedPeptideIdsMapEntry ) {
                                reportedPeptideIdsMapEntry = new Set<number>();
                                reportedPeptideIdsMap_Key_VariableModMass.set( mass_Rounded, reportedPeptideIdsMapEntry );
                            }
                            reportedPeptideIdsMapEntry.add( reportedPeptideId );
                        }
                    }
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
            loadedDataPerProjectSearchIdHolder,
            projectSearchId
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
            projectSearchId: number // for error logging
        }): void {

        // const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

        //  All PSM IDs for each reported peptide id for current cutoffs
        const psmIdsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_psmIdsForReportedPeptideIdMap();

        const existing_reportedPeptideIds_All = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds())

        for ( const reportedPeptideId of existing_reportedPeptideIds_All ) {

            const psmIdsForReportedPeptideId = psmIdsForReportedPeptideIdMap.get( reportedPeptideId );
            if ( ! psmIdsForReportedPeptideId ) {
                const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + projectSearchId
                console.warn( msg )
                throw Error( msg )
            }

            const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId );
            if ( ( ! psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId )
                || psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size === 0 ) {
                //  No Open Modification for reportedPeptideId so nothing needs to happen to entry for reportedPeptideId

            } else {
                //  Have at least one Open Modification for reportedPeptideId so Add reportedPeptideId and exclude PSM Ids that have Open Modifications

                //  Get Existing entry
                const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_EntryFor_reportedPeptideId( reportedPeptideId )
                if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry ) {

                    //  NO Existing Entry so skip
                } else {
                    //  Process Existing Entry for this filter

                    if (psmIdsForReportedPeptideId.length === psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass.size) {
                        //  All PSM IDs for reportedPeptideId have Open Mods so remove reportedPeptideId entry
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)

                    } else {
                        //  Remove PSM IDs that have Open Modifications

                        let psmIncludes_New: Set<number> = undefined;

                        if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry.psmIds_Include) {
                            psmIncludes_New = new Set(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry.psmIds_Include)
                        } else {
                            psmIncludes_New = new Set(psmIdsForReportedPeptideId);
                        }

                        for (const psmId_ContainAnyOpenModificationMass of psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideId.psmIds_ContainAnyOpenModificationMass) {
                            psmIncludes_New.delete(psmId_ContainAnyOpenModificationMass);
                        }

                        //  Merge existing entry for reportedPeptideId with new PSM Ids to Include
                        const {newEntry, deleteEntry} = _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                            entry: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Entry,
                            psmIds_Include: psmIncludes_New
                        })
                        if (deleteEntry) {
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId(reportedPeptideId)
                        }
                        if (newEntry) {
                            //  Have new entry so insert it
                            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(newEntry);
                        }
                    }
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

        const psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs = loadedDataPerProjectSearchIdHolder.get_psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs();

        const numPsmsForReportedPeptideIdMap = loadedDataPerProjectSearchIdHolder.get_numPsmsForReportedPeptideIdMap();

        if ( this._proteinSequenceVersionId !== undefined && this._proteinSequenceVersionId !== null ) {

            const openModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnProtein_KeyProteinSequenceVersionId();
            const openModificationsOnProtein = openModificationsOnProtein_KeyProteinSequenceVersionId.get( this._proteinSequenceVersionId );

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
        }

        const psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded : Map<number, Map<number, Set<number>>> = new Map();

        //  Add to reportedPeptideIds_ToAddTo_Set any reported peptide ids with modification masses that are selected

        for ( const reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() ) {

            const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object = psmOpenModificationMasses_PsmIdSet_Per_RoundedMass_ForReportedPeptideIdMap_CurrentCutoffs.get( reportedPeptideId )
            if ( psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object ) {

                const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Object.openModificationMass_RoundedMap

                for ( const psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry of psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass.entries() ) {

                    const psmOpenModificationMasses_PsmIdSet = psmOpenModificationMasses_PsmIdSet_Map_Key_RoundedMass_Entry[ 1 ];
                    const openModificationMass_Rounded = psmOpenModificationMasses_PsmIdSet.openModificationMass_Rounded
                    const psmIds_Set = psmOpenModificationMasses_PsmIdSet.psmIds_Set;

                    const selectionEntry = this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_Modification_Selected_Entry( openModificationMass_Rounded )
                    if (  selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {

                        //  Since found in selection, confirm that there are actually PSMs with that selected rounded Open Modification Mass

                        let psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get( openModificationMass_Rounded );
                        if ( ! psmIdsSet_Map_Key_ReportedPeptideId ) {
                            psmIdsSet_Map_Key_ReportedPeptideId = new Map();
                            psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.set( openModificationMass_Rounded, psmIdsSet_Map_Key_ReportedPeptideId )
                        }
                        let psmIdsSet = psmIdsSet_Map_Key_ReportedPeptideId.get( reportedPeptideId )
                        if ( ! psmIdsSet ) {
                            psmIdsSet = new Set()
                            psmIdsSet_Map_Key_ReportedPeptideId.set( reportedPeptideId, psmIdsSet )
                        }
                        for ( const psmId of psmIds_Set ) {
                            psmIdsSet.add(psmId)
                        }
                    }
                }
            }
        }

        const selectedModificationMasses = new Set( this._modificationMass_UserSelections_StateObject.get_OpenModificationSelections().get_ModificationsSelected__OnlyModMasses_Only__ALL_SelectionType_AsSet() )

        for ( const selectedModificationMass of selectedModificationMasses ) {

            //  Intersection applied for each entry of selectedModificationMasses

            const psmIdsSet_Map_Key_ReportedPeptideId = psmIdsSet_Map_Key_ReportedPeptideId_Key_MassRounded.get( selectedModificationMass )

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
                    psmIds_Include : mapEntry_perReportedPeptideId_psmIds_Include
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

                    const reporterIonMass_Rounded = reporterIonMass_CommonRounding_ReturnNumber( reporterIonMass );  // Call external function

                    const selectionEntry = this._reporterIonMass_UserSelections_StateObject.get_ReporterIon_Selected_Entry( reporterIonMass_Rounded )
                    if ( selectionEntry && selectionEntry.selectionType === SingleProtein_Filter_SelectionType.ALL ) {

                        let psmIdsSet = psmIdsSet_Key_SelectedReporterIonMasses.get( reporterIonMass_Rounded )
                        if ( ! psmIdsSet ) {
                            psmIdsSet = new Set<number>()
                            psmIdsSet_Key_SelectedReporterIonMasses.set( reporterIonMass_Rounded, psmIdsSet )
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
                    psmIds_Include
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
     * User has selected 'Filter On Unique Peptides:'
     *
     */
    private _updateFor_peptideUniqueSelected(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        const proteinSequenceVersionIdsKeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinSequenceVersionIdsKeyReportedPeptideId()

        const existing_reportedPeptideIds = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() )
        for ( const existing_reportedPeptideId of existing_reportedPeptideIds ) {

            const proteinSequenceVersionIds_For_ReportedPeptideId = proteinSequenceVersionIdsKeyReportedPeptideId.get( existing_reportedPeptideId );
            if ( ! proteinSequenceVersionIds_For_ReportedPeptideId ) {
                throw Error("_updateFor_peptideUniqueSelected: proteinSequenceVersionIdsKeyReportedPeptideId.get( existing_reportedPeptideId ); returned nothing existing_reportedPeptideId: " + existing_reportedPeptideId )
            }
            if ( proteinSequenceVersionIds_For_ReportedPeptideId.length > 1 ) {
                //  Peptide is not unique
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( existing_reportedPeptideId )
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

        if ( this._proteinSequenceVersionId === undefined || this._proteinSequenceVersionId === null ) {

            //  For processing with NO _proteinSequenceVersionId

            this._updateFor__UserSearchString__NOT_Have_proteinSequenceVersionId({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder
            });

        } else {

            this._updateFor__UserSearchString_Have_proteinSequenceVersionId({ reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId, loadedDataPerProjectSearchIdHolder });
        }
    }

    /**
     * Get for Static Modification mass Selection Type ANY.  NOT proteinSequenceVersionId value
     *
     * User has selected entry(s) in the Static Modification mass filter section
     *
     * Uses this._getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _updateFor__UserSearchString__NOT_Have_proteinSequenceVersionId(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {


        const searchStrings = this._peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

        if ( searchStrings === undefined || searchStrings === null || searchStrings.length === 0 ) {
            // Not searching for anything so exit
            return;  // EARLY RETURN
        }

        const searchStrings_Set__ToGetReportedPeptideIdsFor : Set<string> = new Set( searchStrings );

        let reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString : Set<number> = undefined;

        {  //  ONLY use cached results IF staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor matches cached results

            const getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
            if ( getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data ) {

                const userSearchString_CachedResults = getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.userSearchString_CachedResults;
                if ( userSearchString_CachedResults ) {

                    const searchStrings_Set__ToGetReportedPeptideIdsFor_Cached = userSearchString_CachedResults.searchStrings_Set__ToGetReportedPeptideIdsFor;
                    //  compare staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor_Cached to local staticMod_residueLetters_I_To_L__ToGetReportedPeptideIdsFor

                    if ( searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.size === searchStrings_Set__ToGetReportedPeptideIdsFor.size ) {

                        let currentAndCachedContentsSame = true;
                        for ( const searchString of searchStrings_Set__ToGetReportedPeptideIdsFor ) {
                            if ( ! searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.has( searchString ) ) {
                                currentAndCachedContentsSame = false;
                                break;
                            }
                        }
                        if ( currentAndCachedContentsSame ) {
                            //  Search data same as cached so re-use cached data
                            reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = userSearchString_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString;
                        }
                    }
                }
            }
        }

        if ( ! reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString ) {

            const searchStrings_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();
            {
                const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

                //  The Peptide Search Strings will be used to search the protein sequence.
                //  Reported Peptides will be selected where their Protein Coverage records fully contain
                //     the locations of the search strings on the protein sequence.

                //  The amino acid letters I and L will be equivalent.

                for ( const searchString of searchStrings ) {

                    if ( searchString && ( searchString !== "" ) ) {  //  Skip searchString === ""

                        const searchStringUpperCase = searchString.toLocaleUpperCase();
                        const searchString_UpperCase_I_to_L = searchStringUpperCase.replace( findAll_I_Regex, "L" );
                        searchStrings_I_To_L__ToGetReportedPeptideIdsFor.add( searchString_UpperCase_I_to_L );
                    }
                }
            }

            reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = new Set();

            // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

            for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds() ) {

                const peptideId = loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId({reportedPeptideId});
                if ( peptideId === undefined || peptideId === null ) {
                    throw Error( "peptideId not found for reportedPeptideId. _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId )
                }
                const peptideSequenceString_I_To_L = this._loadedDataCommonHolder.get_peptideSequenceString_I_To_L_For_peptideId({peptideId})
                if ( peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null ) {
                    throw Error( "peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ANY__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId )
                }

                for ( const searchString_I_To_L of searchStrings_I_To_L__ToGetReportedPeptideIdsFor ) {

                    if ( peptideSequenceString_I_To_L.includes( searchString_I_To_L ) ) {
                        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.add( reportedPeptideId );
                        break;
                    }
                }
            }

            let getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = loadedDataPerProjectSearchIdHolder.get_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data();
            if ( ! getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data ) {
                getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data = {};
                loadedDataPerProjectSearchIdHolder.set_getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data( getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data );
            }

            getReportedPeptideIdsForDisplay_SingleProjectSearchId__Cached_data.userSearchString_CachedResults = {
                searchStrings_Set__ToGetReportedPeptideIdsFor,
                reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString
            }
        }

        //////

        const reportedPeptideIds_Copy = Array.from( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() );

        for ( const reportedPeptideId of reportedPeptideIds_Copy ) {

            if ( ! reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.has( reportedPeptideId ) ) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId );
            }
        }
    }

    /**
     * User has entered Protein Sequence "Filter On Peptide:" to filter on
     *
     */
    private _updateFor__UserSearchString_Have_proteinSequenceVersionId(
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
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids
     *
     */
    private _updateFor_is_proteinPositionFilter_PeptidePage(
        {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            loadedDataPerProjectSearchIdHolder
        }: {
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        }): void {

        if ( ! this._proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges() ) {
            const msg = "_updateFor_is_proteinPositionFilter_PeptidePage(...): this._proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges(); returned nothing";
            console.warn(msg)
            throw Error(msg)
        }
        const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = this._proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId;
        if ( ! proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId ) {
            const msg = "_updateFor_is_proteinPositionFilter_PeptidePage(...): this._proteinPositionFilter_UserSelections_StateObject_Wrapper.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId; returned nothing";
            console.warn(msg)
            throw Error(msg)
        }
        const proteinCoverage_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId();
        if ( ! proteinCoverage_KeyReportedPeptideId ) {
            throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyReportedPeptideId(); returned nothing")
        }

        const existing_reportedPeptideIds = new Set( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_reportedPeptideIds() )

        for ( const reportedPeptideId of existing_reportedPeptideIds ) {

            const proteinCoverage_Entries_For_ReportedPeptideId = proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId );
            if ( ! proteinCoverage_Entries_For_ReportedPeptideId ) {
                throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing")
            }

            let found_proteinCoverage_Entry_For_ProteinPositionFilter = false;

            for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

                const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
                if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                    //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                    continue; // EARLY CONTINUE
                }

                if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                    // Filter selection is Full Protein
                    found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                    break;  // BREAK LOOP
                }

                if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {
                    throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries contains nothing")
                }
                if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0 ) {
                    throw Error("_updateFor_is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries empty array")
                }

                const proteinPositionFilter_UserSelections_RangeEntries = proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries;
                for ( const proteinPositionFilter_UserSelections_RangeEntry of proteinPositionFilter_UserSelections_RangeEntries ) {

                    const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                    const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                    //  x1 <= y2 && y1 <= x2
                    if ( selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End  ) { // coverage entry overlaps select range
                        found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                        break
                    }
                }
            }

            if ( ! found_proteinCoverage_Entry_For_ProteinPositionFilter ) {
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.delete_EntryFor_reportedPeptideId( reportedPeptideId )
            }
        }
    }

    /**
     * User has selected Protein Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
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
     * User has selected Protein Positions
     */
    private _getReportedPeptideIdsForDisplay_ProteinPositionsSelected(
        {
            selectedProteinSequencePositions,
            loadedDataPerProjectSearchIdHolder
        }: {
            selectedProteinSequencePositions: Set<number>
            loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder

        }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

        if ( this._proteinSequenceVersionId === undefined || this._proteinSequenceVersionId === null ) {
            const msg = "_getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...): this._proteinSequenceVersionId MUST be assigned a value.  is undefined or null";
            console.warn( msg );
            throw Error(msg);
        }

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
        psmCount_after_Include: numPsms,
        psmIds_Include: undefined,
        psmIds_UnionSelection_ExplicitSelectAll: false
    })

    return entry;
}

////////////

///   UNION to support "ANY"

//    Merge Rules for merging UNION/ANY:

/**
 * Merge in contents of psmIds_Include As UNION to support "ANY" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * @return new value or null if no chnages
 */
const _merge_new_psmIds_Include_As_UNION__For_ANY___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Include, numPsmsForReportedPeptideId
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Include: Set<number>
        numPsmsForReportedPeptideId: number

    }): ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    if (psmIds_Include.size === 0) {
        // NO Changes
        return null; // EARLY RETURN
    }

    if ( ! entry.psmIds_Include ) {
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
    let psmIds_UnionSelection_ExplicitSelectAll = false

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

    let psmCount_after_Include = 0;
    if ( new_psmIds_Include ) {
        psmCount_after_Include = new_psmIds_Include.size
    } else {
        psmCount_after_Include = numPsmsForReportedPeptideId
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_UnionSelection_ExplicitSelectAll,
        psmCount_after_Include: psmCount_after_Include
    })

    return newEntry
}

////////////

///   INTERSECTION to support "ALL"

//    Merge Rules for merging INTERSECTION/ALL:

/**
 * Merge in contents of psmIds_Include As INTERSECTION to support "ALL" to existing entry.  Used for selection of Open Modification and Reporter Ion Masses
 *
 * When have existing Exclude, to add Include, remove Exclude and update the Include to remove any entries that were in the Exclude
 *
 * @return newEntry === null if no changes
 */
const _merge_new_psmIds_Include_As_INTERSECTION__For_ALL___To_ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId = function(
    {
        entry, psmIds_Include
    }: {

        entry: ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId
        psmIds_Include: Set<number>

    }): {
    newEntry : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId,
    deleteEntry : boolean
} {

    if (psmIds_Include.size === 0) {
        //  No PSM IDs are now included so remove entry
        return { newEntry : null, deleteEntry : true }; // EARLY RETURN
    }

    let new_psmIds_Include : Set<number> = undefined

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

    let psmCount_after_Include_Exclude = new_psmIds_Include.size

    if (psmCount_after_Include_Exclude === 0) {
        //  No PSM IDs are now included so remove entry
        return {newEntry: null, deleteEntry: true}; // EARLY RETURN
    }

    const newEntry = new ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
        reportedPeptideId : entry.reportedPeptideId,
        psmIds_Include : new_psmIds_Include,
        psmIds_UnionSelection_ExplicitSelectAll : false,
        psmCount_after_Include: psmCount_after_Include_Exclude
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