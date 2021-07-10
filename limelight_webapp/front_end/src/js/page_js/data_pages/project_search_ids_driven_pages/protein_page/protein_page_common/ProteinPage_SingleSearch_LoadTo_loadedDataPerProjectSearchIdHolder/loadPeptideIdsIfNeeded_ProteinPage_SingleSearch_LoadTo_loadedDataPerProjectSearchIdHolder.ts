/**
 * loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder.ts
 *
 * Load data into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 *
 */

import {ProteinViewPage_LoadedDataPerProjectSearchIdHolder} from "page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder";
import {reportWebErrorToServer} from "page_js/reportWebErrorToServer";
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";

/**
 * Load Peptide Ids if needed into object of class ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 */
export const loadPeptideIdsIfNeeded_ProteinPage_SingleSearch_LoadTo_loadedDataPerProjectSearchIdHolder = function({ reportedPeptideIds, projectSearchId, loadedDataPerProjectSearchIdHolder } : {

    reportedPeptideIds : Array<number>,
    projectSearchId : number
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder;
} ) : Promise<any> {

    const reportedPeptideIdsToLoadPeptideIdsFor: Array<number> = [];
    {
        for ( const reportedPeptideId of reportedPeptideIds ) {

            if ( loadedDataPerProjectSearchIdHolder.get_peptideId_For_reportedPeptideId( { reportedPeptideId } ) === undefined ) {
                reportedPeptideIdsToLoadPeptideIdsFor.push( reportedPeptideId );
            }
        }
    }

    if ( reportedPeptideIdsToLoadPeptideIdsFor.length === 0 ) {
        //  No data needs to be loaded
        return null; // EARLY RETURN
    }

    return new Promise<void>( function(resolve, reject) {
        try {
            const promise_getPeptideIdsFromReportedPeptideIds =
                _getPeptideIdsFromReportedPeptideIds(
                    { projectSearchId : projectSearchId,
                        reportedPeptideIds : reportedPeptideIdsToLoadPeptideIdsFor } );

            promise_getPeptideIdsFromReportedPeptideIds.
            then( function( { peptideIdReportedPeptideIdMappingList, foundAllReportedPeptideIdsForProjectSearchId } ) {
                try {
                    if ( ! foundAllReportedPeptideIdsForProjectSearchId ) {
                        throw Error("loadPeptideIdsIfNeeded(...) response 'foundAllReportedPeptideIdsForProjectSearchId' is false");
                    }

                    for ( const peptideIdReportedPeptideIdMappingEntry of peptideIdReportedPeptideIdMappingList ) {

                        loadedDataPerProjectSearchIdHolder.add_peptideIdForReportedPeptide_KeyReportedPeptideId({
                            peptideId : peptideIdReportedPeptideIdMappingEntry.peptideId,
                            reportedPeptideId : peptideIdReportedPeptideIdMappingEntry.reportedPeptideId } );
                    }
                    resolve();
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            });
            promise_getPeptideIdsFromReportedPeptideIds.catch(function(reason) {
                try {
                    reject(reason);
                } catch( e ) {
                    reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                    throw e;
                }
            })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    })

}


/**
 * Get Peptide Ids from Reported Peptide Ids and Project Search Id
 */
const _getPeptideIdsFromReportedPeptideIds = function ( { projectSearchId, reportedPeptideIds }: { projectSearchId: number, reportedPeptideIds: Array<number> }  ) {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds,
            };

            console.log("AJAX Call to get d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }: { responseData: any }) => {
                try {
                    console.log("AJAX Call to get d/rws/for-page/psb/peptide-ids-for-reported-peptide-ids END, Now: " + new Date() );

                    //  JS Object.

                    resolve(
                        { peptideIdReportedPeptideIdMappingList : responseData.resultList,
                            foundAllReportedPeptideIdsForProjectSearchId : responseData.foundAllReportedPeptideIdsForProjectSearchId } );

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
