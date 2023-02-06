/**
 * projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Import - Submit Import
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";

import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {FeatureDetection_Max_FieldLengths_Constants} from "page_js/constants_across_webapp/feature_detection_constants/featureDetection_Max_FieldLengths_Constants";
import {
    projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice,
    ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice";
import {projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice";
import {projectPage_UploadData_FeatureDetection_Import_Submit_CallWebservice} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_FeatureDetection_Import_Submit_CallWebservice";



const _DISPLAY_LABEL__DEFAULT_VALUE = "Hdkr/By"

const _DESCRIPTION__DEFAULT_VALUE = "Hardklor/Bullseye"

const _INPUT_FIELD_LABEL__MARGIN_RIGHT = 6;
const _INPUT_FIELD_LABEL__MARGIN_TOP = 2;



/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params

    projectScanFileId: number
    scanFilename_Array: Array<string> // Since can be > 1 scan filename for projectScanFileId
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component_State {


    forceRerenderObject?: object      //  Force Rerender object

    hardklor_File_Filename?: string
    hardklor_Conf_File_Filename?: string
    bullseye_File_Filename?: string

    displayLabelField_Empty?: boolean
    upload_Hardklor_And_Bullseye_Files_Button_Disabled?: boolean
    hardklorFile_FileUpload_InProgress?: boolean
    hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess?: boolean
    hardklor_And_Bullseye_Files_FileUpload_Failed?: boolean

    hardklorFile_Upload_ErrorMessage?: string
    bullseyeFile_Upload_ErrorMessage?: string
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component_State > {

    private _inputFields_Changed_BindThis = this._inputFields_Changed.bind(this);
    private _uploadButtonClicked_BindThis = this._uploadButtonClicked.bind(this);

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    private _displayLabel_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _description_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _upload_HardklorFile_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _upload_Hardklor_Conf_File_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _upload_BullseyeFile_InputElement_Ref : React.RefObject<HTMLInputElement>

    private _upload_Button_Ref : React.RefObject<HTMLButtonElement>

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component_Props) {
        super(props);

        this._displayLabel_InputElement_Ref = React.createRef();
        this._description_InputElement_Ref = React.createRef();
        this._upload_HardklorFile_InputElement_Ref = React.createRef();
        this._upload_Hardklor_Conf_File_InputElement_Ref = React.createRef();
        this._upload_BullseyeFile_InputElement_Ref = React.createRef();
        this._upload_Button_Ref = React.createRef();

        this.state = {
            forceRerenderObject: {},
            upload_Hardklor_And_Bullseye_Files_Button_Disabled: true,
            hardklorFile_FileUpload_InProgress: false,
            hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess: false,
            hardklor_And_Bullseye_Files_FileUpload_Failed: false
        };
    }

    private _inputFields_Changed() {

        if ( ! this._displayLabel_InputElement_Ref.current ) {
            return;
        }
        if ( ! this._upload_HardklorFile_InputElement_Ref.current ) {
            return; // EARLY RETURN
        }
        if ( ! this._upload_BullseyeFile_InputElement_Ref.current ) {
            return; // EARLY RETURN
        }

        if ( this._displayLabel_InputElement_Ref.current.value === "" ) {

            //  No Display label

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true, displayLabelField_Empty: true });

            return; // EARLY RETURN
        }

        this.setState({ displayLabelField_Empty: false });

        if ( this._upload_HardklorFile_InputElement_Ref.current.files.length === 0 ) {
            // No File Selected

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }
        if ( this._upload_HardklorFile_InputElement_Ref.current.files.length > 1 ) {
            // > 1 File Selected
            window.alert("Only 1 Hardklor file can be uploaded at a time")

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }

        if ( this._upload_BullseyeFile_InputElement_Ref.current.files.length === 0 ) {
            // No File Selected

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }
        if ( this._upload_BullseyeFile_InputElement_Ref.current.files.length > 1 ) {
            // > 1 File Selected
            window.alert("Only 1 Bullseye file can be uploaded at a time")

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }

        this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: false });
    }

    /**
     *
     */
    private _uploadButtonClicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( ! this._upload_HardklorFile_InputElement_Ref.current ) {
                return; // EARLY RETURN
            }
            if ( ! this._upload_Hardklor_Conf_File_InputElement_Ref.current ) {
                return; // EARLY RETURN
            }
            if ( ! this._upload_BullseyeFile_InputElement_Ref.current ) {
                return; // EARLY RETURN
            }

            if ( this._upload_HardklorFile_InputElement_Ref.current.files.length === 0 ) {
                // No File Selected
                return; // EARLY RETURN
            }
            if ( this._upload_HardklorFile_InputElement_Ref.current.files.length > 1 ) {
                // > 1 File Selected
                window.alert("Only 1 Hardklor file can be uploaded at a time")
                return; // EARLY RETURN
            }

            if ( this._upload_BullseyeFile_InputElement_Ref.current.files.length === 0 ) {
                // No File Selected
                return; // EARLY RETURN
            }
            if ( this._upload_BullseyeFile_InputElement_Ref.current.files.length > 1 ) {
                // > 1 File Selected
                window.alert("Only 1 Bullseye file can be uploaded at a time")
                return; // EARLY RETURN
            }

            if ( this._displayLabel_InputElement_Ref.current.value === "" ) {

                //  No Display label

                this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true, displayLabelField_Empty: true });

                return; // EARLY RETURN
            }

            const fileToSend_Hardklor = this._upload_HardklorFile_InputElement_Ref.current.files[0]; // first element

            const fileToSend_Bullseye = this._upload_BullseyeFile_InputElement_Ref.current.files[0]; // first element

            let fileToSend_Hardklor_Conf: File = null;
            let hardklor_Conf_File_Filename: string = null;

            {
                if ( this._upload_Hardklor_Conf_File_InputElement_Ref.current.files.length > 1 ) {
                    // > 1 File Selected
                    window.alert("Only 1 Hardklor Conf file can be uploaded at a time")
                    return; // EARLY RETURN
                }
                if ( this._upload_Hardklor_Conf_File_InputElement_Ref.current.files.length === 1 ) {
                    fileToSend_Hardklor_Conf = this._upload_Hardklor_Conf_File_InputElement_Ref.current.files[0];
                    hardklor_Conf_File_Filename = fileToSend_Hardklor_Conf.name;
                }
            }

            this.setState({ hardklorFile_FileUpload_InProgress: true, hardklor_File_Filename: fileToSend_Hardklor.name, hardklor_Conf_File_Filename, bullseye_File_Filename: fileToSend_Bullseye.name })

            this._uploadPerform({ fileToSend_Hardklor, fileToSend_Hardklor_Conf, fileToSend_Bullseye });  // ignore return value

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _uploadPerform(
        {
            fileToSend_Hardklor, fileToSend_Hardklor_Conf, fileToSend_Bullseye
        } : {
            fileToSend_Hardklor: File
            fileToSend_Hardklor_Conf: File
            fileToSend_Bullseye: File
        }
    ): Promise<void> {
        try {

            const displayLabel = this._displayLabel_InputElement_Ref.current.value
            const description = this._description_InputElement_Ref.current.value

            const projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice_Response = await projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice({
                projectIdentifier: this.props.mainParams.projectIdentifierFromURL
            })

            if ( projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice_Response.projectLocked ) {
                //  reload page
                window.location.reload(true)
                return
            }
            if ( ! projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice_Response.statusSuccess ) {
                console.warn( "statusSuccess NOT True")
                throw Error("projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice_Response.statusSuccess NOT True")
            }

            const uploadKey = projectPage_UploadData_FeatureDetection_Import_Initialize_CallWebservice_Response.uploadKey;

            if ( fileToSend_Hardklor_Conf ) {
                const sendDataObject: ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject = {
                    uploadKey,
                    hardklorConfFile: true, hardklorDataFile: false, bullseyeDataFile: false
                }

                const result =
                    await projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice({
                        sendDataObject, fileToSend: fileToSend_Hardklor_Conf
                    })

                if ( ! result.statusSuccess ) {
                    // if ( ! result.errorMessage ) {
                    throw Error("No error message when result.statusSuccess not true: from projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice  hardklorConfFile: true")
                    // }

                    // this.setState({ hardklorFile_Upload_ErrorMessage: result.errorMessage })

                    return; // EARLY RETURN
                }
            }
            {
                const sendDataObject: ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject = {
                    uploadKey,
                    hardklorConfFile: false, hardklorDataFile: true, bullseyeDataFile: false
                }

                const result =
                    await projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice({
                        sendDataObject, fileToSend: fileToSend_Hardklor
                    })

                if ( ! result.statusSuccess ) {
                    // if ( ! result.errorMessage ) {
                    throw Error("No error message when result.statusSuccess not true: from projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice  bullseyeConfFile: true")
                    // }

                    // this.setState({ hardklorFile_Upload_ErrorMessage: result.errorMessage })

                    return; // EARLY RETURN
                }
            }
            {
                const sendDataObject: ProjectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice_SendDataObject = {
                    uploadKey,
                    hardklorConfFile: false, hardklorDataFile: false, bullseyeDataFile: true
                }

                const result =
                    await projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice({
                        sendDataObject, fileToSend: fileToSend_Bullseye
                    })

                if ( ! result.statusSuccess ) {
                    // if ( ! result.errorMessage ) {
                    throw Error("No error message when result.statusSuccess not true: from projectPage_UploadData_FeatureDetection_Import_UploadFile_SendFileToServerWebservice  bullseyeConfFile: true")
                    // }

                    // this.setState({ hardklorFile_Upload_ErrorMessage: result.errorMessage })

                    return; // EARLY RETURN
                }
            }

            let hardklor_Conf_Filename

            if ( fileToSend_Hardklor_Conf ) {
                hardklor_Conf_Filename = fileToSend_Hardklor_Conf.name
            }

            await projectPage_UploadData_FeatureDetection_Import_Submit_CallWebservice({
                uploadKey,
                hardklor_Conf_Filename,
                hardklor_Results_Filename: fileToSend_Hardklor.name,
                bullseye_Results_Filename: fileToSend_Bullseye.name,
                projectScanFileId: this.props.projectScanFileId,
                displayLabel,
                description
            })

            this.setState({ hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess: true })

            //  All successful so refresh main page

            this.props.mainParams.callback_UpdateAfterSuccessfulSubmit();

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        return (
            <>

                <div
                    className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    style={ { marginBottom: 20 } }
                >
                    <div style={ { fontSize: 18, fontWeight: "bold", marginBottom: 6 } }>
                        Import Hardklor and Bullseye files for Feature Detection
                    </div>

                    <div >
                        <span>Use this form to import Hardklor/Bullseye feature detection results for </span>
                        <span>{ this.props.scanFilename_Array.join( ", " ) }</span>
                    </div>

                </div>

                {
                    ( this.state.hardklorFile_Upload_ErrorMessage ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Hardklor file failed to import: { this.state.hardklor_File_Filename }
                            </div>
                            <div>
                                Error: { this.state.hardklorFile_Upload_ErrorMessage }
                            </div>
                        </div>

                    ) : ( this.state.bullseyeFile_Upload_ErrorMessage ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Bullseye file failed to import: { this.state.bullseye_File_Filename }
                            </div>
                            <div>
                                Error: { this.state.bullseyeFile_Upload_ErrorMessage }
                            </div>
                        </div>

                    ) : ( this.state.hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Submitted for Import:
                            </div>
                            <div>
                                Hardklor file: { this.state.hardklor_File_Filename }
                            </div>
                            { this.state.hardklor_Conf_File_Filename ? (
                                <div>
                                    Hardklor Conf file: { this.state.hardklor_Conf_File_Filename }
                                </div>
                            ) : null }
                            <div>
                                Bullseye file: { this.state.bullseye_File_Filename }
                            </div>

                            { this.props.mainParams.scanFileSelection_For_FeatureDetectionImport ? (
                                //  Launched from other than "Upload Data" Section so display message
                                <div style={ { marginTop: 10 } }>
                                    View Status of import under "<b>Upload Data</b>" section.
                                </div>
                            ): null }

                            <div style={ { marginTop: 10 } }>
                                <button
                                    onClick={ event => {
                                        event.stopPropagation();
                                        this.props.callbackOn_Cancel_Close_Clicked();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                    ) : ( this.state.hardklor_And_Bullseye_Files_FileUpload_Failed ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Failed Import:
                            </div>
                            <div>
                                Hardklor file: { this.state.hardklor_File_Filename }
                            </div>
                            { this.state.hardklor_Conf_File_Filename ? (
                                <div>
                                    Hardklor Conf file: { this.state.hardklor_Conf_File_Filename }
                                </div>
                            ) : null }
                            <div>
                                Bullseye file: { this.state.bullseye_File_Filename }
                            </div>

                            <div style={ { marginTop: 10 } }>
                                <button
                                    onClick={ event => {
                                        event.stopPropagation();
                                        this.props.callbackOn_Cancel_Close_Clicked();
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>


                    ) : ( this.state.hardklorFile_FileUpload_InProgress ) ? (
                        <React.Fragment>

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                 style={ { marginBottom: 12 } }
                                // style={ { padding : 6 } }
                            >
                                <div>
                                    Import In Progress:
                                </div>
                                <div>
                                    Hardklor file: { this.state.hardklor_File_Filename }
                                </div>
                                { this.state.hardklor_Conf_File_Filename ? (
                                    <div>
                                        Hardklor Conf file: { this.state.hardklor_Conf_File_Filename }
                                    </div>
                                ) : null }
                                <div>
                                    Bullseye file: { this.state.bullseye_File_Filename }
                                </div>

                                <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" } }>
                                    <Spinner_Limelight_Component/>
                                </div>

                            </div>

                        </React.Fragment>
                    ) : (

                        <React.Fragment>

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                 style={ { marginBottom: 12 } }
                                // style={ { padding : 6 } }
                            >
                                <div style={ { display: "grid", gridTemplateColumns: " max-content auto "}}>

                                    {/*  2 column grid  */}

                                    {/*  Label  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <span>Label:</span>
                                        <span> </span>
                                        <span style={ { color: "red" } }>*</span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5 } }>
                                        <input
                                            type="text"
                                            defaultValue={ _DISPLAY_LABEL__DEFAULT_VALUE }
                                            maxLength={ FeatureDetection_Max_FieldLengths_Constants.FEATURE_DETECTION_MAX_LENGTH__DISPLAY_LABEL }
                                            ref={ this._displayLabel_InputElement_Ref }
                                            onChange={ this._inputFields_Changed_BindThis }
                                        />
                                        { this.state.displayLabelField_Empty ? (
                                            <span style={ { marginLeft: 10, color: "red" }}>
                                            Label is required
                                        </span>
                                        ) : null }
                                    </div>

                                    {/*  Description  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <span>Description:</span>
                                        <span> </span>
                                        <span style={ { color: "red" } }>*</span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5 } }>
                                        <input
                                            type="text"
                                            defaultValue={ _DESCRIPTION__DEFAULT_VALUE }
                                            maxLength={ FeatureDetection_Max_FieldLengths_Constants.FEATURE_DETECTION_MAX_LENGTH__DESCRIPTION }
                                            ref={ this._description_InputElement_Ref }
                                        />
                                    </div>

                                    {/*  Hardklor file to import  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <span>Hardklor file to import:</span>
                                        <span> </span>
                                        <span style={ { color: "red" } }>*</span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <input
                                            ref={ this._upload_HardklorFile_InputElement_Ref }
                                            type="file"
                                            onChange={ this._inputFields_Changed_BindThis }
                                        />
                                    </div>

                                    {/*  Hardklor Conf file to import. Optional  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <span>Hardklor Conf file to import:</span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <input
                                            ref={ this._upload_Hardklor_Conf_File_InputElement_Ref }
                                            type="file"
                                            onChange={ this._inputFields_Changed_BindThis }
                                        />
                                    </div>

                                    {/*  Bullseye file to import  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <span>Bullseye file to import:</span>
                                        <span> </span>
                                        <span style={ { color: "red" } }>*</span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5 } }>
                                        <input
                                            ref={ this._upload_BullseyeFile_InputElement_Ref }
                                            type="file"
                                            onChange={ this._inputFields_Changed_BindThis }
                                        />
                                    </div>

                                    {/*  "* required"  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5 } }>
                                    <span style={ { color: "red" } }>
                                        * required
                                    </span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div></div>

                                </div>

                                <div style={ { marginTop: 10 } }>

                                    <button
                                        ref={ this._upload_Button_Ref }
                                        onClick={ this._uploadButtonClicked_BindThis }
                                        disabled={ this.state.upload_Hardklor_And_Bullseye_Files_Button_Disabled }
                                    >
                                        Import Hardklor and Bullseye Files
                                    </button>
                                    <span> </span>
                                    <button
                                        onClick={ event => {
                                            event.stopPropagation();
                                            this.props.callbackOn_Cancel_Close_Clicked();
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>

                            </div>

                        </React.Fragment>

                    )}

            </>
        );
    }
}


