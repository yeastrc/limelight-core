/**
 * searchSubGroup_In_SearchDetailsOuterBlock.tsx
 *
 * Root of Search Sub Group section displayed within:
 *
 *      1)  the Search Details Outer Block at the top of the page
 *      2)  the "Filter On ..." section of the Single Protein overlay
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender
 *          (Root classes:
 *              SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_EmbedInSearchDetailsRootBlock_Root_Component
 *          )
 *      is to create a new propValue : SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root_Props_PropValue object
 *      and pass that as the props
 */


import React from 'react'
import {SearchSubGroup_CentralStateManagerObjectClass} from "page_js/data_pages/search_sub_group/search_sub_group_in_search_details_outer_block/js/searchSubGroup_CentralStateManagerObjectClass";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {DataPageStateManager} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import {Limelight_Colors_For_SingleSearch__SubSearches} from "page_js/data_pages/color_manager/limelight_Colors_For_SingleSearch__SubSearches";
import {
    Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
} from "page_js/common_all_pages/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component/tooltip__green_question_mark_in_circle__tooltip_on_hover__react_component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";



/**
 * Create new Instance of this class whenever any value changes in any of these properties so that this component will re-render
 */
export class SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData {

    searchSubGroupEntryArray : Array<SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup>
    // displayOnly : boolean // No Click Handlers for changing ...
    // dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory

    constructor(
        {
            searchSubGroupEntryArray
            // displayOnly, // No Click Handlers for changing Filters (PSM, Peptide, Protein)
            // dataPages_LoggedInUser_CommonObjectsFactory,
        } : {
            searchSubGroupEntryArray : Array<SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup>
            // displayOnly : boolean // No Click Handlers for changing ...
            // dataPages_LoggedInUser_CommonObjectsFactory : DataPages_LoggedInUser_CommonObjectsFactory
        }) {

        this.searchSubGroupEntryArray = searchSubGroupEntryArray;
        // this.displayOnly = displayOnly
        // this.dataPages_LoggedInUser_CommonObjectsFactory = dataPages_LoggedInUser_CommonObjectsFactory
    }
}

/**
 * Create new Instance of this class whenever any value changes in any of these properties so that this component will re-render
 */
export class SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup {

    searchSubGroup_Id : Readonly<number>
    searchSubgroupName_fromImportFile : Readonly<string>
    // subgroupName_Display_FromServer_IfUserEnteredAValue : Readonly<string>  // null until user enters a value
    subgroupName_Display : Readonly<string> //  Computed on data load and can be updated by user

    selectedEntry : Readonly<boolean>

    constructor(
        {
            searchSubGroup_Id, searchSubgroupName_fromImportFile, // subgroupName_Display_FromServer_IfUserEnteredAValue,
            subgroupName_Display, selectedEntry
        } : {
            searchSubGroup_Id : Readonly<number>
            searchSubgroupName_fromImportFile : Readonly<string>
            // subgroupName_Display_FromServer_IfUserEnteredAValue : Readonly<string>
            subgroupName_Display : string
            selectedEntry : Readonly<boolean>
        }) {
        if ( selectedEntry === undefined || selectedEntry === null ) {
            const msg = "SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup:constructor: ( selectedEntry === undefined || selectedEntry === null ) "
            console.warn( msg )
            throw Error( msg )
        }
        this.searchSubGroup_Id = searchSubGroup_Id
        this.searchSubgroupName_fromImportFile = searchSubgroupName_fromImportFile
        // this.subgroupName_Display_FromServer_IfUserEnteredAValue = subgroupName_Display_FromServer_IfUserEnteredAValue;
        this.subgroupName_Display = subgroupName_Display;
        this.selectedEntry = selectedEntry;
    }
}

export type SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback = () => void

export type SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback = () => void

//   Shared Common Root Props

/**
 *
 */
export interface SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props {

    displayData : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
    searchSubGroup_CentralStateManagerObjectClass : SearchSubGroup_CentralStateManagerObjectClass
    searchSubGroup_SelectionsChanged_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_SelectionsChanged_Callback
    searchSubGroup_ManageGroupNames_Clicked_Callback : SearchSubGroup_In_SearchDetailsAndFilter_searchSubGroup_ManageGroupNames_Clicked_Callback
    limelight_Colors_For_SingleSearch__SubSearches : Limelight_Colors_For_SingleSearch__SubSearches  //  Only for QC Page "Filter On ..."
}

