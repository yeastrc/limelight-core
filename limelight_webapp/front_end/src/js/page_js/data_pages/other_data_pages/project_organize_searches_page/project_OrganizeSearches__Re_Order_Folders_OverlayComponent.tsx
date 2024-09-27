/**
 * project_OrganizeFolders__Re_Order_Folders_OverlayComponent.tsx
 *
 * Re-Order Folders  Overlay - For changing the order of the folders to display
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
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";

/////

// const _Overlay_Title = "Change the display order of the folders"
//
// const _Overlay_Width_Min = 500;
// const _Overlay_Width_Max = 1200;
// const _Overlay_Height_Min = 300;
// const _Overlay_Height_Max = 1000;
//
// //////
//
// /**
//  *
//  */
// export class Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders_Params {
//     updated_folders_Order_List : Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data>
// }
//
// export type Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders =
//     (params: Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders_Params ) => void
//
// /**
//  *
//  */
// export const open_Project_OrganizeFolders_Re_Order_Folders_Overlay = function(
//     params : {
//         searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
//         callbackOn_Cancel_Close_Clicked : () => void;
//         callback_update_OrderOf_Folders : ( params : Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders_Params ) => void
//
//     }) : void {
//
//
//     let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;
//
//     const change_Callback_Local = ( params_Callback : Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders_Params ) => {
//
//         addedOverlay.removeContents_AndContainer_FromDOM();
//
//         params.callback_update_OrderOf_Folders(params_Callback);
//     }
//
//     const cancel_Callback_Local = () => {
//
//         addedOverlay.removeContents_AndContainer_FromDOM();
//
//         params.callbackOn_Cancel_Close_Clicked()
//     }
//
//
//     const overlayComponent = (
//         <Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component
//             searchesSearchTagsFolders_Result_Root={ params.searchesSearchTagsFolders_Result_Root }
//             callbackOn_Cancel_Close_Clicked={ cancel_Callback_Local }
//             callback_update_OrderOf_Folders={ change_Callback_Local }
//         />
//     )
//
//     addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
// }
//
// /////
//
// ////  React Components
//
// /**
//  *
//  */
// interface Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component_Props {
//     searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
//     callbackOn_Cancel_Close_Clicked : () => void;
//     callback_update_OrderOf_Folders : ( params : Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders_Params ) => void
// }
//
// /**
//  *
//  */
// interface Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component_State {
//
//     force_Rerender?: object
// }
//
// /**
//  *
//  */
// class Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component extends React.Component< Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component_Props, Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component_State > {
//
//     private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
//     private _onDragEnd_SearchItem_BindThis = this._onDragEnd_SearchItem.bind(this);
//
//     private _folders_In_Order_InProgress: Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data>
//
//     /**
//      *
//      */
//     constructor(props: Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component_Props) {
//         super(props);
//
//         this._folders_In_Order_InProgress = Array.from( this.props.searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() );
//
//         this.props.searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder()
//
//         this.state = { force_Rerender : {} };
//     }
//
//     /**
//      *
//      */
//     private _updateButtonClicked(  ) {
//
//         this.props.callback_update_OrderOf_Folders({ updated_folders_Order_List : this._folders_In_Order_InProgress })
//     }
//
//     /**
//      *
//      */
//     private _onDragEnd_SearchItem( result ) : void {
//         // dropped outside the list
//         if ( ! result.destination ) {
//             return; // EARLY RETURN
//         }
//
//         //  result.destination.index comes from drag and drop library and always starts at zero
//
//         //  For consistency, result.source.index will also always start at zero
//
//         //  add this.state.specialEntriesAtStart_Count to reflect index in the actual array
//
//         const sourceIndex : number = result.source.index;
//         const destinationIndex : number = result.destination.index;
//
//         if ( sourceIndex === destinationIndex ) {
//             console.warn( "if ( sourceIndex === destinationIndex ) {")
//             return; // EARLY RETURN
//         }
//
//         const searchList_InProgress = Array.from( this._folders_In_Order_InProgress );
//
//         if ( sourceIndex < destinationIndex ) {
//
//             //  Add first, then remove, so that destination Index does not move while removing at source Index
//
//             const itemToMove = searchList_InProgress[sourceIndex];
//
//             //  splice Updates the Array in place
//
//             const destinationIndex_WhenAddFirst = destinationIndex + 1;
//
//             const nothingRemoved_Adding  = searchList_InProgress.splice( destinationIndex_WhenAddFirst, 0, itemToMove )
//
//             const itemRemovedAtSourceIndex = searchList_InProgress.splice( sourceIndex, 1 )
//
//             if ( itemRemovedAtSourceIndex === undefined ) {
//                 const msg = "Nothing found at sourceIndex: " + sourceIndex;
//                 console.warn( msg )
//                 throw Error( msg );
//             }
//
//         } else {
//             // sourceIndex > destinationIndex
//             //  Remove first, then add, so that source Index does not move while adding at destination Index
//
//             const itemToMove = searchList_InProgress[sourceIndex];
//
//             //  splice Updates the Array in place
//
//             const itemRemovedAtSourceIndex = searchList_InProgress.splice( sourceIndex, 1 )
//
//             if ( itemRemovedAtSourceIndex === undefined ) {
//                 const msg = "Nothing found at sourceIndex: " + sourceIndex;
//                 console.warn( msg )
//                 throw Error( msg );
//             }
//
//             const nothingRemoved_Adding  = searchList_InProgress.splice( destinationIndex, 0, itemToMove )
//
//             var znothing = 0;
//         }
//
//         this._folders_In_Order_InProgress = searchList_InProgress;
//         this.setState({ force_Rerender: {} })
//     }
//
//     /**
//      *
//      */
//     render(): React.ReactNode {
//
//         const folderDisplayList : Array<JSX.Element> = [];
//
//         {
//             let index = 0
//
//             for (const folderEntry of this._folders_In_Order_InProgress) {
//
//                 const draggableId = folderEntry.folderId.toString();
//                 const entry = (
//                     <Draggable_FolderEntry
//                         key={folderEntry.folderId}
//                         draggableId={draggableId}
//                         index={index}
//                         folderEntry={folderEntry}
//                     />
//                 )
//                 folderDisplayList.push(entry);
//                 index++;
//             }
//         }
//
//         return (
//             <ModalOverlay_Limelight_Component_v001_B_FlexBox
//                 set_CSS_Position_Fixed={ true }
//                 widthMinimum={ _Overlay_Width_Min }
//                 widthMaximum={ _Overlay_Width_Max }
//                 heightMinimum={ _Overlay_Height_Min }
//                 heightMaximum={ _Overlay_Height_Max }
//                 title={ _Overlay_Title }
//                 callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
//                 close_OnBackgroundClick={ false }>
//
//                 <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                      style={ { paddingBottom : 20 } }
//                 >
//                     <div>
//                         Drag the folders to the order to be displayed in.
//                     </div>
//                     <div>
//                         When Finished, click "Change" to save or click "Cancel" to close with no changes.
//                     </div>
//                 </div>
//
//                 <div className=" re-order-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
//                      style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
//                     // style={ { padding : 6 } }
//                 >
//
//                     <div
//                         // style={ { padding : 6 } }
//                     >
//
//                         <DragDropContext onDragEnd={ this._onDragEnd_SearchItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }
//
//                             <Droppable droppableId="FolderList_Reorder_Maint" type="FOLDER_RE_ORDER">
//                                 {(provided, snapshot) => (
//                                     <div
//                                         {...provided.droppableProps}
//                                         ref={provided.innerRef}
//                                         className=" searches-container " // 'searches-container' to re-use existing CSS for draggable
//                                     >
//                                         { folderDisplayList  /* Entries in the list */ }
//                                         {provided.placeholder}
//                                     </div>
//                                 )}
//                             </Droppable>
//                         </DragDropContext>
//                     </div>
//                 </div>
//                 <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                     // style={ { padding : 6 } }
//                 >
//
//                     <div style={ { marginTop: 15 } }>
//                         <input type="button" value="Change" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />
//
//                         <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
//                     </div>
//                 </div>
//             </ModalOverlay_Limelight_Component_v001_B_FlexBox>
//         );
//     }
// }
//
// /////
//
// //  Single Folder Entry
//
// /**
//  *
//  */
// interface FolderEntry_Props {
//     folderEntry: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data
//     draggableId;
//     index : number;
//
// }
//
// /**
//  *
//  */
// interface FolderEntry_State {
//     folderNameDisplay : string
// }
//
// /**
//  *
//  */
// class Draggable_FolderEntry extends React.Component< FolderEntry_Props, FolderEntry_State > {
//
//     private _onMouseEnter_folderNameText_Div_BindThis = this._onMouseEnter_folderNameText_Div.bind(this);
//     private _onMouseLeave_folderNameText_Div_BindThis = this._onMouseLeave_folderNameText_Div.bind(this);
//
//     private _folderNameText_Div_Ref :  React.RefObject<HTMLDivElement>;
//
//     private _tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip;
//
//     /**
//      *
//      */
//     constructor(props: FolderEntry_Props) {
//         super(props);
//
//         this._folderNameText_Div_Ref = React.createRef();
//
//         const folderNameDisplay = this._create_folderNameDisplay(props)
//
//         this.state = {
//             folderNameDisplay
//         }
//     }
//
//     private _create_folderNameDisplay(props: FolderEntry_Props) : string {
//
//         const folderNameDisplay = this.props.folderEntry.folderName;
//
//         return folderNameDisplay;
//     }
//
//     private _onMouseEnter_folderNameText_Div(  ) {
//
//         const tooltip_target_DOM_Element = this._folderNameText_Div_Ref.current;
//         const tooltipContents = (
//             <div >
//                 { this.state.folderNameDisplay }
//             </div>
//         );
//
//         if ( this._tooltip_Limelight_Created_Tooltip ) {
//             this._tooltip_Limelight_Created_Tooltip.removeTooltip();
//         }
//         this._tooltip_Limelight_Created_Tooltip =
//             tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element, tooltipContents });
//     }
//
//     private _onMouseLeave_folderNameText_Div(  ) {
//
//         if ( this._tooltip_Limelight_Created_Tooltip ) {
//             this._tooltip_Limelight_Created_Tooltip.removeTooltip();
//         }
//         this._tooltip_Limelight_Created_Tooltip = null;
//     }
//
//     /**
//      *
//      */
//     render(): React.ReactNode {
//
//         return (
//             <Draggable key={ this.props.folderEntry.folderId } draggableId={ this.props.draggableId } index={ this.props.index }>
//                 {(provided, snapshot) => (
//                     <div
//                         ref={provided.innerRef}
//                         {...provided.draggableProps}
//                         {...provided.dragHandleProps}
//                         // className=" experiment-maint-default-border-style "
//                         // style={ getConditionGroupListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
//                     >
//                         <div className={ "search-single-entry-container"} >
//                             <div style={ { display: "grid", gridTemplateColumns : "20px auto" } } >
//                                 <div style={ { marginLeft: 2, maxWidth: 20, overflowX : "hidden" } }>
//                                     <img  src="static/images/icon-draggable.png"
//                                           className=" icon-small "
//                                           title="Drag to change Search Order"/>
//                                 </div>
//                                 <div ref={ this._folderNameText_Div_Ref }
//                                     // onMouseEnter={ this._onMouseEnter_folderNameText_Div_BindThis }
//                                     // onMouseLeave={ this._onMouseLeave_folderNameText_Div_BindThis }
//                                     // title={ this.state.folderNameDisplay }
//                                      style={ { wordBreak: "break-word" } }
//                                 >
//
//                                     <span style={ { overflowWrap: "break-word" } }>
//                                         { this.state.folderNameDisplay }
//                                     </span>
//
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </Draggable>
//         );
//     }
// }
