/**
 * manageTermsOfService_MaintOverlay.tsx
 *
 * Javascript for webappAdminConfiguration.jsp page
 *
 * Manage Terms of Service - Add/change
 */


import React from 'react'
import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";


const _Overlay_Title__Add = "Add Terms of Service"
const _Overlay_Title__Change = "Change Terms of Service"

const _Overlay_Width_Min = 800;
const _Overlay_Width_Max = 800;

const _Overlay_Height_Min = 600;
const _Overlay_Height_Max = 600;


export class ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_CallbackParams {

    termsOfServiceText_NewValue : string
}

export type ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_Callback =
    ( params: ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_CallbackParams ) => void;

/**
 *
 */
export interface ManageTermsOfService_MaintOverlayComponent__Component_Params {

    termsOfServiceText_ExistingValue : string
    callbackOn_Cancel_Close_Clicked:  () => void
    callbackOn_Save_Clicked: ManageTermsOfService_MaintOverlayComponent__Component_SaveClicked_Callback
}

/**
 *
 */
export const open_manageTermsOfService_MaintOverlay = function (
    {
        params
    } : {
        params: ManageTermsOfService_MaintOverlayComponent__Component_Params

    }) : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    const overlayComponent = (
        <ManageTermsOfService_MaintOverlayComponent__Component
            params={ params }
        />
    )

    const limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent });

    return limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder;
}


/**
 *
 */
export const open_configureLimelightForAdminPage_TermsOfService_SavingDataOverlay = function () : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF {

    //  Open "UPDATING Data" Overlay
    const overlayComponent = (
        <ManageTermsOfService__SavingDataOverlayComponent/>
    )

    const limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder =
        limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })

    return limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder;
}


////

/////////

//  React Components

///   !!!!!   Saving Component

/**
 *
 */
interface ManageTermsOfService__SavingDataOverlayComponent__Component_Props {

}

/**
 *
 */
interface ManageTermsOfService__SavingDataOverlayComponent__Component_State {

    _placeholder?: any
}

/**
 *
 */
class ManageTermsOfService__SavingDataOverlayComponent extends React.Component< ManageTermsOfService__SavingDataOverlayComponent__Component_Props, ManageTermsOfService__SavingDataOverlayComponent__Component_State > {

    /**
     *
     */
    constructor(props: ManageTermsOfService__SavingDataOverlayComponent__Component_Props) {
        super(props);

        this.state = {};
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
                title={ "Saving Data" }
                set_CSS_Position_Fixed={ true }
                callbackOnClicked_Close={ null } // No Close option
                titleBar_LeaveSpaceFor_CloseX={ true }
                close_OnBackgroundClick={ false } >

                <div
                    style={ { textAlign: "center", fontSize: 18, fontWeight: "bold", marginTop: 20 } }
                >
                    SAVING DATA
                </div>

                <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                    <Spinner_Limelight_Component/>
                </div>

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        )
    }
}


//////////

///   !!!!!   Main Top Level Component

/**
 *
 */
interface ManageTermsOfService_MaintOverlayComponent__Component_Props {

    params: ManageTermsOfService_MaintOverlayComponent__Component_Params
}

/**
 *
 */
interface ManageTermsOfService_MaintOverlayComponent__Component_State {

    addChangeButton_Disabled?: boolean
    forceRerenderObject?: object      //  Force Rerender object
}

/**
 *
 */
class ManageTermsOfService_MaintOverlayComponent__Component extends React.Component< ManageTermsOfService_MaintOverlayComponent__Component_Props, ManageTermsOfService_MaintOverlayComponent__Component_State > {

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    private readonly _inputTextArea_Text_Ref :  React.RefObject<HTMLTextAreaElement>

    private _addChangeButton_Disabled: boolean

    /**
     *
     */
    constructor(props: ManageTermsOfService_MaintOverlayComponent__Component_Props) {
        super(props);

        this._inputTextArea_Text_Ref = React.createRef();

        let addChangeButton_Disabled = true;
        if ( props.params.termsOfServiceText_ExistingValue !== undefined && props.params.termsOfServiceText_ExistingValue !== null && props.params.termsOfServiceText_ExistingValue !== "" ) {
            addChangeButton_Disabled = false;
        }
        this._addChangeButton_Disabled = addChangeButton_Disabled;

        this.state = {
            forceRerenderObject: {},
            addChangeButton_Disabled
        };
    }

    /**
     *
     */
    render() {

        let overlay_Title = _Overlay_Title__Add;
        let addChange_TextAboveInputField = 'Enter a Terms of Service and click "Add"';
        let addChange_ButtonLabel = "Add";
        let addChange_ButtonTooltip = "Add Terms of Service";

        if ( this.props.params.termsOfServiceText_ExistingValue !== undefined && this.props.params.termsOfServiceText_ExistingValue !== null ) {

            overlay_Title = _Overlay_Title__Change;
            addChange_TextAboveInputField = 'Change the Terms of Service and click "Change"';
            addChange_ButtonLabel = "Change";
            addChange_ButtonTooltip = "Change Terms of Service";
        }

        return (

            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ overlay_Title }
                set_CSS_Position_Fixed={ true }
                callbackOnClicked_Close={ this.props.params.callbackOn_Cancel_Close_Clicked }
                close_OnBackgroundClick={ false } >

                <React.Fragment>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginBottom: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div style={ { textAlign: "left" } }>
                            { addChange_TextAboveInputField }
                        </div>
                        <div style={ { textAlign: "left" } }>
                            The terms of service can contain HTML
                        </div>

                    </div>

                    <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right " // standard-border-color-medium
                         // style={ { overflowY: "auto", overflowX: "hidden", borderStyle: "solid", borderWidth: 1 } }
                    >
                        {/*  Main Body:  Scrollable Div  */}
                        <textarea
                            rows={20}
                            style={ { width: 757, margin: 0, height: 427 } }
                            defaultValue={ this.props.params.termsOfServiceText_ExistingValue }
                            onChange={ event => {
                                if ( this._inputTextArea_Text_Ref.current.value === "" ) {
                                    this.setState({ addChangeButton_Disabled: true });
                                    this._addChangeButton_Disabled = true;
                                } else {
                                    if ( this._addChangeButton_Disabled ) {
                                        this._addChangeButton_Disabled = false;
                                        this.setState({ addChangeButton_Disabled: false });
                                    }
                                }
                            }}
                            ref={ this._inputTextArea_Text_Ref }
                        ></textarea>

                    </div>

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                         style={ { marginTop: 12 } }
                        // style={ { padding : 6 } }
                    >
                        <div>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();

                                    const termsOfServiceText_FromInputField = this._inputTextArea_Text_Ref.current.value;

                                    //		Javascript to convert all line endings to '\n'
                                    const termsOfServiceText_NewValue = termsOfServiceText_FromInputField.replace(/(\r\n|\r|\n)/g, '\n');

                                    this.props.params.callbackOn_Save_Clicked({ termsOfServiceText_NewValue });
                                }}
                                disabled={ this.state.addChangeButton_Disabled }
                            >
                                { addChange_ButtonLabel }
                            </button>
                            <span> </span>
                            <button
                                onClick={ event => {
                                    event.stopPropagation();
                                    this.props.params.callbackOn_Cancel_Close_Clicked();
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>

                </React.Fragment>
            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}

