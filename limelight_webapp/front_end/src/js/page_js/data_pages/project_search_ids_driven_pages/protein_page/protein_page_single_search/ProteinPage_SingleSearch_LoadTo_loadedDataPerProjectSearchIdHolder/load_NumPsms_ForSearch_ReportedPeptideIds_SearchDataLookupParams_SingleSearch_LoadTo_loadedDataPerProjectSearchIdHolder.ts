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

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get psm-count-per-reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    const psmCount_PerReportedPeptideId = responseData.psmCount_PerReportedPeptideId;

                    _processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData({ psmCount_PerReportedPeptideId, loadedDataPerProjectSearchIdHolder })

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
const _processNumPsmsForReportedPeptideIdsFromServer_Populate_loadedData = function ( { psmCount_PerReportedPeptideId, loadedDataPerProjectSearchIdHolder } : {

    psmCount_PerReportedPeptideId: any
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

} ) : void {

    const numPsmsForReportedPeptideIdMap = new Map();

    for ( const psmCount_PerReportedPeptideId_Entry of psmCount_PerReportedPeptideId ) {

        const reportedPeptideId = psmCount_PerReportedPeptideId_Entry.reportedPeptideId;
        const psmCount = psmCount_PerReportedPeptideId_Entry.psmCount;

        numPsmsForReportedPeptideIdMap.set( reportedPeptideId, psmCount );
    }
    loadedDataPerProjectSearchIdHolder.set_numPsmsForReportedPeptideIdMap( numPsmsForReportedPeptideIdMap );
}