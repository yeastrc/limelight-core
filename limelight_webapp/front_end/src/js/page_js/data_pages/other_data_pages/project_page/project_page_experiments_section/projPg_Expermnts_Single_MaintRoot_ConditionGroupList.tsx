/**
 * projPg_Expermnts_Single_MaintRoot_ConditionGroupList.tsx
 * 
 * Single Experiment - Condition Group List
 * 
 * Shows Current Condition Groups
 * 
 * User can re-order Condition Groups or click on a Condition Group to make changes
 * 
 */


import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Experiment_ConditionGroup, Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';

const conditionGroupContainerWidths = {
    borderWidth: 2
}

const conditionGroupItemOuterPartsWidths = {
    paddingWidth: 2,
    borderWidth: 2
}

const conditionGroupItemPartsWidths = {
    draggableIconWidth : 18,
    display_SubGroupName_Width : 160,
    conditionCountWidth : 42,
    typeWidth : 80,
    subGroupName_Width : 16
};

const conditionGroupItemStyle_gridTemplateColumns = (
    conditionGroupItemPartsWidths.draggableIconWidth
    + "px "
    + conditionGroupItemPartsWidths.display_SubGroupName_Width
    + "px "
    + conditionGroupItemPartsWidths.conditionCountWidth
    + "px "
    + conditionGroupItemPartsWidths.typeWidth
    + "px "
    + conditionGroupItemPartsWidths.subGroupName_Width
    + "px "
);


const conditionGroupItemInnerStyle = { 
    display: "grid", 
    gridTemplateColumns: conditionGroupItemStyle_gridTemplateColumns,
};

const conditionGroupsContainerWidth = (
    conditionGroupItemOuterPartsWidths.paddingWidth
    + conditionGroupItemOuterPartsWidths.borderWidth
    + conditionGroupItemPartsWidths.draggableIconWidth 
    + conditionGroupItemPartsWidths.display_SubGroupName_Width
    + conditionGroupItemPartsWidths.conditionCountWidth
    + conditionGroupItemPartsWidths.typeWidth
    + conditionGroupItemPartsWidths.subGroupName_Width
    + 2
);

// /**
//  * 
//  */
// const getListStyle = isDraggingOver => ({
//     // background: isDraggingOver ? "lightblue" : "lightgrey",
//     padding: XXX,
//     width: conditionGroupsContainerWidth
// });


/**
 * 
 */
const getConditionGroupListItemOuterStyle = (isDragging: any, draggableStyle:any) => {

    //  Must use a function since need to add values in parameter 'draggableStyle' to result

    return {
        userSelect: "none",
        padding: conditionGroupItemOuterPartsWidths.paddingWidth,

        borderWidth: conditionGroupItemOuterPartsWidths.borderWidth,

        //  In CSS class experiment-maint-default-border-style
        // borderStyle: "solid",
        // borderColor: "grey",

        // change background colour if dragging
        // background: isDragging ? "lightgreen" : "grey",

        // styles we need to apply on draggables (function parameter)
        ...draggableStyle
    }
};

/**
 * 
 */
export interface ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_Props {

    conditionGroups : Array<Experiment_ConditionGroup>
    conditionGroups_ChangeOrder: any // function
    conditionGroup_ClickHandler: any // function
    delete_conditionGroup_ClickHandler: any // function
}

interface ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_State {

    conditionGroups_FromProps? : Array<Experiment_ConditionGroup>
    specialEntriesAtStart_Count? : number
    conditionGroups_NoSpecialEntries? : Array<Experiment_ConditionGroup>
}

/**
 * 
 */
export class ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList extends React.Component< ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_Props, ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_State > {

    private _onDragEnd_ConditionGroupItem_BindThis = this._onDragEnd_ConditionGroupItem.bind(this);


