/**
 * goldStandard_Label_Description_Change_Component_and_WebserviceCall.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Feature Detection: Label and Description Change Component
 *
 */

import React from "react";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { GoldStandard_Max_FieldLengths_Constants } from "page_js/constants_across_webapp/gold_standard_constants/goldStandard_Max_FieldLengths_Constants";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

///////

export interface GoldStandard_Label_Description_Change_Component_Change_Callback_Params {
    newLabel: string
    newDescription: string
}

type GoldStandard_Label_Description_Change_Component_Change_Callback =
    (params: GoldStandard_Label_Description_Change_Component_Change_Callback_Params) => void

export interface GoldStandard_Label_Description_Change_Component__openOverlay__FunctionParams {
    goldStandardRoot_MappingTblId: number
    existingLabel: string
    existingDescription: string
    position_top: number
    position_left: number
    change_Callback: GoldStandard_Label_Description_Change_Component_Change_Callback
    cancel_Callback: () => void
}

export type GoldStandard_Label_Description_Change_Component__openOverlay__FunctionType =
    ( params : GoldStandard_Label_Description_Change_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const goldStandard_Label_Description_Change_Component__openOverlay: GoldStandard_Label_Description_Change_Component__openOverlay__FunctionType = function (
    params: GoldStandard_Label_Description_Change_Component__openOverlay__FunctionParams
) : void {

    if ( params.position_top > window.innerHeight - 160 ) {
        params.position_top = window.innerHeight - 160;
    }
    if ( params.position_top < 10 ) {
        params.position_top = 10;
    }

    if ( params.position_left < 10 ) {
        params.position_left = 10;
    }
    if ( params.position_left > 100 ) {
        params.position_left = 100;
    }

    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : GoldStandard_Label_Description_Change_Component_Change_Callback_Params ) => {

        const newLabel: string = params_To_change_Callback_Local.newLabel;
        const newDescription: string = params_To_change_Callback_Local.newDescription;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ newLabel, newDescription });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.cancel_Callback()
    }

    const componentToAdd = (
        <GoldStandard_Label_Description_Change_Component
            goldStandardRoot_MappingTblId={ params.goldStandardRoot_MappingTblId }
            existingLabel={ params.existingLabel }
            existingDescription={ params.existingDescription }
            position_top={ params.position_top }
            position_left={ params.position_left }
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
interface GoldStandard_Label_Description_Change_Component_Props {

    goldStandardRoot_MappingTblId: number
    existingLabel: string
    existingDescription: string

    position_top: number
    position_left: number

    change_Callback: GoldStandard_Label_Description_Change_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface GoldStandard_Label_Description_Change_Component_State {

    label_InProgress? : string
    label_InvalidValue?: boolean

    description_InProgress? : string
    description_InvalidValue?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class GoldStandard_Label_Description_Change_Component extends React.Component< GoldStandard_Label_Description_Change_Component_Props, GoldStandard_Label_Description_Change_Component_State > {

    private _label_Description_Input_Changed_BindThis = this._label_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _label_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()
    private _description_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _label_FromServer : string;
    private _description_FromServer : string;

    private _label_InvalidValue : boolean = false;
    private _description_InvalidValue : boolean = false;

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: GoldStandard_Label_Description_Change_Component_Props) {
        super(props)

        this._label_Input_Ref = React.createRef<HTMLInputElement>();
        this._description_Input_Ref = React.createRef<HTMLInputElement>();

        this._label_FromServer = props.existingLabel;
        this._description_FromServer = props.existingDescription;

        this.state = {
            label_InProgress: props.existingLabel,
            description_InProgress: props.existingDescription
        }
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
    private _get_Label_Description_InputFields_AndValidate() : {
        labelValue: string
        descriptionValue: string
        isValid: boolean
    } {
        this._label_InvalidValue = false; //  reset

        const label_Value = this._label_Input_Ref.current.value.trim();

        if ( label_Value.length === 0 ) {

            this.setState({ label_InvalidValue: true });
            this._label_InvalidValue = true;

        } else {

            this.setState({label_InvalidValue: false});
        }

        const description_Value = this._description_Input_Ref.current.value.trim();

        if ( description_Value.length === 0 ) {

            this.setState({ description_InvalidValue: true });
            this._description_InvalidValue = true;

        } else {

            this.setState({description_InvalidValue: false});
        }


        if ( this._label_InvalidValue || this._description_InvalidValue ) {
            return {isValid: false, labelValue: null, descriptionValue: null};  // EARLY EXIT
        }

        return { isValid: true, labelValue: label_Value, descriptionValue: description_Value }
    }

    /**
     *
     */
    private _label_Description_Input_Changed( event: React.ChangeEvent<HTMLInputElement> ) : void {

        const  {
            labelValue,
            isValid
        } = this._get_Label_Description_InputFields_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            if ( this._cancelButton_Clicked ) {
                //  User clicked "Cancel" button
                return; // EARLY RETURN
            }

            const  {
                labelValue,
                descriptionValue,
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            var requestData = {
                displayLabel: labelValue,
                description: descriptionValue,
                goldStandardRoot_MappingTblId: this.props.goldStandardRoot_MappingTblId
            };

            const url = "d/rws/for-page/gold-standard-display-label-description-change";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.successful ) {

                        this.props.change_Callback({newLabel: labelValue, newDescription: descriptionValue });

                        return;  // EARLY RETURN
                    }

                    throw Error("successful property Not true NOT handled")

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });

        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    }

    /**
     *
     */
    render() {

        let saveButton_Disabled = false;
        if (this.state.label_InvalidValue || this.state.label_InProgress === "" || this.state.description_InvalidValue || this.state.description_InProgress === "" ) {
            saveButton_Disabled = true;
        }

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >
                    <div style={ { padding: 20, position: "relative" } }>

                        <form
                            onSubmit={ this._formSubmit_BindThis }
                        >
                            <div style={ { display: "grid", gridTemplateColumns: "min-content min-content" } }>
                                {/*  2 Column Grid */}
                                <div>
                                    <span>
                                        Label:&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <span>
                                        <input type="text"
                                               style={ { width: 350 } }
                                               maxLength={ GoldStandard_Max_FieldLengths_Constants.GOLD_STANDARD_MAX_LENGTH__DISPLAY_LABEL }
                                               autoFocus={ true }
                                               ref={ this._label_Input_Ref }
                                               defaultValue={ ( this.state.label_InProgress ) ?  this.state.label_InProgress : "" }
                                               onChange={ this._label_Description_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this.state.label_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Label is invalid.
                                        </span>
                                    ) : null }
                                </div>

                                <div>
                                    <span>
                                        Description:&nbsp;
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <input type="text"
                                               style={ { width: 350 } }
                                               maxLength={ GoldStandard_Max_FieldLengths_Constants.GOLD_STANDARD_MAX_LENGTH__DESCRIPTION }
                                               ref={ this._description_Input_Ref }
                                               defaultValue={ ( this.state.description_InProgress ) ?  this.state.description_InProgress : "" }
                                               onChange={ this._label_Description_Input_Changed_BindThis }
                                        />
                                    </span>
                                    { (this.state.description_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Description is invalid.
                                        </span>
                                    ) : null }
                                </div>
                            </div>

                            <div style={ { marginTop: 5 }}>
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ saveButton_Disabled }
                                    >
                                        Save
                                    </button>
                                    { ( saveButton_Disabled ) ? (
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                <span>
                                                    Enter a label and description to enable 'Save'
                                                </span>
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <div
                                                style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            >
                                            </div>
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    ) : null }
                                </div>
                                <span > </span>
                                <button
                                    onClick={ ( event) => {
                                        this._cancelButton_Clicked = true;
                                        event.preventDefault();  // Stop form.onsubmit code from running
                                        event.stopPropagation()
                                        this.props.cancel_Callback()
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>

                            {/* Cover Div while updating server */}

                            { this.state.show_SavingMessage ? (

                                <div style={
                                    {
                                        position: "absolute", top: 0, left: 0, right: 0, bottom: 0 ,
                                        backgroundColor: "white", textAlign: "center", paddingTop: 50, fontSize: 24
                                    }
                                } >
                                    Saving Data
                                </div>
                            ) : null }

                        </form>

                    </div>

                </div>
            </div>

        )
    }
}
