/**
 * searchDetailsAndFilterBlock_MainPage_Root.tsx
 *
 * Root of Search Details Block and Children.  Single Search and Multiple Search
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender (Root class SearchDetailsAndFilterBlock_MainPage_Root)
 *      is to create a new propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue object
 *      and pass that as the props
 */


import React from 'react'

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import {DataPages_LoggedInUser_CommonObjectsFactory} from "page_js/data_pages/data_pages_common/dataPages_LoggedInUser_CommonObjectsFactory";
import {
    AnnotationTypeData_Root, AnnotationTypeItem, AnnotationTypeItems_PerProjectSearchId,
    DataPageStateManager,
    SearchProgramsPerSearchData_Root, SearchProgramsPerSearchItem, SearchProgramsPerSearchItems_PerProjectSearchId
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {SearchDetailsBlockDataMgmtProcessing} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsBlockDataMgmtProcessing";
import {
    SearchDataLookupParameters_Root, SearchDataLookupParams_Filter_Per_AnnotationType,
    SearchDataLookupParams_For_Single_ProjectSearchId
} from "../../data_pages__common_data_classes/searchDataLookupParameters";
import {
    SearchDetailsAndFilterBlock_UserInputInOverlay,
    SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param
} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_UserInputInOverlay";
import {SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers";
import {SearchDetailsAndFilterBlock_ChangeSearches} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_ChangeSearches";
import {SearchDetailsAndFilterBlock_Re_Order_Searches} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_Re_Order_Searches";
import {SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS} from "page_js/data_pages/search_details_block__project_search_id_based/js/searchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS";
import {
    SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_EmbedInSearchDetailsRootBlock_Root_Component,
    SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData,
    SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback,
    SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback
} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/jsx/searchSubGroup_In_SearchDetailsOuterBlock";
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";


/**
 * Internal class for function passed to child components
 */
export class SearchDetailsAndFilterBlock_UserInputInOverlay_OpenUserChangeFiltersOverlay_Params {
    projectSearchId_UserClickedIn : number
    userClickedInTypeIdentifier : string
    userClickedOnAnnotationTypeId : number
}


/**
 *
 */
type OpenUserChangeFiltersOverlay_Callback = ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_OpenUserChangeFiltersOverlay_Params ) => void

/**
 * Create new Instance of this class whenever any value changes in any of these properties so that this component will re-render
 */
export class SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue {

    displayOnly : boolean // No Click Handlers for changing Filters (PSM, Peptide, Protein)
    do_NOT_Display_ChangeSearches_Link? : boolean
    do_NOT_Display_Re_Order_Searches_Link? : boolean
    dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
    dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
    dataPageStateManager_DataFrom_Server : DataPageStateManager
    searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    filterValuesChanged_Callback : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void

    searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData

    constructor(  //  Not every use calls the constructor
        {
            displayOnly, // No Click Handlers for changing Filters (PSM, Peptide, Protein)
            do_NOT_Display_ChangeSearches_Link,
            do_NOT_Display_Re_Order_Searches_Link,
            dataPages_LoggedInUser_CommonObjectsFactory,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            dataPageStateManager_DataFrom_Server,
            searchDetailsBlockDataMgmtProcessing,
            filterValuesChanged_Callback,
            searchSubGroup_PropValue
        } : {

            displayOnly : boolean // No Click Handlers for changing Filters (PSM, Peptide, Protein)
            do_NOT_Display_ChangeSearches_Link? : boolean
            do_NOT_Display_Re_Order_Searches_Link? : boolean
            dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
            dataPageStateManager_DataFrom_Server : DataPageStateManager
            searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
            filterValuesChanged_Callback : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void
            searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
        }) {

        this.displayOnly = displayOnly
        this.do_NOT_Display_ChangeSearches_Link = do_NOT_Display_ChangeSearches_Link
        this.do_NOT_Display_Re_Order_Searches_Link = do_NOT_Display_Re_Order_Searches_Link
        this.dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory
        this.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
        this.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server
        this.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing
        this.filterValuesChanged_Callback = filterValuesChanged_Callback
        this.searchSubGroup_PropValue = searchSubGroup_PropValue
    }
}

/**
 *
 */
export interface SearchDetailsAndFilterBlock_MainPage_Root_Props {

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    searchSubGroup_SelectionsChanged_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback
    searchSubGroup_ManageGroupNames_Clicked_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_MainPage_Root_State {

    _placeHolder?
    // prev_PropValue? : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
}

/**
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender (Root class SearchDetailsAndFilterBlock_MainPage_Root)
 *      is to create a new propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue object
 *      and pass that as the props
 */
export class SearchDetailsAndFilterBlock_MainPage_Root extends React.Component< SearchDetailsAndFilterBlock_MainPage_Root_Props, SearchDetailsAndFilterBlock_MainPage_Root_State > {

    private _openUserChangeFiltersOverlay_Callback_BindThis : OpenUserChangeFiltersOverlay_Callback = this._openUserChangeFiltersOverlay_Callback.bind(this);

    private _openUserChangeSearches_Overlay_Callback_BindThis = this._openUserChangeSearches_Overlay_Callback.bind(this);
    private _openUserChangeSearchesOrder_Overlay_Callback_BindThis = this._openUserChangeSearchesOrder_Overlay_Callback.bind(this);

    /**
     *
     */
    constructor(props : SearchDetailsAndFilterBlock_MainPage_Root_Props) {
        super(props);

        this.state = {};
    }

    /**
     * Only update when propValue is new object.
     */
    shouldComponentUpdate(nextProps: Readonly<SearchDetailsAndFilterBlock_MainPage_Root_Props>, nextState: Readonly<SearchDetailsAndFilterBlock_MainPage_Root_State>, nextContext: any): boolean {

        if ( nextProps.propValue !== this.props.propValue ) {
            return  true
        }
        return false;
    }

    /**
     * Called from child components
     */
    private _openUserChangeFiltersOverlay_Callback( params : SearchDetailsAndFilterBlock_UserInputInOverlay_OpenUserChangeFiltersOverlay_Params ) : void {

        const searchDetailsAndFilterBlock_UserInputInOverlay =
            new SearchDetailsAndFilterBlock_UserInputInOverlay( {
                dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
                dataPageStateManager_DataFrom_Server : this.props.propValue.dataPageStateManager_DataFrom_Server,
                searchDetailsBlockDataMgmtProcessing : this.props.propValue.searchDetailsBlockDataMgmtProcessing,
                filterValuesChanged_Callback : this.props.propValue.filterValuesChanged_Callback
            } );

        try {
            searchDetailsAndFilterBlock_UserInputInOverlay.openOverlay( params );
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }

    }

    /**
     * Called from child components
     */
    private _openUserChangeSearches_Overlay_Callback() : void {

        const dataUpdated_Callback = () => {

            //  Currently, this will not be called.  The browser will be taken to a new href in searchDetailsAndFilterBlock_ChangeSearches.changeSearches();

            throw Error("No Call to 'dataUpdated_Callback()' Expected.  Inside private _openUserChangeSearches_Overlay_Callback()")

            // const params = new SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param();
            //
            // this.props.propValue.filterValuesChanged_Callback( params );
        }

        const searchDetailsAndFilterBlock_ChangeSearches = new SearchDetailsAndFilterBlock_ChangeSearches({
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            searchDetailsBlockDataMgmtProcessing : this.props.propValue.searchDetailsBlockDataMgmtProcessing,
            dataUpdated_Callback
        })

        searchDetailsAndFilterBlock_ChangeSearches.open_ChangeSearches_Overlay();

    }

    /**
     * Called from child components
     */
    private _openUserChangeSearchesOrder_Overlay_Callback() : void {

        const dataUpdated_Callback = () => {

            //  Currently, this will not be called.  The browser will be taken to a new href in searchDetailsAndFilterBlock_ChangeSearches.changeSearches();

            throw Error("No Call to 'dataUpdated_Callback()' Expected.  Inside private _openUserChangeSearches_Overlay_Callback()")

            // const params = new SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param();
            //
            // this.props.propValue.filterValuesChanged_Callback( params );
        }

        const searchDetailsAndFilterBlock_Re_Order_Searches = new SearchDetailsAndFilterBlock_Re_Order_Searches({
            dataPageStateManager_DataFrom_Server : this.props.propValue.dataPageStateManager_DataFrom_Server,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            searchDetailsBlockDataMgmtProcessing : this.props.propValue.searchDetailsBlockDataMgmtProcessing,
            dataUpdated_Callback
        })

        searchDetailsAndFilterBlock_Re_Order_Searches.open_Re_Order_Searches_Overlay();

    }


    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = (
            this.props.propValue.searchDetailsBlockDataMgmtProcessing
                .getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds()
        );

        const paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

        //  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
        const filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        let single_multiple_Root : JSX.Element = undefined

        if ( filtersAnnTypeDisplayPerProjectSearchIds.length > 1 ) {

            // > 1 project search id. Use MultipleSearch_Only_Root

            //  Combine projectSearchIds to create MultiSearch Root Component key to force unmount/mount when changes

            const projectSearchIds : Array<number> = [];
            for ( const entry of filtersAnnTypeDisplayPerProjectSearchIds ) {
                const projectSearchId = entry.projectSearchId;
                projectSearchIds.push( projectSearchId );
            }
            const multiSearchRootComponent_Key = projectSearchIds.join(",");

            single_multiple_Root = (
                <MultipleSearch_Only_Root
                    key={ multiSearchRootComponent_Key }
                    propValue={ this.props.propValue }
                    openUserChangeFiltersOverlay_Callback={ this._openUserChangeFiltersOverlay_Callback_BindThis }
                    changeSearchesClickedCallback={ this._openUserChangeSearches_Overlay_Callback_BindThis }
                    changeSearchesOrderClickedCallback={ this._openUserChangeSearchesOrder_Overlay_Callback_BindThis }
                />
            );

        } else if ( filtersAnnTypeDisplayPerProjectSearchIds.length === 1 ) {

            const projectSearchId = filtersAnnTypeDisplayPerProjectSearchIds[ 0 ].projectSearchId;

            //  ProjectSearchId use for Single Search Root Component key to force unmount/mount when changes

            single_multiple_Root = (
                <SingleSearch_Only_Root
                    key={ projectSearchId }
                    propValue={ this.props.propValue }
                    searchSubGroup_CentralStateManagerObjectClass={ this.props.searchSubGroup_CentralStateManagerObjectClass }
                    openUserChangeFiltersOverlay_Callback={ this._openUserChangeFiltersOverlay_Callback_BindThis }
                    changeSearchesClickedCallback={ this._openUserChangeSearches_Overlay_Callback_BindThis }
                    searchSubGroup_SelectionsChanged_Callback={ this.props.searchSubGroup_SelectionsChanged_Callback }
                    searchSubGroup_ManageGroupNames_Clicked_Callback={ this.props.searchSubGroup_ManageGroupNames_Clicked_Callback }
                />
            )
        } else {
            const msg = "filtersAnnTypeDisplayPerProjectSearchIds.length is NOT === 1 or > 1"
            console.warn( msg )
            throw Error( msg )
        }

        return (
            <React.Fragment>
                { single_multiple_Root }
            </React.Fragment>
        )
    }
}

////////////////////////////////////////

////   Single Search Root

/**
 *
 */
interface SingleSearch_Only_Root_Props {

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    changeSearchesClickedCallback
    searchSubGroup_SelectionsChanged_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback
    searchSubGroup_ManageGroupNames_Clicked_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback
}

/**
 *
 */
interface SingleSearch_Only_Root_State {

    placeholder?
}

/**
 *
 */
class SingleSearch_Only_Root extends React.Component< SingleSearch_Only_Root_Props, SingleSearch_Only_Root_State > {

    /**
     *
     */
    constructor(props : SingleSearch_Only_Root_Props) {
        super(props);

        this.state = {};
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = (
            this.props.propValue.searchDetailsBlockDataMgmtProcessing
                .getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds()
        );

        const paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

        //  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
        const filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        const filtersAnnTypeDisplayPerProjectSearchId = filtersAnnTypeDisplayPerProjectSearchIds[ 0 ];

        const projectSearchId = filtersAnnTypeDisplayPerProjectSearchId.projectSearchId;

        // const searchNamesMap_KeyProjectSearchId = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        const searchProgramsPerSearchData_Root : SearchProgramsPerSearchData_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

        const annotationTypeData_Root : AnnotationTypeData_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

        const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeDataForProjectSearchId ) {
            throw Error("No annotationTypeData for projectSearchId: " + projectSearchId );
        }

        const searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId = searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! searchProgramsPerSearchDataForProjectSearchId ) {
            throw Error("No searchProgramsPerSearchDataForProjectSearchId for projectSearchId: " + projectSearchId );
        }

        let changeSearchesJSX : JSX.Element = undefined

        if ( ( ! this.props.propValue.displayOnly ) && ( ! this.props.propValue.do_NOT_Display_ChangeSearches_Link ) ) {

            changeSearchesJSX = (
                <ChangeSearches
                    changeSearchesClickedCallback={ this.props.changeSearchesClickedCallback }
                />
            )
        }

        return (
            <React.Fragment>
                <tr >
                    <td style={ { verticalAlign : "top" } }>
                        <div>
                            Search:
                        </div>
                        { changeSearchesJSX }
                    </td>
                    <SearchNameAndDetails_Root //   Inserts 2 columns in table
                        propValue={ this.props.propValue }
                        projectSearchId={ projectSearchId }
                        multipleSearchEntry={ false }
                    />
                </tr>
                <FiltersFor_A_Search__PSM_Peptide_Protein_Root
                    forMultipleSearches={ false }
                    propValue={ this.props.propValue }
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    annotationTypeDataForProjectSearchId={ annotationTypeDataForProjectSearchId }
                    searchProgramsPerSearchDataForProjectSearchId={ searchProgramsPerSearchDataForProjectSearchId }
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={ filtersAnnTypeDisplayPerProjectSearchId }
                />
                <SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_EmbedInSearchDetailsRootBlock_Root_Component
                    displayData={ this.props.propValue.searchSubGroup_PropValue }
                    searchSubGroup_CentralStateManagerObjectClass={ this.props.searchSubGroup_CentralStateManagerObjectClass }
                    searchSubGroup_SelectionsChanged_Callback={ this.props.searchSubGroup_SelectionsChanged_Callback }
                    searchSubGroup_ManageGroupNames_Clicked_Callback={ this.props.searchSubGroup_ManageGroupNames_Clicked_Callback }
                />
            </React.Fragment>
        )
    }
}


////////////////////////////////////////

////   Multiple Search Root

/**
 *
 */
interface MultipleSearch_Only_Root_Props {

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    changeSearchesClickedCallback
    changeSearchesOrderClickedCallback
}

/**
 *
 */
interface MultipleSearch_Only_Root_State {

    placeholder?
}

/**
 *
 */
class MultipleSearch_Only_Root extends React.Component< MultipleSearch_Only_Root_Props, MultipleSearch_Only_Root_State > {

    /**
     *
     */
    constructor(props : MultipleSearch_Only_Root_Props) {
        super(props);

        this.state = {};
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const searchDetails_Filters_AnnTypeDisplayRootObject : SearchDataLookupParameters_Root = (
            this.props.propValue.searchDetailsBlockDataMgmtProcessing
                .getSearchDetails_Filters_AnnTypeDisplay_ForWebserviceCalls_AllProjectSearchIds()
        );

        const paramsForProjectSearchIds = searchDetails_Filters_AnnTypeDisplayRootObject.paramsForProjectSearchIds;

        //  filtersAnnTypeDisplayPerProjectSearchIds is an array in the same order as projectSearchIds
        const filtersAnnTypeDisplayPerProjectSearchIds = paramsForProjectSearchIds.paramsForProjectSearchIdsList;

        const singleSearchesInsideSearchesBlock : Array<JSX.Element> = [];

        for ( const filtersAnnTypeDisplayPerProjectSearchId of filtersAnnTypeDisplayPerProjectSearchIds ) {

            const projectSearchId = filtersAnnTypeDisplayPerProjectSearchId.projectSearchId;

            // const searchNamesMap_KeyProjectSearchId = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

            const searchProgramsPerSearchData_Root: SearchProgramsPerSearchData_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchProgramsPerSearchData_Root();

            const annotationTypeData_Root: AnnotationTypeData_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

            const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get(projectSearchId);
            if (!annotationTypeDataForProjectSearchId) {
                throw Error("No annotationTypeData for projectSearchId: " + projectSearchId);
            }

            const searchProgramsPerSearchDataForProjectSearchId: SearchProgramsPerSearchItems_PerProjectSearchId = searchProgramsPerSearchData_Root.searchProgramsPerSearchItems_PerProjectSearchId_Map.get(projectSearchId);
            if (!searchProgramsPerSearchDataForProjectSearchId) {
                throw Error("No searchProgramsPerSearchDataForProjectSearchId for projectSearchId: " + projectSearchId);
            }

            const singleSearchEntry = (

                <table key={ projectSearchId }
                    style={ { borderWidth : 0 } } className={ " table-no-border-no-cell-spacing-no-cell-padding " }>
                    <tbody>
                        <tr>
                            <td> {/* style={ { verticalAlign : "top", paddingRight : 3 } } */} {/* Color Block for the search */}
                                {/* Comment out since not using the color anywhere else at the moment
                                   <span style="margin-right:10px;padding-left:10px;padding-right:10px; " class=" merged-search-search-background-color-{{ mergeColorId }}  "></span>
                                */}
                            </td>
                            <SearchNameAndDetails_Root //   Inserts 2 columns in table
                                propValue={ this.props.propValue }
                                projectSearchId={ projectSearchId }
                                multipleSearchEntry={ true }
                            />
                        </tr>

                        <tr>
                            <td></td>{/*  Spacer for Color Block  */}
                            <td></td>{/*  Spacer for Expand Search Icon  */}
                            <td>
                                <table style={ { borderWidth : 0 } } className=" table-no-border-no-cell-spacing-no-cell-padding ">
                                    <tbody>
                                        <FiltersFor_A_Search__PSM_Peptide_Protein_Root
                                            forMultipleSearches={ true }
                                            propValue={ this.props.propValue }
                                            openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                                            annotationTypeDataForProjectSearchId={ annotationTypeDataForProjectSearchId }
                                            searchProgramsPerSearchDataForProjectSearchId={ searchProgramsPerSearchDataForProjectSearchId }
                                            filtersAnnTypeDisplay_For_Single_ProjectSearchId={ filtersAnnTypeDisplayPerProjectSearchId }
                                        />
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );

            singleSearchesInsideSearchesBlock.push( singleSearchEntry )
        }


        let changeSearchesJSX : JSX.Element = undefined

        if ( ( ! this.props.propValue.displayOnly ) && ( ! this.props.propValue.do_NOT_Display_ChangeSearches_Link ) ) {

            changeSearchesJSX = (
                <ChangeSearches
                    changeSearchesClickedCallback={ this.props.changeSearchesClickedCallback }
                />
            )
        }


        let reorderSearchesJSX : JSX.Element = undefined

        if ( ( ! this.props.propValue.displayOnly ) && ( ! this.props.propValue.do_NOT_Display_Re_Order_Searches_Link ) ) {

            reorderSearchesJSX = (
                <ChangeSearchesOrder
                    changeSearchesOrderClickedCallback={ this.props.changeSearchesOrderClickedCallback }
                />
            )
        }


        return (
            <React.Fragment>
                <tr >
                    <td style={ { verticalAlign : "top" } }>
                        <div>
                            Searches:
                        </div>
                        { changeSearchesJSX }
                        { reorderSearchesJSX }
                    </td>
                    <td style={ { verticalAlign : "top" } }>
                        { singleSearchesInsideSearchesBlock }
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

////////////////////////////////////////

////   Change searches and Re-order searches components

/**
 *
 */
interface ChangeSearches_Props {

    changeSearchesClickedCallback
}

/**
 *
 */
class ChangeSearches_State {

    placeholder?
}

/**
 *
 */
class ChangeSearches extends React.Component< ChangeSearches_Props, ChangeSearches_State > {

    /**
     *
     */
    constructor(props: ChangeSearches_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <div >
                <span className={" fake-link "} style={ { fontSize : 12, whiteSpace : "nowrap" } } onClick={ this.props.changeSearchesClickedCallback }>
                    Change searches
                </span>
            </div>
        )
    }
}

///////////

/**
 *
 */
interface ChangeSearchesOrder_Props {

    changeSearchesOrderClickedCallback
}

/**
 *
 */
class ChangeSearchesOrder_State {

    placeholder?
}

/**
 *
 */
class ChangeSearchesOrder extends React.Component< ChangeSearchesOrder_Props, ChangeSearchesOrder_State > {

    /**
     *
     */
    constructor(props: ChangeSearchesOrder_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <div >
                <span className={" fake-link "} style={ { fontSize : 12, whiteSpace : "nowrap" } } onClick={ this.props.changeSearchesOrderClickedCallback }>
                    Re-order searches
                </span>
            </div>
        )
    }
}





////////////////////////////////////////

////   Search Name and Details

/**
 *
 */
interface SearchNameAndDetails_Root_Props {

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    projectSearchId : number
    multipleSearchEntry : boolean
}

/**
 *
 */
class SearchNameAndDetails_Root_State {

    showSearchDetails? : boolean = false;
}

/**
 *
 */
class SearchNameAndDetails_Root extends React.Component< SearchNameAndDetails_Root_Props, SearchNameAndDetails_Root_State > {

    private _searchDetailsContainer_div_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()  for container <div>

    private _showSearchDetails_Clicked_BindThis = this._showSearchDetails_Clicked.bind(this);
    private _hideSearchDetails_Clicked_BindThis = this._hideSearchDetails_Clicked.bind(this);

    private _searchDetailsAddedToDOM : boolean = false;

    /**
     *
     */
    constructor(props : SearchNameAndDetails_Root_Props) {
        super(props);

        this._searchDetailsContainer_div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            showSearchDetails : false
        };
    }

    /**
     * If update and projectSearchId changed, remove Search Details from DOM and set showSearchDetails to false
     */
    componentDidUpdate(prevProps: Readonly<SearchNameAndDetails_Root_Props>, prevState: Readonly<SearchNameAndDetails_Root_State>, snapshot?: any): void {

        if ( prevProps.projectSearchId !== this.props.projectSearchId ) {

            this._removeSearchDetailsFromDOM(); //  Will also set this._searchDetailsAddedToDOM to false

            this.setState({ showSearchDetails : false });
        }
    }

    /**
     *
     */
    componentWillUnmount(): void {

        this._removeSearchDetailsFromDOM();
    }

    /**
     *
     */
    private _removeSearchDetailsFromDOM() {

        const $detailsContainer = $( this._searchDetailsContainer_div_Ref.current );
        $detailsContainer.empty()

        this._searchDetailsAddedToDOM = false;
    }

    /**
     * Show Search Details
     */
    private _showSearchDetails_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        if ( ! this._searchDetailsAddedToDOM ) {
            this._addSearchDetailToDOM();
        }

        this.setState({ showSearchDetails : true });
    }

    /**
     * Hide Search Details
     */
    private _hideSearchDetails_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        this.setState({ showSearchDetails : false });
    }

    /**
     * Add Search Details to DOM
     */
    private _addSearchDetailToDOM() {

        const projectSearchId = this.props.projectSearchId;
        const searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers = (
            new SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers({ dataPages_LoggedInUser_CommonObjectsFactory : this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory })
        );

        searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers.showSearchDetailsClicked({ projectSearchId, domElementToInsertInto : this._searchDetailsContainer_div_Ref.current });

        this._searchDetailsAddedToDOM = true;
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const projectSearchId = this.props.projectSearchId;

        const searchNamesMap_KeyProjectSearchId = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        const annotationTypeData_Root : AnnotationTypeData_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

        const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeDataForProjectSearchId ) {
            throw Error("No annotationTypeData for projectSearchId: " + projectSearchId );
        }

        const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchNameObject ) {
            throw Error("No Search Name for projectSearchId: " + projectSearchId );
        }

        const searchName_TD_Style : React.CSSProperties = { verticalAlign : "top" };

        if ( this.props.multipleSearchEntry ) {
            searchName_TD_Style.paddingBottom = 6;
        }

        const searchDetailsContainer_div_Style : React.CSSProperties = {}
        if ( ! this.state.showSearchDetails ) {
            searchDetailsContainer_div_Style.display = "none";
        }

        return (
            <React.Fragment>
                <td style={ { verticalAlign : "top" } }>
                    { ( this.state.showSearchDetails ) ? (
                        <img className="icon-small fake-link-image "
                             onClick={ this._hideSearchDetails_Clicked_BindThis }
                             src="static/images/pointer-down.png"/>
                        ) : (
                        <img className="icon-small fake-link-image "
                             onClick={ this._showSearchDetails_Clicked_BindThis }
                             src="static/images/pointer-right.png"/>
                    )}
                </td>
                <td style={ searchName_TD_Style }>
                    <div className=" selector_search_name_details_holder " >
                        <div style={ { wordBreak: "break-word" } }>
                            { searchNameObject.name } ({ searchNameObject.searchId })
                        </div>
                    </div>
                    <div ref={ this._searchDetailsContainer_div_Ref } style={ searchDetailsContainer_div_Style }>
                    </div>
                </td>
            </React.Fragment>
        )
    }
}


////////////////////////////////////////

////   Filters for A Search (PSM, Peptide, Protein)

/**
 *
 */
interface FiltersFor_A_Search__PSM_Peptide_Protein_Root_Props {

    forMultipleSearches : boolean
    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback

    annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId
    searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId
    filtersAnnTypeDisplay_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId

}

/**
 *
 */
interface FiltersFor_A_Search__PSM_Peptide_Protein_Root_State {

    placeholder?
}

/**
 *
 */
class FiltersFor_A_Search__PSM_Peptide_Protein_Root extends React.Component< FiltersFor_A_Search__PSM_Peptide_Protein_Root_Props, FiltersFor_A_Search__PSM_Peptide_Protein_Root_State > {

    /**
     *
     */
    constructor(props : FiltersFor_A_Search__PSM_Peptide_Protein_Root_Props) {
        super(props);

        this.state = {};
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const annotationTypeDataForProjectSearchId : AnnotationTypeItems_PerProjectSearchId = this.props.annotationTypeDataForProjectSearchId

        let psmFilters : JSX.Element = undefined;
        let peptideFilters : JSX.Element = undefined;
        let proteinFilters : JSX.Element = undefined;

        if ( annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes.size > 0 ) {

            psmFilters = (
                <FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_PSM }
                    type_label={"PSM"}
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.psmFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes}
                />
            )
        }

        if ( annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes.size > 0 ) {

            peptideFilters = (
                <FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_PEPTIDE }
                    type_label={"Peptide"}
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.reportedPeptideFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes}
                />
            )
        }

        if ( annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes.size > 0 ) {

            proteinFilters = (
                <FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_PROTEIN }
                    type_label={"Protein"}
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.matchedProteinFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes}
                />
            )
        }

        return (
            <React.Fragment>
                { psmFilters }
                { peptideFilters }
                { proteinFilters }
            </React.Fragment>
        )
    }
}


////////////////////////////////////////

////   Filters for A Single Type (PSM, Peptide or Protein) for a Search

/**
 *
 */
interface FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_Props {

    forMultipleSearches : boolean
    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    typeIdentifierForOpenOverlay : string
    type_label : string
    cutoffs_ForType : SearchDataLookupParams_Filter_Per_AnnotationType[]
    filtersAnnTypeDisplay_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
    searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId
    filterableAnnotationTypes_ForType : Map<number, AnnotationTypeItem>
}

/**
 *
 */
interface FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_State {

    placeholder?
}

/**
 *
 */
class FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root extends React.Component< FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_Props, FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_State > {

    private _filterTypeLabel_ClickHandler_BindThis = this._filterTypeLabel_ClickHandler.bind(this);

    /**
     *
     */
    constructor(props : FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    private _filterTypeLabel_ClickHandler( event :  React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        try {
            {
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if (selection) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }
            }
            this.props.openUserChangeFiltersOverlay_Callback({
                projectSearchId_UserClickedIn : this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId,
                userClickedInTypeIdentifier : this.props.typeIdentifierForOpenOverlay,
                userClickedOnAnnotationTypeId : undefined
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const cutoffs_ForType = this.props.cutoffs_ForType;

        let cutoffEntryComponents : Array<JSX.Element> = undefined;

        if ( cutoffs_ForType && cutoffs_ForType.length > 0 ) {

            cutoffEntryComponents = [];

            for ( const cutoffItem of cutoffs_ForType ) {

                const cutoffItem_AnnotationTypeId = cutoffItem.annTypeId;

                const cutoffEntryComponent = (
                    <SingleFilterEntryDisplay_Root
                        key={ cutoffItem_AnnotationTypeId }
                        propValue={ this.props.propValue }
                        openUserChangeFiltersOverlay_Callback={ this.props.openUserChangeFiltersOverlay_Callback }
                        typeIdentifierForOpenOverlay={ this.props.typeIdentifierForOpenOverlay }
                        type_label={ this.props.type_label }
                        cutoffItem={ cutoffItem }
                        filtersAnnTypeDisplay_For_Single_ProjectSearchId={ this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId }
                        searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId }
                        filterableAnnotationTypes_ForType={ this.props.filterableAnnotationTypes_ForType }
                    />
                )

                cutoffEntryComponents.push( cutoffEntryComponent )
            }
        }

        let typeLabel_TD_ClassName = " filter-single-type-label-display ";
        let filterTypeLabel_ClickHandler = undefined;

        if ( ! this.props.propValue.displayOnly ) {
            typeLabel_TD_ClassName += " clickable "
            filterTypeLabel_ClickHandler = this._filterTypeLabel_ClickHandler_BindThis
        }

        let filterLabel_TD_Style : React.CSSProperties = { paddingRight : 5 };

        if ( this.props.forMultipleSearches ) {
            filterLabel_TD_Style = { width : 125 }
        }

        return (
            <React.Fragment>
                <tr style={ { verticalAlign : "top" } }>

                    <td className={ typeLabel_TD_ClassName } style={ filterLabel_TD_Style } onClick={ filterTypeLabel_ClickHandler }>

                        { this.props.type_label } Filters:
                        { ( this.props.propValue.displayOnly ) ? null :
                            (
                                <span style={ { marginLeft: 4 } }>
                                   <img src="static/images/icon-edit.png" className=" icon-small " />
                                </span>
                            )
                        }
                    </td>
                    <td style={ { lineHeight: "1.3em" } } colSpan={ 2 }>

                        { ( cutoffEntryComponents ) ? (
                            cutoffEntryComponents
                        ) : (
                            <React.Fragment>
                                <span className=" filter-single-value-display-block clickable " onClick={ filterTypeLabel_ClickHandler } >Showing All</span>
                                <span style={ { fontSize: 1 } }> </span>
                            </React.Fragment>
                            ) }
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}


////////////////////////////////////////

////   Filters for A Single Type (PSM, Peptide or Protein) for a Search

/**
 *
 */
interface SingleFilterEntryDisplay_Root_Props {

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    typeIdentifierForOpenOverlay : string
    type_label : string
    cutoffItem: SearchDataLookupParams_Filter_Per_AnnotationType
    filtersAnnTypeDisplay_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
    searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId
    filterableAnnotationTypes_ForType : Map<number, AnnotationTypeItem>
}

/**
 *
 */
interface SingleFilterEntryDisplay_Root_State {

    placeholder?
}

/**
 *
 */
class SingleFilterEntryDisplay_Root extends React.Component< SingleFilterEntryDisplay_Root_Props, SingleFilterEntryDisplay_Root_State > {

    private _filterValue_ClickHandler_BindThis = this._filterValue_ClickHandler.bind(this);

    /**
     *
     */
    constructor(props : SingleFilterEntryDisplay_Root_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    private _filterValue_ClickHandler( event :  React.MouseEvent<HTMLTableDataCellElement, MouseEvent>) {
        try {
            {
                const selectionObj = window.getSelection();
                const selection = selectionObj.toString()
                if (selection) {
                    //  Found a Selection so exit with no further action
                    return; //  EARLY RETURN
                }
            }
            this.props.openUserChangeFiltersOverlay_Callback({
                projectSearchId_UserClickedIn : this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.projectSearchId,
                userClickedInTypeIdentifier : this.props.typeIdentifierForOpenOverlay,
                userClickedOnAnnotationTypeId : this.props.cutoffItem.annTypeId
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const cutoffItem: SearchDataLookupParams_Filter_Per_AnnotationType = this.props.cutoffItem;

        const cutoffItem_AnnotationTypeId = cutoffItem.annTypeId;

        const filterableAnnotation_ForId : AnnotationTypeItem = this.props.filterableAnnotationTypes_ForType.get( cutoffItem_AnnotationTypeId );
        if ( ! filterableAnnotation_ForId ) {
            throw Error("No entry in filterableAnnotationTypes_ForType for cutoffItem_AnnotationTypeId: " + cutoffItem_AnnotationTypeId );
        }

        const searchProgramsPerSearchForId : SearchProgramsPerSearchItem = this.props.searchProgramsPerSearchDataForProjectSearchId.searchProgramsPerSearchItem_Map.get( filterableAnnotation_ForId.searchProgramsPerSearchId );
        if ( ! searchProgramsPerSearchForId ) {
            throw Error("No searchProgramsPerSearchForId for filterableAnnotation_ForId.searchProgramsPerSearchId: " +
                filterableAnnotation_ForId.searchProgramsPerSearchId +
                ", filterableAnnotation_ForId.id: " + filterableAnnotation_ForId.annotationTypeId
            );
        }

        const annotationTypeId : number = filterableAnnotation_ForId.annotationTypeId;
        const annotationName : string = filterableAnnotation_ForId.name;
        const searchProgramName : string = searchProgramsPerSearchForId.name;
        const cutoffItem_Value : number = cutoffItem.value;

        let cutoffEntryComponent_ClassName = " filter-single-value-display-block ";
        let filterValue_ClickHandler = undefined;

        if ( ! this.props.propValue.displayOnly ) {
            cutoffEntryComponent_ClassName += " clickable "
            filterValue_ClickHandler = this._filterValue_ClickHandler_BindThis;
        }

        return (
            <React.Fragment>
                <span className={ cutoffEntryComponent_ClassName } onClick={ filterValue_ClickHandler }
                        >{ annotationName } ({ searchProgramName }): { cutoffItem_Value }</span>
                <span style={ { fontSize : 1 } }> </span>
            </React.Fragment>
        )
    }
}

