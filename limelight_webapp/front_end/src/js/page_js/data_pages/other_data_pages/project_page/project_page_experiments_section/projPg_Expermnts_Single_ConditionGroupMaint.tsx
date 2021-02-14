/**
 * projPg_Expermnts_Single_ConditionGroupMaint.tsx
 * 
 * Single Experiment Condition Group Maint
 * 
 * Shown when Experiment Condition Group is clicked, or Add Condition Group is clicked
 * 
 * Manage Data for that Condition Group and the Conditions for it
 * 
 */


import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { 
    Experiment_ConditionGroupsContainer, Experiment_ConditionGroup, Experiment_Condition 
} from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';


const _CONDITION_TYPE_CONTINUOUS = "C";    //  Was ORDINAL
const _CONDITION_TYPE_DISCRETE = "D";   //  Was CATEGORICAL
const _CONDITION_TYPE_FIRST_OPTION_VALUE = _CONDITION_TYPE_CONTINUOUS;

const _CONDITION_GROUP_FLAGS_INITIAL_VALUE = { typeContinuous : true };

const _NUMBER_OF_CONDITIONS_MIN = 2;
const _NUMBER_OF_CONDITIONS_MAX = 65;

const _NUMBER_OF_CONDITIONS_MIN_AS_STRING = _NUMBER_OF_CONDITIONS_MIN.toString();

//////////////////////////

const conditionItemOuterPartsWidths = {
    paddingWidth: 2,
    borderWidth: 2
}

const conditionItemPartsWidths = {
    draggableIconWidth : 20,
    labelWidth : 200,
    deleteIconWidth : 20
};

const conditionItemStyle_gridTemplateColumns = (
    conditionItemPartsWidths.draggableIconWidth
    + "px "
    + conditionItemPartsWidths.labelWidth
    + "px "
    + conditionItemPartsWidths.deleteIconWidth
    + "px "
);


const conditionItemInnerStyle = { 
    display: "grid", 
    gridTemplateColumns: conditionItemStyle_gridTemplateColumns,
};

const conditionsContainerWidth = (
    conditionItemOuterPartsWidths.paddingWidth
    + conditionItemOuterPartsWidths.borderWidth
    + conditionItemPartsWidths.draggableIconWidth 
    + conditionItemPartsWidths.labelWidth
    + conditionItemPartsWidths.deleteIconWidth
    + 2
);

// const getListStyle = isDraggingOver => ({
//     // background: isDraggingOver ? "lightblue" : "lightgrey",
//     padding: XXX,
//     width: conditionGroupsContainerWidth
// });


const getConditionListItemOuterStyle = ( isDragging: any, draggableStyle: any ) => {

    //  Must use a function since need to add values in parameter 'draggableStyle' to result

    return {
        userSelect: "none",
        padding: conditionItemOuterPartsWidths.paddingWidth,

        borderWidth: conditionItemOuterPartsWidths.borderWidth,

        //  In CSS class experiment-maint-default-border-style
        // borderStyle: "solid",
        // borderColor: "grey",

        // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables (function parameter)
        ...draggableStyle
    }
};

class ConditionContainer {

    existingCondition? : Experiment_Condition    
    index : number
    conditionLabel : string
    labelSuffixInitiallyAssigned : number
}

class Experiment_ConditionGroup_Flags {
	
    typeContinuous? : boolean;
    typeDiscrete? : boolean;
    typeBiologicalReplicate? : boolean;
    typeTechnicalReplicate? : boolean;
    typeTimePoint? : boolean;
    specialConditionGroup? : boolean;  //  Set if typeBiologicalReplicate, typeTechnicalReplicate, or typeTimePoint
}

////////////

//  Exported Items

export class ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_Save_FunctionType_Params {
    conditionGroup : Experiment_ConditionGroup
    isTimePoints : boolean
}

export type ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_FunctionType = ( params : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_Save_FunctionType_Params ) => void;

export type ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Save_FunctionType = ( params : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_Save_FunctionType_Params ) => void;

export type ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Cancel_FunctionType = () => void;

/**
 * Props Property Type
 * 
 * Also used as State object in parent component
 */
export class  ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props_Data_Property {

    conditionGroup? : Experiment_ConditionGroup
    timePointsGroupLabel? : string
    isTimePoints? : boolean

    // callback functions:

    add? : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Add_FunctionType
    save? : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Save_FunctionType
    cancel : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Cancel_FunctionType
}


/**
 * 
 */
export interface ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props {

    data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props_Data_Property
}

/**
 * 
 */
interface ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State {

    conditionContainers? : Array<ConditionContainer>;
    conditionGroupFlags? : Experiment_ConditionGroup_Flags;
    conditionGroupLabel? : string;
    conditionGroupId? : number; //  conditionGroup.id if conditionGroup provided
    conditionGroupType? : string;
    conditionContainerMaxIndex? : number;
    conditionNumber? : string; // string read from <select> of condition count
    initialAdd? : boolean
}


/**
 * 
 */
export class ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint extends React.Component< ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props, ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State > {

    private _conditionGroupType_Changed_BindThis = this._conditionGroupType_Changed.bind(this);
    private _conditionNumber_Changed_BindThis = this._conditionNumber_Changed.bind(this);
    private _addInitialConditions_BindThis = this._addInitialConditions.bind(this);

