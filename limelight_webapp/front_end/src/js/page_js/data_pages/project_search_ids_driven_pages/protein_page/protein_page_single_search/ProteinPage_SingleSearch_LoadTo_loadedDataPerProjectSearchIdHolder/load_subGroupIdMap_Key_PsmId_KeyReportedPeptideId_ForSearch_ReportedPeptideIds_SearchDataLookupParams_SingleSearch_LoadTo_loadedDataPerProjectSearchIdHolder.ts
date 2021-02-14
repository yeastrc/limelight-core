/**
 * load_subGroupIdMap_Key_PsmId_KeyReportedPeptideId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
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
 * Get PSM Id to Search Sub Group Id For Single Project Search Id
 *
 */

export const load_subGroupIdMap_Key_PsmId_KeyReportedPeptideId_ForSearch_ReportedPeptideIds_SearchDataLookupParams_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function (
    {
        projectSearchId,
        searchDataLookupParams_For_Single_ProjectSearchId,
        loadedDataPerProjectSearchIdHolder
    } : {

        projectSearchId : number
        searchDataLookupParams_For_Single_ProjectSearchId : SearchDataLookupParams_For_Single_ProjectSearchId
        loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder

    } ) : Promise<unknown> {

    const reportedPeptideIds_Set = new Set<number>();

    if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_OpenModifications() ) {
        for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_OpenModifications() ) {
            reportedPeptideIds_Set.add( reportedPeptideId );
        }
    }
    if ( loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_ReporterIons() ) {
        for ( const reportedPeptideId of loadedDataPerProjectSearchIdHolder.get_reportedPeptideIds_AnyPsmHas_ReporterIons() ) {
            reportedPeptideIds_Set.add( reportedPeptideId );
        }
    }

    if ( reportedPeptideIds_Set.size === 0 ) {
        //  Nothing to load so return

        return null; //  EARLY RETURN
    }

    const reportedPeptideIds = Array.from( reportedPeptideIds_Set );

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId,
                reportedPeptideIds,
                searchDataLookupParams_For_Single_ProjectSearchId,
            };

            console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get d/rws/for-page/psb/search-sub-search-group-id_psm-id_reported-peptide-id-for-rep-pept-ids-searchcriteria-single-project-search-id END, Now: " + new Date() );

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
        if ( ! variable_is_type_number_Check( result_Entry.psmId ) ) {
            const msg = "result_Entry.psmId not numeric: " + result_Entry.psmId;
            console.warn( msg );
            throw Error( msg )
        }

        const reportedPeptideId = result_Entry.rPId;
        const searchSubGroupId = result_Entry.sSbGpId;
        const psmId = result_Entry.psmId;

        let getSubMap_Key_psmId = resultMap.get( reportedPeptideId );
        if ( ! getSubMap_Key_psmId ) {
            getSubMap_Key_psmId = new Map();
            resultMap.set( reportedPeptideId, getSubMap_Key_psmId );
        }
        getSubMap_Key_psmId.set( psmId, searchSubGroupId );
    }
    loadedDataPerProjectSearchIdHolder.set_subGroupIdMap_Key_PsmId_KeyReportedPeptideId( resultMap );
}