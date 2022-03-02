/**
 * proteinViewPage_DisplayData_ProteinList__Main_Component.tsx
 *
 * Protein Page Main Content:
 *
 * Main Content of Protein Page
 *
 */

import React from "react";

import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";


import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {SingleProtein_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {SearchDataLookupParameters_Root,} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {SharePage_Component} from "page_js/data_pages/sharePage_React/sharePage_Component_React";
import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from "page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    DataTable_RootTableDataObject,
    DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {
    ProteinPage_ProteinGroupingFilterSelection_Component_Root,
    ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_ProteinGroupingFilterSelectionComponent";
import {dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload} from "page_js/data_pages/data_table_react/dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload";
import {StringDownloadUtils} from "page_js/data_pages/data_pages_common/downloadStringAsFile";
import {
    DownloadPSMs_PerProjectSearchId_Entry,
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from "page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds";
import {
    ProteinPageSearchesSummarySectionData_Component,
    ProteinPageSearchesSummarySectionData_PerSearchEntry,
    ProteinPageSearchesSummarySectionData_Root
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/protein_page__protein_list__multiple_searches_code/react_components/proteinPageSearchesSummarySection";
import {ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.ts";
import {
    ProteinViewPage_Display__singleProteinRow_ClickHandler,
    ProteinViewPage_Display__singleProteinRow_ClickHandler_Params,
    proteinViewPage_renderToPageProteinList__Create_DataTable_RootTableDataObject
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject.ts";
import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {ProteinList_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinList_CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides,
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides.ts";
import {
    protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped,
    ProteinNameDescriptionCacheEntry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped.ts";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins.ts";
import {proteinPage_ProteinList__GroupProteins} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinPage_ProteinList__GroupProteins.ts";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals.ts";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId__After_ALL_Filtering} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId__After_ALL_Filtering";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data";
import {ProteinDisplayData_From_createProteinDisplayData_ProteinList} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide";
import {ModificationMass_UserSelections_Root} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root";
import {ModificationMass_UserSelections_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";
import {modificationMass_CommonRounding_ReturnNumber} from "page_js/data_pages/modification_mass_common/modification_mass_rounding";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {modificationMass_UserSelections_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent";
import {
    ProteinPage_Display__SingleProtein_Root,
    ProteinPage_Display__SingleProtein_singleProteinCloseCallback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Root";
import {AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component} from "page_js/data_pages/common_components__react/annotation_types_to_display__selection_update_component/annotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component";
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplay_UserSelections_Root_Component";
import {ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF";
import {proteinPage_ProteinList__GroupProteins_Remove_NotPassesFilter_RemoveSubsetOrNotParsimonious} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinPage_ProteinList__GroupProteins_Remove_NotPassesFilter_RemoveSubsetOrNotParsimonious";
import {proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_SubGroups} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_SubGroups";
import {proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_ProjectSearchIds} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_ProjectSearchIds";
import {ReporterIonMass_UserSelections} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections";
import {ReporterIonMass_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject";
import {ModificationMass_ReporterIon__UserSelections__Coordinator_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {
    reporterIonMass_UserSelections_BuildData_ForReactComponent,
    ReporterIonMass_UserSelections_ComponentData
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {reporterIonMass_CommonRounding_ReturnNumber} from "page_js/data_pages/reporter_ion_mass_common/reporter_ion_mass_rounding";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/jsx/scanFilenameId_On_PSM_Filter_UserSelection_Component";
import {Scan_RetentionTime_MZ_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/jsx/scan_RetentionTime_MZ_UserSelections_Component";
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import {dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData";
import {FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__show_hide__expand_collapse_container_component/filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component";
import {Protein_Page_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/protein_page/protein_Page_FiltersDisplay_ComponentData";
import {Protein_Page_FiltersDisplay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/protein_page/protein_Page_FiltersDisplay";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters";
import {Psm_Charge_Filter_UserSelection_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_Container_Component";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {purge_FilterSelections_NotIn_CurrentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/purge_filter_selections_not_in_current_data/purge_FilterSelections_NotIn_CurrentData";

/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop {

    projectSearchIds : Array<number>
    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    centralPageStateManager: CentralPageStateManager

    proteinList_CentralStateManagerObjectClass : ProteinList_CentralStateManagerObjectClass

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;

    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
    proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject
    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

    singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 *
 */
export interface ProteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_Props {

    propsValue : ProteinViewPage_DisplayData_ProteinList__Main_Component_Props_Prop
}

/**
 *  Counts displayed on the page
 */
interface ProteinList_DataCounts {

    proteinCount: number
    proteinGroupCount: number
    peptideCount: number
    psmCount: number
}

/**
 *
 */
interface ProteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_State {

    //  Set in class constructor

    show_InitialLoadingData_Message? : boolean;
    show_proteinPageSearchesSummarySectionData_Root_Link?: boolean //  Show Link for "Show Summary Data Per Search"

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue?: ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root?: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object?: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue

    proteinListColumnsDisplayContents__showSequenceCoverageOption?: boolean

    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject? : object;
    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject?: object;

    //  NOT set in class constructor

    mainDisplayData_Loaded? : boolean;

    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root?: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root

    searchSubGroup_Are_All_SearchSubGroupIds_Selected? : boolean
    searchSubGroup_PropValue? : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;

    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject? : object // Assign new empty object {} when change State Object

    protein_Page_FiltersDisplay_ComponentData? : Protein_Page_FiltersDisplay_ComponentData

    proteinPageSearchesSummarySectionData_Root?: ProteinPageSearchesSummarySectionData_Root
    show_proteinPageSearchesSummarySectionData_Root?: boolean

    tableObject_CurrentlyRendered_ProteinList? : DataTable_RootTableObject
    proteinList_DataCounts? : ProteinList_DataCounts

    show_UpdatingProteinList_Message?: boolean

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;


}

/**
 *
 */
export class ProteinViewPage_DisplayData_ProteinList__Main_Component extends React.Component< ProteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_Props, ProteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_State > {

    //  bind to 'this' for passing as parameters

    private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);
    private _searchSubGroup_SelectionsChanged_Callback_BindThis = this._searchSubGroup_SelectionsChanged_Callback.bind(this);
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

    private _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback_BindThis = this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback.bind(this);
    private _proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_SelectionsChanged_Callback_BindThis = this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_SelectionsChanged_Callback.bind(this);
    private _updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback_BindThis = this._updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis = this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback.bind(this);

    private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

    private _downloadProteinsClickHandler_BindThis = this._downloadProteinsClickHandler.bind(this);
    private _downloadPSMsClickHandler_BindThis = this._downloadPSMsClickHandler.bind(this);
    private _show_proteinPageSearchesSummarySectionData_ClickHandler_BindThis = this._show_proteinPageSearchesSummarySectionData_ClickHandler.bind(this);

    private _DO_NOT_CALL_CastTestOnly () {
        //  Test function cast
        const proteinGroup_SelectionValues_Changed_Callback : ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback = this._proteinGroup_SelectionValues_Changed_Callback;
        const singleProteinRowClickHandler:ProteinViewPage_Display__singleProteinRow_ClickHandler = this._singleProteinRowClickHandler;
    }

    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = new Map();

    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = new Map();

    private _proteinDisplayData_Final_ForDisplayTable: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    private _proteinViewPage_Display_SingleProtein: ProteinPage_Display__SingleProtein_Root;

    private _show_proteinPageSearchesSummarySectionData_Root = false;

    private _searchesContains_VariableModifications = false;
    private _searchesContains_OpenModifications = false;

    //  Flags Set to true/false in constructor

    private _allSearches_Have_ScanFilenames: boolean
    private _allSearches_Have_ScanData: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    private _anySearches_Have_ScanFilenames: boolean
    private _anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

    /**
     *
     */
    constructor(props: ProteinViewPage_DisplayData_ProteinList_Integrated_SingleMultipleSearchSubGroups__Main_Component_Props) {
        super(props);

        const projectSearchIds = props.propsValue.projectSearchIds;

        let show_proteinPageSearchesSummarySectionData_Root_Link = false;
        if ( props.propsValue.projectSearchIds.length > 1 ){
            show_proteinPageSearchesSummarySectionData_Root_Link = true;
        }

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject: props.propsValue.reporterIonMass_UserSelections_StateObject
            })

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
            ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
                propsValue : props.propsValue
            });

        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
            props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

        //  Main Data Loader object

        const commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root = CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.getNewInstance({
            projectSearchIds, searchDataLookupParameters_Root: searchDataLookupParamsRoot, dataPageStateManager: props.propsValue.dataPageStateManager
        });

        //  Main Filtering object
        const getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object = GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class.getNewInstance({ projectSearchIds, commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root });

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        });

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

        const proteinListColumnsDisplayContents__showSequenceCoverageOption = true;

        this.state = {
            show_InitialLoadingData_Message: true,
            show_proteinPageSearchesSummarySectionData_Root_Link,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            searchDataLookupParamsRoot,
            proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
            saveView_Component_React,
            saveView_Component_Props_Prop,
            proteinListColumnsDisplayContents__showSequenceCoverageOption,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
            scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {},
            scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {},
            psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: {}
        }
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
                    console.warn("Exception caught in componentDidMount inside setTimeout", e);
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
     *  Run on Page Load.  call from componentDidMount
     */
    private _runOnPageLoad() {

        if (this.props.propsValue.singleProtein_CentralStateManagerObject) {
            //  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

            const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

            if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
                //  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

                //  Hide Main Div inside of header/footer
                const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
                if (!data_page_overall_enclosing_block_divDOM) {
                    const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
                    console.warn(msg);
                    throw Error(msg);
                }
                data_page_overall_enclosing_block_divDOM.style.display = "none";

                if ( ! this._proteinViewPage_Display_SingleProtein) {
                    this._instantiateObject_Class__ProteinPage_Display__SingleProtein({currentWindowScrollY: undefined});
                }
                this._proteinViewPage_Display_SingleProtein.openOverlay_OnlyLoadingMessage();
            }
        }

        const promises: Array<Promise<void>> = [];

        for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =  // state object populated in constructor
                this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                throw new Error("No value from this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); for projectSearchId: " + projectSearchId );
            }

            const commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__ReportedPeptideId_Based_Data_For_MainFilters();

            {
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
            {
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
                proteinPositionFilter_UserSelections_StateObject: undefined,
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
     * Called when the user updates the Protein Group selection and the page needs to be re-rendered
     *
     * Also called by searchSubGroup_SelectionsChanged_Callback passing in param: {}
     */
    _proteinGroup_SelectionValues_Changed_Callback( params: ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param ) {

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        });

        this.setState({ proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue });

        window.setTimeout( () => {
            try {
                this._re_renderPage();

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                throw e;
            }
        }, 10 );
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

            this.props.propsValue.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject.clearAll();

            this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();
            this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();
            this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject.clearAll();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
                            this.setState({ modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange: {} });

                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

                            //  NOT Reset this for "Clear All"
                            // this._modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData();

                            this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();

                            this._update__proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject();

                            this._update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject();

                            this._update__psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject();

                            window.setTimeout( () => {
                                try {
                                    //  Now update dependent page parts

                                    this._re_renderPage();

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
            let modificationMass_CommonRounding_ReturnNumber_Local = modificationMass_CommonRounding_ReturnNumber;

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
                            window.setTimeout( () => {
                                //  Now update dependent page parts

                                this._re_renderPage();
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

                                    this._re_renderPage();

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
     * create new this.state.modificationMass_UserSelections_ComponentData
     */
    _modificationMass_Update_modificationMass_UserSelections_ComponentData() : void {
        {
            const promise = modificationMass_UserSelections_BuildData_ForReactComponent({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber
            });

            promise.catch(reason => {

            })
            promise.then(modificationMass_UserSelections_ComponentData => {
                try {
                    //  NO support for filter on Static Mods
                    modificationMass_UserSelections_ComponentData.staticModificationsData = undefined;

                    this.setState( { modificationMass_UserSelections_ComponentData });

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        }
    }

    /**
     *
     */
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback() {
        try {
            const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result =
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data ) {

                const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data;

                this.setState( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });

                //  Delay To allow SetState to run
                window.setTimeout(() => {
                    try {
                        //  Now update dependent page parts

                        this._re_renderPage();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }, 20);

            } else if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise ) {

                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.catch(reason => {
                    console.warn("modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.catch: reason: " , reason );
                })
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.then(value => {
                    try {
                        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = value;

                        this.setState( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });

                        //  Delay To allow SetState to run
                        window.setTimeout(() => {
                            try {
                                //  Now update dependent page parts

                                this._re_renderPage();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }, 20);
                    } catch( e ) {
                        console.warn("Exception caught", e);
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } else {
                throw Error("modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result no 'data' or 'promise'")
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

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

                            this._re_renderPage();

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
     * create new this.state.reporterIons_UserSelections_ComponentData
     */
    _reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData() {

        let reporterIonMass_CommonRounding_ReturnNumber_Param = reporterIonMass_CommonRounding_ReturnNumber;

        const promise = reporterIonMass_UserSelections_BuildData_ForReactComponent({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Param // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
        });

        promise.catch(reason => {

        })
        promise.then(reporterIons_UserSelections_ComponentData => {
            try {
                this.setState( { reporterIons_UserSelections_ComponentData });

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        })
    }

    /**
     *
     */
    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback() {

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._re_renderPage();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback() {

        window.setTimeout( () => {
            try {
                //  Now update dependent page parts

                this._re_renderPage();

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

                this._re_renderPage();

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 10 );
    }

    /**
     *
     */
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback() {

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        this.setState({ modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class });

        this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

        this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();
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

                    this._re_renderPage();

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
            ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.compute_searchSubGroup_PropValue({ propsValue : this.props.propsValue });

        const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean =
            ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue : this.props.propsValue });

        this.setState({ searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected });
    }

    /**
     * User has changed the Distinct Protein Selections.
     *
     * The Page State object and URL has already been updated
     */
    private _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts

                    this._re_renderPage();

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
     * User has changed the Protein List Columns Display Contents Selections.
     *
     * The Page State object and URL has already been updated
     */
    private _proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_SelectionsChanged_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts

                    this._re_renderPage();

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
     * User has changed the Filter On Counts (PSM, Peptide, Unique Peptide) Selections.
     *
     * The Page State object and URL has already been updated
     */
    private _updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    //  Now update dependent page parts

                    this._re_renderPage();

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
     * create new this.state.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject
     */
    private _update__proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject() {

        this.setState( { proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject
     */
    private _update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject() {

        this.setState( { scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject
     */
    private _update__psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject() {

        this.setState( { psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: {} } );
    }

    /**
     * create new this.state.scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject
     */
    private _update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject() {

        this.setState( { scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {} } );
    }

    //  Handling Specific Changes by updating the URL

    /**
     * Update State to URL for Modification selection change (Variable or Static Modifications)
     */
    _selectedModificationsChange_UpdateURL() {

        const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.proteinList_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

    /**
     *
     */
    _reporterIonMassesChange_UpdateURL() {

        const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.proteinList_CentralStateManagerObjectClass.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
    }

    //////////////////
    //////////////////

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails({ initialPageLoad } : { initialPageLoad : boolean }) {

        const projectSearchIds = this.props.propsValue.projectSearchIds;

        const getDataFromServer_AllPromises = [];

        console.log("In _recompute_FullPage_Except_SearchDetails(...).   Skipping calls to loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder(...)")

        //  Load here since used in 2 places.  can move later
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

            getDataFromServer_AllPromises.push(promise_ToAdd);
        }

        const promise_getDataFromServer_AllPromises = Promise.all(getDataFromServer_AllPromises);
        promise_getDataFromServer_AllPromises.catch((reason) => {
        });
        promise_getDataFromServer_AllPromises.then( (value) => {
            try {
                this._recompute_FullPage_Except_SearchDetails__SubPart_AfterLoaded_SecondaryData_IfNeeded({
                    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                });
            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     * Split out since may need to load secondary data like Reporter Ion data
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_AfterLoaded_SecondaryData_IfNeeded(
        {
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        } : {
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        }
    ) {

        this.setState({ dataPage_common_Data_Holder_Holder_SearchScanFileData_Root });

        {
            const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result =
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data ) {

                const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data;

                this.setState( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });

                //  Delay To allow SetState to run
                window.setTimeout(() => {
                    try {
                        this._recompute_FullPage_Except_SearchDetails__SubPart_RunBefore_ReRenderPage();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                }, 20);

            } else if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise ) {

                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.catch(reason => {
                    console.warn("modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.catch: reason: " , reason );
                })
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.then(value => {
                    try {
                        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = value;

                        this.setState( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });

                        //  Delay To allow SetState to run
                        window.setTimeout(() => {
                            try {
                                this._recompute_FullPage_Except_SearchDetails__SubPart_RunBefore_ReRenderPage();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }, 20);
                    } catch( e ) {
                        console.warn("Exception caught", e);
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                })
            } else {
                throw Error("modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result no 'data' or 'promise'")
            }
        }
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBefore_ReRenderPage() : void {

        const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

        if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {

            //  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay

            this._singleProteinRowShowSingleProteinOverlay({
                proteinSequenceVersionId: proteinSequenceVersionId_FromURL
            });

            //  Delay render List since currently hidden.  Probably could skip render until close Single Protein Overlay
            window.setTimeout(() => {
                try {
                    this._re_renderPage();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 2000);

        } else {

            //  render List immediately

            this._re_renderPage();
        }
    }

    /**
     *
     */
    private _re_renderPage() {

        this.setState({ show_UpdatingProteinList_Message: true });

        window.setTimeout(() => {
            try {
                this._re_renderPage_Actually();  // Ignore returned Promise

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 20);
    }

    /**
     * Make 'async' so can use 'await'
     */
    private async _re_renderPage_Actually() : Promise<void> {
        try {
            const projectSearchIds = this.props.propsValue.projectSearchIds;

            let searchSubGroup_Ids_Selected : Set<number> = undefined; // new Set<number>();

            if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

                //  Have Sub Groups and Only 1 search so display the Sub Groups

                const projectSearchId = this.props.propsValue.projectSearchIds[ 0 ];

                const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "returned nothing: props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
                    searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
                });
            }

            let modificationMass_UserSelections_ComponentData: ModificationMass_UserSelections_ComponentData = undefined;
            {
                //   !!!  using 'await'
                modificationMass_UserSelections_ComponentData = await modificationMass_UserSelections_BuildData_ForReactComponent({
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    proteinSequenceVersionId : undefined,
                    projectSearchIds : projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                    modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber
                });

                //  NO support for filter on Static Mods
                modificationMass_UserSelections_ComponentData.staticModificationsData = undefined;

            }

            let reporterIons_UserSelections_ComponentData: ReporterIonMass_UserSelections_ComponentData = undefined;
            {
                const reporterIonMass_CommonRounding_ReturnNumber_Param = reporterIonMass_CommonRounding_ReturnNumber;

                //   !!!  using 'await'
                reporterIons_UserSelections_ComponentData = await reporterIonMass_UserSelections_BuildData_ForReactComponent({

                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    projectSearchIds : projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                    reporterIonMass_CommonRounding_ReturnNumber : reporterIonMass_CommonRounding_ReturnNumber_Param // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
                });
            }

            //   !!!  using 'await'
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = await this.state.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call
                not_filtered_position_modification_selections : false,
                proteinSequenceVersionId : null, // always null for protein list
                searchSubGroup_Ids_Selected,

                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,

                //  No filtering on these for protein list
                proteinSequenceWidget_StateObject : undefined,
                peptideUnique_UserSelection_StateObject : undefined,
                peptideSequence_UserSelections_StateObject : undefined,
                userSearchString_LocationsOn_ProteinSequence_Root : undefined,
                proteinPositionFilter_UserSelections_StateObject : undefined,
            });

            //   !!!  using 'await'
            const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
                await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,
                    searchSubGroup_Ids_Selected, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            let proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList = undefined;
            //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
            let proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = undefined

            //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
            let proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = undefined

            {
                //   !!!  using 'await'

                const callResult = await protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped({

                    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                    searchSubGroup_Ids_Selected,
                    projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

                proteinDisplayData = callResult.proteinDisplayData;
                proteinNameDescription_Key_ProteinSequenceVersionId = callResult.proteinNameDescription_Key_ProteinSequenceVersionId;
                proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = callResult.proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId;
            }

            let process_SubGroups = false;
            if ( searchSubGroup_Ids_Selected ) {
                process_SubGroups = true;
            }

            if ( this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins({
                    process_ExperimentConditions: false, process_SubGroups, projectSearchIds, proteinDisplayData
                });

            } else {
                proteinDisplayData = proteinPage_ProteinList__GroupProteins({
                    projectSearchIds, proteinDisplayData,
                    proteinGrouping_CentralStateManagerObjectClass: this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass
                });

                //  If put following '...Compute_UniquePeptideCounts_For_...' after '...Remove_NotPassesFilter...'
                //    Also have to recompute UniquePeptideCounts for Overall and for Single Search (Single Search Uses Overall as well)

                if ( process_SubGroups ) {
                    proteinDisplayData = proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_SubGroups({proteinDisplayData});
                } else {
                    proteinDisplayData = proteinPage_ProteinList__GroupProteins_Compute_UniquePeptideCounts_For_ProjectSearchIds({ projectSearchIds, proteinDisplayData });
                }
            }


            if ( ! this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

                if ( ! this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.get_ShowHiddenProteins_Selected() ) {
                    //  Remove proteinGroup.passesFilter is false - remove Subset Groups OR Not Parsimonious
                    proteinDisplayData = proteinPage_ProteinList__GroupProteins_Remove_NotPassesFilter_RemoveSubsetOrNotParsimonious({ proteinDisplayData });
                }
            }


            //   Filtering on PSM, Peptide, Unique Peptide counts

            //  Updated in this call (or just returns same object with no changes)
            proteinDisplayData =
                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide({
                    proteinDisplayData,
                    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: this.props.propsValue.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
                    searchSubGroup_Ids_Selected,
                    projectSearchIds
                });



            //  Call after final filtering of protein list to populate data accumulated across proteins in the final list
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId__After_ALL_Filtering({
                process_SubGroups,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                proteinDisplayData
            });

            {  //  Compute Peptide PSM Total Count

                let compute_PerProjectSearchId_Data = false;

                if ( this._show_proteinPageSearchesSummarySectionData_Root ) {
                    //  "Show Summary Data Per Search" clicked so compute that data
                    compute_PerProjectSearchId_Data = true;
                }

                //   !!!  using 'await'

                //  Call after final filtering of protein list to compute Distinct Peptide and PSM totals
                await proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals({
                    compute_PerProjectSearchId_Data,
                    searchSubGroup_Ids_Selected,
                    projectSearchIds,
                    proteinDisplayData,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });
            }

            {  //  Compute Sequence Coverage (2 'if' statements in this block)

                if ( ( projectSearchIds.length === 1 && (!searchSubGroup_Ids_Selected) ) || projectSearchIds.length > 1 ) {

                    //  Compute Sequence Coverage for:  Only 1 search and NO Sub Groups OR More than 1 Search

                    //  Using "await"

                    const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId =
                        await this._get_proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId();

                    for ( const projectSearchId of projectSearchIds ) {  // proteinCoverageRatioDisplay

                        const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder =
                            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                        if ( ! proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder ) {
                            throw Error("proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId)
                        }
                        for (const proteinListItem of proteinDisplayData.proteinList) {

                            const protein_SubItem = proteinListItem.protein_SubItem_Records_Map_Key_projectSearchId.get( projectSearchId );
                            if ( ! protein_SubItem ) {
                                //  No Data found Skip
                                continue; // EARLY CONTINUE
                            }


                            const reportedPeptideIds_For_Protein = new Set<number>();

                            if ( protein_SubItem.reportedPeptideIds_AndTheirPsmIds && protein_SubItem.reportedPeptideIds_AndTheirPsmIds.size > 0 ) {
                                for ( const reportedPeptideId of protein_SubItem.reportedPeptideIds_AndTheirPsmIds.keys() ) {
                                    reportedPeptideIds_For_Protein.add( reportedPeptideId );
                                }
                            }
                            if ( protein_SubItem.reportedPeptideIds_NoPsmFilters && protein_SubItem.reportedPeptideIds_NoPsmFilters.size > 0 ) {
                                for ( const reportedPeptideId of protein_SubItem.reportedPeptideIds_NoPsmFilters ) {
                                    reportedPeptideIds_For_Protein.add( reportedPeptideId );
                                }
                            }

                            const proteinCoverageObject = proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId(proteinListItem.proteinSequenceVersionId);
                            if (proteinCoverageObject === undefined) {
                                throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinListItem.proteinSequenceVersionId);
                            }
                            const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio_FilteringOnReportedPeptideIds({ reportedPeptideIds_For_Protein });

                            protein_SubItem.proteinCoverageRatio = proteinCoverageRatio;
                            protein_SubItem.proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed(3);
                        }
                    }
                }

                ////  Second 'if' for Compute Sequence Coverage.  Is really the 'else' of the first 'if'

                if ( projectSearchIds.length === 1 && (searchSubGroup_Ids_Selected) ) {

                    //  Compute Sequence Coverage for:  Only 1 search and YES Sub Groups

                    const projectSearchId = projectSearchIds[0];

                    //  Using "await"

                    const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId =
                        await this._get_proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId();

                    const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder =
                        proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId);
                    if ( ! proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder ) {
                        throw Error("proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.get(projectSearchId); returned nothing for projectSearchId: " + projectSearchId)
                    }

                    for (const proteinListItem of proteinDisplayData.proteinList) {

                        const proteinCoverageObject = proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder.get_ProteinSequenceCoverageData_For_ProteinSequenceVersionId(proteinListItem.proteinSequenceVersionId);
                        if (proteinCoverageObject === undefined) {
                            throw Error("No proteinCoverageObject found.  proteinSequenceVersionId: " + proteinListItem.proteinSequenceVersionId);
                        }

                        for ( const searchSubGroupId of searchSubGroup_Ids_Selected ) {

                            const protein_SubItem = proteinListItem.protein_SubItem_Records_Map_Key_SubGroup_Id.get( searchSubGroupId )
                            if ( ! protein_SubItem ) {
                                //  No Data so skip
                                continue; // EARLY CONTINUE
                            }

                            const reportedPeptideIds_For_Protein = new Set<number>();

                            if ( protein_SubItem.reportedPeptideIds_AndTheirPsmIds && protein_SubItem.reportedPeptideIds_AndTheirPsmIds.size > 0 ) {
                                for ( const reportedPeptideId of protein_SubItem.reportedPeptideIds_AndTheirPsmIds.keys() ) {
                                    reportedPeptideIds_For_Protein.add( reportedPeptideId );
                                }
                            }
                            if ( protein_SubItem.reportedPeptideIds_NoPsmFilters && protein_SubItem.reportedPeptideIds_NoPsmFilters.size > 0 ) {
                                for ( const reportedPeptideId of protein_SubItem.reportedPeptideIds_NoPsmFilters ) {
                                    reportedPeptideIds_For_Protein.add( reportedPeptideId );
                                }
                            }

                            const proteinCoverageRatio = proteinCoverageObject.getProteinSequenceCoverageRatio_FilteringOnReportedPeptideIds({ reportedPeptideIds_For_Protein });

                            protein_SubItem.proteinCoverageRatio = proteinCoverageRatio;
                            protein_SubItem.proteinCoverageRatioDisplay = proteinCoverageRatio.toFixed(3);
                        }
                    }
                }
            }

            if ( this.props.propsValue.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject.get_NSAF_Selected() ) {

                //  NSAF computed on FINAL Protein List

                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_NSAF({
                    searchSubGroup_Ids_Selected, // Set<number>  undefined/null if not set
                    projectSearchIds,
                    proteinDisplayData
                });
            }

            this._proteinDisplayData_Final_ForDisplayTable = proteinDisplayData

            //   Protein Name and Description in a Map, Key ProteinSequenceVersionId
            this._proteinNameDescription_Key_ProteinSequenceVersionId = proteinNameDescription_Key_ProteinSequenceVersionId;

            //   Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
            this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId;

            const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

            let searchSubGroup_Ids_Selected_Array : Array<number> = undefined;
            {
                if ( searchSubGroup_Ids_Selected ) {

                    if ( projectSearchIds.length != 1 ) {
                        throw Error(" ( searchSubGroup_Ids_Selected ) AND ( projectSearchIds.length != 1 ) ")
                    }

                    const projectSearchId = projectSearchIds[0];

                    if ( ! this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
                        const msg = "( ! this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) when this._compute_searchSubGroup_Ids_Selected(); returns a value. projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
                    if ( ! searchSubGroups_ForProjectSearchId ) {
                        const msg = "( ! searchSubGroups_ForProjectSearchId ) when _compute_searchSubGroup_Ids_Selected(); returns a value. projectSearchId: " + projectSearchId;
                        console.warn( msg );
                        throw Error( msg );
                    }

                    searchSubGroup_Ids_Selected_Array = [];

                    for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                        if ( searchSubGroup_Ids_Selected.has( searchSubGroup.searchSubGroup_Id ) ) {
                            searchSubGroup_Ids_Selected_Array.push( searchSubGroup.searchSubGroup_Id );
                        }
                    }
                }
            }

            //   Create Data Table
            const tableDataObject: DataTable_RootTableDataObject = proteinViewPage_renderToPageProteinList__Create_DataTable_RootTableDataObject({ // External Function
                singleProteinRowClickHandler_Callback : this._singleProteinRowClickHandler_BindThis,
                proteinDisplayData,
                proteinGrouping_CentralStateManagerObjectClass: this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
                proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject: this.props.propsValue.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject,
                projectSearchIds,
                searchSubGroupIds: searchSubGroup_Ids_Selected_Array,
                proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId: this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
                dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager
            });

            const tableObject_CurrentlyRendered_ProteinList = new DataTable_RootTableObject({ tableDataObject, tableOptions, dataTableId: "Protein List (Search(es)" });

            let proteinList_DataCounts : ProteinList_DataCounts = null;

            {
                let proteinCount = 0;
                if (proteinDisplayData.proteinList && proteinDisplayData.proteinList.length > 0) {
                    proteinCount = proteinDisplayData.proteinList.length;
                }
                let proteinGroupCount: number = null;

                if ( ! this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {
                    //  Update Protein Group Count
                    if (tableDataObject.dataTable_DataGroupRowEntries === undefined) {
                        throw Error("groupProteinsInDataTable is true and tableObject.dataGroupObjects === undefined");
                    }
                    proteinGroupCount = tableDataObject.dataTable_DataGroupRowEntries.length
                }

                proteinList_DataCounts = {
                    proteinCount,
                    proteinGroupCount,
                    peptideCount: proteinDisplayData.distinctPeptide_TotalCount,
                    psmCount: proteinDisplayData.psm_TotalCount
                }
            }

            let proteinPageSearchesSummarySectionData_Root: ProteinPageSearchesSummarySectionData_Root = undefined;

            if ( proteinDisplayData.summaryMap_Key_ProjectSearchId ) {

                const summaryMap_Key_ProjectSearchId = proteinDisplayData.summaryMap_Key_ProjectSearchId;

                proteinPageSearchesSummarySectionData_Root = new ProteinPageSearchesSummarySectionData_Root();

                const searchNames_AsMap = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap()

                proteinPageSearchesSummarySectionData_Root.perSearchEntries = [];

                for (const projectSearchId of this.props.propsValue.projectSearchIds) {

                    const searchNameEntry = searchNames_AsMap.get(projectSearchId);
                    if (!searchNameEntry) {
                        const msg = "Building ProteinPageSearchesSummarySectionData_Root: searchNames_AsMap.get( projectSearchId ); return nothing. projectSearchId: " + projectSearchId;
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const summarySectionData_PerSearchEntry = new ProteinPageSearchesSummarySectionData_PerSearchEntry()
                    summarySectionData_PerSearchEntry.searchId = searchNameEntry.searchId;
                    summarySectionData_PerSearchEntry.searchName = searchNameEntry.name;

                    const summary_For_ProjectSearchId = summaryMap_Key_ProjectSearchId.get(projectSearchId);

                    if (summary_For_ProjectSearchId) {
                        summarySectionData_PerSearchEntry.proteinCount_TotalForSearch = summary_For_ProjectSearchId.proteinCount_TotalForSearch;
                        summarySectionData_PerSearchEntry.reportedPeptideCount_TotalForSearch = summary_For_ProjectSearchId.distinctPeptideCount_TotalForSearch;
                        summarySectionData_PerSearchEntry.psmCount_TotalForSearch = summary_For_ProjectSearchId.psmCount_TotalForSearch;
                    } else {
                        console.warn("No value returned from summaryMap_Key_ProjectSearchId.get( projectSearchId ) projectSearchId: " + projectSearchId)
                    }

                    proteinPageSearchesSummarySectionData_Root.perSearchEntries.push(summarySectionData_PerSearchEntry);
                }
            }

            {
                const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData =
                    ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.compute_searchSubGroup_PropValue({propsValue: this.props.propsValue});

                const searchSubGroup_Are_All_SearchSubGroupIds_Selected: boolean =
                    ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({propsValue: this.props.propsValue});

                const protein_Page_FiltersDisplay_ComponentData : Protein_Page_FiltersDisplay_ComponentData = {
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject : this.props.propsValue.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root : this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
                    scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                    searchSubGroup_PropValue
                }

                this.setState( { searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected, protein_Page_FiltersDisplay_ComponentData } );
            }

            this.setState({
                show_UpdatingProteinList_Message: false,
                show_InitialLoadingData_Message: false,
                mainDisplayData_Loaded : true,
                tableObject_CurrentlyRendered_ProteinList,
                proteinList_DataCounts,
                proteinPageSearchesSummarySectionData_Root,
                //  Created above the await usage above but set here to limit number of render() calls
                modificationMass_UserSelections_ComponentData,
                reporterIons_UserSelections_ComponentData
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     * @private
     */
    private _get_proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId() :
        Promise<Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>> {

        const promises: Array<Promise<void>> = [];

        const proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder> = new Map();

        for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

            const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =
                this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
            if ( ! commonData_LoadedFromServer_PerSearch_For_ProjectSearchId ) {
                const msg = "this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId); return nothing for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }

            const get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result =
                commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.
                get_commonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters().
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch()
            if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data ) {
                get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                    projectSearchId,
                    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.data.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                );

            } else if ( get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise ) {

                const promise = new Promise<void>( (resolve, reject) => {

                    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.catch(reason => {
                        reject(reason)
                    });
                    get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result.promise.then( value => {
                        try {
                            proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId.set(
                                projectSearchId,
                                value.proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder
                            );
                            resolve();

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                });
                promises.push(promise);

            } else {
                const msg = "get_ProteinSequenceCoverageData_For_ProteinSequenceVersionIdHolder_AllForSearch_Result  'data' and 'promise' are both not populated for projectSearchId: " + projectSearchId;
                console.warn(msg)
                throw Error(msg)
            }
        }

        if ( promises.length === 0 ) {

            //  Data all loaded

            return Promise.resolve(proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId);  //  EARLY RETURN
        }

        ///  Have to wait for data to load

        const promisesAll = Promise.all(promises);

        return new Promise<Map<number, CommonData_LoadedFromServer_SingleSearch__ProteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder>>((resolve, reject) => {
            try {
                promisesAll.catch(reason => {
                    reject(reason);
                })
                promisesAll.then(value => {
                    try {
                        resolve(proteinSequenceCoverageData_For_ProteinSequenceVersionId_For_MainFilters_Holder_Map_Key_ProjectSearchId);

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
    }



    ////////////////////////////////////////////

    //  Download Click Handlers

    /**
     *
     */
    private _downloadProteinsClickHandler() {
        try {
            if ( ! this.state.tableObject_CurrentlyRendered_ProteinList ) {
                console.warn("_downloadProteinList(): No Protein List Table rendered to download");
                return;
            }

            const projectSearchIds = this.props.propsValue.projectSearchIds;

            const proteinDisplayDataAsString =
                dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload({
                    tableDataRootObject: this.state.tableObject_CurrentlyRendered_ProteinList.tableDataObject
                });

            const searchIds : Array<number> = []

            {
                //  For getting search info for projectSearchIds
                const searchNamesMap_KeyProjectSearchId = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap();

                for ( const projectSearchId of projectSearchIds ) {
                    const searchNameObject = searchNamesMap_KeyProjectSearchId.get(projectSearchId);
                    if (!searchNameObject) {
                        throw Error("No searchNameObject for projectSearchId: " + projectSearchId);
                    }
                    const searchId = searchNameObject.searchId;
                    searchIds.push( searchId )
                }
            }

            searchIds.sort( (a, b) => {
                if (a < b) {
                    return -1
                }
                if (a > b) {
                    return  1
                }
                return 0
            })

            const filename = 'proteins-search-' + searchIds.join("-") + '.txt';

            StringDownloadUtils.downloadStringAsFile( { stringToDownload : proteinDisplayDataAsString, filename: filename } );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount inside setTimeout");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _downloadPSMsClickHandler( ) {
        try {
            if ( ! this._proteinDisplayData_Final_ForDisplayTable ) {

                //  No value to use to create download
                return;
            }

            if (this._proteinDisplayData_Final_ForDisplayTable.proteinList.length === 0) {
                //  No data so nothing to download

                window.alert("No PSMs to download since no proteins");

                return; // EARLY RETURN
            }

            const searchDataLookupParamsRoot : SearchDataLookupParameters_Root =
                this.props.propsValue.searchDetailsBlockDataMgmtProcessing.
                getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();

            if ( ! searchDataLookupParamsRoot ) {
                throw Error( "searchDataLookupParamsRoot not found" );
            }

            //  for downloads
            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data({
                proteinDisplayData: this._proteinDisplayData_Final_ForDisplayTable
            });

            if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

                //  Only display for 1 search

                const projectSearchId = this.props.propsValue.projectSearchIds[ 0 ];

                const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "returned nothing: props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                const searchSubGroup_Ids_Selected_Set =
                    searchSubGroup_Get_Selected_SearchSubGroupIds({
                        searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
                    });

                if ( searchSubGroup_Ids_Selected_Set ) {

                    const searchSubGroup_Ids_Selected : Array<number> = Array.from( searchSubGroup_Ids_Selected_Set );

                    const projectSearchIdsReportedPeptideIdsPsmIds_FirstEntry = projectSearchIdsReportedPeptideIdsPsmIds[0];
                    projectSearchIdsReportedPeptideIdsPsmIds_FirstEntry.searchSubGroup_Ids_Selected = searchSubGroup_Ids_Selected;
                }
            }

            downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {
                projectSearchIdsReportedPeptideIdsPsmIds,
                searchDataLookupParamsRoot : searchDataLookupParamsRoot,
                proteinSequenceVersionIds : undefined,
                experimentId : undefined
            } );

        } catch( e ) {
            console.warn("Exception caught in componentDidMount inside setTimeout");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _show_proteinPageSearchesSummarySectionData_ClickHandler() {

        this._show_proteinPageSearchesSummarySectionData_Root = true;  //  Set so compute this data on each render

        this.setState({ show_proteinPageSearchesSummarySectionData_Root: true });  //  Set so display the data

        this._re_renderPage_Actually();  //  Run so compute summary data and render
    }

    /**
     *
     */
    _singleProteinRowClickHandler( params : ProteinViewPage_Display__singleProteinRow_ClickHandler_Params ) {

        const proteinSequenceVersionId = params.proteinSequenceVersionId

        try {
            //  Exit if user selected content on the page
            const selectedContent = window.getSelection().toString();
            if( selectedContent ){
                //  user selected content on the page
                return false; //  EARLY RETURN
            }
        } catch (e) {
            //  Eat any exception
        }

        if (params.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params.clickEventData.ctrlKey_From_ClickEvent ||
            params.dataTable_DataRowEntry__tableRowClickHandler_Callback_NoDataPassThrough_Params.clickEventData.metaKey_From_ClickEvent ) {

            //  Show Single Protein in New Window

            this._singleProteinRowShowSingleProteinNewWindow( { proteinSequenceVersionId } );

            return; //  EARLY RETURN
        }

        //  Push current state on to Browser History before update for Single Protein

        window.history.pushState( {}, "" );

        this.props.propsValue.singleProtein_CentralStateManagerObject.setProteinSequenceVersionId( { proteinSequenceVersionId } );

        _copy_searchSubGroup_CentralStateManagerObjectClass__to__singleProtein_CentralStateManagerObject_searchSubGroup_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject
        });
        _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject
        });

        _copy_Page_StateObjectData_To_SingleSearch_StateObjectData__OthersThan__OpenModMassZeroNotOpenMod_UserSelection__searchSubGroup({

            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,

            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : this.props.propsValue.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,

            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject  //  Copy To
        });

        this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId } );
    }

    /**
     *
     */
    _singleProteinRowShowSingleProteinNewWindow( { proteinSequenceVersionId }: {proteinSequenceVersionId: number} ) {

        //  Create URL for new Window about to open

        //  Create to override the value of proteinSequenceVersionId from the URL
        const singleProtein_CentralStateManagerObjectClass_ForNewWindow =
            new SingleProtein_CentralStateManagerObjectClass({ initialProteinSequenceVersionId: proteinSequenceVersionId, centralPageStateManager : undefined });

        _copy_searchSubGroup_CentralStateManagerObjectClass__to__singleProtein_CentralStateManagerObject_searchSubGroup_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            singleProtein_CentralStateManagerObject : singleProtein_CentralStateManagerObjectClass_ForNewWindow
        })
        _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            singleProtein_CentralStateManagerObject : singleProtein_CentralStateManagerObjectClass_ForNewWindow
        });

        _copy_Page_StateObjectData_To_SingleSearch_StateObjectData__OthersThan__OpenModMassZeroNotOpenMod_UserSelection__searchSubGroup({

            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,

            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : this.props.propsValue.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,

            singleProtein_CentralStateManagerObject : singleProtein_CentralStateManagerObjectClass_ForNewWindow  //  Copy To
        });

        const newWindowURL = this.props.propsValue.centralPageStateManager.getURL_ForCurrentState({ componentOverridesAdditions: [ singleProtein_CentralStateManagerObjectClass_ForNewWindow ] })

        // MUST open window before make AJAX Call.  This is a Browser Security requirement
        //  window.open(...): Must run in code directly triggered by click event

        const newWindow = window.open(newWindowURL, "_blank");
    }

    /**
     *
     */
    _singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId }: {proteinSequenceVersionId: number} ) : void {

        let proteinNameDescriptionParam : { name : string, description : string } = null; // If not found, Let Single Protein compute it

        const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        if ( proteinNameDescription ) {
            proteinNameDescriptionParam = { name : proteinNameDescription.name, description : proteinNameDescription.description };
        }

        //  Current Window Scroll position
        const currentWindowScrollY = window.scrollY;

        //  Hide Main Div inside of header/footer
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();

        if ( ! this._proteinViewPage_Display_SingleProtein ) {

            this._instantiateObject_Class__ProteinPage_Display__SingleProtein({ currentWindowScrollY });
        }

        this._proteinViewPage_Display_SingleProtein.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription : proteinNameDescriptionParam,

            //  Pass Here since for sure populated by here
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        });
    }

    /**
     * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
     */
    _instantiateObject_Class__ProteinPage_Display__SingleProtein({ currentWindowScrollY }: { currentWindowScrollY: number }) {

        //  Create callback function to call on single protein close

        const singleProteinCloseCallback : ProteinPage_Display__SingleProtein_singleProteinCloseCallback = () => {

            this._proteinViewPage_Display_SingleProtein = undefined;

            //  Show Main Div inside of header/footer
            const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
            if (!data_page_overall_enclosing_block_divDOM) {
                const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
                console.warn(msg);
                throw Error(msg);
            }
            data_page_overall_enclosing_block_divDOM.style.display = "";

            if (currentWindowScrollY) {

                //  Scroll window down to original position when protein was clicked to open Single Protein view

                window.scrollTo({ top : currentWindowScrollY });
            }
        }

        this._proteinViewPage_Display_SingleProtein = new ProteinPage_Display__SingleProtein_Root( {
            forPeptidePage: false,

            projectSearchIds: this.props.propsValue.projectSearchIds,
            searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot,

            dataPages_LoggedInUser_CommonObjectsFactory : this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.state.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject,

            singleProteinCloseCallback : singleProteinCloseCallback
        } );
    }

    /**
     *
     */
    render() {
        try {
        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

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

        //  Only create this once main display data is loaded

        let options_Filter_Block: JSX.Element = null;

        if ( this.state.mainDisplayData_Loaded ) {

            options_Filter_Block = (

                <div className="  filter-common-block-selection-container-block yes-section-labels " >

                    {/*  2 Column CSS Grid  */}

                    {/******************/}

                    {/* Display of User Selected filtering on  */}

                    { ( this.state.protein_Page_FiltersDisplay_ComponentData ) ? (

                        <Protein_Page_FiltersDisplay
                            protein_Page_FiltersDisplay_ComponentData={ this.state.protein_Page_FiltersDisplay_ComponentData }
                            clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                        />

                    ): null}


                    {/******************/}


                    <FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>   {/*  Show/Hide the filters */}


                        {/*  Section Header: Spans all columns */}
                        <div
                            style={ { gridColumn: " 1/-1" } }
                            className=" section-label "
                        >
                            Options

                            <div style={ { display: "inline-block" } }>
                                <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                    <div className=" inner-absolute-pos ">
                                        <div className=" main-div ">
                                            <p className="help-tip-actual">
                                                General options for the protein list below.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProteinPage_ProteinGroupingFilterSelection_Component_Root
                            propValue={ this.state.proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue }
                        />

                        <ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component
                            proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject={ this.props.propsValue.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject }
                            searchContains_VariableModifications={ this._searchesContains_VariableModifications }
                            searchContains_OpenModifications={ this._searchesContains_OpenModifications }
                            updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback={
                                this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback_BindThis
                            }
                        />

                        <SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
                            projectSearchId={ this.props.propsValue.projectSearchIds[0] }
                            dataPageStateManager={ this.props.propsValue.dataPageStateManager }
                            displayData={ this.state.searchSubGroup_PropValue }
                            searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                            searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                            searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
                            limelight_Colors_For_SingleSearch__SubSearches={ undefined }  //  Only for QC Page
                        />

                        <ProteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_Root_Component
                            proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject={ this.props.propsValue.proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject }
                            updateMadeTo_proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_UserSelections_StateObject_Callback={
                                this._proteinViewPage_DisplayData_ProteinList__ProteinListColumnsDisplayContents_SelectionsChanged_Callback_BindThis
                            }
                            showSequenceCoverageOption={ this.state.proteinListColumnsDisplayContents__showSequenceCoverageOption }
                        />

                        {/******************/}

                        {/*  Section Header: Spans all columns */}
                        <div
                            style={ { gridColumn: " 1/-1" } }
                            className=" section-label "
                        >
                            Peptide Filters

                            <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                <div className=" inner-absolute-pos ">
                                    <div className=" main-div ">
                                        <p className="help-tip-actual">
                                            These options will filter the peptides used to build the protein list.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        { ( this.state.modificationMass_UserSelections_ComponentData ) ? (

                            <ModificationMass_UserSelections_Root
                                modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange={ this.state.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange }
                                openModification_OpenSelectMassOverlay_Override_Callback={ this._openModificationMass_OpenUserSelections_Overlay_Override_BindThis }
                                modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
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
                        ) : null }

                        { ( this.state.reporterIons_UserSelections_ComponentData ) ? (

                                //  Render when have data

                            <ReporterIonMass_UserSelections
                                reporterIons_UserSelections_ComponentData={ this.state.reporterIons_UserSelections_ComponentData }
                                modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                                reporterIonMass_UserSelections_StateObject={ this.props.propsValue.reporterIonMass_UserSelections_StateObject }
                                updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis }
                            />
                        ) : null }

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

                        {/******************/}

                        {/*  Section Header: Spans all columns */}
                        <div
                            style={ { gridColumn: " 1/-1" } }
                            className=" section-label "
                        >
                            Protein Filters

                            <div className=" filter-common-block-selection--section-label--help-tip-symbol ">
                                <div className=" inner-absolute-pos ">
                                    <div className=" main-div ">
                                        <p className="help-tip-actual">
                                            Filter the list of proteins below.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component
                            proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject={ this.props.propsValue.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject }
                            proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject={ this.state.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject }
                            updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback={
                                this._updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback_BindThis
                            }
                        />

                    </FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>

                </div>
            )
        }

        return (
            <React.Fragment>

                <div >

                    <div > {/* start display of data above Protein List */}

                        <div >
                            {/* Main Content above Protein List  */}

                            <SearchDetailsAndOtherFiltersOuterBlock_Layout>
                                <SearchDetailsAndFilterBlock_MainPage_Root
                                    propValue={ this.state.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                    searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                                    searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                                    searchSubGroup_ManageGroupNames_Clicked_Callback={ () => { window.alert("searchSubGroup_ManageGroupNames_Clicked_Callback called"); throw Error("searchSubGroup_ManageGroupNames_Clicked_Callback not handled")} }
                                />
                            </SearchDetailsAndOtherFiltersOuterBlock_Layout>

                            <div style={ { paddingBottom: 15 } }>

                                { saveView_Component }

                                <SharePage_Component
                                    projectSearchIds={ this.props.propsValue.projectSearchIds }
                                />
                            </div>

                        </div>  {/* END: Main Content above Protein List  */}

                    </div>  {/* Close display of data above Protein List */}

                    {  options_Filter_Block  }


                    {/* ***   Display of Protein List   *** */}

                    <h3> Protein List:</h3>

                    { ( this.state.searchDataLookupParamsRoot ) ? (
                        <div >
                            <AnnotationTypesToDisplay__MainPageComponent_to_Open_SelectionOverlay__Component
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                searchDataLookupParameters_Root={ this.state.searchDataLookupParamsRoot }
                                dataPageStateManager_DataFrom_Server={ this.props.propsValue.dataPageStateManager }
                            />
                        </div>
                    ) : null }

                    { ( this.state.show_InitialLoadingData_Message ) ? (

                        <div >
                            <div style={ { marginTop: 20, fontSize: 24, fontWeight: "bold"} }>
                                Loading Data...
                            </div>
                            <div style={ { paddingTop: 40, paddingBottom: 80 } }>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>

                    ) : null }


                    {/*  Outer Container for "Updating List" overlay  */}
                    <div style={ { position: "relative", display: "inline-block" } }> {/*    display: inline-block; so overlay doesn't extend right past the table right edge */}

                        <div style={ { position: "relative" } }>

                            { ( this.state.proteinList_DataCounts ) ? (

                                <div style={ { marginBottom: 10 } }>

                                    { ( this.state.proteinList_DataCounts.proteinGroupCount !== null && this.state.proteinList_DataCounts.proteinGroupCount !== undefined ) ? (

                                        <span style={ { paddingRight: 10, whiteSpace: "nowrap" } }>
                                            <span>
                                                Protein Group Count:
                                            </span>
                                            <span> </span>
                                            <span>{ this.state.proteinList_DataCounts.proteinGroupCount.toLocaleString() }</span>
                                        </span>
                                    ): null }

                                    <span style={ { whiteSpace: "nowrap"  } }>
                                        <span>
                                            Protein Count:
                                        </span>
                                        <span> </span>
                                        <span>{ this.state.proteinList_DataCounts.proteinCount.toLocaleString() }</span>
                                    </span>

                                    <span  style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>
                                        <span>
                                            Distinct Peptide Count:
                                        </span>
                                        <span> </span>
                                        <span>{ this.state.proteinList_DataCounts.peptideCount.toLocaleString() }</span>
                                    </span>

                                    <span  style={ { paddingLeft: 10, whiteSpace: "nowrap" } }>
                                        <span>
                                            PSM Count:
                                        </span>
                                        <span> </span>
                                        <span>{ this.state.proteinList_DataCounts.psmCount.toLocaleString() }</span>
                                    </span>

                                    <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                          onClick={ this._downloadProteinsClickHandler_BindThis }
                                    >
                                        Download Proteins
                                    </span>

                                    <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                          onClick={ this._downloadPSMsClickHandler_BindThis }
                                    >
                                        Download PSMs
                                    </span>

                                    {/*  Combined/Merged Searches Only */}
                                    { ( this.state.show_proteinPageSearchesSummarySectionData_Root_Link ) ? (
                                        <span style={ { paddingLeft: 10, whiteSpace: "nowrap" } } className=" fake-link "
                                              onClick={ this._show_proteinPageSearchesSummarySectionData_ClickHandler_BindThis }
                                        >
                                            Show Summary Data Per Search
                                        </span>
                                    ) : null }

                                </div>
                            ): null }

                            {/*  Container for PSM Counts Per Search Only displayed for Combined/Merged Searches  */}
                            { ( this.state.show_proteinPageSearchesSummarySectionData_Root && this.state.proteinPageSearchesSummarySectionData_Root ) ? (
                                <ProteinPageSearchesSummarySectionData_Component
                                    summarySectionData={ this.state.proteinPageSearchesSummarySectionData_Root }
                                />
                            ) : null }

                        </div>

                        {/*  Protein List is displayed here */}

                        <div>

                            { ( this.state.tableObject_CurrentlyRendered_ProteinList ) ? (
                                <DataTable_TableRoot
                                    tableObject={ this.state.tableObject_CurrentlyRendered_ProteinList }
                                />
                            ): null }
                        </div>

                        {/*    Cover over protein list when updating */}
                        { ( this.state.show_UpdatingProteinList_Message && ( ! this.state.show_InitialLoadingData_Message ) ) ? (
                            <div className=" block-updating-overlay-container ">
                                <div style={ {  marginTop: 4, textAlign: "center" } }>
                                    Updating Protein List
                                </div>
                            </div>
                        ) : null }


                    </div>   {/*   Close:   everything main after <h3> Protein List:</h3>  */}

                </div>

            </React.Fragment>
        )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            console.warn("Error in 'render()':", e)
            throw e;
        }
    }

}

////////////////////////
////////////////////////
////////////////////////

//  NON Class Functions

/**
 *
 * @param searchSubGroup_CentralStateManagerObjectClass
 * @param projectSearchIds
 * @param singleProtein_CentralStateManagerObject
 */
const _copy_searchSubGroup_CentralStateManagerObjectClass__to__singleProtein_CentralStateManagerObject_searchSubGroup_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated = function (
    {
        searchSubGroup_CentralStateManagerObjectClass,  //  Page Level
        projectSearchIds,
        singleProtein_CentralStateManagerObject
    } : {
        searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
        projectSearchIds : Array<number>
        singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    }) : void {

    {
        const searchSubGroupSelection_EncodedStateData = singleProtein_CentralStateManagerObject.getSearchSubGroupSelection_EncodedStateData();
        if ( searchSubGroupSelection_EncodedStateData ) {

            //  Already populated so exit

            return; // EARLY RETURN
        }
    }

    //  Create new searchSubGroup_CentralStateManagerObjectClass_SingleProtein with copy of Search Sub Group Selections for main page
    const searchSubGroup_CentralStateManagerObjectClass_SingleProtein : SearchSubGroup_CentralStateManagerObjectClass = SearchSubGroup_CentralStateManagerObjectClass.getNewInstance_SingleProtein();

    searchSubGroup_CentralStateManagerObjectClass_SingleProtein.initialize_SingleProteinInstance({
        current_ProjectSearchIds: projectSearchIds, encodedStateData: undefined
    });

    if ( searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {

        searchSubGroup_CentralStateManagerObjectClass_SingleProtein.set_no_selectedSearchSubGroupIds({ no_selectedSearchSubGroupIds: true });

    } else {
        let selectedSearchSubGroupIds: Set<number> = undefined;

        {
            const selectedSearchSubGroupIds_MainPage = searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds();
            if (selectedSearchSubGroupIds_MainPage) {
                selectedSearchSubGroupIds = new Set(selectedSearchSubGroupIds_MainPage);
            }
        }
        searchSubGroup_CentralStateManagerObjectClass_SingleProtein.set_selectedSearchSubGroupIds({selectedSearchSubGroupIds});
    }

    const searchSubGroupSelection_EncodedStateData = searchSubGroup_CentralStateManagerObjectClass_SingleProtein.getDataForEncoding();

    singleProtein_CentralStateManagerObject.setSearchSubGroupSelection_EncodedStateData({ searchSubGroupSelection_EncodedStateData });
}


/**
 *
 * @param searchSubGroup_CentralStateManagerObjectClass
 * @param projectSearchIds
 * @param singleProtein_CentralStateManagerObject
 */
const _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated = function (
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,  //  Page Level
        singleProtein_CentralStateManagerObject
    } : {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    }) : void {

    {
        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = singleProtein_CentralStateManagerObject.getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData();
        if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData ) {

            //  Already populated so exit

            return; // EARLY RETURN
        }
    }

    //  Create new modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein with copy of Selection for main page
    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass = ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getNewInstance_SingleProtein();

    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.initialize_SingleProteinInstance({
        encodedStateData: undefined
    });

    if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getTreatOpenModMassZeroAsUnmodified_Selection() ) {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.setTreatOpenModMassZeroAsUnmodified_Selection( true );
    } else {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.setTreatOpenModMassZeroAsUnmodified_Selection( false );
    }

    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein.getDataForEncoding();

    singleProtein_CentralStateManagerObject.setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData });
}


/**
 * Copy other than existing Copy if Not Populated functions
 *
 * @param modificationMass_UserSelections_StateObject
 * @param reporterIonMass_UserSelections_StateObject
 * @param proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
 * @param singleProtein_CentralStateManagerObject
 * @private
 */
const _copy_Page_StateObjectData_To_SingleSearch_StateObjectData__OthersThan__OpenModMassZeroNotOpenMod_UserSelection__searchSubGroup = function (
    {
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scan_RetentionTime_MZ_UserSelection_StateObject,
        psm_Charge_Filter_UserSelection_StateObject,

        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,

        singleProtein_CentralStateManagerObject
    } : {
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
        psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject;

        singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    }) : void {

    {
        const modsSelectedEncodedStateData = modificationMass_UserSelections_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData({modsSelectedEncodedStateData});
    }
    {
        const reporterIonMassesSelectedEncodedStateData = reporterIonMass_UserSelections_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.setReporterIonMassesSelectedEncodedStateData({reporterIonMassesSelectedEncodedStateData});
    }
    {
        const scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData = scanFilenameId_On_PSM_Filter_UserSelection_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.set_scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData({ scanFilenameId_On_PSM_Filter_UserSelection_EncodedStateData });
    }
    {
        const scan_RetentionTime_MZ_UserSelection_EncodedStateData = scan_RetentionTime_MZ_UserSelection_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.set_scan_RetentionTime_MZ_UserSelection_EncodedStateData({ scan_RetentionTime_MZ_UserSelection_EncodedStateData })
    }
    {
        const psm_Charge_Filter_UserSelection_EncodedStateData = psm_Charge_Filter_UserSelection_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.set_psm_Charge_Filter_UserSelection_EncodedStateData({ psm_Charge_Filter_UserSelection_EncodedStateData })
    }
    {
        //  Create object of class GeneratedPeptideContents_UserSelections_StateObject to copy values to and then get Encoded data
        const valueChangedCallback = () => {} // dummy
        const generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({valueChangedCallback});

        generatedPeptideContents_UserSelections_StateObject.setVariableModifications_Selected( proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getVariableModifications_Selected() );
        const openModifications_WithLocalization_Selected = proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected();
        generatedPeptideContents_UserSelections_StateObject.setOpenModifications_WithLocalization_Selected( openModifications_WithLocalization_Selected );
        generatedPeptideContents_UserSelections_StateObject.setOpenModifications_Selected( openModifications_WithLocalization_Selected );

        const generatedPeptideContents_UserSelections__EncodedStateData = generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.setGeneratedPeptideContents_UserSelections__EncodedStateData({generatedPeptideContents_UserSelections__EncodedStateData});
    }
}
