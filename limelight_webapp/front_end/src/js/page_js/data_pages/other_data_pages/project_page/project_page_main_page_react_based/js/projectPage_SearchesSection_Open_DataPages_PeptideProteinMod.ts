
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

let initialized = false;

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

    projectSearchIds: Set<number>
    projectSearchIdCodes: Set<string>
    ctrlKeyOrMetaKey: boolean
}


export type ProjectPage_SearchesSection_Open_DataPage_PeptideProteinMod =
    ( params: ProjectPage_SearchesSection_Open_DataPages_PeptideProteinMod__InputParams ) => void

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

    const projectSearchIds = params.projectSearchIds;
    const projectSearchIdCodes = params.projectSearchIdCodes;
    const ctrlKeyOrMetaKey = params.ctrlKeyOrMetaKey;

    if (projectSearchIds.size < 1) {
        return;
    }

    const projectSearchIdCodes_EncodedForURL = get_projectSearchIdCodes_EncodedForURL({ projectSearchIdCodes });

    const url = urlPath + projectSearchIdCodes_EncodedForURL + "/r";

    if ( ctrlKeyOrMetaKey ) {

        window.open(url, "_blank", "");

        return;  // EARLY RETURN
    }

    //  NO ctrlKeyOrMetaKey

    window.location.href = url;

    return;  // EARLY RETURN

    // const promise_getSearchDataLookupParamsCode = _getSearchDataLookupParamsCode({ projectSearchIds });
    //
    //
    // let newWindow = null;  // Always null since handled above

    //  Handled above

    // if ( ctrlKeyOrMetaKey ) {
    //
    //     //  Ctrl or meta (command on mac) key pressed while button clicked
    //     // Open URL in new window
    //
    //     //  Open Empty window to set the URL below in call to _goToURL_DataPage(...)
    //      newWindow = window.open( "", "_blank", "" );
    // }


    // promise_getSearchDataLookupParamsCode.catch((reason) => { });
    //
    // promise_getSearchDataLookupParamsCode.then((result) => {
    //     try {
    //         const url = urlPath + result.searchDataLookupParamsCode + "/r";
    //         _goToURL_DataPage({ url, newWindow });
    //     } catch( e ) {
    //         reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
    //         throw e;
    //     }
    // });
};

/**
 *
 */
const get_projectSearchIdCodes_EncodedForURL = function ({ projectSearchIdCodes } : { projectSearchIdCodes: Set<string>}) : string {


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
    static peptide_View_OpenDataPage = peptide_View_OpenDataPage
    static protein_View_OpenDataPage = protein_View_OpenDataPage
    static mod_View_OpenDataPage = mod_View_OpenDataPage
}