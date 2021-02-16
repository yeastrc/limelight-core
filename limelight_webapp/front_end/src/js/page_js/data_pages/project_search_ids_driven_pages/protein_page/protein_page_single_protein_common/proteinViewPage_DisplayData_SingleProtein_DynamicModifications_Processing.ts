/**
 * proteinViewPage_DisplayData_SingleProtein_DynamicModifications_Processing.ts
 * 
 * Javascript for proteinView.jsp page - Dynamic Modifications - Single Search Display usage currently
 * 
 * calls function in another file to:  
 *      Get Dynamic Modifications for Reported Peptides for a Single Protein Sequence Version Id
 *      and adds them to an instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 * Combines those Dynamic Modifications for the Protein Sequence Version Id
 *      and adds that to the same instance of ProteinViewPage_LoadedDataPerProjectSearchIdHolder
 * 
 */

import { reportWebErrorToServer } from 'page_js/reportWebErrorToServer';

import { ProteinViewPage_LoadedDataPerProjectSearchIdHolder } from 'page_js/data_pages/project_search_ids_driven_pages/protein_page/protein_page_common/proteinView_LoadedDataPerProjectSearchIdHolder';

import { getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId } from './proteinViewPage_DisplayData_SingleProtein_GetDynamicModificationsForReportedPeptides';

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
 *                  which are also mapped together and stored for the parameter protein sequence version id
 *          * returns null if no data needs loading and all processing has been completed
 */
const getDynamicModificationsForProteinSequenceVersionId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId, 
    projectSearchId 
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder,
    proteinSequenceVersionId: number
    projectSearchId: number
}) {

    //  First check if Dynamic Modifications for Protein already computed and stored
    let dynamicModificationsOnProtein_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId();
    if ( dynamicModificationsOnProtein_KeyProteinSequenceVersionId !== undefined ) {
        if ( dynamicModificationsOnProtein_KeyProteinSequenceVersionId.has( proteinSequenceVersionId ) ) {
            // No Promise to return since already have data loaded and processed
            return null; //  EARLY EXIT
        }
    }

    return _getDynamicModificationsForRepPeptIds_CombineAndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId });
}

/**
 * Get Dynamic Modifications Data for Reported Peptide Ids and projectSearchId
 */
