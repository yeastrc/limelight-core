/**
 * qcViewPage_DisplayData__Main_Component.tsx
 *
 * QC Page Main Content:
 *
 * Main Content of QC Page
 *
 */

import React from "react";

import {
    SearchDataLookupParameters_Root,
    SearchDataLookupParams_For_ProjectSearchIds, SearchDataLookupParams_For_Single_ProjectSearchId
} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {ModificationMass_UserSelections_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ReporterIonMass_UserSelections_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideSequence_UserSelections_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData";
import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {PeptideSequence_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections";
import {PeptideUnique_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {ReporterIonMass_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections";
import {ModificationMass_UserSelections_Root} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class,
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {PeptidePage_Display_MainContent_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component_nonClass_Functions";
import {PeptidePage_Display_MainContent_Component_Props_Prop} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";

import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_ReturnPromise} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {SharePage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides,
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Qc_SingleSearch_AA__Root_DisplayBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search_sections/jsx/qc_SingleSearch_AA__Root_DisplayBlock";
import {DataPage_common_Searches_Flags} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_Searches_Flags";
import {
    dataPage_common_Get_Searches_Info,
    DataPage_common_Searches_Info
} from "page_js/data_pages/data_pages_common/search_flags_and_info_retrieval_and_data_objects/dataPage_common_Get_dataPage_common__Searches_Info";
import {QcPage_UpdatingData_BlockCover} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_components/qcPage_UpdatingData_BlockCover";
import {Qc_MultipleSearches_AA__Root_DisplayBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_multiple_searches_sections/jsx/qc_MultipleSearches_AA__Root_DisplayBlock";
import {Qc_compute_Cache_create_GeneratedReportedPeptideListData} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common_compute/generatedReportedPeptideList_Compute/qc_compute_Cache_create_GeneratedReportedPeptideListData";
import {Limelight_Colors_For_MultipleSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches";
import {Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_single_search__sub_searches__sections/jsx/qc_SingleSearch__SubSearches_AA__Root_DisplayBlock";
import {Limelight_Colors_For_SingleSearch__SubSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_SingleSearch__SubSearches";
import {QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_page_root/qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject";
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import {dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData";
import {ScanFilenameId_On_PSM_Filter_UserSelection_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/jsx/scanFilenameId_On_PSM_Filter_UserSelection_Component";
import {Scan_RetentionTime_MZ_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/jsx/scan_RetentionTime_MZ_UserSelections_Component";
import {FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__show_hide__expand_collapse_container_component/filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component";
import {FilterOn_SearchProgramsGroup_ConditionalRender_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__search_programs_group__conditional_render__component/filterOn_SearchProgramsGroup_ConditionalRender_Component";
import {QC_Page_FiltersDisplay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/qc_page/qc_Page_FiltersDisplay";
import {QC_Page_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/qc_page/qc_Page_FiltersDisplay_ComponentData";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {Psm_Charge_Filter_UserSelection_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_Container_Component";
import {purge_FilterSelections_NotIn_CurrentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/purge_filter_selections_not_in_current_data/purge_FilterSelections_NotIn_CurrentData";
import {ProteinPositionFilter_UserSelections__GetsProteinData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/jsx/proteinPositionFilter_UserSelections_Component__Container__GetsProteinData";
import {Psm_Exclude_IndependentDecoy_PSMs_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_exclude_independent_decoy_psms/psm_Exclude_IndependentDecoy_PSMs_UserSelection";
import {QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__render_plot_on_page/qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot";
import {PeptideSequence_MissedCleavageCount_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/jsx/peptideSequence_MissedCleavageCount_UserSelections_Component";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput";
import {QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback} from "page_js/data_pages/project_search_ids_driven_pages/qc_page/qc_common__track_latest_updates_for_user_input/qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component";
import { CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__scan_data__from_project_scan_file_id/commonData_LoadedFromServer_From_ProjectScanFileId___ROOT";
import { CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT } from "page_js/data_pages/common_data_loaded_from_server__feature_detection_data__from_feat_detect_to_project_scan_file_mapping_id/commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT";


/**
 *  Common Data that is passed from this component to all children components for display in
 */
export class QcViewPage_CommonData_To_AllComponents_From_MainComponent {

    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback

    qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput

    projectSearchIds : Array<number>

    currentProjectId_FromDOM: string

    searchSubGroup_Ids_Selected : Set<number>

    propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    propsValue_QC: QcViewPage_DisplayData__Main_Component_Props_Prop

    commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT

    dataPageStateManager : DataPageStateManager
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root
    qcPage_Searches_Flags: DataPage_common_Searches_Flags
    qcPage_Searches_Info: DataPage_common_Searches_Info
    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

    qc_compute_Cache_create_GeneratedReportedPeptideListData: Qc_compute_Cache_create_GeneratedReportedPeptideListData

    //  Call when change the state objects
    updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback : () => void

    //  Special Override of commonData... and getReported... for UNFILTERED Data

    qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING: QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING

    ////

    qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot  // Single instance used across all Plotly Plots
}


/**
 *  Common Data that is passed from this component to all children components for display in
 */
export class QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING {

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: () => Promise<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result>
}

/**
 *
 */
export interface QcViewPage_DisplayData__Main_Component_Props_Prop {

    currentProjectId_FromDOM: string
    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
    qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject : QcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject
}

/**
 *
 */
export interface QcViewPage_DisplayData__Main_Component_Props {

    propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
    propsValue_QC: QcViewPage_DisplayData__Main_Component_Props_Prop
}

/**
 *
 */
interface QcViewPage_DisplayData__Main_Component_State {

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    mainDisplayData_Loaded? : boolean;

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root?: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object?: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING?: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING?: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root?: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchSubGroup_Are_All_SearchSubGroupIds_Selected? : boolean
    searchSubGroup_PropValue? : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object? : object;
    scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject? : object;
    peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject? : object;
    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject?: object;
    psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject?: object;

    qc_Page_FiltersDisplay_ComponentData? : QC_Page_FiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts? : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds;  //  For displaying the Main Content

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts? : boolean;

    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result? : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    //
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue

    qcViewPage_CommonData_To_AllComponents_From_MainComponent?: QcViewPage_CommonData_To_AllComponents_From_MainComponent //  Updated and passed to child components
}

/**
 *
 */
export class QcViewPage_DisplayData__Main_Component extends React.Component< QcViewPage_DisplayData__Main_Component_Props, QcViewPage_DisplayData__Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

    private _NOT_CALLED_Function() {

        //  Test function cast

        const modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback;
    }

    private _qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed_BindThis = this._qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed.bind(this);
    private _searchSubGroup_SelectionsChanged_Callback_BindThis = this._searchSubGroup_SelectionsChanged_Callback.bind(this);
    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis : () => void = this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject.bind(this);
    private _updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_StateObject_Callback.bind(this);
    private _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis = this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback.bind(this);


    private _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback_BindThis : () => void = this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback.bind(this);

    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject_Callback_BindThis = this._updateMadeTo_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject_Callback.bind(this);

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ModificationSelects : ModificationMass_ReporterIon__UserSelections__Coordinator_Class
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ReporterIonSelections : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

    private _dataPage_common_Searches_Flags: DataPage_common_Searches_Flags; // Retrieved from server from dataPageStateManager
    private _dataPage_common_Searches_Info: DataPage_common_Searches_Info; // Retrieved from server

    private _searchesContains_VariableModifications = false;
    private _searchesContains_OpenModifications = false;

    //  Flags Set to true/false in constructor

    private _allSearches_Have_ScanFilenames: boolean
    private _allSearches_Have_ScanData: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    private _anySearches_Have_ScanFilenames: boolean
    private _anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    private _qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot = new QcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot()  //  Common across all Plotly Plots

    private _qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback: QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback

    /**
     *
     */
    constructor(props : QcViewPage_DisplayData__Main_Component_Props) {
        super(props);

        this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback()

        const projectSearchIds = props.propsValue.projectSearchIds;

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._dataPage_common_Searches_Flags = props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags();

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ModificationSelects =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject: new ReporterIonMass_UserSelections_StateObject()
            })

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ReporterIonSelections =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: new ModificationMass_UserSelections_StateObject(),
                reporterIonMass_UserSelections_StateObject: props.propsValue.reporterIonMass_UserSelections_StateObject
            })

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ModificationSelects.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ReporterIonSelections.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
            props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

        //  Main Data Loader object

        const commonData_LoadedFromServer_From_ProjectScanFileId___ROOT = CommonData_LoadedFromServer_From_ProjectScanFileId___ROOT.getNewInstance()

        const commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT = CommonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT.getNewInstance()

        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.getNewInstance({
            projectSearchIds, searchDataLookupParameters_Root: searchDataLookupParamsRoot, dataPageStateManager: props.propsValue.dataPageStateManager,
            commonData_LoadedFromServer_From_ProjectScanFileId___ROOT, commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
        });

        //  Main Filtering object
        const getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object = GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class.getNewInstance({
            projectSearchIds, dataPage_common_Searches_Flags: props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags(),
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        });

        //  NO FILTERING

        let commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
        let getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

        {

            //  Special Override of commonData... and getReported... for UNFILTERED Data

            //  Create searchDataLookupParameters_Root__NO_FILTERING

            const paramsForProjectSearchIdsList : Array<SearchDataLookupParams_For_Single_ProjectSearchId> = [];

            for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {
                const searchDataLookupParams_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId = {
                    projectSearchId,
                    psmFilters: undefined, reportedPeptideFilters: undefined, matchedProteinFilters: undefined,
                    psmAnnTypeDisplay: undefined, reportedPeptideAnnTypeDisplay: undefined, matchedProteinAnnTypeDisplay: undefined
                }
                paramsForProjectSearchIdsList.push(searchDataLookupParams_For_Single_ProjectSearchId);
            }
            /**
             * Populate if the params are for project Search Ids
             */
            const paramsForProjectSearchIds : SearchDataLookupParams_For_ProjectSearchIds = {
                paramsForProjectSearchIdsList
            }
            const searchDataLookupParameters_Root__NO_FILTERING: SearchDataLookupParameters_Root = {
                versionNumber: searchDataLookupParamsRoot.versionNumber,
                paramsForProjectSearchIds
            }

            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING =
                CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.getNewInstance({
                    projectSearchIds: this.props.propsValue.projectSearchIds,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,
                    searchDataLookupParameters_Root: searchDataLookupParameters_Root__NO_FILTERING,
                    commonData_LoadedFromServer_From_ProjectScanFileId___ROOT,
                    commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT
                })

            //  Main Filtering object
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING = GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class.getNewInstance({
                projectSearchIds: this.props.propsValue.projectSearchIds,
                dataPage_common_Searches_Flags: props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags(),
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING
            });
        }


        const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
                propsValue : props.propsValue
            });

        //  Only for Multiple Search

        if ( props.propsValue.projectSearchIds.length > 1 ) {
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue.limelight_Colors_For_MultipleSearches = Limelight_Colors_For_MultipleSearches.getInstance({projectSearchIds: props.propsValue.projectSearchIds});
        }

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : undefined });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        let allSearches_Have_ScanFilenames = true;
        let allSearches_Have_ScanData = true;
        let allSearches_Have_PSM_RetentionTime_Precursor_MZ = true;
        let allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = true;

        let anySearches_Have_ScanFilenames = false;
        let anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = false;

        {
            const projectSearchIds_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = new Set<number>();

            for ( const projectSearchId of props.propsValue.projectSearchIds ) {

                const dataPage_common_Flags_SingleSearch_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId);
                if (!dataPage_common_Flags_SingleSearch_ForProjectSearchId) {
                    const msg = "this.props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId.hasScanFilenames) {
                    allSearches_Have_ScanFilenames = false;
                } else {
                    anySearches_Have_ScanFilenames = true;
                }
                if ( ! dataPage_common_Flags_SingleSearch_ForProjectSearchId.hasScanData) {
                    allSearches_Have_ScanData = false;
                } else {
                    anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = true;
                    projectSearchIds_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData.add( projectSearchId );
                }
            }

            for ( const projectSearchId of props.propsValue.projectSearchIds ) {

                const dataPage_common_Info_SingleSearch_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Info().get_DataPage_common_Searches_Info_SingleSearch_ForProjectSearchId(projectSearchId);
                if (!dataPage_common_Info_SingleSearch_ForProjectSearchId) {
                    const msg = "this.props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags().get_DataPage_common_Flags_SingleSearch_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                if ( ( ! dataPage_common_Info_SingleSearch_ForProjectSearchId.precursor_retention_time__NotNull )
                    || ( ! dataPage_common_Info_SingleSearch_ForProjectSearchId.precursor_m_z__NotNull ) ) {

                    allSearches_Have_PSM_RetentionTime_Precursor_MZ = false;
                } else {
                    projectSearchIds_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData.add( projectSearchId );
                    anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = true;
                }
            }

            for ( const projectSearchId of props.propsValue.projectSearchIds ) {

                if ( ! projectSearchIds_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData.has( projectSearchId ) ) {
                    allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = false;
                    break;
                }
            }
        }

        this._allSearches_Have_ScanFilenames = allSearches_Have_ScanFilenames;
        this._allSearches_Have_ScanData = allSearches_Have_ScanData;
        this._allSearches_Have_PSM_RetentionTime_Precursor_MZ = allSearches_Have_PSM_RetentionTime_Precursor_MZ;
        this._allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData;

        this._anySearches_Have_ScanFilenames = anySearches_Have_ScanFilenames;
        this._anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData = anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData;

        if ( ! this._allSearches_Have_ScanFilenames ) {
            props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();
        }
        if ( ! this._allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) {
            props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();
        }

        this.state = {
            searchDataLookupParamsRoot,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,

            //  NO FILTERING
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING,
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING,

            saveView_Component_React,
            saveView_Component_Props_Prop,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections,
            proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {},
            scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {},
            scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {},
            peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject: {},
            psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: {},
            psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject: {}
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            window.setTimeout( () => {
                try {
                    this._runOnPageLoad();

                } catch( e ) {
                    console.warn("Exception caught in componentDidMount inside setTimeout");
                    console.warn( e );
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    // componentWillUnmount() {
    //     try {
    //
    //     } catch( e ) {
    // 		console.log("Exception caught in componentWillUnmount()");
    // 		console.log( e );
    // 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    // 		throw e;
    // 	}
    // }

    /**
     *  Run on Page Load.  call from componentDidMount
     */
    private _runOnPageLoad() {

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =  // state object populated in constructor
                this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw new Error("No value from this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); for projectSearchId: " + projectSearchId );
            }

            const commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters();

            {  //  Variable Mods
                const get_reportedPeptideIds_HasDynamicModifications_Result = commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters.get_reportedPeptideIds_HasDynamicModifications();

                if ( get_reportedPeptideIds_HasDynamicModifications_Result.data ) {

                    if ( get_reportedPeptideIds_HasDynamicModifications_Result.data.reportedPeptideIds.size > 0 ) {
                        this._searchesContains_VariableModifications = true;
                    }

                } else if ( get_reportedPeptideIds_HasDynamicModifications_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => {
                        try {
                            get_reportedPeptideIds_HasDynamicModifications_Result.promise.catch( reason => {
                                try {
                                    console.warn( "get_reportedPeptideIds_HasDynamicModifications_Result.promise.catch: reason: ", reason )
                                    reject(reason);
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });
                            get_reportedPeptideIds_HasDynamicModifications_Result.promise.then( value => {
                                try {
                                    if ( value.reportedPeptideIds.size > 0 ) {
                                        this._searchesContains_VariableModifications = true;
                                    }
                                    resolve();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                    promises.push(promise);

                } else {
                    throw Error("get_reportedPeptideIds_HasDynamicModifications_Result. neither of 'data' or 'promise' set ");
                }
            }
            {  //  Open Mods
                const get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result = commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters.get_reportedPeptideIds_AnyPsmHas_OpenModifications();

                if ( get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.data ) {

                    if ( get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.data.reportedPeptideIds.size > 0 ) {
                        this._searchesContains_OpenModifications = true;
                    }

                } else if ( get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.promise ) {

                    const promise = new Promise<void>( (resolve, reject) => {
                        try {
                            get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.promise.catch( reason => {
                                try {
                                    console.warn( "get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.promise.catch: reason: ", reason )
                                    reject(reason);
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });
                            get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.promise.then( value => {
                                try {
                                    if ( value.reportedPeptideIds.size > 0 ) {
                                        this._searchesContains_OpenModifications = true;
                                    }
                                    resolve();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            });
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                    promises.push(promise);

                } else {
                    throw Error("get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result. neither of 'data' or 'promise' set ");
                }
            }
        }

        {  //  remove from selection state objects values that are not in the loaded data. (Values that have been for: searches removed, or for values that don't meet new filter cutoffs)

            const promise = purge_FilterSelections_NotIn_CurrentData({
                projectSearchIds : this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject: this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
                psm_Charge_Filter_UserSelection_StateObject:  this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject
            });

            promises.push( promise );
        }

        if ( promises.length === 0 ) {

            //  No wait for data to load.  Continue to next step
            this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });

        } else {
            const promiseAll = Promise.all(promises);
            promiseAll.catch( (reason) => {
                try {
                    console.warn("promise catch: reason: ", reason );
                    throw Error("promise catch: reason: " + reason )
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promiseAll.then( ( reportedPeptideCoreDataArray ) => {
                try {
                    //  All data loaded.  Continue to next step
                    this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        }
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails({ initialPageLoad } : { initialPageLoad : boolean }) {

        const promises_All_TopLevel_Array = new Array<Promise<unknown>>();

        {
            const promise_ToAdd = new Promise<void>( (resolve, reject) => {
                try {
                    const promise = dataPage_common_Get_Searches_Info({ projectSearchIds : this.props.propsValue.projectSearchIds });
                    promise.catch( reason => {
                        try {
                            reject(reason)

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                    promise.then( promiseResult => {

                        this._dataPage_common_Searches_Info = promiseResult;

                        resolve();
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promises_All_TopLevel_Array.push(promise_ToAdd);
        }

        let dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root = undefined;

        if ( this._allSearches_Have_ScanFilenames ) {  // allSearches_Have_ScanFilenames set in constructor

            const promise_ToAdd = new Promise<void>( (resolve, reject) => {
                try {
                    const promise = dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData({ projectSearchIds: this.props.propsValue.projectSearchIds });
                    promise.catch( reason => {
                        try {
                            reject(reason)

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                    promise.then( dataPage_common_Data_Holder_Holder_SearchScanFileData_Root_PromiseResult => {

                        dataPage_common_Data_Holder_Holder_SearchScanFileData_Root = dataPage_common_Data_Holder_Holder_SearchScanFileData_Root_PromiseResult;

                        resolve();
                    })
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

            promises_All_TopLevel_Array.push(promise_ToAdd);
        }

        const promises_All_TopLevel = Promise.all( promises_All_TopLevel_Array );

        promises_All_TopLevel.catch( (reason) => {
            console.warn("promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
            throw Error("promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
        })

        promises_All_TopLevel.then( (promiseResults_Unused ) => {
            try {
                {
                    //  Purge this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject if needed

                    if ( ( ! this._allSearches_Have_ScanFilenames ) || ( ! dataPage_common_Data_Holder_Holder_SearchScanFileData_Root ) ) {

                        this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();
                    } else {
                        //  Remove entries in scanFilenameId_On_PSM_Filter_UserSelection_StateObject NOT IN dataPage_common_Data_Holder_Holder_SearchScanFileData_Root (loaded from server)

                        this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.
                        remove_scanFilenameIds_Selected_NOT_Loaded_In_dataPage_common_Data_Holder_Holder_SearchScanFileData_Root({dataPage_common_Data_Holder_Holder_SearchScanFileData_Root});
                    }
                }

                this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                    initialPageLoad,
                    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    //////

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain(
        {
            initialPageLoad,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        } : {
            initialPageLoad : boolean
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        }
    ) : void {

        this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
            initialPageLoad,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        });
    }

    /**
     *
     */
    private _create__QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING_Object(
        {
            searchSubGroup_Ids_Selected
        } : {
            searchSubGroup_Ids_Selected : Set<number>
        }
    ) : QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING {

        const compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
            async () : Promise<ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result> => {

            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_Result =
                await this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING.getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call
                    not_filtered_position_modification_selections : false,
                    proteinSequenceVersionId : null,
                    searchSubGroup_Ids_Selected: undefined,
                    proteinSequenceWidget_StateObject : undefined,
                    modificationMass_UserSelections_StateObject : undefined,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: undefined,
                    reporterIonMass_UserSelections_StateObject : undefined,
                    peptideUnique_UserSelection_StateObject : undefined,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject : undefined,
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : undefined,
                    peptideSequence_UserSelections_StateObject : undefined,
                    userSearchString_LocationsOn_ProteinSequence_Root : null,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : undefined,
                    scan_RetentionTime_MZ_UserSelection_StateObject : undefined,
                    psm_Charge_Filter_UserSelection_StateObject: undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

                const result =
                    await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                        dataPageStateManager: this.props.propsValue.dataPageStateManager,
                        searchSubGroup_Ids_Selected: undefined, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: getReportedPeptideIdsForDisplay_AllProjectSearchIds_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING
                    });

                return result;
            }

        const qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING: QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING = {
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING,
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING,
            compute_For_UNFILTERED__proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
        }

        return qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING
    }

    /**
     * Make 'async' so can use 'await'
     *
     * @param initialPageLoad
     * @param proteinPositionFilter_UserSelections_StateObject
     * @param loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
     * @param loadedDataCommonHolder
     * @private
     */
    private async _recompute_FullPage_Except_SearchDetails__SubPart_Main(
        {
            initialPageLoad,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        } : {
            initialPageLoad : boolean
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        }
    ) : Promise<void> {
        try {
            const {
                searchSubGroup_Ids_Selected,
                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue,
                modificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
                reporterIons_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData,
                peptideSequence_UserSelections_ComponentData,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

            } :  {
                searchSubGroup_Ids_Selected : Set<number>
                searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean
                searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
                modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
                reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
                peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

            }  = await PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_FullPage_Except_SearchDetails({

                propsValue : this.props.propsValue,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
                psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
            });

            const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
                await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,
                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            const qc_compute_Cache_create_GeneratedReportedPeptideListData = new Qc_compute_Cache_create_GeneratedReportedPeptideListData({
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                projectSearchIds: this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            });

            const qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent = {
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback: this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback,
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput: new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput(),
                projectSearchIds: this.props.propsValue.projectSearchIds,
                currentProjectId_FromDOM: this.props.propsValue_QC.currentProjectId_FromDOM,
                searchSubGroup_Ids_Selected,
                propsValue : this.props.propsValue,
                propsValue_QC : this.props.propsValue_QC,
                commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT(),
                searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot,
                qcPage_Searches_Flags: this._dataPage_common_Searches_Flags,
                qcPage_Searches_Info: this._dataPage_common_Searches_Info,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                qc_compute_Cache_create_GeneratedReportedPeptideListData,
                updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback : this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback_BindThis,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING: this._create__QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING_Object({ searchSubGroup_Ids_Selected }),
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING,
                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: this._qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
            };

            const qc_Page_FiltersDisplay_ComponentData : QC_Page_FiltersDisplay_ComponentData = {
                projectSearchIds: this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data: undefined,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
                scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: this.props.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue
            };

            this.setState({
                mainDisplayData_Loaded : true,

                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue,

                modificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
                reporterIons_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData,
                peptideSequence_UserSelections_ComponentData,
                qc_Page_FiltersDisplay_ComponentData,

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback() {

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ModificationSelects.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ReporterIonSelections.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        this.setState({
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections
        });

        this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

        this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();
    }

    /**
     * User has changed the ShowSingleSearch_Not_SubSearches Selections.
     *
     * The Page State object has already been updated
     */
    private _qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed() : void {
        try {

            if ( this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.get_showSingleSearch_Not_SubSearches() ) {
                this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.set_showSingleSearch_Not_SubSearches( false );
            } else {
                this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.set_showSingleSearch_Not_SubSearches( true );
            }

            // this.setState({ fakeStateValue: {} } ) //  Set state to force re-render component

            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts
                    this._updateRestOfPage_ForUserInteraction();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            console.warn("Exception caught in _searchSubGroup_SelectionsChanged_Callback()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * User has changed the Search Sub Group Selections.
     *
     * The Page State object has already been updated
     */
    private _searchSubGroup_SelectionsChanged_Callback() : void {
        try {
            this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts
                    this._updateRestOfPage_ForUserInteraction();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            console.warn("Exception caught in _searchSubGroup_SelectionsChanged_Callback()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState() {

        const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_PropValue({ propsValue : this.props.propsValue });

        const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue : this.props.propsValue });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected };
        });
    }

    //////////////////

    /**
     * Clear All Selections
     *
     */
    _clearAllSelections() {
        try {
            this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass.clearAll();

            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            //  NOT Reset this for "Clear All"
            // this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.clearTreatOpenModMassZeroAsUnmodified_Selection();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

            this.props.propsValue.peptideUnique_UserSelection_StateObject.clearPeptideUnique();

            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();

            this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject.clearAll();

            this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.clearAll();

            this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.clearSelections();

            this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();

            this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();
            this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject.clearAll();
            this.props.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject.clearAll();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL
                    this._selectedPeptideUniqueChange_UpdateURL();  //  Update URL
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL
                    this._selectedProteinPositionFilterChange_UpdateURL(); //  Update URL

                    window.setTimeout( () => {
                        try {
                            //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
                            this.setState({ modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: {} });

                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

                            //  NOT Reset this for "Clear All"
                            // this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData();

                            this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();

                            this._peptideUnique_Update_PeptideUnique_UserSelection_ComponentData();

                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();

                            this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object();

                            this._update__psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject();

                            this._update__peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject();

                            window.setTimeout( () => {
                                try {
                                    //  Now update dependent page parts

                                    this._updateRestOfPage_ForUserInteraction();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    //////////////////

    /**
     * Open Modification Only
     *
     * Add or Change Mass Selection was clicked for Open Modification and this method is called
     *
     * First load open mod masses if not loaded
     *
     * Second open the overlay for Add/Change Mass Selection
     *
     */
    _openModificationMass_OpenUserSelections_Overlay_Override() : void {
        try {
            window.setTimeout( () => {
                //  Now open the overlay

                this._openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay()

            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Open Modification Only
     *
     * Second open the overlay for Add/Change Mass Selection
     *
     * called from immediately above method: _openModificationMass_OpenUserSelections_Overlay_Override()
     */
    _openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay() : void {

        let modificationMass_CommonRounding_ReturnNumber_Local = modificationMass_CommonRounding_ReturnNumber;

        if ( this.props.propsValue.projectSearchIds.length === 1 ) {
            modificationMass_CommonRounding_ReturnNumber_Local = undefined;  // NO rounding for Single Search
        }

        const modificationMass_UserSelections_DisplayMassSelectionOverlay = new ModificationMass_UserSelections_DisplayMassSelectionOverlay({

            variable_Modifications_DISPLAY: false,
            open_Modifications_DISPLAY: true,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
            proteinNames: null,
            proteinDescriptions: null,
            proteinSequenceVersionId : null,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber_Local, // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
            modificationSelectionChanged_Callback: this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis
        });

        modificationMass_UserSelections_DisplayMassSelectionOverlay.showModificationMassSelectionDialog();
    }

    /**
     * Open Modification Only
     *
     * Second open the overlay for Add/Change Mass Selection
     *
     * called from immediately above method: _openModificationMass_OpenUserSelections_Overlay_Override()
     */
    _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback() : void {

        this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback();

        window.setTimeout( () => {
            try {
                //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
                this.setState({ modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: {} });

                this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 1 );
    }

    //////////////////

    /**
     * Change was made to modification selection.  this.props.propsValue.modificationMass_UserSelections_StateObject has been updated
     *
     * Not called if this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback() is called
     */
    _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Change was made to modification selection.  this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
     *
     * Need to create new this.state.modificationMass_UserSelections_ComponentData
     *
     * This is called after the Variable Mod overlay has updated the selected variable mods.
     * Need to re-render the modification selection to display any new variable modification masses that were not displayed before
     */
    _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

                            window.setTimeout( () => {
                                try {
                                    //  Now update dependent page parts

                                    this._updateRestOfPage_ForUserInteraction();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 10 );
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_UserSelections_ComponentData
     */
    async _modificationMass_Update_modificationMass_UserSelections_ComponentData() {
        try {
            const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData =
                await PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            this.setState({ modificationMass_UserSelections_ComponentData });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData();

                    //  Now update dependent page parts
                    this._updateRestOfPage_ForUserInteraction();

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
     */
    async _modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData() {
        try {
            const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                await modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_ReturnPromise({
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            this.setState({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }
    /**
     * Change to reporter ion selection
     */
    _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_UserSelections_ComponentData
     */
    async _reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData() {
        try {
            const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = await PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            });

            this.setState({ reporterIons_UserSelections_ComponentData });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideUniqueChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            this._peptideUnique_Update_PeptideUnique_UserSelection_ComponentData();

                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.peptideUnique_UserSelection_ComponentData
     */
    _peptideUnique_Update_PeptideUnique_UserSelection_ComponentData() {

        const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject
        });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { peptideUnique_UserSelection_ComponentData };
        });
    }

    /**
     * Change to peptide string selection, this.props.propsValue.peptideSequence_UserSelections_StateObject
     */
    _updateMadeTo_peptideSequence_UserSelections_StateObject() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();

                            window.setTimeout( () => {
                                try {
                                    //  Now update dependent page parts
                                    this._updateRestOfPage_ForUserInteraction();

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.peptideSequence_UserSelections_ComponentData
     */
    _peptideSequence_Update_peptideSequence_UserSelections_ComponentData() {

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { peptideSequence_UserSelections_ComponentData };
        });
    }

    /**
     *
     */
    private _updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback() {

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._updateRestOfPage_ForUserInteraction();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_StateObject_Callback() {

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._updateRestOfPage_ForUserInteraction();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     * Change to Protein Position Filter Selections, this.props.propsValue.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback
     */
    _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedProteinPositionFilterChange_UpdateURL();  //  Update URL

                    this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object();

                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.proteinPositionFilter_UserSelections_ComponentData
     */
    _proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object() {

        this.setState( { proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {} } );
    }

    /**
     * create new this.state.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject
     */
    private _update__psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject() {

        this.setState( { psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject
     */
    private _update__psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject() {

        this.setState( { psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject
     */
    private _update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject() {

        this.setState( { scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject
     */
    private _update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject() {

        this.setState( { scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject
     */
    private _update__peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject() {

        this.setState( { peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject: {} } );
    }

    /////
    /**
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    window.setTimeout( () => {
                        try {
                            //  Now update dependent page parts

                            this._updateRestOfPage_ForUserInteraction();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * Called from child components
     */
    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback() : void {

        this._update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject();

        this._update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject();

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._updateMadeTo_ScanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR__Scan_RetentionTime_MZ_UserSelections_StateObject__Callback();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback() {

        this._updateMadeTo_ScanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR__Scan_RetentionTime_MZ_UserSelections_StateObject__Callback();
    }

    /**
     *
     */
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback() {

        this._updateMadeTo_ScanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR__Scan_RetentionTime_MZ_UserSelections_StateObject__Callback();
    }

    /**
     *
     */
    private _updateMadeTo_ScanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR__Scan_RetentionTime_MZ_UserSelections_StateObject__Callback() {

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._updateRestOfPage_ForUserInteraction();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback() {
        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._updateRestOfPage_ForUserInteraction();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _updateMadeTo_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject_Callback() {
        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._updateRestOfPage_ForUserInteraction();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    //  Handling Specific Changes by updating the URL

    /**
     * Update State to URL for Modification selection change (Variable or Static Modifications)
     */
    _selectedModificationsChange_UpdateURL() {

        const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

    /**
     *
     */
    _reporterIonMassesChange_UpdateURL() {

        const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
    }

    /**
     * Update State to URL for Peptide Unique selection change
     */
    _selectedPeptideUniqueChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.peptideUnique_UserSelection_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setPeptideUniqueFilterSelectedEncodedStateData({ peptideUniqueFilterSelectedEncodedStateData : encodedStateData });
    }

    /**
     * Update State to URL for Peptide Sequence selection change
     */
    _selectedPeptideSequenceChange_UpdateURL() {

        const peptideSequenceSelectedEncodedStateData = this.props.propsValue.peptideSequence_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
    }

    /**
     * Update State to URL for Protein Position Filter Selections change
     */
    _selectedProteinPositionFilterChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptidePageRoot_CentralStateManagerObjectClass.set_proteinPositionFilter_UserSelections_EncodedStateData({ proteinPositionFilter_UserSelections_EncodedStateData : encodedStateData });
    }

    ////////////////////////////////////////

    //  Handle Update Rest of the page beyond what the user manipulated

    /**
     * Handle Update Rest of the page beyond what the user manipulated
     */
    _updateRestOfPage_ForUserInteraction() {
        try {
            window.setTimeout( () => {
                try {
                    this._updateCurrentPeptideFiltersSection();

                    window.setTimeout( () => {
                        try {
                            const qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput = new QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput()

                            //  Notify all child components that are registered that there is a new value for qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput that will be passed down with the other values
                            this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback.call_AllRegistered({ qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput });

                            // console.warn("FAKE DO RETURN")
                            //
                            // return  //  return here is ONLY for testing

                            window.setTimeout( () => {
                                try {
                                    this._updateRestOfPage_ForUserInteraction__After_Update_updateCurrentPeptideFiltersSection({ qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput });

                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                        //  Update more parts like protein coverage and peptide list
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
                //  Update more parts like protein coverage and peptide list
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


    /**
     * Handle Update Rest of the page beyond what the user manipulated
     */
    async _updateRestOfPage_ForUserInteraction__After_Update_updateCurrentPeptideFiltersSection(
        {
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput
        } : {
            qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput : QcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput
        }
    ) {
        try {
            const searchSubGroup_Ids_Selected : Set<number> = PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Ids_Selected({ propsValue : this.props.propsValue });

            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                await this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call
                    not_filtered_position_modification_selections : false,
                    proteinSequenceVersionId : null,
                    searchSubGroup_Ids_Selected,
                    proteinSequenceWidget_StateObject : undefined,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : null,
                    proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: this.props.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject
                });

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
                await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,
                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            const qc_compute_Cache_create_GeneratedReportedPeptideListData = new Qc_compute_Cache_create_GeneratedReportedPeptideListData({
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                projectSearchIds: this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            });

            const qcViewPage_CommonData_To_AllComponents_From_MainComponent : QcViewPage_CommonData_To_AllComponents_From_MainComponent = {
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback: this._qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput_CentralRegistration_And_Callback,
                qcViewPage__Track_LatestUpdates_at_TopLevel_For_UserInput,
                projectSearchIds: this.props.propsValue.projectSearchIds,
                currentProjectId_FromDOM: this.props.propsValue_QC.currentProjectId_FromDOM,
                searchSubGroup_Ids_Selected,
                propsValue : this.props.propsValue,
                propsValue_QC : this.props.propsValue_QC,
                commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_FeatureDetection_From_FeatureDetectionToProjectScanFileMappingId___ROOT(),
                searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot,
                qcPage_Searches_Flags: this._dataPage_common_Searches_Flags,
                qcPage_Searches_Info: this._dataPage_common_Searches_Info,
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result: proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                qc_compute_Cache_create_GeneratedReportedPeptideListData,
                updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback : this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject__OR___Scan_RetentionTime_MZ_UserSelections_StateObject__OUTSIDE_AssociatedComponent__Callback_BindThis,
                qcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING: this._create__QcViewPage_CommonData_To_AllComponents_From_MainComponent__Processing__NO_FILTERING_Object({ searchSubGroup_Ids_Selected }),
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root__NO_FILTERING,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING: this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object__NO_FILTERING,
                qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot: this._qcPage_Plotly_DOM_Updates__RenderPlotToDOM_UpdatePlot_RemovePlot
            }



            window.setTimeout( () => {
                try {
                    //  Since going to take a while to put new peptide list in DOM, show updating message first, then update charts
                    this.setState( (state : QcViewPage_DisplayData__Main_Component_State, props : QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {
                        return { updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : true }
                    });

                    window.setTimeout( () => {
                        try {
                            this.setState( (state : QcViewPage_DisplayData__Main_Component_State, props : QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {
                                return {
                                    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts : false,
                                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent
                                }
                            });
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 0 );
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 0 );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /////////////

    /**
     * Update section above the peptide list that shows the current Peptide Filters
     */
    _updateCurrentPeptideFiltersSection() {

        const qc_Page_FiltersDisplay_ComponentData : QC_Page_FiltersDisplay_ComponentData = {
            projectSearchIds: this.props.propsValue.projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : undefined,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
            psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: this.props.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : this.state.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue : this.state.searchSubGroup_PropValue
        };

        this.setState( (state: QcViewPage_DisplayData__Main_Component_State, props: QcViewPage_DisplayData__Main_Component_Props ) : QcViewPage_DisplayData__Main_Component_State => {

            return { qc_Page_FiltersDisplay_ComponentData };
        });
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let setDefaultView_Component : JSX.Element = undefined;

        if ( this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory &&  this.props.propsValue.projectSearchIds.length === 1 ) {

            const get_SetDefaultView_Component_React : Get_SetDefaultView_Component_React_Type =
                this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SetDefaultView_Component_React();

            const param = new SetDefaultView_Component_React_Params({ projectSearchId : this.props.propsValue.projectSearchIds[ 0 ] });
            setDefaultView_Component = get_SetDefaultView_Component_React( param )
        }

        let saveView_Component : JSX.Element = undefined;

        if ( this.state.saveView_Component_React ) {

            //  Create "Save View" Component

            //  variable must start with Constant "S" since is React Component
            const SaveView_Component_React = this.state.saveView_Component_React;
            const saveView_Component_Props_Prop = this.state.saveView_Component_Props_Prop;

            saveView_Component = (

                <React.Fragment>

                    <SaveView_Component_React
                        propsValue={ saveView_Component_Props_Prop }
                    />

                    <span >&nbsp;</span>

                </React.Fragment>
            );
        }

        //  Only create these once main display data is loaded

        let filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section : JSX.Element = null;

        if ( this.state.mainDisplayData_Loaded ) {

            let display_ShowAsSingleSearchOption = false;

            if ( this.props.propsValue.projectSearchIds.length === 1 && this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected ) {

                display_ShowAsSingleSearchOption = true;
            }

            filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section = this._render_filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section({ display_ShowAsSingleSearchOption });
        }

        // if ( this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts ) {
        //     console.warn("In Render: this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts true")
        // }

        return (
            <React.Fragment>

                {/* Apply a width to this <div> so that the boxes on right stay within viewport when main overlay is widened to exceed viewport.
                        Need to take into account padding in class="view-single-protein-overlay-body" which is currently 20px or read that from DOM element */}

                {/* Fake 'width' so that grid width not auto fill to width 100%.  Grid will exceed the 80px width to fill the width of the 2 columns.
                            This keeps boxes on right in viewport when main overlay width > viewport width. */}

                {/*style={ { display: "grid", gridTemplateColumns: "auto min-content", width: 80 } }*/}
                <div ref={ this._div_MainGridAtTop_Ref } >

                    {/* display of data above Reported Peptides  */}

                    <div ref={ this._div_MainContent_LeftGridEntry_AtTop_Ref }
                         style={ {
                             // display: "inline-block",
                             // width : width_mainBlockAbovePeptideList,
                             // minWidth : width_mainBlockAbovePeptideList,
                             // maxWidth : width_mainBlockAbovePeptideList
                         } } >

                        {/* Main Content above Reported Peptides  */}

                        <SearchDetailsAndOtherFiltersOuterBlock_Layout>
                            <SearchDetailsAndFilterBlock_MainPage_Root
                                propValue={ this.state.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                                searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                                searchSubGroup_ManageGroupNames_Clicked_Callback={ () => { window.alert("searchSubGroup_ManageGroupNames_Clicked_Callback called"); throw Error("callback not handled")} }
                            />
                        </SearchDetailsAndOtherFiltersOuterBlock_Layout>

                        <div style={ { paddingBottom: 15 } }>

                            { setDefaultView_Component }
                            { saveView_Component }

                            <SharePage_Component
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                            />
                        </div>

                        { filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section }

                    </div>  {/* END: Main Content above Main QC data like charts, etc  */}

                </div>  {/* Close display of data above Main QC data like charts, etc */}

                {/* Display of Main QC data like charts, etc  */}


                { ( ! this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts ) ? (

                    <div >
                        <div >
                            Loading Data
                        </div>
                        <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>

                ) : (
                    <React.Fragment>

                        {/*  Remove ' display: "inline-block" ' since is causing Firefox rendering issues  */}
                        {/*<div style={ { display: "inline-block", position: "relative", marginTop: 20 } } >*/}

                        {/*  Replace commented out <div> with following <div>  */}

                        <div style={ { position: "relative", marginTop: 20 } }>

                            { ( this.props.propsValue.projectSearchIds.length === 1 ) ? (

                                ( this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent ) ? (

                                    ( this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent.searchSubGroup_Ids_Selected
                                        && ( ! this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.get_showSingleSearch_Not_SubSearches()  ) ) ? (

                                        // Single Search with Sub Search Groups

                                        <Qc_SingleSearch__SubSearches_AA__Root_DisplayBlock
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        />

                                    ) : (

                                        // Single Search

                                        <Qc_SingleSearch_AA__Root_DisplayBlock
                                            qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                        />
                                    )

                                ) : null

                            ) : (
                                // Multiple Searches

                                <Qc_MultipleSearches_AA__Root_DisplayBlock
                                    qcViewPage_CommonData_To_AllComponents_From_MainComponent={ this.state.qcViewPage_CommonData_To_AllComponents_From_MainComponent }
                                />
                            )}

                            {( this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForCharts ) ? (

                                <QcPage_UpdatingData_BlockCover/>

                            ) : null }

                        </div>
                    </React.Fragment>
                ) }

            </React.Fragment>

        );
    }

    //////////////////////////////


    /**
     *
     */
    private _render_filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section(
        {
            display_ShowAsSingleSearchOption,
        } : {
            display_ShowAsSingleSearchOption: boolean
        }
    ) : JSX.Element{

        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

        // if ( this.props.propsValue.projectSearchIds.length === 1 ) {
        //     modificationMass_CommonRounding_ReturnNumber_Param = undefined;  //  NO Rounding for Single Project Search Id
        // }

        let limelight_Colors_For_SingleSearch__SubSearches : Limelight_Colors_For_SingleSearch__SubSearches = undefined;

        if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
            const projectSearchId = this.props.propsValue.projectSearchIds[0];
            const searchSubGroupIds_DisplayOrder : Array<number> = [];
            const searchSubGroups = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
            for ( const searchSubGroup of searchSubGroups.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                searchSubGroupIds_DisplayOrder.push(searchSubGroup.searchSubGroup_Id);
            }
            limelight_Colors_For_SingleSearch__SubSearches = Limelight_Colors_For_SingleSearch__SubSearches.getInstance({ searchSubGroupIds: searchSubGroupIds_DisplayOrder })
        }

        return (

            <React.Fragment>

                <div style={ { } } > {/*marginBottom: 10*/}

                    <div className=" filter-common-block-selection-container-block yes-section-labels ">

                        {/* Display of User Selected filtering on  */}

                        <QC_Page_FiltersDisplay
                            qc_Page_FiltersDisplay_ComponentData={ this.state.qc_Page_FiltersDisplay_ComponentData }
                            clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                        />

                        {( display_ShowAsSingleSearchOption ) ? (
                            <React.Fragment>
                                <div className=" show-as-single-search-label " >
                                    View as Single Search?

                                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                        <div className=" inner-absolute-pos ">
                                            <div className=" main-div ">
                                                <p className="help-tip-actual">
                                                    This search contains sub-searches--multiple individual searches analyzed by a single post-processing step (e.g. running percolator once on multiple comet searches).
                                                    When not checked, the results of each sub-search will be displayed separately where appropriate.
                                                    When checked, all sub-searches are collated together and treated as a single search.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="  filter-common-selection-block   ">
                                    <input
                                        type="checkbox"
                                        checked={ this.props.propsValue_QC.qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_StateObject.get_showSingleSearch_Not_SubSearches() }
                                        onChange={ this._qcPage_ShowSingleSearch_Not_SubSearches_UserSelections_Changed_BindThis }
                                    />
                                </div>
                            </React.Fragment>
                        ): null}

                        {/* Filter On ... */}

                        <FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>   {/*  Show/Hide the filters */}


                            <FilterOn_SearchProgramsGroup_ConditionalRender_Component
                                searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData={ this.state.searchSubGroup_PropValue }
                                anySearches_Have_ScanFilenames={ this._anySearches_Have_ScanFilenames }
                                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root={ this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root }
                            >

                                {/*  Section Label  */}

                                <div className=" section-label " style={ { gridColumn: "1/-1" } }>Search Filters

                                    {/*
                                    <div style={ { display: "inline-block" } }>
                                        <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                            <div className=" inner-absolute-pos ">
                                                <div className=" main-div ">
                                                <p className="help-tip-actual">
                                                Tooltip Text Here
                                                    </p>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                    */}
                                </div>

                                { (
                                    this._anySearches_Have_ScanFilenames
                                    && (
                                        ! ( this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                                            && this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.get_total_SearchScanFileCount() === 1 ) )
                                ) ? (

                                    //  Show Scan Filename Selector

                                    <ScanFilenameId_On_PSM_Filter_UserSelection_Component
                                        allSearches_Have_ScanFilenames={ this._allSearches_Have_ScanFilenames }
                                        projectSearchIds={ this.props.propsValue.projectSearchIds }
                                        dataPage_common_Data_Holder_Holder_SearchScanFileData_Root={ this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root }
                                        scanFilenameId_On_PSM_Filter_UserSelection_StateObject={ this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject }
                                        scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject={ this.state.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject }
                                        updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback={ this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis }
                                    />

                                ): null}

                                <SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
                                    projectSearchId={ this.props.propsValue.projectSearchIds[0] }
                                    dataPageStateManager={ this.props.propsValue.dataPageStateManager }
                                    displayData={ this.state.searchSubGroup_PropValue }
                                    searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                                    searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                                    searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
                                    limelight_Colors_For_SingleSearch__SubSearches={ limelight_Colors_For_SingleSearch__SubSearches }  //  Only for QC Page
                                />

                            </FilterOn_SearchProgramsGroup_ConditionalRender_Component>

                            {/*  Section Label  */}

                            <div className=" section-label " style={ { gridColumn: "1/-1" } }>Modification Filters

                                {/*
                                <div style={ { display: "inline-block" } }>
                                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                        <div className=" inner-absolute-pos ">
                                            <div className=" main-div ">
                                            <p className="help-tip-actual">
                                            Tooltip Text Here
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                */}
                            </div>

                            <ModificationMass_UserSelections_Root
                                modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange={ this.state.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange }
                                openModification_OpenSelectMassOverlay_Override_Callback={ this._openModificationMass_OpenUserSelections_Overlay_Override_BindThis }
                                modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects }
                                modificationMass_UserSelections_StateObject={ this.props.propsValue.modificationMass_UserSelections_StateObject } // Updated in the component
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData={ this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData } // Only updated when new updated need to push from above
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass={ this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass } // Updated in the component
                                updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback={ this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis }
                                proteinSequenceVersionId={ null }
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                proteinNames={ null }
                                proteinDescriptions={ null }
                                modificationMass_CommonRounding_ReturnNumber={ modificationMass_CommonRounding_ReturnNumber_Param } // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
                                updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis } // this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
                                update_modificationMass_UserSelections_ComponentData_Callback={ this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis } // create new this.state.modificationMass_UserSelections_ComponentData
                            />

                            { ( ReporterIonMass_UserSelections.limelight_willComponentRender({ reporterIons_UserSelections_ComponentData: this.state.reporterIons_UserSelections_ComponentData })
                                || this._anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) ? (

                                <React.Fragment>

                                    {/*  Section Label  */}

                                    <div className=" section-label " style={ { gridColumn: "1/-1" } }>PSM Filters

                                        {/*
                                            <div style={ { display: "inline-block" } }>
                                                <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                                    <div className=" inner-absolute-pos ">
                                                        <div className=" main-div ">
                                                        <p className="help-tip-actual">
                                                        Tooltip Text Here
                                                            </p>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                            */}
                                    </div>

                                    <ReporterIonMass_UserSelections
                                        reporterIons_UserSelections_ComponentData={ this.state.reporterIons_UserSelections_ComponentData }
                                        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections }
                                        reporterIonMass_UserSelections_StateObject={ this.props.propsValue.reporterIonMass_UserSelections_StateObject }
                                        updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis }
                                    />

                                    { ( this._anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData ) ? (

                                        <Scan_RetentionTime_MZ_UserSelections_Component
                                            allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData={ this._allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData }
                                            projectSearchIds={ this.props.propsValue.projectSearchIds }
                                            scan_RetentionTime_MZ_UserSelections_StateObject={ this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject }
                                            scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject={ this.state.scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject }
                                            updateMadeTo_scan_RetentionTime_MZ_UserSelections_StateObject_Callback={ this._updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback_BindThis }
                                        />

                                    ): null}

                                    <Psm_Charge_Filter_UserSelection_Container_Component
                                        projectSearchIds={ this.props.propsValue.projectSearchIds }
                                        psm_Charge_Filter_UserSelection_StateObject={ this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject }
                                        psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject={ this.state.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject }
                                        updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback={ this._updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback_BindThis }
                                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                    />

                                    { ( this.props.propsValue.dataPageStateManager.get_DataPage_common_Searches_Flags().is__anyPsmHas_IsIndependentDecoy_True__TrueForAnySearch() ) ? (

                                        <Psm_Exclude_IndependentDecoy_PSMs_UserSelection
                                            psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject={ this.props.propsValue.psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject }
                                            psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject={ this.state.psm_Exclude_IndependentDecoy_PSMs_UserSelection_Object_Force_ResetToStateObject }
                                            updateMadeTo_Psm_Exclude_IndependentDecoy_PSMs_UserSelection_StateObject_Callback={ this._updateMadeTo_psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject_Callback_BindThis }
                                        />
                                    ) : null
                                    }

                                </React.Fragment>
                            ) : null}

                            {/*  Section Label  */}

                            <div className=" section-label " style={ { gridColumn: "1/-1" } }>Peptide and Protein Filters

                                {/*
                                <div style={ { display: "inline-block" } }>
                                    <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                        <div className=" inner-absolute-pos ">
                                            <div className=" main-div ">
                                            <p className="help-tip-actual">
                                            Tooltip Text Here
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                */}
                            </div>

                            <PeptideUnique_UserSelection
                                peptideUnique_UserSelection_ComponentData={ this.state.peptideUnique_UserSelection_ComponentData }
                                peptideUnique_UserSelection_StateObject={ this.props.propsValue.peptideUnique_UserSelection_StateObject }
                                updateMadeTo_peptideUnique_UserSelection_StateObject_Callback={ this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis }
                            />

                            <PeptideSequence_UserSelections
                                peptideSequence_UserSelections_ComponentData={ this.state.peptideSequence_UserSelections_ComponentData }
                                peptideSequence_UserSelections_StateObject={ this.props.propsValue.peptideSequence_UserSelections_StateObject }
                                proteinSequenceString={ null }
                                updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback={ null }
                                updateMadeTo_peptideSequence_UserSelections_StateObject_Callback={ this._updateMadeTo_peptideSequence_UserSelections_StateObject_Callback_BindThis }
                            />

                            <PeptideSequence_MissedCleavageCount_UserSelections_Component
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                peptideSequence_MissedCleavageCount_UserSelections_StateObject={ this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject }
                                peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject={ this.state.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject }
                                updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback={ this._updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback_BindThis }
                            />

                            <PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component
                                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject={ this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject }
                                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Object_Force_ResetToStateObject={ this.state.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject }
                                updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_Callback={ this._updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_StateObject_Callback_BindThis }
                            />

                            <ProteinPositionFilter_UserSelections__GetsProteinData
                                proteinPositionFilter_UserSelections_Component_Force_ReRender_Object={ this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object }
                                proteinPositionFilter_UserSelections_StateObject={ this.props.propsValue.proteinPositionFilter_UserSelections_StateObject }
                                updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis }
                                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                            />

                            <ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component
                                proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject={ this.props.propsValue_QC.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject }
                                searchContains_VariableModifications={ this._searchesContains_VariableModifications }
                                searchContains_OpenModifications={ this._searchesContains_OpenModifications }
                                updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback={ this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis }
                            />

                        </FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>

                    </div>

                </div>

            </React.Fragment>
        )
    }

}
