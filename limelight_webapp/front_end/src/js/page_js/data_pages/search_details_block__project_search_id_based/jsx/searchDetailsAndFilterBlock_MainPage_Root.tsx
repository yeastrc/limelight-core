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

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';
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
import {Limelight_Colors_For_MultipleSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_MultipleSearches";
import {
    SearchName_and_SearchShortName_Change_Component_Change_Callback,
    SearchName_and_SearchShortName_Change_Component_Change_Callback_Params
} from "page_js/data_pages/common_components__react/search_name_and_search_short_name__user_change_overlay/searchName_and_SearchShortName_Change_Component_and_WebserviceCall";
import {
    Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams,
    Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch
} from "page_js/data_pages/search_tags__display_management/search_tags__manage_for_search/search_Tags_Manage_TagsForSearch_OverallTags_Version_2_OverlayComponent";
import {
    Search_Tags_DisplaySearchTags_UnderSearchName_Component,
    Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry,
    Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTagCategory_Entry
} from "page_js/data_pages/search_tags__display_management/search_tags__display_under_search_name/search_Tags_DisplaySearchTags_UnderSearchName_Component";
import {Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage} from "page_js/data_pages/common__search_display_verbose_value_store_session_storage/search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component
} from "page_js/data_pages/search_details_block__project_search_id_based/jsx/searchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers";


//  Put here since used in multiple places

//  Used below on all searches
const _Verbose_View_ContainerDiv_MarginBottom_AllSearches = 0
//  Added only on Multiple Searches
const _Verbose_View_ContainerDiv_MarginBottom_MultipleSearchAddition = 4

const _Verbose_View_ContainerSpan_Style: React.CSSProperties = { whiteSpace: "nowrap" }

/**
 * class for function passed to child components
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
    callback_Before_ReadURLtoGenerateNewURL_ReOrderSearchesOverlay: () => void

    searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
    limelight_Colors_For_MultipleSearches: Limelight_Colors_For_MultipleSearches //  Only populated for Multiple Search and Not always populated for multiple search

    // constructor(  //  Not every use calls the constructor
    //     {
    //         displayOnly, // No Click Handlers for changing Filters (PSM, Peptide, Protein)
    //         do_NOT_Display_ChangeSearches_Link,
    //         do_NOT_Display_Re_Order_Searches_Link,
    //         dataPages_LoggedInUser_CommonObjectsFactory,
    //         dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
    //         dataPageStateManager_DataFrom_Server,
    //         searchDetailsBlockDataMgmtProcessing,
    //         filterValuesChanged_Callback,
    //         searchSubGroup_PropValue,
    //         limelight_Colors_For_MultipleSearches //  Only populated for Multiple Search and Not always populated for multiple search
    //     } : {
    //
    //         displayOnly : boolean // No Click Handlers for changing Filters (PSM, Peptide, Protein)
    //         do_NOT_Display_ChangeSearches_Link? : boolean
    //         do_NOT_Display_Re_Order_Searches_Link? : boolean
    //         dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
    //         dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : DataPageStateManager
    //         dataPageStateManager_DataFrom_Server : DataPageStateManager
    //         searchDetailsBlockDataMgmtProcessing : SearchDetailsBlockDataMgmtProcessing
    //         filterValuesChanged_Callback : ( params : SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param ) => void
    //         searchSubGroup_PropValue : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
    //         limelight_Colors_For_MultipleSearches: Limelight_Colors_For_MultipleSearches //  Only populated for Multiple Search and Not always populated for multiple search
    //     }) {
    //
    //     this.displayOnly = displayOnly
    //     this.do_NOT_Display_ChangeSearches_Link = do_NOT_Display_ChangeSearches_Link
    //     this.do_NOT_Display_Re_Order_Searches_Link = do_NOT_Display_Re_Order_Searches_Link
    //     this.dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory
    //     this.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay = dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay
    //     this.dataPageStateManager_DataFrom_Server = dataPageStateManager_DataFrom_Server
    //     this.searchDetailsBlockDataMgmtProcessing = searchDetailsBlockDataMgmtProcessing
    //     this.filterValuesChanged_Callback = filterValuesChanged_Callback
    //     this.searchSubGroup_PropValue = searchSubGroup_PropValue
    //     this.limelight_Colors_For_MultipleSearches = limelight_Colors_For_MultipleSearches
    // }
}

/**
 *
 */
export interface SearchDetailsAndFilterBlock_MainPage_Root_Props {

    select_ONLY_ONE_Search?: boolean  //  If true, User can select only ONE Search.
    changeSearches_Clicked_Override_Callback?: () => void  //  Override Internal Behavior

