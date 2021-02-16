/**
 * proteinViewPage_DisplayData_SingleProtein_Get_Open_ModificationsForReportedPeptides.ts
 * 
 * Javascript for proteinView.jsp page - Pen Modifications
 * 
 * Gets Open Modifications for Reported Peptides for a Single Protein Sequence Version Id
 *      and adds them to an instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from '../protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';
import {webserviceCallStandardPost} from "page_js/webservice_call_common/webserviceCallStandardPost";


/**
 * Open Modifications
 * 
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Open Modification per Reported Peptide Id
 *   and create Open Modifications Per proteinSequenceVersionId
 * 
 * Map the Open Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param proteinSequenceVersionId 
 * @param projectSearchId 
 * 
 * @returns null or Promise that resolves when loadedDataPerProjectSearchIdHolder is updated 
 *          with Open Modifications for parameter Reported Peptide Ids
 *          returns null if no data needs loading
 */
const getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId = function({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId } : {
    
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    proteinSequenceVersionId : number
    projectSearchId : number
}) {

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    //  reportedPeptideIds for this proteinSequenceVersionId
    let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( ! reportedPeptideIds_For_proteinSequenceVersionId ) {
        throw Error("getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId: No reportedPeptideIds for proteinSequenceVersionId: "
                + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
    }
    
    //   Call function in this file 
    return get_OpenModificationsForReportedPeptideIds( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds : reportedPeptideIds_For_proteinSequenceVersionId } );
}


/**
 * Get Open Modifications Data for Reported Peptide Ids and projectSearchId
 * 
 * Called from within this file and from outside this file
 */
const get_OpenModificationsForReportedPeptideIds = function( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds } : {
    
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    projectSearchId : number
    reportedPeptideIds : Array<number>
} ) : Promise<any> {

    
    const openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();

    let reportedPeptideIdsToRetrieveOpenModificationDataFor : Array<number> = undefined;

    if ( ! openModificationsOnReportedPeptide_KeyReportedPeptideId ) {
        // No Open Modification Data Loaded so need to load for all reported peptide ids
        reportedPeptideIdsToRetrieveOpenModificationDataFor = reportedPeptideIds;
    
    } else {
        //  Get reported peptide ids to load Open Modification data
        reportedPeptideIdsToRetrieveOpenModificationDataFor = [];
        for ( const reportedPeptideId of reportedPeptideIds ) {
            if ( ! openModificationsOnReportedPeptide_KeyReportedPeptideId.has( reportedPeptideId ) ) {
                reportedPeptideIdsToRetrieveOpenModificationDataFor.push( reportedPeptideId );
            }
        }
    }

    if ( reportedPeptideIdsToRetrieveOpenModificationDataFor === undefined || reportedPeptideIdsToRetrieveOpenModificationDataFor.length === 0 ) {
        //  Nothing to load
        return null; // EARLY EXIT
    }

    return _get_OpenModificationsForReportedPeptideIds_RetrieveFromDB( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds : reportedPeptideIdsToRetrieveOpenModificationDataFor } );

}


/**
 * Get Open Modifications Data for Reported Peptide Ids and projectSearchId
 * 
 * Called from within this file and from outside this file
 */
const _get_OpenModificationsForReportedPeptideIds_RetrieveFromDB = function( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds } : {
    
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    projectSearchId : number
    reportedPeptideIds : Array<number>
} ) : Promise<any> {

    return new Promise<void>(function(resolve, reject) {
        try {
            _getOpenModificationsForReportedPeptideids(
                    { projectSearchId, 
                        reportedPeptideIds : reportedPeptideIds } )
                        .then( ( openModificationData_KeyReportedPeptideIdFromServer ) => {
                            try {
                                _populateLoadedData_With_OpenModificationsForReportedPeptideidsFromServer({
                                    reportedPeptideIds, loadedDataPerProjectSearchIdHolder, openModificationData_KeyReportedPeptideIdFromServer 
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
 * @param openModificationData_KeyReportedPeptideIdFromServer - data from server
 * 
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_openModificationsOnReportedPeptide_KeyReportedPeptideId : 
 * 			Map <integer,Object> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>   position is int, mass is int (rounded PSM masses)
 */
const _populateLoadedData_With_OpenModificationsForReportedPeptideidsFromServer = function( {
    
    reportedPeptideIds,
    loadedDataPerProjectSearchIdHolder, 
    openModificationData_KeyReportedPeptideIdFromServer 
} :  { 
    reportedPeptideIds : Array<number>
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    openModificationData_KeyReportedPeptideIdFromServer 
} ) {

    // const reportedPeptideIds_Copy_Set = new Set( reportedPeptideIds );

    let openModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_openModificationsOnReportedPeptide_KeyReportedPeptideId();
    if ( ! openModificationsOnReportedPeptide_KeyReportedPeptideId ) {
        openModificationsOnReportedPeptide_KeyReportedPeptideId = new Map();
        loadedDataPerProjectSearchIdHolder.set_openModificationsOnReportedPeptide_KeyReportedPeptideId( openModificationsOnReportedPeptide_KeyReportedPeptideId );
    }

    //   openModificationData_KeyReportedPeptideIdFromServer:
    //  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;
    
    //  Translate to Map, parsing object keys to int

    let openModificationData_KeyReportedPeptideIdFromServer_Keys = Object.keys( openModificationData_KeyReportedPeptideIdFromServer );
    
    for ( const reportedPeptideIdString of openModificationData_KeyReportedPeptideIdFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const openModificationDataArray_FromServer = openModificationData_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
        
        openModificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideIdInt, openModificationDataArray_FromServer );

        //  Remove entry in reportedPeptideIds_Copy_Set that have result
        // reportedPeptideIds_Copy_Set.delete( reportedPeptideIdInt );
    }

    //  The following would BREAK code that assumes that an entry in the map openModificationsOnReportedPeptide_KeyReportedPeptideId means that there are 
    //     open modifications for a given reportedPeptideIdInt

    // //  Build entries with empty array in openModificationsOnReportedPeptide_KeyReportedPeptideId for entries left in reportedPeptideIds_Copy_Set

    // for ( const reportedPeptideId_NotFound of reportedPeptideIds_Copy_Set ) {
    //     openModificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideId_NotFound, [] );
    // }
    
}


/**
 * Get Open Modification Data From Reported Peptide Ids
 */
const _getOpenModificationsForReportedPeptideids = function ( { projectSearchId, reportedPeptideIds } ) : Promise<unknown> {

    let promise = new Promise( function( resolve, reject ) {
        try {
            let requestObject = {
                projectSearchId : projectSearchId,
                reportedPeptideIds : reportedPeptideIds
            };

            console.log("AJAX Call to get open-modifications-per-reported-peptide-id START, Now: " + new Date() );

            const url = "d/rws/for-page/psb/open-modifications-per-reported-peptide-id-for-rep-pept-ids-single-project-search-id";

            const webserviceCallStandardPostResponse = webserviceCallStandardPost({ dataToSend : requestObject, url }) ;

            const promise_webserviceCallStandardPost = webserviceCallStandardPostResponse.promise;

            promise_webserviceCallStandardPost.catch( () => { reject() }  );

            promise_webserviceCallStandardPost.then( ({ responseData }) => {
                try {
                    console.log("AJAX Call to get open-modifications-per-reported-peptide-id END, Now: " + new Date() );

                    //  JS Object.  <Reported Peptide Id, [{}]>

                    resolve( responseData.openModification_KeyReportedPeptideId );

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


export { getOpenModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId, get_OpenModificationsForReportedPeptideIds }
