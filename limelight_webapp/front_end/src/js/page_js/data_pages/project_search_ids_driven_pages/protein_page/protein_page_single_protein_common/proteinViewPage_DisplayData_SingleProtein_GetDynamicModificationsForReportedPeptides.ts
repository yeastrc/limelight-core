/**
 * proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides.ts
 * 
 * Javascript for proteinView.jsp page - Dynamic Modifications
 * 
 * Gets Dynamic Modifications for Reported Peptides for a Single Protein Sequence Version Id
 *      and adds them to an instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from '../protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";


/**
 * Dynamic Modifications
 * 
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Modification per Reported Peptide Id
 *   and create Dynamic Modifications Per proteinSequenceVersionId
 * 
 * Map the Dynamic Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param proteinSequenceVersionId 
 * @param projectSearchId 
 * 
 * @returns null or Promise that resolves when loadedDataPerProjectSearchIdHolder is updated 
 *          with Dynamic Modifications for parameter Reported Peptide Ids 
 *          returns null if no data needs loading
 */
const getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId = function({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId } : { 
    
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    proteinSequenceVersionId : number
    projectSearchId : number
}) {

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    //  reportedPeptideIds for this proteinSequenceVersionId
    let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( ! reportedPeptideIds_For_proteinSequenceVersionId ) {
        throw Error("getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId: No reportedPeptideIds for proteinSequenceVersionId: " 
                + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
    }
    
    //   Call function in this file 
    return get_DynamicModificationsForReportedPeptideIds( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds : reportedPeptideIds_For_proteinSequenceVersionId } );
}


/**
 * Get Dynamic Modifications Data for Reported Peptide Ids and projectSearchId
 * 
 * Called from within this file and from outside this file
 */
const get_DynamicModificationsForReportedPeptideIds = function( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds } : { 
    
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    projectSearchId : number
    reportedPeptideIds : Array<number>
} ) : Promise<any> {

    
    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    let reportedPeptideIdsToRetrieveDynamicModificationDataFor : Array<number> = undefined;

    if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
        // No Dynamic Modification Data Loaded so need to load for all reported peptide ids
        reportedPeptideIdsToRetrieveDynamicModificationDataFor = reportedPeptideIds;
    
    } else {
        //  Get reported peptide ids to load Dynamic Modification data
        reportedPeptideIdsToRetrieveDynamicModificationDataFor = [];
        for ( const reportedPeptideId of reportedPeptideIds ) {
            if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.has( reportedPeptideId ) ) {
                reportedPeptideIdsToRetrieveDynamicModificationDataFor.push( reportedPeptideId );
            }
        }
    }

    if ( reportedPeptideIdsToRetrieveDynamicModificationDataFor === undefined || reportedPeptideIdsToRetrieveDynamicModificationDataFor.length === 0 ) {
        //  Nothing to load
        return null; // EARLY EXIT
    }

    return _get_DynamicModificationsForReportedPeptideIds_RetrieveFromDB( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds : reportedPeptideIdsToRetrieveDynamicModificationDataFor } );

}


/**
 * Get Dynamic Modifications Data for Reported Peptide Ids and projectSearchId
 * 
 * Called from within this file and from outside this file
 */
const _get_DynamicModificationsForReportedPeptideIds_RetrieveFromDB = function( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds } : { 
    
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    projectSearchId : number
    reportedPeptideIds : Array<number>
} ) : Promise<any> {

    return new Promise<void>(function(resolve, reject) {
        try {
            _getDynamicModificationsForReportedPeptideids(
                    { projectSearchId, 
                        reportedPeptideIds : reportedPeptideIds } )
                        .then( ( dynamicModificationData_KeyReportedPeptideIdFromServer ) => {
                            try {
                                _populateLoadedData_With_DynamicModificationsForReportedPeptideidsFromServer({ 
                                    reportedPeptideIds, loadedDataPerProjectSearchIdHolder, dynamicModificationData_KeyReportedPeptideIdFromServer 
                                });
                                resolve();
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }).catch( (reason) => {
                            try {
                                // Catches the reject from any promise in the chain
                                reject( reason );
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        })
        } catch( e ) {
            reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
            throw e;
        }
    });
}
    
/**
 * Populate loadedData with data from dataFromServer.
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param dynamicModificationData_KeyReportedPeptideIdFromServer - data from server
 * 
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId : 
 * 			Map <integer,Object> <reportedPeptideId,<[{ reportedPeptideId, position, mass, is_N_Terminal : boolean, is_C_Terminal : boolean }]>>   position is int, mass is double
 */
const _populateLoadedData_With_DynamicModificationsForReportedPeptideidsFromServer = function( { 
    
    reportedPeptideIds,
    loadedDataPerProjectSearchIdHolder, 
    dynamicModificationData_KeyReportedPeptideIdFromServer 
} :  { 
    reportedPeptideIds : Array<number>
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    dynamicModificationData_KeyReportedPeptideIdFromServer 
} ) {

    // const reportedPeptideIds_Copy_Set = new Set( reportedPeptideIds );

    let dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();
    if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
        dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = new Map();
        loadedDataPerProjectSearchIdHolder.set_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId( dynamicModificationsOnReportedPeptide_KeyReportedPeptideId );
    }

    //   dynamicModificationData_KeyReportedPeptideIdFromServer:
    //  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;
    
    //  Translate to Map, parsing object keys to int

    let dynamicModificationData_KeyReportedPeptideIdFromServer_Keys = Object.keys( dynamicModificationData_KeyReportedPeptideIdFromServer );
    
    for ( const reportedPeptideIdString of dynamicModificationData_KeyReportedPeptideIdFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const dynamicModificationDataArray_FromServer = dynamicModificationData_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
        
        dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideIdInt, dynamicModificationDataArray_FromServer );

        //  Remove entry in reportedPeptideIds_Copy_Set that have result
        // reportedPeptideIds_Copy_Set.delete( reportedPeptideIdInt );
    }

    //  The following would BREAK code that assumes that an entry in the map dynamicModificationsOnReportedPeptide_KeyReportedPeptideId means that there are 
    //     dynamic modifications for a given reportedPeptideIdInt

    // //  Build entries with empty array in dynamicModificationsOnReportedPeptide_KeyReportedPeptideId for entries left in reportedPeptideIds_Copy_Set

    // for ( const reportedPeptideId_NotFound of reportedPeptideIds_Copy_Set ) {
    //     dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideId_NotFound, [] );
    // }
    
}


/**
 * Get Dynamic Modification Data From Reported Peptide Ids
 */
const _getDynamicModificationsForReportedPeptideids = function ( { projectSearchId, reportedPeptideIds } ) : Promise<unknown> {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds
            };

            console.log("AJAX Call to get dynamic-modifications-per-reported-peptide-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/dynamic-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get dynamic-modifications-per-reported-peptide-id END, Now: " + new Date() );

                    //  JS Object.  <Reported Peptide Id, [{}]>

                    resolve( responseData.dynamicModification_KeyReportedPeptideId );

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


export { getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId, get_DynamicModificationsForReportedPeptideIds }