    private _conditionGroupLabelChanged_BindThis = this._conditionGroupLabelChanged.bind(this);
    private _add_BindThis = this._add.bind(this);
    private _save_BindThis = this._save.bind(this);
    private _cancel_BindThis = this._cancel.bind(this);

    private _conditions_ChangeOrder_BindThis = this._conditions_ChangeOrder.bind(this);
    private _deleteConditionHandler_BindThis = this._deleteConditionHandler.bind(this);
    private _changeConditionContainerConditionLabel_BindThis = this._changeConditionContainerConditionLabel.bind(this);

    private _addCondition_BindThis = this._addCondition.bind(this);

    private max_labelSuffixInitiallyAssigned : number = undefined;  // Place here since state is async

    /**
     * 
     */
    constructor(props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props) {
        super(props);

        // this._headerColumnClicked = this._headerColumnClicked.bind(this);

        // {
        //     const defaultDialogTop = 45;

        //     const windowScrollY = Math.floor( window.scrollY );

        //     this._dialogTop = defaultDialogTop + windowScrollY;
        // }
        const newState = this._computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint({ 
            data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint 
        });

        this.state = newState;
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


    //  Do NOT use, will be removed
    // componentWillReceiveProps() {
    //     var z = 0;
    // }

    // shouldComponentUpdate(nextProps, nextState) {

    //     if ( ??? ) {
    //         return true;
    //     }
    //     return false;
    // }

    //  Do NOT use, will be removed
    // componentWillUpdate() {
    //     var z = 0;
    // }

    // getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. 
    // It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. 
    // Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

    // If your component implements the getSnapshotBeforeUpdate(prevProps, prevState) lifecycle (which is rare), 
    // the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate(). 
    // Otherwise this parameter will be undefined.

    // componentDidUpdate(prevProps, prevState, snapshot) {

    //     if ( prevProps.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint !== this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint ) {

    //         // console.log("props object changed from prevprops: data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint");

    //         const newState = this._computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint({ 
    //             data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint 
    //         });

    //         this.setState( newState );
    //     }

    //     // const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint;

    //     // const projectSearchIds = data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.projectSearchIds;

    //     // const conditionIds = data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.conditionIds;

    //     // const projectSearchIds_state = this.state.projectSearchIds;
    //     // const projectSearchIds_InitialProps = this.state.projectSearchIds_InitialProps;

    //     // var z = 0;
    // }

    /**
     * Compute State object(s) from props object data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint 
     */
    _computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint({ 
        
        data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint 
    } : {
        data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props_Data_Property

    }) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State {

        let conditionGroupId : number = undefined;
        let conditionGroupLabel = "";
        this.max_labelSuffixInitiallyAssigned = undefined;
        let conditionContainers: Array<ConditionContainer> = [];
        let initialAdd = false;
        let conditionContainerMaxIndex : number = undefined
        let conditionGroupType = _CONDITION_TYPE_FIRST_OPTION_VALUE;

        //  conditionGroup not set for add
        const conditionGroup : Experiment_ConditionGroup = data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.conditionGroup;
        {
            if ( conditionGroup ) {
                
                conditionGroupLabel = conditionGroup.label;
                conditionGroupId = conditionGroup.id;

                const conditions = conditionGroup.conditions;
          
                if ( conditions && ( conditions.length !== 0 ) ) {

                    let index = 0;
                    for ( const condition of conditions ) {

                        const labelSuffixInitiallyAssigned = condition.labelSuffixInitiallyAssigned;
                        if ( this.max_labelSuffixInitiallyAssigned === undefined ) {
                            this.max_labelSuffixInitiallyAssigned = labelSuffixInitiallyAssigned;
                        } else {
                            if ( this.max_labelSuffixInitiallyAssigned < labelSuffixInitiallyAssigned ) {
                                this.max_labelSuffixInitiallyAssigned = labelSuffixInitiallyAssigned;
                            }
                        }

                        //  Create conditionContainer with additional properties for processing here since also have condition objects created here without property id
                        const conditionContainer = { condition : condition, index, conditionLabel : condition.label, labelSuffixInitiallyAssigned : condition.labelSuffixInitiallyAssigned };
                        conditionContainers.push( conditionContainer );
                        index++;
                    }
                    conditionContainerMaxIndex = index;

                }

                conditionGroupType = this._computeConditionGroupType_From_ConditionGroup({ conditionGroup });
            }
        }

        if ( conditionGroupLabel === "" && data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.timePointsGroupLabel ) {
            conditionGroupLabel = data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.timePointsGroupLabel;
        }

        if ( data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.add ) {
            initialAdd = true;
        }

        return {
            conditionGroupId,
            conditionGroupLabel,
            conditionContainers,
            conditionContainerMaxIndex,
            initialAdd,
            conditionGroupType,
            conditionGroupFlags : _CONDITION_GROUP_FLAGS_INITIAL_VALUE,
            conditionNumber : _NUMBER_OF_CONDITIONS_MIN_AS_STRING
        };
    }

    _computeConditionGroupType_From_ConditionGroup({ conditionGroup } : { conditionGroup : Experiment_ConditionGroup }) : string {

        let conditionGroupType : string = undefined;

        if ( conditionGroup.typeDiscrete ) {

            conditionGroupType = _CONDITION_TYPE_DISCRETE;

        } else if ( conditionGroup.typeContinuous ) {
            
            conditionGroupType = _CONDITION_TYPE_CONTINUOUS;
            
        } else {

            throw Error("No conditionGroupType flags set to true on conditionGroup");
        }

        return conditionGroupType;
    }

    _conditionGroupType_Changed( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const target_htmlElement = event.target as HTMLInputElement;
        const conditionGroupType = target_htmlElement.value;

        // console.log("conditionGroupType: " + conditionGroupType + ", this.state.conditionGroupType: " + this.state.conditionGroupType );

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {

            let conditionGroupLabel = state.conditionGroupLabel;
            const conditionGroupFlags : Experiment_ConditionGroup_Flags = {};

            if ( conditionGroupType === _CONDITION_TYPE_DISCRETE ) {

                conditionGroupFlags.typeDiscrete = true;

            } else if ( conditionGroupType === _CONDITION_TYPE_CONTINUOUS ) {
                
                conditionGroupFlags.typeContinuous = true;
            }
            return {
                conditionGroupLabel,
                conditionGroupType,
                conditionGroupFlags
            }
        });
    }


