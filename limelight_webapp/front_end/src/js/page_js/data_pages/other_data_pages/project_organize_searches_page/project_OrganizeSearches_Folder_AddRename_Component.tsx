/**
 * project_OrganizeSearches_Folder_AddRename_Component.tsx
 *
 * React Component for Organize Searches - Add Folder
 *
 */

import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";


///////

export interface Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params {
    newFolderName: string
}

export type Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback =
    (params: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params) => void

/**
 *
 */
export const project_OrganizeSearches_Folder_AddRename_Component__openOverlay = function (
    {
        projectIdentifier,
        folderId_Existing,
        folderName_Existing,
        position_top,
        position_left,
        change_Callback,
        cancel_Callback
    } : {
        projectIdentifier: string // For Add
        folderId_Existing: number
        folderName_Existing: string
        position_top: number
        position_left: number
        change_Callback: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback
        cancel_Callback: () => void
    }) : void {

    if ( position_top > window.innerHeight - 160 ) {
        position_top = window.innerHeight - 160;
    }
    if ( position_top < 10 ) {
        position_top = 10;
    }

    if ( position_left < 10 ) {
        position_left = 10;
    }
    if ( position_left > 100 ) {
        position_left = 100;
    }

    let addedOverlay : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF;

    const change_Callback_Local = ( params : Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback_Params ) => {

        const newEmail: string = params.newFolderName;

        addedOverlay.removeContents_AndContainer_FromDOM();

        change_Callback({ newFolderName: newEmail });
    }

    const cancel_Callback_Local = () => {

        addedOverlay.removeContents_AndContainer_FromDOM();

        if ( cancel_Callback ) {
            cancel_Callback()
        }
    }

    const componentToAdd = (
        <Project_OrganizeSearches_Folder_AddRename_Component
            projectIdentifier={ projectIdentifier }
            folderId_Existing={ folderId_Existing }
            folderName_Existing={ folderName_Existing }
            position_top={ position_top }
            position_left={ position_left }
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
interface Project_OrganizeSearches_Folder_AddRename_Component_Props {

    projectIdentifier: string // For Add
    folderId_Existing: number
    folderName_Existing: string

    position_top: number
    position_left: number

    change_Callback: Project_OrganizeSearches_Folder_AddRename_Component_Change_Callback
    cancel_Callback: () => void
}

/**
 *
 */
interface Project_OrganizeSearches_Folder_AddRename_Component_State {

    folderName_InProgress? : string
    folderName_InvalidValue?: boolean

    showError_ReadingData?: boolean
    show_SavingMessage?: boolean
}

/**
 *
 */
class Project_OrganizeSearches_Folder_AddRename_Component extends React.Component< Project_OrganizeSearches_Folder_AddRename_Component_Props, Project_OrganizeSearches_Folder_AddRename_Component_State > {

    private _folderName_Input_Changed_BndThis = this._folderName_Input_Changed.bind(this);
    private _formSubmit_BindThis = this._formSubmit.bind(this);

    private _folderName_Input_Ref : React.RefObject<HTMLInputElement>; //  React.createRef()

    private _folderName_InvalidValue : boolean = false;

    /**
     *
     */
    constructor(props: Project_OrganizeSearches_Folder_AddRename_Component_Props) {
        super(props)

        this._folderName_Input_Ref = React.createRef<HTMLInputElement>();

        this.state = {
            folderName_InProgress: props.folderName_Existing
        }
    }

    /**
     *
     */
    componentDidMount() {
    }

    /**
     *
     */
    private _get_FolderName_InputField_AndValidate() : {
        folderNameValue: string
        isValid: boolean
    } {

        const folderName_Value = this._folderName_Input_Ref.current.value.trim();

        if ( folderName_Value.length === 0 ) {

            this.setState({ folderName_InvalidValue: true });
            this._folderName_InvalidValue = true;

            return { isValid: false, folderNameValue: null };  // EARLY EXIT
        }

        this.setState({ folderName_InvalidValue: false });
        this._folderName_InvalidValue = false;

        return { isValid: true, folderNameValue: folderName_Value }
    }

    /**
     *
     */
    private _folderName_Input_Changed(event: React.MouseEvent<HTMLInputElement, MouseEvent>) : void {

        const  {
            folderNameValue,
            isValid
        } = this._get_FolderName_InputField_AndValidate();
    }

    /**
     *
     */
    private _formSubmit(event: React.FormEvent<HTMLFormElement>) : void {
        try {
            event.preventDefault();

            const  {
                folderNameValue,
                isValid
            } = this._get_FolderName_InputField_AndValidate();

            if ( ! isValid ) {

                this.setState({ folderName_InvalidValue: true });
                this._folderName_InvalidValue = true;

                return;  // EARLY EXIT
            }

            if ( folderNameValue === this.props.folderName_Existing ) {

                //  No change so just close

                this.props.cancel_Callback()

                return; // EARLY RETURN
            }

            this.setState({ show_SavingMessage: true });


            if ( ! this.props.folderName_Existing ) {

                //  NO existing folder name so Add


                let requestObj = {
                    projectIdentifier: this.props.projectIdentifier,  // current project
                    folderName: folderNameValue
                };

                const url = "d/rws/for-page/project-organize-searches-add-folder";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( (reason) => {  }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {
                        if ( ! responseData.status ) {
                            limelight__ReloadPage_Function()
                            return;
                        }

                        this.props.change_Callback({ newFolderName: folderNameValue })

                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                        throw e;
                    }
                });

            } else {

                const requestObj = {
                    folderId: this.props.folderId_Existing,
                    newFolderName: folderNameValue
                };

                const url = "d/rws/for-page/project-organize-searches-folder-rename";

                const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

                const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

                promise_webserviceCallStandardPost.catch( (reason) => {  }  );

                promise_webserviceCallStandardPost.then( ({ responseData }) => {
                    try {

                        this.props.change_Callback({ newFolderName: folderNameValue })
                    } catch (e) {
                        reportWebErrorToServer.reportErrorObjectToServer({ errorException: e });
                        throw e;
                    }
                });

            }

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
        if (this.state.folderName_InvalidValue || this.state.folderName_InProgress === "") {
            saveButton_Disabled = true;
        }

        return (

            <div >
                <div style={ { zIndex: 700 } } className=" modal-dialog-small-positioned-near-related-content-background ">

                </div>
                <div style={ { zIndex: 710, position: "fixed", top: this.props.position_top, left: this.props.position_left }}
                     className=" modal-dialog-small-positioned-near-related-content-container "
                >

                    { ( this.state.showError_ReadingData ) ? (
                        <div style={ { padding: 20, position: "relative" } }>
                            Error Loading Data.  Please reload page and try again.
                        </div>

                    ) : (

                        <div style={ { padding: 20, position: "relative" } }>

                            <form
                                onSubmit={ this._formSubmit_BindThis }
                            >
                                <div>
                                    <span>
                                        Folder Name:&nbsp;
                                    </span>
                                    <span>
                                        <input type="text"
                                               style={ { width: 350 } }
                                               maxLength={ 400 }
                                               autoFocus={ true }
                                               ref={ this._folderName_Input_Ref }
                                               defaultValue={ ( this.state.folderName_InProgress ) ?  this.state.folderName_InProgress : "" }
                                               onChange={ this._folderName_Input_Changed_BndThis }
                                        />
                                    </span>
                                    { (this.state.folderName_InvalidValue ) ? (
                                        <span style={ { marginLeft: 20, color: "red", whiteSpace: "nowrap" } }>
                                            Folder name is invalid.
                                        </span>
                                    ) : null }
                                </div>

                                <div style={ { marginTop: 5 }}>
                                    <div style={ { position: "relative", display: "inline-block" } }>
                                        <button type="submit"
                                                disabled={ saveButton_Disabled }
                                        >
                                            { this.props.folderId_Existing ? (
                                                <span>Save</span>
                                            ) : (
                                                <span>Add</span>
                                            )}
                                        </button>
                                        { ( saveButton_Disabled ) ? (
                                            <div
                                                style={ { position: "absolute", left: 0, top: 0, right: 0, bottom: 0 } }
                                                title={ "Enter an folder name to enable " +  this.props.folderId_Existing ? "'Save'" : "'Add'" }
                                            >
                                            </div>
                                        ) : null }
                                    </div>
                                    <span > </span>
                                    <button
                                        onClick={ ( event) => {
                                            this.props.change_Callback({ newFolderName: null })
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

                    )}  {/*   END:  Else of Is Loading   */}

                </div>
            </div>

        )
    }
}
