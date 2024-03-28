/**
 * projectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Gold Standard Import - Submit Import
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";

import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import { GoldStandard_Max_FieldLengths_Constants } from "page_js/constants_across_webapp/gold_standard_constants/goldStandard_Max_FieldLengths_Constants";
import {
    projectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice,
    ProjectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice_SendDataObject
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";


const _DISPLAY_LABEL__DEFAULT_VALUE = "GoldStd"

const _DESCRIPTION__DEFAULT_VALUE = "Gold Standard"

const _INPUT_FIELD_LABEL__MARGIN_RIGHT = 6;
const _INPUT_FIELD_LABEL__MARGIN_TOP = 2;



/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params

    projectScanFileId: number
    scanFilename_Array: Array<string> // Since can be > 1 scan filename for projectScanFileId
    callbackOn_Cancel_Close_Clicked: () => void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component_State {


    forceRerenderObject?: object      //  Force Rerender object

    goldStandard_File_Filename?: string

    displayLabelField_Empty?: boolean
    upload_Files_Button_Disabled?: boolean
    goldStandard_FileUpload_InProgress?: boolean
    files_FileUpload_CompleteSuccess?: boolean
    files_FileUpload_Failed?: boolean
    files_FileUpload_Failed_ErrorMessage?: string

    goldStandardFile_Upload_ErrorMessage?: string
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component_State > {

    private _inputFields_Changed_BindThis = this._inputFields_Changed.bind(this);
    private _uploadButtonClicked_BindThis = this._uploadButtonClicked.bind(this);

    // private _DO_NOT_CALL_BoundMethods_TypeTest() { // Function only to test that methods that are .bind(this) are correct function signature
    //
    // }

    private _displayLabel_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _description_InputElement_Ref : React.RefObject<HTMLInputElement>
    private _upload_GoldStandardFile_InputElement_Ref : React.RefObject<HTMLInputElement>

    private _upload_Button_Ref : React.RefObject<HTMLButtonElement>

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component_Props) {
        super(props);

        this._displayLabel_InputElement_Ref = React.createRef();
        this._description_InputElement_Ref = React.createRef();
        this._upload_GoldStandardFile_InputElement_Ref = React.createRef();
        this._upload_Button_Ref = React.createRef();

        this.state = {
            forceRerenderObject: {},
            upload_Files_Button_Disabled: true,
            goldStandard_FileUpload_InProgress: false,
            files_FileUpload_CompleteSuccess: false,
            files_FileUpload_Failed: false
        };
    }

    private _inputFields_Changed() {

        if ( ! this._displayLabel_InputElement_Ref.current ) {
            return;
        }
        if ( ! this._upload_GoldStandardFile_InputElement_Ref.current ) {
            return; // EARLY RETURN
        }

        if ( this._displayLabel_InputElement_Ref.current.value === "" ) {

            //  No Display label

            this.setState({ upload_Files_Button_Disabled: true, displayLabelField_Empty: true });

            return; // EARLY RETURN
        }

        this.setState({ displayLabelField_Empty: false });

        if ( this._upload_GoldStandardFile_InputElement_Ref.current.files.length === 0 ) {
            // No File Selected

            this.setState({ upload_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }
        if ( this._upload_GoldStandardFile_InputElement_Ref.current.files.length > 1 ) {
            // > 1 File Selected
            window.alert("Only 1 Gold Standard file can be uploaded at a time")

            this.setState({ upload_Files_Button_Disabled: true });

            return; // EARLY RETURN
        }

        this.setState({ upload_Files_Button_Disabled: false });
    }

    /**
     *
     */
    private _uploadButtonClicked( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {
        try {
            event.stopPropagation();

            if ( ! this._upload_GoldStandardFile_InputElement_Ref.current ) {
                return; // EARLY RETURN
            }
            if ( this._upload_GoldStandardFile_InputElement_Ref.current.files.length === 0 ) {
                // No File Selected
                return; // EARLY RETURN
            }
            if ( this._upload_GoldStandardFile_InputElement_Ref.current.files.length > 1 ) {
                // > 1 File Selected
                window.alert("Only 1 Gold Standard file can be uploaded at a time")
                return; // EARLY RETURN
            }

            if ( this._displayLabel_InputElement_Ref.current.value === "" ) {

                //  No Display label

                this.setState({ upload_Files_Button_Disabled: true, displayLabelField_Empty: true });

                return; // EARLY RETURN
            }

            const fileToSend_GoldStandard = this._upload_GoldStandardFile_InputElement_Ref.current.files[0]; // first element

            this.setState({ goldStandard_FileUpload_InProgress: true, goldStandard_File_Filename: fileToSend_GoldStandard.name })

            this._uploadPerform({ fileToSend_GoldStandard });  // ignore return value

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _uploadPerform(
        {
            fileToSend_GoldStandard
        } : {
            fileToSend_GoldStandard: File
        }
    ): Promise<void> {
        try {

            const displayLabel = this._displayLabel_InputElement_Ref.current.value
            const description = this._description_InputElement_Ref.current.value

            {
                const sendDataObject: ProjectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice_SendDataObject = {
                    projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                    projectScanFileId: this.props.projectScanFileId,
                    filename: fileToSend_GoldStandard.name,
                    displayLabel,
                    description
                }

                const result =
                    await projectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice({
                        sendDataObject, fileToSend: fileToSend_GoldStandard
                    })

                if ( result.projectLocked ) {
                    //  reload page
                    limelight__ReloadPage_Function()

                    return // EARLY RETURN
                }

                if ( ! result.statusSuccess ) {
                    if ( ! result.errorMessage ) {
                        throw Error("No error message when result.statusSuccess not true: from projectPage_UploadData_GoldStandard_Import_UploadFile_SendFileToServerWebservice  bullseyeConfFile: true")
                    }

                    this.setState({ files_FileUpload_Failed: true, goldStandardFile_Upload_ErrorMessage: result.errorMessage })

                    return; // EARLY RETURN
                }
            }

            this.setState({ files_FileUpload_CompleteSuccess: true })

            window.setTimeout( () => { try {

                //  All successful so refresh main page

                this.props.mainParams.callback_UpdateAfterSuccessfulSubmit();

            } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }}, 10 )

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
                    <div style={ { color: "red", marginBottom: 10 } }>
                        <div style={ { fontSize: 18 } }>
                            WARNING:  In Testing
                        </div>
                        <div>
                            Currently in testing.  All Imports may be deleted at any time.
                        </div>
                    </div>

                    <div style={ { fontSize: 18, fontWeight: "bold", marginBottom: 6 } }>
                        Import Gold Standard file
                    </div>

                    <div >
                        <span>Use this form to import Gold Standard file for </span>
                        <span>{ this.props.scanFilename_Array.join( ", " ) }</span>
                    </div>

                </div>

                {
                    ( this.state.goldStandardFile_Upload_ErrorMessage ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Gold Standard file failed to import: { this.state.goldStandard_File_Filename }
                            </div>
                            <div>
                                Error: { this.state.goldStandardFile_Upload_ErrorMessage }
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

                    ) : ( this.state.files_FileUpload_CompleteSuccess ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Import Successful:
                            </div>
                            <div>
                                Gold Standard file: { this.state.goldStandard_File_Filename }
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

                    ) : ( this.state.files_FileUpload_Failed ) ? (

                        <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                             style={ { marginBottom: 12 } }
                            // style={ { padding : 6 } }
                        >
                            <div>
                                Failed Import
                            </div>
                            <div>
                                Gold Standard file: { this.state.goldStandard_File_Filename }
                            </div>
                            { this.state.files_FileUpload_Failed_ErrorMessage ? (
                                <div style={ { marginTop: 10 } }>
                                    { this.state.files_FileUpload_Failed_ErrorMessage }
                                </div>
                            ) : null }

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


                    ) : ( this.state.goldStandard_FileUpload_InProgress ) ? (
                        <React.Fragment>

                            <div className=" top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                                 style={ { marginBottom: 12 } }
                                // style={ { padding : 6 } }
                            >
                                <div>
                                    Import In Progress:
                                </div>
                                <div>
                                    Gold Standard file: { this.state.goldStandard_File_Filename }
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
                                            maxLength={ GoldStandard_Max_FieldLengths_Constants.GOLD_STANDARD_MAX_LENGTH__DISPLAY_LABEL }
                                            ref={ this._displayLabel_InputElement_Ref }
                                            onChange={ this._inputFields_Changed_BindThis }
                                            title={ "Maximum length is " + GoldStandard_Max_FieldLengths_Constants.GOLD_STANDARD_MAX_LENGTH__DISPLAY_LABEL + " characters" }
                                            style={ { width: 110 } }
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
                                            maxLength={ GoldStandard_Max_FieldLengths_Constants.GOLD_STANDARD_MAX_LENGTH__DESCRIPTION }
                                            ref={ this._description_InputElement_Ref }
                                            onChange={ this._inputFields_Changed_BindThis }
                                            title={ "Maximum length is " + GoldStandard_Max_FieldLengths_Constants.GOLD_STANDARD_MAX_LENGTH__DESCRIPTION + " characters" }
                                            style={ { width: 450 } }
                                        />
                                    </div>

                                    {/*  Gold Standard file to import  */}

                                    {/*  Column 1  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <span>Gold Standard file to import:</span>
                                        <span> </span>
                                        <span style={ { color: "red" } }>*</span>
                                    </div>
                                    {/*  Column 2  */}
                                    <div style={ { marginBottom: 5, marginRight: _INPUT_FIELD_LABEL__MARGIN_RIGHT, marginTop: _INPUT_FIELD_LABEL__MARGIN_TOP } }>
                                        <input
                                            ref={ this._upload_GoldStandardFile_InputElement_Ref }
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
                                        disabled={ this.state.upload_Files_Button_Disabled }
                                    >
                                        Import Gold Standard File
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

                <div className=" top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                     style={ { overflowX: "hidden", overflowY: "auto", borderStyle: "solid", borderWidth: 1 } }
                     // style={ { marginBottom: 12 } }
                    // style={ { padding : 6 } }
                >
                    <div style={ { padding: 8 } }>
                        <h3>
                            Gold Standard Input File Format:
                        </h3>
                        <div>
                            <div>
                                Example Lines:
                            </div>
                            <div>
                                { "64766,YKAAFTECCQAADK,469.0266" }
                            </div>
                            <div>
                                { "64766,YKAAFTECCQAADK,469.0266{2};57.021464{9}" }
                            </div>

                            <div>
                                &nbsp;
                            </div>

                            <div>
                                Comment line: start with '#'
                            </div>

                            <div>
                                &nbsp;
                            </div>

                            <div>
                                Each line in the file:
                            </div>

                            { "<scan number>,<peptide sequence - only sequence>,[<modifications>]" }

                            <ul>
                                <li>
                                    { "<modifications> is the Variable and Open Modifications" }
                                </li>
                                <li>
                                    Static Modifications are ignored
                                </li>
                            </ul>

                            { "<modifications> format:" }

                            <ul>
                                <li>
                                    { "<mod mass>{<mod positions>};<next entry>" }
                                    <ul>
                                        <li>
                                            semicolon delimited
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            { "<mod positions> format: one of:" }
                            <div>
                                (The mod can be in any of these positions mutually exclusively)
                            </div>

                            <ul>
                                <li>
                                    { "<single position>" }
                                    <ul>
                                        <li>
                                            ‘n' and 'c’ allowed
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    { "<start position>-<end position>" }
                                    <ul>
                                        <li>
                                            a dash between them
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    { "<position 1>:<position 2>: … : <position N>" }
                                    <ul>
                                        <li>
                                            colon delimited
                                        </li>
                                        <li>
                                            ‘n' and 'c’ allowed
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                            <ul>
                                <li>
                                    { "'N/A' or 'n/a' - without the quotes - For NO Location - Also supported is no ‘{' ’}' or ‘{}’" }
                                </li>
                            </ul>

                            <div>
                                Each line must have a unique scan number
                            </div>
                            <div>
                                &nbsp;
                            </div>

                            <div>
                                For Single Gold Standard Entry Line:
                            </div>
                            <div>
                                For Single Modification Mass Entry AND/OR Multiple entries for same modification mass:
                            </div>
                            <ul>
                                <li>
                                    No duplicates
                                </li>
                                <li>
                                    No overlap of ranges or ranges and positions
                                </li>
                            </ul>

                            <div>
                                Every value will be trimmed of spaces before and after so can add white space as desired for readability.
                            </div>

                        </div>

                    </div>
                </div>

            </>
        );
    }
}


