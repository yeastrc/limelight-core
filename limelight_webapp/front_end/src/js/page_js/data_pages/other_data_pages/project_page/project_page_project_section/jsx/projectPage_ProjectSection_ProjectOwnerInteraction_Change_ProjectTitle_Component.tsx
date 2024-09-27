/**
 * projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component.tsx
 *
 * Javascript React Component
 *
 * Project Title Change Component
 *
 */

import React from "react";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

///////

export interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback_Params {
    newProjectTitle: string
}

export type ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback =
    (params: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback_Params) => void

export interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component__openOverlay__FunctionParams {
    projectIdentifier: string
    existingProjectTitle: string
    position_top: number
    position_left: number
    change_Callback: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback
    cancel_Callback: () => void
}

export type ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component__openOverlay__FunctionType =
    ( params : ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component__openOverlay: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component__openOverlay__FunctionType = function (
    params: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component__openOverlay__FunctionParams
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

    const width_OtherThan_projectTitle_InputField = 150;

    let projectTitle_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_projectTitle_InputField + projectTitle_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        projectTitle_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_projectTitle_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback_Params ) => {

        const newProjectTitle: string = params_To_change_Callback_Local.newProjectTitle;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ newProjectTitle });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component
            projectIdentifier={ params.projectIdentifier }
            existingProjectTitle={ params.existingProjectTitle }
            position_top={ params.position_top }
            position_left={ params.position_left }
            projectTitle_InputField_Width={ projectTitle_InputField_Width }
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
interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Props {

    projectIdentifier: string
    existingProjectTitle: string

    position_top: number
    position_left: number
    projectTitle_InputField_Width: number

    change_Callback: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_State {

    projectTitle_InProgress? : string
    projectTitle_InvalidValue?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component extends React.Component< ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Props, ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_State > {

    private _projectTitle_Description_Input_Changed_BindThis = this._projectTitle_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _projectTitle_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _projectTitle_FromServer : string;

    private _projectTitle_InvalidValue : boolean = false;

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectTitle_Component_Props) {
        super(props)

        this._projectTitle_Input_Ref = React.createRef<HTMLInputElement>();

        this._projectTitle_FromServer = props.existingProjectTitle;

        this.state = {
            projectTitle_InProgress: props.existingProjectTitle
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
        projectTitleValue: string
        isValid: boolean
    } {
        this._projectTitle_InvalidValue = false; //  reset

        const projectTitle_Value = this._projectTitle_Input_Ref.current.value.trim();

        if ( projectTitle_Value.length === 0 ) {

            this.setState({ projectTitle_InvalidValue: true });
            this._projectTitle_InvalidValue = true;

        } else {

            this.setState({projectTitle_InvalidValue: false});
        }

        if ( this._projectTitle_InvalidValue ) {
            return {isValid: false, projectTitleValue: null};  // EARLY EXIT
        }

        return { isValid: true, projectTitleValue: projectTitle_Value }
    }

    /**
     *
     */
    private _projectTitle_Description_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

        const  {
            projectTitleValue,
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
                projectTitleValue,
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            let requestObj = { projectId : this.props.projectIdentifier, projectTitle : projectTitleValue };

            const url = "d/rws/for-page/project-update-title";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({newProjectTitle: projectTitleValue });

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
        if (this.state.projectTitle_InvalidValue || this.state.projectTitle_InProgress === "") {
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
                                        Change Project Title:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <span>
                                        <input type="text"
                                               style={ { width: this.props.projectTitle_InputField_Width } }
                                               // maxLength={  }
                                               ref={ this._projectTitle_Input_Ref }
                                               autoFocus={ true }
                                               defaultValue={ ( this.state.projectTitle_InProgress ) ?  this.state.projectTitle_InProgress : "" }
                                               onChange={ this._projectTitle_Description_Input_Changed_BindThis }
                                        />
                                    </span>
                                </div>
                                <div>
                                    { (this.state.projectTitle_InvalidValue ) ? (
                                        <span style={ { color: "red", whiteSpace: "nowrap" } }>
                                            Project Title cannot be empty.
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
                                                    Enter a value to enable 'Save'
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
