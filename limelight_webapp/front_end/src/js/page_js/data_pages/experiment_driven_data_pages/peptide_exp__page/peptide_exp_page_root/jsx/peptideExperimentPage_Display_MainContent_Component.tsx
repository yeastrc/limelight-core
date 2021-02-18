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

import { DataPages_LoggedInUser_CommonObjectsFactory } from 'page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory';

import { SaveView_Create_Component_React_Type, SaveView_Create_Component_React_Result } from 'page_js/data_pages/saveView_React/saveView_Create_Component_React_FunctionTemplate'

import { SharePage_Component } from 'page_js/data_pages/sharePage_React/sharePage_Component_React';

//   Modification Mass Rounding to provide some level of commonality between searches
import {
    modificationMass_CommonRounding_ReturnNumber
} from 'page_js/data_pages/modification_mass_common/modification_mass_rounding';

import { ProteinView_LoadedDataCommonHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { PeptideSequence_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import { PeptideSequence_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

import { ModificationMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import { ModificationMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import { ReporterIonMass_UserSelections_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import { ReporterIonMass_UserSelections_StateObject } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import { ModificationMass_UserSelections_Root } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root';

import { ReporterIonMass_UserSelections } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections';

import { PeptideSequence_UserSelections } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections';

import { PeptideFiltersDisplay } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/jsx/peptideFiltersDisplay';
import { PeptideFiltersDisplay_ComponentData } from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'


import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'


import {
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds,
    DownloadPSMs_PerProjectSearchId_Entry, DownloadPSMs_PerReportedPeptideId
} from 'page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds';


////

import { peptideExperimentPage_Display_MainContent_Component_nonClass_Functions } from '../js/peptideExperimentPage_Display_MainContent_Component_nonClass_Functions';

import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {GeneratedPeptideContents_UserSelections_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/js/generatedPeptideContents_UserSelections_StateObject";
import {GeneratedPeptideContents_UserSelections_Root_Component} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/generated_peptide_contents__user_controls/jsx/generatedPeptideContents_UserSelections_Root_Component";
import {SearchDataLookupParameters_Root} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
import {PeptideUnique_UserSelection} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {
    ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback,
    ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/jsx/proteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component";
import {
    Get_SetDefaultView_Component_React_Type,
    SetDefaultView_Component_React_Params
} from "page_js/data_pages/setDefaultView_React/setDefaultView_Create_Component_React_FunctionTemplate";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ProteinPositionFilter_UserSelections_ComponentData} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_ComponentData";
import {ProteinPositionFilter_UserSelections_StateObject} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject";
import {ProteinPositionFilter_UserSelections} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/jsx/proteinPositionFilter_UserSelections_Component";
import {ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data";
import {ProteinPositionFilter_UserSelections_StateObject_Wrapper} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/protein_position_filter_component/js/proteinPositionFilter_UserSelections_StateObject_Wrapper";
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
import {ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component";
import {
    create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein,
    Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result,
    CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry
} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_multiple_search/protein_page_multiple_searches_single_protein/js/proteinPage_Display_MultipleSearches_SingleProtein_Create_GeneratedReportedPeptideListData";
import {
    create_ExperimentConditions_GraphicRepresentation_SelectedCells__YES__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass,
    ExperimentConditions_GraphicRepresentation_SelectedCells,
    ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections";
import {mainCell_getHoverContents_StandAlone} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_SingleProtein_MainContent_Component_mainCell_getHoverContents_StandAlone";
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from "page_js/data_pages/experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass";
import {Experiment_DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/experiment_data_pages_common/experiment_DataPages_LoggedInUser_CommonObjectsFactory";

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
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass

    peptideExperimentPageRoot_CentralStateManagerObjectClass: PeptideExperimentPageRoot_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinPositionFilter_UserSelections_StateObject : ProteinPositionFilter_UserSelections_StateObject;

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

    proteinPositionFilter_UserSelections_StateObject_Wrapper? : ProteinPositionFilter_UserSelections_StateObject_Wrapper;

    searchDataLookupParamsRoot? : SearchDataLookupParameters_Root;

    mainDisplayData_Loaded? : boolean;

    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds? : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder? : ProteinView_LoadedDataCommonHolder

    psmCountForUnfilteredDisplay? : string;

    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data? : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data;
    proteinPositionFilter_UserSelections_ComponentData? : ProteinPositionFilter_UserSelections_ComponentData;

    peptideFiltersDisplay_ComponentData? : PeptideFiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;  //  For displaying the peptide list in sub component

    create_GeneratedReportedPeptideListData_Result? : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result;  //  For displaying the peptide list in sub component

    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

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
export class PeptideExperimentPage_Display_MainContent_Component extends React.Component< PeptideExperimentPage_Display_MainContent_Component_Props, PeptideExperimentPage_Display_MainContent_Component_State > {

    //  bind to 'this' for passing as parameters

    private _selectedConditionsChanged_Callback_BindThis = this._selectedConditionsChanged_Callback.bind(this);

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);

    private _DO_NOT_CALL() { //  Test Cast of method
        const mainCell_getHoverContents: ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;
    }
    //
    // private _downloadPeptides_All_ClickHandler_BindThis = this._downloadPeptides_All_ClickHandler.bind(this);
    // private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    // private _downloadPsms_All_ClickHandler_BindThis = this._downloadPsms_All_ClickHandler.bind(this);
    // private _downloadPsms_Shown_ClickHandler_BindThis = this._downloadPsms_Shown_ClickHandler.bind(this);
    //
    // private _NOT_CALLED_Function() {
    //
    //     //  Test function cast
    //
    //     const downloadPeptides_Shown_ClickHandler_CastTest : ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPeptides_Shown_ClickHandler_Callback = this._downloadPeptides_Shown_ClickHandler;
    //     const downloadPsms_All_ClickHandler_CastTest : ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component__downloadPSMs_Shown_ClickHandler_Callback = this._downloadPsms_Shown_ClickHandler;
    // }

    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject.bind(this);
    private _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback_BindThis = this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback.bind(this);


    private _updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback.bind(this);

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress
    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress
    private _load_ProteinCoverage_InProgress = false;  //  Flag that Loading Protein Coverage is In Progress

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinPage_Display_MultipleSearches_SingleProtein_GeneratedReportedPeptideListSection_Component>

    /**
     * 
     */    
    constructor(props : PeptideExperimentPage_Display_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();

        this._proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();


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

        this.state = {
            projectSearchIds_PossiblyFiltered,
            graphicRepresentation_SelectedCells,
            searchDataLookupParamsRoot,
            saveView_Component_React,
            saveView_Component_Props_Prop
        };
    }

    /**
     * 
     */   
    componentDidMount() {
        try {
            window.setTimeout( () => {
                try {
                    this._recompute_FullPage_Except_SearchDetails();

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
    private _recompute_FullPage_Except_SearchDetails() {

        //  New variable to populate and put in state
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder> = new Map();
        const loadedDataCommonHolder = new ProteinView_LoadedDataCommonHolder();

        let proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper = null;

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
                proteinPositionFilter_UserSelections_StateObject_Wrapper = new ProteinPositionFilter_UserSelections_StateObject_Wrapper({
                    proteinPositionFilter_UserSelections_StateObject : this.props.propsValue.proteinPositionFilter_UserSelections_StateObject,
                    projectSearchIds : this.props.propsValue.projectSearchIds,
                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
                });

                const promises_Load_ = [];
                const modificationMass_UserSelections_StateObject = this.props.propsValue.modificationMass_UserSelections_StateObject;

                if ( modificationMass_UserSelections_StateObject.get_OpenModificationSelections()
                    && modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected() ) {

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
                    this._recompute_FullPage_Except_ExperimentGraphic__SubPart({
                        proteinPositionFilter_UserSelections_StateObject_Wrapper,
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
                            this._recompute_FullPage_Except_ExperimentGraphic__SubPart({
                                proteinPositionFilter_UserSelections_StateObject_Wrapper,
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

    private _recompute_FullPage_Except_ExperimentGraphic__SubPart(
        {
            proteinPositionFilter_UserSelections_StateObject_Wrapper,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } : {
            proteinPositionFilter_UserSelections_StateObject_Wrapper : ProteinPositionFilter_UserSelections_StateObject_Wrapper
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
            loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
        }
    ) : void {

        const {
            psmCountForUnfiltered,
            modificationMass_UserSelections_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            proteinPositionFilter_UserSelections_ComponentData,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

        } :  {
            psmCountForUnfiltered : number,
            modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
            reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData;
            peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : ProteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data
            proteinPositionFilter_UserSelections_ComponentData? : ProteinPositionFilter_UserSelections_ComponentData;
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

        }  = peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.compute_FullPage_Except_ExperimentGraphic({

            propsValue : this.props.propsValue,
            projectSearchIds_All : this.props.propsValue.projectSearchIds,
            projectSearchIds_PossiblyFiltered : this.state.projectSearchIds_PossiblyFiltered,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject_Wrapper : proteinPositionFilter_UserSelections_StateObject_Wrapper
        });

        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject_Wrapper : proteinPositionFilter_UserSelections_StateObject_Wrapper,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            proteinSequenceWidget_StateObject : undefined,  //  NOT USED on Peptide Page
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : undefined,
            searchSubGroup_PropValue : undefined
        };

        const psmCountForUnfilteredDisplay = psmCountForUnfiltered.toLocaleString();

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result =
            create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein({

                searchSubGroup_Ids_Selected : undefined,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
                proteinSequenceVersionId : undefined,  //  NOT USED on Peptide Page
                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder,
            } );

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return {
                mainDisplayData_Loaded : true,

                proteinPositionFilter_UserSelections_StateObject_Wrapper,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder,

                psmCountForUnfilteredDisplay,

                modificationMass_UserSelections_ComponentData,
                reporterIons_UserSelections_ComponentData,
                peptideUnique_UserSelection_ComponentData,
                peptideSequence_UserSelections_ComponentData,
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
                proteinPositionFilter_UserSelections_ComponentData,
                peptideFiltersDisplay_ComponentData,

                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                create_GeneratedReportedPeptideListData_Result,
            };
        });
    }

	/**
	 * 
	 */
	_downloadPeptides_All_ClickHandler() : void {
	    try {
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call

                not_filtered_position_modification_selections : true, //  Required to be true for Download "All"
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                searchSubGroup_Ids_Selected : undefined,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.state.loadedDataCommonHolder,

                //  Passed since required but not used since passing not_filtered_position_modification_selections : true

                proteinSequenceWidget_StateObject : undefined,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : null,
                proteinPositionFilter_UserSelections_StateObject_Wrapper : this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper
            });

            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;

            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein({

                searchSubGroup_Ids_Selected : undefined,
                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,

                generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,

                proteinSequenceVersionId : undefined,
                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
            } );

            const peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

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
	_downloadPeptides_Shown_ClickHandler() : void {

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = this.state.create_GeneratedReportedPeptideListData_Result;
        
        const peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

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
        peptideList : Array<CreateReportedPeptideDisplayData_MultipleSearch_SingleProtein_Result_PeptideList_Entry>
    
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

	
    /**
     * Download ALL PSMs for Protein based on current cutoff/filter criteria.  
	 * 
	 * Open URL in new window to download from server
     */    
    _downloadPsms_All_ClickHandler() : void {
        try {
            //  Data in Map
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                not_filtered_position_modification_selections : true,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                searchSubGroup_Ids_Selected : undefined,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                proteinSequenceWidget_StateObject : undefined,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : null,
                proteinPositionFilter_UserSelections_StateObject_Wrapper : this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper
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
                    "_downloadPsmsClickHandler_All: No reportedPeptideIds for any projectSearchIds for projectSearchIds: " + this.props.propsValue.projectSearchIds.join(",")
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
    _downloadPsms_Shown_ClickHandler() : void {
        try {
            //  Data in Map
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                not_filtered_position_modification_selections : false,
                proteinSequenceVersionId : undefined,
                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                searchSubGroup_Ids_Selected : undefined,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                proteinSequenceWidget_StateObject : undefined,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : null,
                proteinPositionFilter_UserSelections_StateObject_Wrapper : this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper
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
                    { projectSearchId, reportedPeptideIdsAndTheirPsmIds, searchSubGroup_Ids_Selected : undefined };
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
            this.props.propsValue.modificationMass_UserSelections_StateObject.clear_selectedModifications();

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();

            this.props.propsValue.peptideUnique_UserSelection_StateObject.clearPeptideUnique();
        
            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();

            this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper.clearSelections();

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
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();
            
                            this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();

                            this._peptideUnique_Update_PeptideUnique_UserSelection_ComponentData();
            
                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();

                            this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_ComponentData();

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
            this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback();
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
     * Change to Protein Position Filter Selections, this.props.propsValue.updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback
     */
    _updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback() : void {
        try {
            window.setTimeout( () => {
                try {
                    this._selectedProteinPositionFilterChange_UpdateURL();  //  Update URL

                    this._proteinPositionFilter_Update_proteinPositionFilter_UserSelections_ComponentData();

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
    _proteinPositionFilter_Update_proteinPositionFilter_UserSelections_ComponentData() {

        const proteinPositionFilter_UserSelections_ComponentData : ProteinPositionFilter_UserSelections_ComponentData =
            peptideExperimentPage_Display_MainContent_Component_nonClass_Functions.create_ProteinPositionFilter_UserSelections_ComponentData({
                proteinPositionFilter_UserSelections_StateObject_Wrapper : this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper,
                proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.state.loadedDataCommonHolder
        });

        this.setState( (state: PeptideExperimentPage_Display_MainContent_Component_State, props: PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {

            return { proteinPositionFilter_UserSelections_ComponentData };
        });
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
                    this._selected_generatedPeptideContents_UserSelections_Change_UpdateURL();

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

        const encodedStateData = this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper.getEncodedStateData();
        this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.set_proteinPositionFilter_UserSelections_EncodedStateData({ proteinPositionFilter_UserSelections_EncodedStateData : encodedStateData });
    }

    /**
     * Update State to URL for Generated Peptide Contents selection change
     */
    _selected_generatedPeptideContents_UserSelections_Change_UpdateURL() {

        const encodedStateData = this.props.propsValue.generatedPeptideContents_UserSelections_StateObject.getEncodedStateData();
        this.props.propsValue.peptideExperimentPageRoot_CentralStateManagerObjectClass.setGeneratedPeptideContentsSelectedEncodedStateData( { generatedPeptideContentsSelectedEncodedStateData : encodedStateData } );
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
                                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : null,
                                proteinPositionFilter_UserSelections_StateObject_Wrapper : this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper
                            });
            
                            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;


                            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein_Result = create_GeneratedReportedPeptideListData_MultipleSearch_SingleProtein({

                                searchSubGroup_Ids_Selected : undefined,
                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                generatedPeptideContents_UserSelections_StateObject : this.props.propsValue.generatedPeptideContents_UserSelections_StateObject,
                                proteinSequenceVersionId : null,
                                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.state.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.state.loadedDataCommonHolder,
                            } );

                            window.setTimeout( () => {
                                try {
                                    if ( create_GeneratedReportedPeptideListData_Result.peptideList_Length > 300 ) { //  The cutoff number is an arbitrary guess
                                        //  Since going to take a while to put new peptide list in DOM, show updating message first, then update peptide list
            
                                        this.setState( (state : PeptideExperimentPage_Display_MainContent_Component_State, props : PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {
                                            return { updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : true }
                                        });
            
                                        window.setTimeout( () => {
                                            try {
                                                this.setState( (state : PeptideExperimentPage_Display_MainContent_Component_State, props : PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {
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
                                        }, 0 );
                                    } else {
                                        //  Should not take long to update DOM for new peptide list so do directly
                                        this.setState( (state : PeptideExperimentPage_Display_MainContent_Component_State, props : PeptideExperimentPage_Display_MainContent_Component_Props ) : PeptideExperimentPage_Display_MainContent_Component_State => {
                                            return { 
                                                updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : false,
                                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                                create_GeneratedReportedPeptideListData_Result
                                            }
                                        });
                                    }
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
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinPositionFilter_UserSelections_StateObject_Wrapper : this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper,
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : this.state.proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data,
            proteinSequenceWidget_StateObject : undefined,
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : undefined,
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

        let filterOnSection : JSX.Element = null;
        let generatedPeptideContents_UserSelections_Root_Component : JSX.Element = null;

        if ( this.state.mainDisplayData_Loaded ) {

            filterOnSection = this._render_FilterOn({  })

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


            generatedPeptideContents_UserSelections_Root_Component = (

                <div style={{ marginTop:10, marginBottom: 10 }}>

                    <GeneratedPeptideContents_UserSelections_Root_Component
                        generatedPeptideContents_UserSelections_StateObject={ this.props.propsValue.generatedPeptideContents_UserSelections_StateObject }
                        searchContains_VariableModifications={ searchContains_VariableModifications }
                        searchContains_OpenModifications={ searchContains_OpenModifications }
                        searchContains_StaticModifications={ searchContains_StaticModifications }
                        updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback={ this._updateMadeTo_generatedPeptideContents_UserSelections_StateObject_Callback_BindThis  }
                    />
                </div>
            );
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
                            <h3>List Peptides</h3>

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

                        { filterOnSection }

                    </div>  {/* END: Main Content above Reported Peptides  */}

                    { generatedPeptideContents_UserSelections_Root_Component }


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
                            ref={ this._proteinPage_Display_MultipleSearches__SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref }> {/* ref to allow measuring width of component */}

                            <ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component

                                showProteins={ true }

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

                                // downloadPeptides_Shown_ClickHandler={ this._downloadPeptides_Shown_ClickHandler_BindThis }
                                // downloadPsms_Shown_ClickHandler={ this._downloadPsms_Shown_ClickHandler_BindThis }

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
    private _render_FilterOn(
        {

        } : {

        }
    ) : JSX.Element{

        let modificationMass_CommonRounding_ReturnNumber_Param = modificationMass_CommonRounding_ReturnNumber;

        if ( this.props.propsValue.projectSearchIds.length === 1 ) {
            modificationMass_CommonRounding_ReturnNumber_Param = undefined;  //  NO Rounding for Single Project Search Id
        }

        return (

            <React.Fragment>

                <div style={ { } } > {/*marginBottom: 10*/}

                    <div className=" filter-common-block-selection-container-block ">

                        <ModificationMass_UserSelections_Root
                            openModification_OpenSelectMassOverlay_Override_Callback={ this._openModificationMass_OpenUserSelections_Overlay_Override_BindThis }
                            modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                            modificationMass_UserSelections_StateObject={ this.props.propsValue.modificationMass_UserSelections_StateObject } // Updated in the component
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
                            proteinPositionFilter_UserSelections_ComponentData={ this.state.proteinPositionFilter_UserSelections_ComponentData }
                            proteinPositionFilter_UserSelections_StateObject_Wrapper={ this.state.proteinPositionFilter_UserSelections_StateObject_Wrapper }
                            updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback={ this._updateMadeTo_proteinPositionFilter_UserSelections_StateObject_Wrapper_Callback_BindThis }
                        />
                    </div>

                </div>

                {/* Display of User Selected Modifications and Protein Positions filtering on  */}

                <PeptideFiltersDisplay
                    peptideFiltersDisplay_ComponentData={ this.state.peptideFiltersDisplay_ComponentData }
                    clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                />
            </React.Fragment>
        )
    }

}


