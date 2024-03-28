/**
 * projectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component.tsx
 *
 * Javascript React Component
 *
 * Saved View Label Change Component
 *
 */

import React from "react";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import { SavedView_Label_Max_FieldLengths_Constants } from "page_js/constants_across_webapp/saved_view_constants/savedView_Label_Max_FieldLengths_Constants";

///////

export interface ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback_Params {
    newLabelValue: string
}

export type ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback =
    (params: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback_Params) => void

export interface ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionParams {
    id: number
    existingLabel: string
    position_top: number
    position_left: number
    change_Callback: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback
    cancel_Callback: () => void
}

export type ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionType =
    ( params : ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const projectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionType = function (
    params: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component__openOverlay__FunctionParams
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

    const window_innerWidth = window.innerWidth - 10; // Subtract 10 for vertical scroll bar

    const width_OtherThan_label_InputField = 150;

    let label_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_label_InputField + label_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        label_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_label_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback_Params ) => {

        const newLabelValue: string = params_To_change_Callback_Local.newLabelValue;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ newLabelValue });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component
            id={ params.id }
            existingLabel={ params.existingLabel }
            position_top={ params.position_top }
            position_left={ params.position_left }
            label_InputField_Width={ label_InputField_Width }
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
interface ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Props {

    id: number
    existingLabel: string

    position_top: number
    position_left: number
    label_InputField_Width: number

    change_Callback: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_State {

    label_InProgress? : string
    label_InvalidValue?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component extends React.Component< ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Props, ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_State > {

    private _label_Description_Input_Changed_BindThis = this._label_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _label_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _label_FromServer : string;

    private _label_InvalidValue : boolean = false;

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: ProjectPage_SavedViews_Section_LoggedInUsersInteraction__ChangeLabel_Component_Props) {
        super(props)

        this._label_Input_Ref = React.createRef<HTMLInputElement>();

        this._label_FromServer = props.existingLabel;

        this.state = {
            label_InProgress: props.existingLabel
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
        isValid: boolean
    } {
        this._label_InvalidValue = false; //  reset

        const label_Value = this._label_Input_Ref.current.value.trim();

        // if ( label_Value.length === 0 ) {
        //
        //     this.setState({ label_InvalidValue: true });
        //     this._label_InvalidValue = true;
        //
        // } else {
        //
        //     this.setState({label_InvalidValue: false});
        // }

        if ( this._label_InvalidValue ) {
            return {isValid: false, labelValue: null};  // EARLY EXIT
        }

        return { isValid: true, labelValue: label_Value }
    }

    /**
     *
     */
    private _label_Description_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

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
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            let requestData = {
                labelText : labelValue,
                id: this.props.id
            };

            const url = "d/rws/for-page/saved-view-change-label";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({ newLabelValue: labelValue });

                        return;  // EARLY RETURN
                    }

                    throw Error("status property Not true NOT handled")

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

        // let saveButton_Disabled = false;
        // if (this.state.label_InvalidValue || this.state.label_InProgress === "") {
        //     saveButton_Disabled = true;
        // }

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
                            <div style={ { position: "relative" } }>
                                <input type="text"
                                       style={ { width: this.props.label_InputField_Width } }
                                       maxLength={ SavedView_Label_Max_FieldLengths_Constants.SAVED_VIEW_MAX_LENGTH }
                                       ref={ this._label_Input_Ref }
                                       defaultValue={ ( this.state.label_InProgress ) ?  this.state.label_InProgress : "" }
                                       onChange={ this._label_Description_Input_Changed_BindThis }
                                />

                                { //  UNUSED  Not set
                                    (this.state.label_InvalidValue ) ? (
                                        <>
                                            <span> </span>
                                            <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                                Label is invalid.
                                            </span>
                                        </>
                                ) : null }

                                <span> </span>

                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ saveButton_Disabled }
                                    >
                                        Save
                                    </button>
                                    { ( saveButton_Disabled ) ? (
                                        <div
                                            style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            title="Enter a label to enable 'Save'"
                                        >
                                        </div>
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
