/**
 * load_NumPsms_By_SearchSubGroups_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */


import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";
import {SearchDataLookupParams_For_Single_ProjectSearchId} from "page_js/data_pages/data_pages__common_data_classes/searchDataLookupParameters";
import {variable_is_type_number_Check} from "page_js/variable_is_type_number_Check";


/**
 * Get Number of PSMs by Search SubGroups For Single Project Search Id
 *
 * Could be upgraded to accept a minimum number of PSMs per Reported Peptide
 */

export const load_NumPsms_By_SearchSubGroup_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId, reportedPeptideIds, searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {

        projectSearchId : number
        reportedPeptideIds : Array<number>
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : Promise<unknown> {

    const reportedPeptideIds_Sorted = Array.from( reportedPeptideIds );

    reportedPeptideIds_Sorted.sort( (a,b ) => {
        if ( a < b ) {
            return -1;
        }
        if ( a > b ) {
            return 1;
        }
        return 0;
    });

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds : reportedPeptideIds_Sorted,
                searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get psm-count-per-reported-peptide-id-sub-search-group-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/psm-count-per-reported-peptide-id-sub-search-group-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get psm-count-per-reported-peptide-id-sub-search-group-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

                    const results = responseData.results;

                    _processResultsFromServer_Populate_loadedData({ results, loadedDataPerProjectSearchIdHolder })

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
const _processResultsFromServer_Populate_loadedData = function ( { results, loadedDataPerProjectSearchIdHolder } : {

    results: any
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

} ) : void {

    const resultMap : Map<number, Map<number, number>> = new Map();

    for ( const result_Entry of results ) {

        if ( ! variable_is_type_number_Check( result_Entry.rPId ) ) {
            const msg = "result_Entry.rPId not numeric: " + result_Entry.rPId;
            console.warn( msg );
            throw Error( msg )
        }
        if ( ! variable_is_type_number_Check( result_Entry.sSbGpId ) ) {
            const msg = "result_Entry.rPId not numeric: " + result_Entry.sSbGpId;
            console.warn( msg );
            throw Error( msg )
        }
        if ( ! variable_is_type_number_Check( result_Entry.cnt ) ) {
            const msg = "result_Entry.rPId not numeric: " + result_Entry.cnt;
            console.warn( msg );
            throw Error( msg )
        }

        const reportedPeptideId = result_Entry.rPId;
        const searchSubGroupId = result_Entry.sSbGpId;
        const psmCount = result_Entry.cnt;

        let getSubMap_Key_searchSubGroupId = resultMap.get( reportedPeptideId );
        if ( ! getSubMap_Key_searchSubGroupId ) {
            getSubMap_Key_searchSubGroupId = new Map();
            resultMap.set( reportedPeptideId, getSubMap_Key_searchSubGroupId );
        }
        getSubMap_Key_searchSubGroupId.set( searchSubGroupId, psmCount );
    }
    loadedDataPerProjectSearchIdHolder.set_numPsmsFor_SearchSubGroupId_ReportedPeptideId_Map( resultMap );
}