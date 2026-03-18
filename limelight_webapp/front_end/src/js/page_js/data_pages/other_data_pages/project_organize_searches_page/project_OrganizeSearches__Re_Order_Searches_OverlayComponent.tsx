/**
 * project_OrganizeSearches__Re_Order_Searches_OverlayComponent.tsx
 *
 * Re-Order Searches  Overlay - For changing the order of the searches to display
 *
 *
 */

import React from 'react'

import { DragDropContext, Draggable, Droppable } from "@adaptabletools/react-beautiful-dnd";

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

/////

const _Overlay_Title = "Change the display order of the searches"

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export class Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params {
    updated_projectSearchId_Order_List : Array<number>
}

export type Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches =
    (params: Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) => void

/**
 *
 */
export const open_Project_OrganizeSearches_Re_Order_Searches_Overlay = function(
    params : {
        projectSearchId_In_Order_Existing: ReadonlyArray<number>
        searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_update_OrderOf_Searches : ( params : Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) => void

    }) : void {


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_Callback : Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.callback_update_OrderOf_Searches(params_Callback);
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.callbackOn_Cancel_Close_Clicked()
    }


    const overlayComponent = (
        <Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component
            projectSearchId_In_Order_Existing={ params.projectSearchId_In_Order_Existing }
            searchesSearchTagsFolders_Result_Root={ params.searchesSearchTagsFolders_Result_Root }
            callbackOn_Cancel_Close_Clicked={ cancel_Callback_Local }
            callback_update_OrderOf_Searches={ change_Callback_Local }
        />
    )

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

/////

////  React Components

/**
 *
 */
interface Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component_Props {
    projectSearchId_In_Order_Existing: ReadonlyArray<number>
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_update_OrderOf_Searches : ( params : Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) => void
}

/**
 *
 */
interface Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component extends React.Component< Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component_Props, Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
    private _onDragEnd_SearchItem_BindThis = this._onDragEnd_SearchItem.bind(this);
    private _projectSearchId_In_Order_InProgress: Array<number>

    /**
     *
     */
    constructor(props: Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._projectSearchId_In_Order_InProgress = Array.from( this.props.projectSearchId_In_Order_Existing );

        this.state = { force_Rerender : {} };
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        this.props.callback_update_OrderOf_Searches({ updated_projectSearchId_Order_List : this._projectSearchId_In_Order_InProgress })
    }

    /**
     *
     */
    private _onDragEnd_SearchItem( result: any ) : void {
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

        const searchList_InProgress = Array.from( this._projectSearchId_In_Order_InProgress );

        if ( sourceIndex < destinationIndex ) {

            //  Add first, then remove, so that destination Index does not move while removing at source Index

            const itemToMove = searchList_InProgress[sourceIndex];

            //  splice Updates the Array in place

            const destinationIndex_WhenAddFirst = destinationIndex + 1;

            const nothingRemoved_Adding  = searchList_InProgress.splice( destinationIndex_WhenAddFirst, 0, itemToMove )

            const itemRemovedAtSourceIndex = searchList_InProgress.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

        } else {
            // sourceIndex > destinationIndex
            //  Remove first, then add, so that source Index does not move while adding at destination Index

            const itemToMove = searchList_InProgress[sourceIndex];

            //  splice Updates the Array in place

            const itemRemovedAtSourceIndex = searchList_InProgress.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

            const nothingRemoved_Adding  = searchList_InProgress.splice( destinationIndex, 0, itemToMove )

            var znothing = 0;
        }

        this._projectSearchId_In_Order_InProgress = searchList_InProgress;
        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    render(): React.ReactNode {

        const searchDisplayList : Array<React.JSX.Element> = [];

        {
            let index = 0

            for (const projectSearchId of this._projectSearchId_In_Order_InProgress) {

                const searchEntry = this.props.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId( projectSearchId );

                if ( ! searchEntry ) {
                    const msg = "this.props.allSearches_Map_Key_ProjectSearchId.get( projectSearchId ); returned NOTHING for projectSearchId: " + projectSearchId;
                    console.warn(msg);
                    throw Error(msg);
                }

                const draggableId = searchEntry.projectSearchId.toString();
                const searchDisplayListEntry = (
                    <DraggableSearchEntry key={searchEntry.projectSearchId}
                                          draggableId={draggableId}
                                          index={index}
                                          searchDisplayListItem={searchEntry}
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);
                index++;
            }
        }

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

                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { paddingBottom : 20 } }
                >
                    <div>
                        Drag the searches to the order to be displayed in.
                    </div>
                    <div>
                        When Finished, click "Change" to save or click "Cancel" to close with no changes.
                    </div>
                </div>

                <div className=" re-order-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >

                    <div
                        // style={ { padding : 6 } }
                    >

                        <DragDropContext onDragEnd={ this._onDragEnd_SearchItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                            <Droppable droppableId="SearchList_Reorder_Maint" type="SEARCH_RE_ORDER">
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className=" searches-container "
                                    >
                                        { searchDisplayList  /* Entries in the list */ }
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >

                    <div style={ { marginTop: 15 } }>
                        <input type="button" value="Change" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />

                        <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
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
    searchDisplayListItem : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
    draggableId: any
    index : number;

}

/**
 *
 */
interface SearchEntry_State {
    searchNameDisplay : string
}

/**
 *
 */
class DraggableSearchEntry extends React.Component< SearchEntry_Props, SearchEntry_State > {

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        const searchNameDisplay = this._create_searchNameDisplay(props)

        this.state = {
            searchNameDisplay
        }
    }

    private _create_searchNameDisplay(props: SearchEntry_Props) : string {

        const searchNameDisplay = "(" + this.props.searchDisplayListItem.searchId + ") " + this.props.searchDisplayListItem.searchName;

        return searchNameDisplay;
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <Draggable key={ this.props.searchDisplayListItem.projectSearchId } draggableId={ this.props.draggableId } index={ this.props.index }>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        // className=" experiment-maint-default-border-style "
                        // style={ getConditionGroupListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                    >
                        <div className={ "search-single-entry-container"} >
                            <div style={ { display: "grid", gridTemplateColumns : "20px auto" } } >
                                <div style={ { marginLeft: 2, maxWidth: 20, overflowX : "hidden" } }>
                                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                        title={
                                            <span>
                                                Drag to change Search Order
                                            </span>
                                        }
                                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                    >
                                        <img  src="static/images/icon-draggable.png"
                                              className=" icon-small " />
                                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                </div>
                                <div
                                     className=" word-break-break-word-backup-break-all "
                                >

                                    <span style={ { overflowWrap: "break-word" } }>
                                        { this.state.searchNameDisplay }
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
