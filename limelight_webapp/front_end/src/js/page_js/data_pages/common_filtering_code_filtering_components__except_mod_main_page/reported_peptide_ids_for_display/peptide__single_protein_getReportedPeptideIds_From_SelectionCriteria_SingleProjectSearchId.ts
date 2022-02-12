/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId.ts
 *
 * Javascript for protein_Experiment.jsp page - Get Reported Peptide Ids From Selection Criteria for a Single Project Search Id
 *
 * Selection Criteria:
 *  1) Variable and Static Modifications (and NO Variable Modifications as a part of this)
 *  2) Reporter Ions
 *  2) Search String(s) to search Peptide Sequences
 *  3) Protein Positions
 *
 * Companion file to Peptide and Single Protein
 *
 *
 * !!!!   WARNING:  Other functions re-create this data structure based on additional filtering:
 *
 *                      create_GeneratedReportedPeptideListData__SingleProtein(...)
 *
 */

import {ProteinView_LoadedDataCommonHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import {
    UserSearchString_LocationsOn_ProteinSequence_Root
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together";
import {peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together";

/**
 *
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    private _entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>

    constructor(entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>) {
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
    insert_Entry(entry: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId) : void {
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
    get_EntryFor_reportedPeptideId(reportedPeptideId: number): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {
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
    get_Entries_IterableIterator(): IterableIterator<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> {

        return this._entriesMap_KeyReportedPeptideId.values()
    }
}

//////////////////////////////
//////////////////////////////
//////////////////////////////

/**
 *
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId {

    readonly reportedPeptideId: number

    readonly psmIds_Include: ReadonlySet<number>
    readonly psmIds_IncludeSet_Map_Key_SearchSubGroupId: ReadonlyMap<number,ReadonlySet<number>>

    readonly psmCount_after_Include: number  //  Computed PSM Count after take into account Include and Exclude PSM Ids

    readonly psmCount_after_Include_Map_Key_SearchSubGroupId : ReadonlyMap<number,number>

    /**
     *
     */
    constructor(
        {
            reportedPeptideId, psmCount_after_Include_Map_Key_SearchSubGroupId,
            psmIds_Include, psmIds_IncludeSet_Map_Key_SearchSubGroupId,
            psmCount_after_Include
        }: {
            reportedPeptideId: number
            psmCount_after_Include_Map_Key_SearchSubGroupId? : ReadonlyMap<number,number>
            psmIds_Include: Set<number>
            psmIds_IncludeSet_Map_Key_SearchSubGroupId?: ReadonlyMap<number,ReadonlySet<number>>
            psmCount_after_Include: number
        }) {
        this.reportedPeptideId = reportedPeptideId
        this.psmCount_after_Include_Map_Key_SearchSubGroupId = psmCount_after_Include_Map_Key_SearchSubGroupId
        this.psmIds_Include = psmIds_Include
        this.psmIds_IncludeSet_Map_Key_SearchSubGroupId = psmIds_IncludeSet_Map_Key_SearchSubGroupId
        this.psmCount_after_Include = psmCount_after_Include
    }
}


//////////////////////
//////////////////////  INTERNAL class to ONLY the Filtering Code
//////////////////////


/**
 *  INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {
    result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
}

/**
 *  INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {


    private _noFilter_OR_FilterHasNoData: boolean  //  Particular Filter not passed in or Filter contains NO user entries

    private _includeAll_ReportedPeptideIds: boolean  //  When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)

    private _entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

    /**
     *
     * @param noFiltering - True when NO filtering applied for Single Filter or whole of OR or AND or NOT
     */
    constructor(
        {
            noFilter_OR_FilterHasNoData,  //  Particular Filter not passed in or Filter contains NO user entries
            includeAll_ReportedPeptideIds  //  When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)

        } : {
            noFilter_OR_FilterHasNoData: boolean  //  Particular Filter not passed in or Filter contains NO user entries
            includeAll_ReportedPeptideIds: boolean  //  When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)
        }
    ) {
        this._noFilter_OR_FilterHasNoData = noFilter_OR_FilterHasNoData;
        this._includeAll_ReportedPeptideIds = includeAll_ReportedPeptideIds;
    }

    clearAllEntries() : void {
        this._entriesMap_KeyReportedPeptideId.clear();
    }

    /**
     * Particular Filter not passed in or Filter contains NO user entries
     */
    is_noFilter_OR_FilterHasNoData() : boolean {
        return this._noFilter_OR_FilterHasNoData;
    }

    /**
     * When Filter applied, ALL Reported Peptide Ids are included (mostly from "Exclude" that excludes nothing)
     */
    is_includeAll_ReportedPeptideIds() : boolean {
        return this._includeAll_ReportedPeptideIds;
    }

    /**
     * Any per ReportedPeptideId entries
     */
    is_AnyEntries() : boolean {
        if ( this._entriesMap_KeyReportedPeptideId && this._entriesMap_KeyReportedPeptideId.size > 0 ) {
            return true;
        }
        return false;
    }

    /**
     * Get ReportedPeptideId entry from internal Map with key reportedPeptideId
     * @param reportedPeptideId
     */
    get_Entry_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._entriesMap_KeyReportedPeptideId.get( reportedPeptideId );
    }

    /**
     * Set ReportedPeptideId entry in internal Map with key entry.reportedPeptideId
     * @param entry
     */
    set_Entry_Using_entry_reportedPeptideId_AsKey( entry: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS ) : void {
        this._entriesMap_KeyReportedPeptideId.set( entry.reportedPeptideId, entry );
    }

    /**
     * Delete ReportedPeptideId entry from internal Map with key reportedPeptideId
     * @param reportedPeptideId
     */
    delete_Entry_For_ReportedPeptideId( reportedPeptideId: number ) {
        return this._entriesMap_KeyReportedPeptideId.delete( reportedPeptideId );
    }

    /**
     * get ReportedPeptideId entries iterator
     */
    get_Entries_IterableIterator(): IterableIterator<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS> {

        return this._entriesMap_KeyReportedPeptideId.values();
    }

    /**
     * get ReportedPeptideId entries iterator
     */
    get_Entries_Keys_ReportedPeptideIds() : IterableIterator<number> {

        return this._entriesMap_KeyReportedPeptideId.keys();
    }
}

