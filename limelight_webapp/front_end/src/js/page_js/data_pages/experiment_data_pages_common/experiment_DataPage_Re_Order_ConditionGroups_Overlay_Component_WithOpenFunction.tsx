/**
 * experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_WithOpenFunction.tsx
 *
 * Experiment Data Page (Peptide, Protein, Etc)
 *
 * Re-Order Condition Groups  Overlay - For changing the order of the condition groups to display
 *
 *
 */

import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    Experiment_ConditionGroup, Experiment_ConditionGroupsContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    Experiment_SingleExperiment_ConditionsGraphicRepresentation,
    ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents
} from "page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation";
import {
    create_experimentConditions_GraphicRepresentation_PropsData
} from "page_js/data_pages/experiment_data_pages_common/create_experimentConditions_GraphicRepresentation_PropsData";
import {
    Experiment_ConditionGroupsDataContainer
} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class";
import {
    Experiment_ConditionGroups_Order_CentralStateManagerObjectClass
} from "page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroups_Order_CentralStateManagerObjectClass";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/////

const _Overlay_Title = "Change the display order of the condition groups"

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 800;

//////

/**
 *
 */
export class Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component__Callback_update_OrderOf_ConditionGroups_Params {
    updated_conditionGroups : Array<Experiment_ConditionGroup>
}

export type Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component__Callback_update_OrderOf_ConditionGroups =
    ( params : Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component__Callback_update_OrderOf_ConditionGroups_Params ) => void

/**
 *
 */
