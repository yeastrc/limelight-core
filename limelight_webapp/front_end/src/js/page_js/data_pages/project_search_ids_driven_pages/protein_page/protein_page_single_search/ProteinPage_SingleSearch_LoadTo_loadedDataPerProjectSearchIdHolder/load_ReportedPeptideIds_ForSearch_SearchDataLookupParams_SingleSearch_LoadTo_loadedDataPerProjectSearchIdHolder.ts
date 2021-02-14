/**
 * load_ReportedPeptideIds_ForSearch_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";


/**
 * Get Reported Peptide Ids For Single Project Search Id
 *
 * Also returns Number of PSMs per Reported Peptide Id under specific conditions (Default Cutoffs, ...)
 *
 * Could be upgraded to accept a minimum number of PSMs per Reported Peptide
 */

export const load_ReportedPeptideIds_ForSearch_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function ({ projectSearchId, searchDataLookupParams_For_Single_ProjectSearchId } : {

    projectSearchId : number
    searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId

} ) : Promise<unknown> {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                searchDataLookupParams_For_Single_ProjectSearchId : searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get Peptide List START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/reported-peptide-id-list-for-search-criteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get Peptide List END, Now: " + new Date() );

                    resolve( responseData.reportedPeptideList );

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