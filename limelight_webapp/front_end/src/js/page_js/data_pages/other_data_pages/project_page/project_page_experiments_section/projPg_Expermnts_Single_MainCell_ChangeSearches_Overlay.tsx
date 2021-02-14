/**
 * projPg_Expermnts_Single_MainCell_ChangeSearches_Overlay.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches are in experiment condition cell
 *
 *
 */

import React from 'react'
import {GetSearchesAndFolders_SingleProject_PromiseResponse_Item} from "page_js/data_pages/data_pages_common/single_project_its_searches_and_folders/single_project_its_searches_and_folders_WebserviceRetrieval_TS_Classes";
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_Single_MainCellMaint";

import { tooltip_Limelight_Create_Tooltip, Tooltip_Limelight_Created_Tooltip } from 'page_js/common_all_pages/tooltip_LimelightLocal_ReactBased';

/////

const _Overlay_Title = "Select Searches"

const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

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
        //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
        projectSearchIds_ContainedInAllOtherCells,
        current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelected_Searches
    } : {
        searchList : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
        projectSearchIds_Selected : Set<number>
        //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
        projectSearchIds_ContainedInAllOtherCells : Set<number>
        current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelected_Searches : ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void

    }) : JSX.Element {

    return (
        <ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component
            searchList={ searchList }
            projectSearchIds_Selected={ projectSearchIds_Selected }
            projectSearchIds_ContainedInAllOtherCells={ projectSearchIds_ContainedInAllOtherCells }
            current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint={ current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
            callback_updateSelected_Searches={ callback_updateSelected_Searches }
        />
    )
}


////  React Components

/**
 *
 */
interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_Props {

    searchList : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>

    projectSearchIds_Selected : Set<number>
    //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherCells : Set<number>

    current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint

    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelected_Searches : ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) => void
}

/**
 *
 */
interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component_State {
    searchesAndFoldersList? : Array<GetSearchesAndFolders_SingleProject_PromiseResponse_Item>
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
                    <SearchEntry
                        key={searchEntry.projectSearchId}
                        searchDisplayListItem={searchEntry}
                        selected={selected}
                        showSeparatorBelow={ true }
                        projectSearchIds_ContainedInAllOtherCells={ this.props.projectSearchIds_ContainedInAllOtherCells }
                        callbackOn_entry_Clicked={this._searchRowClicked_BindThis}
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);

            } else {

                //  Process a Folder Entry

                const searchDisplayListEntry = (
                    <FolderEntry
                        key={searchEntry.folderId}
                        searchDisplayListItem={searchEntry}
                        projectSearchIds_Selected_InProgress={ this._projectSearchIds_Selected_InProgress }
                        projectSearchIds_ContainedInAllOtherCells={ this.props.projectSearchIds_ContainedInAllOtherCells }
                        callbackOn_searchEntry_Clicked={this._searchRowClicked_BindThis}
                    />
                )
                searchDisplayList.push(searchDisplayListEntry);
            }
        }

        const conditionGroupName_ConditionName_Entries : Array<JSX.Element> = [];
        {
            const cell_ConditionIds_Set = this.props.current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.mainCell_Identifier.cell_ConditionIds_Set
            for ( const conditionGroup of this.props.current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.conditionGroupsContainer.conditionGroups ) {

                for (const condition of conditionGroup.conditions) {

                    if (cell_ConditionIds_Set.has(condition.id)) {

                        if (conditionGroupName_ConditionName_Entries.length > 0) {

                            const commaSeparator = (
                                <span key={condition.id + "-comma"}>, </span>
                            );
                            conditionGroupName_ConditionName_Entries.push(commaSeparator);
                        }

                        const conditionGroupName_ConditionName = (
                            <span key={condition.id} style={{whiteSpace: "nowrap"}}>
                                {conditionGroup.label}: {condition.label}
                            </span>
                        );
                        conditionGroupName_ConditionName_Entries.push(conditionGroupName_ConditionName);
                    }
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
                close_OnBackgroundClick={ false } >

                <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { marginBottom: 12, fontWeight: "bold" } }
                     // style={ { padding : 6 } }
                >

                    <span>Choosing Searches for: </span>
                    {
                        conditionGroupName_ConditionName_Entries
                    }
                </div>

                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                >
                    <div className=" change-searches-overlay-outer-block " >

                        <div
                            // style={ { padding : 6 } }
                        >
                            { searchDisplayList }
                        </div>
                    </div>
                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>
                        <input
                            type="button" value={ ( this.props.projectSearchIds_Selected.size < 1 ) ? "Add" : "Change" }
                            style={ { marginRight: 5 } }
                            onClick={ this._updateButtonClicked_BindThis }
                        />

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
    //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherCells : Set<number>
    callbackOn_entry_Clicked : ( projectSearchId : number ) => void;
}

/**
 *
 */
interface SearchEntry_State {
    _placeHolder: any
}

/**
 *
 */
class SearchEntry extends React.Component< SearchEntry_Props, SearchEntry_State > {

    private _onMouseEnter_RootDiv_BindThis = this._onMouseEnter_RootDiv.bind(this);
    private _onMouseLeave_RootDiv_BindThis = this._onMouseLeave_RootDiv.bind(this);

    private _searchRowClicked_BindThis = this._searchRowClicked.bind(this);

    private readonly rootDiv_Ref: React.RefObject<HTMLDivElement>;

    private tooltip_Limelight_Created_Tooltip : Tooltip_Limelight_Created_Tooltip

    /**
     *
     */
    constructor(props: SearchEntry_Props) {
        super(props);

        this.rootDiv_Ref = React.createRef();
    }

    /**
     *
     */
    private _onMouseEnter_RootDiv( event : React.MouseEvent<HTMLDivElement> ) {

        if ( this.tooltip_Limelight_Created_Tooltip ) {
            this.tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this.tooltip_Limelight_Created_Tooltip = null;

        const tooltip_target_DOM_Element = this.rootDiv_Ref.current

        const tooltipContents : JSX.Element = (
            <div>
                <div>
                    This search is already in another condition.
                </div>
                <div>
                    Selecting this search will remove it from the other condition.
                </div>
            </div>
        )

        this.tooltip_Limelight_Created_Tooltip = tooltip_Limelight_Create_Tooltip({ tooltip_target_DOM_Element, tooltipContents });
    }

    /**
     *
     */
    private _onMouseLeave_RootDiv( event : React.MouseEvent<HTMLDivElement> ) {

        if ( this.tooltip_Limelight_Created_Tooltip ) {
            this.tooltip_Limelight_Created_Tooltip.removeTooltip();
        }
        this.tooltip_Limelight_Created_Tooltip = null;
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

        let selectedOtherCellClass = ""

        if ( this.props.projectSearchIds_ContainedInAllOtherCells.has(this.props.searchDisplayListItem.projectSearchId) ) {
            selectedOtherCellClass = " selected-other-cell "
        }

        const cssClasses = " search-entry-container clickable " + selectedClass + selectedOtherCellClass;

        let onMouseEnter_RootDiv = null;
        let onMouseLeave_RootDiv = null;

        if ( this.props.projectSearchIds_ContainedInAllOtherCells.has(this.props.searchDisplayListItem.projectSearchId) ) {
            onMouseEnter_RootDiv = this._onMouseEnter_RootDiv_BindThis;
            onMouseLeave_RootDiv = this._onMouseLeave_RootDiv_BindThis;
        }

        const searchNameDisplay = "(" + this.props.searchDisplayListItem.searchId + ") " + this.props.searchDisplayListItem.searchName;

        return (
            <React.Fragment>

                <div ref={ this.rootDiv_Ref }
                     onMouseEnter={ onMouseEnter_RootDiv }
                     onMouseLeave={ onMouseLeave_RootDiv }
                     onClick={ this._searchRowClicked_BindThis }
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
    //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherCells : Set<number>
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

            for (const searchEntry of searchesInFolder ) {

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
                                     projectSearchIds_ContainedInAllOtherCells={ this.props.projectSearchIds_ContainedInAllOtherCells }
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

