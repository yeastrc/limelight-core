/**
 * projectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component.tsx
 *
 * Javascript React Components for projectView.jsp page
 *
 * Upload Data Section
 *
 * Pending and History sections Display Component
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";
import {ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component";
import {limelight__IsTextSelected} from "page_js/common_all_pages/limelight__IsTextSelected";
import {projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_SubmitImportProgramInfo_Overlay";
import {
    projectPage_UploadData_UploadFiles__OpenOverlay,
    ProjectPage_UploadData_UploadFiles__Params
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";




const detailsLine_Label_CSS : React.CSSProperties = { whiteSpace: "nowrap", paddingRight: 10 }
const detailsLine_Value_CSS : React.CSSProperties = { marginBottom: 4 }

//////////////////////

//   Store Mounted component reference so can call Refresh by calling this function -- Assumes only 1 instance of this class will be mounted at any given time

let _mountedComponent: ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component

/**
 *
 */
export const refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component = function() {

   if ( _mountedComponent ) {
       _mountedComponent.load_Data_AndDisplay()
   }
}


/////////////////////

//  Config Data loaded from Page DOM Elements

let _uploading_FileObjectStorage_Files: boolean
let _uploadingScanFiles: boolean = undefined;

let _limelight_import_file_type_limelight_xml_file: number
let _limelight_import_file_type_fasta_file: number
let _limelight_import_file_type_scan_file: number

let _maxLimelightXMLFileUploadSize: number = undefined;
let _maxLimelightXMLFileUploadSizeFormatted: string = undefined;
let _maxFASTAFileUploadSize: number = undefined;
let _maxFASTAFileUploadSizeFormatted: string = undefined;
let _maxScanFileUploadSize: number = undefined;
let _maxScanFileUploadSizeFormatted: string = undefined;

/**
 * Load Config data from Page DOM elements rendered in JSP
 *
 * @private
 */
const _load_ConfigData_FromPageDOMElements_RenderedInJSP = function() {

    //  Get uploading files to go into File Object Storage (like FASTA file)
    _uploading_FileObjectStorage_Files = false;

    {
        const limelight_import_file_object_storage_filesDOM = document.getElementById('limelight_import_file_object_storage_files');
        if ( limelight_import_file_object_storage_filesDOM ) {
            _uploading_FileObjectStorage_Files = true;
        }
    }

    //  Get uploading scan files
    _uploadingScanFiles = false;

    {
        let $limelight_xml_file_upload_overlay_upload_scan_files = $("#limelight_xml_file_upload_overlay_upload_scan_files");
        if ( $limelight_xml_file_upload_overlay_upload_scan_files.length > 0 ) {
            let limelight_xml_file_upload_overlay_upload_scan_files_text = $limelight_xml_file_upload_overlay_upload_scan_files.val();
            if ( limelight_xml_file_upload_overlay_upload_scan_files_text !== "" ) {
                //  Only populated when true
                _uploadingScanFiles = true;
            }
        }
    }

    { //  Get  Limelight XML file type and max upload size

        let $limelight_import_file_type_limelight_xml_file = $("#limelight_import_file_type_limelight_xml_file");
        if ( $limelight_import_file_type_limelight_xml_file.length === 0 ) {
            throw Error( "#limelight_import_file_type_limelight_xml_file input field missing" );
        }
        let limelight_import_file_type_limelight_xml_file_val : any = $limelight_import_file_type_limelight_xml_file.val() as string;
        _limelight_import_file_type_limelight_xml_file = parseInt( limelight_import_file_type_limelight_xml_file_val, 10 );
        if ( isNaN( _limelight_import_file_type_limelight_xml_file ) ) {
            throw Error( "Unable to parse #limelight_import_file_type_limelight_xml_file: " + limelight_import_file_type_limelight_xml_file_val );
        }

        let $limelight_xml_file_max_file_upload_size = $("#limelight_xml_file_max_file_upload_size");
        if ( $limelight_xml_file_max_file_upload_size.length === 0 ) {
            throw Error( "#limelight_xml_file_max_file_upload_size input field missing" );
        }
        let limelight_xml_file_max_file_upload_size_val : any = $limelight_xml_file_max_file_upload_size.val() as string;
        _maxLimelightXMLFileUploadSize = parseInt( limelight_xml_file_max_file_upload_size_val, 10 );
        if ( isNaN( _maxLimelightXMLFileUploadSize ) ) {
            throw Error( "Unable to parse #limelight_xml_file_max_file_upload_size: " + limelight_xml_file_max_file_upload_size_val );
        }
        let $limelight_xml_file_max_file_upload_size_formatted = $("#limelight_xml_file_max_file_upload_size_formatted");
        if ( $limelight_xml_file_max_file_upload_size_formatted.length === 0 ) {
            throw Error( "#limelight_xml_file_max_file_upload_size_formatted input field missing" );
        }
        _maxLimelightXMLFileUploadSizeFormatted = $limelight_xml_file_max_file_upload_size_formatted.val() as string;
        if ( _maxLimelightXMLFileUploadSizeFormatted === undefined || _maxLimelightXMLFileUploadSizeFormatted === "" ) {
            throw Error( "#limelight_xml_file_max_file_upload_size_formatted input field empty" );
        }
    }

    if ( _uploading_FileObjectStorage_Files ) {

        //  Only upload when File Object Storage is configured

        { //  Get  FASTA file type and max upload size

            let $limelight_import_file_type_fasta_file = $("#limelight_import_file_type_fasta_file");
            if ( $limelight_import_file_type_fasta_file.length === 0 ) {
                throw Error( "#limelight_import_file_type_fasta_file input field missing" );
            }
            let limelight_import_file_type_fasta_file_val : any = $limelight_import_file_type_fasta_file.val() as string;
            _limelight_import_file_type_fasta_file = parseInt( limelight_import_file_type_fasta_file_val, 10 );
            if ( isNaN( _limelight_import_file_type_fasta_file ) ) {_maxFASTAFileUploadSize
                throw Error( "Unable to parse #limelight_import_file_type_fasta_file: " + limelight_import_file_type_fasta_file_val );
            }

            let $limelight_import_fasta_file_max_file_upload_size = $("#limelight_import_fasta_file_max_file_upload_size");
            if ( $limelight_import_fasta_file_max_file_upload_size.length === 0 ) {
                throw Error( "#limelight_import_fasta_file_max_file_upload_size input field missing" );
            }
            let limelight_import_fasta_file_max_file_upload_size_val : any = $limelight_import_fasta_file_max_file_upload_size.val() as string;
            _maxFASTAFileUploadSize = parseInt( limelight_import_fasta_file_max_file_upload_size_val, 10 );
            if ( isNaN( _maxFASTAFileUploadSize ) ) {
                throw Error( "Unable to parse #limelight_import_fasta_file_max_file_upload_size: " + limelight_import_fasta_file_max_file_upload_size_val );
            }
            let $limelight_import_fasta_file_max_file_upload_size_formatted = $("#limelight_import_fasta_file_max_file_upload_size_formatted");
            if ( $limelight_import_fasta_file_max_file_upload_size_formatted.length === 0 ) {
                throw Error( "#limelight_import_fasta_file_max_file_upload_size_formatted input field missing" );
            }
            _maxFASTAFileUploadSizeFormatted = $limelight_import_fasta_file_max_file_upload_size_formatted.val() as string;
            if ( _maxFASTAFileUploadSizeFormatted === undefined || _maxFASTAFileUploadSizeFormatted === "" ) {
                throw Error( "#limelight_import_fasta_file_max_file_upload_size_formatted input field empty" );
            }
        }
    }

    if ( _uploadingScanFiles ) {
        //  Get  Scan type type and max upload size

        let $limelight_import_file_type_scan_file = $("#limelight_import_file_type_scan_file");
        if ( $limelight_import_file_type_scan_file.length === 0 ) {
            throw Error( "#limelight_import_file_type_scan_file input field missing" );
        }
        let limelight_import_file_type_scan_file_val : any = $limelight_import_file_type_scan_file.val() as string;
        _limelight_import_file_type_scan_file = parseInt( limelight_import_file_type_scan_file_val, 10 );
        if ( isNaN( _limelight_import_file_type_scan_file ) ) {
            throw Error( "Unable to parse #limelight_import_file_type_scan_file: " + limelight_import_file_type_scan_file_val );
        }

        let $limelight_import_scan_file_max_file_upload_size = $("#limelight_import_scan_file_max_file_upload_size");
        if ( $limelight_import_scan_file_max_file_upload_size.length === 0 ) {
            throw Error( "#limelight_import_scan_file_max_file_upload_size input field missing" );
        }
        let limelight_import_scan_file_max_file_upload_size_val : any = $limelight_import_scan_file_max_file_upload_size.val() as string;
        _maxScanFileUploadSize = parseInt( limelight_import_scan_file_max_file_upload_size_val, 10 );
        if ( isNaN( _maxScanFileUploadSize ) ) {
            throw Error( "Unable to parse #limelight_import_scan_file_max_file_upload_size: " + limelight_import_scan_file_max_file_upload_size_val );
        }
        let $limelight_import_scan_file_max_file_upload_size_formatted = $("#limelight_import_scan_file_max_file_upload_size_formatted");
        if ( $limelight_import_scan_file_max_file_upload_size_formatted.length === 0 ) {
            throw Error( "#limelight_import_scan_file_max_file_upload_size_formatted input field missing" );
        }
        _maxScanFileUploadSizeFormatted = $limelight_import_scan_file_max_file_upload_size_formatted.val() as string;
        if ( _maxLimelightXMLFileUploadSizeFormatted === undefined || _maxLimelightXMLFileUploadSizeFormatted === "" ) {
            throw Error( "#limelight_import_scan_file_max_file_upload_size_formatted input field empty" );
        }
    }
}

