/**
 * peptidePage_Display_MainContent_Component__Loading_UpdatingOverlays.tsx
 *
 *
 */

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import React from "react";

//  Main Dialog

const _Overlay_Width_Min = 4800;
const _Overlay_Width_Max = 400;
const _Overlay_Height_Min = 300;
const _Overlay_Height_Max = 300;

/**
 *
 */
export const getpeptidePage_Display_MainContent_Component__UpdatingOverlay = function () : JSX.Element {

    return (
        <ModalOverlay_Limelight_Component_v001_B_FlexBox
            widthMinimum={ _Overlay_Width_Min }
            widthMaximum={ _Overlay_Width_Max }
            heightMinimum={ _Overlay_Height_Min }
            heightMaximum={ _Overlay_Height_Max }
            title={ null }
            callbackOnClicked_Close={ null }
            close_OnBackgroundClick={ false }
            titleBar_LeaveSpaceFor_CloseX={ true }
        >


            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
            >
                <div style={ { marginTop: 20, fontWeight: "bold", fontSize: 24, textAlign: "center" } }>
                    Updating Page
                </div>
                <div style={ { marginTop: 120, marginBottom: 80, textAlign: "center" }}>
                    <Spinner_Limelight_Component/>
                </div>
            </div>

        </ModalOverlay_Limelight_Component_v001_B_FlexBox>
    );
}