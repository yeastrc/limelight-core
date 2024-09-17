
/**
 * projectPage_SearchesSection_Open_DataPages_PeptideProteinMod.ts
 *
 * Open Peptide, Protein, or Mod page for search(es)
 *
 *
 *
 */

import {reportWebErrorToServer} from "page_js/common_all_pages/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component";

let initialized = false;

let url_path__scanFileToSearch: string;
let url_path__qc: string;
let url_path__peptide: string;
let url_path__protein: string;
let url_path__mod_view: string;

let project_search_id_code_block_start_end_identifier_strings: string;
let project_search_id_code_separator: string;

let project_scan_file_id_code_block_start_end_identifier_strings: string;

/**
 *
 */
export const projectPage_SearchesSection_Open_DataPages_PeptideProteinMod__Initialize = function () {

    if ( initialized ) {
        // Already initialized
        return; // EARLY RETURN
    }
    initialized = true;


    /**
     * DOM <script> tags hold the paths to the data pages
     */

    {
        let url_path__Element = document.getElementById("url_path__scan_file_to_search");
        if (!url_path__Element) {
            throw Error("No DOM element for id 'url_path__scan_file_to_search'");
        }
        url_path__scanFileToSearch = url_path__Element.innerHTML;
    }

    let url_path__qcElement = document.getElementById("url_path__qc");
    if (!url_path__qcElement) {
        throw Error("No DOM element for id 'url_path__qc'");
    }
    url_path__qc = url_path__qcElement.innerHTML;

    let url_path__peptideElement = document.getElementById("url_path__peptide");
    if (!url_path__peptideElement) {
        throw Error("No DOM element for id 'url_path__peptide'");
    }
    url_path__peptide = url_path__peptideElement.innerHTML;

    let url_path__proteinElement = document.getElementById("url_path__protein");
    if (!url_path__proteinElement) {
        throw Error("No DOM element for id 'url_path__protein'");
    }
    url_path__protein = url_path__proteinElement.innerHTML;

    let url_path__mod_viewElement = document.getElementById("url_path__mod_view");
    if (!url_path__mod_viewElement) {
        throw Error("No DOM element for id 'url_path__mod_view'");
    }
    url_path__mod_view = url_path__mod_viewElement.innerHTML;

    const project_search_id_code_block_start_end_identifier_stringsDOM = document.getElementById("project_search_id_code_block_start_end_identifier_strings");
    if ( ! project_search_id_code_block_start_end_identifier_stringsDOM ) {
        throw Error("No DOM element with id 'project_search_id_code_block_start_end_identifier_strings'")
    }
    project_search_id_code_block_start_end_identifier_strings = project_search_id_code_block_start_end_identifier_stringsDOM.innerHTML;

    const project_search_id_code_separatorDOM = document.getElementById("project_search_id_code_separator");
    if ( ! project_search_id_code_separatorDOM ) {
        throw Error("No DOM element with id 'project_search_id_code_separator'")
    }
    project_search_id_code_separator = project_search_id_code_separatorDOM.innerHTML;

    {
        const domElement = document.getElementById( "project_scan_file_id_code_block_start_end_identifier_strings" )
        if ( ! domElement ) {
            throw Error("No DOM element with id 'project_scan_file_id_code_block_start_end_identifier_strings'")
        }
        project_scan_file_id_code_block_start_end_identifier_strings = domElement.innerHTML;
    }
}

///////

type ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_Base = {
    ctrlKeyOrMetaKey: boolean
}


interface ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_SearchBased extends ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_Base {

    selected_Searches_Data_Object: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    projectScanFileId ? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when Search Data is populated
    scanFile_Code_FirstSix ? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when Search Data is populated
}

interface ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_ProjectScanFileIdBased extends ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_Base {

    projectScanFileId : number
    scanFile_Code_FirstSix: string
    selected_Searches_Data_Object ? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when projectScanFileId is populated
    searchesSearchTagsFolders_Result_Root ? : never    //  Need "?" since 'never'.  'never' so can NOT be populated when projectScanFileId is populated
}

/**
 *
 */
export type ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams =
    ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_SearchBased |
    ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams_ProjectScanFileIdBased

/**
 * QC View
 */
const scanFileToSearch_View_OpenDataPage = function ( params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams ) : void {

    const urlPath = url_path__scanFileToSearch;

    _openDataPage( params, urlPath )
};

/**
 * QC View
 */
const qc_View_OpenDataPage = function ( params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams ) : void {

    const urlPath = url_path__qc;

    _openDataPage( params, urlPath )
};

/**
 * Peptide View
 */
