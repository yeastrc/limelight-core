/**
 * proteinViewPage_DisplayData_SingleProtein_Modifications_Processing.js
 * 
 * Javascript for proteinView.jsp page - 
 * 
 * Gets Modifications for Reported Peptides for a Single Protein Sequence Version Id
 *      and adds them to an instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * Combines those Modifications for the Protein Sequence Version Id
 *      and adds that to the same instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */


import { ProteinViewDataLoader } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/proteinViewDataLoader.js';


/**
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Modification per Reported Peptide Id
 *   and create Modifications Per proteinSequenceVersionId
 * 
 * Map the Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param proteinSequenceVersionId 
 * @param projectSearchId 
 * 
 * @returns Promise that resolves when loadedDataPerProjectSearchIdHolder is updated 
 *          with mods for parameter Reported Peptide Ids 
 *                  which are also mapped together and stored for the parameter protein sequence version id
 */
const getModificationsForProteinSequenceVersionId = function({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId }) {

    //  First check if Modifications for Protein already computed and stored
    let modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsOnProtein_KeyProteinSequenceVersionId();
    if ( modificationsOnProtein_KeyProteinSequenceVersionId !== undefined ) {
        if ( modificationsOnProtein_KeyProteinSequenceVersionId.has( proteinSequenceVersionId ) ) {
            // No Promise to return since already have data loaded and processed
            return null; //  EARLY EXIT
        }
    }

    return _getModificationsForRepPeptIds_CombineAndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId });
}

/**
 * Get Modifications Data for Reported Peptide Ids and projectSearchId
 */
const _getModificationsForRepPeptIds_CombineAndStoreForProtSeqVId = function({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId }) {

		const reportedPeptideIdsKeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_reportedPeptideIdsKeyProteinSequenceVersionId();

		//  reportedPeptideIds for this proteinSequenceVersionId
		let reportedPeptideIds_For_proteinSequenceVersionId = reportedPeptideIdsKeyProteinSequenceVersionId.get( proteinSequenceVersionId );
		if ( ! reportedPeptideIds_For_proteinSequenceVersionId ) {
			throw Error("_createReportedPeptideDisplayData: No reportedPeptideIds for proteinSequenceVersionId: " 
					+ proteinSequenceVersionId + ", projectSearchId: " + projectSearchId );
        }
        
        const modificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsOnReportedPeptide_KeyReportedPeptideId();

        let reportedPeptideIdsToRetrieveModificationDataFor = undefined;

        if ( ! modificationsOnReportedPeptide_KeyReportedPeptideId ) {
            // No Modification Data Loaded so need to load for all reported peptide ids
            reportedPeptideIdsToRetrieveModificationDataFor = reportedPeptideIds_For_proteinSequenceVersionId;
        
        } else {
            //  Get reported peptide ids to load modification data
            reportedPeptideIdsToRetrieveModificationDataFor = [];
            for ( const reportedPeptideId of reportedPeptideIds_For_proteinSequenceVersionId ) {
                if ( ! modificationsOnReportedPeptide_KeyReportedPeptideId.has( reportedPeptideId ) ) {
                    reportedPeptideIdsToRetrieveModificationDataFor.push( reportedPeptideId );
                }
            }
        }

        if ( reportedPeptideIdsToRetrieveModificationDataFor === undefined || reportedPeptideIdsToRetrieveModificationDataFor.length === 0 ) {
            //  Have all Modification data for reported peptide ids so process to get for protein sequence version id
            _combine_ModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
            //  No Promise to return since not retrieve anything from server
            return null; //  EARLY EXIT
        }

        return new Promise(function(resolve, reject) {
    
            const promise_get_ModificationsForReportedPeptideids = _get_ModificationsForReportedPeptideids( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds : reportedPeptideIdsToRetrieveModificationDataFor } );

            promise_get_ModificationsForReportedPeptideids.catch((reason) => {
                reject(reason);
            })

            promise_get_ModificationsForReportedPeptideids.then((result) => {
                
                _combine_ModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
                resolve();
            })
        });
}

/**
 * Get Modifications Data for Reported Peptide Ids and projectSearchId
 */
const _get_ModificationsForReportedPeptideids = function( { loadedDataPerProjectSearchIdHolder, projectSearchId, reportedPeptideIds } ) {

    return new Promise(function(resolve, reject) {

        ProteinViewDataLoader.getModificationsForReportedPeptideids( 
                { projectSearchId, 
                    reportedPeptideIds : reportedPeptideIds } )
                    .then(function( modificationData_KeyReportedPeptideIdFromServer ) {
                        _populateLoadedData_With_ModificationsForReportedPeptideidsFromServer( { loadedDataPerProjectSearchIdHolder, modificationData_KeyReportedPeptideIdFromServer } );
                        resolve();

                    }).catch( function(reason) {
                        // Catches the reject from any promise in the chain
                        reject( reason );
                    })
    });
}
    
