/**
 * load_NumPsms_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
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

export const load_NumPsms_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {

        projectSearchId : number
        reportedPeptideIds : Array<number>
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : Promise<unknown> {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds,
                searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    _processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData({ numPsms_KeyReportedPeptideId : responseData, loadedDataPerProjectSearchIdHolder })

                    resolve( responseData.numPsms_KeyReportedPeptideId );

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


/**
 * Populate loadedData with data from dataFromServer.
 *
 *  Set loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap : Map of num PSMs : Key ReportedPeptideId
 */
const _processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData = function ( { numPsms_KeyReportedPeptideId, loadedDataPerProjectSearchIdHolder } : {

    numPsms_KeyReportedPeptideId
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

} ) : void {

    const numPsmsForReportedPeptideIdMap = new Map();

    const numPsms_KeyReportedPeptideId_Keys = Object.keys( numPsms_KeyReportedPeptideId );

    for ( const reportedPeptideIdString of numPsms_KeyReportedPeptideId_Keys ) {

        const numPsms = numPsms_KeyReportedPeptideId[ reportedPeptideIdString ];

        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        numPsmsForReportedPeptideIdMap.set( reportedPeptideIdInt, numPsms );
    }
    loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap( numPsmsForReportedPeptideIdMap );
}