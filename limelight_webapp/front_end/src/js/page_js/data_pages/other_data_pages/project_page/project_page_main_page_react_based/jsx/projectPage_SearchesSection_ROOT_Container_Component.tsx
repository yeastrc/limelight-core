/**
 * projectPage_SearchesSection_ROOT_Container_Component.tsx
 *
 * Project Page - "Explore Data" section - ROOT Component
 *
 *
 */




import React from "react";
import {
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Callback,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds,
    ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component";
import {
    projectPage_SearchesSection_Get_Searches_Folders_From_Server,
    ProjectPage_SearchesSection_Searches_Folders_Root
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Get_Searches_Folders_From_Server";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod,
    projectPage_SearchesSection_Open_DataPages_PeptideProteinMod__Initialize
} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesSection_Open_DataPages_PeptideProteinMod";
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {ProjectPage_SearchesAdmin} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/js/projectPage_SearchesAdmin";
import {ProjectPage_Experiments_SingleExperiment_ConditionGroupMaint_Props} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_Single_ConditionGroupMaint";



/**
 *
 */
export interface ProjectPage_SearchesSection_ROOT_Component_Props {
    projectIdentifier : string
    folderIds_ExpandedFolders_InitialValue : Set<number>;
    dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails: DataPages_LoggedInUser_CommonObjectsFactory
    projectPage_SearchesAdmin: ProjectPage_SearchesAdmin
    callback_Update_folderIds_ExpandedFolders: ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_folderIds_ExpandedFolders_Callback
}

/**
 *
 */
interface ProjectPage_SearchesSection_ROOT_Component_State {

    expand_All_Folders__ShowSearchDetailsTo_Global_Force?: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Expand_All_Folders__ShowSearchDetailsTo_Global_Force

    projectSearchIds_Selected_InProgress? : Set<number>;  // Pushed up on change from child component

    compareButtonsDisabled? : boolean;
    copy_move_ButtonsDisabled?: boolean

    searchesAndFolders?: ProjectPage_SearchesSection_Searches_Folders_Root

    showNoSearchesMessage?: boolean
}

/**
 *
 */
export class ProjectPage_SearchesSection_ROOT_Component extends React.Component< ProjectPage_SearchesSection_ROOT_Component_Props, ProjectPage_SearchesSection_ROOT_Component_State > {

    private _compare_Peptides_Clicked_BindThis = this._compare_Peptides_Clicked.bind(this);
    private _compare_Proteins_Clicked_BindThis = this._compare_Proteins_Clicked.bind(this);
    private _compare_Mods_Clicked_BindThis = this._compare_Mods_Clicked.bind(this);

    private _copySearches_Clicked_BindThis = this._copySearches_Clicked.bind(this);
    private _moveSearches_Clicked_BindThis = this._moveSearches_Clicked.bind(this);
    private _organizeSearches_Clicked_BindThis = this._organizeSearches_Clicked.bind(this);
    private _openFilterOverridesOverlay_Clicked_BindThis = this._openFilterOverridesOverlay_Clicked.bind(this);
    private _expand_All_Button_Clicked_BindThis = this._expand_All_Button_Clicked.bind(this);
    private _collapse_All_Button_Clicked_BindThis = this._collapse_All_Button_Clicked.bind(this);

    private _callback_updateSelected_Searches_BindThis = this._callback_updateSelected_Searches.bind(this);
    private _callback_SearchDeleted_BindThis = this._callback_SearchDeleted.bind(this);

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const _callback_updateSelected_Searches : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds = this._callback_updateSelected_Searches;
    }

    /**
     *
     */
    constructor(props: ProjectPage_SearchesSection_ROOT_Component_Props) {
        super(props)

        this.state = {
            projectSearchIds_Selected_InProgress: new Set(),
            expand_All_Folders__ShowSearchDetailsTo_Global_Force: null,
            compareButtonsDisabled: true,
            copy_move_ButtonsDisabled: true,
            showNoSearchesMessage: false
        }
    }

    /**
     *
     */
    componentDidMount() {

        projectPage_SearchesSection_Open_DataPages_PeptideProteinMod__Initialize();

        const promise = projectPage_SearchesSection_Get_Searches_Folders_From_Server({ projectIdentifier: this.props.projectIdentifier });

        promise.catch( (reason) => {

        })
        promise.then( (searchesAndFolders) => {
            try {

                let showNoSearchesMessage = false;
                if ( searchesAndFolders && searchesAndFolders.noSearchesFound ) {
                    showNoSearchesMessage = true;
                }

                this.setState({ searchesAndFolders, showNoSearchesMessage });

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        });
    }

    /**
     *
     * @param params
     * @private
     */
    private _callback_updateSelected_Searches(params : ProjectPage_SearchesSection_SearchesAndFoldersList_Component_Update_Selected_ProjectSearchIds_Params) : void {

        let compareButtonsDisabled = true;
        if ( params.updated_selected_ProjectSearchIds.size > 1 ) {
            compareButtonsDisabled = false;
        }
        let copy_move_organize_ButtonsDisabled = true;
        if ( params.updated_selected_ProjectSearchIds.size > 0 ) {
            copy_move_organize_ButtonsDisabled = false;
        }
        this.setState({
            projectSearchIds_Selected_InProgress: params.updated_selected_ProjectSearchIds,
            compareButtonsDisabled, copy_move_ButtonsDisabled: copy_move_organize_ButtonsDisabled
        });
    }

    /**
     *
     */
    private _callback_SearchDeleted() : void {

        this.setState( (state : ProjectPage_SearchesSection_ROOT_Component_State, props : ProjectPage_SearchesSection_ROOT_Component_Props ) : ProjectPage_SearchesSection_ROOT_Component_State => {

            let found_A_Search = false;

            if (  state.searchesAndFolders ) {
                if ( state.searchesAndFolders.searchesNotInFolders ) {
                    if ( state.searchesAndFolders.searchesNotInFolders.length > 0 ) {
                        found_A_Search = true;
                    }
                }

                if ( ! found_A_Search ) {
                    if (state.searchesAndFolders.folderList) {
                        for (const folder of state.searchesAndFolders.folderList) {
                            if ( folder.searchesInFolder && folder.searchesInFolder.length > 0 ) {
                                found_A_Search = true;
                                break;
                            }
                        }
                    }
                }
            }

            const showNoSearchesMessage = ! found_A_Search; // showNoSearchesMessage true if NO searches in project

            return { showNoSearchesMessage };
        });
    }

    /**
     *
     */
    private _compare_Peptides_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const projectSearchIds = this.state.projectSearchIds_Selected_InProgress;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const projectSearchIdCodes = this._get_projectSearchIdCodes__From_projectSearchIds({ projectSearchIds });

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.peptide_View_OpenDataPage({ projectSearchIds, projectSearchIdCodes, ctrlKeyOrMetaKey })
    }

    /**
     *
     */
    private _compare_Proteins_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const projectSearchIds = this.state.projectSearchIds_Selected_InProgress;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const projectSearchIdCodes = this._get_projectSearchIdCodes__From_projectSearchIds({ projectSearchIds });

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.protein_View_OpenDataPage({ projectSearchIds, projectSearchIdCodes, ctrlKeyOrMetaKey })
    }

    /**
     *
     */
    private _compare_Mods_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ){

        const projectSearchIds = this.state.projectSearchIds_Selected_InProgress;
        const ctrlKeyOrMetaKey = event.ctrlKey || event.metaKey;

        const projectSearchIdCodes = this._get_projectSearchIdCodes__From_projectSearchIds({ projectSearchIds });

        ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod.mod_View_OpenDataPage({ projectSearchIds, projectSearchIdCodes, ctrlKeyOrMetaKey })
    }

    /**
     *
     */
    private _get_projectSearchIdCodes__From_projectSearchIds({ projectSearchIds } : { projectSearchIds:  Set<number> }) : Set<string> {

        const projectSearchIdCodes = new Set<string>();

        if ( this.state.searchesAndFolders.searchesNotInFolders ) {
            for (const search of this.state.searchesAndFolders.searchesNotInFolders) {
                if ( projectSearchIds.has( search.projectSearchId) ) {
                    projectSearchIdCodes.add(search.projectSearchIdCode);
                }
            }
        }
        if ( this.state.searchesAndFolders.folderList ) {
            for ( const folder of this.state.searchesAndFolders.folderList ) {
                if ( folder.searchesInFolder ) {
                    for (const search of folder.searchesInFolder) {
                        if ( projectSearchIds.has( search.projectSearchId) ) {
                            projectSearchIdCodes.add(search.projectSearchIdCode);
                        }
                    }
                }
            }
        }
        return projectSearchIdCodes;
    }

    /**
     *
     */
    private _copySearches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.props.projectPage_SearchesAdmin.openOverlay_ForCopyMoveSearches({
            projectSearchIdsSelected: this.state.projectSearchIds_Selected_InProgress,
            projectIdentifier: this.props.projectIdentifier,
            doCopy: true,
            doMove: false
        })
    }

    /**
     *
     */
    private _moveSearches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.props.projectPage_SearchesAdmin.openOverlay_ForCopyMoveSearches({
            projectSearchIdsSelected: this.state.projectSearchIds_Selected_InProgress,
            projectIdentifier: this.props.projectIdentifier,
            doCopy: false,
            doMove: true
        })
    }

    /**
     *
     */
    private _organizeSearches_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.props.projectPage_SearchesAdmin.projectPage_SearchesAdmin_OrganizeSearchesAndFolders.openOrganizeSearches();
    }

    /**
     *
     */
    private _openFilterOverridesOverlay_Clicked(event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.props.projectPage_SearchesAdmin.set_ProjectWide_DefaultFilter_Cutoffs_Overrides.openSet_ProjectWide_DefaultFilter_Cutoffs_Overrides();
    }

    /**
     *
     */
    private _expand_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All_Folders__ShowSearchDetailsTo_Global_Force: { expand_All_Folders__ShowSearchDetails_Global_ForceToValue: true } });
    }


    /**
     *
     */
    private _collapse_All_Button_Clicked (event: React.MouseEvent<HTMLInputElement, MouseEvent> ) {

        this.setState({ expand_All_Folders__ShowSearchDetailsTo_Global_Force: { expand_All_Folders__ShowSearchDetails_Global_ForceToValue: false } });
    }

    /**
     *
     */
    render() {
        return (
             ( ! this.state.searchesAndFolders ) ? (
                <div>Loading Searches</div>
            ): ( this.state.showNoSearchesMessage ) ? (

                 <div >
                     No searches in this project.
                 </div>

             ) : (
                 <div>
                    {/*  Only For Logged In User  */}
                    { ( this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails ) ? (

                        <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                            {/*  Expand All and Collapse All Buttons  */}
                            <input type="button" className="submit-button "
                                   id="expand_all_search_details_button"
                                   title="Show Search Details for All Searches."
                                   value="Expand All"
                                   onClick={ this._expand_All_Button_Clicked_BindThis }
                            />
                            <span> </span>
                            <input className="submit-button " type="button"
                                   id="collapse_all_search_details_button"
                                   title="Hide Search Details for All Searches."
                                   value="Collapse All"
                                   onClick={ this._collapse_All_Button_Clicked_BindThis }
                            />

                            { ( this.props.projectPage_SearchesAdmin ) ? (

                                // Show since projectPage_SearchesAdmin is populated

                                <React.Fragment>

                                    <span> </span>

                                    {/*  Copy Searches */}
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <input type="button" value="Copy Searches"
                                               disabled={ this.state.copy_move_ButtonsDisabled }
                                               onClick={ this._copySearches_Clicked_BindThis }
                                        />
                                        { ( this.state.copy_move_ButtonsDisabled ) ? (
                                            // overlay when button is disabled to show tooltip
                                            <div
                                                style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                                title="Click here to copy the selected searches to another project."
                                            ></div>
                                        ): null }
                                    </div>

                                    <span> </span>

                                    {/*  Move Searches */}
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <input type="button" value="Move Searches"
                                               disabled={ this.state.copy_move_ButtonsDisabled }
                                               onClick={ this._moveSearches_Clicked_BindThis }
                                        />
                                        { ( this.state.copy_move_ButtonsDisabled ) ? (
                                            // overlay when button is disabled to show tooltip
                                            <div
                                                style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                                title="Click here to copy the selected searches to another project."
                                            ></div>
                                        ): null }
                                    </div>

                                    <span> </span>

                                    {/*  Organize Searches */}
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <input type="button" value="Organize Searches"
                                               onClick={ this._organizeSearches_Clicked_BindThis }
                                        />
                                    </div>

                                    <span> </span>

                                    {/*  Open Set Filter Overrides Overlay  */}
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <input type="button" value="Filter Overrides"
                                               title="Click here to set custom cutoffs for all searches.."
                                               onClick={ this._openFilterOverridesOverlay_Clicked_BindThis }
                                        />
                                    </div>

                                </React.Fragment>
                            ): null }

                        </div>

                    ): null }

                    <ProjectPage_SearchesSection_SearchesAndFoldersList_Component
                        projectIdentifier={ this.props.projectIdentifier }
                        folderIds_ExpandedFolders_InitialValue={ this.props.folderIds_ExpandedFolders_InitialValue }
                        searchesAndFolders={ this.state.searchesAndFolders }
                        expand_All_Folders__ShowSearchDetailsTo_Global_Force={ this.state.expand_All_Folders__ShowSearchDetailsTo_Global_Force }
                        dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails={ this.props.dataPages_LoggedInUser_CommonObjectsFactory_ForSearchDetails}
                        projectPage_SearchesAdmin={ this.props.projectPage_SearchesAdmin }
                        callback_updateSelected_Searches={ this._callback_updateSelected_Searches_BindThis }
                        callback_Update_folderIds_ExpandedFolders={ this.props.callback_Update_folderIds_ExpandedFolders }
                        callback_SearchDeleted={ this._callback_SearchDeleted_BindThis }
                    />

                    <div style={ { marginBottom: 10, whiteSpace: "nowrap" } }>

                          {/*  compare peptide */}
                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input type="button" value="Compare Peptide View"
                                   disabled={ this.state.compareButtonsDisabled }
                                   onClick={ this._compare_Peptides_Clicked_BindThis }
                            />
                            { ( this.state.compareButtonsDisabled ) ? (
                                // overlay when button is disabled to show tooltip
                                <div
                                     style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                     title="Select 2 or more searches to compare searches"
                                ></div>
                            ): null }
                        </div>

                        <span > </span>

                        {/*  compare Protein */}
                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input type="button" value="Compare Protein View"
                                   disabled={ this.state.compareButtonsDisabled }
                                   onClick={ this._compare_Proteins_Clicked_BindThis }
                            />
                            { ( this.state.compareButtonsDisabled ) ? (
                                // overlay when button is disabled to show tooltip
                                <div
                                    style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                    title="Select 2 or more searches to compare searches"
                                ></div>
                            ): null }
                        </div>

                        <span > </span>

                        {/*  compare Mod */}
                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input type="button" value="Compare Mod View"
                                   disabled={ this.state.compareButtonsDisabled }
                                   onClick={ this._compare_Mods_Clicked_BindThis }
                            />
                            { ( this.state.compareButtonsDisabled ) ? (
                                // overlay when button is disabled to show tooltip
                                <div
                                    style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                    title="Select 2 or more searches to compare searches"
                                ></div>
                            ): null }
                        </div>
                    </div>
                </div>
            )
        );
    }

}





