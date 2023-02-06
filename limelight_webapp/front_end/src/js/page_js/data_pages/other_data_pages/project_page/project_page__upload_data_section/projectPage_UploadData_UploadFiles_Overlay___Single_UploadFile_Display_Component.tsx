/**
 * projectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component.tsx
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Display Single Upload File - Component
 *
 *
 */

import React from "react";
import {ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";



////////////

//  Display Single Upload File - Component

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component_Props {

    callbackOn_Delete_Clicked: ()=>void
    submit_InProgress: boolean

    single_UploadFile_Data: ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data
}

/**
 *
 */
class ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component_State {

    _placeholder?: any
}

/**
 *
 */
export class ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component extends React.Component< ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component_Props, ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component_State > {

    /**
     *
     */
    constructor(props: ProjectPage_UploadData_UploadFiles_Overlay___Single_UploadFile_Display_Component_Props) {
        super(props);

        this.state = {}
    }

    /**
     *
     */
    render() {

        return (
            <div>
                <div>
                    <span>{ this.props.single_UploadFile_Data.filename }</span>
                    { this.props.callbackOn_Delete_Clicked && ( ! this.props.submit_InProgress ) ? (
                        <React.Fragment>
                            <span> </span>
                            {/*  Remove Icon  */}
                            <input
                                type="image" src="static/images/icon-circle-delete.png"
                                className=" icon-small "
                                title="Remove"
                                onClick={ event => {
                                    this.props.callbackOn_Delete_Clicked()
                                }}
                            />
                        </React.Fragment>
                    ) : null }
                    {/*  Upload Percentage  */}
                    { this.props.single_UploadFile_Data.fileSendToServer_Percentage ? (
                        <React.Fragment>
                            <span style={ { marginLeft: 10 } }> </span>
                            <progress
                                value={ this.props.single_UploadFile_Data.fileSendToServer_Percentage }
                                max={ 100 }
                                style={ { width: 70 } }
                            >
                                {/* Body of tag is fallback for old browsers  */}
                                <span>
                                    { this.props.single_UploadFile_Data.fileSendToServer_Percentage }
                                </span>
                                <span>%</span>
                            </progress>
                        </React.Fragment>
                    ) : null }
                    {/*  Submit Complete  */}
                    { this.props.single_UploadFile_Data.fileImportSubmit_Complete ? (
                        <React.Fragment>
                            <span style={ { marginLeft: 20 } }> </span>
                            <span>
                                File submitted for import
                            </span>
                        </React.Fragment>
                    ) : null }
                    {/*  Upload Complete  */}
                    { this.props.single_UploadFile_Data.fileSendToServer_Complete ? (
                        <React.Fragment>
                            <span style={ { marginLeft: 20 } }> </span>
                            <span>
                                File upload complete
                            </span>
                        </React.Fragment>
                    ) : null }
                </div>
                {/*  Error Message  */}
                { this.props.single_UploadFile_Data.fileSendToServer_ErrorMessage ? (
                    <div style={ { marginLeft: 20 } }>
                        <span> </span>
                        <span
                            style={ { color: "red" } }
                        >
                            { this.props.single_UploadFile_Data.fileSendToServer_ErrorMessage }
                        </span>
                    </div>
                ) : null }
            </div>
        );
    }
}
