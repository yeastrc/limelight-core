/**
 * projPg_Expermnts_Single_MaintRoot.tsx
 * 
 * Root of Single Experiment Maint (Create or Update) Section
 * 
 * Shown when "Create New Experiment" is clicked
 */


//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// When user adds or removes in the experiment builder, the data in 'conditionGroupsDataContainer' is removed.  

//  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';


import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';


import { create_experimentConditions_GraphicRepresentation_PropsData, ExperimentConditions_GraphicRepresentation_PropsData } from 'page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData';

import { ExperimentConditions_GraphicRepresentation_MainCell_Identifier } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers';
import { ExperimentConditions_GraphicRepresentation_SelectedCells, create_ExperimentConditions_GraphicRepresentation_SelectedCells__NO__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Selections'
import { Experiment_SingleExperiment_ConditionsGraphicRepresentation, ExperimentConditions_GraphicRepresentation_MainCellClickHandler, ExperimentConditions_GraphicRepresentation_PropsData_DisplayTableCell, ExperimentConditions_GraphicRepresentation_MainCellClickHandler_Params, ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents, ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation';

import { ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList } from './projPg_Expermnts_Single_MaintRoot_ConditionGroupList';

import {
    ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint,
    ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props_Data_Property,
    ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_FunctionType,
    ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Save_FunctionType,
    ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Cancel_FunctionType,
    ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_Save_FunctionType_Params
} from './projPg_Expermnts_Single_ConditionGroupMaint';

import { ProjectPage_Experiments_SingleExperiment_MainCellMaint, Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint } from './projPg_Expermnts_Single_MainCellMaint';

import { Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition, create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import {
    Experiment_ConditionGroupsDataContainer,
    Experiment_ConditionGroupsDataContainer_DataEntry,
    Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param
} from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';

import { create_experiment_SearchFilterValuesFromDefaultCutoffs } from './create_experiment_SearchFilterValuesFromDefaultCutoffs';
import { Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes';
import {GetSearchesAndFolders_SingleProject_PromiseResponse_Item} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {
    AnnotationTypeData_Root,
    SearchProgramsPerSearchData_Root
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer} from "page_js/data_pages/experiment_data_pages_common/experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer";


        //  !!!!  Possibly redesign constructor once this Component becomes a child of another component.

        //    Some computation of state would also need to be done on componentDidUpdate when the props changed


const _CURRENT_STEP__1__DEFINE_EXPERIMENT = 1;
const _CURRENT_STEP__2__ADD_SEARCHES_TO_CONDITIONS = 2;
// const _CURRENT_STEP__3__USER_SET_SEARCH_FILTERS = 3;
// const _CURRENT_STEP__4__USER_ZZZZZ = 4;

//  Initial value is MIN
const _NUMBER_OF_REPLICATES_ZERO = 0;
const _NUMBER_OF_REPLICATES_MIN = 2;
const _NUMBER_OF_REPLICATES_MAX = 65;

const _REPLICATES_ZERO_DISPLAY_LABEL = "None";

const _TIME_POINTS_GROUP_LABEL = "Time Points";

const _BIOLOGICAL_REPLICATE_GROUP_LABEL = "Biological Replicate";
const _TECHNICAL_REPLICATE_GROUP_LABEL = "Technical Replicate";

const _BIOLOGICAL_REPLICATE_CONDITION_LABEL_PREFIX = "Bio Rep ";
const _TECHNICAL_REPLICATE_CONDITION_LABEL_PREFIX = "Tech Rep ";

//   Hard coded Condition Group ID values for Replicates.  Negative since negative numbers normally never assigned.
const _CONDITION_GROUP_ID_BIOLOGICAL_REPLICATES = -2;
const _CONDITION_GROUP_ID_TECHNICAL_REPLICATES  = -3;
const _CONDITION_GROUP_ID_TIME_POINTS  = -4;

/**
 *
 */
export interface ProjectPage_Experiments_SingleExperimentMaintRoot_Props {

    experimentData
    projectPage_ExperimentsSection_LoggedInUsersInteraction

    searchesData : {
        searches_TopLevelAndNestedInFolders: Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
        searchList_OnlySearches : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>;
        searchesSubData : {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }

    projectIdentifierFromURL;
    closeOverlay; // function
}

/**
 *
 */
interface ProjectPage_Experiments_SingleExperimentMaintRoot_State {

    draftExperiment? : boolean;
    experimentId? : number;
    experimentName? : string;
    conditionGroupsContainer? : Experiment_ConditionGroupsContainer;
    conditionGroupsDataContainer? : Experiment_ConditionGroupsDataContainer;

    numberTechnicalReplicates? : number;
    numberBiologicalReplicates? : number;
    numberTimePoints? : number;
    show_Experiment_SingleExperiment_ConditionsGraphicRepresentation? : boolean;
    experimentConditions_GraphicRepresentation_PropsData? : ExperimentConditions_GraphicRepresentation_PropsData;

    saveAsDraftButtonEnabled? : boolean;
    saveButtonEnabled? : boolean;

    data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint? : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props_Data_Property;

    data_ProjectPage_Experiments_SingleExperiment_MainCellMaint? : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint;

    graphicRep_SelectedCells? : ExperimentConditions_GraphicRepresentation_SelectedCells;

    current_Step? : number ;
}

/**
 *
 */
export class ProjectPage_Experiments_SingleExperimentMaintRoot extends React.Component< ProjectPage_Experiments_SingleExperimentMaintRoot_Props, ProjectPage_Experiments_SingleExperimentMaintRoot_State > {

    //  For class methods that are '.bind(this)' and cast to a function type:
    //     Add a cast to same function type without the '.bind(this)' in the constructor to local variable to validate that the local function properly implements the function type
    //        (missing or mis-typed parameters will error.  extra properties in a object in the parameters will not error)

    private _add_singleConditionGroup_Maint_Overlay_BindThis : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_FunctionType = this._add_singleConditionGroup_Maint_Overlay.bind(this);
    private _CAST_TEST_ONLY_add_singleConditionGroup_Maint_Overlay : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_FunctionType = this._add_singleConditionGroup_Maint_Overlay;

    private _save_singleConditionGroup_Maint_Overlay_BindThis : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Save_FunctionType = this._save_singleConditionGroupChanges.bind(this);
    private _CAST_TEST_ONLY_save_singleConditionGroup_Maint_Overlay : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Save_FunctionType = this._save_singleConditionGroupChanges;

    private _cancel_singleConditionGroup_Maint_BindThis : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Cancel_FunctionType = this._cancel_singleConditionGroup_Maint.bind(this);
    private _CAST_TEST_ONLY_cancel_singleConditionGroup_Maint : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Cancel_FunctionType = this._cancel_singleConditionGroup_Maint;

    private _mainCellClickHandler_BindThis : ExperimentConditions_GraphicRepresentation_MainCellClickHandler = this._mainCellClickHandler.bind(this);
    private _CAST_TEST_ONLY_mainCellClickHandler : ExperimentConditions_GraphicRepresentation_MainCellClickHandler = this._mainCellClickHandler;

    private _mainCell_getHoverContents_BindThis = this._mainCell_getHoverContents.bind(this);
    private _CAST_TEST_ONLY_mainCell_getHoverContents : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents = this._mainCell_getHoverContents;

    //  class methods that are '.bind(this)' and NOT cast to a function type:

    private _save_Experiment_Clicked_BindThis = this._save_Experiment_Clicked.bind(this);
    private _save_Experiment_AsDraft_Clicked_BindThis = this._save_Experiment_AsDraft_Clicked.bind(this);
    private _cancel_Experiment_Clicked_BindThis = this._cancel_Experiment_Clicked.bind(this);


    private _gotoStep_1_ButtonClicked_BindThis = this._gotoStep_1_ButtonClicked.bind(this);
    private _gotoStep_2_ButtonClicked_BindThis = this._gotoStep_2_ButtonClicked.bind(this);

    private _experimentNameChanged_BindThis = this._experimentNameChanged.bind(this);

    //  changes to <select> for # of replicates
    private _numberBiologicalReplicates_Changed_BindThis = this._numberBiologicalReplicates_Changed.bind(this);
    private _numberTechnicalReplicates_Changed_BindThis  = this._numberTechnicalReplicates_Changed.bind(this);

    /////

    //  Not currently used

    // private _cancel_User_Set_Filters_for_Searches_BindThis = this._cancel_User_Set_Filters_for_Searches.bind(this);
    // private _save_User_Set_Filters_for_Searches_BindThis = this._save_User_Set_Filters_for_Searches.bind(this);

    //  Time Points Maint

    private _add_timePoints_ClickHandler_BindThis = this._add_timePoints_ClickHandler.bind(this);
    private _update_timePoints_ClickHandler_BindThis = this._update_timePoints_ClickHandler.bind(this);
    private _delete_timePoints_ClickHandler_BindThis = this._delete_timePoints_ClickHandler.bind(this);

    //   Single Condition Group Entry Add or Maint

    //      Add New Condition Group
    private _add_conditionGroup_InConditionGroupList_ClickHandler_BindThis = this._add_conditionGroup_InConditionGroupList_ClickHandler.bind(this);

    //      Maint of Existing Condition Group
    //              Condition Group in Condition Group List Click Handler
    private _conditionGroup_InConditionGroupList_ClickHandler_BindThis = this._conditionGroup_InConditionGroupList_ClickHandler.bind(this);

    //  Not Used
    //              Condition in Condition Matrix Graphic (Component Experiment_SingleExperiment_ConditionsGraphicRepresentation) Click Handler
    // private _condition_InConditionMatrixGraphic_ClickHandler_BindThis = this._condition_InConditionMatrixGraphic_ClickHandler.bind(this);

    private _delete_conditionGroup_ClickHandler_BindThis = this._delete_conditionGroup_ClickHandler.bind(this);

    //  Not Used
    // private _mainCell_onMouseEnterHandler_BindThis = this._mainCell_onMouseEnterHandler.bind(this);
    // private _mainCell_onMouseLeaveHandler_BindThis = this._mainCell_onMouseLeaveHandler.bind(this);

    private _save_ProjectSearchIds_ForMainCell_BindThis = this._save_ProjectSearchIds_ForMainCell.bind(this);
    private _save_updated_conditionGroupsDataContainer_BindThis = this._save_updated_conditionGroupsDataContainer.bind(this);

    private _conditionGroups_ChangeOrder_BindThis = this._conditionGroups_ChangeOrder.bind(this);

    /////

    private _searchDataMap_KeyProjectSearchId : Map<number, GetSearchesAndFolders_SingleProject_PromiseResponse_Item>

    //  Not Used
    // private _projectPage_ExperimentsSection_LoggedInUsersInteraction;


    /**
     *
     */
    constructor( props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) {
        super(props);

        //  Overall Experiment Level:

        //  !!!!  Possibly redesign this once this Component becomes a child of another component.

        {
            //   Create Map of Search Data key projectSearchId

           this._searchDataMap_KeyProjectSearchId = new Map();

           const searchesData = this.props.searchesData;
           if ( searchesData ) {
               const searchList = searchesData.searchList_OnlySearches;
               if ( searchList ) {
                   for ( const search of searchList ) {
                       const projectSearchId = search.projectSearchId;
                       this._searchDataMap_KeyProjectSearchId.set( projectSearchId, search );
                   }
               }
           }
        }

        let draftExperiment = true;

        let current_Step = _CURRENT_STEP__1__DEFINE_EXPERIMENT;

        let experimentId = undefined;
        let experimentName = undefined;


        let conditionGroupsContainer : Experiment_ConditionGroupsContainer = undefined;
        let conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer = undefined;

        let numberTimePoints = 0;

        //  <select> for # replicates (biological and technical)
        let numberBiologicalReplicates = _NUMBER_OF_REPLICATES_ZERO;
        let numberTechnicalReplicates = _NUMBER_OF_REPLICATES_ZERO;

        if ( props.experimentData ) {

            if ( ! props.experimentData.draft ) {
                draftExperiment = false;
            }

            //  Update from Saved Experiment Data

            if ( props.experimentData.experimentJSONMainData ) {

                const experimentMainData = JSON.parse( props.experimentData.experimentJSONMainData );

                let searchDataLookupParamsRoot = undefined;

                const searchDataLookupParamsRootJSON = props.experimentData.searchDataLookupParamsRootJSON;
                if ( searchDataLookupParamsRootJSON ) {
                    searchDataLookupParamsRoot = JSON.parse( searchDataLookupParamsRootJSON );
                }

                conditionGroupsContainer = create_Experiment_ConditionGroupsContainer_AndChildren_From_ServerSideParsedJSON( experimentMainData.conditionGroupsContainer );
                conditionGroupsDataContainer = new Experiment_ConditionGroupsDataContainer({ experimentConditionData_Serialized : experimentMainData.experimentConditionData, searchDataLookupParamsRoot });

                if ( conditionGroupsContainer ) {

                    const conditionGroups = conditionGroupsContainer.conditionGroups;
                    if ( conditionGroups && conditionGroups.length !== 0 ) {
                        for ( const conditionGroup of conditionGroups ) {

                            if ( conditionGroup.typeTimePoint ) {
                                const conditions = conditionGroup.conditions;
                                if ( conditions && conditions.length !== 0 ) {
                                    numberTimePoints = conditions.length;
                                }
                            }
                            if ( conditionGroup.typeBiologicalReplicate ) {
                                const conditions = conditionGroup.conditions;
                                if ( conditions && conditions.length !== 0 ) {
                                    numberBiologicalReplicates = conditions.length;
                                }
                            }
                            if ( conditionGroup.typeTechnicalReplicate ) {
                                const conditions = conditionGroup.conditions;
                                if ( conditions && conditions.length !== 0 ) {
                                    numberTechnicalReplicates = conditions.length;
                                }
                            }
                        }
                    }

                }
            }

            if ( props.experimentData.id ) {
                experimentId = props.experimentData.id;
            }
            if ( props.experimentData.name ) {
                experimentName = props.experimentData.name; //  If experimentName on initial render, use that.  Maybe pass in a different way
            }
        }

        if ( experimentName === undefined || experimentName === null ) {
            experimentName = "";  // initial default value of empty string.  Initial value Cannot be undefined.
        }

        if ( conditionGroupsContainer === undefined ) {
            conditionGroupsContainer = new Experiment_ConditionGroupsContainer({ conditionGroups : [] });
        }
        if ( conditionGroupsDataContainer === undefined ) {
            conditionGroupsDataContainer = _conditionGroupsDataContainer_InitialValue();
        }


        const experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData = (
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer, conditionGroupsDataContainer }) // Call External Function
        );

        const state = {
            projectPage_ExperimentsSection_LoggedInUsersInteraction: props.projectPage_ExperimentsSection_LoggedInUsersInteraction,
            show_Experiment_SingleExperiment_ConditionsGraphicRepresentation : true, // init to true
            draftExperiment,
            experimentId,
            experimentName,
            conditionGroupsContainer,
            conditionGroupsDataContainer,
            experimentConditions_GraphicRepresentation_PropsData,
            current_Step,
            numberTimePoints,
            //  <select> for # replicates (biological and technical)
            numberBiologicalReplicates,
            numberTechnicalReplicates,
            saveAsDraftButtonEnabled : undefined,
            saveButtonEnabled : undefined
        };

        const saveAsDraftButtonState = this._saveAsDraft_Button_UpdateEnabled_NewState({ state });
        const saveButtonState = this._save_Button_UpdateEnabled_NewState({ state })

        Object.assign( state, saveAsDraftButtonState ); // copy saveAsDraftButtonState properties to state
        Object.assign( state, saveButtonState ); // copy saveButtonState properties to state

        this.state = state;

        this._populateDefaultFilters_ForUnassignedFilters({ conditionGroupsContainer, conditionGroupsDataContainer });
    }

    /**
     * Must be Static
     * Called before
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     *
     * Return new state (like return from setState(callback)) or null
     */
    // static getDerivedStateFromProps( props, state ) {

    //     // console.log("called: static getDerivedStateFromProps(): " );

    //     //  Return new state (like return from setState(callback)) or null

    //     // return { setIn_getDerivedStateFromProps : true };
    //     return null;
    // }


    ////////

    /**
     *
     */
    _saveAsDraft_Button_UpdateEnabled_NewState({ state } : {

        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        let saveAsDraftButtonEnabled = false;
        if ( state.experimentName !== "" ) {
            saveAsDraftButtonEnabled = true;
        }

        return { saveAsDraftButtonEnabled };
    }

    /**
     *
     */
    _save_Button_UpdateEnabled_NewState({ state } : {

        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        let saveButtonEnabled = false;
        if ( state.experimentName !== "" ) {
            if ( this._any_projectSearchIdsAssigned_To_Conditions({ state }) ) {
                saveButtonEnabled = true;
            }
        }

        return { saveButtonEnabled };
    }

    /**
     *
     */
    _populateDefaultFilters_ForUnassignedFilters({ conditionGroupsContainer, conditionGroupsDataContainer } : {

        conditionGroupsContainer : Experiment_ConditionGroupsContainer
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    }) {

        if ( ( ! conditionGroupsContainer ) || ( ! conditionGroupsDataContainer ) ) {
            //  No Data so no updates
            return null; // EARLY EXIT
        }
        const conditionGroups = conditionGroupsContainer.conditionGroups;
        if ( ! conditionGroups || conditionGroups.length === 0 ) {
            //  No Data so no updates
            return null; // EARLY EXIT
        }
        const searchDataMap_KeyProjectSearchId = this._searchDataMap_KeyProjectSearchId;
        const searchesData = this.props.searchesData;

        {
            //  Populate conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId })
            //          properties 'psmFilterDataMap_KeyAnnTypeId', 'reportedPeptideFilterDataMap_KeyAnnTypeId'

            const projectSearchIds_All =
                Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.
                    get_All_ProjectSearchIds({ conditionGroupsDataContainer });

            create_experiment_SearchFilterValuesFromDefaultCutoffs({ projectSearchIds : projectSearchIds_All, searchDataMap_KeyProjectSearchId, searchesData, conditionGroupsDataContainer });
        }
    }

    ///////////////////////

    _save_Experiment_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {

        // console.log("_save_Experiment_AsDraft_Clicked() called");

        const promise_saveExperimentToServer = _save_Experiment({ // call function in this file, not in this class
            projectIdentifier : this.props.projectIdentifierFromURL,
            experimentId : this.state.experimentId,
            experimentName : this.state.experimentName,
            conditionGroupsContainer : this.state.conditionGroupsContainer,
            conditionGroupsDataContainer : this.state.conditionGroupsDataContainer
        });

        promise_saveExperimentToServer.catch( (reason) => {} );

        promise_saveExperimentToServer.then( (result) => {

            //  Probably should display a 'saved' message

            // console.warn("Call commented out to call 'this.props.closeOverlay();'")

            this.props.closeOverlay();
        });
    }

    /**
     *
     */
    _save_Experiment_AsDraft_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {

        // console.log("_save_Experiment_AsDraft_Clicked() called");

        const promise_saveExperimentToServer = _save_Experiment_AsDraft({ // call function in this file, not in this class
            projectIdentifier : this.props.projectIdentifierFromURL,
            experimentId : this.state.experimentId,
            experimentName : this.state.experimentName,
            conditionGroupsContainer : this.state.conditionGroupsContainer,
            conditionGroupsDataContainer : this.state.conditionGroupsDataContainer
        });

        promise_saveExperimentToServer.catch( (reason) => {} );

        promise_saveExperimentToServer.then( (result) => {

            //  Probably should display a 'saved' message

            // console.warn("Call commented out to call 'this.props.closeOverlay();'")

            this.props.closeOverlay();
        });
    }

    /**
     *
     */
    _cancel_Experiment_Clicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {

        this.props.closeOverlay();
    }

    ////////////

    /**
     *
     */
    _experimentNameChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent>  ) {

        const target_htmlElement = event.target as HTMLInputElement;
        if ( target_htmlElement.value === undefined ) {
            throw Error( "_experimentNameChanged: target_htmlElement.value === undefined");
        }
        const newValue = target_htmlElement.value;

        //  Save to internal data structure

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return { experimentName : newValue }; // Save to state for re-render
        });

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return this._saveAsDraft_Button_UpdateEnabled_NewState({ state });
        });
        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return this._save_Button_UpdateEnabled_NewState({ state });
        });
    }

    /**
     *
     */
    _numberBiologicalReplicates_Changed( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const target_htmlElement = event.target as HTMLInputElement;
        if ( target_htmlElement.value === undefined ) {
            throw Error( "_numberBiologicalReplicates_Changed: target_htmlElement.value === undefined");
        }
        const newNumberString = target_htmlElement.value;

        const newNumber = Number.parseInt( newNumberString );

        if ( Number.isNaN( newNumber ) ) {
            throw Error("_numberBiologicalReplicates_Changed: event.target.value is not valid number. is: " + newNumberString );
        }

        //     Possible improved user experience
        //  If changed from/to zero, need to delete all condition group data.
        //  If reduced in value, need to remove condition group data

        //  Not quite valid to use this.state for this check but don't want it running inside setState

        const any_projectSearchIdsAssigned_To_Conditions = this._any_projectSearchIdsAssigned_To_Conditions({ state : this.state });

        if ( any_projectSearchIdsAssigned_To_Conditions ) {
            window.alert( "All searches from all conditions have been removed" )
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this.__number_Of_BiologicalReplicates_Changed_SetStateValues({
                state, props, newNumber
            });
        });
    }

    /**
     *
     */
    __number_Of_BiologicalReplicates_Changed_SetStateValues({ state, props, newNumber } : {
        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State,
        props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props,
        newNumber : number
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        const conditionGroupsContainer = state.conditionGroupsContainer;

        const conditionGroupsContainerNew = conditionGroupsContainer.cloneShallow(); // create new object

        const conditionGroupsDataContainerNew = state.conditionGroupsDataContainer.cloneShallow(); // create new object

        const conditionGroups_Old = conditionGroupsContainerNew.conditionGroups;

        //     Possible improved user experience
        //  If changed from/to zero, need to delete all condition group data.
        //  If reduced in value, need to remove condition group data
        conditionGroupsDataContainerNew.clearConditionData(); //  Clear all conditions Data

        const resultState : {
            conditionGroupsContainer : Experiment_ConditionGroupsContainer
            conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
            numberBiologicalReplicates : number
            experimentConditions_GraphicRepresentation_PropsData : ExperimentConditions_GraphicRepresentation_PropsData
        } = {
            conditionGroupsContainer : conditionGroupsContainerNew,
            conditionGroupsDataContainer : conditionGroupsDataContainerNew,
            numberBiologicalReplicates : undefined,
            experimentConditions_GraphicRepresentation_PropsData : undefined
        };

        if ( newNumber === 0 ) {
            //  Remove Condition Group

            if ( state.numberBiologicalReplicates === 0 ) {
                //  Changed from zero to zero so no changes
                return null;  // EARLY RETURN
            }

            let conditionGroup_Index : number = undefined;
            for ( let index = conditionGroups_Old.length - 1; index >= 0; index-- ) { //  Search in reverse since at or near end of array
                const conditionGroup = conditionGroups_Old[ index ];
                if ( ! conditionGroup ) {
                    //  No entry for this index
                    continue;  // EARLY CONTINUE
                }
                if ( conditionGroup.typeBiologicalReplicate ) {
                    if ( conditionGroup.id !== _CONDITION_GROUP_ID_BIOLOGICAL_REPLICATES ) {
                        throw Error("conditionGroup.typeBiologicalReplicate but conditionGroup.id !== _CONDITION_GROUP_ID_BIOLOGICAL_REPLICATES ");
                    }
                    conditionGroup_Index = index;
                    break;
                }
                if ( ! conditionGroup.specialConditionGroup ) { //  Entered 'standard' condition groups so will not find entry typeBiologicalReplicate
                    break;
                }
            }
            if ( conditionGroup_Index === undefined ) {
                throw Error("No Condition Group for typeBiologicalReplicate");
            }

            //  Found condition group for typeBiologicalReplicate.  Remove it.
            const conditionGroup = conditionGroups_Old[ conditionGroup_Index ];

            let conditionGroups_New : Array<Experiment_ConditionGroup> = undefined;

            if ( conditionGroup_Index == ( conditionGroups_Old.length - 1 ) ) {
                //  Is last index so remove it
                conditionGroups_New = conditionGroups_Old.slice( 0, conditionGroup_Index );
            } else {
                //  Is NOT last index so remove it
                const conditionGroups_Before = conditionGroups_Old.slice( 0, conditionGroup_Index );
                const conditionGroups_After = conditionGroups_Old.slice( conditionGroup_Index + 1 );
                conditionGroups_New = conditionGroups_Before.concat( conditionGroups_After );
            }
            conditionGroupsContainerNew.conditionGroups = conditionGroups_New;

        } else {

            if ( state.numberBiologicalReplicates === 0 ) {
                //  Changed from zero to not zero

                //  Add Condition Group - Copied and modified code from _add_conditionGroup_ToState({ conditionGroup }) {

                const conditions_Add : Array<Experiment_Condition> = [];

                for ( let conditionIndex = 0; conditionIndex < newNumber; conditionIndex++ ) {
                    const counter = conditionIndex + 1;
                    const label = _BIOLOGICAL_REPLICATE_CONDITION_LABEL_PREFIX + counter;
                    const condition = new Experiment_Condition({
                        label,
                        id : conditionGroupsContainerNew.conditionId_GetNextValue(),
                        labelSuffixInitiallyAssigned : counter
                    });
                    conditions_Add.push( condition );
                }

                const conditionGroup_Add =  new Experiment_ConditionGroup({
                    label : _BIOLOGICAL_REPLICATE_GROUP_LABEL,
                    id : _CONDITION_GROUP_ID_BIOLOGICAL_REPLICATES,
                    typeBiologicalReplicate : true,
                    specialConditionGroup : true,
                    conditions : conditions_Add
                });

                let conditionGroupsNew : Array<Experiment_ConditionGroup> = undefined;

                if ( conditionGroups_Old.length === 0 ) {

                    //  Empty Old Array, so just assign to array containing new entry
                    conditionGroupsNew = [ conditionGroup_Add ];

                } else {

                    //  conditionGroup_TechnicalReplicates is always last entry in array conditionGroups

                    const conditionGroups_Old_LastEntry = conditionGroups_Old[ conditionGroups_Old.length - 1 ];

                    if ( conditionGroups_Old_LastEntry.typeTechnicalReplicate ) {
                        //  last entry is typeTechnicalReplicate so insert before it

                        const conditionGroups_Old_BeforeTechnicalReplicates = conditionGroups_Old.slice( 0, ( conditionGroups_Old.length - 1 ) );
                        const conditionGroups_Old_TechnicalReplicates = conditionGroups_Old.slice( ( conditionGroups_Old.length - 1 ) );

                        conditionGroupsNew = conditionGroups_Old_BeforeTechnicalReplicates.concat( conditionGroup_Add, conditionGroups_Old_TechnicalReplicates ); // create new array with item added to it

                    } else {
                        //  last entry is NOT typeTechnicalReplicate so append to end of array

                        conditionGroupsNew = conditionGroups_Old.concat( conditionGroup_Add ); // create new array with item added to it
                    }

                }

                conditionGroupsContainerNew.conditionGroups = conditionGroupsNew;

            } else {

                //  Update Number of conditions

                //  Get conditionGroup

                let conditionGroup_Update : Experiment_ConditionGroup = undefined;

                for ( let index = conditionGroups_Old.length - 1; index >= 0; index-- ) { //  Search in reverse since at or near end of array
                    const conditionGroup = conditionGroups_Old[ index ];
                    if ( ! conditionGroup ) {
                        //  No entry for this index
                        continue;  // EARLY CONTINUE
                    }
                    if ( conditionGroup.typeBiologicalReplicate ) {
                        if ( conditionGroup.id !== _CONDITION_GROUP_ID_BIOLOGICAL_REPLICATES ) {
                            throw Error("conditionGroup.typeBiologicalReplicate but conditionGroup.id !== _CONDITION_GROUP_ID_BIOLOGICAL_REPLICATES ");
                        }
                        conditionGroup_Update = conditionGroup;
                        break;
                    }
                    if ( ! conditionGroup.specialConditionGroup ) { //  Entered 'standard' condition groups so will not find entry typeBiologicalReplicate
                        break;
                    }
                }
                if ( ! conditionGroup_Update ) {
                    throw Error("Update Number of conditions: No Condition Group for typeBiologicalReplicate");
                }

                const conditions = conditionGroup_Update.conditions;

                if ( newNumber > state.numberBiologicalReplicates ) {

                    //  Count Increased so add conditions
                    for ( let conditionIndex = conditions.length; conditionIndex < newNumber; conditionIndex++ ) {
                        const counter = conditionIndex + 1;
                        const label = _BIOLOGICAL_REPLICATE_CONDITION_LABEL_PREFIX + counter;
                        const condition = new Experiment_Condition({
                            label,
                            labelSuffixInitiallyAssigned : counter,
                            id : conditionGroupsContainerNew.conditionId_GetNextValue()
                        });
                        conditions.push( condition );
                    }
                } else {
                    //  Count Decreased so remove conditions

                    const conditions_New = [];
                    for ( let conditionIndex = 0; conditionIndex < conditions.length; conditionIndex++ ) {
                        const condition = conditions[ conditionIndex ];
                        if ( ! condition ) {
                            throw Error("Gap in conditions");
                        }
                        if ( conditionIndex < newNumber ) {
                            // conditionIndex < newNumber so keep
                            conditions_New.push( condition );
                        } else {
                            // conditionIndex >= newNumber so delete
                            conditionGroupsDataContainerNew.delete_data_For_ConditionId ({
                                conditionId : condition.id
                            });
                        }
                    }
                    conditionGroup_Update.conditions = conditions_New;
                }
            }
        }

        resultState.numberBiologicalReplicates = newNumber;

        const experimentConditions_GraphicRepresentation_PropsData = (
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew })
        );

        resultState.experimentConditions_GraphicRepresentation_PropsData = experimentConditions_GraphicRepresentation_PropsData

        return resultState;
    }


    /**
     *
     */
    _numberTechnicalReplicates_Changed( event: React.MouseEvent<HTMLInputElement, MouseEvent>  ) : void {

        const target_htmlElement = event.target as HTMLInputElement
        if ( target_htmlElement.value === undefined ) {
            throw Error( "_numberTechnicalReplicates_Changed: target_htmlElement.value === undefined");
        }
        const newNumberString = target_htmlElement.value;

        const newNumber = Number.parseInt( newNumberString );

        if ( Number.isNaN( newNumber ) ) {
            throw Error("_numberTechnicalReplicates_Changed: event.target.value is not valid number. is: " + newNumberString );
        }

        //     Possible improved user experience
        //  If changed from/to zero, need to delete all condition group data.
        //  If reduced in value, need to remove condition group data

        //  Not quite valid to use this.state for this check but don't want it running inside setState

        const any_projectSearchIdsAssigned_To_Conditions = this._any_projectSearchIdsAssigned_To_Conditions({ state : this.state });

        if ( any_projectSearchIdsAssigned_To_Conditions ) {
            window.alert( "All searches from all conditions have been removed" )
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._numberTechnicalReplicates_Changed_SetStateValues({
                state, props, newNumber
            });
        });
    }

    /**
     *
     */
    _numberTechnicalReplicates_Changed_SetStateValues({ state, props, newNumber } : {
        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State,
        props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props,
        newNumber : number
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        const conditionGroupsContainer = state.conditionGroupsContainer;

        const conditionGroupsContainerNew = conditionGroupsContainer.cloneShallow(); // create new object

        const conditionGroupsDataContainerNew = state.conditionGroupsDataContainer.cloneShallow(); // create new object

        const conditionGroups_Old = conditionGroupsContainerNew.conditionGroups;

        //     Possible improved user experience
        //  If changed from/to zero, need to delete all condition group data.
        //  If reduced in value, need to remove condition group data
        conditionGroupsDataContainerNew.clearConditionData(); //  Clear all conditions Data

        const resultState : {
            conditionGroupsContainer : Experiment_ConditionGroupsContainer
            conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
            numberTechnicalReplicates? : number
            experimentConditions_GraphicRepresentation_PropsData? : ExperimentConditions_GraphicRepresentation_PropsData
        } = {
            conditionGroupsContainer : conditionGroupsContainerNew,
            conditionGroupsDataContainer : conditionGroupsDataContainerNew
        };

        if ( newNumber === 0 ) {
            //  Remove Condition Group

            if ( state.numberTechnicalReplicates === 0 ) {
                //  Changed from zero to zero so no changes
                return null;  // EARLY RETURN
            }

            let conditionGroup_Index : number = undefined;
            for ( let index = conditionGroups_Old.length - 1; index >= 0; index-- ) { //  Search in reverse since at or near end of array
                const conditionGroup = conditionGroups_Old[ index ];
                if ( ! conditionGroup ) {
                    //  No entry for this index
                    continue;  // EARLY CONTINUE
                }
                if ( conditionGroup.typeTechnicalReplicate ) {
                    if ( conditionGroup.id !== _CONDITION_GROUP_ID_TECHNICAL_REPLICATES ) {
                        throw Error("conditionGroup.typeTechnicalReplicate but conditionGroup.id !== _CONDITION_GROUP_ID_TECHNICAL_REPLICATES ");
                    }
                    conditionGroup_Index = index;
                    break;
                }
                if ( ! conditionGroup.specialConditionGroup ) { //  Entered 'standard' condition groups so will not find entry typeTechnicalReplicate
                    break;
                }
            }
            if ( conditionGroup_Index === undefined ) {
                throw Error("No Condition Group for typeTechnicalReplicate");
            }

            //  Found condition group for typeTechnicalReplicate.  Remove it.
            const conditionGroup = conditionGroups_Old[ conditionGroup_Index ];

            let conditionGroups_New : Array<Experiment_ConditionGroup> = undefined;

            if ( conditionGroup_Index == ( conditionGroups_Old.length - 1 ) ) {
                //  Is last index so remove it
                conditionGroups_New = conditionGroups_Old.slice( 0, conditionGroup_Index );
            } else {
                //  Is NOT last index so remove it
                const conditionGroups_Before = conditionGroups_Old.slice( 0, conditionGroup_Index );
                const conditionGroups_After = conditionGroups_Old.slice( conditionGroup_Index + 1 );
                conditionGroups_New = conditionGroups_Before.concat( conditionGroups_After );
            }
            conditionGroupsContainerNew.conditionGroups = conditionGroups_New;

        } else {

            if ( state.numberTechnicalReplicates === 0 ) {
                //  Changed from zero to not zero

                //  Add Condition Group - Copied and modified code from _add_conditionGroup_ToState({ conditionGroup }) {

                const conditions_Add : Array<Experiment_Condition> = [];

                for ( let conditionIndex = 0; conditionIndex < newNumber; conditionIndex++ ) {
                    const counter = conditionIndex + 1;
                    const label = _TECHNICAL_REPLICATE_CONDITION_LABEL_PREFIX + counter;
                    const condition = new Experiment_Condition({
                        label,
                        id : conditionGroupsContainerNew.conditionId_GetNextValue(),
                        labelSuffixInitiallyAssigned : counter
                    });
                    conditions_Add.push( condition );
                }

                const conditionGroup_Add = new Experiment_ConditionGroup({
                    label : _TECHNICAL_REPLICATE_GROUP_LABEL,
                    id : _CONDITION_GROUP_ID_TECHNICAL_REPLICATES,
                    typeTechnicalReplicate : true,
                    specialConditionGroup : true,
                    conditions : conditions_Add
                });

                let conditionGroupsNew : Array<Experiment_ConditionGroup> = undefined;

                if ( conditionGroups_Old.length === 0 ) {

                    //  Empty Old Array, so just assign to array containing new entry
                    conditionGroupsNew = [ conditionGroup_Add ];

                } else {

                    //  conditionGroup_TechnicalReplicates is always last entry in array conditionGroups

                    //  append to end of array

                    conditionGroupsNew = conditionGroups_Old.concat( conditionGroup_Add ); // create new array with item added to it
                }

                conditionGroupsContainerNew.conditionGroups = conditionGroupsNew;

            } else {

                //  Update Number of conditions

                //  Get conditionGroup

                let conditionGroup_Update : Experiment_ConditionGroup = undefined;

                for ( let index = conditionGroups_Old.length - 1; index >= 0; index-- ) { //  Search in reverse since at or near end of array
                    const conditionGroup = conditionGroups_Old[ index ];
                    if ( ! conditionGroup ) {
                        //  No entry for this index
                        continue;  // EARLY CONTINUE
                    }
                    if ( conditionGroup.typeTechnicalReplicate ) {
                        if ( conditionGroup.id !== _CONDITION_GROUP_ID_TECHNICAL_REPLICATES ) {
                            throw Error("conditionGroup.typeTechnicalReplicate but conditionGroup.id !== _CONDITION_GROUP_ID_TECHNICAL_REPLICATES ");
                        }
                        conditionGroup_Update = conditionGroup;
                        break;
                    }
                    if ( ! conditionGroup.specialConditionGroup ) { //  Entered 'standard' condition groups so will not find entry typeTechnicalReplicate
                        break;
                    }
                }
                if ( ! conditionGroup_Update ) {
                    throw Error("Update Number of conditions: No Condition Group for typeTechnicalReplicate");
                }

                const conditions = conditionGroup_Update.conditions;

                if ( newNumber > state.numberTechnicalReplicates ) {

                    //  Count Increased so add conditions
                    for ( let conditionIndex = conditions.length; conditionIndex < newNumber; conditionIndex++ ) {
                        const counter = conditionIndex + 1;
                        const label = _TECHNICAL_REPLICATE_CONDITION_LABEL_PREFIX + counter;
                        const condition = new Experiment_Condition({
                            label,
                            labelSuffixInitiallyAssigned : counter,
                            id : conditionGroupsContainerNew.conditionId_GetNextValue()
                        });
                        conditions.push( condition );
                    }
                } else {
                    //  Count Decreased so remove conditions

                    const conditions_New = [];
                    for ( let conditionIndex = 0; conditionIndex < conditions.length; conditionIndex++ ) {
                        const condition = conditions[ conditionIndex ];
                        if ( ! condition ) {
                            throw Error("Gap in conditions");
                        }
                        if ( conditionIndex < newNumber ) {
                            // conditionIndex < newNumber so keep
                            conditions_New.push( condition );
                        } else {
                            // conditionIndex >= newNumber so delete
                            conditionGroupsDataContainerNew.delete_data_For_ConditionId ({
                                conditionId : condition.id
                            });
                        }
                    }
                    conditionGroup_Update.conditions = conditions_New;
                }
            }
        }

        resultState.numberTechnicalReplicates = newNumber;

        const experimentConditions_GraphicRepresentation_PropsData = (
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew })
        );

        resultState.experimentConditions_GraphicRepresentation_PropsData = experimentConditions_GraphicRepresentation_PropsData

        return resultState;
    }

    /**
     *
     */
    _any_projectSearchIdsAssigned_To_Conditions({ state } : {

        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State
    }) : boolean {
        const any_projectSearchIdsAssigned_To_Conditions =
            Experiment_Get_ProjectSearchIds_From_ConditionGroupsContainer_ConditionGroupsDataContainer.
                get_Is_ANY_ProjectSearchId_In_conditionGroupsDataContainer(
                {
                    conditionGroupsDataContainer : state.conditionGroupsDataContainer
                });

        return any_projectSearchIdsAssigned_To_Conditions;
    }


    /**
     *
     */
    _conditionGroups_ChangeOrder({ sourceIndex, destinationIndex }) {

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            const conditionGroupsContainer = state.conditionGroupsContainer;

            const conditionGroups = conditionGroupsContainer.conditionGroups;

            const conditionGroupToMove = conditionGroups[ sourceIndex ];
            if ( conditionGroupToMove === undefined ) {
                return { conditionGroupsContainer }; //  Index not in array so no changes
            }

            //  Remove Source Index

            const conditionGroups_BeforeSource = conditionGroups.slice( 0, sourceIndex );
            const conditionGroups_AfterSource = conditionGroups.slice( sourceIndex + 1 );
            const conditionGroups_SourceRemoved = conditionGroups_BeforeSource.concat( conditionGroups_AfterSource );

            let destinationIndex_InSourceRemovedArray = destinationIndex;

            if ( destinationIndex > sourceIndex ) {
                // destination index has shifted since removed element at sourceIndex from array
                destinationIndex_InSourceRemovedArray = destinationIndex_InSourceRemovedArray--;
            }

            //  Split conditionGroups_SourceRemoved at destinationIndex_InSourceRemovedArray

            let conditionGroups_BeforeDestination = conditionGroups_SourceRemoved.slice( 0, destinationIndex_InSourceRemovedArray );
            let conditionGroups_AtDestinationAndRest = conditionGroups_SourceRemoved.slice( destinationIndex_InSourceRemovedArray );

            //  Combine arrays for final

            const conditionGroupsNew = conditionGroups_BeforeDestination.concat( conditionGroupToMove, conditionGroups_AtDestinationAndRest );

            const conditionGroupsContainerNew = conditionGroupsContainer.cloneShallow(); // create new object
            conditionGroupsContainerNew.conditionGroups = conditionGroupsNew;

            const experimentConditions_GraphicRepresentation_PropsData = (
                create_experimentConditions_GraphicRepresentation_PropsData({
                    conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : state.conditionGroupsDataContainer
                })
            );

            return ({
                conditionGroupsContainer : conditionGroupsContainerNew,
                experimentConditions_GraphicRepresentation_PropsData
            });
        })
    }

    //  Time Points Maint

    /**
     *
     */
    _add_timePoints_ClickHandler( event ) {

        const any_projectSearchIdsAssigned_To_Conditions = this._any_projectSearchIdsAssigned_To_Conditions({ state : this.state });

        if ( any_projectSearchIdsAssigned_To_Conditions ) {
            if ( ! window.confirm( "Remove all searches from all conditions?" ) ) {
                return; // EARLY RETURN
            }
        }

        const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = {
            isTimePoints : true,
            timePointsGroupLabel : _TIME_POINTS_GROUP_LABEL,
            add : this._add_singleConditionGroup_Maint_Overlay_BindThis,
            cancel : this._cancel_singleConditionGroup_Maint_BindThis
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint };
        });
    }

    /**
     *
     */
    _update_timePoints_ClickHandler( event ) {

        const any_projectSearchIdsAssigned_To_Conditions = this._any_projectSearchIdsAssigned_To_Conditions({ state : this.state });

        //  Remove since does not apply for Time Points
        // if ( any_projectSearchIdsAssigned_To_Conditions ) {
        //     if ( ! window.confirm( "Remove all searches from all conditions?" ) ) {
        //         return; // EARLY RETURN
        //     }
        // }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            const conditionGroupIndex = 0; // Always first entry

            const conditionGroupsContainer = state.conditionGroupsContainer;

            const conditionGroups = conditionGroupsContainer.conditionGroups;

            const conditionGroup_ForIndex = conditionGroups[ conditionGroupIndex ];
            if ( ! conditionGroup_ForIndex ) {
                console.warn("_update_timePoints_ClickHandler: conditionGroups[ 0 ] not return a value");
                return null; // EARLY RETURN
            }
            if ( conditionGroup_ForIndex.id !== _CONDITION_GROUP_ID_TIME_POINTS ) {
                console.warn("_update_timePoints_ClickHandler: conditionGroup_ForIndex.id !== _CONDITION_GROUP_ID_TIME_POINTS");
                return null; // EARLY RETURN
            }

            const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = {
                conditionGroup : conditionGroup_ForIndex,
                isTimePoints : true,
                timePointsGroupLabel : _TIME_POINTS_GROUP_LABEL,
                save : this._save_singleConditionGroup_Maint_Overlay_BindThis,
                cancel : this._cancel_singleConditionGroup_Maint_BindThis
            }

            return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint };
        });
    }

    /**
     *
     */
    _delete_timePoints_ClickHandler( event ) {

        const any_projectSearchIdsAssigned_To_Conditions = this._any_projectSearchIdsAssigned_To_Conditions({ state : this.state });

        if ( any_projectSearchIdsAssigned_To_Conditions ) {
            if ( ! window.confirm( "Remove all searches from all conditions?" ) ) {
                return; // EARLY RETURN
            }
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            const conditionGroupIndex = 0; // Always first entry

            const conditionGroupsContainer = state.conditionGroupsContainer;

            const conditionGroups = conditionGroupsContainer.conditionGroups;

            const conditionGroup_ForIndex = conditionGroups[ conditionGroupIndex ];
            if ( ! conditionGroup_ForIndex ) {
                console.warn("_delete_timePoints_ClickHandler: conditionGroups[ 0 ] not return a value");
                return null; // EARLY RETURN
            }
            if ( conditionGroup_ForIndex.id !== _CONDITION_GROUP_ID_TIME_POINTS ) {
                console.warn("_delete_timePoints_ClickHandler: conditionGroup_ForIndex.id !== _CONDITION_GROUP_ID_TIME_POINTS");
                return null; // EARLY RETURN
            }

            //  Create new array without conditionGroupIndex

            const conditionGroups_Before = conditionGroups.slice( 0, conditionGroupIndex );
            const conditionGroups_After = conditionGroups.slice( conditionGroupIndex + 1 );

            const conditionGroupsNew = conditionGroups_Before.concat( conditionGroups_After ); // create new array with item removed

            const conditionGroupsContainerNew = conditionGroupsContainer.cloneShallow(); // create new object
            conditionGroupsContainerNew.conditionGroups = conditionGroupsNew;

            const conditionGroupsDataContainerNew = state.conditionGroupsDataContainer.cloneShallow(); // create new object
            conditionGroupsDataContainerNew.clearConditionData(); //  Clear conditions Data

            const experimentConditions_GraphicRepresentation_PropsData = (
                create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew })
            );

            return ({
                numberTimePoints : 0,
                conditionGroupsContainer : conditionGroupsContainerNew,
                conditionGroupsDataContainer : conditionGroupsDataContainerNew,
                experimentConditions_GraphicRepresentation_PropsData
            });
        });
    }

    //  Condition Group Maint

    /**
     *
     */
    _add_conditionGroup_InConditionGroupList_ClickHandler(  ) {

        const any_projectSearchIdsAssigned_To_Conditions = this._any_projectSearchIdsAssigned_To_Conditions({ state : this.state });

        if ( any_projectSearchIdsAssigned_To_Conditions ) {
            if ( ! window.confirm( "Remove all searches from all conditions?" ) ) {
                return; // EARLY RETURN
            }
        }

        const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = {
            add : this._add_singleConditionGroup_Maint_Overlay_BindThis,
            cancel : this._cancel_singleConditionGroup_Maint_BindThis
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint };
        });

    }

    /**
     *
     */
    _add_singleConditionGroup_Maint_Overlay( params : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_Save_FunctionType_Params ) {

        const conditionGroup : Experiment_ConditionGroup = params.conditionGroup;
        const isTimePoints : boolean = params.isTimePoints;

        if ( ! ( conditionGroup instanceof Experiment_ConditionGroup ) ) {
            const msg = "ERROR: _add_singleConditionGroup_Maint_Overlay({ conditionGroup, isTimePoints }}: if () ! ( conditionGroup instanceof Experiment_ConditionGroup ) )";
            console.warn( msg );
            throw Error( msg );
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : null };
        });

        this._add_conditionGroup_ToState({ conditionGroup, isTimePoints });
    }

    /**
     * Condition Group in Condition Group List Click Handler
     */
    _conditionGroup_InConditionGroupList_ClickHandler({ event, conditionGroup } : { event, conditionGroup : Experiment_ConditionGroup }) {

        const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = {
            conditionGroup,
            save : this._save_singleConditionGroup_Maint_Overlay_BindThis,
            cancel : this._cancel_singleConditionGroup_Maint_BindThis
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint }
        });
    }

    //  Not Used

    // /**
    //  * Condition in Condition Matrix Graphic (Component Experiment_SingleExperiment_ConditionsGraphicRepresentation) Click Handler
    //  */
    // _condition_InConditionMatrixGraphic_ClickHandler( params : ExperimentConditions_GraphicRepresentation_ConditionCellClickHandler_Params ) {

    //     let conditionGroup = undefined;

    //     const conditionGroupsContainer = this.state.conditionGroupsContainer;

    //     const conditionGroups = conditionGroupsContainer.conditionGroups;

    //  Need code to look up condition and condition group from condition Id

    //     if ( conditionGroup.typeBiologicalReplicate || conditionGroup.typeTechnicalReplicate ) {
    //         //  conditionGroup does not support standard 'Maint'.  Updated via <select>
    //         return; // EARLY RETURN
    //     }

    //     let isTimePoints = false;
    //     if ( conditionGroup.typeTimePoint ) {
    //         isTimePoints = true;
    //     }

    //     const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = {
    //         conditionGroup,
    //         isTimePoints,
    //         save : this._save_singleConditionGroup_Maint_Overlay_BindThis,
    //         cancel : this._cancel_singleConditionGroup_Maint_BindThis
    //     }

    //      this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

    //         return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint }
    //     });
    // }

    /**
     *
     */
    _save_singleConditionGroupChanges( params : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_Save_FunctionType_Params ) {

        const conditionGroup : Experiment_ConditionGroup = params.conditionGroup;
        const isTimePoints : boolean = params.isTimePoints;

        this.setState({ data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : null });

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._save_singleConditionGroupChanges_SetStateValues({ state, props, conditionGroup, isTimePoints });
        });
    }

    /**
     * @param conditionGroup - Built in save from prev value
     */
    _save_singleConditionGroupChanges_SetStateValues({ state, props, conditionGroup, isTimePoints } : {
        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State,
        props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props,
        conditionGroup : Experiment_ConditionGroup,
        isTimePoints  : boolean
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        const conditionGroupId = conditionGroup.id;

        const conditionGroupsContainer = state.conditionGroupsContainer;

        const conditionGroups = conditionGroupsContainer.conditionGroups;

        let conditionGroups_MatchingEntry : Experiment_ConditionGroup = undefined;
        let conditionGroup_Index : number = undefined;
        {
            let index = 0;
            for ( const conditionGroups_Entry of conditionGroups ) {
                if ( conditionGroups_Entry.id === conditionGroupId ) {
                    conditionGroups_MatchingEntry = conditionGroups_Entry;
                    conditionGroup_Index = index;
                    break;
                }
                index++;
            }
        }
        if ( conditionGroups_MatchingEntry === undefined ) {
            //  Entry not found
            return {}; // EARLY RETURN
        }
        const conditionGroupsContainerNew = conditionGroupsContainer.cloneShallow(); // create new object

        const conditionGroupsDataContainerNew = state.conditionGroupsDataContainer.cloneShallow(); // create new object

        //  remove any ConditionGroupCondition from conditionGroupsDataContainerNew that are in old conditions but not new conditions

        {
            const conditionsOld = conditionGroups_MatchingEntry.conditions;
            const conditionsNew = conditionGroup.conditions;
            if ( conditionsOld ) {
                for ( const conditionOld of conditionsOld ) {
                    let matchingConditionNew : Experiment_Condition = undefined;
                    if ( conditionsNew ) {
                        for ( const conditionNew of conditionsNew ) {
                            if ( conditionOld.id === conditionNew.id ) {
                                matchingConditionNew = conditionNew;
                                break;
                            }
                        }
                    }
                    if ( ! matchingConditionNew ) {
                        conditionGroupsDataContainerNew.delete_data_For_ConditionId ({
                            conditionId : conditionOld.id
                        });
                    }
                }
            }
        }

        //  For any new ConditionGroupCondition that are newly added, populate id
        {
            const conditionsNew = conditionGroup.conditions;

            if ( conditionsNew ) {
                for ( const conditionNew of conditionsNew ) {
                    if ( conditionNew.id === undefined ) {
                        //  id not set so assign
                        conditionNew.id = conditionGroupsContainerNew.conditionId_GetNextValue();
                    }
                }
            }
        }

        //  Overlay parts of conditionGroups_MatchingEntry with conditionGroup
        {
            conditionGroups_MatchingEntry.conditions = conditionGroup.conditions;
        }
        {  //  Update conditionGroups_MatchingEntry type flags if needed
            if ( conditionGroup.typeContinuous ) {
                if ( ! conditionGroups_MatchingEntry.typeContinuous ) {
                    conditionGroups_MatchingEntry.typeContinuous = true;
                    delete conditionGroups_MatchingEntry.typeDiscrete;
                }
            } else if ( conditionGroup.typeDiscrete ) {
                if ( ! conditionGroups_MatchingEntry.typeDiscrete ) {
                    conditionGroups_MatchingEntry.typeDiscrete = true;
                    delete conditionGroups_MatchingEntry.typeContinuous;
                }
            }
        }
        if ( ! isTimePoints ) {  //  Overlay label
            conditionGroups_MatchingEntry.label = conditionGroup.label;
        }

        const experimentConditions_GraphicRepresentation_PropsData = (
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew })
        );

        //  Maybe not needed here
        this._populateDefaultFilters_ForUnassignedFilters({ conditionGroupsContainer, conditionGroupsDataContainer : conditionGroupsDataContainerNew });

        const newState : ProjectPage_Experiments_SingleExperimentMaintRoot_State = {
            conditionGroupsContainer : conditionGroupsContainerNew,
            conditionGroupsDataContainer : conditionGroupsDataContainerNew,
            experimentConditions_GraphicRepresentation_PropsData,
            numberTimePoints : undefined
        };

        if ( isTimePoints ) {

            newState.numberTimePoints = 0;

            if ( conditionGroups_MatchingEntry.conditions ) {
                newState.numberTimePoints = conditionGroups_MatchingEntry.conditions.length;
            }
        }

        return newState;
    }



    _delete_conditionGroup_ClickHandler({ conditionGroupIndex, conditionGroupId } : { conditionGroupIndex : number, conditionGroupId : number }) {

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            const conditionGroupsContainer = state.conditionGroupsContainer;

            const conditionGroups = conditionGroupsContainer.conditionGroups;

            const conditionGroup_ForIndex = conditionGroups[ conditionGroupIndex ];
            if ( ! conditionGroup_ForIndex ) {
                //  No entry in conditionGroups for conditionGroupIndex so exit
                return {}; // EARLY RETURN
            }
            if ( conditionGroup_ForIndex.id !== conditionGroupId ) {
                //  id not match param conditionGroupId so exit
                return {}; // EARLY RETURN
            }

            //  Create new array without conditionGroupIndex

            const conditionGroups_Before = conditionGroups.slice( 0, conditionGroupIndex );
            const conditionGroups_After = conditionGroups.slice( conditionGroupIndex + 1 );

            const conditionGroupsNew = conditionGroups_Before.concat( conditionGroups_After ); // create new array with item removed

            const conditionGroupsContainerNew = conditionGroupsContainer.cloneShallow(); // create new object
            conditionGroupsContainerNew.conditionGroups = conditionGroupsNew;

            const conditionGroupsDataContainerNew = state.conditionGroupsDataContainer.cloneShallow(); // create new object
            conditionGroupsDataContainerNew.clearConditionData(); //  Clear conditions Data

            const experimentConditions_GraphicRepresentation_PropsData = (
                create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew })
            );

            return ({
                conditionGroupsContainer : conditionGroupsContainerNew,
                conditionGroupsDataContainer : conditionGroupsDataContainerNew,
                experimentConditions_GraphicRepresentation_PropsData
            });
        });

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._save_Button_UpdateEnabled_NewState({ state });
        });
    }



    _cancel_singleConditionGroup_Maint() {

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return { data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : null };
        });
    }

    /**
     *
     */
    _add_conditionGroup_ToState({ conditionGroup, isTimePoints } : { conditionGroup : Experiment_ConditionGroup, isTimePoints : boolean }) {

        if ( ! ( conditionGroup instanceof Experiment_ConditionGroup ) ) {
            const msg = "ERROR: _add_conditionGroup_ToState({ conditionGroup, isTimePoints }}: if () ! ( conditionGroup instanceof Experiment_ConditionGroup ) )";
            console.warn( msg );
            throw Error( msg );
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._add_conditionGroup_SetState({ state, props, conditionGroup, isTimePoints })
        });
    }

    /**
     *
     */
    _add_conditionGroup_SetState({ state, props, conditionGroup, isTimePoints } : {

        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State,
        props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props,
        conditionGroup : Experiment_ConditionGroup,
        isTimePoints  : boolean
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        const conditionGroupsContainer_Old = state.conditionGroupsContainer;

        const conditionGroupsContainerNew = conditionGroupsContainer_Old.cloneShallow();

        const conditionGroups_Old = conditionGroupsContainer_Old.conditionGroups;

        //  Assign conditionGroup.id and other conditionGroup properties

        if ( isTimePoints ) {
            //  Set Time Points Special Properties

            conditionGroup.label = _TIME_POINTS_GROUP_LABEL;
            conditionGroup.typeTimePoint = true;
            conditionGroup.specialConditionGroup = true;
            conditionGroup.id = _CONDITION_GROUP_ID_TIME_POINTS;

        } else {

            conditionGroup.id = conditionGroupsContainerNew.conditionGroupId_GetNextValue();
        }

        { // Assign condition.id
            const conditions = conditionGroup.conditions;
            if ( conditions ) {
                for ( const condition of conditions ) {
                    condition.id = conditionGroupsContainerNew.conditionId_GetNextValue();
                }
            }
        }

        let index_InsertBefore : number = undefined;

        if ( isTimePoints ) {
            //  Always insert Time Points at the Start
            index_InsertBefore = 0;

        } else {

            //  Keep typeBiologicalReplicate and typeTechnicalReplicate at end of array, if present

            for ( let index = 0; index < conditionGroups_Old.length; index++ ) {
                const conditionGroup = conditionGroups_Old[ index ];
                if ( conditionGroup.typeBiologicalReplicate || conditionGroup.typeTechnicalReplicate ) {
                    index_InsertBefore = index;
                    break;
                }
            }
        }

        let conditionGroupsNew : Array<Experiment_ConditionGroup> = undefined;

        if ( index_InsertBefore !== undefined ) {

            const conditionGroups_Old_BeforeReplicates = conditionGroups_Old.slice( 0, index_InsertBefore );
            const conditionGroups_Old_Replicates = conditionGroups_Old.slice( index_InsertBefore );

            conditionGroupsNew = conditionGroups_Old_BeforeReplicates.concat( conditionGroup, conditionGroups_Old_Replicates ); // create new array with item added to it, before Replicate entries

        } else {

            conditionGroupsNew = conditionGroups_Old.concat( conditionGroup ); // create new array with item added to it
        }

        conditionGroupsContainerNew.conditionGroups = conditionGroupsNew;

        const conditionGroupsDataContainerNew = state.conditionGroupsDataContainer.cloneShallow(); // create new object
        conditionGroupsDataContainerNew.clearConditionData(); //  Clear conditions Data

        //  May not be needed here, since no searches added yet
        this._populateDefaultFilters_ForUnassignedFilters({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew });

        const experimentConditions_GraphicRepresentation_PropsData = (
            create_experimentConditions_GraphicRepresentation_PropsData({ conditionGroupsContainer : conditionGroupsContainerNew, conditionGroupsDataContainer : conditionGroupsDataContainerNew })
        );

        const newState : ProjectPage_Experiments_SingleExperimentMaintRoot_State = {
            conditionGroupsContainer : conditionGroupsContainerNew,
            conditionGroupsDataContainer : conditionGroupsDataContainerNew,
            experimentConditions_GraphicRepresentation_PropsData,
            numberTimePoints : undefined
        };

        if ( isTimePoints ) {

            let new_numberTimePoints = 0;
            const conditions = conditionGroup.conditions;
            if ( conditions ) {
                new_numberTimePoints = conditions.length;
            }
            newState.numberTimePoints = new_numberTimePoints;
        }

        return newState;
    }

    ///////////////////

    _gotoStep_1_ButtonClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return {
                current_Step : _CURRENT_STEP__1__DEFINE_EXPERIMENT,
                data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : null,
                graphicRep_SelectedCells : null
            };
        });
    }

    _gotoStep_2_ButtonClicked( event: React.MouseEvent<HTMLElement, MouseEvent>  ) {

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return {
                current_Step : _CURRENT_STEP__2__ADD_SEARCHES_TO_CONDITIONS,
                data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : null,
                graphicRep_SelectedCells : null
            };
        });
    }

    /**
     * callback: Called from click handler in class Experiment_SingleExperiment_ConditionsGraphicRepresentation
     */
    _mainCellClickHandler( params : ExperimentConditions_GraphicRepresentation_MainCellClickHandler_Params ) {

        const event = params.event;
        const mainCellIdentifier = params.mainCellIdentifier;
        const entryCell_onMouseLeaveHandler = params.entryCell_onMouseLeaveHandler;

        //  When in doubt, call entryCell_onMouseLeaveHandler({ event });

        //  If processing this click removes the main cell, then call entryCell_onMouseLeaveHandler({ event }); to clean up any onMouseEnter state
        if ( entryCell_onMouseLeaveHandler ) {
            entryCell_onMouseLeaveHandler({ event });
        }

        //  Get data for Main Cell Clicked to pass to

        this.setState( (state: ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {
            return this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ state, mainCellIdentifier });
        });
    }


    /**
     *
     */
    _get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ state, mainCellIdentifier } : {

        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State,
        mainCellIdentifier : ExperimentConditions_GraphicRepresentation_MainCell_Identifier;
    })  : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        const conditionIds_Array = mainCellIdentifier.get_cell_ConditionIds_AsArray();

        const conditionGroupsDataContainer = state.conditionGroupsDataContainer;
        const conditionGroupsContainer = state.conditionGroupsContainer;

        const conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({
            conditionIds_Array
        });

        let projectSearchIds_ForThisCell : Set<number> = undefined;

        if ( conditionGroupsDataContainer_Entry ) {

            const conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;

            projectSearchIds_ForThisCell = conditionGroupsDataContainer_Entry_Data.projectSearchIds;
        }

        //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
        const projectSearchIds_ContainedInAllOtherCells : Set<number> = new Set();

        {
            const callbackForEach_conditionGroupsDataContainer_Entry_Data = ({conditionGroupsDataContainer_Entry_Data}: { conditionGroupsDataContainer_Entry_Data: Experiment_ConditionGroupsDataContainer_DataEntry }) => {
                if (conditionGroupsDataContainer_Entry_Data.data) {
                    const projectSearchIds_ForCell = conditionGroupsDataContainer_Entry_Data.data.projectSearchIds;
                    if (projectSearchIds_ForCell) {
                        for (const projectSearchId of projectSearchIds_ForCell) {
                            if ( ( ! projectSearchIds_ForThisCell ) || ( ! projectSearchIds_ForThisCell.has( projectSearchId ) ) ) {
                                projectSearchIds_ContainedInAllOtherCells.add(projectSearchId);
                            }
                        }
                    }
                }
            }

            _process_conditionGroupsDataContainer_ExcludingProvided_mainCellIdentifier({
                mainCellIdentifier_ToExclude: mainCellIdentifier,
                conditionGroupsContainer,
                conditionGroupsDataContainer,
                callbackForEach_conditionGroupsDataContainer_Entry_Data
            });
        }

        const data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = {
            projectSearchIds_ForThisCell,
            projectSearchIds_ContainedInAllOtherCells,
            conditionGroupsContainer,
            conditionGroupsDataContainer,
            mainCell_Identifier : mainCellIdentifier,
            searchesData : this.props.searchesData,
            save_ProjectSearchIds_ForMainCell : this._save_ProjectSearchIds_ForMainCell_BindThis,
            save_updated_conditionGroupsDataContainer : this._save_updated_conditionGroupsDataContainer_BindThis
        }

        let graphicRep_SelectedCells_Local : ExperimentConditions_GraphicRepresentation_SelectedCells = undefined;
        if ( state.graphicRep_SelectedCells ) {

            graphicRep_SelectedCells_Local = state.graphicRep_SelectedCells;
        } else {
            graphicRep_SelectedCells_Local = create_ExperimentConditions_GraphicRepresentation_SelectedCells__NO__ExperimentPageCommon_SelectedConditionIdsAndPaths_CentralStateManagerObjectClass({ conditionGroupsContainer });
        }

        graphicRep_SelectedCells_Local.clear_MainCell_Selection_Entries();

        graphicRep_SelectedCells_Local.add_MainCell_Entry( mainCellIdentifier );

        return { data_ProjectPage_Experiments_SingleExperiment_MainCellMaint, graphicRep_SelectedCells : graphicRep_SelectedCells_Local };
    }


    /**
     * 
     */
    _mainCell_getHoverContents( params : ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents_Params ) {

        const conditionIdPath = params.conditionIdPath;
        
        const conditionGroupsDisplay = [];

        if ( conditionIdPath ) {

            const conditionGroupsContainer = this.state.conditionGroupsContainer;
            if ( conditionGroupsContainer ) {
                const conditionGroups = conditionGroupsContainer.conditionGroups;
                if ( conditionGroups ) {
                    const conditionGroupsLength = conditionGroups.length;

                    for ( let index_conditionGroups = 0; index_conditionGroups < conditionGroupsLength; index_conditionGroups++ ) {
                        
                        const conditionGroup = conditionGroups[ index_conditionGroups ];
                        const conditions = conditionGroup.conditions;

                        let condition_For_cell_conditionIdPath : Experiment_Condition = undefined;

                        for ( const condition_Entry of conditions ) {
                            for ( const cell_conditionIdPath of conditionIdPath ) {
                                if ( condition_Entry.id === cell_conditionIdPath ) {
                                    condition_For_cell_conditionIdPath = condition_Entry;
                                    break;
                                }
                            }
                            if ( condition_For_cell_conditionIdPath ) {
                                break;
                            }
                        }

                        if ( ! condition_For_cell_conditionIdPath ) {
                            //  No entry found so skip
                            continue;  // EARLY CONTINUE
                        } 

                        const conditionGroupDisplay = (
                            <li key={ index_conditionGroups } style={ { whiteSpace : "nowrap", marginBottom: 3 } }>
                                <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                >{ conditionGroup.label }</span>
                                <span >:&nbsp;</span> 
                                <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                >{ condition_For_cell_conditionIdPath.label }</span>
                            </li>
                        );
                        
                        conditionGroupsDisplay.push( conditionGroupDisplay );
                    }
                }
            }
        }

        let searchesDisplay = undefined;
        {
            const conditionGroupsDataContainer = this.state.conditionGroupsDataContainer;

            let conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({ 
                conditionIds_Array : conditionIdPath
            });

            // let projectSearchIdsString = "none";

            if ( conditionGroupsDataContainer_Entry ) {

                const conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;

                const projectSearchIds = conditionGroupsDataContainer_Entry_Data.projectSearchIds;

                if ( projectSearchIds ) {
                    //  projectSearchIds is Set
                    const projectSearchIdsArray = Array.from( projectSearchIds );
                    if ( projectSearchIdsArray.length !== 0 ) {

                        const searchDataEntries = [];

                        for ( const projectSearchId of projectSearchIdsArray ) {
                            const searchDataEntry = this._searchDataMap_KeyProjectSearchId.get( projectSearchId );
                            if ( ! searchDataEntry ) {
                                console.log("WARN: No entry in this._searchDataMap_KeyProjectSearchId for projectSearchId: " + projectSearchId );
                                continue; // EARLY CONTINUE
                            }
                            searchDataEntries.push( searchDataEntry );
                        }

                        searchDataEntries.sort( (a,b) => { // sort on searchId ascending
                            if (a.searchId < b.searchId) {
                                return -1;
                            } else if (a.searchId > b.searchId) {
                                return 1;
                            }
                            return 0
                        })

                        const searchComponents = [];
                        {
                            let index = 0;
                            for ( const searchDataEntry of searchDataEntries ) {
                                const searchComponent = (
                                    <li key={ index } style={ { marginBottom: 4 } }>
                                        <span >(</span> 
                                        <span >{ searchDataEntry.searchId }</span>
                                        <span >) </span> 
                                        <span style={ { overflowWrap : "break-word"  /* Force single words to break to wrap if exceed max width */  } }
                                        >{ searchDataEntry.name }</span>
                                    </li>
                                );
                                searchComponents.push( searchComponent );
                                index++;
                            }
                        }
                        searchesDisplay = (
                            <div >
                                <div style={ { fontWeight: "bold", marginTop: 5, marginBottom: 5 } }>
                                    Searches:
                                </div>
                                <div >
                                    <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                                        { searchComponents }
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                }
            }
        }
        if ( searchesDisplay === undefined ) {
            searchesDisplay = (
                <div style={ { marginTop: 5, marginBottom: 5 } }>
                    <span style={ { fontWeight: "bold" } }>Searches:</span>
                    <span >&nbsp;empty</span>
                </div>
            );
        }

        const hoverContent = (
            <div style={ { textAlign : "left" } }>
                <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                    Conditions:
                </div>
                <div >
                    <ul style={ { marginBlockStart: 0, marginBlockEnd: 0 } }>
                        { conditionGroupsDisplay }
                    </ul>
                </div>
                <div >
                    { searchesDisplay }
                </div>
            </div>
        );


        return { hoverContent };
    }

    _save_ProjectSearchIds_ForMainCell({ projectSearchIds } : { projectSearchIds : Set<number> }) : void {

        if ( ! ( projectSearchIds instanceof Set ) ) {
            const msg = "_save_ProjectSearchIds_ForMainCell({ projectSearchIds }): projectSearchIds is not type Set";
            console.warn( msg, projectSearchIds );
            throw Error( msg );
        }

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._save_ProjectSearchIds_ForMainCell_SetStateCallback({ projectSearchIds, state, props });
        });

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._save_Button_UpdateEnabled_NewState({ state });
        });
    }
 
    /**
     * 
     */
    _save_ProjectSearchIds_ForMainCell_SetStateCallback({ projectSearchIds, state, props } : { 
        
        projectSearchIds : Set<number>, 
        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, 
        props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props
    }) : ProjectPage_Experiments_SingleExperimentMaintRoot_State {

        const conditionGroupsContainer = this.state.conditionGroupsContainer;
        const conditionGroupsDataContainer = this.state.conditionGroupsDataContainer;

        const data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = state.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint;

        const mainCell_Identifier = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.mainCell_Identifier;

        const callbackForEach_conditionGroupsDataContainer_Entry_Data = ({ conditionGroupsDataContainer_Entry_Data } : { conditionGroupsDataContainer_Entry_Data : Experiment_ConditionGroupsDataContainer_DataEntry }) => {
            const data = conditionGroupsDataContainer_Entry_Data.data;
            if ( data ) {
                const projectSearchIds_InEntry = data.projectSearchIds;
                if ( projectSearchIds_InEntry ) {
                    // for each projectSearchIds in current Main Cell, remove them from projectSearchIds_InEntry
                    for ( const projectSearchId of projectSearchIds ) {
                        projectSearchIds_InEntry.delete( projectSearchId );
                    }
                }   
            }
        }

        _process_conditionGroupsDataContainer_ExcludingProvided_mainCellIdentifier({ 
            mainCellIdentifier_ToExclude : mainCell_Identifier,
            conditionGroupsContainer, 
            conditionGroupsDataContainer,
            callbackForEach_conditionGroupsDataContainer_Entry_Data
        });

        const conditionIds_Array = mainCell_Identifier.get_cell_ConditionIds_AsArray();

        let conditionGroupsDataContainer_Entry = conditionGroupsDataContainer.get_data ({ 
            conditionIds_Array
        });

        if ( ! conditionGroupsDataContainer_Entry ) {
            conditionGroupsDataContainer_Entry = { data : { projectSearchIds : undefined } };
            conditionGroupsDataContainer.put_data ({ 
                data : conditionGroupsDataContainer_Entry,
                conditionIds_Array
            });
        }

        let conditionGroupsDataContainer_Entry_Data = conditionGroupsDataContainer_Entry.data;
        if ( ! conditionGroupsDataContainer_Entry_Data ) {
            conditionGroupsDataContainer_Entry_Data = { projectSearchIds : undefined };
            conditionGroupsDataContainer_Entry.data = conditionGroupsDataContainer_Entry_Data;
        }

        conditionGroupsDataContainer_Entry_Data.projectSearchIds = projectSearchIds;

        this._populateDefaultFilters_ForUnassignedFilters({ conditionGroupsContainer, conditionGroupsDataContainer });


        //  Create new State for Display
        const experimentConditions_GraphicRepresentation_PropsData = ( 
            create_experimentConditions_GraphicRepresentation_PropsData({ 
                conditionGroupsContainer : this.state.conditionGroupsContainer, conditionGroupsDataContainer : this.state.conditionGroupsDataContainer
            })
        );

        //  Make shallow copy since changed
        const conditionGroupsDataContainerNew = conditionGroupsDataContainer.cloneShallow(); // create new object

        const stateNew : ProjectPage_Experiments_SingleExperimentMaintRoot_State = { 
            conditionGroupsDataContainer : conditionGroupsDataContainerNew,
            experimentConditions_GraphicRepresentation_PropsData,
            show_Experiment_SingleExperiment_ConditionsGraphicRepresentation : true 
        };

        //  Create local updated state to pass to this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint(...)

        const localUpdatedState : ProjectPage_Experiments_SingleExperimentMaintRoot_State =  Object.assign( {}, state );
        Object.assign( localUpdatedState, stateNew ); // copy localUpdatedState properties to localUpdatedState

        const updatedState_CellMaint : ProjectPage_Experiments_SingleExperimentMaintRoot_State = this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ state : localUpdatedState, mainCellIdentifier : mainCell_Identifier });

        Object.assign( stateNew, updatedState_CellMaint ); // copy this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint results properties to state

        const saveAsDraftButtonState : ProjectPage_Experiments_SingleExperimentMaintRoot_State = this._saveAsDraft_Button_UpdateEnabled_NewState({ state : stateNew });
        const saveButtonState : ProjectPage_Experiments_SingleExperimentMaintRoot_State = this._save_Button_UpdateEnabled_NewState({ state : stateNew })

        Object.assign( stateNew, saveAsDraftButtonState ); // copy saveAsDraftButtonState properties to state
        Object.assign( stateNew, saveButtonState ); // copy saveButtonState properties to state

        return stateNew;
    }

    /**
     * 
     */
    _save_updated_conditionGroupsDataContainer({ conditionGroupsDataContainer } : { conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer }) {

        this.setState( (state : ProjectPage_Experiments_SingleExperimentMaintRoot_State, props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props ) : ProjectPage_Experiments_SingleExperimentMaintRoot_State => {

            return this._save_updated_conditionGroupsDataContainer_SetState({ state, props, conditionGroupsDataContainer }) ;
        } );
    }

    /**
     * 
     */
    _save_updated_conditionGroupsDataContainer_SetState({ state, props, conditionGroupsDataContainer } : { 
        
        state : ProjectPage_Experiments_SingleExperimentMaintRoot_State 
        props : ProjectPage_Experiments_SingleExperimentMaintRoot_Props
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    }) {

        const conditionGroupsDataContainerNew = conditionGroupsDataContainer.cloneShallow();

        const data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = state.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint;

        const stateNew = { 
            conditionGroupsDataContainer : conditionGroupsDataContainerNew,
        };

        //  Create local updated state to pass to this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint(...)

        const localUpdatedState =  Object.assign( {}, state );
        Object.assign( localUpdatedState, stateNew ); // copy localUpdatedState properties to localUpdatedState

        const mainCellIdentifier : ExperimentConditions_GraphicRepresentation_MainCell_Identifier = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.mainCell_Identifier;

        const updatedState_CellMaint = this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ state : localUpdatedState, mainCellIdentifier });

        Object.assign( stateNew, updatedState_CellMaint ); // copy this._get_ForState__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint results properties to state

        const saveAsDraftButtonState = this._saveAsDraft_Button_UpdateEnabled_NewState({ state : stateNew });
        const saveButtonState = this._save_Button_UpdateEnabled_NewState({ state : stateNew })

        Object.assign( stateNew, saveAsDraftButtonState ); // copy saveAsDraftButtonState properties to state
        Object.assign( stateNew, saveButtonState ); // copy saveButtonState properties to state

        return stateNew;
    }

    /**
     * 
     */
    render () {

        if ( this.state.current_Step === _CURRENT_STEP__1__DEFINE_EXPERIMENT ) {

            return this._render_Step_1 ();

        } else if ( this.state.current_Step === _CURRENT_STEP__2__ADD_SEARCHES_TO_CONDITIONS ) {

            return this._render_Step_2 ();

        } else {
            throw Error("Unknow value for this.state.current_Step : " + this.state.current_Step  );
        }

    }


    /**
     * 
     */
    _render_Step_1 () {

        // let addDelete_conditionGroups_Allowed = true;

        let timePointsAddLinkBlock : JSX.Element = undefined;
        let timePointsMaintBlock : JSX.Element = undefined;

        let conditionGroupAddLinkBlock : JSX.Element = undefined;

        let singleConditionGroup_Maint_Overlay : JSX.Element = undefined;

        let enabled_GoTo_Step_2_Button = false;

        if ( this.state.experimentName !== undefined && this.state.experimentName !== null && this.state.experimentName !== "" ) {
            if ( this.state.conditionGroupsContainer ) {

                const conditionGroups = this.state.conditionGroupsContainer.conditionGroups;
                if ( conditionGroups && conditionGroups.length !== 0 ) {

                    //  experimentName populated

                    //  At last 1 conditionGroups (Includes Time Points and Replicates)

                    enabled_GoTo_Step_2_Button = true;
                }
            }
        }
        let gotoStep_2_Button = (
            <div style={ { display: "inline-block", position: "relative", marginRight: 10 } }>
                <input type="button" value="Go To Step 2 - Add Searches" 
                    title="Go To Step 2 - Add searches to conditions"
                    onClick={ this._gotoStep_2_ButtonClicked_BindThis }
                    style={ {  } }
                    disabled={ ! enabled_GoTo_Step_2_Button } 
                />
                {   ( ! enabled_GoTo_Step_2_Button ? 
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            title="Experiment must be defined for button to be enabled."></div> 
                        : null 
                    ) 
                }
            </div>
        );

        if ( this.state.numberTimePoints ===  undefined || this.state.numberTimePoints === null || this.state.numberTimePoints === 0 ) {
            //  Add Time Points Link
            timePointsAddLinkBlock = (
                <div style={ { marginTop: 5 }}>
                    <span className=" fake-link " style={ { fontWeight: "bold", whiteSpace: "nowrap" } }
                        onClick={ this._add_timePoints_ClickHandler_BindThis }
                        title="Add Time Points"
                    >Add Time Points</span>
                </div>
            );
        } else {
            timePointsMaintBlock = (
                <div style={ { marginTop: 5 }}>
                    <span className=" fake-link " style={ { fontWeight: "bold", whiteSpace: "nowrap" } }
                        title="Change Time Points"
                        onClick={ this._update_timePoints_ClickHandler_BindThis }
                    >Time Points: { this.state.numberTimePoints } </span>
                    <img className=" icon-small clickable " 
                        style={ { marginLeft : 6 } }
                        src="static/images/icon-circle-delete.png" 
                        title="Delete All Time Points"
                        onClick={ this._delete_timePoints_ClickHandler_BindThis }
                        ></img>
                </div>
            );
        }

        //  Add Condition Group Link

        conditionGroupAddLinkBlock = (
            <div style={ { marginTop: 5 }}>
                <input type="button"
                    onClick={ this._add_conditionGroup_InConditionGroupList_ClickHandler_BindThis }
                    value="Add Condition Group" />
            </div>
        );
        
        let conditionGroupEntriesBlock : JSX.Element = undefined;

        {
            //  List the Condition Groups

            let delete_conditionGroup_ClickHandler = undefined;

            // if ( addDelete_conditionGroups_Allowed ) {

                delete_conditionGroup_ClickHandler = this._delete_conditionGroup_ClickHandler_BindThis;
            // }

            if ( this.state.conditionGroupsContainer ) {
                const conditionGroups = this.state.conditionGroupsContainer.conditionGroups;
                if ( conditionGroups ) {
                    conditionGroupEntriesBlock = (
                        <ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList 
                            conditionGroups={ conditionGroups }
                            conditionGroups_ChangeOrder={ this._conditionGroups_ChangeOrder_BindThis }
                            conditionGroup_ClickHandler={ this._conditionGroup_InConditionGroupList_ClickHandler_BindThis }
                            delete_conditionGroup_ClickHandler = { delete_conditionGroup_ClickHandler }
                        />
                    );
                }
            }
        }

        let experiment_Layout_Container_ConditionsGraphicRepresentation : JSX.Element = undefined;

        if ( this.state.show_Experiment_SingleExperiment_ConditionsGraphicRepresentation && this.state.experimentConditions_GraphicRepresentation_PropsData ) {

            let mainCellClickHandler = undefined;
 
            let experiment_SingleExperiment_ConditionsGraphicRepresentation = (
                <Experiment_SingleExperiment_ConditionsGraphicRepresentation 
                    data={ this.state.experimentConditions_GraphicRepresentation_PropsData }
                    //    Remove to simplify user experience since clicking a condition doesn't do anything if a replicate condition is clicked.
                    // conditionCellClickHandler={ this._condition_InConditionMatrixGraphic_ClickHandler_BindThis }
                    mainCellClickHandler={ mainCellClickHandler }
                    // mainCell_onMouseEnterHandler={ this._mainCell_onMouseEnterHandler_BindThis }
                    // mainCell_onMouseLeaveHandler={ this._mainCell_onMouseLeaveHandler_BindThis }
                    mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                    conditionGroupsContainer={ this.state.conditionGroupsContainer }
                />
            );

            experiment_Layout_Container_ConditionsGraphicRepresentation = (

                <React.Fragment>

                    <div style={ { fontWeight: "bold", whiteSpace: "nowrap", marginBottom: 5 } }>
                        Experiment Layout
                    </div>
                    <div style={ { overflowX: "auto" } }>

                        <div style={ { borderColor: "black", borderStyle: "solid", borderWidth: 1, display: "inline-block" } }>
                            <div style={ { paddingTop: 1, paddingLeft: 3, paddingRight: 3, paddingBottom: 3 } }>
                                { experiment_SingleExperiment_ConditionsGraphicRepresentation }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        let dataMaint_ForConditionGroupEntry : JSX.Element = undefined;

        if ( this.state.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint ) {

            dataMaint_ForConditionGroupEntry = (
                <div style={ { marginTop: "10px" } }>
                    {
                        <ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint
                            data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = { this.state.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint }
                        />
                    }
                </div>
            );
        }


        let saveAsDraftButton : JSX.Element = undefined;
        if ( this.state.draftExperiment ) {
            
            saveAsDraftButton = (
                <div style={ { position: "relative", display: "inline-block", marginRight: 10 } }>
                    <input type="button" value="Save as Draft" onClick={ this._save_Experiment_AsDraft_Clicked_BindThis } disabled={ ! this.state.saveAsDraftButtonEnabled } 
                        title="Save Draft of Experiment.  Only you will be able to see and use this experiment until it is published."
                    />
                    { ( ! this.state.saveAsDraftButtonEnabled ? 
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            title="Experiment name must be populated for 'Save as Draft' to be enabled."></div> 
                        : null ) }
                </div>
            );
        }

        let saveButton : JSX.Element = undefined;
        if ( ! this.state.draftExperiment ) {

            saveButton = (
                <div style={ { position: "relative", display: "inline-block", marginRight: 10 } }>
                    <input type="button" value="Save" onClick={ this._save_Experiment_Clicked_BindThis } disabled={ ! this.state.saveButtonEnabled } 
                        title="Update Published Experiment"
                    />
                    { ( ! this.state.saveButtonEnabled ? 
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            title="Experiment must be complete for Button to be enabled."></div> 
                        : null ) }
                </div>
            );
        }

        const replicatesCountOptions : Array<JSX.Element> = [];
        {  //  Create <options> for "Number of Biological Replicates" and  "Number of Technical Replicates"
            {
                const option = <option key={ _NUMBER_OF_REPLICATES_ZERO } value={ _NUMBER_OF_REPLICATES_ZERO }>{ _REPLICATES_ZERO_DISPLAY_LABEL }</option>;
                replicatesCountOptions.push( option );
            }
            for ( let counter = _NUMBER_OF_REPLICATES_MIN; counter <= _NUMBER_OF_REPLICATES_MAX; counter++ ) {
                let displayValue = counter.toString();
                if ( counter === 0 ) {
                    displayValue = _REPLICATES_ZERO_DISPLAY_LABEL;
                }
                const option = <option key={ counter } value={ counter }>{ displayValue }</option>;
                replicatesCountOptions.push( option );
            }
        }

        return (
            <React.Fragment>
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-top modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " >
                    <div style={ { fontWeight: "bold", fontSize: 16, marginBottom: 10 } } >
                        Step 1: Define Experiment
                    </div>
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " 
                    style={ { marginBottom: 10 } } >

                    { gotoStep_2_Button }
                    { saveAsDraftButton }
                    { saveButton }
                    <input type="button" value="Cancel" onClick={ this._cancel_Experiment_Clicked_BindThis } style={ { marginRight: 10 } } />
                </div>
                <div  className=" top-level fixed-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " 
                    style={ { marginBottom: 10 } }>
                    <span >Experiment Name: </span> 
                    <input type="text" style={ { width : 500 } }
                        onChange={ this._experimentNameChanged_BindThis } value={ this.state.experimentName } autoFocus 
                    />
                </div>

                <div  className=" top-level single-entry-variable-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right "
                    style={ { overflowY: "auto" }} >
                
                    {/* Condition Group List on Left, Graphic Display on Right */}
                    
                    <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr", gridTemplateRows: "min-content 1fr", columnGap: 30 } }>
                        <div style={ { gridRow: "1 / span 2" } }>
                            
                            { timePointsMaintBlock }
                            { timePointsAddLinkBlock }

                            <div style={ { marginTop : 10, marginBottom : 10 } }>
                                <div style={ { whiteSpace: "nowrap", marginBottom: 3 } }>
                                    <span style={ { fontWeight: "bold" } }>Biological Replicates: </span>
                                    <select value={ this.state.numberBiologicalReplicates } onChange={ this._numberBiologicalReplicates_Changed_BindThis }>
                                        { replicatesCountOptions }
                                    </select>
                                </div>
                                <div style={ { whiteSpace: "nowrap", marginBottom: 3 } }>
                                    <span style={ { fontWeight: "bold", paddingRight: 2 } }>Technical Replicates: </span>
                                    <select value={ this.state.numberTechnicalReplicates } onChange={ this._numberTechnicalReplicates_Changed_BindThis }>
                                        { replicatesCountOptions }
                                    </select>
                                </div>
                            </div>

                            <div >
                                { conditionGroupEntriesBlock }
                            </div>
                            { conditionGroupAddLinkBlock }

                        </div>

                        { experiment_Layout_Container_ConditionsGraphicRepresentation } {/* Fragment with 2 <div> */}
                    </div>
                </div>
                {/* Padding at bottom has to be in separate div */}
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-bottom modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " >
                </div>

                {/* Arbitrary Placement since creates an overlay on top of this overlay */}
                { singleConditionGroup_Maint_Overlay }
                { dataMaint_ForConditionGroupEntry }

            </React.Fragment>
        );

    }

    /**
     * 
     */
    _render_Step_2 () {

        // let experiment_SingleExperiment_CG_C_Search_SearchFilters = undefined;

        // if ( this.state.current_Step === _CURRENT_STEP__3__USER_SET_SEARCH_FILTERS ) {

        //     experiment_SingleExperiment_CG_C_Search_SearchFilters = (

        //         <div style={ { marginTop: 10 } }>

        //             <Experiment_User_Set_Search_Filters  
        //                 conditionGroupsContainer={ this.state.conditionGroupsContainer }
        //                 conditionGroupsDataContainer={ this.state.conditionGroupsDataContainer }
        //                 searchDataMap_KeyProjectSearchId={ this._searchDataMap_KeyProjectSearchId }
        //                 searchesData={ this.props.searchesData }
        //                 cancel={ this._cancel_User_Set_Filters_for_Searches_BindThis }
        //                 save={ this._save_User_Set_Filters_for_Searches_BindThis }
        //             />
        //         </div>
        //     );
        // }


        let gotoStep_1_Button = (
            <input type="button" value="Go To Step 1 - Define Experiment" 
                            onClick={ this._gotoStep_1_ButtonClicked_BindThis }
                            style={ { marginRight: 10 } } />
        );

        let experiment_Layout_Container_ConditionsGraphicRepresentation : JSX.Element = undefined;

        if ( this.state.show_Experiment_SingleExperiment_ConditionsGraphicRepresentation && this.state.experimentConditions_GraphicRepresentation_PropsData ) {

            //  Only set if step 2 
            const mainCellClickHandler = this._mainCellClickHandler_BindThis;
                
            const experiment_SingleExperiment_ConditionsGraphicRepresentation = (
                <Experiment_SingleExperiment_ConditionsGraphicRepresentation 
                    data={ this.state.experimentConditions_GraphicRepresentation_PropsData }
                    selectedCells={ this.state.graphicRep_SelectedCells }
                    conditionGroupsContainer={ this.state.conditionGroupsContainer }
                    conditionCellClickHandler={ undefined }
                    mainCellClickHandler={ mainCellClickHandler }
                    // mainCell_onMouseEnterHandler={ this._mainCell_onMouseEnterHandler_BindThis }
                    // mainCell_onMouseLeaveHandler={ this._mainCell_onMouseLeaveHandler_BindThis }
                    mainCell_getHoverContents={ this._mainCell_getHoverContents_BindThis }
                />
            );

            experiment_Layout_Container_ConditionsGraphicRepresentation = (

                <React.Fragment>

                    <div style={ { marginBottom: 5 } }>
                        <span style={ { marginRight: 10, fontWeight: "bold", whiteSpace: "nowrap" } }>
                            Experiment Layout
                        </span> 
                        {/* <span style={ { fontSize: 12 } }>
                            (Click on cells to add searches)
                        </span>  */}
                    </div>
                    <div >  {/* style={ { minWidth: "calc(50vw - 50px)" } } */}

                        <div style={ { maxWidth: "calc(50vw - 50px)", overflowX: "auto", borderColor: "black", borderStyle: "solid", borderWidth: 1, display: "inline-block" } }>
                                {/* maxWidth: "calc(50vw - 50px)",  */}
                            <div style={ { paddingTop: 1, paddingLeft: 3, paddingRight: 3, paddingBottom: 3 } }>
                                { experiment_SingleExperiment_ConditionsGraphicRepresentation }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }

        let saveAsDraftButton : JSX.Element = undefined;

        let publishExperimentButton : JSX.Element = undefined;  // For New or Draft Experiments 
        let saveButton : JSX.Element = undefined;               // For Existing Published (Non-Draft) Experiments 

        if ( this.state.draftExperiment ) {
            
            saveAsDraftButton = (
                <div style={ { position: "relative", display: "inline-block", marginRight: 10 } }>
                    <input type="button" value="Save as Draft" onClick={ this._save_Experiment_AsDraft_Clicked_BindThis } disabled={ ! this.state.saveAsDraftButtonEnabled } 
                        title="Save Draft of Experiment.  Only you will be able to see and use this experiment until it is published."
                    />
                    { ( ! this.state.saveAsDraftButtonEnabled ? 
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            title="Experiment name must be populated for 'Save as Draft' to be enabled."></div> 
                        : null ) }
                </div>
            );

            //  Draft Experiment so Publish button
            publishExperimentButton = (
                <div style={ { position: "relative", display: "inline-block", marginRight: 10 } }>
                    <input type="button" value="Publish Experiment" onClick={ this._save_Experiment_Clicked_BindThis } disabled={ ! this.state.saveButtonEnabled } 
                        title="Publish Experiment so all users can see and use it."
                    />
                    { ( ! this.state.saveButtonEnabled ? 
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            title="Experiment must be complete for Button to be enabled."></div> 
                        : null ) }
                </div>
            );
        } else {
            //  Not Draft Experiment so Save button
            saveButton = (
                <div style={ { position: "relative", display: "inline-block", marginRight: 10 } }>
                    <input type="button" value="Save" onClick={ this._save_Experiment_Clicked_BindThis } disabled={ ! this.state.saveButtonEnabled } 
                        title="Update Published Experiment"
                    />
                    { ( ! this.state.saveButtonEnabled ? 
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                            title="Experiment must be complete for Button to be enabled."></div> 
                        : null ) }
                </div>
            );
        }

        let dataMaint_ForMainCellEntry : JSX.Element = undefined;

        if ( this.state.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint ) {

            dataMaint_ForMainCellEntry = (
                <ProjectPage_Experiments_SingleExperiment_MainCellMaint
                    data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = { this.state.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint }
                />
            );
        }

        return (
            <React.Fragment>
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-top modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " >
                    <div style={ { fontWeight: "bold", fontSize: 16, marginBottom: 10 } } >
                        Step 2: Add Searches
                    </div>
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " 
                    style={ { marginBottom: 10 } } >
                    { gotoStep_1_Button }
                    { publishExperimentButton } {/* For New or Draft Experiments */}
                    { saveButton }              {/* For Existing Published (Non-Draft) Experiments */}
                    { saveAsDraftButton }
                    <input type="button" value="Cancel" onClick={ this._cancel_Experiment_Clicked_BindThis } style={ { marginRight: 10 } } />
                </div>
                <div  className=" top-level fixed-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " 
                    style={ { marginBottom: 10 } }>
                    <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>
                        <div style={ { marginRight: 5, whiteSpace: "nowrap" } }>Experiment Name: </div> 
                        <div >{ this.state.experimentName }</div>
                    </div>
                </div>

                <div  className=" top-level single-entry-variable-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right "
                    style={ { overflowY: "auto" }} >
                        {/* overflowY: "auto" */}
                
                    {/* Graphic Display on Left, Maint of Graphic Single Cell on Right */}
                    
                    <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr", gridTemplateRows: "min-content 1fr", columnGap: 30 } }>
                   
                        <div style={ { gridColumn: 2, gridRow: "1 / span 2" } }>

                            <div >  {/* style={ { maxWidth: "calc(50vw - 50px)" } } */}
                            
                                {/* Data for selected Cell */}
                                { dataMaint_ForMainCellEntry }

                                {/* If no value for dataMaint_ForMainCellEntry, display a message */}

                                { ( dataMaint_ForMainCellEntry ? null : (
                                    // No Cell selected so display this message
                                    <div >
                                        Select a cell on the left to add or update searches assigned to it.
                                    </div>
                                ) ) }
                            </div>
                        </div>

                        { experiment_Layout_Container_ConditionsGraphicRepresentation }  {/* Fragment with 2 <div> */}

                        {/* { experiment_SingleExperiment_CG_C_Search_SearchFilters } */}
                    </div>
                </div>
                {/* Padding at bottom has to be in separate div */}
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-bottom modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-right " >
                </div>

            </React.Fragment>
        );
    }

}  //  End of export class ProjectPage_Experiments_SingleExperimentMaintRoot extends React.Component {


//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


///    Not in a class:



/**
 * 
 */
const _conditionGroupsDataContainer_InitialValue = () => {
    return new Experiment_ConditionGroupsDataContainer({});
}



//////////////    

//  Type for callback function for next function

type CallbackForEach_conditionGroupsDataContainer_Entry_Data = ({ conditionGroupsDataContainer_Entry_Data } : { conditionGroupsDataContainer_Entry_Data : Experiment_ConditionGroupsDataContainer_DataEntry }) => void;


//////////////    

/////   Called from class methods:

//////     _getSearchesListForSpecificEntryCell({ ... }) {
//////     _save_ProjectSearchIds_ForMainCell_SetStateCallback({ projectSearchIds, state, props }) {

/**
 * 
 * 
 */
const _process_conditionGroupsDataContainer_ExcludingProvided_mainCellIdentifier = ({ 

    mainCellIdentifier_ToExclude ,
    conditionGroupsContainer, 
    conditionGroupsDataContainer,
    callbackForEach_conditionGroupsDataContainer_Entry_Data
} : { 
    
    mainCellIdentifier_ToExclude : ExperimentConditions_GraphicRepresentation_MainCell_Identifier;
    conditionGroupsContainer : Experiment_ConditionGroupsContainer, 
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer,
    callbackForEach_conditionGroupsDataContainer_Entry_Data : CallbackForEach_conditionGroupsDataContainer_Entry_Data
}) : void =>  {

    const cell_ConditionIds_Set = mainCellIdentifier_ToExclude.cell_ConditionIds_Set;

    const processAllDataEntries_Callback = ( param : Experiment_ConditionGroupsDataContainer__ProcessAllDataEntries_callback_Param ) => {

        const conditionGroupsDataContainer_DataEntry : Experiment_ConditionGroupsDataContainer_DataEntry = param.data;
        const conditionIds_Path : Set<number> = param.conditionIds_Path;

        if ( conditionIds_Path.size === cell_ConditionIds_Set.size ) {

            //  No longer need to create new Set since already a Set
            // const conditionIds_Path_Set = new Set( conditionIds_Path );
            // if ( conditionIds_Path_Set.size === cell_ConditionIds_Set.size ) { // retest after put in set since may remove dups
                let foundAll = true;
                for ( const conditionIds_Path_Entry of conditionIds_Path ) {
                    if ( ! cell_ConditionIds_Set.has( conditionIds_Path_Entry ) ) {
                        foundAll = false;
                        break;
                    }
                }
                if ( foundAll ) {
                    //  This entry matches identifier to exclude so return from processing this entry
                    return;  //  EARLY RETURN
                }
            // } else {
            //     const msg = "ERROR: _process_conditionGroupsDataContainer_ExcludingProvided_mainCellIdentifier: else of if ( conditionIds_Path_Set.size === cell_ConditionIds_Set.size )";
            //     console.warn( msg );
            //     throw Error( msg );
            // }
        } else {
            const msg = "ERROR: _process_conditionGroupsDataContainer_ExcludingProvided_mainCellIdentifier: else of if ( conditionIds_Path.size === cell_ConditionIds_Set.size )";
            console.warn( msg );
            throw Error( msg );
        }

        //  Not entry to exclude so continue processing 

        callbackForEach_conditionGroupsDataContainer_Entry_Data({ conditionGroupsDataContainer_Entry_Data : conditionGroupsDataContainer_DataEntry });        
    }

    conditionGroupsDataContainer.processAllDataEntries_ConditionGroupsDataContainer({ callback : processAllDataEntries_Callback });
}

//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


///    Not in a class:

///////    Get JSON for saving experiment

/**
 * 
 */
const _save_Experiment = ({ projectIdentifier, experimentId, experimentName, conditionGroupsContainer, conditionGroupsDataContainer }) => {

    const result_getExperimentRootForSave = _getExperimentRootForSave({ conditionGroupsContainer, conditionGroupsDataContainer });

    const experimentRoot = result_getExperimentRootForSave.experimentRoot;
    const searchDataLookupParamsRoot = result_getExperimentRootForSave.searchDataLookupParamsRoot;

    const experiment = {
        projectIdentifier,
        experimentId, // populated for existing experiment
        experimentName,
        draft : false,
        experimentRoot,
        searchDataLookupParamsRoot
    };

    const promise_saveExperimentToServer = _saveExperimentToServer({ experiment });

    return promise_saveExperimentToServer;
}

/**
 * 
 */
const _save_Experiment_AsDraft = ({ projectIdentifier, experimentId, experimentName, conditionGroupsContainer, conditionGroupsDataContainer }) => {

    const result_getExperimentRootForSave = _getExperimentRootForSave({ conditionGroupsContainer, conditionGroupsDataContainer });

    const experimentRoot = result_getExperimentRootForSave.experimentRoot;
    const searchDataLookupParamsRoot = result_getExperimentRootForSave.searchDataLookupParamsRoot;

    const experiment = {
        projectIdentifier,
        experimentId, // populated for existing experiment
        experimentName,
        draft : true,
        experimentRoot,
        searchDataLookupParamsRoot
    };

    const promise_saveExperimentToServer = _saveExperimentToServer({ experiment });

    return promise_saveExperimentToServer;
}

/**
 * Generate the JSON to be saved
 */
const _getExperimentRootForSave = ({ conditionGroupsContainer, conditionGroupsDataContainer } : { 
    
    conditionGroupsContainer : Experiment_ConditionGroupsContainer, 
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
}) : { 
    experimentRoot, 
    searchDataLookupParamsRoot 
} => {


    if ( ( ! conditionGroupsContainer ) || ( ! conditionGroupsDataContainer ) ) {
        //  No Data so error
       throw Error("conditionGroupsContainer or conditionGroupsDataContainer is not populated")
    }

    //  conditionGroupsContainer is all objects and arrays so just serialize to JSON

    const experimentMainData : { 
        version : number, 
        conditionGroupsContainer : Experiment_ConditionGroupsContainer, 
        experimentConditionData? 
    } = { version: 1, conditionGroupsContainer };

    let searchDataLookupParamsRoot = undefined;
    let projectSearchIdsOnly : Array<number> = [];

    const conditionGroups = conditionGroupsContainer.conditionGroups;
    if ( conditionGroups && conditionGroups.length !== 0 ) {
        //  Have Data so process it

        //  Get Data organized by Condition Group / Condition
        
        const getAllData_ForSave_ConditionGroupCondition_Result = conditionGroupsDataContainer.getAllData_ForSave_ConditionGroupCondition({ conditionGroups });

        const experimentConditionData = getAllData_ForSave_ConditionGroupCondition_Result.mainResult;
        projectSearchIdsOnly = getAllData_ForSave_ConditionGroupCondition_Result.projectSearchIds_All;

        experimentMainData.experimentConditionData = experimentConditionData;

        if ( projectSearchIdsOnly && projectSearchIdsOnly.length !== 0 ) {

            //  Get Data for Filters/Cutoffs Organized by Project Search Id

            searchDataLookupParamsRoot = _get_searchDataLookupParamsRoot_ForSaveToDB({ projectSearchIds : projectSearchIdsOnly, conditionGroupsDataContainer });
        }
    }

    const experimentRoot = experimentMainData

    return { experimentRoot, searchDataLookupParamsRoot };
}


/**
 * 
 */
const _get_searchDataLookupParamsRoot_ForSaveToDB = ({ projectSearchIds, conditionGroupsDataContainer } : { 
    
    projectSearchIds : Array<number>  //  Since from To Save Data
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
}) => {

    const paramsForProjectSearchIdsList = [];

    for ( const projectSearchId of projectSearchIds ) {

        let data_conditionGroupsDataContainer = conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId });
        if ( ! data_conditionGroupsDataContainer ) {
            console.warn("_getSearchFilterData_ForProjectSearchId: No data for projectSearchId: " + projectSearchId );
            throw Error( "_getSearchFilterData_ForProjectSearchId: No data for projectSearchId: " + projectSearchId );
            // return undefined;
        }
    
        const searchFilterData_ForProjectSearchId = _getSearchFilterData_ForProjectSearchId({ data_conditionGroupsDataContainer, projectSearchId });
        
        paramsForProjectSearchIdsList.push( searchFilterData_ForProjectSearchId );
    }

    const paramsForProjectSearchIds = { paramsForProjectSearchIdsList };

    const searchDataLookupParamsRoot = { versionNumber : 1, paramsForProjectSearchIds };

    return searchDataLookupParamsRoot;
}

