/**
 * search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent.tsx
 *
 * Search Tags Manage Tags On Searches Overlay
 *
 *
 *
 * !!!  Replaced by search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Version_2_OverlayComponent.tsx   !!!!
 *
 */


//

// import React from 'react'
// import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
// import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
// import {
//     limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
//     Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
// } from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
// import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
// import {
//     retrieveSearchNamesFromServer,RetrieveSearchNamesFromServer_Result_SingleSearch
// } from "page_js/data_pages/data_pages_common/searchNameRetrieval";
// import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
// import {SearchTag_Max_FieldLengths_Constants} from "page_js/constants_across_webapp/search_tag_constants/SearchTag_Max_FieldLengths_Constants";
// import {SearchTag_ColorOptions_Constants} from "page_js/constants_across_webapp/search_tag_constants/SearchTag_ColorOptions_Constants";
// import {
//     Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result,
//     Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId,
//     searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId
// } from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId";
//
// /////
//
// const _Overlay_Title_Start = "Select/Add Tags to Search"
//
//
// const _Overlay_Width_Min = 450;
// const _Overlay_Width_Max = 700;
// const _Overlay_Height_Min = 300;
// const _Overlay_Height_Max = 800;
//
//
//
// //////
//
//
// export class Search_Tags_Manage_TagsForSearch_OverallTags_MainParams {
//
//     searches: Array<Search_Tags_Manage_TagsForSearch_OverallTags_Params_SingleSearch>
// }
//
// export class Search_Tags_Manage_TagsForSearch_OverallTags_Params_SingleSearch {
//
//     projectSearchId: number
//
//     //  Remove since do NOT have this data in the calling code
//
//     // searchId: number
//     // searchName: string
// }
//
// /**
//  *
//  */
// export const open_Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Overlay = function(
//     {
//         mainParams
//     } : {
//         mainParams: Search_Tags_Manage_TagsForSearch_OverallTags_MainParams
//     }) : void {
//
//     let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;
//
//     const callbackOn_Cancel_Close_Clicked = () : void => {
//
//         limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
//     }
//
//     const callback_TagsUpdated_Local = () : void => {
//
//         limelight__ReloadPage_Function()
//     }
//
//     const overlayComponent = get_Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Overlay_Layout({
//         mainParams,
//         callbackOn_Cancel_Close_Clicked,
//         callback_TagsUpdated: callback_TagsUpdated_Local
//     })
//
//     limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
// }
//
//
// /**
//  *
//  */
// const get_Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Overlay_Layout = function(
//     {
//         mainParams,
//         callback_TagsUpdated,
//         callbackOn_Cancel_Close_Clicked
//     } : {
//         mainParams: Search_Tags_Manage_TagsForSearch_OverallTags_MainParams
//         callback_TagsUpdated : () => void;
//         callbackOn_Cancel_Close_Clicked : () => void;
//
//     }) : JSX.Element {
//
//     return (
//         <Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent
//             mainParams={ mainParams }
//             callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
//         />
//     )
// }
//
//
// ////  React Components
//
// class Internal_SelectTagColor_OverlayComponent_Color_Entry {
//     fontColor: string
//     backgroundColor: string
// }
//
// /**
//  *
//  */
// interface Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Props {
//     mainParams: Search_Tags_Manage_TagsForSearch_OverallTags_MainParams
//     callbackOn_Cancel_Close_Clicked : () => void;
// }
//
// /**
//  *
//  */
// interface Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_State {
//
//     showLoadingMessage?: boolean
//     force_Rerender?: object
// }
//
// /**
//  *
//  */
// class Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent extends React.Component< Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Props, Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_State > {
//
//     private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
//
//     private _inputField_NewTagString_Ref: React.RefObject<HTMLInputElement>
//
//
//     private _overlay_Title;
//
//
//     private _searchTags_For__SingleProjectSearchId_List?: Array<Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId>
//     private _searchTags_DistinctInProject_AndAddedTags?: Array<Internal_SearchTagEntry>
//
//     private _searchList?: Array<RetrieveSearchNamesFromServer_Result_SingleSearch>
//
//     private _display_tag_colorPicker_Overlay = false;
//
//     private _newTag_Color: Internal_SelectTagColor_OverlayComponent_Color_Entry = SearchTag_ColorOptions_Constants._SEARCH_TAG__COLOR__DEFAULT
//     private _tagId__LastAddedTag = 0;  // Negative for Added Tags
//
//
//     private _newTagString_Required_ErrorMessage = false;
//     private _newTagString_Duplicate_ErrorMessage = false;
//
//     private _unmountCalled = false;
//
//     /**
//      *
//      */
//     constructor(props: Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Props) {
//         super(props);
//
//         this._inputField_NewTagString_Ref = React.createRef<HTMLInputElement>();
//
//         if ( this.props.mainParams.searches.length === 0 ) {
//             const msg = "( this.props.mainParams.searches.length === 0 )"
//             console.warn(msg)
//             throw Error(msg)
//         }
//
//         this._overlay_Title = _Overlay_Title_Start;
//
//         if ( this.props.mainParams.searches.length > 1 ) {
//             this._overlay_Title += "es"
//         }
//
//         this.state = {
//             showLoadingMessage: true,
//             force_Rerender: {}
//         };
//     }
//
//     /**
//      *
//      */
//     componentDidMount() {
//
//         //  Load Search Tags for searches
//
//         const projectSearchIds: Array<number> = []
//
//         for ( const searchData of this.props.mainParams.searches ) {
//             projectSearchIds.push( searchData.projectSearchId );
//         }
//
//         let searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result: Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result
//         let searchList: Array<RetrieveSearchNamesFromServer_Result_SingleSearch>
//
//         const promises: Array<Promise<void>> = []
//
//         {
//             const promise = new Promise<void>((resolve, reject) => { try {
//
//                 const promise_getSearchTagList = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId({ projectSearchIds });
//
//                 promise_getSearchTagList.catch(reason => { reject(reason) })
//
//                 promise_getSearchTagList.then( ( searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result__PromiseResolve ) => { try {
//
//                     if ( this._unmountCalled ) {
//                         // unmounted so exit
//                         return; // EARLY RETURN
//                     }
//
//                     searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result__PromiseResolve;
//
//                     resolve()
//
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//             } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//
//             promises.push( promise );
//         }
//         {
//             const promise = new Promise<void>((resolve, reject) => { try {
//
//                 const promise_retrieveSearchNamesFromServer = retrieveSearchNamesFromServer({ projectSearchIds })
//
//                 promise_retrieveSearchNamesFromServer.catch(reason => { reject(reason)})
//
//                 promise_retrieveSearchNamesFromServer.then(retrieveSearchNamesFromServer_Result => { try {
//
//                     if ( this._unmountCalled ) {
//                         // unmounted so exit
//                         return; // EARLY RETURN
//                     }
//
//                     searchList = Array.from( retrieveSearchNamesFromServer_Result.searchList );
//
//                     searchList.sort( (a, b) => {
//                         return a.searchId - b.searchId
//                     })
//
//                     resolve()
//
//                 } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//             } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//
//             promises.push( promise );
//         }
//
//         const promisesAll = Promise.all( promises );
//
//         promisesAll.catch((reason => {}))
//
//         promisesAll.then( () => { try {
//
//             if ( this._unmountCalled ) {
//                 // unmounted so exit
//
//                 return; // EARLY RETURN
//             }
//
//
//             const searchTags_DistinctInProject_AndAddedTags: Array<Internal_SearchTagEntry> = []
//
//             for ( const tagEntry_DistinctInProject of searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.tags_DistinctInProject ) {
//
//                 let foundTagInAll = true;
//                 let foundTagInAny = false;
//
//                 for ( const search of this.props.mainParams.searches ) {
//
//                     let searchTagsItem_ForSingleSearch: Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_ResultItem_SingleProjectSearchId
//                     for ( const searchTagsItem_ForSingleSearch_InArray of searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.entriesPerSingleProjectSearchId ) {
//                         if ( searchTagsItem_ForSingleSearch_InArray.projectSearchId === search.projectSearchId ) {
//                             searchTagsItem_ForSingleSearch = searchTagsItem_ForSingleSearch_InArray;
//                             break;
//                         }
//                     }
//
//                     if ( ! searchTagsItem_ForSingleSearch ) {
//                         //  No entry in searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.entriesPerSingleProjectSearchId for search.projectSearchId
//
//                         foundTagInAll = false;
//
//                         continue; // EARLY CONTINUE
//                     }
//
//                     let foundTag_In_SingleSearch = false;
//
//                     for ( const tagEntry of searchTagsItem_ForSingleSearch.entriesPerTag ) {
//                         if ( tagEntry.tag_id === tagEntry_DistinctInProject.tag_id ) {
//                             foundTag_In_SingleSearch = true;
//                             break;
//                         }
//                     }
//
//                     if ( foundTag_In_SingleSearch ) {
//                         foundTagInAny = true;
//                     } else {
//                         foundTagInAll = false;
//                     }
//                 }
//
//                 let tag_Selected = Internal__TagSelected.SELECTED__SOME_SEARCHES;
//
//                 if ( ! foundTagInAny ) {
//                     tag_Selected = Internal__TagSelected.NO_SELECTED__ALL_SEARCHES;
//                 }
//                 if ( foundTagInAll ) {
//                     tag_Selected = Internal__TagSelected.YES_SELECTED__ALL_SEARCHES;
//                 }
//
//                 const tag_InProgress: Internal_SearchTagEntry = {
//
//                     tagId: tagEntry_DistinctInProject.tag_id,
//                     tagString: tagEntry_DistinctInProject.tag_string,
//                     tag_Color_Font: tagEntry_DistinctInProject.tag_Color_Font,
//                     tag_Color_Background: tagEntry_DistinctInProject.tag_Color_Background,
//                     tag_Color_Border: tagEntry_DistinctInProject.tag_Color_Border,
//                     tag_Selected,
//                     tag_Added: false
//                 }
//
//                 searchTags_DistinctInProject_AndAddedTags.push( tag_InProgress );
//             }
//
//             this._searchTags_For__SingleProjectSearchId_List = searchTags__Get_For_ProjectSearchIds_AND_AllDistinct_For_Assoc_ProjectId_Result.entriesPerSingleProjectSearchId;
//             this._searchTags_DistinctInProject_AndAddedTags = searchTags_DistinctInProject_AndAddedTags;
//             this._searchList = searchList;
//
//             this.setState({
//                 showLoadingMessage: false,
//                 force_Rerender: {}
//             })
//
//         } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
//
//     }
//
//     /**
//      *
//      */
//     private _sort__searchTags_DistinctInProject_AndAddedTags() {
//
//         this._searchTags_DistinctInProject_AndAddedTags.sort( (a,b) => {
//             return a.tagString.localeCompare( b.tagString, undefined, { sensitivity: "base" })
//         })
//
//     }
//
//     /**
//      *
//      */
//     componentWillUnmount() {
//
//         this._unmountCalled = true;
//     }
//
//     /**
//      *
//      */
//     private _updateButtonClicked(  ) {
//
//         const projectSearchIds: Array<number> = [];
//         for ( const search of this.props.mainParams.searches ) {
//             projectSearchIds.push(search.projectSearchId)
//         }
//
//         const promise = _searchTags__Update_For_ProjectSearchIds({
//             projectSearchIds, searchTags_DistinctInProject_AndAddedTags: this._searchTags_DistinctInProject_AndAddedTags
//         })
//
//         promise.catch( reason => { })
//         promise.then(value => { try {
//
//             limelight__ReloadPage_Function()
//
//         } catch (e) {
//             reportWebErrorToServer.reportErrorObjectToServer({
//                 errorException: e
//             });
//             throw e;
//         }
//         })
//     }
//
//     /**
//      *
//      */
//     private _change_NewTag_Color(params: Internal_SelectTagColor_OverlayComponent_Color_Entry) : void {
//
//         this._newTag_Color = params
//
//         this.setState({ force_Rerender: {} })
//     }
//
//     /**
//      *
//      */
//     private _tagClicked( tagId : number ): void {
//         try {
//             for ( const tag of this._searchTags_DistinctInProject_AndAddedTags ) {
//                 if ( tag.tagId === tagId ) {
//                     if ( tag.tag_Selected === Internal__TagSelected.SELECTED__SOME_SEARCHES ) {
//                         tag.tag_Selected = Internal__TagSelected.YES_SELECTED__ALL_SEARCHES
//                     } else if ( tag.tag_Selected === Internal__TagSelected.NO_SELECTED__ALL_SEARCHES ) {
//                         tag.tag_Selected = Internal__TagSelected.YES_SELECTED__ALL_SEARCHES
//                     } else {
//                         tag.tag_Selected = Internal__TagSelected.NO_SELECTED__ALL_SEARCHES
//                     }
//                 }
//             }
//
//             this.setState({ force_Rerender : {} })
//
//         } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
//     }
//
//     /**
//      *
//      */
//     private _addTag(): void {
//         try {
//             if ( ! this._inputField_NewTagString_Ref.current ) {
//                 return; // EARLY RETURN
//             }
//
//             const tagString : string = this._inputField_NewTagString_Ref.current.value.substring(0, SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_MAX_LENGTH__TAG_STRING )
//
//             if ( tagString === "" ) {
//                 this._newTagString_Required_ErrorMessage = true;
//                 this.setState({ force_Rerender: {} })
//
//                 return; // EARLY RETURN
//             }
//
//             // validate not already in list
//             let tagString_AlreadyIn_Tags = false;
//             for ( const searchTag of this._searchTags_DistinctInProject_AndAddedTags ) {
//                 if ( searchTag.tagString === tagString ) {
//                     tagString_AlreadyIn_Tags = true
//                 }
//             }
//
//             if ( tagString_AlreadyIn_Tags ) {
//                 this._newTagString_Duplicate_ErrorMessage = true;
//                 this.setState({ force_Rerender: {} })
//
//                 return; // EARLY RETURN
//             }
//
//             //  Add
//             this._searchTags_DistinctInProject_AndAddedTags.push({
//                 tagId: --this._tagId__LastAddedTag,
//                 tagString: tagString,
//                 tag_Color_Font: this._newTag_Color.fontColor,
//                 tag_Color_Background: this._newTag_Color.backgroundColor,
//                 tag_Color_Border: null,
//                 tag_Selected: Internal__TagSelected.YES_SELECTED__ALL_SEARCHES,
//                 tag_Added: true
//             })
//
//             //  Sort
//             this._sort__searchTags_DistinctInProject_AndAddedTags()
//
//             this._inputField_NewTagString_Ref.current.value = ""
//
//             this.setState({ force_Rerender: {} })
//
//         } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
//     }
//
//     /**
//      *
//      */
//     render(): React.ReactNode {
//
//         return (
//             <ModalOverlay_Limelight_Component_v001_B_FlexBox
//                 widthMinimum={ _Overlay_Width_Min }
//                 widthMaximum={ _Overlay_Width_Max }
//                 heightMinimum={ _Overlay_Height_Min }
//                 heightMaximum={ _Overlay_Height_Max }
//                 title={ this._overlay_Title }
//                 callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
//                 close_OnBackgroundClick={ false }>
//
//
//                 <div className=" search-tag-manage-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
//                      style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
//                     // style={ { padding : 6 } }
//                      onMouseEnter={ event => {
//                          if ( this._display_tag_colorPicker_Overlay ) {
//                              this._display_tag_colorPicker_Overlay = false;
//                              this.setState({force_Rerender: {}})
//                          }
//                      }}
//                      onClick={ event => {
//                          if ( this._display_tag_colorPicker_Overlay ) {
//                              this._display_tag_colorPicker_Overlay = false;
//                              this.setState({force_Rerender: {}})
//                          }
//                      }}
//                 >
//
//                     { ( this.state.showLoadingMessage ) ? (
//                         <div>
//                             <div style={ { marginTop: 20, textAlign: "center" }}>
//                                 LOADING DATA
//                             </div>
//                             <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
//                                 <Spinner_Limelight_Component/>
//                             </div>
//                         </div>
//                     ) : (
//                         <div
//                             // style={ { padding : 6 } }
//                         >
//                             {/*     */}
//                             <div style={ { display: "grid", gridTemplateColumns: "min-content auto" } }>
//                                 <div
//                                     style={ { marginRight: 10, whiteSpace: "nowrap", fontWeight: "bold" } }
//                                 >
//                                     <span>Selected Search</span>
//                                     { this.props.mainParams.searches.length > 1 ? (
//                                         <span>es</span>
//                                     ) : null}
//                                     <span>:</span>
//                                 </div>
//                                 <div>
//                                     { this._searchList.map((searchItem, index) => {
//                                         return (
//                                             <React.Fragment
//                                                 key={ searchItem.projectSearchId }
//                                             >
//                                                 <span
//                                                     style={ { whiteSpace: "nowrap" } }
//                                                 >
//                                                    <span title={ searchItem.name }>
//                                                        { searchItem.searchId }
//                                                     </span>
//                                                     { index !== ( this._searchList.length - 1 ) ? (
//                                                         <span>, </span>
//                                                     ) : null }
//                                                 </span>
//                                                 <span> </span>
//                                             </React.Fragment>
//                                         )
//                                     }) }
//                                 </div>
//                             </div>
//
//                             <div> &nbsp;</div>
//
//                             <div style={ { marginBottom: 5, fontWeight: "bold" } }>
//                                 <span>Assign tags to search</span>
//                                 { this.props.mainParams.searches.length > 1 ? (
//                                     <span>es</span>
//                                 ) : null}
//
//                                         <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
//                                             title={
//                                                 <span>
//                                                         <span>Click on a tag to assign or unassign the tag to the select search</span>
//                                                 { this.props.mainParams.searches.length > 1 ? (
//                                                     <span>es</span>
//                                                 ) : null}
//                                                 <span>.</span>
//                                                 <br/>
//
//                                                 <span>Assigned tags have a solid border.</span>
//                                                 <br/>
//
//                                                 { this.props.mainParams.searches.length > 1 ? (
//                                                     <span>
//                                                         A dashed border indicates a tag is assigned to only some of the searches.<br/>
//                                                         Clicking it will assign it to all selected searches.
//                                                         Clicking again will unassign it from all selected searches.
//                                                     </span>
//                                                 ) : null}
//                                                 </span>
//                                             }
//                                         />
//
//
//                                 </div>
//                             </div>
//                             { this._searchTags_DistinctInProject_AndAddedTags.map((value, index) => {
//
//                                 const divStyle: React.CSSProperties = {
//                                     display: "inline-block",
//                                     marginBottom: 3,
//                                     marginRight: 10,
//                                     backgroundColor: value.tag_Color_Background,
//                                     color: value.tag_Color_Font
//                                 }
//
//                                 const borderColor = "black"
//                                 const borderWidth = 6
//
//                                 let div_title
//
//                                 if ( value.tag_Selected === Internal__TagSelected.YES_SELECTED__ALL_SEARCHES ) {
//
//                                     divStyle.borderStyle = "solid"
//                                     divStyle.borderColor = borderColor
//                                     divStyle.borderWidth = borderWidth
//
//                                     if ( this.props.mainParams.searches.length > 1 ) {
//                                         div_title = "tag selected for all searches\n\nclick to not select for any searches";
//                                     } else {
//                                         div_title = "tag selected\n\nclick to not select";
//                                     }
//
//                                 } else if ( value.tag_Selected === Internal__TagSelected.NO_SELECTED__ALL_SEARCHES ) {
//
//                                     if ( this.props.mainParams.searches.length > 1 ) {
//                                         div_title = "tag not selected for any searches\n\nclick to select for all searches";
//                                     } else {
//                                         div_title = "tag not selected\n\nclick to select";
//                                     }
//
//                                 } else if ( value.tag_Selected === Internal__TagSelected.SELECTED__SOME_SEARCHES ) {
//
//                                     divStyle.borderStyle = "dashed"
//                                     divStyle.borderColor = borderColor
//                                     divStyle.borderWidth = borderWidth
//
//                                     div_title = "tag selected for some searches\n\nclick to select for all searches";
//
//                                 } else {
//                                     throw Error("Unknown value for value.tag_Selected: " + value.tag_Selected )
//                                 }
//
//                                 return (
//                                     <div
//                                         key={ value.tagId }
//                                         style={ divStyle }
//                                         className=" clickable search-tag-display-everywhere "
//                                         title={ div_title }
//                                         onClick={ event => {
//                                             event.stopPropagation()
//                                             this._tagClicked( value.tagId )
//                                         }}
//                                     >
//                                         { value.tagString }
//                                     </div>
//                                 )
//                             }) }
//
//                             <div style={ { marginTop: 16, marginBottom: 5, fontWeight: "bold" } }>
//                                 Add new tag