    constructor(props : ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_Props) {
        super(props);


        const conditionGroups = this.props.conditionGroups;

        const { conditionGroups_NoSpecialEntries, specialEntriesAtStart_Count } = ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList._processConditionGroups_For_SpecialEntries({ conditionGroups });

        this.state = {
            conditionGroups_FromProps : props.conditionGroups,
            conditionGroups_NoSpecialEntries, specialEntriesAtStart_Count
        };
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props : ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_Props, state : ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_State ) : ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //  Return new state (like return from setState(callback)) or null

        if ( props.conditionGroups === state.conditionGroups_FromProps ) {
            //  No changes so just return
            return null;  //
        }

        const conditionGroups = props.conditionGroups;

        const { conditionGroups_NoSpecialEntries, specialEntriesAtStart_Count } = ProjectPage_Experiments_SingleExperiment_MainRoot_ConditionGroupList._processConditionGroups_For_SpecialEntries({ conditionGroups });

        return { conditionGroups_NoSpecialEntries, specialEntriesAtStart_Count };
    }

    static _processConditionGroups_For_SpecialEntries({ conditionGroups } : { 
        
        conditionGroups : Array<Experiment_ConditionGroup> 
    }) : { 
        conditionGroups_NoSpecialEntries : Array<Experiment_ConditionGroup> 
        specialEntriesAtStart_Count : number
    } {

        const conditionGroups_NoSpecialEntries : Array<Experiment_ConditionGroup> = [];
        let specialEntriesAtStart_Count = 0;

        if ( conditionGroups && conditionGroups.length !== 0 ) {

            // populate conditionGroups_NoSpecialEntries
            // compute specialEntriesAtStart_Count

            let foundNonSpecialEntry = false;

            for ( const conditionGroup of conditionGroups ) {

                //  entries where specialConditionGroup is true
                if ( ! conditionGroup.specialConditionGroup ) {
                    //  At conditionGroup that is not specialConditionGroup
                    foundNonSpecialEntry = true;
                    conditionGroups_NoSpecialEntries.push( conditionGroup );
                }
                if ( ! foundNonSpecialEntry ) {
                    specialEntriesAtStart_Count++;
                }
            }
        }
        return { conditionGroups_NoSpecialEntries, specialEntriesAtStart_Count };
    }


    _onDragEnd_ConditionGroupItem( result: any ) : void {
        // dropped outside the list
        if ( ! result.destination ) {
            return;
        }

        //  result.destination.index comes from drag and drop library and always starts at zero

        //  For consistency, result.source.index will also always start at zero

        //  add this.state.specialEntriesAtStart_Count to reflect index in the actual array

        const sourceIndex = result.source.index + this.state.specialEntriesAtStart_Count;           
        const destinationIndex = result.destination.index + this.state.specialEntriesAtStart_Count;

        this.props.conditionGroups_ChangeOrder({ sourceIndex, destinationIndex });
    }


    render() {

        if ( ( ! this.state.conditionGroups_NoSpecialEntries ) || ( this.state.conditionGroups_NoSpecialEntries.length === 0 ) ) {
            return null;
        }

        const conditionEntryComponentsList: Array<JSX.Element> = [];
        {
            let index = 0

            for ( const conditionGroup of this.state.conditionGroups_NoSpecialEntries ) {

                const conditionGroupIndex = index + this.state.specialEntriesAtStart_Count; // add to index since conditionGroupIndex passed for delete

                const draggableId = conditionGroup.id.toString();
                const conditionGroupEntryBlock = (
                    <DraggableConditionGroupListEntry 
                        key={ conditionGroup.id } 
                        conditionGroup={ conditionGroup }
                        draggableId={ draggableId }
                        index={ index }
                        conditionGroupIndex={ conditionGroupIndex }
                        conditionGroup_ClickHandler={ this.props.conditionGroup_ClickHandler }
                        delete_conditionGroup_ClickHandler={ this.props.delete_conditionGroup_ClickHandler }
                    />
                );
                conditionEntryComponentsList.push( conditionGroupEntryBlock );
                index++;
            }
        }

        const conditionGroupListHeaders_MarginLeft = (
            conditionGroupContainerWidths.borderWidth + conditionGroupItemOuterPartsWidths.borderWidth + conditionGroupItemOuterPartsWidths.paddingWidth
        );

        return (
            <div style={ { marginTop : 5 } }>

                <div style={ { fontWeight: "bold", marginBottom: 5 } }>
                    Condition Group List:
                </div>
                <div style={ { marginLeft: conditionGroupListHeaders_MarginLeft } } >  {/* Row Headers */}

                    <div style={ conditionGroupItemInnerStyle }>

                        <div style={ { marginLeft: 2, maxWidth: conditionGroupItemPartsWidths.draggableIconWidth, overflowX: "hidden" } }>
                            
                        </div>
                        <div style={ { maxWidth: conditionGroupItemPartsWidths.display_SubGroupName_Width, overflowX: "hidden", textOverflow: "ellipsis" } }
                            >
                            Label
                        </div>
                        <div style={ { 
                                maxWidth: conditionGroupItemPartsWidths.conditionCountWidth, 
                                // whiteSpace: "nowrap",
                                overflowX: "hidden", textOverflow: "ellipsis" 
                            } }
                            title="Count of Conditions in Group"
                            >
                            Count
                        </div>
                        <div style={ { 
                                maxWidth: conditionGroupItemPartsWidths.typeWidth, 
                                // whiteSpace: "nowrap",
                                overflowX: "hidden", textOverflow: "ellipsis" 
                            } }
                            title="Type of Condition Group"
                            >
                            Type
                        </div>
                        <div style={ { maxWidth: conditionGroupItemPartsWidths.subGroupName_Width, overflowX: "hidden" } }>
                            
                        </div>
                    </div>
                </div>
                <div style={ {  } }>

                    <DragDropContext onDragEnd={ this._onDragEnd_ConditionGroupItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                        <Droppable droppableId="ConditionGroupListMaint" type="CONDITION_GROUP">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className=" experiment-maint-default-border-style " // experiment-maint-default-border-style: border: solid and color site grey
                                    // style={getListStyle(snapshot.isDraggingOver)}
                                    style={ { width: conditionGroupsContainerWidth, borderWidth: conditionGroupContainerWidths.borderWidth } }
                                >
                                    { conditionEntryComponentsList /* Entries in the list */ }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </div>
        );
    }
}

