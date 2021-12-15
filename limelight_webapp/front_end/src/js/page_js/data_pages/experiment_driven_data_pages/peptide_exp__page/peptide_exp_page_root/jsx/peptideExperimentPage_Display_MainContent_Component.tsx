/**
 * peptideExperimentPage_Display_MainContent_Component.tsx
 * 
 * Peptide Experiment Page Main Content:
 * 
 * Main Content of Peptide Page
 *
 * 
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile';

//   From data_pages_common
import {DataPageStateManager, SearchNames_AsMap} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { SaveView_Create_Component_React_Type, SaveView_Create_Component_React_Result } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import { SharePage_Component } from 'page_js/data_pages/sharePage_React/sharePage_Component_React';

//   Modification Mass Rounding to provide some level of commonality between searches
import {
    modificationMass_CommonRounding_ReturnNumber
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { ModificationMass_UserSelections_Root } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root';

import { ReporterIonMass_UserSelections } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections';

import { PeptideSequence_UserSelections } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections';

import { PeptideFiltersDisplay_ComponentData } from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'


import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds
} from 'page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'



////

import { peptideExperimentPage_Display_MainContent_Component_nonClass_Functions } from '../js/peptideExperimentPage_Display_MainContent_Component_nonClass_Functions';

import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {GeneratedPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/generated_peptide_contents__user_controls/jsx/generatedPeptideContents_UserSelections_Root_Component";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
import {PeptideUnique_UserSelection} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/jsx/proteinPositionFilter_UserSelections_Component";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__peptide_page__components/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {PeptideExperimentPageRoot_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPageRoot_CentralStateManagerObjectClass";
import {peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein} from "page_js/data_pages/experiment_driven_data_pages/peptide_exp__page/peptide_exp_page_root/js/peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein";
import {
    Experiment_SingleExperiment_ConditionsGraphicRepresentation,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params,
    ExperimentConditions_GraphicRepresentation_PropsData
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation";
import {Experiment_ConditionGroupsContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {
    ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback,
    ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback,
    ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component";
import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {mainCell_getHoverContents_StandAlone} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_SingleProtein_MainContent_Component_mainCell_getHoverContents_StandAlone";
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass";
import {Experiment_DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class";
import {
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class,
    ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback
} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_reporter_ion__user_selections__coordinator/js/modificationMass_ReporterIon__UserSelections__Coordinator_Class";
import {
    create_GeneratedReportedPeptideListData__SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function,
    CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function_Params
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Create_TableData";
import {SingleProtein_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {ProteinExperimentPage_Display_SingleProtein} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_Display_SingleProtein";
import {PeptideFiltersDisplay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/peptide_filters_display/jsx/peptideFiltersDisplay";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/js/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject";
import {PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on_counts_psm/jsx/peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Component";
import {peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString} from "page_js/data_pages/experiment_driven_data_pages/peptide__single_protein__shared__exp__page/js/peptide_And_SingleProtein_Experiment__CreateReportedPeptideDisplayDownloadDataAsString";
import {experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId";
import {
    DownloadPSMs_PerConditionGroupConditionData,
    DownloadPSMs_PerProjectSearchId_Entry, DownloadPSMs_PerReportedPeptideId,
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from "page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds";

/////////////////////////

//  Constants

//////////////////////////////////

/**
 * 
 */
export class PeptideExperimentPage_Display_MainContent_Component_Props_Prop {

    experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory;

    projectSearchIds : Array<number>;
    dataPageStateManager : DataPageStateManager
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager;
    searchDataLookupParamsRoot : SearchDataLookupParameters_Root;

    experimentId : number;
    experimentName : string;
    conditionGroupsContainer : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer;
    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap; // Map with key being project search id
    experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData

    centralPageStateManager: CentralPageStateManager

    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

    peptideExperimentPageRoot_CentralStateManagerObjectClass: PeptideExperimentPageRoot_CentralStateManagerObjectClass
    singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
    reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;
    peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : PeptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject

    generatedPeptideContents_UserSelections_StateObject : GeneratedPeptideContents_UserSelections_StateObject
}

/**
 * 
 */
export interface PeptideExperimentPage_Display_MainContent_Component_Props {

    propsValue : PeptideExperimentPage_Display_MainContent_Component_Props_Prop
}

