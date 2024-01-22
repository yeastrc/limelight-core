/**
 * proteinExperimentPage_SingleProtein_MainContent_Component.tsx
 * 
 * Single Protein Main Content:
 * 
 * Main Content of Protein Experiment Page - Single Protein - Contained inside Component <ProteinExperimentPage_SingleProtein_MainContent_Component>
 * 
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';

import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile';
//   From data_pages_common
import {DataPageStateManager, SearchNames_AsMap} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {Experiment_DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory';

import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import {SharePage_Component} from 'page_js/data_pages/sharePage_React/sharePage_Component_React';
//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber,} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';
import {Experiment_ConditionGroupsContainer} from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import {SingleProtein_ExpPage_CentralStateManagerObjectClass} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass';


import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams
} from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections';
import {
    Experiment_SingleExperiment_ConditionsGraphicRepresentation,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params
} from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation';
import {ExperimentConditions_GraphicRepresentation_PropsData} from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import {ProteinSequenceWidgetDisplay_Component_Data} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import {UserSearchString_LocationsOn_ProteinSequence_Root} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';

import {PeptideSequence_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import {PeptideSequence_UserSelections_ComponentData} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ModificationMass_UserSelections_ComponentData} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import {ReporterIonMass_UserSelections_ComponentData} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {ModificationMass_UserSelections_Root} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root';

import {ReporterIonMass_UserSelections} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections';

import {PeptideSequence_UserSelections} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections';

import {ProteinSequenceWidgetDisplay_Root_Component_React} from '../../../../common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/jsx/proteinSequenceWidgetDisplay_Root_Component_React'


import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'


import {
    DownloadPSMs_PerProjectSearchId_Entry,
    download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from 'page_js/data_pages/common__project_search_and_experiment_based_download_data/download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds';
import {
    ProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources,
    ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions
} from './proteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions';

import {mainCell_getHoverContents_StandAlone} from './proteinExperimentPage_SingleProtein_MainContent_Component_mainCell_getHoverContents_StandAlone'

import {ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component} from './proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component';

import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';
import {ProteinExperimentPage_SingleProtein_ProteinNameDescription_Component} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_SingleProtein_ProteinNameDescription_Component";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptideUnique_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {GeneratedPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/jsx/generatedPeptideContents_UserSelections_Root_Component";
import {
    create_GeneratedReportedPeptideListData__SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";

import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class,
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/jsx/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component";
import {peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString} from "page_js/data_pages/experiment_driven_data_pages/peptide__single_protein__shared__exp__page/js/peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/jsx/scanFilenameId_On_PSM_Filter_UserSelection_Component";
import {Scan_RetentionTime_MZ_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/jsx/scan_RetentionTime_MZ_UserSelections_Component";
import {FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__show_hide__expand_collapse_container_component/filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component";
import {SingleProtein_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/single_protein/singleProtein_FiltersDisplay_ComponentData";
import {SingleProtein_FiltersDisplay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/single_protein/singleProtein_FiltersDisplay";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Charge_Filter_UserSelection_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_Container_Component";
import {purge_FilterSelections_NotIn_CurrentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/purge_filter_selections_not_in_current_data/purge_FilterSelections_NotIn_CurrentData";
import {userSearchString_LocationsOn_ProteinSequence_Compute} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute";
import {PeptideSequence_MissedCleavageCount_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/js/peptideSequence_MissedCleavageCount_UserSelections_StateObject";
import {PeptideSequence_MissedCleavageCount_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_sequence_missed_cleavage_count/jsx/peptideSequence_MissedCleavageCount_UserSelections_Component";
import {PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject";
import {PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__peptide_meets_digestion__aka_tryptic_peptide_etc/peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_Component";
import { CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
//   Reporter Ion Mass Rounding to provide some level of commonality between searches


////


/////////////////////////

//  Constants

// Min width for outer container. Increase to 1120 to fit 5 digits.
const _OUTERMOST_CONTAINER_MIN_WIDTH = 1120; 

const _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC = 229;
const _BOXES_ON_RIGHT_CONTAINER_PADDING_LEFT__SUMMARY_ETC = 20;
// const _BOXES_ON_RIGHT_CONTAINER_PADDING_RIGHT__SUMMARY_ETC = 10;


//////////////////////////////////

/**
 * 
 */
export class ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop {

    experimentId : number;
    experimentName : string;
    projectSearchIds : Array<number>;

    experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData;

    // selectedConditionIdsUpdated_Callback

    proteinSequenceVersionId : number;
    proteinNames : string;
    proteinDescriptions : string
    proteinSequenceString : string
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class  //  NOT Shared with Main Page, Single Protein Overlay Only

    commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder

    dataPageStateManager : DataPageStateManager
    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap;
    searchDataLookupParamsRoot: SearchDataLookupParameters_Root

    singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    peptideSequence_MissedCleavageCount_UserSelections_StateObject: PeptideSequence_MissedCleavageCount_UserSelections_StateObject;
    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: PeptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

    experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 * 
 */
export interface ProteinExperimentPage_SingleProtein_MainContent_Component_Props {

    propsValue : ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop

    // view_single_protein_inner_overlay_div
    view_single_protein_inner_overlay_div_Width_Initial : number;
    setWidth__view_single_protein_inner_overlay_div: any // Function in Root Component Class _setWidth__view_single_protein_inner_overlay_div({ width } : { width : number })

    // view_single_protein_overlay_body
    view_single_protein_overlay_body_PaddingLeft : number
    view_single_protein_overlay_body_PaddingRight : number
}

/**
 * 
 */
interface ProteinExperimentPage_SingleProtein_MainContent_Component_State {

    widthOf_proteinSequenceWidgetDisplay_Component? : number; // Width of <ProteinSequenceWidgetDisplay_Root_Component_React> (assumed to not change after this component mounts)
    
    projectSearchIds_PossiblyFiltered? : Array<number>;

    linksToExternalResources? : ProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources;
    protein_fractionCovered_Unfiltered? : number;
    protein_percentageCovered_Unfiltered_Rounded? : string;
    psmCountForUnfilteredDisplay? : string;

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    userSearchString_LocationsOn_ProteinSequence_Root? : UserSearchString_LocationsOn_ProteinSequence_Root;
    proteinSequenceWidgetDisplay_Component_Data? : ProteinSequenceWidgetDisplay_Component_Data;
    sequenceCoverageBooleanArray_Unfiltered? : Array<boolean>;
    peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject? : object;
    scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject? : object;
    peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject? : object;
    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject?: object;

    singleProtein_FiltersDisplay_ComponentData? : SingleProtein_FiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds;  //  For displaying the peptide list in sub component

    create_GeneratedReportedPeptideListData_Result? : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

    //
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue
}

/**
 * 
 */
export class ProteinExperimentPage_SingleProtein_MainContent_Component extends React.Component< ProteinExperimentPage_SingleProtein_MainContent_Component_Props, ProteinExperimentPage_SingleProtein_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    //  For class methods that are '.bind(this)' and cast to a function type:
    //     Add a cast to same function type without the '.bind(this)' in the constructor to local variable to validate that the local function properly implements the function type
    //        (missing or mis-typed parameters will error.  extra properties in a object in the parameters will not error)

    private _selectedConditionsChanged_Callback_BindThis = this._selectedConditionsChanged_Callback.bind(this);

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

