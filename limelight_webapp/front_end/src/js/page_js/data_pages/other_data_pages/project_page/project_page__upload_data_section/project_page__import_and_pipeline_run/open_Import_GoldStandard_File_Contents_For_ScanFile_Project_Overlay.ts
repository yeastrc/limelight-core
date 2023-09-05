/**
 * open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay.ts
 *
 * Javascript for projectView.jsp page
 *
 *
 */


import {ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes";
import {
    projectPage_UploadData_UploadFiles__OpenOverlay,
    ProjectPage_UploadData_UploadFiles__Params
} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/projectPage_UploadData_UploadFiles_Overlay";

///////////////////////

// 

export class Open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay__FunctionParams {

    component_Params: {
        projectIdentifier : string
        projectScanFileId: number
        scanFilename_Array: Array<string> // Since can be > 1 scan filename for projectScanFileId
    }
    uploadComplete_Callback: () => void
}

export type Open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay__FunctionType =
    ( params: Open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay__FunctionParams ) => void;

/**
 *
 */
export const open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay : Open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay__FunctionType = function (

    functionParams: Open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay__FunctionParams) : void {


    const scanFileSelection_For_GoldStandardImport: ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection = {

        projectScanFileId_List: [ functionParams.component_Params.projectScanFileId ],
        scanFilename_Array_Array: [ functionParams.component_Params.scanFilename_Array ]
    }

    const projectPage_UploadData_UploadFiles__Params: ProjectPage_UploadData_UploadFiles__Params = {

        projectIdentifierFromURL: functionParams.component_Params.projectIdentifier,

        callback_UpdateAfterSuccessfulSubmit: functionParams.uploadComplete_Callback,

        is_uploading_FileObjectStorage_Files: null,

        limelight_import_file_type_limelight_xml_file: null,
        limelight_import_file_type_fasta_file: null,
        limelight_import_file_type_scan_file: null,

        maxLimelightXMLFileUploadSize: null,
        maxLimelightXMLFileUploadSizeFormatted: null,
        maxFASTAFileUploadSizeFormatted: null,
        maxFASTAFileUploadSize: null,
        maxScanFileUploadSize: null,
        maxScanFileUploadSizeFormatted: null,
        scanFileSelection_For_GoldStandardImport,
        scanFileSelection_For_FeatureDetectionImport: null,
        scanFileSelection_For_FeatureDetectionRun: null
    }

    projectPage_UploadData_UploadFiles__OpenOverlay({ mainParams: projectPage_UploadData_UploadFiles__Params })
}