/**
 * 
 */
interface PeptideExperimentPage_Display_MainContent_Component_State {

    projectSearchIds_PossiblyFiltered? : Array<number>;

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    mainDisplayData_Loaded? : boolean;

    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds? : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder

    psmCountForUnfilteredDisplay? : string;

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object? : object;
    peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject? : object;

    peptideFiltersDisplay_ComponentData? : PeptideFiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds;  //  For displaying the peptide list in sub component

    create_GeneratedReportedPeptideListData_Result? : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

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
export class PeptideExperimentPage_Display_MainContent_Component extends React.Component< PeptideExperimentPage_Display_MainContent_Component_Props, PeptideExperimentPage_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _selectedConditionsChanged_Callback_BindThis = this._selectedConditionsChanged_Callback.bind(this);

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis = this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback.bind(this);

    private _proteinName_Clicked_Callback_Function_BindThis = this._proteinName_Clicked_Callback_Function.bind(this);

    private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    private _downloadPsms_Shown_ClickHandler_BindThis = this._downloadPsms_Shown_ClickHandler.bind(this);

    private _DO_NOT_CALL() { //  Test Cast of method
        const mainCell_getHoverContents: ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;

        const modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback : ModificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback;

        //  Required when showProteins is true.  For Peptide Page
        const proteinName_Clicked_Callback_Function : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function = this._proteinName_Clicked_Callback_Function;

        const downloadPeptides_Shown_ClickHandler : ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback = this._downloadPeptides_Shown_ClickHandler;
        const downloadPsms_Shown_ClickHandler : ProteinExperimentPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback = this._downloadPsms_Shown_ClickHandler;
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

    private _proteinExperimentPage_Display_SingleProtein: ProteinExperimentPage_Display_SingleProtein;

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress
    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress
    private _load_ProteinCoverage_InProgress = false;  //  Flag that Loading Protein Coverage is In Progress

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

    /**
     *
     */
    constructor(props : PeptideExperimentPage_Display_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();


        let projectSearchIds_PossiblyFiltered : Array<number> = props.propsValue.projectSearchIds;


        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root = props.propsValue.searchDataLookupParamsRoot;

        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : props.propsValue.experimentId });
                saveView_Component_React = result.saveView_Component_React
                saveView_Component_Props_Prop = result.saveView_Component_Props_Prop
            }
        }

        //  Set object used by Experiment_SingleExperiment_ConditionsGraphicRepresentation

        const graphicRepresentation_SelectedCells : ExperimentConditions_GraphicRepresentation_SelectedCells = (
            create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ // External Function

                //  Will be used for population of ExperimentConditions_GraphicRepresentation_SelectedCells
                // Will be Updated for changes in Selected Conditions
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : this.props.propsValue.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
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

        this._modificationMass_ReporterIon__UserSelections__Coordinator_Class =
            new ModificationMass_ReporterIon__UserSelections__Coordinator_Class({
                contents_Changed_Callback: this._modificationMass_ReporterIon__UserSelections__Coordinator_Class__Contents_Changed_Callback_BindThis,
                modificationMass_UserSelections_StateObject: props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject: props.propsValue.reporterIonMass_UserSelections_StateObject
            })

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        this.state = {
            projectSearchIds_PossiblyFiltered,
            graphicRepresentation_SelectedCells,
            searchDataLookupParamsRoot,
            saveView_Component_React,
            saveView_Component_Props_Prop,
            modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class,
            proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {}
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

        if (this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass) {
            //  If Have Single Protein to display in URL, Immediately hide the Main Display <div id="data_page_overall_enclosing_block_div" >

            const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.getProteinSequenceVersionId();

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

                if (!this._proteinExperimentPage_Display_SingleProtein) {
                    this._instantiateObject_Class__ProteinPage_Display__SingleProtein({currentWindowScrollY: undefined});
                }
                this._proteinExperimentPage_Display_SingleProtein.openOverlay_OnlyLoadingMessage();
            }
        }

        this._recompute_FullPage_Except_SearchDetails();
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
     *
     */
    private _selectedConditionsChanged_Callback( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) {
        try {

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
    private _mainCell_getHoverContents( params : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params ) {

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

        const modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class =
            this._modificationMass_ReporterIon__UserSelections__Coordinator_Class.get_Current_ModificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class();

        this.setState({ modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class });

        this._modificationMass_Update_modificationMass_UserSelections_ComponentData();

        this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();
    }

    //////////


    /**
     *
     */
    _proteinName_Clicked_Callback_Function( params : CreateReportedPeptideDisplayData_DataTableDataObjects_MultipleSearch_SingleProtein_proteinName_Clicked_Callback_Function_Params ) {

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

        if (params.ctrlKey_From_ClickEvent || params.metaKey_From_ClickEvent ) {

            //  Show Single Protein in New Window

            this._singleProteinRowShowSingleProteinNewWindow( { proteinSequenceVersionId } );

            return; //  EARLY RETURN
        }

        //  Push current state on to Browser History before update for Single Protein

        window.history.pushState( {}, "" );

        this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.setProteinSequenceVersionId( { proteinSequenceVersionId } );

        //  Copy Selected SelectedConditionIdsAndPaths if not set for Single Protein
        _copy_experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass__to__singleProtein_ExpPage_CentralStateManagerObjectClass_experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this.props.propsValue.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            singleProtein_ExpPage_CentralStateManagerObjectClass: this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass
        });

        _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            singleProtein_ExpPage_CentralStateManagerObjectClass : this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass
        });

        this._singleProteinRowShowSingleProteinOverlay( {
            proteinSequenceVersionId,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder: this.state.loadedDataCommonHolder
        } );
    }

    /**
     *
     */
    _singleProteinRowShowSingleProteinNewWindow( { proteinSequenceVersionId }: {proteinSequenceVersionId: number} ) {

        //  Create URL for new Window about to open

        //  Create to override the value of proteinSequenceVersionId from the URL
        const singleProtein_ExpPage_CentralStateManagerObjectClass_ForNewWindow =
            new SingleProtein_ExpPage_CentralStateManagerObjectClass({ initialProteinSequenceVersionId: proteinSequenceVersionId, centralPageStateManager : undefined });

        //  Copy Selected SelectedConditionIdsAndPaths if not set for Single Protein
        _copy_experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass__to__singleProtein_ExpPage_CentralStateManagerObjectClass_experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this.props.propsValue.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
            singleProtein_ExpPage_CentralStateManagerObjectClass: singleProtein_ExpPage_CentralStateManagerObjectClass_ForNewWindow
        });

        _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated({
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            singleProtein_ExpPage_CentralStateManagerObjectClass : singleProtein_ExpPage_CentralStateManagerObjectClass_ForNewWindow
        });

        const newWindowURL = this.props.propsValue.centralPageStateManager.getURL_ForCurrentState({ componentOverridesAdditions: [ singleProtein_ExpPage_CentralStateManagerObjectClass_ForNewWindow ] })

        // MUST open window before make AJAX Call.  This is a Browser Security requirement
        //  window.open(...): Must run in code directly triggered by click event

        const newWindow = window.open(newWindowURL, "_blank");
    }

    /**
     *
     */
    _singleProteinRowShowSingleProteinOverlay(
        {
            proteinSequenceVersionId, loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds, loadedDataCommonHolder
        }: {
            proteinSequenceVersionId: number
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        } ) : void {

        let proteinNameDescriptionParam : { name : string, description : string } = null; // If not found, Let Single Protein compute it

        // const proteinNameDescription = this._proteinNameDescription_Key_ProteinSequenceVersionId.get( proteinSequenceVersionId );
        // if ( proteinNameDescription ) {
        //     proteinNameDescriptionParam = { name : proteinNameDescription.name, description : proteinNameDescription.description };
        // }

        //  Current Window Scroll position
        const currentWindowScrollY = window.scrollY;

        //  Hide Main Div inside of header/footer
        const $data_page_overall_enclosing_block_div = $("#data_page_overall_enclosing_block_div");
        $data_page_overall_enclosing_block_div.hide();

        if ( ! this._proteinExperimentPage_Display_SingleProtein ) {

            this._instantiateObject_Class__ProteinPage_Display__SingleProtein({ currentWindowScrollY });
        }

        this._proteinExperimentPage_Display_SingleProtein.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription : proteinNameDescriptionParam,

            //  Pass Here since for sure populated by here
            loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });
    }

    /**
     * Call right before calling openOverlay or openOverlay_OnlyLoadingMessage
     */
    _instantiateObject_Class__ProteinPage_Display__SingleProtein({ currentWindowScrollY }: { currentWindowScrollY: number }) {

        //  Create callback function to call on single protein close

        const singleProteinCloseCallback = () : void => {

            this._proteinExperimentPage_Display_SingleProtein = undefined;

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

        const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = this.state.searchDataLookupParamsRoot;

        this._proteinExperimentPage_Display_SingleProtein = new ProteinExperimentPage_Display_SingleProtein( {

            forPeptidePage: true,

            singleProteinCloseCallback,

            loadedDataCommonHolder : this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,

            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,

            experimentId : this.props.propsValue.experimentId,
            experimentName : this.props.propsValue.experimentName,
            projectSearchIds : this.props.propsValue.projectSearchIds,

            searchDataLookupParamsRoot,
            conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer,
            conditionGroupsDataContainer : this.props.propsValue.conditionGroupsDataContainer,

            experimentConditions_GraphicRepresentation_PropsData : this.props.propsValue.experimentConditions_GraphicRepresentation_PropsData,

            singleProtein_ExpPage_CentralStateManagerObjectClass : this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass,

            experiment_DataPages_LoggedInUser_CommonObjectsFactory : this.props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory
        } );
    }

    /**
     *
     */
    private _downloadPeptides_Shown_ClickHandler() : void {

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
     * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.
     *
     * Open URL in new window to download from server
     */
    private _downloadPsms_Shown_ClickHandler() : void {
        try {
            const projectSearchIds = this.props.propsValue.projectSearchIds;

            const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } =
                experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId({
                    conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer,
                    conditionGroupsDataContainer : this.props.propsValue.conditionGroupsDataContainer
                });

            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = this.state.create_GeneratedReportedPeptideListData_Result;

            const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList


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

            const projectSearchIdsReportedPeptideIdsPsmIds: Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

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

                //  Build data for 'experimentDataForSearch' property

                const conditionGroupLabel_and_ConditionLabel_Data_FOR_ProjectSearchId = conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( conditionGroupLabel_and_ConditionLabel_Data_FOR_ProjectSearchId === undefined ) {
                    const msg = "No value in conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const experimentDataForSearch: Array<DownloadPSMs_PerConditionGroupConditionData> = [];

                for ( const conditionGroupLabel_and_ConditionLabel_Data_Entry of conditionGroupLabel_and_ConditionLabel_Data_FOR_ProjectSearchId ) {
                    const downloadPSMs_PerConditionGroupConditionData : DownloadPSMs_PerConditionGroupConditionData = {
                        conditionLabel: conditionGroupLabel_and_ConditionLabel_Data_Entry.conditionLabel
                    }
                    experimentDataForSearch.push( downloadPSMs_PerConditionGroupConditionData );
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry: DownloadPSMs_PerProjectSearchId_Entry = { projectSearchId, reportedPeptideIdsAndTheirPsmIds, experimentDataForSearch };
                projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
            }

            if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
                throw Error(
                    "_downloadPsms_Shown_ClickHandler: No reportedPeptideIds for any projectSearchIds for projectSearchIds: " + this.state.projectSearchIds_PossiblyFiltered.join(",")
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

        downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
            experimentId : this.props.propsValue.experimentId,
            projectSearchIdsReportedPeptideIdsPsmIds,
            searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
            proteinSequenceVersionIds : undefined  //  NO filter on proteinSequenceVersionId
        } );
    }

    //////////

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails() {

        //  New variable to populate and put in state
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        const promise_peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein = peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein({
            projectSearchIds : this.props.propsValue.projectSearchIds,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,  //  Updated in this function
            loadedDataCommonHolder  //  Updated in this function
        })

        promise_peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch( (reason) => {
            console.warn("promise_peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
            throw Error("promise_peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
        })

        promise_peptideExperimentPage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.then( (promiseResult) => {
            try {
                const promises_Load_ = [];
                const modificationMass_UserSelections_StateObject = this.props.propsValue.modificationMass_UserSelections_StateObject;
                const generatedPeptideContents_UserSelections_StateObject = this.props.propsValue.generatedPeptideContents_UserSelections_StateObject;

                if ( ( modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
                    && modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() )
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                    const promise = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                        getSearchSubGroupIds : false,
                        projectSearchIds_All : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }
                if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {

                    const promise = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                        getSearchSubGroupIds : false,
                        projectSearchIds_All : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }

                if ( this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                    const promise = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                        projectSearchIds_All : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }

                if ( promises_Load_.length === 0 ) {
                    this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder
                    });
                } else {
                    const promiseAll = Promise.all( promises_Load_ );
                    promiseAll.catch( (reason) => {
                        throw Error( "load_OpenModificationMasses_IfNeeded or load_ReporterIonMasses_IfNeeded failed in _recompute_FullPage_Except_SearchDetails ") ;
                    })
                    promiseAll.then( (result) => {
                        try {
                            this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder
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
     * @param initialPageLoad
     * @param proteinPositionFilter_UserSelections_StateObject
     * @param loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
     * @param loadedDataCommonHolder
     * @private
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain(
        {
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) : void {

        //  Delay render Peptide List since currently hidden.  Probably could skip render until close Single Protein Overlay
        window.setTimeout(() => {
            try {
                const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.getProteinSequenceVersionId();

                if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
                    //  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
                    this._singleProteinRowShowSingleProteinOverlay({
                        proteinSequenceVersionId: proteinSequenceVersionId_FromURL,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder
                    });

                    //  Delay render Peptide List since currently hidden.  Probably could skip render until close Single Protein Overlay
                    window.setTimeout(() => {
                        try {
                            this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
                                // initialPageLoad,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder
                            });

                        } catch( e ) {
                            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                            throw e;
                        }
                    }, 2000);

                } else {

                    //  render Peptide List immediately

                    this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
                        // initialPageLoad,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        loadedDataCommonHolder
                    });
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 20);
    }


    ///

    private _recompute_FullPage_Except_SearchDetails__SubPart_Main(
        {
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) : void {

        const {
            psmCountForUnfiltered,
            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

        } :  {
            psmCountForUnfiltered : number,
            modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
            reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
            peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds

        }  = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.compute_FullPage_Except_ExperimentGraphic({

            propsValue : this.props.propsValue,
            projectSearchIds_All : this.props.propsValue.projectSearchIds,
            projectSearchIds_PossiblyFiltered : this.state.projectSearchIds_PossiblyFiltered,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
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
            proteinSequenceWidget_StateObject : undefined,  //  NOT USED on Peptide Page
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : true, // FAKE true so NOT display section when nothing else is selected
            searchSubGroup_PropValue : undefined
        };

        const psmCountForUnfilteredDisplay = psmCountForUnfiltered.toLocaleString();

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result =
            create_GeneratedReportedPeptideListData__SingleProtein({

                forPeptidePage: true,

                psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

                searchSubGroup_Ids_Selected : undefined,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                proteinSequenceVersionId : undefined,  //  NOT USED on Peptide Page
                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder,
            } );

        this.setState({
            mainDisplayData_Loaded : true,

            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,

            psmCountForUnfilteredDisplay,

            modificationMass_UserSelections_ComponentData,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideFiltersDisplay_ComponentData,

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

            create_GeneratedReportedPeptideListData_Result,
        });
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

            this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.clearSelections();

            this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.clearAll();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
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

                            this._peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Force_ReRender_Object();

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

            let promise = load_PsmOpenModificationMasses_IfNeeded({
                getSearchSubGroupIds : undefined,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
            });

            if ( promise ) {
                this._load_PsmOpenModificationMasses_InProgress = true;

                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                });

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

                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                        });
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

                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                        });

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
            proteinNames: null, //  TODO
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

                                promise = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                                    getSearchSubGroupIds : false,
                                    projectSearchIds_All : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                                });
                            }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });
                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise.then( (result) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });

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

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });
                                    } catch( e ) {
                                        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                        throw e;
                                    }
                                });

                                promise.then( (result) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                        });

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

        const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData =
            peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                projectSearchIds_All : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return { modificationMass_UserSelections_ComponentData };
        });
    }

    /**
     * Change to peptide unique selection, this.props.propsValue.peptideUnique_UserSelection_StateObject
     */
    _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback() : void {
        try {
            // window.setTimeout( () => {
            //     try {
            //         this._AAAAAA_Change_UpdateURL();  //  Update URL

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
            //     } catch( e ) {
            //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            //         throw e;
            //     }
            // }, 0 );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     * create new this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData
     */
    _modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData() {

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData };
        });
    }

    /**
     * Change to reporter ion selection
     */
    _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL

                    if ( this._load_ReporterIonMasses_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {

                        promise = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                            getSearchSubGroupIds : false,
                            projectSearchIds_All : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_ReporterIonMasses_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });

                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });

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

        const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            projectSearchIds_All : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return { reporterIons_UserSelections_ComponentData };
        });
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

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

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

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return { peptideSequence_UserSelections_ComponentData };
        });
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

                    if ( this._load_ProteinCoverage_InProgress ) {

                        //  Already loading Reporter Ion Masses so exit.
                        //   *  When the existing Promise for loading Reporter Ion Masses, the page will be updated for the current selection change as well.

                        return; // EARLY RETURN
                    }

                    let promise = undefined;

                    if ( this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                        promise = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                            projectSearchIds_All : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                        });
                    }
                    if ( promise ) {
                        this._load_ProteinCoverage_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });

                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : false };
                                });

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
     * create new this.state.proteinPositionFilter_UserSelections_ComponentData
     */
    _proteinPositionFilter_Update_proteinPositionFilter_UserSelections_Component_Force_ReRender_Object() {

        this.setState( { proteinPositionFilter_UserSelections_Component_Force_ReRender_Object: {} } );
    }

    /**
     * create new this.state.proteinPositionFilter_UserSelections_Component_Force_ReRender_Object
     */
    private _peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_Force_ReRender_Object() {

        this.setState( { peptideList_SingleProtein_FilterOnCounts_psm_UserSelections_Object_Force_ResetToStateObject: {} } );
    }

    /////
    /**
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {

        try {
            // let newSelection = false;

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
                            proteinSequenceVersionId : null, // TODO
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_PsmOpenModificationMasses_InProgress = true;

                        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                        });

                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                });
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        });

                        promise.then( (result) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : false };
                                });

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

	//  Handling Specific Changes by updating the URL

	/**
	 * Update State to URL for Modification selection change (Variable or Static Modifications)
	 */
	_selectedModificationsChange_UpdateURL() {

		const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

	/**
	 *
	 */
	_reporterIonMassesChange_UpdateURL() {

		const reporterIonMassesSelectedEncodedStateData = this.props.propsValue.reporterIonMass_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.setReporterIonMassesSelectedEncodedStateData( { reporterIonMassesSelectedEncodedStateData } );
	}

    /**
     * Update State to URL for Peptide Unique selection change
     */
    _selectedPeptideUniqueChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.peptideUnique_UserSelection_StateObject.getEncodedStateData();
        this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.setPeptideUniqueFilterSelectedEncodedStateData({ peptideUniqueFilterSelectedEncodedStateData : encodedStateData });
    }

	/**
	 * Update State to URL for Peptide Sequence selection change
	 */
	_selectedPeptideSequenceChange_UpdateURL() {

		const peptideSequenceSelectedEncodedStateData = this.props.propsValue.peptideSequence_UserSelections_StateObject.getEncodedStateData();
		this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.setPeptideSequenceFilterSelectedEncodedStateData({ peptideSequenceFilterSelectedEncodedStateData : peptideSequenceSelectedEncodedStateData });
    }

    /**
     * Update State to URL for Protein Position Filter Selections change
     */
    _selectedProteinPositionFilterChange_UpdateURL() {

        const encodedStateData = this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.set_proteinPositionFilter_UserSelections_EncodedStateData({ proteinPositionFilter_UserSelections_EncodedStateData : encodedStateData });
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
                            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                                not_filtered_position_modification_selections : false,
                                proteinSequenceVersionId : null,
                                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                                searchSubGroup_Ids_Selected : undefined,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                                proteinSequenceWidget_StateObject : undefined,
                                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : null,
                                proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
                            });

                            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;


                            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData__SingleProtein({

                                forPeptidePage: true,

                                psmMinimumCount_Filter_UserEntry: this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject.get_PSM_CountFilter(),

                                searchSubGroup_Ids_Selected : undefined,
                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                proteinSequenceVersionId : null,
                                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                                conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                                conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                            } );

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

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject : this.props.propsValue.peptideList_PeptidePage_SingleProtein_FilterOnCounts_psm_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : undefined,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : true, // FAKE true so NOT display section when nothing else is selected
            searchSubGroup_PropValue : undefined
        };

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return { peptideFiltersDisplay_ComponentData };
        });
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        let setDefaultView_Component : JSX.Element = undefined;

        // if ( this.props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory &&  this.props.propsValue.projectSearchIds.length === 1 ) {
        //
        //     const get_SetDefaultView_Component_React : Get_SetDefaultView_Component_React_Type =
        //         this.props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SetDefaultView_Component_React();
        //
        //     const param = new SetDefaultView_Component_React_Params({ projectSearchId : this.props.propsValue.projectSearchIds[ 0 ] });
        //     setDefaultView_Component = get_SetDefaultView_Component_React( param )
        // }

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
                        style={ { } } >

                        {/* Main Content above Reported Peptides  */}

                        <div >
                            <h3>
                                Experiment: <span id="experiment_name">{ this.props.propsValue.experimentName }</span>
                            </h3>

                            <div style={ { marginBottom: 20 } }>
                                <Experiment_SingleExperiment_ConditionsGraphicRepresentation
                                    data={ this.props.propsValue.experimentConditions_GraphicRepresentation_PropsData }
                                    selectedCells={ this.state.graphicRepresentation_SelectedCells }
                                    conditionGroupsContainer={ this.props.propsValue.conditionGroupsContainer }
                                    manage_SelectedCells_ConditionCell_Selection_UserClick_Updates={ true }
                                    conditionCellClickHandler={ undefined }
                                    mainCellClickHandler={ undefined }
                                    mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                                />
                            </div>
                        </div>

                        <div style={ { paddingBottom: 15 } }>

                            { setDefaultView_Component }
                            { saveView_Component }

                            <SharePage_Component
                                experimentId={ this.props.propsValue.experimentId }
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

                            <ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component

                                showProteins={ true }
                                proteinName_Clicked_Callback_Function={ this._proteinName_Clicked_Callback_Function_BindThis }

                                conditionGroupsContainer={ this.props.propsValue.conditionGroupsContainer }
                                conditionGroupsDataContainer={ this.props.propsValue.conditionGroupsDataContainer }

                                showUpdatingMessage={ this.state.updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList }
                                showGettingDataMessage={ this.state.gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds }

                                create_GeneratedReportedPeptideListData_Result={ this.state.create_GeneratedReportedPeptideListData_Result }

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

        if ( this.props.propsValue.projectSearchIds.length === 1 ) {
            modificationMass_CommonRounding_ReturnNumber_Param = undefined;  //  NO Rounding for Single Project Search Id
        }

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

                <div style={ { } } > {/*marginBottom: 10*/}

                    <div className=" filter-common-block-selection-container-block no-section-labels ">

                        {/* Display of User Selected Modifications and Protein Positions filtering on  */}

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
 * @param experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
 * @param projectSearchIds
 * @param singleProtein_ExpPage_CentralStateManagerObjectClass
 */