/**
 *
 */
export interface ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component_Props {

    projectIdentifier : string
    refreshData_Force : object  //  refresh data when object reference changes

    setPendingCount_Callback: ProjectPage_UploadData_MainPage_Main_Component__SetPendingCount_Callback
}

/**
 *
 */
interface ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component_State {

    displayData_FromServer?: Internal__Get_SectionData_And_PendingCount_FromServer__Response

    showList_OnInitialRender_Pending?: boolean
    showList_OnInitialRender_History?: boolean

    show_InitialMessage_LoadingData_MainListsShownWhenExpandSection_Message?: boolean
    show_LoadingData_MainListsShownWhenExpandSection_Message?: boolean
}


/**
 *
 */
export class ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component extends React.Component< ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component_Props, ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component_State > {

    //  bind to 'this' for passing as parameters

    // private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    // private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)
    //
    // private _set_pendingCount_Callback_BindThis = this._set_pendingCount_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _prev_CompleteSuccess_TrackingIds: {
        fileImport_TrackingItem_trackingIds: Set<number>
        fileImportAndRunPipeline_TrackingItem_trackingIds: Set<number>
    }

    private _componentMounted: boolean

    /**
     *
     */
    constructor(props : ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component_Props) {
        super(props);

        _load_ConfigData_FromPageDOMElements_RenderedInJSP()  //  Load Config data from Page DOM elements rendered in JSP

        this.state = {
            show_InitialMessage_LoadingData_MainListsShownWhenExpandSection_Message: true,
            show_LoadingData_MainListsShownWhenExpandSection_Message: true
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            _mountedComponent = this;

            this._componentMounted = true;
            this.load_Data_AndDisplay()

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
    componentWillUnmount() {

        this._componentMounted = false;

        _mountedComponent = null;
    }

    /**
     * Get Data and set to State for display.  Also call this.props.setPendingCount_Callback(...) to update Pending Count at top level
     *
     * NOT Private since call from function outside this class at top of this file
     */
    load_Data_AndDisplay() {

        this.setState({ show_LoadingData_MainListsShownWhenExpandSection_Message: true })

        const promise = _get_SectionData_And_PendingCount_FromServer(this.props.projectIdentifier)
        promise.catch(reason => { })
        promise.then(displayData_FromServer => {
            try {
                this.props.setPendingCount_Callback({ pendingCount : displayData_FromServer.pendingCount })

                let showList_OnInitialRender_Pending = true;
                let showList_OnInitialRender_History = false;

                if ( displayData_FromServer.pendingItemsList && displayData_FromServer.pendingItemsList.length > 0 ) {

                } else {
                    showList_OnInitialRender_History = true;
                }

                this._eval_displayData_FromServer_for_New_SuccessfulCompletion_Additions( displayData_FromServer )

                this.setState({
                    displayData_FromServer, showList_OnInitialRender_Pending, showList_OnInitialRender_History,
                    show_LoadingData_MainListsShownWhenExpandSection_Message: false,
                    show_InitialMessage_LoadingData_MainListsShownWhenExpandSection_Message: false
                })

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        })
    }

    /**
     *
     * @param displayData_FromServer
     * @returns true if performing a reload
     * @private
     */
    private _eval_displayData_FromServer_for_New_SuccessfulCompletion_Additions(displayData_FromServer: Internal__Get_SectionData_And_PendingCount_FromServer__Response) : boolean {

        //  Evaluate for auto refresh and alert user to successfully completed imports

        //     Show window.confirm(...) if new entries have been added to the list

        const fileImport_TrackingItem_trackingIds: Set<number> = new Set()
        const fileImportAndRunPipeline_TrackingItem_trackingIds: Set<number> = new Set()

        if ( displayData_FromServer.historyItemsList ) {

            for (const historyItem of displayData_FromServer.historyItemsList) {

                if ( historyItem.fileImport_TrackingItem ) {

                    fileImport_TrackingItem_trackingIds.add( historyItem.fileImport_TrackingItem.trackingId );

                } else if ( historyItem.fileImportAndRunPipeline_TrackingItem ) {

                    fileImportAndRunPipeline_TrackingItem_trackingIds.add( historyItem.fileImportAndRunPipeline_TrackingItem.trackingId );
                } else {
                    const msg = "Neither Populated: historyItem.fileImport_TrackingItem, historyItem.fileImportAndRunPipeline_TrackingItem"
                    console.warn(msg)
                    throw Error(msg)
                }
            }
        }

        let foundNewTrackingId = false;

        if (this._prev_CompleteSuccess_TrackingIds) {

            // compare the current tracking ids to the previous

            for ( const trackingId of fileImport_TrackingItem_trackingIds ) {
                if ( ! this._prev_CompleteSuccess_TrackingIds.fileImport_TrackingItem_trackingIds.has( trackingId ) ) {
                    foundNewTrackingId = true;
                    break;
                }
            }

            if ( ! foundNewTrackingId ) {

                for ( const trackingId of fileImportAndRunPipeline_TrackingItem_trackingIds ) {
                    if ( ! this._prev_CompleteSuccess_TrackingIds.fileImportAndRunPipeline_TrackingItem_trackingIds.has( trackingId ) ) {
                        foundNewTrackingId = true;
                        break;
                    }
                }
            }

            if (foundNewTrackingId) {

                //  Found new complete successful tracking id so prompt user to refresh page
                if ( window.confirm( "Data has finished importing.  Reload page to display this data?" ) ) {
                    window.location.reload(true);
                    return true;
                }
            }
        }

        //  save current as prev
        this._prev_CompleteSuccess_TrackingIds = {
            fileImport_TrackingItem_trackingIds, fileImportAndRunPipeline_TrackingItem_trackingIds
        }

        return false;
    }

    /**
     *
     */
    render() {

        return (
            <div style={ { position: "relative" } }>

                <div style={ { marginBottom: 10 } }>
                    <button
                        title="Import data into this project"
                        onClick={ event => {
                            event.stopPropagation()

                            const callback_UpdateAfterSuccessfulSubmit = () : void => {

                                this.load_Data_AndDisplay()
                            }

                            const projectPage_UploadData_UploadFiles__Params: ProjectPage_UploadData_UploadFiles__Params = {

                                projectIdentifierFromURL: this.props.projectIdentifier,

                                callback_UpdateAfterSuccessfulSubmit,

                                is_uploading_FileObjectStorage_Files: _uploading_FileObjectStorage_Files,

                                limelight_import_file_type_limelight_xml_file: _limelight_import_file_type_limelight_xml_file,
                                limelight_import_file_type_fasta_file: _limelight_import_file_type_fasta_file,
                                limelight_import_file_type_scan_file: _limelight_import_file_type_scan_file,

                                maxLimelightXMLFileUploadSize: _maxLimelightXMLFileUploadSize,
                                maxLimelightXMLFileUploadSizeFormatted: _maxLimelightXMLFileUploadSizeFormatted,
                                maxFASTAFileUploadSize: _maxFASTAFileUploadSize,
                                maxFASTAFileUploadSizeFormatted: _maxFASTAFileUploadSizeFormatted,
                                maxScanFileUploadSize: _maxScanFileUploadSize,
                                maxScanFileUploadSizeFormatted: _maxScanFileUploadSizeFormatted,
                                scanFileSelection_For_GoldStandardImport: null,
                                scanFileSelection_For_FeatureDetectionImport: null,
                                scanFileSelection_For_FeatureDetectionRun: null
                            }

                            projectPage_UploadData_UploadFiles__OpenOverlay({ mainParams: projectPage_UploadData_UploadFiles__Params })
                        }}
                    >
                        Import Data Files
                    </button>
                    <span> </span>
                    <button
                        title="Refresh this list"
                        onClick={ event => {
                            event.stopPropagation();
                            this.load_Data_AndDisplay();
                        }}
                    >
                        Refresh
                    </button>
                    <span style={ { paddingLeft: 20 } }>
                       <button
                           onClick={ event => {
                               event.stopPropagation();
                               projectPage_UploadData_SubmitImportProgramInfo__OpenOverlay({ projectIdentifierFromURL: this.props.projectIdentifier });
                           }}
                       >
                            Command Line Import Info
                        </button>
                    </span>
                </div>

                { this.state.show_InitialMessage_LoadingData_MainListsShownWhenExpandSection_Message ? (
                    //  Initial Loading Data message
                    <div style={ { fontSize: 18, fontWeight: "bold", marginTop: 20 } }>
                        Loading Data...
                    </div>
                ) : (

                    <div
                        style={ { position: "relative" } }
                    >

                        { this.state.displayData_FromServer ? (
                            <div>
                                <Internal__Pending_OR_History_Section__Display_Component

                                    showList_OnInitialRender={ this.state.showList_OnInitialRender_Pending }

                                    projectIdentifier={ this.props.projectIdentifier }
                                    refreshData_Force={ this.props.refreshData_Force }

                                    pending_OR_history_ENUM={ Internal__Pending_OR_history_ENUM.PENDING }

                                    pending_OR_history_ItemsList={ this.state.displayData_FromServer.pendingItemsList }

                                    displayData_FromServer={ this.state.displayData_FromServer }

                                    refreshAll_Callback={ () : void => {
                                        this.load_Data_AndDisplay()
                                    }}
                                />

                                <Internal__Pending_OR_History_Section__Display_Component

                                    showList_OnInitialRender={ this.state.showList_OnInitialRender_History }

                                    projectIdentifier={ this.props.projectIdentifier }
                                    refreshData_Force={ this.props.refreshData_Force }

                                    pending_OR_history_ENUM={ Internal__Pending_OR_history_ENUM.HISTORY }

                                    pending_OR_history_ItemsList={ this.state.displayData_FromServer.historyItemsList }

                                    displayData_FromServer={ this.state.displayData_FromServer }

                                    refreshAll_Callback={ () : void => {
                                        this.load_Data_AndDisplay()
                                    }}
                                />

                            </div>
                        ) : null }

                        { this.state.show_LoadingData_MainListsShownWhenExpandSection_Message ? (
                            // Display "Loading" Message on top of data when Updating
                            <div
                                className=" block-updating-overlay-container "
                            >
                                Loading Data...
                            </div>
                        ) : null }

                    </div>
                )}
            </div>


        )
    }
}

//   Component for Pending or History


/**
 *
 */
interface Internal__Pending_OR_History_Section__Display_Component_Props {

    showList_OnInitialRender : boolean

    projectIdentifier : string
    refreshData_Force : object  //  refresh data when object reference changes

    pending_OR_history_ENUM: Internal__Pending_OR_history_ENUM

    pending_OR_history_ItemsList: Array<Internal__DisplayItem>;

    displayData_FromServer: Internal__Get_SectionData_And_PendingCount_FromServer__Response

    refreshAll_Callback: () => void
}

/**
 *
 */
interface Internal__Pending_OR_History_Section__Display_Component_State {

    force_ReRender?: object
    force_ShowDetailsTrue?: object
}


/**
 *
 */
class Internal__Pending_OR_History_Section__Display_Component extends React.Component< Internal__Pending_OR_History_Section__Display_Component_Props, Internal__Pending_OR_History_Section__Display_Component_State > {

    //  bind to 'this' for passing as parameters

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _show_List: boolean = false
    private _show_List_EverShown: boolean = false

    private _componentMounted: boolean

    /**
     *
     */
    constructor(props : Internal__Pending_OR_History_Section__Display_Component_Props) {
        super(props);

        if ( props.showList_OnInitialRender ) {
            this._show_List = true;
            this._show_List_EverShown = true;
        }

        this.state = {
            force_ReRender: {}
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true;

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
    componentWillUnmount() {

        this._componentMounted = false;
    }

    /**
     *
     */
    private _topLineClicked() {
        if ( ! this._show_List ) {
            this._show_List = true;
            this._show_List_EverShown = true;
        } else {
            this._show_List = false;
        }

        this.setState({ force_ReRender: {} })
    }

    /**
     *
     */
    render() {

        if ( ( ( ! this.props.pending_OR_history_ItemsList ) || ( this.props.pending_OR_history_ItemsList.length === 0 ) )
            && this.props.pending_OR_history_ENUM === Internal__Pending_OR_history_ENUM.HISTORY ) {

            //  When History and NO items to display, display Nothing
            return null;
        }

        return (
            <div style={ { position: "relative" } }>

                <div>
                    <span
                        className=" clickable "
                        style={ { fontSize: 18, whiteSpace: "nowrap" } }
                        onClick={ event => {
                            event.stopPropagation();
                            this._topLineClicked();
                        }}
                    >
                        { this._show_List ? (

                            <img
                                src="static/images/pointer-down.png"
                                className=" fake-link-image icon-small "
                                title={ this.props.pending_OR_history_ENUM === Internal__Pending_OR_history_ENUM.PENDING ? ( "Hide pending" ) : ( "Hide history") }
                            />
                        ) : (
                            <img
                                src="static/images/pointer-right.png"
                                className=" fake-link-image icon-small "
                                title={ this.props.pending_OR_history_ENUM === Internal__Pending_OR_history_ENUM.PENDING ? ( "Show pending" ) : ( "Show history") }
                            />
                        )}
                        <span> </span>

                        { this.props.pending_OR_history_ENUM === Internal__Pending_OR_history_ENUM.PENDING ? (
                            <span>Pending</span>
                        ) : (
                            <span>History</span>
                        )}
                    </span>
                </div>

                <div className="top-level-label-bottom-border"></div>

                <div style={ { paddingBottom: 10, paddingLeft: 17 }}>

                    { this._show_List_EverShown ? (

                        <div
                            style={ { display: this._show_List ? null : "none" } } //  Hide with display: "none"
                        >

                            { this.props.pending_OR_history_ItemsList && this.props.pending_OR_history_ItemsList.length > 0 ? (

                                <>
                                    <div style={ { marginBottom: 12 } }>
                                        <span
                                            className=" fake-link "
                                            title="Show details for all items"
                                            onClick={ event => {
                                                event.stopPropagation()
                                                this.setState({ force_ShowDetailsTrue: {} })
                                            }}
                                        >
                                            [Expand All]
                                        </span>
                                    </div>

                                    <div
                                        style={ {
                                            display: "grid", gridTemplateColumns: "min-content min-content 1fr min-content"
                                        } }
                                    >

                                        {
                                            this.props.pending_OR_history_ItemsList.map( (value, index, array) => {

                                                let key
                                                if ( value.fileImport_TrackingItem ) {
                                                    key = "fileImport_TrackingItemId: " + value.fileImport_TrackingItem.trackingId;
                                                } else if ( value.fileImportAndRunPipeline_TrackingItem ) {
                                                    key = "fileImportAndRunPipeline_TrackingItemId: " + value.fileImportAndRunPipeline_TrackingItem.trackingId;
                                                } else {
                                                    const msg = "this.props.pending_OR_history_ItemsList.map: Neither Set: value.fileImport_TrackingItem, value.fileImportAndRunPipeline_TrackingItem"
                                                    console.warn(msg)
                                                    throw Error(msg)
                                                }

                                                return (
                                                    <React.Fragment
                                                        key={ key }
                                                    >
                                                        <Internal__Pending_OR_History_Section__SingleItem__Display_Component
                                                            force_ShowDetailsTrue={ this.state.force_ShowDetailsTrue }
                                                            projectIdentifier={ this.props.projectIdentifier }
                                                            refreshData_Force={ this.props.refreshData_Force }
                                                            pending_OR_history_Item={ value }
                                                            pending_OR_history_ENUM={ this.props.pending_OR_history_ENUM }
                                                            displayData_FromServer={ this.props.displayData_FromServer }
                                                            refreshAll_Callback={ this.props.refreshAll_Callback }
                                                        />

                                                        <div
                                                            style={ { gridColumn: "1 / -1" } }
                                                        >
                                                            <div className="search-entry-bottom-border"></div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                </>

                            ) : ( this.props.pending_OR_history_ENUM === Internal__Pending_OR_history_ENUM.PENDING ) ? (
                                <div>No uploads pending</div>
                            ) : (
                                null
                            )}
                        </div>
                    ) : null }
                </div>
            </div>


        )
    }
}


//   Component for SINGLE Pending or History Entry


/**
 *
 */
interface Internal__Pending_OR_History_Section__SingleItem__Display_Component_Props {

    force_ShowDetailsTrue : object  //  New Object reference does new force set state.showDetails to true

    projectIdentifier : string
    refreshData_Force : object  //  refresh data when object reference changes

    pending_OR_history_ENUM: Internal__Pending_OR_history_ENUM

    pending_OR_history_Item:  Internal__DisplayItem;

    displayData_FromServer: Internal__Get_SectionData_And_PendingCount_FromServer__Response

    refreshAll_Callback: () => void
}

/**
 *
 */
interface Internal__Pending_OR_History_Section__SingleItem__Display_Component_State {

    showDetails?: boolean
}


/**
 *
 */
class Internal__Pending_OR_History_Section__SingleItem__Display_Component extends React.Component< Internal__Pending_OR_History_Section__SingleItem__Display_Component_Props, Internal__Pending_OR_History_Section__SingleItem__Display_Component_State > {

    //  bind to 'this' for passing as parameters

    // private _expanded_Chosen_Callback_BindThis = this._expanded_Chosen_Callback.bind(this)
    // private _collapsed_Chosen_Callback_BindThis = this._collapsed_Chosen_Callback.bind(this)
    //
    // private _set_pendingCount_Callback_BindThis = this._set_pendingCount_Callback.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

    }

    private _componentMounted: boolean

    /**
     *
     */
    constructor(props : Internal__Pending_OR_History_Section__SingleItem__Display_Component_Props) {
        super(props);

        this.state = {
            showDetails: false
        };
    }

    /**
     *
     */
    componentDidMount() {
        try {
            this._componentMounted = true;

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
    componentWillUnmount() {

        this._componentMounted = false;
    }

    /**
     *
     */
    componentDidUpdate(prevProps: Readonly<Internal__Pending_OR_History_Section__SingleItem__Display_Component_Props>, prevState: Readonly<Internal__Pending_OR_History_Section__SingleItem__Display_Component_State>, snapshot?: any) {

        if ( this.props.force_ShowDetailsTrue !== prevProps.force_ShowDetailsTrue ) {
            this.setState({ showDetails: true })
        }
    }

    /**
     *
     */
    private _show_Hide_Details_When_MainRowClicked() {

        if ( limelight__IsTextSelected() ) {
            return;
        }

        this.setState( (prevState, props) => {
            return { showDetails: ! prevState.showDetails }
        })
    }

    /**
     *
     */
    private _delete_Clicked() {

        if ( ! window.confirm( "Delete Entry?" ) ) {
            return;
        }

        let promise: Promise<void>

        if ( this.props.pending_OR_history_Item.fileImport_TrackingItem ) {

            promise = _remove_FileImportItem_Remove_Import_LimelightXML_AndOr_ScanFiles_Import( this.props.pending_OR_history_Item.fileImport_TrackingItem.trackingId )

        } else if ( this.props.pending_OR_history_Item.fileImportAndRunPipeline_TrackingItem ) {

            promise = _remove_FileImportAndPipelineRunItem_Remove_Import_AndOr_PipelineRun( this.props.pending_OR_history_Item.fileImportAndRunPipeline_TrackingItem.trackingId )

        } else {
            const msg = "_delete_Clicked(): Neither Populated: this.props.pending_OR_history_Item.fileImport_TrackingItem this.props.pending_OR_history_Item.fileImportAndRunPipeline_TrackingItem "
            console.warn(msg)
            throw Error(msg)
        }

        promise.catch(reason => {  })

        promise.then(noValue => { try {

            this.props.refreshAll_Callback()

        } catch (e) {
            reportWebErrorToServer.reportErrorObjectToServer({
                errorException : e
            });
            throw e;
        }})
    }

    /**
     *
     */
    render() {

        let deleteImage_TitleText: string

        if ( this.props.pending_OR_history_Item.statusQueuedOrRequeued ) {
            deleteImage_TitleText = "Cancel upload request"
        } else if ( this.props.pending_OR_history_Item.statusFailed || this.props.pending_OR_history_Item.statusComplete ) {
            deleteImage_TitleText = "Remove from upload history"
        }

        return (
            <>
                {/*  Row 1:  Main Displayed Data  */}

                {/*  Column 1  Delete Icon */}
                <div style={ { whiteSpace: "nowrap", paddingRight: 7 } }>
                    <input
                        type="image"
                        src="static/images/icon-circle-delete.png"
                        className=" icon-small  "
                        style={ { visibility: this.props.pending_OR_history_Item.statusStarted ? "hidden" : null } } //  Hide when currently running
                        title={ deleteImage_TitleText }
                        onClick={ event => {
                            event.stopPropagation()
                            this._delete_Clicked()
                        }}
                    />
                </div>

                {/*  Column 2 Expand Icon */}
                <div
                    className=" clickable "
                    style={ { whiteSpace: "nowrap", paddingRight: 4 } }
                    onClick={ event => {
                        event.stopPropagation()
                        this._show_Hide_Details_When_MainRowClicked()
                    }}
                >

                    { this.state.showDetails ? (

                        <img src="static/images/pointer-down.png"
                             className=" icon-small "
                             title="Hide Details"
                        />
                    ) : (
                        <img src="static/images/pointer-right.png"
                             className=" icon-small  "
                             title="Show Details"
                        />
                    ) }
                </div>

                {/*  Column 3  Main Data  */}
                <div
                    className=" clickable "
                    style={ { paddingRight: 4 } }
                    title="Click to Show/Hide Details"
                    onClick={ event => {
                        event.stopPropagation()
                        this._show_Hide_Details_When_MainRowClicked()
                    }}
                >
                    <span>{ this.props.pending_OR_history_Item.mainLine_DisplayString__ComputedInJS }</span>
                    <span> </span>
                    { ( this.props.pending_OR_history_Item.statusQueuedOrRequeued ) ? (
                        <span style={ { whiteSpace: "nowrap" } }>
                            <span>(Position in queue: </span>
                            <span>{ this.props.pending_OR_history_Item.queuePositionFmt }</span>
                            <span>)</span>
                        </span>
                    ) : ( this.props.pending_OR_history_Item.statusStarted ) ? (
                        <span style={ { whiteSpace: "nowrap" } }>(Running)</span>
                    ) : ( this.props.pending_OR_history_Item.statusComplete ) ? (
                        <span style={ { whiteSpace: "nowrap" } }>(Success)</span>
                    ) : ( this.props.pending_OR_history_Item.statusFailed ) ? (
                        <span style={ { whiteSpace: "nowrap" } }>(Error)</span>
                    ) : (
                        <span style={ { whiteSpace: "nowrap" } }>(Status Unknown)</span>
                    )}

                </div>

                {/*  Column 4  Processed or Submitted Date*/}
                <div
                    className=" clickable "
                    style={ { whiteSpace: "nowrap" } }
                    title="Click to Show/Hide Details"
                    onClick={ event => {
                        event.stopPropagation()
                        this._show_Hide_Details_When_MainRowClicked()
                    }}
                >
                    { this.props.pending_OR_history_Item.importEndDateTime ? (
                        <span>Processed: { this.props.pending_OR_history_Item.importEndDateTime }</span>
                    ) : (
                        <span>Submitted: { this.props.pending_OR_history_Item.importSubmitDateTime }</span>
                    ) }

                </div>


                { this.state.showDetails ? (
                    this._show_ItemDetails({ pending_OR_History_Item: this.props.pending_OR_history_Item } )
                    ) : null  }

            </>
        )
    }

    /**
     *
     * @param pending_OR_History_Item
     * @private
     */
    private _show_ItemDetails(
        {
            pending_OR_History_Item
        } : {
            pending_OR_History_Item: Internal__DisplayItem
        }) {

        if ( pending_OR_History_Item.fileImport_TrackingItem ) {

            return this._show_ItemDetails__fileImport_TrackingItem({ fileImport_TrackingItem: pending_OR_History_Item.fileImport_TrackingItem })

        } else if ( pending_OR_History_Item.fileImportAndRunPipeline_TrackingItem ) {

            return this._show_ItemDetails__fileImportAndRunPipeline_TrackingItem({ fileImportAndRunPipeline_TrackingItem: pending_OR_History_Item.fileImportAndRunPipeline_TrackingItem })

        } else {
            const msg = "_show_ItemDetails(...): pending_OR_History_Item.fileImport_TrackingItem AND pending_OR_History_Item.fileImportAndRunPipeline_TrackingItem BOTH NOT POPULATED "
            console.warn(msg)
            throw Error(msg)
        }
    }

    /**
     *
     * @param fileImport_TrackingItem
     * @private
     */
    private _show_ItemDetails__fileImport_TrackingItem(
        {
            fileImport_TrackingItem
        } : {
            fileImport_TrackingItem: Internal__FileImportTrackingDisplay
        }
    ) {
        {/*  Row 2:  Data Details spanning columns 3 and 4  */}

        return (

            <>
                {/*  Column 1: Filler  */}
                <div></div>

                {/*  Column 2: Filler  */}
                <div></div>

                {/*  Span Column 3 to last column to show Details  */}

                <div
                    style={ { gridColumnStart: 3, gridColumnEnd: -1 }}
                >
                    <div
                        style={ { display: "grid", gridTemplateColumns: " min-content 1fr", paddingTop: 10, paddingLeft: 25 } }
                    >
                        { fileImport_TrackingItem.searchTagList ? (
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    Tags:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.searchTagList.map((value, index, array) => {

                                        return (
                                            <span
                                                key={ value }
                                                style={ { whiteSpace: "nowrap" } }
                                            >
                                                        <span>{ value }</span>
                                                { index < array.length - 1 ? (
                                                    <span>,</span>
                                                ) : null }
                                                <span> </span>
                                                    </span>
                                        )
                                    })}
                                </div>
                            </>
                        ) : null }

                        { fileImport_TrackingItem.scanfileNamesCommaDelim !== fileImport_TrackingItem.uploadedFilename ? (
                            //  Uploaded filename is NOT the Scan Filename so display
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    File:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.uploadedFilename }
                                </div>
                            </>
                        ) : null }

                        { fileImport_TrackingItem.fastafileName ? (
                            //  Have FASTA Filename so display
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    FASTA file:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.fastafileName }
                                </div>
                            </>
                        ) : null }

                        { this.props.displayData_FromServer.scanFileImportAllowedViaWebSubmit || fileImport_TrackingItem.scanfileNamesCommaDelim ? (
                            //  Have Scan Filename(s) so display
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    Scan file(s):
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.scanfileNamesCommaDelim ?
                                        fileImport_TrackingItem.scanfileNamesCommaDelim : "None"
                                    }
                                </div>
                            </>
                        ) : null }

                        { fileImport_TrackingItem.searchName ? (
                            //  Have Search Name so display
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    Search description:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.searchName }
                                </div>
                            </>
                        ) : null }

                        { fileImport_TrackingItem.searchShortName ? (
                            //  Have searchShortName
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    Short Label:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.searchShortName }
                                </div>
                            </>
                        ) : null }

                        <>
                            <div style={ detailsLine_Label_CSS }>
                                Submitted by:
                            </div>
                            <div style={ detailsLine_Value_CSS }>
                                { fileImport_TrackingItem.nameOfUploadUser }
                            </div>
                        </>

                        {/*  Blank Line  */}
                        <>
                            <div style={ detailsLine_Label_CSS }>
                                &nbsp;
                            </div>
                            <div style={ detailsLine_Value_CSS }>
                                &nbsp;
                            </div>
                        </>

                        <>
                            <div style={ detailsLine_Label_CSS }>
                                Submitted:
                            </div>
                            <div style={ detailsLine_Value_CSS }>
                                { fileImport_TrackingItem.importSubmitDateTime }
                            </div>
                        </>

                        { fileImport_TrackingItem.importStartDateTime ? (
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    Started Processing:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.importStartDateTime }
                                </div>
                            </>
                        ) : null }

                        { fileImport_TrackingItem.importEndDateTime ? (
                            <>
                                { fileImport_TrackingItem.statusComplete ? (
                                    <div style={ detailsLine_Label_CSS }>
                                        Imported:
                                    </div>
                                ) : (
                                    <div style={ detailsLine_Label_CSS }>
                                        Failed:
                                    </div>
                                ) }
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.importEndDateTime }
                                </div>
                            </>
                        ) : null }

                        { fileImport_TrackingItem.statusFailedMsg ? (
                            <>
                                {/*  Blank Line Before  */}
                                <div>&nbsp;</div>
                                <div></div>

                                <div style={ detailsLine_Label_CSS }>
                                    Fail reason:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImport_TrackingItem.statusFailedMsg }
                                </div>
                            </>
                        ) : null }

                    </div>


                </div>

            </>
        )

    }


    /**
     *
     * @param fileImportAndRunPipeline_TrackingItem
     * @private
     */
    private _show_ItemDetails__fileImportAndRunPipeline_TrackingItem(
        {
            fileImportAndRunPipeline_TrackingItem
        } : {
            fileImportAndRunPipeline_TrackingItem: Internal__FileImportAndPipelineRunTrackingDisplay
        }
    ) {
        {/*  Row 2:  Data Details spanning columns 3 and 4  */}

        return (

            <>
                {/*  Column 1: Filler  */}
                <div></div>

                {/*  Column 2: Filler  */}
                <div></div>

                {/*  Span Column 3 to last column to show Details  */}

                <div
                    style={ { gridColumnStart: 3, gridColumnEnd: -1 }}
                >
                    <div
                        style={ { display: "grid", gridTemplateColumns: " min-content 1fr", paddingTop: 10, paddingLeft: 25 } }
                    >
                        { fileImportAndRunPipeline_TrackingItem.labelvaluePairList ? (

                            fileImportAndRunPipeline_TrackingItem.labelvaluePairList.map( (value, index, array) => {

                                return (
                                    <React.Fragment key={index} >

                                        <div style={ detailsLine_Label_CSS }>
                                            { value.label }:
                                        </div>
                                        <div style={ detailsLine_Value_CSS }>
                                            { value.value }
                                        </div>

                                    </React.Fragment>
                                )
                            })

                        ) : null }
                        <>
                            <div style={ detailsLine_Label_CSS }>
                                Submitted by:
                            </div>
                            <div style={ detailsLine_Value_CSS }>
                                { fileImportAndRunPipeline_TrackingItem.nameOfUploadUser }
                            </div>
                        </>

                        {/*  Blank Line  */}
                        <>
                            <div style={ detailsLine_Label_CSS }>
                                &nbsp;
                            </div>
                            <div style={ detailsLine_Value_CSS }>
                                &nbsp;
                            </div>
                        </>

                        <>
                            <div style={ detailsLine_Label_CSS }>
                                Submitted:
                            </div>
                            <div style={ detailsLine_Value_CSS }>
                                { fileImportAndRunPipeline_TrackingItem.runSubmitDateTime }
                            </div>
                        </>

                        { fileImportAndRunPipeline_TrackingItem.runStartDateTime ? (
                            <>
                                <div style={ detailsLine_Label_CSS }>
                                    Started Processing:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImportAndRunPipeline_TrackingItem.runStartDateTime }
                                </div>
                            </>
                        ) : null }

                        { fileImportAndRunPipeline_TrackingItem.runEndDateTime ? (
                            <>
                                { fileImportAndRunPipeline_TrackingItem.statusComplete ? (
                                    <div style={ detailsLine_Label_CSS }>
                                        Imported:
                                    </div>
                                ) : (
                                    <div style={ detailsLine_Label_CSS }>
                                        Failed:
                                    </div>
                                ) }
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImportAndRunPipeline_TrackingItem.runEndDateTime }
                                </div>
                            </>
                        ) : null }

                        { fileImportAndRunPipeline_TrackingItem.statusFailedMsg ? (
                            <>
                                {/*  Blank Line Before  */}
                                <div>&nbsp;</div>
                                <div></div>

                                <div style={ detailsLine_Label_CSS }>
                                    Fail reason:
                                </div>
                                <div style={ detailsLine_Value_CSS }>
                                    { fileImportAndRunPipeline_TrackingItem.statusFailedMsg }
                                </div>
                            </>
                        ) : null }

                    </div>


                </div>

            </>
        )

    }
}


