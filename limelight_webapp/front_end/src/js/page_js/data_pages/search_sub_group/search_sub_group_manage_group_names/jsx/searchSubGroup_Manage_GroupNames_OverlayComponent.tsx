/**
 * searchSubGroup_Manage_GroupNames_OverlayComponent.tsx
 *
 * Search Sub Group Manage Sub Group Names Overlay - For User update Sub Group Names
 *
 *
 */

import React from 'react'
import { ModalOverlay_Limelight_Component } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001/modalOverlay_WithTitlebar_React_v001";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {
    searchSubGroup_Manage_GroupNames_UpdateServer,
    SearchSubGroup_Manage_GroupNames_UpdateServer_Entry
} from "page_js/data_pages/search_sub_group/search_sub_group_manage_group_names/js/searchSubGroup_Manage_GroupNames_UpdateServer";


const _DISPLAY_SUB_GROUP_NAME_MAX_LENGTH = 8;

//  Modal width / height

const _WIDTH = 800;
const _HEIGHT = 600;


////////////

/**
 *   Sub Group Object for display to user
 */
export class SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object {
    id : number
    displayName : string
    importedName : string

    constructor({ id, displayName, importedName } : {
        id : number
        displayName : string
        importedName : string
    }) {
        this.id = id;
        this.displayName = displayName;
        this.importedName = importedName;
    }

    clone() : SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object {
        return new SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object({
            id : this.id,
            displayName : this.displayName,
            importedName : this.importedName
        })
    }

    equal( other : SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object ) {
        if ( other.id === this.id,
            other.displayName === this.displayName,
            other.importedName === this.importedName ) {

            return true;
        }
        return  false;
    }
}

export class SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback_Params {

    updatedSubGroups : ReadonlyArray<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object>
}

/**
 *
 */
export type SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback = ( params : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback_Params ) => void ;


/**
 *
 */
export const get_SearchSubGroup_Manage_GroupNames_Overlay_Layout = function(
    {
        subGroup_Display_ObjectList,
        projectSearchId,
        callbackOn_Cancel_Close_Clicked,
        callbackOn_Update
    } : {
        subGroup_Display_ObjectList : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object>
        projectSearchId : number
        callbackOn_Cancel_Close_Clicked : () => void;
        callbackOn_Update : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback

    }) : JSX.Element {

    return (
        <SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component
            subGroup_Display_ObjectList={ subGroup_Display_ObjectList }
            projectSearchId={ projectSearchId }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callbackOn_Update={ callbackOn_Update }
        />
    )
}

/**
 *
 */
interface SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_Props {
    subGroup_Display_ObjectList : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object>
    projectSearchId : number
    callbackOn_Cancel_Close_Clicked : () => void;
    callbackOn_Update : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback
}

/**
 *
 */
interface SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_State {
    subGroup_Display_ObjectList : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object>
}

/**
 *
 */
class SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component extends React.Component< SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_Props, SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
    private onDragEnd_SubGroupItem_Callback_BindThis = this.onDragEnd_SubGroupItem_Callback.bind(this);

    private _above_list_block_Ref : React.RefObject<HTMLDivElement>
    private _selection_dialog_list_bounding_box_Ref : React.RefObject<HTMLDivElement>

    /**
     *
     */
    constructor(props: SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._above_list_block_Ref = React.createRef<HTMLDivElement>();
        this._selection_dialog_list_bounding_box_Ref = React.createRef<HTMLDivElement>();

        const subGroup_Display_ObjectList : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> = [];

        for ( const subGroup_Display_Object_FromProps of props.subGroup_Display_ObjectList ) {
            const subGroup_Display_Object_Clone = subGroup_Display_Object_FromProps.clone();
            subGroup_Display_ObjectList.push( subGroup_Display_Object_Clone );
        }

        this.state = { subGroup_Display_ObjectList };
    }

    /**
     *
     */
    componentDidMount(): void {

        //  Adjust scrollable div max-height

        const aboveListBlockHeight= this._above_list_block_Ref.current.getBoundingClientRect().height

        const scrollableDivMaxHeight = _HEIGHT - 125 - aboveListBlockHeight;
        const scrollableDivMaxHeightPxString = scrollableDivMaxHeight + "px";

        this._selection_dialog_list_bounding_box_Ref.current.style.maxHeight = scrollableDivMaxHeightPxString;
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        const projectSearchId = this.props.projectSearchId;

        const subGroupEntries : Array<SearchSubGroup_Manage_GroupNames_UpdateServer_Entry> = [];

        {  //  Test for anything changed.  If Not, call Cancel call back

            //  Copy to new Array to ensure indexes are in numeric order
            const subGroup_Display_ObjectList_ExistingValues = Array.from( this.props.subGroup_Display_ObjectList );

            let subGroupEntries_Have_Changed = false;

            let index = 0;

            for ( const subGroup_Display_Object of this.state.subGroup_Display_ObjectList ) {

                const subGroup_Display_ObjectList_ExistingValue = subGroup_Display_ObjectList_ExistingValues[ index ];

                if ( ! subGroup_Display_ObjectList_ExistingValue ) {
                    //  Should NEVER get here
                    subGroupEntries_Have_Changed = true;
                } else {
                    if ( ! subGroup_Display_ObjectList_ExistingValue.equal( subGroup_Display_Object ) ) {
                        //  Found difference
                        subGroupEntries_Have_Changed = true;
                    }
                }

                index++;

            }

            if ( ! subGroupEntries_Have_Changed ) {
                //  Nothing has changed so just Close Overlay

                this.props.callbackOn_Cancel_Close_Clicked();

                return; // EARLY RETURN
            }
        }

        //  When get here, The new groups are different from prev (new order and/or new values)

        {
            let displayOrder = 0;

            for ( const subGroup_Display_Object of this.state.subGroup_Display_ObjectList ) {

                displayOrder++;

                //  Build entry for update Server
                const subGroupEntry : SearchSubGroup_Manage_GroupNames_UpdateServer_Entry = {
                    subGroupId : subGroup_Display_Object.id,
                    displayOrder,
                    displayName : subGroup_Display_Object.displayName
                };

                subGroupEntries.push( subGroupEntry );
            }
        }

        const promise = searchSubGroup_Manage_GroupNames_UpdateServer({ projectSearchId, subGroupEntries });

        promise.catch( (reason) => {
            throw Error("AJAX Failed");
        });

        promise.then( (result) => {
           if ( this.props.callbackOn_Update ) {

               const updatedSubGroups : Array<SearchSubGroup_Manage_GroupNames__SubGroup_Display_Object> = [];

               for ( const subGroup_Display_Object of this.state.subGroup_Display_ObjectList ) {
                   const clone = subGroup_Display_Object.clone();
                   updatedSubGroups.push( clone );
               }

               const params : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_UpdateCallback_Params = {

                   updatedSubGroups
               };

               this.props.callbackOn_Update( params );
           }

        });
    }

    /**
     *
     */
    private onDragEnd_SubGroupItem_Callback( result: any ) {

        // dropped outside the list
        if ( ! result.destination ) {
            return;
        }

        this.setState( (state : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_State, props : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_Props ) : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_State => {

            const sourceIndex = result.source.index;
            const destinationIndex = result.destination.index;

            const subGroup_Display_ObjectList = state.subGroup_Display_ObjectList;
            const subGroup_Display_ObjectList_Length = subGroup_Display_ObjectList.length;


            const subGroup_Display_Object_ToMove = subGroup_Display_ObjectList[ sourceIndex ];
            if ( subGroup_Display_Object_ToMove === undefined ) {
                return null; //  Index not in array so no changes
            }

            //  Remove Source Index

            const subGroup_Display_Object_Containers_BeforeSource = subGroup_Display_ObjectList.slice( 0, sourceIndex );
            const subGroup_Display_Object_Containers_AfterSource = subGroup_Display_ObjectList.slice( sourceIndex + 1 );
            const subGroup_Display_Object_Containers_SourceRemoved = subGroup_Display_Object_Containers_BeforeSource.concat( subGroup_Display_Object_Containers_AfterSource );

            let destinationIndex_InSourceRemovedArray = destinationIndex;

            if ( destinationIndex > sourceIndex ) {
                // destination index has shifted since removed element at sourceIndex from array
                destinationIndex_InSourceRemovedArray = destinationIndex_InSourceRemovedArray--;
            }

            //  Split subGroup_Display_Object_Containers_SourceRemoved at destinationIndex_InSourceRemovedArray

            let subGroup_Display_Object_Containers_BeforeDestination = subGroup_Display_Object_Containers_SourceRemoved.slice( 0, destinationIndex_InSourceRemovedArray );
            let subGroup_Display_Object_Containers_AtDestinationAndRest = subGroup_Display_Object_Containers_SourceRemoved.slice( destinationIndex_InSourceRemovedArray );

            //  Combine arrays for final

            const subGroup_Display_ObjectList_New = subGroup_Display_Object_Containers_BeforeDestination.concat( subGroup_Display_Object_ToMove, subGroup_Display_Object_Containers_AtDestinationAndRest );


            return { subGroup_Display_ObjectList : subGroup_Display_ObjectList_New };
        });
    }

    private _changeGroupName( value: any /* event.target.value */, id: any /* subGroup_Display_Object.id */ ) {

        this.setState( (state : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_State, props : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_Props ) : SearchSubGroup_Manage_GroupNames_Overlay_OuterContainer_Component_State => {

            for ( const subGroup_Display_Object of state.subGroup_Display_ObjectList ) {

                if ( subGroup_Display_Object.id === id ) {
                    subGroup_Display_Object.displayName = value;

                    break;
                }
            }

            return { subGroup_Display_ObjectList : state.subGroup_Display_ObjectList }
        });
    }

    /**
     *
     */
    render(): React.ReactNode {


        const subGroup_ItemOuterPartsWidths = {
            paddingWidth: 2,
            borderWidth: 2
        }

        const subGroup_ItemPartsWidths = {
            draggableIconWidth : 20,
            display_SubGroupName_Width : 130, // Column "Display Group Name"

            //  Updated next

            subGroupName_Width : -1,
            subGroupName_Width_TextDivWidth : -1
        };

        // Column "Group Name"
        subGroup_ItemPartsWidths.subGroupName_Width = _WIDTH - subGroup_ItemPartsWidths.draggableIconWidth - subGroup_ItemPartsWidths.display_SubGroupName_Width - 50;

        // Column "Group Name" scrollable <div>
        subGroup_ItemPartsWidths.subGroupName_Width_TextDivWidth = subGroup_ItemPartsWidths.subGroupName_Width - 10;

        const display_SubGroupName_InputField_Width = subGroup_ItemPartsWidths.display_SubGroupName_Width - 20; // Column "Display Group Name"

        const displayGroupName_ColumnHeaderWidth = subGroup_ItemPartsWidths.draggableIconWidth + subGroup_ItemPartsWidths.display_SubGroupName_Width;

        const subGroup_ItemStyle_gridTemplateColumns = (
            subGroup_ItemPartsWidths.draggableIconWidth
            + "px "
            + subGroup_ItemPartsWidths.display_SubGroupName_Width
            + "px "
            + subGroup_ItemPartsWidths.subGroupName_Width
            + "px "
        );


        const subGroup_ItemInnerStyle = {
            display: "grid",
            gridTemplateColumns: subGroup_ItemStyle_gridTemplateColumns,
        };

        const subGroups_ContainerWidth = (
            subGroup_ItemOuterPartsWidths.paddingWidth
            + subGroup_ItemOuterPartsWidths.borderWidth
            + subGroup_ItemPartsWidths.draggableIconWidth
            + subGroup_ItemPartsWidths.display_SubGroupName_Width
            + subGroup_ItemPartsWidths.subGroupName_Width
            + 2
        );

        let dragIconTitle = "Drag to change Sub Group Order";

        const subGroup_Display_ElementList : Array<JSX.Element> = [];

        {

            const get_SubGroupListItem_OuterStyle = ( isDragging: any, draggableStyle: any ) => {

                //  Must use a function since need to add values in parameter 'draggableStyle' to result

                return {
                    userSelect: "none",
                    padding: subGroup_ItemOuterPartsWidths.paddingWidth,

                    borderWidth: subGroup_ItemOuterPartsWidths.borderWidth,

                    //  In CSS class sub-group-maint-default-border-style
                    // borderStyle: "solid",
                    // borderColor: "grey",

                    // change background colour if dragging
                    // background: isDragging ? "lightgreen" : "grey",

                    // styles we need to apply on draggables (function parameter)
                    ...draggableStyle
                }
            };

            let index = -1;

            for ( const subGroup_Display_Object of this.state.subGroup_Display_ObjectList ) {

                index++;

                const draggableId = subGroup_Display_Object.id.toString();

                const element = (
                    // <div key={ subGroup_Display_Object.id } style={ {  } }>
                    //     <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }
                    //          className=" hovered-div-highlight "
                    //     >

                    <Draggable key={ subGroup_Display_Object.id } draggableId={ draggableId } index={index}>
                        { ( provided, snapshot) => (
                            <div // onClick={ (event) => { console.log( "Whole Draggable clicked: index: " + conditionContainer.index )}}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className=" sub-group-maint-default-border-style "
                                style={ get_SubGroupListItem_OuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                            >


                                <div style={ subGroup_ItemInnerStyle }  >

                                    <div style={ { marginLeft: 2, marginTop: 4, maxWidth: subGroup_ItemPartsWidths.draggableIconWidth, overflowX: "hidden" } }>
                                        <img className=" icon-small " src="static/images/icon-draggable.png"
                                             title={ dragIconTitle } ></img>
                                    </div>


                                    <div style={ { width : subGroup_ItemPartsWidths.display_SubGroupName_Width, paddingBottom: 0 } }>
                                        {/*'defaultValue' for uncontrolled input.*/}
                                        {/*Change to 'value' for controlled input.*/}
                                        <input type="text" style={ { width : display_SubGroupName_InputField_Width } }
                                               maxLength={ _DISPLAY_SUB_GROUP_NAME_MAX_LENGTH }
                                               value={ subGroup_Display_Object.displayName }
                                               onChange={ (event) => { this._changeGroupName( event.target.value, subGroup_Display_Object.id ) }}
                                        />
                                    </div>
                                    <div style={ { marginBottom: 0 } }>
                                        <div style={ {
                                            width : subGroup_ItemPartsWidths.subGroupName_Width_TextDivWidth, maxWidth: subGroup_ItemPartsWidths.subGroupName_Width_TextDivWidth,
                                            whiteSpace: "nowrap", overflowX: "auto",
                                            paddingTop : 3
                                        } }
                                            title={ subGroup_Display_Object.importedName }
                                        >
                                            { subGroup_Display_Object.importedName }
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </Draggable>

                    // {/*</div>*/}
                );
                subGroup_Display_ElementList.push( element );
            }
        }

        //  Following are NOT Currently Formatted properly

        // for ( let counter = 0; counter < 20; counter++ ) {
        //
        //     const element = (
        //         <div key={ "Extra_Lines_" + counter } >
        //
        //             <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }
        //                  className=" hovered-div-highlight "
        //             >
        //
        //                 <div style={ { width : _DISPLAY_NAME_WIDTH, paddingBottom: 3 } }>
        //                     {/*'defaultValue' for uncontrolled input.*/}
        //                     {/*Change to 'value' for controlled input.*/}
        //                     <input type="text" style={ { width : _DISPLAY_NAME_INPUT_FIELD_WIDTH } }
        //                            maxLength={ _DISPLAY_SUB_GROUP_NAME_MAX_LENGTH }
        //                            defaultValue={ "ExLn_" + counter }
        //                     />
        //                 </div>
        //                 <div style={ { marginBottom: 3 } }>
        //                     <div style={ { whiteSpace: "nowrap", width : _IMPORT_NAME_WIDTH, maxWidth: _IMPORT_NAME_WIDTH, overflowX: "auto" } }
        //                         title={ "Extra_Lines_" + counter + "_MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM" }
        //                     >
        //                         { "Extra_Lines_" + counter + "_MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM" }
        //                     </div>
        //                 </div>
        //
        //             </div>
        //         </div>
        //     );
        //     subGroup_Display_ElementList.push( element );
        //
        // }

        return (
            <ModalOverlay_Limelight_Component
                width={ _WIDTH }
                height={ _HEIGHT }
                title={ "Manage Sub Group Names" }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>
                <div >

                    <div className=" modal-overlay-body-standard-padding  sub-group-maint-overlay-main-contents-container ">

                        <div ref={ this._above_list_block_Ref }>   {/*className=" selector_mods_selection_dialog_above_mod_list_block "*/}
                            {/* may need to measure height and adjust max-height of selector_mods_selection_dialog_list_bounding_box */}

                            {/*<div style={ { fontWeight: "bold", marginBottom: 10 } }>*/}
                            {/*    XXXXXXX*/}
                            {/*</div>*/}
                        </div>
                        {/* max-height: value tied to height of total modal overlay, which is specified in JS code */}
                        {/* width: value tied to width of list entry */}

                        <div ref={ this._selection_dialog_list_bounding_box_Ref }
                             style={ {  maxHeight : 300, overflowY: "auto", overflowX: "hidden" } } // max-height updated after mount
                        >

                            <div >

                                <div  style={ { whiteSpace: "nowrap", marginBottom: 10, paddingLeft: ( ( subGroup_ItemOuterPartsWidths.borderWidth * 2 ) + subGroup_ItemOuterPartsWidths.paddingWidth ) } }>
                                    <div style={ { fontWeight: "bold", display: "inline-block", width : displayGroupName_ColumnHeaderWidth } }>
                                        Display Group Name
                                    </div>
                                    <div style={ { fontWeight: "bold", display: "inline-block" } }>
                                        Group Name
                                    </div>
                                </div>

                                <div >

                                    <DragDropContext onDragEnd={ this.onDragEnd_SubGroupItem_Callback_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                                        <Droppable droppableId="SubGroupsInSubGroupListMaint" type="SUB_GROUPS_IN_SEARCH">
                                            {(provided, snapshot) => (
                                                <div
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                    className="  sub-group-maint-default-border-style "
                                                    // sub-group-maint-default-border-style: border: solid and color site grey
                                                    // style={getListStyle(snapshot.isDraggingOver)}
                                                    style={ { width: subGroups_ContainerWidth, borderWidth: 2  } }
                                                >
                                                    {
                                                        subGroup_Display_ElementList
                                                    }
                                                    {provided.placeholder}  {/* Added for use by <Droppable>  */}
                                                </div>
                                            )}
                                        </Droppable>
                                    </DragDropContext>
                                </div>
                            </div>
                        </div>

                        <div style={ { marginTop: 15 } }>
                            <input type="button" value="Update" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />

                            <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                        </div>
                    </div>
                </div>
            </ModalOverlay_Limelight_Component>
        );
    }
}