////

/**
 *
 */
interface SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root_State {

    _placeHolder: any
    // prev_PropValue? : SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root_Props_PropValue
}

/**
 * For Search Details Block
 *
 * Search Sub Group Selection Root Block for Embed in <SearchDetailsAndFilterBlock_MainPage_Root> React Component
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender
 *      is to create a new propValue : SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root_Props_PropValue object
 *      and pass that as the props
 */
export class SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_EmbedInSearchDetailsRootBlock_Root_Component extends React.Component< SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props, SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root_State > {

    private _manage_ClickHandler_BindThis = this._manage_ClickHandler.bind(this);
    private _updateSelected_SearchSubGroupIds_Add_BindThis = this._updateSelected_SearchSubGroupIds_Add.bind(this);
    private _updateSelected_SearchSubGroupIds_Remove_BindThis = this._updateSelected_SearchSubGroupIds_Remove.bind(this);

    /**
     *
     */
    constructor(props : SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props) {
        super(props);

        // this.state = {};
    }

    /**
     * Only update when propValue is new object.
     */
    shouldComponentUpdate(nextProps: Readonly<SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props>, nextState: Readonly<SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Root_State>, nextContext: any): boolean {

        if ( nextProps.displayData !== this.props.displayData ) {
            return  true
        }
        return false;
    }

    /**
     * "Manage" fake link clicked
     */
    private _manage_ClickHandler(  event: React.MouseEvent<HTMLDivElement, MouseEvent> ) : void {
        try {
            event.preventDefault();

            if ( this.props.searchSubGroup_ManageGroupNames_Clicked_Callback ) {
                this.props.searchSubGroup_ManageGroupNames_Clicked_Callback();
            } else {
                throw Error( "NO Value in this.props.searchSubGroup_ManageGroupNames_Clicked_Callback" );
            }
        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
            throw e;
        }
    }

    /**
     *
     */
    private _updateSelected_SearchSubGroupIds_Add( searchSubGroupId : number ) {

        //  Call common shared code:
        _updateSelected_SearchSubGroupIds_Add( searchSubGroupId, this.props );
    }

    /**
     *
     */
    private _updateSelected_SearchSubGroupIds_Remove( searchSubGroupId : number ) {

        //  Call common shared code:
        _updateSelected_SearchSubGroupIds_Remove( searchSubGroupId, this.props );
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        if ( ( ! this.props.displayData ) || ( ! this.props.displayData.searchSubGroupEntryArray ) || ( this.props.displayData.searchSubGroupEntryArray.length === 0 ) ) {

            //  Nothing to display so return null

            return null;  //  EARLY RETURN
        }

        const searchSubGroupsJSX = new Array<JSX.Element>()

        for ( const searchSubGroupEntry of this.props.displayData.searchSubGroupEntryArray ) {

            {
                const jsxEntry = (
                    <SearchSubGroup_Entry
                        key={ searchSubGroupEntry.searchSubGroup_Id }
                        searchSubGroupEntry={ searchSubGroupEntry }
                        updateSelected_SearchSubGroupIds_Add={ this._updateSelected_SearchSubGroupIds_Add_BindThis }
                        updateSelected_SearchSubGroupIds_Remove={ this._updateSelected_SearchSubGroupIds_Remove_BindThis }
                        limelight_Colors_For_SingleSearch__SubSearches={ this.props.limelight_Colors_For_SingleSearch__SubSearches }
                    />
                )
                searchSubGroupsJSX.push( jsxEntry )
            }
        }

        return (
            <React.Fragment>
                <tr >
                    <td style={ { verticalAlign : "top" } }>
                        <div style={ { whiteSpace : "nowrap" } }>
                            Sub Searches:
                        </div>
                        { ( this.props.searchSubGroup_ManageGroupNames_Clicked_Callback ) ?
                            <div >
                                <span
                                    className=" fake-link " style={ { fontSize: 12, whiteSpace : "nowrap" } }
                                    onClick={ this._manage_ClickHandler_BindThis }
                                >
                                    Manage
                                </span>
                            </div>
                        : null }
                    </td>
                    <td colSpan={ 5 }  style={ { verticalAlign : "top" } }>
                        <div className={ "filter-common-block-selection-outer-block" } style={ { marginBottom: 3 } } >
                            { searchSubGroupsJSX }
                        </div>
                    </td>
                </tr>
            </React.Fragment>
        )
    }
}