/////////////////////////////


/**
 * 	get Section Data and Pending Count
 *
 * @param projectIdentifierFromURL
 */
const _get_SectionData_And_PendingCount_FromServer = function(projectIdentifierFromURL: string) {

    return new Promise<Internal__Get_SectionData_And_PendingCount_FromServer__Response>((resolve, reject) => { try {

        const requestData = {
            projectIdentifier : projectIdentifierFromURL
        }

        const url = "d/rws/for-page/project-upload-data-list-submitted-items";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => {  reject(reason)}  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                if ( ! variable_is_type_number_Check( responseData.pendingCount ) ) {
                    const msg = "( ! variable_is_type_number_Check( responseData.pendingCount ) )"
                    console.warn(msg)
                    throw Error(msg)
                }

                _process_SectionData_Result__Compute__mainLine_DisplayString__ComputedInJS({ displayData_FromServer: responseData })

                resolve( responseData )

            } catch (e) {
                reportWebErrorToServer.reportErrorObjectToServer({
                    errorException : e
                });
                throw e;
            }
        });
    } catch (e) {
        reportWebErrorToServer.reportErrorObjectToServer({
            errorException : e
        });
        throw e;
    }})
}

/**
 *
 * @param displayData_FromServer
 * @private
 */
const _process_SectionData_Result__Compute__mainLine_DisplayString__ComputedInJS = function(
    {
        displayData_FromServer
    } : {
        displayData_FromServer: Internal__Get_SectionData_And_PendingCount_FromServer__Response
    }
) {
    _process_SectionData_Result__Pending_OR_History_List__Compute__mainLine_DisplayString__ComputedInJS( displayData_FromServer.pendingItemsList );
    _process_SectionData_Result__Pending_OR_History_List__Compute__mainLine_DisplayString__ComputedInJS( displayData_FromServer.historyItemsList );
}

