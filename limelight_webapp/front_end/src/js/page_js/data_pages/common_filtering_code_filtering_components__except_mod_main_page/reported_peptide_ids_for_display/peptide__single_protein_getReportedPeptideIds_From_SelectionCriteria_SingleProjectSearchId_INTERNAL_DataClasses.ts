/**
 * peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses.ts
 */

import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {ProteinSequenceWidget_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {UserSearchString_LocationsOn_ProteinSequence_Root} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData";

/**
 * The primary passed in object to most of the filtering code
 */
export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_Params_Main {

    not_filtered_position_modification_selections: boolean
    dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch

    reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn

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

/**
 * The reported peptide ids and sometimes the SingleProteinSequenceVersionId passed in object to most of the filtering code
 */
export class Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn {

    readonly reportedPeptideIds_StartingPointForFiltering: ReadonlyArray<number>
    private readonly _proteinSequenceVersionId: number
    readonly reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum

    constructor(
        {
            reportedPeptideIds_StartingPointForFiltering, proteinSequenceVersionId, reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
        } : {
            readonly reportedPeptideIds_StartingPointForFiltering: ReadonlyArray<number>
            readonly proteinSequenceVersionId: number
            readonly reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
        }
    ) {
        if ( proteinSequenceVersionId !== undefined && proteinSequenceVersionId !== null &&
            reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum !==
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.
                ALL_FOR_SINGLE_PROTEIN_IN_SEARCH ) {
            const msg = "constructor:: proteinSequenceVersionId is not undefined or null and reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum is not ALL_FOR_SINGLE_PROTEIN_IN_SEARCH"
            console.warn(msg)
            throw Error(msg)
        }

        this.reportedPeptideIds_StartingPointForFiltering = reportedPeptideIds_StartingPointForFiltering
        this._proteinSequenceVersionId = proteinSequenceVersionId
        this.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum = reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
    }

    get_proteinSequenceVersionId() {
        if ( this.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum !==
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum.
                ALL_FOR_SINGLE_PROTEIN_IN_SEARCH ) {
            const msg = "get_proteinSequenceVersionId() called but this.reportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum is not ALL_FOR_SINGLE_PROTEIN_IN_SEARCH"
            console.warn(msg)
            throw Error(msg)
        }

        return this._proteinSequenceVersionId
    }
}


export enum Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum {
    ALL_FOR_SEARCH = "ALL_FOR_SEARCH",
    ALL_FOR_SINGLE_PROTEIN_IN_SEARCH = "ALL_FOR_SINGLE_PROTEIN_IN_SEARCH",
    OTHER_FILTERED__FROM_FIRST_FILTERING_RUN = "OTHER_FILTERED__FROM_FIRST_FILTERING_RUN"
}