    removeSearchesClickedCallback?: () => void  // ONLY render Remove Searches link when this is populated.  Render as "Remove Search" when  elect_ONLY_ONE_Search is true

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    searchSubGroup_SelectionsChanged_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback
    searchSubGroup_ManageGroupNames_Clicked_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_MainPage_Root_State {

    _placeHolder?: unknown
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

        if ( this.props.changeSearches_Clicked_Override_Callback ) {

            //  Override Function for "Change Searches" so call it instead

            this.props.changeSearches_Clicked_Override_Callback()

            return // EARLY RETURN
        }

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

        // const dataUpdated_Callback = () => {
        //
        //     //  Currently, this will not be called.  The browser will be taken to a new href in searchDetailsAndFilterBlock_ChangeSearches.changeSearches();
        //
        //     throw Error("No Call to 'dataUpdated_Callback()' Expected.  Inside private _openUserChangeSearches_Overlay_Callback()")
        //
        //     // const params = new SearchDetailsAndFilterBlock_UserInputInOverlay_FilterValuesChanged_Callback_Param();
        //     //
        //     // this.props.propValue.filterValuesChanged_Callback( params );
        // }

        const searchDetailsAndFilterBlock_Re_Order_Searches = new SearchDetailsAndFilterBlock_Re_Order_Searches({
            dataPageStateManager_DataFrom_Server : this.props.propValue.dataPageStateManager_DataFrom_Server,
            dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay : this.props.propValue.dataPageStateManager_ProjectSearchIdsTheirFiltersAnnTypeDisplay,
            searchDetailsBlockDataMgmtProcessing : this.props.propValue.searchDetailsBlockDataMgmtProcessing,
            callback_Before_ReadURLtoGenerateNewURL: this.props.propValue.callback_Before_ReadURLtoGenerateNewURL_ReOrderSearchesOverlay,
            // dataUpdated_Callback
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
                    select_ONLY_ONE_Search={ this.props.select_ONLY_ONE_Search }
                    propValue={ this.props.propValue }
                    openUserChangeFiltersOverlay_Callback={ this._openUserChangeFiltersOverlay_Callback_BindThis }
                    changeSearchesClickedCallback={ this._openUserChangeSearches_Overlay_Callback_BindThis }
                    changeSearchesOrderClickedCallback={ this._openUserChangeSearchesOrder_Overlay_Callback_BindThis }
                    removeSearchesClickedCallback={ this.props.removeSearchesClickedCallback }
                />
            );

        } else if ( filtersAnnTypeDisplayPerProjectSearchIds.length === 1 ) {

            const projectSearchId = filtersAnnTypeDisplayPerProjectSearchIds[ 0 ].projectSearchId;

            //  ProjectSearchId use for Single Search Root Component key to force unmount/mount when changes

            single_multiple_Root = (
                <SingleSearch_Only_Root
                    key={ projectSearchId }
                    select_ONLY_ONE_Search={ this.props.select_ONLY_ONE_Search }
                    propValue={ this.props.propValue }
                    searchSubGroup_CentralStateManagerObjectClass={ this.props.searchSubGroup_CentralStateManagerObjectClass }
                    openUserChangeFiltersOverlay_Callback={ this._openUserChangeFiltersOverlay_Callback_BindThis }
                    changeSearchesClickedCallback={ this._openUserChangeSearches_Overlay_Callback_BindThis }
                    removeSearchesClickedCallback={ this.props.removeSearchesClickedCallback }
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

    select_ONLY_ONE_Search: boolean  //  If true, User can select only ONE Search.

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    changeSearchesClickedCallback: () => void
    removeSearchesClickedCallback: () => void
    searchSubGroup_SelectionsChanged_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback
    searchSubGroup_ManageGroupNames_Clicked_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback
}

/**
 *
 */
interface SingleSearch_Only_Root_State {

    show_SearchTag_Categories?: boolean
}

/**
 *
 */
class SingleSearch_Only_Root extends React.Component< SingleSearch_Only_Root_Props, SingleSearch_Only_Root_State > {

    private _verboseView_CheckboxChanged_BindThis = this._verboseView_Checkbox_Changed.bind(this)

    /**
     *
     */
    constructor(props : SingleSearch_Only_Root_Props) {
        super(props);

        const show_SearchTag_Categories = Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.get_Value()

        this.state = { show_SearchTag_Categories };
    }

    /**
     *
     * @param event
     * @private
     */
    private _verboseView_Checkbox_Changed( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const show_SearchTag_Categories = event.target.checked

        this.setState( { show_SearchTag_Categories } )

        Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.save_Value( show_SearchTag_Categories )

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    } }

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
                <>
                    <ChangeSearches
                        select_ONLY_ONE_Search={ this.props.select_ONLY_ONE_Search }
                        changeSearchesClickedCallback={ this.props.changeSearchesClickedCallback }
                    />
                    { this.props.removeSearchesClickedCallback ? (
                        <RemoveSearches
                            select_ONLY_ONE_Search={ this.props.select_ONLY_ONE_Search }
                            removeSearchesClickedCallback={ this.props.removeSearchesClickedCallback }
                        />
                    ) : null }
                </>
            )
        }

