/**
 * projectPage_UploadData_UploadFiles_Overlay.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay
 *
 *
 */

//JavaScript directive:   all variables have to be declared with "var", maybe other things
"use strict";

///////////////////////////////////////////

import React from 'react'

import {ModalOverlay_Limelight_Component_v001_B_FlexBox} from "page_js/common_all_pages/modal_overlay_react/modal_overlay_with_titlebar_react_v001_B_FlexBox/modalOverlay_WithTitlebar_React_v001_B_FlexBox";

import { reportWebErrorToServer } from 'page_js/common_all_pages/reportWebErrorToServer';

import { webserviceCallStandardPost } from 'page_js/webservice_call_common/webserviceCallStandardPost';
import {
    limelight_add_ReactComponent_JSX_Element_To_DocumentBody,
    Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF
} from "page_js/common_all_pages/limelight_add_ReactComponent_JSX_Element_To_DocumentBody";
import {limelight__IsVariableAString} from "page_js/common_all_pages/limelight__IsVariableAString";
import {Spinner_Limelight_Component} from "page_js/common_all_pages/spinner_ReactComponent_Limelight";
import {ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component";
import {ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component";
import {
    ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SelectScanFile_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SelectScanFile_Component";
import {
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback,
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component";
import {ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";
import {ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component";
import {ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component";
import {ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component";
import { ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component } from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component";
import { ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component } from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/projectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component";
import { limelight__ReloadPage_Function } from "page_js/common_all_pages/limelight__ReloadPage_Function";

const _Overlay_Title = "Import Data Files"

const _Overlay_Width_Min = 700;
const _Overlay_Width_Max = 700;
const _Overlay_Height_Min = 700;
const _Overlay_Height_Max = 700;


/**
 *
 */
export class ProjectPage_UploadData_UploadFiles__Params {

    projectIdentifierFromURL: string

    callback_UpdateAfterSuccessfulSubmit: () => void

    is_uploading_FileObjectStorage_Files: boolean

    limelight_import_file_type_limelight_xml_file: number
    limelight_import_file_type_fasta_file: number
    limelight_import_file_type_scan_file: number

    maxLimelightXMLFileUploadSize: number
    maxLimelightXMLFileUploadSizeFormatted: string
    maxFASTAFileUploadSize: number
    maxFASTAFileUploadSizeFormatted: string
    maxScanFileUploadSize: number
    maxScanFileUploadSizeFormatted: string

    /**
     * Go Directly to Gold Standard Import and use this value
     */
    scanFileSelection_For_GoldStandardImport: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection

    /**
     * Go Directly to Feature Detection Import and use this value
     */
    scanFileSelection_For_FeatureDetectionImport: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection

    /**
     * Go Directly to Feature Detection Run and use this value
     */
    scanFileSelection_For_FeatureDetectionRun: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection

    // /**
    //  * User Selected a scan file in Limelight to import or process data for
    //  */
    // projectPage_UploadData_UploadFiles__Common_ScanFileSelection: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection
    //
    // /**
    //  * MUST and ONLY populated when projectPage_UploadData_UploadFiles__Common_ScanFileSelection populated
    //  */
    // importOrProcessing_Type_For_SelectedScanFile_Enum: ProjectPage_UploadData_UploadFiles__Params__ImportOrProcessing_Type_For_SelectedScanFile_Enum
}

/**
 *
 */
export const projectPage_UploadData_UploadFiles__OpenOverlay = function (
    {
        mainParams
    } : {
        mainParams: ProjectPage_UploadData_UploadFiles__Params
    }) {


    let overlay_AddedTo_DocumentBody_Holder : Limelight_ReactComponent_JSX_Element_AddedTo_DocumentBody_Holder_IF = undefined;

    const callbackOn_Close_Clicked = () : void => {

        overlay_AddedTo_DocumentBody_Holder.removeContents_AndContainer_FromDOM();
    }

    const overlayComponent = projectPage_UploadData_UploadFiles__OpenOverlay__GetComponent({ mainParams, callbackOn_Close_Clicked })

    overlay_AddedTo_DocumentBody_Holder = limelight_add_ReactComponent_JSX_Element_To_DocumentBody({ componentToAdd : overlayComponent })
}

/**
 *
 */
const projectPage_UploadData_UploadFiles__OpenOverlay__GetComponent = function (
    {
        mainParams,
        callbackOn_Close_Clicked
    } : {
        mainParams: ProjectPage_UploadData_UploadFiles__Params
        callbackOn_Close_Clicked: ()=>void
    }) : JSX.Element {

    return (
        <UploadData_UploadFiles_Overlay_Component
            mainParams={ mainParams }
            callbackOn_Close_Clicked={ callbackOn_Close_Clicked }
        />
    )
}

///////////////////////////////////////

//   INTERNAL

enum Internal__UploadSubType {
    LIMELIGHT_XML_AND_OPTIONAL_SCAN_FILES = "LIMELIGHT_XML_AND_OPTIONAL_SCAN_FILES",
    SCAN_FILES_ONLY = "SCAN_FILES_ONLY",
    GOLD_STANDARD_IMPORT_SELECT_SCAN_FILE = "GOLD_STANDARD_IMPORT_SELECT_SCAN_FILE",
    GOLD_STANDARD_IMPORT_FOR_SCAN_FILE = "GOLD_STANDARD_IMPORT_FOR_SCAN_FILE",
    FEATURE_DETECTION_IMPORT_SELECT_SCAN_FILE = "FEATURE_DETECTION_IMPORT_SELECT_SCAN_FILE",
    FEATURE_DETECTION_IMPORT_FOR_SCAN_FILE = "FEATURE_DETECTION_IMPORT_FOR_SCAN_FILE",
    FEATURE_DETECTION_RUN_SELECT_SCAN_FILE = "FEATURE_DETECTION_RUN_SELECT_SCAN_FILE",
    FEATURE_DETECTION_RUN_FOR_SCAN_FILE = "FEATURE_DETECTION_RUN_FOR_SCAN_FILE"
}

///////////

//   Main Overlay Component

/**
 *
 */
class UploadData_UploadFiles_Overlay_Component_Props {

    callbackOn_Close_Clicked: ()=>void

    mainParams: ProjectPage_UploadData_UploadFiles__Params
}

/**
 *
 */
class UploadData_UploadFiles_Overlay_Component_State {

    show_LoadingData_Message?: boolean
    accepted_ScanFilename_Suffix_List?: Array<string>
    project_Has_ScanFiles?: boolean
    uploadSubType?: Internal__UploadSubType
}

/**
 *
 */
class UploadData_UploadFiles_Overlay_Component extends React.Component< UploadData_UploadFiles_Overlay_Component_Props, UploadData_UploadFiles_Overlay_Component_State > {

    private _close_Cancel_Clicked_BindThis = this._close_Cancel_Clicked.bind(this);

    private _goldStandardImport_SelectScanFile_Callback_BindThis = this._goldStandardImport_SelectScanFile_Callback.bind(this)
    private _featureDetectionImport_SelectScanFile_Callback_BindThis = this._featureDetectionImport_SelectScanFile_Callback.bind(this)
    private _featureDetectionRun_SelectScanFile_Callback_BindThis = this._featureDetectionRun_SelectScanFile_Callback.bind(this)

    private _DONOTCALL() {

        const featureDetection_SelectScanFile_Callback: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback = this._featureDetectionImport_SelectScanFile_Callback
        const featureDetectionRun_SelectScanFile_Callback: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback = this._featureDetectionRun_SelectScanFile_Callback
    }

    private _scanFileSelection: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection

    /**
     *
     */
    constructor(props: UploadData_UploadFiles_Overlay_Component_Props) {
        super(props);

        let uploadSubType: Internal__UploadSubType = null

        if ( props.mainParams.scanFileSelection_For_GoldStandardImport  ) {

            //  Go Directly to Gold Standard Import
            this._scanFileSelection = props.mainParams.scanFileSelection_For_GoldStandardImport
            uploadSubType = Internal__UploadSubType.GOLD_STANDARD_IMPORT_FOR_SCAN_FILE
        }

        if ( props.mainParams.scanFileSelection_For_FeatureDetectionImport  ) {

            //  Go Directly to Feature Detection Import
            this._scanFileSelection = props.mainParams.scanFileSelection_For_FeatureDetectionImport
            uploadSubType = Internal__UploadSubType.FEATURE_DETECTION_IMPORT_FOR_SCAN_FILE
        }

        if ( props.mainParams.scanFileSelection_For_FeatureDetectionRun  ) {

            //  Go Directly to Feature Detection Run
            this._scanFileSelection = props.mainParams.scanFileSelection_For_FeatureDetectionRun
            uploadSubType = Internal__UploadSubType.FEATURE_DETECTION_RUN_FOR_SCAN_FILE
        }

        this.state = { show_LoadingData_Message: true, uploadSubType }
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._load__DataOnMount();

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }
    }

    /**
     *
     */
    private _load__DataOnMount() {

        const promises: Array< Promise<void>> = []

        {
            const promise = this._load__accepted_ScanFilename_Suffix_List();
            promises.push(promise)
        }
        {
            const promise = this._load__project_ContainsAny_ScanFiles();
            promises.push(promise)
        }

        const promisesAll = Promise.all(promises)

        promisesAll.catch(reason => {

        })
        promisesAll.then(noValue => { try {

            this.setState({ show_LoadingData_Message: false })

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})


    }

    /**
     *
     */
    private _load__accepted_ScanFilename_Suffix_List() {

        return new Promise<void>( (resolve, reject) => { try {

            let requestData = {
                projectIdentifier : this.props.mainParams.projectIdentifierFromURL
            }

            const url = "d/rws/for-page/project-upload-data-upload-get-supported-scan-filename-suffixes";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    const statusSuccess = responseData.statusSuccess;
                    const projectLocked = responseData.projectLocked;

                    if ( ! statusSuccess ) {
                        if ( projectLocked ) {
                            //  Project is now locked so reload page so not display option to upload files for import
                            //  reload current URL
                            limelight__ReloadPage_Function()
                        }
                        //  Probably shouldn't get here
                        throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                    }

                    const accepted_ScanFilename_Suffix_List: Array<string> = responseData.accepted_ScanFilename_Suffix_List;

                    if ( accepted_ScanFilename_Suffix_List ) {
                        //  Validate
                        if ( ! ( accepted_ScanFilename_Suffix_List instanceof Array ) ) {
                            const msg = " responseData.accepted_ScanFilename_Suffix_List is NOT an Array";
                            console.warn(msg);
                            throw Error(msg)
                        }
                        for ( const accepted_ScanFilename_Suffix of accepted_ScanFilename_Suffix_List ) {
                            if ( ! limelight__IsVariableAString( accepted_ScanFilename_Suffix ) ) {
                                const msg = "entry in responseData.accepted_ScanFilename_Suffix_List is NOT a string";
                                console.warn(msg);
                                throw Error(msg)
                            }
                        }
                    }

                    this.setState({ accepted_ScanFilename_Suffix_List })

                    resolve()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }

    /**
     *
     */
    private _load__project_ContainsAny_ScanFiles() {

        return new Promise<void>( (resolve, reject) => { try {

            let requestData = {
                projectIdentifier : this.props.mainParams.projectIdentifierFromURL
            }

            const url = "d/rws/for-page/project-scan-files--project-contain-any-scan-files";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    const statusSuccess = responseData.statusSuccess;

                    if ( ! statusSuccess ) {
                        throw Error( "statusSuccess is false" );  ///  TODO  Need to display error
                    }

                    let project_Has_ScanFiles = false;

                    if ( responseData.project_Has_ScanFiles ) {
                        project_Has_ScanFiles = true;
                    }

                    this.setState({ project_Has_ScanFiles })

                    resolve()

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }})
    }
    /**
     *
     */
    private _close_Cancel_Clicked() {

        if ( this.props.callbackOn_Close_Clicked ) {

            this.props.callbackOn_Close_Clicked()
        }
    }

    private _goldStandardImport_SelectScanFile_Callback( params: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params ) {

        this._scanFileSelection = params.scanFileSelection

        this.setState({ uploadSubType: Internal__UploadSubType.GOLD_STANDARD_IMPORT_FOR_SCAN_FILE })
    }


    /**
     *
     */
    private _featureDetectionImport_SelectScanFile_Callback( params: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params ) {

        this._scanFileSelection = params.scanFileSelection

        this.setState({ uploadSubType: Internal__UploadSubType.FEATURE_DETECTION_IMPORT_FOR_SCAN_FILE })
    }

    /**
     *
     */
    private _featureDetectionRun_SelectScanFile_Callback( params: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params ) {

        this._scanFileSelection = params.scanFileSelection

        this.setState({ uploadSubType: Internal__UploadSubType.FEATURE_DETECTION_RUN_FOR_SCAN_FILE })
    }

    /**
     *
     */
    render() {

        const choose_type_of_data_to_import_Link_FontSize = 18; // in px
        const choose_type_of_data_to_import_TextBelowLink_FontSize = 12; // in px

        const marginAfter_Main_ImportType = 13; // in px

        return (
            <ModalOverlay_Limelight_Component_v001_B_FlexBox
                widthMinimum={ _Overlay_Width_Min }
                widthMaximum={ _Overlay_Width_Max }
                heightMinimum={ _Overlay_Height_Min }
                heightMaximum={ _Overlay_Height_Max }
                title={ _Overlay_Title }
                callbackOnClicked_Close={ this._close_Cancel_Clicked_BindThis }
                close_OnBackgroundClick={ false }>

                { this.state.show_LoadingData_Message ? (

                    <div className=" top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    >
                        <div style={ { marginBottom: 12, fontWeight: "bold", fontSize: 24, textAlign: "center" } }>
                            LOADING DATA
                        </div>
                        <div style={ { marginTop: 80, marginBottom: 80, textAlign: "center" }}>
                            <Spinner_Limelight_Component/>
                        </div>
                    </div>

                ) : this.state.uploadSubType === null ? (
                    //  User has not chosen what they want to upload

                    <div className="  top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right ">
                        <h1>
                            Choose type of data to import:
                        </h1>
                        <ul>
                            {/*  Import a Limelight XML file and associated files.  */}
                            <li style={ { fontSize: choose_type_of_data_to_import_Link_FontSize, marginBottom: marginAfter_Main_ImportType } }>
                                <div>
                                    <span
                                        className=" fake-link "
                                        onClick={ event => {
                                            this.setState({ uploadSubType: Internal__UploadSubType.LIMELIGHT_XML_AND_OPTIONAL_SCAN_FILES })
                                        }}
                                    >
                                        <span>Import Search Results</span>
                                    </span>
                                </div>
                                <div style={ { fontSize: choose_type_of_data_to_import_TextBelowLink_FontSize } }>
                                    <div>
                                        Import a Limelight XML file and associated files.
                                    </div>
                                    <div>
                                        Please
                                        <span > </span>
                                        <a href="https://limelight-ms.readthedocs.io/en/latest/using-limelight/conversion-guide.html" target="_blank" rel="noopener">read our documentation</a>
                                        <span > </span>
                                        for more information on creating a Limelight XML file from your data.
                                    </div>
                                </div>
                            </li>

                            {/*  Import Scan Files  */}
                            { this.props.mainParams.limelight_import_file_type_scan_file !== undefined && this.props.mainParams.limelight_import_file_type_scan_file !== null ? (
                                <li style={ { fontSize: choose_type_of_data_to_import_Link_FontSize, marginBottom: marginAfter_Main_ImportType } }>
                                    <div>
                                        <span
                                            className=" fake-link "
                                            onClick={ event => {
                                                this.setState({ uploadSubType: Internal__UploadSubType.SCAN_FILES_ONLY })
                                            }}
                                        >
                                            <span>Import Scan Files</span>
                                        </span>
                                    </div>
                                    <div style={ { fontSize: choose_type_of_data_to_import_TextBelowLink_FontSize } }>

                                        <span>Currently supported formats: </span>

                                        { this.state.accepted_ScanFilename_Suffix_List.map( ((value, index, array) => {

                                            let commaSeparator_Element: JSX.Element = null
                                            if ( index < ( array.length - 1 ) ) {  // add ", " after all but last one
                                                commaSeparator_Element = (
                                                    <span>, </span>
                                                )
                                            }
                                            return (
                                                <span key={ value } style={ { whiteSpace: "nowrap" } }>
                                                    <span>{ value }</span>
                                                    { commaSeparator_Element }
                                                </span>
                                            )
                                        }))}
                                    </div>
                                </li>
                            ) : null }

                            {/*  Run Feature Detection for Scan File  */}
                            { this.state.project_Has_ScanFiles ? (
                                <li style={ { fontSize: choose_type_of_data_to_import_Link_FontSize, marginBottom: marginAfter_Main_ImportType } }>
                                    <div>
                                        <span
                                            className=" fake-link "
                                            onClick={ event => {
                                                this.setState({ uploadSubType: Internal__UploadSubType.FEATURE_DETECTION_RUN_SELECT_SCAN_FILE })
                                            }}
                                        >
                                            <span>Run Feature Detection for Scan File</span>
                                        </span>
                                    </div>
                                </li>
                            ) : null }

                            {/*  Import Feature Detection Result for Scan File  */}
                            { this.state.project_Has_ScanFiles ? (
                                <li style={ { fontSize: choose_type_of_data_to_import_Link_FontSize, marginBottom: marginAfter_Main_ImportType } }>
                                    <div>
                                        <span
                                            className=" fake-link "
                                            onClick={ event => {
                                                this.setState({ uploadSubType: Internal__UploadSubType.FEATURE_DETECTION_IMPORT_SELECT_SCAN_FILE })
                                            }}
                                        >
                                            <span>Import Feature Detection Result for Scan File</span>
                                        </span>
                                    </div>
                                </li>
                            ) : null }

                        </ul>
                    </div>

                ) : ( this.state.uploadSubType === Internal__UploadSubType.LIMELIGHT_XML_AND_OPTIONAL_SCAN_FILES ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__Upload_LimelightXMLFile_And_Optional_ScanFiles_Component
                        mainParams={ this.props.mainParams }
                        accepted_ScanFilename_Suffix_List={ this.state.accepted_ScanFilename_Suffix_List }
                        callbackOn_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.SCAN_FILES_ONLY ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__Upload_ONLY_ScanFiles_Component
                        mainParams={ this.props.mainParams }
                        accepted_ScanFilename_Suffix_List={ this.state.accepted_ScanFilename_Suffix_List }
                        callbackOn_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.GOLD_STANDARD_IMPORT_SELECT_SCAN_FILE ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component
                        mainParams={ this.props.mainParams }
                        selectScanFile_Callback={ this._goldStandardImport_SelectScanFile_Callback_BindThis }
                        callbackOn_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.GOLD_STANDARD_IMPORT_FOR_SCAN_FILE ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SubmitImport_Component
                        mainParams={ this.props.mainParams }
                        projectScanFileId={ this._scanFileSelection.projectScanFileId_List[0]}
                        scanFilename_Array={ this._scanFileSelection.scanFilename_Array_Array[0] }
                        callbackOn_Cancel_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.FEATURE_DETECTION_IMPORT_SELECT_SCAN_FILE ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SelectScanFile_Component
                        mainParams={ this.props.mainParams }
                        selectScanFile_Callback={ this._featureDetectionImport_SelectScanFile_Callback_BindThis  }
                        callbackOn_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.FEATURE_DETECTION_IMPORT_FOR_SCAN_FILE ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionImport_SubmitImport_Component
                        mainParams={ this.props.mainParams }
                        projectScanFileId={ this._scanFileSelection.projectScanFileId_List[0]}
                        scanFilename_Array={ this._scanFileSelection.scanFilename_Array_Array[0] }
                        callbackOn_Cancel_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.FEATURE_DETECTION_RUN_SELECT_SCAN_FILE ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component
                        mainParams={ this.props.mainParams }
                        selectScanFile_Callback={ this._featureDetectionRun_SelectScanFile_Callback_BindThis  }
                        callbackOn_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) :  ( this.state.uploadSubType === Internal__UploadSubType.FEATURE_DETECTION_RUN_FOR_SCAN_FILE ) ? (

                    <ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SubmitRun_Component_Component
                        mainParams={ this.props.mainParams }
                        projectScanFileId_List={ this._scanFileSelection.projectScanFileId_List}
                        scanFilename_Array_Array={ this._scanFileSelection.scanFilename_Array_Array }
                        callbackOn_Save_Clicked={ null } // TODO  set to a value
                        callbackOn_Cancel_Close_Clicked={ this._close_Cancel_Clicked_BindThis }
                    />

                ) : null }

            </ModalOverlay_Limelight_Component_v001_B_FlexBox>
        );
    }
}
