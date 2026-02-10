/**
 * modPage_ZScore_SubSearchSelection_Overlay.tsx
 *
 * Change Sub Searches Selections Overlay - For selecting which sub searches to display
 *
 *
 */

import React from 'react'

import {
    ModalOverlay_Limelight_Component_v001_B_FlexBox
} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {
    DataPageStateManager,
    SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry
} from "page_js/data_pages/data_pages_common/dataPageStateManager";
import { reportWebErrorToServer } from "page_js/common_all_pages/reportWebErrorToServer";
import {
    ModViewPage_DataVizOptions_VizSelections_PageStateManager,
    ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum
} from "page_js/data_pages/project_search_ids_driven_pages/mod_view_page/modViewPage_DataVizOptions_VizSelections_PageStateManager";

/////

const _Overlay_Title = "Choose the sub searches for ZScore Groups"


const _Overlay_Width_Min = 600;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 400;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export class ModPage_ZScore_SubSearchSelection_Overlay_Params {
    projectSearchIds_All : Array<number>
    modViewPage_DataVizOptions_VizSelections_PageStateManager: ModViewPage_DataVizOptions_VizSelections_PageStateManager
    dataPageStateManager_DataFrom_Server : DataPageStateManager
    callback_updateSelected_Searches : () => void
}

/**
 *
 * @param tableRows
 */
