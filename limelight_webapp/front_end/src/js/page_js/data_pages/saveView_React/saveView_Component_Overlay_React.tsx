/**
 * saveView_Component_React.tsx
 * 
 * Save View Overlay as React Component
 * 
 * 
 * 
 */

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";


const _Overlay_Title = "Save View"

const _Overlay_Width_Min = 800;
const _Overlay_Width_Max = 800;
const _Overlay_Height_Min = 180;
const _Overlay_Height_Max = 180;


/**
 *
 */
export interface SaveView_Overlay_Component_Save_Callback_Params {
    label : string
}

export type SaveView_Overlay_Component_Save_Callback_Type = ( params : SaveView_Overlay_Component_Save_Callback_Params ) => void

/**
 *
 * @param urlShortcutString
 * @param callbackOn_Close_Clicked
 */
export const getSaveView_Overlay_Component = function (
    {
        saveView_Overlay_Component_Save_Callback,
        callbackOn_Close_Clicked
    } : {
        saveView_Overlay_Component_Save_Callback : SaveView_Overlay_Component_Save_Callback_Type
        callbackOn_Close_Clicked: () => void;

    }) : JSX.Element {

    return (
        <SaveView_Overlay_Component
            saveView_Overlay_Component_Save_Callback={ saveView_Overlay_Component_Save_Callback }
            callbackOn_Close_Clicked={ callbackOn_Close_Clicked }
        />
    );
}


/**
 *
 */
class SaveView_Overlay_Component_Props {

    saveView_Overlay_Component_Save_Callback : SaveView_Overlay_Component_Save_Callback_Type;
    callbackOn_Close_Clicked: () => void;
}

/**
 *
 */
class SaveView_Overlay_Component_State {

    label: string  // Used so don't put anything in the state
}

/**
 *
 */
class SaveView_Overlay_Component extends React.Component< SaveView_Overlay_Component_Props, SaveView_Overlay_Component_State > {

    private _labelInput_Changed_BindThis = this._labelInput_Changed.bind(this);
    private _saveButton_OnClick_BindThis = this._saveButton_OnClick.bind(this);

    private readonly _entry_Ref :  React.RefObject<HTMLInputElement>

    private _label : string;

    /**
     *
     */
    constructor(props : SaveView_Overlay_Component_Props) {
        super(props);

        this._entry_Ref = React.createRef();

        this._label = "";

        this.state = { label: this._label }
    }

    /**
     *
     * @private
     */
    private _labelInput_Changed() {

        this._label = this._entry_Ref.current.value;

        this.setState({ label: this._label });
    }

    private _saveButton_OnClick() {

        this.props.saveView_Overlay_Component_Save_Callback({ label: this._label });
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
                    <div style={ { marginBottom: 10 } }>
                        <span>Label for view:</span>
                        <input type="text" style={ { width: 600, marginLeft: 10 } } value={ this.state.label } onChange={ this._labelInput_Changed_BindThis } ref={ this._entry_Ref } />
                    </div>
                    <div style={ { position: "relative" } }>
                        <div>
                            <input
                                type="button"
                                value="Save This View"
                                autoFocus={ true }
                                disabled={ this.state.label === "" }
                                onClick={ this._saveButton_OnClick_BindThis }
                            />
                        </div>
                        { ( this.state.label === "" ) ? (
                            <div style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } } title="A label is required">
                            </div>
                        ) : null }
                    </div>

                </div>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }

}




