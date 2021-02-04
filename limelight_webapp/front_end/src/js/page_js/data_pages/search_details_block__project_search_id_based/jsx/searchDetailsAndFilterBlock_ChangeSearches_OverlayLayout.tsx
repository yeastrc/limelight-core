/**
 * searchDetailsAndFilterBlock_ChangeSearches_OverlayLayout.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches to display
 *
 *
 */

import React from 'react'
import {
    getSearchesAndFolders_SingleProject,
    GetSearchesAndFolders_SingleProject_PromiseResponse_Item
} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";

/////

const _Overlay_Title = "Choose the searches to display"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export class SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params {
    updated_selected_ProjectSearchIds : Set<number>
    searchesAndFoldersList : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
}

export type SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches =
    ( params : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void

/**
 *
 */
export const get_SearchDetailsAndFilterBlock_ChangeSearches_Overlay_Layout = function(
    {
        projectIdentifier,
        projectSearchIds_Selected,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelected_Searches
    } : {
        projectIdentifier : string
        projectSearchIds_Selected : Set<number>
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelected_Searches : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches

    }) : JSX.Element {

    return (
        <SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component
            projectIdentifier={ projectIdentifier }
            projectSearchIds_Selected={ projectSearchIds_Selected }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_updateSelected_Searches={ callback_updateSelected_Searches }
        />
    )
}


////  React Components

/**
 *
 */
interface SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_Props {
    projectIdentifier : string
    projectSearchIds_Selected : Set<number>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelected_Searches : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_State {

    searchesAndFoldersList? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
}

/**
 *
 */
class SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component extends React.Component< SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_Props, SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
    private _searchRowClicked_BindThis = this._searchRowClicked.bind(this);

    private _projectSearchIds_Selected_InProgress : Set<number>;

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._projectSearchIds_Selected_InProgress = new Set( props.projectSearchIds_Selected )

        this.state = {};
    }

    /**
     *
     */
    componentDidMount() {

        //  Load Searches and Folders to select from

        const promise_getSearchList = getSearchesAndFolders_SingleProject({ projectIdentifier : this.props.projectIdentifier });

        promise_getSearchList.catch((reason => {}))

        promise_getSearchList.then( ( getSearchesAndFolders_SingleProject_PromiseResponse ) => {

            if ( this._unmountCalled ) {
                // unmounted so exit

                return; // EARLY RETURN
            }

            const searchesAndFoldersList = getSearchesAndFolders_SingleProject_PromiseResponse.items;

            this.setState({ searchesAndFoldersList })
        })
    }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        this.props.callback_updateSelected_Searches({
            updated_selected_ProjectSearchIds : this._projectSearchIds_Selected_InProgress,
            searchesAndFoldersList : this.state.searchesAndFoldersList
        })
    }

    /**
     *
     */
    private _searchRowClicked( projectSearchId : number ): void {

        if ( ! this._projectSearchIds_Selected_InProgress.delete( projectSearchId ) ) {
            this._projectSearchIds_Selected_InProgress.add( projectSearchId )
        }

        this.setState({ searchesAndFoldersList : this.state.searchesAndFoldersList })
    }

    /**
     *
     */
    render(): React.ReactNode {

        const searchDisplayList : Array<JSX.Element> = [];

        if ( this.state.searchesAndFoldersList ) {

            for (const searchEntry of this.state.searchesAndFoldersList) {

                if (searchEntry.projectSearchId !== undefined) {

                    const selected = this._projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);

                    const searchDisplayListEntry = (
                        <SearchEntry key={searchEntry.projectSearchId}
                                     searchDisplayListItem={searchEntry}
                                     selected={selected}
                                     showSeparatorBelow={true}
                                     callbackOn_entry_Clicked={this._searchRowClicked_BindThis}
                        />
                    )
                    searchDisplayList.push(searchDisplayListEntry);

                } else {

                    //  Process a Folder Entry

                    const searchDisplayListEntry = (
                        <FolderEntry key={searchEntry.folderId}
                                     searchDisplayListItem={searchEntry}
                                     projectSearchIds_Selected_InProgress={this._projectSearchIds_Selected_InProgress}
                                     callbackOn_searchEntry_Clicked={this._searchRowClicked_BindThis}
                        />
                    )
                    searchDisplayList.push(searchDisplayListEntry);
                }
            }
        }

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>


                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >

                    { ( this.state.searchesAndFoldersList ) ? (
                        <div
                            // style={ { padding : 6 } }
                        >

                            { searchDisplayList }

                        </div>
                    ) : (
                        <div>
                            <div style={ { marginTop: 20, textAlign: "center" }}>
                                LOADING DATA
                            </div>
                            <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                                <Spinner_Limelight_Component/>
                            </div>
                        </div>
                    ) }

                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>

                        { ( this.state.searchesAndFoldersList ) ? (
                            <input type="button" value="Change" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />
                        ) : null }

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
    searchDisplayListItem : GetSearchesAndFolders_SingleProject_PromiseResponse_Item
    selected : boolean
    showSeparatorBelow : boolean
    callbackOn_entry_Clicked : ( projectSearchId : number ) => void;
}

/**
 *
 */
interface SearchEntry_State {
    _placeHolder
}

/**
 *
 */
class SearchEntry extends React.Component< SearchEntry_Props, SearchEntry_State > {

