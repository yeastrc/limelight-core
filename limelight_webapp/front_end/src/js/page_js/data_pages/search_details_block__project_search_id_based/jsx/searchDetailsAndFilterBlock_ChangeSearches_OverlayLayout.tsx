/**
 * searchDetailsAndFilterBlock_ChangeSearches_OverlayLayout.tsx
 *
 * Change Searches Selections Overlay - For selecting which searches to display
 *
 *
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {
    SearchSelection_DisplayedNestedInFolders_Component,
    SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object,
    SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback,
    SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params
} from "page_js/data_pages/search_selection__displayed_nested_in_folders__React_Component/searchSelection_DisplayedNestedInFolders_Component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

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
    updated_selected_ProjectSearchIds__Object: SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object //  undefined or null if NO changes since NO User interaction
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
        isProteinPage,
        callbackOn_Cancel_Close_Clicked,
        callback_updateSelected_Searches
    } : {
        projectIdentifier : string
        projectSearchIds_Selected : Array<number>
        isProteinPage: boolean
        callbackOn_Cancel_Close_Clicked : () => void;
        callback_updateSelected_Searches : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches

    }) : React.JSX.Element {

    return (
        <SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component
            projectIdentifier={ projectIdentifier }
            projectSearchIds_Selected={ projectSearchIds_Selected }
            isProteinPage={ isProteinPage }
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
    projectSearchIds_Selected : Array<number>
    isProteinPage: boolean
    callbackOn_Cancel_Close_Clicked : () => void;
    callback_updateSelected_Searches : SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component__Callback_updateSelected_Searches
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_State {

    force_Rerender?: object
}

/**
 *
 */
class SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component extends React.Component< SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_Props, SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_State > {

    private _updateButtonClicked_BindThis = this._updateButtonClicked.bind(this);

    private _callback__SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches_BindThis = this._callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches.bind(this);

    private _DONOTCALL() {

        const callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches: SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback =
            this._callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches
    }

    private _selected_Searches_Data_Object__Latest: SearchSelection_DisplayedNestedInFolders_Component__Selected_Searches_Data_Object

    private _updateButton_Disabled: boolean = false

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: SearchDetailsAndFilterBlock_ChangeSearches_Overlay_OuterContainer_Component_Props) {
        super(props);

        this.state = {
            force_Rerender: {}
        };
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
    private _callback__searchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches( params : SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches__Callback_Params ) {

        this._selected_Searches_Data_Object__Latest = params.selected_Searches_Data_Object

        let updateButton_Disabled = false;

        if ( ! this._selected_Searches_Data_Object__Latest.is_ANY_Search_Selected() ) {
            updateButton_Disabled = true;
        }

        this._updateButton_Disabled = updateButton_Disabled

        this.setState({ force_Rerender: {} })
    }

    /**
     *
     */
    private _updateButtonClicked(  ) {

        if ( this._updateButton_Disabled ) {
            //  supposed to be disabled
            return; // EARLY RETURN
        }

        this.props.callback_updateSelected_Searches({
            updated_selected_ProjectSearchIds__Object: this._selected_Searches_Data_Object__Latest
        })
    }

    /**
     *
     */
    render(): React.ReactNode {

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
                    <SearchSelection_DisplayedNestedInFolders_Component

                        select_ONLY_ONE_Search={ false }

                        notAllow_Selection_SearchesWithoutProteins={ this.props.isProteinPage } // more or less equivalent so use it

                        projectIdentifier={ this.props.projectIdentifier }
                        searchesSearchTagsFolders_Result_Root={ null } //  The component will load it since NOT passed in
                        projectSearchIds_Previously_Selected={ this.props.projectSearchIds_Selected }
                        projectSearchIds_ContainedInAllOtherExperimentCells={ null }  // Only for Experiment Definition
                        callback_updateSelected_Searches={ this._callback__SearchSelection_DisplayedNestedInFolders_Component__Update_Selected_Searches_BindThis }
                    />

                </div>
                <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    // style={ { padding : 6 } }
                >
                    <div style={ { marginTop: 15 } }>

                        <div style={ { position: "relative", display: "inline-block" } }>
                            <input
                                type="button" value="Change" style={ { marginRight: 5 } }
                                disabled={ this._updateButton_Disabled }
                                onClick={ this._updateButtonClicked_BindThis }
                            />
                            { this._updateButton_Disabled ? (
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            At least 1 search is required
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
