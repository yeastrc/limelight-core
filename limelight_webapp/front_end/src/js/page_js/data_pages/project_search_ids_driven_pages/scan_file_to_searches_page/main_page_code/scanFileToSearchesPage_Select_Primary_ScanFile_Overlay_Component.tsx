/**
 * scanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component.tsx
 * 
 * scanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component.tsx
 *
 * Select Scan file from scan files on a single search for override
 */

// import React from "react";
//
// import { limelight__IsTextSelected } from "page_js/common_all_pages/limelight__IsTextSelected";
// import {
//     limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
//     Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
// } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
// import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
// import {
//     ModalOverlay_Limelight_Component_v001_B_FlexBox
// } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
// import {
//     CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
// } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_multiple_searches_sub_parts__returned_objects/commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId";
// import {
//     CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder
// } from "page_js/data_pages/common_data_loaded_from_server__per_search_plus_some_assoc_common_data__with_loading_code__except_mod_main_page/common_data_loaded_from_server_single_search_sub_parts__returned_objects/commonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch";
// import {
//     ProjectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject
// } from "page_js/data_pages/project_search_ids_driven_pages/scan_file_to_searches_page/main_page_code/projectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject";
//
//
// //////////////
//
// const _Overlay_Title = "Select a Scan File"
//
// const _Overlay_Width_Min = 600;
// const _Overlay_Width_Max = 800;
// const _Overlay_Height_Min = 600;
// const _Overlay_Height_Max = 1200;
//
//
//
// /**
//  *
//  */
// interface ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Params {
//
//     projectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject: ProjectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject
//
//     projectSearchIds: Array<number>
//
//     scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder_Map_Key_ProjectSearchId: Map<number, CommonData_LoadedFromServer_SingleSearch__ScanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder>
//     commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder: CommonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder
//
//     callback_Selected_ProjectScanFileId: ( callback_Params: {
//         projectScanFileId: number
//         searchScanFileId_Set: Set<number>
//         searches_NOT_ContainScanFile_ProjectSearchId_Set: Set<number>
//     } ) => void
// }
//
//
// /**
//  *
//  */
// export const open_ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component = function (
//     {
//         params
//     } : {
//         params: ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Params
//     }
// ) {
//     if ( limelight__IsTextSelected() ) {
//         return
//     }
//
//     let overlay_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
//
//     const callbackOn_Cancel_Close_Clicked = (): void => {
//         overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
//     }
//
//     const overlayComponent = (
//         <ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component
//             params={ params }
//             callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
//         />
//     )
//
//     overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody( { componentToAdd: overlayComponent } );
// }
//
//
// ////  React Components
//
// /**
//  *
//  */
// interface ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component_Props {
//
//     params: ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Params
//     callbackOn_Cancel_Close_Clicked: () => void
// }
//
// /**
//  *
//  */
// interface ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component_State {
//
//     objectForceRerender?: object
// }
//
// /**
//  *
//  */
// class ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component extends React.Component< ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component_Props, ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component_State > {
//
//     private _scanFileSections_Entries: Array<{
//         scanFilename_Set: Set<string>
//         projectScanFileId: number
//         searchScanFileId_Set: Set<number>
//         searches_YES_ContainScanFile_ProjectSearchId_Set: Set<number>
//         searches_NOT_ContainScanFile_ProjectSearchId_Set: Set<number>
//     }> = []
//
//
//     /**
//      *
//      */
//     constructor(props: ScanFileToSearchesPage_Select_Primary_ScanFile_Overlay_Component_Component_Props) {  try {
//         super( props );
//
//         this._createOnConstructor()
//
//         this.state = {
//             objectForceRerender: {}
//         };
//
//     } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
//     }
//
//     private _createOnConstructor() {
//
//
//
//
//         for ( const projectSearchId of this.props.params.projectSearchIds ) {
//
//             const scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder = this.props.params.scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder_Map_Key_ProjectSearchId.get( projectSearchId )
//             if ( ! scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder ) {
//                 continue // EARLY CONTINUE
//             }
//             const scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder = this.props.params.commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId( projectSearchId )
//             if ( ! scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder ) {
//                 continue // EARLY CONTINUE
//                 // throw new Error("No value from commonData_LoadedFromServer_MultipleSearches__ScanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_For_ProjectSearchId(projectSearchId) for projectSearchId: " + projectSearchId );
//             }
//             for ( const searchScanFileData of scanFile_SearchScanFileId_ScanFilename_ScanFileId_Holder.get_SearchScanFileData_IterableIterator() ) {
//                 const scanFile_ProjectScanFileId_SearchScanFileId = scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId( searchScanFileData.searchScanFileId )
//                 if ( ! scanFile_ProjectScanFileId_SearchScanFileId ) {
//                     throw new Error( "No value from scanFile_ProjectScanFileId_SearchScanFileId_All_ForSearch_Holder.get_For_SearchScanFileId(searchScanFileData.searchScanFileId) for searchScanFileData.searchScanFileId: " + searchScanFileData.searchScanFileId + ", projectSearchId: " + projectSearchId );
//                 }
//
//                 let found_projectScanFileId = false
//
//                 for ( const scanFileSections_Entry of this._scanFileSections_Entries ) {
//                     if ( scanFileSections_Entry.projectScanFileId && scanFileSections_Entry.projectScanFileId === scanFile_ProjectScanFileId_SearchScanFileId.projectScanFileId ) {
//                         found_projectScanFileId = true
//                         scanFileSections_Entry.scanFilename_Set.add( searchScanFileData.filename )
//                         scanFileSections_Entry.searchScanFileId_Set.add( searchScanFileData.searchScanFileId )
//                         scanFileSections_Entry.searches_YES_ContainScanFile_ProjectSearchId_Set.add( projectSearchId )
//                     }
//                 }
//
//                 if ( ! found_projectScanFileId ) {
//
//                     const scanFilename_Set: Set<string> = new Set()
//                     scanFilename_Set.add( searchScanFileData.filename )
//
//                     const searchScanFileId_Set: Set<number> = new Set()
//                     searchScanFileId_Set.add( searchScanFileData.searchScanFileId )
//
//                     const searches_YES_ContainScanFile_ProjectSearchId_Set: Set<number> = new Set()
//                     searches_YES_ContainScanFile_ProjectSearchId_Set.add( projectSearchId )
//
//                     this._scanFileSections_Entries.push( {
//                         scanFilename_Set,
//                         projectScanFileId: scanFile_ProjectScanFileId_SearchScanFileId.projectScanFileId,
//                         searchScanFileId_Set,
//                         searches_YES_ContainScanFile_ProjectSearchId_Set,
//                         searches_NOT_ContainScanFile_ProjectSearchId_Set: undefined
//                     } )
//                 }
//             }
//         }
//
//     }
//
//     render() {  try {
//
//
//         //  Set searches_NOT_ContainScanFile_ProjectSearchId_Set
//         for ( const scanFileSections_Entry of this._scanFileSections_Entries ) {
//
//             scanFileSections_Entry.searches_NOT_ContainScanFile_ProjectSearchId_Set = new Set()
//
//             for ( const projectSearchId of this.props.params.projectSearchIds ) {
//                 if ( ! scanFileSections_Entry.searches_YES_ContainScanFile_ProjectSearchId_Set.has( projectSearchId ) ) {
//                     scanFileSections_Entry.searches_NOT_ContainScanFile_ProjectSearchId_Set.add( projectSearchId )
//                 }
//             }
//         }
//
//
//
//         const scanFileSelectionElements: Array<React.JSX.Element> = []
//
//         let elementCounter = 0
//
//         for ( const scanFileSections_Entry of this._scanFileSections_Entries ) {
//
//             elementCounter++
//
//             const filenames_Array_Sorted = Array.from( scanFileSections_Entry.scanFilename_Set )
//             filenames_Array_Sorted.sort()
//             const filenames_CommaDelim = filenames_Array_Sorted.join(", ")
//
//             const element = (
//                 <div
//                     key={ elementCounter }
//                     style={ { marginBottom: 3 } }
//                 >
//                     <span
//                         className={ " fake-link " }
//                         onClick={ event => {
//                             try {
//                                 this.props.callbackOn_Cancel_Close_Clicked()
//
//                                 window.setTimeout( () => { try {
//
//                                     this.props.params.callback_Selected_ProjectScanFileId({
//                                         projectScanFileId: scanFileSections_Entry.projectScanFileId,
//                                         searchScanFileId_Set: scanFileSections_Entry.searchScanFileId_Set,
//                                         searches_NOT_ContainScanFile_ProjectSearchId_Set: scanFileSections_Entry.searches_NOT_ContainScanFile_ProjectSearchId_Set
//                                     })
//
//                                 } catch ( e ) {
//                                     reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//                                     throw e
//                                 }}, 10 )
//                             } catch( e ) {
//                                 console.warn("Exception caught onClick");
//                                 console.warn( e );
//                                 reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
//                                 throw e;
//                             }
//                         } }
//                     >
//                         { filenames_CommaDelim }
//                     </span>
//                     { this.props.params.projectScanFileId_ScanFileToSearchesPage_UserSelections_StateObject.get_projectScanFileIdSelection() === scanFileSections_Entry.projectScanFileId ? (
//                         <>
//                             <span> </span>
//                             <span>(current selection)</span>
//                         </>
//                     ) : null }
//                 </div>
//             )
//             scanFileSelectionElements.push( element )
//         }
//
//         const scanFileSelections_Element = (
//             <div style={ { marginLeft: 30, marginBottom: 20 } }>
//                 {/*<div style={ { marginBottom: 10, fontWeight: "bold" } }>*/}
//                 {/*    Select a scan file:*/}
//                 {/*</div>*/}
//                 { scanFileSelectionElements }
//             </div>
//         )
//
//         return (
//             <ModalOverlay_Limelight_Component_v001_B_FlexBox
//                 widthMinimum={ _Overlay_Width_Min }
//                 widthMaximum={ _Overlay_Width_Max }
//                 heightMinimum={ _Overlay_Height_Min }
//                 heightMaximum={ _Overlay_Height_Max }
//                 title={ _Overlay_Title }
//                 callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
//                 close_OnBackgroundClick={ false }>
//
//                 <React.Fragment>
//
//                     <div
//                         className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                         style={ { paddingBottom: 12 } }
//                         // style={ { padding : 6 } }
//                     >
//                         <div>
//                             <button
//                                 onClick={ event => { this.props.callbackOn_Cancel_Close_Clicked() }}
//                             >
//                                 Close
//                             </button>
//                         </div>
//                         <div style={ { marginTop: 10 } }>
//                             Select a scan file:
//                         </div>
//
//                     </div>
//                     <div
//                         className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
//                         style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
//                     >
//                         {/*  Main Body:  Scrollable Div  */ }
//
//                         { scanFileSelections_Element }
//
//                     </div>
//                 </React.Fragment>
//             </ModalOverlay_Limelight_Component_v001_B_FlexBox>
//         )
//
//     } catch ( e ) {
//         reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } );
//         throw e
//     }
//     }
// }
//
