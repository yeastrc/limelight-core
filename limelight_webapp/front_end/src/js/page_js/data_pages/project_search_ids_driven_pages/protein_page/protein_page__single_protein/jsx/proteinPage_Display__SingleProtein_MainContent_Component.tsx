/**
 * proteinPage_Display__SingleProtein_MainContent_Component.tsx
 * 
 * Single Protein Main Content:
 * 
 * Main Content of Protein Page - Multiple Searches - Single Protein - Contained inside Component <ProteinPage_Display__SingleProtein_MainContent_Component>
 * 
 */

import React from 'react'

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';

import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile';
//   From data_pages_common
import {DataPageStateManager, SearchNames_AsMap} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts
import {DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import {SharePage_Component} from 'page_js/data_pages/sharePage_React/sharePage_Component_React';
//   Modification Mass Rounding to provide some level of commonality between searches
import {modificationMass_CommonRounding_ReturnNumber} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

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

import {ProteinSequenceWidgetDisplay_Root_Component_React} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__protein_page__components/protein_sequence_display_widget/jsx/proteinSequenceWidgetDisplay_Root_Component_React'


import {
    GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'


import {
    DownloadPSMs_PerProjectSearchId_Entry,
    DownloadPSMs_PerReportedPeptideId,
    download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from 'page_js/data_pages/common__project_search_and_experiment_based_download_data/download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds';
import {
    ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions,
    ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class
} from './proteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions';

import {ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component} from './proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component';

import {
    create_GeneratedReportedPeptideListData__SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from '../js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData';
import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {ProteinPage_Display_SingleProtein_ProteinNameDescription_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/proteinPage_Display_SingleProtein_ProteinNameDescription_Component";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {GeneratedPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/generated_peptide_contents__user_controls/jsx/generatedPeptideContents_UserSelections_Root_Component";
import {SingleProtein_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {PeptideUnique_UserSelection} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {userSearchString_LocationsOn_ProteinSequence_Compute} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_Compute";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class,
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/jsx/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component";
import {ScanFilenameId_On_PSM_Filter_UserSelection_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/jsx/scanFilenameId_On_PSM_Filter_UserSelection_Component";
import {Scan_RetentionTime_MZ_UserSelections_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/jsx/scan_RetentionTime_MZ_UserSelections_Component";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";
import {FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__show_hide__expand_collapse_container_component/filterSection_DataPage_ShowHide_ExpandCollapse_Container_Component";
import {FilterOn_SearchProgramsGroup_ConditionalRender_Component} from 'page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__search_programs_group__conditional_render__component/filterOn_SearchProgramsGroup_ConditionalRender_Component';
import {SingleProtein_FiltersDisplay} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/single_protein/singleProtein_FiltersDisplay";
import {SingleProtein_FiltersDisplay_ComponentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/current_filters_display_block__each_root_component_and_their_data_objects/single_protein/singleProtein_FiltersDisplay_ComponentData";
import {CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root} from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {Psm_Charge_Filter_UserSelection_StateObject} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_StateObject";
import {Psm_Charge_Filter_UserSelection_Container_Component} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/filter_on__components/filter_on__core__components__peptide__single_protein/psm_charge/psm_Charge_Filter_UserSelection_Container_Component";
import {purge_FilterSelections_NotIn_CurrentData} from "page_js/data_pages/common_filtering_code_filtering_components__except_mod_main_page/purge_filter_selections_not_in_current_data/purge_FilterSelections_NotIn_CurrentData";


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
export class ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop {

    projectSearchIds : Array<number>;
    proteinSequenceVersionId : number;
    proteinNames : string;
    proteinDescriptions : string
    proteinSequenceString : string

    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: CommonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root

    getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: GetReportedPeptideIdsForDisplay_AllProjectSearchIds_Class  //  NOT Shared with Main Page, Single Protein Overlay Only

    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root

    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap;
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root;

    singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject;
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject
    psm_Charge_Filter_UserSelection_StateObject : Psm_Charge_Filter_UserSelection_StateObject

    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 * 
 */
export interface ProteinPage_Display__SingleProtein_MainContent_Component_Props {

    propsValue : ProteinPage_Display__SingleProtein_MainContent_Component_Props_Prop

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
interface ProteinPage_Display__SingleProtein_MainContent_Component_State {

    widthOf_proteinSequenceWidgetDisplay_Component? : number; // Width of <ProteinSequenceWidgetDisplay_Root_Component_React> (assumed to not change after this component mounts)

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchSubGroup_Are_All_SearchSubGroupIds_Selected? : boolean
    searchSubGroup_PropValue? : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;

    linksToExternalResources? : ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class;
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
    psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject?: object;

    singleProtein_FiltersDisplay_ComponentData? : SingleProtein_FiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds;  //  For displaying the peptide list in sub component

    create_GeneratedReportedPeptideListData_Result? : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    //
    modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class? : ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue
}

/**
 * 
 */
export class ProteinPage_Display__SingleProtein_MainContent_Component extends React.Component< ProteinPage_Display__SingleProtein_MainContent_Component_Props, ProteinPage_Display__SingleProtein_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    // private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _searchSubGroup_SelectionsChanged_Callback_BindThis = this._searchSubGroup_SelectionsChanged_Callback.bind(this);
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

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

    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_psm_Charge_Filter_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis : ({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root.bind(this);

    private _updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback.bind(this);

    private _NOT_CALLED_Function() {

        //  Test function cast

        const modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback: ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback;
    }

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinSequenceWidgetDisplay_Root_Component_React>

    private _proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _domMutationObserver_reported_peptides_outer_container : MutationObserver;

    private _updated_OverlayWidth: number = undefined;  // Updated whenever call function in parent Component to update width of overlay

    // private _width_LeftGridEntry_TopMainSection_LastUpdatedValue = undefined;  // Updated whenever update width left grid entry Top Main Section

    private _generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

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
    constructor(props : ProteinPage_Display__SingleProtein_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        {
            this._generatedPeptideContents_UserSelections_StateObject = new GeneratedPeptideContents_UserSelections_StateObject({
                valueChangedCallback: this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis
            });

            const encodedStateData = props.propsValue.singleProtein_CentralStateManagerObject.getGeneratedPeptideContents_UserSelections__EncodedStateData();
            this._generatedPeptideContents_UserSelections_StateObject.set_encodedStateData({encodedStateData});
        }

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject: props.propsValue.reporterIonMass_UserSelections_StateObject
            })

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

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

        this.state = {
            widthOf_proteinSequenceWidgetDisplay_Component : 787, // Initial Width for component to handle sequence length of 1500
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
            saveView_Component_React,
            saveView_Component_Props_Prop,
            scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {},
            scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {},
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
                searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
                searchSubGroup_Ids_Selected,
                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue,
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
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

            } :  {
                searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
                searchSubGroup_Ids_Selected : Set<number>
                searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean
                searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
                linksToExternalResources : ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions__LinksToExternalResources_Class,
                protein_fractionCovered_Unfiltered : number,
                psmCountForUnfiltered : number,
                modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
                reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
                peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
                userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
                proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data,
                sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

            }  = await ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.initialPopulate({
                propsValue : this.props.propsValue,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                proteinSequenceString : this.props.propsValue.proteinSequenceString,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root: this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object: this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object
            });


            const singleProtein_FiltersDisplay_ComponentData : SingleProtein_FiltersDisplay_ComponentData = {
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root : this.props.propsValue.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue
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

                searchSubGroup_Ids_Selected,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                dataPageStateManager: this.props.propsValue.dataPageStateManager,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                conditionGroupsContainer: undefined,     // Only populated for experiment Page
                conditionGroupsDataContainer: undefined, // Only populated for experiment Page
                commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
            } );

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_Final = create_GeneratedReportedPeptideListData_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            let saveView_Component_React = undefined;
            let saveView_Component_Props_Prop = undefined;

            if ( this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory ) {

                if ( this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                    const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                        this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                    );

                    const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : this.props.propsValue.projectSearchIds, experimentId : undefined });
                    saveView_Component_React = result.saveView_Component_React
                    saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
                }
            }

            await this._get_searchesContains_StaticVariableOpenMods();

            this.setState({
                searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
                linksToExternalResources,
                protein_fractionCovered_Unfiltered,
                protein_percentageCovered_Unfiltered_Rounded,
                psmCountForUnfilteredDisplay,
                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue,
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
                saveView_Component_React,
                saveView_Component_Props_Prop
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

        {
            const proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM = this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref.current;

            if ( proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM ) {

                const containerRect = proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref_DOM.getBoundingClientRect();

                const containerRect_Width = Math.ceil( containerRect.width );
                // const containerRect_Height = containerRect.height;

                this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

                    if ( state.widthOf_proteinSequenceWidgetDisplay_Component >= containerRect_Width ) {
                        //  Already >= containerRect_Width so no change
                        return null;
                    }

                    return { widthOf_proteinSequenceWidgetDisplay_Component : containerRect_Width }
                });
            }
        }

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

	// /**
	//  * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
	//  */
	// private _resizeWindow_Handler() : void {
	// 	try {
	// 		this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();
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
            this._selectedSearchSubGroup_CentralStateManagerObjectClassChange_UpdateURL();  //  Update URL

            window.setTimeout( () => {
                try {
                    this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

                    window.setTimeout(() => {
                        try {
                            //  Now update dependent page parts
                            this._updateRestOfPage_ForUserInteraction();

                        } catch (e) {
                            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                            throw e;
                        }
                    }, 10);

                } catch (e) {
                    console.warn("Exception caught in _searchSubGroup_SelectionsChanged_Callback(): First setTimeout: ", e );
                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                    throw e;
                }
            }, 10 );

        } catch( e ) {
            console.warn("Exception caught in _searchSubGroup_SelectionsChanged_Callback()");
            console.warn(e);
            reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
            throw e;
        }
    }

    /**
     *
     */
    private _searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState() {

        const searchSubGroup_PropValue: SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData =
            ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.compute_searchSubGroup_PropValue({ propsValue : this.props.propsValue });

        const searchSubGroup_Are_All_SearchSubGroupIds_Selected : boolean =
            ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Are_All_SearchSubGroupIds_Selected({ propsValue : this.props.propsValue });

        this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

            return { searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected };
        });
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
            let searchSubGroup_Ids_Selected : Set<number> = undefined;

            //   Code setting searchSubGroup_Ids_Selected not needed since searchSubGroup_Ids_Selected === undefined same as 'ALL'

            if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

                //  Only display for 1 search

                const projectSearchId = this.props.propsValue.projectSearchIds[ 0 ];

                const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "returned nothing: props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                //  Set searchSubGroup_Ids_Selected to ALL searchSubGroup_Ids

                searchSubGroup_Ids_Selected = new Set();

                for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
                    searchSubGroup_Ids_Selected.add( searchSubGroup.searchSubGroup_Id );
                }
            }

            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                await this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call

                    not_filtered_position_modification_selections : true, //  Required to be true for Download "All"
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    searchSubGroup_Ids_Selected,

                    //  Passed since required but not used since passing not_filtered_position_modification_selections : true

                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

            let create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = undefined;

            {
                const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                create_GeneratedReportedPeptideListData_Result = await create_GeneratedReportedPeptideListData__SingleProtein({

                    forPeptidePage: false,

                    psmMinimumCount_Filter_UserEntry: undefined,  // No Value Passed since download "ALL"

                    searchSubGroup_Ids_Selected,
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                    generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,

                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    conditionGroupsContainer: undefined,     // Only populated for experiment Page
                    conditionGroupsDataContainer: undefined, // Only populated for experiment Page
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                } );
            }

            const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

            const reportedPeptideDisplayDownloadDataAsString : string = this.createReportedPeptideDisplayDownloadDataAsString({
                peptideList
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

        const reportedPeptideDisplayDownloadDataAsString : string = this.createReportedPeptideDisplayDownloadDataAsString({
            peptideList
        });

        StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' });
    }
    
	/**
	 * Create Reported Peptide Data as String, for Download
	 * 
	 */
	createReportedPeptideDisplayDownloadDataAsString({ 
        
        peptideList
    
    } : {
        peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry>
    
    }) : string {

        //  For getting search info for projectSearchIds
        //   searchNamesKeyProjectSearchId is Map with key are projectSearchId as type number
		const searchNamesMap_KeyProjectSearchId = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap();


		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
			const reportLineParts = [ 'Sequence' ];
			
			for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {
			
				const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
				if ( ! searchNameObject ) {
					throw Error("No searchNameObject for projectSearchId: " + projectSearchId );
				}

				const headerString = 'PSM Count (' + searchNameObject.searchId + ")";
				reportLineParts.push( headerString );
			}

			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines - One line per peptideSequenceDisplay / Search Id

		for ( const peptideItem of peptideList ) {

            const reportLineParts = [ peptideItem.peptideSequenceDisplay ];
                
			for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {
            
                let psmCount = peptideItem.psmCountsMap_KeyProjectSearchId.get( projectSearchId );
                if ( ! psmCount ) {
                    psmCount = 0;
                }
                reportLineParts.push( psmCount.toString() )
            }
                
            reportLineParts_AllLines.push( reportLineParts );
		}

        //  Join all line parts into string for each line, delimit on '\t'

        const reportLine_AllLines = [];

        for ( const reportLineParts of reportLineParts_AllLines ) {

            const reportLine = reportLineParts.join( "\t" );
            reportLine_AllLines.push( reportLine );
        }

        //  Add empty string to array so get \n at end of last line when do reportLine_AllLines.join( '\n' );
        reportLine_AllLines.push("");

        //  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end

        const reportLinesSingleString = reportLine_AllLines.join( '\n' );

        return reportLinesSingleString;
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
                    psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

            for ( const projectSearchId of reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_ProjectSearchIds() ) {

                const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
                const reportedPeptideIdsForDisplayData = reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_reportedPeptideIds();

                const reportedPeptideIdsAndTheirPsmIds = [];

                for ( const reportedPeptideId of reportedPeptideIdsForDisplayData ) {

                    const reportedPeptideIdsAndTheirPsmIdsEntry = { reportedPeptideId };
                    reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId, reportedPeptideIdsAndTheirPsmIds };
                projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
            }

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsmsClickHandler_All: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " 
                    + this.props.propsValue.proteinSequenceVersionId 
                    + ", projectSearchIds: " + this.props.propsValue.projectSearchIds.join(",") 
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

            const projectSearchIds = this.props.propsValue.projectSearchIds;

            let searchSubGroup_Ids_Selected : Set<number> = undefined;

            if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

                //  Only display for 1 search

                const projectSearchId = this.props.propsValue.projectSearchIds[ 0 ];

                const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
                if ( ! searchSubGroups_ForProjectSearchId ) {
                    const msg = "returned nothing: props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                    console.warn( msg )
                    throw Error( msg )
                }

                searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
                    searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
                })
            }

            const peptideList = this.state.create_GeneratedReportedPeptideListData_Result.peptideList;


            const reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId : Map<number, Set<number>> = new Map();

            const psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId : Map<number,Map<number, Set<number>>> = new Map();

            if ( peptideList && peptideList.length > 0 ) {

                for ( const peptideItem of peptideList ) {

                    for ( const projectSearchId of projectSearchIds ) {

                        const dataPerReportedPeptideId_Map_Key_reportedPeptideId = peptideItem.dataPerReportedPeptideId_Map_Key_reportedPeptideId_InMap_KeyProjectSearchId.get( projectSearchId );
                        if ( ! dataPerReportedPeptideId_Map_Key_reportedPeptideId ) {
                            //  No Data so skip to next projectSearchId
                            continue; // EARLY CONTINUE
                        }

                        let reportedPeptideId_NotFilterdOnPsmId_Set = reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId.get( projectSearchId );
                        if ( ! reportedPeptideId_NotFilterdOnPsmId_Set ) {
                            reportedPeptideId_NotFilterdOnPsmId_Set = new Set();
                            reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId.set( projectSearchId, reportedPeptideId_NotFilterdOnPsmId_Set );
                        }
                        let psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.get( projectSearchId );
                        if ( ! psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map ) {
                            psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map = new Map();
                            psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.set( projectSearchId, psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map );
                        }


                        for ( const dataPerReportedPeptideId of dataPerReportedPeptideId_Map_Key_reportedPeptideId.values() ) {

                            if ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ) {

                                reportedPeptideId_NotFilterdOnPsmId_Set.add( dataPerReportedPeptideId.reportedPeptideId );

                                //  Delete since now NOT filtering on PSM Ids for this reportedPeptideId
                                psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map.delete( dataPerReportedPeptideId.reportedPeptideId );

                            } else {
                                if ( ! dataPerReportedPeptideId.psmIdsSet ) {
                                    throw Error( "( ! dataPerReportedPeptideId.psmIdsSet ) WHEN else of ( dataPerReportedPeptideId.no_SubFiltering_On_PsmIds_For_ReportedPeptideId_within_ProjectSearchId ). dataPerReportedPeptideId.reportedPeptideId: " + dataPerReportedPeptideId.reportedPeptideId + ", projectSearchId: " + projectSearchId );
                                }

                                if ( ! reportedPeptideId_NotFilterdOnPsmId_Set.has( dataPerReportedPeptideId.reportedPeptideId ) ) {
                                    //  NO entry for reportedPeptideId NOT filtering on PSM Ids so add PSM Ids to psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map

                                    let psmIds_Set = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map.get( dataPerReportedPeptideId.reportedPeptideId );
                                    if ( ! psmIds_Set ) {
                                        psmIds_Set = new Set();
                                        psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map.set( dataPerReportedPeptideId.reportedPeptideId, psmIds_Set );
                                    }
                                    for ( const psmId of dataPerReportedPeptideId.psmIdsSet ) {
                                        psmIds_Set.add( psmId );
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

            for ( const projectSearchId of projectSearchIds ) {

                const reportedPeptideIdsAndTheirPsmIds : Array<DownloadPSMs_PerReportedPeptideId> = [];

                const reportedPeptideId_NotFilterdOnPsmId_Set = reportedPeptideId_NotFilterdOnPsmId_Set__Map_Key_ProjectSearchId.get( projectSearchId );
                if ( reportedPeptideId_NotFilterdOnPsmId_Set && reportedPeptideId_NotFilterdOnPsmId_Set.size > 0 ) {

                    //  Not Filtered on specific PSM IDs so No passing PSM IDs to filter on

                    for ( const reportedPeptideId of reportedPeptideId_NotFilterdOnPsmId_Set ) {
                        const reportedPeptideIdsAndTheirPsmIdsEntry : DownloadPSMs_PerReportedPeptideId = { reportedPeptideId };
                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
                    }
                }

                const psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId__Map_Key_ProjectSearchId.get( projectSearchId );
                if ( psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId && psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId.size > 0 ) {

                    //  YES Filtered on specific PSM IDs so No passing PSM IDs to filter on

                    for ( const psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId_Entry of psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId.entries() ) {
                        const reportedPeptideId = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId_Entry[0];
                        const psmIds_Set = psmIds_Set_For_ReportedPeptideId_Map_Key_ReportedPeptideId_Entry[1];

                        const psmIds_Array = Array.from( psmIds_Set )

                        psmIds_Array.sort( (a, b) => {
                            if ( a < b ) {
                                return -1;
                            }
                            if ( a > b ) {
                                return 1;
                            }
                            return  0;
                        })

                        const reportedPeptideIdAndPsmIds : DownloadPSMs_PerReportedPeptideId = {
                            reportedPeptideId,
                            psmIds_Include: psmIds_Array
                        };

                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdAndPsmIds );
                    }
                }

                let searchSubGroup_Ids_Selected_Array: Array<number> = undefined;
                if ( searchSubGroup_Ids_Selected ) {
                    searchSubGroup_Ids_Selected_Array = Array.from(searchSubGroup_Ids_Selected);
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry : DownloadPSMs_PerProjectSearchId_Entry =
                    { projectSearchId, reportedPeptideIdsAndTheirPsmIds, searchSubGroup_Ids_Selected: searchSubGroup_Ids_Selected_Array };

                projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
            }

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsms_Shown_ClickHandler: No reportedPeptideIds for any projectSearchIds for proteinSequenceVersionId: " 
                    + this.props.propsValue.proteinSequenceVersionId 
                    + ", projectSearchIds: " + this.props.propsValue.projectSearchIds.join(",") 
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
	_downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } : {

        projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry>
    } ) {
        download_Psms_For_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
            experimentId : undefined,
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
            if ( this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass ) {
                this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass.clearAll();
            }

            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            //  NOT Reset this for "Clear All"
            // this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.clearTreatOpenModMassZeroAsUnmodified_Selection();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

            this.props.propsValue.peptideUnique_UserSelection_StateObject.clearPeptideUnique();
        
            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();

            this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.clearAll();
        
            //     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transferred to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
            
            this.props.propsValue.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions();

            this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();

            this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();
            this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject.clearAll();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._searchSubGroup_CentralStateManagerObjectClass_Changed_UpdateState();

                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL
                    this._selectedPeptideUniqueChange_UpdateURL();  //  Update URL
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

                            this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject();

                            this._update__psm_Charge_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject();

                            {
                                //  Create Updated instance for "Clear All"
                                const userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root = userSearchString_LocationsOn_ProteinSequence_Compute({
                                    proteinSequenceString : this.props.propsValue.proteinSequenceString,
                                    searchStrings : this.props.propsValue.peptideSequence_UserSelections_StateObject.getPeptideSearchStrings()
                                });

                                this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

                                    return { userSearchString_LocationsOn_ProteinSequence_Root };
                                });
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
     * open the overlay for Add/Change Mass Selection
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

            let getSearchSubGroupIds = false;
            if ( this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
                getSearchSubGroupIds = true;
            }

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
     * create new this.state.modificationMass_UserSelections_ComponentData
     */ 
    async _modificationMass_Update_modificationMass_UserSelections_ComponentData() {
        try {
            const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData =
                await ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root
                })

            this.setState( { modificationMass_UserSelections_ComponentData });

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
                await ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
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
     * create new this.state.peptideUnique_UserSelection_ComponentData
     */
    _peptideUnique_Update_PeptideUnique_UserSelection_ComponentData() {

        const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject
        });

        this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

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
                                    this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

                                        return { userSearchString_LocationsOn_ProteinSequence_Root };
                                    });

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
     * create new this.state.peptideSequence_UserSelections_ComponentData
     */ 
    _peptideSequence_Update_peptideSequence_UserSelections_ComponentData() {

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData =
            ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

            return { peptideSequence_UserSelections_ComponentData };
        });
    }

    /**
     * create new this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object
     */
    private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject() {

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
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this.generatedPeptideContents_UserSelections_Change_UpdateURL();  //  Update URL

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

        this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

            return { proteinSequenceWidgetDisplay_Component_Data };
        });
    }

	//  Handling Specific Changes by updating the URL

    /**
     * Update State to URL for SearchSubGroup_CentralStateManagerObjectClass selection change
     */
    _selectedSearchSubGroup_CentralStateManagerObjectClassChange_UpdateURL() {

        const searchSubGroupSelection_EncodedStateData = this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass.getDataForEncoding();
        this.props.propsValue.singleProtein_CentralStateManagerObject.setSearchSubGroupSelection_EncodedStateData({ searchSubGroupSelection_EncodedStateData })
    }

    /**
     * Update State to URL for ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass selection change
     */
    _selected_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Change_UpdateURL() {

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.getDataForEncoding();
        this.props.propsValue.singleProtein_CentralStateManagerObject.setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData });
    }

	/**
	 * Update State to URL for Modification selection change (Variable or Static Modifications)
	 */
	_selectedModificationsChange_UpdateURL() {

		const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_CentralStateManagerObject.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

	/**
	 * 
	 */
	_reporterIonMassesChange_UpdateURL() {

		const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_CentralStateManagerObject.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
	}

    /**
     * Update State to URL for Peptide Unique selection change
     */
    _selectedPeptideUniqueChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.peptideUnique_UserSelection_StateObject.getEncodedStateData();
        this.props.propsValue.singleProtein_CentralStateManagerObject.setPeptideUniqueFilterSelectedEncodedStateData({ peptideUniqueFilterSelectedEncodedStateData : encodedStateData });
    }

    /**
     * Update State to URL for Generated Peptide Contents selection change
     */
    generatedPeptideContents_UserSelections_Change_UpdateURL() {

        const generatedPeptideContents_UserSelections__EncodedStateData = this._generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.singleProtein_CentralStateManagerObject.setGeneratedPeptideContents_UserSelections__EncodedStateData({ generatedPeptideContents_UserSelections__EncodedStateData });
    }

    /**
	 * Update State to URL for Peptide Sequence selection change
	 */
	_selectedPeptideSequenceChange_UpdateURL() {

		const peptideSequenceSelectedEncodedStateData = this.props.propsValue.peptideSequence_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_CentralStateManagerObject.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
    }

	/**
	 * Update State to URL for Protein Sequence Positions selection change
	 */
	_selectedProteinPositionsChange_UpdateURL() {

		const widgetEncodedStateData = this.props.propsValue.proteinSequenceWidget_StateObject.getEncodedStateData();
		this.props.propsValue.singleProtein_CentralStateManagerObject.setProteinSequenceFormattedDisplayWidgetEncodedStateData( { proteinSequenceFormattedDisplayWidgetEncodedStateData : widgetEncodedStateData } );
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
                    }, 10 );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
                    //  Update more parts like protein coverage and peptide list
            }, 10 );

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
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root : this.props.propsValue.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            psm_Charge_Filter_UserSelection_StateObject : this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : this.state.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue : this.state.searchSubGroup_PropValue
        };

        this.setState( (state: ProteinPage_Display__SingleProtein_MainContent_Component_State, props: ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {

            return { singleProtein_FiltersDisplay_ComponentData };
        });
    }

    /**
     *
     * 'async'
     */
    async _updateRestOfPage_ForUserInteraction__After___updateCurrentPeptideFiltersSection() : Promise<void> {
        try {
            const searchSubGroup_Ids_Selected : Set<number> =
                ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Ids_Selected({ propsValue : this.props.propsValue });

            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result =
                await this.props.propsValue.getReportedPeptideIdsForDisplay_AllProjectSearchIds_Object.
                getReportedPeptideIdsForDisplay_AllProjectSearchIds_ReturnPromise({ // External Function Call
                    not_filtered_position_modification_selections : false,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    searchSubGroup_Ids_Selected,
                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    scanFilenameId_On_PSM_Filter_UserSelection_StateObject: this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                    scan_RetentionTime_MZ_UserSelection_StateObject: this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                    psm_Charge_Filter_UserSelection_StateObject: this.props.propsValue.psm_Charge_Filter_UserSelection_StateObject,
                    peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                    peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                    userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                    proteinPositionFilter_UserSelections_StateObject : undefined,
                    psm_Exclude_IndependentDecoy_PSMs_Filter_UserSelection_StateObject: undefined
                });

            let create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = undefined;

            {
                const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds =
                    getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                create_GeneratedReportedPeptideListData_Result = await create_GeneratedReportedPeptideListData__SingleProtein({

                    forPeptidePage: false,

                    psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

                    searchSubGroup_Ids_Selected,
                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                    generatedPeptideContents_UserSelections_StateObject : this._generatedPeptideContents_UserSelections_StateObject,
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    dataPageStateManager: this.props.propsValue.dataPageStateManager,
                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    conditionGroupsContainer: undefined,     // Only populated for experiment Page
                    conditionGroupsDataContainer: undefined, // Only populated for experiment Page
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

                proteinSequenceWidgetDisplay_Component_Data = await ProteinPage_Display__SingleProtein_MainContent_Component_nonClass_Functions.create_ProteinSequenceWidgetDisplay_Component_Data({ // External Function Call

                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,

                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                    proteinSequenceString : this.props.propsValue.proteinSequenceString,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
                    proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
                    commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root : this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root,
                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                    peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                    searchSubGroup_Are_All_SearchSubGroupIds_Selected : this.state.searchSubGroup_Are_All_SearchSubGroupIds_Selected
                });
            }

            window.setTimeout( () => {
                try {
                    this.setState( (state : ProteinPage_Display__SingleProtein_MainContent_Component_State, props : ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {
                        return { proteinSequenceWidgetDisplay_Component_Data }
                    });
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            }, 10 );

            // Display new data
            window.setTimeout( () => {
                try {
                    this.setState( (state : ProteinPage_Display__SingleProtein_MainContent_Component_State, props : ProteinPage_Display__SingleProtein_MainContent_Component_Props ) : ProteinPage_Display__SingleProtein_MainContent_Component_State => {
                        return {
                            updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : false,
                            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                            create_GeneratedReportedPeptideListData_Result
                        }
                    });
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


        const proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM =
            this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref.current;

        if ( proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM ) {

            // Start observing the target node for configured mutations
            this._domMutationObserver_reported_peptides_outer_container.observe( proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM, config );
        }
	}

	/**
	 * Adjust overlay width to fit reported peptide
	 *
	 * called internally from this class
	 */
	_resize_OverlayWidth_BasedOnReportedPeptidesTableWidth() {

		//  Adjust overlay width to fit reported peptide list

        const proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM =
            this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref.current;

        if ( proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM ) {

            const containerRect_GeneratedReportedPeptideListSection = proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref_DOM.getBoundingClientRect();

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
        }
	}

    ////////////////////////////////////////

    /**
     * 
     */    
    render() {

        if ( ! this.state.create_GeneratedReportedPeptideListData_Result ) {

            return (
                <div>
                    <div style={ { fontSize: 18 }} >
                        Loading Data
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
            );
        }

        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

        if ( this.props.propsValue.projectSearchIds.length === 1 ) {
            modificationMass_CommonRounding_ReturnNumber_Param = undefined;  //  NO Rounding for Single Project Search Id
        }

        let searchSubGroup_Ids_Selected : Set<number> = undefined;

        if (
            this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass
            && this.props.propsValue.projectSearchIds.length === 1 &&
            this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {

            //  Only display for 1 search

            const projectSearchId = this.props.propsValue.projectSearchIds[ 0 ];

            const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
            if ( ! searchSubGroups_ForProjectSearchId ) {
                const msg = "returned nothing: props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            searchSubGroup_Ids_Selected = searchSubGroup_Get_Selected_SearchSubGroupIds({
                searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass, searchSubGroups_ForProjectSearchId
            })
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

                        <SearchDetailsAndOtherFiltersOuterBlock_Layout>
                            <SearchDetailsAndFilterBlock_MainPage_Root
                                propValue={ this.state.searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue }
                                searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                                searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                                searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
                            />
                        </SearchDetailsAndOtherFiltersOuterBlock_Layout>

                        <div style={ { paddingBottom: 15 } }>

                            { saveView_Component }

                            <SharePage_Component
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                            />
                        </div>

                        <div style={ { paddingBottom: 15 } }>
                            <ProteinPage_Display_SingleProtein_ProteinNameDescription_Component
                                proteinNames={ this.props.propsValue.proteinNames }
                                proteinDescriptions={ this.props.propsValue.proteinDescriptions }
                            />
                        </div>

                        <div style={ { marginBottom: 10 } }  >

                            <div className=" filter-common-block-selection-container-block yes-section-labels ">

                                {/* Display of User Selected filtering on  */}

                                <SingleProtein_FiltersDisplay
                                    singleProtein_FiltersDisplay_ComponentData={ this.state.singleProtein_FiltersDisplay_ComponentData }
                                    clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                                />

                                {/* Filter On ... */}

                                <FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>   {/*  Show/Hide the filters */}


                                    <FilterOn_SearchProgramsGroup_ConditionalRender_Component
                                        searchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData={ this.state.searchSubGroup_PropValue }
                                        anySearches_Have_ScanFilenames={ this._anySearches_Have_ScanFilenames }
                                        dataPage_common_Data_Holder_Holder_SearchScanFileData_Root={ this.props.propsValue.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root }
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
                                                ! ( this.props.propsValue.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                                                    && this.props.propsValue.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.get_total_SearchScanFileCount() === 1 ) )
                                        ) ? (

                                            //  Show Scan Filename Selector

                                            <ScanFilenameId_On_PSM_Filter_UserSelection_Component
                                                allSearches_Have_ScanFilenames={ this._allSearches_Have_ScanFilenames }
                                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root={ this.props.propsValue.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root }
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
                                            limelight_Colors_For_SingleSearch__SubSearches={ undefined }  //  Only for QC Page
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
                                        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
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

                                </FilterSection_DataPage_ShowHide_ExpandCollapse_Container_Component>

                            </div>

                        </div>
                        
                        <div >
                            <span style={ { fontSize: 18, fontWeight: "bold" } }>Sequence Coverage: </span> 
                        </div> 

                        <div style={ { display: "inline-block" } } ref={ this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}
                            <ProteinSequenceWidgetDisplay_Root_Component_React
                                proteinSequenceWidgetDisplay_Component_Data={ this.state.proteinSequenceWidgetDisplay_Component_Data }
                                proteinSequenceWidget_StateObject={ this.props.propsValue.proteinSequenceWidget_StateObject }
                                updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis }
                            />
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

                {/*{ ( this.state.create_GeneratedReportedPeptideListData_Result ) ? (*/}

                    <React.Fragment>

                    <div style={ { display: "inline-block" } }  //  display: "inline-block" so can measure width of this div, including width of Peptide table and sub-tables
                        ref={ this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}

                        <ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component

                            showUpdatingMessage={ this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                            showGettingDataMessage={ this.state.gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }

                            create_GeneratedReportedPeptideListData_Result={ this.state.create_GeneratedReportedPeptideListData_Result }

                            searchSubGroup_Ids_Selected={ searchSubGroup_Ids_Selected }

                            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                            proteinSequenceVersionId={ this.props.propsValue.proteinSequenceVersionId }
                            projectSearchIds={ this.props.propsValue.projectSearchIds }
                            searchDataLookupParamsRoot={ this.props.propsValue.searchDataLookupParamsRoot }
                            commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root={ this.props.propsValue.commonData_LoadedFromServer_PerSearch_Plus_SomeAssocCommonData__Except_ModMainPage__Root }
                            dataPageStateManager={ this.props.propsValue.dataPageStateManager }
                        />
                    </div>

                    </React.Fragment>

                {/*): null }*/}

            </React.Fragment>

        );
    }

}