//                                  <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
//                                         title={
//                                             <span>
//                                                     <span>Use the form below to add new tags by entering a name and choosing a color.</span>
//                                                 <span>The tag will be assigned to the selected search</span>
//                                                 { this.props.mainParams.searches.length > 1 ? (
//                                                     <span>es</span>
//                                                 ) : null}.
//                                             </span>
//                                         }
//                                     />
//                             </div>
//
//                             <div style={ { position: "relative" } }>
//                                 <div>
//                                     <form
//                                         onSubmit={ event => {
//                                             event.preventDefault()
//                                             event.stopPropagation()
//                                             this._addTag()
//                                         }}
//                                     >
//                                         <input
//                                             ref={ this._inputField_NewTagString_Ref }
//                                             maxLength={ SearchTag_Max_FieldLengths_Constants.SEARCH_TAG_MAX_LENGTH__TAG_STRING }
//                                             placeholder="New Tag String"
//                                             style={ { width: 200 } }
//                                             onChange={ event => {
//                                                 //  Clear error message if set
//                                                 if ( this._newTagString_Required_ErrorMessage ) {
//                                                     this._newTagString_Required_ErrorMessage = false;
//                                                     this.setState({ force_Rerender: {} })
//                                                 }
//                                                 if ( this._newTagString_Duplicate_ErrorMessage ) {
//                                                     this._newTagString_Duplicate_ErrorMessage = false
//                                                     this.setState({ force_Rerender: {} })
//                                                 }
//                                             }}
//                                         />
//                                         <span> </span>
//
//                                         <div
//                                             style={ { display: "inline-block", marginLeft: 3, marginRight: 3 } }
//                                         >
//                                             <div
//                                                 style={ { display: "inline-block" } }
//                                             >
//                                                 <div
//                                                     className=" clickable search-tag-display-everywhere "
//                                                     style={ {
//                                                         display: "inline-block", marginRight: 0,
//                                                         backgroundColor: this._newTag_Color.backgroundColor, color: this._newTag_Color.fontColor
//                                                     } }
//                                                     title="Click to change the color for this tag"
//                                                     onClick={ event => {
//                                                         event.stopPropagation()
//                                                         this._display_tag_colorPicker_Overlay = true;
//                                                         this.setState({ force_Rerender: {} })
//                                                     }}
//                                                 >
//                                                     Choose Color
//                                                 </div>
//                                             </div>
//                                         </div>
//
//                                         <span> </span>
//                                         <input
//                                             type="submit"
//                                             value="Add Tag"
//                                         />
//                                     </form>
//                                 </div>
//
//                                 { this._newTagString_Required_ErrorMessage ? (
//                                     <div className=" error-text " >
//                                         Tag String Required
//                                     </div>
//                                 ) : null }
//                                 { this._newTagString_Duplicate_ErrorMessage ? (
//                                     <div className=" error-text " >
//                                         Tag String already Exists
//                                     </div>
//                                 ) : null }
//
//                                 {/*  Overlay Tag Color Picker  */}
//
//                                 <div
//                                     className=" select-color-display-div "
//                                     style={ {
//                                         display: this._display_tag_colorPicker_Overlay ? null : "none",
//                                         position: "absolute",
//                                         padding: 4,
//                                         top: 0,
//                                         left: 0,
//                                         minWidth: 310
//                                     } }
//                                     onMouseLeave={ event => {
//                                         this._display_tag_colorPicker_Overlay = false;
//                                         this.setState({ force_Rerender: {} })
//                                     }}
//                                 >
//                                     <div
//                                         className=" "
//                                         style={ { display: "inline-block", marginBottom: 10 } }
//                                     >
//                                         Click one of the sample tags to choose that color
//                                     </div>
//
//                                     <div style={ { color: "black" } }>
//                                         {
//                                             SearchTag_ColorOptions_Constants._SEARCH_TAG__COLOR_SELECTIONS.map((value, index) => {
//                                                 return (
//                                                     <div
//                                                         key={ index }
//                                                         className=" clickable search-tag-display-everywhere "
//                                                         style={ { display: "inline-block", marginBottom: 10,  backgroundColor: value.backgroundColor, color: value.fontColor } }
//                                                         onClick={ event => {
//                                                             event.stopPropagation();
//                                                             this._change_NewTag_Color(value)
//                                                             this._display_tag_colorPicker_Overlay = false;
//                                                             this.setState({ force_Rerender: {} })
//                                                         }}
//                                                     >
//                                                         Sample Tag
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//
//                     ) }
//
//                 </div>
//                 <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
//                     // style={ { padding : 6 } }
//                 >
//                     <div style={ { marginTop: 15 } }>
//
//                         { ( ! this.state.showLoadingMessage ) ? (
//                             <input type="button" value="Save" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />
//                         ) : null }
//
//                         <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
//                     </div>
//                 </div>
//             </ModalOverlay_Limelight_Component_v001_B_FlexBox>
//         );
//     }
// }
//
//
// //  Private code
//
// class Internal_SearchTagEntry {
//
//     tagId: number  //  Negative for newly added tags
//     tagString: string
//     tag_Color_Font: string
//     tag_Color_Background: string
//     tag_Color_Border: string
//     tag_Selected: Internal__TagSelected
//     tag_Added: boolean
// }
//
// enum Internal__TagSelected {
//     NO_SELECTED__ALL_SEARCHES = "NO_SELECTED__ALL_SEARCHES",
//     YES_SELECTED__ALL_SEARCHES = "YES_SELECTED__ALL_SEARCHES",
//     SELECTED__SOME_SEARCHES = "SELECTED__SOME_SEARCHES"  // Used when multiple searches
// }
//
//
// /**
//  *
//  */
// const _searchTags__Update_For_ProjectSearchIds = function(
//     {
//         projectSearchIds, searchTags_DistinctInProject_AndAddedTags
//     } : {
//         projectSearchIds: Array<number>
//         searchTags_DistinctInProject_AndAddedTags: Array<Internal_SearchTagEntry>
//     }
// ) : Promise<void> {
//
//     return new Promise<void> ( ( resolve, reject ) => {
//         try {
//             const searchTags_UpdateData: Array<{
//                 tagId: number
//                 tagString: string;
//                 tag_Color_Font: string
//                 tag_Color_Background: string
//                 tag_Color_Border: string
//                 tag_Selected: boolean;
//                 tag_Added: boolean;
//             }> = []
//
//             for ( const searchTag_Entry of searchTags_DistinctInProject_AndAddedTags ) {
//                 if ( searchTag_Entry.tag_Selected === Internal__TagSelected.SELECTED__SOME_SEARCHES ) {
//                     //  Not changed and mixed so do NOT send
//                     continue; // EARLY CONTINUE
//                 }
//
//                 searchTags_UpdateData.push({
//                     tagId: searchTag_Entry.tagId,
//                     tagString: searchTag_Entry.tagString,
//                     tag_Color_Font: searchTag_Entry.tag_Color_Font,
//                     tag_Color_Background: searchTag_Entry.tag_Color_Background,
//                     tag_Color_Border: searchTag_Entry.tag_Color_Border,
//                     tag_Selected: searchTag_Entry.tag_Selected === Internal__TagSelected.YES_SELECTED__ALL_SEARCHES,
//                     tag_Added: searchTag_Entry.tag_Added
//                 })
//             }
//
//             let requestObj = {
//                 projectSearchIds, tagEntries: searchTags_UpdateData
//             };
//
//             const url = "d/rws/for-page/search-tags-update-for-project-search-id-list";
//
//             const webserviceCallStandardPostResponse = webserviceCallStandardPost({dataToSend: requestObj, url});
//
//             const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;
//
//             promise_webserviceCallStandardPost.catch((reason : any) => {
//                 reject(reason);
//             });
//
//             promise_webserviceCallStandardPost.then(({responseData} : {responseData : any}) => {
//                 try {
//                     resolve();
//
//                 } catch (e) {
//                     reportWebErrorToServer.reportErrorObjectToServer({
//                         errorException: e
//                     });
//                     throw e;
//                 }
//             });
//         } catch (e) {
//             reportWebErrorToServer.reportErrorObjectToServer({
//                 errorException: e
//             });
//             throw e;
//         }
//     });
// }
