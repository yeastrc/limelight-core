/**
 * peptidePage_Display_MainContent_Component.tsx
 * 
 * Peptide Page Main Content:
 * 
 * Main Content of Peptide Page
 * 
 */

import React from 'react'

import {reportWebErrorToServer} from 'page_js/reportWebErrorToServer';

import {StringDownloadUtils} from 'page_js/data_pages/data_pages_common/downloadStringAsFile';

import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager';
import {DataPages_LoggedInUser_CommonObjectsFactory} from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import {
    SaveView_Create_Component_React_Result,
    SaveView_Create_Component_React_Type
} from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import {SharePage_Component} from 'page_js/data_pages/sharePage_React/sharePage_Component_React';

import {modificationMass_CommonRounding_ReturnNumber} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import {ProteinView_LoadedDataCommonHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import {PeptideSequence_UserSelections_StateObject} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import {PeptideSequence_UserSelections_ComponentData} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ModificationMass_UserSelections_ComponentData} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import {ReporterIonMass_UserSelections_ComponentData} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {ModificationMass_UserSelections_Root} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root';

import {ReporterIonMass_UserSelections} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections';

import {PeptideSequence_UserSelections} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections';

import {PeptideFiltersDisplay_ComponentData} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'


import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'


import {
    DownloadPSMs_PerProjectSearchId_Entry,
    DownloadPSMs_PerReportedPeptideId,
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from 'page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds';
import {PeptidePage_Display_MainContent_Component_nonClass_Functions} from './peptidePage_Display_MainContent_Component_nonClass_Functions';

import {
    SearchDetailsAndFilterBlock_MainPage_Root,
    SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_Root";
import {SearchDetailsAndOtherFiltersOuterBlock_Layout} from "page_js/data_pages/search_details_and_other_filters_outer_block__project_search_id_based/jsx/searchDetailsAndOtherFiltersOuterBlock_Layout";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {GeneratedPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/jsx/generatedPeptideContents_UserSelections_Root_Component";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
import {PeptideUnique_UserSelection} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {searchSubGroup_Get_Selected_SearchSubGroupIds} from "page_js/data_pages/search_sub_group/js/searchSubGroup_Get_Selected_SearchSubGroupIds";
import {PeptidePageRoot_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePageRoot_CentralStateManagerObjectClass";
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/jsx/proteinPositionFilter_UserSelections_Component";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {
    createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein,
    CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function,
    CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function_Params,
    GetDataTableDataObjects_MultipleSearch_SingleProtein_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData";
import {DataTable_RootTableObject} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {
    ProteinPage_Display__SingleProtein_Root,
    ProteinPage_Display__SingleProtein_singleProteinCloseCallback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Root";
import {SingleProtein_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_single_protein_common/singleProtein_CentralStateManagerObjectClass";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class,
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {
    create_GeneratedReportedPeptideListData__SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component,
    ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback,
    ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component";
import {PeptideFiltersDisplay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/jsx/peptideFiltersDisplay";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/jsx/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {ScanFilenameId_On_PSM_Filter_UserSelection_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/js/scanFilenameId_On_PSM_Filter_UserSelection_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/js/scan_RetentionTime_MZ_UserSelections_StateObject";
import {Scan_RetentionTime_MZ_UserSelections_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/scan_retention_time_precursor_m_z_selection/jsx/scan_RetentionTime_MZ_UserSelections_Component";
import {ScanFilenameId_On_PSM_Filter_UserSelection_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/scan_file_name_on_psms_selection/jsx/scanFilenameId_On_PSM_Filter_UserSelection_Component";
import {PeptidePage_Display_MainContent_Component__LoadData_FromServer_Class} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component__LoadData_FromServer_Class";
import {dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data_LoadData";
import {DataPage_common_Data_Holder_Holder_SearchScanFileData_Root} from "page_js/data_pages/data_pages_common/search_scan_file_data__scan_file_data/dataPage_common_Data_Holder_SearchScanFileData_Data";


////


/////////////////////////

//  Constants

//////////////////////////////////


/**
 * 
 */
export class PeptidePage_Display_MainContent_Component_Props_Prop {

    projectSearchIds : Array<number>;
    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing;

    centralPageStateManager: CentralPageStateManager
    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    peptidePageRoot_CentralStateManagerObjectClass: PeptidePageRoot_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;

    generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;
    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject;
    scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
    scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject

    singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 * 
 */
export interface PeptidePage_Display_MainContent_Component_Props {

    propsValue : PeptidePage_Display_MainContent_Component_Props_Prop
}

/**
 * 
 */
interface PeptidePage_Display_MainContent_Component_State {

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    mainDisplayData_Loaded? : boolean;

    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds? : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder
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
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object? : object;
    peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject? : object;
    scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject? : object
    scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject? : object;

    peptideFiltersDisplay_ComponentData? : PeptideFiltersDisplay_ComponentData;

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
export class PeptidePage_Display_MainContent_Component extends React.Component< PeptidePage_Display_MainContent_Component_Props, PeptidePage_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _searchSubGroup_SelectionsChanged_Callback_BindThis = this._searchSubGroup_SelectionsChanged_Callback.bind(this);
    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

    private _proteinName_Clicked_Callback_Function_BindThis = this._proteinName_Clicked_Callback_Function.bind(this);

    private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    private _downloadPsms_Shown_ClickHandler_BindThis = this._downloadPsms_Shown_ClickHandler.bind(this);

    private _NOT_CALLED_Function() {

        //  Test function cast

        const modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback;

        //  Required when showProteins is true.  For Peptide Page
        const proteinName_Clicked_Callback_Function : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function = this._proteinName_Clicked_Callback_Function;


        const downloadPeptides_Shown_ClickHandler_CastTest : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback = this._downloadPeptides_Shown_ClickHandler;
        const downloadPsms_All_ClickHandler_CastTest : ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback = this._downloadPsms_Shown_ClickHandler;
    }

    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis : () => void = this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject.bind(this);
    private _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis = this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback.bind(this);


    private _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback.bind(this);

    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback.bind(this);
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback.bind(this);

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _proteinPage_Display__SingleProtein_Root: ProteinPage_Display__SingleProtein_Root;

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

    private _peptidePage_Display_MainContent_Component__LoadData_FromServer_Class = new PeptidePage_Display_MainContent_Component__LoadData_FromServer_Class();

    //  Flags Set to true/false in constructor

    private _allSearches_Have_ScanFilenames: boolean
    private _allSearches_Have_ScanData: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ: boolean
    private _allSearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    private _anySearches_Have_ScanFilenames: boolean
    private _anySearches_Have_PSM_RetentionTime_Precursor_MZ_OR_ScanData: boolean

    //  Flags Set to true/false in various places

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress
    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress
    private _load_ProteinCoverage_InProgress = false;  //  Flag that Loading Protein Coverage is In Progress

    /**
     * 
     */    
    constructor(props : PeptidePage_Display_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject: props.propsValue.reporterIonMass_UserSelections_StateObject
            })

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root =
            props.propsValue.searchDetailsBlockDataMgmtProcessing.getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds();


        const searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue({
            propsValue : props.propsValue
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

        this.state = {
            searchDataLookupParamsRoot,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
            saveView_Component_React,
            saveView_Component_Props_Prop,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
            proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {},
            scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject: {},
            scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject: {}
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
     *  Run on Page Load.  call from componentDidMount
     */
    private _runOnPageLoad() {

        if (this.props.propsValue.singleProtein_CentralStateManagerObject) {
            //  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

            const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

            if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
                //  Have proteinSequenceVersionId_FromURL so going to display Single Protein Overlay

                _copy_searchSubGroup_CentralStateManagerObjectClass__to__singleProtein_CentralStateManagerObject_searchSubGroup_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
                    searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject
                });

                _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject
                });

                //  Hide Main Div inside of header/footer
                const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
                if (!data_page_overall_enclosing_block_divDOM) {
                    const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
                    console.warn(msg);
                    throw Error(msg);
                }
                data_page_overall_enclosing_block_divDOM.style.display = "none";

                if (!this._proteinPage_Display__SingleProtein_Root) {
                    this._instantiateObject_Class__ProteinPage_Display__SingleProtein({currentWindowScrollY: undefined});
                }
                this._proteinPage_Display__SingleProtein_Root.openOverlay_OnlyLoadingMessage();
            }
        }
        this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails({ initialPageLoad } : { initialPageLoad : boolean }) {

        //  New variable to populate and put in state
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        const promises : Array<Promise<unknown>> = [];

        {
            const promise = peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein({
                projectSearchIds : this.props.propsValue.projectSearchIds,
                dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
                searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,  //  Updated in this function
                loadedDataCommonHolder  //  Updated in this function
            });

            promises.push(promise);
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

            promises.push(promise_ToAdd);
        }

        const promisesAll = Promise.all( promises );

        promisesAll.catch( (reason) => {
            console.warn("promisesAll.catch  reason: " + reason )
            throw Error("promisesAll.catch  reason: " + reason )
        })

        promisesAll.then( (promiseResult) => {
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

                //  Load More

                const promises_Load_ : Array<Promise<unknown>> = [];
                const modificationMass_UserSelections_StateObject = this.props.propsValue.modificationMass_UserSelections_StateObject;
                const generatedPeptideContents_UserSelections_StateObject = this.props.propsValue.generatedPeptideContents_UserSelections_StateObject;

                if ((modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
                    && modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected())
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected()) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                        searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                        projectSearchIds: this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot
                    });
                    if (promise) {
                        promises_Load_.push(promise);
                    }
                }
                if (this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected()) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                        searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                        projectSearchIds: this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot
                    });
                    if (promise) {
                        promises_Load_.push(promise);
                    }
                }

                if ( ! this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) {

                    const { load_Already_InProgress, promise } =
                        this._peptidePage_Display_MainContent_Component__LoadData_FromServer_Class.loadData_For_scanFilenameId_On_PSM_Filter_UserSelection({
                            projectSearchIds: this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot
                        });
                    if (promise) {
                        promises_Load_.push(promise);
                    }
                }

                if ( this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.is_Any_FilterHaveValue() ) {

                    const { load_Already_InProgress, promise } =
                        this._peptidePage_Display_MainContent_Component__LoadData_FromServer_Class.loadData_For_scan_RetentionTime_MZ_UserSelection({
                            projectSearchIds: this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot
                        });
                    if (promise) {
                        promises_Load_.push(promise);
                    }
                }

                if (this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections()) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                        projectSearchIds: this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                    });
                    if (promise) {
                        promises_Load_.push(promise);
                    }
                }

                if ( promises_Load_.length === 0 ) {
                    this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                        initialPageLoad,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder,
                        dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                    });
                } else {
                    const promiseAll = Promise.all( promises_Load_ );
                    promiseAll.catch( (reason) => {
                        throw Error( "load_OpenModificationMasses_IfNeeded or load_ReporterIonMasses_IfNeeded failed in _recompute_FullPage_Except_SearchDetails ") ;
                    })
                    promiseAll.then( (result) => {
                        try {
                            this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                                initialPageLoad,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder,
                                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                            });
                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    })
                }

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
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        } : {
            initialPageLoad : boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        }
    ) : void {

        const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

        if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
            //  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
            this._singleProteinRowShowSingleProteinOverlay({
                proteinSequenceVersionId: proteinSequenceVersionId_FromURL,
                loadedDataCommonHolder,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
            });

            //  Delay render Peptide List since currently hidden.  Probably could skip render until close Single Protein Overlay
            window.setTimeout(() => {

                this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
                    initialPageLoad,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    loadedDataCommonHolder,
                    dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                });
            }, 2000);

        } else {

            //  render Peptide List immediately

            this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
                initialPageLoad,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder,
                dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
            });
        }
    }

    /**
     *
     * @param initialPageLoad
     * @param proteinPositionFilter_UserSelections_StateObject
     * @param loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
     * @param loadedDataCommonHolder
     * @private
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_Main(
        {
            initialPageLoad,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        } : {
            initialPageLoad : boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        }
    ) : void {

        if ( initialPageLoad ) {  // Always true currently but will keep

            //  remove from selection state objects values that are not in the loaded data. (Values that have been for: searches removed, or for values that don't meet new filter cutoffs)

            PeptidePage_Display_MainContent_Component_nonClass_Functions.purge_Selections_OfValues_NotInCurrentLoadedData({
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                proteinPositionFilter_UserSelections_StateObject: this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
            });
        }

        const {
            searchSubGroup_Ids_Selected,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue,
            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
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
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        }  = PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_FullPage_Except_SearchDetails({

            propsValue : this.props.propsValue,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
        });

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
            scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            proteinSequenceWidget_StateObject : undefined,  //  NOT USED on Peptide Page
            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue
        };

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData__SingleProtein({

            forPeptidePage: true,

            psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

            searchSubGroup_Ids_Selected,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            proteinSequenceVersionId : undefined,  //  NOT USED on Peptide Page
            projectSearchIds : this.props.propsValue.projectSearchIds,
            conditionGroupsContainer: undefined,     // Only populated for experiment Page
            conditionGroupsDataContainer: undefined, // Only populated for experiment Page
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } );

        const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds__FINAL : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = create_GeneratedReportedPeptideListData_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

        this.setState({
            mainDisplayData_Loaded : true,

            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,

            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue,

            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideFiltersDisplay_ComponentData,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds__FINAL,

            create_GeneratedReportedPeptideListData_Result,
        });
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

        this.setState({ searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected });
    }

    /**
     *
     */
    private _proteinName_Clicked_Callback_Function( params : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function_Params ) {

        const proteinSequenceVersionId = params.proteinSequenceVersionId;

        if (params.ctrlKey_From_ClickEvent || params.metaKey_From_ClickEvent) {

            // User held CTRL key or Meta key (Mac Command key) when clicking on protein name so open in new window

            this._singleProteinRowShowSingleProteinNewWindow({proteinSequenceVersionId});

            return; // EARLY RETURN
        }

        //  Push current state on to Browser History before update for Single Protein

        window.history.pushState( {}, "" );

        this.props.propsValue.singleProtein_CentralStateManagerObject.setProteinSequenceVersionId({proteinSequenceVersionId});

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

            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,  //  NOT Copied Yet

            generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,

            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject  //  Copy To
        });

        this._singleProteinRowShowSingleProteinOverlay({
            proteinSequenceVersionId,
            loadedDataCommonHolder: this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        });
    }

    /**
     *
     */
    private _singleProteinRowShowSingleProteinNewWindow({proteinSequenceVersionId}: {proteinSequenceVersionId: number}) {

        //  Create URL for new Window about to open

        //  Create to override the value of proteinSequenceVersionId from the URL
        const singleProtein_CentralStateManagerObjectClass_ForNewWindow = new SingleProtein_CentralStateManagerObjectClass({
            initialProteinSequenceVersionId: proteinSequenceVersionId,
            centralPageStateManager: undefined
        });

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

            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,  //  NOT Copied Yet

            generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,

            singleProtein_CentralStateManagerObject : singleProtein_CentralStateManagerObjectClass_ForNewWindow  //  Copy To
        });

        const newWindowURL = this.props.propsValue.centralPageStateManager.getURL_ForCurrentState({componentOverridesAdditions: [singleProtein_CentralStateManagerObjectClass_ForNewWindow]})

        // MUST open window before make AJAX Call.  This is a Browser Security requirement
        //  window.open(...): Must run in code directly triggered by click event

        const newWindow = window.open(newWindowURL, "_blank");
    }

    /**
     *
     */
    private _singleProteinRowShowSingleProteinOverlay(
        {
            proteinSequenceVersionId,

            //  Pass to here since not in state yet for show Single Protein overlay on Page load
            loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root

        }: {
            proteinSequenceVersionId: number

            //  Pass to here since not in state yet for show Single Protein overlay on Page load
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: DataPage_common_Data_Holder_Holder_SearchScanFileData_Root

        }) : void {

        // const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get(proteinSequenceVersionId);
        // if (proteinNameDescription === undefined) {
        //     return "Description Not Found";
        // }
        //
        // const proteinNameDescriptionParam = {name: proteinNameDescription.name, description: proteinNameDescription.description};

        this.props.propsValue.singleProtein_CentralStateManagerObject.setProteinSequenceVersionId({ proteinSequenceVersionId });

        _copy_searchSubGroup_CentralStateManagerObjectClass__to__singleProtein_CentralStateManagerObject_searchSubGroup_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            searchSubGroup_CentralStateManagerObjectClass : this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject
        });
        _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            singleProtein_CentralStateManagerObject : this.props.propsValue.singleProtein_CentralStateManagerObject
        });

        //  Current Window Scroll position
        const currentWindowScrollY = window.scrollY;

        //  Hide Main Div inside of header/footer
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();

        if (!this._proteinPage_Display__SingleProtein_Root) {
            this._instantiateObject_Class__ProteinPage_Display__SingleProtein({currentWindowScrollY});
        }

        this._proteinPage_Display__SingleProtein_Root.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription: null, // Let Single Protein compute it

            //  Pass Here since for sure populated by here
            loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
        });
    }

    /**
     * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
     */
    private _instantiateObject_Class__ProteinPage_Display__SingleProtein({currentWindowScrollY}: {currentWindowScrollY: number}) {

        //  Create callback function to call on single protein close

        const singleProteinCloseCallback : ProteinPage_Display__SingleProtein_singleProteinCloseCallback = () : void => {

            this._singleProteinCloseCallback_CalledFromInlineFunction({ currentWindowScrollY });
        }

        this._proteinPage_Display__SingleProtein_Root = new ProteinPage_Display__SingleProtein_Root({

            forPeptidePage: true,

            singleProteinCloseCallback,

            loadedDataCommonHolder: this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,

            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay: this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing: this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            projectSearchIds: this.props.propsValue.projectSearchIds,
            searchDataLookupParamsRoot: this.props.propsValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay.get_searchDetailsCriteriaData(),
            singleProtein_CentralStateManagerObject: this.props.propsValue.singleProtein_CentralStateManagerObject,
            dataPages_LoggedInUser_CommonObjectsFactory: this.props.propsValue.dataPages_LoggedInUser_CommonObjectsFactory
        });
    }

    /**
     *
     */
    private _singleProteinCloseCallback_CalledFromInlineFunction({ currentWindowScrollY } : { currentWindowScrollY : number }) : void {

        //  Show Main Div inside of header/footer
        const data_page_overall_enclosing_block_divDOM = document.getElementById("data_page_overall_enclosing_block_div");
        if (!data_page_overall_enclosing_block_divDOM) {
            const msg = "No element on DOM with id 'data_page_overall_enclosing_block_div'";
            console.warn(msg);
            throw Error(msg);
        }
        data_page_overall_enclosing_block_divDOM.style.display = "";

        this._proteinPage_Display__SingleProtein_Root = undefined;

        if (currentWindowScrollY ) {

            //  Scroll window down to original position when protein was clicked to open Single Protein view

            window.scrollTo({top: currentWindowScrollY});
        }
    }

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler() : void {

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = this.state.create_GeneratedReportedPeptideListData_Result;

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

        const getDataTableDataObjects_Result : GetDataTableDataObjects_MultipleSearch_SingleProtein_Result = createReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein({ //  External Function

            create_GeneratedReportedPeptideListData_Result : create_GeneratedReportedPeptideListData_Result,

            searchSubGroup_Ids_Selected : searchSubGroup_Ids_Selected,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList,   //  ONLY Passed in ReportedPeptidesForSingleSearch_createChildTableObjects_Parameter constructor
            projectSearchIds : this.props.propsValue.projectSearchIds,
            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder : this.state.loadedDataCommonHolder,
            dataPageStateManager : this.props.propsValue.dataPageStateManager,
            showProteins : true,
            proteinName_Clicked_Callback_Function : null
        });

        const dataTable_RootTableObject : DataTable_RootTableObject = getDataTableDataObjects_Result.dataTable_RootTableObject;

        const tableDataObject = dataTable_RootTableObject.tableDataObject;

        //  Array of Arrays of reportLineParts
        const reportLineParts_AllLines : Array<Array<string>> = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join

        //  reportLineParts will be joined with separator '\t'

        //  Header Line
        {

            const reportLineParts : Array<string> = [];
            let index = 0;

            for ( const column of tableDataObject.columns ) {

                reportLineParts.push( column.displayName );

                index++;
            }

            reportLineParts_AllLines.push( reportLineParts );
        }

        //  Data Lines - One line per peptideSequenceDisplay / Search Id

        for ( const dataTable_DataRowEntry of tableDataObject.dataTable_DataRowEntries ) {

            const reportLineParts : Array<string> = [];
            let index = 0;

            for ( const columnEntry of dataTable_DataRowEntry.columnEntries ) {

                let cellContentsString = columnEntry.valueDisplay;
                if ( columnEntry.valueSort !== undefined && columnEntry.valueSort !== null ) {
                    cellContentsString = columnEntry.valueSort.toString();
                }
                if ( index === 1 && ( columnEntry.valueDisplay === "*" || columnEntry.valueDisplay === "" ) ) { // Unique column
                    cellContentsString = columnEntry.valueDisplay;
                }

                reportLineParts.push( cellContentsString );

                index++;
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

        //  Join all Lines into single string, delimit on '\n'.  Last line will get '\n' at end since extra line added with empty string "".

        const reportLinesSingleString = reportLine_AllLines.join( '\n' );

        StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportLinesSingleString, filename: 'peptides.txt' });
    }

	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */   
    _downloadPsms_Shown_ClickHandler() : void {
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
                    "_downloadPsms_Shown_ClickHandler: No reportedPeptideIds for any projectSearchIds for projectSearchIds: " + this.props.propsValue.projectSearchIds.join(",")
                );
            }
            
            this._downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } );

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
	}
	
	/**
	 * Download PSMs.
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } : {

        projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry>
    } ) {
        downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
            experimentId : undefined,
			projectSearchIdsReportedPeptideIdsPsmIds,
			searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot,
			proteinSequenceVersionIds : undefined  //  Peptide page
		} );
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

            this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.clearSelections();

            this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.clearAll();

            this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.clearAll();

            this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.clearAll();

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

                            this._update__peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject();

                            this._update__scanFilenameId_On_PSM_Filter_UserSelection_Object_Force_ResetToStateObject();

                            this._update__scan_RetentionTime_MZ_UserSelections_Object_Force_ResetToStateObject();

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

            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                && this._load_PsmOpenModificationMasses_InProgress ) {

                //  Already loading PSM Open Modification Masses so exit.
                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                return; // EARLY RETURN
            }

            let getSearchSubGroupIds = false;
            if ( this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
                getSearchSubGroupIds = true;
            }

            let promise = load_PsmOpenModificationMasses_IfNeeded({
                getSearchSubGroupIds,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
            });

            if ( promise ) {
                this._load_PsmOpenModificationMasses_InProgress = true;

                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                //  Show Loading Message

                let modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;
                {
                    const overlayComponent = get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage({});

                    modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay =
                        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
                }

                promise.catch( (reason) => {
                    try {
                        this._load_PsmOpenModificationMasses_InProgress = false;

                        //  Remove Loading Message
                        modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay.removeContents_AndContainer_FromDOM();

                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promise.then( (result) => {
                    try {
                        this._load_PsmOpenModificationMasses_InProgress = false;

                        //  Remove Loading Message
                        modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage_Overlay.removeContents_AndContainer_FromDOM();

                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                        //  Now open the overlay

                        this._openModificationMass_OpenUserSelections_Overlay_ActualOpenOverlay()

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                return;  // EARLY RETURN
            }

            //  No Promise so run immediately

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
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
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

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    window.setTimeout( () => {
                        try {

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                                && this._load_PsmOpenModificationMasses_InProgress ) {

                                //  Already loading PSM Open Modification Masses so exit.
                                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                                return; // EARLY RETURN
                            }

                            let promise = undefined;

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {

                                promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                                    searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                                });
                            }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise.then( (result) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                                        //  Now update dependent page parts

                                        this._updateRestOfPage_ForUserInteraction();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                return;  // EARLY RETURN
                            }

                            //  No Promise so run immediately

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

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    window.setTimeout( () => {
                        try {
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                                && this._load_PsmOpenModificationMasses_InProgress ) {

                                //  Already loading PSM Open Modification Masses so exit.
                                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                                return; // EARLY RETURN
                            }

                            let promise = undefined;

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {

                                promise = load_PsmOpenModificationMasses_IfNeeded({
                                    getSearchSubGroupIds : undefined,
                                    proteinSequenceVersionId : null, // TODO
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                                });
                            }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise.then( (result) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                                        //  Now update dependent page parts

                                        this._updateRestOfPage_ForUserInteraction();

                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                return;  // EARLY RETURN
                            }

                            //  No Promise so run immediately

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
    _modificationMass_Update_modificationMass_UserSelections_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData =
            PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState({ modificationMass_UserSelections_ComponentData });
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback() : void {
        try {
            if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                //  State NOT SET yet so skip this update
                return; // EARLY RETURN
            }

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
    _modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });
    }


    /**
     * Change to reporter ion selection
     */ 
    _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    if ( this._load_ReporterIonMasses_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {
                
                        promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                            searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_ReporterIonMasses_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState({ gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true });

                        promise.catch( (reason) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false });

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false });

                                //  Now update dependent page parts
                
                                this._updateRestOfPage_ForUserInteraction();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        return;  // EARLY RETURN
                    }

                    //  No Promise so run immediately

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
    _reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });

        this.setState({ reporterIons_UserSelections_ComponentData });
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideUniqueChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

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

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData = peptideUnique_UserSelection_BuildData_ForReactComponent({
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject
        });

        this.setState({ peptideUnique_UserSelection_ComponentData });
    }

    /**
     * Change to peptide string selection, this.props.propsValue.peptideSequence_UserSelections_StateObject
     */ 
    _updateMadeTo_peptideSequence_UserSelections_StateObject() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

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
     * create new this.state.peptideSequence_UserSelections_ComponentData
     */ 
    _peptideSequence_Update_peptideSequence_UserSelections_ComponentData() {

        if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
            //  State NOT SET yet so skip this update
            return; // EARLY RETURN
        }

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState({ peptideSequence_UserSelections_ComponentData });
    }

    /**
     * Change to Protein Position Filter Selections, this.props.propsValue.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback
     */
    _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedProteinPositionFilterChange_UpdateURL();  //  Update URL

                    if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                        //  State NOT SET yet so skip this update
                        return; // EARLY RETURN
                    }

                    this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object();

                    if ( this._load_ProteinCoverage_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                        promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                        });
                    }
                    if ( promise ) {
                        this._load_ProteinCoverage_InProgress = true;

                        this.setState({ gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true });

                        promise.catch( (reason) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false });

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false });

                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        return;  // EARLY RETURN
                    }

                    //  No Promise so run immediately

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
     * create new this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object
     */
    _proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object() {

        this.setState( { proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {} } );
    }

    /**
     * create new this.state.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject
     */
    private _update__peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject() {

        this.setState( { peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject: {} } );
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


    /////
    /**
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {
        try {
            if ( ! this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds ) {
                //  State NOT SET yet so skip this update
                return; // EARLY RETURN
            }

            window.setTimeout( () => {
                try {
                    if ( ( this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                        || this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() )
                        && this._load_PsmOpenModificationMasses_InProgress ) {

                        //  Already loading PSM Open Modification Masses so exit.
                        //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                        || this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                        promise = load_PsmOpenModificationMasses_IfNeeded({
                            getSearchSubGroupIds : undefined,
                            proteinSequenceVersionId : null,
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_PsmOpenModificationMasses_InProgress = true;

                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                        promise.catch( (reason) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                                //  Now update dependent page parts

                                this._updateRestOfPage_ForUserInteraction();

                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        return;  // EARLY RETURN
                    }

                    //  No Promise so run immediately

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
     *
     */
    private _updateMadeTo_scanFilenameId_On_PSM_Filter_UserSelection_StateObject_Callback() {

        if ( ! this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject.areAllSelected__scanFilenameIds() ) {

            const  { load_Already_InProgress, promise }  =
                this._peptidePage_Display_MainContent_Component__LoadData_FromServer_Class.loadData_For_scanFilenameId_On_PSM_Filter_UserSelection({
                    projectSearchIds: this.props.propsValue.projectSearchIds,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot
                });

            if ( load_Already_InProgress ) {
                // Already loading
                return;
            }

            if (promise) {
                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                promise.catch( (reason) => {
                    try {
                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promise.then( result => {
                    try {
                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                        //  Now update dependent page parts

                        this._updateRestOfPage_ForUserInteraction();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } else {

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
        } else {

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
    }

    /**
     *
     */
    private _updateMadeTo_Scan_RetentionTime_MZ_UserSelections_StateObject_Callback() {

        if ( this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject.is_Any_FilterHaveValue() ) {

            const  { load_Already_InProgress, promise }  =
                this._peptidePage_Display_MainContent_Component__LoadData_FromServer_Class.loadData_For_scan_RetentionTime_MZ_UserSelection({
                    projectSearchIds: this.props.propsValue.projectSearchIds,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    searchDataLookupParamsRoot: this.state.searchDataLookupParamsRoot
                });

            if ( load_Already_InProgress ) {
                // Already loading
                return;
            }

            if (promise) {

                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                promise.catch( (reason) => {
                    try {
                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });
                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });

                promise.then( result => {
                    try {
                        this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false });

                        //  Now update dependent page parts

                        this._updateRestOfPage_ForUserInteraction();

                    } catch( e ) {
                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                        throw e;
                    }
                });
            } else {

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
        } else {

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
                            const searchSubGroup_Ids_Selected : Set<number> = PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Ids_Selected({ propsValue : this.props.propsValue });

                            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                                not_filtered_position_modification_selections : false,
                                proteinSequenceVersionId : null,
                                projectSearchIds : this.props.propsValue.projectSearchIds,
                                searchSubGroup_Ids_Selected,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                                proteinSequenceWidget_StateObject : undefined,
                                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
                                scan_RetentionTime_MZ_UserSelection_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
                                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : null,
                                proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
                            });

                            let create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = undefined;

                            {
                                const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                                create_GeneratedReportedPeptideListData_Result = create_GeneratedReportedPeptideListData__SingleProtein({

                                    forPeptidePage: true,

                                    psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

                                    searchSubGroup_Ids_Selected,
                                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                    generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
                                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                    proteinSequenceVersionId : null,
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    conditionGroupsContainer: undefined,     // Only populated for experiment Page
                                    conditionGroupsDataContainer: undefined, // Only populated for experiment Page
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                                } );
                            }

                            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = create_GeneratedReportedPeptideListData_Result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

                            window.setTimeout( () => {
                                try {
                                    // Display Updating message then display new data

                                    this.setState({ updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : true });

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

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            dataPage_common_Data_Holder_Holder_SearchScanFileData_Root: this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root,
            scanFilenameId_On_PSM_Filter_UserSelection_StateObject : this.props.propsValue.scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
            scan_RetentionTime_MZ_UserSelections_StateObject : this.props.propsValue.scan_RetentionTime_MZ_UserSelection_StateObject,
            proteinSequenceWidget_StateObject : undefined,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : this.state.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue : this.state.searchSubGroup_PropValue
        };

        this.setState({ peptideFiltersDisplay_ComponentData });
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

            filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section = this._render_filterOn_AND_generatedPeptideContents_UserSelections_Root_Component_Section({  })
        }

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

        return (
            <React.Fragment>

                    {/* Apply a width to this <div> so that the boxes on right stay within viewport when main overlay is widened to exceed viewport.
                        Need to take into account padding in class="view-single-protein-overlay-body" which is currently 20px or read that from DOM element */}

                    {/* Fake 'width' so that grid width not auto fill to width 100%.  Grid will exceed the 80px width to fill the width of the 2 columns.
                            This keeps boxes on right in viewport when main overlay width > viewport width. */}

                        {/*style={ { display: "grid", gridTemplateColumns: "auto min-content", width: 80 } }*/}
                <div ref={ this._div_MainGridAtTop_Ref } >
                
                    {/* display of data above Reported Peptides  */}

                    <div ref={ this._div_MainContent_LeftGridEntry_AtTop_Ref } >
                    
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

                    </div>  {/* END: Main Content above Reported Peptides  */}

                </div>  {/* Close display of data above Reported Peptides */}

                {/* Display of Reported Peptides  */}

                { ( ! this.state.create_GeneratedReportedPeptideListData_Result ) ? (

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

                        <div style={ { display: "inline-block" } }  //  display: "inline-block" so can measure width of this div, including width of Peptide table and sub-tables
                            ref={ this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}

                            <ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component

                                showProteins={ true }

                                proteinName_Clicked_Callback_Function={ this._proteinName_Clicked_Callback_Function_BindThis }

                                showUpdatingMessage={ this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                                showGettingDataMessage={ this.state.gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }

                                create_GeneratedReportedPeptideListData_Result={ this.state.create_GeneratedReportedPeptideListData_Result }

                                searchSubGroup_Ids_Selected={ searchSubGroup_Ids_Selected }

                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds={ this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                                proteinSequenceVersionId={ null }
                                projectSearchIds={ this.props.propsValue.projectSearchIds }
                                searchDataLookupParamsRoot={ this.state.searchDataLookupParamsRoot }
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                                loadedDataCommonHolder={ this.state.loadedDataCommonHolder }
                                dataPageStateManager={ this.props.propsValue.dataPageStateManager }

                                downloadPeptides_Shown_ClickHandler={ this._downloadPeptides_Shown_ClickHandler_BindThis }
                                downloadPsms_Shown_ClickHandler={ this._downloadPsms_Shown_ClickHandler_BindThis }

                            />
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

        } : {

        }
    ) : JSX.Element{

        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

        let searchContains_VariableModifications = false;
        let searchContains_OpenModifications = false;
        let searchContains_StaticModifications = false;

        for ( const projectSearchId of this.props.propsValue.projectSearchIds ) {

            const loadedDataPerProjectSearchIdHolder = this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.get( projectSearchId );
            if ( ! loadedDataPerProjectSearchIdHolder ) {
                throw new Error("No value in this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds for projectSearchId: " + projectSearchId );
            }
            if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_HasDynamicModifications()
                && loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_HasDynamicModifications().size > 0
            ) {
                searchContains_VariableModifications = true;
            }
            if ( loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId()
                && loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId().size > 0
            ) {
                searchContains_OpenModifications = true;
            }
            if ( loadedDataPerProjectSearchIdHolder.get_staticMods()
                && loadedDataPerProjectSearchIdHolder.get_staticMods().length > 0
            ) {
                searchContains_StaticModifications = true;
            }
        }

        return (

            <React.Fragment>

                <div>

                    <div className=" filter-common-block-selection-container-block no-section-labels ">

                        {/* Display of User Selected filtering on  */}

                        <PeptideFiltersDisplay
                            peptideFiltersDisplay_ComponentData={ this.state.peptideFiltersDisplay_ComponentData }
                            clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                        />

                        {/* Filter On ... */}

                        <PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component
                            peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject={ this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject }
                            peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject={ this.state.peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject }
                            updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback={
                                this._updateMadeTo_peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject_Callback_BindThis
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
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                            modificationMass_CommonRounding_ReturnNumber={ modificationMass_CommonRounding_ReturnNumber_Param } // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
                            updateMadeTo_modificationMass_UserSelections_StateObject_Callback={ this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis } // this.props.propsValue.modificationMass_UserSelections_StateObject has been updated.
                            update_modificationMass_UserSelections_ComponentData_Callback={ this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis } // create new this.state.modificationMass_UserSelections_ComponentData
                        />

                        <ReporterIonMass_UserSelections
                            reporterIons_UserSelections_ComponentData={ this.state.reporterIons_UserSelections_ComponentData }
                            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class }
                            reporterIonMass_UserSelections_StateObject={ this.props.propsValue.reporterIonMass_UserSelections_StateObject }
                            updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback={ this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis }
                        />

                        { (
                            this._anySearches_Have_ScanFilenames
                            && ( ! ( this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root
                                && this.state.dataPage_common_Data_Holder_Holder_SearchScanFileData_Root.get_total_SearchScanFileCount() == 1 ) )
                            && this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
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

                        <ProteinPositionFilter_UserSelections
                            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data={ this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data }
                            proteinPositionFilter_UserSelections_Component_Force_ReRender_Object={ this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object }
                            proteinPositionFilter_UserSelections_StateObject={ this.props.propsValue.proteinPositionFilter_UserSelections_StateObject }
                            updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback={ this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Callback_BindThis }
                        />

                        <GeneratedPeptideContents_UserSelections_Root_Component
                            generatedPeptideContents_UserSelections_StateObject={ this.props.propsValue.generatedPeptideContents_UserSelections_StateObject }
                            searchContains_VariableModifications={ searchContains_VariableModifications }
                            searchContains_OpenModifications={ searchContains_OpenModifications }
                            searchContains_StaticModifications={ searchContains_StaticModifications }
                            updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback={ this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis  }
                        />

                    </div>

                </div>

            </React.Fragment>
        )
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
 * @param peptideUnique_UserSelection_StateObject
 * @param peptideSequence_UserSelections_StateObject
 * @param proteinPositionFilter_UserSelections_StateObject - NOT Copied Yet
 * @param generatedPeptideContents_UserSelections_StateObject
 * @param singleProtein_CentralStateManagerObject
 * @private
 */
const _copy_Page_StateObjectData_To_SingleSearch_StateObjectData__OthersThan__OpenModMassZeroNotOpenMod_UserSelection__searchSubGroup = function (
    {
        peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
        modificationMass_UserSelections_StateObject,
        reporterIonMass_UserSelections_StateObject,

        scanFilenameId_On_PSM_Filter_UserSelection_StateObject,
        scan_RetentionTime_MZ_UserSelection_StateObject,

        peptideUnique_UserSelection_StateObject,
        peptideSequence_UserSelections_StateObject,
        proteinPositionFilter_UserSelections_StateObject,  //  NOT Copied Yet

        generatedPeptideContents_UserSelections_StateObject,

        singleProtein_CentralStateManagerObject
    } : {
        peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject
        modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
        reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
        scanFilenameId_On_PSM_Filter_UserSelection_StateObject : ScanFilenameId_On_PSM_Filter_UserSelection_StateObject
        scan_RetentionTime_MZ_UserSelection_StateObject : Scan_RetentionTime_MZ_UserSelections_StateObject

        peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
        peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
        proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;

        generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject;

        singleProtein_CentralStateManagerObject : SingleProtein_CentralStateManagerObjectClass

    }) : void {

    {
        const peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData = peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.set_peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData({peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_Selection_EncodedStateData});
    }
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
        const peptideUniqueFilterSelectedEncodedStateData = peptideUnique_UserSelection_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.setPeptideUniqueFilterSelectedEncodedStateData({peptideUniqueFilterSelectedEncodedStateData})
    }
    {
        const peptideSequenceFilterSelectedEncodedStateData = peptideSequence_UserSelections_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.setPeptideSequenceFilterSelectedEncodedStateData({peptideSequenceFilterSelectedEncodedStateData});
    }
    {
        const generatedPeptideContents_UserSelections__EncodedStateData = generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
        singleProtein_CentralStateManagerObject.setGeneratedPeptideContents_UserSelections__EncodedStateData({generatedPeptideContents_UserSelections__EncodedStateData});
    }
}
