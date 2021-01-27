/**
 * projPg_Expermnts_Single_MainCell_ChangeSearches_Overlay.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches are in experiment condition cell
 *
 *
 */

import React from 'react'
import { ModalOverlay_Limelight_Component } from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001/modalOverlay_WithTitlebar_React_v001";

/////

const _Overlay_Title = "Choose the searches to put in cell"

const _Overlay_Width = 800;
const _Overlay_Height = 600;

//////

/**
 *
 */
export class ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params {
    updated_selected_ProjectSearchIds : Set<number>
}

/**
 *
 */
export const get_ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Layout = function(
    {
        searchList,
        projectSearchIds_Selected,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelected_Searches
    } : {
        searchList : Array<ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>
        projectSearchIds_Selected : Set<number>
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelected_Searches : ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void

    }) : JSX.Element {

    return (
        <ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component
            searchList={ searchList }
            projectSearchIds_Selected={ projectSearchIds_Selected }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_updateSelected_Searches={ callback_updateSelected_Searches }
        />
    )
}

/////

/**
 * Used for both Search and Folder
 */
export class ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem {

    //  Search
    projectSearchId : number
    searchId : number
    searchName : string

    //  For Folder

    folderId : number
    folderName : string
    searchesInFolder : Array<ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>

    constructor({ projectSearchId, searchId, searchName, folderId, folderName, searchesInFolder } : {

        //  Search
        projectSearchId : number
        searchId : number
        searchName : string

        //  For Folder

        folderId : number
        folderName : string
        searchesInFolder : Array<ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>
    }) {
        this.projectSearchId = projectSearchId;
        this.searchId = searchId;
        this.searchName = searchName;
        this.folderId = folderId;
        this.folderName = folderName;
        this.searchesInFolder = searchesInFolder;
    }
}

////  React Components

/**
 *
 */
interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props {
    searchList : Array<ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>
    projectSearchIds_Selected : Set<number>
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelected_Searches : ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void
}

/**
 *
 */
interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_State {
    searchesAndFoldersList? : Array<ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem>
}

/**
 *
 */
class ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component extends React.Component< ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props, ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);
    private _searchRowClicked_BindThis = this._searchRowClicked.bind(this);

    private _projectSearchIds_Selected_InProgress : Set<number>

    /**
     *
     */
    constructor(props: ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props) {
        super(props);

        this._projectSearchIds_Selected_InProgress = new Set( props.projectSearchIds_Selected )

        const searchList = this.props.searchList;

        this.state = { searchesAndFoldersList: searchList };
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        this.props.callback_updateSelected_Searches({ updated_selected_ProjectSearchIds : this._projectSearchIds_Selected_InProgress })
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

        for ( const searchEntry of this.state.searchesAndFoldersList ) {

            if ( searchEntry.projectSearchId !== undefined ) {

                const selected = this._projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);

                const searchDisplayListEntry = (
                    <SearchEntry key={searchEntry.projectSearchId}
                                 searchDisplayListItem={searchEntry}
                                 selected={selected}
                                 callbackOn_entry_Clicked={this._searchRowClicked_BindThis}
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);

            } else {

                //  Process a Folder Entry

                const searchDisplayListEntry = (
                    <FolderEntry key={searchEntry.folderId}
                                 searchDisplayListItem={searchEntry}
                                 projectSearchIds_Selected_InProgress={ this._projectSearchIds_Selected_InProgress }
                                 callbackOn_searchEntry_Clicked={this._searchRowClicked_BindThis}
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);
            }
        }

        const mainBlockHeight = _Overlay_Height - 120;

        return (
            <ModalOverlay_Limelight_Component
                width={ _Overlay_Width }
                height={ _Overlay_Height }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <div className=" modal-overlay-body-standard-padding ">

                    <div className=" change-searches-overlay-outer-block ">

                        <div style={ { height : mainBlockHeight, maxHeight : mainBlockHeight, overflowY: "auto", width: "100%", overflowX: "hidden" } }
                             className=" mod-mass-select-dialog-bounding-box  ">

                            <div style={ { padding : 6 } } >

                                { searchDisplayList }

                            </div>
                        </div>

                        <div style={ { marginTop: 15 } }>
                            <input type="button" value="Change" style={ { marginRight: 5 } } onClick={ this._updateButtonClicked_BindThis } />

                            <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                        </div>
                    </div>
                </div>
            </ModalOverlay_Limelight_Component>
        );
    }
}

/////

//  Single Search Entry

/**
 *
 */
interface SearchEntry_Props {
    searchDisplayListItem : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem
    selected : boolean
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
            <div onClick={ this._searchRowClicked_BindThis }
                 className={ cssClasses }
                // title={ searchNameDisplay }
                 style={ {  } }>
                <span style={ { overflowWrap : "break-word"}}>
                    { searchNameDisplay }
                </span>
            </div>
        );
    }
}


/////

//  Single Folder Entry

/**
 *
 */
interface FolderEntry_Props {
    searchDisplayListItem : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Search_or_Folder_DisplayListItem
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

    private _folderExpandClickHandler_BindThis = this._folderExpandClickHandler.bind(this);
    private _folderCollapseClickHandler_BindThis = this._folderCollapseClickHandler.bind(this);

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
    private _folderExpandClickHandler( event: React.MouseEvent<HTMLDivElement> ): void {

        this.setState( { folderExpanded : true });
    }

    /**
     *
     */
    private _folderCollapseClickHandler( event: React.MouseEvent<HTMLDivElement> ): void {

        this.setState( { folderExpanded : false });
    }

    /**
     *
     */
    render(): React.ReactNode {

        let anySearchSelected = false;
        const searchDisplayList : Array<JSX.Element> = [];

        if ( this.state.folderExpanded ) {

            for (const searchEntry of this.props.searchDisplayListItem.searchesInFolder) {

                if (searchEntry.projectSearchId !== undefined) {

                    const selected = this.props.projectSearchIds_Selected_InProgress.has(searchEntry.projectSearchId);
                    if (selected) {
                        anySearchSelected = true;
                    }

                    const searchDisplayListEntry = (
                        <SearchEntry key={searchEntry.projectSearchId}
                                     searchDisplayListItem={searchEntry}
                                     selected={selected}
                                     callbackOn_entry_Clicked={this.props.callbackOn_searchEntry_Clicked}
                        />
                    )
                    searchDisplayList.push(searchDisplayListEntry);
                }
            }
        }

        return (
            <div className={"folder-container"}>
                <div className={"folder-collapsable-link-container"}>
                    {
                        ( this.state.folderExpanded ) ? (
                            <img src="static/images/icon-folder-open.png" onClick={ this._folderCollapseClickHandler_BindThis }
                                 className=" clickable icon-large "
                            />
                        ) : (
                            <img src="static/images/icon-folder-closed.png" onClick={ this._folderExpandClickHandler_BindThis }
                                 className=" clickable icon-large "
                            />
                        )
                    }
                </div>
                <div >
                    <span className=" folder-name-display ">{ this.props.searchDisplayListItem.folderName }</span>
                </div>
                <div className={ " searches-under-folder-block "} >
                    { searchDisplayList }
                </div>
                <div style={ { clear: "both" } }></div>
            </div>
        );
    }
}
