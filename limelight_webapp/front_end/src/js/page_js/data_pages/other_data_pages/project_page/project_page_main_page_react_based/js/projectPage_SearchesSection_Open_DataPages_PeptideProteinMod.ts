
/**
 * projectPage_SearchesSection_Open_DataPages_PeptideProteinMod.ts
 *
 * Open Peptide, Protein, or Mod page for search(es)
 *
 *
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root} from "page_js/data_pages/common_data_loaded_from_server__for_project_or_project_search_ids__searches_search_tags_folders/commonData_LoadedFromServerFor_Project_OrFrom_ProjectSearchIds__SearchesSearchTagsFolders";
import {ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object} from "page_js/data_pages/other_data_pages/project_page/project_page_main_page_react_based/jsx/projectPage_SearchesSection_SearchesAndFoldersList_Component";

let initialized = false;

let url_path__qc: string;
let url_path__peptide: string;
let url_path__protein: string;
let url_path__mod_view: string;

let project_search_id_code_block_start_end_identifier_strings: string;
let project_search_id_code_separator: string;

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

}

///////

/**
 *
 */
export class ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams {

    selected_Searches_Data_Object: ProjectPage_SearchesSection_SearchesAndFoldersList_Component__Selected_Searches_Data_Object
    searchesSearchTagsFolders_Result_Root: CommonData_LoadedFromServerFor_Project_SearchesSearchTagsFolders_Result_Root
    ctrlKeyOrMetaKey: boolean
}

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

    if ( ! params.selected_Searches_Data_Object.is_ANY_Search_Selected() ) {
        return;
    }

    const projectSearchIdCodes_EncodedForURL = get_projectSearchIdCodes_EncodedForURL( params );

    const url = urlPath + projectSearchIdCodes_EncodedForURL + "/r";

    if ( ctrlKeyOrMetaKey ) {

        window.open(url, "_blank", "noopener");

        return;  // EARLY RETURN
    }

    //  NO ctrlKeyOrMetaKey

    window.location.href = url;

    return;  // EARLY RETURN
};

/**
 *
 */
const get_projectSearchIdCodes_EncodedForURL = function (params : ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams) : string {

    const projectSearchIdCodes = new Array<string>();

    for ( const projectSearchId of  params.selected_Searches_Data_Object.get_ProjectSearchIds_Selected_Additions_In_DisplayOrder() ) {

        const searchData = params.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId);

        if ( ! searchData ) {
            const msg = "params.searchesSearchTagsFolders_Result_Root.get_SearchData_For_ProjectSearchId(projectSearchId); returned NOTHING for projectSearchId: " + projectSearchId;
            console.warn(msg)
            throw Error(msg)
        }

        projectSearchIdCodes.push(searchData.projectSearchIdCode);
    }

    const projectSearchIdCodes_Encoded = project_search_id_code_block_start_end_identifier_strings +
        Array.from( projectSearchIdCodes ).join( project_search_id_code_separator ) +
        project_search_id_code_block_start_end_identifier_strings;

    return projectSearchIdCodes_Encoded;
}

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

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObj, url }) ;

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
    static qc_View_OpenDataPage = qc_View_OpenDataPage
    static peptide_View_OpenDataPage = peptide_View_OpenDataPage
    static protein_View_OpenDataPage = protein_View_OpenDataPage
    static mod_View_OpenDataPage = mod_View_OpenDataPage
}