/**
 * sharePage_Overlay_Component_React.tsx
 *
 * Share Page Overlay as React Component
 */


import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";


const _Overlay_Title = "URL Shortcut"

const _Overlay_Width_Min = 550;
const _Overlay_Width_Max = 550;
const _Overlay_Height_Min = 150;
const _Overlay_Height_Max = 150;


/**
 *
 * @param urlShortcutString
 * @param callbackOn_Close_Clicked
 */
export const getSharePage_Overlay_Component = function (
    {
        urlShortcutString,
        callbackOn_Close_Clicked
    } : {
        urlShortcutString : string
        callbackOn_Close_Clicked: () => void;

    }) : JSX.Element {

    return (
        <SharePage_Overlay_Component
            urlShortcutString={ urlShortcutString }
            callbackOn_Close_Clicked={ callbackOn_Close_Clicked }
        />
    );
}


/**
 *
 */
class SharePage_Overlay_Component_Props {

    urlShortcutString : string
    callbackOn_Close_Clicked: () => void;
}

/**
 *
 */
class SharePage_Overlay_Component_State {

    _placeholder: any  // Used so don't put anything in the state
}

/**
 *
 */
class SharePage_Overlay_Component extends React.Component< SharePage_Overlay_Component_Props, SharePage_Overlay_Component_State > {

    /**
     *
     */
    constructor(props : SharePage_Overlay_Component_Props) {
        super(props);
    }

    /**
     *
     */
    render() {

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this.props.callbackOn_Close_Clicked }
                close_OnBackgroundClick={ false }>

                <div className=" change-searches-overlay-outer-block top-level single-entry-variable-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right standard-border-color-medium"
                >
                    <div>
                        { this.props.urlShortcutString}
                    </div>
                    <div style={ { marginTop: 15 } }>
                        <div>
                            Use this URL to share this page and all current options with authorized users.
                        </div>
                        <div>
                            This URL does not provide access rights to anyone with the URL.
                        </div>
                    </div>
                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }

}