////////////


////


/**
 *
 */
export interface SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component_Props extends SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props {

    projectSearchId: number
    dataPageStateManager : DataPageStateManager
}

/**
 *
 */
interface SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_State {

    _placeHolder: any
    // prev_PropValue? : SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Props_PropValue
}

/**
 * For Single Protein "Filter On ..." Block
 *
 * Search Sub Group Selection Root Block for Embed in <SearchDetailsAndFilterBlock_MainPage_Root> React Component
 *
 * !!!!  WARNING:
 *
 *      The way to make this rerender
 *      is to create a new propValue : SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Props_PropValue object
 *      and pass that as the props
 */
export class SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component extends React.Component< SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component_Props, SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_State > {

    private _deselect_All_Clicked_BindThis = this._deselect_All_Clicked.bind(this);
    private _select_All_Clicked_BindThis = this._select_All_Clicked.bind(this);

    private _updateSelected_SearchSubGroupIds_Add_BindThis = this._updateSelected_SearchSubGroupIds_Add.bind(this);
    private _updateSelected_SearchSubGroupIds_Remove_BindThis = this._updateSelected_SearchSubGroupIds_Remove.bind(this);

    /**
     *
     */
    constructor(props : SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component_Props) {
        super(props);

        // this.state = {};
    }

    /**
     * NOT a React function override
     *
     * Called by this component and parent components
     *
     * @returns - true if component will render, false otherwise
     */
    static limelight_willComponentRender(
        {
            displayData
        } : {
            displayData : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData
        }
    ) : boolean {

        if ( ( ! displayData ) || ( ! displayData.searchSubGroupEntryArray ) || ( displayData.searchSubGroupEntryArray.length === 0 ) ) {

            //  Nothing to display so return false

            return false;  //  EARLY RETURN
        }

        return true;
    }

    /**
     * Only update when propValue is new object.
     */
    shouldComponentUpdate(nextProps: Readonly<SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component_Props>, nextState: Readonly<SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_State>, nextContext: any): boolean {

        if ( nextProps.displayData !== this.props.displayData ) {
            return  true
        }
        return false;
    }

    /**
     *
     */
    private _deselect_All_Clicked() {

        _deselect_All_Clicked_Update__searchSubGroup_CentralStateManagerObjectClass(this.props);
    }

    /**
     *
     */
    private _select_All_Clicked() {

            _select_All_Clicked_Update__searchSubGroup_CentralStateManagerObjectClass(this.props);
    }

    /**
     *
     */
    private _updateSelected_SearchSubGroupIds_Add( searchSubGroupId : number ) {

        //  Call common shared code:
        _updateSelected_SearchSubGroupIds_Add( searchSubGroupId, this.props );
    }

    /**
     *
     */
    private _updateSelected_SearchSubGroupIds_Remove( searchSubGroupId : number ) {

        //  Call common shared code:
        _updateSelected_SearchSubGroupIds_Remove( searchSubGroupId, this.props );
    }

    ////////////////////////////////////////