    private _DO_NOT_CALL() { //  Test Cast of method
        const mainCell_getHoverContents: ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;

        const modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback;

    }

    //  bind to 'this' for passing as parameters

    // private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _downloadPeptides_All_ClickHandler_BindThis = this._downloadPeptides_All_ClickHandler.bind(this);
    private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    private _downloadPsms_All_ClickHandler_BindThis = this._downloadPsms_All_ClickHandler.bind(this);
    private _downloadPsms_Shown_ClickHandler_BindThis = this._downloadPsms_Shown_ClickHandler.bind(this);

    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis : () => void = this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideSequence_MissedCleavageCount_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject_StateObject_Callback.bind(this);

    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis : ({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root.bind(this);

    private _updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback.bind(this);

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinSequenceWidgetDisplay_Root_Component_React>

    private _proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _domMutationObserver_reported_peptides_outer_container : MutationObserver;

    private _updated_OverlayWidth: number = undefined;  // Updated whenever call function in parent Component to update width of overlay

    // private _width_LeftGridEntry_TopMainSection_LastUpdatedValue = undefined;  // Updated whenever update width left grid entry Top Main Section

    private _experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

    private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ModificationSelects : ModificationMass_ReporterIon__UserSelections__Coordinator_Class
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__For_ReporterIonSelections : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

    //  Flags Set to true/false in constructor

    private _allSearches_Have_ScanFilenames: boolean
    private _allSearches_Have_ScanData: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    private _anySearches_Have_ScanFilenames: boolean
    private _anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    //  Flags Set to true/false in various places

    private _searchesContains_VariableModifications = false;
    private _searchesContains_OpenModifications = false;
    private _searchesContains_StaticModifications = false;

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();
        this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        this._proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        {
            this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass =
                Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getNewInstance_SingleProtein();

            const encodedStateData = props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.getExperiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData();
            this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.initialize_SingleProteinInstance({encodedStateData});
        }
        {
            this._generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({
                valueChangedCallback: this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis
            });

            const encodedStateData = props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.getGeneratedPeptideContents_UserSelections__EncodedStateData();
            this._generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({encodedStateData});
        }

        let projectSearchIds_PossiblyFiltered : Array<number> = props.propsValue.projectSearchIds;

        //  Set object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

        const graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
            create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ // External Function

                //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells
                // Will be Updated for changes in Selected Conditions
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
                conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer,
                selectedConditionsChanged_Callback : this._selectedConditionsChanged_Callback_BindThis //  NEEDS: this._selectedConditionsChanged_Callback_BindThis
            })
        );

        if ( graphicRepresentation_SelectedCells.get_selected_ConditionCells_First_ConditionGroup().is_Any_ConditionCell_Selected() ||
            graphicRepresentation_SelectedCells.get_selected_ConditionCells_OtherThanFirst_ConditionGroup().is_Any_ConditionCell_Selected() ) {

            {
                const projectSearchIds_Selected_Set = new Set();

                const processAllDataEntries_Callback = ( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

                    const data = param.data;

                    const dataProperty = data.data;
                    if ( dataProperty ) {
                        const projectSearchIds = dataProperty.projectSearchIds;
                        if ( projectSearchIds && projectSearchIds.size !== 0 ) {

                            for ( const projectSearchId of projectSearchIds ) {
                                projectSearchIds_Selected_Set.add( projectSearchId );
                            }
                        }
                    }
                }

                props.propsValue.conditionGroupsDataContainer.processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer({
                    callback : processAllDataEntries_Callback, experimentConditions_GraphicRepresentation_SelectedCells : graphicRepresentation_SelectedCells, conditionGroupsContainer : props.propsValue.conditionGroupsContainer
                });

                projectSearchIds_PossiblyFiltered = [];

                for ( const projectSearchId of props.propsValue.projectSearchIds ) {
                    if ( projectSearchIds_Selected_Set.has( projectSearchId ) ) {
                        projectSearchIds_PossiblyFiltered.push( projectSearchId );
                    }
                }
            }
        }

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

        {

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

        }

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory ) {
            if ( props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : projectSearchIds_PossiblyFiltered, experimentId : props.propsValue.experimentId });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        this.state = { 
            widthOf_proteinSequenceWidgetDisplay_Component : 787, // Initial Width for component to handle sequence length of 1500
            projectSearchIds_PossiblyFiltered,
            graphicRepresentation_SelectedCells,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ModificationSelects,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class__For_ReporterIonSelections,
            saveView_Component_React,
            saveView_Component_Props_Prop,
            scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {},
            scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {},
            peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject: {},
            psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject: {}
        };
    }

    /**
     * 
     */   
    componentDidMount() {
        try {
            this._main_GetData_SetState_Call_UpdateAfterPaint_AddListeneners_AfterComponentMount(); // Returned Promise Ignored

        } catch( e ) {
			console.log("Exception caught in componentDidMount()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    }

    /**
     * 
     */   
    componentWillUnmount() {
        try {
            // this._resizeWindow_Handler_Remove();

            this._remove_MutationObserver_From_reported_peptides_outer_container();
            
        } catch( e ) {
			console.log("Exception caught in componentWillUnmount()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    }

    /**
     * Returned Promise Ignored
     *
     * at bottom call this._update_Overlay_Add_Listeners__After_MainPaint()
     */
    private async _main_GetData_SetState_Call_UpdateAfterPaint_AddListeneners_AfterComponentMount() : Promise<void> {
        try {
            //  remove from selection state objects values that are not in the loaded data. (Values that have been for: searches removed, or for values that don't meet new filter cutoffs)

            await purge_FilterSelections_NotIn_CurrentData({
                projectSearchIds : this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject: undefined,
                psm_Charge_Filter_UserSelection_StateObject:  this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject
            });

            const {
                linksToExternalResources,
                protein_fractionCovered_Unfiltered,
                psmCountForUnfiltered,
                modificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
                reporterIons_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData,
                peptideSequence_UserSelections_ComponentData,
                userSearchString_LocationsOn_ProteinSequence_Root,
                proteinSequenceWidgetDisplay_Component_Data,
                sequenceCoverageBooleanArray_Unfiltered,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

            } :  {
                linksToExternalResources : ProteinExperimentPage_SingleProtein_MainContent_Component_LinksToExternalResources,
                protein_fractionCovered_Unfiltered : number,
                psmCountForUnfiltered : number,
                modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
                reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData
                peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
                userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
                proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data,
                sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

            }  = await ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.initialPopulate({

                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                proteinSequenceString : this.props.propsValue.proteinSequenceString,
                projectSearchIds_All : this.props.propsValue.projectSearchIds,
                projectSearchIds_PossiblyFiltered : this.state.projectSearchIds_PossiblyFiltered,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object : this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                graphicRepresentation_SelectedCells : this.state.graphicRepresentation_SelectedCells
            });

            const singleProtein_FiltersDisplay_ComponentData : SingleProtein_FiltersDisplay_ComponentData = {
                searchSubGroup_Are_All_SearchSubGroupIds_Selected : true, // FAKE true so NOT display section when nothing else is selected
                searchSubGroup_PropValue : undefined,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
                commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder : this.props.propsValue.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject
            };

            let protein_percentageCovered_Unfiltered_Rounded = "";

            {
                protein_percentageCovered_Unfiltered_Rounded = (protein_fractionCovered_Unfiltered * 100).toFixed(1);

                const endingToRemoveIfPresent = ".0";
                if (protein_percentageCovered_Unfiltered_Rounded.endsWith( endingToRemoveIfPresent ) ) {
                    const newLastCharacterPosition = protein_percentageCovered_Unfiltered_Rounded.length - endingToRemoveIfPresent.length
                    protein_percentageCovered_Unfiltered_Rounded = protein_percentageCovered_Unfiltered_Rounded.substring( 0, newLastCharacterPosition );
                }
            }

            const psmCountForUnfilteredDisplay = psmCountForUnfiltered.toLocaleString();

            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = await create_GeneratedReportedPeptideListData__SingleProtein({

                forPeptidePage: false,

                psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

                searchSubGroup_Ids_Selected : null,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            } );

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_Final = create_GeneratedReportedPeptideListData_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            await this._get_searchesContains_StaticVariableOpenMods();

            this.setState({
                linksToExternalResources,
                protein_fractionCovered_Unfiltered,
                protein_percentageCovered_Unfiltered_Rounded,
                psmCountForUnfilteredDisplay,
                modificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
                reporterIons_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData,
                peptideSequence_UserSelections_ComponentData,
                userSearchString_LocationsOn_ProteinSequence_Root,
                proteinSequenceWidgetDisplay_Component_Data,
                sequenceCoverageBooleanArray_Unfiltered,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_Final,
                create_GeneratedReportedPeptideListData_Result,
                singleProtein_FiltersDisplay_ComponentData,
            });

            window.setTimeout( () => {

                this._update_Overlay_Add_Listeners__After_MainPaint()
            });

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _get_searchesContains_StaticVariableOpenMods() : Promise<void> {
        try {
            return new Promise<void>((resolve_TopLevel, reject_TopLevel) => { try {

                const promises: Array<Promise<void>> = [];

                for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                    const commonData_LoadedFromServer_PerSearch_For_ProjectSearchId =  // state object populated in constructor
                        this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root.get__commonData_LoadedFromServer_PerSearch_For_ProjectSearchId(projectSearchId);
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
                    {  // Static Mods
                        const get_StaticModsHolder_Result = commonData_LoadedFromServer_PerSearch_For_ProjectSearchId.get_commonData_LoadedFromServer_SingleSearch__StaticModifications().get_StaticModsHolder();

                        if ( get_StaticModsHolder_Result.data ) {

                            if ( get_StaticModsHolder_Result.data.staticMods_Holder.get_StaticMods().length > 0 ) {
                                this._searchesContains_StaticModifications = true;
                            }

                        } else if ( get_StaticModsHolder_Result.promise ) {

                            const promise = new Promise<void>( (resolve, reject) => {
                                try {
                                    get_StaticModsHolder_Result.promise.catch( reason => {
                                        try {
                                            console.warn( "get_reportedPeptideIds_AnyPsmHas_OpenModifications_Result.promise.catch: reason: ", reason )
                                            reject(reason);
                                        } catch( e ) {
                                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                            throw e;
                                        }
                                    });
                                    get_StaticModsHolder_Result.promise.then( value => {
                                        try {
                                            if ( value.staticMods_Holder.get_StaticMods().length > 0 ) {
                                                this._searchesContains_StaticModifications = true;
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

                if ( promises.length === 0 ) {

                    //  No wait for data to load.  Continue to next step
                    resolve_TopLevel()

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
                            resolve_TopLevel()

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    });
                }

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _update_Overlay_Add_Listeners__After_MainPaint() {

        //  Get width of contained <ProteinSequenceWidgetDisplay_Root_Component_React>  (assumed to not change after this component mounts)

        const proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM = this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref.current;

        const containerRect = proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM.getBoundingClientRect();

        const containerRect_Width = Math.ceil( containerRect.width );
        // const containerRect_Height = containerRect.height;

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

            if ( state.widthOf_proteinSequenceWidgetDisplay_Component >= containerRect_Width ) {
                //  Already >= containerRect_Width so no change
                return null;
            }

            return { widthOf_proteinSequenceWidgetDisplay_Component : containerRect_Width }
        });

        this._resize_OverlayWidth_BasedOnReportedPeptidesTableWidth();

        this._add_MutationObserver_To_reported_peptides_outer_container_For_MakingWidthChangesAsNeeded();

        // this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();

        // this._resizeWindow_Handler_Attach();
    }

	// /**
	//  *
	//  */
	// private _resizeWindow_Handler_Attach() : void {
    //
	// 	//  Attach resize handler
	// 	window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
	// }
    //
	// /**
	//  *
	//  */
	// private _resizeWindow_Handler_Remove() : void {
    //
	// 	//  Remove resize handler
	// 	window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
	// }
	//
	// /**
	//  * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
	//  */
	// private _resizeWindow_Handler() : void {
	// 	try {
	// 		// this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();
    //
	// 	} catch( e ) {
	// 		console.log("Exception caught in _resizeWindow_Handler()");
	// 		console.log( e );
	// 		reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
	// 		throw e;
	// 	}
	// }

    /**
     * 
     */
    private _selectedConditionsChanged_Callback( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) {
        try {

            // Update URL
            {
                const experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData = this._experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding();
                this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setExperiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData({ experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData });
            }

            //  Update object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

            if ( ! this.state.graphicRepresentation_SelectedCells ) {

                const msg = "_selectedConditionsChanged_Callback(...) ( ! this.state.graphicRepresentation_SelectedCells )"
                console.warn( msg )
                throw Error( msg )
            }

            let graphicRepresentation_SelectedCells_Local = this.state.graphicRepresentation_SelectedCells.shallowClone();

            let projectSearchIds_PossiblyFiltered = this.props.propsValue.projectSearchIds;

            {
                const projectSearchIds_Selected_Set = new Set();

                const processAllDataEntries_Callback = ( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

                    const data = param.data;

                    const dataProperty = data.data;
                    if ( dataProperty ) {
                        const projectSearchIds = dataProperty.projectSearchIds;
                        if ( projectSearchIds && projectSearchIds.size !== 0 ) {

                            for ( const projectSearchId of projectSearchIds ) {
                                projectSearchIds_Selected_Set.add( projectSearchId );
                            }
                        }
                    }
                }
                this.props.propsValue.conditionGroupsDataContainer.processAllDataEntries_ForSelectedConditionIds_ConditionGroupsDataContainer({
                    callback : processAllDataEntries_Callback, experimentConditions_GraphicRepresentation_SelectedCells : graphicRepresentation_SelectedCells_Local, conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer
                });

                projectSearchIds_PossiblyFiltered = [];

                for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {
                    if ( projectSearchIds_Selected_Set.has( projectSearchId ) ) {
                        projectSearchIds_PossiblyFiltered.push( projectSearchId );
                    }
                }
            }

            this.setState({ graphicRepresentation_SelectedCells : graphicRepresentation_SelectedCells_Local, projectSearchIds_PossiblyFiltered });

            // Trigger update of rest of page

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
    }

    /**
     * 
     */    
    _mainCell_getHoverContents( params : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params ) {

        const conditionIdPath = params.conditionIdPath;

        const conditionGroupsContainer = this.props.propsValue.conditionGroupsContainer;
        const conditionGroupsDataContainer = this.props.propsValue.conditionGroupsDataContainer;
        const searchNamesMap_KeyProjectSearchId = this.props.propsValue.searchNamesMap_KeyProjectSearchId;

        return mainCell_getHoverContents_StandAlone({ 
            conditionIdPath, conditionGroupsContainer, conditionGroupsDataContainer, searchNamesMap_KeyProjectSearchId 
        });
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
     *
     */
    _downloadPeptides_All_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {
            this._downloadPeptides_All()

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    async _downloadPeptides_All() {  //  async to allow await
        try {
            const proteinSequenceVersionId = this.props.propsValue.proteinSequenceVersionId;
            const projectSearchIds = this.props.propsValue.projectSearchIds;

            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                await this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call

                    not_filtered_position_modification_selections : true, //  Required to be true for Download "All"

                    proteinSequenceVersionId,
                    searchSubGroup_Ids_Selected : undefined,

                    //  Passed since required but not used since passing not_filtered_position_modification_selections : true

                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject : undefined,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

            let create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = undefined;

            {
                const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                create_GeneratedReportedPeptideListData_Result = await create_GeneratedReportedPeptideListData__SingleProtein({

                    forPeptidePage: false,

                    psmMinimumCount_Filter_UserEntry: undefined,  // Never pass a value since for ALL Peptides

                    searchSubGroup_Ids_Selected : null,

                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                    generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,

                    proteinSequenceVersionId,
                    projectSearchIds,
                    conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                    conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                } );
            }

            const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

            const reportedPeptideDisplayDownloadDataAsString : string = peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString({
                peptideList,
                conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                dataPageStateManager: this.props.propsValue.dataPageStateManager
            });

            StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = this.state.create_GeneratedReportedPeptideListData_Result;
        
        const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

        const reportedPeptideDisplayDownloadDataAsString : string = peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString({
            peptideList,
            conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
            conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
            dataPageStateManager: this.props.propsValue.dataPageStateManager
        });

        StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' });
    }


    /**
     * Download ALL PSMs for Protein based on current cutoff/filter criteria.
     *
     * Open URL in new window to download from server
     */
    _downloadPsms_All_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {
            this._downloadPsms_All();

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Download ALL PSMs for Protein based on current cutoff/filter criteria.
     *
     * Open URL in new window to download from server
     */
    async _downloadPsms_All()  {
        try {
            const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } =
                experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId({
                    conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer,
                    conditionGroupsDataContainer : this.props.propsValue.conditionGroupsDataContainer
                });

            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                await this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call

                    not_filtered_position_modification_selections : true,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    searchSubGroup_Ids_Selected : undefined,
                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject : undefined,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

            for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )

                if ( ! reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId ) {

                    continue; // EARLY CONTINUE
                }

                const reportedPeptideIdsForDisplayData = reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_reportedPeptideIds()

                const reportedPeptideIdsAndTheirPsmIds = [];

                for ( const reportedPeptideId of reportedPeptideIdsForDisplayData ) {

                    const reportedPeptideIdsAndTheirPsmIdsEntry = { reportedPeptideId };
                    reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
                }

                const experimentDataForSearch = conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( experimentDataForSearch === undefined ) {
                    const msg = "No value in conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId, reportedPeptideIdsAndTheirPsmIds, experimentDataForSearch };
                projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
            }

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsmsClickHandler_All: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: "
                    + this.props.propsValue.proteinSequenceVersionId
                    + ", projectSearchIds: " + this.state.projectSearchIds_PossiblyFiltered.join(",")
                );
            }

            this._downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }


	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */
    _downloadPsms_Shown_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {
            this._downloadPsms_Shown();

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.
     *
     * Open URL in new window to download from server
     */
    async _downloadPsms_Shown()  {
        try {
            const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } =
                experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId({
                    conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer,
                    conditionGroupsDataContainer : this.props.propsValue.conditionGroupsDataContainer
                });


                const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                    await this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.
                    getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call

                        not_filtered_position_modification_selections : false,
                        proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                        searchSubGroup_Ids_Selected : undefined,

                        proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                        modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                        reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                        scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                        scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                        psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                        peptideUnique_UserSelection_StateObject : undefined,
                        peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                        peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                        userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                        proteinPositionFilter_UserSelections_StateObject : undefined,
                        psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                    });

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds = [];

            for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

                const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )

                if ( ! reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId ) {

                    continue; // EARLY CONTINUE
                }

                const reportedPeptideIdsAndTheirPsmIds = [];

                for ( const entryFor_reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_Entries_IterableIterator() ) {

                    const reportedPeptideId = entryFor_reportedPeptideId.reportedPeptideId

                    if ( entryFor_reportedPeptideId.psmIds_Include ) {

                        let psmIds_Include = undefined

                        if ( entryFor_reportedPeptideId.psmIds_Include  ) {
                            psmIds_Include = Array.from( entryFor_reportedPeptideId.psmIds_Include )
                        }

                        const reportedPeptideIdAndPsmIds = {
                            reportedPeptideId,
                            psmIds_Include
                        };

                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdAndPsmIds );

                    } else {

                        //  Not Filtered on Reporter Ion Masses so No passing PSM IDs to filter on

                        const reportedPeptideIdsAndTheirPsmIdsEntry = { reportedPeptideId };
                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
                    }
                }


                const experimentDataForSearch = conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( experimentDataForSearch === undefined ) {
                    const msg = "No value in conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId, reportedPeptideIdsAndTheirPsmIds, experimentDataForSearch };
                projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
            }

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsms_Shown_ClickHandler: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " 
                    + this.props.propsValue.proteinSequenceVersionId 
                    + ", projectSearchIds: " + this.state.projectSearchIds_PossiblyFiltered.join(",") 
                );
            }
            
            this._downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
	}

	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } : { projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> } ) {
		
        download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
            experimentId : this.props.propsValue.experimentId,
			projectSearchIdsReportedPeptideIdsPsmIds,
			searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
			proteinSequenceVersionIds : undefined  //  Already filtered to reported peptide ids for this proteinSequenceVersionId
		} );
    }
    
    //////////////////

    /**
     * Clear All Selections
     * 
     */
    _clearAllSelections() {
        try {
            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            //  NOT Reset this for "Clear All"
            // this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.clearTreatOpenModMassZeroAsUnmodified_Selection();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

            this.props.propsValue.peptideUnique_UserSelection_StateObject.clearPeptideUnique();
        
            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();

            this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject.clearAll();

            this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject.clearAll();

            this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.clearAll();

            //     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transfered to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
            
            this.props.propsValue.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions();

            this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();

            this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();
            this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject.clearAll();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL
                    this._selectedPeptideUniqueChange_UpdateURL();
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL
                    this._selectedProteinPositionsChange_UpdateURL();

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

                            this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Force_ReRender_Object()

                            this._proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data();

                            this._update__psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject();

                            this._update__peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject();

                            {
                                //  Create Updated instance for "Clear All"
                                const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = userSearchString_LocationsOn_ProteinSequence_Compute({
                                    proteinSequenceString : this.props.propsValue.proteinSequenceString,
                                    searchStrings : this.props.propsValue.peptideSequence_UserSelections_StateObject.getPeptideSearchStrings()
                                });

                                this.setState( { userSearchString_LocationsOn_ProteinSequence_Root });
                            }

                            this._proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data();

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

                this._openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay();

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

        const modificationMass_UserSelections_DisplayMassSelectionOverlay = new ModificationMass_UserSelections_DisplayMassSelectionOverlay({

            variable_Modifications_DISPLAY: false,
            open_Modifications_DISPLAY: true,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
            proteinNames: this.props.propsValue.proteinNames,
            proteinDescriptions: this.props.propsValue.proteinDescriptions,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
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
                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();
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
    async _modificationMass_Update_modificationMass_UserSelections_ComponentData() {
        try {
            const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData =
                await ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                })

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
                    this._selected_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Change_UpdateURL();  //  Update URL

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
            }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
     */
    _modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData() {

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result =
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            });

        if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data ) {

            const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data
            this.setState({modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData});

        } else if ( modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise ) {
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.promise.then(value => { try {
                const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result.data

                this.setState({modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData});

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
        } else {
            throw Error("modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent_Result no data or promise")
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
     * create new this.state.modificationMass_UserSelections_ComponentData
     */ 
    async _reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData() {
        try {
            const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData =
                await ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                });

            this.setState( { reporterIons_UserSelections_ComponentData });

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
     *
     */
    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback() {

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
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback() {

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
    private _updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback() {

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
     * create new this.state.peptideUnique_UserSelection_ComponentData
     */
    _peptideUnique_Update_PeptideUnique_UserSelection_ComponentData() {

        const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject
        });

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

            return { peptideUnique_UserSelection_ComponentData };
        });
    }

    /**
     * Change to peptide string selection, this.props.propsValue.peptideSequence_UserSelections_StateObject
     */ 
    _updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL

                    window.setTimeout( () => {
                        try {
                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();

                            window.setTimeout( () => {
                                try {
                                    this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

                                        return { userSearchString_LocationsOn_ProteinSequence_Root };
                                    });

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

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData =
            ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
            });

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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
     * create new this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object
     */
    private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Force_ReRender_Object() {

        this.setState( { peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject: {} } );
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

    /**
     * create new this.state.peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject
     */
    private _update__peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject() {

        this.setState( { peptideSequence_MissedCleavageCount_UserSelections_Object_Force_ResetToStateObject: {} } );
    }


    /**
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selected_generatedPeptideContents_UserSelections_StateObject__Change_UpdateURL();

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
     * Change to protein sequence position selection
     */ 
    _updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback() : void {
        try {
            // let newSelection = false;
            
            window.setTimeout( () => {
                try {
                    this._selectedProteinPositionsChange_UpdateURL();

                    window.setTimeout( () => {
                        try {
                            this._proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data();
        
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
     * create new this.state.proteinSequenceWidgetDisplay_Component_Data
     */ 
    _proteinSequenceWidgetDisplay_Update_proteinSequenceWidgetDisplay_Component_Data() {
        
        const proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data  = this.state.proteinSequenceWidgetDisplay_Component_Data.shallowClone();
    
        proteinSequenceWidgetDisplay_Component_Data.selectedProteinSequencePositions = this.props.propsValue.proteinSequenceWidget_StateObject.get_selectedProteinSequencePositions();

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

            return { proteinSequenceWidgetDisplay_Component_Data };
        });
    }

	//  Handling Specific Changes by updating the URL

    /**
     * Update State to URL for ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass selection change
     */
    _selected_generatedPeptideContents_UserSelections_StateObject__Change_UpdateURL() {

        const generatedPeptideContents_UserSelections__EncodedStateData = this._generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setGeneratedPeptideContents_UserSelections__EncodedStateData({ generatedPeptideContents_UserSelections__EncodedStateData });
    }

    /**
     * Update State to URL for ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass selection change
     */
    _selected_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Change_UpdateURL() {

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getDataForEncoding();
        this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData });
    }

	/**
	 * Update State to URL for Modification selection change (Variable or Static Modifications)
	 */
	_selectedModificationsChange_UpdateURL() {

		const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

	/**
	 * 
	 */
	_reporterIonMassesChange_UpdateURL() {

		const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
	}

    /**
     * Update State to URL for Peptide Unique selection change
     */
    _selectedPeptideUniqueChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.peptideUnique_UserSelection_StateObject.getEncodedStateData();
        this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setPeptideUniqueFilterSelectedEncodedStateData({ peptideUniqueFilterSelectedEncodedStateData : encodedStateData });
    }

    /**
	 * Update State to URL for Peptide Sequence selection change
	 */
	_selectedPeptideSequenceChange_UpdateURL() {

		const peptideSequenceSelectedEncodedStateData = this.props.propsValue.peptideSequence_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
    }

    /**
	 * Update State to URL for Protein Sequence Positions selection change
	 */
	_selectedProteinPositionsChange_UpdateURL() {

		const widgetEncodedStateData = this.props.propsValue.proteinSequenceWidget_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );
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

                    // Display Updating message
                    this.setState({ updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : true });

                    window.setTimeout( () => {
                        try {
                            this._updateRestOfPage_ForUserInteraction__After___updateCurrentPeptideFiltersSection(); // Ignore returned Promise

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 10 );

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
	 * Update section above the peptide list that shows the current Peptide Filters
	 */
    _updateCurrentPeptideFiltersSection() {

        const singleProtein_FiltersDisplay_ComponentData : SingleProtein_FiltersDisplay_ComponentData = {
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : true, // FAKE true so NOT display section when nothing else is selected
            searchSubGroup_PropValue : undefined,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
            peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject: this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder : this.props.propsValue.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject
        };

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

            return { singleProtein_FiltersDisplay_ComponentData };
        });
    }

    /**
     *
     * 'async'
     */
    async _updateRestOfPage_ForUserInteraction__After___updateCurrentPeptideFiltersSection() : Promise<void> {
        try {
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                await this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call
                    not_filtered_position_modification_selections : false,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    searchSubGroup_Ids_Selected : undefined,
                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                    peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

            let create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = undefined;

            {
                const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                create_GeneratedReportedPeptideListData_Result = await create_GeneratedReportedPeptideListData__SingleProtein({

                    forPeptidePage: false,

                    psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

                    searchSubGroup_Ids_Selected : null,
                    generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                    conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                    conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                } );
            }

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = create_GeneratedReportedPeptideListData_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            const sequenceCoverageBooleanArray_Unfiltered = this.state.sequenceCoverageBooleanArray_Unfiltered;

            let proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data = undefined;

            {
                let proteinPositions_CoveredBy_SearchStrings = this.state.userSearchString_LocationsOn_ProteinSequence_Root.proteinPositions_CoveredBy_SearchStrings;
                if ( proteinPositions_CoveredBy_SearchStrings.length < 1 ) {
                    proteinPositions_CoveredBy_SearchStrings = undefined;
                }

                let experimentConditionsSelected : boolean = false;

                if ( this.state.graphicRepresentation_SelectedCells.get_selected_ConditionCells_First_ConditionGroup().is_Any_ConditionCell_Selected() ||
                    this.state.graphicRepresentation_SelectedCells.get_selected_ConditionCells_OtherThanFirst_ConditionGroup().is_Any_ConditionCell_Selected() ) {

                    experimentConditionsSelected = true;
                }

                proteinSequenceWidgetDisplay_Component_Data =
                    await ProteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions.create_ProteinSequenceWidgetDisplay_Component_Data({
                        scan_RetentionTime_MZ_UserSelections_StateObject: undefined, // External Function Call

                        proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                        proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                        proteinSequenceString : this.props.propsValue.proteinSequenceString,
                        projectSearchIds_All : this.props.propsValue.projectSearchIds,
                        projectSearchIds_PossiblyFiltered : this.state.projectSearchIds_PossiblyFiltered,
                        proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
                        proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                        modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                        reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,

                        peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                        peptideSequence_MissedCleavageCount_UserSelections_StateObject : this.props.propsValue.peptideSequence_MissedCleavageCount_UserSelections_StateObject,
                        peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject : this.props.propsValue.peptideMeetsDigestion_AKA_TrypticPeptide_Etc_UserSelections_StateObject,
                        peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
                        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                        psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,

                        experimentConditionsSelected
                    });
            }

            window.setTimeout( () => {
                try {
                    this.setState( (state : ProteinExperimentPage_SingleProtein_MainContent_Component_State, props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {
                        return { proteinSequenceWidgetDisplay_Component_Data }
                    });

                    window.setTimeout( () => {
                        try {
                            this.setState({
                                updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : false,
                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                create_GeneratedReportedPeptideListData_Result
                            });

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 20 );

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


    //////////////
    
    //   Since the Peptide List can end up wider than the current width, 
    //   have a way to detect that and change the width to wider

	/**
	 * called by this._createSingleProteinModalOverlay
	 */
	_remove_MutationObserver_From_reported_peptides_outer_container() {

		{
			//  Remove _domMutationObserver_reported_peptides_outer_container if set
			// stop observing
			try {
				if ( this._domMutationObserver_reported_peptides_outer_container ) {
					this._domMutationObserver_reported_peptides_outer_container.disconnect();
				}
			} catch ( e ) {
				var z = 0;
			}
			this._domMutationObserver_reported_peptides_outer_container = undefined;
		}
    }

	/**
	 * called by this.componentDidMount()
	 */
	_add_MutationObserver_To_reported_peptides_outer_container_For_MakingWidthChangesAsNeeded() {

		{
			//  Remove _domMutationObserver_reported_peptides_outer_container if set
			// stop observing
			try {
				if ( this._domMutationObserver_reported_peptides_outer_container ) {
					this._domMutationObserver_reported_peptides_outer_container.disconnect();
				}
			} catch ( e ) {
				var z = 0;
			}
			this._domMutationObserver_reported_peptides_outer_container = undefined;
		}

		//  Add MutationObserver to DOM element .selector_reported_peptides_outer_container
	
		// const $selector_reported_peptides_outer_container = $view_single_protein_overlay_body.find(".selector_reported_peptides_outer_container");
		// if ( $selector_reported_peptides_outer_container.length === 0 ) {
		// 	throw Error("Failed find DOM element with class 'selector_reported_peptides_outer_container'");
		// }
		// if ( $selector_reported_peptides_outer_container.length > 1 ) {
		// 	throw Error("Found > 1 DOM element with class 'selector_reported_peptides_outer_container'");
		// }
		// const DOMElement = $selector_reported_peptides_outer_container[ 0 ];

		// Options for the observer (which mutations to observe)
		// const config = { attributes: true, childList: true, subtree: true };
		const config = { childList: true, subtree: true };

		let timeoutId: number = null;

		// Callback function to execute when mutations are observed
		const domMutationCallback = ( mutationsList: any, observer: any ) => {

			let foundChildListMutation = false;

			for ( const mutation of mutationsList ) {
				if  ( mutation.type == 'childList' ) {
					foundChildListMutation = true;
				}
				// else if ( mutation.type == 'attributes' ) {
				// 	console.log( 'The ' + mutation.attributeName + ' attribute was modified.' );
				// }
			}
			if ( foundChildListMutation ) {
				if ( timeoutId ) {
					window.clearTimeout( timeoutId );
				}
				timeoutId = window.setTimeout( () => {
					timeoutId = null;
					// console.log('At least 1 child node has been added or removed.');
					this._resize_OverlayWidth_BasedOnReportedPeptidesTableWidth();
				}, 200 );
			}

		};
		// Create an observer instance linked to the callback function
        this._domMutationObserver_reported_peptides_outer_container = new MutationObserver( domMutationCallback );
        

        const proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM = this._proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref.current;

		// Start observing the target node for configured mutations
		this._domMutationObserver_reported_peptides_outer_container.observe( proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM, config );

		// stop observing
		// this._domMutationObserver_reported_peptides_outer_container.disconnect();
	}

	/**
	 * Adjust overlay width to fit reported peptide 
	 * 
	 * called internally from this class
	 */
	_resize_OverlayWidth_BasedOnReportedPeptidesTableWidth() {

		//  Adjust overlay width to fit reported peptide list

        const proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM = this._proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref.current;

        const containerRect_GeneratedReportedPeptideListSection = proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM.getBoundingClientRect();
        
        // width includes the padding-left for the space for the expand icon.  This is the desired result.

		const reported_peptides_data_table_container_Width = containerRect_GeneratedReportedPeptideListSection.width; 
			
		let overlayWidth = (
            reported_peptides_data_table_container_Width 
            + this.props.view_single_protein_overlay_body_PaddingLeft 
            + this.props.view_single_protein_overlay_body_PaddingRight
            + 2 //  Little Extra
        );
		if ( overlayWidth < _OUTERMOST_CONTAINER_MIN_WIDTH ) {
			overlayWidth = _OUTERMOST_CONTAINER_MIN_WIDTH; // Min width
        }
        
        if ( overlayWidth !== this._updated_OverlayWidth ) {

            //  overlayWidth has changed

            this.props.setWidth__view_single_protein_inner_overlay_div({ width : overlayWidth });

            this._updated_OverlayWidth = overlayWidth;
        }

		// this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();
	}

	// /**
	//  * _adjustBoxesOnRight So AtRigthtEdgeOfViewPort or right edge of overlay, whichever is further left.
    //  *
    //  * This is done by adjusting the width of the containing <div> that contains the grid definition "auto min-content"
    //  *
    //  * Called from _resize_OverlayWidth_BasedOnReportedPeptidesTableWidth() or whenever the width of the viewport changes.
	//  */
	// _adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort() {
    //
    //     // console.log("_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort() entered")
    //
    //     let widthOverall_For_TopSection = undefined;  // Section above Peptide List.  Keep in viewport if possible
    //     {
    //         let overlayWidth = undefined;
    //
    //         if ( this._updated_OverlayWidth !== undefined ) {
    //
    //             overlayWidth = this._updated_OverlayWidth;
    //
    //         } else {
    //
    //             overlayWidth = this.props.view_single_protein_inner_overlay_div_Width_Initial;
    //         }
    //
    //         //   window.innerWidth: Per MDN: Width (in pixels) of the browser window viewport INCLUDING, if rendered, the vertical scrollbar.
    //         // const window_innerWidth = window.innerWidth
    //
    //         //  Get Width (in pixels) of the browser window viewport EXCLUDING, if rendered, the vertical scrollbar.
    //         //     Done to position boxes on right correctly from right side, including if vertical scrollbar is rendered
    //         const rootHTMLelement_Collection = document.getElementsByTagName("html");
    //         if ( ! ( rootHTMLelement_Collection.length > 0 ) ) {
    //             const msg = "_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort(): element 'html' not found: true: if ( ! ( rootHTMLelement_Collection.length > 0 ) )"
    //             console.warn( msg );
    //             throw Error( msg );
    //         }
    //         const rootHTMLelement = rootHTMLelement_Collection[ 0 ];
    //         const rootHTMLelement_clientWidth = rootHTMLelement.clientWidth; // Width (in pixels) of the browser window viewport EXCLUDING, if rendered, the vertical scrollbar.
    //
    //         // console.log("_adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort() rootHTMLelement_clientWidth: " + rootHTMLelement_clientWidth + ", window_innerWidth: " + window_innerWidth )
    //
    //         if ( overlayWidth < rootHTMLelement_clientWidth ) {
    //
    //             widthOverall_For_TopSection = overlayWidth;
    //
    //         } else {
    //
    //             widthOverall_For_TopSection = rootHTMLelement_clientWidth;
    //         }
    //     }
    //
    //     //  Subtract left and right adding of containing <div>
    //     widthOverall_For_TopSection = widthOverall_For_TopSection - this.props.view_single_protein_overlay_body_PaddingLeft - this.props.view_single_protein_overlay_body_PaddingRight;
    //     {
    //         const div_MainGridAtTo_DOM = this._div_MainGridAtTop_Ref.current;
    //
    //         div_MainGridAtTo_DOM.style.width = widthOverall_For_TopSection + "px";
    //
    //         div_MainGridAtTo_DOM.style.maxWidth = widthOverall_For_TopSection + "px";
    //     }
    //     {
    //         const div_MainContent_LeftGridEntry_AtTop_DOM = this._div_MainContent_LeftGridEntry_AtTop_Ref.current;
    //
    //         let width_LeftGridEntry = (
    //             widthOverall_For_TopSection
    //             - _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC - _BOXES_ON_RIGHT_CONTAINER_PADDING_LEFT__SUMMARY_ETC // - _BOXES_ON_RIGHT_CONTAINER_PADDING_RIGHT__SUMMARY_ETC
    //             - 10 //  border width on boxes and just extra
    //         );
    //
    //         if ( width_LeftGridEntry < this.state.widthOf_proteinSequenceWidgetDisplay_Component ) {
    //             width_LeftGridEntry = this.state.widthOf_proteinSequenceWidgetDisplay_Component
    //         }
    //
    //         if ( width_LeftGridEntry !== this._width_LeftGridEntry_TopMainSection_LastUpdatedValue ) {
    //
    //             // Has changed so update saved value and DOM
    //
    //             this._width_LeftGridEntry_TopMainSection_LastUpdatedValue = width_LeftGridEntry;
    //
    //             div_MainContent_LeftGridEntry_AtTop_DOM.style.width = width_LeftGridEntry + "px";
    //             div_MainContent_LeftGridEntry_AtTop_DOM.style.maxWidth = width_LeftGridEntry + "px";
    //             div_MainContent_LeftGridEntry_AtTop_DOM.style.minWidth = width_LeftGridEntry + "px";
    //         }
    //     }
	// }


    ////////////////////////////////////////

    /**
     * 
     */    
    render() {

        if ( ! this.state.create_GeneratedReportedPeptideListData_Result ) {

            return (
                <div>
                    <div style={ { fontSize: 24, fontWeight: "bold" }} >
                        Loading Data...
                    </div>
                    <div style={ { marginTop: 40 } }>
                        <Spinner_Limelight_Component/>
                    </div>
                </div>
            )
        }

        //  Main block without boxes on right for Summary Statistics, etc
        const width_mainBlockAbovePeptideList = this.state.widthOf_proteinSequenceWidgetDisplay_Component;

        let saveView_Component = undefined;

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
            )
        }

        return (
            <React.Fragment>

                    {/* Apply a width to this <div> so that the boxes on right stay within viewport when main overlay is widened to exceed viewport.
                        Need to take into account padding in class="view-single-protein-overlay-body" which is currently 20px or read that from DOM element */}

                    {/* Fake 'width' so that grid width not auto fill to width 100%.  Grid will exceed the 80px width to fill the width of the 2 columns.
                            This keeps boxes on right in viewport when main overlay width > viewport width. */}

                <div style={ { display: "grid", gridTemplateColumns: "auto min-content", width: 80 } } ref={ this._div_MainGridAtTop_Ref } >
                
                    {/* display of data above Reported Peptides  */}

                    <div ref={ this._div_MainContent_LeftGridEntry_AtTop_Ref } 
                        style={ { 
                            display: "inline-block",
                            width : width_mainBlockAbovePeptideList,
                            minWidth : width_mainBlockAbovePeptideList,
                            maxWidth : width_mainBlockAbovePeptideList
                        } } >  
                    
                        {/* Main Content above Reported Peptides  */}

                        <h3 style={ { fontSize: 24, marginBlockStart: 0, marginBlockEnd: 10 } }>
                            Experiment: <span style={ { overflowWrap : "break-word" } }>{ this.props.propsValue.experimentName }</span>
                        </h3>

                        <div style={ { marginBottom: 20, overflowX : "auto" } } >
                            <Experiment_SingleExperiment_ConditionsGraphicRepresentation 
                                data={ this.props.propsValue.experimentConditions_GraphicRepresentation_PropsData }
                                mainCellClickHandler={ undefined }
                                mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                                selectedCells={ this.state.graphicRepresentation_SelectedCells }
                                manage_SelectedCells_ConditionCell_Selection_UserClick_Updates={ true }
                                conditionGroupsContainer={ this.props.propsValue.conditionGroupsContainer }
                            />
                        </div>

                        <div style={ { paddingBottom: 15 } }>

                            { saveView_Component }

                            <SharePage_Component
                                experimentId={ this.props.propsValue.experimentId }
                                projectSearchIds={ this.state.projectSearchIds_PossiblyFiltered }
                            />
                        </div>

                        <div style={ { paddingBottom: 15 } }>
                            <ProteinExperimentPage_SingleProtein_ProteinNameDescription_Component
                                proteinNames={ this.props.propsValue.proteinNames }
                                proteinDescriptions={ this.props.propsValue.proteinDescriptions }
                            />
                        </div>

                        <div style={ { marginBottom: 10 } } >

                            <div className=" filter-common-block-selection-container-block yes-section-labels ">

                                {/* Display of User Selected filtering on  */}

                                <SingleProtein_FiltersDisplay
                                    singleProtein_FiltersDisplay_ComponentData={ this.state.singleProtein_FiltersDisplay_ComponentData }
                                    clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                                />

                                {/* Filter On ... */}

                                <FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>   {/*  Show/Hide the filters */}

                                    { (
                                        this._anySearches_Have_ScanFilenames
                                        && (
                                            ! ( this.props.propsValue.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
                                                && this.props.propsValue.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_total_SearchScanFileCount() === 1 ) )
                                    ) ? (

                                        <React.Fragment>

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

                                            {/*  Show Scan Filename Selector  */}

                                            <ScanFilenameId_On_PSM_Filter_UserSelection_Component
                                                allSearches_Have_ScanFilenames={ this._allSearches_Have_ScanFilenames }
                                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                                commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder={ this.props.propsValue.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder }
                                                scanFilenameId_On_PSM_Filter_UserSelection_StateObject={ this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject }
                                                scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject={ this.state.scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject }
                                                updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback={ this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis }
                                            />

                                        </React.Fragment>

                                    ): null}

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
                                        proteinSequenceVersionId={ this.props.propsValue.proteinSequenceVersionId }
                                        projectSearchIds={ this.state.projectSearchIds_PossiblyFiltered }
                                        proteinNames={ this.props.propsValue.proteinNames }
                                        proteinDescriptions={ this.props.propsValue.proteinDescriptions }
                                        modificationMass_CommonRounding_ReturnNumber={ modificationMass_CommonRounding_ReturnNumber } // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
                                        updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis } // this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
                                        update_modificationMass_UserSelections_ComponentData_Callback={ this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis } // create new this.state.modificationMass_UserSelections_ComponentData
                                    />

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
                                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                                    />

                                    <PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component
                                        peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject={ this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject }
                                        peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject={ this.state.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject }
                                        updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback={
                                            this._updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback_BindThis
                                        }
                                    />

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
                                        proteinSequenceString={ this.props.propsValue.proteinSequenceString }
                                        updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback
                                            ={ this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis }
                                        updateMadeTo_peptideSequence_UserSelections_StateObject_Callback={ null }
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

                                </FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>

                            </div>

                        </div>

                        <div >
                            <span style={ { fontSize: 18, fontWeight: "bold" } }>Sequence Coverage: </span> 
                        </div> 

                        <div style={ { display: "inline-block" } } ref={ this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}

                            <div style={ { position: "relative" }}>

                                <ProteinSequenceWidgetDisplay_Root_Component_React
                                    proteinSequenceWidgetDisplay_Component_Data={ this.state.proteinSequenceWidgetDisplay_Component_Data }
                                    proteinSequenceWidget_StateObject={ this.props.propsValue.proteinSequenceWidget_StateObject }
                                    updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis }
                                />

                                { ( this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList ) ? (

                                    <div  className=" block-updating-overlay-container " >
                                        Updating Peptide List
                                    </div>
                                ) : ( this.state.gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds ) ? (

                                    <div  className=" block-updating-overlay-container " >
                                        Loading Data to show Peptides
                                    </div>
                                ) : null }

                            </div>
                        </div>

                    </div>  {/* END: Main Content above Reported Peptides  */}

                    {/* Display of Boxes to right of Main Content above Reported Peptides (Summary Statistics, External Links, Downloads) */}

                    <div style={ {  
                        position: "relative", 
                        width: _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC, 
                        minWidth: _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC, 
                        maxWidth: _BOXES_ON_RIGHT_CONTAINER_WIDTH__SUMMARY_ETC, 
                        paddingLeft: _BOXES_ON_RIGHT_CONTAINER_PADDING_LEFT__SUMMARY_ETC, 
                        paddingRight: 0, // _BOXES_ON_RIGHT_CONTAINER_PADDING_RIGHT__SUMMARY_ETC, 
                        marginBottom: 15 
                    } }>

                        <div className="single-protein-box-on-right"> {/*  Summary Data */}
                            <div className="header-label">
                                Summary Statistics:
                            </div>
                            <div className="box-contents" style={ { display: "grid", gridTemplateColumns: "160px 55px" } }>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 10 } }>
                                    Sequence coverage:
                                </div>
                                <div className="box-line" >
                                    { this.state.protein_percentageCovered_Unfiltered_Rounded }%
                                </div>

                                <div className="box-line" style={ { textAlign: "right", paddingRight: 10 } }>
                                    Spectral count:
                                </div>
                                <div className="box-line"  >
                                    { this.state.psmCountForUnfilteredDisplay }
                                </div>

                            </div>	
                        </div>


                        <div className="single-protein-box-on-right" style={ { marginTop: 15 } }> {/*  External Links: */}
                            <div className="header-label">
                                External Links:
                            </div>
                            
                            <div className="box-contents" >
                                <div className="box-line" >
                                    NCBI Blast 
                                    <a href={ this.state.linksToExternalResources.NCBI_Blast_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                                <div className="box-line"  >
                                    PDR Blast 
                                    <a href={ this.state.linksToExternalResources.PDR_Blast_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                                <div className="box-line"  >
                                    UniProtKB Search
                                    <a href={ this.state.linksToExternalResources.UniProtKB_Search_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                                <div className="box-line"  >
                                    NCBI Search
                                    <a href={ this.state.linksToExternalResources.NCBI_Search_URL }
                                        target="_blank" 
                                        style={ { marginLeft: 5 } }
                                        ><img className=" icon-small "
                                            src="static/images/icon-linkout-dark.png"
                                        />
                                    </a>
                                </div>
                            </div>	
                        </div>

                        <div className=" selector_downloads_block single-protein-box-on-right " 
                            style={ { marginTop: 15 } }> {/* Reports: */}

                            <div className="header-label">  {/* Hide when loading Reporter Ion Data for filtering? */}
                                Reports:  {/*  Downloads of data */}
                            </div>
                            
                            <div className="box-contents" style={ { display: "grid", gridTemplateColumns: "65px 35px 20px 60px 20px" } }>
                                <div className="box-line" >
                                    Peptides 
                                </div>

                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    all
                                </div>
                                <div className="box-line" >
                                    <img className=" icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPeptides_All_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"
                                    />
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    shown
                                </div>
                                <div className="box-line" >
                                    <img className=" icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPeptides_Shown_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"/>
                                </div>
                                <div className="box-line"  >
                                    PSMs 
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    all
                                </div>
                                <div className="box-line" >
                                    <img className="  icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPsms_All_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"/>
                                </div>
                                <div className="box-line" style={ { textAlign: "right", paddingRight: 5 } }>
                                    shown
                                </div>
                                <div className="box-line" >
                                    <img className=" icon-small " style={ { cursor: "pointer" } } 
                                        onClick={ this._downloadPsms_Shown_ClickHandler_BindThis }
                                        src="static/images/icon-download-dark.png"/>
                                </div>
                            </div>	
                        </div>
                        
                    </div>

                    <div className=" filter-common-block-selection-container-block no-section-labels ">

                        <GeneratedPeptideContents_UserSelections_Root_Component
                            generatedPeptideContents_UserSelections_StateObject={ this._generatedPeptideContents_UserSelections_StateObject }
                            searchContains_VariableModifications={ this._searchesContains_VariableModifications }
                            searchContains_OpenModifications={ this._searchesContains_OpenModifications }
                            searchContains_StaticModifications={ this._searchesContains_StaticModifications }
                            updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback={ this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis  }
                        />
                    </div>

                </div>  {/* Close display of data above Reported Peptides */}

                    {/* Display of Reported Peptides  */}

                                    
                <div style={ { display: "inline-block" } }  //  display: "inline-block" so can measure width of this div, including width of Peptide table and sub-tables
                    ref={ this._proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}

                    <ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component

                        showUpdatingMessage={ this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                        showGettingDataMessage={ this.state.gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }
                    
                        create_GeneratedReportedPeptideListData_Result={ this.state.create_GeneratedReportedPeptideListData_Result }

                        conditionGroupsContainer={ this.props.propsValue.conditionGroupsContainer }
                        conditionGroupsDataContainer={ this.props.propsValue.conditionGroupsDataContainer }

                        reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                        proteinSequenceVersionId={ this.props.propsValue.proteinSequenceVersionId }
                        projectSearchIds={ this.state.projectSearchIds_PossiblyFiltered }
                        searchDataLookupParamsRoot={ this.props.propsValue.searchDataLookupParamsRoot }
                        commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                        dataPageStateManager={ this.props.propsValue.dataPageStateManager }
                    />
                </div>
            </React.Fragment>

        );
    }

}

