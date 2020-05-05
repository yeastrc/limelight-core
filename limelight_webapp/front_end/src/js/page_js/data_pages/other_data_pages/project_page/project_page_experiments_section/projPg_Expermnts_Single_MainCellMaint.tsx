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
import { ConditionGroupsDataContainer } from 'page_js/data_pages/experiment_data_pages_common/conditionGroupsDataContainer_Class';
import { ExperimentConditions_GraphicRepresentation_MainCell_Identifier } from 'page_js/data_pages/experiment_data_pages_common/experiment_SingleExperiment_ConditionsGraphicRepresentation_Cell_Identifiers';

const _FILTER_LABEL_PSM = "PSM";
const _FILTER_LABEL_PEPTIDE = "Peptide";


export class Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint {
    projectSearchIds : Set<number>
    conditionGroupsContainer : Experiment_ConditionGroupsContainer
    conditionGroupsDataContainer : ConditionGroupsDataContainer
    mainCell_Identifier : ExperimentConditions_GraphicRepresentation_MainCell_Identifier
    searchesData : any; // this.props.searchesData,
    searchesList : any;
    save_ProjectSearchIds_ForMainCell : any; // function
    save_updated_conditionGroupsDataContainer : any; // this._save_updated_conditionGroupsDataContainer_BindThis
};

/**
 * 
 */
export interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props {

    data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
}

interface ProjectPage_Experiments_SingleExperiment_MainCellMaint_State {

    current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint? : Data_ProjectPage_Experiments_SingleExperiment_MainCellMaint

    projectSearchIds?
    projectSearchIds_InitialProps?
    searches_Selected?
    searches_NOT_Selected?
    experiment_User_Set_Single_Search_FiltersPropsParams?
}

/**
 * 
 */