        return (
            <React.Fragment>

                <div style={ {  } }>
                    <div>
                        Search:
                    </div>
                </div>
                <div style={ { gridColumnStart: 2, gridColumnEnd: "-1" } }>

                    <div style={ { marginBottom: _Verbose_View_ContainerDiv_MarginBottom_AllSearches } }>
                        <span
                            style={ _Verbose_View_ContainerSpan_Style }
                        >Verbose view: </span>
                        <span>
                            <input
                                type="checkbox"
                                checked={ this.state.show_SearchTag_Categories }
                                onChange={ this._verboseView_CheckboxChanged_BindThis }
                            />
                        </span>
                    </div>
                </div>
                <div style={ {  } }>
                    { changeSearchesJSX }
                </div>
                <SearchNameAndDetails_Root //   Inserts 2 columns in table
                    propValue={ this.props.propValue }
                    projectSearchId={ projectSearchId }
                    multipleSearchEntry={ false }
                    show_SearchTag_Categories={ this.state.show_SearchTag_Categories }
                />

                <Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root
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
                    limelight_Colors_For_SingleSearch__SubSearches={ undefined }  //  Only for QC Page
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

    select_ONLY_ONE_Search: boolean  //  If true, User can select only ONE Search.

    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue

    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    changeSearchesClickedCallback: () => void
    changeSearchesOrderClickedCallback: () => void
    removeSearchesClickedCallback: () => void
}

/**
 *
 */
interface MultipleSearch_Only_Root_State {

    show_SearchTag_Categories?: boolean
}

/**
 *
 */
class MultipleSearch_Only_Root extends React.Component< MultipleSearch_Only_Root_Props, MultipleSearch_Only_Root_State > {

    private _verboseView_Checkbox_Changed_BindThis = this._verboseView_Checkbox_Changed.bind(this)

    /**
     *
     */
    constructor(props : MultipleSearch_Only_Root_Props) {
        super(props);

        const show_SearchTag_Categories = Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.get_Value()

        this.state = { show_SearchTag_Categories };
    }

    /**
     *
     * @param event
     * @private
     */
    private _verboseView_Checkbox_Changed( event: React.ChangeEvent<HTMLInputElement> ) { try {

        const show_SearchTag_Categories = event.target.checked

        this.setState( { show_SearchTag_Categories } )

        Search_DisplayVerbose_Value_StoreRetrieve_In_SessionStorage.save_Value( show_SearchTag_Categories )

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    } }

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

                <div
                    key={ projectSearchId }
                    style={ { display: "grid", gridTemplateColumns: "max-content max-content auto", rowGap: 2, marginBottom: 3 } }
                >
                    <div>
                        {/* Comment out since not using the color anywhere else at the moment
                                   <span style="margin-right:10px;padding-left:10px;padding-right:10px; " class=" merged-search-search-background-color-{{ mergeColorId }}  "></span>
                                */}
                    </div>
                    <SearchNameAndDetails_Root //   Inserts 2 columns in table
                        propValue={ this.props.propValue }
                        projectSearchId={ projectSearchId }
                        multipleSearchEntry={ true }
                        show_SearchTag_Categories={ this.state.show_SearchTag_Categories }
                    />

                    <div></div>{/*  Spacer for Color Block  */}
                    <div></div>{/*  Spacer for Expand Search Icon  */}
                    <div>
                        <div
                            style={ { display: "grid", gridTemplateColumns: "max-content auto", rowGap: 2, marginBottom: 3 } }
                        >
                            <Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root
                                forMultipleSearches={ true }
                                propValue={ this.props.propValue }
                                openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                                annotationTypeDataForProjectSearchId={ annotationTypeDataForProjectSearchId }
                                searchProgramsPerSearchDataForProjectSearchId={ searchProgramsPerSearchDataForProjectSearchId }
                                filtersAnnTypeDisplay_For_Single_ProjectSearchId={ filtersAnnTypeDisplayPerProjectSearchId }
                            />
                        </div>
                    </div>
                </div>
            );

            singleSearchesInsideSearchesBlock.push( singleSearchEntry )
        }


        let changeSearchesJSX : JSX.Element = undefined

        if ( ( ! this.props.propValue.displayOnly ) && ( ! this.props.propValue.do_NOT_Display_ChangeSearches_Link ) ) {

            changeSearchesJSX = (
                <>
                    <ChangeSearches
                        select_ONLY_ONE_Search={ this.props.select_ONLY_ONE_Search }
                        changeSearchesClickedCallback={ this.props.changeSearchesClickedCallback }
                    />
                    { this.props.removeSearchesClickedCallback ? (
                        <RemoveSearches
                            select_ONLY_ONE_Search={ this.props.select_ONLY_ONE_Search }
                            removeSearchesClickedCallback={ this.props.removeSearchesClickedCallback }
                        />
                    ) : null }
                </>
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
                <div style={ { paddingRight: 5 } }>
                    <div>
                        Searches:
                    </div>
                    { changeSearchesJSX }
                    { reorderSearchesJSX }
                </div>
                <div>

                    <div
                        style={ { marginBottom: _Verbose_View_ContainerDiv_MarginBottom_AllSearches + _Verbose_View_ContainerDiv_MarginBottom_MultipleSearchAddition } }>
                        <span
                            style={ _Verbose_View_ContainerSpan_Style }
                        >Verbose view: </span>
                        <span>
                            <input
                                type="checkbox"
                                checked={ this.state.show_SearchTag_Categories }
                                onChange={ this._verboseView_Checkbox_Changed_BindThis }
                            />
                        </span>
                    </div>

                    { singleSearchesInsideSearchesBlock }
                </div>
            </React.Fragment>
        )
    }
}