/**
 *
 * @param pending_OR_History_ItemsList
 * @private
 */
const _process_SectionData_Result__Pending_OR_History_List__Compute__mainLine_DisplayString__ComputedInJS = function(
    pending_OR_History_ItemsList: Internal__DisplayItem[]
) {
    for ( const pending_OR_History_Item of pending_OR_History_ItemsList ) {

        if ( pending_OR_History_Item.fileImport_TrackingItem ) {

            const fileImport_TrackingItem = pending_OR_History_Item.fileImport_TrackingItem;

            if ( fileImport_TrackingItem.searchName ) {
                pending_OR_History_Item.mainLine_DisplayString__ComputedInJS = fileImport_TrackingItem.searchName;
            } else {
                pending_OR_History_Item.mainLine_DisplayString__ComputedInJS = fileImport_TrackingItem.uploadedFilename;
            }

        } else if ( pending_OR_History_Item.fileImportAndRunPipeline_TrackingItem ) {

            pending_OR_History_Item.mainLine_DisplayString__ComputedInJS = pending_OR_History_Item.fileImportAndRunPipeline_TrackingItem.mainLineLabel

        } else {
            const msg = "_process_SectionData_Result__Pending_OR_History_List__Compute__mainLine_DisplayString__ComputedInJS(...): pending_OR_History_Item.fileImport_TrackingItem AND pending_OR_History_Item.fileImportAndRunPipeline_TrackingItem BOTH NOT POPULATED "
            console.warn(msg)
            throw Error(msg)
        }
    }

}

