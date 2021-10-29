/**
 * proteinExperimentPage_Display_MainContent_Component.tsx
 *
 * Protein Experiment Page Main Content:
 *
 * Main Content of Protein Page
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


import {
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds,
    DownloadPSMs_PerProjectSearchId_Entry, DownloadPSMs_PerReportedPeptideId
} from 'page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds';


////

import {
    Experiment_SingleExperiment_ConditionsGraphicRepresentation,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params,
    ExperimentConditions_GraphicRepresentation_PropsData
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation";
import {
    Experiment_Condition, Experiment_ConditionGroup,
    Experiment_ConditionGroupsContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
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
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {ProteinList_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinList_ExpPage_CentralStateManagerObjectClass";
import {ModificationMass_UserSelections_StateObject} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass";
import {ProteinGrouping_CentralStateManagerObjectClass} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_protein_list_common/proteinGrouping_CentralStateManagerObjectClass";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject";
import {
    ProteinPage_ProteinGroupingFilterSelection_Component_Root,
    ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback,
    ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback_Param
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_search_and_other_filters_block/proteinViewPage_ProteinGroupingFilterSelectionComponent";
import {
    protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped,
    ProteinNameDescriptionCacheEntry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped";
import {ProteinDisplayData_From_createProteinDisplayData_ProteinList} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__ProteinDisplayData_Classes";
import {ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
import {get_ModificationMass_UserSelections_DisplayMassSelectionOverlay_Layout_LoadingMessage} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_DisplayMassSelectionOverlay_Layout";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {modificationMass_UserSelections_BuildData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_BuildData_ForReactComponent";
import {ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData";
import {modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_open_mod_mass_zero_not_open_mod_user_selection/js/modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData";
import {loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder/loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder";
import {getReportedPeptideIdsForDisplay_AllProjectSearchIds} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/reported_peptide_ids_for_display/peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds";
import {
    proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides,
    ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_GroupProteinsIfRequested} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_GroupProteinsIfRequested";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals";
import {
    DataTable_RootTableDataObject, DataTable_RootTableObject,
    DataTable_TableOptions
} from "page_js/data_pages/data_table_react/dataTable_React_DataObjects";
import {dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload} from "page_js/data_pages/data_table_react/dataTable_React_convert_DataTableObjects_TableContents_To_Tab_Delim_String_ForDownload";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data";
import {ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/jsx/proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component";
import {ModificationMass_UserSelections_Root} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root";
import {ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__protein_list/filter_on__components/filter_on_counts__psm_peptide_unique_peptide/proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {DataTable_TableRoot} from "page_js/data_pages/data_table_react/dataTable_TableRoot_React";
import {ModificationMass_UserSelections_ComponentData} from "page_js/data_pages/peptide__single_protein__common_shared__psb_and_experiment/filter_on__components/filter_on__core__components__peptide__single_protein/filter_on__modification__reporter_ion/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData";
import {CentralPageStateManager} from "page_js/data_pages/central_page_state_manager/centralPageStateManager";
import {ProteinExperimentPage_Display_SingleProtein} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/js/proteinExperimentPage_Display_SingleProtein";
import {SingleProtein_ExpPage_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/singleProtein_ExpPage_CentralStateManagerObjectClass";
import {
    ProteinExperimentPage_Display__singleProteinRow_ClickHandler,
    ProteinExperimentPage_Display__singleProteinRow_ClickHandler_Params,
    proteinExperimentPage_renderToPageProteinList__Create_DataTable_RootTableDataObject
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperimentPage_DisplayData_ProteinList__Create_ProteinList_DataTable_RootTableDataObject";
import {proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ExperimentConditionId} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ExperimentConditionId";
import {
    proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group,
    ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry
} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_root/js/proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group";

/////////////////////////

//  Constants

//////////////////////////////////

/**
 *
 */
export class ProteinExperimentPage_Display_MainContent_Component_Props_Prop {

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
    proteinExperimentPageRoot_CentralStateManagerObjectClass: ProteinList_ExpPage_CentralStateManagerObjectClass
    singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass

    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: ModificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass

    proteinGrouping_CentralStateManagerObjectClass : ProteinGrouping_CentralStateManagerObjectClass
    proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject : ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject
    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
}

/**
 *
 */
export interface ProteinExperimentPage_Display_MainContent_Component_Props {

    propsValue : ProteinExperimentPage_Display_MainContent_Component_Props_Prop
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
interface ProteinExperimentPage_Display_MainContent_Component_State {

