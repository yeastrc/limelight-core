/**
 * projectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Common - Select Scan File
 *
 *
 */


import React from "react";
import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {ProjectPage_UploadData_UploadFiles__Params} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";
import {
    ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";
import {
    projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer,
    ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_Root
} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/all_users_incl_public_user/projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer";

////////////  Callback when user clicks on a scan file

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params {
    scanFileSelection: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection
}

/**
 *
 */
export type ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback =
    ( params: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback_Params ) => void

////////////  Main Component

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component_Props {

    mainParams: ProjectPage_UploadData_UploadFiles__Params
    selectScanFile_Callback: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback

    //  May be undefined.   Called to reflect latest scan file selection from checkboxes
    scanFileCheckboxSelectionChange_CallbackFunction: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Callback
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component_State {

    show_LoadingData_Message?: boolean
    scanFile_List_FromServer_Root?: ProjectPage_ScanFiles_View_Section_ScanFile_List_FromServer_Root

    force_ReRender?: object
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component_State > {

    private _component_Mounted: boolean = false;

    private _scanFiles_Selected_ProjectScanFileId_Set: Set<number> = new Set();

    private _buttons_For_ActOn_ScanFile_CheckboxSelections_Disabled: boolean = true //  start out with NO Scan File Selections


    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay__Common_SelectScanFile_Component_Props) {
        super(props);

        this.state = { show_LoadingData_Message: true }
    }

    /**
     *
     */
    componentDidMount() {

        this._component_Mounted = true;

        const promise = projectPage_ScanFiles_View_Section_Get_ScanFile_List_FromServer({ projectIdentifier: this.props.mainParams.projectIdentifierFromURL })

        promise.catch(reason => { })

        promise.then(value => {

            this.setState({ scanFile_List_FromServer_Root: value, show_LoadingData_Message: false })
        })
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
    private _updateFor__scanFiles_Selected_ProjectScanFileId_Set_Change() {

        const projectScanFileId_List: Array<number> = []
        const scanFilename_Array_Array: Array<Array<string>> = []

        for ( const scanFile_Entry of this.state.scanFile_List_FromServer_Root.scanFiles_In_Project_List ) {

            if ( this._scanFiles_Selected_ProjectScanFileId_Set.has( scanFile_Entry.projectScanFileId ) ) {
                projectScanFileId_List.push( scanFile_Entry.projectScanFileId )
                scanFilename_Array_Array.push( scanFile_Entry.scanFilename_Array )
            }
        }

        this.props.scanFileCheckboxSelectionChange_CallbackFunction({
            scanFileSelection: {
                projectScanFileId_List, scanFilename_Array_Array
            }
        })
    }

    /**
     *
     */
    render() {

        let no_ScanFiles_Found = false;
        const scanFile_Element_List: Array<JSX.Element> = [];

        if ( this.state.scanFile_List_FromServer_Root ) {

            if ( this.state.scanFile_List_FromServer_Root.scanFiles_In_Project_List.length === 0 ) {

                no_ScanFiles_Found = true;

            } else {
                for ( const scanFile_Entry of this.state.scanFile_List_FromServer_Root.scanFiles_In_Project_List ) {

                    const element = (
                        <div
                            key={ scanFile_Entry.projectScanFileId }
                            style={ { marginBottom: 5 } }
                        >
                            { this.props.scanFileCheckboxSelectionChange_CallbackFunction ? (
                                //  Only render Checkbox since have callback function

                                <span style={ { marginRight: 10 } }>
                                    <input
                                        type="checkbox"
                                        defaultChecked={ false }
                                        onChange={ event => {
                                            if ( event.target.checked ) {
                                                this._scanFiles_Selected_ProjectScanFileId_Set.add( scanFile_Entry.projectScanFileId )
                                            } else {
                                                this._scanFiles_Selected_ProjectScanFileId_Set.delete( scanFile_Entry.projectScanFileId )
                                            }

                                            this._updateFor__scanFiles_Selected_ProjectScanFileId_Set_Change()
                                        }}
                                    />
                                </span>
                            ) : null }

                            <span
                                className=" fake-link "
                                onClick={ event => {
                                    this.props.selectScanFile_Callback({
                                        scanFileSelection: {
                                            projectScanFileId_List: [ scanFile_Entry.projectScanFileId ],
                                            scanFilename_Array_Array: [ scanFile_Entry.scanFilename_Array ]
                                        }
                                    })
                                } }
                            >
                                {/*  May be more than 1 scan filename for the scan file id so list them all comma delim  */}
                                <span style={ { whiteSpace: "nowrap" } }>
                                    <span>Scan Filename</span>{ ( scanFile_Entry.scanFilename_Array.length > 1 ) ? <span>s</span> : null }
                                    <span>: </span>
                                </span>
                                <span>{ scanFile_Entry.scanFilename_Array.join( ", " ) }</span>
                            </span>
                        </div>
                    )

                    scanFile_Element_List.push(element);
                }
            }
        }

        return (

            <div>
                {/*  Scan Files  */}
                { (this.state.show_LoadingData_Message) ? (
                    <div>
                        Loading Data
                    </div>
                ) : no_ScanFiles_Found ? (
                    <div>
                        No scan files in this project.
                    </div>
                ) : (
                    <div>
                        { scanFile_Element_List }
                    </div>
                ) }

            </div>
        );
    }
}