class Internal__Get_SectionData_And_PendingCount_FromServer__Response {


    pendingCount: number;
    pendingItemsList: Array<Internal__DisplayItem>;
    historyItemsList: Array<Internal__DisplayItem>;

    scanFileImportAllowedViaWebSubmit: boolean
}

class Internal__DisplayItem {

    mainLine_DisplayString__ComputedInJS: string

    statusQueued: boolean

    statusReQueued: boolean

    statusQueuedOrRequeued: boolean

    statusStarted: boolean

    statusComplete: boolean

    statusFailed: boolean

    statusId: number

    queuePosition: number;
    queuePositionFmt: string;

    importSubmitDateTime: string;

    /**
     * Only populated for status Complete, or Failed
     */
    importEndDateTime: string;

//  Exactly one of fileImport_TrackingItem OR fileImportAndRunPipeline_TrackingItem will be populated, NOT Both or Neither

    fileImport_TrackingItem: Internal__FileImportTrackingDisplay;

    fileImportAndRunPipeline_TrackingItem: Internal__FileImportAndPipelineRunTrackingDisplay;
}

class Internal__FileImportTrackingDisplay {


    trackingId: number;

    statusEnum: Internal__FileImportStatus;

    status: string;
    statusFailedMsg: string;

    queuePosition: number;
    queuePositionFmt: string;