    projectSearchIds_PossiblyFiltered? : Array<number>;

    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    show_InitialLoadingData_Message? : boolean;

    mainDisplayData_Loaded? : boolean;

    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds?: Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>; // : Map;
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData

    proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject? : object // Assign new empty object {} when change State Object

    proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue?: ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue

    tableObject_CurrentlyRendered_ProteinList? : DataTable_RootTableObject
    proteinList_DataCounts? : ProteinList_DataCounts

    show_UpdatingProteinList_Message?: boolean

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    saveView_Component_React?: any //  React Component for Save View
    saveView_Component_Props_Prop?: any //  Object passed to saveView_Component_React as property propsValue
}

/**
 *
 */
export class ProteinExperimentPage_Display_MainContent_Component extends React.Component< ProteinExperimentPage_Display_MainContent_Component_Props, ProteinExperimentPage_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _selectedConditionsChanged_Callback_BindThis = this._selectedConditionsChanged_Callback.bind(this);

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);

    private _proteinGroup_SelectionValues_Changed_Callback_BindThis = this._proteinGroup_SelectionValues_Changed_Callback.bind(this);
    private _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback_BindThis = this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback.bind(this);
    private _updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback_BindThis = this._updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback_BindThis = this._updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback.bind(this);

    private _singleProteinRowClickHandler_BindThis = this._singleProteinRowClickHandler.bind(this);

    private _downloadProteinsClickHandler_BindThis = this._downloadProteinsClickHandler.bind(this);
    private _downloadPSMsClickHandler_BindThis = this._downloadPSMsClickHandler.bind(this);

    private _DO_NOT_CALL_CastTestOnly () {
        //  Test function cast
        const proteinGroup_SelectionValues_Changed_Callback : ProteinPage_ProteinGroupingFilterSelection_FilterValuesChanged_Callback = this._proteinGroup_SelectionValues_Changed_Callback;
        const singleProteinRowClickHandler:ProteinExperimentPage_Display__singleProteinRow_ClickHandler = this._singleProteinRowClickHandler;
    }

    //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = new Map();

    //   Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
    private _proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = new Map();

    //   Cached: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
    // private _peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId : Map<number, CountsFor_proteinSequenceVersionIdEntry__Integrated_SingleMultipleSearchSubGroups> = new Map();

    private _proteinDisplayData_Final_ForDisplayTable: ProteinDisplayData_From_createProteinDisplayData_ProteinList

    private _proteinExperimentPage_Display_SingleProtein: ProteinExperimentPage_Display_SingleProtein;

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress

    private _data_LoadedFor_ComputedReportedPeptides_AllProteins: boolean = false;

    private _show_proteinPageSearchesSummarySectionData_Root = false;

    /**
     *
     */
    constructor(props: ProteinExperimentPage_Display_MainContent_Component_Props) {
        super(props);

        const proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue = new ProteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue({
            displayOnly : false,
            proteinGrouping_CentralStateManagerObjectClass : props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            filterValuesChanged_Callback : this._proteinGroup_SelectionValues_Changed_Callback_BindThis
        });

        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        const searchDataLookupParamsRoot: SearchDataLookupParameters_Root = props.propsValue.searchDataLookupParamsRoot;


        let saveView_Component_React = undefined;
        let saveView_Component_Props_Prop = undefined;

        if ( props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory ) {

            if ( props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps ) {
                const saveView_Create_Component_React_Type : SaveView_Create_Component_React_Type = (
                    props.propsValue.experiment_DataPages_LoggedInUser_CommonObjectsFactory.getFunctionToGet_SaveView_dataPages_ComponentAndProps()
                );

                const result : SaveView_Create_Component_React_Result = saveView_Create_Component_React_Type({ projectSearchIds : props.propsValue.projectSearchIds, experimentId : undefined });
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

        let projectSearchIds_PossiblyFiltered : Array<number> = props.propsValue.projectSearchIds;

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

        this.state = {
            show_InitialLoadingData_Message: true,
            projectSearchIds_PossiblyFiltered,
            searchDataLookupParamsRoot,
            graphicRepresentation_SelectedCells,
            proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: new Map(), //  Will be replaced later
            loadedDataCommonHolder,
            saveView_Component_React,
            saveView_Component_Props_Prop
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

        this._recompute_FullPage_Except_SearchDetails({ initialPageLoad: true });
    }

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

            let projectSearchIds_PossiblyFiltered = this.state.projectSearchIds_PossiblyFiltered;

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
     * Called when the user updates the Protein Group selection and the page needs to be re-rendered
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

        // if ( this.props.propsValue.projectSearchIds.length === 1 ) {
        //     modificationMass_CommonRounding_ReturnNumber_Local = undefined;  // NO rounding for Single Search
        // }

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

                    window.setTimeout( () => {
                        try {

                            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                                && this._load_PsmOpenModificationMasses_InProgress ) {

                                //  Already loading PSM Open Modification Masses so exit.
                                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                                return; // EARLY RETURN
                            }

                            let promise = undefined;

                            //  Currently Open Mods ALWAYS loaded on page load

                            // if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {
                            //
                            //     promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                            //         searchSubGroups_Root: undefined, // May be null or undefined
                            //         projectSearchIds : this.props.propsValue.projectSearchIds,
                            //         loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            //         searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                            //     });
                            // }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState({ gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true });

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

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

                                        this._re_renderPage();

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

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

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

                                        this._re_renderPage();

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
    _modificationMass_Update_modificationMass_UserSelections_ComponentData() {
        {
            const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber
            });

            //  NO support for filter on Static Mods
            modificationMass_UserSelections_ComponentData.staticModificationsData = undefined;

            this.setState( { modificationMass_UserSelections_ComponentData });
        }
    }

    /**
     *
     */
    private _updateMadeTo_modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass_Callback() {
        try {
            const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                    modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                });

            this.setState( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });

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
            console.warn("Exception caught in _proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback()");
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
            console.warn("Exception caught in _updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback()");
            console.warn( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    //  Handling Specific Changes by updating the URL

    /**
     * Update State to URL for Modification selection change (Variable or Static Modifications)
     */
    _selectedModificationsChange_UpdateURL() {

        const modsSelectedEncodedStateData = this.props.propsValue.modificationMass_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.proteinExperimentPageRoot_CentralStateManagerObjectClass.setModsSelectedEncodedStateData( { modsSelectedEncodedStateData : modsSelectedEncodedStateData } );
    }

    //////////////////
    //////////////////

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails({ initialPageLoad } : { initialPageLoad : boolean }) {

        //  New variable to populate and put in state
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();

        const projectSearchIds = this.props.propsValue.projectSearchIds;

        const projectSearchIdsSet = new Set( projectSearchIds );

        const getDataFromServer_AllPromises = [];

        for (const searchDataLookupParams_For_Single_ProjectSearchId of this.state.searchDataLookupParamsRoot.paramsForProjectSearchIds.paramsForProjectSearchIdsList ) {

            const projectSearchId = searchDataLookupParams_For_Single_ProjectSearchId.projectSearchId;

            if ( ! projectSearchIdsSet.has( projectSearchId ) ) {
                // Skip loading for projectSearchId
                continue; // EARLY CONTINUE
            }

            const loadedDataPerProjectSearchIdHolder = new ProteinViewPage_LoadedDataPerProjectSearchIdHolder();
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds.set(projectSearchId, loadedDataPerProjectSearchIdHolder);

            const promise_getDataFromServer = loadData_SingleSearch_MainProteinPeptidePageLoad_LoadTo_loadedDataPerProjectSearchIdHolder({
                projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId,
                loadedDataPerProjectSearchIdHolder,
                load_searchSubGroupsData: false
            });

            getDataFromServer_AllPromises.push(promise_getDataFromServer);
        }

        const promise_getDataFromServer_AllPromises = Promise.all(getDataFromServer_AllPromises);

        promise_getDataFromServer_AllPromises.catch((reason) => {
        });

        promise_getDataFromServer_AllPromises.catch( (reason) => {} );
        promise_getDataFromServer_AllPromises.then( (value) => {
            try {
                this.setState({ loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds });

                {
                    const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
                        modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                        });

                    this.setState( { modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData });
                }

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
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    }

    /**
     *
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBefore_ReRenderPage() : void {

        const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_ExpPage_CentralStateManagerObjectClass.getProteinSequenceVersionId();

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
                if ( true ) { //  Now ALWAYS Load this data:   if ( ! this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping()) {

                    //  Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

                    if (this._data_LoadedFor_ComputedReportedPeptides_AllProteins) {

                        //  Data already loaded

                        this._re_renderPage_Actually();

                        this.setState({ mainDisplayData_Loaded : true } );

                    } else {

                        //  WAS: Grouping Proteins selected so Load data needed for Computed Reported Peptides, All Proteins

                        //  Now ALWAYS Load this data

                        const searchDataLookupParamsRoot = this.state.searchDataLookupParamsRoot;

                        const promises_loadDataFor_ComputedReportedPeptides_AllProteins =
                            ProteinViewPage_DisplayData_ProteinList__Main_Component_nonClass_Functions.loadDataFor_ComputedReportedPeptides_AllProteins({
                                projectSearchIds : this.props.propsValue.projectSearchIds,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                searchDataLookupParamsRoot
                            })

                        if (promises_loadDataFor_ComputedReportedPeptides_AllProteins.length !== 0) {

                            //  Already cover Protein List with "Updating" message so don't need additional "Loading Data" message

                            const promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises = Promise.all(promises_loadDataFor_ComputedReportedPeptides_AllProteins);

                            promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.catch((reason) => {
                            });

                            promises_loadDataFor_ComputedReportedPeptides_AllProteins_AllPromises.then((value) => {
                                try {
                                    // Data Loaded for Computed Reported Peptides

                                    this._data_LoadedFor_ComputedReportedPeptides_AllProteins = true;

                                    this._re_renderPage_Actually();

                                    this.setState({ mainDisplayData_Loaded : true } );

                                } catch (e) {
                                    reportWebErrorToServer.reportErrorObjectToServer({errorException: e});
                                    throw e;
                                }
                            });
                        } else {

                            // NO data To Load for Computed Reported Peptides so immediately execute this._displayProteinListOnPage_ActualRender( { projectSearchIds } );

                            this.setState({ mainDisplayData_Loaded : true } );

                            this._re_renderPage_Actually();
                        }
                    }
                    // } else {
                    //
                    //     // Grouping Proteins NOT selected so immediately execute this._re_renderPage_Actually( );
                    //
                    //     this._re_renderPage_Actually();
                }

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        }, 20);
    }

    /**
     *
     */
    private _re_renderPage_Actually() {

        this.setState({ show_UpdatingProteinList_Message: false });

        this.setState({ show_InitialLoadingData_Message: false });

        const projectSearchIds = this.state.projectSearchIds_PossiblyFiltered;

        {
            const modificationMass_UserSelections_ComponentData = modificationMass_UserSelections_BuildData_ForReactComponent({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                proteinSequenceVersionId : undefined,
                projectSearchIds : projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber
            });

            //  NO support for filter on Static Mods
            modificationMass_UserSelections_ComponentData.staticModificationsData = undefined;

            this.setState( { modificationMass_UserSelections_ComponentData });
        }

        const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
            not_filtered_position_modification_selections : false,
            proteinSequenceVersionId : null, // always null for protein list
            projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
            searchSubGroup_Ids_Selected: undefined,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder : this.state.loadedDataCommonHolder, // created in constructor

            //  No filtering on these for protein list
            proteinSequenceWidget_StateObject : undefined,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            reporterIonMass_UserSelections_StateObject : undefined, // this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : undefined, // this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : undefined, // this.props.propsValue.peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root : undefined, // null,
            proteinPositionFilter_UserSelections_StateObject : undefined, // this.state.proteinPositionFilter_UserSelections_StateObject
        });

        const proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result : ProteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result =
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides({
                proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject: this.props.propsValue.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject,
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                searchSubGroup_Ids_Selected: undefined, //  Populated ONLY for Single Search when Search has Search SubGroups.  May be a Subset of searchSubGroup_Ids for the Search based on User selection
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds: getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            });

        let proteinDisplayData: ProteinDisplayData_From_createProteinDisplayData_ProteinList = undefined;
        //   Cached: Protein Name and Description in a Map, Key ProteinSequenceVersionId
        let proteinNameDescription_Key_ProteinSequenceVersionId : Map<number, ProteinNameDescriptionCacheEntry> = undefined

        //   Clear: Cached: Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        let proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId : Map<number, Array<ProteinNameDescriptionCacheEntry>> = undefined

        {
            const callResult = protein_view_page__display_data__protein_list__create_protein_display_data__before__not_grouped__grouped({

                proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData__Create_GeneratedPeptides_Result,
                projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

            proteinDisplayData = callResult.proteinDisplayData;
            proteinNameDescription_Key_ProteinSequenceVersionId = callResult.proteinNameDescription_Key_ProteinSequenceVersionId;
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = callResult.proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId;
        }

        //  First Condition Group Conditions since that is the conditions that are displayed
        const first_conditionGroup: Experiment_ConditionGroup = this.props.propsValue.conditionGroupsContainer.conditionGroups[0];

        const conditions_with_their_project_search_ids_for_First_condition_group: Array<ProteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_groupResultEntry> =
            proteinExperiment_Create_conditions_with_their_project_search_ids_for_condition_group({
                conditionGroup: first_conditionGroup,
                conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
                conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
                experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this.props.propsValue.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
            });

        //  Combine the PSM Counts and Distinct Peptides Per Experiment Condition Id of the first Condition Group
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ExperimentConditionId({
            proteinDisplayData,
            conditions_with_their_project_search_ids_for_First_condition_group,
            conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
            conditionGroupsDataContainer: this.props.propsValue.conditionGroupsDataContainer,
            experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass: this.props.propsValue.experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
        });


        const process_SubGroups = false;  // ALWAYS false for Experiment

        if ( this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass.isGroupProteins_No_Grouping() ) {

            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_NOT_GroupProteins({
                process_ExperimentConditions: true, process_SubGroups, projectSearchIds, proteinDisplayData
            });

        } else {
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_GroupProteinsIfRequested({
                process_ExperimentConditions: true, process_SubGroups, projectSearchIds, proteinDisplayData, proteinGrouping_CentralStateManagerObjectClass: this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass
            });
        }


        //   Add Filtering on PSM, Peptide, Unique Peptide counts HERE

        //  Updated in this call (or just returns same object with no changes)
        proteinDisplayData =
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_FilterOnCounts_PSMPeptideUniquePeptide({
                proteinDisplayData, proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject: this.props.propsValue.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject
            });



        //  Call after final filtering of protein list to populate data accumulated across proteins in the final list
        proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Combine_ReportedPeptideIdsPsmIds_Per_ProjectSearchId({
            process_SubGroups,
            projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
            proteinDisplayData
        });

        {
            let compute_PerProjectSearchId_Data = false;

            if ( this._show_proteinPageSearchesSummarySectionData_Root ) {
                //  "Show Summary Data Per Search" clicked so compute that data
                compute_PerProjectSearchId_Data = true;
            }

            //  Call after final filtering of protein list to compute Distinct Peptide and PSM totals
            proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_Compute_PeptidePSM_Totals({
                compute_PerProjectSearchId_Data, searchSubGroup_Ids_Selected: undefined,
                projectSearchIds,
                proteinDisplayData,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });
        }

        this._proteinDisplayData_Final_ForDisplayTable = proteinDisplayData

        //   Clear: Counts per Protein of peptide, unique peptide, and PSM in a Map, Key ProteinSequenceVersionId
        // this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId = new Map();

        // peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId: this._peptideUniquePeptidePSM_Counts_Key_ProteinSequenceVersionId,

        //   Protein Name and Description in a Map, Key ProteinSequenceVersionId
        this._proteinNameDescription_Key_ProteinSequenceVersionId = proteinNameDescription_Key_ProteinSequenceVersionId;

        //   Protein Name(s) and Description(s) for Tooltip in a Map, Key ProteinSequenceVersionId
        this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId = proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId;

        const tableOptions = new DataTable_TableOptions({enable_Pagination_Download_Search: true});

        //   Create Data Table
        const tableDataObject: DataTable_RootTableDataObject = proteinExperimentPage_renderToPageProteinList__Create_DataTable_RootTableDataObject({ // External Function
            singleProteinRowClickHandler_Callback : this._singleProteinRowClickHandler_BindThis,
            proteinDisplayData,
            proteinGrouping_CentralStateManagerObjectClass: this.props.propsValue.proteinGrouping_CentralStateManagerObjectClass,
            conditions_with_their_project_search_ids_for_First_condition_group,
            conditionGroupsContainer: this.props.propsValue.conditionGroupsContainer,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId: this._proteinNameDescriptionForToolip_Key_ProteinSequenceVersionId,
            dataPageStateManager_DataFrom_Server: this.props.propsValue.dataPageStateManager
        });

        const tableObject_CurrentlyRendered_ProteinList = new DataTable_RootTableObject({ tableDataObject, tableOptions, dataTableId: "Single Search Protein List" });

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

        this.setState({
            tableObject_CurrentlyRendered_ProteinList,
            proteinList_DataCounts
        });

    }

    /**
     *
     */
    private _downloadProteinsClickHandler() {
        try {
            if ( ! this.state.tableObject_CurrentlyRendered_ProteinList ) {
                console.warn("_downloadProteinList(): No Protein List Table rendered to download");
                return;
            }

            const projectSearchIds = this.state.projectSearchIds_PossiblyFiltered;

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

            const searchDataLookupParamsRoot : SearchDataLookupParameters_Root = this.state.searchDataLookupParamsRoot;

            if ( ! searchDataLookupParamsRoot ) {
                throw Error( "searchDataLookupParamsRoot not found" );
            }

            //  for downloads
            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = proteinViewPage_DisplayData_ProteinList__CreateProteinDisplayData_PSM_Download_Create_PerProjectSearchId_Data({
                proteinDisplayData: this._proteinDisplayData_Final_ForDisplayTable
            });

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
    _singleProteinRowClickHandler( params : ProteinExperimentPage_Display__singleProteinRow_ClickHandler_Params ) {

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

        this._singleProteinRowShowSingleProteinOverlay( { proteinSequenceVersionId } );
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

        if ( ! this._proteinExperimentPage_Display_SingleProtein ) {

            this._instantiateObject_Class__ProteinPage_Display__SingleProtein({ currentWindowScrollY });
        }

        this._proteinExperimentPage_Display_SingleProtein.openOverlay({
            proteinSequenceVersionId,
            proteinNameDescription : proteinNameDescriptionParam,

            //  Pass Here since for sure populated by here
            loadedDataCommonHolder: this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
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
    render() {

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

            let searchContains_VariableModifications = false;
            let searchContains_OpenModifications = false;

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
            }

            options_Filter_Block = (

                <div className="  filter-common-block-selection-container-block yes-section-labels " >

                    {/*  2 Column CSS Grid  */}

                    {/*  Section Header: Spans all columns */}
                    <div
                        style={ { gridColumn: " 1/-1" } }
                        className=" section-label "
                    >
                        Options

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

                    <ProteinPage_ProteinGroupingFilterSelection_Component_Root
                        propValue={ this.state.proteinPage_ProteinGroupingFilterSelection_Component_Root_Props_PropValue }
                    />

                    <ProteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_Root_Component
                        proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject={ this.props.propsValue.proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject }
                        searchContains_VariableModifications={ searchContains_VariableModifications }
                        searchContains_OpenModifications={ searchContains_OpenModifications }
                        updateMadeTo_proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_UserSelections_StateObject_Callback={
                            this._proteinViewPage_DisplayData_ProteinList__DistinctPeptideContents_SelectionsChanged_Callback_BindThis
                        }
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

                    <ModificationMass_UserSelections_Root
                        modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange={ this.state.modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange }
                        openModification_OpenSelectMassOverlay_Override_Callback={ this._openModificationMass_OpenUserSelections_Overlay_Override_BindThis }
                        modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                        modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class={ null /* this.state.modificationMass_ReporterIon__UserSelections__Coordinated_ReactStateData_Class */ }
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

                    {/******************/}

                    {/*  Section Header: Spans all columns */}
                    <div
                        style={ { gridColumn: " 1/-1" } }
                        className=" section-label "
                    >
                        Protein Filters

                        <div style={ { display: "inline-block" } }>
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
                    </div>

                    <ProteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Component
                        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject={ this.props.propsValue.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject }
                        proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject={ this.state.proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_Object_Force_ResetToStateObject }
                        updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback={
                            this._updateMadeTo_proteinList_FilterOnCounts_psm_peptide_uniquePeptide_UserSelections_StateObject_Callback_BindThis
                        }
                    />


                </div>
            )
        }

        return (
            <React.Fragment>

                {/* Apply a width to this <div> so that the boxes on right stay within viewport when main overlay is widened to exceed viewport.
                        Need to take into account padding in class="view-single-protein-overlay-body" which is currently 20px or read that from DOM element */}

                {/* Fake 'width' so that grid width not auto fill to width 100%.  Grid will exceed the 80px width to fill the width of the 2 columns.
                            This keeps boxes on right in viewport when main overlay width > viewport width. */}

                {/*style={ { display: "grid", gridTemplateColumns: "auto min-content", width: 80 } }*/}
                {/*ref={ this._div_MainGridAtTop_Ref }*/}
                <div >

                    {/* display of data above Reported Peptides  */}

                    {/*ref={ this._div_MainContent_LeftGridEntry_AtTop_Ref }*/}
                    <div
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

                { ( this.state.show_InitialLoadingData_Message ) ? (

                    <div >
                        <div >
                            Loading Data
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
                                            Peptide Count:
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

                            </div>
                        ): null }

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