////////////////////////////////////////

////   Remove searches component

/**
 *
 */
interface RemoveSearches_Props {

    select_ONLY_ONE_Search: boolean  //  If true, User can select only ONE Search.

    removeSearchesClickedCallback: () => void
}

/**
 *
 */
class RemoveSearches_State {

    placeholder?: unknown
}

/**
 *
 */
class RemoveSearches extends React.Component< RemoveSearches_Props, RemoveSearches_State > {

    /**
     *
     */
    constructor(props: RemoveSearches_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <div >
                <span className={" fake-link "} style={ { fontSize : 12, whiteSpace : "nowrap" } } onClick={ this.props.removeSearchesClickedCallback }>
                    { this.props.select_ONLY_ONE_Search ? (
                        "Remove search"
                    ) : (
                        "Remove searches"
                    )}
                </span>
            </div>
        )
    }
}

////////////////////////////////////////

////   Change searches and Re-order searches components

/**
 *
 */
interface ChangeSearches_Props {

    select_ONLY_ONE_Search: boolean  //  If true, User can select only ONE Search.

    changeSearchesClickedCallback: () => void
}

/**
 *
 */
class ChangeSearches_State {

    placeholder?: unknown
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
                    { this.props.select_ONLY_ONE_Search ? (
                        "Change search"
                    ) : (
                        "Change searches"
                    )}
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

    changeSearchesOrderClickedCallback: () => void
}

/**
 *
 */
class ChangeSearchesOrder_State {

    placeholder?: unknown
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
    show_SearchTag_Categories: boolean
}

/**
 *
 */
class SearchNameAndDetails_Root_State {

    force_ReRender_Object?: object
}

/**
 *
 */
class SearchNameAndDetails_Root extends React.Component< SearchNameAndDetails_Root_Props, SearchNameAndDetails_Root_State > {

    private _changeSearchName_Clicked_BindThis = this._changeSearchName_Clicked.bind(this);

    private _searchName_Div_Ref: React.RefObject<HTMLDivElement>; //  React.createRef()

    private _showSearchDetails_Clicked_BindThis = this._showSearchDetails_Clicked.bind(this);
    private _hideSearchDetails_Clicked_BindThis = this._hideSearchDetails_Clicked.bind(this);
    private _searchName_Clicked_BindThis = this._searchName_Clicked.bind(this);
    private _add_Change_SearchTags_Clicked_BindThis = this._add_Change_SearchTags_Clicked.bind(this);

    private _showSearchDetails = false;
    private _searchDetails_EverShown : boolean = false;

    /**
     *
     */
    constructor(props : SearchNameAndDetails_Root_Props) {
        super(props);

        this._searchName_Div_Ref = React.createRef<HTMLDivElement>();

        this.state = {
            force_ReRender_Object : {}
        };
    }

    /**
     * If update and projectSearchId changed, remove Search Details from DOM and set showSearchDetails to false
     */
    componentDidUpdate(prevProps: Readonly<SearchNameAndDetails_Root_Props>, prevState: Readonly<SearchNameAndDetails_Root_State>, snapshot?: any): void {

        if ( prevProps.projectSearchId !== this.props.projectSearchId ) {
            this._showSearchDetails = false
            this.setState({ force_ReRender_Object: {} });
        }
    }

    /**
     *
     */
    componentWillUnmount(): void {

    }

    /**
     * Show Search Details
     */
    private _showSearchDetails_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        this._showSearchDetails = true

        this._searchDetails_EverShown = true

