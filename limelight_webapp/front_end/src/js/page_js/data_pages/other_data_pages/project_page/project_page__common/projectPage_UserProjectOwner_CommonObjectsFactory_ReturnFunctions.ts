/**
 * projectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions.ts
 *
 * Javascript for projectView.jsp page
 *
 * For User is Project Owner - Return Objects and Functions
 *
 * Common - Project Owner, Researcher
 *
 */


import {open_Import_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/open_Import_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay";
import {open_Run_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay} from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/open_Run_Hardklor_Bullseye_For_ScanFile_Project_Overlay";
import {featureDetection_Label_Description_Change_Component__openOverlay} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/featureDetection_Label_Description_Change_Component_and_WebserviceCall";
import {projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer} from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer";
import { open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay } from "page_js/data_pages/other_data_pages/project_page/project_page__upload_data_section/project_page__import_and_pipeline_run/open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay";
import { goldStandard_Label_Description_Change_Component__openOverlay } from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/goldStandard_Label_Description_Change_Component_and_WebserviceCall";
import { projectPage_ScanFiles_View_Section_ScanFile_GoldStandardMappingEntry_Delete_FromServer } from "page_js/data_pages/other_data_pages/project_page/project_page__scan_files_view_section/project_owner/projectPage_ScanFiles_View_Section_ScanFile_GoldStandardMappingEntry_Delete_FromServer";

/**
 *
 */
export class ProjectPage_UserProjectOwner_CommonObjectsFactory_ReturnFunctions {


    getFunction__open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay() {
        return open_Import_GoldStandard_File_Contents_For_ScanFile_Project_Overlay
    }


    getFunction__open_Import_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay() {
        return open_Import_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay
    }

    getFunction__open_Run_Hardklor_File_Contents_For_ScanFile_Project_Overlay__Function() {
        return open_Run_Hardklor_Bullseye_Files_Contents_For_ScanFile_Project_Overlay
    }

    //  Feature Detection

    getFunction__featureDetection_Label_Description_Change_Component__openOverlay__Function() {
        return featureDetection_Label_Description_Change_Component__openOverlay
    }

    getFunction__projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer__Function() {
        return projectPage_ScanFiles_View_Section_ScanFile_FeatureDetectionMappingEntry_Delete_FromServer
    }

    //  Gold Standard

    getFunction__goldStandard_Label_Description_Change_Component__openOverlay__Function() {
        return goldStandard_Label_Description_Change_Component__openOverlay
    }

    getFunction__projectPage_ScanFiles_View_Section_ScanFile_GoldStandardMappingEntry_Delete_FromServer__Function() {
        return projectPage_ScanFiles_View_Section_ScanFile_GoldStandardMappingEntry_Delete_FromServer
    }
}