const _getDynamicModificationsForRepPeptIds_CombineAndStoreForProtSeqVId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId, 
    projectSearchId
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder
    proteinSequenceVersionId : number
    projectSearchId : number
}) {

    const promise_getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId = getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId, projectSearchId });

    if ( promise_getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId === null ) {
        //  Nothing to load
        //  Have all Dynamic Modification data for reported peptide ids so process to get for protein sequence version id
        _combine_DynamicModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
        //  No Promise to return since not retrieve anything from server
        return null; //  EARLY EXIT
    }

    return new Promise<void>(function(resolve, reject) {
        try {
            promise_getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId.catch((reason) => {
                reject(reason);
            })

            promise_getDynamicModificationsForReportedPeptideIdsReferencedByProteinSequenceVersionId.then((result) => {
                try {
                    _combine_DynamicModificationsForRepPeptIds_AndStoreForProtSeqVId({ loadedDataPerProjectSearchIdHolder, proteinSequenceVersionId });
                    resolve();
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
 * Take ProteinSequenceCoverage Per Protein Sequence VersionId and Dynamic Modification per Reported Peptide Id
 *   and create Dynamic Modifications Per proteinSequenceVersionId
 * 
 * Map the Dynamic Modifications to be per proteinSequenceVersionId
 * 
 * @param loadedDataPerProjectSearchIdHolder - updated with retrieved data
 * 
 * Updates input parameter property from loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId()
 * 
 *    to contain: Map<proteinSequenceVersionId, [{ mass, positionOnProtein, reportedPeptideId }]>
 *      One entry in the array for each combination of the properties.
 */
const _combine_DynamicModificationsForRepPeptIds_AndStoreForProtSeqVId = function({ 
    loadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId
} : { 
    loadedDataPerProjectSearchIdHolder : ProteinViewPage_LoadedDataPerProjectSearchIdHolder, 
    proteinSequenceVersionId: number
}) {

        //  Param reportedPeptideIds_For_proteinSequenceVersionId not needed here since working from protein coverage for protein
        //              - proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array()

    const proteinCoverage_KeyProteinSequenceVersionId = loadedDataPerProjectSearchIdHolder.get_proteinCoverage_KeyProteinSequenceVersionId();
    const dynamicModificationsOnReportedPeptide_KeyReportedPeptideId = loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnReportedPeptide_KeyReportedPeptideId();
    
    //  Add dynamicModificationsOnProtein_KeyProteinSequenceVersionId to holder if not exist
    let dynamicModificationsOnProtein_KeyProteinSequenceVersionId : Map<number, Array<{ mass : number, position : number, reportedPeptideId : number }>> = (
        loadedDataPerProjectSearchIdHolder.get_dynamicModificationsOnProtein_KeyProteinSequenceVersionId()
    );
    if ( ! dynamicModificationsOnProtein_KeyProteinSequenceVersionId ) {
        dynamicModificationsOnProtein_KeyProteinSequenceVersionId = new Map();
        loadedDataPerProjectSearchIdHolder.set_dynamicModificationsOnProtein_KeyProteinSequenceVersionId( dynamicModificationsOnProtein_KeyProteinSequenceVersionId );
    }

    const dynamicModificationsOnProtein : Array<{ mass : number, position : number, reportedPeptideId : number }> = [];
    dynamicModificationsOnProtein_KeyProteinSequenceVersionId.set( proteinSequenceVersionId, dynamicModificationsOnProtein );
    
    const proteinCoverageObject = proteinCoverage_KeyProteinSequenceVersionId.get( proteinSequenceVersionId );
    if ( proteinCoverageObject === undefined ) {
        throw Error("_combine_DynamicModificationsForRepPeptIds_AndStoreForProtSeqVId(): proteinCoverageObject === undefined: proteinSequenceVersionId: " + proteinSequenceVersionId );
    }
    
    const proteinCoverageEntries_PerReportedPeptideId_Array = proteinCoverageObject.get_proteinCoverageEntries_PerReportedPeptideId_Array();

    if ( proteinCoverageEntries_PerReportedPeptideId_Array !== undefined ) {
        
        for ( const proteinCoverageEntries_PerReportedPeptideId_Entry of proteinCoverageEntries_PerReportedPeptideId_Array ) {

            const reportedPeptideId = proteinCoverageEntries_PerReportedPeptideId_Entry.reportedPeptideId;
            const proteinStartPosition = proteinCoverageEntries_PerReportedPeptideId_Entry.proteinStartPosition;
            
            const dynamicModificationsOnReportedPeptideArray = dynamicModificationsOnReportedPeptide_KeyReportedPeptideId.get( reportedPeptideId );
            if ( dynamicModificationsOnReportedPeptideArray ) {
                
                //  Have Mods for this reportedPeptideId
                for ( const dynamicModificationOnReportedPeptide of dynamicModificationsOnReportedPeptideArray ) {
                
                    const mass = dynamicModificationOnReportedPeptide.mass;
                    const positionOnReportedPeptide = dynamicModificationOnReportedPeptide.position;

                    const positionOnProtein = positionOnReportedPeptide + proteinStartPosition - 1; // ( subtract 1 since proteinStartPosition is '1' based )
                                                
                    const dynamicModificationOnProtein = { mass : mass, position : positionOnProtein, reportedPeptideId : reportedPeptideId };
                    dynamicModificationsOnProtein.push( dynamicModificationOnProtein );
                }
            }
        }
        
    }

}

		

export { getDynamicModificationsForProteinSequenceVersionId }
