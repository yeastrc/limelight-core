/**
 * scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc.ts
 *
 * Scan File Browser Page - Create String to put in URL to specify the Project Scan File Id
 *
 */


export const scanFileBrowserPage__Create_BaseURL_With_Code_With_ProjectScanFileId_Etc = function (
    {
        projectScanFileId, scanFile_Code_FirstSix
    } : {
        projectScanFileId: number
        scanFile_Code_FirstSix: string
    }
) : {
    basePathURL: string
    codeForProjectScanFileId: string
    basePathURL_AND_codeForProjectScanFileId: string
} {

    let controller_path_scan_file_browser: string;

    /**
     * DOM <script> tags hold the paths to the data pages
     */
    let controller_path_scan_file_browser__Element = document.getElementById("controller_path_scan_file_browser");
    if (!controller_path_scan_file_browser__Element) {
        throw Error("No DOM element for id 'controller_path_scan_file_browser'");
    }
    controller_path_scan_file_browser = controller_path_scan_file_browser__Element.innerHTML;

    const pathCode_Version = "a";

    const pathCode =
        pathCode_Version +
        scanFile_Code_FirstSix +
        projectScanFileId.toString( 35 );

    const basePathURL_AND_codeForProjectScanFileId =
        controller_path_scan_file_browser +
        "c/" +  // is path code
        pathCode


    return {
        basePathURL: controller_path_scan_file_browser,
        codeForProjectScanFileId: pathCode,
        basePathURL_AND_codeForProjectScanFileId
    }

}
