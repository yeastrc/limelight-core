/**
 * project_OrganizeSearches_Main_Component.tsx
 *
 * Javascript React Components for project-organize-searches-view.jsp page
 *
 * Organize Searches Page
 *
 * Root Component
 *
 */

import React from "react";


import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data,
    getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {
    project_OrganizeSearches_Folder_AddRename_Component__openOverlay,
    Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback,
    Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches_Folder_AddRename_Component";
import {
    open_Project_OrganizeSearches_Re_Order_Searches_Overlay,
    Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches,
    Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches__Re_Order_Searches_OverlayComponent";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {
    open_Project_OrganizeSearches_Folder_Add_Change_SearchesInFolder_Overlay,
    Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent__Callback_update_SearchesInFolder
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches__Folder_Add_Change_SearchesInFolder_OverlayComponent";
import {
    open_Project_OrganizeFolders_Re_Order_Folders_Overlay,
    Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders,
    Project_OrganizeFolders_Re_Order_Folders_Overlay_OuterContainer_Component__Callback_update_OrderOf_Folders_Params
} from "page_js/data_pages/other_data_pages/project_organize_searches_page/project_OrganizeSearches__Re_Order_Folders_OverlayComponent";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";

/**
 *
 */
export interface Project_OrganizeSearches_Main_Component_Props_Prop {

    projectIdentifier: string
    controller_path_ThisPage: string
    controller_path_project_page: string
}

/**
 *
 */
export interface Project_OrganizeSearches_Main_Component_Props {

    propsValue : Project_OrganizeSearches_Main_Component_Props_Prop
}

/**
 *
 */
interface Project_OrganizeSearches_Main_Component_State {

    show_Overall_LoadingMessage?: boolean
    show_UpdatingMessage?: boolean
    force_Rerender?: object
}

/**
 *
 */
export class Project_OrganizeSearches_Main_Component extends React.Component< Project_OrganizeSearches_Main_Component_Props, Project_OrganizeSearches_Main_Component_State > {

    private _onDragEnd_SearchItem_BindThis = this._onDragEnd_SearchItem.bind(this);
    private _onDragEnd_FolderItem_BindThis = this._onDragEnd_FolderItem.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root

    private _searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress : Array<number>;

    private _folderList_InProgress : Array< CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data>

    /**
     *
     */
    constructor(props: Project_OrganizeSearches_Main_Component_Props) {
        super(props)

        this.state = {
            show_Overall_LoadingMessage: true, force_Rerender: {}
        }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._loadData_All()

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }
    }

    private _loadData_All() {

        const promise = getSearchesSearchTagsAndFolders_SingleProject_OrFrom_ProjectSearchIds({ projectIdentifier: this.props.propsValue.projectIdentifier })
        promise.catch(reason => {

        })
        promise.then(searchesSearchTagsFolders_Result_Root => { try {

            this._searchesSearchTagsFolders_Result_Root = searchesSearchTagsFolders_Result_Root;

            this._searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress =
                Array.from( this._searchesSearchTagsFolders_Result_Root.get_searches_ProjectSearchIds_NOT_IN_ANY_Folder_InDisplayOrder() );

            this._folderList_InProgress = Array.from( this._searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder() );

            this.setState({ show_Overall_LoadingMessage: false, show_UpdatingMessage: false })

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException: e
            });
            throw e;
        }})
    }

    /**
     *
     */
    private _onDragEnd_FolderItem( result ) : void {
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

        const folderList_InProgress_NEW = Array.from( this._folderList_InProgress );

        if ( sourceIndex < destinationIndex ) {

            //  Add first, then remove, so that destination Index does not move while removing at source Index

            const itemToMove = folderList_InProgress_NEW[sourceIndex];

            //  splice Updates the Array in place

            const destinationIndex_WhenAddFirst = destinationIndex + 1;

            const nothingRemoved_Adding  = folderList_InProgress_NEW.splice( destinationIndex_WhenAddFirst, 0, itemToMove )

            const itemRemovedAtSourceIndex = folderList_InProgress_NEW.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

        } else {
            // sourceIndex > destinationIndex
            //  Remove first, then add, so that source Index does not move while adding at destination Index

            const itemToMove = folderList_InProgress_NEW[sourceIndex];

            //  splice Updates the Array in place

            const itemRemovedAtSourceIndex = folderList_InProgress_NEW.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

            const nothingRemoved_Adding  = folderList_InProgress_NEW.splice( destinationIndex, 0, itemToMove )

            var znothing = 0;
        }

        this._folderList_InProgress = folderList_InProgress_NEW;

        // this.setState({ show_UpdatingMessage: true }) //  displays "LOADING DATA"

        const promise = _changeFolderOrderInDB({
            updated_folders_Order_List: this._folderList_InProgress
        })
        promise.catch(reason => { })
        promise.then(value => { try {

            // this._loadData_All() // reload all data

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *  DOES this need to be modified to Use and UPDATE the Project Search Ids for SearchesNotIn_AnyFolder ?
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

        const searchList_InProgress_NEW = Array.from( this._searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress );

        if ( sourceIndex < destinationIndex ) {

            //  Add first, then remove, so that destination Index does not move while removing at source Index

            const itemToMove = searchList_InProgress_NEW[sourceIndex];

            //  splice Updates the Array in place

            const destinationIndex_WhenAddFirst = destinationIndex + 1;

            const nothingRemoved_Adding  = searchList_InProgress_NEW.splice( destinationIndex_WhenAddFirst, 0, itemToMove )

            const itemRemovedAtSourceIndex = searchList_InProgress_NEW.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

        } else {
            // sourceIndex > destinationIndex
            //  Remove first, then add, so that source Index does not move while adding at destination Index

            const itemToMove = searchList_InProgress_NEW[sourceIndex];

            //  splice Updates the Array in place

            const itemRemovedAtSourceIndex = searchList_InProgress_NEW.splice( sourceIndex, 1 )

            if ( itemRemovedAtSourceIndex === undefined ) {
                const msg = "Nothing found at sourceIndex: " + sourceIndex;
                console.warn( msg )
                throw Error( msg );
            }

            const nothingRemoved_Adding  = searchList_InProgress_NEW.splice( destinationIndex, 0, itemToMove )

            var znothing = 0;
        }

        this._searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress = searchList_InProgress_NEW;

        const promise = _changeSearchesOrderInDB({ projectSearchesIdsInOrder: this._searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress })
        promise.catch(reason => { })
        promise.then(value => { try {
            this.setState({ force_Rerender: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    render() {
        return (
            <div>
                <div style={ { marginBottom: 10 } }>
                    Change search order and put searches in folders.
                </div>
                <div>
                    <button
                        onClick={ event => {
                            window.location.href = this.props.propsValue.controller_path_project_page + "/" + this.props.propsValue.projectIdentifier
                        }}
                    >
                        Return To Project
                    </button>

                    { this.state.show_Overall_LoadingMessage || this.state.show_UpdatingMessage ? (

                            null
                        ) : (
                            <>
                                <span> </span>

                                <button
                                    onClick={ event => { try {

                                        const callback_update_SearchesInFolder: () => void =
                                            () : void =>  {

                                                this._loadData_All();
                                            }

                                        open_Project_OrganizeSearches_Folder_Add_Change_SearchesInFolder_Overlay({
                                            projectIdentifier: this.props.propsValue.projectIdentifier,
                                            folderId: null,
                                            folderName_Added_Or_Existing: null,
                                            projectSearchIds_InFolder_Existing: new Set(),
                                            searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
                                            callbackOn_Cancel_Close_Clicked : () => { },
                                            callback_update_SearchesInFolder
                                        })
                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } }}
                                >
                                    Create Folder
                                </button>
                            </>
                    )

                    }
                </div>

                { this.state.show_Overall_LoadingMessage || this.state.show_UpdatingMessage ? (
                        <div>
                            <div style={ { marginTop: 20, textAlign: "center" }}>
                                LOADING DATA
                            </div>
                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>
                ) :
                    this._render_MainData()
                }
            </div>
        );
    }

    /**
     *
     */
    private _render_MainData() : JSX.Element {

        if ( this._searchesSearchTagsFolders_Result_Root.is_NO_Searches_In_Project() ) {
            //  NO Searches
            return this._render_NoSearchesNoFolders()  //  EARLY RETURN
        }

        return (
            <>
                { this._searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder().length === 0 ? (
                    //  NO Folders
                    //  Render 'All Searches' on the main page
                    this._render_AllSearches_MainPage()

                ) : (
                    this._render_Folders_MainPage()
                ) }
            </>
        )
    }

    /**
     *
     */
    private _render_Folders_MainPage() : JSX.Element {

        return (
            <>
                <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 10 } }>
                    Folders:
                </div>
                <div style={ { marginTop: 2, marginBottom: 2 } }>
                    Drag to change the order the folders are displayed.
                </div>
                <div
                    className="  re-order-searches-overlay-outer-block " //  re-order-searches-overlay-outer-block so formatting works
                    style={ { display: "inline-block" } }
                >

                    <DragDropContext onDragEnd={ this._onDragEnd_FolderItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                        <Droppable droppableId="FolderList_Reorder_Maint" type="FOLDER_RE_ORDER">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className=" searches-container " // 'searches-container' to re-use existing CSS for draggable
                                >
                                    { this._folderList_InProgress.map((folderEntry, index, array) => {

                                        //  WAS: this._searchesSearchTagsFolders_Result_Root.get_allFolders_Data_InDisplayOrder().map((folderEntry, index, array) => {

                                        const draggableId = folderEntry.folderId.toString();
                                        return (
                                            <Draggable
                                                key={ folderEntry.folderId }
                                                draggableId={ draggableId }
                                                index={ index }
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <div className={ "search-single-entry-container"} >
                                                            <div style={ { display: "grid", gridTemplateColumns : "20px auto" } } >
                                                                <div style={ { marginLeft: 2, marginTop: 5, maxWidth: 20, overflowX : "hidden" } }>
                                                                    <img  src="static/images/icon-draggable.png"
                                                                          className=" icon-small "
                                                                          title="Drag to change Search Order"/>
                                                                </div>
                                                                <div
                                                                    key={ folderEntry.folderId }
                                                                    style={ { marginTop: 1, marginBottom: 1, marginRight: 3 } }
                                                                >
                                                                    <span >
                                                                        { folderEntry.folderName }
                                                                    </span>

                                                                    <img
                                                                        className="icon-small clickable "
                                                                        style={ { marginLeft: 3 } }
                                                                        src="static/images/icon-edit.png"
                                                                        title="Edit name of folder"

                                                                        onClick={ event => { try {

                                                                            const buttonContainer = event.target as HTMLButtonElement

                                                                            const buttonContainer_BoundingRect = buttonContainer.getBoundingClientRect();

                                                                            let position_top =  buttonContainer_BoundingRect.top;
                                                                            let position_left =  buttonContainer_BoundingRect.left;

                                                                            const change_Callback: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback =
                                                                                (params: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params) : void =>  {

                                                                                    this._loadData_All();
                                                                                }

                                                                            project_OrganizeSearches_Folder_AddRename_Component__openOverlay({
                                                                                projectIdentifier: this.props.propsValue.projectIdentifier, // For Add
                                                                                folderId_Existing: folderEntry.folderId,
                                                                                folderName_Existing: folderEntry.folderName,
                                                                                position_top,
                                                                                position_left,
                                                                                change_Callback,
                                                                                cancel_Callback: () => {}
                                                                            })

                                                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } }}
                                                                    />

                                                                    <span> </span>

                                                                    <img
                                                                        src="static/images/icon-circle-delete.png"
                                                                        className=" clickable icon-small "
                                                                        title="Delete folder."

                                                                        onClick={ event => { try {

                                                                            if ( ! window.confirm( "Delete Folder?" ) ) {
                                                                                return; // EARLY RETURN
                                                                            }

                                                                            const promise = _deleteFolderInDB({ folderId: folderEntry.folderId })
                                                                            promise.catch(reason => { })
                                                                            promise.then(novalue => { try {

                                                                                this._loadData_All();

                                                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

                                                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } }}
                                                                    />

                                                                    <span> </span>

                                                                    <button
                                                                        onClick={ event => { try {
                                                                            const callback_update_SearchesInFolder: Project_OrganizeSearches_Folder_Change_SearchesInFolder_OverlayComponent__Callback_update_SearchesInFolder =
                                                                                () : void => {
                                                                                    try {

                                                                                        this._loadData_All() // reload all data

                                                                                    } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}

                                                                            let projectSearchIds_InFolder_Existing: Set<number>

                                                                            if ( folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder ) {
                                                                                projectSearchIds_InFolder_Existing = new Set( folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder )
                                                                            } else {
                                                                                projectSearchIds_InFolder_Existing = new Set()
                                                                            }

                                                                            open_Project_OrganizeSearches_Folder_Add_Change_SearchesInFolder_Overlay({
                                                                                projectIdentifier: this.props.propsValue.projectIdentifier,
                                                                                folderId: folderEntry.folderId,
                                                                                folderName_Added_Or_Existing: folderEntry.folderName,
                                                                                projectSearchIds_InFolder_Existing,
                                                                                searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
                                                                                callbackOn_Cancel_Close_Clicked : () => { },
                                                                                callback_update_SearchesInFolder
                                                                            })

                                                                        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                                                                    >
                                                                        Add or Change Searches in Folder
                                                                    </button>

                                                                    <span> </span>

                                                                    { folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder.length > 0 ? (
                                                                        //  BUTTON:  Change Search Order
                                                                        <>
                                                                            <button
                                                                                onClick={ event => { try {
                                                                                    const callback_update_OrderOf_Searches: Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches =
                                                                                        (params: Project_OrganizeSearches_Re_Order_Searches_Overlay_OuterContainer_Component__Callback_update_OrderOf_Searches_Params ) : void => {

                                                                                            this.setState({ show_UpdatingMessage: true })

                                                                                            const promise = _changeSearchesOrder_InFolder_InDB({
                                                                                                folderId: folderEntry.folderId,
                                                                                                projectSearchesIdsInOrder: params.updated_projectSearchId_Order_List
                                                                                            })
                                                                                            promise.catch(reason => { })
                                                                                            promise.then(value => { try {

                                                                                                this._loadData_All() // reload all data

                                                                                            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
                                                                                        }

                                                                                    open_Project_OrganizeSearches_Re_Order_Searches_Overlay({
                                                                                        projectSearchId_In_Order_Existing: folderEntry.searchesInFolder_ProjectSearchIds_InDisplayOrder,
                                                                                        searchesSearchTagsFolders_Result_Root: this._searchesSearchTagsFolders_Result_Root,
                                                                                        callbackOn_Cancel_Close_Clicked : () => { },
                                                                                        callback_update_OrderOf_Searches
                                                                                    })

                                                                                } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e } } }
                                                                            >
                                                                                Change Search Order
                                                                            </button>
                                                                        </>
                                                                    ) : (

                                                                        <div style={ { position: "relative", display: "inline-block" } }>
                                                                            <button
                                                                                disabled={ true }
                                                                            >
                                                                                Change Search Order
                                                                            </button>
                                                                            {/*  Overlay button so show tooltip  */}
                                                                            <div
                                                                                style={ { position: "absolute", top: 0, bottom: 0, left: 0, right: 0 } }
                                                                                title="Folder contains no searches"
                                                                            >
                                                                            </div>
                                                                        </div>
                                                                    ) }
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )}
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>

                <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 10 } }>
                    Searches not in any folders:
                </div>
                <div
                    style={ { marginTop: 2, marginBottom: 2 } }
                >
                    Drag to change the order the searches are displayed.  Newly imported searches will appear here at the top with the newest search first.
                </div>

                <div
                    className=" re-order-searches-overlay-outer-block "
                    style={ { display: "inline-block" } }
                >
                    <DragDropContext onDragEnd={ this._onDragEnd_SearchItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                        <Droppable droppableId="SearchList_Reorder_Maint" type="SEARCH_RE_ORDER">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className=" searches-container "
                                >
                                    { this._searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress.map( (projectSearchId, index, array) => {

                                        const searchData = this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

                                        if (!searchData) {
                                            const msg = "this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                                            console.warn(msg)
                                            throw Error(msg)
                                        }

                                        return (
                                            <Draggable key={projectSearchId} draggableId={projectSearchId.toString()}
                                                       index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        // className=" experiment-maint-default-border-style "
                                                        // style={ getConditionGroupListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                                                    >
                                                        <div
                                                            key={projectSearchId}
                                                            className=" search-single-entry-container "
                                                        >
                                                            <div
                                                                style={{display: "grid", gridTemplateColumns: "20px auto"}}
                                                            >
                                                                <div style={{marginLeft: 2, maxWidth: 20, overflowX: "hidden"}}>
                                                                    <img src="static/images/icon-draggable.png"
                                                                         className=" icon-small "
                                                                         title="Drag to change Search Order"/>
                                                                </div>
                                                                <div style={{wordBreak: "break-word"}}>
                                                                    {searchData.searchName + " (" + searchData.searchId + ")"}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })
                                    }
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </>
        )
    }

    /**
     *
     */
    private _render_AllSearches_MainPage() : JSX.Element {

        return (
            <>

                <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 10 } }>
                    Searches:
                </div>
                <div
                    style={ { marginTop: 2, marginBottom: 4 } }
                >
                    Drag to change the order the searches are displayed.  Newly imported searches will appear here at the top with the newest search first.
                </div>

                <div
                    className=" re-order-searches-overlay-outer-block "  //  're-order-searches-overlay-outer-block' to get sub class names to work
                >

                    <DragDropContext onDragEnd={ this._onDragEnd_SearchItem_BindThis }> { /* Having nested <DragDropContext />'s is not supported */ }

                        <Droppable droppableId="SearchList_Reorder_Maint" type="SEARCH_RE_ORDER">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className=" searches-container "
                                >
                                    { this._searchList_NotIn_ANY_Folders_ProjectSearchIds_InProgress.map((projectSearchId, index, array) => {
                                        const searchData = this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId)
                                        if ( ! searchData ) {
                                            throw Error(" this._searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId) returned NOTHING. projectSearchId: " + projectSearchId )
                                        }
                                        return (
                                            <Draggable key={ projectSearchId } draggableId={ projectSearchId.toString() } index={ index }>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        // className=" experiment-maint-default-border-style "
                                                        // style={ getConditionGroupListItemOuterStyle( snapshot.isDragging, provided.draggableProps.style ) }
                                                    >
                                                        <div
                                                            key={ projectSearchId }
                                                            className=" search-single-entry-container "
                                                        >
                                                            <div
                                                                style={ { display: "grid", gridTemplateColumns: "20px auto" } }
                                                            >
                                                                <div style={ { marginLeft: 2, maxWidth: 20, overflowX: "hidden" } }>
                                                                    <img src="static/images/icon-draggable.png"
                                                                         className=" icon-small "
                                                                         title="Drag to change Search Order" />
                                                                </div>
                                                                <div style={ { wordBreak: "break-word" } }>
                                                                    { searchData.searchName + " (" + searchData.searchId + ")" }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        )
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </>
        )
    }

    /**
     *
     */
    private _render_YES_Searches_NO_Folders() : JSX.Element {

        return (
            <div>
                <div>
                    QUESTION:  For when NO Folders and display ALL searches on main page, should we update the DB after each drag of search to change order or only after SAVE button clicked?
                </div>
                <div>
                    NOT currently saving changes to search order to server
                </div>
                <div>
                    Drag searches to change their order
                </div>

                <div>

                </div>

            </div>
        )

    }

    /**
     *
     */
    private _render_NoSearchesNoFolders() : JSX.Element {

        return (
            <div>
                No searches or folders in this project
            </div>
        )
    }
}



/**
 *
 */
const _changeSearchesOrderInDB = function(
    {
        projectSearchesIdsInOrder
    } : {
        projectSearchesIdsInOrder: Array<number>
    }
) : Promise<void> {
    try {
        let requestObj = {
            projectSearchesIdsInOrder
        };

        const url = "d/rws/for-page/project-organize-searches-set-searches-order";

        return new Promise<void>((resolve, reject) => { try {

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        limelight__ReloadPage_Function()
                        return;
                    }

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}


/**
 *
 */
const _changeSearchesOrder_InFolder_InDB = function(
    {
        folderId, projectSearchesIdsInOrder
    } : {
        folderId: number
        projectSearchesIdsInOrder: Array<number>
    }
) : Promise<void> {
    try {
        let requestObj = {
            folderId,
            projectSearchesIdsInOrder
        };

        const url = "d/rws/for-page/project-organize-searches-set-searches-order-in-folder";

        return new Promise<void>((resolve, reject) => { try {

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        limelight__ReloadPage_Function()
                        return;
                    }

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}



/**
 *
 */
const _changeFolderOrderInDB = function(
    {
        updated_folders_Order_List
    } : {
        updated_folders_Order_List : Array<CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleFolder_Data>
    }
) : Promise<void> {
    try {
        const projectFolderIdsInOrder: Array<number> = []

        for ( const folder of updated_folders_Order_List ) {
            projectFolderIdsInOrder.push( folder.folderId )
        }

        let requestObj = {
            projectFolderIdsInOrder
        };

        const url = "d/rws/for-page/project-organize-searches-set-folders-order";

        return new Promise<void>((resolve, reject) => { try {

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        limelight__ReloadPage_Function()
                        return;
                    }

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}




/**
 *
 */
const _deleteFolderInDB = function(
    {
        folderId
    } : {
        folderId : number
    }
) : Promise<void> {
    try {
        const requestObj = {
            folderId
        };

        const url = "d/rws/for-page/project-organize-searches-folder-delete";

        return new Promise<void>((resolve, reject) => { try {

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( ! responseData.status ) {
                        limelight__ReloadPage_Function()
                        return;
                    }

                    resolve()

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
}