        this.setState({ force_ReRender_Object: {} });
    }

    /**
     * Hide Search Details
     */
    private _hideSearchDetails_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        this._showSearchDetails = false

        this.setState({ force_ReRender_Object: {} });
    }

    private _searchName_Clicked( event :  React.MouseEvent<HTMLImageElement, MouseEvent> ) {

        if ( this._showSearchDetails ) {
            this._showSearchDetails = false
        } else {
            this._showSearchDetails = true
            this._searchDetails_EverShown = true
        }

        this.setState({ force_ReRender_Object: {} });
    }

    ////////////////////////////////////////

    /**
     *
     * @param event
     */
    private _add_Change_SearchTags_Clicked() {  // Remove param so can pass to child component:  event: React.MouseEvent<HTMLSpanElement, MouseEvent>

        const searches: Array<Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch> = []

        const search: Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_Params_SingleSearch = {
            projectSearchId: this.props.projectSearchId
        }
        searches.push(search)

        const mainParams : Search_Tags_Manage_TagsForSearch_OverallTags_Version_2_MainParams = {
            searches, tagsChangedOnSearches_Callback: null
        }

        this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_open_Search_Tags_Manage_TagsForSearch_OverallTags_OverlayComponent_Overlay() ({
            mainParams
        })
    }

    /**
     *
     */
    private _changeSearchName_Clicked(event: React.MouseEvent<HTMLImageElement, MouseEvent>) {

        event.stopPropagation();

        if ( ! ( this.props.propValue &&
            this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory &&
            this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchName_and_SearchShortName_Change_Component__openOverlay() ) ) {

            const msg = "Should NEVER get here: in _changeSearchName_Clicked(...): ( ! ( this.props.propValue && this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory && this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchName_and_SearchShortName_Change_Component__openOverlay() ) )  "

            console.warn( msg )
            throw Error( msg )
        }

        const buttonContainer_BoundingRect = this._searchName_Div_Ref.current.getBoundingClientRect();

        let position_top =  buttonContainer_BoundingRect.top;
        let position_left =  buttonContainer_BoundingRect.left;

        const projectSearchId = this.props.projectSearchId

        const searchNamesMap_KeyProjectSearchId = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchNameObject ) {
            throw Error("No Search Name for projectSearchId: " + projectSearchId );
        }


        const change_Callback: SearchName_and_SearchShortName_Change_Component_Change_Callback =
            ( params: SearchName_and_SearchShortName_Change_Component_Change_Callback_Params ) : void => {

                limelight__ReloadPage_Function()

                // this.props.searchDisplayListItem.searchName = searchName_InputField_Value;
                // this.setState({ changeSearchName_Active: false });
            }

        this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchName_and_SearchShortName_Change_Component__openOverlay() ({
            projectSearchId,
            existingSearchName: searchNameObject.name,
            existingSearchShortName: searchNameObject.searchShortName,
            position_top,
            position_left,
            change_Callback,
            cancel_Callback: null
        })
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        const projectSearchId = this.props.projectSearchId;

        const searchNamesMap_KeyProjectSearchId = this.props.propValue.dataPageStateManager_DataFrom_Server.get_searchNames_AsMap();

        const searchTagIds_OnSearch_Set: Set<number> = new Set()

        const searchTagEntries_Filter_AllEntries: Array<Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTag_Entry> = []

        const searchTagCategory_Array_Filter_AllEntries: Array<Search_Tags_DisplaySearchTags_UnderSearchName_Component_SingleSearchTagCategory_Entry> = []

        {
            const searchTags_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_SearchTags_SearchTagCategories_Root()
            if ( searchTags_Root ) {
                const searchTags_For_ProjectSearchId = searchTags_Root.get_SearchTags_SearchTagCategories_ForProjectSearchId( projectSearchId );

                if ( searchTags_For_ProjectSearchId && searchTags_For_ProjectSearchId.entriesPerTag && searchTags_For_ProjectSearchId.entriesPerTag.length > 0 ) {


                    for ( const searchTag of searchTags_For_ProjectSearchId.entriesPerTag ) {

                        searchTagEntries_Filter_AllEntries.push({
                            tagId: searchTag.tag_id,
                            tagCategoryId: searchTag.tag_category_id,
                            tagString: searchTag.tag_string,
                            tag_Color_Background: searchTag.tag_Color_Background,
                            tag_Color_Font: searchTag.tag_Color_Font,
                            tag_Color_Border: searchTag.tag_Color_Border
                        })

                        searchTagIds_OnSearch_Set.add( searchTag.tag_id )
                    }

                    if ( searchTags_Root.get_SearchTags__Get_For_ProjectSearchIds_Result() && searchTags_Root.get_SearchTags__Get_For_ProjectSearchIds_Result().categories_Array ) {

                        for ( const category of searchTags_Root.get_SearchTags__Get_For_ProjectSearchIds_Result().categories_Array ) {

                            searchTagCategory_Array_Filter_AllEntries.push(category)
                        }
                    }

                }

            }

        }

        const search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root = {
            searchTagCategory_Array: searchTagCategory_Array_Filter_AllEntries, searchTag_Array: searchTagEntries_Filter_AllEntries
        }

        const annotationTypeData_Root : AnnotationTypeData_Root = this.props.propValue.dataPageStateManager_DataFrom_Server.get_annotationTypeData_Root();

        const annotationTypeDataForProjectSearchId = annotationTypeData_Root.annotationTypeItems_PerProjectSearchId_Map.get( projectSearchId );
        if ( ! annotationTypeDataForProjectSearchId ) {
            throw Error("No annotationTypeData for projectSearchId: " + projectSearchId );
        }

        const searchNameObject = searchNamesMap_KeyProjectSearchId.get( projectSearchId );
        if ( ! searchNameObject ) {
            throw Error("No Search Name for projectSearchId: " + projectSearchId );
        }

        const searchName_TD_Style : React.CSSProperties = { };

        if ( this.props.multipleSearchEntry ) {
            searchName_TD_Style.paddingBottom = 6;
        } else {
            searchName_TD_Style.paddingBottom = 3;
        }

        const searchDetailsContainer_div_Style : React.CSSProperties = {}
        if ( ! this._showSearchDetails ) {
            searchDetailsContainer_div_Style.display = "none";
        }

        let colorBlockForSearch_Color : string = undefined;
        if ( this.props.propValue.limelight_Colors_For_MultipleSearches ) {

            colorBlockForSearch_Color = "#" + this.props.propValue.limelight_Colors_For_MultipleSearches.get_Color_AsHexString_By_ProjectSearchId(projectSearchId);
        }

        let add_Change_SearchTags_Clicked_BindThis

        if ( this.props.propValue.dataPageStateManager_DataFrom_Server.get_userCanEditSearchTags() ) {

            // { Only if project owner }

            add_Change_SearchTags_Clicked_BindThis = this._add_Change_SearchTags_Clicked_BindThis;
        }

        return (
            <React.Fragment>
                <div style={ { marginRight: 3 } }>

                    { ( colorBlockForSearch_Color ) ? (
                        <span
                            style={ { marginRight: 10, paddingLeft: 10, paddingRight: 10, backgroundColor: colorBlockForSearch_Color } }
                        >
                        </span>
                    ): null }

                    { ( this._showSearchDetails ) ? (
                        <img className="icon-small fake-link-image "
                             onClick={ this._hideSearchDetails_Clicked_BindThis }
                             src="static/images/pointer-down.png"/>
                    ) : (
                        <img className="icon-small fake-link-image "
                             onClick={ this._showSearchDetails_Clicked_BindThis }
                             src="static/images/pointer-right.png"/>
                    )}
                </div>
                <div style={ searchName_TD_Style }>
                    <div >
                        <div
                            ref={ this._searchName_Div_Ref }
                        >
                            <span
                                className=" clickable "
                                style={ { overflowWrap: "break-word" } }
                                onClick={ this._searchName_Clicked_BindThis }
                            >
                                { searchNameObject.name }
                            </span>
                            { searchNameObject.searchShortName ? (
                                <>
                                    <span> </span>
                                    <span style={ { whiteSpace: "nowrap" } }>
                                        ({ searchNameObject.searchShortName })
                                    </span>
                                </>
                            ) : null }
                            <span> </span>
                            <span style={ { whiteSpace: "nowrap" } }>
                                <span>
                                    ({ searchNameObject.searchId })
                                </span>
                                { ( this.props.propValue &&
                                    this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory &&
                                    this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory.getFunction_searchName_and_SearchShortName_Change_Component__openOverlay() ) ? (
                                    <>
                                        <span> </span>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Edit name of search
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <img className="icon-small clickable "
                                                 src="static/images/icon-edit.png"
                                                 onClick={ this._changeSearchName_Clicked_BindThis }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </>
                                ) : null }
                            </span>
                        </div>

                        {/*  Search Tags for Search  */}
                        <div>
                            { search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root && search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root.searchTag_Array.length > 0 ? (
                                //  Have Search Tags for Search
                                <div>
                                    <Search_Tags_DisplaySearchTags_UnderSearchName_Component
                                        show_SearchTag_Categories={ this.props.show_SearchTag_Categories }
                                        searchTagIds_OnSearch_Set={ searchTagIds_OnSearch_Set }
                                        searchTagData_Root={ search_Tags_DisplaySearchTags_UnderSearchName_Component_SearchTagData_Root  }
                                        addTag_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                                        changeTags_Clicked_Callback={ add_Change_SearchTags_Clicked_BindThis }
                                    />
                                </div>
                            ) : (
                                //  NO Search Tags for Search
                                ( this.props.propValue.dataPageStateManager_DataFrom_Server.get_userCanEditSearchTags() ) ? (

                                    // { Only if project owner }
                                    <div>
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Add tags to this search
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <span
                                                className=" fake-link "
                                                onClick={ this._add_Change_SearchTags_Clicked_BindThis }
                                            >
                                                +Add Tag
                                            </span>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>
                                ) : null
                            ) }
                        </div>
                        {/*  END Search Tags  */}

                    </div>

                    {/* Search Detail Container */}

                    { this._searchDetails_EverShown ? (
                        <div style={ searchDetailsContainer_div_Style }>
                            <SearchDetailsAndFilterBlock_MainPage_SearchDetails_AllUsers_Component
                                key={ this.props.projectSearchId }  // NOT re-use for different projectSearchId
                                projectSearchId={ this.props.projectSearchId }
                                dataPages_LoggedInUser_CommonObjectsFactory={ this.props.propValue.dataPages_LoggedInUser_CommonObjectsFactory  }
                                searchDetails_AllUsers__GetDataFromServer_Result__Root__HolderObject={ null }
                                update_force_ReRender_EmptyObjectReference_Callback={ null }
                                force_Rerender_EmptyObjectReference={ null }
                                force_ReloadFromServer_EmptyObjectReference={ null }
                            />
                        </div>
                    ) : null }

                </div>
            </React.Fragment>
        )
    }
}


