/**
 * projectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Feature Detection Run - Select Scan File
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";
import {
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback,
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params,
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component";
import {ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";
import {refresh_ProjectPage_UploadData_MainPage_Main_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Main_Component";
import {refresh_ProjectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__upload_data_section__main_page/projectPage_UploadData_MainPage_Pending_and_History_Sections_Display_Component";
import {
    limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer,
    Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
} from "page_js/common_all_pages/tooltip_React_Extend_Material_UI_Library/limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component";


/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params
    selectScanFile_Callback: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback
    callbackOn_Close_Clicked: ()=> void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component_State {

    show_LoadingData_Message?: boolean

    force_ReRender?: object
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component_State > {

    private _scanFileCheckboxSelectionChange_CallbackFunction_BindThis = this._scanFileCheckboxSelectionChange_CallbackFunction.bind(this);
    private _run_FeatureDetection_For_Selected_ScanFiles_BindThis = this._run_FeatureDetection_For_Selected_ScanFiles.bind(this)

    private _DO_NOT_CALL_VALIDATES_FunctionSignatures() {

        const scanFileCheckboxSelectionChange_CallbackFunction: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback =
            this._scanFileCheckboxSelectionChange_CallbackFunction
    }

    private _scanFileSelection_FromCheckboxes: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection

    private _buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled: boolean = true //  start out with NO Scan File Selections

    private _component_Mounted: boolean = false;

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__FeatureDetectionRun_SelectScanFile_Component_Props) {
        super(props);

        this.state = { show_LoadingData_Message: true }
    }

    /**
     *
     */
    componentWillUnmount() {
        try {
            this._component_Mounted = false;

        } catch (e) { reportWebErrorToServer.reportErrorObjectToServer({errorException: e}); throw e }
    }

    /**
     * Called to reflect latest scan file selection from checkboxes
     */
    private _scanFileCheckboxSelectionChange_CallbackFunction( params: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params ) : void {

        this._scanFileSelection_FromCheckboxes = params.scanFileSelection;

        if ( this._scanFileSelection_FromCheckboxes.projectScanFileId_List.length > 0 ) {
            if ( this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled ) {
                //  Changed
                this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled = false;
                this.setState({ force_ReRender: {} })
            }
        } else {
            if ( ! this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled ) {
                //  Changed
                this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled = true;
                this.setState({ force_ReRender: {} })
            }
        }
    }

    /**
     *
     */
    private _run_FeatureDetection_For_Selected_ScanFiles() {

        if ( ( ! this._scanFileSelection_FromCheckboxes ) ||
            this._scanFileSelection_FromCheckboxes.projectScanFileId_List.length === 0 ) {
            //  NO Selection so exit
            return; // EARLY RETURN
        }

        this.props.selectScanFile_Callback({
            scanFileSelection: this._scanFileSelection_FromCheckboxes
        })
    }

    /**
     *
     */
    render() {

        return (

            <>
                <div className="  top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right ">
                    <div style={ { marginBottom: 10 } }>
                        <div style={ { fontSize: 18, fontWeight: "bold" } }>
                            <span>Select Scan File to Run Feature Detection for</span>
                        </div>
                    </div>

                </div>
                <div
                    className="  top-level single-entry-variable-height modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    style={ { overflowX: "hidden", overflowY: "auto", borderStyle: "solid", borderWidth: 1 } }
                >
                    <div style={ { padding: 8 } }>
                        {/*  Scan Files  */}
                        <ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component
                            mainParams={ this.props.mainParams }
                            selectScanFile_Callback={ this.props.selectScanFile_Callback }
                            scanFileCheckboxSelectionChange_CallbackFunction={ this._scanFileCheckboxSelectionChange_CallbackFunction_BindThis }
                        />
                    </div>
                </div>
                <div
                    className="  top-level fixed-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                >
                    <div style={ { marginTop: 10 } }>

                        {/*  Run Feature Detection */}
                        <div style={ { position: "relative", display: "inline-block" } }>
                            <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                title={
                                    <span>
                                        Run Feature Detection<br/>on selected scan files
                                    </span>
                                }
                                { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                            >
                                <button
                                    disabled={ this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled }
                                    onClick={ this._run_FeatureDetection_For_Selected_ScanFiles_BindThis }
                                >
                                    Run Feature Detection
                                </button>
                            </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            { ( this._buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled ) ? (
                                // overlay when button is disabled to show tooltip
                                <Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component
                                    title={
                                        <span>
                                            Select 1 or more scan files <br/> to run Feature Detection for
                                        </span>
                                    }
                                    { ...limelight_Tooltip_React_Extend_Material_UI_Library__Main__Common_Properties__For_FollowMousePointer() }
                                >
                                    <div
                                        style={ { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 } }
                                    ></div>
                                </Limelight_Tooltip_React_Extend_Material_UI_Library__Main_Tooltip_Component>
                            ): null }
                        </div>
                    </div>
                </div>

            </>
        );
    }
}