/**
 * INTERNAL class to ONLY the Filtering Code
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS {

    reportedPeptideId: number

    psmIds_Include: Set<number>

    constructor(
        {
            reportedPeptideId,
            psmIds_Include
        } : {
            reportedPeptideId: number
            psmIds_Include: Set<number>
        }
    ) {
        this.reportedPeptideId = reportedPeptideId
        this.psmIds_Include = psmIds_Include;
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
 * 			reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
 * }
 *
 *
 */
export const peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId = function (
    {
        not_filtered_position_modification_selections,
        proteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        loadedDataCommonHolder,
        projectSearchId,
        searchSubGroup_Ids_Selected,  //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        modificationMass_UserSelections_StateObject,
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
        reporterIonMass_UserSelections_StateObject,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scan_RetentionTime_MZ_UserSelection_StateObject,
        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinSequenceWidget_StateObject,
        proteinPositionFilter_UserSelections_StateObject,
        userSearchString_LocationsOn_ProteinSequence_Root
    }: {
        not_filtered_position_modification_selections: boolean
        proteinSequenceVersionId: number
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        loadedDataCommonHolder: ProteinView_LoadedDataCommonHolder
        projectSearchId: number
        searchSubGroup_Ids_Selected : Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
    }): {
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
} {

    //  !!!!!!!!!!  TODO   WHAT IS THIS

    if ( userSearchString_LocationsOn_ProteinSequence_Root
        && (!userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString)
        && ( ( ! userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries )
            || userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0 ) ) {
        //  Have User Protein Sequence Search String but it is not found in the protein sequence
        //  Return empty array
        return {    // EARLY RETURN
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)
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

    let reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds();

    if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null ) {

        //  reportedPeptideIds for this proteinSequenceVersionId
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get(proteinSequenceVersionId);
        if (!reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {
            //  No reported Peptides for this proteinSequenceVersionId for this project search id
            //  Return empty array
            return {    // EARLY RETURN
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(new Map())
            };
        }
    }

    if (not_filtered_position_modification_selections) {

        ////   NOT Filtering

        if ( searchSubGroup_Ids_Selected ) {
            console.warn("not_filtered_position_modification_selections is true. Ignoring value for searchSubGroup_Ids_Selected");
        }

        // Force NOT Filtering based on User Selections - Used for download 'all' peptides and PSMs

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined)

        for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

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

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                reportedPeptideId,
                psmCount_after_Include: numPsms,
                psmCount_after_Include_Map_Key_SearchSubGroupId: psmCount_after_Include_Map_Key_SearchSubGroupId,
                psmIds_Include: undefined,
                psmIds_IncludeSet_Map_Key_SearchSubGroupId : undefined
            })
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.insert_Entry(entry)
        }

        return {reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId};   // EARLY RETURN
    }

    /////////

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = [];

    //   "ANY"/"OR" filtering
    {
        const result = peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together({
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ANY, // Select type ANY
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            projectSearchId,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject
        });
        if ( ! result ) {
            const msg = "result is null or undefined from peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together(...)";
            console.warn(msg);
            throw Error(msg);
        }
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array.push( result.result );
    }


    { //  "ALL"/"AND" - Explicit "ALL"/"AND" filtering
        const resultArray =
            peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
                proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder,
                projectSearchId,
                modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                reporterIonMass_UserSelections_StateObject,
            });

        for ( const result of resultArray ) {
            if ( ! result ) {
                const msg = "Element of resultArray is null or undefined from peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together(...)";
                console.warn(msg);
                throw Error(msg);
            }
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array.push( result.result );
        }
    }

    { //  "ALL"/"AND" - Explicit "ALL"/"AND" filtering
        const resultArray =
            peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together({
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
                proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
                loadedDataPerProjectSearchIdHolder,
                loadedDataCommonHolder,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelection_StateObject,
                peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject,
                proteinSequenceWidget_StateObject,
                proteinPositionFilter_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root
            });

        for ( const result of resultArray ) {
            if ( ! result ) {
                const msg = "Element of resultArray is null or undefined from peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together(...)";
                console.warn(msg);
                throw Error(msg);
            }
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array.push( result.result );
        }
    }

    //  This value will be replaced if there are any "NOT"/"EXCLUDE" User Selections
    let peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS =
        _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION({
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array
        });

    let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection = false;

    if ( ! peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_noFilter_OR_FilterHasNoData() ) {

        if ( ! peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_includeAll_ReportedPeptideIds() ) {

            if ( ! peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_AnyEntries() ) {

                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection = true;
            }

        }
    }

    if ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection ) {

        //  Executed since not empty selection

        //  Skip processing NOT if possible since may require more data from server

        //  "NOT" - For all "NOT" selections remove those from the result from the ANY or from reportedPeptideIds_All created above
        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__NOT_Selection = peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together({
            singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.NOT, // Select type NOT
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder,
            loadedDataCommonHolder,
            projectSearchId,
            modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject
        });

        if ( ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__NOT_Selection.result.is_noFilter_OR_FilterHasNoData() )
            && ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__NOT_Selection.result.is_includeAll_ReportedPeptideIds() ) ) {

            //  Everything is Excluded so replace with empty

            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
            });

        } else {

            if ( ( ! reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__NOT_Selection.result.is_noFilter_OR_FilterHasNoData() )
                && ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__NOT_Selection.result.is_AnyEntries() ) ) {

                //  Remove all exclusions

                peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final =
                    peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections({

                        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,

                        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS: peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,                     // Main Selected values

                        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__NOT_Selection:
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__NOT_Selection.result,       // NOT Selected values to remove

                        loadedDataPerProjectSearchIdHolder,
                        projectSearchId
                    });
            }
        }
    }

    // Convert to function return value:   Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId

    let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined;
    {
        const entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> = new Map()

        if ( peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_noFilter_OR_FilterHasNoData()
            || peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_includeAll_ReportedPeptideIds() ) {

            for ( const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {

                let numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                if (numPsms === undefined || numPsms === null) {
                    throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                }

                const result_For_ReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId,
                    psmCount_after_Include: numPsms,
                    psmCount_after_Include_Map_Key_SearchSubGroupId: undefined,
                    psmIds_Include: undefined,
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId: undefined
                });

                entriesMap_KeyReportedPeptideId.set(reportedPeptideId, result_For_ReportedPeptideId);
            }

        } else {

            for ( const entry of peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.get_Entries_IterableIterator() ) {

                const reportedPeptideId = entry.reportedPeptideId;
                const psmIds_Include = entry.psmIds_Include;

                let numPsms: number = undefined;

                if ( psmIds_Include ) {

                    numPsms = psmIds_Include.size;

                } else {
                    numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if (numPsms === undefined || numPsms === null) {
                        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                    }
                }

                const result_For_ReportedPeptideId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
                    reportedPeptideId,
                    psmIds_Include,
                    psmCount_after_Include: numPsms,
                    psmCount_after_Include_Map_Key_SearchSubGroupId: undefined,
                    psmIds_IncludeSet_Map_Key_SearchSubGroupId: undefined
                });

                entriesMap_KeyReportedPeptideId.set(reportedPeptideId, result_For_ReportedPeptideId);
            }

        }

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(entriesMap_KeyReportedPeptideId);
    }

    if ( searchSubGroup_Ids_Selected ) {

        //  Process for Selected Search Sub Groups.
        //
        //  Replace reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId with entries that only PSM Ids for searchSubGroup_Ids_Selected (Other PSM Ids are filtered out)

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected({
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
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
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
        loadedDataPerProjectSearchIdHolder,
        projectSearchId,
        searchSubGroup_Ids_Selected
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        loadedDataPerProjectSearchIdHolder: ProteinViewPage_LoadedDataPerProjectSearchIdHolder
        projectSearchId: number
        searchSubGroup_Ids_Selected : Set<number>; //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    const numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map = loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map();
    if ( ! numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map ) {
        throw Error("searchSubGroup_Ids_Selected is populated: loadedDataPerProjectSearchIdHolder.get_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map(); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...)")
    }
    const subGroupIdMap_Key_PsmId_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_subGroupIdMap_Key_PsmId_KeyReportedPeptideId();

    ///

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId(undefined);

    for ( const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ){

        const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId;
        let psmCount_after_Include = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmCount_after_Include;

        let psmIds_Include : Set<number> = undefined

        let psmIds_IncludeSet_Map_Key_SearchSubGroupId : Map<number, Set<number>> = undefined;
        const psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number, number> = new Map();

        if ( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {

            psmIds_Include = new Set();  // psmIds Filtered on Selected searchSubGroup_Ids_Selected

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

                psmIds_Include.add( psmId_Include );  //  add to new Set for overall for Reported Peptide Id
            }

            if ( psmIds_IncludeSet_Map_Key_SearchSubGroupId.size === 0 ) {

                //  No psmIds_Include after filter on searchSubGroup_Ids_Selected so Skip Reported Peptide Id Entry

                //   Skip to next reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry

                continue;  // !!!  EARLY CONTINUE - Skip to next reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry
            }

            psmCount_after_Include = 0;

            for ( const mapEntry of psmIds_IncludeSet_Map_Key_SearchSubGroupId.entries() ) {

                const subGroupId = mapEntry[ 0 ];
                const psmIds_IncludeSet_For_SubGroupId = mapEntry[ 1 ];

                psmCount_after_Include_Map_Key_SearchSubGroupId.set( subGroupId, psmIds_IncludeSet_For_SubGroupId.size );

                psmCount_after_Include += psmIds_IncludeSet_For_SubGroupId.size;
            }

        } else {

            //  reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include NOT populated

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

        if ( psmCount_after_Include === 0 ) {
            //  No longer have any PSMs so SKIP

            continue;  // EARLY CONTINUE
        }

        const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry_New = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId({
            reportedPeptideId,
            psmIds_Include,
            psmIds_IncludeSet_Map_Key_SearchSubGroupId : psmIds_IncludeSet_Map_Key_SearchSubGroupId,
            psmCount_after_Include,
            psmCount_after_Include_Map_Key_SearchSubGroupId
        })

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result.insert_Entry( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry_New );

    }

    return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result; //  Return new reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result
}



////////////

///   INTERSECTION

//    Merge Rules for merging INTERSECTION/ALL:

/**
 * Merge As INTERSECTION.
 *
 * Merge the "ALL"/"AND" entries with the single "ANY"/"OR" entry and apply the "NOT"/"EXCLUDE" entry
 *
 */
const _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION = function(
    {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,  //  Either for Search or if for Single Protein Id then for that Protein Id
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array,  //  To be combined using Intersection
    }: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: Array<number>
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>

    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {


    //  Check for any that are just undefined or null and throw Error

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry === undefined || entry === null ) {

            //  Found entry Not populated.  Problem with return statement that generated it.

            const msg = "Found ( entry === undefined || entry === null ) in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array in _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION";
            console.warn(msg);
            throw Error(msg);
        }
    }

    //  Some Optimization checks

    {  // Anything of the INTERSECTION is Empty, return Empty

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ( ! entry.is_noFilter_OR_FilterHasNoData() ) && ( ! entry.is_AnyEntries() ) ) {

                //  Found entry with filter data and no entries so return empty

                const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });

                return result; // EARLY RETURN
            }
        }
    }

    {  //  If ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

        let all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = true;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.is_noFilter_OR_FilterHasNoData() ) {

                all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE = false;
                break;
            }
        }

        if ( all_entries_have_is_noFilter_OR_FilterHasNoData_TRUE ) {

            ///  ALL entries have is_noFilter_OR_FilterHasNoData() true, then return new entry with is_noFilter_OR_FilterHasNoData() true

            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });

            return result; // EARLY RETURN
        }
    }
    {
        //  Check if all have ALL Reported Peptide Ids

        let allHave_is_includeAll_ReportedPeptideIds_TRUE = true;

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array ) {

            if ( ! entry.is_includeAll_ReportedPeptideIds() ) {
                allHave_is_includeAll_ReportedPeptideIds_TRUE = false;
                break;
            }
        }

        if ( allHave_is_includeAll_ReportedPeptideIds_TRUE ) {

            ///  ALL entries have is_includeAll_ReportedPeptideIds() true, then return new entry with is_includeAll_ReportedPeptideIds() true

            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: true
            });

            return result; // EARLY RETURN
        }
    }

    //  Start Computing INTERSECTION of values

    //  Filter reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array to exclude entry.is_noFilter_OR_FilterHasNoData() and entry.is_includeAll_ReportedPeptideIds()

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.is_noFilter_OR_FilterHasNoData() ) {

            continue; // EARLY CONTINUE
        }

        if ( entry.is_includeAll_ReportedPeptideIds() ) {

            //  Skip Include ALL since also have other than Include All

            continue; // EARLY CONTINUE
        }

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered.push( entry );
    }

    if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered.length === 0 ) {

        const msg = "( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered.length === 0 )";
        console.warn(msg);
        throw Error(msg);
    }

    //  Get Reported Peptide Ids

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered_FirstElement = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered[0];

    let reportedPeptideIds_FromAny_ArrayEntry = Array.from(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered_FirstElement.get_Entries_Keys_ReportedPeptideIds());

    //  Intersection by reported peptide id.  Intersection of PSM Ids

    const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for ( const reportedPeptideId of reportedPeptideIds_FromAny_ArrayEntry ) {

        let reportedPeptideId_FoundInAll_Entries = true;
        const psmIds_Set_Array : Array<Set<number>> = []; // Only for entries with PSM Ids

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Array_Filtered ) {

            const entry_For_ReportedPeptideId = entry.get_Entry_For_ReportedPeptideId( reportedPeptideId );
            if ( ! entry_For_ReportedPeptideId ) {
                reportedPeptideId_FoundInAll_Entries = false;
                break;
            }

            if ( entry_For_ReportedPeptideId.psmIds_Include ) {
                psmIds_Set_Array.push( entry_For_ReportedPeptideId.psmIds_Include );
            }
        }

        if ( ! reportedPeptideId_FoundInAll_Entries ) {
            //  Not found in all entries so skip

            continue; // EARLY CONTINUE
        }

        if ( psmIds_Set_Array.length === 0 ) {

            //  No entries have psmIds_Include so output not have it either.

            const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId : reportedPeptideId,
                psmIds_Include : undefined
            });

            result.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);

            continue; // EARLY CONTINUE
        }

        //  Intersection of PSM Ids

        const psmIds_Include_Result = new Set<number>();

        const psmIds_Set_Array_FirstEntry = psmIds_Set_Array[0];

        for ( const psmId of psmIds_Set_Array_FirstEntry ) {

            let psmId_FoundInAll_Entries = true;

            for ( const psmIds_Set_Array_Entry of psmIds_Set_Array ) {
                if ( ! psmIds_Set_Array_Entry.has( psmId ) ) {

                    psmId_FoundInAll_Entries = false;
                    break;
                }
            }

            if ( psmId_FoundInAll_Entries ) {
                psmIds_Include_Result.add(psmId);
            }
        }

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmIds_Include : psmIds_Include_Result
        });

        result.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    return result;
}
