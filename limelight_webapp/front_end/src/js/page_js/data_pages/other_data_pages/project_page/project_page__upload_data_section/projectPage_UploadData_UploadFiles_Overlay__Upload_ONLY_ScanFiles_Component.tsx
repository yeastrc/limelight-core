/**
 * projectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Upload ONLY Scan Files
 *
 *
 */


import React from "react";
import {
    ProjectPage_UploadData_SendUploadFileToServer,
    ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback,
    ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params,
    ProjectPage_UploadData_SendUploadFileToServer__Send_Response
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_SendUploadFileToServer";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";
import {ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component";
import {
    ProjectPage_UploadData_UploadFiles__Common_Constants,
    ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";
import {
    projectPage_UploadData_UploadFiles__Common__Init_Upload__LimelightXMLFile_AndOr_ScanFile,
    ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response,
    projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile,
    projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile,
    projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile,
    projectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile,
    ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles__Common_Init_AND_Submit_Upload__LimelightXMLFile_AndOr_ScanFile";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";

//////////////////////

//   Upload ONLY Scan Files Component


/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params
    accepted_ScanFilename_Suffix_List: Array<string>
    callbackOn_Close_Clicked: ()=>void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component_State {

    submitButton_Enabled?: boolean
    force_ReRender_Object?: object
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component_State > {

    private readonly _fileInput_ScanFile_Ref :  React.RefObject<HTMLInputElement>

    private _scan_Files_Data: Array<ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data> = []

    private _internal_Identifier_PrevValue__For__ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data = 0;

    private _accepted_ScanFilename_Suffix_List: Array<string>
    private _accepted_ScanFilename_Suffixes_CommaDelim: string

    private _projectPage_UploadData_SendUploadFileToServer__InProgress: ProjectPage_UploadData_SendUploadFileToServer

    private _submit_InProgress: boolean = false;

    private _component_Mounted: boolean = false;

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component_Props) {
        super(props);

        this._fileInput_ScanFile_Ref = React.createRef();

        {
            this._accepted_ScanFilename_Suffix_List = ProjectPage_UploadData_UploadFiles__Common_Constants.accepted_ScanFilename_Suffix_List__DEFAULT //  DEFAULT

            if ( this.props.accepted_ScanFilename_Suffix_List ) {

                this._accepted_ScanFilename_Suffix_List = this.props.accepted_ScanFilename_Suffix_List;
            }

            this._accepted_ScanFilename_Suffixes_CommaDelim = this._accepted_ScanFilename_Suffix_List.join(",");
        }

        this.state = { submitButton_Enabled: false }
    }

    /**
     *
     */
    componentDidMount() {

        this._component_Mounted = true;
    }

    /**
     *
     */
    componentWillUnmount() {
        try {
            this._component_Mounted = false;

            if ( this._projectPage_UploadData_SendUploadFileToServer__InProgress ) {
                this._projectPage_UploadData_SendUploadFileToServer__InProgress.abort_FileSend();
            }

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private _scanFile_InputElement_OnChangeEvent( event: React.ChangeEvent<HTMLInputElement> ) : void {

        const files_Selected = event.target.files;

        if ( files_Selected.length === 0 ) {
            //  No file selected so just exit

            return; // EARLY RETURN
        }

        for ( const file_Selected of files_Selected ) {
            //  Process each file selected, likely only 1

            const filename = file_Selected.name;

            let filename_Suffix_IsValid = false;

            for ( const accepted_ScanFilename_Suffix of this._accepted_ScanFilename_Suffix_List ) {
                if ( filename.endsWith( accepted_ScanFilename_Suffix ) ) {
                    filename_Suffix_IsValid = true;
                    break;
                }
            }

            if ( ! filename_Suffix_IsValid ) {

                window.alert( "scan filename must end with one of the valid suffixes: " + this._accepted_ScanFilename_Suffixes_CommaDelim );
                return; // EARLY RETURN
            }

            const single_UploadFile_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data = {
                filename,
                file_JS_File_Object: file_Selected,
                internal_Identifier: ++this._internal_Identifier_PrevValue__For__ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data,
                fileImportSubmit_Complete: false,
                fileSendToServer_Complete: false,
                fileSendToServer_Percentage: undefined,
                fileSendToServer_ErrorMessage: undefined
            }

            this._scan_Files_Data.push( single_UploadFile_Data )
        }

        event.target.value = ""; // Clear selection to re-use same <input>

        this.setState({ submitButton_Enabled: true, force_ReRender_Object: {} })
    }

    /**
     *
     * @param event
     */
    private _submitUpload( event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) {

        if ( this._scan_Files_Data.length === 0 ) {

            window.alert("No Scan Files")

            this.setState({ submitButton_Enabled: false, force_ReRender_Object: {} })

            return; // EARLY RETURN
        }

        this._submit_InProgress = true;

        this.setState({ force_ReRender_Object: {} })

        this._submitUpload_Main()
    }

    /**
     *
     */
    private async _submitUpload_Main() {
        try {
            let error = false;

            let fileIndex = 0;

            for ( const scan_Files_Data_Entry of this._scan_Files_Data ) {

                //  Submit each Scan file as separate import

                const filesUploaded: Array<ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File> = []

                scan_Files_Data_Entry.fileSendToServer_Percentage = 1;  // Start display of progress bar
                this.setState({ force_ReRender_Object: {} })

                const init_Upload_Response = await projectPage_UploadData_UploadFiles__Common__Init_Upload__LimelightXMLFile_AndOr_ScanFile({
                    projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                    searchName: undefined, searchShortName: undefined //  No search... are applicable when import only scan file
                });

                if ( ! this._component_Mounted ) {
                    return;  // EARLY RETURN
                }

                if ( ! this._component_Mounted ) {
                    return;  // EARLY RETURN
                }

                try {
                    fileIndex++

                    const result = await this._upload_File({
                        projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                        single_UploadFile_Data: scan_Files_Data_Entry,
                        isLimelightXMLFile: false,
                        fileIndex,
                        fileType: this.props.mainParams.limelight_import_file_type_scan_file,
                        init_Upload_Response
                    });

                    const submit_Upload_Request_Single_File: ProjectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile__Request_Single_File = {
                        isLimelightXMLFile : false,
                        uploadedFilename : scan_Files_Data_Entry.filename,
                        fileType: this.props.mainParams.limelight_import_file_type_scan_file,
                        fileIndex
                    }

                    filesUploaded.push( submit_Upload_Request_Single_File )

                    scan_Files_Data_Entry.fileSendToServer_Percentage = undefined;

                    if ( ! result.statusSuccess ) {
                        scan_Files_Data_Entry.fileSendToServer_ErrorMessage  = result.errorMessage
                        error = true;
                        break;
                    }
                } catch (e) {

                    scan_Files_Data_Entry.fileSendToServer_ErrorMessage = "Failed Upload"
                    error = true;

                    throw e;
                }

                //  TODO  FAKE
                // scan_Files_Data_Entry.upload_ErrorMessage  = "FAKE ERROR"
                // error = true;

                if ( ! this._component_Mounted ) {
                    return;  // EARLY RETURN
                }

                if ( ! error ) {

                    await projectPage_UploadData_UploadFiles__Common_Submit_Upload__LimelightXMLFile_AndOr_ScanFile({
                        projectIdentifier: this.props.mainParams.projectIdentifierFromURL,
                        uploadKey: init_Upload_Response.uploadKey,
                        searchName: undefined,
                        searchShortName: undefined,
                        filesUploaded,
                        searchTagList: undefined,
                        searchTagCategoryAndItsSearchTagsList: undefined
                    })


                    scan_Files_Data_Entry.fileSendToServer_Complete = false;

                    scan_Files_Data_Entry.fileImportSubmit_Complete = true;
                }

                this.setState({ force_ReRender_Object: {} })
            }

            if ( ! error ) {

                //  All successful so refresh main page and close

                this.props.mainParams.callback_UpdateAfterSuccessfulSubmit();

                this.props.callbackOn_Close_Clicked()
            }

            this.setState({ force_ReRender_Object: {} })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    private async _upload_File(
        {
            projectIdentifier, single_UploadFile_Data, isLimelightXMLFile, fileIndex, fileType, init_Upload_Response
        } : {
            projectIdentifier: string
            single_UploadFile_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data
            isLimelightXMLFile: boolean
            fileIndex: number
            fileType: number
            init_Upload_Response: ProjectPage_UploadData_UploadFiles__Common_Init_Upload__LimelightXMLFile_AndOr_ScanFile_Response
        }
    ) : Promise<{
        statusSuccess: boolean
        errorMessage: string
    }> {

        let uniqueRequestIdentifier_ForThisFile = "";
        {
            const now = new Date()

            uniqueRequestIdentifier_ForThisFile = "MS" + now.getTime().toString()
        }

        try {
            single_UploadFile_Data.fileSendToServer_Percentage = 1; // start at 1 percent

            this.setState({ force_ReRender_Object: {} })

            //  Reloads page if any error
            const initializeResult = await projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Initialize__LimelightXMLFile_AndOr_ScanFile({
                projectIdentifier,
                uniqueRequestIdentifier_ForThisFile,
                uploadKey: init_Upload_Response.uploadKey,
                fileIndex,
                fileType,
                filename: single_UploadFile_Data.filename,
                uploadFileSize: single_UploadFile_Data.file_JS_File_Object.size,
            })

            if ( ! initializeResult.statusSuccess  ) {

                //  EARLY RETURN
                return {
                    statusSuccess: initializeResult.statusSuccess,
                    errorMessage: initializeResult.errorMessage
                }
            }

            const progress_Callback: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback =
                (params: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params) : void => {

                    single_UploadFile_Data.fileSendToServer_Percentage = params.progressPercent

                    this.setState({ force_ReRender_Object: {} })
                }

            this._projectPage_UploadData_SendUploadFileToServer__InProgress = new ProjectPage_UploadData_SendUploadFileToServer({
                projectIdentifierFromURL: this.props.mainParams.projectIdentifierFromURL,

                maxFileUploadChunkSize: initializeResult.maxFileUploadChunkSize,

                isLimelightXMLFile,
                fileToUpload: single_UploadFile_Data.file_JS_File_Object,
                fileIndex,
                fileType,
                filename: single_UploadFile_Data.filename,
                uploadKey: init_Upload_Response.uploadKey,
                requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: initializeResult.requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified,
                progress_Callback
            })

            let sendResult: ProjectPage_UploadData_SendUploadFileToServer__Send_Response


            try {
                sendResult = await this._projectPage_UploadData_SendUploadFileToServer__InProgress.projectPage_UploadData_SendUploadFileToServer({
                    uniqueRequestIdentifier_ForThisFile
                });

            } catch (e) {

            } finally {

                this._projectPage_UploadData_SendUploadFileToServer__InProgress = undefined;
            }

            if ( ! sendResult.statusSuccess  ) {

                try {
                    const cancelDeleteOfFile = await projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Cancel_Delete__LimelightXMLFile_AndOr_ScanFile({
                        projectIdentifier,
                        uniqueRequestIdentifier_ForThisFile,
                        uploadKey: init_Upload_Response.uploadKey,
                        fileIndex,
                        fileType,
                        filename: single_UploadFile_Data.filename
                    });

                } catch (e) {
                }

                //  EARLY RETURN
                return {
                    statusSuccess: sendResult.statusSuccess,
                    errorMessage: sendResult.errorMessage
                }
            }

            /////////////////////

            //  Reloads page if any error
            const submitFinalOfFile = await projectPage_UploadData_UploadFiles__Common_SingleFileUpload_Submit__LimelightXMLFile_AndOr_ScanFile({
                projectIdentifier,
                uniqueRequestIdentifier_ForThisFile,
                uploadKey: init_Upload_Response.uploadKey,
                fileIndex,
                fileType,
                filename: single_UploadFile_Data.filename,
                uploadFileSize: single_UploadFile_Data.file_JS_File_Object.size
            })

            return {
                statusSuccess: submitFinalOfFile.statusSuccess,
                errorMessage: submitFinalOfFile.errorMessage
            };


            {
                const msg = "Need to Update for changes to server side.  See Upload of Search (Limelight XML file, FASTA file, Scan Files)"
                console.warn(msg)
                throw Error(msg)
            }

            // Call Initialize Upload Single File Webservice

            // const progress_Callback: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback =
            //     (params: ProjectPage_UploadData_SendUploadFileToServer__Progress_Callback_Params) : void => {
            //
            //         single_UploadFile_Data.fileSendToServer_Percentage = params.progressPercent
            //
            //         this.setState({ force_ReRender_Object: {} })
            //     }
            //
            // this._projectPage_UploadData_SendUploadFileToServer__InProgress = new ProjectPage_UploadData_SendUploadFileToServer({
            //     projectIdentifierFromURL: this.props.mainParams.projectIdentifierFromURL,
            //     maxFileUploadChunkSize: this.props.mainParams.maxFileUploadChunkSize,
            //     isLimelightXMLFile,
            //     fileToUpload: single_UploadFile_Data.file_JS_File_Object,
            //     fileIndex,
            //     fileType,
            //     filename: single_UploadFile_Data.filename,
            //     uploadKey: init_Upload_Response.uploadKey,
            //     requiredChunkSize_ExceptLastChunk__NullWhenNotSpecified: undefined, // TODO  Need to populate
            //     progress_Callback
            // })
            //
            // try {
            //     const sendResult = await this._projectPage_UploadData_SendUploadFileToServer__InProgress.projectPage_UploadData_SendUploadFileToServer({
            //         uniqueRequestIdentifier_ForThisFile: undefined  // TODO  Need to populate
            //     });
            //
            //     return { sendResult };
            //
            // } catch (e) {
            //
            //     this._projectPage_UploadData_SendUploadFileToServer__InProgress = undefined;
            // }


            // Call Submit Upload Single File Webservice


        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     *
     */
    render() {

        const choose_type_of_data_to_import_TextBelowLink_FontSize = 12; // in px

        return (

            <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right ">
                <div style={ { marginBottom: 20 } }>
                    <div style={ { fontSize: 18, fontWeight: "bold" } }>
                        <span>Import Scan Files</span>
                    </div>
                    <div style={ { fontSize: choose_type_of_data_to_import_TextBelowLink_FontSize } }>
                        Currently supported formats: mzML, mzXML
                    </div>
                </div>

                {/*  Scan Files  */}

                { this.props.mainParams.limelight_import_file_type_scan_file !== undefined && this.props.mainParams.limelight_import_file_type_scan_file !== null ? (
                    <div style={ { marginBottom: 11 } }>
                        <div>
                            <input
                                ref={ this._fileInput_ScanFile_Ref }
                                type="file"
                                accept={ this._accepted_ScanFilename_Suffixes_CommaDelim }
                                style={ { display: "none" } }
                                onChange={ event => {
                                    this._scanFile_InputElement_OnChangeEvent( event );
                                }}
                            />
                        </div>
                        <div>
                            { this._scan_Files_Data.map( scan_Files_Data__Entry_To_Render => {
                                if ( ! scan_Files_Data__Entry_To_Render ) {
                                    return null;
                                }
                                return (
                                    <div
                                        key={ scan_Files_Data__Entry_To_Render.internal_Identifier }
                                        style={ { marginBottom: 3 } }
                                    >
                                        <ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component
                                            key={ scan_Files_Data__Entry_To_Render.internal_Identifier }
                                            single_UploadFile_Data={ scan_Files_Data__Entry_To_Render }
                                            callbackOn_Delete_Clicked={ () => {

                                                this._scan_Files_Data = this._scan_Files_Data.filter(scan_Files_Data__Entry_To_FilterOn => {
                                                    if ( scan_Files_Data__Entry_To_FilterOn.internal_Identifier === scan_Files_Data__Entry_To_Render.internal_Identifier ) {
                                                        return false;
                                                    }
                                                    return true;
                                                })

                                                this.setState({ force_ReRender_Object: {} })
                                            } }
                                            submit_InProgress={ this._submit_InProgress }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                        { ( ! this._submit_InProgress ) ? (
                            // Display "+Add Scan File" since NOT Submission in progress
                            <React.Fragment>
                                <div>
                                    <span
                                        className=" fake-link "
                                        onClick={ event => {
                                            if ( this._fileInput_ScanFile_Ref.current ) {
                                                this._fileInput_ScanFile_Ref.current.click()
                                            }
                                        }}
                                    >+Add Scan File</span>
                                </div>
                                <div>
                                    <div style={ { fontSize: "80%" } }>
                                        (Max file size: { this.props.mainParams.maxScanFileUploadSizeFormatted })
                                    </div>
                                </div>
                            </React.Fragment>
                        ) : null }

                    </div>
                ) : null }

                { this._submit_InProgress ? (
                    <div style={ { marginTop: 10 } }>
                        Submitting request to server
                    </div>

                ) : null }

                <div style={ { marginTop: 10 } }>
                    { ! this._submit_InProgress ? (
                        <div style={ { display: "inline-block", position: "relative" } }>
                            <button
                                disabled={ ( ! this.state.submitButton_Enabled ) }
                                onClick={ event => {

                                    this._submitUpload( event );
                                }}
                            >
                                Submit Upload
                            </button>
                            {/*  Cover button when disabled so have tooltip  */}

                            { ! this.state.submitButton_Enabled ? (
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Submit Upload. Enabled when at least one scan file is selected.
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div style={ { position: "absolute", inset: 0 } }></div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ) : null }
                        </div>
                    ) : null }
                    <span> </span>
                    <button
                        onClick={ event => {
                            this.props.callbackOn_Close_Clicked()
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        );
    }
}


