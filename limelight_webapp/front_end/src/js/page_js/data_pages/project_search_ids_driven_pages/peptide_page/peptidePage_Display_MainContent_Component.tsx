/**
 * peptidePage_Display_MainContent_Component.tsx
 * 
 * Peptide Page Main Content:
 * 
 * Main Content of Peptide Page
 * 
 */

import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { StringDownloadUtils } from 'page_js/data_pages/data_pages_common/downloadStringAsFile';

//   From data_pages_common
import {DataPageStateManager} from 'page_js/data_pages/data_pages_common/dataPageStateManager'; // dataPageStateManager.ts

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

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


import {
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds,
    DownloadPSMs_PerProjectSearchId_Entry, DownloadPSMs_PerReportedPeptideId
} from 'page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds';


////

import { PeptidePage_Display_MainContent_Component_nonClass_Functions } from './peptidePage_Display_MainContent_Component_nonClass_Functions';

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
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/js/proteinPage_Display__SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component,
    ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback,
    ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page__single_protein/jsx/proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component";


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

    searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchSubGroup_Are_All_SearchSubGroupIds_Selected? : boolean
    searchSubGroup_PropValue? : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData;

    psmCountForUnfilteredDisplay? : string;

    modificationMassSelections_AlwaysShow__ClearOn_ObjectReferenceChange?: object  //  Clear modificationMassSelections_AlwaysShow in Modifications Filter On Component when this object reference changes
    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData? : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
    proteinPositionFilter_UserSelections_Component_Force_ReRender_Object? : object;

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

    // private _downloadPeptides_All_ClickHandler_BindThis = this._downloadPeptides_All_ClickHandler.bind(this);
    private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    // private _downloadPsms_All_ClickHandler_BindThis = this._downloadPsms_All_ClickHandler.bind(this);
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

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress
    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress
    private _load_ProteinCoverage_InProgress = false;  //  Flag that Loading Protein Coverage is In Progress

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinPage_Display__SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _proteinPage_Display__SingleProtein_Root: ProteinPage_Display__SingleProtein_Root;

    private _modificationMass_ReporterIon__UserSelections__Coordinator_Class : ModificationMass_ReporterIon__UserSelections__Coordinator_Class

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

        this.state = {
            searchDataLookupParamsRoot,
            searchDetailsAndFilterBlock_MainPage_Root_Props_PropValue,
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

        const promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein = peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein({
            projectSearchIds : this.props.propsValue.projectSearchIds,
            dataPageStateManager_DataFrom_Server : this.props.propsValue.dataPageStateManager,
            searchDetailsBlockDataMgmtProcessing : this.props.propsValue.searchDetailsBlockDataMgmtProcessing,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,  //  Updated in this function
            loadedDataCommonHolder  //  Updated in this function
        })

        promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch( (reason) => {
            console.warn("promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
            throw Error("promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.catch  reason: " + reason )
        })

        promise_peptidePage_Load_Base_Data_For_Cutoffs_PSM_Peptide_Protein.then( (promiseResult) => {
            try {
                const promises_Load_ = [];
                const modificationMass_UserSelections_StateObject = this.props.propsValue.modificationMass_UserSelections_StateObject;
                const generatedPeptideContents_UserSelections_StateObject = this.props.propsValue.generatedPeptideContents_UserSelections_StateObject;

                if ( ( modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
                    && modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() )
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_Selected()
                    || generatedPeptideContents_UserSelections_StateObject.getOpenModifications_WithLocalization_Selected() ) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_OpenModificationMasses_IfNeeded({
                        searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }
                if ( this.props.propsValue.reporterIonMass_UserSelections_StateObject.is_Any_ReporterIons_Selected() ) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ReporterIonMasses_IfNeeded({
                        searchSubGroups_Root: this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root(), // May be null or undefined
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                        searchDataLookupParamsRoot : this.state.searchDataLookupParamsRoot
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }

                if ( this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.isAnySelections() ) {

                    const promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                        projectSearchIds : this.props.propsValue.projectSearchIds,
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                    });
                    if ( promise ) {
                        promises_Load_.push( promise );
                    }
                }

                if ( promises_Load_.length === 0 ) {
                    this._recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain({
                        initialPageLoad,
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
                                initialPageLoad,
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
     */
    private _recompute_FullPage_Except_SearchDetails__SubPart_RunBeforeMain(
        {
            initialPageLoad,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            initialPageLoad : boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) : void {

        const proteinSequenceVersionId_FromURL = this.props.propsValue.singleProtein_CentralStateManagerObject.getProteinSequenceVersionId();

        if (proteinSequenceVersionId_FromURL !== undefined && proteinSequenceVersionId_FromURL !== null) {
            //  Have proteinSequenceVersionId_FromURL so display Single Protein Overlay
            this._singleProteinRowShowSingleProteinOverlay({
                proteinSequenceVersionId: proteinSequenceVersionId_FromURL,
                loadedDataCommonHolder,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

            //  Delay render Peptide List since currently hidden.  Probably could skip render until close Single Protein Overlay
            window.setTimeout(() => {

                this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
                    initialPageLoad,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                    loadedDataCommonHolder
                });
            }, 2000);

        } else {

            //  render Peptide List immediately

            this._recompute_FullPage_Except_SearchDetails__SubPart_Main({
                initialPageLoad,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder
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
            loadedDataCommonHolder
        } : {
            initialPageLoad : boolean
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
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
            psmCountForUnfiltered,
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
            psmCountForUnfiltered : number,
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
            proteinSequenceWidget_StateObject : undefined,  //  NOT USED on Peptide Page
            searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue
        };

        const psmCountForUnfilteredDisplay = psmCountForUnfiltered.toLocaleString();

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData__SingleProtein({

            forPeptidePage: true,
            searchSubGroup_Ids_Selected,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
            proteinSequenceVersionId : undefined,  //  NOT USED on Peptide Page
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } );


        // console.log("Peptide List Data Generated (in call to _recompute_FullPage_Except_SearchDetails__SubPart): create_GeneratedReportedPeptideListData_Result.peptideList_Length: "
        //     + create_GeneratedReportedPeptideListData_Result.peptideList_Length
        //     + ", create_GeneratedReportedPeptideListData_Result: ", create_GeneratedReportedPeptideListData_Result )

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

            return {
                mainDisplayData_Loaded : true,

                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder,

                searchSubGroup_Are_All_SearchSubGroupIds_Selected,
                searchSubGroup_PropValue,

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
            };
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

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

            return { searchSubGroup_PropValue, searchSubGroup_Are_All_SearchSubGroupIds_Selected };
        });
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

        this._singleProteinRowShowSingleProteinOverlay({
            proteinSequenceVersionId,
            loadedDataCommonHolder: this.state.loadedDataCommonHolder,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds: this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
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

        }: {
            proteinSequenceVersionId: number

            //  Pass to here since not in state yet for show Single Protein overlay on Page load
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder;
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>;

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
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
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



    //  NOT CURRENTLY USED.  May be OUT OF DATE

	// /**
	//  *
	//  */
	// _downloadPeptides_All_ClickHandler() : void {
	//     try {
    //         let searchSubGroup_Ids_Selected : Set<number> = undefined;
    //
    //         //   Code setting searchSubGroup_Ids_Selected not needed since searchSubGroup_Ids_Selected === undefined same as 'ALL'
    //
    //         if ( this.props.propsValue.projectSearchIds.length === 1 && this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root() ) {
    //
    //             //  Only display for 1 search
    //
    //             const projectSearchId = this.props.propsValue.projectSearchIds[ 0 ];
    //
    //             const searchSubGroups_ForProjectSearchId = this.props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId );
    //             if ( ! searchSubGroups_ForProjectSearchId ) {
    //                 const msg = "returned nothing: props.propsValue.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId( projectSearchId ), projectSearchId: " + projectSearchId;
    //                 console.warn( msg )
    //                 throw Error( msg )
    //             }
    //
    //             //  Set searchSubGroup_Ids_Selected to ALL searchSubGroup_Ids
    //
    //             searchSubGroup_Ids_Selected = new Set();
    //
    //             for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
    //                 searchSubGroup_Ids_Selected.add( searchSubGroup.searchSubGroup_Id );
    //             }
    //         }
    //
    //         const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
    //
    //             not_filtered_position_modification_selections : true, //  Required to be true for Download "All"
    //             proteinSequenceVersionId : undefined,
    //             projectSearchIds : this.props.propsValue.projectSearchIds,
    //             searchSubGroup_Ids_Selected,
    //             loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    //             loadedDataCommonHolder : this.state.loadedDataCommonHolder,
    //
    //             //  Passed since required but not used since passing not_filtered_position_modification_selections : true
    //
    //             proteinSequenceWidget_StateObject : undefined,
    //             modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
    //             reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
    //             peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
    //             peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
    //             userSearchString_LocationsOn_ProteinSequence_Root : null,
    //             proteinPositionFilter_UserSelections_StateObject : this.state.proteinPositionFilter_UserSelections_StateObject
    //         });
    //
    //         const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
    //
    //
    //         const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData__SingleProtein({
    //
    //             searchSubGroup_Ids_Selected,
    //             reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
    //
    //             generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
    //
    //             proteinSequenceVersionId : undefined,
    //             projectSearchIds : this.props.propsValue.projectSearchIds,
    //             loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    //             loadedDataCommonHolder : this.state.loadedDataCommonHolder,
    //         } );
    //
    //         const peptideList : Array<CreateReportedPeptideDisplayData__SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList
    //
    //         const reportedPeptideDisplayDownloadDataAsString : string = this.createReportedPeptideDisplayDownloadDataAsString({
    //             peptideList
    //         });
    //
    //         StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' });
    //
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
	// }

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

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : this.state.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList,
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

        //  Join all line parts into strings, delimit on '\t'

        const reportLine_AllLines = [];

        let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
        const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

        for ( const reportLineParts of reportLineParts_AllLines ) {

            reportLineParts_AllLinesIndex++;

            let reportLine = reportLineParts.join( "\t" );
            if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
                reportLine += '\n'; // Add '\n' to last line
            }
            reportLine_AllLines.push( reportLine );
        }

        //  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end

        const reportLinesSingleString = reportLine_AllLines.join( '\n' );




        StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportLinesSingleString, filename: 'peptides_for_protein.txt' });
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
		
		//  Join all line parts into strings, delimit on '\t'
		
		const reportLine_AllLines = [];
		
		let reportLineParts_AllLinesIndex = -1; // init to -1 since increment first
		const reportLineParts_AllLinesIndex_Last = reportLineParts_AllLines.length - 1;

		for ( const reportLineParts of reportLineParts_AllLines ) {
			
			reportLineParts_AllLinesIndex++;
			
			let reportLine = reportLineParts.join( "\t" );
			if ( reportLineParts_AllLinesIndex === reportLineParts_AllLinesIndex_Last ) {
				reportLine += '\n'; // Add '\n' to last line
			}
			reportLine_AllLines.push( reportLine );
		}

		//  Join all Lines into single string, delimit on '\n'.  Last line already has '\n' at end
		
		const reportLinesSingleString = reportLine_AllLines.join( '\n' );
		
		return reportLinesSingleString;
	}

    //  NOT CURRENTLY USED.  May be OUT OF DATE
	
    // /**
    //  * Download ALL PSMs for Protein based on current cutoff/filter criteria.
	//  *
	//  * Open URL in new window to download from server
    //  */
    // _downloadPsms_All_ClickHandler() : void {
    //     try {
    //         //  Data in Map
    //         const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
    //             not_filtered_position_modification_selections : true,
    //             proteinSequenceVersionId : undefined,
    //             projectSearchIds : this.props.propsValue.projectSearchIds,
    //             searchSubGroup_Ids_Selected : undefined,
    //             loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
    //             loadedDataCommonHolder : this.state.loadedDataCommonHolder,
    //             proteinSequenceWidget_StateObject : undefined,
    //             modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
    //             reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
    //             peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
    //             peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
    //             userSearchString_LocationsOn_ProteinSequence_Root : null,
    //             proteinPositionFilter_UserSelections_StateObject : this.state.proteinPositionFilter_UserSelections_StateObject
    //         });
    //
    //         const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
    //
    //         //  Build data for serializing to JSON
    //
    //         const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];
    //
    //         for ( const projectSearchId of reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_ProjectSearchIds() ) {
    //
    //             const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )
    //             const reportedPeptideIdsForDisplayData = reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_reportedPeptideIds();
    //
    //             const reportedPeptideIdsAndTheirPsmIds = [];
    //
    //             for ( const reportedPeptideId of reportedPeptideIdsForDisplayData ) {
    //
    //                 const reportedPeptideIdsAndTheirPsmIdsEntry = { reportedPeptideId };
    //                 reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
    //             }
    //
    //             const projectSearchIdsReportedPeptideIdsPsmIds_Entry = { projectSearchId, reportedPeptideIdsAndTheirPsmIds };
    //             projectSearchIdsReportedPeptideIdsPsmIds.push( projectSearchIdsReportedPeptideIdsPsmIds_Entry );
    //         }
    //
    //         if ( projectSearchIdsReportedPeptideIdsPsmIds.length === 0 ) {
    //             throw Error(
    //                 "_downloadPsmsClickHandler_All: No reportedPeptideIds for any projectSearchIds for projectSearchIds: " + this.props.propsValue.projectSearchIds.join(",")
    //             );
    //         }
    //
    //         this._downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } );
    //
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // }


	/**
	 * Download PSMs for Shown Reported Peptides for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
	 */   
    _downloadPsms_Shown_ClickHandler() : void {
        try {
            const searchSubGroup_Ids_Selected : Set<number> = PeptidePage_Display_MainContent_Component_nonClass_Functions.compute_searchSubGroup_Ids_Selected({ propsValue : this.props.propsValue });

            let searchSubGroup_Ids_Selected_Array : Array<number> = undefined;

            if ( searchSubGroup_Ids_Selected ) {
                searchSubGroup_Ids_Selected_Array = Array.from(searchSubGroup_Ids_Selected);
            }

            //  Data in Map
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                not_filtered_position_modification_selections : false,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                searchSubGroup_Ids_Selected,
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

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            //  Build data for serializing to JSON

            const projectSearchIdsReportedPeptideIdsPsmIds : Array<DownloadPSMs_PerProjectSearchId_Entry> = [];

            for ( const projectSearchId of reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_ProjectSearchIds() ) {

                const reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId = reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds.get_EntryFor_projectSearchId( projectSearchId )

                const reportedPeptideIdsAndTheirPsmIds : Array<DownloadPSMs_PerReportedPeptideId> = [];

                for ( const entryFor_reportedPeptideId of reportedPeptideIds_AndTheir_PSM_IDs__ForProjectSearchId.get_Entries_IterableIterator() ) {

                    const reportedPeptideId = entryFor_reportedPeptideId.reportedPeptideId

                    if ( entryFor_reportedPeptideId.psmIds_Include ) {

                        let psmIds_Include = undefined

                        if ( entryFor_reportedPeptideId.psmIds_Include  ) {
                            psmIds_Include = Array.from( entryFor_reportedPeptideId.psmIds_Include )

                            psmIds_Include.sort( (a, b) => {
                                if ( a < b ) {
                                    return -1;
                                }
                                if ( a > b ) {
                                    return 1;
                                }
                                return  0;
                            })
                        }

                        const reportedPeptideIdAndPsmIds : DownloadPSMs_PerReportedPeptideId = {
                            reportedPeptideId,
                            psmIds_Include
                        };

                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdAndPsmIds );

                    } else {

                        //  Not Filtered on specific PSM IDs so No passing PSM IDs to filter on

                        const reportedPeptideIdsAndTheirPsmIdsEntry : DownloadPSMs_PerReportedPeptideId = { reportedPeptideId };
                        reportedPeptideIdsAndTheirPsmIds.push( reportedPeptideIdsAndTheirPsmIdsEntry );
                    }
                }

                const projectSearchIdsReportedPeptideIdsPsmIds_Entry : DownloadPSMs_PerProjectSearchId_Entry =
                    { projectSearchId, reportedPeptideIdsAndTheirPsmIds, searchSubGroup_Ids_Selected : searchSubGroup_Ids_Selected_Array };
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
	 * Download PSMs for Protein.  
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
            this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass.clearAll();

            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            //  NOT Reset this for "Clear All"
            // this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass.clearTreatOpenModMassZeroAsUnmodified_Selection();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

            this.props.propsValue.peptideUnique_UserSelection_StateObject.clearPeptideUnique();
        
            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();

            this.props.propsValue.proteinPositionFilter_UserSelections_StateObject.clearSelections();

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

                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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
            PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ModificationMass_UserSelections_ComponentData({
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

            return { modificationMass_UserSelections_ComponentData };
        });
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
    _modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Update_ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData_ComponentData() {

        let existing_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = this.state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData;

        const modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData : ModificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData =
            modificationMass_OpenModMassZeroNotOpenMod_UserSelection_Build_ComponentData_ForReactComponent({
                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass : this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
            });

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

            let existingState_modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData = state.modificationMass_OpenModMassZeroNotOpenMod_UserSelection_ComponentData;

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
                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });

                        promise.catch( (reason) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

        const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_ReporterIons_UserSelections_ComponentData({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = PeptidePage_Display_MainContent_Component_nonClass_Functions.create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                        promise = PeptidePage_Display_MainContent_Component_nonClass_Functions.load_ProteinCoverage_IfNeeded({
                            projectSearchIds : this.props.propsValue.projectSearchIds,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                        });
                    }
                    if ( promise ) {
                        this._load_ProteinCoverage_InProgress = true;

                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });

                        promise.catch( (reason) => {
                            try {
                                this._load_ProteinCoverage_InProgress = false;

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

    /////
    /**
     * Change to protein sequence position selection
     */
    _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() : void {

        console.warn("Does NOT do everything it needs to Yet: _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback() ")
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

                        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                        });

                        promise.catch( (reason) => {
                            try {
                                this._load_PsmOpenModificationMasses_InProgress = false;

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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

                                this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

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
                                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : null,
                                proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject
                            });
            
                            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : Peptide__single_protein_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
                            

                            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData__SingleProtein({

                                forPeptidePage: true,
                                searchSubGroup_Ids_Selected,
                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
                                modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass: this.props.propsValue.modificationMass_OpenModMassZeroNotOpenMod_UserSelection__CentralStateManagerObjectClass,
                                proteinSequenceVersionId : null,
                                projectSearchIds : this.props.propsValue.projectSearchIds,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                            } );

                            window.setTimeout( () => {
                                try {
                                    // Display Updating message then display new data

                                    this.setState( (state : PeptidePage_Display_MainContent_Component_State, props : PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {
                                        return { updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : true }
                                    });

                                    window.setTimeout( () => {
                                        try {
                                            this.setState( (state : PeptidePage_Display_MainContent_Component_State, props : PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {
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
            proteinSequenceWidget_StateObject : undefined,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : this.state.searchSubGroup_Are_All_SearchSubGroupIds_Selected,
            searchSubGroup_PropValue : this.state.searchSubGroup_PropValue
        };

        this.setState( (state: PeptidePage_Display_MainContent_Component_State, props: PeptidePage_Display_MainContent_Component_Props ) : PeptidePage_Display_MainContent_Component_State => {

            return { peptideFiltersDisplay_ComponentData };
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

                                peptideFiltersDisplay_ComponentData={ this.state.peptideFiltersDisplay_ComponentData }
                                clearAllSelections_Callback={ this._clearAllSelections_BindThis }

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

        // if ( this.props.propsValue.projectSearchIds.length === 1 ) {
        //     modificationMass_CommonRounding_ReturnNumber_Param = undefined;  //  NO Rounding for Single Project Search Id
        // }

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

                        <SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component
                            displayData={ this.state.searchSubGroup_PropValue }
                            searchSubGroup_CentralStateManagerObjectClass={ this.props.propsValue.searchSubGroup_CentralStateManagerObjectClass }
                            searchSubGroup_SelectionsChanged_Callback={ this._searchSubGroup_SelectionsChanged_Callback_BindThis }
                            searchSubGroup_ManageGroupNames_Clicked_Callback={ undefined }
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

                {/*  <PeptideFiltersDisplay>  Moved to under "Peptides:(Click row to expand.)"  */}

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