export const open_experiment_DataPage_Re_Order_ConditionGroups_Overlay = function(
    {
        conditionGroupsContainer__Input,
        conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM,
        conditionGroupsDataContainer,
        experiment_ConditionGroups_Order_CentralStateManagerObjectClass,
        experimentConditions_GraphicRepresentation_MainCell_getHoverContents,
        callbackOn_Cancel_Close_Clicked,
        callback_update_OrderOf_ConditionGroups
    } : {
        conditionGroupsContainer__Input : Experiment_ConditionGroupsContainer
        conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM : Experiment_ConditionGroupsContainer  //  For Revert
        conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
        experiment_ConditionGroups_Order_CentralStateManagerObjectClass: Experiment_ConditionGroups_Order_CentralStateManagerObjectClass  // Updated
        experimentConditions_GraphicRepresentation_MainCell_getHoverContents: ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_update_OrderOf_ConditionGroups : Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component__Callback_update_OrderOf_ConditionGroups

    }) : void {

    let component_JSX_Element_AddedTo_DocumentBody_Holder:  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked_Local = () => {
        try {
            component_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()

            if ( callbackOn_Cancel_Close_Clicked ) {
                callbackOn_Cancel_Close_Clicked()
            }

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    const callback_update_OrderOf_ConditionGroups_Local = ( params : Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component__Callback_update_OrderOf_ConditionGroups_Params ) =>  {
        try {
            component_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()

            callback_update_OrderOf_ConditionGroups( params )

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    const overlayComponent = (
        <Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component
            conditionGroupsContainer__Input={ conditionGroupsContainer__Input }
            conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM={ conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM }
            conditionGroupsDataContainer={ conditionGroupsDataContainer }
            experiment_ConditionGroups_Order_CentralStateManagerObjectClass={ experiment_ConditionGroups_Order_CentralStateManagerObjectClass }
            experimentConditions_GraphicRepresentation_MainCell_getHoverContents={ experimentConditions_GraphicRepresentation_MainCell_getHoverContents }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked_Local }
            callback_update_OrderOf_ConditionGroups={ callback_update_OrderOf_ConditionGroups_Local }
        />
    )

    component_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

////  React Components

/**
 *
 */
interface Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_Props {
    conditionGroupsContainer__Input : Experiment_ConditionGroupsContainer
    conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM : Experiment_ConditionGroupsContainer  //  For Revert
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    experiment_ConditionGroups_Order_CentralStateManagerObjectClass: Experiment_ConditionGroups_Order_CentralStateManagerObjectClass  // Updated
    experimentConditions_GraphicRepresentation_MainCell_getHoverContents: ExperimentConditions_GraphicRepresentation_MainCell_getHoverContents
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_update_OrderOf_ConditionGroups : ( params : Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component__Callback_update_OrderOf_ConditionGroups_Params ) => void
}

/**
 *
 */
interface Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_State {

    force_ReRender_Object?: object
}

/**
 *
 */
class Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component extends React.Component< Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_Props, Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_State > {

    private _apply_ButtonClicked_BindThis = this._apply_ButtonClicked.bind(this);
    private _revert_ButtonClicked_BindThis = this._revert_ButtonClicked.bind(this)
    private _onDragEnd_SearchItem_BindThis = this._onDragEnd_SearchItem.bind(this);

    private _conditionGroups_InProgress : Array<Experiment_ConditionGroup>

    private _conditionGroup_Order_Has_Changed: boolean = false
    private _disable_Apply_Button: boolean = true

    /**
     *
     */
    constructor(props: Experiment_DataPage_Re_Order_ConditionGroups_Overlay_Component_Props) {
        super(props);

        this._conditionGroups_InProgress = Array.from( this.props.conditionGroupsContainer__Input.conditionGroups );

        this.state = { force_ReRender_Object: {} };
    }

    /**
     *
     */
    private _apply_ButtonClicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            if ( event ) {
                event.stopPropagation()
            }

            this._update___conditionGroup_Order_Has_Changed_AND___disable_Apply_Button()

            if ( this._disable_Apply_Button ) {
                return // EARLY RETURN
            }

            const conditionGroupIds_Order: Array<number> = []

            for ( const conditionGroup of this._conditionGroups_InProgress ) {
                conditionGroupIds_Order.push( conditionGroup.id )
            }

            //  Compare conditionGroupIds_Order to condition group order and if same then clear the condition group order, else apply new condition group order

            //      Do this so that if the experiment definition is changed in the DB via the experiment builder that the new condition group order from the experiment will be used

            if ( conditionGroupIds_Order.length !== this.props.conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.conditionGroups.length ) {
                throw Error("( conditionGroupIds_Order.length !== this.props.conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.conditionGroups.length )")
            }

            let conditionGroupIds_Order__Matches__ExperimentInDB = true

            for ( let index = 0; index < conditionGroupIds_Order.length; index++ ) {
                const conditionGroupIds_Order_Entry = conditionGroupIds_Order[ index ]
                const conditionGroup_From_DB = this.props.conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.conditionGroups[ index ]

                if ( conditionGroupIds_Order_Entry !== conditionGroup_From_DB.id ) {
                    conditionGroupIds_Order__Matches__ExperimentInDB = false
                }
            }

            if ( conditionGroupIds_Order__Matches__ExperimentInDB ) {

                this.props.experiment_ConditionGroups_Order_CentralStateManagerObjectClass.clearAll()
            } else {
                this.props.experiment_ConditionGroups_Order_CentralStateManagerObjectClass.set_ConditionGroupIds_Order( conditionGroupIds_Order )
            }

            this.props.callback_update_OrderOf_ConditionGroups({ updated_conditionGroups : this._conditionGroups_InProgress })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _revert_ButtonClicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            if ( event ) {
                event.stopPropagation()
            }

            this._conditionGroups_InProgress = Array.from( this.props.conditionGroupsContainer_FromDb_FromExperimentBuilder_RetrievedFromDOM.conditionGroups )

            this._update___conditionGroup_Order_Has_Changed_AND___disable_Apply_Button()

            this.setState({ force_ReRender_Object: {} })

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    private _onDragEnd_SearchItem( result ) : void {
        // dropped outside the list
        if ( ! result.destination ) {
            return; // EARLY RETURN
        }

        //  result.destination.index comes from drag and drop library and always starts at zero

        //  For consistency, result.source.index will also always start at zero

        //  add this.state.specialEntriesAtStart_Count to reflect index in the actual array

        const sourceIndex : number = result.source.index;
        const destinationIndex : number = result.destination.index;

        if ( sourceIndex === destinationIndex ) {
            console.warn( "if ( sourceIndex === destinationIndex ) {")
            return; // EARLY RETURN
        }

        const conditionGroups_InProgress = Array.from( this._conditionGroups_InProgress )

        if ( sourceIndex < destinationIndex ) {

            //  Add first, then remove, so that destination Index does not move while removing at source Index

            const itemToMove = conditionGroups_InProgress[sourceIndex];

            //  splice Updates the Array in place

            const destinationIndex_WhenAddFirst = destinationIndex + 1;

            const nothingRemoved_Adding  = conditionGroups_InProgress.splice( destinationIndex_WhenAddFirst, 0, itemToMove )

            const itemRemovedAtSourceIndex = conditionGroups_InProgress.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

        } else {
            // sourceIndex > destinationIndex
            //  Remove first, then add, so that source Index does not move while adding at destination Index

            const itemToMove = conditionGroups_InProgress[sourceIndex];

            //  splice Updates the Array in place

            const itemRemovedAtSourceIndex = conditionGroups_InProgress.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

            const nothingRemoved_Adding  = conditionGroups_InProgress.splice( destinationIndex, 0, itemToMove )

            var znothing = 0;
        }

        this._conditionGroups_InProgress = conditionGroups_InProgress

        this._update___conditionGroup_Order_Has_Changed_AND___disable_Apply_Button()

        this.setState({ force_ReRender_Object: {} })
    }

    /**
     * Updates this._conditionGroup_Order_Has_Changed
     * @private
     */
    private _update___conditionGroup_Order_Has_Changed_AND___disable_Apply_Button() : void {

        if ( this.props.conditionGroupsContainer__Input.conditionGroups.length !== this._conditionGroups_InProgress.length ) {
            throw Error( "( this.props.conditionGroupsContainer__Input.conditionGroups.length !== this._conditionGroups_InProgress.length )" )
        }

        this._conditionGroup_Order_Has_Changed = false

        for ( let index = 0; index < this._conditionGroups_InProgress.length; index++ ) {

            if ( this.props.conditionGroupsContainer__Input.conditionGroups[ index ].id !== this._conditionGroups_InProgress[ index ].id ) {
                //  Order is different

                this._conditionGroup_Order_Has_Changed = true

                break
            }
        }

        this._disable_Apply_Button = ! this._conditionGroup_Order_Has_Changed
    }

    /**
     *
     */
    render(): React.ReactNode {

        const conditionGroupDisplayList : Array<JSX.Element> = [];

        {
            let index = 0

            for (const conditionGroupEntry of this._conditionGroups_InProgress) {

                const draggableId = conditionGroupEntry.id.toString();
                const conditionGroupDisplayListEntry = (
                    <DraggableSearchEntry key={conditionGroupEntry.id}
                                 draggableId={draggableId}
                                 index={index}
                                 conditionGroupDisplayListItem={conditionGroupEntry}
                    />
                )
                conditionGroupDisplayList.push(conditionGroupDisplayListEntry);
                index++;
            }
        }

        const conditionGroupsContainer = this.props.conditionGroupsContainer__Input.cloneShallow()
        conditionGroupsContainer.conditionGroups = this._conditionGroups_InProgress

        const experimentConditions_GraphicRepresentation_PropsData =
            create_experimentConditions_GraphicRepresentation_PropsData({
                conditionGroupsContainer, conditionGroupsDataContainer: this.props.conditionGroupsDataContainer
            }) //  Call External Function


        ////

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                set_CSS_Position_Fixed={ true }
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <div className=" re-order-conditionGroups-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", borderStyle: "solid", borderWidth: 1 } } // overflowX: "hidden",
                    // style={ { padding : 6 } }
                >

                    <div style={ { marginBottom: 20 } }>
                        Drag Condition Groups to new order and click "Apply" below.
                    </div>

                    <div style={ { float: "left", marginRight: 30 } }>

                        <div style={ { fontWeight: "bold", whiteSpace: "nowrap", marginBottom: 5 } }>
                            Condition Groups
                        </div>
                        <div
                            className=" experiment-maint-main-body "
                            style={ { display: "inline-block", marginBottom: 30 } }
                        >
                            <div
                                className="  experiment-maint-default-border-style "
                                style={ { borderWidth: 2 } }
                            >
                                <DragDropContext
                                    onDragEnd={ this._onDragEnd_SearchItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                                    <Droppable droppableId="ConditionGroupList_Reorder_Maint"
                                               type="CONDITION_GROUP_RE_ORDER">
                                        { ( provided, snapshot ) => (
                                            <div
                                                { ...provided.droppableProps }
                                                ref={ provided.innerRef }
                                                className=" conditionGroups-container "
                                            >
                                                { conditionGroupDisplayList  /* Entries in the list */ }
                                                { provided.placeholder }
                                            </div>
                                        ) }
                                    </Droppable>
                                </DragDropContext>
                            </div>
                        </div>

                    </div>


                    <div style={ { float: "left", marginRight: 10 } }>

                        <div style={ { fontWeight: "bold", whiteSpace: "nowrap", marginBottom: 5 } }>
                        Experiment Layout
                        </div>
                        <div style={ { overflowX: "auto" } }>

                            <div style={ {
                                borderColor: "black",
                                borderStyle: "solid",
                                borderWidth: 1,
                                marginRight: 5,  //  So border on right side is displayed
                                display: "inline-block"
                            } }>
                                <div style={ { paddingTop: 1, paddingLeft: 3, paddingRight: 3, paddingBottom: 3 } }>
                                    <Experiment_SingleExperiment_ConditionsGraphicRepresentation
                                        data={ experimentConditions_GraphicRepresentation_PropsData }
                                        selectedCells={ undefined }
                                        conditionGroupsContainer={ conditionGroupsContainer }
                                        manage_SelectedCells_ConditionCell_Selection_UserClick_Updates={ false }
                                        conditionCellClickHandler={ undefined }
                                        mainCellClickHandler={ undefined }
                                        mainCell_getHoverContents={ this.props.experimentConditions_GraphicRepresentation_MainCell_getHoverContents }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >

                    <div style={ { marginTop: 15 } }>
                        <div
                            style={ { marginRight: 5, display: "inline-block", position: "relative" } }
                        >
                            <button
                                disabled={ this._disable_Apply_Button }
                                onClick={ this._apply_ButtonClicked_BindThis }
                            >
                                Apply
                            </button>
                            { this._disable_Apply_Button ? (
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        "Change the order to enable"
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ { position: "absolute", inset: 0 } }
                                    >
                                    </div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ) : null }
                        </div>
                        <div
                            style={ { marginRight: 5, display: "inline-block", position: "relative" } }
                        >
                            <button
                                onClick={ this.props.callbackOn_Cancel_Close_Clicked }
                            >
                                Cancel
                            </button>
                        </div>
                        <div
                            style={ { marginRight: 5, display: "inline-block", position: "relative" } }
                        >
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    "Revert to original experiment structure."
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                            <button
                                onClick={ this._revert_ButtonClicked_BindThis }
                            >
                                Revert
                            </button>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        </div>
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}

/////

//  Single Search Entry

/**
 *
 */
interface SearchEntry_Props {
    conditionGroupDisplayListItem : Experiment_ConditionGroup
    draggableId;
    index : number;

}

/**
 *
 */
interface SearchEntry_State {
    conditionGroupNameDisplay : string
}

/**
 *
 */
class DraggableSearchEntry extends React.Component< SearchEntry_Props, SearchEntry_State > {

    private _onMouseEnter_conditionGroupNameText_Div_BindThis = this._onMouseEnter_conditionGroupNameText_Div.bind(this);
    private _onMouseLeave_conditionGroupNameText_Div_BindThis = this._onMouseLeave_conditionGroupNameText_Div.bind(this);

    private _conditionGroupNameText_Div_Ref :  React.RefObject<HTMLDivElement>;

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        this._conditionGroupNameText_Div_Ref = React.createRef();

        const conditionGroupNameDisplay = this._create_conditionGroupNameDisplay(props)

        this.state = {
            conditionGroupNameDisplay
        }
    }

    private _create_conditionGroupNameDisplay(props: SearchEntry_Props) : string {

        const conditionGroupNameDisplay = this.props.conditionGroupDisplayListItem.label;

        return conditionGroupNameDisplay;
    }

    private _onMouseEnter_conditionGroupNameText_Div(  ) {

        const tooltip_target_DOM_Element = this._conditionGroupNameText_Div_Ref.current;
        const tooltipContents = (
            <div >
                { this.state.conditionGroupNameDisplay }
            </div>
        );

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip =
            tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element, tooltipContents });
    }

    private _onMouseLeave_conditionGroupNameText_Div(  ) {

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip = null;
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <Draggable key={ this.props.conditionGroupDisplayListItem.id } draggableId={ this.props.draggableId } index={ this.props.index }>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className=" experiment-maint-default-border-style "
                        // style={ getConditionGroupListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                    >
                        <div
                            className="conditionGroup-single-entry-container"
                            style={ {  padding : 6 } }
                        >
                            <div style={ { display: "grid", gridTemplateColumns : "20px auto" } } >
                                <div style={ { marginLeft: 2, maxWidth: 20, overflowX : "hidden" } }>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            "Drag to change Search Order"
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img  src="static/images/icon-draggable.png"
                                        className=" icon-small "/>
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                                <div ref={ this._conditionGroupNameText_Div_Ref }
                                     // onMouseEnter={ this._onMouseEnter_conditionGroupNameText_Div_BindThis }
                                     // onMouseLeave={ this._onMouseLeave_conditionGroupNameText_Div_BindThis }
                                    // title={ this.state.conditionGroupNameDisplay }
                                     className=" word-break-break-word-backup-break-all "
                                >

                                    <span style={ { overflowWrap: "break-word" } }>
                                        { this.state.conditionGroupNameDisplay }
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}