    searchTagList: Array<string>;

    /**
     * Optional item on XSD
     */
    searchName: string;
    searchShortName: string;

    uploadedFilename: string;

    nameOfUploadUser: string;

    importSubmitDateTime: string;

    /**
     * Only populated for status Started, Complete, or Failed
     */
    importStartDateTime: string;
    /**
     * Only populated for status Complete, or Failed
     */
    importEndDateTime: string;
    /**
     * Only populated for status Complete, or Failed
     */
    lastUpdatedDateTime: string;

    fastafileName: string

    scanFilenames: Array<string>;

    scanfileNamesCommaDelim: string;




    statusQueued: boolean

    statusReQueued: boolean

    statusQueuedOrRequeued: boolean

    statusStarted: boolean

    statusComplete: boolean

    statusFailed: boolean

    statusId: number

}

class Internal__FileImportAndPipelineRunTrackingDisplay {


    trackingId: number;

    statusEnum: Internal__FileImportStatus;

    status: string;
    statusFailedMsg: string;

    queuePosition: number;
    queuePositionFmt: string;


    mainLineLabel: string;

    nameOfUploadUser: string;

    runSubmitDateTime: string;

    /**
     * Only populated for status Started, Complete, or Failed
     */
    runStartDateTime: string;
    /**
     * Only populated for status Complete, or Failed
     */
    runEndDateTime: string;
    /**
     * Only populated for status Complete, or Failed
     */
    lastUpdatedDateTime: string;