///////////////////

interface DraggableConditionGroupListEntry_Props {

    conditionGroup : Experiment_ConditionGroup;
    draggableId: any;
    index : number;

    conditionGroupIndex: any
    conditionGroup_ClickHandler: any
    delete_conditionGroup_ClickHandler: any
}

/**
 * 
 */
const DraggableConditionGroupListEntry = (props : DraggableConditionGroupListEntry_Props ) => {

    const conditionGroup = props.conditionGroup;
    const draggableId = props.draggableId;
    const index = props.index;

    return (
        <Draggable key={ conditionGroup.id } draggableId={ props.draggableId } index={ props.index }>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className=" experiment-maint-default-border-style "
                    style={ getConditionGroupListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                >
                    <ConditionGroupListEntry_DraggableContents 
                        conditionGroup={ conditionGroup } 
                        conditionGroupIndex={ props.conditionGroupIndex }
                        conditionGroup_ClickHandler={ props.conditionGroup_ClickHandler }
                        delete_conditionGroup_ClickHandler={ props.delete_conditionGroup_ClickHandler } />

                </div>
            )}
        </Draggable>
    );
}

//////////////////////////////

interface ConditionGroupListEntry_DraggableContents_Props {

    conditionGroup : Experiment_ConditionGroup
    conditionGroupIndex : number
    conditionGroup_ClickHandler: any
    delete_conditionGroup_ClickHandler: any
}


