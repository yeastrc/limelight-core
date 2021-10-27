/**
 * limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex.tsx
 *
 * Cover with Standard Background at Higher Z Index with Spinner On Top centered in viewport
 */

import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import React from "react";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";


/**
 *
 */
export const open_Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex = function () : Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex_Holder {

    const overlayComponent = (
        <Component />
    )

    const limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })

    const result = new Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex_Holder(
        limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder
    );

    return result;
}


export class Limelight_CoverWith_Spinner_On_StandardBackground_HigherZIndex_Holder {

    private limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder :  Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    constructor(limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder: Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF) {
        this.limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder = limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder;
    }

    removeCover() : void {
        this.limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    };

}

/////////

//  React Component

/**
 *
 */
interface Component_Props {

    _placeholder?: any
}

/**
 *
 */
interface Component_State {

    _placeholder?: any
}

/**
 *
 */
class Component extends React.Component< Component_Props, Component_State > {

    /**
     *
     */
    constructor(props: Component_Props) {
        super(props);

        this.state = {};
    }

    /**
     *
     */
    render() {

        return (

            <div>
                <div className=" modal-overlay-page-background modal-overlay-page-background-higher-z-index "  >
                </div>

                <div
                    className=" modal-overlay-page-background-higher-z-index-plus-1 "
                    style={ { position: "fixed", left: "50vw", top: "50vh" } }
                >
                    <Spinner_Limelight_Component/>
                </div>

            </div>
        )
    }
}