/**
 * 
 */
const _getSearchFilterData_ForProjectSearchId = ({ data_conditionGroupsDataContainer, projectSearchId } : { 
    
    data_conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer_PerProjectSearchIdData
    projectSearchId : number
}) => {

    const reportedPeptideFilterData = data_conditionGroupsDataContainer.get_reportedPeptideFilters_PerProjectSearchId();
    const psmFilterDataMap = data_conditionGroupsDataContainer.get_psmFilters_PerProjectSearchId();

    let psmFilters = undefined;
    let reportedPeptideFilters = undefined;

    if ( reportedPeptideFilterData ) {
        reportedPeptideFilters = _getSearchFilterData_ForAnnType({ filterData : reportedPeptideFilterData });
    } 
    if ( psmFilterDataMap ) {
        psmFilters = _getSearchFilterData_ForAnnType({ filterData : psmFilterDataMap });
    }


	// private int projectSearchId;
	
	// //  Filter values (cutoffs per annotation type)
	// private List<SearchDataLookupParams_Filter_Per_AnnotationType> psmFilters;
	// private List<SearchDataLookupParams_Filter_Per_AnnotationType> reportedPeptideFilters;
	// private List<SearchDataLookupParams_Filter_Per_AnnotationType> matchedProteinFilters;

	// //  Annotation Type Ids to Display
	// private List<Integer> psmAnnTypeDisplay;
	// private List<Integer> reportedPeptideAnnTypeDisplay;
    // private List<Integer> matchedProteinAnnTypeDisplay;
    
    let matchedProteinFilters = undefined;

    let psmAnnTypeDisplay = data_conditionGroupsDataContainer.get_psmAnnTypeDisplay_PerProjectSearchId();
    let reportedPeptideAnnTypeDisplay = data_conditionGroupsDataContainer.get_reportedPeptideAnnTypeDisplay_PerProjectSearchId();

    let matchedProteinAnnTypeDisplay = data_conditionGroupsDataContainer.get_matchedProteinAnnTypeDisplay_PerProjectSearchId(); //  NOT SET

    return { 
        projectSearchId, 
        psmFilters, reportedPeptideFilters, matchedProteinFilters,
        psmAnnTypeDisplay, reportedPeptideAnnTypeDisplay, matchedProteinAnnTypeDisplay
    };
}

/**
 * 
 */
const _getSearchFilterData_ForAnnType = ({ filterData }) => {

    const result = [];

    for ( const entry of filterData ) {

        const annTypeId = entry.get_annTypeId();
        const value = entry.get_value();

        const resultEntry = { annTypeId, value };
        result.push( resultEntry );
    }

    return result;
}


///////////////////////////////////////

/**
 * 
 */
const _saveExperimentToServer = ({ experiment }) => {

    return new Promise( (resolve, reject) => {
        try {
            // let projectIdentifier = this.props.projectIdentifierFromURL;

            // let requestObj = {
            // 	projectIdentifier : projectIdentifier
            // };
            
            const requestObj = experiment;

            const url = "d/rws/for-page/experiment/add-save-experiment";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    resolve({ responseData });
                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({
                        errorException : e
                    });
                    throw e;
                }
            });
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    });
}