    /**
     *
     */
    render() {

        if ( ! SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component.limelight_willComponentRender({ displayData: this.props.displayData }) ) {

            //  Nothing to display so return null

            return null;  //  EARLY RETURN
        }

        const searchSubGroupsJSX = new Array<JSX.Element>();

        for ( const searchSubGroupEntry of this.props.displayData.searchSubGroupEntryArray ) {

            //  For now, re-use CSS classes from Single Protein Filter
            // body.data-page .filter-common-block-selection-outer-block .filter-common-single-entry-outer-div
            {
                const jsxEntry = (
                    <SearchSubGroup_Entry
                        key={ searchSubGroupEntry.searchSubGroup_Id }
                        searchSubGroupEntry={ searchSubGroupEntry }
                        updateSelected_SearchSubGroupIds_Add={ this._updateSelected_SearchSubGroupIds_Add_BindThis }
                        updateSelected_SearchSubGroupIds_Remove={ this._updateSelected_SearchSubGroupIds_Remove_BindThis }
                        limelight_Colors_For_SingleSearch__SubSearches={ this.props.limelight_Colors_For_SingleSearch__SubSearches }
                    />
                )
                searchSubGroupsJSX.push( jsxEntry )
            }
        }

        const paddingTop_BothTopLevelDiv = 2;

        return (
            <React.Fragment>

                {/* Parent is CSS Grid with 2 Columns */}

                <div className=" filter-common-filter-label " style={ { paddingTop: paddingTop_BothTopLevelDiv } }>

                    <div >
                        Filter On Sub Search:

                        <Tooltip__green_question_mark_in_circle__tooltip_on_hover__Component
                            title={
                                <span>
                                    Only peptides from the selected sub searches will be used to build the protein list.
                                    A sub search is typically a set of search results for a single run if multiple runs were combined for post processing.
                                </span>
                            }
                        />
                    </div>
                    { ( this.props.displayData.searchSubGroupEntryArray.length > 5 ) ? (
                        <div
                            style={ { fontSize: 12, fontWeight: "normal", marginBottom: 6 } }
                        >
                            <span
                                className=" fake-link "
                                style={ { marginRight: 8 } }
                                onClick={ this._deselect_All_Clicked_BindThis }
                            >
                                deselect all
                            </span>
                            <span
                                className=" fake-link "
                                onClick={ this._select_All_Clicked_BindThis }
                            >
                                select all
                            </span>
                        </div>
                    ) : null }
                </div>
                <div className=" filter-common-selection-block peptide-sequence-selection-block "  style={ { paddingTop: paddingTop_BothTopLevelDiv } }>
                    <div className=" filter-common-selection-inner-block ">
                        { searchSubGroupsJSX }
                    </div>
                </div>

            </React.Fragment>
        )
    }
}


////////////

//   Shared code between Root Components:

/**
 *
 * @param props
 */
const _deselect_All_Clicked_Update__searchSubGroup_CentralStateManagerObjectClass = function ( props : SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component_Props ) {

    props.searchSubGroup_CentralStateManagerObjectClass.set_selectedSearchSubGroupIds({ selectedSearchSubGroupIds: new Set() });
    if ( props.searchSubGroup_SelectionsChanged_Callback ) {
        props.searchSubGroup_SelectionsChanged_Callback()
    }
}

/**
 *
 * @param props
 */
const _select_All_Clicked_Update__searchSubGroup_CentralStateManagerObjectClass = function ( props : SearchSubGroup_In_SingleProtein_FilterOn_Block_Root_Component_Props ) {

    const projectSearchId = props.projectSearchId;
    const searchSubGroups_ForProjectSearchId = props.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId);
    if ( ! searchSubGroups_ForProjectSearchId ) {
        const msg = "props.dataPageStateManager.get_SearchSubGroups_Root().get_searchSubGroups_ForProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
        console.warn(msg);
        throw Error(msg);
    }

    const selectedSearchSubGroupIds : Set<number> = new Set();

    for ( const searchSubGroup of searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode() ) {
        selectedSearchSubGroupIds.add(searchSubGroup.searchSubGroup_Id);
    }


    props.searchSubGroup_CentralStateManagerObjectClass.set_selectedSearchSubGroupIds({ selectedSearchSubGroupIds });
    if ( props.searchSubGroup_SelectionsChanged_Callback ) {
        props.searchSubGroup_SelectionsChanged_Callback()
    }
}

/**
 *
 */