const _copy_experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass__to__singleProtein_ExpPage_CentralStateManagerObjectClass_experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated = function (
    {
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,  //  Page Level
        singleProtein_ExpPage_CentralStateManagerObjectClass
    } : {
        experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass

    }) : void {

    {
        const encodedStateData = singleProtein_ExpPage_CentralStateManagerObjectClass.getExperiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData()
        if ( encodedStateData ) {

            //  Already populated so exit

            return; // EARLY RETURN
        }
    }

    const experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData = experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass.getDataForEncoding();

    singleProtein_ExpPage_CentralStateManagerObjectClass.setExperiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData({ experiment_SelectedConditionIdsAndPaths__SingleProtein__EncodedStateData });
}

/**
 *
 */
const _copy_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass__to__modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_SingleProtein__IfNOTPopulated = function (
    {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,  //  Page Level
        singleProtein_ExpPage_CentralStateManagerObjectClass
    } : {
        modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass
        singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass

    }) : void {

    {
        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData = singleProtein_ExpPage_CentralStateManagerObjectClass.getModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData();
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

    singleProtein_ExpPage_CentralStateManagerObjectClass.setModificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData({ modificationMass_OpenModMassZeroNotOpenMod_UserSelection__EncodedStateData });
}

