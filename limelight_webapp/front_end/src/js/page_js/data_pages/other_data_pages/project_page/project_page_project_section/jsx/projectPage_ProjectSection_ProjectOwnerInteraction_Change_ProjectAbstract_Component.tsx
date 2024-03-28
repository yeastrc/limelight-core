/**
 * projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component.tsx
 *
 * Javascript React Component
 *
 * Project Abstract Change Component
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

export interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params {
    newProjectAbstract: string
}

export type ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback =
    (params: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params) => void

export interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay__FunctionParams {
    projectIdentifier: string
    existingProjectAbstract: string
    position_top: number
    position_left: number
    change_Callback: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback
    cancel_Callback: () => void
}

export type ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay__FunctionType =
    ( params : ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay__FunctionParams ) => void

/**
 *
 */
export const projectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay__FunctionType = function (
    params: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component__openOverlay__FunctionParams
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

    const width_OtherThan_projectAbstract_InputField = 150;

    let projectAbstract_InputField_Width = 550;

    if ( window_innerWidth < ( params.position_left + width_OtherThan_projectAbstract_InputField + projectAbstract_InputField_Width + 30 ) ) {  //  + 20 to allow margins and vertical scroll bar

        params.position_left = 10;
        projectAbstract_InputField_Width = window_innerWidth - ( ( params.position_left * 2 ) + width_OtherThan_projectAbstract_InputField )
    }


    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params_To_change_Callback_Local : ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback_Params ) => {

        const newProjectAbstract: string = params_To_change_Callback_Local.newProjectAbstract;

        addedOverlay.removeContents_AndContainer_FromDOM();

        params.change_Callback({ newProjectAbstract });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( params.cancel_Callback ) {
            params.cancel_Callback()
        }
    }

    const componentToAdd = (
        <ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component
            projectIdentifier={ params.projectIdentifier }
            existingProjectAbstract={ params.existingProjectAbstract }
            position_top={ params.position_top }
            position_left={ params.position_left }
            projectAbstract_InputField_Width={ projectAbstract_InputField_Width }
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
interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Props {

    projectIdentifier: string
    existingProjectAbstract: string

    position_top: number
    position_left: number
    projectAbstract_InputField_Width: number

    change_Callback: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_State {

    projectAbstract_InProgress? : string
    // projectAbstract_InvalidValue?: boolean

    show_SavingMessage?: boolean
}

/**
 *
 */
class ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component extends React.Component< ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Props, ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_State > {

    private _projectAbstract_Description_Input_Changed_BindThis = this._projectAbstract_Description_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _projectAbstract_Input_Ref : React.RefObject<HTMLTextAreaElement>; //  React.createRef()

    private _projectAbstract_FromServer : string;

    private _projectAbstract_InvalidValue : boolean = false;

    private _cancelButton_Clicked = false

    /**
     *
     */
    constructor(props: ProjectPage_ProjectSection_ProjectOwnerInteraction_Change_ProjectAbstract_Component_Props) {
        super(props)

        this._projectAbstract_Input_Ref = React.createRef<HTMLTextAreaElement>();

        this._projectAbstract_FromServer = props.existingProjectAbstract;

        this.state = {
            projectAbstract_InProgress: props.existingProjectAbstract
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
        projectAbstractValue: string
        isValid: boolean
    } {
        this._projectAbstract_InvalidValue = false; //  reset

        const projectAbstract_Value = this._projectAbstract_Input_Ref.current.value.trim();

        // if ( projectAbstract_Value.length === 0 ) {
        //
        //     this.setState({ projectAbstract_InvalidValue: true });
        //     this._projectAbstract_InvalidValue = true;
        //
        // } else {
        //
        //     this.setState({projectAbstract_InvalidValue: false});
        // }

        if ( this._projectAbstract_InvalidValue ) {
            return {isValid: false, projectAbstractValue: null};  // EARLY EXIT
        }

        return { isValid: true, projectAbstractValue: projectAbstract_Value }
    }

    /**
     *
     */
    private _projectAbstract_Description_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

        const  {
            projectAbstractValue,
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
                projectAbstractValue,
                isValid
            } = this._get_Label_Description_InputFields_AndValidate();

            if ( ! isValid ) {
                return;  // EARLY EXIT
            }

            this.setState({ show_SavingMessage: true });

            let requestObj = { projectId : this.props.projectIdentifier, projectAbstract : projectAbstractValue };

            const url = "d/rws/for-page/project-update-abstract";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    if ( responseData.status ) {

                        this.props.change_Callback({newProjectAbstract: projectAbstractValue });

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
        // if (
        //     // this.state.projectAbstract_InvalidValue ||
        //     this.state.projectAbstract_InProgress === "") {
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
                            <div>
                                <div style={ { whiteSpace: "nowrap", marginBottom: 5 } }>
                                    <span>
                                        Change Project Abstract:&nbsp;&nbsp;
                                    </span>
                                </div>
                                <div style={ { marginBottom: 5 } }>
                                    <span>
                                        <textarea
                                               // style={ { width: this.props.projectAbstract_InputField_Width } }
                                               maxLength={ 5000 }
                                               ref={ this._projectAbstract_Input_Ref }
                                               rows={ 10 } cols={ 100 }
                                               defaultValue={ ( this.state.projectAbstract_InProgress ) ?  this.state.projectAbstract_InProgress : "" }
                                               onChange={ this._projectAbstract_Description_Input_Changed_BindThis }
                                        />
                                    </span>
                                </div>
                                <div>
                                    { /* (this.state.projectAbstract_InvalidValue ) ? (
                                        <span style={ { color: "red", whiteSpace: "nowrap" } }>
                                            Project Abstract cannot be empty.
                                        </span>
                                    ) : null
                                    */}
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
                                        <div
                                            style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                            title="Enter a value to enable 'Save'"
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