export class ProjectPage_Experiments_SingleExperiment_MainCellMaint extends React.Component< ProjectPage_Experiments_SingleExperiment_MainCellMaint_Props, ProjectPage_Experiments_SingleExperiment_MainCellMaint_State > {

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
    static getDerivedStateFromProps( props, state ) {

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
    shouldComponentUpdate(nextProps, nextState) {

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
        if ( this.state.searches_NOT_Selected !== nextState.searches_NOT_Selected ) {
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
    componentDidUpdate(prevProps, prevState, snapshot) {

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
    _save({ projectSearchIds }) {

        //  Called from Delete and Add below
        this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.save_ProjectSearchIds_ForMainCell({ projectSearchIds });
    }

    /**
     * Delete Search: Update the projectSearchId in copy of state.projectSearchIds and call parent component save
     */
    _delete_Search({ projectSearchId }) {

        const projectSearchIds = new Set( this.state.projectSearchIds );

        projectSearchIds.delete( projectSearchId );

        this._save({ projectSearchIds });
    }

    /**
     * New Search Selected: Update the projectSearchId in copy of state.projectSearchIds and call parent component save
     */
    _add_Search_Select_Updated( event ) {

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
    _filterEntryClicked({ projectSearchId, filterLabel, annotationTypeId }) {

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
    _setSearchFilters_Save({ conditionGroupsDataContainer }) {

        this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.save_updated_conditionGroupsDataContainer({ conditionGroupsDataContainer });

        this.setState({ experiment_User_Set_Single_Search_FiltersPropsParams : null });
    }

    /**
     * 
     */
    render () {

        // const data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = this.props.data_ProjectPage_Experiments_SingleExperiment_MainCellMaint;

        let searches_Assigned_ToCell = undefined;
        let no_searches_Assigned_ToCell_msg = undefined;

        if ( this.state.searches_Selected && this.state.searches_Selected.length !== 0 ) {
            searches_Assigned_ToCell = [];
            for ( const searchSelectedEntry of this.state.searches_Selected ) {
                
                const search_Assigned_Display = ( 
                    <Search_Assigned key={ searchSelectedEntry.searchContainer.search.projectSearchId } searchSelectedEntry={ searchSelectedEntry }
                        deleteProjectSearchId={ this._delete_Search_BindThis }
                        filterEntryClicked={ this._filterEntryClicked_BindThis } /> 
                );
                searches_Assigned_ToCell.push( search_Assigned_Display );
            }
        } else {
            no_searches_Assigned_ToCell_msg = ( 
                <div >
                    No Searches Assigned
                </div>
            );
        }

        const searches_NOT_Assigned_ToCell_Options = [];  //  May be assigned to other cells

        for ( const searchContainer of this.state.searches_NOT_Selected ) {

            let inOtherCell_Indicator = "";
            let inOtherCell_TitlePrefix = "";
            if ( searchContainer.setOnOtherCell ) {
                inOtherCell_Indicator = "* ";
                inOtherCell_TitlePrefix = "Search currently assigned to another cell.\n\n";
            }

            const searchName = searchContainer.search.name;

            const searchTitle = inOtherCell_TitlePrefix + "(" + searchContainer.search.searchId + ") " + searchName;

            let searchName_OptionDisplay = searchName;

            const searchName_OptionDisplay_MaxLength = 60;

            if ( searchName_OptionDisplay.length > searchName_OptionDisplay_MaxLength ) {
                searchName_OptionDisplay = searchName_OptionDisplay.substring( 0, searchName_OptionDisplay_MaxLength ) + "...";
            }
            
            const search_Option_Display = inOtherCell_Indicator + "(" + searchContainer.search.searchId + ") " + searchName_OptionDisplay;
            
            const search_NOT_Assigned_Option = ( 
                <option 
                    key={ searchContainer.search.projectSearchId } 
                    value={ searchContainer.search.projectSearchId }
                    title={ searchTitle }
                >{ search_Option_Display }</option>
            );
            searches_NOT_Assigned_ToCell_Options.push( search_NOT_Assigned_Option );
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

                    <div style={ { fontWeight: "bold", marginTop: 10, marginBottom: 3 } }>
                        Choose a Search to Add
                    </div>
                    <div >
                        ( A Search with "*" is assigned to another cell and will be moved to this cell when selected )
                    </div>
                    <div style={ { overflowX: "hidden" } }>
                        <select onChange={ this._add_Search_Select_Updated_BindThis } title="Select a Search to Add">
                            <option key="none-selected" >Select a Search</option>
                            { searches_NOT_Assigned_ToCell_Options }
                        </select>
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
const _computeStateFromNewOrUpdatedProps_data_ProjectPage_Experiments_SingleExperiment_MainCellMaint = function({ data_ProjectPage_Experiments_SingleExperiment_MainCellMaint }) {

    //  projectSearchIds_InitialProps : projectSearchIds currently assigned to this cell

    const projectSearchIds_InitialProps = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.projectSearchIds;
    const conditionGroupsDataContainer = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.conditionGroupsDataContainer;

    const projectSearchIds = new Set( projectSearchIds_InitialProps );

    const searchesAllList = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesList;
    const searchesData = data_ProjectPage_Experiments_SingleExperiment_MainCellMaint.searchesData;

    const { searches_Selected, searches_NOT_Selected } = _createSearchLists({ projectSearchIds, searchesAllList, searchesData, conditionGroupsDataContainer })

    return {
            projectSearchIds,
            projectSearchIds_InitialProps,
            searches_Selected,
            searches_NOT_Selected,
            current__data_ProjectPage_Experiments_SingleExperiment_MainCellMaint : data_ProjectPage_Experiments_SingleExperiment_MainCellMaint
    };
}

/**
 * 
 */
const _createSearchLists = function({ projectSearchIds, searchesAllList, searchesData, conditionGroupsDataContainer }) {

    const searches_Selected = [];
    const searches_NOT_Selected = [];

    for ( const searchContainer of searchesAllList ) {

        const search = searchContainer.search;

        const projectSearchId = search.projectSearchId;

        if ( projectSearchIds.has( projectSearchId ) ) {

            const searchSelectedEntry = _createSearchSelectedEntry({ searchContainer, projectSearchId, conditionGroupsDataContainer, searchesData });

            searches_Selected.push( searchSelectedEntry );
        } else {
            searches_NOT_Selected.push( searchContainer );
        }
    }

    return { searches_Selected, searches_NOT_Selected };
}

/**
 * @param conditionGroupsData_PerProjectSearchIdData - class ConditionGroupsDataContainer_PerProjectSearchIdData
 */
const _createSearchSelectedEntry = function({ searchContainer, projectSearchId, conditionGroupsDataContainer, searchesData }) {

    //  class ConditionGroupsData_PerProjectSearchIdData
    const conditionGroupsData_PerProjectSearchIdData = conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId });
    if ( ! conditionGroupsData_PerProjectSearchIdData ) {
        throw Error("_createSearchLists(...): No value for conditionGroupsDataContainer.get_data_ForProjectSearchId({ projectSearchId }). projectSearchId: " + projectSearchId );
    }

    const searchesSubData = searchesData.searchesSubData;
    const dataMap_KeyProjectSearchId = searchesSubData.dataMap_KeyProjectSearchId;

    const searchData = dataMap_KeyProjectSearchId.get( projectSearchId );
    if ( ! searchData ) {
        throw Error("_createSearchLists(...): No value for dataMap_KeyProjectSearchId.get( projectSearchId ). projectSearchId: " + projectSearchId );
    }
    const searchAnnotationTypesData = searchData.searchAnnotationTypesData;
    const searchProgramsPerSearch = searchData.searchProgramsPerSearch;
    const searchProgramsPerSearch_Key_searchProgramsPerSearchId = searchProgramsPerSearch.searchProgramsPerSearch_Key_searchProgramsPerSearchId;

    // Array of ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data, or undefined or null

    const psmFilters = conditionGroupsData_PerProjectSearchIdData.get_psmFilters_PerProjectSearchId();
    const reportedPeptideFilters = conditionGroupsData_PerProjectSearchIdData.get_reportedPeptideFilters_PerProjectSearchId();
    // const matchedProteinFilters = conditionGroupsData_PerProjectSearchIdData.get_matchedProteinFilters_PerProjectSearchId();

    const result_searchSelectedEntry : { searchContainer, psmFilters? : any, reportedPeptideFilters? : any } = { searchContainer };

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

    // if ( matchedProteinFilters ) {

    //     ......
    // }

    return result_searchSelectedEntry;
}

/**
 * @param filterData_PerType_All - Array of class ConditionGroupsDataContainer_PerProjectSearchId_PerType_Data
 * @param filterableAnnotationTypes - Map - key annotation type id
 */
const _createSearchSelectedEntry_PerType = function({ filterData_PerType_All, filterableAnnotationTypes, searchProgramsPerSearch_Key_searchProgramsPerSearchId }) {

    const result_filters = [];

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

        const result_filter = {
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

    searchSelectedEntry
    deleteProjectSearchId
    filterEntryClicked
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

    _deleteClicked( event ) {
        
        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        this.props.deleteProjectSearchId({ projectSearchId : this.props.searchSelectedEntry.searchContainer.search.projectSearchId })
    }

    /**
     * @param filterLabel
     * @param annotationTypeId - not pppulated if user clicked on filter label or edit icon
     */
    _filterEntryClicked({ filterLabel, annotationTypeId }) {

        this.props.filterEntryClicked({ projectSearchId : this.props.searchSelectedEntry.searchContainer.search.projectSearchId, filterLabel, annotationTypeId });
    }

    /**
     * 
     */
    render () {

        const search = this.props.searchSelectedEntry.searchContainer.search;

        const searchTitle = "(" + search.searchId + ") " + search.name;

        let psmFilters = undefined;

        if ( this.props.searchSelectedEntry.psmFilters ) {

            psmFilters = (
                <Search_Assigned_FilterData_ForType 
                    filters={ this.props.searchSelectedEntry.psmFilters }
                    filterLabel={ _FILTER_LABEL_PSM }
                    filterEntryClicked={ this._filterEntryClicked_BindThis }
                />
            );
        }

        let peptideFilters = undefined;

        if ( this.props.searchSelectedEntry.reportedPeptideFilters ) {

            peptideFilters = (
                <Search_Assigned_FilterData_ForType 
                    filters={ this.props.searchSelectedEntry.reportedPeptideFilters }
                    filterLabel={ _FILTER_LABEL_PEPTIDE }
                    filterEntryClicked={ this._filterEntryClicked_BindThis }
                />
            );
        }

        let filters = undefined;
        if ( psmFilters || peptideFilters ) {

            filters = (
                <div style= { { marginLeft: 30, marginTop: 4 }}>
                    { psmFilters }
                    { peptideFilters }
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
                    <span style={ { overflowWrap: "break-word" }} title={ searchTitle } >{ search.name }</span>
                </div>
                <div >
                    { filters }
                </div>
            </React.Fragment>
        )

    }
}

interface Search_Assigned_FilterData_ForType_Props {

    filters
    filterLabel
    filterEntryClicked
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

    _filterLabelOrEditIconClicked( event ) {
        
        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        // console.log( "Search_Assigned_FilterData_ForType: _filterLabelOrEditIconClicked(...) ")

        this.props.filterEntryClicked({ filterLabel : this.props.filterLabel });
    }

    /**
     * 
     */
    render () {

        let filterEntriesDisplay = undefined;

        if ( this.props.filters && this.props.filters.length !== 0 ) {

            filterEntriesDisplay = [];

            for ( const filter of this.props.filters ) {

                const filterDisplay = (
                    <Search_Assigned_FilterData_ForType_SingleEntry 
                        key={ filter.annotationTypeId } 
                        filter={ filter } 
                        filterLabel={ this.props.filterLabel } 
                        filterEntryClicked={ this.props.filterEntryClicked } 
                    />
                );
                filterEntriesDisplay.push( filterDisplay );
            }
        }

        const lineHeight = "1.3em"; // Vertical space for background color on filter values

        return (
            <React.Fragment>
                <div style={ { display: "grid", gridTemplateColumns: "120px 1fr" } }>

                    <div style={ { lineHeight, marginBottom: 1, whiteSpace: "nowrap" } }>
                        <span className=" clickable " onClick={ this._filterLabelOrEditIconClicked_BindThis }>
                            { this.props.filterLabel } Filters: 
                        </span>
                        <img className=" fake-link-image icon-small " title="Edit Filters" src="static/images/icon-edit.png"
                            onClick={ this._filterLabelOrEditIconClicked_BindThis }
                        />
                    </div>
                    <div style={ { lineHeight } }>
                        { filterEntriesDisplay }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

interface Search_Assigned_FilterData_ForType_SingleEntry_Props {

    filter
    filterLabel
    filterEntryClicked
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
    _filterEntryClicked( event ) {
        
        event.preventDefault(); //  Prevent Default Action of event

        event.stopPropagation();  // Stop bubbling of event

        // console.log( "Search_Assigned_FilterData_ForType_SingleEntry: _filterEntryClicked(...) ")

        this.props.filterEntryClicked({ filterLabel : this.props.filterLabel, annotationTypeId : this.props.filter.annotationTypeId  });
    }

    /**
     * 
     */
    render () {

        return (
            <React.Fragment>
                <span className=" filter-single-value-display-block   clickable  "
                    onClick={ this._filterEntryClicked_BindThis }>
                    <span >{ this.props.filter.annotationTypeName }</span>
                    <span > (</span>
                    <span >{ this.props.filter.searchProgramName }</span>
                    <span >): </span>
                    <span >{ this.props.filter.value }</span>
                </span>
                <span style={ { fontSize: 1 } }> </span>
            </React.Fragment>
        );
    }
}