/**
 * 
 */
export class ConditionGroupListEntry_DraggableContents extends React.Component< ConditionGroupListEntry_DraggableContents_Props, {} > {

    private _mainClickHander_BindThis = this._mainClickHander.bind(this);
    private _deleteConditionGroup_ClickHandler_BindThis = this._deleteConditionGroup_ClickHandler.bind(this);


    constructor(props : ConditionGroupListEntry_DraggableContents_Props) {
        super(props);


        // this.state = newState;
    }

    _mainClickHander(event: any) {
            
        if ( this.props.conditionGroup_ClickHandler ) {
            this.props.conditionGroup_ClickHandler({ event, conditionGroup : this.props.conditionGroup });
        }
    }

    _deleteConditionGroup_ClickHandler(event: any) {

        event.preventDefault();
        event.stopPropagation(); //  So no click triggered for whole item

        if ( ! window.confirm( "Delete Condition Group.  Remove All Searches for All Conditions." ) ) {
            return; // EARLY RETURN;
        }

        this.props.delete_conditionGroup_ClickHandler({ 
            event, 
            conditionGroup : this.props.conditionGroup, 
            conditionGroupIndex : this.props.conditionGroupIndex,
            conditionGroupId : this.props.conditionGroup.id
        });
    }

    render() {

        const conditionGroup = this.props.conditionGroup;

        let conditionGroupType = "Unknown";
        if ( conditionGroup.typeContinuous ) {
            conditionGroupType = "Continuous";
        } else if ( conditionGroup.typeDiscrete ) {
            conditionGroupType = "Discrete";
        }

        let numberOfConditionsInGroup = 0;
        const conditions = conditionGroup.conditions;
        if ( conditions ) {
            numberOfConditionsInGroup = conditions.length;
        }

        let deleteIconComponent = undefined;

        if ( this.props.delete_conditionGroup_ClickHandler ) {
            
            deleteIconComponent = (
                <img
                    onClick={ this._deleteConditionGroup_ClickHandler_BindThis }
                     className=" icon-small clickable " src="static/images/icon-circle-delete.png" 
                    title="Delete Condition Group" 
                />
            )
        }

        return (
            <div style={ conditionGroupItemInnerStyle }
                onClick={ this._mainClickHander_BindThis }>
                <div style={ { marginLeft: 2, maxWidth: conditionGroupItemPartsWidths.draggableIconWidth, overflowX: "hidden" } }>
                    <img className=" icon-small " src="static/images/icon-draggable.png"
                        title="Drag to Change Condition Group Order" ></img> {/*  Replace with draggable icon */}
                </div>
                <div style={ { maxWidth: conditionGroupItemPartsWidths.display_SubGroupName_Width, paddingRight: 5, overflowX: "hidden", textOverflow: "ellipsis" } }
                    title={ ( "Label:\n" + conditionGroup.label + "\n\nClick to change Condition Group" ) }>
                    { conditionGroup.label }
                </div>
                <div style={ { 
                        maxWidth: conditionGroupItemPartsWidths.conditionCountWidth, 
                        // whiteSpace: "nowrap",
                        overflowX: "hidden", textOverflow: "ellipsis" 
                    } }
                    title={ "Number of Conditions in group: " + numberOfConditionsInGroup }>
                    { numberOfConditionsInGroup }
                </div>
                <div style={ { 
                        maxWidth: conditionGroupItemPartsWidths.typeWidth, 
                        // whiteSpace: "nowrap",
                        overflowX: "hidden", textOverflow: "ellipsis" 
                    } }
                    title={ "Type: " + conditionGroupType }>
                    { conditionGroupType }
                </div>
                <div style={ { maxWidth: conditionGroupItemPartsWidths.subGroupName_Width, overflowX: "hidden" } }>
                    { deleteIconComponent }
                </div>
            </div>
        );
    }
}