    _conditionNumber_Changed( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const target_htmlElement = event.target as HTMLInputElement;
        const conditionNumber = target_htmlElement.value;
        // console.log("conditionNumber: " + conditionNumber + ", this.state.conditionNumber: " + this.state.conditionNumber );

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {
            return { conditionNumber : conditionNumber }; // Save to state for re-render
        });
    }

    _getConditionPrefix({ conditionGroupLabel } : { conditionGroupLabel : string }) {

        const conditionLabelPrefix = conditionGroupLabel.substring( 0, 1 );
 
        return conditionLabelPrefix;
    }

    _create_conditionContainer({ conditionContainerIndex, conditionLabelPrefix } : { conditionContainerIndex : number, conditionLabelPrefix : string }) : ConditionContainer {
        if ( this.max_labelSuffixInitiallyAssigned === undefined ) {
            this.max_labelSuffixInitiallyAssigned = 1;
        } else {
            this.max_labelSuffixInitiallyAssigned++;
        }
        const conditionLabel = conditionLabelPrefix + this.max_labelSuffixInitiallyAssigned.toString();
        const conditionContainer : ConditionContainer  = { conditionLabel, index : conditionContainerIndex, labelSuffixInitiallyAssigned : this.max_labelSuffixInitiallyAssigned };
        return conditionContainer;
    }

    _addInitialConditions( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {

            const conditionGroupLabel = state.conditionGroupLabel;
            const conditionGroupType = state.conditionGroupType;
            let conditionContainerMaxIndex = state.conditionContainerMaxIndex;
            const conditionNumber_AsString = state.conditionNumber; // <select> of condition count

            const conditionNumber_AsNumber = Number.parseInt( conditionNumber_AsString );
            if ( Number.isNaN( conditionNumber_AsNumber ) ) {
                throw Error("Fail to parse as integer: conditionNumber_AsString: " + conditionNumber_AsString );
            }

            const conditionLabelPrefix = this._getConditionPrefix({ conditionGroupLabel });

            const conditionContainers = [];
            for ( let counter = 1; counter <= conditionNumber_AsNumber; counter++ ) {

                if ( conditionContainerMaxIndex === undefined ) {
                    conditionContainerMaxIndex = 0;
                } else {
                    conditionContainerMaxIndex++; // Increment before use
                }

                const conditionContainer = this._create_conditionContainer({ conditionContainerIndex : conditionContainerMaxIndex, conditionLabelPrefix });
                conditionContainers.push( conditionContainer );
            }

            return {
                conditionGroupLabel,
                conditionContainers,
                conditionContainerMaxIndex,
                initialAdd : false
            }
        });

    }


    _addCondition( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {

            const conditionGroupLabel = state.conditionGroupLabel;
            const conditionContainers = state.conditionContainers;
            const conditionGroupType = state.conditionGroupType;
            let conditionContainerMaxIndex = state.conditionContainerMaxIndex;

            const conditionLabelPrefix = this._getConditionPrefix({ conditionGroupLabel });
            
            conditionContainerMaxIndex++;
            const conditionContainer = this._create_conditionContainer({ conditionContainerIndex : conditionContainerMaxIndex, conditionLabelPrefix });

            const conditionContainersNew = conditionContainers.concat( conditionContainer );

            return { conditionContainers : conditionContainersNew, conditionContainerMaxIndex };
        });

    }


    _conditionGroupLabelChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        const target_htmlElement = event.target as HTMLInputElement;
        const value = target_htmlElement.value

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {
            return { conditionGroupLabel : value }; // Save to state for re-render
        });
        //  Save to internal data structure
    }

    /**
     * 
     */
    _add( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        for ( const conditionContainer of this.state.conditionContainers ) {

            if ( conditionContainer.conditionLabel === "" ) {

                return;  // EARLY RETURN
            }
        }

        const conditionContainers = this.state.conditionContainers;
        const conditionGroupFlags = this.state.conditionGroupFlags;

        const conditions : Array<Experiment_Condition> = [];
        for ( const conditionContainer of conditionContainers ) {
            let condition = conditionContainer.existingCondition;
            if ( ! condition ) {
                condition = new Experiment_Condition({ label : conditionContainer.conditionLabel, labelSuffixInitiallyAssigned : conditionContainer.labelSuffixInitiallyAssigned });
            } else {
                condition.label = conditionContainer.conditionLabel;
            }
            conditions.push( condition );
        }

        const conditionGroup = new Experiment_ConditionGroup({ ...conditionGroupFlags });

        conditionGroup.label = this.state.conditionGroupLabel;
        conditionGroup.conditions = conditions;

        const isTimePoints = this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints;

        this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.add({ conditionGroup, isTimePoints });
    }

    /**
     * 
     */
    _save( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        for ( const conditionContainer of this.state.conditionContainers ) {

            if ( conditionContainer.conditionLabel === "" ) {

                return;  // EARLY RETURN
            }
        }

        const conditionContainers = this.state.conditionContainers;
        const conditionGroupFlags = this.state.conditionGroupFlags;

        const conditions : Array<Experiment_Condition> = [];
        for ( const conditionContainer of conditionContainers ) {
            let condition = conditionContainer.existingCondition;
            if ( ! condition ) {
                condition = new Experiment_Condition({ label : conditionContainer.conditionLabel, labelSuffixInitiallyAssigned : conditionContainer.labelSuffixInitiallyAssigned });
            } else {
                condition.label = conditionContainer.conditionLabel;
            }
            conditions.push( condition );
        }

        const conditionGroup = new Experiment_ConditionGroup({ id : this.state.conditionGroupId, ...conditionGroupFlags });

        conditionGroup.label = this.state.conditionGroupLabel;
        conditionGroup.conditions = conditions;

        const isTimePoints = this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints;

        this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.save({ conditionGroup, isTimePoints });
    }

    /**
     * 
     */
    _cancel( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.cancel();
    }


    /**
     * 
     */
    _conditions_ChangeOrder({ sourceIndex, destinationIndex } : { sourceIndex : number, destinationIndex : number }) {

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {
            
            const conditionContainers = state.conditionContainers;

            const conditionToMove = conditionContainers[ sourceIndex ];
            if ( conditionToMove === undefined ) {
                return null; //  Index not in array so no changes
            }

            //  Remove Source Index
     
            const conditionContainers_BeforeSource = conditionContainers.slice( 0, sourceIndex );
            const conditionContainers_AfterSource = conditionContainers.slice( sourceIndex + 1 );
            const conditionContainers_SourceRemoved = conditionContainers_BeforeSource.concat( conditionContainers_AfterSource );

            let destinationIndex_InSourceRemovedArray = destinationIndex;

            if ( destinationIndex > sourceIndex ) {
                // destination index has shifted since removed element at sourceIndex from array
                destinationIndex_InSourceRemovedArray = destinationIndex_InSourceRemovedArray--;
            }

            //  Split conditionContainers_SourceRemoved at destinationIndex_InSourceRemovedArray

            let conditionContainers_BeforeDestination = conditionContainers_SourceRemoved.slice( 0, destinationIndex_InSourceRemovedArray );
            let conditionContainers_AtDestinationAndRest = conditionContainers_SourceRemoved.slice( destinationIndex_InSourceRemovedArray );

            //  Combine arrays for final

            const conditionContainersNew = conditionContainers_BeforeDestination.concat( conditionToMove, conditionContainers_AtDestinationAndRest );

            return ({ 
                conditionContainers : conditionContainersNew
            });
        })
    }

    _deleteConditionHandler({ conditionArrayIndex, conditionContainerIndex } : { conditionArrayIndex : number, conditionContainerIndex : number }) {

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {
            
            const conditionContainers = state.conditionContainers;

            {
                const conditionContainerToDelete = conditionContainers[ conditionArrayIndex ];
                if ( conditionContainerToDelete === undefined ) {
                    //  Index not in array
                    console.log("WARNING: conditionArrayIndex not in conditionContainers: " + conditionContainers );
                    return null;  //  EARLY RETURN
                }
                if ( conditionContainerToDelete.index !== conditionContainerIndex ) {
                    //  index property not match provided so exit
                    console.log("WARNING: conditionContainerToDelete.index !== conditionContainerIndex")
                    return null;  //  EARLY RETURN
                }
            }

            //  Remove entry at conditionArrayIndex
     
            const conditionContainers_BeforeSource = conditionContainers.slice( 0, conditionArrayIndex );
            const conditionContainers_AfterSource = conditionContainers.slice( conditionArrayIndex + 1 );
            const conditionContainersNew = conditionContainers_BeforeSource.concat( conditionContainers_AfterSource );

            return ({ 
                conditionContainers : conditionContainersNew
            });
        })
    }

    _changeConditionContainerConditionLabel({ conditionContainer, label } : { conditionContainer : ConditionContainer, label : string }) {

        this.setState( (state : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State, props : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props ) : ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_State => {

            const conditionContainers = state.conditionContainers;

            //  Get conditionContainer from conditionContainers that matches parameter conditionContainer

            let conditionContainer_From_conditionContainers : ConditionContainer = undefined;
            for ( const item of conditionContainers ) {
                if ( item.index === conditionContainer.index ) {
                    conditionContainer_From_conditionContainers = item;
                    break;
                }
            }
            if ( ! conditionContainer_From_conditionContainers ) {
                throw Error("Not find entry in state.conditionContainers for index: " + conditionContainer.index );
            }
            conditionContainer_From_conditionContainers.conditionLabel = label;

            const conditionContainersNew = conditionContainers.concat();

            return { conditionContainers : conditionContainersNew };
        });
        
    }

    /**
     * 
     */
    render () {

        // const data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint = this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint;

        // const conditionGroup = data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.conditionGroup;

        // const conditionContainers = this.state.conditionContainers;

        let primaryLabel = "Condition Group";

        let label_condition = "condition";
        let label_Condition = "Condition";

        let label_conditions = "conditions";
        let label_Conditions = "Conditions";

        if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints ) {
            primaryLabel = "Time Points";

            label_condition = "time point";
            label_Condition = "Time Point";
            
            label_conditions = "time points";
            label_Conditions = "Time Points";
        }

        let addButton : JSX.Element = undefined;
        let saveButton : JSX.Element = undefined;
        let labelTypeEntry : JSX.Element = undefined;

        {
            let conditionHasEmptyLabel = false;
            let addSave_Disabled : boolean = false;
            let addSave_Disabled_Flag : boolean = false;

            if ( ( this.state.conditionGroupLabel === "" ) || ( ! this.state.conditionContainers ) || (  this.state.conditionContainers.length === 0 ) ) {
                addSave_Disabled_Flag = true;
                addSave_Disabled = true;
            }

            for ( const conditionContainer of this.state.conditionContainers ) {

                if ( conditionContainer.conditionLabel === "" ) {

                    conditionHasEmptyLabel = true;
                    addSave_Disabled_Flag = true;
                    addSave_Disabled = true;

                    break;
                }
            }

            if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.add ) {
                
                let disabledCoverDiv : JSX.Element = undefined;
                if ( addSave_Disabled_Flag ) {

                    let title = undefined;

                    if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints ) {
                        if ( conditionHasEmptyLabel ) {
                            title = "Every time point Must have a Label (Text String) before the Time Points can be added";
                        } else {
                            title = "At least 1 time point must be added before the Time Points can be added";
                        }
                    } else {
                        if ( conditionHasEmptyLabel ) {
                            title = "Every condition Must have a Label (Text String) before the Condition Group can be added";
                        } else {
                            title = "The label must be populated and at least 1 condition added before the Condition Group can be added";
                        }
                    }
                    disabledCoverDiv = (
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } } title={ title }>
                        </div>
                    );
                }

                addButton = (
                    <div style={ { display: "inline-block", position: "relative" } }>
                        <input type="button" disabled={ addSave_Disabled } value="Add" onClick={ this._add_BindThis } />
                        {/* Following div covers button when disabled */}
                        { disabledCoverDiv }
                    </div>
                );
            }

            if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.save ) {

                let disabledCoverDiv : JSX.Element = undefined;
                if ( addSave_Disabled_Flag ) {
                    let title = "The label must be populated and at least 1 condition added before the Condition Group can be saved";
                    if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints ) {
                        title = "At least 1 time point must be added before the Time Points can be saved";
                    }
                    disabledCoverDiv = (
                        <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } } title={ title }>
                        </div>
                    );
                }

                saveButton = (
                    <div style={ { display: "inline-block", position: "relative" } }>
                        <input type="button" disabled={ addSave_Disabled } value="Save" onClick={ this._save_BindThis } />
                        {/* Following div covers button when disabled */}
                        { disabledCoverDiv }
                    </div>
                );
            }


            if ( ! this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints ) {

                labelTypeEntry = (
                    <React.Fragment>
                        <div className=" top-level fixed-height modal-overlay-body-standard-padding-left "
                            style={ { marginBottom: 10 } }>
                            <span >Condition Group Label: </span> 
                            <input type="text" onChange={ this._conditionGroupLabelChanged_BindThis } value={ this.state.conditionGroupLabel } autoFocus />
                        </div>
                        <div  className=" top-level fixed-height modal-overlay-body-standard-padding-left " >
                            <span >Condition Group Type: </span>
                            <select value={ this.state.conditionGroupType } onChange={ this._conditionGroupType_Changed_BindThis }>
                                <option value={ _CONDITION_TYPE_CONTINUOUS }>Continuous</option> { /* _CONDITION_TYPE_CONTINUOUS is initial value so should be first */ }
                                <option value={ _CONDITION_TYPE_DISCRETE }>Discrete</option>
                            </select>
                        </div>
                    </React.Fragment>
                );
            }
        }

        let initialAddBlock : JSX.Element = undefined;
        let conditionsBlockLabel : JSX.Element = undefined;
        let conditionsBlock  : JSX.Element= undefined;
        let conditionsBlockAddConditionLink : JSX.Element = undefined;

        if ( this.state.initialAdd ) {

            const numberOfConditionsOptions = [];
            {  //  Create <options> for "Number of Conditions"
                for ( let counter = _NUMBER_OF_CONDITIONS_MIN; counter <= _NUMBER_OF_CONDITIONS_MAX; counter++ ) {
                    const numberOfConditionsOption = <option key={ counter } value={ counter }>{ counter }</option>;
                    numberOfConditionsOptions.push( numberOfConditionsOption );
                }
            }

            let addButtonLabel = "Add Conditions";
            if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints ) {
                addButtonLabel = "Add Time Points";
            }
    
            initialAddBlock = (

                <div  className=" modal-overlay-body-standard-padding-left ">
                    <span >Number of { label_conditions }: </span>
                    <select value={ this.state.conditionNumber } onChange={ this._conditionNumber_Changed_BindThis }>
                        { numberOfConditionsOptions }
                    </select>
                    <input type="button" value={ addButtonLabel } onClick={ this._addInitialConditions_BindThis } />
                </div>
            )
        } else {
            conditionsBlockLabel = (
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-left"
                    style={ { fontWeight: "bold", marginTop: 6, marginBottom : 4 } } >
                    { label_Conditions }
                </div>
            );

            let conditionsBlockAddConditionLink_Title = "Add Condition to Bottom of Conditions List";
            if ( this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints ) {
                conditionsBlockAddConditionLink_Title = "Add Time Point to Bottom of Time Points List";
            }
            conditionsBlockAddConditionLink = (
                <div className=" top-level fixed-height modal-overlay-body-standard-padding-left" style={ { marginBottom: 5 } } >
                    <span className=" fake-link " onClick={ this._addCondition_BindThis }
                        title={ conditionsBlockAddConditionLink_Title }>+{ label_Conditions }</span>
                </div>
            )
            if ( this.state.conditionContainers && ( this.state.conditionContainers.length !== 0 ) ) {

                conditionsBlock = (
                            <ConditionsTopLevelBlock 
                                conditionContainers={ this.state.conditionContainers } 
                                isTimePoints={ this.props.data_ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint.isTimePoints }
                                conditions_ChangeOrder={ this._conditions_ChangeOrder_BindThis }
                                deleteConditionHandler={ this._deleteConditionHandler_BindThis }
                                changeConditionContainerConditionLabel={ this._changeConditionContainerConditionLabel_BindThis } />
                );

    // conditionContainers
    // isTimePoints
    // condition_ClickHandler
    // deleteConditionHandler
    // changeConditionContainerConditionLabel
    // conditions_ChangeOrder
            } else {
                conditionsBlock = ( <div className=" modal-overlay-body-standard-padding-left "  >No { label_Conditions } in { primaryLabel } </div> );
            }

        }

        return (
            <React.Fragment>

                <div className="modal-overlay-page-background  modal-overlay-page-background-clickable " style={ { zIndex : 20 } } > </div>

                <div className=" experiment-maint-main-body experiment-maint-single-cell-container modal-overlay-container modal-overlay-flexbox-overflow-control-no-header-container modal-overlay-content-body " 
                    style={ { position: "fixed", left: 5, top: 5, width: "calc(100vw - 10px)", height: "calc(100vh - 10px)", zIndex: 21 } }>

                    <div className=" top-level fixed-height modal-overlay-body-standard-padding-top modal-overlay-body-standard-padding-left "
                        style={ { marginBottom: 10 } }>
                        <span style={ { fontWeight: "bold", fontSize: "18px", marginRight: 10 } }>{ primaryLabel } Maint</span>
                        { addButton }
                        { saveButton }
                        <input type="button" onClick={ this._cancel_BindThis } value="Cancel"
                            style={ { marginLeft : 5 } } />
                    </div>

                    { labelTypeEntry }

                    { initialAddBlock }
                    { conditionsBlockLabel }
                    { conditionsBlockAddConditionLink }
                    { conditionsBlock }
                    
                    <div className=" top-level fixed-height modal-overlay-body-standard-padding-bottom" >
                        
                    </div>
                
                </div>
            </React.Fragment>
        );
    }

}

interface ConditionsTopLevelBlock_Props {

    conditionContainers : Array<ConditionContainer>
    isTimePoints: boolean
    deleteConditionHandler: any
    changeConditionContainerConditionLabel: any
    conditions_ChangeOrder: any
}

interface ConditionsTopLevelBlock_State {
    childMaxHeight?: number
}

class ConditionsTopLevelBlock extends React.Component< ConditionsTopLevelBlock_Props, ConditionsTopLevelBlock_State > {

    private _onDragEnd_ConditionItem_BindThis = this._onDragEnd_ConditionItem.bind(this);

    constructor(props : ConditionsTopLevelBlock_Props) {
        super(props);

        // this._headerColumnClicked = this._headerColumnClicked.bind(this);

        this.state = {
            childMaxHeight : 10 // Will be updated in componentDidMount
        };
    }

    _onDragEnd_ConditionItem( result: any ) {

        // dropped outside the list
        if ( ! result.destination ) {
            return;
        }

        var sourceIndex = result.source.index;
        var destinationIndex = result.destination.index;

        this.props.conditions_ChangeOrder({ sourceIndex, destinationIndex });
    }


    render() {

        const conditionEntryComponentsList: Array<JSX.Element> = [];
        {
            let index = 0;
            for ( const conditionContainer of this.props.conditionContainers ) {

                const draggableId = conditionContainer.index.toString();
                const conditionGroupEntryBlock = (
                    <DraggableConditionListEntry 
                        key={ conditionContainer.index } 
                        conditionContainer={ conditionContainer }
                        draggableId={ draggableId }
                        index={ index }
                        isTimePoints={ this.props.isTimePoints }
                        deleteConditionHandler={ this.props.deleteConditionHandler }
                        changeConditionContainerConditionLabel={ this.props.changeConditionContainerConditionLabel }
                    />
                );
                conditionEntryComponentsList.push( conditionGroupEntryBlock );
                index++;
            }
        }
        
        return (
            <div style={ { overflowY: "auto", width: conditionsContainerWidth, borderWidth: 2  } }
                className=" top-level single-entry-variable-height modal-overlay-body-standard-padding-left modal-overlay-body-standard-padding-bottom  modal-overlay-body-standard-padding-right  " >

                <DragDropContext onDragEnd={ this._onDragEnd_ConditionItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                    <Droppable droppableId="ConditionsInConditionGroupListMaint" type="CONDITIONS_IN_GROUP">
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="  experiment-maint-default-border-style "
                                // experiment-maint-default-border-style: border: solid and color site grey
                                // style={getListStyle(snapshot.isDraggingOver)}
                                style={ { width: conditionsContainerWidth, borderWidth: 2  } }
                            >
                                { conditionEntryComponentsList }
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }

}

interface DraggableConditionListEntry_Props {

    conditionContainer : ConditionContainer
    isTimePoints : boolean
    deleteConditionHandler: any
    changeConditionContainerConditionLabel: any

    draggableId : string
    index : number
}

const DraggableConditionListEntry = (props : DraggableConditionListEntry_Props) => {

    const conditionContainer = props.conditionContainer;
    const draggableId = props.draggableId;
    const index = props.index;

    return (
        <Draggable key={ conditionContainer.index } draggableId={ draggableId } index={index}>
            {(provided, snapshot) => (
                <div // onClick={ (event) => { console.log( "Whole Draggable clicked: index: " + conditionContainer.index )}}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=" experiment-maint-default-border-style "
                    style={ getConditionListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                >
                    <ConditionListEntry_DraggableContents 
                        conditionContainer={ conditionContainer } 
                        arrayIndex={ props.index }
                        isTimePoints={ props.isTimePoints }
                        deleteConditionHandler={ props.deleteConditionHandler } 
                        changeConditionContainerConditionLabel={ props.changeConditionContainerConditionLabel }
                         />
                </div>
            )}
        </Draggable>
    );
}

interface ConditionListEntry_DraggableContents_Props {

    conditionContainer : ConditionContainer
    arrayIndex : number
    isTimePoints : boolean
    deleteConditionHandler: any
    changeConditionContainerConditionLabel: any
}

interface ConditionListEntry_DraggableContents_State {

    editLabel? : boolean
    emptyConditionString? : boolean
}

class ConditionListEntry_DraggableContents extends React.Component< ConditionListEntry_DraggableContents_Props, ConditionListEntry_DraggableContents_State > {

    private _labelEdit_LabelClicked_BindThis = this._labelEdit_LabelClicked.bind(this);
    private _labelEdit_LabelInputBlur_BindThis = this._labelEdit_LabelInputBlur.bind(this);
    private _labelChanged_BindThis = this._labelChanged.bind(this);
    private _deleteCondition_BindThis = this._deleteCondition.bind(this);

    private readonly _inputField_Ref :  React.RefObject<HTMLInputElement>

    constructor(props : ConditionListEntry_DraggableContents_Props) {
        super(props);

        this._inputField_Ref = React.createRef();

        this.state = {
            editLabel : false,
            emptyConditionString : false
        };
    }

    _labelEdit_LabelClicked( event: React.MouseEvent<HTMLElement, MouseEvent> ) { 
        //  Start Label Edit
        this.setState( (state : ConditionListEntry_DraggableContents_State, props : ConditionListEntry_DraggableContents_Props ) : ConditionListEntry_DraggableContents_State => {
            return { editLabel : true }
        });
    }

    _labelEdit_LabelInputBlur( event: React.MouseEvent<HTMLElement, MouseEvent> ) { 
        //  End Label Edit

        // console.warn("FAKE Exit _labelEdit_LabelInputBlur Immediately.")
        //
        // return; // TODO

        const label = this._inputField_Ref.current.value;

        if ( label === "" ) {

            // this._inputField_Ref.current.focus()

            this.setState( (state : ConditionListEntry_DraggableContents_State, props : ConditionListEntry_DraggableContents_Props ) : ConditionListEntry_DraggableContents_State => {
                return {emptyConditionString: true};
            });
        } else {
            this.setState( (state : ConditionListEntry_DraggableContents_State, props : ConditionListEntry_DraggableContents_Props ) : ConditionListEntry_DraggableContents_State => {
                return {emptyConditionString: false};
            });

            this.setState( (state : ConditionListEntry_DraggableContents_State, props : ConditionListEntry_DraggableContents_Props ) : ConditionListEntry_DraggableContents_State => {
                return { editLabel : false };
            });
        }

    }

    //  Rendered input value is this.props.condition.label so _labelChanged is not correct.

    _labelChanged( event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        // const target_htmlElement = event.target as HTMLInputElement;
        // const label = target_htmlElement.value;

        const label = this._inputField_Ref.current.value;


        if ( label === "" ) {

            this._inputField_Ref.current.focus()

            this.setState( (state : ConditionListEntry_DraggableContents_State, props : ConditionListEntry_DraggableContents_Props ) : ConditionListEntry_DraggableContents_State => {
                return {emptyConditionString: true};
            });
        } else {
            this.setState( (state : ConditionListEntry_DraggableContents_State, props : ConditionListEntry_DraggableContents_Props ) : ConditionListEntry_DraggableContents_State => {
                return {emptyConditionString: false};
            });
        }

        this.props.changeConditionContainerConditionLabel({ conditionContainer : this.props.conditionContainer, label });
    }

    _deleteCondition( event: React.MouseEvent<HTMLElement, MouseEvent> ) {

        event.preventDefault();
        event.stopPropagation(); //  So no click triggered for whole item

        if ( this.props.isTimePoints ) {
            if ( ! window.confirm("Delete Time Point.  Searches for this Time Point will be removed from Experiment." ) ) {
                return; // EARLY RETURN
            }
    
        } else {
            if ( ! window.confirm("Delete Condition.  Searches for this Condition will be removed from Experiment." ) ) {
                return; // EARLY RETURN
            }
        }

        // const conditionContainer = this.props.conditionContainer;

        if ( this.props.deleteConditionHandler ) {

            this.props.deleteConditionHandler({ conditionArrayIndex : this.props.arrayIndex, conditionContainerIndex : this.props.conditionContainer.index });

        // } else {

        //     console.log( "X clicked: conditionContainer.index: " + conditionContainer.index );
        }
    }

    render() {
        
        const conditionContainer = this.props.conditionContainer;

        let labelDisplay : JSX.Element = undefined;
        let labelInput : JSX.Element = undefined;

        if ( this.state.editLabel ) {

            const inputFieldWidth = conditionItemPartsWidths.labelWidth - 10;

            const inputFieldStyle : React.CSSProperties = { width: inputFieldWidth };
            let inputFieldTitleAttr = "Enter Condition Label";

            if ( this.state.emptyConditionString ) {
                inputFieldStyle.backgroundColor = "#ffcccc";
                inputFieldTitleAttr = "Condition Label Cannot Be Empty";
            }

            labelInput = (
                <div >
                    <input ref={ this._inputField_Ref }
                           title={ inputFieldTitleAttr }
                           value={ conditionContainer.conditionLabel }
                           style={ inputFieldStyle }
                           onChange={ this._labelChanged_BindThis }
                           autoFocus
                           onBlur={ this._labelEdit_LabelInputBlur_BindThis }
                    />
                </div>
            );
        } else {

            let title = undefined;
            if ( this.props.isTimePoints ) {
                if ( this.state.emptyConditionString ) {
                    title = "Click to change Time Point Label\n\nTime Point Label Cannot Be Empty";
                } else {
                    title = "Click to change Time Point Label\n\nDrag to change Time Point Order";
                }
            } else {
                if ( this.state.emptyConditionString ) {
                    title = "Click to change Condition Label\n\nCondition Label Cannot Be Empty";
                } else {
                    title = "Click to change Condition Label\n\nDrag to change Condition Order";
                }
            }

            let containerStyle : React.CSSProperties = {};

            if ( this.state.emptyConditionString ) {
                containerStyle.backgroundColor = "#ffcccc";
            }

            labelDisplay = (
                <div
                    style={ containerStyle }
                    title={ title }
                    onClick={ this._labelEdit_LabelClicked_BindThis }
                >
                    <div style={ { maxWidth: conditionItemPartsWidths.labelWidth, overflowX: "hidden", textOverflow: "ellipsis" } }
                        onClick={ this._labelEdit_LabelClicked_BindThis }
                        >
                        { conditionContainer.conditionLabel }
                    </div>
                </div>
            );
        }

        let deleteIconComponent : JSX.Element = undefined;
        if ( this.props.deleteConditionHandler ) {
            
            let title = "Delete Condition";
            if ( this.props.isTimePoints ) {
                title = "Delete Time Point";
            }
            deleteIconComponent = (
                <img
                    onClick={ this._deleteCondition_BindThis }
                    className=" icon-small clickable " src="static/images/icon-circle-delete.png" 
                    title={ title }
                />
            );
        }

        let dragIconTitle = "Drag to change Condition Order";
        if ( this.props.isTimePoints ) {
            dragIconTitle = "Drag to change Time Point Order";
        }

        return (
            <div style={ conditionItemInnerStyle }>

                <div style={ { marginLeft: 2, maxWidth: conditionItemPartsWidths.draggableIconWidth, overflowX: "hidden" } }>
                    <img className=" icon-small " src="static/images/icon-draggable.png"
                        title={ dragIconTitle } ></img> {/*  Replace with draggable icon */}
                </div>
                {/*<div >*/}
                    { labelInput }
                    { labelDisplay }
                {/*</div>*/}
                <div style={ { maxWidth: conditionItemPartsWidths.deleteIconWidth, overflowX: "hidden" } }>
                    { deleteIconComponent }
                </div>
            </div>
        );
    }

}