    statusQueued: boolean

    statusReQueued: boolean

    statusQueuedOrRequeued: boolean

    statusStarted: boolean

    statusComplete: boolean

    statusFailed: boolean

    statusId: number

    labelvaluePairList: Array<Internal__FileImportAndPipelineRunTrackingDisplay_LabelValue_Pair>

}

class Internal__FileImportAndPipelineRunTrackingDisplay_LabelValue_Pair {

    label: string;
    value: string;
}


enum Internal__FileImportStatus {

    INIT_INSERT_PRE_QUEUED = "INIT_INSERT_PRE_QUEUED",
    QUEUED = "QUEUED",
    RE_QUEUED = "RE_QUEUED",
    STARTED = "STARTED",
    COMPLETE = "COMPLETE",
    FAILED = "FAILED"

}

enum Internal__Pending_OR_history_ENUM {
    PENDING,
    HISTORY
}

//////////////////////////////



/**
 *
 */
const _remove_FileImportItem_Remove_Import_LimelightXML_AndOr_ScanFiles_Import = function( trackingId: number ) {

    return new Promise<void>( (resolve, reject) => { try {

    let requestData = { trackingId };

    const url = "d/rws/for-page/project-upload-data-remove-file-import-item-remove-import-limelightxml-andor-scan-files";

    const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

    const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                resolve()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }})
}


/**
 *
 */
const _remove_FileImportAndPipelineRunItem_Remove_Import_AndOr_PipelineRun = function( trackingId: number ) {

    return new Promise<void>( (resolve, reject) => { try {

        let requestData = { trackingId };

        const url = "d/rws/for-page/project-upload-data-remove-import-and-pipeline-run-item-remove-import-import-andor-pipeline-run";

        const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestData, url }) ;

        const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

        promise_webserviceCallStandardPost.catch( (reason) => { reject(reason) }  );

        promise_webserviceCallStandardPost.then( ({ responseData }) => {
            try {
                resolve()

            } catch( e ) {
                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                throw e;
            }
        });
    } catch( e ) {
        reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
        throw e;
    }})
}