/**
 * Populate loadedData with data from dataFromServer.
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * @param modificationData_KeyReportedPeptideIdFromServer - data from server
 * 
 * 	Set:  loadedDataPerProjectSearchIdHolder.set_modificationsOnReportedPeptide_KeyReportedPeptideId : 
 * 			Map <integer,Object> <reportedPeptideId,<[{ reportedPeptideId, position, mass }]>>   position is int, mass is double
 */
const _populateLoadedData_With_ModificationsForReportedPeptideidsFromServer = function( { loadedDataPerProjectSearchIdHolder, modificationData_KeyReportedPeptideIdFromServer } ) {

    let modificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsOnReportedPeptide_KeyReportedPeptideId();
    if ( ! modificationsOnReportedPeptide_KeyReportedPeptideId ) {
        modificationsOnReportedPeptide_KeyReportedPeptideId = new Map();
        loadedDataPerProjectSearchIdHolder.set_modificationsOnReportedPeptide_KeyReportedPeptideId( modificationsOnReportedPeptide_KeyReportedPeptideId );
    }

    //   modificationData_KeyReportedPeptideIdFromServer:
    //  JS Object.   <Reported Peptide Id, <Ann Type Id, PsmBestFilterableData_For_ReportedPeptideIds_AnnTypeIds_ProjectSearchId_Searcher_Item>> annData_KeyAnnTypeId_KeyReportedPeptideId;
    
    //  Translate to Map, parsing object keys to int

    let modificationData_KeyReportedPeptideIdFromServer_Keys = Object.keys( modificationData_KeyReportedPeptideIdFromServer );
    
    for ( const reportedPeptideIdString of modificationData_KeyReportedPeptideIdFromServer_Keys ) {
        const reportedPeptideIdInt = Number.parseInt( reportedPeptideIdString );
        const modificationDataArray_FromServer = modificationData_KeyReportedPeptideIdFromServer[ reportedPeptideIdString ];
        
        modificationsOnReportedPeptide_KeyReportedPeptideId.set( reportedPeptideIdInt, modificationDataArray_FromServer );
    }
    
}

/**
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Modification per Reported Peptide Id
 *   and create Modifications Per proteinSequenceVersionId
 * 
 * Map the Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * 
 * Updates input parameter property from loadedDataPerProjectSearchIdHolder.get_modificationsOnProtein_KeyProteinSequenceVersionId()
 * 
 *    to contain: Map<proteinSequenceVersionId, [{ mass, positionOnProtein, reportedPeptideId }]>
 *      One entry in the array for each combination of the properties.
 */
const _combine_ModificationsForRepPeptIds_AndStoreForProtSeqVId = function({ 
    loadedDataPerProjectSearchIdHolder,
    proteinSequenceVersionId }) {

        //  Param reportedPeptideIds_For_proteinSequenceVersionId not needed here since working from protein coverage for protein
        //              - proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array()

    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
    const modificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_modificationsOnReportedPeptide_KeyReportedPeptideId();
    
    //  Add modificationsOnProtein_KeyProteinSequenceVersionId to holder if not exist
    let modificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_modificationsOnProtein_KeyProteinSequenceVersionId();
    if ( ! modificationsOnProtein_KeyProteinSequenceVersionId ) {
        modificationsOnProtein_KeyProteinSequenceVersionId = new Map();
        loadedDataPerProjectSearchIdHolder.set_modificationsOnProtein_KeyProteinSequenceVersionId( modificationsOnProtein_KeyProteinSequenceVersionId );
    }

    const modificationsOnProtein = [];
    modificationsOnProtein_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, modificationsOnProtein );
    
    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( proteinCoverageObject === undefined ) {
        throw Error("_createModifications_MapPer_proteinSequenceVersionId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId );
    }
    
    const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

    if ( proteinCoverageEntries_PerReportedPeptideId_Array !== undefined ) {
        
        for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

            const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;
            const proteinStartPosition = proteinCoverageEntries_PerReportedPeptideId_Entry.proteinStartPosition;
            
            const modificationsOnReportedPeptideArray = modificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
            if ( modificationsOnReportedPeptideArray ) {
                
                //  Have Mods for this reportedPeptideId
                for ( const modificationOnReportedPeptide of modificationsOnReportedPeptideArray ) {
                
                    const mass = modificationOnReportedPeptide.mass;
                    const positionOnReportedPeptide = modificationOnReportedPeptide.position;

                    const positionOnProtein = positionOnReportedPeptide + proteinStartPosition - 1; // ( subtract 1 since proteinStartPosition is '1' based )
                                                
                    const modificationOnProtein = { mass : mass, position : positionOnProtein, reportedPeptideId : reportedPeptideId };
                    modificationsOnProtein.push( modificationOnProtein );
                }
            }
        }
        
    }

}

		

export { getModificationsForProteinSequenceVersionId }