////////////////////////////////////////

////   Filters for A Search (PSM, Peptide, Protein)

/**
 *
 */
interface Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root_Props {

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
interface Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root_State {

    placeholder?: unknown
}

/**
 *
 */
class Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root extends React.Component< Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root_Props, Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root_State > {

    /**
     *
     */
    constructor(props : Internal__FiltersFor_A_Search__PSM_Peptide_Protein_Root_Props) {
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
        let modificationPositionFilters : JSX.Element = undefined;

        if ( annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes.size > 0 ) {

            psmFilters = (
                <Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_PSM }
                    type_label={ "PSM" }
                    type_label_ForTooltip_Plural={ "PSMs" }
                    type_label_TooltipText_Addition={ undefined }
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.psmFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.psmFilterableAnnotationTypes}
                />
            )
        }

        if ( annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes.size > 0 ) {

            peptideFilters = (
                <Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_PEPTIDE }
                    type_label={ "Peptide" }
                    type_label_ForTooltip_Plural={ "Peptides" }
                    type_label_TooltipText_Addition={ undefined }
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.reportedPeptideFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.reportedPeptideFilterableAnnotationTypes}
                />
            )
        }

        if ( annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes.size > 0 ) {

            proteinFilters = (
                <Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_PROTEIN }
                    type_label={ "Protein" }
                    type_label_ForTooltip_Plural={ "Proteins" }
                    type_label_TooltipText_Addition={ undefined }
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.matchedProteinFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.matchedProteinFilterableAnnotationTypes}
                />
            )
        }

        if ( annotationTypeDataForProjectSearchId.modificationPositionFilterableAnnotationTypes && annotationTypeDataForProjectSearchId.modificationPositionFilterableAnnotationTypes.size > 0 ) {

            modificationPositionFilters = (
                <Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root
                    forMultipleSearches={ this.props.forMultipleSearches }
                    propValue={this.props.propValue}
                    openUserChangeFiltersOverlay_Callback={this.props.openUserChangeFiltersOverlay_Callback}
                    typeIdentifierForOpenOverlay={ SearchDetailsAndFilterBlock_MainPage_INTERNAL_CONSTANTS.USER_CLICKED_IN_TYPE_MODIFICATION_POSITION }
                    type_label={ "Modification Position" }
                    type_label_ForTooltip_Plural={ "PSMs where All Modification Positions on PSM" }
                    type_label_TooltipText_Addition={ "Only applies to modifications that have annotations (scores)." }
                    cutoffs_ForType={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId.modificationPositionFilters}
                    filtersAnnTypeDisplay_For_Single_ProjectSearchId={this.props.filtersAnnTypeDisplay_For_Single_ProjectSearchId}
                    searchProgramsPerSearchDataForProjectSearchId={ this.props.searchProgramsPerSearchDataForProjectSearchId  }
                    filterableAnnotationTypes_ForType={annotationTypeDataForProjectSearchId.modificationPositionFilterableAnnotationTypes}
                />
            )
        }

        return (
            <React.Fragment>
                { psmFilters }
                { peptideFilters }
                { proteinFilters }
                { modificationPositionFilters }
            </React.Fragment>
        )
    }
}


////////////////////////////////////////

////   Filters for A Single Type (PSM, Peptide or Protein) for a Search

/**
 *
 */
interface Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_Props {

    forMultipleSearches : boolean
    propValue : SearchDetailsAndFilterBlock_MainPage_Root_Props_PropValue
    openUserChangeFiltersOverlay_Callback : OpenUserChangeFiltersOverlay_Callback
    typeIdentifierForOpenOverlay : string
    type_label : string
    type_label_ForTooltip_Plural : string
    type_label_TooltipText_Addition : string
    cutoffs_ForType : SearchDataLookupParams_Filter_Per_AnnotationType[]
    filtersAnnTypeDisplay_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
    searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId
    filterableAnnotationTypes_ForType : Map<number, AnnotationTypeItem>
}

/**
 *
 */
interface Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_State {

    placeholder?: unknown
}

/**
 *
 */
class Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root extends React.Component< Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_Props, Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_State > {

    private _filterTypeLabel_ClickHandler_BindThis = this._filterTypeLabel_ClickHandler.bind(this);

    /**
     *
     */
    constructor(props : Internal__FiltersFor_A_SingleType_OF__PSM_Peptide_Protein_Root_Props) {
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
                        type_label_ForTooltip_Plural={ this.props.type_label_ForTooltip_Plural }
                        type_label_TooltipText_Addition={ this.props.type_label_TooltipText_Addition }
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

            //  ONLY for Multiple Searches since positioned differently.  Set width to try to align across searches.  Does fail to align if have longer labels but most often used labels fit.

            //  Ideal solution would probably be to rewrite whole search details block with grid and use sub grid.

            filterLabel_TD_Style = { minWidth : 125 }
        }