const _updateSelected_SearchSubGroupIds_Add = function ( searchSubGroupId : number, props : SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props ) {

    let selectedSearchSubGroupIds = props.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds();
    if ( ! selectedSearchSubGroupIds ) {
        selectedSearchSubGroupIds = new Set<number>()
    }
    selectedSearchSubGroupIds.add( searchSubGroupId )
    if ( selectedSearchSubGroupIds.size === props.displayData.searchSubGroupEntryArray.length ) {
        selectedSearchSubGroupIds = undefined; // Optimization to set to undefined if all selected or none are selected
    }
    props.searchSubGroup_CentralStateManagerObjectClass.set_selectedSearchSubGroupIds({ selectedSearchSubGroupIds });
    if ( props.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {
        props.searchSubGroup_CentralStateManagerObjectClass.set_no_selectedSearchSubGroupIds({ no_selectedSearchSubGroupIds : false })
    }
    if ( props.searchSubGroup_SelectionsChanged_Callback ) {
        props.searchSubGroup_SelectionsChanged_Callback()
    }
}
/**
 *
 */
const _updateSelected_SearchSubGroupIds_Remove = function ( searchSubGroupId : number, props : SearchSubGroup_In_SearchDetailsAndFilterOuterBlock_Common_Root_Props ) {

    let selectedSearchSubGroupIds = props.searchSubGroup_CentralStateManagerObjectClass.get_selectedSearchSubGroupIds();
    if ( ! selectedSearchSubGroupIds ) {
        selectedSearchSubGroupIds = new Set<number>()
        if ( ! props.searchSubGroup_CentralStateManagerObjectClass.get_no_selectedSearchSubGroupIds() ) {
            // Optimization to set to undefined if all selected or none are selected
            //  Now need to populate for all entries since will remove one
            for ( const searchSubGroupEntry of props.displayData.searchSubGroupEntryArray ) {
                selectedSearchSubGroupIds.add( searchSubGroupEntry.searchSubGroup_Id )
            }
        }
    }
    selectedSearchSubGroupIds.delete( searchSubGroupId )
    if ( selectedSearchSubGroupIds.size === 0 ) {
        props.searchSubGroup_CentralStateManagerObjectClass.set_no_selectedSearchSubGroupIds({ no_selectedSearchSubGroupIds : true })
        selectedSearchSubGroupIds = undefined
    }
    props.searchSubGroup_CentralStateManagerObjectClass.set_selectedSearchSubGroupIds({ selectedSearchSubGroupIds });

    if ( props.searchSubGroup_SelectionsChanged_Callback ) {
        props.searchSubGroup_SelectionsChanged_Callback()
    }
}



////////////////

//   One Subgroup Entry

/**
 *
 */
interface SearchSubGroup_Entry_Props {

    searchSubGroupEntry : SearchSubGroup_In_SearchDetailsAndFilter_Component_DisplayData_Single_SearchSubGroup
    updateSelected_SearchSubGroupIds_Add : ( searchSubGroupId : number ) => void
    updateSelected_SearchSubGroupIds_Remove : ( searchSubGroupId : number ) => void
    limelight_Colors_For_SingleSearch__SubSearches : Limelight_Colors_For_SingleSearch__SubSearches  //  Only for QC Page "Filter On ..."
}

/**
 *
 */
interface SearchSubGroup_Entry_State {

    _placeHolder: any
}

/**
 *
 *
 */
 class SearchSubGroup_Entry extends React.Component< SearchSubGroup_Entry_Props, SearchSubGroup_Entry_State > {

     private _checkboxChangeEvent_BindThis = this._checkboxChangeEvent.bind(this)

    /**
     *
     */
    constructor(props: SearchSubGroup_Entry_Props) {
        super(props);

        // this.state = {};
    }

    private _checkboxChangeEvent( event : React.ChangeEvent<HTMLInputElement> ) {

        // event.preventDefault() -- Must NOT have this statement

        if ( this.props.searchSubGroupEntry.selectedEntry ) {
            this.props.updateSelected_SearchSubGroupIds_Remove( this.props.searchSubGroupEntry.searchSubGroup_Id )
        } else {
            this.props.updateSelected_SearchSubGroupIds_Add( this.props.searchSubGroupEntry.searchSubGroup_Id )
        }
    }

    render() {

        let colorBlockForSearchSubGroup_Color : string = undefined;
        if ( this.props.limelight_Colors_For_SingleSearch__SubSearches ) {

            colorBlockForSearchSubGroup_Color = "#" + this.props.limelight_Colors_For_SingleSearch__SubSearches.get_Color_AsHexString_By_SearchSubGroupId(this.props.searchSubGroupEntry.searchSubGroup_Id);
        }

        return (
                <div className={ "filter-common-single-entry-outer-div" }>
                    <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                        title={
                            <span>
                                { this.props.searchSubGroupEntry.searchSubgroupName_fromImportFile }
                            </span>
                        }
                        { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                    >
                        <label>
                            <input type="checkbox" checked={ this.props.searchSubGroupEntry.selectedEntry } onChange={ this._checkboxChangeEvent_BindThis } />

                            { ( colorBlockForSearchSubGroup_Color ) ? (
                                <span
                                    style={ { marginLeft: 3, marginRight: 3, paddingLeft: 10, paddingRight: 10, backgroundColor: colorBlockForSearchSubGroup_Color } }
                                >
                                </span>
                            ): null }
                            { this.props.searchSubGroupEntry.subgroupName_Display }
                        </label>
                    </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                </div>
        )
    }

}