const peptide_View_OpenDataPage = function ( params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams ) : void {

    const urlPath = url_path__peptide;

    _openDataPage( params, urlPath )
};

/**
 * Protein View
 */
const protein_View_OpenDataPage = function ( params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams ) : void {

    const urlPath = url_path__protein;

    _openDataPage( params, urlPath )
};

/**
 * Mod View
 */
const mod_View_OpenDataPage = function ( params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams ) : void {

    const urlPath = url_path__mod_view;

    _openDataPage( params, urlPath )
}


/**
 *
 */
const _openDataPage = function ( params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams, urlPath: string ) : void {

    const ctrlKeyOrMetaKey = params.ctrlKeyOrMetaKey;

    let pathAddition_ProjectSearchIdCodes_OR_ProjectScanFileId: string = undefined

    if ( params.selected_Searches_Data_Object && params.searchesSearchTagsFolders_Result_Root ) {

        if ( ! params.selected_Searches_Data_Object.is_ANY_Search_Selected() ) {
            return;
        }

        const projectSearchIdCodes = new Array<string>();

        for ( const projectSearchId of params.selected_Searches_Data_Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder() ) {

            const searchData = params.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId( projectSearchId );

            if ( ! searchData ) {
                const msg = "params.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
                console.warn( msg )
                throw Error( msg )
            }

            projectSearchIdCodes.push( searchData.projectSearchIdCode );
        }

        pathAddition_ProjectSearchIdCodes_OR_ProjectScanFileId =
            project_search_id_code_block_start_end_identifier_strings +
            Array.from( projectSearchIdCodes ).join( project_search_id_code_separator ) +
            project_search_id_code_block_start_end_identifier_strings;
    } else {

        // mainParametersCodeString IS:  a{scan file spectr code 1st 6 characters}{project id}z{scan file id base 35}

        const projectScanFileIdentifier = "a" + params.scanFile_Code_FirstSix + params.projectScanFileId.toString( 35 )

        pathAddition_ProjectSearchIdCodes_OR_ProjectScanFileId =
            project_scan_file_id_code_block_start_end_identifier_strings +
            projectScanFileIdentifier +
            project_scan_file_id_code_block_start_end_identifier_strings
    }

    const url = urlPath + pathAddition_ProjectSearchIdCodes_OR_ProjectScanFileId + "/r";

    if ( ctrlKeyOrMetaKey ) {

        window.open(url, "_blank", "noopener");

        return;  // EARLY RETURN
    }

    //  NO ctrlKeyOrMetaKey

    window.location.href = url;

    return;  // EARLY RETURN
};

/**
 * Go to Data Page URL
 */
// const _goToURL_DataPage = function ({ url, newWindow }) {
//
//     //  CANNOT OPEN WINDOW HERE - MUST Open the window before make the AJAX call
//
//     if ( newWindow != null ) {
//
//         newWindow.location.href = url;
//         return;
//     }
//
//     window.location.href = url;
// }

/**
 * Get searchDataLookupParamsCode for merged Project Search Ids
 */
const _getSearchDataLookupParamsCode = function (
    {
        projectSearchIds
    }:{
        projectSearchIds: Set<number>

    }) : Promise<any> {

    if ( (!projectSearchIds) || projectSearchIds.size === 0) {
        throw Error("No value for projectSearchIds")
    }

    const projectSearchIds_Array = Array.from( projectSearchIds );

    return new Promise((resolve,reject) => {
        try {
            let requestObj = {
                projectSearchIds_CreateDefault : projectSearchIds_Array,
                sjklwuiowerzUIryhnIOWzq : true
            };

            const url = "d/rws/for-page/psb/get-search-data-lookup-params-code";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url, dataRetrieval_CanRetry: false }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    const searchDataLookupParamsCode = responseData.searchDataLookupParamsCode;
                    if (!searchDataLookupParamsCode) {
                        throw Error("No value for responseData.searchDataLookupParamsCode");
                    }
                    resolve({ searchDataLookupParamsCode })

                } catch (e) {
                    reportWebErrorToServer.reportErrorObjectToServer({errorException : e});
                    reject(e);
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
};

/**
 *
 */
export class ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod {
    static scanFileToSearch_View_OpenDataPage = scanFileToSearch_View_OpenDataPage
    static qc_View_OpenDataPage = qc_View_OpenDataPage
    static peptide_View_OpenDataPage = peptide_View_OpenDataPage
    static protein_View_OpenDataPage = protein_View_OpenDataPage
    static mod_View_OpenDataPage = mod_View_OpenDataPage
}