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
//   Reporter Ion Mass Rounding to provide some level of commonality between searches

import {Experiment_ConditionGroupsContainer} from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import {ProteinView_LoadedDataCommonHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataCommonHolder';
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

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

import {ProteinSequenceWidgetDisplay_Component_Data} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidgetDisplay_Component_Data';
import {ProteinSequenceWidget_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/protein_sequence_display_widget/js/proteinSequenceWidget_StateObject';

import {UserSearchString_LocationsOn_ProteinSequence_Root} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/userSearchString_LocationsOn_ProteinSequence/userSearchString_LocationsOn_ProteinSequence_ComponentData';

import {PeptideSequence_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_StateObject';
import {PeptideSequence_UserSelections_ComponentData} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/js/peptideSequence_UserSelections_ComponentData';

import {ModificationMass_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_StateObject';
import {ModificationMass_UserSelections_ComponentData} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_ComponentData';

import {ReporterIonMass_UserSelections_ComponentData} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_BuildData_ForReactComponent';
import {ReporterIonMass_UserSelections_StateObject} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/js/reporterIonMass_UserSelections_StateObject';

import {ModificationMass_UserSelections_Root} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/jsx/modificationMass_UserSelections_Root';

import {ReporterIonMass_UserSelections} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reporter_ions_user_selections/jsx/reporterIonMass_UserSelections';

import {PeptideSequence_UserSelections} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_sequence_selected/jsx/peptideSequence_UserSelections';

import {ProteinSequenceWidgetDisplay_Root_Component_React} from '../protein_sequence_display_widget/jsx/proteinSequenceWidgetDisplay_Root_Component_React'

import {PeptideFiltersDisplay} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/jsx/peptideFiltersDisplay';
import {PeptideFiltersDisplay_ComponentData} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_filters_display/js/peptideFiltersDisplay_ComponentData'


import {
    getReportedPeptideIdsForDisplay_AllProjectSearchIds,
    ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds
} from 'page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/reported_peptide_ids_for_display/proteinExpmntPage_getReportedPeptideIds_From_SelectionCriteria_AllProjectSearchIds'


import {
    DownloadPSMs_PerConditionGroupConditionData,
    DownloadPSMs_PerProjectSearchId_Entry,
    downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds
} from 'page_js/data_pages/experiment_driven_data_pages/common__experiment_driven_data_pages/psm_downloadForCriteria_ExperimentData_OptionalRepPepIdsProtSeqVIds';
import {
    create_ModificationMass_UserSelections_ComponentData,
    create_PeptideSequence_UserSelections_ComponentData,
    create_ProteinSequenceWidgetDisplay_Component_Data,
    create_ReporterIons_UserSelections_ComponentData,
    initialPopulate,
    LinksToExternalResources, load_OpenModificationMasses_IfNeeded,
    load_ReporterIonMasses_IfNeeded
} from './proteinExperimentPage_SingleProtein_MainContent_Component_nonClass_Functions';

import {mainCell_getHoverContents_StandAlone} from './proteinExperimentPage_SingleProtein_MainContent_Component_mainCell_getHoverContents_StandAlone'

import {ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component} from './proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component';

import {
    create_GeneratedReportedPeptideListData,
    Create_GeneratedReportedPeptideListData_Result,
    CreateReportedPeptideDisplayData_Result_Entry
} from '../js/proteinExperimentPage_SingleProtein_Create_GeneratedReportedPeptideListData';
import {Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass} from '../../../../experiment_data_pages_common/experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass';
import {ProteinExperimentPage_SingleProtein_ProteinNameDescription_Component} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/jsx/proteinExperimentPage_SingleProtein_ProteinNameDescription_Component";
import {ModificationMass_UserSelections_DisplayMassSelectionOverlay} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/modification_mass_user_selections/js/modificationMass_UserSelections_DisplayMassSelectionOverlay";
import {load_PsmOpenModificationMasses_IfNeeded} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/load_PsmOpenModificationMasses_IfNeeded_To_loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds";
import {PeptideUnique_UserSelection_StateObject} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_StateObject";
import {PeptidePage_Display_MainContent_Component_Props} from "page_js/data_pages/project_search_ids_driven_pages/peptide_page/peptidePage_Display_MainContent_Component";
import {PeptideUnique_UserSelection} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/jsx/peptideUnique_UserSelection";
import {PeptideUnique_UserSelection_ComponentData} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_ComponentData";
import {peptideUnique_UserSelection_BuildData_ForReactComponent} from "page_js/data_pages/experiment_driven_data_pages/protein_exp__page/protein_exp_page_single_protein/peptide_unique_user_filter_selection/js/peptideUnique_UserSelection_BuildData_ForReactComponent";
import {
    Experiment_ConditionGroupLabel_and_ConditionLabel,
    experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId
} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId";


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
export interface ProteinExperimentPage_SingleProtein_MainContent_Component_closeOverlayClickHandler {
    () : void
}

/**
 * 
 */
export class ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop {

    experimentId : number;
    experimentName : string;
    projectSearchIds : Array<number>;

    experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData;
    experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass : Experiment_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass
    // selectedConditionIdsUpdated_Callback

    proteinSequenceVersionId : number;
    proteinNames : string;
    proteinDescriptions : string
    proteinSequenceString : string
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : Map<number, ProteinViewPage_LoadedDataPerProjectSearchIdHolder>
    loadedDataCommonHolder : ProteinView_LoadedDataCommonHolder
    dataPageStateManager : DataPageStateManager
    searchNamesMap_KeyProjectSearchId : SearchNames_AsMap;
    searchDataLookupParamsRoot;
    
    singleProtein_ExpPage_CentralStateManagerObjectClass : SingleProtein_ExpPage_CentralStateManagerObjectClass
    modificationMass_UserSelections_StateObject : ModificationMass_UserSelections_StateObject;
	reporterIonMass_UserSelections_StateObject : ReporterIonMass_UserSelections_StateObject;
    peptideUnique_UserSelection_StateObject : PeptideUnique_UserSelection_StateObject;
	peptideSequence_UserSelections_StateObject : PeptideSequence_UserSelections_StateObject;
    proteinSequenceWidget_StateObject : ProteinSequenceWidget_StateObject;
    
    experiment_DataPages_LoggedInUser_CommonObjectsFactory : Experiment_DataPages_LoggedInUser_CommonObjectsFactory
}

/**
 * 
 */
export interface ProteinExperimentPage_SingleProtein_MainContent_Component_Props {

    propsValue : ProteinExperimentPage_SingleProtein_MainContent_Component_Props_Prop

    // view_single_protein_inner_overlay_div
    view_single_protein_inner_overlay_div_Width_Initial : number;
    setWidth__view_single_protein_inner_overlay_div // Function in Root Component Class _setWidth__view_single_protein_inner_overlay_div({ width } : { width : number })

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

    linksToExternalResources? : LinksToExternalResources;
    protein_fractionCovered_Unfiltered? : number;
    protein_percentageCovered_Unfiltered_Rounded? : string;
    psmCountForUnfilteredDisplay? : string;

    modificationMass_UserSelections_ComponentData? : ModificationMass_UserSelections_ComponentData; // Only updated when new updated need to push new values from above components
    reporterIons_UserSelections_ComponentData? : ReporterIonMass_UserSelections_ComponentData;
    peptideUnique_UserSelection_ComponentData? : PeptideUnique_UserSelection_ComponentData;
    peptideSequence_UserSelections_ComponentData? : PeptideSequence_UserSelections_ComponentData;
    userSearchString_LocationsOn_ProteinSequence_Root? : UserSearchString_LocationsOn_ProteinSequence_Root;
    proteinSequenceWidgetDisplay_Component_Data? : ProteinSequenceWidgetDisplay_Component_Data;
    sequenceCoverageBooleanArray_Unfiltered? : Array<boolean>;
    peptideFiltersDisplay_ComponentData? : PeptideFiltersDisplay_ComponentData;

    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;  //  For displaying the peptide list in sub component

    create_GeneratedReportedPeptideListData_Result? : Create_GeneratedReportedPeptideListData_Result;  //  For displaying the peptide list in sub component

    updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds? : boolean;

    //  User made a selection that resulted in a AJAX request for data.  Page update for filtered Peptides will wait for the AJAX to complete.  Display message loading data.
    gettingDataFor_Filtering_reportedPeptideIdsForDisplay? : boolean;

    graphicRepresentation_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells

    saveView_Component_React? //  React Component for Save View
    saveView_Component_Props_Prop? //  Object passed to saveView_Component_React as property propsValue
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

    private _DO_NOT_CALL() { //  Test Cast of method
        const mainCell_getHoverContents: ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;
    }

    //  bind to 'this' for passing as parameters

    private _resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this);

    private _downloadPeptides_All_ClickHandler_BindThis = this._downloadPeptides_All_ClickHandler.bind(this);
    private _downloadPeptides_Shown_ClickHandler_BindThis = this._downloadPeptides_Shown_ClickHandler.bind(this);
    private _downloadPsms_All_ClickHandler_BindThis = this._downloadPsms_All_ClickHandler.bind(this);
    private _downloadPsms_Shown_ClickHandler_BindThis = this._downloadPsms_Shown_ClickHandler.bind(this);

    private _clearAllSelections_BindThis = this._clearAllSelections.bind(this);

    private _openModificationMass_OpenUserSelections_Overlay_Override_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_Override.bind(this)
    private _openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback_BindThis : () => void = this._openModificationMass_OpenUserSelections_Overlay_SelectionChangedCallback.bind(this)

    private _modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback_BindThis : () => void = this._modificationMass_UserSelections_UpdateMadeTo_StateObject_Callback.bind(this);
    private _modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback_BindThis : () => void = this._modificationMass_Update_modificationMass_UserSelections_ComponentData_Callback.bind(this);

    private _updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback.bind(this);
    private _updateMadeTo_peptideUnique_UserSelection_StateObject_Callback_BindThis : () => void = this._updateMadeTo_peptideUnique_UserSelection_StateObject_Callback.bind(this);

    private _updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis : ({ 
        userSearchString_LocationsOn_ProteinSequence_Root 
    } : { 
        userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root
    }) => void = this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root.bind(this);

    private _updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback_BindThis : () => void = this._updateMadeTo_proteinSequenceWidgetDisplay_UserSelections_StateObject_Callback.bind(this);

    private _load_PsmOpenModificationMasses_InProgress = false;  //  Flag that Loading PSM Open Modification Masses is In Progress
    private _load_ReporterIonMasses_InProgress = false;  //  Flag that Loading Reporter Ion Masses is In Progress

    private _div_MainGridAtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Main <div> containing grid of left and on right the boxes Summary ...
    private _div_MainContent_LeftGridEntry_AtTop_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for Left <div> inside this._div_MainGridAtTop_Ref

    private _proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinSequenceWidgetDisplay_Root_Component_React>

    private _proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div> around <ProteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component>

    private _domMutationObserver_reported_peptides_outer_container : MutationObserver;

    private _updated_OverlayWidth = undefined;  // Updated whenever call function in parent Component to update width of overlay

    private _width_LeftGridEntry_TopMainSection_LastUpdatedValue = undefined;  // Updated whenever update width left grid entry Top Main Section

    /**
     * 
     */    
    constructor(props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props) {
        super(props);

        this._div_MainGridAtTop_Ref = React.createRef<HTMLDivElement>();
        this._div_MainContent_LeftGridEntry_AtTop_Ref = React.createRef<HTMLDivElement>();
        this._proteinSequenceWidgetDisplay_Root_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        this._proteinExperimentPage_SingleProtein_GeneratedReportedPeptideListSection_Component_React_Container_Ref = React.createRef<HTMLDivElement>();

        let projectSearchIds_PossiblyFiltered : Array<number> = props.propsValue.projectSearchIds;

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

        const {
            linksToExternalResources,
            protein_fractionCovered_Unfiltered,
            psmCountForUnfiltered,
            modificationMass_UserSelections_ComponentData,
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            userSearchString_LocationsOn_ProteinSequence_Root,
            proteinSequenceWidgetDisplay_Component_Data,
            sequenceCoverageBooleanArray_Unfiltered,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

        } :  {
            linksToExternalResources : LinksToExternalResources,
            protein_fractionCovered_Unfiltered : number,
            psmCountForUnfiltered : number,
            modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData,
            reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData : PeptideUnique_UserSelection_ComponentData
            peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData,
            userSearchString_LocationsOn_ProteinSequence_Root : UserSearchString_LocationsOn_ProteinSequence_Root,
            proteinSequenceWidgetDisplay_Component_Data : ProteinSequenceWidgetDisplay_Component_Data,
            sequenceCoverageBooleanArray_Unfiltered : Array<boolean>,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds

        }  = initialPopulate({

            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            proteinSequenceString : this.props.propsValue.proteinSequenceString,
            projectSearchIds_All : this.props.propsValue.projectSearchIds,
            projectSearchIds_PossiblyFiltered : projectSearchIds_PossiblyFiltered,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
            graphicRepresentation_SelectedCells : graphicRepresentation_SelectedCells
        });


        const peptideFiltersDisplay_ComponentData : PeptideFiltersDisplay_ComponentData = {
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : undefined,
            searchSubGroup_PropValue : undefined,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : undefined,
            proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined,  // Peptide Page Only
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : undefined,  // Peptide Page Only
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
        
        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_Result = create_GeneratedReportedPeptideListData({

            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            reporterIonMassesSelected : this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet(),
            staticModificationMassesToFilterOn : this.props.propsValue.modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set(),
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchIds : projectSearchIds_PossiblyFiltered,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
        } );

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
            linksToExternalResources,
            protein_fractionCovered_Unfiltered,
            protein_percentageCovered_Unfiltered_Rounded,
            psmCountForUnfilteredDisplay,
            modificationMass_UserSelections_ComponentData, 
            reporterIons_UserSelections_ComponentData,
            peptideUnique_UserSelection_ComponentData,
            peptideSequence_UserSelections_ComponentData,
            userSearchString_LocationsOn_ProteinSequence_Root, 
            proteinSequenceWidgetDisplay_Component_Data,
            sequenceCoverageBooleanArray_Unfiltered,
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList: reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            create_GeneratedReportedPeptideListData_Result,
            peptideFiltersDisplay_ComponentData,
            graphicRepresentation_SelectedCells,
            saveView_Component_React, 
            saveView_Component_Props_Prop
        };
    }

    /**
     * 
     */   
    componentDidMount() {
        try {
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

            this._resizeWindow_Handler_Attach();

        } catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
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
            this._resizeWindow_Handler_Remove();

            this._remove_MutationObserver_From_reported_peptides_outer_container();
            
        } catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
    }

	/**
	 * 
	 */
	private _resizeWindow_Handler_Attach() : void {

		//  Attach resize handler
		window.addEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}

	/**
	 * 
	 */
	private _resizeWindow_Handler_Remove() : void {

		//  Remove resize handler
		window.removeEventListener( "resize", this._resizeWindow_Handler_BindThis );
	}
	
	/**
	 * copied to this._resizeWindow_Handler_BindThis = this._resizeWindow_Handler.bind(this) in constructor
	 */
	private _resizeWindow_Handler() : void {
		try {
			// this._adjustBoxesOnRight_So_AtRigthtEdgeOfViewPort();

		} catch( e ) {
			console.log("Exception caught in _resizeWindow_Handler()");
			console.log( e );
			reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
			throw e;
		}
	}

    /**
     * 
     */
    _selectedConditionsChanged_Callback( params : ExperimentConditions_GraphicRepresentation_SelectedCells_SelectedConditionsChanged_CallbackParams ) {
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
	_downloadPeptides_All_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        const proteinSequenceVersionId = this.props.propsValue.proteinSequenceVersionId;
        const projectSearchIds = this.props.propsValue.projectSearchIds;
        const loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds = this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds;
        const loadedDataCommonHolder = this.props.propsValue.loadedDataCommonHolder;

        const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
            
            not_filtered_position_modification_selections : true, //  Required to be true for Download "All"

            proteinSequenceVersionId,
            projectSearchIds,
            searchSubGroup_Ids_Selected : undefined,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder,

            //  Passed since required but not used since passing not_filtered_position_modification_selections : true

            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : undefined,
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
            proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined
        });

        const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
        

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_Result = create_GeneratedReportedPeptideListData({ 
    
            reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds, 

            //  Pass undefined for selections to download All
            reporterIonMassesSelected : undefined, // this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected(), 
            staticModificationMassesToFilterOn : undefined, // this.props.propsValue.modificationMass_UserSelections_StateObject.get_StaticModifications_Selected(), 

            proteinSequenceVersionId,
            projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            loadedDataCommonHolder
        } );

        const peptideList : Array<CreateReportedPeptideDisplayData_Result_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

        const reportedPeptideDisplayDownloadDataAsString : string = this.createReportedPeptideDisplayDownloadDataAsString({
            peptideList
        });

        StringDownloadUtils.downloadStringAsFile({ stringToDownload : reportedPeptideDisplayDownloadDataAsString, filename: 'peptides_for_protein.txt' });
	}

	/**
	 * 
	 */
	_downloadPeptides_Shown_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {

        const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_Result = this.state.create_GeneratedReportedPeptideListData_Result;
        
        const peptideList : Array<CreateReportedPeptideDisplayData_Result_Entry> = create_GeneratedReportedPeptideListData_Result.peptideList

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
        peptideList : Array<CreateReportedPeptideDisplayData_Result_Entry>
    
    }) : string {

        // This is totally broken as it is designed for the OLD Table format

        const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } = this._getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId_ForPSMDownloads();

        //  For getting search info for projectSearchIds
        //   searchNamesKeyProjectSearchId is Map with key are projectSearchId as type number
		const searchNamesMap_KeyProjectSearchId = this.props.propsValue.dataPageStateManager.get_searchNames_AsMap();


		//  Array of Arrays of reportLineParts
		const reportLineParts_AllLines = []; //  Lines will be joined with separator '\n' with '\n' added to last line prior to join
		
		//  reportLineParts will be joined with separator '\t'

		//  Header Line
		{
            const reportLineParts = [ 'Search Id', 'Search Name', 'Sequence', 'PSM Count' ];
            
            for ( const conditionGroupLabel of conditionGroupLabels_Only_InSameOrder ) {

                reportLineParts.push( conditionGroupLabel );
            }

			reportLineParts_AllLines.push( reportLineParts );
		}

        //  Data Lines - One line per peptideSequenceDisplay / Search Id

		for ( const peptideItem of peptideList ) {

            for ( const mapEntry of peptideItem.psmCountsMap_KeyProjectSearchId.entries() ) {

                const projectSearchId = mapEntry[ 0 ];
                const psmCount = mapEntry[ 1 ];

                const searchNameEntry = searchNamesMap_KeyProjectSearchId.get( projectSearchId ); //   searchNamesKeyProjectSearchId is Object with property names are projectSearchId as type number
                if ( ! searchNameEntry ) {
                    const msg = "createReportedPeptideDisplayDownloadDataAsString: No value in searchNamesKeyProjectSearchId for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                const searchId = searchNameEntry.searchId;
                const searchName = searchNameEntry.name;

                const reportLineParts = [
                    searchId.toString(),
                    searchName,
                    peptideItem.peptideSequenceDisplay,
                    psmCount.toString()
                ];

                const conditionGroupLabel_and_ConditionLabel_Data = conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId.get( projectSearchId );
                if ( ! conditionGroupLabel_and_ConditionLabel_Data ) {
                    const msg = "createReportedPeptideDisplayDownloadDataAsString: No value in conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId for projectSearchId: " + projectSearchId;
                    console.warn( msg );
                    throw Error( msg );
                }

                for ( const conditionGroupLabel_and_ConditionLabel_Data_Entry of conditionGroupLabel_and_ConditionLabel_Data ) {

                    reportLineParts.push( conditionGroupLabel_and_ConditionLabel_Data_Entry.conditionLabel );
                }
                
			    reportLineParts_AllLines.push( reportLineParts );
			}
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
    _downloadPsms_All_ClickHandler( event : React.MouseEvent<HTMLHeadingElement, MouseEvent> ) : void {
        try {

            const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } = this._getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId_ForPSMDownloads();

            //  Data in Map
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                not_filtered_position_modification_selections : true,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                searchSubGroup_Ids_Selected : undefined,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : undefined,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined
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
            const { conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId, conditionGroupLabels_Only_InSameOrder } = this._getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId_ForPSMDownloads();

            //  Data in Map
            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                not_filtered_position_modification_selections : false,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                searchSubGroup_Ids_Selected : undefined,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                peptideUnique_UserSelection_StateObject : undefined,
                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined
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
	 * Get Condition Group Label and Condition Label Map Key ProjectSearchId.
	 * 
	 * 
	 */
	private _getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId_ForPSMDownloads() : {

        conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId : Map<number, Array<DownloadPSMs_PerConditionGroupConditionData>>,
        conditionGroupLabels_Only_InSameOrder : Array<string>
    } {

        const {
            conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId,
            conditionGroupLabels_Only_InSameOrder
        } =
            experiment_getConditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId({
                conditionGroupsContainer : this.props.propsValue.conditionGroupsContainer,
                conditionGroupsDataContainer : this.props.propsValue.conditionGroupsDataContainer
            });

        return {
            conditionGroupLabel_and_ConditionLabel_Data_Map_Key_ProjectSearchId,
            conditionGroupLabels_Only_InSameOrder
        };
    }

	/**
	 * Download PSMs for Protein.  
	 * 
	 * Don't have all PSMs in memory and may be many so open URL in new window to download from server
	 */
	_downloadPsms( { projectSearchIdsReportedPeptideIdsPsmIds } ) {
		
        downloadPsmsFor_projectSearchIds_FilterCriteria_ExperimentData_RepPeptProtSeqVIds( {  // External Function
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

            this.props.propsValue.reporterIonMass_UserSelections_StateObject.clear_selectedReporterIons();
        
            this.props.propsValue.peptideSequence_UserSelections_StateObject.clearPeptideSearchStrings();
        
            //     In ProteinViewPage_RootClass_Common, the data in private _proteinSequenceWidget_StateObject is transfered to object of class SingleProtein_CentralStateManagerObjectClass which interfaces with centralPageStateManager
            
            this.props.propsValue.proteinSequenceWidget_StateObject.clear_selectedProteinSequencePositions();

            //  Update URL and Page

            window.setTimeout( () => {
                try {
                    this._selectedModificationsChange_UpdateURL();  //  Update URL
                    this._reporterIonMassesChange_UpdateURL();  //  Update URL
                    this._selectedPeptideSequenceChange_UpdateURL();  //  Update URL
                    this._selectedProteinPositionsChange_UpdateURL();

                    window.setTimeout( () => {
                        try {
                            this._modificationMass_Update_modificationMass_UserSelections_ComponentData();
            
                            this._reporterIonMass_Update_reporterIonMass_UserSelections_ComponentData();
            
                            this._peptideSequence_Update_peptideSequence_UserSelections_ComponentData();
            
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

            if ( this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections().is_Any_Modification_Selected()
                && this._load_PsmOpenModificationMasses_InProgress ) {

                //  Already loading PSM Open Modification Masses so exit.
                //   *  When the existing Promise for loading PSM Open Modification Masses, the page will be updated for the current selection change as well.

                return; // EARLY RETURN
            }

            let promise = load_PsmOpenModificationMasses_IfNeeded({
                getSearchSubGroupIds : undefined,
                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                projectSearchIds : this.props.propsValue.projectSearchIds,
                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot
            });

            if ( promise ) {
                this._load_PsmOpenModificationMasses_InProgress = true;

                this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                });

                //  Show loading message for peptide list since may take time to load new values from DB
                // reportedPeptideList_ShowLoadingMessage();

                promise.catch( (reason) => {
                    try {
                        this._load_PsmOpenModificationMasses_InProgress = false;

                        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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

                        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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

        const modificationMass_UserSelections_DisplayMassSelectionOverlay = new ModificationMass_UserSelections_DisplayMassSelectionOverlay({

            variable_Modifications_DISPLAY: false,
            open_Modifications_DISPLAY: true,
            modificationMass_Subpart_Variable_Open_Modifications_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject.get_OpenModificationSelections(),
            proteinNames: this.props.propsValue.proteinNames,
            proteinDescriptions: this.props.propsValue.proteinDescriptions,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchIds : this.props.propsValue.projectSearchIds,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
            modificationMass_CommonRounding_ReturnNumber : modificationMass_CommonRounding_ReturnNumber, // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
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

                                promise = load_OpenModificationMasses_IfNeeded({
                                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                                    projectSearchIds : this.props.propsValue.projectSearchIds,
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                                    searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot
                                });
                            }

                            if ( promise ) {
                                this._load_PsmOpenModificationMasses_InProgress = true;

                                this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

                                    return { gettingDataFor_Filtering_reportedPeptideIdsForDisplay : true };
                                });

                                //  Show loading message for peptide list since may take time to load new values from DB
                                // reportedPeptideList_ShowLoadingMessage();

                                promise.catch( (reason) => {
                                    try {
                                        this._load_PsmOpenModificationMasses_InProgress = false;

                                        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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

                                        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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
    _modificationMass_Update_modificationMass_UserSelections_ComponentData() {

        const modificationMass_UserSelections_ComponentData : ModificationMass_UserSelections_ComponentData = create_ModificationMass_UserSelections_ComponentData({
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        })

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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
                
                        promise = load_ReporterIonMasses_IfNeeded({     
                            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                            projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                            loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                            searchDataLookupParamsRoot : this.props.propsValue.searchDataLookupParamsRoot
                        });
                    }

                    if ( promise ) {
                        this._load_ReporterIonMasses_InProgress = true;

                        // console.log("_updateMadeTo_reporterIonMass_UserSelections_StateObject_Callback(): Loading Reporter Ion Masses so display Loading Data Message");
                        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

                            return { gettingDataFor_Filtering_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : true };
                        });
                        
                        //  Show loading message for peptide list since may take time to load new values from DB
                        // reportedPeptideList_ShowLoadingMessage();

                        promise.catch( (reason) => {
                            try {
                                this._load_ReporterIonMasses_InProgress = false;

                                this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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

                                this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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

        const reporterIons_UserSelections_ComponentData : ReporterIonMass_UserSelections_ComponentData = create_ReporterIons_UserSelections_ComponentData({
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
            projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
            loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds
        });

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

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
    }

    /**
     * create new this.state.peptideSequence_UserSelections_ComponentData
     */ 
    _peptideSequence_Update_peptideSequence_UserSelections_ComponentData() {

        const peptideSequence_UserSelections_ComponentData : PeptideSequence_UserSelections_ComponentData = create_PeptideSequence_UserSelections_ComponentData({
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject
        });

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

            return { peptideSequence_UserSelections_ComponentData };
        });
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

                    window.setTimeout( () => {
                        try {
                            const getReportedPeptideIdsForDisplay_AllProjectSearchIds_result = getReportedPeptideIdsForDisplay_AllProjectSearchIds({ // External Function Call
                                not_filtered_position_modification_selections : false,
                                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                                searchSubGroup_Ids_Selected : undefined,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                                proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,
                                modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                peptideUnique_UserSelection_StateObject : this.props.propsValue.peptideUnique_UserSelection_StateObject,
                                peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
                                userSearchString_LocationsOn_ProteinSequence_Root : this.state.userSearchString_LocationsOn_ProteinSequence_Root,
                                proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined
                            });
            
                            const reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds : ProteinExpmntPage_ReportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds = getReportedPeptideIdsForDisplay_AllProjectSearchIds_result.reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds;
                            

                            const create_GeneratedReportedPeptideListData_Result : Create_GeneratedReportedPeptideListData_Result = create_GeneratedReportedPeptideListData({

                                reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
                                reporterIonMassesSelected : this.props.propsValue.reporterIonMass_UserSelections_StateObject.get_ReporterIonssSelected_MassesOnly_AsSet(),
                                staticModificationMassesToFilterOn : this.props.propsValue.modificationMass_UserSelections_StateObject.get_StaticModifications_Selected_Residue_Mass_Map_Set(),
                                proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                                projectSearchIds : this.state.projectSearchIds_PossiblyFiltered,
                                loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                loadedDataCommonHolder : this.props.propsValue.loadedDataCommonHolder,
                            } );

            
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
            
                                proteinSequenceWidgetDisplay_Component_Data = create_ProteinSequenceWidgetDisplay_Component_Data({ // External Function Call
            
                                    proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject,

                                    reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds,
            
                                    proteinSequenceVersionId : this.props.propsValue.proteinSequenceVersionId,
                                    proteinSequenceString : this.props.propsValue.proteinSequenceString,
                                    projectSearchIds_All : this.props.propsValue.projectSearchIds,
                                    projectSearchIds_PossiblyFiltered : this.state.projectSearchIds_PossiblyFiltered,
                                    proteinCoverageArrayOfBoolean : sequenceCoverageBooleanArray_Unfiltered, //  All Peptides
                                    proteinPositions_CoveredBy_PeptideSearchStrings: proteinPositions_CoveredBy_SearchStrings,  //  User entered a Peptide String and these Protein Positions are covered by matched peptides - Array of boolean
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds : this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds,
                                    modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
                                    reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
                                    experimentConditionsSelected
                                });
                            }
            
                            window.setTimeout( () => {
                                try {
                                    this.setState( (state : ProteinExperimentPage_SingleProtein_MainContent_Component_State, props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {
                                        return { proteinSequenceWidgetDisplay_Component_Data }
                                    });
                                } catch( e ) {
                                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                    throw e;
                                }
                            }, 0 );
            
                            window.setTimeout( () => {
                                try {
                                    if ( create_GeneratedReportedPeptideListData_Result.numberOfReportedPeptides > 300 ) { //  The cutoff number is an arbitrary guess
                                        //  Since going to take a while to put new peptide list in DOM, show updating message first, then update peptide list
            
                                        this.setState( (state : ProteinExperimentPage_SingleProtein_MainContent_Component_State, props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {
                                            return { updating_Next_reportedPeptideIds_AndTheir_PSM_IDs__AllProjectSearchIds_ForPeptideList : true }
                                        });
            
                                        window.setTimeout( () => {
                                            try {
                                                this.setState( (state : ProteinExperimentPage_SingleProtein_MainContent_Component_State, props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {
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
                                        this.setState( (state : ProteinExperimentPage_SingleProtein_MainContent_Component_State, props : ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {
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
            searchSubGroup_Are_All_SearchSubGroupIds_Selected : undefined,
            searchSubGroup_PropValue : undefined,
            modificationMass_UserSelections_StateObject : this.props.propsValue.modificationMass_UserSelections_StateObject,
            reporterIonMass_UserSelections_StateObject : this.props.propsValue.reporterIonMass_UserSelections_StateObject,
            peptideUnique_UserSelection_StateObject : undefined,
            proteinPositionFilter_UserSelections_StateObject_Wrapper : undefined,  // Peptide Page Only
            proteinPositionFilter_UserSelections_Proteins_Names_Lengths_Data : undefined,  // Peptide Page Only
            peptideSequence_UserSelections_StateObject : this.props.propsValue.peptideSequence_UserSelections_StateObject,
            proteinSequenceWidget_StateObject : this.props.propsValue.proteinSequenceWidget_StateObject
        };

        this.setState( (state: ProteinExperimentPage_SingleProtein_MainContent_Component_State, props: ProteinExperimentPage_SingleProtein_MainContent_Component_Props ) : ProteinExperimentPage_SingleProtein_MainContent_Component_State => {

            return { peptideFiltersDisplay_ComponentData };
        });
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

		let timeoutId = null;

		// Callback function to execute when mutations are observed
		const domMutationCallback = ( mutationsList, observer ) => {

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

                            <div className=" filter-common-block-selection-container-block ">

                                <ModificationMass_UserSelections_Root
                                    openModification_OpenSelectMassOverlay_Override_Callback={ this._openModificationMass_OpenUserSelections_Overlay_Override_BindThis }
                                    modificationMass_UserSelections_ComponentData={ this.state.modificationMass_UserSelections_ComponentData } // Only updated when new updated need to push from above
                                    modificationMass_UserSelections_StateObject={ this.props.propsValue.modificationMass_UserSelections_StateObject } // Updated in the component
                                    proteinSequenceVersionId={ this.props.propsValue.proteinSequenceVersionId }
                                    projectSearchIds={ this.state.projectSearchIds_PossiblyFiltered }
                                    proteinNames={ this.props.propsValue.proteinNames }
                                    proteinDescriptions={ this.props.propsValue.proteinDescriptions }
                                    loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                                    modificationMass_CommonRounding_ReturnNumber={ modificationMass_CommonRounding_ReturnNumber } // Always passed for Experiment - Made a parameter to make easier to copy this code for Protein Page Single Search
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
                                    proteinSequenceString={ this.props.propsValue.proteinSequenceString }
                                    updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback
                                        ={ this._updateMadeTo_peptideSequence_UserSelections_StateObject_New_UserSearchString_LocationsOn_ProteinSequence_Root_Callback_BindThis }
                                    updateMadeTo_peptideSequence_UserSelections_StateObject_Callback={ null }
                                />
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

                        {/* Display of User Selected Modifications and Protein Positions filtering on  */}
                        
                        <PeptideFiltersDisplay
                            peptideFiltersDisplay_ComponentData={ this.state.peptideFiltersDisplay_ComponentData }
                            clearAllFiltersClickHandler={ this._clearAllSelections_BindThis }
                        />

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
                        loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds={ this.props.propsValue.loadedDataPerProjectSearchIdHolder_ForAllProjectSearchIds }
                        loadedDataCommonHolder={ this.props.propsValue.loadedDataCommonHolder }
                        dataPageStateManager={ this.props.propsValue.dataPageStateManager }
                    />
                </div>
            </React.Fragment>

        );
    }

}

