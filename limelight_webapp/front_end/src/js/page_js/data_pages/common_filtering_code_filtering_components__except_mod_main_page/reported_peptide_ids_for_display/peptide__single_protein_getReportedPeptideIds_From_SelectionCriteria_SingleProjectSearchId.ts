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

import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';
import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject'

import {UserSearchString_LocationsOn_ProteinSequence_Root} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {SingleProtein_Filter_SelectionType} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_SingleProtein_Filter_Enums";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType,
    CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections";
import {CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters";
import {Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together";
import {Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections__For_ModificationSelections";
import {Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_For_ANY_OR_Selections__For_ReporterIonSelections";


/////////   Returned Classes

/**
 *
 */
export class Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId {

    private _projectSearchId: number
    private _entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>

    constructor(
        {
            projectSearchId, entriesMap_KeyReportedPeptideId
        } : {
            projectSearchId: number
            entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId>
        }) {
        this._projectSearchId = projectSearchId;
        if (entriesMap_KeyReportedPeptideId) {
            this._entriesMap_KeyReportedPeptideId = entriesMap_KeyReportedPeptideId
        } else {
            this._entriesMap_KeyReportedPeptideId = new Map()
        }
    }

    get_projectSearchId() {
        return this._projectSearchId;
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
    promise: Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
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

///////////////

//  Class for input parameters to main method on main class

class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters {

    not_filtered_position_modification_selections: boolean
    dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
    proteinSequenceVersionId: number
    searchSubGroup_Ids_Selected: Set<number> //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
    modificationMass_UserSelections_StateObject: ModificationMass_UserSelections_StateObject
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject: ReporterIonMass_UserSelections_StateObject
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject: Scan_RetentionTime_MZ_UserSelections_StateObject
    peptideUnique_UserSelection_StateObject: PeptideUnique_UserSelection_StateObject;
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
    peptideSequence_UserSelections_StateObject: PeptideSequence_UserSelections_StateObject
    peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
    proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
    proteinPositionFilter_UserSelections_StateObject: ProteinPositionFilter_UserSelections_StateObject
    userSearchString_LocationsOn_ProteinSequence_Root: UserSearchString_LocationsOn_ProteinSequence_Root
}


///////////////


//  Class for contents of returned from main method on main class

export class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class {
    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId
}

//  Class for returned from main method on main class

class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {
    data: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class
    promise: Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>
}

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//   !!! Main Class


/**
 * ONLY Instantiate in class GetReportedPeptideIdsForDisplay_AllProjectSearchIds
 */
export class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /////  OR/ANY processing

    //  Separate instances for OR/ANY and EXCLUDE/NOT since data is cached in the instances

    ///   Modifications

    /**
     * for OR/ANY processing
     */
    private _for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections

    /**
     * for EXCLUDE/NOT processing
     */
    private _for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections

    ///   Reporter Ions

    /**
     * for OR/ANY processing
     */
    private _for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections

    /**
     * for EXCLUDE/NOT processing
     */
    private _for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections: Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections

    /////
    //   ALL/AND Processing

    /**
     *  ALL/AND processing - Explicit.
     */
    private _peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class: Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class

    /**
     * ALL/AND processing - Implicit
     */
    private _peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class: Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId;

        this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections =
            Peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class =
            Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class.getNewInstance({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            })

        this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class =
            Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class.getNewInstance(({
                projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            }))
    }

    /**
     * !!!!!!!!!!!  ONLY Instantiate in class GetReportedPeptideIdsForDisplay_AllProjectSearchIds
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        return new GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });
    }


    /**
     * !!!!!!!!!!!   Main Function / Method in class.  This is the external access point to code in this class   !!!!!!!!!!!!!!!!!!!
     *
     *
     * Get Reported Peptide Ids to display (or download).  Also called from parent/owner class for download of PSMs of shown Reported Peptides
     *
     * @param not_filtered_position_modification_selections - true if not filtering on user selections.  For download all
     *
     * @returns class GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class
     *
     *
     */
    peptide__single_protein_getReportedPeptideIdsForDisplay_SingleProjectSearchId(
        functionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters

    ): GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

            //  !!!!!!!!!!  TODO   WHAT IS THIS,   Likely an optimization on Single Protein Overlay when user enters sequence that is not in the protein

        if ((!functionParams.not_filtered_position_modification_selections)
            && functionParams.userSearchString_LocationsOn_ProteinSequence_Root
            && (!functionParams.userSearchString_LocationsOn_ProteinSequence_Root.noUserSearchString)
            && ((!functionParams.userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries)
                || functionParams.userSearchString_LocationsOn_ProteinSequence_Root.userSearchString_LocationsOn_ProteinSequence_Entries.length === 0)) {
            //  Have User Protein Sequence Search String but it is not found in the protein sequence
            //  Return empty array
            return {    // EARLY RETURN
                data: {
                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                        projectSearchId: this._projectSearchId, entriesMap_KeyReportedPeptideId: undefined
                    })
                },
                promise: undefined
            };
        }

        //  Get Top level data and then call this._processing_TopLevel(...) to process it

        const result_processing_TopLevel__GetData = _processing_TopLevel__GetData({
            mainfunctionParams: functionParams,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
        if ( result_processing_TopLevel__GetData.result ) {
            const result_processing_TopLevel = this._processing_TopLevel__WithData({
                mainfunctionParams: functionParams,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: result_processing_TopLevel__GetData.result.reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                dataPage_common_Flags_SingleSearch: functionParams.dataPage_common_Flags_SingleSearch
            })
            return result_processing_TopLevel;  //  EARLY RETURN

        } else if ( result_processing_TopLevel__GetData.promise ) {

            return {          //  EARLY RETURN
                data: undefined,
                promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                    result_processing_TopLevel__GetData.promise.catch(reason => {reject(reason)})
                    result_processing_TopLevel__GetData.promise.then(topLevelData => {try {
                        const result_processing_TopLevel = this._processing_TopLevel__WithData({
                            mainfunctionParams: functionParams,
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: topLevelData.reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                            dataPage_common_Flags_SingleSearch: functionParams.dataPage_common_Flags_SingleSearch
                        })
                        if ( result_processing_TopLevel.data ) {
                            resolve( result_processing_TopLevel.data );  //   resolve
                        } else if ( result_processing_TopLevel.promise ) {
                            result_processing_TopLevel.promise.catch(reason => { reject(reason) })
                            result_processing_TopLevel.promise.then(processing_TopLevel_Value => {try {
                                resolve(processing_TopLevel_Value);  //  resolve
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } else {
                            throw Error("result_processing_TopLevel no data or promise")
                        }
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                })
            }
        } else {
            throw Error("result_processing_TopLevel__GetData no result or promise")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * Top level processing.
     *
     * Create the combined (ANY, ALL, NOT) AKA (OR,AND,EXCLUDE)  and then convert to final output (populating Sub search data as needed)
     */
    private _processing_TopLevel__WithData(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            dataPage_common_Flags_SingleSearch
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch

        }) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        const result_create__Combined__OR_AND_EXCLUDE = this._create__Combined__OR_AND_EXCLUDE({
            mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId, dataPage_common_Flags_SingleSearch
        })
        if ( result_create__Combined__OR_AND_EXCLUDE.result ) {

            return this._convertToFinalResult({
                mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: result_create__Combined__OR_AND_EXCLUDE.result
            })
        } else if ( result_create__Combined__OR_AND_EXCLUDE.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => { try {
                result_create__Combined__OR_AND_EXCLUDE.promise.catch(reason => { reject(reason)})
                result_create__Combined__OR_AND_EXCLUDE.promise.then(value_result_create__Combined__OR_AND_EXCLUDE => {try {
                    const result_convertToFinalResult = this._convertToFinalResult({
                        mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: value_result_create__Combined__OR_AND_EXCLUDE
                    })
                    if ( result_convertToFinalResult.data ) {
                        resolve(result_convertToFinalResult.data)
                    } else if ( result_convertToFinalResult.promise ) {
                        result_convertToFinalResult.promise.catch(reason => { reject(reason)})
                        result_convertToFinalResult.promise.then(value_result_convertToFinalResult => {try {
                            resolve(value_result_convertToFinalResult)
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } else {
                        throw Error("result_convertToFinalResult no data or promise")
                    }
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}) }
        } else {
            throw Error("result_create__Combined__OR_AND_EXCLUDE no result or promise")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * Create the combined (OR,AND,EXCLUDE) AKA (ANY, ALL, NOT)
     */
    private _create__Combined__OR_AND_EXCLUDE(
        {
            mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId, dataPage_common_Flags_SingleSearch
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
        }
    ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( mainfunctionParams.not_filtered_position_modification_selections ) {

            //  NO Filtering requested by calling function (likely for "Download All"

            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: true
            });

            return { promise: undefined, result } //  EARLY RETURN
        }

        const OR_AND_Result = this._create__Combined__OR_AND({
            mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId, dataPage_common_Flags_SingleSearch
        })

        const merge__EXCLUDE_AKA_NOT__Result = this._process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___Process_Result_Promise__From__OR_AND__Result({
            OR_AND_Result,
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
        })

        return merge__EXCLUDE_AKA_NOT__Result;
    }

    /**
     * Create the combined (OR,AND) AKA (ANY, ALL)
     */
    private _create__Combined__OR_AND(
        {
            mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId, dataPage_common_Flags_SingleSearch
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
        }
    ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        /////////

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        //   "ANY"/"OR" filtering   Modifications
        {
            const result =
                this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ModificationSelections({
                singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ANY, // Select type ANY
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                proteinSequenceVersionId: mainfunctionParams.proteinSequenceVersionId,
                modificationMass_UserSelections_StateObject: mainfunctionParams.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: mainfunctionParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });
            if (!result) {
                const msg = "result is null or undefined from peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together(...)";
                console.warn(msg);
                throw Error(msg);
            }
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
        }

        //   "ANY"/"OR" filtering   Reporter Ions
        {
            const result =
                this._for_OR_ANY_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ReporterIonSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.ANY, // Select type ANY
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    reporterIonMass_UserSelections_StateObject: mainfunctionParams.reporterIonMass_UserSelections_StateObject
                });
            if (!result) {
                const msg = "result is null or undefined from peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together(...)";
                console.warn(msg);
                throw Error(msg);
            }
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
        }



        { //  "ALL"/"AND" - Explicit "ALL"/"AND" filtering
            const resultArray =
                this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together_Class.
                peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together({
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
                    proteinSequenceVersionId: mainfunctionParams.proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
                    modificationMass_UserSelections_StateObject: mainfunctionParams.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: mainfunctionParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject: mainfunctionParams.reporterIonMass_UserSelections_StateObject,
                });

            for (const result of resultArray) {
                if (!result) {
                    const msg = "Element of resultArray is null or undefined from peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Explicit__ALL_AND__Selections__INTERSECTION_Together(...)";
                    console.warn(msg);
                    throw Error(msg);
                }
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
            }
        }

        { //  "ALL"/"AND" - Explicit "ALL"/"AND" filtering
            const resultArray =
                this._peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class.
                peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together({
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,    //  NOT (always) Used when proteinSequenceVersionId is populated
                    proteinSequenceVersionId: mainfunctionParams.proteinSequenceVersionId,  //  OPTIONAL - Restrict results to this proteinSequenceVersionId
                    dataPage_common_Flags_SingleSearch,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: mainfunctionParams.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: mainfunctionParams.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: mainfunctionParams.psm_Charge_Filter_UserSelection_StateObject,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: mainfunctionParams.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject: mainfunctionParams.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject: mainfunctionParams.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject: mainfunctionParams.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    proteinSequenceWidget_StateObject: mainfunctionParams.proteinSequenceWidget_StateObject,
                    proteinPositionFilter_UserSelections_StateObject: mainfunctionParams.proteinPositionFilter_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root: mainfunctionParams.userSearchString_LocationsOn_ProteinSequence_Root,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: mainfunctionParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                });

            for (const result of resultArray) {
                if (!result) {
                    const msg = "Element of resultArray is null or undefined from peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together(...)";
                    console.warn(msg);
                    throw Error(msg);
                }
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push(result);
            }
        }

        //  The Data result returned will be replaced if there are any "NOT"/"EXCLUDE" User Selections
        const merge__INTERSECTION__Result =
            _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
            });

        return merge__INTERSECTION__Result;
    }

    /////////////////////////////////

    ////   Apply EXCLUDE/NOT selections  (next few functions/methods)

    /**
     *
     * @param OR_AND_Result  --  From OR/AND selections
     * @param mainfunctionParams
     * @param numPsmsForReportedPeptideIdMap
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @private
     */
    private _process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___Process_Result_Promise__From__OR_AND__Result(
        {
            OR_AND_Result,
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
        } : {
            OR_AND_Result: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
        }
    ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( OR_AND_Result.result )  {

            const result_From_Not_Exclude = this._process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___DoActualExclude({
                mainfunctionParams,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                OR_AND_Results: OR_AND_Result.result,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId,
            })

            return result_From_Not_Exclude;

        } else if ( OR_AND_Result.promise ) {

            const promise_Result = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
                try {
                    OR_AND_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    OR_AND_Result.promise.then(value => {
                        try {
                            const result_From_Not_Exclude = this._process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___DoActualExclude({
                                mainfunctionParams,
                                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                                OR_AND_Results: value,
                                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId,
                            })

                            if ( result_From_Not_Exclude.result ) {

                                resolve(result_From_Not_Exclude.result)  //  EARLY RETURN

                            } else if ( result_From_Not_Exclude.promise ) {

                                result_From_Not_Exclude.promise.catch(reason => {
                                    reject(reason)
                                })
                                result_From_Not_Exclude.promise.then(value => {
                                    try {
                                        resolve(value);

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                })
                            } else {
                                throw Error("result_From_Not_Exclude: no 'data' or 'promise'")
                            }

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })

            return { promise: promise_Result, result: undefined }

        } else {
            const msg = "OR_AND_Result no 'data' or 'promise'";
            console.warn(msg)
            throw Error(msg)
        }

    }

    /**
     * Actual   EXCLUDE processing
     *
     * @param mainfunctionParams
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _process_OR_AND__Result__Apply__EXCLUDE_AKA_NOT__UserSelectionsIfPresent___DoActualExclude(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            OR_AND_Results,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        } ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        //  First an optimization,  Skip processing EXCLUDE if possible since may require more data from server.

        let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection = false;

        if (!OR_AND_Results.is_noFilter_OR_FilterHasNoData()) {

            if (!OR_AND_Results.is_includeAll_ReportedPeptideIds()) {

                if (!OR_AND_Results.is_AnyEntries()) {

                    reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection = true;
                }
            }
        }

        if (reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Final__EmptySelection) {

            //  Nothing in the input so return it.  Nothing from (OR/AND) processing.  EARLY RETURN

            return {    // EARLY RETURN
                result: OR_AND_Results,
                promise: undefined
            };
        }

        //  Execute following since not empty selection

        const NOT_Selection_Results__FUNCTION_RESULT__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = []

        {  //  "NOT" - For all "NOT" Modifications selections
            const NOT_Selection_Results__Modifications =
                this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ModificationSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ModificationSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.NOT, // Select type NOT
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    proteinSequenceVersionId: mainfunctionParams.proteinSequenceVersionId,
                    modificationMass_UserSelections_StateObject: mainfunctionParams.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: mainfunctionParams.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
                });

            NOT_Selection_Results__FUNCTION_RESULT__Array.push( NOT_Selection_Results__Modifications )
        }

        {  //  "NOT" - For all "NOT" Reporter Ion selections
            const NOT_Selection_Results =
                this._for_EXCLUDE_NOT_Processing__peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together_Class__For_ReporterIonSelections.
                peptide__single_protein_get_reportedPeptideIds_AndTheir_PSM_IDs__For__ANY_OR__Selections__UNION_Together__For_ReporterIonSelections({
                    singleProtein_Filter_SelectionType_Requested: SingleProtein_Filter_SelectionType.NOT, // Select type NOT
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    reporterIonMass_UserSelections_StateObject: mainfunctionParams.reporterIonMass_UserSelections_StateObject
                });

            NOT_Selection_Results__FUNCTION_RESULT__Array.push( NOT_Selection_Results )
        }

        return this._removeEntries_for_NOT_EXCLUDE_Selections({
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            OR_AND_Results,
            NOT_Selection_Results__FUNCTION_RESULT__Array,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }


    /**
     *
     * @param mainfunctionParams
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param OR_AND_Results
     * @param NOT_Selection_Results
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     * @private
     */
    private _removeEntries_for_NOT_EXCLUDE_Selections(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            OR_AND_Results,
            NOT_Selection_Results__FUNCTION_RESULT__Array,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            NOT_Selection_Results__FUNCTION_RESULT__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        } ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        const promises: Array<Promise<void>> = []

        const NOT_Selection_Results_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

        for ( const result__FUNCTION_RESULT of NOT_Selection_Results__FUNCTION_RESULT__Array ) {
            if ( result__FUNCTION_RESULT.result ) {
                NOT_Selection_Results_Array.push( result__FUNCTION_RESULT.result )
            } else if ( result__FUNCTION_RESULT.promise ) {
                const promise = new Promise<void>((resolve, reject) => {
                    try {
                        result__FUNCTION_RESULT.promise.catch(reason => reject(reason))
                        result__FUNCTION_RESULT.promise.then(value_result__FUNCTION_RESULT => {
                            try {
                                NOT_Selection_Results_Array.push( value_result__FUNCTION_RESULT )
                                resolve()
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        })
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                })
                promises.push(promise)
            } else {
                throw Error("result__FUNCTION_RESULT NO .result or .promise")
            }
        }

        if ( promises.length === 0 ) {

            const result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises = this._removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises({
                mainfunctionParams,
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                OR_AND_Results,    // ANY and AND Selected values
                NOT_Selection_Results_Array,       // NOT Selected values to remove
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

            return result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise_Return = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {
            try {
                promises_All.catch(reason => {
                    reject(reason)
                })
                promises_All.then(noValue => {
                    try {
                        const result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises = this._removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises({
                            mainfunctionParams,
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                            OR_AND_Results,    // ANY and AND Selected values
                            NOT_Selection_Results_Array,       // NOT Selected values to remove
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
                        });

                        if ( result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.result ) {
                            resolve(result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.result)
                        } else if ( result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.promise ) {
                            result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.promise.catch(reason => reject(reason))
                            result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises.promise.then(value_result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises => {
                                try {
                                    resolve(value_result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises)

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            })
                        } else {
                            throw Error("result_removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises no .result or .promise")
                        }
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
        return { result: undefined, promise: promise_Return }
    }

    /**
     *
     * @param mainfunctionParams
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param OR_AND_Results
     * @param NOT_Selection_Results
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     * @private
     */
    private _removeEntries_for_NOT_EXCLUDE_Selections__AFTER_ResolvePromises(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            OR_AND_Results,
            NOT_Selection_Results_Array,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            OR_AND_Results: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            NOT_Selection_Results_Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        } ) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        let nothingIsExcluded = true;

        for ( const NOT_Selection_Results of NOT_Selection_Results_Array ) {

            if ( ( ! NOT_Selection_Results.is_noFilter_OR_FilterHasNoData() ) && ( NOT_Selection_Results.is_includeAll_ReportedPeptideIds() ) ) {

                //  Everything is Excluded so return empty

                const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                    noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
                });
                return { result, promise: undefined }  //  EARLY RETURN

            } else {
                if ( ( ! NOT_Selection_Results.is_noFilter_OR_FilterHasNoData() ) && ( NOT_Selection_Results.is_AnyEntries() ) ) {

                    //  Something is excluded

                    nothingIsExcluded = false;
                }
            }
        }

        if ( nothingIsExcluded ) {  //  Nothing to delete so return input

            return {  promise: undefined, result: OR_AND_Results }  //  EARLY RETURN
        }

        //  Remove all exclusions

        const resultsAfterRemoval =
            peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_RemoveFor_NOT_Selections({

                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,

                OR_AND_Results,   // OR and AND Selected values

                NOT_Selection_Results_Array,    // NOT Selected values to remove

                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

        return resultsAfterRemoval;
    }

    ///////////////////

    /**
     * @param mainfunctionParams
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _convertToFinalResult(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final:
                Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
        } ) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        const result_convertToFinalResult_MainPart = this._convertToFinalResult_MainPart({
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final
        })

        // Next add Search Sub Group data, if needed

        if ( result_convertToFinalResult_MainPart.data ) {
            const result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids = this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data({
                finalResultFormat__Input: result_convertToFinalResult_MainPart.data,
                mainfunctionParams
            })
            //  Return if has data or has promise
            return result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids;  // !!  EARLY RETURN
        } else if ( result_convertToFinalResult_MainPart.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {try {
                    result_convertToFinalResult_MainPart.promise.catch(reason => { reject(reason)})
                    result_convertToFinalResult_MainPart.promise.then(value_result_convertToFinalResult_MainPart => { try {
                        const result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids = this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data({
                            finalResultFormat__Input: value_result_convertToFinalResult_MainPart,
                            mainfunctionParams
                        })
                        if ( result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.data ) {
                            resolve(result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.data);  //    !! resolve
                        } else if ( result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.promise ) {
                            result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.promise.catch(reason => { reject(reason)})
                            result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids.promise.then(value_result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids => { try {
                                resolve(value_result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids) //   !! resolve
                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                        } else {
                            throw Error("result_createNew_FinalResult__FilterOn_SearchSubGroup_Ids no data or promise")
                        }
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("result_convertToFinalResult_MainPart no data or promise")
        }
    }

    /**
     * @param mainfunctionParams
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _convertToFinalResult_MainPart(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS

        } ) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        const result__convertToFinalResult_MainPart__GetData = _convertToFinalResult_MainPart__GetData({
            mainfunctionParams, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })

        if ( result__convertToFinalResult_MainPart__GetData.result ) {
            return { promise: undefined, data: this._convertToFinalResult_MainPart_WithData({
                    mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                    peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,
                    numPsmsForReportedPeptideIdMap: result__convertToFinalResult_MainPart__GetData.result.numPsmsForReportedPeptideIdMap
            }) }
        } else if ( result__convertToFinalResult_MainPart__GetData.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                result__convertToFinalResult_MainPart__GetData.promise.catch(reason => { reject(reason)})
                result__convertToFinalResult_MainPart__GetData.promise.then(value_result__convertToFinalResult_MainPart__GetData => { try {
                    const result_convertToFinalResult_MainPart_WithData = this._convertToFinalResult_MainPart_WithData({
                        mainfunctionParams, reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
                        peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,
                        numPsmsForReportedPeptideIdMap: value_result__convertToFinalResult_MainPart__GetData.numPsmsForReportedPeptideIdMap
                    })
                    resolve(result_convertToFinalResult_MainPart_WithData)

                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            })}
        } else {
            throw Error("result__convertToFinalResult_MainPart__GetData: no result or promise")
        }
        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * @param mainfunctionParams
     * @param reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
     * @param numPsmsForReportedPeptideIdMap
     * @private
     */
    private _convertToFinalResult_MainPart_WithData(
        {
            mainfunctionParams,
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId,
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final,
            numPsmsForReportedPeptideIdMap
        } : {
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
            peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS
            numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType

        } ) : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class {

        // Convert to function return value:   Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId

        let reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId = undefined;
        {
            const entriesMap_KeyReportedPeptideId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId> = new Map()

            if (peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_noFilter_OR_FilterHasNoData()
                || peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.is_includeAll_ReportedPeptideIds()) {

                for (const reportedPeptideId of reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId) {

                    let numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                    if (numPsms === undefined || numPsms === null) {
                        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                    }
                    if (numPsms === 0) {
                        throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === 0: reportedPeptideId: " + reportedPeptideId)
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

                for (const entry of peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS__Final.get_Entries_IterableIterator()) {

                    const reportedPeptideId = entry.reportedPeptideId;
                    const psmIds_Include = entry.psmIds_Include;

                    let numPsms: number = undefined;

                    if (psmIds_Include) {

                        numPsms = psmIds_Include.size;

                        if (numPsms === 0) {
                            throw Error("numPsms = psmIds_Include.size: numPsms === 0: reportedPeptideId: " + reportedPeptideId)
                        }

                    } else {
                        numPsms = numPsmsForReportedPeptideIdMap.get(reportedPeptideId)
                        if (numPsms === undefined || numPsms === null) {
                            throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === undefined || numPsms === null: reportedPeptideId: " + reportedPeptideId)
                        }
                        if (numPsms === 0) {
                            throw Error("numPsms = numPsmsForReportedPeptideIdMap.get( reportedPeptideId ): numPsms === 0: reportedPeptideId: " + reportedPeptideId)
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

            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId =
                new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
                    projectSearchId: this._projectSearchId,
                    entriesMap_KeyReportedPeptideId
                });
        }

        return { reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId }
    }


    ////////////////////////////

    /**
     *
     *
     */
    private _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data(
        {
            finalResultFormat__Input,
            mainfunctionParams
        }: {
            finalResultFormat__Input : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters

        }): GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnObject_Class {

        //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
        const searchSubGroup_Ids_Selected : Set<number> = mainfunctionParams.searchSubGroup_Ids_Selected;

        if ( ! searchSubGroup_Ids_Selected ) {

            //  No searchSubGroup_Ids_Selected so return input param

            return { promise: undefined, data: finalResultFormat__Input };  // EARLY RETURN
        }

        let load__subGroupIdMap_Key_PsmId_KeyReportedPeptideId = false;
        for ( const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry of finalResultFormat__Input.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ){
            if ( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {
                load__subGroupIdMap_Key_PsmId_KeyReportedPeptideId = true;
                break;
            }
        }

        const getData_Result = _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__GetData({
            load__subGroupIdMap_Key_PsmId_KeyReportedPeptideId,
            mainfunctionParams, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })

        if ( getData_Result.result ) {
            return { promise: undefined, data: this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__WithData({
                finalResultFormat__Input, mainfunctionParams,
                num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.result.num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
            })}
        } else if ( getData_Result.promise ) {
            return { data: undefined, promise: new Promise<GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class>((resolve, reject) => {
                getData_Result.promise.catch(reason => { reject(reason)})
                getData_Result.promise.then(value_getData_Result => {try {
                    const createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Result = this._createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__WithData({
                        finalResultFormat__Input, mainfunctionParams,
                        num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                    });
                    resolve( createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Result )  // RESOLVE
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            })}
        } else {
            throw Error("getData_Result no result or promise")
        }
    }

    /**
     *
     *
     */
    private _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__WithData(
        {
            finalResultFormat__Input, mainfunctionParams, num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder, searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            finalResultFormat__Input : GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class
            mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
            num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

        }): GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_ReturnContents_Class {

        const searchSubGroup_Ids_Selected = mainfunctionParams.searchSubGroup_Ids_Selected;

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result =  new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId({
            projectSearchId: this._projectSearchId,
            entriesMap_KeyReportedPeptideId: undefined //  Constructor will create its own
        });

        for ( const reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry of finalResultFormat__Input.reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId.get_Entries_IterableIterator() ){

            const reportedPeptideId = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.reportedPeptideId;
            let psmCount_after_Include = reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmCount_after_Include;

            let psmIds_Include : Set<number> = undefined

            let psmIds_IncludeSet_Map_Key_SearchSubGroupId : Map<number, Set<number>> = undefined;
            const psmCount_after_Include_Map_Key_SearchSubGroupId : Map<number, number> = new Map();

            if ( reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {

                psmIds_Include = new Set();  // psmIds Filtered on Selected searchSubGroup_Ids_Selected

                // Split psmIds_Include on searchSubGroup_Ids_Selected

                if ( ! searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder ) {
                    const msg = "searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder not populated when have reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include populated"
                    console.warn(msg)
                    throw Error(msg)
                }

                const subGroupIdMap_Key_PsmId = searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId );
                if ( ! subGroupIdMap_Key_PsmId ) {
                    throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_subGroupIdMap_Key_PsmId__For_ReportedPeptideId( reportedPeptideId ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). reportedPeptideId: " + reportedPeptideId + ", projectSearchId: " + this._projectSearchId );
                }

                psmIds_IncludeSet_Map_Key_SearchSubGroupId = new Map();

                for ( const psmId_Include of reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include ) {

                    const subGroupId = subGroupIdMap_Key_PsmId.get( psmId_Include );
                    if ( ! subGroupId === undefined ) {
                        throw Error("reportedPeptideIds_AndTheir_PSM_IDs_ExistingEntry.psmIds_Include is populated: subGroupIdMap_Key_PsmId.get( psmId_Include ); not return a value. _update_reportedPeptideIds_AndTheir_PSM_IDs__For_searchSubGroup_Ids_Selected(...). psmId_Include: " + psmId_Include + ", projectSearchId: " + this._projectSearchId );
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

                const numPsmsFor_SearchSubGroupId = num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder.get_numPsmsFor_SearchSubGroupId__For_ReportedPeptideId( reportedPeptideId )
                if ( numPsmsFor_SearchSubGroupId === undefined ) {
                    throw Error("No value in num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder for reportedPeptideId: " + reportedPeptideId)
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

        return {reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId: reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result}; //  Return new reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__Result
    }


}   //   End of Class

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

//////////    NON-Class Functions

//  Get from server


/**
 * get data for _processing_TopLevel()
 */
const _processing_TopLevel__GetData = function(
    {
        mainfunctionParams, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    result: {
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
    }
    promise: Promise<{
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
    }>
} {

    let reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType = undefined;

    const promises: Array<Promise<unknown>> = [];

    {
        //  Use All reportedPeptideIds that meet cutoff unless proteinSequenceVersionId is passed in for Protein Page

        if (mainfunctionParams.proteinSequenceVersionId !== undefined && mainfunctionParams.proteinSequenceVersionId !== null) {

            //  For Single Protein Overlay

            //  reportedPeptideIds for this proteinSequenceVersionId

            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()
            if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data) {
                const reportedPeptideIds_For_ProteinSequenceVersionId =
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(mainfunctionParams.proteinSequenceVersionId)
                if (!reportedPeptideIds_For_ProteinSequenceVersionId) {
                    //  No reported Peptides for this proteinSequenceVersionId for this project search id
                    //  Return empty array
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId =[]
                } else {
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = Array.from(reportedPeptideIds_For_ProteinSequenceVersionId)
                }
            } else if (get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise) {
                const promise = new Promise<void>((resolve, reject) => {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => { try {
                        reject(reason);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(result => { try {
                        const reportedPeptideIds_For_ProteinSequenceVersionId =
                            result.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_reportedPeptideIds_For_ProteinSequenceVersionId(mainfunctionParams.proteinSequenceVersionId)
                        if (!reportedPeptideIds_For_ProteinSequenceVersionId) {
                            //  No reported Peptides for this proteinSequenceVersionId for this project search id
                            //  Return empty array
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId =[]
                        } else {
                            reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = Array.from(reportedPeptideIds_For_ProteinSequenceVersionId)
                        }
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                })
                promises.push(promise);
            } else {
                const msg = "get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result Not data or promise";
                console.warn(msg)
                throw Error(msg)
            }

        } else {

            //  NOT  Single Protein so get Reported Peptide Ids for all of this search

            {  //  Get  Reported Peptide Ids

                const get_reportedPeptideIds_Result =
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds();
                if (get_reportedPeptideIds_Result.data) {
                    reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = get_reportedPeptideIds_Result.data.reportedPeptideIds;
                } else if (get_reportedPeptideIds_Result.promise) {
                    const promise = new Promise<void>((resolve, reject) => {
                        get_reportedPeptideIds_Result.promise.catch(reason => {
                            try {
                                reject(reason);
                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        });
                        get_reportedPeptideIds_Result.promise.then(result => {
                            try {
                                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId = result.reportedPeptideIds

                                resolve();

                            } catch (e) {
                                reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                throw e;
                            }
                        });
                    })
                    promises.push(promise);
                } else {
                    const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_reportedPeptideIds(); Not return data or promise";
                    console.warn(msg)
                    throw Error(msg)
                }
            }
        }
    }

    if (promises.length === 0) {

        //  EARLY RETURN

        if ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {
            const msg = "In (promises.length === 0), ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId )"
            console.warn(msg)
            throw Error(msg)
        }

        return {
            result: {
                reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
            },
            promise: undefined
        };
    }

    const promiseResult = new Promise<{
        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_reportedPeptideIds_ResultDataType
    }>((resolve, reject) => {
        try {
            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject(reason);
            });
            promisesAll.then(unusedValue => {
                try {
                    if ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId ) {
                        const msg = "promisesAll.then, ( ! reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId )"
                        console.warn(msg)
                        throw Error(msg)
                    }

                    resolve({
                        reportedPeptideIds_All_ForSearch_Or_All_For_SingleProteinSequenceVersionId
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    })
    return {
        promise: promiseResult, result: undefined
    }
}

/**
 * get data for _convertToFinalResult_MainPart()
 */
const _convertToFinalResult_MainPart__GetData = function(
    {
        mainfunctionParams, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    result: {
        numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
    }
    promise: Promise<{
        numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
    }>
} {

    let numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType = undefined;

    const promises: Array<Promise<unknown>> = [];

    {  //  Get Num PSMs for Reported Peptide Ids

        const get_numPsmsForReportedPeptideIdMap_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_numPsmsForReportedPeptideIdMap();
        if (get_numPsmsForReportedPeptideIdMap_Result.data) {
            numPsmsForReportedPeptideIdMap = get_numPsmsForReportedPeptideIdMap_Result.data.numPsmsForReportedPeptideIdMap;
        } else if (get_numPsmsForReportedPeptideIdMap_Result.promise) {
            const promise = new Promise<void>((resolve, reject) => {
                get_numPsmsForReportedPeptideIdMap_Result.promise.catch(reason => {
                    try {
                        reject(reason);
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
                get_numPsmsForReportedPeptideIdMap_Result.promise.then(result => {
                    try {
                        numPsmsForReportedPeptideIdMap = result.numPsmsForReportedPeptideIdMap

                        resolve();

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
            })
            promises.push(promise);
        } else {
            const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
            console.warn(msg)
            throw Error(msg)
        }
    }

    if (promises.length === 0) {

        //  EARLY RETURN

        return {
            result: {
                numPsmsForReportedPeptideIdMap
            },
            promise: undefined
        };
    }

    const promiseResult = new Promise<{
        numPsmsForReportedPeptideIdMap: CommonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters__get_Num_PSMs_For_reportedPeptideIds_ResultDataType
    }>((resolve, reject) => {
        try {
            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject(reason);
            });
            promisesAll.then(unusedValue => {
                try {
                    resolve({
                        numPsmsForReportedPeptideIdMap
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    })
    return {
        promise: promiseResult, result: undefined
    }
}




/**
 * get data for _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data()
 */
const _createNew_FinalResult__FilterOn_SearchSubGroup_Ids_Selected__Add_SearchSubGroup_Data__GetData = function(
    {
        load__subGroupIdMap_Key_PsmId_KeyReportedPeptideId,
        mainfunctionParams, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    } : {
        load__subGroupIdMap_Key_PsmId_KeyReportedPeptideId: boolean
        mainfunctionParams: GetReportedPeptideIdsForDisplay_SingleProjectSearchId_Class__MainMethod_Parameters
        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }
) : {
    result: {
        num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
    }
    promise: Promise<{
        num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
    }>
} {

    let num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = undefined
    let searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = undefined

    const promises: Array<Promise<unknown>> = [];

    {  //  Get num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder

        const get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters().get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch()
        if (get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data) {
            num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.data.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder;
        } else if (get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise) {
            const promise = new Promise<void>((resolve, reject) => {
                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                    try {
                        reject(reason);
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
                get_Num_PSMs_By_SearchSubGroup_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(result => {
                    try {
                        num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder = result.numPSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
                        resolve(); //  resolve
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
            })
            promises.push(promise);
        } else {
            const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
            console.warn(msg)
            throw Error(msg)
        }
    }

    if ( load__subGroupIdMap_Key_PsmId_KeyReportedPeptideId ) {  //  Only load if needed

        //  Get searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder

        const get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result =
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters().get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch()
        if (get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data) {
            searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.data.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder;
        } else if (get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise) {
            const promise = new Promise<void>((resolve, reject) => {
                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                    try {
                        reject(reason);
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
                get_SearchSubGroupId_ForPSM_ID__For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(result => {
                    try {
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder = result.searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                        resolve(); //  resolve
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                        throw e;
                    }
                });
            })
            promises.push(promise);
        } else {
            const msg = "get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters().get_(); Not return data or promise";
            console.warn(msg)
            throw Error(msg)
        }
    }

    if (promises.length === 0) {

        //  EARLY RETURN

        return {
            result: {
                num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,
                searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
            },
            promise: undefined
        };
    }

    const promiseResult = new Promise<{
        num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder
        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__SearchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
    }>((resolve, reject) => {
        try {
            const promisesAll = Promise.all(promises);

            promisesAll.catch(reason => {
                reject(reason);
            });
            promisesAll.then(unusedValue => {
                try {
                    resolve({
                        num_PSMs_By_SearchSubGroup_For_ReportedPeptideId_For_MainFilters_Holder,
                        searchSubGroupId_ForPSM_ID__For_ReportedPeptideId_For_MainFilters_Holder
                    });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            })
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    })
    return {
        promise: promiseResult, result: undefined
    }
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
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array,  //  To be combined using Intersection
    }: {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS>
    }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

    const entries__Have_Result__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []
    const entries__Have_Promise__Array: Array<Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>> = []

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.result ) {

            entries__Have_Result__Array.push(entry.result)

        } else if ( entry.promise ) {

            entries__Have_Promise__Array.push(entry.promise)

        } else {
            const msg = "no 'result' or 'promise in entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array"
            console.warn(msg);
            throw Error(msg)
        }
    }

    if ( entries__Have_Promise__Array.length === 0 ) {

        const mergeResult =
            _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION__AfterAllPromisesResolve({
                reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entries__Have_Result__Array
            });

        return {result: mergeResult, promise: undefined} //  EARLY RETURN
    }

    const promisesAll = Promise.all( entries__Have_Promise__Array );

    const promiseReturn = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => {

        promisesAll.catch(reason => {
            reject(reason)
        })
        promisesAll.then(entries => {
            try {
                for ( const entry of entries ) {
                    entries__Have_Result__Array.push(entry);
                }

                const mergeResult =
                    _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION__AfterAllPromisesResolve({
                        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: entries__Have_Result__Array
                    });

                resolve(mergeResult);

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    })

    return {promise: promiseReturn, result: undefined} //  EARLY RETURN
}

/**
 *
 * @param reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
 */
const _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION__AfterAllPromisesResolve = function (
    {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array
    } : {
        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>
    }
) : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

    //  Check for any that are just undefined or null and throw Error

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry === undefined || entry === null ) {

            //  Found entry Not populated.  Problem with return statement that generated it.

            const msg = "Found ( entry === undefined || entry === null ) in reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array in _merge_reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS_INTERSECTION";
            console.warn(msg);
            throw Error(msg);
        }
    }

    //  Some Optimization checks

    {  // Anything of the INTERSECTION is Empty, return Empty

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

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

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

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

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

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

    //  Filter reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array to exclude entry.is_noFilter_OR_FilterHasNoData() and entry.is_includeAll_ReportedPeptideIds()

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> = []

    for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array ) {

        if ( entry.is_noFilter_OR_FilterHasNoData() ) {

            continue; // EARLY CONTINUE
        }

        if ( entry.is_includeAll_ReportedPeptideIds() ) {

            //  Skip Include ALL since also have other than Include All

            continue; // EARLY CONTINUE
        }

        reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered.push( entry );
    }

    if ( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered.length === 0 ) {

        const msg = "( reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered.length === 0 )";
        console.warn(msg);
        throw Error(msg);
    }

    //  Get Reported Peptide Ids

    const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered_FirstElement = reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered[0];

    let reportedPeptideIds_FromAny_ArrayEntry = Array.from(reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered_FirstElement.get_Entries_Keys_ReportedPeptideIds());

    //  Intersection by reported peptide id.  Intersection of PSM Ids

    const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
        noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
    });

    for ( const reportedPeptideId of reportedPeptideIds_FromAny_ArrayEntry ) {

        let reportedPeptideId_FoundInAll_Entries = true;
        const psmIds_Set_Array : Array<Set<number>> = []; // Only for entries with PSM Ids

        for ( const entry of reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array_Filtered ) {

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

        if ( psmIds_Include_Result.size === 0 ) {

            //  None of the PSM Ids were found in all filters so skip entry

            continue; // EARLY CONTINUE
        }

        const newEntry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
            reportedPeptideId : reportedPeptideId,
            psmIds_Include : psmIds_Include_Result
        });

        result.set_Entry_Using_entry_reportedPeptideId_AsKey(newEntry);
    }

    return result;
}
