/**
 * projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Run - Submit Run
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";
import {FeatureDetection_Max_FieldLengths_Constants} from "page_js/constants_across_webapp/feature_detection_constants/featureDetection_Max_FieldLengths_Constants";
import {projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice";
import {
    projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice,
    ProjectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice_SendDataObject
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice";
import {projectPage_UploadData_FeatureDetection_Run_Submit_CallWebservice} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_FeatureDetection_Run_Submit_CallWebservice";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";



const _DISPLAY_LABEL__DEFAULT_VALUE = "Hdkr/By"

const _DESCRIPTION__DEFAULT_VALUE = "Hardklor/Bullseye"

const _INPUT_FIELD_LABEL__MARGIN_RIGHT = 6;
const _INPUT_FIELD_LABEL__MARGIN_TOP = 2;



/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params

    projectScanFileId_List: Array<number>
    scanFilename_Array_Array: Array<Array<string>> // Since can be > 1 scan filename for projectScanFileId.  Can be multiple projectScanFileId
    callbackOn_Cancel_Close_Clicked: () => void
    callbackOn_Save_Clicked: () => void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component_State {


    forceRerenderObject?: object      //  Force Rerender object

    hardklor_Conf_File_Filename?: string
    bullseye_Conf_File_Filename?: string

    displayLabelField_Empty?: boolean
    upload_Hardklor_And_Bullseye_Files_Button_Disabled?: boolean
    hardklorFile_FileUpload_InProgress?: boolean
    hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess?: boolean
    hardklor_And_Bullseye_Files_FileUpload_Failed?: boolean

    // hardklorFile_Upload_ErrorMessage?: string
    // bullseyeFile_Upload_ErrorMessage?: string
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component_State > {

    private _inputFields_Changed_BindThis = this._inputFields_Changed.bind(this);
    private _uploadButtonClicked_BindThis = this._uploadButtonClicked.bind(this);

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    private _displayLabel_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _description_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _upload_Hardklor_Conf_File_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _upload_Bullseye_Conf_File_InputElement_Ref : React.RefObject<HTMLInputElement>

    private _upload_Button_Ref : React.RefObject<HTMLButtonElement>

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component_Props) {
        super(props);

        this._displayLabel_InputElement_Ref = React.createRef();
        this._description_InputElement_Ref = React.createRef();
        this._upload_Hardklor_Conf_File_InputElement_Ref = React.createRef();
        this._upload_Bullseye_Conf_File_InputElement_Ref = React.createRef();
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
        if ( ! this._upload_Hardklor_Conf_File_InputElement_Ref.current ) {
            return; // EARLY RETURN
        }
        if ( ! this._upload_Bullseye_Conf_File_InputElement_Ref.current ) {
            return; // EARLY RETURN
        }

        if ( this._displayLabel_InputElement_Ref.current.value === "" ) {

            //  No Display label

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true, displayLabelField_Empty: true });

            return; // EARLY RETURN
        }

        this.setState({ displayLabelField_Empty: false });

        if ( this._upload_Hardklor_Conf_File_InputElement_Ref.current.files.length === 0 ) {
            // No File Selected

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }
        if ( this._upload_Hardklor_Conf_File_InputElement_Ref.current.files.length > 1 ) {
            // > 1 File Selected
            window.alert("Only 1 Hardklor Conf file can be used")

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }

        if ( this._upload_Bullseye_Conf_File_InputElement_Ref.current.files.length === 0 ) {
            // No File Selected

            this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }
        if ( this._upload_Bullseye_Conf_File_InputElement_Ref.current.files.length > 1 ) {
            // > 1 File Selected
            window.alert("Only 1 Bullseye Conf file can be used")

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


            // window.alert("NOT Actually perform Upload")
            //
            // throw Error("NOT Actually perform Upload")

            if ( ! this._upload_Hardklor_Conf_File_InputElement_Ref.current ) {
                return; // EARLY RETURN
            }
            if ( ! this._upload_Bullseye_Conf_File_InputElement_Ref.current ) {
                return; // EARLY RETURN
            }

            if ( this._upload_Hardklor_Conf_File_InputElement_Ref.current.files.length === 0 ) {
                // No File Selected
                return; // EARLY RETURN
            }
            if ( this._upload_Hardklor_Conf_File_InputElement_Ref.current.files.length > 1 ) {
                // > 1 File Selected
                window.alert("Only 1 Hardklor Conf file can be used")
                return; // EARLY RETURN
            }

            if ( this._upload_Bullseye_Conf_File_InputElement_Ref.current.files.length === 0 ) {
                // No File Selected
                return; // EARLY RETURN
            }
            if ( this._upload_Bullseye_Conf_File_InputElement_Ref.current.files.length > 1 ) {
                // > 1 File Selected
                window.alert("Only 1 Bullseye Conf file can be used")
                return; // EARLY RETURN
            }

            if ( this._displayLabel_InputElement_Ref.current.value === "" ) {

                //  No Display label

                this.setState({ upload_Hardklor_And_Bullseye_Files_Button_Disabled: true, displayLabelField_Empty: true });

                return; // EARLY RETURN
            }

            const fileToSend_Hardklor_Conf = this._upload_Hardklor_Conf_File_InputElement_Ref.current.files[0]; // first element

            const fileToSend_Bullseye_Conf = this._upload_Bullseye_Conf_File_InputElement_Ref.current.files[0]; // first element

            this.setState({ hardklorFile_FileUpload_InProgress: true, hardklor_Conf_File_Filename: fileToSend_Hardklor_Conf.name, bullseye_Conf_File_Filename: fileToSend_Bullseye_Conf.name })

            this._uploadPerform({ fileToSend_Hardklor_Conf, fileToSend_Bullseye_Conf });  // ignore return value

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _uploadPerform(
        {
            fileToSend_Hardklor_Conf, fileToSend_Bullseye_Conf
        } : {
            fileToSend_Hardklor_Conf: File
            fileToSend_Bullseye_Conf: File
        }
    ): Promise<void> {
        try {

            const projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response = await projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice({
                projectIdentifier: this.props.mainParams.projectIdentifierFromURL
            })

            if ( projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response.projectLocked ) {
                //  reload page
                limelight__ReloadPage_Function()
                return
            }
            if ( ! projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response.statusSuccess ) {
                console.warn( "statusSuccess NOT True")
                throw Error("projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response.statusSuccess NOT True")
            }

            const uploadKey = projectPage_UploadData_FeatureDetection_Run_Initialize_CallWebservice_Response.uploadKey;

            {
                const sendDataObject: ProjectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice_SendDataObject = {
                    uploadKey,
                    hardklorConfFile: true, bullseyeConfFile: false
                }

                const result =
                    await projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice({
                        sendDataObject, fileToSend: fileToSend_Hardklor_Conf
                    })

                if ( ! result.statusSuccess ) {
                    // if ( ! result.errorMessage ) {
                        throw Error("No error message when result.statusSuccess not true: from projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice  hardklorConfFile: true")
                    // }

                    // this.setState({ hardklorFile_Upload_ErrorMessage: result.errorMessage })

                    return; // EARLY RETURN
                }
            }
            {
                const sendDataObject: ProjectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice_SendDataObject = {
                    uploadKey,
                    hardklorConfFile: false, bullseyeConfFile: true
                }

                const result =
                    await projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice({
                        sendDataObject, fileToSend: fileToSend_Bullseye_Conf
                    })

                if ( ! result.statusSuccess ) {
                    // if ( ! result.errorMessage ) {
                    throw Error("No error message when result.statusSuccess not true: from projectPage_UploadData_FeatureDetection_Run_UploadFile_SendFileToServerWebservice  bullseyeConfFile: true")
                    // }

                    // this.setState({ hardklorFile_Upload_ErrorMessage: result.errorMessage })

                    return; // EARLY RETURN
                }
            }

            // projectScanFileId: this.props.projectScanFileId,
            //     displayLabel: this._displayLabel_InputElement_Ref.current.value,
            //     description: this._description_InputElement_Ref.current.value,

            await projectPage_UploadData_FeatureDetection_Run_Submit_CallWebservice({
                uploadKey,
                hardklor_Conf_Filename: fileToSend_Hardklor_Conf.name,
                bullseye_Conf_Filename: fileToSend_Bullseye_Conf.name,
                projectScanFileId_List: this.props.projectScanFileId_List,
                displayLabel: this._displayLabel_InputElement_Ref.current.value,
                description: this._description_InputElement_Ref.current.value
            })

            this.setState({ hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess: true })

            //  All successful so refresh main page and close

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
                        Submit Hardklor/Bullseye Run
                    </div>
                    <div style={ { marginBottom: 3 } }>
                        Use this form to run the Hardklor/Bullseye feature detection pipeline on:
                    </div>
                    { this.props.scanFilename_Array_Array.map( ( scanFilename_Array, index, array ) => {

                        const scanFilename_Display = scanFilename_Array.join( ", " )
                        return (
                            <div key={ scanFilename_Display }>
                                { scanFilename_Display }
                            </div>
                        )
                    } ) }
                </div>

                {
                    ( this.state.hardklor_And_Bullseye_Files_FileUpload_CompleteSuccess ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                        >
                            <div>
                                Successful Submit:
                            </div>

                            <div>
                                Hardklor Conf file: { this.state.hardklor_Conf_File_Filename }
                            </div>
                            <div>
                                Bullseye Conf file: { this.state.bullseye_Conf_File_Filename }
                            </div>

                            { this.props.mainParams.scanFileSelection_For_FeatureDetectionRun ? (
                                //  Launched from other than "Upload Data" Section so display message
                                <div style={ { marginTop: 10 } }>
                                    View Status of Feature Detection Run under "<b>Upload Data</b>" section.
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

                    ) : (

                        <React.Fragment>

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                 // style={ { marginBottom: 12 } }
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
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Maximum length is " + FeatureDetection_Max_FieldLengths_Constants.FEATURE_DETECTION_MAX_LENGTH__DISPLAY_LABEL + " characters"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <input
                                                type="text"
                                                defaultValue={ _DISPLAY_LABEL__DEFAULT_VALUE }
                                                maxLength={ FeatureDetection_Max_FieldLengths_Constants.FEATURE_DETECTION_MAX_LENGTH__DISPLAY_LABEL }
                                                ref={ this._displayLabel_InputElement_Ref }
                                                onChange={ this._inputFields_Changed_BindThis }
                                                style={ { width: 110 } }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
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
                                        <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                            title={
                                                "Maximum length is " + FeatureDetection_Max_FieldLengths_Constants.FEATURE_DETECTION_MAX_LENGTH__DESCRIPTION + " characters"
                                            }
                                            { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                        >
                                            <input
                                                type="text"
                                                defaultValue={ _DESCRIPTION__DEFAULT_VALUE }
                                                maxLength={ FeatureDetection_Max_FieldLengths_Constants.FEATURE_DETECTION_MAX_LENGTH__DESCRIPTION }
                                                ref={ this._description_InputElement_Ref }
                                                onChange={ this._inputFields_Changed_BindThis }
                                                style={ { width: 450 } }
                                            />
                                        </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                                    </div>

                                    {/*  Hardklor Conf file to use  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <div>
                                            <span>Hardklor Conf file to use:</span>
                                            <span> </span>
                                            <span style={ { color: "red" } }>*</span>
                                        </div>
                                        <div>
                                            <span style={ { whiteSpace: "nowrap", fontSize: 12 } }>
                                                <a
                                                    href="static/sample_files_for_web_download/example_hardklor_conf.txt" download target="_blank" rel="noopener"
                                                >
                                                    Example Hardklor Conf file
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <input
                                            ref={ this._upload_Hardklor_Conf_File_InputElement_Ref }
                                            type="file"
                                            onChange={ this._inputFields_Changed_BindThis }
                                        />
                                    </div>

                                    {/*  Bullseye file to use  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <div>
                                            <span>Bullseye Conf file to use:</span>
                                            <span> </span>
                                            <span style={ { color: "red" } }>*</span>
                                        </div>
                                        <div>
                                            <span style={ { whiteSpace: "nowrap", fontSize: 12 } }>
                                                <a
                                                    href="static/sample_files_for_web_download/example_bullseye_conf.txt" download target="_blank" rel="noopener"
                                                >
                                                    Example Bullseye Conf file
                                                </a>
                                            </span>
                                        </div>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5 } }>
                                        <input
                                            ref={ this._upload_Bullseye_Conf_File_InputElement_Ref }
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
                                        Run Hardklor/Bullseye pipeline
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

                    )
                    }

            </>
        );
    }
}


