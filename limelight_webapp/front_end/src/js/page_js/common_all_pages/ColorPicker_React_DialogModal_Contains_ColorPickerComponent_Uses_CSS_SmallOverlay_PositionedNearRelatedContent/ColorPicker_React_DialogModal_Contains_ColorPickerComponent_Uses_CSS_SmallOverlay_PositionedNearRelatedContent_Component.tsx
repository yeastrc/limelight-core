/**
 * ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component.tsx
 *
 * Javascript React Component
 *
 * Color Picker - Contains a third party color picker "react-colorful"
 */


import React from "react";
import { HexColorPicker } from "react-colorful";


import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

///////

export interface ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params {
    newColor: string
}

export type ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback =
    (params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params) => void

export interface ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay__FunctionParams {
    existingColor: string
    position_top: number
    position_left: number
    change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback
    cancel_Callback: () => void
}

export type ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay__FunctionType =
    ( params : ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const colorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay__FunctionType = function (
    params: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay__FunctionParams
) : void {

    if ( params.position_top < 10 ) {
        params.position_top = 10;
    }

    if ( params.position_left < 10 ) {
        params.position_left = 10;
    }

    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback_Params ) => {

        const newColor: string = params_To_change_Callback_Local.newColor;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ newColor });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component
            openOverlay__FunctionParams={ params }
            change_Callback={ change_Callback_Local }
            cancel_Callback={ cancel_Callback_Local }
        />
    );

    addedOverlay = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd });
}

///////

/**
 *
 */
interface ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Props {

    openOverlay__FunctionParams: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component__openOverlay__FunctionParams

    change_Callback: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_State {

    color_InProgress? : string

    show_SavingMessage?: boolean
}

/**
 *
 */
class ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component extends React.Component< ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Props, ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_State > {

    private _mainDiv_Ref : React.RefObject<HTMLDivElement>; //  React.createRef()

    private _position_Top: number
    private _position_Left: number

    /**
     *
     */
    constructor(props: ColorPicker_React_DialogModal_Contains_ColorPickerComponent_Uses_CSS_SmallOverlay_PositionedNearRelatedContent_Component_Props) {
        super(props)

        this._mainDiv_Ref = React.createRef();

        this._position_Top = props.openOverlay__FunctionParams.position_top
        this._position_Left = props.openOverlay__FunctionParams.position_left

        this.state = {
            color_InProgress: props.openOverlay__FunctionParams.existingColor
        }
    }

    /**
     *
     */
    componentDidMount() {

        const mainDiv_BoundingRect = this._mainDiv_Ref.current.getBoundingClientRect()

        //  Adjust position LEFT and TOP if needed to get the overlay into the viewport

        {  //  position LEFT
            const width_OfContents = mainDiv_BoundingRect.width;

            const window_innerWidth = window.innerWidth - 10; // Subtract 10 for vertical scroll bar

            if ( window_innerWidth < ( this._position_Left + width_OfContents + 20 ) ) {  //  + 20 to allow margins and vertical scroll bar

                //  Need to position left to keep in viewport
                this._position_Left = window_innerWidth - width_OfContents - 20;

                if ( this._position_Left < 10 ) {
                    this._position_Left = 10
                }
            }
        }

        {  //  position TOP
            const height_OfContents = mainDiv_BoundingRect.height;

            const window_innerHeight = window.innerHeight - 10; // Subtract 10 for horizontal scroll bar

            if ( window_innerHeight < ( this._position_Top + height_OfContents + 20 ) ) {  //  + 20 to allow margins and vertical scroll bar

                //  Need to position left to keep in viewport
                this._position_Top = window_innerHeight - height_OfContents - 20;

                if ( this._position_Top < 10 ) {
                    this._position_Top = 10
                }
            }
        }

        this.forceUpdate()
    }

    /**
     *
     */
    render() { try {

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">
                </div>

                <div
                    ref={ this._mainDiv_Ref }
                    style={ { zIndex: 710, position: "fixed", top: this._position_Top, left: this._position_Left }}
                    className=" modal-dialog-small-positioned-near-related-content-container "
                >
                    <div style={ { padding: 20, position: "relative" } }>

                        <div>

                            <HexColorPicker
                                color={ this.state.color_InProgress }
                                onChange={ (newColor) => {
                                    try {

                                        // Require format #RRGGBB
                                        if ( ! ( /^#[0-9a-fA-F]{6}$/.test( newColor ) ) ) {
                                            const msg = "Color format of new color is NOT '#RRGGBB'.  New Color: " + newColor
                                            console.warn(msg)
                                            throw Error(msg)
                                        }

                                        this.setState({ color_InProgress: newColor })

                                    } catch ( e ) { reportWebErrorToServer.reportErrorObjectToServer( { errorException: e } ); throw e }
                                } }
                            />
                        </div>
                        <div style={ { marginTop: 5 }}>
                            <button
                                onClick={ event => {
                                    event.preventDefault();
                                    event.stopPropagation()
                                    this.props.change_Callback({ newColor: this.state.color_InProgress })
                                }}
                            >
                                Save
                            </button>
                            <span > </span>
                            <button
                                onClick={ ( event) => {
                                    event.preventDefault();
                                    event.stopPropagation()
                                    this.props.cancel_Callback()
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    )

    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }
    }

}