        const editIcon_Style: React.CSSProperties = { marginLeft: 4, marginRight: 3 }

        if ( this.props.forMultipleSearches ) {

            //  ONLY for Multiple Searches since positioned differently.  Ensure space to right when have longer labels to left.

            editIcon_Style.marginRight = 10
        }

        return (
            <React.Fragment>

                <div className={ typeLabel_TD_ClassName } style={ filterLabel_TD_Style } onClick={ filterTypeLabel_ClickHandler }>

                    { this.props.type_label } Filters:
                    { ( this.props.propValue.displayOnly ) ? null :
                        (
                            <span style={ editIcon_Style }>
                               <img src="static/images/icon-edit.png" className=" icon-small " />
                            </span>
                        )
                    }
                </div>
                <div
                    style={ { gridColumnStart: 2, gridColumnEnd: "-1" } }
                >

                    { ( cutoffEntryComponents ) ? (
                        cutoffEntryComponents
                    ) : (
                        <React.Fragment>
                            <span className=" filter-single-value-display-block clickable " onClick={ filterTypeLabel_ClickHandler } >Showing All</span>
                            <span style={ { fontSize: 1 } }> </span>
                        </React.Fragment>
                    ) }
                </div>

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
    type_label_ForTooltip_Plural : string
    type_label_TooltipText_Addition : string
    cutoffItem: SearchDataLookupParams_Filter_Per_AnnotationType
    filtersAnnTypeDisplay_For_Single_ProjectSearchId: SearchDataLookupParams_For_Single_ProjectSearchId
    searchProgramsPerSearchDataForProjectSearchId : SearchProgramsPerSearchItems_PerProjectSearchId
    filterableAnnotationTypes_ForType : Map<number, AnnotationTypeItem>
}

/**
 *
 */
interface SingleFilterEntryDisplay_Root_State {

    placeholder?: unknown
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

        let filterDirection_Symbol = ""
        if ( filterableAnnotation_ForId.filterDirectionAbove ) {
            filterDirection_Symbol = ">="
        } else if ( filterableAnnotation_ForId.filterDirectionBelow ) {
            filterDirection_Symbol = "<="
        } else {
            const msg = "Error: Neither is true: filterableAnnotation_ForId.filterDirectionAbove and filterableAnnotation_ForId.filterDirectionBelow"
            console.warn(msg)
            throw Error(msg)
        }

        let cutoffEntryComponent_ClassName = " filter-single-value-display-block ";
        let filterValue_ClickHandler = undefined;

        const tooltip_Main_Props = limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer();

        const tooltip_Text = "Only " + this.props.type_label_ForTooltip_Plural + " with score '" + annotationName + "' " + filterDirection_Symbol + " " + cutoffItem.value + " will be included."

        const tooltip_Element_Main = (
            <div>
                { tooltip_Text }
            </div>
        )

        let tooltip_Element__Type_label_TooltipText_Addition: JSX.Element = undefined

        if ( this.props.type_label_TooltipText_Addition ) {

            tooltip_Element__Type_label_TooltipText_Addition = (
                <div
                    style={ { marginTop: 10 } }
                >
                    { this.props.type_label_TooltipText_Addition }
                </div>
            )
        }

        let tooltip_Element_Addition_For_NonDefault: JSX.Element = undefined

        if ( filterableAnnotation_ForId.defaultFilterValue !== cutoffItem.value ) {

            cutoffEntryComponent_ClassName += " not-default-value "

            tooltip_Element_Addition_For_NonDefault = (
                <div
                    style={ { marginTop: 10 } }
                >
                    This filter value has been changed from the import defaults for this search.
                </div>
            )
        }

        if ( ! this.props.propValue.displayOnly ) {
            cutoffEntryComponent_ClassName += " clickable "
            filterValue_ClickHandler = this._filterValue_ClickHandler_BindThis;
        }

        const tooltip_Element = (
            <div>
                { tooltip_Element_Main }
                { tooltip_Element__Type_label_TooltipText_Addition }
                { tooltip_Element_Addition_For_NonDefault }
            </div>
        )

        return (
            <React.Fragment>
                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                    title={ tooltip_Element }
                    { ...tooltip_Main_Props }
                >
                    <span className={ cutoffEntryComponent_ClassName } onClick={ filterValue_ClickHandler }
                    >
                        { annotationName } ({ searchProgramName }): { cutoffItem_Value }
                    </span>
                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                <span style={ { fontSize : 1 } }> </span>
            </React.Fragment>
        )
    }
}

