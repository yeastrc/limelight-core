/**
 * projectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Gold Standard Import - Select Scan File
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";
import {
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback,
    ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component";


/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params
    selectScanFile_Callback: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback
    callbackOn_Close_Clicked: ()=> void
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component_State {

    show_LoadingData_Message?: boolean
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component_State > {

    private _component_Mounted: boolean = false;

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__GoldStandardImport_SelectScanFile_Component_Props) {
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
     *
     */
    render() {

        return (

            <>
                <div className="  top-level fixed-height modal-overlay-body-standard-margin-top modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right ">
                    <div style={ { marginBottom: 10 } }>
                        <div style={ { fontSize: 18, fontWeight: "bold" } }>
                            <span>Select Scan File to import Gold Standard Data for</span>
                        </div>
                    </div>
                </div>
                <div
                    className="  top-level single-entry-variable-height modal-overlay-body-standard-margin-bottom modal-overlay-body-standard-margin-left modal-overlay-body-standard-margin-right "
                    style={ { overflowX: "hidden", overflowY: "auto", borderStyle: "solid", borderWidth: 1 } }
                >
                    <div style={ { padding: 8 } }>
                        {/*  Scan Files  */}
                        <ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component
                            mainParams={ this.props.mainParams }
                            selectScanFile_Callback={ this.props.selectScanFile_Callback }
                            scanFileCheckboxSelectionChange_CallbackFunction={ undefined } // Not applicable
                        />
                    </div>
                </div>
            </>
        );
    }
}


