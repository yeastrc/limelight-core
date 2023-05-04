/**
 * projectPage_UploadData_UploadFiles_Overlay__Common_Constants_Classes.ts
 *
 * Javascript for projectView.jsp page
 *
 * Upload Data - Submit Import Program Information Display Overlay - Common Constants and classes
 *
 *
 */

export class ProjectPage_UploadData_UploadFiles__Common_Constants {

    static readonly accepted_ScanFilename_Suffix_List__DEFAULT = [ ".mzML", ".mzXML" ]
}



//////////////////////

//  Single Upload File

export class ProjectPage_UploadData_UploadFiles__Common_Single_UploadFile_Data {

    file_JS_File_Object: File
    filename: string
    internal_Identifier: number
    fileSendToServer_Complete: boolean
    fileImportSubmit_Complete: boolean
    fileSendToServer_Percentage: number
    fileSendToServer_ErrorMessage: string
}

/**
 * User Selected a scan file(s) in Limelight to import or process data for
 */
export class ProjectPage_UploadData_UploadFiles__Common_ScanFileSelection {

    projectScanFileId_List: Array<number>
    scanFilename_Array_Array: Array<Array<string>> // Since can be > 1 scan filename for projectScanFileId.  Can be multiple projectScanFileId
}
