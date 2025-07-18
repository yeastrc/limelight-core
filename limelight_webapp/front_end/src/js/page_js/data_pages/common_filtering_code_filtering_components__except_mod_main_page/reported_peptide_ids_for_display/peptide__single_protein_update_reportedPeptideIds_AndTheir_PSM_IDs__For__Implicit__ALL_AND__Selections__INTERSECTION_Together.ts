/**
 * peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together.ts
 *
 * Implicit All / AND / Intersection
 *
 * These are selections that are not user chooses "AND" but are AND by their nature
 *
 */


import {
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS,
    Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideSequence_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinSequenceWidget_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject";
import {UserSearchString_LocationsOn_ProteinSequence_Root} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData";
import {Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__SingleProjectSearch";
import {
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters";
import {CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_common_across_searches_sub_parts__returned_objects/commonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters";
import {
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
    CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder__SingleEntry
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters";
import {CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__StaticModifications";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {DataPage_common_Flags_SingleSearch} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn_Type_Enum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_DataClasses";
import { CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data";
import {
    ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_number_and_file_name_or_search__on_psms_selection/js/scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject";
import {
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY,
    ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_ANY_ALL_Selection_Enum
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_peak__mz_intensity/js/scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject";
import {
    CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak
} from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_Data";
import {
    commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId_ReturnPromise
} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId";
import {
    ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_of_modification_filter_component/js/proteinPosition_Of_Modification_Filter_UserSelections_StateObject";


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////


/////    Process "ALL"/"AND" Selections (Including Protein Position and Peptide String)

//      Apply "ALL" as an Intersection to the input entries (either all or a UNION of the "ANY" selections)

/**
 *
 */
export class Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    /**
     * Internal class for - Get for User Search String to search Protein or Peptide Sequences
     *
     * Separate class to support caching of results
     *
     */
    private _internal_ComputeFor_UserSearchString_Of_Sequences: Internal_ComputeFor_UserSearchString_Of_Sequences

    /**
     * Internal class for - Get Selection Type For Scan Retention Time MZ User Selection
     *
     * Separate Class to support Multistep data retrieval
     */
    private _internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection: Internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection

    /**
     * Internal class for - Get for Peptide Sequence Missed Cleavage Count Meets Filters
     *
     * Separate class to support caching of results
     *
     */
    private _internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters: Internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters

    /**
     *
     *
     */
    private _internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject: Internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject

    /**
     *
     */
    private constructor(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        this._internal_ComputeFor_UserSearchString_Of_Sequences = Internal_ComputeFor_UserSearchString_Of_Sequences.getNewInstance({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        });

        this._internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection = Internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection.getNewInstance({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })

        this._internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters = Internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters.getNewInstance({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })

        this._internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject = Internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.getNewInstance({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        } : {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) : Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class {

        return new Peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together_Class({
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     *
     *
     */
    peptide__single_protein_update_reportedPeptideIds_AndTheir_PSM_IDs__For__Implicit__ALL_AND__Selections__INTERSECTION_Together(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            dataPage_common_Flags_SingleSearch,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject,
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            proteinSequenceWidget_StateObject,
            proteinPositionFilter_UserSelections_StateObject,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
            scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
            psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
            peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
            proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> {

//  Implicit ALL

        const reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array : Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS> = [];

        {
            const result = this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.getFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                psm_Charge_Filter_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__SelectionType_ALL___For__Psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection.getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                scan_RetentionTime_MZ_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__peptideUniqueSelected({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                peptideUnique_UserSelection_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._internal_ComputeFor_UserSearchString_Of_Sequences.getFor__UserSearchString({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                peptideSequence_UserSelections_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters.getFor__PeptideSequence_MissedCleavageCount_Range({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                dataPage_common_Flags_SingleSearch,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            })
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__is_proteinPositionFilter_PeptidePage({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinPositionFilter_UserSelections_StateObject
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                dataPage_common_Flags_SingleSearch,
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }
        {
            const result = this._getFor__selectedProteinSequencePositions({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinSequenceWidget_StateObject,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });
            reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array.push( result );
        }

        return reportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS__Array;
    }

    /**
     * User has selected 'Filter On Scan Filename:'
     *
     */
    private _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! scanFilenameId_On_PSM_Filter_UserSelection_StateObject )
            || ( scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const scanFilenameIds_Selected = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected();
        if ( ! scanFilenameIds_Selected ) {
            const msg = "scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__scanFilenameIds_Selected(); returned nothing. ";
            console.warn(msg);
            throw Error(msg);
        }

        const getData_Result = this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_AfterGetData({
                    scanFilenameIds_Selected, reportedPeptideIds_ProteinId_Params_PassedIn,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_AfterGetData({
                            scanFilenameIds_Selected, reportedPeptideIds_ProteinId_Params_PassedIn,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Filter On Scan Filename:'  --  Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                }}
        }

        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Filter On Scan Filename:'  --  After Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__ScanFilenameId_On_PSM_Filter_UserSelection_AfterGetData(
        {
            scanFilenameIds_Selected, reportedPeptideIds_ProteinId_Params_PassedIn,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            scanFilenameIds_Selected: Set<number>
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_CheckForSearchScanFileId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_CheckForSearchScanFileId ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmId of psmIds_to_CheckForSearchScanFileId ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(reportedPeptideId); returned nothing. " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( scanFilenameIds_Selected.has( psmTblData_For_PsmId.searchScanFileId ) ) {

					if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {

                        const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            psmId
                        })
                        psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                    }
                }
            }

            if ( psmEntries_Include_Map_Key_PsmId.size === 0 ) {
                //  No PSMs are in selected so skip
                continue; // EARLY CONTINUE
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData; // EARLY RETURN
    }

    //////////////////////////////////////////////////////

    /**
     * User has selected 'Filter On Scan Number:'
     *
     */
    private _getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject )
            || ( ! scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.is_AnySelections() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const getData_Result = this._getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_AfterGetData({
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Filter On Scan Number:'  --  Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                }}
        }

        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Filter On Scan Number:'  --  After Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_AfterGetData(
        {
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject,
            reportedPeptideIds_ProteinId_Params_PassedIn,

            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject : ScanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_CheckForSearchScanFileId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_CheckForSearchScanFileId ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmId of psmIds_to_CheckForSearchScanFileId ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(reportedPeptideId); returned nothing. " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let psm_FoundInSelection = false

                for ( const selection_Entry of scanNumber_ScanFilenameId_ProjectSearchId_On_PSM_Filter_UserSelection_StateObject.get__scanNumber_ScanFilenameIds_ProjectSearchIds_Selections() ) {

                    if ( psmTblData_For_PsmId.scanNumber === selection_Entry.scanNumber ) {

                        if ( selection_Entry.allSearches_Selected ) {
                            psm_FoundInSelection = true
                            break
                        }
                        if ( selection_Entry.wholeSearches_Selected_ProjectSearchIds && selection_Entry.wholeSearches_Selected_ProjectSearchIds.has( this._projectSearchId ) ) {
                            psm_FoundInSelection = true
                            break
                        }
                        if ( selection_Entry.searchScanFile_Ids_Selected && selection_Entry.searchScanFile_Ids_Selected.has( psmTblData_For_PsmId.searchScanFileId ) ) {
                            psm_FoundInSelection = true
                            break
                        }
                    }
                }

                if ( psm_FoundInSelection ) {

                    if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {

                        const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            psmId
                        })
                        psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                    }
                }
            }

            if ( psmEntries_Include_Map_Key_PsmId.size === 0 ) {
                //  No PSMs are in selected so skip
                continue; // EARLY CONTINUE
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData; // EARLY RETURN
    }

    //////////////////////////////////////////////////////


    /**
     * User has selected 'Filter On PSM Charge:'
     *
     */
    private _getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            psm_Charge_Filter_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! psm_Charge_Filter_UserSelection_StateObject )
            || ( psm_Charge_Filter_UserSelection_StateObject.areAllSelected__chargeValues_OnPSMs() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const chargeValues_Selected = psm_Charge_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected();
        if ( ! chargeValues_Selected ) {
            const msg = "scanFilenameId_On_PSM_Filter_UserSelection_StateObject.get__chargeValues_OnPSMs_Selected(); returned nothing. ";
            console.warn(msg);
            throw Error(msg);
        }

        const getData_Result = this._getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection_AfterGetData({
                    chargeValues_Selected, reportedPeptideIds_ProteinId_Params_PassedIn,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection_AfterGetData({
                            chargeValues_Selected, reportedPeptideIds_ProteinId_Params_PassedIn,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Filter On PSM Charge:'  --  Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                }}
        }

        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Filter On PSM Charge:'  --  After Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__Psm_Charge_On_PSM_Filter_UserSelection_AfterGetData(
        {
            chargeValues_Selected, reportedPeptideIds_ProteinId_Params_PassedIn,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            chargeValues_Selected: Set<number>
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_CheckForPsm_Charge = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_CheckForPsm_Charge ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmId of psmIds_to_CheckForPsm_Charge ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(reportedPeptideId); returned nothing. " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( chargeValues_Selected.has( psmTblData_For_PsmId.charge ) ) {

                    if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {

                        const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            psmId
                        })
                        psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                    }
                }
            }

            if ( psmEntries_Include_Map_Key_PsmId.size === 0 ) {
                //  No PSMs are in selected so skip
                continue; // EARLY CONTINUE
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData; // EARLY RETURN
    }

    //////////////////////////////////////////////////////
    /**
     * User has selected 'Exclude Independent Decoy:'
     *
     */
    private _getFor__SelectionType_ALL___For__Psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject : Psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject )
            || ( ! psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.get_psm_Exclude_IndependentDecoy_PSMs() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const getData_Result = this._getFor__SelectionType_ALL___For__psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection_AfterGetData({
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Exclude Independent Decoy:'  --  Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                }}
        }

        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Exclude Independent Decoy:'  --  After Get Data
     *
     */
    private _getFor__SelectionType_ALL___For__psm_Exclude_IndependentDecoy_On_PSM_Filter_UserSelection_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_CheckForpsm_Exclude_IndependentDecoy = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_CheckForpsm_Exclude_IndependentDecoy ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmId of psmIds_to_CheckForpsm_Exclude_IndependentDecoy ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(reportedPeptideId); returned nothing. " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }
                if ( ! psmTblData_For_PsmId.independentDecoyPSM ) {

                    if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {

                        const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            psmId
                        })
                        psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                    }
                }
            }

            if ( psmEntries_Include_Map_Key_PsmId.size === 0 ) {
                //  No PSMs are in selected so skip
                continue; // EARLY CONTINUE
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData; // EARLY RETURN
    }

    /**
     * User has selected 'Show only Unique Peptides:'
     *
     */
    private _getFor__peptideUniqueSelected(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            peptideUnique_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! peptideUnique_UserSelection_StateObject )
            || ( ! peptideUnique_UserSelection_StateObject.getPeptideUnique() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
            this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
            get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
            get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch();

        if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
            const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;

            return {  //  EARLY RETURN
                promise: undefined, result: this._getFor__peptideUniqueSelected__AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                })
            }

        } if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {

            return { //  EARLY RETURN
                result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => reject(reason))
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        const proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                        const result = this._getFor__peptideUniqueSelected__AfterGetData({
                            reportedPeptideIds_ProteinId_Params_PassedIn, proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                        })
                        resolve(result)

                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result no data or promise")
        }

        console.warn("SHOULD NOT GET HERE")
        throw Error("SHOULD NOT GET HERE")
    }

    /**
     * User has selected 'Show only Unique Peptides:' -- AfterGetData
     *
     */
    private _getFor__peptideUniqueSelected__AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {
            const proteinSequenceVersionIds_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId(reportedPeptideId);
            if (!proteinSequenceVersionIds_For_ReportedPeptideId) {
                throw Error("_getFor__peptideUniqueSelected: proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinSequenceVersionIds_For_ReportedPeptideId( reportedPeptideId ); returned nothing reportedPeptideId: " + reportedPeptideId)
            }
            if (proteinSequenceVersionIds_For_ReportedPeptideId.size === 1) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined });
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        return resultData;
    }

    //////////

    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids
     *
     */
    private _getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            dataPage_common_Flags_SingleSearch,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinPosition_Of_Modification_Filter_UserSelections_StateObject )
            || ( ! proteinPosition_Of_Modification_Filter_UserSelections_StateObject.isAnySelections() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        if (!proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges()) {
            const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges(); returned nothing";
            console.warn(msg)
            throw Error(msg)
        }

        //  Get Data and then call ..._AfterGetData function

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
        let variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        {  //  proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
        {  //  variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch()

            if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;
            } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => { try {
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }
        if ( dataPage_common_Flags_SingleSearch.anyPsmHas_OpenModifications ) {

            {
                const get_OpenModifications_On_PSMHolder_AllForSearch_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().get_OpenModifications_On_PSMHolder_AllForSearch()

                if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.data ) {
                    openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch_Result.data.openModifications_On_PSM_For_MainFilters_Holder;
                } else if ( get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_OpenModifications_On_PSMHolder_AllForSearch_Result.promise.then(value => { try {
                            openModifications_On_PSM_For_MainFilters_Holder = value.openModifications_On_PSM_For_MainFilters_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_OpenModifications_On_PSMHolder_AllForSearch_Result  no 'data' or 'promise'")
                }
            }

            {
                const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch()

                if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                            reject(reason)
                        })
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => { try {
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result  no 'data' or 'promise'")
                }
            }
        }

        if ( promises.length === 0 ) {
            const result = this._getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                openModifications_On_PSM_For_MainFilters_Holder,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    openModifications_On_PSM_For_MainFilters_Holder,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }


    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids  -  After Get Data
     *
     */
    private _getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            openModifications_On_PSM_For_MainFilters_Holder,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinPosition_Of_Modification_Filter_UserSelections_StateObject : ProteinPosition_Of_Modification_Filter_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        console.warn(' Consider a Checkbox like "Exclude unlocalized mods: " to NOT include Unlocalized open mods for covering User Entered Protein Positions, but maybe/probably cover for whole protein, so maybe a checkbox does not work?')


        const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId;
        if (!proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId) {
            const msg = "_getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData(...): proteinPosition_Of_Modification_Filter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId; returned nothing";
            console.warn(msg)
            throw Error(msg)
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const proteinCoverage_Entries_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId);
            if (!proteinCoverage_Entries_For_ReportedPeptideId) {
                throw Error("_getFor__is_proteinPosition_Of_Modification_Filter_PeptidePage_AfterGetData(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing")
            }

            let passesFilter_Whole_ReportedPeptideId = false; //  All PsmIds under Reported Peptide Id also pass the filter

            {     //  Process Variable Mods at Reported Peptide level

                let variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering: Array<CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder__SingleEntry> = undefined

                {
                    const variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId =
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId( reportedPeptideId )
                    if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                        for ( const variable_Dynamic_Modification of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId ) {

                            const mass = variable_Dynamic_Modification.mass

                            if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                                //  Round to zero
                                const massRounded = Math.round( mass )

                                if ( massRounded === 0 ) {
                                    //  Since getTreatOpenModMassZeroAsUnmodified_Selection() is true, skip since mass rounded to zero
                                    continue // EARLY CONTINE
                                }
                            }
                            if ( ! variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering ) {
                                variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering = []
                            }

                            variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering.push( variable_Dynamic_Modification )
                        }
                    }
                }

                if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering ) {

                    //  Test for Variable Mod at Reported Peptide Id level is found in proteinCoverage_Entries_For_ReportedPeptideId and proteinPosition_Of_Modification_Filter_UserSelections_StateObject

                    for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

                        //  Loop contains early 'break' to exit loop

                        const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
                        if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                            //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                            continue; // EARLY CONTINUE
                        }

                        if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                            // Filter selection is Full Protein

                            if ( variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering ) {

                                //  Have at least 1 Variable mod at Reported Peptide level so this proteinCoverageEntry passes the filter

                                passesFilter_Whole_ReportedPeptideId = true;

                                break;  // EARLY LOOP LOOP
                            }
                        } else {

                            if ( ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) || proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0 ) {
                                throw Error( "ELSE of (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected) AND ( ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) || proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0 )" )
                            }

                            //  Test Specific Protein Ranges with specific variable modifications

                            for ( const variable_Modification of variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId__AfterPossibleFiltering ) {

                                const mod_PositionOnProtein = variable_Modification.position + proteinCoverage_Entry.proteinStartPosition - 1

                                for ( const proteinRange_UserSelectionsEntry of proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                                    if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= mod_PositionOnProtein && mod_PositionOnProtein <= proteinRange_UserSelectionsEntry.proteinPosition_End ) {

                                        passesFilter_Whole_ReportedPeptideId = true;

                                        break;  // EARLY LOOP LOOP
                                    }
                                }
                                if ( passesFilter_Whole_ReportedPeptideId ) {

                                    break;  // EARLY LOOP LOOP
                                }
                            }

                            if ( passesFilter_Whole_ReportedPeptideId ) {

                                break;  // EARLY LOOP LOOP
                            }
                        }
                    }
                }
            }

            // Reported Peptide Id does NOT pass Filters using Variable Modifications at Reported Peptide Level

            //  Try finding PSMs that pass filter

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            if ( openModifications_On_PSM_For_MainFilters_Holder && openModifications_On_PSM_For_MainFilters_Holder.is_Has_Open_ModificationsOnReportedPeptide_Entries() ) {

                //  Any PSMs that pass PSM/Peptide filters in Search have Open Modifications so check that they pass filters

                for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                    const psm_IDs_AllFor_ReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId )
                    if ( ! psm_IDs_AllFor_ReportedPeptideId ) {
                        throw Error("psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId ) returned NOTHING for reportedPeptideId: " + reportedPeptideId )
                    }

                    for ( const psmId of psm_IDs_AllFor_ReportedPeptideId ) {

                        let psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections = false

                        const psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId = openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId( reportedPeptideId )

                        if ( psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId ) {

                            const psmOpenModificationMassPerPSM_ForPsmId = psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.get( psmId )

                            if ( psmOpenModificationMassPerPSM_ForPsmId ) {

                                //  Have Open Modifications for PSM ID

                                if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {

                                    const openModificationMass_Rounded = Math.round( psmOpenModificationMassPerPSM_ForPsmId.openModificationMass )
                                    if ( openModificationMass_Rounded === 0 ) {

                                        //   getTreatOpenModMassZeroAsUnmodified_Selection is TRUE AND openModificationMass_Rounded === 0 is zero so skip

                                        continue // EARLY CONTINUE
                                    }
                                }

                                for ( const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId ) {

                                    //  Loop contains early 'break' to exit loop

                                    const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get( proteinCoverage_Entry.proteinSequenceVersionId );
                                    if ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId ) {
                                        //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                                        continue; // EARLY CONTINUE
                                    }

                                    if ( proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected ) {
                                        // Filter selection is Full Protein

                                        //  Have at least 1 Open mod at PSM level so this proteinCoverageEntry passes the filter

                                        psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections = true;

                                        break;  // EARLY LOOP BREAK

                                    } else {

                                        if ( ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) || proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0 ) {
                                            throw Error( "ELSE of (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected) AND ( ( ! proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) || proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0 )" )
                                        }

                                        //  Test Specific Protein Ranges with specific variable modifications

                                        if ( ( ! psmOpenModificationMassPerPSM_ForPsmId.positionsMap_KeyPosition ) || psmOpenModificationMassPerPSM_ForPsmId.positionsMap_KeyPosition.size === 0 ) {

                                            //  Unlocalized Open Mod.  Validate that any of the protein position range intersects with the proteinCoverage_Entry start end

                                            for ( const proteinRange_UserSelectionsEntry of proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                                                //  x1 <= y2 && y1 <= x2
                                                if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= proteinRange_UserSelectionsEntry.proteinPosition_End ) { // coverage entry overlaps select range

                                                    psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections = true;

                                                    break;  // EARLY LOOP BREAK
                                                }
                                            }
                                        } else {

                                            for ( const positions of psmOpenModificationMassPerPSM_ForPsmId.positionsMap_KeyPosition.values() ) {
                                                for ( const positionEntry of positions ) {

                                                    const openMod_PositionOnProtein = positionEntry.position + proteinCoverage_Entry.proteinStartPosition - 1

                                                    for ( const proteinRange_UserSelectionsEntry of proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries ) {

                                                        if ( proteinRange_UserSelectionsEntry.proteinPosition_Start <= openMod_PositionOnProtein && openMod_PositionOnProtein <= proteinRange_UserSelectionsEntry.proteinPosition_End ) {

                                                            psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections = true;

                                                            break;  // EARLY LOOP BREAK
                                                        }
                                                    }
                                                    if ( psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections ) {

                                                        break;  // EARLY LOOP BREAK
                                                    }
                                                }

                                                if ( psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections ) {

                                                    break;  // EARLY LOOP BREAK
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if ( psm_PassesFilters_Mod_Covers_Protein_Or_ProteinPositionSelections ) {

                            if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {

                                const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                                    psmId
                                })
                                psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                            }
                        }

                        // console.warn(' Consider a Checkbox like "Exclude unlocalized mods: " to NOT include Unlocalized open mods for covering User Entered Protein Positions, but maybe/probably cover for whole protein, so maybe a checkbox does not work?')
                    }

                    //  Check if ALL psm_IDs For ReportedPeptideId pass filter to optimize output to set for Reported Peptide Id and NOT pass PsmIds

                    let psmIds_Include_HAS_ALL__psm_IDs_AllFor_ReportedPeptideId = true

                    for ( const psmId of psm_IDs_AllFor_ReportedPeptideId ) {

                        if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {
                            psmIds_Include_HAS_ALL__psm_IDs_AllFor_ReportedPeptideId = false
                            break
                        }
                    }
                    if ( psmIds_Include_HAS_ALL__psm_IDs_AllFor_ReportedPeptideId ) {

                        passesFilter_Whole_ReportedPeptideId = true
                    }
                }
            }

            if (passesFilter_Whole_ReportedPeptideId) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                    reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined
                })
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry)

            } else {

                if ( psmEntries_Include_Map_Key_PsmId.size > 0 ) {


                    const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS( {
                        reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
                    } );
                    resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
                }
            }
        }

        return resultData;
    }

    //////////


    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids
     *
     */
    private _getFor__is_proteinPositionFilter_PeptidePage(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinPositionFilter_UserSelections_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinPositionFilter_UserSelections_StateObject )
            || ( ! proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        if (!proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges()) {
            const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges(); returned nothing";
            console.warn(msg)
            throw Error(msg)
        }

        //  Get Data and then call ..._AfterGetData function

        let proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        {  //  proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
            const get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters().
                get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch()

            if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data ) {
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.data.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
            } else if ( get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result.promise.then(value => { try {
                        proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder = value.proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_ProteinSequenceVersionIds_And_ProteinCoverage_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        if ( promises.length === 0 ) {
            const result = this._getFor__is_proteinPositionFilter_PeptidePage_AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                proteinPositionFilter_UserSelections_StateObject,
                proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._getFor__is_proteinPositionFilter_PeptidePage_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    proteinPositionFilter_UserSelections_StateObject,
                    proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }


    /**
     * User has selected Protein Positions to filter on (Peptide Page) Valid for all proteins for selected reported peptide ids  -  After Get Data
     *
     */
    private _getFor__is_proteinPositionFilter_PeptidePage_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinPositionFilter_UserSelections_StateObject,
            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject

            proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__ProteinSequenceVersionIds_And_ProteinCoverage_From_ReportedPeptidePeptideIds_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        const proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId = proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId;
        if (!proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId) {
            const msg = "_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelections_StateObject.getSelections_Ranges().entriesMap_Key_proteinSequenceVersionId; returned nothing";
            console.warn(msg)
            throw Error(msg)
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

            const proteinCoverage_Entries_For_ReportedPeptideId = proteinSequenceVersionIds_And_ProteinCoverage_For_MainFilters_Holder.get_proteinCoverage_For_ReportedPeptideId(reportedPeptideId);
            if (!proteinCoverage_Entries_For_ReportedPeptideId) {
                throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinCoverage_KeyReportedPeptideId.get( reportedPeptideId ); returned nothing")
            }

            let found_proteinCoverage_Entry_For_ProteinPositionFilter = false;

            for (const proteinCoverage_Entry of proteinCoverage_Entries_For_ReportedPeptideId) {

                const proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId = proteinPositionFilter_UserSelectionsMap_Key_proteinSequenceVersionId.get(proteinCoverage_Entry.proteinSequenceVersionId);
                if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId) {
                    //  No Selection entries for proteinSequenceVersionId so skip proteinCoverage_Entry
                    continue; // EARLY CONTINUE
                }

                if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.fullProteinSelected) {
                    // Filter selection is Full Protein
                    found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                    break;  // BREAK LOOP
                }

                if (!proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries) {
                    throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries contains nothing")
                }
                if (proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries.length === 0) {
                    throw Error("_getFor__is_proteinPositionFilter_PeptidePage(...): proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries empty array")
                }

                const proteinPositionFilter_UserSelections_RangeEntries = proteinPositionFilter_UserSelectionsEntry_For_proteinSequenceVersionId.rangeEntries;
                for (const proteinPositionFilter_UserSelections_RangeEntry of proteinPositionFilter_UserSelections_RangeEntries) {

                    const selectRange_Start = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_Start;
                    const selectRange_End = proteinPositionFilter_UserSelections_RangeEntry.proteinPosition_End;

                    //  x1 <= y2 && y1 <= x2
                    if (selectRange_Start <= proteinCoverage_Entry.proteinEndPosition && proteinCoverage_Entry.proteinStartPosition <= selectRange_End) { // coverage entry overlaps select range
                        found_proteinCoverage_Entry_For_ProteinPositionFilter = true;
                        break
                    }
                }
            }

            if (found_proteinCoverage_Entry_For_ProteinPositionFilter) {

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined });
                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
            }
        }

        return resultData;
    }

    /**
     * User has selected Protein Positions to filter on (Single Protein view) (Requires Single proteinSequenceVersionId)
     *
     */
    private _getFor__selectedProteinSequencePositions(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            proteinSequenceWidget_StateObject,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            proteinSequenceWidget_StateObject: ProteinSequenceWidget_StateObject
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! proteinSequenceWidget_StateObject )
            || ( ! proteinSequenceWidget_StateObject.is_Any_selectedProteinSequencePosition() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const proteinSequenceVersionId: number = reportedPeptideIds_ProteinId_Params_PassedIn.get_proteinSequenceVersionId()

        const selectedProteinSequencePositions = proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

        const dataForPositions_ForEnteredSequence: Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS =
            Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_COMMON.getReportedPeptideIdsForDisplay_ProteinPositionsSelected({
                selectedProteinSequencePositions,
                proteinSequenceVersionId,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
            });

        if ( ! dataForPositions_ForEnteredSequence ) {
            const msg = "( ! dataForPositions_ForEnteredSequence )";
            console.warn(msg)
            throw Error(msg)
        }

        return dataForPositions_ForEnteredSequence;
    }

}



////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for User Search String to search Protein or Peptide Sequences
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor_UserSearchString_Of_Sequences {

    // private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    // private _first_GetCall = true;
    // private _proteinSequenceVersionId_In_First_GetCall: number

    // Remove Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"

    /**
     * Cached Results
     */
    // private _userSearchString_CachedResults :  {
    //     searchStrings_Set__ToGetReportedPeptideIdsFor : Set<string>,
    //     reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString : Set<number>
    // }

    /**
     *
     */
    private constructor(
        {
            projectSearchId,  // UNUSED
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ) {
        // this._projectSearchId = projectSearchId;
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ): Internal_ComputeFor_UserSearchString_Of_Sequences {

        return new Internal_ComputeFor_UserSearchString_Of_Sequences({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * User has entered Protein Sequence "Filter On Peptide:" to filter on
     *
     */
    getFor__UserSearchString(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            peptideSequence_UserSelections_StateObject,
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        //  Validate proteinSequenceVersionId is same for all calls

        //  Remove since sometimes proteinSequenceVersionId is undefined and other times null

        // if ( this._first_GetCall ) {
        //
        //     this._first_GetCall = false;
        //     this._proteinSequenceVersionId_In_First_GetCall = proteinSequenceVersionId
        //
        // } else {
        //     if ( this._proteinSequenceVersionId_In_First_GetCall !== proteinSequenceVersionId ) {
        //         const msg = "getFor__UserSearchString(...): Not first call and ( this._proteinSequenceVersionId_In_First_GetCall !== proteinSequenceVersionId ). this._proteinSequenceVersionId_In_First_GetCall: " + this._proteinSequenceVersionId_In_First_GetCall +
        //             ", proteinSequenceVersionId: " + proteinSequenceVersionId;
        //         console.warn(msg)
        //         throw Error(msg)
        //     }
        // }

        /////

        return this._getFor__UserSearchString__NOT_Have_proteinSequenceVersionId({
            reportedPeptideIds_ProteinId_Params_PassedIn,
            peptideSequence_UserSelections_StateObject
        });
    }

    /**
     * Get for User Search String to search Protein or Peptide Sequences
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__UserSearchString__NOT_Have_proteinSequenceVersionId(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            peptideSequence_UserSelections_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! peptideSequence_UserSelections_StateObject )
            || ( ! peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const searchStrings = peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

        if (searchStrings === undefined || searchStrings === null || searchStrings.length === 0) {
            // Not searching for anything so exit
            const msg = "peptideSequence_UserSelections_StateObject.isPeptideSearchString_AtLeastOneNotEmptyString() returned true but (searchStrings === undefined || searchStrings === null || searchStrings.length === 0)";
            console.warn(msg);
            throw Error(msg);
        }

        //  Get Data and then call ..._AfterGetData function
        let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []


        {  //  peptideIds_For_MainFilters_Holder
            const get_PeptideIdsHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
                peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder;
            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                        peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        {  //  peptideSequences_For_MainFilters_Holder
            const get_PeptideSequencesHolder_AllForAllSearches_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
                get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

            if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
                peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder;
            } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value => { try {
                        peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result  no 'data' or 'promise'")
            }
        }


        if ( promises.length === 0 ) {
            const result = this._getFor__UserSearchString__NOT_Have_proteinSequenceVersionId_AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                peptideSequence_UserSelections_StateObject,
                peptideIds_For_MainFilters_Holder,
                peptideSequences_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._getFor__UserSearchString__NOT_Have_proteinSequenceVersionId_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    peptideSequence_UserSelections_StateObject,
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }

    /**
     * Get for User Search String to search Protein or Peptide Sequences  -  After Get Data
     *
     * Uses getReportedPeptideIdsForDisplay_ProteinPositionsSelected(...) Once it gets the positions of the selected static mods
     *
     * @returns reportedPeptideIds (Of All) that meet the Static Modifications Filters
     */
    private _getFor__UserSearchString__NOT_Have_proteinSequenceVersionId_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            peptideSequence_UserSelections_StateObject,
            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject

            //  Data from server
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {


        const searchStrings = peptideSequence_UserSelections_StateObject.getPeptideSearchStrings();

        const searchStrings_Set__ToGetReportedPeptideIdsFor: Set<string> = new Set(searchStrings);

        let reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: Set<number> = undefined;

        // Remove Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"

        // {  //  ONLY use cached results IF searchStrings_Set__ToGetReportedPeptideIdsFor matches cached results
        //
        //     if (this._userSearchString_CachedResults) {
        //
        //         const searchStrings_Set__ToGetReportedPeptideIdsFor_Cached = this._userSearchString_CachedResults.searchStrings_Set__ToGetReportedPeptideIdsFor;
        //         //  compare searchStrings_Set__ToGetReportedPeptideIdsFor_Cached to local searchStrings_Set__ToGetReportedPeptideIdsFor
        //
        //         if (searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.size === searchStrings_Set__ToGetReportedPeptideIdsFor.size) {
        //
        //             let currentAndCachedContentsSame = true;
        //             for (const searchString of searchStrings_Set__ToGetReportedPeptideIdsFor) {
        //                 if (!searchStrings_Set__ToGetReportedPeptideIdsFor_Cached.has(searchString)) {
        //                     currentAndCachedContentsSame = false;
        //                     break;
        //                 }
        //             }
        //             if (currentAndCachedContentsSame) {
        //                 //  Search data same as cached so re-use cached data
        //                 reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = this._userSearchString_CachedResults.reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString;
        //             }
        //         }
        //     }
        // }

        if (!reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

            //  User Search String has changed so perform search

            const searchStrings_I_To_L__ToGetReportedPeptideIdsFor = new Set<string>();
            {
                const findAll_I_Regex = /I/g; //  Regex with trailing 'g' is the only way to do replace all

                //  The Peptide Search Strings will be used to search the protein sequence.
                //  Reported Peptides will be selected where their Protein Coverage records fully contain
                //     the locations of the search strings on the protein sequence.

                //  The amino acid letters I and L will be equivalent.

                for (const searchString of searchStrings) {

                    if (searchString && (searchString !== "")) {  //  Skip searchString === ""

                        const searchStringUpperCase = searchString.toLocaleUpperCase();
                        const searchString_UpperCase_I_to_L = searchStringUpperCase.replace(findAll_I_Regex, "L");
                        searchStrings_I_To_L__ToGetReportedPeptideIdsFor.add(searchString_UpperCase_I_to_L);
                    }
                }
            }

            reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString = new Set();

            // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                if (peptideId === undefined || peptideId === null) {
                    throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
                }
                const peptideSequenceString_I_To_L = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_I_To_L__For_PeptideId(peptideId)
                if (peptideSequenceString_I_To_L === undefined || peptideSequenceString_I_To_L === null) {
                    throw Error("peptideSequenceString_I_To_L not found for peptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                for (const searchString_I_To_L of searchStrings_I_To_L__ToGetReportedPeptideIdsFor) {

                    if (peptideSequenceString_I_To_L.includes(searchString_I_To_L)) {
                        reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString.add(reportedPeptideId);
                        break;
                    }
                }
            }

            // Remove Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"

            // this._userSearchString_CachedResults = {
            //     searchStrings_Set__ToGetReportedPeptideIdsFor,
            //     reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString: reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString
            // }
        }

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_SearchedAllAtCutoffs_Contain_SearchString) {

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({ reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined });
            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(entry);
        }

        return resultData;
    }
}


////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for Peptide Sequence Missed Cleavage Count Meets Filters
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId

    // private _first_GetCall = true;
    // private _proteinSequenceVersionId_In_First_GetCall: number

    // Remove Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"

    // /**
    //  * Cached Results
    //  */
    // private _user_Selection_CachedResults :  {
    //     countFilter_From : number
    //     countFilter_To : number
    //     cached_Results : Array<{
    //         reportedPeptideId: number
    //         psmIds_Include: Set<number>
    //     }>
    // }

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
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ): Internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters {

        return new Internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * User has entered Peptide Sequence Missed Cleavage Count Range to filter on
     *
     */
    getFor__PeptideSequence_MissedCleavageCount_Range(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            dataPage_common_Flags_SingleSearch,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        //  Validate proteinSequenceVersionId is same for all calls

        //  Remove since sometimes proteinSequenceVersionId is undefined and other times null

        // if ( this._first_GetCall ) {
        //
        //     this._first_GetCall = false;
        //     this._proteinSequenceVersionId_In_First_GetCall = proteinSequenceVersionId
        //
        // } else {
        //     if ( this._proteinSequenceVersionId_In_First_GetCall !== proteinSequenceVersionId ) {
        //         const msg = "getFor__UserSearchString(...): Not first call and ( this._proteinSequenceVersionId_In_First_GetCall !== proteinSequenceVersionId ). this._proteinSequenceVersionId_In_First_GetCall: " + this._proteinSequenceVersionId_In_First_GetCall +
        //             ", proteinSequenceVersionId: " + proteinSequenceVersionId;
        //         console.warn(msg)
        //         throw Error(msg)
        //     }
        // }

        if ( ( ! peptideSequence_MissedCleavageCount_UserSelections_StateObject )
            || ( ! peptideSequence_MissedCleavageCount_UserSelections_StateObject.is_Any_FilterHaveValue() ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        ///

        //  Get Data and then call ..._AfterGetData function
        let peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
        let peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

        const promises: Array<Promise<void>> = []

        {  //  peptideIds_For_MainFilters_Holder
            const get_PeptideIdsHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters().get_PeptideIdsHolder_AllForSearch();

            if ( get_PeptideIdsHolder_AllForSearch_Result.data ) {
                peptideIds_For_MainFilters_Holder = get_PeptideIdsHolder_AllForSearch_Result.data.peptideIds_For_MainFilters_Holder;
            } else if ( get_PeptideIdsHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideIdsHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideIdsHolder_AllForSearch_Result.promise.then(value => { try {
                        peptideIds_For_MainFilters_Holder = value.peptideIds_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideIdsHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        {  //  peptideSequences_For_MainFilters_Holder
            const get_PeptideSequencesHolder_AllForAllSearches_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_ParentObject().get__commonData_LoadedFromServer__CommonAcrossSearches().
                get_commonData_LoadedFromServer_SingleSearch__PeptideSequences_For_MainFilters().get_PeptideSequencesHolder_AllForAllSearches()

            if ( get_PeptideSequencesHolder_AllForAllSearches_Result.data ) {
                peptideSequences_For_MainFilters_Holder = get_PeptideSequencesHolder_AllForAllSearches_Result.data.peptideSequences_For_MainFilters_Holder;
            } else if ( get_PeptideSequencesHolder_AllForAllSearches_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_PeptideSequencesHolder_AllForAllSearches_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_PeptideSequencesHolder_AllForAllSearches_Result.promise.then(value => { try {
                        peptideSequences_For_MainFilters_Holder = value.peptideSequences_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_PeptideSequencesHolder_AllForAllSearches_Result  no 'data' or 'promise'")
            }
        }

        let variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
        {
            const get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters().
                get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch();

            if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data ) {
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.data.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;
            } else if ( get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result.promise.then(value => { try {
                        variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder = value.variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_Variable_Dynamic_Modifications_At_ReportedPeptide_LevelHolder_AllForSearch_Result  no 'data' or 'promise'")
            }
        }

        let staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder
        {
            const get_StaticModsHolder_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__StaticModifications().
                get_StaticModsHolder();

            if ( get_StaticModsHolder_Result.data ) {
                staticMods_Holder = get_StaticModsHolder_Result.data.staticMods_Holder;
            } else if ( get_StaticModsHolder_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => { try {
                    get_StaticModsHolder_Result.promise.catch(reason => {
                        reject(reason)
                    })
                    get_StaticModsHolder_Result.promise.then(value => { try {
                        staticMods_Holder = value.staticMods_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise)
            } else {
                throw Error("get_StaticModsHolder_Result  no 'data' or 'promise'")
            }
        }

        // Only populated when dataPage_common_Flags_SingleSearch.anyPsmHas_OpenModifications is true

        let openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder

        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined;

        {
            if ( dataPage_common_Flags_SingleSearch.anyPsmHas_OpenModifications ) {

                const get_OpenModifications_On_PSMHolder_AllForSearch =
                    this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                    get_commonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters().
                    get_OpenModifications_On_PSMHolder_AllForSearch();

                if ( get_OpenModifications_On_PSMHolder_AllForSearch.data ) {
                    openModifications_On_PSM_For_MainFilters_Holder = get_OpenModifications_On_PSMHolder_AllForSearch.data.openModifications_On_PSM_For_MainFilters_Holder;
                } else if ( get_OpenModifications_On_PSMHolder_AllForSearch.promise ) {
                    const promise = new Promise<void>((resolve, reject) => { try {
                        get_OpenModifications_On_PSMHolder_AllForSearch.promise.catch(reason => {
                            reject(reason)
                        })
                        get_OpenModifications_On_PSMHolder_AllForSearch.promise.then(value => { try {
                            openModifications_On_PSM_For_MainFilters_Holder = value.openModifications_On_PSM_For_MainFilters_Holder;
                            resolve();
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    promises.push(promise)
                } else {
                    throw Error("get_OpenModifications_On_PSMHolder_AllForSearch  no 'data' or 'promise'")
                }

                {  // Get psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder

                    const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                        get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();

                    if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {

                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;

                    } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {

                        const promise = new Promise<void>((resolve, reject) => {
                            try {
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => {
                                    reject(reason)
                                })
                                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value => {
                                    try {
                                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;

                                        resolve();

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

                        promises.push(promise);

                    } else {
                        throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result  no 'data' or 'promise'")
                    }
                }
            }

        }

        if ( promises.length === 0 ) {
            const result = this._get__AfterGetData({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                dataPage_common_Flags_SingleSearch,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                peptideIds_For_MainFilters_Holder,
                peptideSequences_For_MainFilters_Holder,
                variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                staticMods_Holder,
                openModifications_On_PSM_For_MainFilters_Holder,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            });

            return { result, promise: undefined }  // EARLY RETURN
        }

        const promises_All = Promise.all(promises);

        const promise = new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
            promises_All.catch(reason => {reject(reason)})
            promises_All.then(noValue => { try {
                const result = this._get__AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    dataPage_common_Flags_SingleSearch,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    peptideIds_For_MainFilters_Holder,
                    peptideSequences_For_MainFilters_Holder,
                    variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
                    staticMods_Holder,
                    openModifications_On_PSM_For_MainFilters_Holder,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                });
                resolve(result);
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

        return { promise, result: undefined }
    }

    /**
     *
     */
    private _get__AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            dataPage_common_Flags_SingleSearch,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,

            peptideIds_For_MainFilters_Holder,
            peptideSequences_For_MainFilters_Holder,
            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder,
            staticMods_Holder,
            openModifications_On_PSM_For_MainFilters_Holder,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            dataPage_common_Flags_SingleSearch: DataPage_common_Flags_SingleSearch
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : PeptideSequence_MissedCleavageCount_UserSelections_StateObject
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

            //  Data from server
            peptideIds_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PeptideIds_For_MainFilters_Holder
            peptideSequences_For_MainFilters_Holder: CommonData_LoadedFromServer_CommonAcrossSearches__PeptideSequences_For_MainFilters_Holder

            variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__Variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder
            staticMods_Holder: CommonData_LoadedFromServer_SingleSearch__StaticModifications_Holder

            //  Only if Open Mod PSM
            openModifications_On_PSM_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_MainFilters_Holder
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder

        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {


        let results_Internal: Array<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS>

        // Remove Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"

        // {  //  ONLY use cached results IF filter matches
        //
        //     if (this._user_Selection_CachedResults) {
        //
        //         if ( this._user_Selection_CachedResults.countFilter_From === peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter() &&
        //             this._user_Selection_CachedResults.countFilter_To === peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter() ) {
        //
        //             //  Search data same as cached so re-use cached data
        //             results_Internal = this._user_Selection_CachedResults.cached_Results;
        //         }
        //     }
        // }

        if ( ! results_Internal ) {

            //  NO cached results for request so compute results

            results_Internal = []

            const TRYPSIN_CLEAVAGE_REGEX_PATTERN = "[KR][^P]";

            const TRYPSIN_CLEAVAGE_REGEX = new RegExp(TRYPSIN_CLEAVAGE_REGEX_PATTERN, 'g' );

            // Start from All Reported Peptide Ids at Cutoff.  Have to search more peptide strings but since covers all it can be safely cached and re-used on next call

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering) {

                const peptideId = peptideIds_For_MainFilters_Holder.get_PeptideId_For_ReportedPeptideId(reportedPeptideId);
                if (peptideId === undefined || peptideId === null) {
                    throw Error("peptideId not found for reportedPeptideId. _getFor__SelectionType_ALL__StaticModifications__NOT_Have_proteinSequenceVersionId   reportedPeptideId: " + reportedPeptideId)
                }
                const peptideSequenceString = peptideSequences_For_MainFilters_Holder.get_PeptideSequence_For_PeptideId(peptideId)
                if (peptideSequenceString === undefined || peptideSequenceString === null) {
                    throw Error("peptideSequenceString not found for peptideId. Internal_ComputeFor_PeptideSequence_MissedCleavageCount_Meet_Filters  peptideId: " + peptideId + ", reportedPeptideId: " + reportedPeptideId)
                }

                //  Compute isMissedCleavage for reportedPeptideId

                const modificationLocations_PeptideLevel = new Set<number>();

                if ( variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.is_Has_Variable_Dynamic_ModificationsOnReportedPeptide_Entries() ) {
                    const dynamicModifications = variable_Dynamic_Modifications_At_ReportedPeptide_Level_For_MainFilters_Holder.get_Variable_Dynamic_ModificationsOnReportedPeptide_For_ReportedPeptideId(reportedPeptideId);
                    if ( dynamicModifications ) {
                        for ( const dynamicModification of dynamicModifications ) {
                            modificationLocations_PeptideLevel.add(dynamicModification.position)
                        }
                    }
                }
                if ( staticMods_Holder.get_StaticMods() ) {
                    let staticModIndex = -2; // arbitrary initial value
                    for ( const staticMod of staticMods_Holder.get_StaticMods() ) {
                        let startSearchIndex = 0;
                        while ( ( staticModIndex = peptideSequenceString.indexOf( staticMod.residue, startSearchIndex ) ) != -1 ) {
                            let staticModPosition = staticModIndex + 1; // add "1" to index to get position which is "1" based
                            modificationLocations_PeptideLevel.add( staticModPosition );
                            startSearchIndex = staticModIndex + 1; // move startSearchIndex to after found staticModIndex
                        }
                    }
                }

                /**
                 * Missed Cleavages for Peptide, after considering Variable/Dynamic and Static modifications at those positions.
                 */
                const missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased: Set<number> = new Set<number>();

                {
                    const matchesIterator = peptideSequenceString.matchAll( TRYPSIN_CLEAVAGE_REGEX );

                    for ( const match of matchesIterator ) {

                        const foundMatchPosition = match.index + 1;  //  positions are "1" based, so add "1"

                        if ( ! modificationLocations_PeptideLevel.has( foundMatchPosition ) ) {

                            if ( missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased ) {
                                missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased.add(foundMatchPosition);
                            }
                        }
                    }
                }

                //  Compute Here if Missed Cleavage Count passes Filters for Reported Peptide level Modifications

                let missedCleavageCount_PassesFilters_For_ONLY_ReportedPeptideLevel_and_Static_Modifications = false;
                {

                    const missedCleavageCount = missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased.size

                    const missedCleavageCount__From__Filter = peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter()
                    const missedCleavageCount__To__Filter = peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter()

                    if ( (
                        missedCleavageCount__From__Filter === undefined || missedCleavageCount__From__Filter === null ||   missedCleavageCount__From__Filter <= missedCleavageCount
                    ) && (
                        missedCleavageCount__To__Filter === undefined || missedCleavageCount__To__Filter === null ||   missedCleavageCount <= missedCleavageCount__To__Filter
                    )
                    ) {
                        missedCleavageCount_PassesFilters_For_ONLY_ReportedPeptideLevel_and_Static_Modifications = true;
                    }
                }

                if ( ! dataPage_common_Flags_SingleSearch.anyPsmHas_OpenModifications ) {

                    //  Search NOT have Open Modifications on PSMs

                    if ( missedCleavageCount_PassesFilters_For_ONLY_ReportedPeptideLevel_and_Static_Modifications ) {
                        //  Reported Peptide passes Missed Cleavage count so add to internal result

                        const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined
                        })

                        results_Internal.push(result);
                    }

                } else {

                    //  Search HAS Open Modifications on PSMs

                    let psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId: CommonData_LoadedFromServer_SingleSearch__OpenModifications_On_PSM_For_ReportedPeptideId;

                    if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
                        //  Get the open mods where the mass does NOT round to zero
                        psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId =
                            openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_DropEntriesThatRoundToZero_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
                    } else {
                        //  Get the open mods without any exclusions
                        psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId =
                            openModifications_On_PSM_For_MainFilters_Holder.get_psmOpenModificationMassPerPSM_ForPsmIdMap_For_ReportedPeptideId(reportedPeptideId);
                    }

                    if ( ! psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId ) {

                        //   NO PSM Open Mods for Reported Peptide Id

                        if ( missedCleavageCount_PassesFilters_For_ONLY_ReportedPeptideLevel_and_Static_Modifications ) {
                            //  Reported Peptide passes Missed Cleavage count so add to internal result


                            const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                                reportedPeptideId, psmEntries_Include_Map_Key_PsmId: undefined
                            })

                            results_Internal.push(result);
                        }

                        continue; // EARLY CONTINUE
                    }

                    //   YES PSM Open Mods for Reported Peptide Id.  Process individual PSMs since open mods can be on any position.

                    //  Accumulate Open Mod Positions per Psm Id

                    const openModPositions_On_PSM_Map_Key_PsmId: Map<number, { psmId: number, openModPositions_On_PSM : Set<number> }> = new Map()

                    for ( const psmOpenModificationMassPerPSM_ForPsmIdMapValue of psmOpenModificationMassPerPSM_ForPsmIdMap_ForReportedPeptideId.psmOpenModificationMassPerPSM_ForPsmIdMap.values() ) {

                        const psmId = psmOpenModificationMassPerPSM_ForPsmIdMapValue.psmId;

                        if ( psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition ) {

                            let openModPositions_On_PSM_For_PsmId = openModPositions_On_PSM_Map_Key_PsmId.get(psmId)
                            if ( ! openModPositions_On_PSM_For_PsmId ) {
                                openModPositions_On_PSM_For_PsmId = { openModPositions_On_PSM : new Set<number>(), psmId };
                                openModPositions_On_PSM_Map_Key_PsmId.set(psmId, openModPositions_On_PSM_For_PsmId)
                            }

                            for ( const positionsMapValue of psmOpenModificationMassPerPSM_ForPsmIdMapValue.positionsMap_KeyPosition.values() ) {
                                for ( const positionData of positionsMapValue ) {

                                    // positionData.position;
                                    // positionData.isNTerminal
                                    // positionData.isCTerminal

                                    openModPositions_On_PSM_For_PsmId.openModPositions_On_PSM.add( positionData.position );
                                }
                            }
                        }
                    }

                    //  Process ALL PSM Ids for Reported Peptide Id

                    const psmIdsForReportedPeptideId = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
                    if (!psmIdsForReportedPeptideId) {
                        const msg = "psmIdsForReportedPeptideIdMap.get( reportedPeptideId ) NOT return a value. reportedPeptideId: " + reportedPeptideId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const psms_Include__Meet_MissedCleavage_Count_Filter__Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

                    for ( const psmId of psmIdsForReportedPeptideId ) {

                        const openModPositions_On_PSM_For_PsmId = openModPositions_On_PSM_Map_Key_PsmId.get(psmId)

                        if ( ! openModPositions_On_PSM_For_PsmId ) {

                            //  NO Open Mod Positions for Psm Id so use Reported Peptide Missed Cleavage Count

                            if ( missedCleavageCount_PassesFilters_For_ONLY_ReportedPeptideLevel_and_Static_Modifications ) {
                                //  Passed Reported Peptide Missed Cleavage Count filtering

                                const psmResult = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                                    psmId
                                })

                                psms_Include__Meet_MissedCleavage_Count_Filter__Map_Key_PsmId.set( psmResult.psmId, psmResult );
                            }

                            continue;  // EARLY CONTINUE
                        }

                        // YES Open Mod Positions for Psm Id

                        //  clone then update for PSM Id
                        const missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Open_Modifications_OneBased =
                            new Set( missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Modifications_OneBased );

                        //  Remove Open Mod Positions from Missed Cleavage Positions
                        for ( const openModPositions_On_PSM of openModPositions_On_PSM_For_PsmId.openModPositions_On_PSM ) {
                            missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Open_Modifications_OneBased.delete(openModPositions_On_PSM)
                        }

                        const missedCleavageCount_At_PSM_Level = missedCleavagePositions_After_Remove_Variable_Dynamic_Static_Open_Modifications_OneBased.size

                        const missedCleavageCount__From__Filter = peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter()
                        const missedCleavageCount__To__Filter = peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter()

                        if ( (
                            missedCleavageCount__From__Filter === undefined || missedCleavageCount__From__Filter === null || missedCleavageCount__From__Filter <= missedCleavageCount_At_PSM_Level
                        ) && (
                            missedCleavageCount__To__Filter === undefined || missedCleavageCount__To__Filter === null ||   missedCleavageCount_At_PSM_Level <= missedCleavageCount__To__Filter
                        )
                        ) {
                            //  Psm under Reported Peptide passes Missed Cleavage count so add to result

                            const psmResult = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                                psmId
                            })

                            psms_Include__Meet_MissedCleavage_Count_Filter__Map_Key_PsmId.set( psmResult.psmId, psmResult );
                        }

                    }

                    //  Done Processing PSMs.

                    if ( psms_Include__Meet_MissedCleavage_Count_Filter__Map_Key_PsmId.size > 0 ) {

                        //  Have PSM Ids so add the Reported Peptide and the Psm Ids to the Result

                        const result = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psms_Include__Meet_MissedCleavage_Count_Filter__Map_Key_PsmId
                        })
                    }
                }
            }

            // this._user_Selection_CachedResults = {
            //     countFilter_From: peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__From__Filter(),
            //     countFilter_To: peptideSequence_MissedCleavageCount_UserSelections_StateObject.get_missedCleavageCount__To__Filter(),
            //     cached_Results: results_Internal
            // }
        }

        //  Build returned result

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for ( const results_Internal_Entry of results_Internal ) {

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey(results_Internal_Entry);
        }

        return resultData;
    }
}




////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for User Search String to search Protein or Peptide Sequences
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId


    // DO NOT ADD Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"


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
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ): Internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection {

        return new Internal_ComputeFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'
     *
     */
    getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            scan_RetentionTime_MZ_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! scan_RetentionTime_MZ_UserSelection_StateObject )
            || ( ! scan_RetentionTime_MZ_UserSelection_StateObject.is_Any_FilterHaveValue()  ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const getData_Result = this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_GetData({})
        if ( getData_Result.data ) {
            return { promise: undefined, result: this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_AfterGetData({
                    reportedPeptideIds_ProteinId_Params_PassedIn,
                    scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                    psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
                    scanData_WholeSearch_NO_Peaks_Data_Holder: getData_Result.data.scanData_WholeSearch_NO_Peaks_Data_Holder,
                })
            }
        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {
                        const result = this._getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_AfterGetData({
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            scan_RetentionTime_MZ_UserSelection_StateObject,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
                            scanData_WholeSearch_NO_Peaks_Data_Holder: value_getData_Result.scanData_WholeSearch_NO_Peaks_Data_Holder
                        })
                        resolve(result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'  GetData
     *
     */
    private _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_GetData(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            scanData_WholeSearch_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            scanData_WholeSearch_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let scanData_WholeSearch_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {  // psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        {  // scanData_WholeSearch_NO_Peaks_Data_Holder
            const get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data().
                get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch()
            if ( get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result.data ) {
                scanData_WholeSearch_NO_Peaks_Data_Holder = get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result.data.scanData_WholeSearch_NO_Peaks_Data_Holder
            } else if ( get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result.promise.then(value_get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result => { try {
                        scanData_WholeSearch_NO_Peaks_Data_Holder = value_get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result.scanData_WholeSearch_NO_Peaks_Data_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_ScanData_WholeSearch_NO_Peaks_DataHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, scanData_WholeSearch_NO_Peaks_Data_Holder
                }}
        }


        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
                scanData_WholeSearch_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder, scanData_WholeSearch_NO_Peaks_Data_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     * User has selected 'Filter on Retention Time (Minutes):' and/or 'Filter on Precursor M/Z:'  AfterGetData
     *
     */
    private _getFor__SelectionType_ALL___For__Scan_RetentionTime_MZ_UserSelection_AfterGetData(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            scanData_WholeSearch_NO_Peaks_Data_Holder
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            scanData_WholeSearch_NO_Peaks_Data_Holder: CommonData_LoadedFromServer_SingleSearch__ScanData_WholeSearch_NO_Peaks_Data_Holder
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS {

        //  Any of these may return undefined or null
        const scanRetentionTime__From__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_retentionTime_InMinutes__From__Filter();
        const scanRetentionTime__To__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_retentionTime_InMinutes__To__Filter();
        const scanMZ__From__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_mz__From__Filter();
        const scanMZ__To__Filter = scan_RetentionTime_MZ_UserSelection_StateObject.get_mz__To__Filter();

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            let psmIds_to_Check = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId);
            if ( ! psmIds_to_Check ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn(msg);
                throw Error(msg);
            }

            const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

            for ( const psmId of psmIds_to_Check ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId);
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId); returned nothing. psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let retentionTimeSeconds_ForFiltering = psmTblData_For_PsmId.retentionTimeSeconds
                let precursor_M_Over_Z_ForFiltering = psmTblData_For_PsmId.precursor_M_Over_Z

                if ( (
                        ( ( scanRetentionTime__From__Filter !== undefined && scanRetentionTime__From__Filter !== null )
                            || ( scanRetentionTime__To__Filter !== undefined && scanRetentionTime__To__Filter !== null ) )
                        && ( retentionTimeSeconds_ForFiltering === undefined || retentionTimeSeconds_ForFiltering === null ) )
                    || (
                        ( ( scanMZ__From__Filter !== undefined && scanMZ__From__Filter !== null )
                            || ( scanMZ__To__Filter !== undefined && scanMZ__To__Filter !== null ) )
                        &&  ( precursor_M_Over_Z_ForFiltering === undefined || precursor_M_Over_Z_ForFiltering === null ) ) ) {

                    //  Filtering on Retention Time or Precursor M/Z and NOT have the associated value on the PSM so get from Scan

                    if ( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ) {
                        const msg = "( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ). psmId: " + psmId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    const scanData_WholeSearch_NO_Peaks_Data_Holder_For_SearchScanFileId = scanData_WholeSearch_NO_Peaks_Data_Holder.get_ScanData_WholeSearch_NO_Peaks_Data_For_SearchScanFileId(psmTblData_For_PsmId.searchScanFileId)
                    if ( ! scanData_WholeSearch_NO_Peaks_Data_Holder_For_SearchScanFileId ) {
                        const msg = "scanData_WholeSearch_NO_Peaks_Data_Holder.get_ScanData_WholeSearch_NO_Peaks_Data_For_SearchScanFileId(psmTblData_For_PsmId.searchScanFileId) returned nothing. psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                        console.warn(msg);
                        throw Error(msg);
                    }
                    let spectralStorage_NO_Peaks_Data_For_ScanNumber = scanData_WholeSearch_NO_Peaks_Data_Holder_For_SearchScanFileId.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_For_PsmId.scanNumber);
                    if ( ! spectralStorage_NO_Peaks_Data_For_ScanNumber ) {
                        const msg = "scanData_WholeSearch_NO_Peaks_Data_Holder_For_SearchScanFileId.scanData.get_ScanData_NO_Peaks_For_ScanNumber( psmTblData_For_PsmId.scanNumber); returned nothing. psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                        console.warn(msg);
                        throw Error(msg);
                    }

                    let spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 = spectralStorage_NO_Peaks_Data_For_ScanNumber;

                    while ( spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2.level !== 2 ) {

                        // have scan level > 2 so get MS 2 scan for filtering

                        const parentScanNumber = spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2.parentScanNumber;
                        spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 = scanData_WholeSearch_NO_Peaks_Data_Holder_For_SearchScanFileId.scanData.get_ScanData_NO_Peaks_For_ScanNumber(parentScanNumber);
                        if ( ! spectralStorage_NO_Peaks_Data_For_ScanNumber_ScanLevel_2 ) {
                            const msg = "scanData_WholeSearch_NO_Peaks_Data_Holder_For_SearchScanFileId.scanData.get_ScanData_NO_Peaks_For_ScanNumber( parentScanNumber); returned nothing. parentScanNumber: " + parentScanNumber + ", psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                            console.warn(msg);
                            throw Error(msg);
                        }
                    }

                    if ( retentionTimeSeconds_ForFiltering === undefined || retentionTimeSeconds_ForFiltering === null ) {
                        retentionTimeSeconds_ForFiltering = spectralStorage_NO_Peaks_Data_For_ScanNumber.retentionTime_InSeconds
                    }

                    if ( precursor_M_Over_Z_ForFiltering === undefined || precursor_M_Over_Z_ForFiltering === null ) {
                        precursor_M_Over_Z_ForFiltering = spectralStorage_NO_Peaks_Data_For_ScanNumber.precursor_M_Over_Z
                    }
                }

                if ( retentionTimeSeconds_ForFiltering === undefined || retentionTimeSeconds_ForFiltering === null ) {
                    const msg = "retentionTimeSeconds_ForFiltering is computed to undefined or null, psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( precursor_M_Over_Z_ForFiltering === undefined || precursor_M_Over_Z_ForFiltering === null ) {
                    const msg = "precursor_M_Over_Z_ForFiltering is computed to undefined or null, psmTblData_For_PsmId.scanNumber: " + psmTblData_For_PsmId.scanNumber + ", psmTblData_For_PsmId.searchScanFileId: " + psmTblData_For_PsmId.searchScanFileId + ", psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let psmOrScan_Values_MeetsFilters = true;
                {
                    const retentionTime_InMinutes = retentionTimeSeconds_ForFiltering / 60;

                    if ( scanRetentionTime__From__Filter !== undefined && scanRetentionTime__From__Filter !== null ) {
                        if ( retentionTime_InMinutes < scanRetentionTime__From__Filter ) {
                            psmOrScan_Values_MeetsFilters = false;
                        }
                    }
                    if ( psmOrScan_Values_MeetsFilters ) {
                        if ( scanRetentionTime__To__Filter !== undefined && scanRetentionTime__To__Filter !== null ) {
                            if ( retentionTime_InMinutes > scanRetentionTime__To__Filter ) {
                                psmOrScan_Values_MeetsFilters = false;
                            }
                        }
                    }
                }
                {
                    if ( psmOrScan_Values_MeetsFilters ) {
                        if ( scanMZ__From__Filter !== undefined && scanMZ__From__Filter !== null ) {
                            if ( precursor_M_Over_Z_ForFiltering < scanMZ__From__Filter ) {
                                psmOrScan_Values_MeetsFilters = false;
                            }
                        }
                    }
                    if ( psmOrScan_Values_MeetsFilters ) {
                        if ( scanMZ__To__Filter !== undefined && scanMZ__To__Filter !== null ) {
                            if ( precursor_M_Over_Z_ForFiltering > scanMZ__To__Filter ) {
                                psmOrScan_Values_MeetsFilters = false;
                            }
                        }
                    }
                }

                if ( psmOrScan_Values_MeetsFilters ) {

                    if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {
                        const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            psmId
                        })
                        psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                    }
                }
            }

            if ( psmEntries_Include_Map_Key_PsmId.size === 0 ) {
                //  No PSMs are in selected so skip
                continue; // EARLY CONTINUE
            }

            const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS({
                reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
            });

            resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
        }

        return resultData;
    }
}





////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

/**
 * Internal class for - Get for User Scan Peaks
 *
 * Separate class to support caching of results
 *
 */
class Internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject {

    private _projectSearchId: number;
    private _commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId


    // DO NOT ADD Cache results since this code is now called with subset of Reported Peptide Ids for "Include all versions of peptides found using modification filters:"


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
        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId = commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
    }

    /**
     *
     * @param projectSearchId
     * @param commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
     */
    static getNewInstance(
        {
            projectSearchId, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }: {
            projectSearchId: number;
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        }
    ): Internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject {

        return new Internal_ComputeFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject({
            projectSearchId,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId
        })
    }

    /**
     * User has selected
     *
     */
    getFor__SelectionType_ALL___For__ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
        }): Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS {

        if ( ( ! scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject )
            || ( ! scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.is_AnySelections()  ) ) {

            //  NO Filtering

            const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
                noFilter_OR_FilterHasNoData: true, includeAll_ReportedPeptideIds: false
            });
            const result : Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FUNCTION_RESULT__FILTERING_INTERNAL_CLASS = {
                result: resultData,
                promise: undefined
            };

            return result; // EARLY RETURN
        }

        const getData_Result = this._getData_Step_1({})
        if ( getData_Result.data ) {

            const afterGetData_Step_1_Result_Promise = this._afterGetData_Step_1({
                reportedPeptideIds_ProteinId_Params_PassedIn,
                scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: getData_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
            })
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    afterGetData_Step_1_Result_Promise.catch(reason => reject(reason));
                    afterGetData_Step_1_Result_Promise.then(value_afterGetData_Step_1_Result => { try {
                        resolve(value_afterGetData_Step_1_Result);
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}) }

        } else if ( getData_Result.promise ) {
            return { result: undefined, promise: new Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS>((resolve, reject) => { try {
                    getData_Result.promise.catch(reason => reject(reason));
                    getData_Result.promise.then(value_getData_Result => { try {

                        const afterGetData_Step_1_Result_Promise = this._afterGetData_Step_1({
                            reportedPeptideIds_ProteinId_Params_PassedIn,
                            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
                            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
                            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: value_getData_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                        })
                        afterGetData_Step_1_Result_Promise.catch(reason => reject(reason));
                        afterGetData_Step_1_Result_Promise.then(value_afterGetData_Step_1_Result => { try {
                            resolve(value_afterGetData_Step_1_Result);
                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            }
        } else {
            throw Error("getData_Result: no data or promise")
        }
    }

    /**
     *  GetData step 1
     *
     */
    private _getData_Step_1(
        {
        }: {
        }): {
        data: {
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }
        promise: Promise<{
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }>
    } {
        let psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder = undefined
        let psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder = undefined

        const promises: Array<Promise<void>> = [];

        { // psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters().
                get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result.psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }
        {  // psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            const get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result =
                this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters().
                get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch();
            if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data ) {
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.data.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
            } else if ( get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise ) {
                const promise = new Promise<void>((resolve, reject) => {try {
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.catch(reason => { reject(reason)})
                    get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.promise.then(value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result => { try {
                        psmTblData_For_ReportedPeptideId_For_MainFilters_Holder = value_get_PSM_TblData_For_ReportedPeptideIdHolder_AllForSearch_Result.psmTblData_For_ReportedPeptideId_For_MainFilters_Holder;
                        resolve();
                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                promises.push(promise);
            } else {
                throw Error("get_PSM_IDs_For_ReportedPeptideIdHolder_AllForSearch_Result: no data or promise")
            }
        }

        if ( promises.length === 0 ) {

            //  EARLY RETURN

            return { promise: undefined, data: {
                    psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder
                }}
        }


        const promises_All = Promise.all(promises)

        return { data: undefined, promise: new Promise<{
                psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
                psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
            }>((resolve, reject) => { try {
                promises_All.catch(reason => reject(reason));
                promises_All.then(noValue => { try {
                    resolve({ psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder, psmTblData_For_ReportedPeptideId_For_MainFilters_Holder });
                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        }
    }

    /**
     *   AfterGetData Step 1
     *
     *   async method
     *
     */
    private async _afterGetData_Step_1(
        {
            reportedPeptideIds_ProteinId_Params_PassedIn,
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject,
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder,
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder,
        }: {
            reportedPeptideIds_ProteinId_Params_PassedIn: Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_SingleProjectSearchId_INTERNAL_Filtering_ReportedPeptideIds_ProteinId_Params_PassedIn
            scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject : ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject
            psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_IDs_For_ReportedPeptideId_For_MainFilters_Holder
            psmTblData_For_ReportedPeptideId_For_MainFilters_Holder: CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder
        }): Promise<Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS> {


        //  Process all PSMs to get scan data and compute ranges of m/z to get scan peaks for

        const resultData = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__FILTERING_INTERNAL_CLASS({
            noFilter_OR_FilterHasNoData: false, includeAll_ReportedPeptideIds: false
        });


        // const psmTblData_For_PsmId__Array__Map_Key_PsmCharge_Map_Key_SearchScanFileId : Map<number, Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>>> = new Map()

        //  Remove Map on PsmCharge

        const psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId : Map<number, Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = new Map()

        for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {

            const psmTblData_For_ReportedPeptideId = psmTblData_For_ReportedPeptideId_For_MainFilters_Holder.get_PsmTblData_For_ReportedPeptideId( reportedPeptideId );
            if ( ! psmTblData_For_ReportedPeptideId ) {
                const msg = "dataPage_common_Data_Holder_SingleSearch_PsmTblData_Root.get_PsmTblData_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn( msg );
                throw Error( msg );
            }

            let psmIds_to_Check = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId );
            if ( ! psmIds_to_Check ) {
                const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                console.warn( msg );
                throw Error( msg );
            }

            for ( const psmId of psmIds_to_Check ) {

                const psmTblData_For_PsmId = psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId( psmId );
                if ( ! psmTblData_For_PsmId ) {
                    const msg = "psmTblData_For_ReportedPeptideId.get_PsmTblData_For_PsmId(psmId); returned nothing. psmId: " + psmId;
                    console.warn( msg );
                    throw Error( msg );
                }
                if ( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ) {
                    const msg = "( psmTblData_For_PsmId.searchScanFileId === undefined || psmTblData_For_PsmId.searchScanFileId === null ). psmId: " + psmId;
                    console.warn(msg);
                    throw Error(msg);
                }

                let psmTblData_For_PsmId__Array = psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId.get( psmTblData_For_PsmId.searchScanFileId )
                if ( ! psmTblData_For_PsmId__Array ) {
                    psmTblData_For_PsmId__Array = []
                    psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId.set( psmTblData_For_PsmId.searchScanFileId, psmTblData_For_PsmId__Array )
                }


                psmTblData_For_PsmId__Array.push( psmTblData_For_PsmId )
            }
        }

        //////////

        const  scanPeaks_That_PassFilters_Array__Map_Key_PsmId__AllForSearch: Map<number, Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak>> = new Map()

        const scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId__Map_Key_PsmId__AllForSearch: Map<number, Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY>> = new Map()


        //  Process each group of PSMs by charge by search scan file

        for ( const psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId__MapEntry of psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId ) {
            const searchScanFileId = psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId__MapEntry[ 0 ]
            const psmTblData_For_PsmId__Array = psmTblData_For_PsmId__Array__Map_Key_SearchScanFileId__MapEntry[1]

            //  Sort PSMs on scan number
            psmTblData_For_PsmId__Array.sort( (a,b ) => {
                if ( a.scanNumber < b.scanNumber ) {
                    return -1
                }
                if ( a.scanNumber < b.scanNumber ) {
                    return 1
                }
                return 0
            })

            const m_over_Z_Ranges: Array<{
                m_over_Z_Range_Min: number;
                m_over_Z_Range_Max: number;
            }> = []

            const _CHARGE_RANGE_START = 1
            const _CHARGE_RANGE_END = 1

            for ( let  charge_FOR_MassRange = _CHARGE_RANGE_START; charge_FOR_MassRange <= _CHARGE_RANGE_END; charge_FOR_MassRange++ ) {

                for ( const scanPeak_M_Over_Z__Intensity_Selection of scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {

                    const m_Over_Z_Mass_Base = scanPeak_M_Over_Z__Intensity_Selection.massOverCharge

                    const ppm_Mass_M_Over_Z_Min_PlusMinus = m_Over_Z_Mass_Base * scanPeak_M_Over_Z__Intensity_Selection.plus_Minus_MassRange_In_PPM / 1000000;  //  1000000d is for 1E6;

                    const m_over_Z_Range_Min = m_Over_Z_Mass_Base - ppm_Mass_M_Over_Z_Min_PlusMinus
                    const m_over_Z_Range_Max = m_Over_Z_Mass_Base + ppm_Mass_M_Over_Z_Min_PlusMinus

                    m_over_Z_Ranges.push( { m_over_Z_Range_Min, m_over_Z_Range_Max } )
                }
            }

            let maxScanDataWithPeaksReturnCount__FromServer: number

            {
                //  Get MaxScanDataWithPeaksReturnCount every request and Store in module wide variable
                const maxScanDataWithPeaksReturnCount =
                    await commonData_LoadedFromServer_SingleSearch_From_ProjectSearchId__Get_MaxScanDataWithPeaksReturnCount_AccessControl_ProjectSearchId_ReturnPromise( { projectSearchId: this._projectSearchId } )

                maxScanDataWithPeaksReturnCount__FromServer = maxScanDataWithPeaksReturnCount.maxScanDataWithPeaksReturnCount
            }

            //  Put PSMs in blocks of _NUMBER_SCANS_RETRIEVED_AT_A_TIME

            const psmTblData_For_PsmId__Array__Array: Array<Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId>> = []

            {
                const _NUMBER_SCANS_RETRIEVED_AT_A_TIME = maxScanDataWithPeaksReturnCount__FromServer

                let psmTblData_For_PsmId__Array__SingleBlock: Array<CommonData_LoadedFromServer_SingleSearch__PSM_TblData_For_ReportedPeptideId_For_MainFilters_Holder__ForSinglePsmId> = []

                for ( const psmTblData_For_PsmId of psmTblData_For_PsmId__Array ) {

                    psmTblData_For_PsmId__Array__SingleBlock.push( psmTblData_For_PsmId )
                    if ( psmTblData_For_PsmId__Array__SingleBlock.length >= _NUMBER_SCANS_RETRIEVED_AT_A_TIME ) {
                        psmTblData_For_PsmId__Array__Array.push( psmTblData_For_PsmId__Array__SingleBlock )
                        psmTblData_For_PsmId__Array__SingleBlock = []
                    }
                }
                if ( psmTblData_For_PsmId__Array__SingleBlock.length > 0 ) {
                    //  Add last block
                    psmTblData_For_PsmId__Array__Array.push( psmTblData_For_PsmId__Array__SingleBlock )
                    psmTblData_For_PsmId__Array__SingleBlock = []
                }
            }

            for ( const psmTblData_For_PsmId__Array__SingleBlock of psmTblData_For_PsmId__Array__Array ) {

                const scanNumber_Set: Set<number> = new Set()

                for ( const psmTblData_For_PsmId of psmTblData_For_PsmId__Array__SingleBlock ) {
                    scanNumber_Set.add( psmTblData_For_PsmId.scanNumber )
                }

                //  !!! WARNING:  NOT all scan numbers requested may result in scans returned, since filtering on scan peak m/z

                const get_SingleScanFile_ScanData_For_M_Over_Z_Ranges_Result =
                    await
                        this._commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Single_ProjectSearchId.
                        get_commonData_LoadedFromServer_SingleSearch__ScanData_For_Single_SearchScanFileId_AndOtherParams_YES_Peaks_Data().get_ScanData_ALL_For_Single_SearchScanFileId_YES_Peaks_Data_ForSearchScanFileId_AndOtherParameters_ReturnPromise( {
                            searchScanFileId,
                            scanNumber_Set,
                            m_over_Z_Ranges: m_over_Z_Ranges,
                            yes_CacheResults_InJS: true
                        } )


                for ( const psmTblData_For_PsmId of psmTblData_For_PsmId__Array__SingleBlock ) {

                    if ( psmTblData_For_PsmId.scanNumber === 52401 ) {
                        var z = 0
                    }

                    const scanData_YES_Peaks_Data = get_SingleScanFile_ScanData_For_M_Over_Z_Ranges_Result.scanData_Single_SearchScanFileId_YES_Peaks_Data_Holder.scanData_YES_Peaks_Data_Holder.scanData.get_ScanData_YES_Peaks_For_ScanNumber( psmTblData_For_PsmId.scanNumber )

                    if ( scanData_YES_Peaks_Data ) {

                        if ( ! scanData_YES_Peaks_Data.peaks ) {
                            //  NO Scan Peaks. Error
                            const msg = "Scan from scanData_YES_Peaks_Data_Holder has NO Peaks"
                            console.warn(msg)
                            throw Error(msg)
                        }
                        if ( ! scanData_YES_Peaks_Data.peak_WithMaxIntensityInAllOfScan ) {
                            //  NO Scan peak_WithMaxIntensityInAllOfScan. Error
                            const msg = "Scan from scanData_YES_Peaks_Data_Holder has NO peak_WithMaxIntensityInAllOfScan"
                            console.warn(msg)
                            throw Error(msg)
                        }

                        const scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_SinglePeak: Array<ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject__ENTRY> = []

                        const  scanPeak_That_PassFilters_Array: Array<CommonData_LoadedFromServer_From_ProjectScanFileId_Optional_M_Z__ScanData_YES_Peaks_DataForSingleScanNumber_SinglePeak> = []

                        let scanMustPass_ALL_Filters = false

                        if ( scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get_anyAll_Selection() === ScanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject_ANY_ALL_Selection_Enum.ALL ) {
                            scanMustPass_ALL_Filters = true
                        }

                        const selections_Count = scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections().length

                        {
                            for ( const scanPeak_M_Over_Z__Intensity_Selection of scanPeak_M_Over_Z__Intensity_Filter_UserSelection_StateObject.get__Selections() ) {

                                let scanPasses_Single_Filter = false

                                for ( const scanPeak of scanData_YES_Peaks_Data.peaks ) {

                                    const m_Over_Z_Mass_Base = scanPeak_M_Over_Z__Intensity_Selection.massOverCharge

                                    const ppm_Mass_M_Over_Z_Min_PlusMinus = m_Over_Z_Mass_Base * scanPeak_M_Over_Z__Intensity_Selection.plus_Minus_MassRange_In_PPM / 1000000;  //  1000000d is for 1E6;

                                    const m_over_Z_Range_Min = m_Over_Z_Mass_Base - ppm_Mass_M_Over_Z_Min_PlusMinus
                                    const m_over_Z_Range_Max = m_Over_Z_Mass_Base + ppm_Mass_M_Over_Z_Min_PlusMinus

                                    //  Apply Min Percentage of Max Scan Peak filter

                                    const min_ScanPeak_Intensity_FilterOn =
                                        scanData_YES_Peaks_Data.peak_WithMaxIntensityInAllOfScan.intensity *
                                        ( scanPeak_M_Over_Z__Intensity_Selection.scanPeak_Intensity_Minimum_Percentage_MaxScanPeakIntensity_In_Scan / 100 )  // Percentage to Fraction so divide by 100

                                    if ( scanPeak.mz >= m_over_Z_Range_Min && scanPeak.mz <= m_over_Z_Range_Max ) {

                                        if ( scanPeak.intensity >= min_ScanPeak_Intensity_FilterOn ) {

                                            scanPasses_Single_Filter = true

                                            //  Save Scan filter since found matching peak

                                            if ( ! scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_SinglePeak.includes( scanPeak_M_Over_Z__Intensity_Selection ) ) {
                                                scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_SinglePeak.push( scanPeak_M_Over_Z__Intensity_Selection )
                                            }

                                            //  Save Scan Peak that matched filter

                                            if ( ! scanPeak_That_PassFilters_Array.includes( scanPeak ) ) {
                                                scanPeak_That_PassFilters_Array.push( scanPeak )
                                            }

                                        }
                                    }
                                }

                                if ( ! scanPasses_Single_Filter ) {

                                    if ( scanMustPass_ALL_Filters ) {

                                        //  Scan must pass all filters and not pass this filter so early exit

                                        break // EARLY BREAK
                                    }
                                }
                            }
                        }

                        if ( ( ( ! scanMustPass_ALL_Filters ) && scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_SinglePeak.length > 0 )
                            || ( scanMustPass_ALL_Filters && scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_SinglePeak.length === selections_Count ) ) {

                            //  'ANY' Selection and found at least one filter passed
                            //  'ALL' Selection and found ALL filters passed

                            {
                                let scanPeak_That_PassFilters_Array_FromMap = scanPeaks_That_PassFilters_Array__Map_Key_PsmId__AllForSearch.get( psmTblData_For_PsmId.psmId )
                                if ( scanPeak_That_PassFilters_Array_FromMap ) {
                                    // NOT supposed to be an existing entry
                                    const msg = "scanPeak_That_PassFilters_Array__Map_Key_PsmId__AllForSearch.get( psmTblData_For_PsmId.psmId ) returned a value"
                                    console.warn( msg )
                                    throw Error( msg )

                                } else {
                                    scanPeaks_That_PassFilters_Array__Map_Key_PsmId__AllForSearch.set( psmTblData_For_PsmId.psmId, scanPeak_That_PassFilters_Array )
                                }
                            }
                            {
                                let scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_FromMap = scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId__Map_Key_PsmId__AllForSearch.get( psmTblData_For_PsmId.psmId )
                                if ( scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_FromMap ) {
                                    // NOT supposed to be an existing entry
                                    const msg = "scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId__Map_Key_PsmId__AllForSearch.get( psmTblData_For_PsmId.psmId ) returned a value"
                                    console.warn( msg )
                                    throw Error( msg )

                                } else {
                                    scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId__Map_Key_PsmId__AllForSearch.set( psmTblData_For_PsmId.psmId, scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_SinglePeak )
                                }
                            }
                        }
                    }
                }
            }

            ////////////////

            //  Create Output

            for (const reportedPeptideId of reportedPeptideIds_ProteinId_Params_PassedIn.reportedPeptideIds_StartingPointForFiltering ) {

                let psmIds_to_Check = psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId( reportedPeptideId );
                if ( ! psmIds_to_Check ) {
                    const msg = "psm_IDs_For_ReportedPeptideId_For_MainFilters_Holder.get_psmIds_For_ReportedPeptideId(reportedPeptideId); returned nothing. " + reportedPeptideId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const psmEntries_Include_Map_Key_PsmId: Map<number, Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS> = new Map()

                for ( const psmId of psmIds_to_Check ) {

                    const scanPeaks_That_PassFilters_Array_For_PsmId = scanPeaks_That_PassFilters_Array__Map_Key_PsmId__AllForSearch.get( psmId )

                    if ( ! scanPeaks_That_PassFilters_Array_For_PsmId ) {
                        //  Skip since not in Found...
                        continue // EARLY CONTINUE
                    }

                    const scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId = scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId__Map_Key_PsmId__AllForSearch.get( psmId )

                    if ( ! scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId ) {
                        //  Skip since not in Found...
                        continue // EARLY CONTINUE
                    }

                    if ( ! psmEntries_Include_Map_Key_PsmId.has( psmId ) ) {

                        const psm_Include = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingle_PsmId_Under_ReportedPeptideId__FILTERING_INTERNAL_CLASS({
                            psmId, scanPeaks_That_PassFilters_Array: scanPeaks_That_PassFilters_Array_For_PsmId, scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array: scanPeak_M_Over_Z__Intensity_Selection_FoundPeaksFor_Array_PsmId
                        })
                        psmEntries_Include_Map_Key_PsmId.set( psm_Include.psmId, psm_Include )
                    }
                }

                if ( psmEntries_Include_Map_Key_PsmId.size === 0 ) {
                    //  No PSMs are in selected so skip
                    continue; // EARLY CONTINUE
                }

                const entry = new Peptide__single_protein_ReportedPeptideIds_AndTheir_PSM_IDs__SingleProjectSearchId__ForSingleReportedPeptideId__FILTERING_INTERNAL_CLASS( {
                    reportedPeptideId, psmEntries_Include_Map_Key_PsmId: psmEntries_Include_Map_Key_PsmId
                } );

                resultData.set_Entry_Using_entry_reportedPeptideId_AsKey( entry );
            }
        }

        return resultData;
    }
}