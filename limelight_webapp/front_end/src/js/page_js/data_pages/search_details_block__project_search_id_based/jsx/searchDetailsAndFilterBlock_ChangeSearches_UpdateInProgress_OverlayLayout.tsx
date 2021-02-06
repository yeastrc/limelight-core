/**
 * searchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout.tsx
 *
 * Change Searches Selections Update In Progress Overlay - For selecting which searches to display
 *
 *
 */

import React from 'react'
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ModalOverlay_No_Titlebar_Limelight_Component_v001} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_no_titlebar_React_V001/modal_overlay_no_titlebar_React_V001";

/////

const _Overlay_Width_Min = 500;
const _Overlay_Width_Max = 1200;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 1000;

//////

/**
 *
 */
export const get_SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_Layout = function(
    {
        // callbackOnClicked_Background
    } : {
        // callbackOnClicked_Background : () => void;

    }) : JSX.Element {

    return (
        <SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component
            // callbackOnClicked_Background={ callbackOnClicked_Background }
        />
    )
}


////  React Components

/**
 *
 */
interface SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component_Props {
    // callbackOnClicked_Background : () => void;
}

/**
 *
 */
interface SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component_State {

    _placeholder
}

/**
 *
 */
class SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component extends React.Component< SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component_Props, SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component_State > {

    private _unmountCalled = false;

    /**
     *
     */
    constructor(props: SearchDetailsAndFilterBlock_ChangeSearches_UpdateInProgress_OverlayLayout_OuterContainer_Component_Props) {
        super(props);

        // this.state = {};
    }

    /**
     *
     */
    // componentDidMount() {
    //
    // }

    /**
     *
     */
    componentWillUnmount() {

        this._unmountCalled = true;
    }

    /**
     *
     */
    render(): React.ReactNode {

        return (
            <ModalOverlay_No_Titlebar_Limelight_Component_v001
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                callbackOnClicked_Background={ /* this.props.callbackOnClicked_Background */ undefined }>


                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                     style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    // style={ { padding : 6 } }
                >

                    <div style={ { marginTop: 20, textAlign: "center" }}>
                        Updating Page for Search Selection
                    </div>
                    <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                        <Spinner_Limelight_Component/>
                    </div>

                </div>
            </ModalOverlay_No_Titlebar_Limelight_Component_v001>
        );
    }
}