export const open_ModPage_ZScore_SubSearchSelection_Overlay = function( params: ModPage_ZScore_SubSearchSelection_Overlay_Params ) : void {

    let limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF

    const callbackOn_Cancel_Close_Clicked = () => {

        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = (
        <ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component
            props_value={ params }
            callbackOn_Cancel_Close_Clicked={ callbackOn_Cancel_Close_Clicked }
        />
    )

    limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

////  React Components



/**
 *
 */
interface ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component_Props {
    props_value: ModPage_ZScore_SubSearchSelection_Overlay_Params
    callbackOn_Cancel_Close_Clicked : () => void;
}

/**
 *
 */
interface ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component extends React.Component< ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component_Props, ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);

    //  Moved to function: _disable_updateButton
    // private _updateButton_Disabled: boolean = false

    private _searchSubGroups_Array: Readonly<Array<SearchSubGroups_EntryFor_SearchSubGroup__DataPageStateManagerEntry>>

    private _group_1_SubSearchIds_InProgress : Set<number>
    private _group_2_SubSearchIds_InProgress : Set<number>

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component_Props) { try {
        super(props);

        if ( props.props_value.projectSearchIds_All.length !== 1 ) {
            const msg = "ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component: ( props.props_value.projectSearchIds_All.length !== 1 )"
            console.warn(msg)
            throw Error(msg)
        }

        const projectSearchId = props.props_value.projectSearchIds_All[ 0 ]

        const searchSubGroups_Root = props.props_value.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root()
        if ( ! searchSubGroups_Root ) {
            const msg = "ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component: props.props_value.dataPageStateManager_DataFrom_Server.get_SearchSubGroups_Root() returned NOTHING"
            console.warn(msg)
            throw Error(msg)
        }

        const searchSubGroups_ForProjectSearchId = searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId )
        if ( ! searchSubGroups_ForProjectSearchId ) {
            const msg = "ModPage_ZScore_SubSearchSelection_Overlay_OuterContainer_Component: searchSubGroups_Root.get_searchSubGroups_ForProjectSearchId( projectSearchId ) returned NOTHING. projectSearchId: " + projectSearchId
            console.warn(msg)
            throw Error(msg)
        }

        this._searchSubGroups_Array = searchSubGroups_ForProjectSearchId.get_searchSubGroups_Array_OrderByDisplayOrder_OR_SortedOn_subgroupName_Display_ByServerCode()

        const searchGroups_For_ZScore_Selections = this.props.props_value.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections()

        this._group_1_SubSearchIds_InProgress = new Set( searchGroups_For_ZScore_Selections.get_SearchGroups().group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )
        this._group_2_SubSearchIds_InProgress = new Set( searchGroups_For_ZScore_Selections.get_SearchGroups().group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set )

        this.state = {
            force_Rerender: {}
        };

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    /**
     *
     */
    private _updateButtonClicked(  ) { try {

        if ( this._disable_updateButton() ) {
            //  supposed to be disabled
            return; // EARLY RETURN
        }

        const searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set: Set<number> = new Set()

        for ( const searchSubGroup of this._searchSubGroups_Array ) {
            if ( ( ! this._group_1_SubSearchIds_InProgress.has( searchSubGroup.searchSubGroup_Id ) )
                && ( ! this._group_2_SubSearchIds_InProgress.has( searchSubGroup.searchSubGroup_Id ) ) ) {
                searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set.add( searchSubGroup.searchSubGroup_Id )
            }
        }

        const projectSearchId_FOR_SubSearchIds = this.props.props_value.projectSearchIds_All[ 0 ]

        this.props.props_value.modViewPage_DataVizOptions_VizSelections_PageStateManager.get_searchGroups_For_ZScore_And_Histogram_Selections().set_SearchGroups({
            group_1_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: this._group_1_SubSearchIds_InProgress,
            group_2_SearchGroup_ProjectSearchIds_Or_SubSearchIds_Set: this._group_2_SubSearchIds_InProgress,
            searches_NOT_InAnyGroup_ProjectSearchIds_Or_SubSearchIds_Set,
            projectSearchId_FOR_SubSearchIds,
            projectSearchIds_Or_SubSearchIds_Enum: ModViewPage_DataVizOptions_VizSelections_PageStateManager__SearchGroups_For_ZScore_Selections__ProjectSearchIds_Or_SubSearchIds_Enum.SUB_SEARCH_IDS
        })

        this.props.props_value.callback_updateSelected_Searches()

        this.props.callbackOn_Cancel_Close_Clicked()

    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e } }

    /**
     *
     */
    private _disable_updateButton() {

        if ( this._group_1_SubSearchIds_InProgress.size === 0
            ||  this._group_2_SubSearchIds_InProgress.size === 0 ) {

            return true
        }
        return false
    }

    /**
     *
     */
    render(): React.ReactNode {

        const group_1_SearchNames_Elements: Array<React.JSX.Element> = []

        const group_2_SearchNames_Elements: Array<React.JSX.Element> = []

        const notIn_Group_SearchNames_Elements: Array<React.JSX.Element> = []

        for ( const searchSubGroup of this._searchSubGroups_Array ) {

            const subSearchDisplay = "(" + searchSubGroup.subgroupName_Display + ") " + searchSubGroup.searchSubgroupName_fromImportFile 

            if ( this._group_1_SubSearchIds_InProgress.has( searchSubGroup.searchSubGroup_Id ) ) {

                const element = (
                    <div
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 3 } }
                    >
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Remove sub search from Group 1
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {
                                    this._group_1_SubSearchIds_InProgress.delete( searchSubGroup.searchSubGroup_Id )

                                    this.setState({ force_Rerender: {} })
                                } }
                            >
                                Remove
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Move sub search to Group 2
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {
                                    this._group_1_SubSearchIds_InProgress.delete( searchSubGroup.searchSubGroup_Id )
                                    this._group_2_SubSearchIds_InProgress.add( searchSubGroup.searchSubGroup_Id )

                                    this.setState({ force_Rerender: {} })
                                } }
                            >
                                Group 2
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                        { subSearchDisplay }
                    </div>
                )

                group_1_SearchNames_Elements.push( element )

            } else if ( this._group_2_SubSearchIds_InProgress.has( searchSubGroup.searchSubGroup_Id ) ) {

                const element = (
                    <div
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 3 } }
                    >
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Remove sub search from Group 2
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {
                                    this._group_2_SubSearchIds_InProgress.delete( searchSubGroup.searchSubGroup_Id )

                                    this.setState({ force_Rerender: {} })
                                } }
                            >
                                Remove
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Move sub search to Group 1
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {
                                    this._group_2_SubSearchIds_InProgress.delete( searchSubGroup.searchSubGroup_Id )
                                    this._group_1_SubSearchIds_InProgress.add( searchSubGroup.searchSubGroup_Id )

                                    this.setState({ force_Rerender: {} })
                                } }
                            >
                                Group 1
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                        { subSearchDisplay }
                    </div>
                )

                group_2_SearchNames_Elements.push( element )

            } else {

                const element = (
                    <div
                        key={ searchSubGroup.searchSubGroup_Id }
                        style={ { marginBottom: 3 } }
                    >
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Move sub search to Group 1
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {
                                    this._group_1_SubSearchIds_InProgress.add( searchSubGroup.searchSubGroup_Id )

                                    this.setState({ force_Rerender: {} })
                                } }
                            >
                                Group 1
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                            title={
                                <span>
                                    Move sub search to Group 2
                                </span>
                            }
                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                        >
                            <button
                                onClick={ event => {
                                    this._group_2_SubSearchIds_InProgress.add( searchSubGroup.searchSubGroup_Id )

                                    this.setState({ force_Rerender: {} })
                                } }
                            >
                                Group 2
                            </button>
                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                        <span> </span>
                        { subSearchDisplay }
                    </div>
                )

                notIn_Group_SearchNames_Elements.push( element )
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


                <div
                    className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                    style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >

                    <div>
                        The sub searches are split into 2 groups (default to first half / second half) and the ZScores are
                        computed
                        between the two groups.
                    </div>

                    <div>
                        <div style={ { fontWeight: "bold", marginTop: 10, marginBottom: 5 } }>
                            Group 1 sub searches
                        </div>
                        <div style={ { marginLeft: 20 } }>
                            { group_1_SearchNames_Elements.length === 0 ? (
                                <div>
                                    NO sub searches in Group 1.  Sub searches are required in Group 1 and Group 2.
                                </div>
                            ) : (
                                group_1_SearchNames_Elements
                            )}
                        </div>

                        <div style={ { fontWeight: "bold", marginTop: 10, marginBottom: 5 } }>
                            Group 2 sub searches
                        </div>
                        <div style={ { marginLeft: 20 } }>
                            { group_2_SearchNames_Elements.length === 0 ? (
                                <div>
                                    NO sub searches in Group 2.  Sub searches are required in Group 1 and Group 2.
                                </div>
                            ) : (
                                group_2_SearchNames_Elements
                            )}
                        </div>

                        <div style={ { fontWeight: "bold", marginTop: 10, marginBottom: 5 } }>
                            Sub searches NOT in a group
                        </div>
                        <div style={ { marginLeft: 20 } }>
                            { notIn_Group_SearchNames_Elements.length === 0 ? (
                                <div>
                                    NO sub searches NOT in a group.
                                </div>
                            ) : (
                                notIn_Group_SearchNames_Elements
                            )}
                        </div>
                    </div>

                </div>
                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>

                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input
                                type="button" value="Change" style={ { marginRight: 5 } }
                                disabled={ this._disable_updateButton() }
                                onClick={ this._updateButtonClicked_BindThis }
                            />
                            { this._disable_updateButton() ? (
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Group 1 and Group 2 must each have at least one sub search
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                    >
                                    </div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ) : null }
                        </div>
                        <span> </span>

                        <input type="button" value="Cancel" onClick={ this.props.callbackOn_Cancel_Close_Clicked } />
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
