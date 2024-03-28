/**
 * projectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component.tsx
 *
 * Javascript React Component
 *
 * Project Note Text Change Component
 *
 */

import React from "react";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";

///////

export interface ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback_Params {
    new_NoteText: string
}

export type ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback =
    (params: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback_Params) => void

export interface ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay__FunctionParams {

    noteId: number                 // Undefined or null for add
    existing_NoteText: string

    projectIdentifier: string   // For Add

    position_top: number
    position_left: number
    change_Callback: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback
    cancel_Callback: () => void
}

export type ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay__FunctionType =
    ( params : ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const projectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay__FunctionType = function (
    params: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component__openOverlay__FunctionParams
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

    const width_OtherThan_noteText_InputField = 150;

    let noteText_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_noteText_InputField + noteText_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        noteText_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_noteText_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback_Params ) => {

        const newProjectTitle: string = params_To_change_Callback_Local.new_NoteText;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ new_NoteText: newProjectTitle });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component
            noteId={ params.noteId }
            existing_NoteText={ params.existing_NoteText }
            projectIdentifier={ params.projectIdentifier }
            position_top={ params.position_top }
            position_left={ params.position_left }
            noteText_InputField_Width={ noteText_InputField_Width }
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
interface ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Props {

    noteId: number                 // Undefined or null for add
    existing_NoteText: string

    projectIdentifier: string   // For Add

    position_top: number
    position_left: number
    noteText_InputField_Width: number

    change_Callback: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_State {


    force_ReRender_Object?: object
}

/**
 *
 */
class ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component extends React.Component< ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Props, ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_State > {

    private _noteText_Description_Input_Changed_BindThis = this._noteText_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _noteText_Input_Ref : React.RefObject<HTMLTextAreaElement>; //  React.createRef()

    private _performing_ADD_NOTE = false

    private _noteText_InProgress : string

    private _noteText_InvalidValue : boolean = false;

    private _show_SavingMessage?: boolean

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: ProjectPage_ProjectSection_LoggedInUser_Interaction_Add_Change_NoteText_Component_Props) {
        super(props)

        this._noteText_Input_Ref = React.createRef<HTMLTextAreaElement>();

        if ( props.noteId === undefined || props.noteId === null ) {

            this._performing_ADD_NOTE = true

            this._noteText_InvalidValue = true
        }

        this._noteText_InProgress = ( props.existing_NoteText !== undefined && props.existing_NoteText !== null ) ? props.existing_NoteText : ""

        this.state = {
            force_ReRender_Object: {}
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
        noteTextValue: string
        isValid: boolean
    } {
        const noteText_Value = this._noteText_InProgress.trim();

        if ( noteText_Value.length === 0 ) {

            if ( ! this._noteText_InvalidValue ) {

                this._noteText_InvalidValue = true
                this.setState({ force_ReRender_Object: {} })
            }

        } else {

            if ( this._noteText_InvalidValue ) {

                this._noteText_InvalidValue = false
                this.setState({ force_ReRender_Object: {} })
            }
        }

        if ( this._noteText_InvalidValue ) {
            return {isValid: false, noteTextValue: null};  // EARLY EXIT
        }

        return { isValid: true, noteTextValue: noteText_Value }
    }

    /**
     *
     */
    private _noteText_Description_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

        this._noteText_InProgress = this._noteText_Input_Ref.current.value

        const  {
            noteTextValue,
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

            this._noteText_InProgress = this._noteText_Input_Ref.current.value

            const  {
                noteTextValue,
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this._show_SavingMessage = true

            this.setState({ force_ReRender_Object: {} });

            let requestObj: any

            let url: string

            if ( this._performing_ADD_NOTE ) {

                requestObj = { noteText: noteTextValue, projectIdentifier : this.props.projectIdentifier };

                url = "d/rws/for-page/project-note-add";

            } else {

                requestObj = { id: this.props.noteId, noteText: noteTextValue };

                url = "d/rws/for-page/project-note-update-text";
            }

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({new_NoteText: noteTextValue });

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
        if (this._noteText_InvalidValue || this._noteText_InProgress === "") {
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
                            <div>
                                <div style={ { whiteSpace: "nowrap", marginBottom: 5 } }>
                                    <span>
                                        { this._performing_ADD_NOTE ? "Add" : "Change" } Note:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <textarea
                                        ref={ this._noteText_Input_Ref }
                                        // style={ { width: this.props.noteText_InputField_Width } }
                                        rows={ 10 } cols={ 100 }
                                        maxLength={ 5000 }
                                        autoFocus={ true }
                                        defaultValue={ ( this._noteText_InProgress ) ? this._noteText_InProgress : "" }
                                        onChange={ this._noteText_Description_Input_Changed_BindThis }
                                    />
                                </div>
                                <div>
                                    { (this._noteText_InvalidValue ) ? (
                                        <span style={ { color: "red", whiteSpace: "nowrap" } }>
                                            Note cannot be empty.
                                        </span>
                                    ) : null }
                                </div>

                            </div>

                            <div style={ { marginTop: 5 }}>
                                <div style={ { position: "relative", display: "inline-block" } }>
                                    <button type="submit"
                                            disabled={ saveButton_Disabled }
                                    >
                                        { this._performing_ADD_NOTE ? "Add" : "Save" }
                                    </button>
                                    { ( saveButton_Disabled ) ? (
                                        <div
                                            style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            title={ "Enter a value to enable '" + ( this._performing_ADD_NOTE ? "Add" : "Save" ) + "'" }
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

                            { this._show_SavingMessage ? (

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
