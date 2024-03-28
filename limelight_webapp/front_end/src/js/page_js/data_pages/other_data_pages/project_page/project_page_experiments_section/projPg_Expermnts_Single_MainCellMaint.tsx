/**
 * projPg_Expermnts_Single_MainCellMaint.tsx
 * 
 * Single Experiment Main Cell Maint
 * 
 * Shown when Experiment Main Cell is clicked
 * 
 * Lets user alter data assigned to that cell
 *    Searches (Project Search Ids) assigned to that cell (Path of conditions and a label per condition)
 */



/////////////////////////////////////////
/////////////////////////////////////////            Prev Version that worked in an overlay
/////////////////////////////////////////

import React from 'react'

import { Experiment_User_Set_Searches_Filters } from './experiment_User_Set_Searches_Filters';
import { Experiment_ConditionGroupsContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_ConditionGroupsContainer_AndChildren_Classes';
import { Experiment_ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_Class';
import { ExperimentConditions_GraphicRepresentation_MainCell_Identifier } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers';
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    AnnotationTypeData_Root, AnnotationTypeItem, AnnotationTypeItems_PerProjectSearchId,
    SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItem
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {
    get_ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Layout,
    ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page_experiments_section/projPg_Expermnts_Single_MainCell_ChangeSearches_Overlay";
import {Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data} from "page_js/data_pages/experiment_data_pages_common/experiment_conditionGroupsDataContainer_PerProjectSearchIdData_AndChildren_Classes";
import {
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root,
    CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

const _FILTER_LABEL_PSM = "PSM";
const _FILTER_LABEL_PEPTIDE = "Peptide";
const _FILTER_LABEL_PROTEIN = "Protein";
const _FILTER_LABEL_MODIFICATION_POSITION = "Modification Position";

/**
 *
 */
export class Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint {

    projectSearchIds_ForThisCell : Set<number>
    //    The Project Search Ids in all Cells excluding the cell identified by parameter conditionIds_Array
    projectSearchIds_ContainedInAllOtherCells : Set<number>

    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : Experiment_ConditionGroupsDataContainer
    mainCell_Identifier : ExperimentConditions_GraphicRepresentation_MainCell_Identifier
    searchesData :  {
        searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        searchesSubData : {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }
    save_ProjectSearchIds_ForMainCell : any; // function
    save_updated_conditionGroupsDataContainer : any; // this._save_updated_conditionGroupsDataContainer_BindThis
}

/**
 * Internal class to wrap: wrappedSearch : GetSearchesAndFolders_SingleProject_PromiseResponse_Item
 */
class SearchSelected_Entry {
    wrappedSearch : CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
    psmFilters? : Array<SearchSelected_Entry_FiltersForType_PSM_Etc>
    reportedPeptideFilters? : Array<SearchSelected_Entry_FiltersForType_PSM_Etc>
    matchedProteinFilters? : Array<SearchSelected_Entry_FiltersForType_PSM_Etc>
    modificationPositionFilters? : Array<SearchSelected_Entry_FiltersForType_PSM_Etc>
}

/**
 * Internal class of filters for type PSM etc for class SearchSelected_Entry
 */
class SearchSelected_Entry_FiltersForType_PSM_Etc {
    annotationTypeId : number
    annotationTypeName : string
    searchProgramName : string
    value : number
}

/**
 * 
 */
export interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props {

    data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
}

interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_State {

    current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint? : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint

    projectSearchIds? : Set<number>
    projectSearchIds_InitialProps? : Set<number>
    searches_Selected : Array<SearchSelected_Entry>
    experiment_User_Set_Single_Search_FiltersPropsParams?: { projectSearchId: any }
}

/**
 * 
 */
export class ProjectPage_Experiments_SingleExperiment_MainCellMaint extends React.Component< ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props, ProjectPage_Experiments_SingleExperiment_MainCellMaint_State > {

    private _changeSearches_OpenOverlay_BindThis = this._changeSearches_OpenOverlay.bind(this);
    private _add_Search_Select_Updated_BindThis = this._add_Search_Select_Updated.bind(this);
    private _delete_Search_BindThis = this._delete_Search.bind(this);
    private _filterEntryClicked_BindThis = this._filterEntryClicked.bind(this);

    private _setSearchFilters_Cancel_BindThis = this._setSearchFilters_Cancel.bind(this);
    private _setSearchFilters_Save_BindThis = this._setSearchFilters_Save.bind(this);


    constructor(props : ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props) {
        super(props);

        // {
        //     const defaultDialogTop = 45;

        //     const windowScrollY = Math.floor( window.scrollY );

        //     this._dialogTop = defaultDialogTop + windowScrollY;
        // }
        const newState = 
        _computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ 
            data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint 
        });

        this.state = newState;
    }

    /**
     * Must be Static
     * Called before 
     *   Initial render: 'render()'
     *   Rerender : 'shouldComponentUpdate()'
     * 
     * Return new state (like return from setState(callback)) or null
     */
    static getDerivedStateFromProps( props: ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props, state: ProjectPage_Experiments_SingleExperiment_MainCellMaint_State ): ProjectPage_Experiments_SingleExperiment_MainCellMaint_State {

        // console.log("called: static getDerivedStateFromProps(): " );

        //  Return new state (like return from setState(callback)) or null

        if ( props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint === state.current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint ) {
            return null;
        }
        const newState = 
        _computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ 
            data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint 
        });
        return newState;
    }


    //  Do NOT use, will be removed
    // componentWillReceiveProps() {
    //     var z = 0;
    // }

    /**
     * 
     */
    shouldComponentUpdate(nextProps: ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props, nextState: ProjectPage_Experiments_SingleExperiment_MainCellMaint_State): boolean {

        if ( this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint !== nextProps.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint ) {
            return true;
        }
        if ( this.state.projectSearchIds !== nextState.projectSearchIds ) {
            return true;
        }
        if ( this.state.projectSearchIds_InitialProps !== nextState.projectSearchIds_InitialProps ) {
            return true;
        }
        if ( this.state.searches_Selected !== nextState.searches_Selected ) {
            return true;
        }
        if ( this.state.experiment_User_Set_Single_Search_FiltersPropsParams !== nextState.experiment_User_Set_Single_Search_FiltersPropsParams ) {
            return true;
        }
        return false;
    }

    //  Do NOT use, will be removed
    // componentWillUpdate() {
    //     var z = 0;
    // }

    // getSnapshotBeforeUpdate() is invoked right before the most recently rendered output is committed to e.g. the DOM. 
    // It enables your component to capture some information from the DOM (e.g. scroll position) before it is potentially changed. 
    // Any value returned by this lifecycle will be passed as a parameter to componentDidUpdate().

    // If your component implements the getSnapshotBeforeUpdate(prevProps, prevState) lifecycle (which is rare), 
    // the value it returns will be passed as a third “snapshot” parameter to componentDidUpdate(). 
    // Otherwise this parameter will be undefined.

    /**
     * 
     */
    componentDidUpdate(prevProps: ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props, prevState: ProjectPage_Experiments_SingleExperiment_MainCellMaint_State, snapshot: any ) {

        if ( this.state.current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint !== this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint ) {

            // console.log("props object changed from prevprops: data_ProjectPage_Experiments_SingleExperiment_MainCellMaint");

            const newState = _computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_MainCellMaint({ 
                data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint 
            });

            this.setState( newState );
        }
    }

    /**
     * 
     */
    _save({ projectSearchIds }: { projectSearchIds: Set<number> }) {

        //  Called from Delete and Add below
        this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.save_ProjectSearchIds_ForMainCell({ projectSearchIds });
    }

    /**
     * Delete Search: Update the projectSearchId in copy of state.projectSearchIds and call parent component save
     */
    _delete_Search({ projectSearchId }: { projectSearchId: any }) {

        const projectSearchIds = new Set( this.state.projectSearchIds );

        projectSearchIds.delete( projectSearchId );

        this._save({ projectSearchIds });
    }

    /**
     *
     * @private
     */
    private _changeSearches_OpenOverlay() {

        let changeSearches_Overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

        const projectSearchIdsSet = new Set( this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.projectSearchIds_ForThisCell );

        const callback_updateSelected_Searches = ( params : ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches_Params ) : void => {

            changeSearches_Overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
            this._save({ projectSearchIds : params.updated_selected_ProjectSearchIds });
        }

        const callbackOn_Cancel_Close_Clicked = () : void => {

            changeSearches_Overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM()
        }

        const overlayComponent = get_ProjectPage_Experiments_SingleExperiment_MainCellMaint_ChangeSearches_Overlay_Layout({

            searchesSearchTagsFolders_Result_Root : this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesData.searchesSearchTagsFolders_Result_Root,
            projectSearchIds_Selected : projectSearchIdsSet,
            projectSearchIds_ContainedInAllOtherCells : this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.projectSearchIds_ContainedInAllOtherCells,
            current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint: this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint,
            callback_updateSelected_Searches,
            callbackOn_Cancel_Close_Clicked
        })

        changeSearches_Overlay_AddedTo_DocumentBody_Holder =
            limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
    }

    /**
     * New Search Selected: Update the projectSearchId in copy of state.projectSearchIds and call parent component save
     */
    _add_Search_Select_Updated( event: any ) {

        const projectSearchId_String = event.target.value;

        const projectSearchId = Number.parseInt( projectSearchId_String );
        if ( Number.isNaN( projectSearchId ) ) {
            throw Error("projectSearchId_String is not integer: " + projectSearchId_String );
        }

        const projectSearchIds = new Set( this.state.projectSearchIds );

        projectSearchIds.add( projectSearchId );

        this._save({ projectSearchIds });
    }

    /**
     * User Clicked on a Filter for a Search - Open the overlay to allow the user to change the filters for that search
     * 
     * @param projectSearchId
     * @param filterLabel
     * @param annotationTypeId - not populated if user clicked on filter label or edit icon
     */
    _filterEntryClicked({ projectSearchId, filterLabel, annotationTypeId }: { projectSearchId: any, filterLabel: any, annotationTypeId: any }) {

        // console.log("_filterEntryClicked({ projectSearchId, filterLabel, annotationTypeId}). projectSearchId: " + projectSearchId
        // + ", filterLabel: " + filterLabel + ", annotationTypeId: " + annotationTypeId );

        this.setState({ experiment_User_Set_Single_Search_FiltersPropsParams : { projectSearchId } });
    }

    /**
     * "Cancel" button clicked in subcomponent <Experiment_User_Set_Searches_Filters  >
     */
    _setSearchFilters_Cancel() {

        this.setState({ experiment_User_Set_Single_Search_FiltersPropsParams : null });
    }

    /**
     * "Save" button clicked in subcomponent <Experiment_User_Set_Searches_Filters  >
     */
    _setSearchFilters_Save({ conditionGroupsDataContainer }: { conditionGroupsDataContainer: any }) {

        this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.save_updated_conditionGroupsDataContainer({ conditionGroupsDataContainer });

        this.setState({ experiment_User_Set_Single_Search_FiltersPropsParams : null });
    }

    /**
     * 
     */
    render () {

        // const data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint;

        let searches_Assigned_ToCell : Array<JSX.Element> = undefined;
        let no_searches_Assigned_ToCell_msg : JSX.Element = undefined;
        let addChangeSearchesButton_Label : string = undefined;

        if ( this.state.searches_Selected && this.state.searches_Selected.length !== 0 ) {
            searches_Assigned_ToCell = [];
            for ( const searchSelectedEntry of this.state.searches_Selected ) {

                const annotationTypeItems_ForProjectSearchId =
                    this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesData.searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( searchSelectedEntry.wrappedSearch.projectSearchId )
                if ( ! annotationTypeItems_ForProjectSearchId ) {
                    const msg = "RETURNED NOTHING FROM this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesData.searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( searchSelectedEntry.wrappedSearch.projectSearchId ) FOR searchSelectedEntry.wrappedSearch.projectSearchId: " + searchSelectedEntry.wrappedSearch.projectSearchId;
                    console.warn(msg)
                    throw Error(msg)
                }

                const search_Assigned_Display = ( 
                    <Search_Assigned
                        key={ searchSelectedEntry.wrappedSearch.projectSearchId }
                        searchSelectedEntry={ searchSelectedEntry }
                        annotationTypeItems_ForProjectSearchId={  annotationTypeItems_ForProjectSearchId }
                        deleteProjectSearchId={ this._delete_Search_BindThis }
                        filterEntryClicked={ this._filterEntryClicked_BindThis } /> 
                );
                searches_Assigned_ToCell.push( search_Assigned_Display );
            }

            addChangeSearchesButton_Label = "Change Searches";

        } else {
            no_searches_Assigned_ToCell_msg = ( 
                <div >
                    No Searches Assigned
                </div>
            );

            addChangeSearchesButton_Label = "Add Searches";
        }

        let experiment_User_Set_Single_Search_Filters = undefined;

        if ( this.state.experiment_User_Set_Single_Search_FiltersPropsParams ) {

            experiment_User_Set_Single_Search_Filters = (

                <Experiment_User_Set_Searches_Filters  
                    projectSearchIds={ [ this.state.experiment_User_Set_Single_Search_FiltersPropsParams.projectSearchId ] }
                    // conditionGroupsContainer={ this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.conditionGroupsContainer }
                    conditionGroupsDataContainer={ this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.conditionGroupsDataContainer }
                    searchesData={ this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesData }
                    save={ this._setSearchFilters_Save_BindThis } 
                    cancel={ this._setSearchFilters_Cancel_BindThis }
                />
            );
        }

        return (
            <React.Fragment>
                <div >
                    { experiment_User_Set_Single_Search_Filters }

                    <div style={ { fontWeight: "bold", marginBottom: 3 } }>
                        Assigned Searches
                    </div>
                    <div style={ { paddingRight: 10 } }>
                        { searches_Assigned_ToCell }
                        { no_searches_Assigned_ToCell_msg }
                    </div>
                    <div style={ { marginTop: 10 } }>
                        <input type="button" value={ addChangeSearchesButton_Label }
                            onClick={ this._changeSearches_OpenOverlay_BindThis }
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

//////////////////////

///  Not in any class

/**
 * 
 */
const _computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = function({ data_ProjectPage_Experiments_SingleExperiment_MainCellMaint } : {

    data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
}) {

    //  projectSearchIds_InitialProps : projectSearchIds currently assigned to this cell

    const projectSearchIds_InitialProps = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.projectSearchIds_ForThisCell;
    const conditionGroupsDataContainer = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.conditionGroupsDataContainer;

    const projectSearchIds = new Set( projectSearchIds_InitialProps );

    const searchesData = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesData;

    const searches_Selected = _createSearchLists({ projectSearchIds, searchesData, conditionGroupsDataContainer })

    return {
            projectSearchIds,
            projectSearchIds_InitialProps,
            searches_Selected,
            current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
    };
}

/**
 * 
 */
const _createSearchLists = function({ projectSearchIds, searchesData, conditionGroupsDataContainer } : {

    projectSearchIds: Set<number>
    searchesData :  {
        searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        searchesSubData: {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }
    conditionGroupsDataContainer: Experiment_ConditionGroupsDataContainer

}) : Array<SearchSelected_Entry> {

    const searches_Selected : Array<SearchSelected_Entry> = [];

    for ( const searchEntry of searchesData.searchesSearchTagsFolders_Result_Root.get_SearchData_ALL_StandardDisplay_Sorted_SearchId_Descending() ) {

        const projectSearchId = searchEntry.projectSearchId;

        if ( projectSearchIds.has( projectSearchId ) ) {

            const searchSelectedEntry = _createSearchSelectedEntry({ searchEntry, projectSearchId, conditionGroupsDataContainer, searchesData });

            searches_Selected.push( searchSelectedEntry );
        }
    }

    return searches_Selected;
}

/**
 *
 * @param searchEntry
 * @param projectSearchId
 * @param conditionGroupsDataContainer
 * @param searchesData
 */
const _createSearchSelectedEntry = function({ searchEntry, projectSearchId, conditionGroupsDataContainer, searchesData } : {

    searchEntry: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_SingleSearch_Data
    projectSearchId : number
    conditionGroupsDataContainer: Experiment_ConditionGroupsDataContainer
    searchesData :  {
        searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
        searchesSubData: {
            searchProgramsPerSearchData_Root :  SearchProgramsPerSearchData_Root,
            annotationTypeData_Root : AnnotationTypeData_Root
        }
    }

}) : SearchSelected_Entry {

    //  class ConditionGroupsData_PerProjectSearchIdData
    const conditionGroupsData_PerProjectSearchIdData = conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId });
    if ( ! conditionGroupsData_PerProjectSearchIdData ) {
        throw Error("_createSearchLists(...): No value for conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId }). projectSearchId: " + projectSearchId );
    }

    const searchesSubData = searchesData.searchesSubData;

    const searchAnnotationTypesData = searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ! searchAnnotationTypesData ) {
        throw Error("_createSearchLists(...): No value for searchesSubData.annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }
    const searchProgramsPerSearch = searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
    if ( ! searchProgramsPerSearch ) {
        throw Error("_createSearchLists(...): No value for searchesSubData.searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }
    const searchProgramsPerSearch_Key_searchProgramsPerSearchId = searchProgramsPerSearch.searchProgramsPerSearchItem_Map;

    // Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null

    const psmFilters = conditionGroupsData_PerProjectSearchIdData.get_psmFilters_PerProjectSearchId();
    const reportedPeptideFilters = conditionGroupsData_PerProjectSearchIdData.get_reportedPeptideFilters_PerProjectSearchId();
    const matchedProteinFilters = conditionGroupsData_PerProjectSearchIdData.get_matchedProteinFilters_PerProjectSearchId();
    const modificationPositionFilters = conditionGroupsData_PerProjectSearchIdData.get_modificationPositionFilters_PerProjectSearchId()

    const result_searchSelectedEntry : SearchSelected_Entry = { wrappedSearch: searchEntry };

    if ( psmFilters ) {

        const result_psmFilters = _createSearchSelectedEntry_PerType({ 
            filterData_PerType_All : psmFilters, 
            filterableAnnotationTypes : searchAnnotationTypesData.psmFilterableAnnotationTypes, 
            searchProgramsPerSearch_Key_searchProgramsPerSearchId 
        });
        result_searchSelectedEntry.psmFilters = result_psmFilters;
    }

    if ( reportedPeptideFilters ) {

        const result_reportedPeptideFilters = _createSearchSelectedEntry_PerType({ 
            filterData_PerType_All : reportedPeptideFilters, 
            filterableAnnotationTypes : searchAnnotationTypesData.reportedPeptideFilterableAnnotationTypes, 
            searchProgramsPerSearch_Key_searchProgramsPerSearchId 
        });
        result_searchSelectedEntry.reportedPeptideFilters = result_reportedPeptideFilters;
    }

    if ( matchedProteinFilters ) {

        const result_matchedProteinFilters = _createSearchSelectedEntry_PerType({
            filterData_PerType_All : matchedProteinFilters,
            filterableAnnotationTypes : searchAnnotationTypesData.matchedProteinFilterableAnnotationTypes,
            searchProgramsPerSearch_Key_searchProgramsPerSearchId
        });
        result_searchSelectedEntry.matchedProteinFilters = result_matchedProteinFilters;
    }

    if ( modificationPositionFilters ) {

        const result_modificationPositionFilters = _createSearchSelectedEntry_PerType({
            filterData_PerType_All : modificationPositionFilters,
            filterableAnnotationTypes : searchAnnotationTypesData.modificationPositionFilterableAnnotationTypes,
            searchProgramsPerSearch_Key_searchProgramsPerSearchId
        });
        result_searchSelectedEntry.modificationPositionFilters = result_modificationPositionFilters;
    }

    return result_searchSelectedEntry;
}

/**
 * @param filterData_PerType_All - Array of class ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data
 * @param filterableAnnotationTypes - Map - key annotation type id
 */
const _createSearchSelectedEntry_PerType = function(
    {
        filterData_PerType_All, filterableAnnotationTypes, searchProgramsPerSearch_Key_searchProgramsPerSearchId
    } : {
        filterData_PerType_All: Experiment_ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data[]
        filterableAnnotationTypes: Map<number, AnnotationTypeItem>
        searchProgramsPerSearch_Key_searchProgramsPerSearchId: Map<number, SearchProgramsPerSearchItem>

    }) : Array<SearchSelected_Entry_FiltersForType_PSM_Etc> {

    const result_filters : Array<SearchSelected_Entry_FiltersForType_PSM_Etc> = [];

    for ( const filterData_PerType of filterData_PerType_All ) {

        const annotationTypeId = filterData_PerType.get_annTypeId();

        const filterableAnnotationType = filterableAnnotationTypes.get( annotationTypeId );
        if ( ! filterableAnnotationType ) {
            throw Error("_createSearchSelectedEntry_PerType(...): No Value in filterableAnnotationTypes for annotationTypeId: " + annotationTypeId );
        }
        const searchProgramsPerSearchId = filterableAnnotationType.searchProgramsPerSearchId;
        const searchProgramsPerSearch_Entry = searchProgramsPerSearch_Key_searchProgramsPerSearchId.get( searchProgramsPerSearchId );
        if ( ! searchProgramsPerSearch_Entry ) {
            throw Error("_createSearchSelectedEntry_PerType(...): No Value in searchProgramsPerSearch_Key_searchProgramsPerSearchId for searchProgramsPerSearchId: " + searchProgramsPerSearchId );
        }

        const result_filter : SearchSelected_Entry_FiltersForType_PSM_Etc = {
            annotationTypeId,
            annotationTypeName : filterableAnnotationType.name,
            searchProgramName : searchProgramsPerSearch_Entry.name,
            value  : filterData_PerType.get_value() 
        }

        result_filters.push( result_filter );
    }

    return result_filters;
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

//   Sub React Component classes

interface Search_Assigned_Props {

    searchSelectedEntry: SearchSelected_Entry
    annotationTypeItems_ForProjectSearchId: AnnotationTypeItems_PerProjectSearchId
    deleteProjectSearchId: any // callback function
    filterEntryClicked: any // callback function
}

/**
 * Single Assigned Search
 */
class Search_Assigned extends React.Component< Search_Assigned_Props, {} > {

    private _deleteClicked_BindThis = this._deleteClicked.bind(this);
    private _filterEntryClicked_BindThis = this._filterEntryClicked.bind(this);


    constructor(props : Search_Assigned_Props) {
        super(props);

        // this.state = newState;
    }

    _deleteClicked( event: any ) {
        
        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        this.props.deleteProjectSearchId({ projectSearchId : this.props.searchSelectedEntry.wrappedSearch.projectSearchId })
    }

    /**
     * @param filterLabel
     * @param annotationTypeId - not pppulated if user clicked on filter label or edit icon
     */
    _filterEntryClicked({ filterLabel, annotationTypeId }: { filterLabel: any, annotationTypeId: any }) {

        this.props.filterEntryClicked({ projectSearchId : this.props.searchSelectedEntry.wrappedSearch.projectSearchId, filterLabel, annotationTypeId });
    }

    /**
     * 
     */
    render () {
        try {
            const search = this.props.searchSelectedEntry.wrappedSearch;

            const searchTitle = "(" + search.searchId + ") " + search.searchName;

            let psmFilters : JSX.Element = undefined;

            if ( this.props.searchSelectedEntry.psmFilters ) {

                psmFilters = (
                    <Search_Assigned_FilterData_ForType
                        filters={ this.props.searchSelectedEntry.psmFilters }
                        filterLabel={ _FILTER_LABEL_PSM }
                        filterableAnnotationTypes={ this.props.annotationTypeItems_ForProjectSearchId.psmFilterableAnnotationTypes }
                        filterEntryClicked={ this._filterEntryClicked_BindThis }
                    />
                );
            }

            let peptideFilters : JSX.Element = undefined;

            if ( this.props.searchSelectedEntry.reportedPeptideFilters ) {

                peptideFilters = (
                    <Search_Assigned_FilterData_ForType
                        filters={ this.props.searchSelectedEntry.reportedPeptideFilters }
                        filterLabel={ _FILTER_LABEL_PEPTIDE }
                        filterableAnnotationTypes={ this.props.annotationTypeItems_ForProjectSearchId.reportedPeptideFilterableAnnotationTypes }
                        filterEntryClicked={ this._filterEntryClicked_BindThis }
                    />
                );
            }

            let matchedProteinFilters : JSX.Element = undefined;

            if ( this.props.searchSelectedEntry.matchedProteinFilters ) {

                matchedProteinFilters = (
                    <Search_Assigned_FilterData_ForType
                        filters={ this.props.searchSelectedEntry.matchedProteinFilters }
                        filterLabel={ _FILTER_LABEL_PROTEIN }
                        filterableAnnotationTypes={ this.props.annotationTypeItems_ForProjectSearchId.matchedProteinFilterableAnnotationTypes }
                        filterEntryClicked={ this._filterEntryClicked_BindThis }
                    />
                );
            }

            let modificationPositionFilters : JSX.Element = undefined;

            if ( this.props.searchSelectedEntry.modificationPositionFilters ) {

                modificationPositionFilters = (
                    <Search_Assigned_FilterData_ForType
                        filters={ this.props.searchSelectedEntry.modificationPositionFilters }
                        filterLabel={ _FILTER_LABEL_MODIFICATION_POSITION }
                        filterableAnnotationTypes={ this.props.annotationTypeItems_ForProjectSearchId.modificationPositionFilterableAnnotationTypes }
                        filterEntryClicked={ this._filterEntryClicked_BindThis }
                    />
                );
            }


            let filters = undefined;
            if ( psmFilters || peptideFilters || matchedProteinFilters || modificationPositionFilters ) {

                filters = (
                    <div style= { { marginLeft: 30, marginTop: 4 } } >
                        <div style={ { display: "grid", gridTemplateColumns: "min-content 1fr" } }>
                            { psmFilters }
                            { peptideFilters }
                            { matchedProteinFilters }
                            { modificationPositionFilters }
                        </div>
                    </div>
                );
            }

            return (
                <React.Fragment>
                    <div style={ { marginBottom: 1, whiteSpace: "nowrap", overflowX: "hidden", textOverflow: "ellipsis" } }>
                        <img className=" fake-link-image icon-small " title="Remove Search" src="static/images/icon-circle-delete.png"
                            onClick={ this._deleteClicked_BindThis }
                        />
                        <span > </span>
                        <span >(</span><span >{ search.searchId }</span><span >) </span>
                        <span style={ { overflowWrap: "break-word" }} title={ searchTitle } >{ search.searchName }</span>
                    </div>
                    <div >
                        { filters }
                    </div>
                </React.Fragment>
            )
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}

interface Search_Assigned_FilterData_ForType_Props {

    filters: SearchSelected_Entry_FiltersForType_PSM_Etc[]
    filterLabel: string

    filterableAnnotationTypes: Map<number, AnnotationTypeItem>

    filterEntryClicked: any // Callback Function
}

/**
 * Single Assigned Search - The Filter Data for a Type (PSM, ...)
 */
class Search_Assigned_FilterData_ForType extends React.Component< Search_Assigned_FilterData_ForType_Props, {} > {

    private _filterLabelOrEditIconClicked_BindThis = this._filterLabelOrEditIconClicked.bind(this);

    constructor(props : Search_Assigned_FilterData_ForType_Props) {
        super(props);
        // this.state = newState;
    }

    _filterLabelOrEditIconClicked( event: any ) {
        
        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        // console.log( "Search_Assigned_FilterData_ForType: _filterLabelOrEditIconClicked(...) ")

        this.props.filterEntryClicked({ filterLabel : this.props.filterLabel });
    }

    /**
     * 
     */
    render () {
        try {
            let filterEntriesDisplay = undefined;

            if ( this.props.filters && this.props.filters.length !== 0 ) {

                filterEntriesDisplay = [];

                for ( const filter of this.props.filters ) {

                    const annotationTypeId = filter.annotationTypeId

                    const filterableAnnotationType = this.props.filterableAnnotationTypes.get( annotationTypeId )

                    if ( ! filterableAnnotationType ) {
                        const msg = "this.props.filterableAnnotationTypes.get( annotationTypeId ) returned NOTHING for annotationTypeId: " + annotationTypeId
                        console.warn(msg)
                        throw Error(msg)
                    }

                    const filterDisplay = (
                        <Search_Assigned_FilterData_ForType_SingleEntry
                            key={ filter.annotationTypeId }
                            annotationTypeId={ annotationTypeId }
                            filter={ filter }
                            filterLabel={ this.props.filterLabel }
                            filterableAnnotationType={ filterableAnnotationType }
                            filterEntryClicked={ this.props.filterEntryClicked }
                        />
                    );
                    filterEntriesDisplay.push( filterDisplay );
                }
            }

            const lineHeight = "1.3em"; // Vertical space for background color on filter values

            return (
                <React.Fragment>
                    {/*  2 Column Grid  */}
                    <div style={ { lineHeight, marginBottom: 1, whiteSpace: "nowrap" } }>
                        <span className=" clickable " onClick={ this._filterLabelOrEditIconClicked_BindThis }>
                            { this.props.filterLabel } Filters:
                        </span>
                        <img
                            className=" fake-link-image icon-small "
                            style={ { marginLeft: 2, marginRight: 8 } }
                            title="Edit Filters"
                            src="static/images/icon-edit.png"
                            onClick={ this._filterLabelOrEditIconClicked_BindThis }
                        />
                    </div>
                    <div style={ { lineHeight } }>
                        { filterEntriesDisplay }
                    </div>
                </React.Fragment>
            );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}

interface Search_Assigned_FilterData_ForType_SingleEntry_Props {

    annotationTypeId: number
    filter: any
    filterLabel: any  // PSM / Peptide
    filterableAnnotationType: AnnotationTypeItem
    filterEntryClicked: any
}
/**
 * Single Assigned Search - Single Filter Data Entry for Annotation Type Entry for a Type (PSM, ...)
 */
class Search_Assigned_FilterData_ForType_SingleEntry extends React.Component< Search_Assigned_FilterData_ForType_SingleEntry_Props, {} > {

    private _filterEntryClicked_BindThis = this._filterEntryClicked.bind(this);


    constructor(props : Search_Assigned_FilterData_ForType_SingleEntry_Props) {
        super(props);

        // this.state = newState;
    }

    /**
     * 
     */
    _filterEntryClicked( event: any ) {
        
        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        // console.log( "Search_Assigned_FilterData_ForType_SingleEntry: _filterEntryClicked(...) ")

        this.props.filterEntryClicked({ filterLabel : this.props.filterLabel, annotationTypeId : this.props.filter.annotationTypeId  });
    }

    /**
     * 
     */
    render () {
        try {
            let cutoffEntryComponent_ClassName = " filter-single-value-display-block   clickable  "

            let filterDirection_Symbol = ""
            if ( this.props.filterableAnnotationType.filterDirectionAbove ) {
                filterDirection_Symbol = ">="
            } else if ( this.props.filterableAnnotationType.filterDirectionBelow ) {
                filterDirection_Symbol = "<="
            } else {
                const msg = "Error: Neither is true: this.props.filterableAnnotationType.filterDirectionAbove and this.props.filterableAnnotationType.filterDirectionBelow"
                console.warn(msg)
                throw Error(msg)
            }

            const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer();

            const tooltip_Text = "Only " + this.props.filterLabel + "s with a " + this.props.filter.annotationTypeName + " " + filterDirection_Symbol + " " + this.props.filter.value + " will be included.";

            const tooltip_Element_Main = (
                <div>
                    { tooltip_Text }
                </div>
            )

            let tooltip_Element_Addition_For_NonDefault: JSX.Element = undefined

            if ( this.props.filterableAnnotationType.defaultFilterValue !== this.props.filter.value ) {

                cutoffEntryComponent_ClassName += " not-default-value "

                tooltip_Element_Addition_For_NonDefault = (
                    <div
                        style={ { marginTop: 10 } }>
                        This filter value has been changed from the import defaults for this search.
                    </div>
                )
            }

            const tooltip_Element = (
                <div>
                    { tooltip_Element_Main }
                    { tooltip_Element_Addition_For_NonDefault }
                </div>
            )

            return (
                <React.Fragment>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={ tooltip_Element }
                        { ...tooltip_Main_Props }
                    >
                        <span className={ cutoffEntryComponent_ClassName }
                              onClick={ this._filterEntryClicked_BindThis }>
                            <span >{ this.props.filter.annotationTypeName }</span>
                            <span > (</span>
                            <span >{ this.props.filter.searchProgramName }</span>
                            <span >): </span>
                            <span >{ this.props.filter.value }</span>
                        </span>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                    <span style={ { fontSize: 1 } }> </span>
                </React.Fragment>
            );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }
}
