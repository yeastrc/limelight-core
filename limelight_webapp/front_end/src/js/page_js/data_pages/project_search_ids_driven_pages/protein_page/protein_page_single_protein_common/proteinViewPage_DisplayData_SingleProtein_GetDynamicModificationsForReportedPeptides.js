/**
 * proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides.js
 * 
 * Javascript for proteinView.jsp page - Dynamic Modifications
 * 
 * Gets Dynamic Modifications for Reported Peptides for a Single Protein Sequence Version Id
 *      and adds them to an instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */


import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';
import { ProteinViewDataLoader } from '../protein_page_common/proteinViewDataLoader';


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
const getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId = function({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId }) {

    const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

    //  reportedPeptideIds for this proteinSequenceVersionId
    let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( ! reportedPeptideIds_For_proteinSequenceVersionId ) {
        throw Error("getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId: No reportedPeptideIds for proteinSequenceVersionId: " 
                + proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
    }
    
    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();

    let reportedPeptideIdsToRetrieveDynamicModificationDataFor = undefined;

    if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId ) {
        // No Dynamic Modification Data Loaded so need to load for all reported peptide ids
        reportedPeptideIdsToRetrieveDynamicModificationDataFor = reportedPeptideIds_For_proteinSequenceVersionId;
    
    } else {
        //  Get reported peptide ids to load Dynamic Modification data
        reportedPeptideIdsToRetrieveDynamicModificationDataFor = [];
        for ( const reportedPeptideId of reportedPeptideIds_For_proteinSequenceVersionId ) {
            if ( ! dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.has( reportedPeptideId ) ) {
                reportedPeptideIdsToRetrieveDynamicModificationDataFor.push( reportedPeptideId );
            }
        }
    }

    if ( reportedPeptideIdsToRetrieveDynamicModificationDataFor === undefined || reportedPeptideIdsToRetrieveDynamicModificationDataFor.length === 0 ) {
        //  Nothing to load
        return null; // EARLY EXIT
    }

    return _get_DynamicModificationsForReportedPeptideids( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds : reportedPeptideIdsToRetrieveDynamicModificationDataFor } );
}

/**
 * Get Dynamic Modifications Data for Reported Peptide Ids and projectSearchId
 */
const _get_DynamicModificationsForReportedPeptideids = function( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds } ) {

    return new Promise(function(resolve, reject) {
        try {
            ProteinViewDataLoader.getDynamicModificationsForReportedPeptideids( 
                    { projectSearchId, 
                        reportedPeptideIds : reportedPeptideIds } )
                        .then(function( dynamicModificationData_KeyReportedPeptideIdFromServer ) {
                            try {
                                _populateLoadedData_With_DynamicModificationsForReportedPeptideidsFromServer( { loadedDataPerProjectSearchIdHolder, dynamicModificationData_KeyReportedPeptideIdFromServer } );
                                resolve();
                            } catch( e ) {
                                reportWebErrorToServer.reportErrorObjectToServer( { errorException : e } );
                                throw e;
                            }
                        }).catch( function(reason) {
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
 * 			Map <integer,Object> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>   position is int, mass is double
 */
const _populateLoadedData_With_DynamicModificationsForReportedPeptideidsFromServer = function( { loadedDataPerProjectSearchIdHolder, dynamicModificationData_KeyReportedPeptideIdFromServer } ) {

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
    }
    
}
		

export { getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId }
