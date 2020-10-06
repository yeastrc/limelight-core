/**
 * load_StaticModifications_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

/**
 * Get Static Modifications for projectSearchId
 */
export const load_StaticModifications_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function ( { projectSearchId, loadedDataPerProjectSearchIdHolder } : {

    projectSearchId : number
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

} ) : Promise<unknown> {

    return new Promise((resolve, reject) => {
        try {
            const promise_getData = _getStaticMods( { projectSearchId } );

            promise_getData.catch((reason) => { reject(reason)});

            promise_getData.then((staticModsList) => {
                try {
                    // DB Results: staticModsList: result list item { String residue, BigDecimal mass }
                    // Store: Array [{ String residue, BigDecimal mass }] : [Static Mods]

                    loadedDataPerProjectSearchIdHolder.set_staticMods(staticModsList)

                    resolve();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            console.log("Exception caught in New Promise in load_StaticModifications_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder(...)");
            console.log( e );
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}

/**
 * Get Static Mods For Single Project Search Id
 *
 * result list item { String residue, BigDecimal mass }
 */
const _getStaticMods = function ( { projectSearchId } ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId
            };

            console.log("AJAX Call to get Static Mods List START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/static-mods-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get Static Mods List END, Now: " + new Date() );

                    resolve( responseData.staticModsList );

                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });

    return promise;
}