    private _searchRowClicked_BindThis = this._searchRowClicked.bind(this);

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        // this.state = {searchList};
    }

    /**
     *
     */
    private _searchRowClicked( event: React.MouseEvent<HTMLDivElement> ): void {

        this.props.callbackOn_entry_Clicked( this.props.searchDisplayListItem.projectSearchId );
    }

    /**
     *
     */
    render(): React.ReactNode {

        let selectedClass = ""

        if ( this.props.selected ) {
            selectedClass = " selected "
        }

        const cssClasses = " search-entry-container clickable " + selectedClass;

        const searchNameDisplay = "(" + this.props.searchDisplayListItem.searchId + ") " + this.props.searchDisplayListItem.searchName;

        return (
            <React.Fragment>
                <div onClick={ this._searchRowClicked_BindThis }
                    className={ cssClasses }
                    style={ { display: "grid", gridTemplateColumns: "min-content auto" } }>

                    {/*  2 Column Grid  */}
                    <div style={ { marginRight: 8 } }>
                        <input type="checkbox" checked={ this.props.selected } onChange={ () => { /* nothing since have click handler on containing row div */ } } />
                    </div>
                    <div >
                        <span style={ { overflowWrap : "break-word"}}>
                            { searchNameDisplay }
                        </span>
                    </div>
                </div>

                {this.props.showSeparatorBelow ?
                    <div className="standard-border-color-dark"
                         style={{width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                    ></div>
                    : null
                }

            </React.Fragment>
        );
    }
}


/////

//  Single Folder Entry

/**
 *
 */
interface FolderEntry_Props {
    searchDisplayListItem : GetSearchesAndFolders_SingleProject_PromiseResponse_Item
    projectSearchIds_Selected_InProgress : Set<number>
    callbackOn_searchEntry_Clicked : ( projectSearchId : number ) => void;
}

/**
 *
 */
interface FolderEntry_State {
    folderExpanded? : boolean
}

/**
 *
 */
class FolderEntry extends React.Component< FolderEntry_Props, FolderEntry_State > {

    private _folderDivClickHandler_BindThis = this._folderDivClickHandler.bind(this);

    /**
     *
     */
    constructor(props: FolderEntry_Props) {
        super(props);

        let folderExpanded = false;

        for ( const searchEntry of this.props.searchDisplayListItem.searchesInFolder ) {

            if (searchEntry.projectSearchId !== undefined) {

                const selected = this.props.projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);
                if (selected) {
                    folderExpanded = true; // Set true if any contained search is initially selected
                }
            }
        }

        this.state = { folderExpanded };
    }

    /**
     *
     */
    private _folderDivClickHandler( event: React.MouseEvent<HTMLDivElement> ): void {

        this.setState( (state : FolderEntry_State, props : FolderEntry_Props ) : FolderEntry_State => {
            return { folderExpanded : ( ! state.folderExpanded ) }; // Save to state for re-render
        });
    }

    /**
     *
     */
    render(): React.ReactNode {

        let anySearchSelected = false;
        const searchDisplayList : Array<JSX.Element> = [];

        if ( this.state.folderExpanded ) {

            const searchesInFolder = this.props.searchDisplayListItem.searchesInFolder
            const searchesInFolder_length = searchesInFolder.length;

            let counter = 0;

            for (const searchEntry of searchesInFolder) {

                counter++;

                if (searchEntry.projectSearchId !== undefined) {

                    const selected = this.props.projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);
                    if (selected) {
                        anySearchSelected = true;
                    }
                    //  Show Separator Below for all BUT last entry
                    let showSeparatorBelow = true;
                    if ( counter === searchesInFolder_length ) {
                        showSeparatorBelow = false;
                    }

                    const searchDisplayListEntry = (
                        <SearchEntry key={searchEntry.projectSearchId}
                                     searchDisplayListItem={searchEntry}
                                     selected={selected}
                                     showSeparatorBelow={ showSeparatorBelow }
                                     callbackOn_entry_Clicked={this.props.callbackOn_searchEntry_Clicked}
                        />
                    )
                    searchDisplayList.push(searchDisplayListEntry);
                }
            }
        }

        const folder_container_div_style : React.CSSProperties = {};
        if ( ! this.state.folderExpanded ) {
            folder_container_div_style.marginBottom = 8;
        }

        return (
            <React.Fragment>

                <div className="folder-container" style={ folder_container_div_style }>

                    <div
                        className=" folder-name-and-collapsable-container clickable "
                        style={ { display: "grid", gridTemplateColumns: "min-content auto"} }
                        onClick={ this._folderDivClickHandler_BindThis }
                    >

                        {/* 2 column grid */}
                        <div className={"folder-collapsable-link-container"}>
                            {
                                ( this.state.folderExpanded ) ? (
                                    <img src="static/images/pointer-down.png"
                                         className=" icon-small fake-link-image "
                                    />
                                ) : (
                                    <img src="static/images/pointer-right.png"
                                         className=" icon-small fake-link-image "
                                    />
                                )
                            }
                        </div>
                        <div >
                            <span className=" folder-name-display ">Folder: { this.props.searchDisplayListItem.folderName }</span>
                        </div>

                    </div>

                    <div className={ " searches-under-folder-block "} >
                        { searchDisplayList }
                    </div>
                </div>

                <div className="standard-border-color-dark"
                     style={{width: "100%", borderBottomStyle: "solid", borderBottomWidth: 1 }}
                ></div>

            </React.Fragment>
        );
    }
}
