/**
 * searchDetailsAndFilterBlock_Re_Order_Searches_OverlayLayout.tsx
 *
 * Re-Order Searches  Overlay - For changing the order of the searches to display
 *
 *
 */

import React from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { ModalOverlay_Limelight_Component } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001/modalOverlay_WithTitlebar_React_v001";
import {
    tooltip_Limelight_Create_Tooltip,
    Tooltip_Limelight_Created_Tooltip
} from "page_js/common_all_pages/tooltip_LimelightLocal_ReactBased";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";

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
export class SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params {
    updated_searchList : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem>
}

/**
 *
 */
export const get_SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Layout = function({

    searchList,
    callbackOn_Cancel_Close_Clicked,
    callback_update_OrderOf_Searches
} : {
    searchList : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_update_OrderOf_Searches : ( params : SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) => void

}) : JSX.Element {

    return (
        <SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component
            searchList={ searchList }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_update_OrderOf_Searches={ callback_update_OrderOf_Searches }
        />
    )
}

/////

/**
 * Used for both Search and Folder
 */
export class SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem {

    //  Search
    projectSearchId : number
    searchId : number
    searchName : string

    constructor({ projectSearchId, searchId, searchName } : {

        //  Search
        projectSearchId : number
        searchId : number
        searchName : string

    }) {
        this.projectSearchId = projectSearchId;
        this.searchId = searchId;
        this.searchName = searchName;
    }
}

////  React Components

/**
 *
 */
interface SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component_Props {
    searchList : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_update_OrderOf_Searches : ( params : SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) => void
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component_State {
    searchList_InProgress : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem>
}

/**
 *
 */
class SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component extends React.Component< SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component_Props, SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
    private _onDragEnd_SearchItem_BindThis = this._onDragEnd_SearchItem.bind(this);
    private _searchList_InProgress : Array<SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem>

    /**
     *
     */
    constructor(props: SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._searchList_InProgress = Array.from( this.props.searchList );

        this.state = { searchList_InProgress : this._searchList_InProgress };
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        this.props.callback_update_OrderOf_Searches({ updated_searchList : this.state.searchList_InProgress })
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

        const searchList_InProgress = this._searchList_InProgress

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

        this._searchList_InProgress = searchList_InProgress;
        this.setState({ searchList_InProgress })
    }

    /**
     *
     */
    render(): React.ReactNode {

        const searchDisplayList : Array<JSX.Element> = [];

        {
            let index = 0

            for (const searchEntry of this.state.searchList_InProgress) {

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

                <div className=" re-order-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
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
    searchDisplayListItem : SearchDetailsAndFilterBlock_Re_Order_Searches_Overlay_Search_DisplayListItem
    draggableId;
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

    private _onMouseEnter_searchNameText_Div_BindThis = this._onMouseEnter_searchNameText_Div.bind(this);
    private _onMouseLeave_searchNameText_Div_BindThis = this._onMouseLeave_searchNameText_Div.bind(this);

    private _searchNameText_Div_Ref :  React.RefObject<HTMLDivElement>;

    private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        this._searchNameText_Div_Ref = React.createRef();

        const searchNameDisplay = this._create_searchNameDisplay(props)

        this.state = {
            searchNameDisplay
        }
    }

    private _create_searchNameDisplay(props: SearchEntry_Props) : string {

        const searchNameDisplay = "(" + this.props.searchDisplayListItem.searchId + ") " + this.props.searchDisplayListItem.searchName;

        return searchNameDisplay;
    }

    private _onMouseEnter_searchNameText_Div(  ) {

        const tooltip_target_DOM_Element = this._searchNameText_Div_Ref.current;
        const tooltipContents = (
            <div >
                { this.state.searchNameDisplay }
            </div>
        );

        if ( this._tooltip_Limelight_Created_Tooltip ) {
            this._tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this._tooltip_Limelight_Created_Tooltip =
            tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element, tooltipContents });
    }

    private _onMouseLeave_searchNameText_Div(  ) {

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
                                    <img  src="static/images/icon-draggable.png"
                                    className=" icon-small "
                                    title="Drag to change Search Order"/>
                                </div>
                                <div ref={ this._searchNameText_Div_Ref }
                                     // onMouseEnter={ this._onMouseEnter_searchNameText_Div_BindThis }
                                     // onMouseLeave={ this._onMouseLeave_searchNameText_Div_BindThis }
                                    // title={ this.state.searchNameDisplay }
                                    // style={ { whiteSpace : "nowrap", overflowX : "hidden", textOverflow : "ellipsis" } }
                                    style={ { wordBreak: "break-word" } }
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
